'use client';

import { Hero } from './hero';
import { Stats } from './stats';
import { About } from './about';
import { ProjectDemos } from './project-demos';
import { Contact } from './contact';
import { TechStack } from '@/components/views/landing-page/tech-stack';
import { Services } from '@/components/views/landing-page/services';
import { FeaturedCaseStudy } from '@/components/views/landing-page/featured-case-study';
import { Notes } from '@/components/views/landing-page/notes';
import { Testimonials } from '@/components/views/landing-page/testimonials';
import { useLandingAnimations } from '@/hooks/use-landing-animations';

export default function LandingPage() {
  useLandingAnimations();

  return (
    <div className='relative overflow-hidden'>
      <div className='pointer-events-none fixed inset-0 -z-10'>
        <div className='bg-grid absolute inset-0 bg-grid-white/[0.03] bg-grid-16' />
        <div className='bg-noise absolute inset-0 opacity-30 mix-blend-soft-light' style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27%3E%3Cfilter id=%27n%27 x=%270%27 y=%270%27 width=%27100%25%27 height=%27100%25%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%270.18%27/%3E%3C/svg%3E")' }} />
        <div className='bg-glow absolute inset-0 bg-gradient-to-br from-primary/10 via-background/40 to-secondary/10 blur-3xl' />
      </div>

      <Hero />
      <div className='h-10 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 blur-[2px]' aria-hidden />
      <Services />
      <div className='h-10 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 skew-y-2' aria-hidden />
      <Stats />
      <About />
      <div className='h-8 bg-gradient-to-r from-secondary/10 via-primary/10 to-secondary/10 blur-sm' aria-hidden />
      <TechStack />
      <FeaturedCaseStudy />
      <ProjectDemos />
      <Notes />
      <Testimonials />
      <Contact />
    </div>
  );
}
