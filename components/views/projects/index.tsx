'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/shared/project-card';

const allProjectsData = [
  {
    title: 'Project 1',
    description: 'Description of project 1.',
    tech: ['React', 'Node.js'],
    githubUrl: '#',
    demoUrl: '#',
    image: '/placeholder.svg?height=300&width=500',
    status: 'Live',
  },
  {
    title: 'Project 2',
    description: 'Description of project 2.',
    tech: ['Next.js', 'Tailwind CSS'],
    githubUrl: '#',
    demoUrl: '#',
    image: '/placeholder.svg?height=300&width=500',
    status: 'Beta',
  },
  {
    title: 'Project 3',
    description: 'Description of project 3.',
    tech: ['Vue.js', 'Express'],
    githubUrl: '#',
    demoUrl: '#',
    image: '/placeholder.svg?height=300&width=500',
    status: 'Development',
  },
];

export function Projects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <section id='all-projects' className='py-20 px-4'>
      <div className='max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>All Projects</h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            A comprehensive list of all my projects.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {allProjectsData.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
