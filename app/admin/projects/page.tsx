'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Github,
  Eye,
  EyeOff,
} from 'lucide-react';
import { motion } from 'framer-motion';

const mockProjects = [
  {
    id: '1',
    title: 'Uloma AI Assistant',
    description: 'AI-powered chat interface for family storytelling',
    techStack: ['Remix', 'Vercel AI SDK', 'Prisma', 'BullMQ'],
    githubUrl: 'https://github.com/username/uloma',
    demoUrl: 'https://uloma.dev',
    visible: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'InstinctHub Suggestion Box',
    description: 'Anonymous team feedback tool for internal culture',
    techStack: ['React', 'Vite', 'Tailwind', 'Express'],
    githubUrl: 'https://github.com/username/instincthub',
    demoUrl: 'https://instincthub.com',
    visible: true,
    createdAt: '2024-02-10',
  },
  {
    id: '3',
    title: 'Gallery & Vault System',
    description: 'Drag-and-drop folder UI with nesting for digital assets',
    techStack: ['React', 'Framer Motion', 'React DnD', 'Prisma'],
    githubUrl: 'https://github.com/username/gallery-vault',
    demoUrl: '',
    visible: false,
    createdAt: '2024-03-05',
  },
];

export default function ProjectsManager() {
  const [projects, setProjects] = useState(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredProjects = projects.filter(
    project =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleVisibility = (id: string) => {
    setProjects(
      projects.map(project =>
        project.id === id ? { ...project, visible: !project.visible } : project
      )
    );
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>Projects Manager</h1>
          <p className='text-muted-foreground'>
            Manage your portfolio projects
          </p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className='gap-2'>
          <Plus className='h-4 w-4' />
          Add Project
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className='pt-6'>
          <div className='flex items-center gap-4'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search projects...'
                className='pl-10'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <Badge variant='outline'>{filteredProjects.length} projects</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Projects List */}
      <div className='grid gap-6'>
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className='flex items-start justify-between'>
                  <div className='space-y-2'>
                    <div className='flex items-center gap-2'>
                      <CardTitle className='text-xl'>{project.title}</CardTitle>
                      <div className='flex items-center gap-2'>
                        {project.visible ? (
                          <Eye className='h-4 w-4 text-green-500' />
                        ) : (
                          <EyeOff className='h-4 w-4 text-muted-foreground' />
                        )}
                        <Switch
                          checked={project.visible}
                          onCheckedChange={() => toggleVisibility(project.id)}
                        />
                      </div>
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                    <div className='flex flex-wrap gap-2'>
                      {project.techStack.map(tech => (
                        <Badge
                          key={tech}
                          variant='secondary'
                          className='text-xs'
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    {project.githubUrl && (
                      <Button variant='ghost' size='icon' asChild>
                        <a
                          href={project.githubUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <Github className='h-4 w-4' />
                        </a>
                      </Button>
                    )}
                    {project.demoUrl && (
                      <Button variant='ghost' size='icon' asChild>
                        <a
                          href={project.demoUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <ExternalLink className='h-4 w-4' />
                        </a>
                      </Button>
                    )}
                    <Button variant='ghost' size='icon'>
                      <Edit className='h-4 w-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='text-destructive'
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className='flex items-center justify-between text-sm text-muted-foreground'>
                  <span>
                    Created: {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                  <Badge variant={project.visible ? 'default' : 'secondary'}>
                    {project.visible ? 'Visible' : 'Hidden'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className='text-center py-12'>
            <p className='text-muted-foreground'>
              No projects found matching your search.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
