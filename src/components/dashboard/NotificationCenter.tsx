/**
 * NotificationCenter.tsx — Centro de notificaciones animadas (toasts).
 */

import { motion, AnimatePresence } from 'framer-motion';
import type { Toast } from '@/types';

interface NotificationCenterProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export function NotificationCenter({ toasts, onDismiss }: NotificationCenterProps) {
  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: 'spring', damping: 22, stiffness: 300 }}
            className="pointer-events-auto"
          >
            <ToastItem toast={toast} onDismiss={onDismiss} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const ICONS: Record<Toast['tipo'], React.ReactNode> = {
    error: <span className="w-5 h-5 text-rose-400">⚠</span>,
    success: <span className="w-5 h-5 text-emerald-400">✓</span>,
    warning: <span className="w-5 h-5 text-amber-400">!</span>,
    info: <span className="w-5 h-5 text-brand-400">i</span>,
  };

  const COLORS: Record<Toast['tipo'], string> = {
    error: 'border-rose-500/50 bg-rose-500/10 text-rose-100',
    success: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-100',
    warning: 'border-amber-500/50 bg-amber-500/10 text-amber-100',
    info: 'border-brand-500/50 bg-brand-500/10 text-brand-100',
  };

  const Icon = ICONS[toast.tipo];
  const color = COLORS[toast.tipo];

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`flex items-start gap-3 rounded-xl px-4 py-3 border text-sm font-medium backdrop-blur-md shadow-2xl transition ${color}`}
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
