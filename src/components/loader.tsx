import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

const TOTAL_TIME = 60; // 60 секунд

export function Loader() {
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    "Подбираем лучший ракурс...",
    "Настраиваем освещение...",
    "Добавляем немного магии...",
    "Прорабатываем детали...",
    "Финальные штрихи..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    const tipTimer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(tipTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Фоновый блюр с градиентами */}
      <div className="absolute inset-0 backdrop-blur-xl">
        <div className="absolute inset-0 bg-background/80" />
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute right-1/4 top-1/2 h-96 w-96 animate-pulse rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/2 h-96 w-96 animate-pulse rounded-full bg-accent/20 blur-3xl" />
        </div>
      </div>

      <div className="relative">
        {/* Анимированный спиннер */}
        <div className="relative mx-auto h-40 w-40">
          {/* Внешний круг с прогрессом */}
          <svg className="absolute inset-0 h-full w-full -rotate-90">
            <circle
              className="text-white/[0.08]"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r="69"
              cx="80"
              cy="80"
            />
            <circle
              className="text-primary transition-all duration-1000"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r="69"
              cx="80"
              cy="80"
              strokeDasharray={440}
              strokeDashoffset={440 * (1 - (TOTAL_TIME - timeLeft) / TOTAL_TIME)}
            />
          </svg>

          {/* Вращающиеся круги */}
          <motion.div 
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div className="h-full w-full rounded-full border-2 border-primary/20">
              <div className="absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary" />
            </div>
          </motion.div>

          <motion.div 
            className="absolute inset-4"
            animate={{ rotate: -360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          >
            <div className="h-full w-full rounded-full border-2 border-secondary/40">
              <div className="absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-secondary" />
            </div>
          </motion.div>

          <motion.div 
            className="absolute inset-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="h-full w-full rounded-full border-2 border-accent/60">
              <div className="absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-accent" />
            </div>
          </motion.div>

          {/* Иконка и таймер в центре */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Icon 
                icon="ph:wand-duotone" 
                className="mb-2 h-8 w-8 text-primary" 
              />
            </motion.div>
            <span className="text-lg font-medium text-foreground">
              {timeLeft}s
            </span>
          </div>
        </div>

        {/* Текст */}
        <div className="mt-8 space-y-2 text-center">
          <AnimatePresence mode="wait">
            <motion.p 
              key={currentTip}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-2xl font-medium text-foreground"
            >
              {tips[currentTip]}
            </motion.p>
          </AnimatePresence>
          <p className="text-foreground/60">
            Создаём твой уникальный образ
          </p>
        </div>

        {/* Анимированные частицы */}
        <div className="absolute inset-0 -z-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-primary/40"
              initial={{
                x: Math.random() * 400 - 200,
                y: Math.random() * 400 - 200,
                scale: 0,
                opacity: 0
              }}
              animate={{
                x: Math.random() * 400 - 200,
                y: Math.random() * 400 - 200,
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 