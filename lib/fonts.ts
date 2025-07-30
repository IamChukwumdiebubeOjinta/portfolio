import { Inter, Space_Grotesk } from 'next/font/google';

// Configure Inter font with minimal configuration for better build compatibility
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: false, // Disable preloading to avoid build-time network requests
});

// Configure Space Grotesk font with minimal configuration
export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: false, // Disable preloading to avoid build-time network requests
});

// Fallback font stacks for when Google Fonts fail
export const fallbackFonts = {
  sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  heading: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
}; 