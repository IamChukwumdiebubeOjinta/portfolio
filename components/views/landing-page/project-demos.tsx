'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { ProjectCard } from '@/components/shared/project-card';

const demos = [
  {
    title: 'WaveFound',
    description:
      'A platform for optimizing and marketing music across platforms with AI-powered insights and analytics.',
    image: '/placeholder.svg?height=300&width=500',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Chart.js'],
    demoUrl: '#',
    githubUrl: '#',
    status: 'Live',
  },
  {
    title: 'WOTIF',
    description:
      'Task management and productivity app with intelligent scheduling and team collaboration features.',
    image: '/placeholder.svg?height=300&width=500',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'Tailwind'],
    demoUrl: '#',
    githubUrl: '#',
    status: 'Beta',
  },
  {
    title: 'PaymentGateway',
    description:
      'Secure payment processing system with multi-currency support and fraud detection.',
    image: '/placeholder.svg?height=300&width=500',
    tech: ['FastAPI', 'PostgreSQL', 'Redis', 'Stripe API'],
    demoUrl: '#',
    githubUrl: '#',
    status: 'Development',
  },
];

export function ProjectDemos() {
  const router = useRouter();

  return (
    <section id='demos' className='py-20 px-4 relative overflow-hidden'>
      {/* Gradient Background */}
      <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none' />

      {/* Animated gradient orbs */}
      <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse' />
      <div className='absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000' />
      <div className='max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            Some of the noteworthy projects I have built
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Interactive demos and live applications showcasing real-world
            solutions
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {demos.map((demo, index) => (
            <ProjectCard key={index} {...demo} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className='text-center mt-12'
        >
          <p className='text-muted-foreground mb-6'>
            Want to see more of my work? Check out my complete project
            portfolio.
          </p>
          <Button
            variant='outline'
            size='lg'
            className='gap-2 bg-transparent'
            onClick={() => router.push('/projects')}
          >
            <Github className='h-5 w-5' />
            View All Projects
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
