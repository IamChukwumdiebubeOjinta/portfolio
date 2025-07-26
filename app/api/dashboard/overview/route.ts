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
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // Fetch all dashboard data in parallel
    const [
      // Basic counts
      totalProjects,
      publishedProjects,
      totalBlogs,
      publishedBlogs,
      totalContacts,
      unreadContacts,
      totalPageViews,
      thisMonthPageViews,
      thisWeekPageViews,
      
      // Recent data
      recentProjects,
      recentBlogs,
      recentContacts,
      recentActivities,
      
      // Feature settings
      featureSettings,
      
      // Analytics data
      topPages,
      uniqueVisitors,
      
      // Status breakdowns
      projectStatusStats,
      blogStatusStats,
    ] = await Promise.all([
      // Basic counts
      prisma.project.count(),
      prisma.project.count({ where: { isVisible: true, status: 'PUBLISHED' } }),
      prisma.blog.count(),
      prisma.blog.count({ where: { isPublished: true, status: 'PUBLISHED' } }),
      prisma.contact.count(),
      prisma.contact.count({ where: { isRead: false } }),
      prisma.pageView.count(),
      prisma.pageView.count({ where: { createdAt: { gte: thisMonth } } }),
      prisma.pageView.count({ where: { createdAt: { gte: thisWeek } } }),
      
      // Recent projects
      prisma.project.findMany({
        take: 5,
        orderBy: { updatedAt: 'desc' },
        select: {
          id: true,
          title: true,
          status: true,
          isVisible: true,
          updatedAt: true,
          views: true,
        },
      }),
      
      // Recent blogs
      prisma.blog.findMany({
        take: 5,
        orderBy: { updatedAt: 'desc' },
        select: {
          id: true,
          title: true,
          status: true,
          isPublished: true,
          updatedAt: true,
          views: true,
        },
      }),
      
      // Recent contacts
      prisma.contact.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          subject: true,
          isRead: true,
          createdAt: true,
        },
      }),
      
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
      
      // Feature settings
      prisma.setting.findMany({
        where: {
          key: {
            in: [
              'blog_enabled',
              'contact_form_enabled',
              'testimonials_enabled',
              'hire_me_banner_enabled',
            ],
          },
        },
        select: {
          key: true,
          value: true,
          description: true,
        },
      }),
      
      // Top pages
      prisma.pageView.groupBy({
        by: ['path'],
        _count: { path: true },
        orderBy: { _count: { path: 'desc' } },
        take: 10,
      }),
      
      // Unique visitors
      prisma.pageView.groupBy({
        by: ['ipAddress'],
        where: { 
          createdAt: { gte: thisMonth },
          ipAddress: { not: null }
        },
        _count: { ipAddress: true },
      }),
      
      // Project status stats
      prisma.project.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
      
      // Blog status stats
      prisma.blog.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
    ]);

    // Calculate growth percentages
    const lastMonthPageViews = await prisma.pageView.count({
      where: { 
        createdAt: { 
          gte: lastMonth,
          lt: thisMonth 
        } 
      },
    });

    const pageViewGrowth = lastMonthPageViews > 0 
      ? ((thisMonthPageViews - lastMonthPageViews) / lastMonthPageViews) * 100
      : 0;

    // Format stats
    const stats = [
      {
        title: 'Total Projects',
        value: totalProjects.toString(),
        change: '+2 this month',
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
        change: '+1 this week',
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
        change: `${Math.round(pageViewGrowth * 100) / 100}% this month`,
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
        change: '+5 this week',
        icon: 'Users',
      },
      {
        title: 'Unread Messages',
        value: unreadContacts.toString(),
        change: `${Math.round((unreadContacts / totalContacts) * 100)}% unread`,
        icon: 'Mail',
      },
    ];

    // Format recent data
    const formattedRecentProjects = recentProjects.map(project => ({
      id: project.id,
      title: project.title,
      status: project.status,
      isVisible: project.isVisible,
      updatedAt: project.updatedAt,
      views: project.views,
      timeAgo: getTimeAgo(project.updatedAt),
    }));

    const formattedRecentBlogs = recentBlogs.map(blog => ({
      id: blog.id,
      title: blog.title,
      status: blog.status,
      isPublished: blog.isPublished,
      updatedAt: blog.updatedAt,
      views: blog.views,
      timeAgo: getTimeAgo(blog.updatedAt),
    }));

    const formattedRecentContacts = recentContacts.map(contact => ({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      subject: contact.subject,
      isRead: contact.isRead,
      createdAt: contact.createdAt,
      timeAgo: getTimeAgo(contact.createdAt),
    }));

    const formattedRecentActivities = recentActivities.map(activity => ({
      id: activity.id,
      action: activity.action,
      item: activity.item,
      time: activity.createdAt,
      user: activity.user.username,
      timeAgo: getTimeAgo(activity.createdAt),
    }));

    // Format features
    const features = featureSettings.map(setting => ({
      name: setting.key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      enabled: setting.value === 'true',
      description: setting.description,
    }));

    // Format analytics
    const topPagesData = topPages.map(page => ({
      path: page.path,
      views: page._count.path,
    }));

    // Format status stats
    const projectStatusData = projectStatusStats.reduce((acc, stat) => {
      acc[stat.status.toLowerCase()] = stat._count.status;
      return acc;
    }, {} as Record<string, number>);

    const blogStatusData = blogStatusStats.reduce((acc, stat) => {
      acc[stat.status.toLowerCase()] = stat._count.status;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      success: true,
      dashboard: {
        stats,
        recentProjects: formattedRecentProjects,
        recentBlogs: formattedRecentBlogs,
        recentContacts: formattedRecentContacts,
        recentActivities: formattedRecentActivities,
        features,
        analytics: {
          topPages: topPagesData,
          uniqueVisitors: uniqueVisitors.length,
          totalPageViews,
          thisMonthPageViews,
          pageViewGrowth: Math.round(pageViewGrowth * 100) / 100,
        },
        statusStats: {
          projects: projectStatusData,
          blogs: blogStatusData,
        },
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