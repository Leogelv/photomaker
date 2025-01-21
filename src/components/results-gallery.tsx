import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import type { GenerationResult } from '@/types';

interface ResultsGalleryProps {
  results: GenerationResult;
  onClose: () => void;
}

export function ResultsGallery({ results, onClose }: ResultsGalleryProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-8 backdrop-blur-sm">
      <motion.div 
        className="relative w-full max-w-4xl overflow-hidden rounded-xl border border-white/[0.08] bg-background-secondary p-8"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        {/* Фоновый градиент */}
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-border opacity-10 blur-3xl" />
        
        {/* Контент */}
        <div className="relative">
          {/* Заголовок */}
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-3xl font-semibold text-foreground">
              Твои фотографии готовы
            </h3>
            <button
              onClick={onClose}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg",
                "bg-white/5 hover:bg-white/10",
                "transition-colors"
              )}
            >
              <Icon 
                icon="ph:x-duotone" 
                className="h-5 w-5 text-foreground/60 transition-colors hover:text-foreground" 
              />
            </button>
          </div>
          
          {/* Галерея */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            {Array.isArray(results.urls) && results.urls.map((url, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group aspect-square"
              >
                <div 
                  className="relative h-full w-full cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => window.open(url, '_blank')}
                >
                  {/* Фоновый градиент при наведении */}
                  <div className="absolute inset-0 bg-gradient-border opacity-0 transition-opacity group-hover:opacity-20" />
                  
                  {/* Изображение */}
                  <img
                    src={url}
                    alt={`Generated photo ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
} 