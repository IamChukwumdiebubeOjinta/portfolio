'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { validateImageFile, generateImagePath } from '@/lib/image-utils';

interface ImageUploadProps {
  type: 'project' | 'blog';
  imageType: 'thumbnail' | 'gallery' | 'logo' | 'featured' | 'content';
  slug: string;
  onUploadComplete: (imageData: {
    url: string;
    filename: string;
    size: number;
    type: string;
  }) => void;
  onUploadError: (error: string) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
  maxSizeMB?: number;
  className?: string;
}

interface UploadingFile {
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

export function ImageUpload({
  type,
  imageType,
  slug,
  onUploadComplete,
  onUploadError,
  maxFiles = 1,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
  maxSizeMB = 5,
  className = '',
}: ImageUploadProps) {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: any[]) => {
      // Handle rejected files
      if (rejectedFiles.length > 0) {
        const errors = rejectedFiles.map(({ file, errors }) => {
          const errorMessages = errors.map((e: any) => e.message).join(', ');
          return `${file.name}: ${errorMessages}`;
        });
        onUploadError(errors.join('; '));
        return;
      }

      // Validate files
      const validFiles = acceptedFiles.filter((file) => {
        const validation = validateImageFile(file, maxSizeMB, acceptedTypes);
        if (!validation.isValid) {
          onUploadError(`${file.name}: ${validation.error}`);
          return false;
        }
        return true;
      });

      if (validFiles.length === 0) return;

      // Add files to uploading state
      const newUploadingFiles: UploadingFile[] = validFiles.map((file) => ({
        file,
        progress: 0,
        status: 'uploading',
      }));

      setUploadingFiles((prev) => [...prev, ...newUploadingFiles]);

      // Upload each file
      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        const fileIndex = newUploadingFiles.findIndex((f) => f.file === file);

        try {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('type', type);
          formData.append('imageType', imageType);
          formData.append('slug', slug);
          formData.append('index', i.toString());

          // Simulate progress
          const progressInterval = setInterval(() => {
            setUploadingFiles((prev) =>
              prev.map((f, idx) =>
                f.file === file && f.status === 'uploading'
                  ? { ...f, progress: Math.min(f.progress + 10, 90) }
                  : f
              )
            );
          }, 100);

          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          clearInterval(progressInterval);

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Upload failed');
          }

          const result = await response.json();

          // Update progress to 100%
          setUploadingFiles((prev) =>
            prev.map((f) =>
              f.file === file
                ? { ...f, progress: 100, status: 'success' }
                : f
            )
          );

          // Call success callback
          onUploadComplete(result.data);

          // Remove from uploading state after delay
          setTimeout(() => {
            setUploadingFiles((prev) =>
              prev.filter((f) => f.file !== file)
            );
          }, 2000);
        } catch (error) {
          setUploadingFiles((prev) =>
            prev.map((f) =>
              f.file === file
                ? {
                    ...f,
                    status: 'error',
                    error: error instanceof Error ? error.message : 'Upload failed',
                  }
                : f
            )
          );
          onUploadError(
            error instanceof Error ? error.message : 'Upload failed'
          );
        }
      }
    },
    [type, imageType, slug, onUploadComplete, onUploadError, maxSizeMB, acceptedTypes]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxFiles,
    maxSize: maxSizeMB * 1024 * 1024,
  });

  const removeFile = (file: File) => {
    setUploadingFiles((prev) => prev.filter((f) => f.file !== file));
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <Card
        {...getRootProps()}
        className={`cursor-pointer transition-colors ${
          isDragActive || dragActive
            ? 'border-primary bg-primary/5'
            : 'border-dashed hover:border-primary/50'
        }`}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
      >
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="rounded-full bg-muted p-3">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">
                {isDragActive
                  ? 'Drop files here'
                  : 'Drag & drop files here, or click to select'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {acceptedTypes.join(', ')} • Max {maxSizeMB}MB per file
              </p>
            </div>
            <input {...getInputProps()} />
          </div>
        </CardContent>
      </Card>

      {/* Upload Progress */}
      {uploadingFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Uploading...</h4>
          {uploadingFiles.map((uploadingFile, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-3 flex-1">
                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {uploadingFile.file.name}
                    </p>
                    <Progress
                      value={uploadingFile.progress}
                      className="mt-2"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {uploadingFile.status === 'success' && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  {uploadingFile.status === 'error' && (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(uploadingFile.file)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {uploadingFile.error && (
                <Alert variant="destructive" className="mt-2">
                  <AlertDescription>{uploadingFile.error}</AlertDescription>
                </Alert>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 