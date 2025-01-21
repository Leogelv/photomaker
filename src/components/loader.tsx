import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

export function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md">
      <div className="relative">
        {/* Фоновые градиенты */}
        <div className="absolute -inset-32 animate-pulse">
          <div className="absolute inset-0 rotate-0 animate-pulse rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute inset-0 rotate-90 animate-pulse rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute inset-0 rotate-180 animate-pulse rounded-full bg-accent/20 blur-3xl" />
        </div>
        
        {/* Контент */}
        <div className="relative space-y-6 text-center">
          {/* Анимированный спиннер */}
          <div className="relative mx-auto h-32 w-32">
            {/* Внешний круг */}
            <motion.div 
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <div className="h-full w-full rounded-full border-2 border-primary/20">
                <div className="absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary" />
              </div>
            </motion.div>

            {/* Средний круг */}
            <motion.div 
              className="absolute inset-4"
              animate={{ rotate: -360 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            >
              <div className="h-full w-full rounded-full border-2 border-secondary/40">
                <div className="absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-secondary" />
              </div>
            </motion.div>

            {/* Внутренний круг */}
            <motion.div 
              className="absolute inset-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="h-full w-full rounded-full border-2 border-accent/60">
                <div className="absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-accent" />
              </div>
            </motion.div>

            {/* Иконка в центре */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Icon 
                icon="ph:wand-duotone" 
                className="h-8 w-8 text-primary" 
              />
            </motion.div>
          </div>

          {/* Текст */}
          <div className="space-y-2">
            <motion.p 
              className="text-2xl font-medium text-foreground"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Создаём шедевр...
            </motion.p>
            <p className="text-foreground/60">
              Это может занять некоторое время
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 