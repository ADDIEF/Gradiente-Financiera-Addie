/**
 * SolverResults.tsx — Tarjetas de resultados por método (Cholesky, GC, GCP).
 * Diseño contenido: el texto del vector no se desborda ni rompe el layout.
 */

import { motion } from 'framer-motion';
import { Timer, ArrowRight, Check } from 'lucide-react';
import type { SolveResult } from '@/types';

export function SolverCard({
  result,
  isReference = false,
}: {
  result: SolveResult;
  isReference?: boolean;
}) {
  const color = isReference
    ? 'text-brand-400 border-brand-500/40 bg-brand-500/10'
    : result.converged
      ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
      : 'text-rose-400 border-rose-500/30 bg-rose-500/10';

  const iconBg = isReference
    ? 'bg-brand-500/20 border border-brand-500/40'
    : 'bg-slate-800/50 border border-slate-700/50';

  const vectorText = `x ≈ [${result.x.map((v) => v.toFixed(4)).join(', ')}]`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      className={`flex flex-col gap-3 p-4 rounded-xl border ${color} max-w-full`}
    >
      {/* Ícono */}
      <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}>
        {isReference ? (
          <ArrowRight className="w-4 h-4 text-brand-400" />
        ) : result.converged ? (
          <Check className="w-4 h-4 text-emerald-400" />
        ) : (
          <Timer className="w-4 h-4 text-rose-400" />
        )}
      </div>

      {/* Nombre del método */}
      <div className="flex items-baseline gap-1.5">
        <span className="font-bold text-sm truncate">{result.method}</span>
        {isReference && (
          <span className="text-xs text-slate-500 ml-1">(referencia)</span>
        )}
      </div>

      {/* Vector solución: contenido y sin desbordar */}
      <div className="text-xs text-slate-400 font-mono truncate leading-tight">
        {vectorText}
      </div>

      {/* Métricas en dos filas para no ensanchar la tarjeta */}
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="text-xs">
          <span className="block text-slate-500">Iteraciones</span>
          <span className="block font-mono text-slate-200">{result.iterations}</span>
        </div>
        <div className="text-xs">
          <span className="block text-slate-500">||r||</span>
          <span className="block font-mono text-slate-200">
            {result.residualNorm.toExponential(2)}
          </span>
        </div>
        <div className="text-xs">
          <span className="block text-slate-500">Resid. relativo</span>
          <span className="block font-mono text-slate-200">
            {result.relativeResidual.toExponential(2)}
          </span>
        </div>
        <div className="text-xs">
          <span className="block text-slate-500">Tiempo</span>
          <span className="block font-mono text-slate-200">
            {result.timeMs.toFixed(2)} ms
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function SolverResults({
  direct,
  gc,
  gcp,
}: {
  direct: SolveResult;
  gc: SolveResult;
  gcp: SolveResult;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <SolverCard result={direct} isReference />
      <SolverCard result={gc} />
      <SolverCard result={gcp} />
    </div>
  );
}
