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

interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  isPublished: boolean;
  isFeatured: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  metaTitle: string;
  metaDescription: string;
  featuredImage: string;
  readTime: number;
  tags: string[];
}

export default function CreateBlog() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newTag, setNewTag] = useState('');

  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    isPublished: false,
    isFeatured: false,
    status: 'DRAFT',
    metaTitle: '',
    metaDescription: '',
    featuredImage: '',
    readTime: 0,
    tags: [],
  });

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
      metaTitle: title,
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag),
    }));
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      content,
      readTime: calculateReadTime(content),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: [], // Skip tags for now
        }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to create blog post');
      }
      router.push('/admin/blogs');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className='text-3xl font-bold'>Create New Blog Post</h1>
          <p className='text-muted-foreground'>
            Write and publish a new blog post
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
                  Essential details about your blog post
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='title'>Blog Title *</Label>
                  <Input
                    id='title'
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder='Enter blog post title'
                    required
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='slug'>URL Slug</Label>
                  <Input
                    id='slug'
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder='blog-post-url-slug'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='excerpt'>Excerpt *</Label>
                  <Textarea
                    id='excerpt'
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder='Brief summary of your blog post'
                    rows={3}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Content */}
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
                <CardDescription>
                  Write your blog post content
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='content'>Blog Content *</Label>
                  <Textarea
                    id='content'
                    value={formData.content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    placeholder='Write your blog post content here...'
                    rows={15}
                    required
                  />
                </div>
                <div className='text-sm text-muted-foreground'>
                  Estimated read time: {formData.readTime} minutes
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <CardDescription>
                  Add relevant tags to help readers find your post
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex gap-2'>
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder='Add tag (e.g., React, AI, Tutorial)'
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type='button' onClick={addTag} size='sm'>
                    <Plus className='h-4 w-4' />
                  </Button>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant='secondary' className='gap-1'>
                      {tag}
                      <button
                        type='button'
                        onClick={() => removeTag(tag)}
                        className='ml-1 hover:text-destructive'
                      >
                        <X className='h-3 w-3' />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Featured Image */}
            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
                <CardDescription>
                  Main image for your blog post
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  value={formData.featuredImage}
                  onChange={(url) => setFormData(prev => ({ ...prev, featuredImage: url }))}
                  placeholder='Upload featured image'
                  type="blog"
                  imageType="featured"
                  slug={formData.slug}
                />
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>
                  Optimize your post for search engines
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='metaTitle'>Meta Title</Label>
                  <Input
                    id='metaTitle'
                    value={formData.metaTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                    placeholder='SEO title for search engines'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='metaDescription'>Meta Description</Label>
                  <Textarea
                    id='metaDescription'
                    value={formData.metaDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                    placeholder='Brief description for search results'
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Publication and visibility settings
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

                <Separator />

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label>Published</Label>
                    <p className='text-sm text-muted-foreground'>
                      Make this post publicly visible
                    </p>
                  </div>
                  <Switch
                    checked={formData.isPublished}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPublished: checked }))}
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div className='space-y-0.5'>
                    <Label>Featured</Label>
                    <p className='text-sm text-muted-foreground'>
                      Highlight this post as featured
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
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type='submit' disabled={loading} className='gap-2'>
            {loading ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <Save className='h-4 w-4' />
            )}
            Create Blog Post
          </Button>
        </div>
      </form>
    </div>
  );
} 