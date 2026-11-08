/**
 * TablaComparativaSection.tsx — Tabla comparativa obligatoria (Sección 8 del rubro).
 * Compara los 3 escenarios: Ideal, Bajo Estrés, Mal Condicionado.
 * Calcula los 3 escenarios al vuelo y documenta todos los indicadores obligatorios.
 */

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { resolverSistema, isSPD } from '@/lib/mathUtils';
import { SCENARIOS } from '@/lib/scenarios';

const VARIABLE_NAMES = [
  'Desarrollo de Software / SaaS',
  'Infraestructura y Cloud',
  'Marketing y Adquisición',
  'Operaciones y Soporte',
];

const OPT = { tol: 1e-6, maxIter: 1000, precondicionador: 'jacobi' as const };

function calcularEscenario(s: (typeof SCENARIOS)[number]) {
  const spd = isSPD(s.A);
  const res = spd
    ? resolverSistema(s.A, s.b, s.x0, VARIABLE_NAMES, { ...OPT })
    : null;
  return { scenario: s, spd, res };
}

const ENCABEZADOS = [
  { clave: 'ideal', nombre: 'Ideal' },
  { clave: 'estres', nombre: 'Bajo Estrés Financiero' },
  { clave: 'malCondicionado', nombre: 'Mal Condicionado' },
] as const;

export function TablaComparativaSection() {
  const resultados = useMemo(
    () => SCENARIOS.map(calcularEscenario),
    []
  );

  const get = (clave: string) =>
    resultados.find((r) => r.scenario.key === clave);

  const formatearVector = (v: number[]) =>
    `[${v.map((x) => x.toFixed(3)).join(', ')}]`;

  const epTexto = (m: ReturnType<typeof calcularEscenario>, metodo: 'gc' | 'gcp') => {
    if (!m.res) return '—';
    const errores =
      metodo === 'gc' ? m.res.errorsGc : m.res.errorsGcp;
    const maxEp = Math.max(
      ...errores.componentWise.map((c) => (c.ep === null ? 0 : c.ep))
    );
    return maxEp.toFixed(4) + '%';
  };

  const eaTexto = (m: ReturnType<typeof calcularEscenario>, metodo: 'gc' | 'gcp') => {
    if (!m.res) return '—';
    const errores =
      metodo === 'gc' ? m.res.errorsGc : m.res.errorsGcp;
    return errores.absolute.toExponential(3);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <GlassCard>
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Tabla comparativa obligatoria — Tres escenarios
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Indicadores por escenario según la rúbrica del desafío. κ(M⁻¹A) usa precondicionador
          de Jacobi (diagonal).
        </p>

        <div className="overflow-x-auto border border-slate-700/30 rounded-xl">
          <table className="w-full text-left border-collapse text-[11px] leading-snug">
            <thead>
              <tr className="border-b border-slate-700/40 bg-slate-900/50">
                <th className="py-3 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Indicador
                </th>
                {ENCABEZADOS.map((e) => (
                  <th
                    key={e.clave}
                    className="py-3 px-2 text-xs font-semibold text-slate-300 uppercase tracking-wider text-center"
                  >
                    {e.nombre}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Solución referencia */}
              <tr className="border-b border-slate-800/20">
                <td className="py-2.5 px-3 font-mono text-slate-300">Solución de referencia (Cholesky)</td>
                {ENCABEZADOS.map((e) => {
                  const m = get(e.clave)!;
                  return (
                    <td key={e.clave} className="py-2.5 px-2 text-center font-mono text-slate-200">
                      {m.res ? formatearVector(m.res.direct.x) : '—'}
                    </td>
                  );
                })}
              </tr>
              {/* Solución GCP */}
              <tr className="border-b border-slate-800/20">
                <td className="py-2.5 px-3 font-mono text-slate-300">Solución GCP</td>
                {ENCABEZADOS.map((e) => {
                  const m = get(e.clave)!;
                  return (
                    <td key={e.clave} className="py-2.5 px-2 text-center font-mono text-slate-200">
                      {m.res ? formatearVector(m.res.gcp.x) : '—'}
                    </td>
                  );
                })}
              </tr>
              {/* Error absoluto */}
              <tr className="border-b border-slate-800/20">
                <td className="py-2.5 px-3 font-mono text-slate-300">Error absoluto (Ea)</td>
                {ENCABEZADOS.map((e) => {
                  const m = get(e.clave)!;
                  return (
                    <td key={e.clave} className="py-2.5 px-2 text-center font-mono text-slate-200">
                      {m.res ? eaTexto(m, 'gcp') : '—'}
                    </td>
                  );
                })}
              </tr>
              {/* Error porcentual */}
              <tr className="border-b border-slate-800/20">
                <td className="py-2.5 px-3 font-mono text-slate-300">Error porcentual (Ep)</td>
                {ENCABEZADOS.map((e) => {
                  const m = get(e.clave)!;
                  return (
                    <td key={e.clave} className="py-2.5 px-2 text-center font-mono text-slate-200">
                      {m.res ? epTexto(m, 'gcp') : '—'}
                    </td>
                  );
                })}
              </tr>
              {/* Iteraciones GC */}
              <tr className="border-b border-slate-800/20">
                <td className="py-2.5 px-3 font-mono text-slate-300">Iteraciones GC (sin precondicionar)</td>
                {ENCABEZADOS.map((e) => {
                  const m = get(e.clave)!;
                  return (
                    <td key={e.clave} className="py-2.5 px-2 text-center font-mono text-slate-200">
                      {m.res ? m.res.gc.iterations.toString() : '—'}
                    </td>
                  );
                })}
              </tr>
              {/* Iteraciones GCP */}
              <tr className="border-b border-slate-800/20">
                <td className="py-2.5 px-3 font-mono text-slate-300">Iteraciones GCP (precondicionado)</td>
                {ENCABEZADOS.map((e) => {
                  const m = get(e.clave)!;
                  return (
                    <td key={e.clave} className="py-2.5 px-2 text-center font-mono text-slate-200">
                      {m.res ? m.res.gcp.iterations.toString() : '—'}
                    </td>
                  );
                })}
              </tr>
              {/* κ(A) */}
              <tr className="border-b border-slate-800/20">
                <td className="py-2.5 px-3 font-mono text-slate-300">Número de condición κ(A)</td>
                {ENCABEZADOS.map((e) => {
                  const m = get(e.clave)!;
                  return (
                    <td key={e.clave} className="py-2.5 px-2 text-center font-mono text-slate-200">
                      {m.res
                        ? (m.res.conditionNumberA === Infinity ? '∞' : m.res.conditionNumberA.toFixed(2))
                        : '—'}
                    </td>
                  );
                })}
              </tr>
              {/* κ(M⁻¹A) */}
              <tr className="border-b border-slate-800/20">
                <td className="py-2.5 px-3 font-mono text-slate-300">Número de condición κ(M⁻¹A)</td>
                {ENCABEZADOS.map((e) => {
                  const m = get(e.clave)!;
                  return (
                    <td key={e.clave} className="py-2.5 px-2 text-center font-mono text-slate-200">
                      {m.res
                        ? (m.res.conditionNumberPrecond === Infinity
                            ? '∞'
                            : m.res.conditionNumberPrecond.toFixed(2))
                        : '—'}
                    </td>
                  );
                })}
              </tr>
              {/* Residuo relativo GCP */}
              <tr className="border-b border-slate-800/20">
                <td className="py-2.5 px-3 font-mono text-slate-300">Residuo relativo final GCP</td>
                {ENCABEZADOS.map((e) => {
                  const m = get(e.clave)!;
                  return (
                    <td key={e.clave} className="py-2.5 px-2 text-center font-mono text-slate-200">
                      {m.res ? m.res.gcp.relativeResidual.toExponential(3) : '—'}
                    </td>
                  );
                })}
              </tr>
              {/* Convergió */}
              <tr className="border-b border-slate-800/20">
                <td className="py-2.5 px-3 font-mono text-slate-300">¿Convergió el algoritmo? (GCP)</td>
                {ENCABEZADOS.map((e) => {
                  const m = get(e.clave)!;
                  const conv = m.res?.gcp.converged ?? false;
                  return (
                    <td
                      key={e.clave}
                      className={`py-2.5 px-2 text-center font-bold ${
                        conv ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {conv ? 'Sí' : 'No'}
                    </td>
                  );
                })}
              </tr>
              {/* Interpretación financiera */}
              <tr>
                <td className="py-2.5 px-3 font-mono text-slate-300">Interpretación financiera</td>
                {ENCABEZADOS.map((e) => {
                  const m = get(e.clave)!;
                  return (
                    <td key={e.clave} className="py-2.5 px-2 text-slate-300 leading-relaxed">
                      {m ? m.scenario.interpretacion : '—'}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-slate-900/40 border border-slate-700/30">
          <p className="text-xs text-slate-400 leading-relaxed">
            <strong>Nota técnica:</strong> en el escenario Mal Condicionado, κ(A) es muy elevado,
            lo que dificulta la convergencia. El precondicionador de Jacobi reduce κ(M⁻¹A) y permite
            que GCP alcance la tolerancia 10⁻⁶ en menos iteraciones que GC simple.
          </p>
        </div>
      </GlassCard>
    </motion.div>
  );
}
