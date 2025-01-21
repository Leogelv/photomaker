import { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { FileUpload } from './file-upload';
import { cn } from '@/lib/utils';
import type { Category, GenerationResult } from '@/types';

interface GenerationFormProps {
  category: Category;
  onGenerate: (data: GenerationResult) => void;
}

export function GenerationForm({ category, onGenerate }: GenerationFormProps) {
  const [prompt, setPrompt] = useState(category.presets[0].prompt);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('prompt', prompt);
      formData.append('file', file);

      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to generate images');
      }

      const data = await response.json();
      onGenerate({ urls: data.output });
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="overflow-hidden rounded-xl border border-white/[0.08] bg-background-secondary h-full"
    >
      <form onSubmit={handleSubmit} className="grid h-full grid-cols-1 lg:grid-cols-[400px,1fr] lg:divide-x lg:divide-white/[0.08]">
        {/* Левая колонка - Загрузка фото */}
        <div className="flex h-full flex-col space-y-6 p-8">
          {/* Заголовок */}
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Icon 
                icon={category.icon} 
                className="h-6 w-6 text-primary" 
              />
            </div>
            <h2 className="text-2xl font-semibold text-foreground">
              {category.title}
            </h2>
          </div>

          {/* Загрузка фото */}
          <div className="flex-1">
            <FileUpload 
              file={file} 
              onFileSelect={setFile} 
            />
          </div>
        </div>

        {/* Правая колонка - Настройки */}
        <div className="space-y-8 p-8">
          {/* Описание */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground/80">
              <Icon 
                icon="ph:sparkle-duotone" 
                className="h-4 w-4" 
              />
              Опиши свою идею
            </label>
            <div className="group relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className={cn(
                  "h-32 w-full resize-none rounded-lg border border-white/[0.08] bg-background p-4",
                  "text-foreground placeholder:text-foreground/40",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50",
                  "transition-colors"
                )}
                placeholder="Опиши желаемую фотографию подробно..."
              />
              <div className="absolute -bottom-3 -right-3 h-32 w-32 rounded-full bg-primary/5 blur-2xl 
                           opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          </div>

          {/* Пресеты */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground/80">
              <Icon 
                icon="ph:sparkle-duotone" 
                className="h-4 w-4" 
              />
              Быстрые пресеты
            </label>
            <div className="grid grid-cols-2 gap-4">
              {category.presets.map((preset) => (
                <motion.button
                  key={preset.name}
                  type="button"
                  onClick={() => setPrompt(preset.prompt)}
                  className={cn(
                    "group relative overflow-hidden rounded-lg border border-white/[0.08] bg-background p-4 text-left",
                    "hover:border-primary/20 hover:bg-primary/5",
                    "transition-colors"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="block font-medium text-foreground">
                    {preset.name}
                  </span>
                  <span className="mt-1 block truncate text-sm text-foreground/60">
                    {preset.prompt}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Кнопка генерации */}
          <motion.button
            type="submit"
            className={cn(
              "group relative w-full overflow-hidden rounded-lg bg-primary px-8 py-3",
              "hover:bg-primary-hover active:scale-[0.98]",
              "transition-all duration-300",
              !file && "opacity-50 cursor-not-allowed",
              isLoading && "opacity-50 cursor-wait"
            )}
            whileHover={{ scale: file && !isLoading ? 1.02 : 1 }}
            whileTap={{ scale: file && !isLoading ? 0.98 : 1 }}
            disabled={!file || isLoading}
          >
            <div className="relative flex items-center justify-center gap-2">
              <Icon 
                icon={isLoading ? "ph:circle-notch-duotone" : "ph:wand-duotone"}
                className={cn(
                  "h-6 w-6",
                  isLoading && "animate-spin"
                )}
              />
              <span className="text-lg font-medium">
                {isLoading ? 'Генерируем...' : 'Сгенерировать'}
              </span>
            </div>
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
} 