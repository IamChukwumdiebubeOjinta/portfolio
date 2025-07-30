import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest, isSessionExpired } from '@/lib/session';
import { prisma } from '@/lib/prisma';

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

    // Fetch recent activities
    const activities = await prisma.activity.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    // Format activities
    const formattedActivities = activities.map(activity => ({
      id: activity.id,
      action: activity.action,
      item: activity.item,
      time: activity.createdAt,
      user: activity.user.username,
      timeAgo: getTimeAgo(activity.createdAt),
    }));

    return NextResponse.json({
      success: true,
      activities: formattedActivities,
    });

  } catch (error) {
    console.error('Dashboard activities error:', error);
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