/**
 * CasoEstudioSection.tsx — Sección 2: Caso de estudio.
 * Contexto financiero, justificación del modelo y procedencia de los datos.
 */

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { ShieldCheck } from 'lucide-react';

export function CasoEstudioSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="space-y-6"
    >
      <GlassCard>
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Contexto financiero
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-3">
          Una empresa de desarrollo de software debe distribuir su presupuesto mensual entre 4
          categorías interrelacionadas. Cada categoría consume recursos propios y, además, depende
          de las demás (por ejemplo, Desarrollo necesita Infraestructura; Marketing genera clientes
          que Operaciones debe atender).
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          El objetivo es encontrar el vector <strong>x = [x₁, x₂, x₃, x₄]</strong> que represente el
          monto óptimo (en miles de dólares) a asignar a cada categoría, dada una necesidad total
          de recursos <strong>b</strong> y una matriz de interdependencias <strong>A</strong>.
        </p>
      </GlassCard>

      <GlassCard>
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Justificación del modelo
        </h2>
        <ul className="space-y-3 text-sm text-slate-300 leading-relaxed list-disc pl-6">
          <li>
            La matriz <strong>A</strong> es <strong>cuadrada 4×4</strong> porque hay 4 variables
            (ecuaciones e incógnitas).
          </li>
          <li>
            Es <strong>simétrica (A = Aᵀ)</strong>: la influencia de la categoría i sobre la j es
            igual a la de j sobre i (dependencias mutuas).
          </li>
          <li>
            Es <strong>definida positiva</strong>: cualquier asignación no nula genera un costo
            total positivo (xᵀAx {'>'} 0), lo que garantiza una solución única y estable.
          </li>
          <li>
            El vector <strong>b</strong> representa el requerimiento total de recursos por categoría
            bajo cada escenario financiero.
          </li>
        </ul>
      </GlassCard>

      <GlassCard>
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Procedencia de los datos
        </h2>
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-brand-400 flex-shrink-0" />
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Fuente</div>
            <div className="text-sm text-slate-200">
              Datos simulados con criterio financiero, coherentes con el caso de planificación
              presupuestaria (mención Desarrollo de Sistemas).
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Los valores de A y b son estimaciones conceptualmente justificadas. Pueden editarse
          interactivamente en la sección "Entrada de datos" y recalcularse al instante.
        </p>
      </GlassCard>
    </motion.div>
  );
}
