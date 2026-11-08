import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface InputFieldProps {
  value: number | string;
  onChange: (value: number) => void;
  label?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

export function InputField({
  value,
  onChange,
  label,
  placeholder,
  min,
  max,
  step = 0.1,
  disabled = false,
  error = false,
  className,
}: InputFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseFloat(e.target.value);
    if (!isNaN(parsed)) onChange(parsed);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn('flex flex-col gap-1.5', className)}
    >
      {label && (
        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        type="number"
        step={String(step)}
        min={min == null ? undefined : min}
        max={max == null ? undefined : max}
        value={typeof value === 'number' ? value.toString() : value}
        onChange={handleChange}
        disabled={disabled}
        className={cn(
          'w-full rounded-xl px-3.5 py-2.5 text-sm font-mono text-slate-100',
          'placeholder-slate-500/60',
          'focus:outline-none focus:ring-2 focus:ring-brand-500/60 focus:border-transparent',
          'transition-all duration-200',
          'border border-slate-700/60 bg-slate-900/60',
          disabled && 'bg-slate-800/40 text-slate-500 cursor-not-allowed',
          error && 'border-rose-500/60 focus:ring-rose-500/60'
        )}
        placeholder={placeholder}
      />
    </motion.div>
  );
}
