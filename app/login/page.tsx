'use client';

import type React from 'react';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store user data in localStorage or sessionStorage for now
        // In production, use proper session management
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        
        // Redirect to dashboard
        window.location.href = '/admin/dashboard';
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className='w-full'>
        <CardHeader className='text-center'>
          <div className='mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4'>
            <Lock className='h-6 w-6 text-primary' />
          </div>
          <CardTitle className='text-2xl'>3bube</CardTitle>
          <CardDescription>Portfolio management dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='username'>Username</Label>
              <div className='relative'>
                <User className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                <Input
                  id='username'
                  type='text'
                  placeholder='admin'
                  className='pl-10'
                  value={credentials.username}
                  onChange={e =>
                    setCredentials({
                      ...credentials,
                      username: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <div className='relative'>
                <Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                <Input
                  id='password'
                  type='password'
                  placeholder='••••••••'
                  className='pl-10'
                  value={credentials.password}
                  onChange={e =>
                    setCredentials({
                      ...credentials,
                      password: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            {error && (
              <Alert variant='destructive'>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
