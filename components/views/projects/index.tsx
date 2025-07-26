'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '@/components/shared/project-card';
import { useProjects } from '@/hooks/use-projects';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

export function Projects() {
  const [mounted, setMounted] = useState(false);
  const { data, loading, error } = useProjects({
    visible: true,
    status: 'PUBLISHED',
    limit: 20,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <section id='all-projects' className='py-20 px-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>All Projects</h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              A comprehensive list of all my projects.
            </p>
          </div>
          <LoadingSkeleton type='stats' count={9} />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id='all-projects' className='py-20 px-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>All Projects</h2>
            <p className='text-lg text-muted-foreground'>
              Unable to load projects. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const projects = data?.data.projects || [];

  // Transform API data to match ProjectCard interface
  const allProjectsData = projects.map(project => ({
    title: project.title,
    description: project.excerpt || project.description,
    image: project.imageUrl || '/placeholder.svg?height=300&width=500',
    tech: project.techStack || [],
    demoUrl: project.demoUrl,
    githubUrl: project.githubUrl,
    status: project.status === 'PUBLISHED' ? 'Live' : 
            project.status === 'DRAFT' ? 'Development' : 'Beta',
  }));

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

        {allProjectsData.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-muted-foreground'>
              No projects available at the moment.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {allProjectsData.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
