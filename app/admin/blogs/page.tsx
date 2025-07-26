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
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Calendar,
  Eye,
  EyeOff,
} from 'lucide-react';
import { motion } from 'framer-motion';

const mockBlogs = [
  {
    id: '1',
    title: 'How I Architected an AI Chat App with Vercel AI SDK + Prisma',
    slug: 'ai-chat-app-architecture',
    excerpt:
      'Deep dive into building scalable AI applications with modern tools',
    tags: ['AI', 'Architecture', 'Vercel', 'Prisma'],
    published: true,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-22',
  },
  {
    id: '2',
    title: 'Streaming, Summarizing & Saving: Lessons from Building Uloma',
    slug: 'lessons-from-building-uloma',
    excerpt:
      'Real-world insights from developing an AI-powered family storytelling tool',
    tags: ['AI', 'Streaming', 'BullMQ', 'Lessons'],
    published: true,
    createdAt: '2024-02-15',
    updatedAt: '2024-02-15',
  },
  {
    id: '3',
    title: "Front-End First Doesn't Mean Back-End Weak",
    slug: 'frontend-first-backend-strong',
    excerpt: 'Why full-stack developers should embrace their frontend skills',
    tags: ['Frontend', 'Backend', 'Philosophy'],
    published: false,
    createdAt: '2024-03-01',
    updatedAt: '2024-03-10',
  },
];

export default function BlogManager() {
  const router = useRouter();
  const [blogs, setBlogs] = useState(mockBlogs);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBlogs = blogs.filter(
    blog =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some(tag =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const togglePublished = (id: string) => {
    setBlogs(
      blogs.map(blog =>
        blog.id === id ? { ...blog, published: !blog.published } : blog
      )
    );
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>Blog Manager</h1>
          <p className='text-muted-foreground'>
            Create and manage your blog posts
          </p>
        </div>
        <Button 
          className='gap-2'
          onClick={() => router.push('/admin/blogs/create')}
        >
          <Plus className='h-4 w-4' />
          New Post
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className='pt-6'>
          <div className='flex items-center gap-4'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search blog posts...'
                className='pl-10'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <Badge variant='outline'>{filteredBlogs.length} posts</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Blog Posts List */}
      <div className='grid gap-6'>
        {filteredBlogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className='flex items-start justify-between'>
                  <div className='space-y-2 flex-1'>
                    <div className='flex items-center gap-2'>
                      <CardTitle className='text-xl'>{blog.title}</CardTitle>
                      <div className='flex items-center gap-2'>
                        {blog.published ? (
                          <Eye className='h-4 w-4 text-green-500' />
                        ) : (
                          <EyeOff className='h-4 w-4 text-muted-foreground' />
                        )}
                        <Switch
                          checked={blog.published}
                          onCheckedChange={() => togglePublished(blog.id)}
                        />
                      </div>
                    </div>
                    <CardDescription>{blog.excerpt}</CardDescription>
                    <div className='flex flex-wrap gap-2'>
                      {blog.tags.map(tag => (
                        <Badge
                          key={tag}
                          variant='secondary'
                          className='text-xs'
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                      <div className='flex items-center gap-1'>
                        <Calendar className='h-3 w-3' />
                        Created: {new Date(blog.createdAt).toLocaleDateString()}
                      </div>
                      <div className='flex items-center gap-1'>
                        <Calendar className='h-3 w-3' />
                        Updated: {new Date(blog.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button 
                      variant='ghost' 
                      size='icon'
                      onClick={() => router.push(`/admin/blogs/${blog.id}/edit`)}
                    >
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
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>
                    /{blog.slug}
                  </span>
                  <Badge variant={blog.published ? 'default' : 'secondary'}>
                    {blog.published ? 'Published' : 'Draft'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <Card>
          <CardContent className='text-center py-12'>
            <p className='text-muted-foreground'>
              No blog posts found matching your search.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
