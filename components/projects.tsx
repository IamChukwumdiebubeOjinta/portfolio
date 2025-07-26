'use client';

import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Brain, Shield, FolderOpen } from 'lucide-react';

const projects = [
  {
    title: 'Uloma AI Assistant',
    description:
      'AI-powered chat interface for family storytelling with streaming responses and conversation persistence.',
    icon: Brain,
    features: [
      'Built full-stack architecture using Remix, Prisma, and Vercel AI SDK',
      'Implemented streaming AI responses and conversation persistence',
      'Set up summarization queues and custom middleware',
      'Deployed with Docker + PM2 for reliability',
      'Worker queues (BullMQ) and observability with Prometheus',
    ],
    tech: ['Remix', 'Vercel AI SDK', 'Prisma', 'BullMQ', 'Docker', 'PM2'],
    links: {
      demo: '#',
      github: '#',
    },
  },
  {
    title: 'InstinctHub Suggestion Box',
    description:
      'Anonymous team feedback tool for internal culture with clean UX and admin dashboard.',
    icon: Shield,
    features: [
      'Built with React + Vite and Tailwind CSS',
      'Express API with dynamic anonymity layer',
      'Clean UX flow for seamless feedback submission',
      'Comprehensive admin dashboard for insights',
      'Real-time feedback processing',
    ],
    tech: ['React', 'Vite', 'Tailwind', 'Express', 'Node.js'],
    links: {
      demo: '#',
      github: '#',
    },
  },
  {
    title: 'Gallery & Vault System',
    description:
      'Drag-and-drop folder UI with nesting for digital assets, featuring smooth animations.',
    icon: FolderOpen,
    features: [
      'Developed animation system using React DnD + Framer Motion',
      'Nested folder structure with intuitive drag-and-drop',
      'Integrated Prisma and AWS S3 for storage',
      'Advanced access control and permissions',
      'Responsive design for all devices',
    ],
    tech: ['React', 'Framer Motion', 'React DnD', 'Prisma', 'AWS S3'],
    links: {
      demo: '#',
      github: '#',
    },
  },
];

export function Projects() {
  return (
    <section id='projects' className='py-20 px-4'>
      <div className='max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            Featured Projects
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Deep dives into complex systems and AI-powered applications
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'>
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className='h-full hover:shadow-lg transition-shadow group'>
                <CardHeader>
                  <div className='flex items-center gap-3 mb-3'>
                    <div className='p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors'>
                      <project.icon className='h-6 w-6 text-primary' />
                    </div>
                    <div className='flex gap-2'>
                      <Button variant='ghost' size='icon' className='h-8 w-8'>
                        <ExternalLink className='h-4 w-4' />
                      </Button>
                      <Button variant='ghost' size='icon' className='h-8 w-8'>
                        <Github className='h-4 w-4' />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className='text-xl'>{project.title}</CardTitle>
                  <CardDescription className='text-base'>
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <ul className='space-y-2 text-sm text-muted-foreground'>
                      {project.features.map((feature, i) => (
                        <li key={i} className='flex items-start gap-2'>
                          <div className='w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0' />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className='flex flex-wrap gap-2 pt-4 border-t'>
                      {project.tech.map(tech => (
                        <Badge key={tech} variant='outline' className='text-xs'>
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
