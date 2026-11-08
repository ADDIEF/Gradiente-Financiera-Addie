/**
 * MatrixEditor.tsx — Editor interactivo 4×4 de A, b y x0.
 * Validación visual en tiempo real de SPD.
 */

import { useState } from 'react';
import { useMotionValue, animate } from 'framer-motion';
import { useLinearSystemStore } from '@/context/useLinearSystemStore';
import { Info } from 'lucide-react';

interface MatrixEditorProps {}

export function MatrixEditor({}: MatrixEditorProps) {
  const { A, b, x0, setCell, validarSPD } = useLinearSystemStore();
  const [editCell, setEditCell] = useState<string | null>(null);
  const [isSPD] = useState(() => validarSPD());

  const scale = useMotionValue(1);
  const onFocus = () => animate(scale, 1.04, { type: 'spring', stiffness: 400, damping: 15 });
  const onBlur = () => animate(scale, 1, { type: 'spring', stiffness: 400, damping: 15 });

  const inputBase =
    'w-full h-10 rounded-xl text-center font-mono text-xs font-semibold bg-slate-900/50 border border-slate-700/50 placeholder-slate-600 focus:outline-none focus:border-brand-500/70 focus:ring-1 focus:ring-brand-500 transition-transform duration-200';

  const renderGrid = (matriz: 'A' | 'b' | 'x0', data: number[][], label: string) => {
    const isVector = matriz !== 'A';
    return (
      <div className="flex flex-col gap-2">
        <h4 className="text-xs font-semibold text-slate-300">{label}</h4>
        <div className={isVector ? 'grid grid-cols-4 gap-1.5' : 'grid grid-cols-4 gap-1.5'}>
          {data.map((row, i) =>
            row.map((val, j) => {
              const key = `${matriz}-${i}-${j}`;
              return (
                <div key={key} className="group relative">
                  <input
                    type="number"
                    step="any"
                    value={val}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      if (!isNaN(v)) setCell(matriz, i, j, v);
                    }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    className={`${inputBase} ${
                      editCell === key ? 'ring-1 ring-brand-500' : ''
                    }`}
                    placeholder="0"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setEditCell(key);
                      (e.target as HTMLInputElement).select();
                    }}
                    onMouseUp={() => setEditCell(null)}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {renderGrid('A', A, 'Matriz de coeficientes A (4×4)')}
      {renderGrid('b', [b], 'Vector de recursos b (4×1)')}
      {renderGrid('x0', [x0], 'Vector inicial x0 (4×1)')}

      <div className="lg:col-span-3 flex items-center justify-between pt-2">
        <span
          className={`px-2.5 py-0.5 rounded text-xs font-bold ${
            isSPD
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
          }`}
        >
          {isSPD ? 'Simétrica y definida positiva ✓' : 'No es SPD ⚠'}
        </span>
        <Info className="w-4 h-4 text-slate-500" aria-label="Matriz A debe ser cuadrada, simetrica y definida positiva" />
      </div>
    </div>
  );
}
