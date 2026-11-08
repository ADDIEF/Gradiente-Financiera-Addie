import { motion } from 'framer-motion';
import {
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  Info,
} from 'lucide-react';
import type { Toast } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ICONS: Record<Toast['tipo'], React.ReactNode> = {
  error: <AlertCircle className="w-5 h-5 text-rose-400" />,
  success: <CheckCircle className="w-5 h-5 text-emerald-400" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-400" />,
  info: <Info className="w-5 h-5 text-brand-400" />,
};

const COLORS: Record<Toast['tipo'], string> = {
  error: 'border-rose-500/50 bg-rose-500/10 text-rose-100',
  success: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-100',
  warning: 'border-amber-500/50 bg-amber-500/10 text-amber-100',
  info: 'border-brand-500/50 bg-brand-500/10 text-brand-100',
};

interface ToastProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

export function Toast({ toast, onDismiss }: ToastProps) {
  const Icon = ICONS[toast.tipo];
  const color = COLORS[toast.tipo];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0, x: 20 }}
      animate={{ y: 0, opacity: 1, x: 0 }}
      exit={{ y: 20, opacity: 0, x: 20 }}
      transition={{ type: 'spring', damping: 22, stiffness: 300 }}
      className={cn(
        'flex items-start gap-3 rounded-xl px-4 py-3 border text-sm font-medium',
        'backdrop-blur-md shadow-xl',
        color
      )}
    >
      <div className="flex-shrink-0 mt-0.5">{Icon}</div>
      <div className="flex-1 leading-snug">
        <div className="font-semibold">{toast.titulo}</div>
        <div className="text-sm mt-0.5 opacity-90">{toast.mensaje}</div>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="ml-2 p-1 opacity-50 hover:opacity-100 rounded hover:bg-white/10 transition"
        aria-label="Cerrar notificación"
      >
        <span className="sr-only">Cerrar</span>
        <span className="w-4 h-4" aria-hidden="true">✕</span>
      </button>
    </motion.div>
  );
}
