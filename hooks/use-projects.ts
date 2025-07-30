'use client';

import { useState, useEffect } from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  slug: string;
  excerpt?: string;
  techStack: string[];
  features: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  isVisible: boolean;
  isFeatured: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  order: number;
  views: number;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author?: {
    id: string;
    username: string;
    email: string;
  };
  images?: any[];
  tags?: any[];
}

export interface ProjectsResponse {
  success: boolean;
  data: {
    projects: Project[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}

interface UseProjectsOptions {
  featured?: boolean;
  visible?: boolean;
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  limit?: number;
  search?: string;
}

export function useProjects(options: UseProjectsOptions = {}) {
  const [data, setData] = useState<ProjectsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      
      if (options.featured !== undefined) {
        params.append('isFeatured', options.featured.toString());
      }
      
      if (options.visible !== undefined) {
        params.append('isVisible', options.visible.toString());
      }
      
      if (options.status) {
        params.append('status', options.status);
      }
      
      if (options.limit) {
        params.append('limit', options.limit.toString());
      }
      
      if (options.search) {
        params.append('search', options.search);
      }

      const response = await fetch(`/api/projects?${params.toString()}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch projects');
      }

      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [options.featured, options.visible, options.status, options.limit, options.search]);

  const deleteProject = async (id: string) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to delete project');
      }

      // Refresh the projects list
      await fetchProjects();
    } catch (err) {
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    fetchProjects,
    deleteProject,
  };
}

// Hook for fetching a single project
export function useProject(id: string) {
  const [data, setData] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/projects/${id}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch project');
      }

      setData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  return {
    data,
    loading,
    error,
    fetchProject,
  };
} 