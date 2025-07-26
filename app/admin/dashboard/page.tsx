'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FolderOpen,
  FileText,
  Settings,
  Eye,
  Users,
  TrendingUp,
  Plus,
  Edit,
} from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  {
    title: 'Total Projects',
    value: '12',
    icon: FolderOpen,
    change: '+2 this month',
  },
  { title: 'Blog Posts', value: '8', icon: FileText, change: '+1 this week' },
  { title: 'Page Views', value: '2,847', icon: Eye, change: '+12% this month' },
  { title: 'Contact Forms', value: '23', icon: Users, change: '+5 this week' },
];

const recentActivity = [
  {
    action: 'Updated project',
    item: 'Uloma AI Assistant',
    time: '2 hours ago',
  },
  {
    action: 'Published blog post',
    item: 'Building AI Applications',
    time: '1 day ago',
  },
  { action: 'Toggled feature', item: 'Contact Form', time: '3 days ago' },
  { action: 'Added project', item: 'WaveFound Platform', time: '1 week ago' },
];

const features = [
  { name: 'Blog Section', enabled: true },
  { name: 'Contact Form', enabled: true },
  { name: 'Testimonials', enabled: false },
  { name: 'Hire Me Banner', enabled: true },
];

export default function AdminDashboard() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>Dashboard</h1>
          <p className='text-muted-foreground'>
            Welcome back, Ebube! Here's what's happening with your portfolio.
          </p>
        </div>
        <Button className='gap-2'>
          <Plus className='h-4 w-4' />
          Quick Add
        </Button>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  {stat.title}
                </CardTitle>
                <stat.icon className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{stat.value}</div>
                <p className='text-xs text-muted-foreground'>{stat.change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <TrendingUp className='h-5 w-5' />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest portfolio updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {recentActivity.map((activity, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm font-medium'>{activity.action}</p>
                    <p className='text-sm text-muted-foreground'>
                      {activity.item}
                    </p>
                  </div>
                  <span className='text-xs text-muted-foreground'>
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feature Status */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Settings className='h-5 w-5' />
              Feature Status
            </CardTitle>
            <CardDescription>Manage your portfolio features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {features.map((feature, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <span className='text-sm font-medium'>{feature.name}</span>
                  <div className='flex items-center gap-2'>
                    <Badge variant={feature.enabled ? 'default' : 'secondary'}>
                      {feature.enabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                    <Button variant='ghost' size='sm'>
                      <Edit className='h-3 w-3' />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to manage your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <Button
              variant='outline'
              className='h-20 flex-col gap-2 bg-transparent'
            >
              <FolderOpen className='h-6 w-6' />
              Add New Project
            </Button>
            <Button
              variant='outline'
              className='h-20 flex-col gap-2 bg-transparent'
            >
              <FileText className='h-6 w-6' />
              Write Blog Post
            </Button>
            <Button
              variant='outline'
              className='h-20 flex-col gap-2 bg-transparent'
            >
              <Settings className='h-6 w-6' />
              Update Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
