/**
 * EntradaDatosSection.tsx — Sección 4: Entrada de datos.
 * Edición de A, b, x0, tolerancia, precondicionador y controles de ejecución.
 */

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { useLinearSystemStore } from '@/context/useLinearSystemStore';
import { MatrixEditor } from '@/components/dashboard/MatrixEditor';
import { Cpu, Sliders, RefreshCw } from 'lucide-react';

export function EntradaDatosSection() {
  const {
    tol,
    maxIter,
    precondicionador,
    setTol,
    setMaxIter,
    setPrecondicionador,
    calcular,
    isCalculating,
    validarSPD,
  } = useLinearSystemStore();
  const isSPD = validarSPD();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="space-y-6"
    >
      <GlassCard>
        <MatrixEditor />
      </GlassCard>

      <GlassCard>
        <div className="flex items-center gap-3 mb-4">
          <Sliders className="w-5 h-5 text-brand-400" />
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Parámetros de ejecución
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Tolerancia (∥rₖ∥₂ / ∥b∥₂ {'<'} ε)
            </label>
            <input
              type="number"
              step="any"
              min="1e-15"
              max="1e-1"
              value={tol.toExponential(1)}
              onChange={(e) => {
                const v = parseFloat(e.target.value);
                if (!isNaN(v) && v > 0) setTol(v);
              }}
              className="w-full rounded-xl px-3 py-2 text-sm font-mono text-slate-100 border border-slate-700/60 bg-slate-900/60 focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Iteraciones máximas (Nmax)
            </label>
            <input
              type="number"
              min="1"
              max="10000"
              value={maxIter}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10);
                if (!isNaN(v) && v > 0) setMaxIter(v);
              }}
              className="w-full rounded-xl px-3 py-2 text-sm font-mono text-slate-100 border border-slate-700/60 bg-slate-900/60 focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Precondicionador
            </label>
            <select
              value={precondicionador}
              onChange={(e) =>
                setPrecondicionador(
                  e.target.value as 'jacobi' | 'ninguno'
                )
              }
              className="w-full rounded-xl px-3 py-2 text-sm font-mono text-slate-100 border border-slate-700/60 bg-slate-900/60 focus:ring-2 focus:ring-brand-500 focus:outline-none"
            >
              <option value="jacobi">Jacobi (diagonal)</option>
              <option value="ninguno">Ninguno (GC simple)</option>
            </select>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">
              Modifique los coeficientes y presione Calcular para resolver dinámicamente.
            </p>
          </div>
          <button
            onClick={calcular}
            disabled={isCalculating || !isSPD}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg ${
              !isSPD || isCalculating
                ? 'bg-slate-700/50 border-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-brand-600 border-brand-500/60 text-white hover:bg-brand-500 hover:shadow-[0_0_24px_rgba(14,165,233,0.4)] active:scale-95'
            }`}
          >
            <Cpu className="w-4 h-4" />
            {isCalculating ? 'Calculando…' : 'Calcular sistema'}
          </button>
        </div>
        {!isSPD && (
          <div className="mt-3 flex items-center gap-2 text-xs text-rose-400">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            A debe ser simétrica y definida positiva para calcular.
          </div>
        )}
        <RefreshCw className="w-4 h-4 text-slate-500 mt-3" aria-label="Los resultados se borran al editar" />
      </GlassCard>
    </motion.div>
  );
}
