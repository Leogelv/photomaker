'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { CategoryCard } from '@/components/category-card';
import { GenerationForm } from '@/components/generation-form';
import { Loader } from '@/components/loader';
import { ResultsGallery } from '@/components/results-gallery';
import { SpotlightCard } from '@/components/spotlight-card';
import { CATEGORIES } from '@/config/categories';
import { cn } from '@/lib/utils';
import type { Category, GenerationResult } from '@/types';

const emojis = ['✨', '🎨', '🎭', '📸', '🌟', '🎯', '🎪', '🎬', '🎮', '🎲'];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [emojiPositions, setEmojiPositions] = useState<Array<{ top: string; left: string }>>([]);

  // Инициализируем позиции эмодзи после монтирования компонента
  useEffect(() => {
    setEmojiPositions(
      emojis.map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      }))
    );
  }, []);

  const handleGenerate = async (data: GenerationResult) => {
    try {
      setIsGenerating(true);
      setError(null);
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Что-то пошло не так');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background px-6 py-12 md:px-12 md:py-24">
      {/* Фоновые элементы */}
      <div className="pointer-events-none absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)]" />
      
      <div className="absolute left-1/2 top-0 aspect-square w-full -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 rotate-45 animate-spotlight opacity-40 [background:radial-gradient(600px_circle_at_var(--mouse-x,0)_var(--mouse-y,0),rgba(120,119,198,0.1),transparent_40%)]" />
      </div>

      {/* Анимированные эмодзи */}
      {emojiPositions.map((position, index) => (
        <motion.div
          key={index}
          className="pointer-events-none absolute text-4xl"
          initial={{ 
            top: position.top,
            left: position.left,
            opacity: 0,
            scale: 0
          }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -100, -200]
          }}
          transition={{
            duration: 4,
            delay: index * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {emojis[index]}
        </motion.div>
      ))}

      {/* Градиентные шары */}
      <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute right-1/4 top-1/2 h-96 w-96 animate-pulse rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute bottom-1/4 left-1/2 h-96 w-96 animate-pulse rounded-full bg-accent/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Заголовок */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-16 text-center"
        >
          <h1 className={cn(
            "bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-6xl font-bold text-transparent md:text-7xl",
            "animate-fade-up [text-wrap:balance]"
          )}>
            AI Фотограф
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-foreground/60 [text-wrap:balance]"
          >
            Создавай профессиональные фотографии с помощью искусственного интеллекта
          </motion.p>
        </motion.div>

        {/* Основной контент */}
        <div className="relative">
          {!selectedCategory ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {CATEGORIES.map((category, index) => (
                <SpotlightCard key={category.id} className="group" onClick={() => setSelectedCategory(category)}>
                  <CategoryCard 
                    category={category} 
                    className="h-full" 
                    animationDelay={index * 100} 
                  />
                </SpotlightCard>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <button
                onClick={() => setSelectedCategory(null)}
                className="group flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground"
              >
                <Icon 
                  icon="ph:arrow-left-duotone"
                  className="h-5 w-5 transition-transform group-hover:-translate-x-1"
                />
                <span>Назад к категориям</span>
              </button>
              
              <GenerationForm 
                category={selectedCategory}
                onGenerate={handleGenerate}
              />
            </motion.div>
          )}
        </div>

        {/* Оверлеи */}
        {isGenerating && <Loader />}
        
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 z-50 rounded-lg bg-destructive/10 px-6 py-4 text-destructive"
          >
            {error}
          </motion.div>
        )}

        {results && (
          <ResultsGallery 
            results={results}
            onClose={() => setResults(null)}
          />
        )}
      </div>
    </div>
  );
}