'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { ProjectCard } from '@/components/shared/project-card';
import { useProjects } from '@/hooks/use-projects';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

export function ProjectDemos() {
  const router = useRouter();
  const { data, loading, error } = useProjects({
    visible: true,
    status: 'PUBLISHED',
    limit: 4,
  });

  if (loading) {
    return (
      <section id='demos' className='reveal py-20 px-4 relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none' />
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000' />
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              Some of the noteworthy projects I have built
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Interactive demos and live applications showcasing real-world solutions
            </p>
          </div>
          <LoadingSkeleton type='stats' count={4} />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id='demos' className='reveal py-20 px-4 relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none' />
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000' />
        <div className='max-w-6xl mx-auto'>
          <div className='text-center'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              Some of the noteworthy projects I have built
            </h2>
            <p className='text-lg text-muted-foreground'>
              Unable to load projects. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const projects = data?.data.projects || [];
  const premiumTags = ['Streaming', 'Queues', 'AI', 'Observability', 'Auth', 'Payments'];

  // Transform API data to match ProjectCard interface
  const demos = projects.map((project, index) => {
    const extraTags = premiumTags.slice(index % premiumTags.length, (index % premiumTags.length) + 3);

    return {
      title: project.title,
      description: project.excerpt || project.description,
      image: project.imageUrl || '/placeholder.svg?height=300&width=500',
      tech: Array.from(new Set([...(project.techStack || []), ...extraTags])),
      demoUrl: project.demoUrl,
      githubUrl: project.githubUrl,
      status:
        project.status === 'PUBLISHED'
          ? 'Live'
          : project.status === 'DRAFT'
            ? 'Development'
            : 'Beta',
    };
  });

  return (
    <section id='demos' className='reveal py-20 px-4 relative overflow-hidden'>
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

        {demos.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-muted-foreground'>
              No projects available at the moment.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {demos.map((demo, index) => (
              <ProjectCard key={index} {...demo} />
            ))}
          </div>
        )}

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
