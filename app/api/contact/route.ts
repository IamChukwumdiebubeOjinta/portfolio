import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';
import { z } from 'zod';
import { ContactNotificationEmail, ContactConfirmationEmail } from '@/components/views/emails';
import { render } from '@react-email/components';
import { config } from '@/lib/config';

const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject is too long'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message is too long'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedData = contactSchema.parse(body);
    const { name, email, subject, message } = validatedData;

    // Store in database
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message,
        isRead: false,
      },
    });

    // Get admin user for activity logging
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' },
      select: { id: true },
    });

    // Log activity for dashboard
    if (adminUser) {
      await prisma.activity.create({
        data: {
          action: 'Contact form submitted',
          item: `${name} - ${subject}`,
          details: `New contact message from ${email}`,
          type: 'CONTACT_SUBMITTED',
          userId: adminUser.id,
        },
      });
    }

    const timestamp = new Date().toLocaleString();

    // Send notification email to you (site owner)
    const ownerEmail = config.contact.email;
    const notificationEmailHtml = await render(
      ContactNotificationEmail({
        name,
        email,
        subject,
        message,
        timestamp,
      })
    );

    await resend.emails.send({
      from: 'Portfolio Contact <noreply@ojinta.dev>',
      to: [ownerEmail],
      subject: `New Contact Message: ${subject}`,
      html: notificationEmailHtml,
    });

    // Send confirmation email to the user
    const confirmationEmailHtml = await render(
      ContactConfirmationEmail({
        name,
        subject,
        message,
        timestamp,
      })
    );

    await resend.emails.send({
      from: 'Ebube Ojinta <noreply@ojinta.dev>',
      to: [email],
      subject: 'Thank you for reaching out!',
      html: confirmationEmailHtml,
    });

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully! Check your email for confirmation.',
      data: {
        id: contact.id,
        name,
        email,
        subject,
      },
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
} 