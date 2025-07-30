'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Github,
  Eye,
  EyeOff,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useProjects } from '@/hooks/use-projects';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import Image from 'next/image';

export default function ProjectsManager() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const {
    data,
    loading,
    error,
    fetchProjects,
    deleteProject,
  } = useProjects({
    search: searchTerm || undefined,
    status: selectedStatus as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | undefined,
    limit: 20,
  });

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
  };

  const toggleVisibility = async (id: string, currentVisibility: boolean) => {
    // This would need to be implemented with the updateProject function
    // For now, we'll just show a placeholder
    console.log('Toggle visibility for project:', id, 'to:', !currentVisibility);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return 'bg-green-100 text-green-800';
      case 'DRAFT':
        return 'bg-yellow-100 text-yellow-800';
      case 'ARCHIVED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading && !data) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold'>Projects Manager</h1>
            <p className='text-muted-foreground'>
              Manage your portfolio projects
            </p>
          </div>
        </div>
        <LoadingSkeleton type='table' count={5} />
      </div>
    );
  }

  if (error) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold'>Projects Manager</h1>
            <p className='text-muted-foreground'>
              Manage your portfolio projects
            </p>
          </div>
          <Button onClick={fetchProjects} className='gap-2'>
            <RefreshCw className='h-4 w-4' />
            Retry
          </Button>
        </div>
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>
            Failed to load projects: {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>Projects Manager</h1>
          <p className='text-muted-foreground'>
            Manage your portfolio projects
          </p>
        </div>
        <div className='flex gap-2'>
          <Button onClick={fetchProjects} variant='outline' size='sm'>
            <RefreshCw className='h-4 w-4' />
          </Button>
          <Button onClick={() => router.push('/admin/projects/create')} className='gap-2'>
            <Plus className='h-4 w-4' />
            Add Project
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className='pt-6'>
          <div className='flex items-center gap-4'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search projects...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10'
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className='px-3 py-2 border border-input rounded-md bg-background'
            >
              <option value=''>All Status</option>
              <option value='DRAFT'>Draft</option>
              <option value='PUBLISHED'>Published</option>
              <option value='ARCHIVED'>Archived</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {data?.data.projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className='h-full flex flex-col'>
              <CardHeader className='pb-3'>
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <CardTitle className='text-lg line-clamp-2'>
                      {project.title}
                    </CardTitle>
                    <CardDescription className='line-clamp-2 mt-2'>
                      {project.description}
                    </CardDescription>
                  </div>
                  <div className='flex items-center gap-2 ml-2'>
                    <Switch
                      checked={project.isVisible}
                      onCheckedChange={() => toggleVisibility(project.id, project.isVisible)}
                      className='h-4 w-4'
                    />
                    {project.isVisible ? (
                      <Eye className='h-4 w-4 text-green-500' />
                    ) : (
                      <EyeOff className='h-4 w-4 text-gray-400' />
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className='flex-1 flex flex-col'>
                {/* Project Image */}
                {project.imageUrl && (
                  <div className='relative h-32 mb-4 rounded-lg overflow-hidden bg-muted'>
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className='object-cover'
                    />
                  </div>
                )}

                {/* Tech Stack */}
                <div className='flex flex-wrap gap-1 mb-4'>
                  {project.techStack.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant='secondary' className='text-xs'>
                      {tech}
                    </Badge>
                  ))}
                  {project.techStack.length > 3 && (
                    <Badge variant='outline' className='text-xs'>
                      +{project.techStack.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Status and Stats */}
                <div className='flex items-center justify-between mb-4'>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <span className='text-xs text-muted-foreground'>
                    {project.views} views
                  </span>
                </div>

                {/* Actions */}
                <div className='flex items-center gap-2 mt-auto'>
                  {project.githubUrl && (
                    <Button variant='outline' size='sm' asChild>
                      <a href={project.githubUrl} target='_blank' rel='noopener noreferrer'>
                        <Github className='h-3 w-3' />
                      </a>
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button variant='outline' size='sm' asChild>
                      <a href={project.demoUrl} target='_blank' rel='noopener noreferrer'>
                        <ExternalLink className='h-3 w-3' />
                      </a>
                    </Button>
                  )}
                  <Button 
                    variant='outline' 
                    size='sm'
                    onClick={() => router.push(`/admin/projects/${project.id}/edit`)}
                  >
                    <Edit className='h-3 w-3' />
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleDelete(project.id)}
                    className='text-destructive hover:text-destructive'
                  >
                    <Trash2 className='h-3 w-3' />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {data?.data.pagination && data.data.pagination.totalPages > 1 && (
        <div className='flex items-center justify-between'>
          <p className='text-sm text-muted-foreground'>
            Showing {((data.data.pagination.page - 1) * data.data.pagination.limit) + 1} to{' '}
            {Math.min(data.data.pagination.page * data.data.pagination.limit, data.data.pagination.total)} of{' '}
            {data.data.pagination.total} projects
          </p>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              disabled={!data.data.pagination.hasPrev}
              onClick={() => {
                // Handle pagination
                console.log('Previous page');
              }}
            >
              Previous
            </Button>
            <Button
              variant='outline'
              size='sm'
              disabled={!data.data.pagination.hasNext}
              onClick={() => {
                // Handle pagination
                console.log('Next page');
              }}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {data?.data.projects.length === 0 && (
        <Card>
          <CardContent className='pt-6 text-center'>
            <p className='text-muted-foreground'>
              No projects found. Create your first project to get started.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
