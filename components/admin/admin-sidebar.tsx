'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  Settings,
  LogOut,
  BarChart3,
  User,
} from 'lucide-react';
import { motion } from 'framer-motion';

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
    current: true,
  },
  { name: 'Projects', href: '/admin/projects', icon: FolderOpen, count: 12 },
  { name: 'Blog', href: '/admin/blogs', icon: FileText, count: 8 },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const [currentPath, setCurrentPath] = useState('/admin/dashboard');

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
            <p className='text-sm text-muted-foreground'>Ebube Ojinta</p>
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
                variant={currentPath === item.href ? 'default' : 'ghost'}
                className='w-full justify-start gap-3'
                onClick={() => setCurrentPath(item.href)}
              >
                <item.icon className='h-4 w-4' />
                <span className='flex-1 text-left'>{item.name}</span>
                {item.count && (
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
        >
          <LogOut className='h-4 w-4' />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
