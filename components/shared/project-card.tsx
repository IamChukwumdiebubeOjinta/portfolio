import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Play, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type ProjectCardProps = {
  title: string;
  description: string;
  image: string;
  tech: string[];
  status: 'Live' | 'Beta' | 'Development' | string;
  demoUrl?: string;
  githubUrl?: string;
};

export function ProjectCard({
  title,
  description,
  image,
  tech,
  status,
  demoUrl,
  githubUrl,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className='overflow-hidden hover:shadow-xl transition-all duration-300 group h-full'>
        <div className='relative overflow-hidden'>
          <Image
            src={image || '/placeholder.svg'}
            alt={`${title} preview`}
            width={1200}
            height={600}
            sizes='(min-width: 1280px) 400px, (min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw'
            className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
          />
          <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
            {demoUrl ? (
              <Button size='sm' className='gap-2' asChild>
                <a href={demoUrl} target='_blank' rel='noopener noreferrer'>
                  <Play className='h-4 w-4' />
                  View Demo
                </a>
              </Button>
            ) : (
              <Button size='sm' className='gap-2' disabled>
                <Play className='h-4 w-4' />
                View Demo
              </Button>
            )}
          </div>
          <Badge
            className='absolute top-3 right-3'
            variant={
              status === 'Live'
                ? 'default'
                : status === 'Beta'
                  ? 'secondary'
                  : 'outline'
            }
          >
            {status}
          </Badge>
        </div>

        <CardHeader>
          <div className='flex items-start justify-between'>
            <div>
              <CardTitle className='text-xl mb-2'>{title}</CardTitle>
              <CardDescription className='text-base'>
                {description}
              </CardDescription>
            </div>
            <div className='flex gap-2 ml-4'>
              {demoUrl && (
                <Button variant='ghost' size='icon' className='h-8 w-8' asChild>
                  <a href={demoUrl} target='_blank' rel='noopener noreferrer'>
                    <ExternalLink className='h-4 w-4' />
                  </a>
                </Button>
              )}
              {githubUrl && (
                <Button variant='ghost' size='icon' className='h-8 w-8' asChild>
                  <a href={githubUrl} target='_blank' rel='noopener noreferrer'>
                    <Github className='h-4 w-4' />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className='flex flex-wrap gap-2'>
            {tech.map(techItem => (
              <Badge key={techItem} variant='outline' className='text-xs'>
                {techItem}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
