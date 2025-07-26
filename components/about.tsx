'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const skills = [
  'Remix',
  'Next.js',
  'React',
  'Vercel AI SDK',
  'OpenAI',
  'AI SDK Core',
  'Prisma',
  'PostgreSQL',
  'FastAPI',
  'Express',
  'Docker',
  'PM2',
  'BullMQ',
  'Redis',
  'AWS (Cloud Practitioner Certified)',
  'Team Leadership',
  'Client Communication',
];

export function About() {
  return (
    <section id='about' className='py-20 px-4 bg-muted/30'>
      <div className='max-w-4xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className='text-3xl md:text-4xl font-bold mb-8 text-center'>
            About Me
          </h2>

          <div className='prose prose-lg dark:prose-invert max-w-none mb-12'>
            <p className='text-lg leading-relaxed mb-6'>
              I'm a product-focused full-stack engineer based in Nigeria,
              passionate about crafting highly interactive, intelligent web
              applications. While I thrive in front-end architecture and DX
              (Remix, React, Tailwind), I'm just as comfortable building complex
              AI-powered systems, designing backend APIs, or scaling cloud
              infrastructure.
            </p>

            <p className='text-lg leading-relaxed mb-6'>
              I enjoy leading projects that mix user experience, system design,
              and AI. Recently, I've led the development of{' '}
              <span className='text-primary font-medium'>Uloma</span> — a family
              historian and AI chat companion built on Vercel AI SDK, Prisma,
              and BullMQ — and I've worked with startups to transform their
              ideas into reality.
            </p>

            <p className='text-lg leading-relaxed'>
              Outside of code, I enjoy cooking, football, and building personal
              tools.
            </p>
          </div>

          <div>
            <h3 className='text-xl font-semibold mb-6'>Key Skills</h3>
            <div className='flex flex-wrap gap-3'>
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Badge
                    variant='secondary'
                    className='text-sm py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors'
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
