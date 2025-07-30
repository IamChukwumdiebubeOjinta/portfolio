import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest, isSessionExpired } from '@/lib/session';

// Force dynamic rendering since this route uses cookies for authentication
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getSessionFromRequest(request);
    if (!session || isSessionExpired(session)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch overview data
    const [
      totalProjects,
      totalBlogs,
      totalContacts,
      recentActivity,
      projectStats,
      blogStats,
      contactStats,
    ] = await Promise.all([
      // Total counts
      prisma.project.count(),
      prisma.blog.count(),
      prisma.contact.count(),
      
      // Recent activity (last 7 days)
      prisma.$queryRaw`
        SELECT 
          'project' as type,
          id,
          title,
          updated_at as date
        FROM projects 
        WHERE updated_at >= NOW() - INTERVAL '7 days'
        UNION ALL
        SELECT 
          'blog' as type,
          id,
          title,
          updated_at as date
        FROM blogs 
        WHERE updated_at >= NOW() - INTERVAL '7 days'
        UNION ALL
        SELECT 
          'contact' as type,
          id,
          name as title,
          created_at as date
        FROM contacts 
        WHERE created_at >= NOW() - INTERVAL '7 days'
        ORDER BY date DESC
        LIMIT 10
      `,
      
      // Project statistics
      prisma.project.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
      
      // Blog statistics
      prisma.blog.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
      
      // Contact statistics (read vs unread)
      prisma.contact.groupBy({
        by: ['isRead'],
        _count: { isRead: true },
      }),
    ]);

    // Format recent activity
    const formattedActivity = (recentActivity as any[]).map(item => ({
      id: item.id,
      type: item.type,
      title: item.title,
      date: item.date,
      timeAgo: getTimeAgo(new Date(item.date)),
    }));

    // Calculate project stats
    const projectStatusStats = projectStats.reduce((acc, stat) => {
      acc[stat.status.toLowerCase()] = stat._count.status;
      return acc;
    }, {} as Record<string, number>);

    // Calculate blog stats
    const blogStatusStats = blogStats.reduce((acc, stat) => {
      acc[stat.status.toLowerCase()] = stat._count.status;
      return acc;
    }, {} as Record<string, number>);

    // Calculate contact stats
    const contactReadStats = contactStats.reduce((acc, stat) => {
      acc[stat.isRead ? 'read' : 'unread'] = stat._count.isRead;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      success: true,
      overview: {
        totals: {
          projects: totalProjects,
          blogs: totalBlogs,
          contacts: totalContacts,
        },
        recentActivity: formattedActivity,
        projectStats: projectStatusStats,
        blogStats: blogStatusStats,
        contactStats: contactReadStats,
      },
    });

  } catch (error) {
    console.error('Dashboard overview error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to format time ago
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
} 