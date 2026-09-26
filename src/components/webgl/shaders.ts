/**
 * Breath field — concentric rings (the sand ripples of "The Origin", continued as light).
 * uBreath: slow 6.5 s inhale/exhale · uVelocity: scroll energy · uMorph: 8-fold mandala
 * uSeed: rings contract toward a single point.
 */
export const vertexShader = /* glsl */ `
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const fragmentShader = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uBreath;
uniform float uVelocity;
uniform float uMorph;
uniform float uSeed;
uniform float uOpacity;
uniform vec2 uResolution;
uniform vec2 uCenter;
uniform vec3 uInk;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

void main() {
  float s = min(uResolution.x, uResolution.y);
  vec2 p = (gl_FragCoord.xy - uCenter * uResolution) / s;
  float r = length(p);
  float a = atan(p.y, p.x);

  float breathe = 1.0 + (uBreath - 0.5) * 0.05 - uVelocity * 0.07;
  float field = r * breathe;

  float n = noise(p * 3.2 + vec2(uTime * 0.035, -uTime * 0.025)) + 0.5 * noise(p * 7.0 - uTime * 0.02);
  field += (n - 0.75) * (0.03 + uVelocity * 0.02);

  float petals = cos(a * 8.0 + uTime * 0.04) * 0.5 + 0.5;
  field += uMorph * 0.034 * petals * smoothstep(0.04, 0.6, r);

  float spacing = mix(0.034, 0.02, uSeed);
  float x = field / spacing - uTime * 0.12;
  float d = abs(fract(x) - 0.5);
  float fw = fwidth(x);
  float line = 1.0 - smoothstep(fw * 0.5, fw * 1.5, d);

  float radius = mix(1.05, 0.18, uSeed);
  float mask = (1.0 - smoothstep(radius * 0.2, radius, r)) * smoothstep(0.0, 0.03, r);
  float alpha = line * mask * uOpacity * 0.12 * (0.65 + 0.35 * n);

  gl_FragColor = vec4(uInk * alpha, alpha);
}
`;
