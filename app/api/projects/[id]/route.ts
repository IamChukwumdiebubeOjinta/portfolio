import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/session';

// GET /api/projects/[id] - Get single project
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.project.findUnique({
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

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('Project fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[id] - Update project
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

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id: params.id },
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Check if slug already exists (if changed)
    if (slug && slug !== existingProject.slug) {
      const slugExists = await prisma.project.findUnique({
        where: { slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: 'Project with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // Update project
    const project = await prisma.project.update({
      where: { id: params.id },
      data: {
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
        tags: tagIds ? {
          set: tagIds.map((id: string) => ({ id })),
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
        images: {
          orderBy: { order: 'asc' },
        },
        tags: true,
      },
    });

    // Update images if provided
    if (images) {
      // Delete existing images
      await prisma.projectImage.deleteMany({
        where: { projectId: params.id },
      });

      // Create new images
      await prisma.projectImage.createMany({
        data: images.map((img: any, index: number) => ({
          projectId: params.id,
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
      });
    }

    // Fetch updated project with images
    const updatedProject = await prisma.project.findUnique({
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

    return NextResponse.json({
      success: true,
      data: updatedProject,
    });
  } catch (error) {
    console.error('Project update error:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id] - Delete project
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

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id: params.id },
      include: { images: true },
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Delete project (images will be deleted via cascade)
    await prisma.project.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    console.error('Project deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
} 