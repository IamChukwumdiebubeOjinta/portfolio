'use client';

import { useState, useEffect } from 'react';

interface DashboardStats {
  title: string;
  value: string;
  change: string;
  icon: string;
}

interface RecentActivity {
  id: string;
  action: string;
  item: string;
  time: string;
  user: string;
  timeAgo: string;
}

interface Feature {
  name: string;
  enabled: boolean;
  description?: string;
}

interface DashboardData {
  stats: DashboardStats[];
  recentActivities: RecentActivity[];
  features: Feature[];
  recentProjects: any[];
  recentBlogs: any[];
  recentContacts: any[];
  analytics: {
    topPages: any[];
    uniqueVisitors: number;
    totalPageViews: number;
    thisMonthPageViews: number;
    pageViewGrowth: number;
  };
  statusStats: {
    projects: Record<string, number>;
    blogs: Record<string, number>;
  };
}

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/dashboard/overview');
      
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const result = await response.json();
      
      if (result.success) {
        setData(result.dashboard);
      } else {
        throw new Error(result.error || 'Failed to fetch dashboard data');
      }
    } catch (err) {
      console.error('Dashboard data fetch error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchDashboardData();
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    data,
    loading,
    error,
    refreshData,
  };
} 