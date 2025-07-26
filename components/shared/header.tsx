'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, X, FileDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#demos' },
  { name: 'Contact', href: '#contact' },
];

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Navigation click handler for both desktop and mobile
  const handleNavClick = useCallback(
    (
      e: React.MouseEvent<HTMLAnchorElement>,
      item: { name: string; href: string },
      closeMobile = false
    ) => {
      e.preventDefault();
      if (closeMobile) setIsOpen(false);

      if (item.href === '/') {
        router.push('/');
      } else {
        const element = document.querySelector(item.href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [router]
  );

  if (!mounted) return null;

  return (
    <header className='fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50'>
      <nav className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center py-4'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <span className='text-xl font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent'>
              CO
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-8'>
              {NAV_ITEMS.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className='text-muted-foreground hover:text-primary transition-chelsea text-sm font-medium relative group'
                  onClick={e => handleNavClick(e, item)}
                >
                  {item.name}
                  <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full'></span>
                </a>
              ))}
            </div>
          </div>

          {/* Theme toggle & Mobile menu button */}
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='icon'
              className='hover:bg-primary/10 hover:text-primary transition-chelsea'
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label='Toggle theme'
            >
              {theme === 'dark' ? (
                <Sun className='h-4 w-4' />
              ) : (
                <Moon className='h-4 w-4' />
              )}
            </Button>
            <DownloadCV />
            <Button
              variant='ghost'
              size='icon'
              className='md:hidden hover:bg-primary/10 hover:text-primary transition-chelsea'
              onClick={() => setIsOpen(prev => !prev)}
              aria-label='Toggle mobile menu'
            >
              {isOpen ? (
                <X className='h-4 w-4' />
              ) : (
                <Menu className='h-4 w-4' />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className='md:hidden border-t border-border/50'
            >
              <div className='px-2 pt-2 pb-3 space-y-1'>
                {NAV_ITEMS.map(item => (
                  <a
                    key={item.name}
                    href={item.href}
                    className='block px-3 py-2 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-chelsea rounded-md'
                    onClick={e => handleNavClick(e, item, true)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

const DownloadCV = () => {
  return (
    <Button
      variant='outline'
      className='hover:bg-primary/10 hover:text-primary hover:border-primary bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text transition-chelsea'
      size='icon'
      onClick={() =>
        window?.open('/files/ChukwumdiebubeOjinta.pdf', '_blank')
      }
    >
      <FileDown className='h-4 w-4' />
    </Button>
  );
};
