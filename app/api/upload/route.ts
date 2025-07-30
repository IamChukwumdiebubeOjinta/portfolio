import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { validateImageFile, generateImagePath, generateUniqueFilename } from '@/lib/image-utils';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as 'project' | 'blog';
    const imageType = formData.get('imageType') as string;
    const slug = formData.get('slug') as string;
    const index = formData.get('index') ? parseInt(formData.get('index') as string) : undefined;

    if (!file || !type || !imageType || !slug) {
      return NextResponse.json(
        { error: 'Missing required fields: file, type, imageType, slug' },
        { status: 400 }
      );
    }

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Generate file path
    const filename = generateUniqueFilename(file.name, slug, imageType as any);
    const imagePath = generateImagePath(type, imageType as any, slug, filename, index);
    
    // Ensure directory exists
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    const dir = path.dirname(fullPath);
    await mkdir(dir, { recursive: true });

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(fullPath, buffer);

    // Get file stats for metadata
    const stats = await import('fs').then(fs => fs.promises.stat(fullPath));

    return NextResponse.json({
      success: true,
      data: {
        url: imagePath,
        filename,
        size: stats.size,
        type: imageType,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imagePath = searchParams.get('path');

    if (!imagePath) {
      return NextResponse.json(
        { error: 'Missing image path' },
        { status: 400 }
      );
    }

    const fullPath = path.join(process.cwd(), 'public', imagePath);
    
    // Check if file exists
    const fs = await import('fs');
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    // Delete file
    await fs.promises.unlink(fullPath);

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
} 