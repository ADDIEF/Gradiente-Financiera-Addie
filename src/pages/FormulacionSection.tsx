/**
 * FormulacionSection.tsx — Sección 3: Formulación.
 * Definición de variables, sistema Ax = b, interpretación de coeficientes,
 * demostración formal de simetría y definición positiva (Criterio de Sylvester).
 */

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { useLinearSystemStore } from '@/context/useLinearSystemStore';
import { VARIABLES } from '@/lib/scenarios';
import { sylvesterMinors, isSymmetric } from '@/lib/mathUtils';
import { Sigma, Code2, ShieldCheck, Table } from 'lucide-react';

export function FormulacionSection() {
  const { A, b } = useLinearSystemStore();

  const minors = useMemo(() => sylvesterMinors(A), [A]);
  const esSimetrica = isSymmetric(A);
  const todosPositivos = minors.every((m) => m > 0);
  const esSPD = esSimetrica && todosPositivos;

  const formatoMatriz = (m: number[][]) =>
    m.map((row) => row.map((v) => v.toFixed(2)).join(' & ')).join(' \\\\ ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="space-y-6"
    >
      {/* Variables */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-4">
          <Code2 className="w-5 h-5 text-brand-400" />
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Definición de variables (n = 4)
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {VARIABLES.map((v) => (
            <div
              key={v.index}
              className="rounded-lg border border-slate-700/40 bg-slate-900/40 p-3"
            >
              <div className="flex justify-between mb-1">
                <span className="text-xs font-bold text-slate-300">x{v.index}</span>
                <span className="text-[10px] text-slate-500 bg-slate-800/50 px-1.5 py-0.5 rounded">
                  {v.nombre}
                </span>
              </div>
              <div className="text-xs text-slate-400 mb-1">{v.tecnico}</div>
              <div className="text-xs text-slate-300 italic">«{v.humano}»</div>
              <div className="mt-1 text-[10px] text-slate-500">
                Ej: {v.ejemplo}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Sistema Ax = b */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-4">
          <Sigma className="w-5 h-5 text-brand-400" />
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Sistema lineal Ax = b
          </h2>
        </div>
        <div className="overflow-x-auto">
          <div className="text-sm font-mono text-slate-200">
            {`
[${formatoMatriz(A)}] · [x₁]   [${b[0].toFixed(2)}]
             [x₂]   [${b[1].toFixed(2)}]
             [x₃] = [${b[2].toFixed(2)}]
             [x₄]   [${b[3].toFixed(2)}]
          `}
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-3 leading-relaxed">
          Donde <strong>A</strong> es la matriz de coeficientes (4×4), <strong>x</strong> es el
          vector de incógnitas (presupuestos por categoría) y <strong>b</strong> es el vector de
          recursos necesarios por categoría.
        </p>
      </GlassCard>

      {/* Interpretación coeficientes */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-4">
          <Table className="w-5 h-5 text-brand-400" />
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Interpretación de los coeficientes aᵢⱼ
          </h2>
        </div>
        <ul className="space-y-2 text-sm text-slate-300 leading-relaxed list-disc pl-6">
          <li>
            <strong>aᵢᵢ (diagonal):</strong> costo base o autoconsumo de la categoría i.
          </li>
          <li>
            <strong>aᵢⱼ (i ≠ j):</strong> cuánto afecta la categoría j a la categoría i
            (dependencias, sinergias, compartición de recursos).
          </li>
          <li>
            La matriz es <strong>simétrica</strong> porque la interdependencia es mutua:
            aᵢⱼ = aⱼᵢ.
          </li>
        </ul>
      </GlassCard>

      {/* Demostración SPD */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="w-5 h-5 text-brand-400" />
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Verificación: simétrica y definida positiva
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className={`p-3 rounded-lg border text-center ${
            esSimetrica
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">
              Simétrica (A = Aᵀ)
            </div>
            <div className="text-sm font-bold">{esSimetrica ? '✓ Sí' : '✗ No'}</div>
          </div>
          <div className={`p-3 rounded-lg border text-center ${
            todosPositivos
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">
              Menores de Sylvester &gt; 0
            </div>
            <div className="text-sm font-bold">{todosPositivos ? '✓ Sí' : '✗ No'}</div>
          </div>
          <div className={`p-3 rounded-lg border text-center ${
            esSPD
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-1">
              Definida positiva (SPD)
            </div>
            <div className="text-sm font-bold">{esSPD ? '✓ Sí' : '✗ No'}</div>
          </div>
        </div>
        <div className="mt-3 space-y-1 text-xs text-slate-400 font-mono">
          {minors.map((m, i) => (
            <div key={i} className="flex justify-between">
              <span>Δ₁₋{i + 1} (líder {i + 1}×{i + 1}):</span>
              <span>{m.toFixed(4)}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          Criterio de Sylvester: una matriz simétrica es definida positiva si y solo si todos sus
          menores principales líderes son estrictamente positivos. Esto garantiza que el sistema
          tiene una solución única y que el método de Cholesky (y por tanto GCP) es aplicable.
        </p>
      </GlassCard>
    </motion.div>
  );
}
