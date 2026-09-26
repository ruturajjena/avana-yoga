'use client';

import { useEffect, useRef } from 'react';
import { BufferGeometry, Float32BufferAttribute, Mesh, OrthographicCamera, Scene, ShaderMaterial, Vector2, Vector3, WebGLRenderer } from 'three';
import { breath } from '@/lib/breath';
import { gsap } from '@/lib/gsap';
import { MQ } from '@/lib/motion';
import { getScrollVelocity } from '@/lib/scroll';
import { fragmentShader, vertexShader } from './shaders';

/**
 * One persistent, full-screen WebGL canvas for the whole session.
 * It renders only while a BreathSection is active, throttles to ~30 fps at rest,
 * and disposes every GPU resource on unmount.
 */
export default function BreathField() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const root = document.documentElement;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (window.matchMedia(MQ.reduce).matches || nav.connection?.saveData || (nav.hardwareConcurrency ?? 8) < 4) {
      root.classList.add('no-webgl');
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.className = 'breath-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    host.appendChild(canvas);

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        premultipliedAlpha: true,
        powerPreference: 'low-power',
      });
    } catch {
      canvas.remove();
      root.classList.add('no-webgl');
      return;
    }

    root.classList.add('webgl-active');
    const mobile = window.matchMedia(MQ.mobile).matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25) * (mobile ? 0.5 : 0.7));
    renderer.setClearColor(0x000000, 0);

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3));
    const uniforms = {
      uTime: { value: 0 },
      uBreath: { value: 0.5 },
      uVelocity: { value: 0 },
      uMorph: { value: 0 },
      uSeed: { value: 0 },
      uOpacity: { value: 0 },
      uResolution: { value: new Vector2(1, 1) },
      uCenter: { value: new Vector2(0.5, 0.5) },
      uInk: { value: new Vector3(28 / 255, 36 / 255, 31 / 255) },
    };
    const material = new ShaderMaterial({ vertexShader, fragmentShader, uniforms, transparent: true, depthTest: false, depthWrite: false });
    const mesh = new Mesh(geometry, material);
    mesh.frustumCulled = false;
    scene.add(mesh);

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      renderer.getDrawingBufferSize(uniforms.uResolution.value);
    };
    resize();
    window.addEventListener('resize', resize);

    let running = false;
    let lost = false;
    let velocity = 0;
    let accumulator = 0;

    const stop = () => {
      if (!running) return;
      gsap.ticker.remove(render);
      running = false;
    };
    const start = () => {
      if (running || lost) return;
      gsap.ticker.add(render);
      running = true;
    };
    function render(time: number, deltaMs: number) {
      const v = Math.min(Math.abs(getScrollVelocity()) / 45, 1);
      velocity += (v - velocity) * 0.06;
      uniforms.uVelocity.value = velocity;
      uniforms.uTime.value = time;
      uniforms.uBreath.value = 0.5 + 0.5 * Math.sin((time * Math.PI * 2) / 6.5);

      if (uniforms.uOpacity.value < 0.002 && !gsap.isTweening(uniforms.uOpacity)) {
        renderer.clear();
        stop();
        return;
      }
      if (document.hidden) return;
      if (velocity < 0.02) {
        accumulator += deltaMs;
        if (accumulator < 30) return;
        accumulator = 0;
      }
      renderer.render(scene, camera);
    }

    const apply = () => {
      const target = breath.current();
      const state = target?.state ?? 'off';
      if (state === 'off') {
        gsap.to(uniforms.uOpacity, { value: 0, duration: 1.4, ease: 'breath', overwrite: 'auto' });
        return;
      }
      start();
      gsap.to(uniforms.uOpacity, { value: target?.intensity ?? 1, duration: 1.6, ease: 'breath', overwrite: 'auto' });
      gsap.to(uniforms.uMorph, { value: state === 'mandala' ? 1 : 0, duration: 2.2, ease: 'breath', overwrite: 'auto' });
      gsap.to(uniforms.uSeed, { value: state === 'seed' ? 1 : 0, duration: 2.2, ease: 'breath', overwrite: 'auto' });
      gsap.to(uniforms.uCenter.value, {
        x: target?.center?.[0] ?? 0.5,
        y: 1 - (target?.center?.[1] ?? 0.5),
        duration: 2,
        ease: 'breath',
        overwrite: 'auto',
      });
    };

    const unsubscribe = breath.subscribe(apply);
    const onLost = (event: Event) => {
      event.preventDefault();
      lost = true;
      stop();
    };
    const onRestored = () => {
      lost = false;
      apply();
    };
    const onVisibility = () => {
      if (!document.hidden) apply();
    };
    canvas.addEventListener('webglcontextlost', onLost);
    canvas.addEventListener('webglcontextrestored', onRestored);
    document.addEventListener('visibilitychange', onVisibility);
    apply();

    return () => {
      unsubscribe();
      stop();
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.removeEventListener('webglcontextrestored', onRestored);
      document.removeEventListener('visibilitychange', onVisibility);
      gsap.killTweensOf([uniforms.uOpacity, uniforms.uMorph, uniforms.uSeed, uniforms.uCenter.value]);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
      root.classList.remove('webgl-active');
    };
  }, []);

  return <div ref={hostRef} aria-hidden="true" />;
}
