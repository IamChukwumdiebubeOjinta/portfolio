import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/session';

// Force dynamic rendering since this route uses cookies for authentication
export const dynamic = 'force-dynamic';

// GET /api/blogs/[id] - Get single blog
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
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
    });

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error('Blog fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

// PUT /api/blogs/[id] - Update blog
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { id: params.id },
    });

    if (!existingBlog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Check if slug already exists (if changed)
    if (slug && slug !== existingBlog.slug) {
      const slugExists = await prisma.blog.findUnique({
        where: { slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: 'Blog with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // Update blog
    const blog = await prisma.blog.update({
      where: { id: params.id },
      data: {
        title,
        slug,
        excerpt,
        content,
        isPublished: isPublished ?? existingBlog.isPublished,
        isFeatured: isFeatured ?? existingBlog.isFeatured,
        status: status || existingBlog.status,
        metaTitle,
        metaDescription,
        featuredImage,
        readTime,
        publishedAt: isPublished && !existingBlog.isPublished ? new Date() : existingBlog.publishedAt,
        tags: tagIds ? {
          set: [],
          connect: tagIds.map((id: string) => ({ id })),
        } : undefined,
        images: images ? {
          deleteMany: {},
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
    console.error('Blog update error:', error);
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

// DELETE /api/blogs/[id] - Delete blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { id: params.id },
    });

    if (!existingBlog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Delete blog (cascade will handle related data)
    await prisma.blog.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    console.error('Blog deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
} 