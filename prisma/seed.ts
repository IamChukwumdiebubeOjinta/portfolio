import { PrismaClient } from '../lib/generated/prisma';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Get or create admin user
  let adminUser = await prisma.user.findFirst({
    where: { role: 'ADMIN' },
  });

  if (!adminUser) {
    const hashedPassword = await hash('LocoM0tive$$', 12);
    
    adminUser = await prisma.user.create({
      data: {
        username: 'admin',
        email: 'bube@dev.com',
        password: hashedPassword,
        role: 'ADMIN',
        isActive: true,
      },
    });
    console.log('✅ Admin user created:', adminUser.username);
  } else {
    console.log('✅ Using existing admin user:', adminUser.username);
  }

  // Create project tags
  const projectTags = await Promise.all([
    prisma.projectTag.upsert({
      where: { name: 'React' },
      update: {},
      create: { name: 'React', color: '#61DAFB' },
    }),
    prisma.projectTag.upsert({
      where: { name: 'Next.js' },
      update: {},
      create: { name: 'Next.js', color: '#000000' },
    }),
    prisma.projectTag.upsert({
      where: { name: 'TypeScript' },
      update: {},
      create: { name: 'TypeScript', color: '#3178C6' },
    }),
    prisma.projectTag.upsert({
      where: { name: 'AI' },
      update: {},
      create: { name: 'AI', color: '#FF6B6B' },
    }),
    prisma.projectTag.upsert({
      where: { name: 'Full-Stack' },
      update: {},
      create: { name: 'Full-Stack', color: '#4ECDC4' },
    }),
  ]);

  console.log('✅ Project tags created:', projectTags.length);

  // Create sample projects
  const projects = await Promise.all([
    prisma.project.upsert({
      where: { slug: 'uloma-ai-assistant' },
      update: {},
      create: {
        title: 'Uloma AI Assistant',
        slug: 'uloma-ai-assistant',
        description: 'AI-powered chat interface for family storytelling with streaming responses and conversation persistence.',
        excerpt: 'Deep dive into building scalable AI applications with modern tools',
        techStack: ['Remix', 'Vercel AI SDK', 'Prisma', 'BullMQ', 'Docker', 'PM2'],
        features: [
          'Built full-stack architecture using Remix, Prisma, and Vercel AI SDK',
          'Implemented streaming AI responses and conversation persistence',
          'Set up summarization queues and custom middleware',
          'Deployed with Docker + PM2 for reliability',
          'Worker queues (BullMQ) and observability with Prometheus',
        ],
        githubUrl: 'https://github.com/username/uloma',
        demoUrl: 'https://uloma.dev',
        imageUrl: '/images/uloma-preview.jpg',
        isVisible: true,
        isFeatured: true,
        status: 'PUBLISHED',
        order: 1,
        authorId: adminUser.id,
        tags: {
          connect: [
            { name: 'AI' },
            { name: 'Full-Stack' },
            { name: 'TypeScript' },
          ],
        },
      },
    }),
    prisma.project.upsert({
      where: { slug: 'instincthub-suggestion-box' },
      update: {},
      create: {
        title: 'InstinctHub Suggestion Box',
        slug: 'instincthub-suggestion-box',
        description: 'Anonymous team feedback tool for internal culture with clean UX and admin dashboard.',
        excerpt: 'Real-world insights from developing an AI-powered family storytelling tool',
        techStack: ['React', 'Vite', 'Tailwind', 'Express', 'Node.js'],
        features: [
          'Built with React + Vite and Tailwind CSS',
          'Express API with dynamic anonymity layer',
          'Clean UX flow for seamless feedback submission',
          'Comprehensive admin dashboard for insights',
          'Real-time feedback processing',
        ],
        githubUrl: 'https://github.com/username/instincthub',
        demoUrl: 'https://instincthub.com',
        imageUrl: '/images/instincthub-preview.jpg',
        isVisible: true,
        isFeatured: true,
        status: 'PUBLISHED',
        order: 2,
        authorId: adminUser.id,
        tags: {
          connect: [
            { name: 'React' },
            { name: 'Full-Stack' },
            { name: 'TypeScript' },
          ],
        },
      },
    }),
    prisma.project.upsert({
      where: { slug: 'gallery-vault-system' },
      update: {},
      create: {
        title: 'Gallery & Vault System',
        slug: 'gallery-vault-system',
        description: 'Drag-and-drop folder UI with nesting for digital assets, featuring smooth animations.',
        excerpt: 'Why full-stack developers should embrace their frontend skills',
        techStack: ['React', 'Framer Motion', 'React DnD', 'Prisma', 'AWS S3'],
        features: [
          'Developed animation system using React DnD + Framer Motion',
          'Nested folder structure with intuitive drag-and-drop',
          'Integrated Prisma and AWS S3 for storage',
          'Advanced access control and permissions',
          'Responsive design for all devices',
        ],
        githubUrl: 'https://github.com/username/gallery-vault',
        demoUrl: '',
        imageUrl: '/images/gallery-vault-preview.jpg',
        isVisible: false,
        isFeatured: false,
        status: 'DRAFT',
        order: 3,
        authorId: adminUser.id,
        tags: {
          connect: [
            { name: 'React' },
            { name: 'Full-Stack' },
            { name: 'TypeScript' },
          ],
        },
      },
    }),
  ]);

  console.log('✅ Projects created:', projects.length);

  // Create blog tags
  const blogTags = await Promise.all([
    prisma.blogTag.upsert({
      where: { name: 'AI' },
      update: {},
      create: { name: 'AI', color: '#FF6B6B' },
    }),
    prisma.blogTag.upsert({
      where: { name: 'Architecture' },
      update: {},
      create: { name: 'Architecture', color: '#4ECDC4' },
    }),
    prisma.blogTag.upsert({
      where: { name: 'Vercel' },
      update: {},
      create: { name: 'Vercel', color: '#000000' },
    }),
    prisma.blogTag.upsert({
      where: { name: 'Prisma' },
      update: {},
      create: { name: 'Prisma', color: '#2D3748' },
    }),
    prisma.blogTag.upsert({
      where: { name: 'Frontend' },
      update: {},
      create: { name: 'Frontend', color: '#61DAFB' },
    }),
    prisma.blogTag.upsert({
      where: { name: 'Backend' },
      update: {},
      create: { name: 'Backend', color: '#68D391' },
    }),
  ]);

  console.log('✅ Blog tags created:', blogTags.length);

  // Create sample blog posts
  const blogs = await Promise.all([
    prisma.blog.upsert({
      where: { slug: 'ai-chat-app-architecture' },
      update: {},
      create: {
        title: 'How I Architected an AI Chat App with Vercel AI SDK + Prisma',
        slug: 'ai-chat-app-architecture',
        excerpt: 'Deep dive into building scalable AI applications with modern tools',
        content: `
# How I Architected an AI Chat App with Vercel AI SDK + Prisma

Building AI applications requires careful consideration of architecture, scalability, and user experience. In this post, I'll share how I built Uloma, an AI-powered family storytelling application.

## The Challenge

Creating an AI chat interface that can handle:
- Streaming responses for real-time interaction
- Conversation persistence across sessions
- Scalable architecture for production use
- Proper error handling and fallbacks

## The Solution

I chose a modern stack that would handle these requirements effectively:

### Frontend: Remix + Vercel AI SDK
- Server-side rendering for better SEO
- Built-in streaming support
- Excellent developer experience

### Backend: Prisma + PostgreSQL
- Type-safe database operations
- Excellent migration system
- Great performance with proper indexing

### AI Integration: Vercel AI SDK
- Unified interface for multiple AI providers
- Built-in streaming support
- Easy to switch between models

## Key Architecture Decisions

1. **Streaming Responses**: Using Vercel AI SDK's streaming capabilities
2. **Database Design**: Proper indexing for conversation queries
3. **Error Handling**: Graceful fallbacks for AI service failures
4. **Scalability**: Worker queues for background processing

## Lessons Learned

- Always design for failure when working with external AI services
- Streaming responses significantly improve perceived performance
- Proper database indexing is crucial for chat applications
- Type safety with Prisma prevents many runtime errors

The complete source code is available on GitHub, and you can try the live demo at uloma.dev.
        `,
        isPublished: true,
        isFeatured: true,
        status: 'PUBLISHED',
        publishedAt: new Date('2024-01-20'),
        readTime: 8,
        authorId: adminUser.id,
        tags: {
          connect: [
            { name: 'AI' },
            { name: 'Architecture' },
            { name: 'Vercel' },
            { name: 'Prisma' },
          ],
        },
      },
    }),
    prisma.blog.upsert({
      where: { slug: 'lessons-from-building-uloma' },
      update: {},
      create: {
        title: 'Streaming, Summarizing & Saving: Lessons from Building Uloma',
        slug: 'lessons-from-building-uloma',
        excerpt: 'Real-world insights from developing an AI-powered family storytelling tool',
        content: `
# Streaming, Summarizing & Saving: Lessons from Building Uloma

Building Uloma taught me valuable lessons about AI application development, user experience, and system architecture.

## The Streaming Challenge

One of the biggest challenges was implementing proper streaming responses. Users expect immediate feedback when interacting with AI, and traditional request-response patterns don't cut it.

### Solution: Vercel AI SDK
The Vercel AI SDK provided a clean abstraction for streaming responses, making it easy to:
- Show partial responses as they arrive
- Handle errors gracefully
- Maintain conversation context

## Summarization Strategy

Storing entire conversations would quickly become expensive and slow. Instead, I implemented a summarization strategy:

1. **Real-time Summarization**: Summarize conversations as they happen
2. **Incremental Updates**: Update summaries with new context
3. **Background Processing**: Use worker queues for heavy processing

## Data Persistence

Choosing the right persistence strategy was crucial:

### What to Store
- Conversation summaries
- User preferences
- System settings

### What Not to Store
- Raw conversation text
- Temporary AI responses
- Sensitive user data

## Performance Optimizations

1. **Database Indexing**: Proper indexes for conversation queries
2. **Caching**: Redis for frequently accessed data
3. **CDN**: Static assets served from edge locations
4. **Worker Queues**: Background processing for heavy tasks

## User Experience Insights

- Users prefer streaming responses over waiting
- Context preservation is crucial for meaningful conversations
- Error handling should be graceful and informative
- Mobile experience must be optimized

## Technical Debt Management

- Regular dependency updates
- Comprehensive testing strategy
- Monitoring and alerting
- Documentation maintenance

The journey of building Uloma reinforced the importance of choosing the right tools for the job and designing for scale from the beginning.
        `,
        isPublished: true,
        isFeatured: false,
        status: 'PUBLISHED',
        publishedAt: new Date('2024-02-15'),
        readTime: 12,
        authorId: adminUser.id,
        tags: {
          connect: [
            { name: 'AI' },
            { name: 'Architecture' },
            { name: 'Backend' },
          ],
        },
      },
    }),
  ]);

  console.log('✅ Blog posts created:', blogs.length);

  // Create sample activities
  const activities = await Promise.all([
    prisma.activity.create({
      data: {
        action: 'Created project',
        item: 'Uloma AI Assistant',
        details: 'New AI-powered chat application added to portfolio',
        type: 'PROJECT_CREATED',
        userId: adminUser.id,
      },
    }),
    prisma.activity.create({
      data: {
        action: 'Published blog post',
        item: 'How I Architected an AI Chat App',
        details: 'Technical deep dive into AI application architecture',
        type: 'BLOG_PUBLISHED',
        userId: adminUser.id,
      },
    }),
    prisma.activity.create({
      data: {
        action: 'Updated project',
        item: 'InstinctHub Suggestion Box',
        details: 'Added new features and improved UX',
        type: 'PROJECT_UPDATED',
        userId: adminUser.id,
      },
    }),
  ]);

  console.log('✅ Activities created:', activities.length);

  // Create sample settings
  const settings = await Promise.all([
    prisma.setting.upsert({
      where: { key: 'site_title' },
      update: {},
      create: {
        key: 'site_title',
        value: 'Chukwumdiebube Ojinta - Portfolio',
        type: 'STRING',
        description: 'Main site title',
        isPublic: true,
      },
    }),
    prisma.setting.upsert({
      where: { key: 'contact_email' },
      update: {},
      create: {
        key: 'contact_email',
        value: 'contact@3bube.com',
        type: 'STRING',
        description: 'Primary contact email',
        isPublic: true,
      },
    }),
    prisma.setting.upsert({
      where: { key: 'blog_enabled' },
      update: {},
      create: {
        key: 'blog_enabled',
        value: 'true',
        type: 'BOOLEAN',
        description: 'Enable blog section',
        isPublic: false,
      },
    }),
    prisma.setting.upsert({
      where: { key: 'contact_form_enabled' },
      update: {},
      create: {
        key: 'contact_form_enabled',
        value: 'true',
        type: 'BOOLEAN',
        description: 'Enable contact form',
        isPublic: false,
      },
    }),
  ]);

  console.log('✅ Settings created:', settings.length);

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 