'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, ExternalLink, Moon, Sun, LogOut, User } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useSession } from '@/hooks/use-session';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function AdminHeader() {
  const { theme, setTheme } = useTheme();
  const { user, loading, logout } = useSession();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className='h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='flex items-center justify-between px-6 h-full'>
        <div className='flex items-center gap-4'>
          <SidebarTrigger className='md:hidden' />
          <Badge variant='outline' className='gap-1'>
            <div className='w-2 h-2 bg-green-500 rounded-full' />
            Portfolio Live
          </Badge>
        </div>

        <div className='flex items-center gap-2'>
          <Button variant='ghost' size='icon'>
            <Bell className='h-4 w-4' />
          </Button>
          <Button variant='ghost' size='icon' asChild>
            <a href='/' target='_blank' rel='noopener noreferrer'>
              <ExternalLink className='h-4 w-4' />
            </a>
          </Button>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {mounted && theme === 'dark' ? (
              <Sun className='h-4 w-4' />
            ) : (
              <Moon className='h-4 w-4' />
            )}
          </Button>

          {/* User Menu */}
          {mounted && !loading && user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <User className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuLabel>
                  <div className='flex flex-col space-y-1'>
                    <p className='text-sm font-medium leading-none'>{user.username}</p>
                    <p className='text-xs leading-none text-muted-foreground'>
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className='mr-2 h-4 w-4' />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
