'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';

const notes = [
  {
    title: 'How I built streaming AI chat with queues',
    summary:
      'Designing a streaming UX with Vercel AI SDK, BullMQ workers, and durable session state that survives redeploys.',
    href: 'https://www.linkedin.com/pulse/building-streaming-ai-chat-queues-chukwumdiebube-ojinta',
    external: true,
  },
  {
    title: 'Why I migrated from Vercel AI SDK to LangChain',
    summary:
      'Evaluating prompt chaining, connectors, and observability tradeoffs while keeping latency low.',
    href: '/blog/langchain-migration',
    external: false,
  },
  {
    title: 'Scaling workers in Docker/PM2',
    summary:
      'Tuning concurrency, horizontal scaling, and health checks for background queues on Railway.',
    href: 'https://medium.com/@ebubeojinta/scaling-workers-in-docker-pm2-for-queue-heavy-apps',
    external: true,
  },
];

export function Notes() {
  return (
    <section id='notes' className='py-20 px-4 border-t border-border/50 bg-gradient-to-b from-background via-background/70 to-background/90'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10'>
          <div>
            <p className='text-sm uppercase tracking-[0.2em] text-primary font-semibold'>
              Notes
            </p>
            <h2 className='text-3xl md:text-4xl font-bold'>Recent writing</h2>
            <p className='text-muted-foreground mt-2 max-w-2xl'>
              Shipping notes, architecture breakdowns, and lessons from production AI systems.
            </p>
          </div>
          <Link
            href='/blog'
            className='inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold'
          >
            View all notes
            <ArrowRight className='h-4 w-4' />
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {notes.map((note, index) => (
            <motion.div
              key={note.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className='p-6 rounded-2xl border border-white/5 bg-card/60 backdrop-blur shadow-sm hover:-translate-y-1 transition-transform'
            >
              <div className='flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2'>
                <span>Post</span>
                {note.external && (
                  <span className='px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20'>
                    External
                  </span>
                )}
              </div>
              <h3 className='text-xl font-semibold mb-2'>{note.title}</h3>
              <p className='text-muted-foreground mb-4 leading-relaxed'>{note.summary}</p>
              <Link
                href={note.href}
                className='inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-semibold'
                target={note.external ? '_blank' : undefined}
                rel={note.external ? 'noreferrer' : undefined}
              >
                Read note
                {note.external ? (
                  <ExternalLink className='h-4 w-4' />
                ) : (
                  <ArrowRight className='h-4 w-4' />
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
