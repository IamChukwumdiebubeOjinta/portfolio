'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  Settings,
  LogOut,
  User,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from '@/hooks/use-session';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  count?: number;
}

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useSession();
  const [navigation, setNavigation] = useState<NavigationItem[]>([
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    { name: 'Projects', href: '/admin/projects', icon: FolderOpen, count: 0 },
    { name: 'Blog', href: '/admin/blogs', icon: FileText, count: 0 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]);

  // Fetch counts for projects and blogs
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch dashboard overview data
        const response = await fetch('/api/dashboard/overview');
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            const { stats } = data.dashboard;
            
            // Update navigation with real counts
            setNavigation(prev => prev.map(item => {
              if (item.name === 'Projects') {
                const projectStat = stats.find((s: any) => s.title === 'Total Projects');
                return { ...item, count: projectStat ? parseInt(projectStat.value) : 0 };
              }
              if (item.name === 'Blog') {
                const blogStat = stats.find((s: any) => s.title === 'Blog Posts');
                return { ...item, count: blogStat ? parseInt(blogStat.value) : 0 };
              }
              return item;
            }));
          }
        }
      } catch (error) {
        console.error('Failed to fetch navigation counts:', error);
      }
    };

    fetchCounts();
  }, []);

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  const handleSignOut = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      router.push('/login');
    }
  };

  return (
    <div className='w-64 bg-card border-r border-border h-screen flex flex-col'>
      {/* Header */}
      <div className='p-6 border-b border-border'>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
            <User className='h-4 w-4 text-primary-foreground' />
          </div>
          <div>
            <h2 className='font-semibold'>Admin Panel</h2>
            <p className='text-sm text-muted-foreground'>
              {user?.username || 'Admin'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex-1 p-4'>
        <ul className='space-y-2'>
          {navigation.map((item, index) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Button
                variant={pathname === item.href ? 'default' : 'ghost'}
                className='w-full justify-start gap-3'
                onClick={() => handleNavigation(item.href)}
              >
                <item.icon className='h-4 w-4' />
                <span className='flex-1 text-left'>{item.name}</span>
                {item.count !== undefined && (
                  <Badge variant='secondary' className='text-xs'>
                    {item.count}
                  </Badge>
                )}
              </Button>
            </motion.li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className='p-4 border-t border-border'>
        <Button
          variant='ghost'
          className='w-full justify-start gap-3 text-destructive'
          onClick={handleSignOut}
        >
          <LogOut className='h-4 w-4' />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
