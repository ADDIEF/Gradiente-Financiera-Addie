/**
 * EscenariosSection.tsx — Sección 5: Tres escenarios.
 * Botones de carga rápida: Ideal, Bajo Estrés, Mal Condicionado.
 */

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { ScenarioButtons } from '@/components/dashboard/ScenarioButtons';
import { useLinearSystemStore } from '@/context/useLinearSystemStore';
import { Play, Zap, Flame } from 'lucide-react';
import { SCENARIOS } from '@/lib/scenarios';

const ICONS: Record<string, React.ReactNode> = {
  ideal: <Play className="w-4 h-4" />,
  estres: <Zap className="w-4 h-4" />,
  malCondicionado: <Flame className="w-4 h-4" />,
};

export function EscenariosSection() {
  const { lastScenario } = useLinearSystemStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="space-y-6"
    >
      <GlassCard>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-brand-600/20 flex items-center justify-center text-brand-400">
            <Play className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-200">Tres escenarios obligatorios</h2>
            <p className="text-xs text-slate-500">
              Cargue rápida y ejecute cualquiera de los tres escenarios predefinidos.
            </p>
          </div>
        </div>
        <ScenarioButtons />
      </GlassCard>

      <GlassCard>
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Detalle de escenarios
        </h2>
        <div className="space-y-3">
          {SCENARIOS.map((s) => {
            const activo = lastScenario === s.key;
            return (
              <div
                key={s.key}
                className={`flex items-center gap-3 p-3 rounded-lg border ${
                  activo
                    ? 'bg-brand-500/10 border-brand-500/30'
                    : 'bg-slate-900/40 border-slate-700/40'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activo ? 'bg-brand-500/20' : 'bg-slate-800/50'
                }`}>
                  {ICONS[s.key]}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className={`font-bold text-sm ${activo ? 'text-brand-400' : 'text-slate-200'}`}>
                      {s.nombre}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                      {activo ? 'ACTIVO' : '—'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{s.descripcion}</p>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </motion.div>
  );
}
