import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface LoadingSkeletonProps {
  type?: 'stats' | 'list' | 'table' | 'chart';
  count?: number;
}

export function LoadingSkeleton({ type = 'stats', count = 4 }: LoadingSkeletonProps) {
  if (type === 'stats') {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {[...Array(count)].map((_, i) => (
          <Card key={i} className='animate-pulse'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <div className='h-4 bg-muted rounded w-24' />
              <div className='h-4 w-4 bg-muted rounded' />
            </CardHeader>
            <CardContent>
              <div className='h-8 bg-muted rounded w-16 mb-2' />
              <div className='h-3 bg-muted rounded w-20' />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className='space-y-4'>
        {[...Array(count)].map((_, i) => (
          <div key={i} className='flex items-center justify-between animate-pulse'>
            <div className='space-y-2'>
              <div className='h-4 bg-muted rounded w-32' />
              <div className='h-3 bg-muted rounded w-24' />
            </div>
            <div className='h-3 bg-muted rounded w-16' />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className='space-y-4'>
        {[...Array(count)].map((_, i) => (
          <div key={i} className='flex items-center justify-between animate-pulse'>
            <div className='h-4 bg-muted rounded w-48' />
            <div className='h-4 bg-muted rounded w-20' />
            <div className='h-4 bg-muted rounded w-16' />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'chart') {
    return (
      <div className='space-y-4 animate-pulse'>
        <div className='h-4 bg-muted rounded w-32' />
        <div className='h-64 bg-muted rounded' />
      </div>
    );
  }

  return null;
} 