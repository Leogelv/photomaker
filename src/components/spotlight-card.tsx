import { useRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function SpotlightCard({ className, children, ...props }: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={divRef}
      className={cn(
        'relative h-full overflow-hidden rounded-xl border border-white/[0.08] bg-background-secondary p-px',
        'before:pointer-events-none before:absolute before:-inset-px before:rounded-xl before:border before:border-white/15',
        'after:pointer-events-none after:absolute after:inset-0 after:rounded-[11px] after:bg-[radial-gradient(600px_circle_at_var(--mouse-x,100px)_var(--mouse-y,100px),rgba(120,119,198,0.1),transparent_40%)]',
        className
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <div className="relative h-full rounded-xl bg-background-secondary p-6">
        {children}
      </div>
    </div>
  );
} 