/**
 * ErrorTable.tsx — Tabla interactiva de errores por variable (Ea, Er, Ep).
 * Respetando la definición del docente:
 *   Ea,i = |x_ref,i − x_GCP,i|
 *   Er,i = Ea,i / |x_ref,i| (no definido si x_ref,i = 0)
 *   Ep,i = Er,i × 100%
 */

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import type { ErrorMetrics } from '@/types';

interface ErrorTableProps {
  metodo: 'GC' | 'GCP';
  errors: ErrorMetrics;
  titulo: string;
  color: string;
}

export function ErrorTable({
  metodo,
  errors,
  titulo,
  color,
}: ErrorTableProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="space-y-3"
      >
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${color}`} />
          <h3 className="text-sm font-semibold text-slate-200">{titulo}</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-700/30 rounded-xl">
            <thead>
              <tr className="border-b border-slate-700/40 bg-slate-900/40">
                <th className="py-2.5 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Variable
                </th>
                <th className="py-2.5 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">
                  x Referencia
                </th>
                <th className="py-2.5 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">
                  x Aproximado
                </th>
                <th className="py-2.5 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">
                  Error Absoluto (Ea)
                </th>
                <th className="py-2.5 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">
                  Error Relativo (Er)
                </th>
                <th className="py-2.5 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">
                  Error Porcentual (Ep)
                </th>
              </tr>
            </thead>
            <tbody>
              {errors.componentWise.map((c) => (
                <tr
                  key={c.i}
                  className="border-b border-slate-800/20 hover:bg-white/3 transition"
                >
                  <td className="py-2.5 px-3 font-mono text-sm text-slate-300">
                    {c.variable} (x{c.i})
                  </td>
                  <td className="py-2.5 px-3 font-mono text-sm text-right text-slate-200">
                    {c.xRef.toFixed(4)}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-sm text-right text-slate-200">
                    {c.xApprox.toFixed(4)}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-sm text-right text-slate-200">
                    {c.ea.toExponential(3)}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-sm text-right text-slate-200">
                    {c.er === null ? 'N/D (xref=0)' : c.er.toExponential(3)}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-sm text-right">
                    <span className={cnErrorColor(c.ep)}>
                      {c.ep === null ? '—' : c.ep.toFixed(4) + '%'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2">
          <div className="text-xs text-slate-400 font-mono">
            Error absoluto total: {errors.absolute.toExponential(3)}
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Error relativo total: {errors.relative.toExponential(3)}
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Error porcentual total: {errors.percentage.toFixed(4)}%
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Residuo relativo global: {errors.globalRelativeResidual.toExponential(3)}
          </div>
        </div>

        <div className="mt-2 p-2.5 rounded-lg bg-slate-900/40 border border-slate-700/30">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-slate-400 leading-relaxed">
              Definición (según rúbrica del desafío):{' '}
              <strong>Ea,i = |x_ref,i − x_metodo,i</strong> | <strong>Er,i = Ea,i / |x_ref,i|</strong> |
              <strong>Ep,i = Er,i × 100%</strong>. Si x_ref,i = 0, el error relativo no está definido.
              El residuo relativo global mide ||b − Ax||₂ / ||b||₂.
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function cnErrorColor(ep: number | null): string {
  if (ep === null) return 'text-slate-500';
  if (ep < 1) return 'text-emerald-400';
  if (ep < 5) return 'text-amber-400';
  return 'text-rose-400';
}
