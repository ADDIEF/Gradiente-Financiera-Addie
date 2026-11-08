/**
 * ResultadoSection.tsx — Secciones 6, 7 y 8.
 * Solución de referencia (Cholesky), GCP vs GC, análisis de errores y condición.
 * Layout contenido: tarjetas y tablas no se desbordan a la derecha.
 */

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { useLinearSystemStore } from '@/context/useLinearSystemStore';
import { SolverResults } from '@/components/dashboard/SolverResults';
import { ErrorTable } from '@/components/dashboard/ErrorTable';
import { ConditionSummary } from '@/components/dashboard/ConditionSummary';
import { BarChart3 } from 'lucide-react';

export function ResultadoSection() {
  const { resultado, isCalculating } = useLinearSystemStore();

  if (!resultado) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center h-96"
      >
        <GlassCard padded={false} className="p-12 text-center">
          <div className="text-slate-500">—</div>
          <p className="mt-3 text-sm text-slate-400">
            No hay resultados todavía. Configure el sistema en "Entrada de datos"
            y presione <strong>Calcular sistema</strong>.
          </p>
        </GlassCard>
      </motion.div>
    );
  }

  const { direct, gc, gcp, errorsGc, errorsGcp, conditionNumberA, conditionNumberPrecond } =
    resultado;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="space-y-6"
    >
      <GlassCard>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-200">Resultados del solucionador</h2>
              <p className="text-xs text-slate-500">
                Comparativa: Cholesky (referencia) vs GC vs GCP
              </p>
            </div>
          </div>
          <span
            className={`text-xs font-bold ${
              direct.converged && gc.converged && gcp.converged
                ? 'text-emerald-400'
                : 'text-rose-400'
            }`}
          >
            {isCalculating ? 'Calculando…' : 'Listo'}
          </span>
        </div>

        {/* Tarjetas de los 3 métodos: ocupan el ancho disponible, contenido */}
        <div className="mb-6">
          <SolverResults direct={direct} gc={gc} gcp={gcp} />
        </div>

        {/* Número de condición y tablas de errores en columna derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            {conditionNumberA != null && (
              <ConditionSummary
                condA={conditionNumberA}
                condPrecond={conditionNumberPrecond}
              />
            )}
          </div>
          <div className="lg:col-span-2 space-y-4">
            <ErrorTable metodo="GC" errors={errorsGc} titulo="Errores — Gradientes Conjugados (GC)" color="text-slate-400" />
            <ErrorTable metodo="GCP" errors={errorsGcp} titulo="Errores — Gradientes Conjugados Precondicionado (GCP)" color="text-brand-400" />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
