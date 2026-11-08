/**
 * ConclusionesSection.tsx — Sección 10: Conclusiones y Referencias.
 * Interpretación técnica y financiera, cita de Suñagua (2020).
 */

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';

export function ConclusionesSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <GlassCard>
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Conclusiones técnicas
        </h2>
        <ul className="space-y-3 text-sm text-slate-300 leading-relaxed list-disc pl-6">
          <li>
            El <strong>método directo (Cholesky)</strong> proporciona la solución de referencia
            exacta para sistemas simétricos definidos positivos.
          </li>
          <li>
            <strong>Gradientes Conjugados (GC)</strong> converge en pocos pasos para sistemas bien
            condicionados, pero puede requerir muchas iteraciones o no convergir en sistemas mal
            condicionados.
          </li>
          <li>
            <strong>GCP con precondicionador de Jacobi</strong> reduce el número de condición
            efectivo (κ(M⁻¹A) {'<'} κ(A)) y, por tanto, acelera la convergencia, especialmente en el
            escenario Mal Condicionado.
          </li>
          <li>
            El criterio de parada es ∥rₖ∥₂ / ∥b∥₂ {'<'} 10⁻⁶, tal como especifica el desafío.
          </li>
        </ul>
      </GlassCard>

      <GlassCard>
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Interpretación financiera
        </h2>
        <ul className="space-y-3 text-sm text-slate-300 leading-relaxed list-disc pl-6">
          <li>
            <strong>Escenario Ideal:</strong> asignación estable y predecible; los departamentos
            reciben presupuestos proporcionados a sus necesidades base.
          </li>
          <li>
            <strong>Bajo Estrés Financiero:</strong> se desplaza el punto de equilibrio hacia
            montos mayores; la solución es sensible al incremento de costos (inflación).
          </li>
          <li>
            <strong>Mal Condicionado:</strong> la fuerte interdependencia entre categorías hace que
            pequeños cambios en los datos produzcan variaciones grandes en la asignación. Aquí el
            precondicionador es crítico para obtener una solución confiable.
          </li>
        </ul>
      </GlassCard>

      <GlassCard>
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Aporte de la mención (Desarrollo de Sistemas)
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Arquitectura de software basada en componentes web, validaciones matemáticas de entrada
          (simetría y definición positiva), pruebas funcionales integradas (módulo QA) y una
          interfaz reactiva que permite modificar datos y recalcular automáticamente.
        </p>
      </GlassCard>
    </motion.div>
  );
}
