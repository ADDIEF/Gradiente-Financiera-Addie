/**
 * InicioSection.tsx — Sección 1: Inicio.
 * Título del proyecto, datos del estudiante, mención académica y síntesis del caso financiero.
 */

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { Calculator, User, GraduationCap, MapPin, ArrowRight } from 'lucide-react';

export function InicioSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <GlassCard>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-600/20 flex items-center justify-center text-brand-400 flex-shrink-0">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
              Gradiente Financiera
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Simulador de asignación presupuestaria 4×4 — Sistema lineal Ax = b
            </p>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Datos del estudiante
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-brand-400 flex-shrink-0" />
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Nombre</div>
              <div className="text-sm text-slate-200 font-medium">Adriana Valeria Fernandez Flores</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <GraduationCap className="w-5 h-5 text-brand-400 flex-shrink-0" />
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Mención académica</div>
              <div className="text-sm text-slate-200 font-medium">Desarrollo de Sistemas</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-brand-400 flex-shrink-0" />
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Universidad</div>
              <div className="text-sm text-slate-200 font-medium">
                Universidad Mayor de San Andrés (UMSA)
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-slate-700/50 flex items-center justify-center text-xs text-slate-400 flex-shrink-0">
              MN
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Materia</div>
              <div className="text-sm text-slate-200 font-medium">Métodos Numéricos</div>
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Síntesis del caso financiero
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed mb-3">
          Este simulador modela la <strong>asignación presupuestaria de 4 categorías</strong> de una
          empresa de software (mención Desarrollo de Sistemas): Desarrollo de Software/SaaS,
          Infraestructura y Cloud, Marketing y Adquisición, y Operaciones y Soporte.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          El problema se formula como un sistema lineal <strong>Ax = b</strong> de 4 ecuaciones y 4
          incógnitas, donde la matriz <strong>A</strong> debe ser simétrica y definida positiva. Se
          resuelve con el <strong>Método de Gradientes Conjugados Precondicionado (GCP)</strong>
          (precondicionador de Jacobi), usando la solución de Cholesky como referencia, y se contrasta
          con Gradientes Conjugados simple (GC).
        </p>
        <div className="mt-4 p-3 rounded-lg bg-slate-900/40 border border-slate-700/30">
          <p className="text-xs text-slate-400 font-mono">
            Fundamento: Suñagua S., P. (2020). Método de Gradientes Conjugados Precondicionado.
            Revista Boliviana de Matemática– UMSA, 04, 2–7.
          </p>
        </div>
      </GlassCard>

      {/* Guía rápida de flujo de trabajo */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-4">
          <ArrowRight className="w-5 h-5 text-brand-400" />
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Guía rápida — Flujo de trabajo
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Paso 1 */}
          <div className="flex items-start gap-3 p-3 rounded-lg border border-slate-700/30 bg-slate-900/40">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-600/20 flex items-center justify-center text-brand-400 text-xs font-bold">
              1
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200">Configurar el sistema</div>
              <div className="text-xs text-slate-400 leading-relaxed">
                En "Entrada de datos" edita los coeficientes de la matriz A, el vector b y el
                vector inicial x0. Ajusta tolerancia (10⁻⁶), iteraciones máximas y precondicionador.
              </div>
            </div>
          </div>
          {/* Paso 2 */}
          <div className="flex items-start gap-3 p-3 rounded-lg border border-slate-700/30 bg-slate-900/40">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-600/20 flex items-center justify-center text-brand-400 text-xs font-bold">
              2
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200">Cargar escenario (opcional)</div>
              <div className="text-xs text-slate-400 leading-relaxed">
                Usa los botones de carga rápida en "Tres escenarios": <strong>Ideal</strong>,
                <strong>Bajo Estrés Financiero</strong> o <strong>Mal Condicionado</strong>. Cada uno
                carga valores predefinidos de A y b listos para calcular.
              </div>
            </div>
          </div>
          {/* Paso 3 */}
          <div className="flex items-start gap-3 p-3 rounded-lg border border-slate-700/30 bg-slate-900/40">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-600/20 flex items-center justify-center text-brand-400 text-xs font-bold">
              3
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200">Calcular</div>
              <div className="text-xs text-slate-400 leading-relaxed">
                Presiona <strong>Calcular sistema</strong>. El motor resuelve con Cholesky
                (referencia), Gradientes Conjugados simple (GC) y Gradientes Conjugados
                Precondicionado (GCP).
              </div>
            </div>
          </div>
          {/* Paso 4 */}
          <div className="flex items-start gap-3 p-3 rounded-lg border border-slate-700/30 bg-slate-900/40">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-600/20 flex items-center justify-center text-brand-400 text-xs font-bold">
              4
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200">Revisar resultados</div>
              <div className="text-xs text-slate-400 leading-relaxed">
                En "Resultados (6-8)" ves las soluciones, iteraciones, residuos y el número de
                condición κ(A) y κ(M⁻¹A).
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Paso 5 */}
          <div className="flex items-start gap-3 p-3 rounded-lg border border-slate-700/30 bg-slate-900/40">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-600/20 flex items-center justify-center text-brand-400 text-xs font-bold">
              5
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200">Análisis de errores</div>
              <div className="text-xs text-slate-400 leading-relaxed">
                Compara el error absoluto, relativo y porcentual por variable entre GC y GCP
                respecto a la solución de Cholesky.
              </div>
            </div>
          </div>
          {/* Paso 6 */}
          <div className="flex items-start gap-3 p-3 rounded-lg border border-slate-700/30 bg-slate-900/40">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-brand-600/20 flex items-center justify-center text-brand-400 text-xs font-bold">
              6
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200">Validar y comparar</div>
              <div className="text-xs text-slate-400 leading-relaxed">
                Revisa la tabla comparativa de los 3 escenarios y ejecuta las 4 pruebas del
                módulo QA para confirmar que todo funciona correctamente.
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
