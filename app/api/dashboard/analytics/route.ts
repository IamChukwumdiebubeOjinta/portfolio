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

    // Fetch analytics data
    const [
      totalPageViews,
      thisMonthPageViews,
      thisWeekPageViews,
      lastMonthPageViews,
      topPages,
      uniqueVisitors,
      pageViewsByDay,
      projectViews,
      blogViews,
    ] = await Promise.all([
      // Total page views
      prisma.pageView.count(),
      
      // This month's page views
      prisma.pageView.count({ 
        where: { createdAt: { gte: thisMonth } } 
      }),
      
      // This week's page views
      prisma.pageView.count({ 
        where: { createdAt: { gte: thisWeek } } 
      }),
      
      // Last month's page views
      prisma.pageView.count({ 
        where: { 
          createdAt: { 
            gte: lastMonth,
            lt: thisMonth 
          } 
        } 
      }),
      
      // Top pages
      prisma.pageView.groupBy({
        by: ['path'],
        _count: { path: true },
        orderBy: { _count: { path: 'desc' } },
        take: 10,
      }),
      
      // Unique visitors this month
      prisma.pageView.groupBy({
        by: ['ipAddress'],
        where: { 
          createdAt: { gte: thisMonth },
          ipAddress: { not: null }
        },
        _count: { ipAddress: true },
      }),
      
      // Page views by day (last 30 days)
      prisma.$queryRaw`
        SELECT 
          DATE(created_at) as date,
          COUNT(*) as views
        FROM page_views 
        WHERE created_at >= NOW() - INTERVAL '30 days'
        GROUP BY DATE(created_at)
        ORDER BY date DESC
      `,
      
      // Project views
      prisma.project.findMany({
        select: {
          id: true,
          title: true,
          views: true,
        },
        orderBy: { views: 'desc' },
        take: 10,
      }),
      
      // Blog views
      prisma.blog.findMany({
        select: {
          id: true,
          title: true,
          views: true,
        },
        orderBy: { views: 'desc' },
        take: 10,
      }),
    ]);

    // Calculate growth percentages
    const pageViewGrowth = lastMonthPageViews > 0 
      ? ((thisMonthPageViews - lastMonthPageViews) / lastMonthPageViews) * 100
      : 0;

    const weekGrowth = thisWeekPageViews > 0 
      ? ((thisWeekPageViews - (lastMonthPageViews / 4)) / (lastMonthPageViews / 4)) * 100
      : 0;

    // Format top pages
    const topPagesData = topPages.map(page => ({
      path: page.path,
      views: page._count.path,
    }));

    // Format page views by day
    const pageViewsByDayData = (pageViewsByDay as any[]).map(day => ({
      date: day.date,
      views: Number(day.views),
    }));

    // Format project views
    const projectViewsData = projectViews.map(project => ({
      id: project.id,
      title: project.title,
      views: project.views,
    }));

    // Format blog views
    const blogViewsData = blogViews.map(blog => ({
      id: blog.id,
      title: blog.title,
      views: blog.views,
    }));

    return NextResponse.json({
      success: true,
      analytics: {
        overview: {
          totalPageViews,
          thisMonthPageViews,
          thisWeekPageViews,
          pageViewGrowth: Math.round(pageViewGrowth * 100) / 100,
          weekGrowth: Math.round(weekGrowth * 100) / 100,
          uniqueVisitors: uniqueVisitors.length,
        },
        topPages: topPagesData,
        pageViewsByDay: pageViewsByDayData,
        topProjects: projectViewsData,
        topBlogs: blogViewsData,
      },
    });

  } catch (error) {
    console.error('Dashboard analytics error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 