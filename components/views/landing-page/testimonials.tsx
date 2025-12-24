'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { config } from '@/lib/config';

const testimonials = [
  {
    name: 'Andrew Obara',
    title: 'CTO, MyNativeTree',
    quote:
      'Chukwumdiebube shipped a resilient AI chat stack with queues, observability, and streaming that our team could immediately extend.',
    avatar: '/placeholder-user.jpg',
  },
  {
    name: 'Chinonso Ani',
    title: 'Founder, InstinctHub',
    quote:
      'He combines product sense with infrastructure know-how — we shipped from design to production without handoffs slowing us down.',
    avatar: '/placeholder-user.jpg',
  },
  {
    name: 'Startup partners',
    title: 'Collaborations',
    quote: 'Worked with MyNativeTree, InstinctHub, and Uloma to deliver production apps.',
    avatar: '/placeholder-logo.png',
  },
];

export function Testimonials() {
  return (
    <section
      id='testimonials'
      className='py-20 px-4 bg-muted/20 border-t border-border/50'
    >
      <div className='max-w-6xl mx-auto'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10'>
          <div>
            <p className='text-sm uppercase tracking-[0.2em] text-primary font-semibold'>
              Testimonials
            </p>
            <h2 className='text-3xl md:text-4xl font-bold'>What collaborators say</h2>
            <p className='text-muted-foreground mt-2 max-w-2xl'>
              Voices from founders and teammates who shipped with me.
            </p>
          </div>
          <Button asChild variant='outline' className='gap-2 border-primary/40'>
            <Link href={config.social.linkedin} target='_blank'>
              Verify on LinkedIn
              <ArrowUpRight className='h-4 w-4' />
            </Link>
          </Button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className='p-6 rounded-2xl border border-white/5 bg-card/70 backdrop-blur shadow-sm flex flex-col gap-4'
            >
              <div className='flex items-center gap-4'>
                <div className='relative w-12 h-12 rounded-full overflow-hidden border border-white/10'>
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className='object-cover'
                    sizes='48px'
                  />
                </div>
                <div>
                  <div className='font-semibold'>{testimonial.name}</div>
                  <div className='text-sm text-muted-foreground'>{testimonial.title}</div>
                </div>
              </div>
              <p className='text-muted-foreground leading-relaxed flex-1'>
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <Link
                href={config.social.linkedin}
                target='_blank'
                className='inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-semibold'
              >
                Request reference
                <ArrowUpRight className='h-4 w-4' />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
