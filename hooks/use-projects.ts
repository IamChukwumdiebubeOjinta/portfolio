'use client';

import { useState, useEffect, useCallback } from 'react';

interface Project {
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
  author: {
    id: string;
    username: string;
    email: string;
  };
  images: Array<{
    id: string;
    url: string;
    alt?: string;
    caption?: string;
    type: string;
    order: number;
    isPrimary: boolean;
    width?: number;
    height?: number;
    fileSize?: number;
  }>;
  tags: Array<{
    id: string;
    name: string;
    color?: string;
  }>;
}

interface ProjectsResponse {
  projects: Project[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

interface UseProjectsOptions {
  page?: number;
  limit?: number;
  status?: string;
  isVisible?: boolean;
  isFeatured?: boolean;
  search?: string;
  autoFetch?: boolean;
}

export function useProjects(options: UseProjectsOptions = {}) {
  const {
    page = 1,
    limit = 10,
    status,
    isVisible,
    isFeatured,
    search,
    autoFetch = true,
  } = options;

  const [data, setData] = useState<ProjectsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (status) params.append('status', status);
      if (isVisible !== undefined) params.append('isVisible', isVisible.toString());
      if (isFeatured !== undefined) params.append('isFeatured', isFeatured.toString());
      if (search) params.append('search', search);

      const response = await fetch(`/api/projects?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch projects');
      }
    } catch (err) {
      console.error('Projects fetch error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [page, limit, status, isVisible, isFeatured, search]);

  const createProject = useCallback(async (projectData: Partial<Project>) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create project');
      }

      const result = await response.json();
      
      if (result.success) {
        // Refresh the projects list
        await fetchProjects();
        return result.data;
      } else {
        throw new Error(result.error || 'Failed to create project');
      }
    } catch (err) {
      console.error('Project creation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to create project');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchProjects]);

  const updateProject = useCallback(async (id: string, projectData: Partial<Project>) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update project');
      }

      const result = await response.json();
      
      if (result.success) {
        // Refresh the projects list
        await fetchProjects();
        return result.data;
      } else {
        throw new Error(result.error || 'Failed to update project');
      }
    } catch (err) {
      console.error('Project update error:', err);
      setError(err instanceof Error ? err.message : 'Failed to update project');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchProjects]);

  const deleteProject = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete project');
      }

      const result = await response.json();
      
      if (result.success) {
        // Refresh the projects list
        await fetchProjects();
        return result.message;
      } else {
        throw new Error(result.error || 'Failed to delete project');
      }
    } catch (err) {
      console.error('Project deletion error:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete project');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchProjects]);

  const getProject = useCallback(async (id: string): Promise<Project> => {
    try {
      const response = await fetch(`/api/projects/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch project');
      }

      const result = await response.json();
      
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.error || 'Failed to fetch project');
      }
    } catch (err) {
      console.error('Project fetch error:', err);
      throw err;
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchProjects();
    }
  }, [fetchProjects, autoFetch]);

  return {
    data,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    getProject,
  };
} 