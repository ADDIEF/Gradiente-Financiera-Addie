/**
 * ConditionSummary.tsx — Números de condición κ(A) y κ(M⁻¹A).
 */

import { GlassCardStatic } from '@/components/ui/GlassCard';

interface ConditionSummaryProps {
  condA: number;
  condPrecond: number;
}

export function ConditionSummary({ condA, condPrecond }: ConditionSummaryProps) {
  const nivel = (v: number) => {
    if (!Number.isFinite(v)) return { texto: '∞ (no definida)', color: 'text-rose-400' };
    if (v < 10) return { texto: 'Excelente', color: 'text-emerald-400' };
    if (v < 100) return { texto: 'Buena', color: 'text-amber-400' };
    if (v < 1000) return { texto: 'Regular', color: 'text-orange-400' };
    return { texto: 'Mala (mal condicionado)', color: 'text-rose-400' };
  };

  const nA = nivel(condA);
  const nP = nivel(condPrecond);

  return (
    <GlassCardStatic className="space-y-4 border-l-4 border-brand-500">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          κ(A) — Matriz original
        </span>
        <span className={`font-mono font-bold text-lg ${nA.color}`}>
          {!Number.isFinite(condA) ? '∞' : condA.toFixed(2)}
        </span>
      </div>
      <p className={`text-xs ${nA.color}`}>{nA.texto}</p>

      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          κ(M⁻¹A) — Matriz precondicionada (Jacobi)
        </span>
        <span className={`font-mono font-bold text-lg ${nP.color}`}>
          {!Number.isFinite(condPrecond) ? '∞' : condPrecond.toFixed(2)}
        </span>
      </div>
      <p className={`text-xs ${nP.color}`}>{nP.texto}</p>

      <p className="text-xs text-slate-500 leading-relaxed">
        κ(A) = ||A||∞ × ||A⁻¹||∞. Mide cuán sensibles son las soluciones a pequeñas variaciones
        en los datos. Un κ bajo = sistema estable; κ ≫ 1 = sistema mal condicionado.
      </p>
    </GlassCardStatic>
  );
}
