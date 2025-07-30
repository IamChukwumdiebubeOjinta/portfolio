import type React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import LayoutShell from '@/components/shared/LayoutShell';
import { Toaster } from '@/components/ui/toaster';
import { inter, spaceGrotesk } from '@/lib/fonts';
import ErrorBoundary from '@/components/error-boundary';

export const metadata: Metadata = {
  title: 'Chukwumdiebube Ojinta - Full-Stack Engineer & AI Systems Architect',
  description:
    'Portfolio of Chukwumdiebube Ojinta, a full-stack engineer specializing in AI-powered applications, Remix, React, and modern web technologies.',
  keywords: [
    'Full-Stack Engineer',
    'AI Systems',
    'React',
    'Remix',
    'Next.js',
    'TypeScript',
  ],
  authors: [{ name: 'Chukwumdiebube Ojinta' }],
  openGraph: {
    title: 'Chukwumdiebube Ojinta - Full-Stack Engineer & AI Systems Architect',
    description: 'Building modern, intelligent, user-first digital experiences',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <ErrorBoundary>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange
          >
            <LayoutShell>{children}</LayoutShell>
            <Toaster />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
