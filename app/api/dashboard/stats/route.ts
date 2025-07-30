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

    // Get current date for calculations
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // Fetch all statistics in parallel
    const [
      totalProjects,
      publishedProjects,
      totalBlogs,
      publishedBlogs,
      totalContacts,
      unreadContacts,
      totalPageViews,
      thisMonthPageViews,
      thisWeekPageViews,
      projectStatusStats,
      blogStatusStats,
      contactReadStats,
    ] = await Promise.all([
      // Project counts
      prisma.project.count(),
      prisma.project.count({ where: { isVisible: true, status: 'PUBLISHED' } }),
      
      // Blog counts
      prisma.blog.count(),
      prisma.blog.count({ where: { isPublished: true, status: 'PUBLISHED' } }),
      
      // Contact counts
      prisma.contact.count(),
      prisma.contact.count({ where: { isRead: false } }),
      
      // Page view counts
      prisma.pageView.count(),
      prisma.pageView.count({ where: { createdAt: { gte: thisMonth } } }),
      prisma.pageView.count({ where: { createdAt: { gte: thisWeek } } }),
      
      // Status breakdowns
      prisma.project.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
      
      prisma.blog.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
      
      prisma.contact.groupBy({
        by: ['isRead'],
        _count: { isRead: true },
      }),
    ]);

    // Calculate last month's page views for growth comparison
    const lastMonthPageViews = await prisma.pageView.count({
      where: { 
        createdAt: { 
          gte: lastMonth,
          lt: thisMonth 
        } 
      },
    });

    // Calculate growth percentages
    const pageViewGrowth = lastMonthPageViews > 0 
      ? ((thisMonthPageViews - lastMonthPageViews) / lastMonthPageViews) * 100
      : 0;

    // Format status statistics
    const projectStatusData = projectStatusStats.reduce((acc, stat) => {
      acc[stat.status.toLowerCase()] = stat._count.status;
      return acc;
    }, {} as Record<string, number>);

    const blogStatusData = blogStatusStats.reduce((acc, stat) => {
      acc[stat.status.toLowerCase()] = stat._count.status;
      return acc;
    }, {} as Record<string, number>);

    const contactReadData = contactReadStats.reduce((acc, stat) => {
      acc[stat.isRead ? 'read' : 'unread'] = stat._count.isRead;
      return acc;
    }, {} as Record<string, number>);

    // Format stats for dashboard
    const stats = [
      {
        title: 'Total Projects',
        value: totalProjects.toString(),
        change: `${Math.round((publishedProjects / totalProjects) * 100)}% published`,
        icon: 'FolderOpen',
        trend: 'up',
      },
      {
        title: 'Published Projects',
        value: publishedProjects.toString(),
        change: `${Math.round((publishedProjects / totalProjects) * 100)}% of total`,
        icon: 'Eye',
        trend: 'up',
      },
      {
        title: 'Blog Posts',
        value: totalBlogs.toString(),
        change: `${Math.round((publishedBlogs / totalBlogs) * 100)}% published`,
        icon: 'FileText',
        trend: 'up',
      },
      {
        title: 'Published Posts',
        value: publishedBlogs.toString(),
        change: `${Math.round((publishedBlogs / totalBlogs) * 100)}% of total`,
        icon: 'CheckCircle',
        trend: 'up',
      },
      {
        title: 'Page Views',
        value: totalPageViews.toLocaleString(),
        change: `${Math.round(pageViewGrowth * 100) / 100}% this month`,
        icon: 'TrendingUp',
        trend: pageViewGrowth > 0 ? 'up' : 'down',
      },
      {
        title: 'This Month Views',
        value: thisMonthPageViews.toLocaleString(),
        change: `${Math.round((thisMonthPageViews / totalPageViews) * 100)}% of total`,
        icon: 'Calendar',
        trend: 'up',
      },
      {
        title: 'Contact Forms',
        value: totalContacts.toString(),
        change: `${Math.round((unreadContacts / totalContacts) * 100)}% unread`,
        icon: 'Users',
        trend: 'up',
      },
      {
        title: 'Unread Messages',
        value: unreadContacts.toString(),
        change: `${Math.round((unreadContacts / totalContacts) * 100)}% of total`,
        icon: 'Mail',
        trend: 'neutral',
      },
    ];

    return NextResponse.json({
      success: true,
      stats,
      breakdowns: {
        projects: projectStatusData,
        blogs: blogStatusData,
        contacts: contactReadData,
      },
      analytics: {
        totalPageViews,
        thisMonthPageViews,
        thisWeekPageViews,
        pageViewGrowth: Math.round(pageViewGrowth * 100) / 100,
      },
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 