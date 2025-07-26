import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest, isSessionExpired } from '@/lib/session';

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

    // Fetch dashboard statistics
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
      recentActivities,
    ] = await Promise.all([
      // Project statistics
      prisma.project.count(),
      prisma.project.count({ where: { isVisible: true, status: 'PUBLISHED' } }),
      
      // Blog statistics
      prisma.blog.count(),
      prisma.blog.count({ where: { isPublished: true, status: 'PUBLISHED' } }),
      
      // Contact statistics
      prisma.contact.count(),
      prisma.contact.count({ where: { isRead: false } }),
      
      // Page view statistics
      prisma.pageView.count(),
      prisma.pageView.count({ where: { createdAt: { gte: thisMonth } } }),
      prisma.pageView.count({ where: { createdAt: { gte: thisWeek } } }),
      
      // Recent activities
      prisma.activity.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      }),
    ]);

    // Calculate percentage changes (mock data for now)
    const projectChange = '+2 this month';
    const blogChange = '+1 this week';
    const pageViewChange = '+12% this month';
    const contactChange = '+5 this week';

    const stats = [
      {
        title: 'Total Projects',
        value: totalProjects.toString(),
        change: projectChange,
        icon: 'FolderOpen',
      },
      {
        title: 'Published Projects',
        value: publishedProjects.toString(),
        change: `${Math.round((publishedProjects / totalProjects) * 100)}% published`,
        icon: 'Eye',
      },
      {
        title: 'Blog Posts',
        value: totalBlogs.toString(),
        change: blogChange,
        icon: 'FileText',
      },
      {
        title: 'Published Posts',
        value: publishedBlogs.toString(),
        change: `${Math.round((publishedBlogs / totalBlogs) * 100)}% published`,
        icon: 'CheckCircle',
      },
      {
        title: 'Page Views',
        value: totalPageViews.toLocaleString(),
        change: pageViewChange,
        icon: 'TrendingUp',
      },
      {
        title: 'This Month Views',
        value: thisMonthPageViews.toLocaleString(),
        change: `${Math.round((thisMonthPageViews / totalPageViews) * 100)}% of total`,
        icon: 'Calendar',
      },
      {
        title: 'Contact Forms',
        value: totalContacts.toString(),
        change: contactChange,
        icon: 'Users',
      },
      {
        title: 'Unread Messages',
        value: unreadContacts.toString(),
        change: `${Math.round((unreadContacts / totalContacts) * 100)}% unread`,
        icon: 'Mail',
      },
    ];

    return NextResponse.json({
      success: true,
      stats,
      recentActivities: recentActivities.map(activity => ({
        id: activity.id,
        action: activity.action,
        item: activity.item,
        time: activity.createdAt,
        user: activity.user.username,
      })),
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 