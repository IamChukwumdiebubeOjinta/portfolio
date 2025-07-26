'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const technologies = [
  {
    name: 'JavaScript',
    icon: '/images/logos/icon-javascript.svg',
    category: 'Language',
    hasIcon: true,
  },
  {
    name: 'TypeScript',
    icon: '/images/logos/icon-typescript.svg',
    category: 'Language',
    hasIcon: true,
  },
  {
    name: 'React',
    icon: '/images/logos/icon-react.svg',
    category: 'Frontend',
    hasIcon: true,
  },
  {
    name: 'Next.js',
    icon: '/images/logos/icon-nextjs.svg',
    category: 'Framework',
    hasIcon: true,
  },
  {
    name: 'Remix',
    icon: '/images/logos/icon-remix.svg',
    category: 'Framework',
    hasIcon: true,
  },
  {
    name: 'Node.js',
    icon: '/images/logos/icon-nodejs.svg',
    category: 'Backend',
    hasIcon: true,
  },
  {
    name: 'Express',
    icon: '/images/logos/icon-express.svg',
    category: 'Backend',
    hasIcon: true,
  },
  {
    name: 'Nest.js',
    icon: '/images/logos/icon-nest.svg',
    category: 'Backend',
    hasIcon: true,
  },
  {
    name: 'FastAPI',
    icon: '/images/logos/icon-fastapi.svg',
    category: 'Backend',
    hasIcon: true,
  },
  {
    name: 'PostgreSQL',
    icon: '/images/logos/icon-postgresql.svg',
    category: 'Database',
    hasIcon: true,
  },
  {
    name: 'MongoDB',
    icon: '/images/logos/icon-mongodb.svg',
    category: 'Database',
    hasIcon: true,
  },
  {
    name: 'Prisma',
    icon: '/images/logos/icon-prisma.svg',
    category: 'ORM',
    hasIcon: true,
  },
  {
    name: 'Docker',
    icon: '/images/logos/icon-docker.svg',
    category: 'DevOps',
    hasIcon: true,
  },
  {
    name: 'Tailwind CSS',
    icon: '/images/logos/icon-tailwindcss.svg',
    category: 'Styling',
    hasIcon: true,
  },
  {
    name: 'Digital Ocean',
    icon: '/images/logos/icon-digitalocean.svg',
    category: 'Cloud',
    hasIcon: true,
  },
  {
    name: 'Figma',
    icon: '/images/logos/icon-figma.svg',
    category: 'Design',
    hasIcon: true,
  },
  {
    name: 'Git',
    icon: '/images/logos/icon-git.svg',
    category: 'Tools',
    hasIcon: true,
  },
  {
    name: 'Socket.io',
    icon: '/images/logos/icon-socket.svg',
    category: 'Real-time',
    hasIcon: true,
  },
];

const INITIAL_ITEMS_COUNT = 12;

export function TechStack() {
  const [showAll, setShowAll] = useState(false);

  const visibleTechnologies = showAll 
    ? technologies 
    : technologies.slice(0, INITIAL_ITEMS_COUNT);

  const hasMoreItems = technologies.length > INITIAL_ITEMS_COUNT;

  return (
    <section id='tech-stack' className='py-20 px-4 bg-muted/30'>
      <div className='max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <h2 className='text-3xl md:text-4xl font-bold mb-4'>
            The skills, tools and technologies I really enjoy working with
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            A curated selection of technologies I use to bring ideas to life
          </p>
        </motion.div>

        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6'>
          <AnimatePresence>
            {visibleTechnologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className='group'
              >
                <div className='bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10'>
                  <div className='text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center'>
                    {tech.hasIcon ? (
                      <Image
                        src={tech.icon}
                        alt={tech.name}
                        width={48}
                        height={48}
                        className='w-12 h-12'
                      />
                    ) : (
                      <span>{tech.icon}</span>
                    )}
                  </div>
                  <h3 className='font-semibold text-sm mb-1'>{tech.name}</h3>
                  <p className='text-xs text-muted-foreground'>{tech.category}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {hasMoreItems && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className='text-center mt-12'
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className='inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium'
            >
              {showAll ? (
                <>
                  <ChevronUp className='w-4 h-4' />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className='w-4 h-4' />
                  See More
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
