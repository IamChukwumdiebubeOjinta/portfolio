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

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '7d'; // 7d, 30d, 90d

    // Calculate date range based on period
    const now = new Date();
    let startDate: Date;
    
    switch (period) {
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default: // 7d
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    // Fetch analytics data
    const [
      totalPageViews,
      periodPageViews,
      topPages,
      dailyViews,
      uniqueVisitors,
      referrers,
    ] = await Promise.all([
      // Total page views
      prisma.pageView.count(),
      
      // Page views in period
      prisma.pageView.count({
        where: { createdAt: { gte: startDate } },
      }),
      
      // Top pages by views
      prisma.pageView.groupBy({
        by: ['path'],
        where: { createdAt: { gte: startDate } },
        _count: { path: true },
        orderBy: { _count: { path: 'desc' } },
        take: 10,
      }),
      
      // Daily page views for chart
      prisma.$queryRaw`
        SELECT 
          DATE(created_at) as date,
          COUNT(*) as views
        FROM page_views 
        WHERE created_at >= ${startDate}
        GROUP BY DATE(created_at)
        ORDER BY date ASC
      `,
      
      // Unique visitors (by IP)
      prisma.pageView.groupBy({
        by: ['ipAddress'],
        where: { 
          createdAt: { gte: startDate },
          ipAddress: { not: null }
        },
        _count: { ipAddress: true },
      }),
      
      // Top referrers
      prisma.pageView.groupBy({
        by: ['referrer'],
        where: { 
          createdAt: { gte: startDate },
          referrer: { not: null }
        },
        _count: { referrer: true },
        orderBy: { _count: { referrer: 'desc' } },
        take: 10,
      }),
    ]);

    // Calculate growth percentage
    const previousPeriodStart = new Date(startDate.getTime() - (now.getTime() - startDate.getTime()));
    const previousPeriodViews = await prisma.pageView.count({
      where: { 
        createdAt: { 
          gte: previousPeriodStart,
          lt: startDate 
        } 
      },
    });

    const growthPercentage = previousPeriodViews > 0 
      ? ((periodPageViews - previousPeriodViews) / previousPeriodViews) * 100
      : 0;

    // Format daily views data
    const formattedDailyViews = (dailyViews as any[]).map((day: any) => ({
      date: day.date,
      views: parseInt(day.views),
    }));

    // Format top pages data
    const formattedTopPages = topPages.map(page => ({
      path: page.path,
      views: page._count.path,
    }));

    // Format referrers data
    const formattedReferrers = referrers
      .filter(ref => ref.referrer && ref.referrer !== '')
      .map(ref => ({
        referrer: ref.referrer,
        visits: ref._count.referrer,
      }));

    return NextResponse.json({
      success: true,
      analytics: {
        period,
        totalPageViews,
        periodPageViews,
        uniqueVisitors: uniqueVisitors.length,
        growthPercentage: Math.round(growthPercentage * 100) / 100,
        dailyViews: formattedDailyViews,
        topPages: formattedTopPages,
        referrers: formattedReferrers,
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