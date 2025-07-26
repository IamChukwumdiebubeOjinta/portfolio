import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/session';

// GET /api/blogs - Get all blogs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const isPublished = searchParams.get('isPublished');
    const isFeatured = searchParams.get('isFeatured');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    
    if (status) where.status = status;
    if (isPublished !== null) where.isPublished = isPublished === 'true';
    if (isFeatured !== null) where.isFeatured = isFeatured === 'true';
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Get blogs with related data
    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
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
          { publishedAt: 'desc' },
          { createdAt: 'desc' },
        ],
        skip,
        take: limit,
      }),
      prisma.blog.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: {
        blogs,
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
    console.error('Blogs fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST /api/blogs - Create new blog
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
      slug,
      excerpt,
      content,
      isPublished,
      isFeatured,
      status,
      metaTitle,
      metaDescription,
      featuredImage,
      readTime,
      tagIds,
      images,
    } = body;

    // Validate required fields
    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json(
        { error: 'Title, slug, excerpt, and content are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingBlog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (existingBlog) {
      return NextResponse.json(
        { error: 'Blog with this slug already exists' },
        { status: 400 }
      );
    }

    // Create blog with related data
    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        isPublished: isPublished ?? false,
        isFeatured: isFeatured ?? false,
        status: status || 'DRAFT',
        metaTitle,
        metaDescription,
        featuredImage,
        readTime,
        publishedAt: isPublished ? new Date() : null,
        authorId: session.userId,
        // Note: For now, we'll skip tags since the form sends tags as strings
        // TODO: Implement tag creation/linking logic
        images: images ? {
          create: images.map((img: any, index: number) => ({
            url: img.url,
            alt: img.alt,
            caption: img.caption,
            type: img.type || 'content',
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
      data: blog,
    });
  } catch (error) {
    console.error('Blog creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
} 