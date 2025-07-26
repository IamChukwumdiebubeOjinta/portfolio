'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ImageUpload } from '@/components/ui/simple-image-upload';
import {
  ArrowLeft,
  Save,
  Plus,
  X,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';

interface ProjectFormData {
  title: string;
  description: string;
  slug: string;
  excerpt: string;
  techStack: string[];
  features: string[];
  githubUrl: string;
  demoUrl: string;
  imageUrl: string;
  isVisible: boolean;
  isFeatured: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  order: number;
}

export default function EditProject() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newTech, setNewTech] = useState('');
  const [newFeature, setNewFeature] = useState('');

  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    slug: '',
    excerpt: '',
    techStack: [],
    features: [],
    githubUrl: '',
    demoUrl: '',
    imageUrl: '',
    isVisible: true,
    isFeatured: false,
    status: 'DRAFT',
    order: 0,
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${projectId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch project');
        }
        const project = await response.json();
        
        setFormData({
          title: project.title || '',
          description: project.description || '',
          slug: project.slug || '',
          excerpt: project.excerpt || '',
          techStack: project.techStack || [],
          features: project.features || [],
          githubUrl: project.githubUrl || '',
          demoUrl: project.demoUrl || '',
          imageUrl: project.imageUrl || '',
          isVisible: project.isVisible ?? true,
          isFeatured: project.isFeatured ?? false,
          status: project.status || 'DRAFT',
          order: project.order || 0,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const addTechStack = () => {
    if (newTech.trim() && !formData.techStack.includes(newTech.trim())) {
      setFormData(prev => ({
        ...prev,
        techStack: [...prev.techStack, newTech.trim()],
      }));
      setNewTech('');
    }
  };

  const removeTechStack = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter(t => t !== tech),
    }));
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to update project');
      }
      router.push('/admin/projects');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center gap-4'>
          <Button variant='ghost' size='sm' className='gap-2'>
            <ArrowLeft className='h-4 w-4' />
            Back
          </Button>
          <div>
            <h1 className='text-3xl font-bold'>Edit Project</h1>
            <p className='text-muted-foreground'>
              Update project details
            </p>
          </div>
        </div>
        <LoadingSkeleton type='form' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center gap-4'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => router.back()}
            className='gap-2'
          >
            <ArrowLeft className='h-4 w-4' />
            Back
          </Button>
          <div>
            <h1 className='text-3xl font-bold'>Edit Project</h1>
            <p className='text-muted-foreground'>
              Update project details
            </p>
          </div>
        </div>
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-4'>
        <Button
          variant='ghost'
          size='sm'
          onClick={() => router.back()}
          className='gap-2'
        >
          <ArrowLeft className='h-4 w-4' />
          Back
        </Button>
        <div>
          <h1 className='text-3xl font-bold'>Edit Project</h1>
          <p className='text-muted-foreground'>
            Update project details
          </p>
        </div>
      </div>

      {error && (
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Essential details about your project
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='title'>Project Title *</Label>
                  <Input
                    id='title'
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder='Enter project title'
                    required
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='slug'>URL Slug</Label>
                  <Input
                    id='slug'
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder='project-url-slug'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='description'>Description *</Label>
                  <Textarea
                    id='description'
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder='Describe your project in detail'
                    rows={4}
                    required
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='excerpt'>Short Excerpt</Label>
                  <Textarea
                    id='excerpt'
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder='Brief summary for previews'
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tech Stack */}
            <Card>
              <CardHeader>
                <CardTitle>Tech Stack</CardTitle>
                <CardDescription>
                  Technologies and tools used in this project
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex gap-2'>
                  <Input
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    placeholder='Add technology (e.g., React, Node.js)'
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechStack())}
                  />
                  <Button type='button' onClick={addTechStack} size='sm'>
                    <Plus className='h-4 w-4' />
                  </Button>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {formData.techStack.map((tech) => (
                    <Badge key={tech} variant='secondary' className='gap-1'>
                      {tech}
                      <button
                        type='button'
                        onClick={() => removeTechStack(tech)}
                        className='ml-1 hover:text-destructive'
                      >
                        <X className='h-3 w-3' />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
                <CardDescription>
                  Key features and functionality of your project
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex gap-2'>
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder='Add feature description'
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  />
                  <Button type='button' onClick={addFeature} size='sm'>
                    <Plus className='h-4 w-4' />
                  </Button>
                </div>
                <div className='space-y-2'>
                  {formData.features.map((feature, index) => (
                    <div key={index} className='flex items-center gap-2 p-2 bg-muted rounded-md'>
                      <span className='flex-1'>{feature}</span>
                      <button
                        type='button'
                        onClick={() => removeFeature(feature)}
                        className='text-destructive hover:text-destructive/80'
                      >
                        <X className='h-4 w-4' />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* URLs */}
            <Card>
              <CardHeader>
                <CardTitle>Project Links</CardTitle>
                <CardDescription>
                  GitHub repository and live demo URLs
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='githubUrl'>GitHub Repository</Label>
                  <Input
                    id='githubUrl'
                    type='url'
                    value={formData.githubUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                    placeholder='https://github.com/username/project'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='demoUrl'>Live Demo</Label>
                  <Input
                    id='demoUrl'
                    type='url'
                    value={formData.demoUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, demoUrl: e.target.value }))}
                    placeholder='https://project-demo.com'
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Project Image */}
            <Card>
              <CardHeader>
                <CardTitle>Project Image</CardTitle>
                <CardDescription>
                  Featured image for your project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  value={formData.imageUrl}
                  onChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
                  placeholder='Upload project image'
                />
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Project visibility and status
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='status'>Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED') =>
                      setFormData(prev => ({ ...prev, status: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='DRAFT'>Draft</SelectItem>
                      <SelectItem value='PUBLISHED'>Published</SelectItem>
                      <SelectItem value='ARCHIVED'>Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='order'>Display Order</Label>
                  <Input
                    id='order'
                    type='number'
                    value={formData.order}
                    onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                    placeholder='0'
                  />
                </div>

                <Separator />

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label>Visible</Label>
                    <p className='text-sm text-muted-foreground'>
                      Show this project on your portfolio
                    </p>
                  </div>
                  <Switch
                    checked={formData.isVisible}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isVisible: checked }))}
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label>Featured</Label>
                    <p className='text-sm text-muted-foreground'>
                      Highlight this project as featured
                    </p>
                  </div>
                  <Switch
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isFeatured: checked }))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Submit Button */}
        <div className='flex items-center justify-end gap-4'>
          <Button
            type='button'
            variant='outline'
            onClick={() => router.back()}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button type='submit' disabled={saving} className='gap-2'>
            {saving ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <Save className='h-4 w-4' />
            )}
            Update Project
          </Button>
        </div>
      </form>
    </div>
  );
} 