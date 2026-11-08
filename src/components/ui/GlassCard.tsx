import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface GlassCardProps {
  children: React.ReactNode;
  padded?: boolean;
  blur?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
  borderOpacity?: string;
  bgOpacity?: string;
  className?: string;
}

export function GlassCard({
  children,
  className,
  padded = true,
  blur = 'md',
  borderOpacity = 'border-white/10',
  bgOpacity = 'bg-white/5',
}: GlassCardProps) {
  const blurClass = {
    none: '',
    xs: 'backdrop-blur-xs',
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
  }[blur];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ type: 'spring', damping: 18, stiffness: 120 }}
      className={cn(
        'relative rounded-2xl overflow-hidden border',
        borderOpacity,
        bgOpacity,
        blurClass,
        'shadow-2xl',
        'text-slate-200',
        padded ? 'p-6 sm:p-8' : 'p-4',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function GlassCardStatic({
  children,
  className,
  padded = true,
  blur = 'md',
  borderOpacity = 'border-white/10',
  bgOpacity = 'bg-white/5',
}: GlassCardProps) {
  const blurClass = {
    none: '',
    xs: 'backdrop-blur-xs',
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
  }[blur];

  return (
    <div
      className={cn(
        'relative rounded-2xl overflow-hidden border',
        borderOpacity,
        bgOpacity,
        blurClass,
        'shadow-2xl',
        'text-slate-200',
        padded ? 'p-6 sm:p-8' : 'p-4',
        className
      )}
    >
      {children}
    </div>
  );
}

export default GlassCard;
