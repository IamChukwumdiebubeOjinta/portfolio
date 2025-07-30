import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionFromRequest } from '@/lib/session';

// Force dynamic rendering since this route uses cookies for authentication
export const dynamic = 'force-dynamic';

// GET /api/settings - Get all settings
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isPublic = searchParams.get('isPublic');
    const type = searchParams.get('type');

    // Build where clause
    const where: any = {};
    
    if (isPublic !== null) where.isPublic = isPublic === 'true';
    if (type) where.type = type;

    const settings = await prisma.setting.findMany({
      where,
      orderBy: { key: 'asc' },
    });

    return NextResponse.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error('Settings fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// POST /api/settings - Create new setting
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
    const { key, value, type, description, isPublic } = body;

    // Validate required fields
    if (!key || !value || !type) {
      return NextResponse.json(
        { error: 'Key, value, and type are required' },
        { status: 400 }
      );
    }

    // Check if setting already exists
    const existingSetting = await prisma.setting.findUnique({
      where: { key },
    });

    if (existingSetting) {
      return NextResponse.json(
        { error: 'Setting with this key already exists' },
        { status: 400 }
      );
    }

    // Create setting
    const setting = await prisma.setting.create({
      data: {
        key,
        value,
        type,
        description,
        isPublic: isPublic ?? false,
      },
    });

    return NextResponse.json({
      success: true,
      data: setting,
    });
  } catch (error) {
    console.error('Setting creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create setting' },
      { status: 500 }
    );
  }
}

// PUT /api/settings - Update multiple settings
export async function PUT(request: NextRequest) {
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
    const { settings } = body;

    if (!Array.isArray(settings)) {
      return NextResponse.json(
        { error: 'Settings array is required' },
        { status: 400 }
      );
    }

    // Update settings in transaction
    const updatedSettings = await prisma.$transaction(
      settings.map((setting: any) =>
        prisma.setting.update({
          where: { key: setting.key },
          data: {
            value: setting.value,
            type: setting.type,
            description: setting.description,
            isPublic: setting.isPublic,
          },
        })
      )
    );

    return NextResponse.json({
      success: true,
      data: updatedSettings,
    });
  } catch (error) {
    console.error('Settings update error:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
} 