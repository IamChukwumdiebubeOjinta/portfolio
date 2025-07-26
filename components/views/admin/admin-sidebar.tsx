'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  Settings,
  LogOut,
  User,
  ChevronRight,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from '@/hooks/use-session';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  count?: number;
  description?: string;
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
      description: 'Overview and analytics',
    },
    { 
      name: 'Projects', 
      href: '/admin/projects', 
      icon: FolderOpen, 
      count: 0,
      description: 'Manage portfolio projects',
    },
    { 
      name: 'Blog', 
      href: '/admin/blogs', 
      icon: FileText, 
      count: 0,
      description: 'Create and edit blog posts',
    },
    { 
      name: 'Settings', 
      href: '/admin/settings', 
      icon: Settings,
      description: 'Configure your portfolio',
    },
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
    <Sidebar>
      <SidebarHeader className="border-b border-border/50 px-6 py-[0.6rem]">
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg'>
            <User className='h-5 w-5 text-primary-foreground' />
          </div>
          <div className='flex-1 min-w-0'>
            <h2 className='font-semibold text-base text-foreground'>Admin Panel</h2>
            <p className='text-sm text-muted-foreground truncate'>
              {user?.username || 'Administrator'}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarMenu>
            {navigation.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  onClick={() => handleNavigation(item.href)}
                  tooltip={item.name}
                  className="group relative h-auto"
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className={`p-1.5 rounded-lg transition-colors ${
                      pathname === item.href 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-muted-foreground group-hover:text-foreground'
                    }`}>
                      <item.icon className='h-4 w-4' />
                    </div>
                    <div className="flex-1 min-w-0 gap-2 flex flex-col">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.name}</span>
                        {item.count !== undefined && (
                          <Badge variant='secondary' className='text-xs font-medium'>
                            {item.count}
                          </Badge>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-xs text-muted-foreground truncate">
                          {item.description}
                        </p>
                      )}
                    </div>
                    {pathname === item.href && (
                      <ChevronRight className="h-4 w-4 text-primary ml-auto" />
                    )}
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50 p-4">
        <SidebarMenuButton
          onClick={handleSignOut}
          tooltip="Sign Out"
          className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
          <div className="p-1.5 rounded-lg bg-destructive/10 text-destructive">
            <LogOut className='h-4 w-4' />
          </div>
          <div className="flex-1 text-left">
            <span className="font-medium">Sign Out</span>
            <p className="text-xs text-muted-foreground">End your session</p>
          </div>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
