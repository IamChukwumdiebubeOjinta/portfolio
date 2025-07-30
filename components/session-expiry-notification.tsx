'use client';

import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Clock, LogOut } from 'lucide-react';
import { useSession } from '@/hooks/use-session';

export function SessionExpiryNotification() {
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const { logout } = useSession();

  useEffect(() => {
    const checkSessionExpiry = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          // Check if session expires in less than 10 minutes
          const now = Math.floor(Date.now() / 1000);
          const sessionExpiry = data.sessionExpiry || (now + 3600); // Default 1 hour
          const timeUntilExpiry = sessionExpiry - now;
          
          if (timeUntilExpiry <= 600) { // 10 minutes
            setShowWarning(true);
            setTimeLeft(timeUntilExpiry);
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
      }
    };

    // Check every minute
    const interval = setInterval(checkSessionExpiry, 60000);
    checkSessionExpiry(); // Initial check

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setShowWarning(false);
            logout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, logout]);

  if (!showWarning) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Alert className="fixed top-4 right-4 w-80 z-50 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
      <Clock className="h-4 w-4 text-orange-600" />
      <AlertDescription className="text-orange-800 dark:text-orange-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Session Expiring Soon</p>
            <p className="text-sm">
              Your session will expire in {minutes}:{seconds.toString().padStart(2, '0')}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="border-orange-300 text-orange-700 hover:bg-orange-100 dark:border-orange-700 dark:text-orange-300 dark:hover:bg-orange-900"
          >
            <LogOut className="h-3 w-3 mr-1" />
            Logout
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
} 