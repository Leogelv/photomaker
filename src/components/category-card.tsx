import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import type { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  className?: string;
  animationDelay?: number;
}

export function CategoryCard({ category, className, animationDelay = 0 }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animationDelay / 1000 }}
      className={cn('flex h-full flex-col', className)}
    >
      {/* Иконка */}
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
        <Icon 
          icon={category.icon} 
          className="h-7 w-7 text-primary transition-colors group-hover:text-primary-hover" 
        />
      </div>

      {/* Текст */}
      <div className="flex flex-1 flex-col">
        <h3 className="mb-2 text-xl font-semibold text-foreground">
          {category.title}
        </h3>
        <p className="flex-1 text-foreground/60">
          {category.description}
        </p>
      </div>

      {/* Декоративная линия */}
      <div className="mt-6 h-px w-full bg-gradient-border opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.div>
  );
} 