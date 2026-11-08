/**
 * QASection.tsx — Sección 9: Módulo de Pruebas (QA).
 * 4 pruebas obligatorias con formato Entrada / Resultado Esperado / Resultado Obtenido / Conclusión.
 */

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { QAModule } from '@/components/dashboard/QAModule';
import { ShieldAlert } from 'lucide-react';

export function QASection({
  onShowToast,
}: {
  onShowToast: (toast: { tipo: 'error' | 'success' | 'warning'; titulo: string; mensaje: string }) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="space-y-6"
    >
      <GlassCard>
        <div className="flex items-center gap-3 mb-4">
          <ShieldAlert className="w-5 h-5 text-brand-400" />
          <h2 className="font-semibold text-slate-200">Módulo de Pruebas de Software (QA)</h2>
        </div>
        <p className="text-sm text-slate-400 mb-3">
          Ejecución comprobable de las 4 pruebas obligatorias del desafío, siguiendo el formato
          estándar de control de calidad (Entrada, Resultado Esperado, Resultado Obtenido, Conclusión).
        </p>
        <QAModule onShowToast={onShowToast} />
      </GlassCard>
    </motion.div>
  );
}
