import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/session';

// GET /api/projects - Get all projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const isVisible = searchParams.get('isVisible');
    const isFeatured = searchParams.get('isFeatured');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    
    if (status) where.status = status;
    if (isVisible !== null) where.isVisible = isVisible === 'true';
    if (isFeatured !== null) where.isFeatured = isFeatured === 'true';
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get projects with related data
    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
          images: {
            orderBy: { order: 'asc' },
          },
          tags: true,
        },
        orderBy: [
          { order: 'asc' },
          { createdAt: 'desc' },
        ],
        skip,
        take: limit,
      }),
      prisma.project.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: {
        projects,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
    });
  } catch (error) {
    console.error('Projects fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create new project
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      description,
      slug,
      excerpt,
      techStack,
      features,
      githubUrl,
      demoUrl,
      imageUrl,
      isVisible,
      isFeatured,
      status,
      order,
      tagIds,
      images,
    } = body;

    // Validate required fields
    if (!title || !description || !slug) {
      return NextResponse.json(
        { error: 'Title, description, and slug are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingProject = await prisma.project.findUnique({
      where: { slug },
    });

    if (existingProject) {
      return NextResponse.json(
        { error: 'Project with this slug already exists' },
        { status: 400 }
      );
    }

    // Create project with related data
    const project = await prisma.project.create({
      data: {
        title,
        description,
        slug,
        excerpt,
        techStack: techStack || [],
        features: features || [],
        githubUrl,
        demoUrl,
        imageUrl,
        isVisible: isVisible ?? true,
        isFeatured: isFeatured ?? false,
        status: status || 'DRAFT',
        order: order || 0,
        authorId: session.userId,

        images: images ? {
          create: images.map((img: any, index: number) => ({
            url: img.url,
            alt: img.alt,
            caption: img.caption,
            type: img.type || 'gallery',
            order: img.order || index,
            isPrimary: img.isPrimary || false,
            width: img.width,
            height: img.height,
            fileSize: img.fileSize,
          })),
        } : undefined,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        images: true,
        tags: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('Project creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
} 