'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Cloud, Layers3, LineChart } from 'lucide-react';

const services = [
  {
    icon: Brain,
    title: 'AI chat systems',
    outcome: 'Streaming + persistence with queues, vector search, guardrails.',
    link: '#case-study',
    linkLabel: 'View Uloma results',
  },
  {
    icon: LineChart,
    title: 'Frontend architecture & performance',
    outcome: 'Remix/Next.js DX, accessibility, Lighthouse 90s, sub-second TTFB.',
    link: '#demos',
    linkLabel: 'See shipped apps',
  },
  {
    icon: Cloud,
    title: 'Cloud, workers & observability',
    outcome: 'BullMQ workers, Dockerized APIs, traces/logs with Grafana + Sentry.',
    link: '#case-study',
    linkLabel: 'Scaling approach',
  },
  {
    icon: Layers3,
    title: 'System design',
    outcome: 'Event-driven architectures, caching, feature rollouts, incident playbooks.',
    link: '#contact',
    linkLabel: 'Plan your build',
  },
];

export function Services() {
  return (
    <section className='py-16 px-4 border-y border-border/50 bg-gradient-to-b from-background via-background/60 to-background/80'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10'>
          <div>
            <p className='text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-2'>
              Services
            </p>
            <h2 className='text-3xl md:text-4xl font-bold'>What I ship</h2>
            <p className='text-muted-foreground mt-2 max-w-2xl'>
              Focused on AI-first products with solid UX, performance, and reliable cloud
              pipelines.
            </p>
          </div>
          <Link
            href='#contact'
            className='inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold'
          >
            Let&rsquo;s scope your build
            <ArrowRight className='h-4 w-4' />
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className='rounded-2xl border border-white/5 bg-card/60 p-5 hover:border-primary/30 transition-colors shadow-sm backdrop-blur'
            >
              <div className='flex items-center justify-between mb-4'>
                <div className='p-2 rounded-lg bg-primary/10 text-primary'>
                  <service.icon className='h-5 w-5' />
                </div>
                <span className='text-[10px] uppercase tracking-widest text-muted-foreground'>
                  Focus
                </span>
              </div>
              <h3 className='font-semibold text-lg mb-2'>{service.title}</h3>
              <p className='text-sm text-muted-foreground leading-relaxed mb-4'>
                {service.outcome}
              </p>
              <Link
                href={service.link}
                className='inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-semibold'
              >
                {service.linkLabel}
                <ArrowRight className='h-4 w-4' />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
