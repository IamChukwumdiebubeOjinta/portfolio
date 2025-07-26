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
import { ExternalLink, Github, Brain, Shield, FolderOpen, Code, Database, Globe } from 'lucide-react';
import { useProjects } from '@/hooks/use-projects';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

// Icon mapping for different project types
const getProjectIcon = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('ai') || lowerTitle.includes('chat')) return Brain;
  if (lowerTitle.includes('security') || lowerTitle.includes('shield')) return Shield;
  if (lowerTitle.includes('gallery') || lowerTitle.includes('vault')) return FolderOpen;
  if (lowerTitle.includes('api') || lowerTitle.includes('backend')) return Database;
  if (lowerTitle.includes('web') || lowerTitle.includes('frontend')) return Globe;
  return Code; // Default icon
};

export function Projects() {
  const { data, loading, error } = useProjects({
    featured: true,
    visible: true,
    status: 'PUBLISHED',
    limit: 6,
  });

  if (loading) {
    return (
      <section id='projects' className='py-20 px-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              Featured Projects
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Deep dives into complex systems and AI-powered applications
            </p>
          </div>
          <LoadingSkeleton type='stats' count={6} />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id='projects' className='py-20 px-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              Featured Projects
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

        {projects.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-muted-foreground'>
              No featured projects available at the moment.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'>
            {projects.map((project, index) => {
              const ProjectIcon = getProjectIcon(project.title);
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className='h-full hover:shadow-lg transition-shadow group'>
                    <CardHeader>
                      <div className='flex items-center gap-3 mb-3'>
                        <div className='p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors'>
                          <ProjectIcon className='h-6 w-6 text-primary' />
                        </div>
                        <div className='flex gap-2'>
                          {project.demoUrl && (
                            <Button 
                              variant='ghost' 
                              size='icon' 
                              className='h-8 w-8'
                              asChild
                            >
                              <a href={project.demoUrl} target='_blank' rel='noopener noreferrer'>
                                <ExternalLink className='h-4 w-4' />
                              </a>
                            </Button>
                          )}
                          {project.githubUrl && (
                            <Button 
                              variant='ghost' 
                              size='icon' 
                              className='h-8 w-8'
                              asChild
                            >
                              <a href={project.githubUrl} target='_blank' rel='noopener noreferrer'>
                                <Github className='h-4 w-4' />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                      <CardTitle className='text-xl'>{project.title}</CardTitle>
                      <CardDescription className='text-base'>
                        {project.excerpt || project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-4'>
                        {project.features && project.features.length > 0 && (
                          <ul className='space-y-2 text-sm text-muted-foreground'>
                            {project.features.slice(0, 3).map((feature, i) => (
                              <li key={i} className='flex items-start gap-2'>
                                <div className='w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0' />
                                {feature}
                              </li>
                            ))}
                            {project.features.length > 3 && (
                              <li className='text-xs text-muted-foreground'>
                                +{project.features.length - 3} more features
                              </li>
                            )}
                          </ul>
                        )}

                        <div className='flex flex-wrap gap-2 pt-4 border-t'>
                          {project.techStack && project.techStack.slice(0, 5).map(tech => (
                            <Badge key={tech} variant='outline' className='text-xs'>
                              {tech}
                            </Badge>
                          ))}
                          {project.techStack && project.techStack.length > 5 && (
                            <Badge variant='outline' className='text-xs'>
                              +{project.techStack.length - 5}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
