import type React from 'react';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

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
  generator: 'v0.dev',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap'
          rel='stylesheet'
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className='pt-16'>{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
