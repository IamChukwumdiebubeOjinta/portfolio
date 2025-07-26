'use client';

import { motion } from 'framer-motion';
import { Code, Brain, Zap, Briefcase } from 'lucide-react';

const stats = [
  {
    icon: Code,
    value: '5+',
    label: 'Years Engineering Experience',
  },
  {
    icon: Brain,
    value: 'AI',
    label: 'Built AI Assistants with OpenAI SDKs',
  },
  {
    icon: Zap,
    value: 'Full-Stack',
    label: 'Remix / Next.js / FastAPI / Docker / Prisma',
  },
  {
    icon: Briefcase,
    value: 'Startups',
    label: 'Worked with My Native Tree Inc & InstinctHub',
  },
];

export function Stats() {
  return (
    <section className='py-20 px-4 border-t border-border/50'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className='text-center group'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors'>
                <stat.icon className='h-8 w-8 text-primary' />
              </div>
              <div className='text-2xl font-bold mb-2'>{stat.value}</div>
              <div className='text-muted-foreground text-sm'>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
