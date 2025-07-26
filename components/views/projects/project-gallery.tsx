'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === 0 ? images.length - 1 : selectedImage - 1
      );
    }
  };

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className='text-3xl font-bold mb-8'>Project Gallery</h2>

        {/* Main Image */}
        <div className='mb-6'>
          <motion.div
            className='relative aspect-video rounded-xl overflow-hidden shadow-2xl cursor-pointer group'
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedImage(0)}
          >
            <img
              src={images[0] || '/placeholder.svg'}
              alt={`${title} - Main Screenshot`}
              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
            />
            <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center'>
              <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <Button size='lg' className='gap-2'>
                  View Full Size
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Thumbnail Grid */}
        {images.length > 1 && (
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {images.slice(1).map((image, index) => (
              <motion.div
                key={index + 1}
                className='relative aspect-video rounded-lg overflow-hidden cursor-pointer group'
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedImage(index + 1)}
              >
                <img
                  src={image || '/placeholder.svg'}
                  alt={`${title} - Screenshot ${index + 2}`}
                  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                />
                <div className='absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300' />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4'
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className='relative max-w-6xl max-h-full'
              onClick={e => e.stopPropagation()}
            >
              <img
                src={images[selectedImage] || '/placeholder.svg'}
                alt={`${title} - Screenshot ${selectedImage + 1}`}
                className='max-w-full max-h-full object-contain rounded-lg'
              />

              {/* Navigation */}
              {images.length > 1 && (
                <>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white'
                    onClick={prevImage}
                  >
                    <ChevronLeft className='h-6 w-6' />
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white'
                    onClick={nextImage}
                  >
                    <ChevronRight className='h-6 w-6' />
                  </Button>
                </>
              )}

              {/* Close Button */}
              <Button
                variant='ghost'
                size='icon'
                className='absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white'
                onClick={() => setSelectedImage(null)}
              >
                <X className='h-6 w-6' />
              </Button>

              {/* Image Counter */}
              <div className='absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm'>
                {selectedImage + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
