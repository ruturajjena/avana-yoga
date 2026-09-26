import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';

/**
 * Single registration point for the animation engine.
 * Imported only by client components.
 */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP);
  if (!gsap.parseEase('breath')) {
    CustomEase.create('breath', '0.37,0,0.13,1');
  }
  gsap.defaults({ ease: 'expo.out', duration: 1.2 });
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, SplitText, CustomEase, useGSAP };
