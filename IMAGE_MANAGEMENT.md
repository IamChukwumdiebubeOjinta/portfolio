# Image Management System

## 🎯 **Overview**

We've implemented a comprehensive image management system for your portfolio that organizes images by type (projects/blogs) with proper folder separation and database integration.

## 📁 **Directory Structure**

```
public/images/
├── projects/           # Project-related images
│   ├── thumbnails/     # Project thumbnail images (300x200px)
│   ├── gallery/        # Project gallery images (1200x800px)
│   └── logos/          # Project logos and icons (200x200px)
├── blogs/              # Blog post images
│   ├── thumbnails/     # Blog thumbnail images (400x250px)
│   ├── featured/       # Featured blog images (800x400px)
│   └── content/        # In-content blog images (max 1200px width)
├── profile/            # Profile and personal images
├── logos/              # General logos and icons
└── README.md           # Image structure documentation
```

## 🗄️ **Database Schema Updates**

### **ProjectImage Model**
```prisma
model ProjectImage {
  id        String   @id @default(cuid())
  url       String   // Path relative to public directory
  alt       String?  // Alt text for accessibility
  caption   String?  // Image caption
  type      String   @default("gallery") // "thumbnail", "gallery", "logo"
  order     Int      @default(0)
  isPrimary Boolean  @default(false)
  width     Int?     // Image width in pixels
  height    Int?     // Image height in pixels
  fileSize  Int?     // File size in bytes
  createdAt DateTime @default(now())
  
  // Relations
  projectId String
  project   Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
}
```

### **BlogImage Model**
```prisma
model BlogImage {
  id        String   @id @default(cuid())
  url       String   // Path relative to public directory
  alt       String?  // Alt text for accessibility
  caption   String?  // Image caption
  type      String   @default("content") // "thumbnail", "featured", "content"
  order     Int      @default(0)
  isPrimary Boolean  @default(false)
  width     Int?     // Image width in pixels
  height    Int?     // Image height in pixels
  fileSize  Int?     // File size in bytes
  createdAt DateTime @default(now())
  
  // Relations
  blogId    String
  blog      Blog     @relation(fields: [blogId], references: [id], onDelete: Cascade)
}
```

## 🛠️ **Utility Functions**

### **Image Path Generation**
```typescript
// Generate organized image paths
generateImagePath('project', 'thumbnail', 'my-project', 'image.jpg')
// Returns: "/images/projects/thumbnails/my-project-thumbnail.jpg"
```

### **File Validation**
```typescript
// Validate uploaded files
validateImageFile(file, 5, ['image/jpeg', 'image/png', 'image/webp'])
// Returns: { isValid: boolean, error?: string }
```

### **Image Information Extraction**
```typescript
// Extract info from image path
getImageInfo('/images/projects/thumbnails/my-project-thumbnail.jpg')
// Returns: { type: 'project', imageType: 'thumbnail', slug: 'my-project', filename: 'my-project-thumbnail.jpg' }
```

## 📤 **Upload System**

### **API Route: `/api/upload`**
- **POST**: Upload images with validation and organized storage
- **DELETE**: Remove images from storage

### **React Component: `ImageUpload`**
```tsx
<ImageUpload
  type="project"
  imageType="thumbnail"
  slug="my-project"
  onUploadComplete={(data) => console.log(data)}
  onUploadError={(error) => console.error(error)}
  maxFiles={5}
  maxSizeMB={5}
/>
```

## 📋 **Image Specifications**

### **Project Images**
- **Thumbnails**: 300x200px (16:10 ratio)
- **Gallery**: 1200x800px (3:2 ratio)
- **Logos**: 200x200px (1:1 ratio)

### **Blog Images**
- **Thumbnails**: 400x250px (16:10 ratio)
- **Featured**: 800x400px (2:1 ratio)
- **Content**: Max 1200px width, auto height

### **File Formats**
- **Photos**: JPEG (.jpg), PNG (.png)
- **Icons**: SVG (.svg), PNG (.png)
- **Logos**: SVG preferred, PNG fallback

## 🎨 **Naming Conventions**

### **Projects**
- Thumbnails: `project-slug-thumbnail.jpg`
- Gallery: `project-slug-gallery-1.jpg`, `project-slug-gallery-2.jpg`
- Logos: `project-slug-logo.png`

### **Blogs**
- Thumbnails: `blog-slug-thumbnail.jpg`
- Featured: `blog-slug-featured.jpg`
- Content: `blog-slug-content-1.jpg`, `blog-slug-content-2.jpg`

## 🔧 **Usage Examples**

### **In React Components**
```tsx
import Image from 'next/image';

<Image 
  src="/images/projects/thumbnails/my-project-thumbnail.jpg"
  alt="My Project"
  width={300}
  height={200}
/>
```

### **Database Integration**
```typescript
// Create project with images
const project = await prisma.project.create({
  data: {
    title: 'My Project',
    slug: 'my-project',
    // ... other fields
    images: {
      create: [
        {
          url: '/images/projects/thumbnails/my-project-thumbnail.jpg',
          alt: 'Project thumbnail',
          type: 'thumbnail',
          isPrimary: true,
          width: 300,
          height: 200,
        },
        {
          url: '/images/projects/gallery/my-project-gallery-1.jpg',
          alt: 'Project gallery image',
          type: 'gallery',
          isPrimary: false,
          width: 1200,
          height: 800,
        },
      ],
    },
  },
});
```

## 🧹 **Maintenance Features**

### **Cleanup Unused Images**
```typescript
// Remove images for deleted projects/blogs
const cleanedFiles = await cleanupUnusedImages(
  ['active-project-1', 'active-project-2'],
  ['active-blog-1', 'active-blog-2']
);
```

### **Image Optimization**
```typescript
// Get optimized image URL (future CDN integration)
const optimizedUrl = getOptimizedImageUrl(
  '/images/projects/thumbnails/my-project-thumbnail.jpg',
  300,
  200,
  80
);
```

## ✅ **Benefits**

1. **Organized Storage**: Clear folder structure by type and purpose
2. **Database Integration**: Full CRUD operations with metadata
3. **Validation**: File type, size, and format validation
4. **Accessibility**: Alt text and caption support
5. **Performance**: Optimized image paths and metadata
6. **Scalability**: Easy to extend for CDN integration
7. **Maintenance**: Automated cleanup of unused images
8. **User Experience**: Drag-and-drop upload with progress

## 🚀 **Next Steps**

1. **CDN Integration**: Add image optimization and CDN support
2. **Image Processing**: Add automatic resizing and compression
3. **Bulk Operations**: Add bulk upload and management features
4. **Image Editor**: Add basic image editing capabilities
5. **Analytics**: Track image usage and performance

---

**Created by**: Chukwumdiebube Ojinta  
**Date**: December 2024  
**Version**: 1.0.0 