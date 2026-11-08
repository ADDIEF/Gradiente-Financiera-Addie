/**
 * ScenarioButtons.tsx — Botones de carga rápida (Ideal, Bajo Estrés, Mal Condicionado).
 * Layout contenedor: los botones NO se salen de su caja.
 */

import { motion } from 'framer-motion';
import { Play, Zap, Flame } from 'lucide-react';
import { useLinearSystemStore } from '@/context/useLinearSystemStore';
import { SCENARIOS } from '@/lib/scenarios';

const ICONS: Record<string, React.ReactNode> = {
  ideal: <Play className="w-5 h-5" />,
  estres: <Zap className="w-5 h-5" />,
  malCondicionado: <Flame className="w-5 h-5" />,
};

export function ScenarioButtons() {
  const { loadScenario, lastScenario } = useLinearSystemStore();

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        Carga rápida de escenarios
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {SCENARIOS.map((scenario) => {
          const active = lastScenario === scenario.key;
          return (
            <motion.button
              key={scenario.key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => loadScenario(scenario)}
              className={`flex flex-col items-center gap-2 px-3 py-4 rounded-xl text-sm font-semibold transition-all duration-200 border min-h-[140px] ${
                active
                  ? 'bg-brand-600/15 border-brand-500/50 text-brand-200 shadow-[0_0_20px_rgba(14,165,233,0.25)]'
                  : 'bg-slate-900/40 border-slate-700/40 text-slate-400 hover:border-slate-500 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                active ? 'bg-brand-500/20' : 'bg-slate-800/50'
              }`}>
                {ICONS[scenario.key]}
              </div>
              <span className="font-bold text-xs leading-tight text-center">
                {scenario.nombre}
              </span>
              <span className="text-[10px] opacity-70 leading-tight text-center">
                {scenario.descripcion.split('.')[0]}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
