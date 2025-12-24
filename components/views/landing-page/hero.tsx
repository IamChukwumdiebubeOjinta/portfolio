'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { config } from '@/lib/config';

const profilePicture = '/images/profile/ebube-headshot.jpg';
const proofPoints = [
  {
    title: 'Shipped AI chat with streaming + memory',
    metric: '15k+ conversation events/week',
    detail: 'Uloma AI companion running on queues + vector search',
  },
  {
    title: 'Reduced API latency by 35%',
    metric: 'P95 down to 420ms',
    detail: 'Queue backpressure, edge caching, and connection pooling',
  },
  {
    title: 'Full product delivery',
    metric: 'Design → build → launch',
    detail: 'Next.js, Remix, FastAPI, BullMQ, Docker, observability',
  },
];

export function Hero() {
  return (
    <section
      id='home'
      className='relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-2 md:pt-0'
    >
      {/* Animated background grid */}
      <div className='absolute inset-0 bg-grid-white/[0.02] bg-grid-16' />
      <div className='absolute inset-0 bg-gradient-to-br from-background via-background to-background/80' />

      {/* Chelsea Tech floating orbs with new colors */}
      <motion.div
        className='absolute top-1/4 left-1/4 w-64 h-64 bg-chelsea-gradient rounded-full blur-3xl opacity-20'
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
        }}
      />
      <motion.div
        className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-chelsea-accent-gradient rounded-full blur-3xl opacity-15'
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
        }}
      />

      <div className='relative z-10 max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'>
              Hello, I'm{' '}
              <span className='bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent'>
                Chukwumdiebube Ojinta
              </span>
            </h1>
            <h2 className='text-xl md:text-2xl font-semibold mb-4 text-muted-foreground'>
              Full-Stack Engineer & AI Systems Architect
            </h2>
            <p className='text-lg text-muted-foreground mb-8 leading-relaxed'>
              I build modern, intelligent, user-first digital experiences using{' '}
              <span className='text-primary font-medium'>Next.js</span>,{' '}
              <span className='text-primary font-medium'>Remix</span>,{' '}
              <span className='text-primary font-medium'>React</span>,{' '}
              <span className='text-secondary font-medium'>
                and other web technologies.
              </span>
              .
            </p>
            <motion.div
              className='flex flex-col sm:flex-row gap-4 justify-center mb-12'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button
                size='lg'
                className='group bg-chelsea-gradient hover:bg-chelsea-gradient-reverse transition-chelsea hover-lift hover-glow'
                onClick={() => {
                  const element = document.querySelector('#all-projects');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View My Work
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='border-chelsea-primary text-primary hover:bg-primary hover:text-primary-foreground transition-chelsea hover-lift'
                onClick={() => {
                  const element = document.querySelector('#contact');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get in Touch
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className='mb-10'
            >
              <div className='flex items-center gap-3 mb-3'>
                <div className='px-3 py-1 rounded-full bg-primary/10 text-xs font-semibold text-primary border border-primary/20'>
                  Proof
                </div>
                <p className='text-sm text-muted-foreground'>
                  Results from shipped systems, backed by real metrics
                </p>
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
                {proofPoints.map(point => (
                  <div
                    key={point.title}
                    className='p-4 rounded-xl border border-white/5 bg-gradient-to-br from-background/60 via-background/40 to-primary/5 shadow-sm backdrop-blur hover:-translate-y-0.5 transition-transform hover:border-primary/30'
                  >
                    <div className='text-xs uppercase tracking-wide text-primary font-semibold mb-1'>
                      {point.metric}
                    </div>
                    <div className='font-semibold mb-1'>{point.title}</div>
                    <p className='text-sm text-muted-foreground leading-relaxed'>
                      {point.detail}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className='flex justify-center gap-6'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                variant='ghost'
                size='icon'
                className='hover:text-primary hover:bg-primary/10 transition-chelsea'
                onClick={() => window.open(config.social.github, '_blank')}
              >
                <Github className='h-5 w-5' />
              </Button>
              <Button
                variant='ghost'
                size='icon'
                className='hover:text-primary hover:bg-primary/10 transition-chelsea'
                onClick={() => window.open(config.social.linkedin, '_blank')}
              >
                <Linkedin className='h-5 w-5' />
              </Button>
              <Button
                variant='ghost'
                size='icon'
                className='hover:text-secondary hover:bg-secondary/10 transition-chelsea'
                onClick={() => window.open(`mailto:${config.email.replyTo}`, '_blank')}
              >
                <Mail className='h-5 w-5' />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='flex justify-center lg:justify-end'
          >
            <div className='relative'>
              <div className='w-80 h-80 rounded-2xl overflow-hidden border-4 border-primary/20 shadow-chelsea hover:shadow-chelsea-accent transition-chelsea'>
                <Image
                  src={profilePicture}
                  alt='Chukwumdiebube Ojinta'
                  quality={100}
                  width={320}
                  height={320}
                  priority
                  sizes='320px'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='absolute -bottom-4 -right-4 w-24 h-24 bg-chelsea-accent-gradient rounded-full blur-xl opacity-60' />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
