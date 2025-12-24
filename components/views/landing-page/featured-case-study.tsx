'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, BookOpen, ServerCog } from 'lucide-react';
import { Button } from '@/components/ui/button';

const screenshots = [
  {
    src: '/images/projects/gallery/uloma-ai-assistant-gallery-1.jpg',
    alt: 'Uloma conversational timeline',
  },
  {
    src: '/images/projects/thumbnails/uloma-ai-assistant-thumbnail.png',
    alt: 'Uloma assistant hero',
  },
  {
    src: '/images/projects/thumbnails/uloma-ai-assistant-thumbnail.jpg',
    alt: 'Uloma assistant threads',
  },
];

const sections = [
  {
    title: 'Problem',
    content:
      'Families wanted a trusted AI companion that could remember context, stitch together memories, and deliver responses instantly without losing history.',
  },
  {
    title: 'Approach',
    content:
      'Built event-driven chat with Vercel AI SDK streaming, BullMQ workers, Postgres/Prisma, and Redis-backed vector search for memory. Added observability with Sentry + Grafana.',
    icon: ServerCog,
  },
  {
    title: 'Outcome',
    content:
      'Cut P95 latency from 650ms to 420ms, handled 15k+ weekly conversation events, and shipped a usable assistant with saved sessions, uploads, and reminders.',
    icon: BarChart3,
  },
  {
    title: 'Stack',
    content: 'Next.js, Vercel AI SDK, Prisma, BullMQ, Redis, Docker, Railway, Grafana.',
    icon: BookOpen,
  },
];

export function FeaturedCaseStudy() {
  return (
    <section
      id='case-study'
      className='reveal py-20 px-4 relative overflow-hidden border-t border-border/50'
    >
      <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none' />
      <div className='max-w-6xl mx-auto relative z-10'>
        <div className='flex flex-col lg:flex-row lg:items-center gap-10 mb-12'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='space-y-4'
          >
            <p className='text-sm uppercase tracking-[0.2em] text-primary font-semibold'>
              Featured case study
            </p>
            <h2 className='text-3xl md:text-4xl font-bold'>
              Uloma &mdash; AI family historian and companion
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl'>
              Designed, built, and deployed an AI companion that keeps context across
              conversations, streams responses, and logs every event for reliability and
              observability.
            </p>
            <div className='flex flex-wrap gap-3'>
              <Button
                asChild
                className='bg-chelsea-gradient hover:bg-chelsea-gradient-reverse transition-chelsea group'
              >
                <Link href='/projects/uloma-ai-assistant'>
                  Read case study
                  <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                </Link>
              </Button>
              <Button variant='outline' asChild className='border-primary/40'>
                <Link href='https://uloma.app' target='_blank'>
                  Open product
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className='grid grid-cols-3 gap-3 max-w-xl mx-auto lg:mx-0'
          >
            {screenshots.map(image => (
              <div
                key={image.src}
                className='relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-chelsea bg-background/80'
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className='object-cover'
                  sizes='(max-width: 1024px) 30vw, 160px'
                />
              </div>
            ))}
          </motion.div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              className='p-6 rounded-2xl border border-white/5 bg-card/70 backdrop-blur shadow-sm'
            >
              <div className='flex items-center gap-3 mb-3'>
                {section.icon && (
                  <div className='p-2 rounded-lg bg-primary/10 text-primary'>
                    <section.icon className='h-5 w-5' />
                  </div>
                )}
                <h3 className='text-lg font-semibold'>{section.title}</h3>
              </div>
              <p className='text-muted-foreground leading-relaxed'>{section.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
