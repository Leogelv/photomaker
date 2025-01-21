import { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  file: File | null;
  onFileSelect: (file: File | null) => void;
}

const typewriterText = "Загрузи свое фото для преобразования...";

export function FileUpload({ file, onFileSelect }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const controls = useAnimation();
  
  // Анимация тайпрайтера
  useEffect(() => {
    const timer = setInterval(() => {
      setTypewriterIndex(i => (i + 1) % (typewriterText.length + 1));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Пульсирующая анимация иконки
  useEffect(() => {
    controls.start({
      scale: [1, 1.1, 1],
      transition: { 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    });
  }, [controls]);

  // Обработчики перетаскивания
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="relative group h-full">
      {/* Внешнее свечение */}
      <div className="absolute -inset-[30px] bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 rounded-[30px] opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Анимированная рамка */}
      <div 
        className="absolute -inset-[2px] bg-gradient-border [--angle:45deg] rounded-xl opacity-20 transition-opacity duration-500 group-hover:opacity-100"
        style={{ animation: "gradient-rotate 8s linear infinite" }} 
      />
      
      {/* Внутреннее свечение */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl opacity-20 blur-sm transition-opacity duration-500 group-hover:opacity-100" />

      {/* Основной контейнер */}
      <div 
        onClick={() => inputRef.current?.click()}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative flex h-full cursor-pointer flex-col items-center justify-center gap-4",
          "rounded-xl bg-background/80 backdrop-blur-sm",
          "transition-all duration-300",
          dragActive && "bg-primary/5",
        )}
      >
        {/* Превью или плейсхолдер */}
        {file ? (
          <div className="relative h-full w-full rounded-xl overflow-hidden">
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <p className="text-sm font-medium text-white">
                Нажми чтобы изменить
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 p-8">
            <motion.div 
              animate={controls}
              className="rounded-full bg-white/[0.08] p-4"
            >
              <Icon 
                icon="ph:image-duotone"
                className="h-8 w-8 text-primary" 
              />
            </motion.div>
            <div className="space-y-1 text-center">
              <p className="h-6 text-sm font-medium text-foreground">
                {typewriterText.slice(0, typewriterIndex)}
                <span className="animate-pulse">|</span>
              </p>
              <p className="text-xs text-foreground/60">
                PNG, JPG или WEBP (макс. 5MB)
              </p>
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>
    </div>
  );
} 