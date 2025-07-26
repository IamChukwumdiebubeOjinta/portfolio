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

    // Fetch quick data
    const [
      recentProjects,
      recentBlogs,
      recentContacts,
      featureSettings,
      projectStats,
      blogStats,
    ] = await Promise.all([
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
      
      // Recent blog posts
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
    ]);

    // Format recent projects
    const formattedProjects = recentProjects.map(project => ({
      id: project.id,
      title: project.title,
      status: project.status,
      isVisible: project.isVisible,
      updatedAt: project.updatedAt,
      views: project.views,
      timeAgo: getTimeAgo(project.updatedAt),
    }));

    // Format recent blogs
    const formattedBlogs = recentBlogs.map(blog => ({
      id: blog.id,
      title: blog.title,
      status: blog.status,
      isPublished: blog.isPublished,
      updatedAt: blog.updatedAt,
      views: blog.views,
      timeAgo: getTimeAgo(blog.updatedAt),
    }));

    // Format recent contacts
    const formattedContacts = recentContacts.map(contact => ({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      subject: contact.subject,
      isRead: contact.isRead,
      createdAt: contact.createdAt,
      timeAgo: getTimeAgo(contact.createdAt),
    }));

    // Format feature settings
    const features = featureSettings.map(setting => ({
      name: setting.key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      enabled: setting.value === 'true',
      description: setting.description,
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

    return NextResponse.json({
      success: true,
      quickData: {
        recentProjects: formattedProjects,
        recentBlogs: formattedBlogs,
        recentContacts: formattedContacts,
        features,
        projectStats: projectStatusStats,
        blogStats: blogStatusStats,
      },
    });

  } catch (error) {
    console.error('Dashboard quick data error:', error);
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