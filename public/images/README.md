# Image Storage Structure

This directory contains all images used throughout the portfolio application, organized by type and purpose.

## Directory Structure

```
public/images/
├── projects/           # Project-related images
│   ├── thumbnails/     # Project thumbnail images (300x200px recommended)
│   ├── gallery/        # Project gallery images (1200x800px recommended)
│   └── logos/          # Project logos and icons
├── blogs/              # Blog post images
│   ├── thumbnails/     # Blog thumbnail images (400x250px recommended)
│   ├── featured/       # Featured blog images (800x400px recommended)
│   └── content/        # In-content blog images (max 1200px width)
├── profile/            # Profile and personal images
├── logos/              # General logos and icons
└── [other]/            # Other image categories
```

## Image Naming Conventions

### Projects
- **Thumbnails**: `project-slug-thumbnail.jpg` (e.g., `uloma-ai-thumbnail.jpg`)
- **Gallery**: `project-slug-gallery-1.jpg`, `project-slug-gallery-2.jpg`
- **Logos**: `project-slug-logo.png` or `project-slug-icon.svg`

### Blogs
- **Thumbnails**: `blog-slug-thumbnail.jpg` (e.g., `ai-applications-thumbnail.jpg`)
- **Featured**: `blog-slug-featured.jpg`
- **Content**: `blog-slug-content-1.jpg`, `blog-slug-content-2.jpg`

## Image Specifications

### Recommended Sizes
- **Project Thumbnails**: 300x200px (16:10 ratio)
- **Project Gallery**: 1200x800px (3:2 ratio)
- **Blog Thumbnails**: 400x250px (16:10 ratio)
- **Blog Featured**: 800x400px (2:1 ratio)
- **Blog Content**: Max 1200px width, auto height

### File Formats
- **Photos**: JPEG (.jpg) for photos, PNG (.png) for graphics with transparency
- **Icons**: SVG (.svg) for scalable icons, PNG for complex graphics
- **Logos**: SVG preferred, PNG as fallback

## Database Paths

Images are referenced in the database using relative paths from the `public` directory:

- Project thumbnail: `/images/projects/thumbnails/project-slug-thumbnail.jpg`
- Project gallery: `/images/projects/gallery/project-slug-gallery-1.jpg`
- Blog thumbnail: `/images/blogs/thumbnails/blog-slug-thumbnail.jpg`
- Blog featured: `/images/blogs/featured/blog-slug-featured.jpg`

## Usage in Components

```tsx
// Example usage in React components
<Image 
  src="/images/projects/thumbnails/uloma-ai-thumbnail.jpg"
  alt="Uloma AI Assistant"
  width={300}
  height={200}
/>
```

## Upload Guidelines

1. **Optimize images** before uploading (compress, resize)
2. **Use descriptive filenames** that include the project/blog slug
3. **Maintain aspect ratios** for consistent display
4. **Include alt text** for accessibility
5. **Store in appropriate subdirectories** based on image type and purpose 