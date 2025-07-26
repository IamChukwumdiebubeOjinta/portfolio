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
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  FolderOpen,
  FileText,
  Settings,
  TrendingUp,
  Plus,
  Edit,
  RefreshCw,
  AlertCircle,
  BarChart3,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useDashboard } from '@/hooks/use-dashboard';
import { DashboardIcon } from '@/components/ui/dashboard-icon';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { useSession } from '@/hooks/use-session';

export default function AdminDashboard() {
  const { data, loading, error, refreshData } = useDashboard();
  const { user } = useSession();

  if (loading) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold'>Dashboard</h1>
            <p className='text-muted-foreground'>
              Loading your portfolio data...
            </p>
          </div>
        </div>
        
        <LoadingSkeleton type='stats' count={4} />
      </div>
    );
  }

  if (error) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold'>Dashboard</h1>
            <p className='text-muted-foreground'>
              Welcome back, {user?.username || 'Admin'}! Here's what's happening with your portfolio.
            </p>
          </div>
          <Button onClick={refreshData} className='gap-2'>
            <RefreshCw className='h-4 w-4' />
            Retry
          </Button>
        </div>
        
        <Alert variant='destructive'>
          <AlertCircle className='h-4 w-4' />
          <AlertDescription>
            Failed to load dashboard data: {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!data) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold'>Dashboard</h1>
            <p className='text-muted-foreground'>
              No data available
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>Dashboard</h1>
          <p className='text-muted-foreground'>
            Welcome back, {user?.username || 'Admin'}! Here's what's happening with your portfolio.
          </p>
        </div>
        <div className='flex gap-2'>
          <Button onClick={refreshData} variant='outline' size='sm'>
            <RefreshCw className='h-4 w-4' />
          </Button>
          <Button className='gap-2'>
            <Plus className='h-4 w-4' />
            Quick Add
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {data.stats.map((stat, index) => (
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
                <DashboardIcon name={stat.icon} className='h-4 w-4 text-muted-foreground' />
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
              {data.recentActivities.length > 0 ? (
                data.recentActivities.map((activity) => (
                  <div key={activity.id} className='flex items-center justify-between'>
                    <div>
                      <p className='text-sm font-medium'>{activity.action}</p>
                      <p className='text-sm text-muted-foreground'>
                        {activity.item}
                      </p>
                    </div>
                    <span className='text-xs text-muted-foreground'>
                      {activity.timeAgo}
                    </span>
                  </div>
                ))
              ) : (
                <p className='text-sm text-muted-foreground text-center py-4'>
                  No recent activity
                </p>
              )}
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
              {data.features.length > 0 ? (
                data.features.map((feature, index) => (
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
                ))
              ) : (
                <p className='text-sm text-muted-foreground text-center py-4'>
                  No features configured
                </p>
              )}
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

      {/* Analytics Summary */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <BarChart3 className='h-5 w-5' />
            Analytics Summary
          </CardTitle>
          <CardDescription>Your portfolio performance overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='text-center'>
              <div className='text-2xl font-bold'>{data.analytics.totalPageViews.toLocaleString()}</div>
              <div className='text-sm text-muted-foreground'>Total Page Views</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold'>{data.analytics.uniqueVisitors}</div>
              <div className='text-sm text-muted-foreground'>Unique Visitors</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl font-bold'>{data.analytics.pageViewGrowth > 0 ? '+' : ''}{data.analytics.pageViewGrowth}%</div>
              <div className='text-sm text-muted-foreground'>Growth This Month</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
