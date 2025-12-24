'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useLandingAnimations() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.4,
    });

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    gsap.to('.bg-grid', {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    gsap.to('.bg-glow', {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    gsap.utils.toArray<HTMLElement>('.reveal').forEach(el => {
      gsap.fromTo(
        el,
        { y: 60, opacity: 0, filter: 'blur(6px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
          },
        },
      );
    });

    gsap.utils.toArray<HTMLElement>('.project-card').forEach(card => {
      const img = card.querySelector('.project-img');
      if (!img) return;

      gsap.fromTo(
        img,
        { y: -12 },
        {
          y: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: '+=700',
        scrub: true,
        pin: true,
      },
    })
      .to('.hero-title', { y: -40, opacity: 0.9 }, 0)
      .to('.hero-image', { y: 60, scale: 0.96 }, 0)
      .to('.hero-cta', { y: -20, opacity: 0 }, 0.1);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
}
