// Social Media and Contact Configuration
export const config = {
  // Personal Information
  personal: {
    name: process.env.NEXT_PUBLIC_PERSONAL_NAME || 'Ebube Ojinta',
    title: process.env.NEXT_PUBLIC_PERSONAL_TITLE || 'Full-Stack Engineer & AI Systems Architect',
    email: process.env.NEXT_PUBLIC_PERSONAL_EMAIL || 'chukwumdiebubeojiinta@gmail.com',
    phone: process.env.NEXT_PUBLIC_PERSONAL_PHONE || '+234 8100610538',
    website: process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://ojinta.dev',
  },

  // Social Media Links
  social: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/yourusername',
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/in/yourusername',
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com/yourusername',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/yourusername',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://facebook.com/yourusername',
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://youtube.com/@yourusername',
    medium: process.env.NEXT_PUBLIC_MEDIUM_URL || 'https://medium.com/@yourusername',
    devto: process.env.NEXT_PUBLIC_DEVTO_URL || 'https://dev.to/yourusername',
    hashnode: process.env.NEXT_PUBLIC_HASHNODE_URL || 'https://hashnode.dev/@yourusername',
    dribbble: process.env.NEXT_PUBLIC_DRIBBBLE_URL || 'https://dribbble.com/yourusername',
    behance: process.env.NEXT_PUBLIC_BEHANCE_URL || 'https://behance.net/yourusername',
  },

  // Contact Form Configuration
  contact: {
    email: process.env.CONTACT_EMAIL || 'chukwumdiebubeojiinta@gmail.com',
    subject: process.env.CONTACT_DEFAULT_SUBJECT || 'New message from your portfolio',
    body: process.env.CONTACT_DEFAULT_BODY || 'Hi there, I would like to discuss a project with you.',
  },

  // Email Configuration
  email: {
    from: process.env.EMAIL_FROM || 'noreply@ojinta.dev',
    replyTo: process.env.EMAIL_REPLY_TO || 'chukwumdiebubeojiinta@gmail.com',
    logoUrl: process.env.NEXT_PUBLIC_LOGO_URL || 'https://ojinta.dev/images/logos/profile/ebube-high-resolution-logo-white-on-transparent-background.png',
  },

  // Portfolio Configuration
  portfolio: {
    title: process.env.NEXT_PUBLIC_PORTFOLIO_TITLE || 'Chukwumdiebube Ojinta - Portfolio',
    description: process.env.NEXT_PUBLIC_PORTFOLIO_DESCRIPTION || 'Full-Stack Engineer & AI Systems Architect',
    keywords: process.env.NEXT_PUBLIC_PORTFOLIO_KEYWORDS || 'Full-Stack Engineer, AI Systems, React, Remix, Next.js, TypeScript',
  },
} as const;

// Type for social media platforms
export type SocialPlatform = keyof typeof config.social;

// Helper function to get social links
export const getSocialLinks = () => {
  return Object.entries(config.social).filter(([_, url]) => url && url !== '');
};

// Helper function to check if a social platform is configured
// export const hasSocialLink = (platform: SocialPlatform): boolean => {
//   const url = config.social[platform];
//   return url && url !== '' && !url.includes('yourusername');
// };

// Helper function to get contact information
export const getContactInfo = () => {
  return {
    email: config.personal.email,
    phone: config.personal.phone,
    website: config.personal.website,
  };
}; 