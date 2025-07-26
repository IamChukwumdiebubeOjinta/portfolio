import path from 'path';
import fs from 'fs';

// Image type definitions
export type ImageType = 'thumbnail' | 'gallery' | 'logo' | 'featured' | 'content';

// Image specifications
export const IMAGE_SPECS = {
  project: {
    thumbnail: { width: 300, height: 200, ratio: '16:10' },
    gallery: { width: 1200, height: 800, ratio: '3:2' },
    logo: { width: 200, height: 200, ratio: '1:1' },
  },
  blog: {
    thumbnail: { width: 400, height: 250, ratio: '16:10' },
    featured: { width: 800, height: 400, ratio: '2:1' },
    content: { width: 1200, height: null, ratio: 'auto' },
  },
} as const;

// Generate image path based on type and slug
export function generateImagePath(
  type: 'project' | 'blog',
  imageType: ImageType,
  slug: string,
  filename: string,
  index?: number
): string {
  const basePath = `/images/${type}s`;
  
  switch (imageType) {
    case 'thumbnail':
      return `${basePath}/thumbnails/${slug}-thumbnail${path.extname(filename)}`;
    case 'gallery':
      const suffix = index !== undefined ? `-${index + 1}` : '';
      return `${basePath}/gallery/${slug}-gallery${suffix}${path.extname(filename)}`;
    case 'logo':
      return `${basePath}/logos/${slug}-logo${path.extname(filename)}`;
    case 'featured':
      return `${basePath}/featured/${slug}-featured${path.extname(filename)}`;
    case 'content':
      const contentSuffix = index !== undefined ? `-${index + 1}` : '';
      return `${basePath}/content/${slug}-content${contentSuffix}${path.extname(filename)}`;
    default:
      return `${basePath}/${slug}-${imageType}${path.extname(filename)}`;
  }
}

// Validate image file
export function validateImageFile(
  file: File,
  maxSizeMB: number = 5,
  allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
): { isValid: boolean; error?: string } {
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`,
    };
  }

  // Check file size
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      isValid: false,
      error: `File size too large. Maximum size: ${maxSizeMB}MB`,
    };
  }

  return { isValid: true };
}

// Get image dimensions from file
export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    img.src = URL.createObjectURL(file);
  });
}

// Generate unique filename
export function generateUniqueFilename(
  originalName: string,
  slug: string,
  type: ImageType
): string {
  const ext = path.extname(originalName);
  const baseName = path.basename(originalName, ext);
  const timestamp = Date.now();
  return `${slug}-${type}-${timestamp}${ext}`;
}

// Check if image path exists
export function imagePathExists(imagePath: string): boolean {
  const fullPath = path.join(process.cwd(), 'public', imagePath);
  return fs.existsSync(fullPath);
}

// Get image info from path
export function getImageInfo(imagePath: string): {
  type: 'project' | 'blog';
  imageType: ImageType;
  slug: string;
  filename: string;
} | null {
  const pathParts = imagePath.split('/');
  
  if (pathParts.length < 4) return null;
  
  const type = pathParts[2] === 'projects' ? 'project' : 'blog';
  const imageType = pathParts[3] as ImageType;
  const filename = pathParts[pathParts.length - 1];
  
  // Extract slug from filename (e.g., "project-slug-thumbnail.jpg" -> "project-slug")
  const slugMatch = filename.match(/^(.+?)-(thumbnail|gallery|logo|featured|content)/);
  const slug = slugMatch ? slugMatch[1] : '';
  
  return {
    type,
    imageType,
    slug,
    filename,
  };
}

// Clean up unused images
export async function cleanupUnusedImages(
  projectSlugs: string[],
  blogSlugs: string[]
): Promise<string[]> {
  const cleanedFiles: string[] = [];
  
  // Check project images
  const projectImageDir = path.join(process.cwd(), 'public', 'images', 'projects');
  if (fs.existsSync(projectImageDir)) {
    const subdirs = ['thumbnails', 'gallery', 'logos'];
    
    for (const subdir of subdirs) {
      const subdirPath = path.join(projectImageDir, subdir);
      if (fs.existsSync(subdirPath)) {
        const files = fs.readdirSync(subdirPath);
        
        for (const file of files) {
          const fileInfo = getImageInfo(`/images/projects/${subdir}/${file}`);
          if (fileInfo && !projectSlugs.includes(fileInfo.slug)) {
            const filePath = path.join(subdirPath, file);
            fs.unlinkSync(filePath);
            cleanedFiles.push(`/images/projects/${subdir}/${file}`);
          }
        }
      }
    }
  }
  
  // Check blog images
  const blogImageDir = path.join(process.cwd(), 'public', 'images', 'blogs');
  if (fs.existsSync(blogImageDir)) {
    const subdirs = ['thumbnails', 'featured', 'content'];
    
    for (const subdir of subdirs) {
      const subdirPath = path.join(blogImageDir, subdir);
      if (fs.existsSync(subdirPath)) {
        const files = fs.readdirSync(subdirPath);
        
        for (const file of files) {
          const fileInfo = getImageInfo(`/images/blogs/${subdir}/${file}`);
          if (fileInfo && !blogSlugs.includes(fileInfo.slug)) {
            const filePath = path.join(subdirPath, file);
            fs.unlinkSync(filePath);
            cleanedFiles.push(`/images/blogs/${subdir}/${file}`);
          }
        }
      }
    }
  }
  
  return cleanedFiles;
}

// Get image URL for display
export function getImageUrl(imagePath: string): string {
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  return `/${cleanPath}`;
}

// Get optimized image URL (for future CDN integration)
export function getOptimizedImageUrl(
  imagePath: string,
  width?: number,
  height?: number,
  quality: number = 80
): string {
  const baseUrl = getImageUrl(imagePath);
  
  // For now, return the base URL
  // In the future, this could integrate with a CDN or image optimization service
  return baseUrl;
} 