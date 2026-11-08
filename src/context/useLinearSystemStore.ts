/**
 * useLinearSystemStore.ts — Estado global del sistema Ax = b (Zustand).
 * Persiste A, b y x0 en localStorage. Orquesta el cálculo y la validación SPD.
 */

import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import type {
  LinearSystemState,
  Matrix,
  Vector,
  Scenario,
} from '@/types';
import { resolverSistema, isSPD } from '@/lib/mathUtils';

const N = 4;
const DEFAULT_TOL = 1e-6;
const DEFAULT_MAX_ITER = 1000;

const emptyMatrix = (): Matrix =>
  Array.from({ length: N }, () => Array(N).fill(0));
const emptyVector = (): Vector => Array(N).fill(0);

export const useLinearSystemStore = create<LinearSystemState>()(
  devtools(
    persist(
      (set, get) => ({
        A: emptyMatrix(),
        b: emptyVector(),
        x0: emptyVector(),
        n: N,
        tol: DEFAULT_TOL,
        maxIter: DEFAULT_MAX_ITER,
        precondicionador: 'jacobi',
        resultado: null,
        isCalculating: false,
        lastScenario: null,
        activeScenario: null,

        setCell: (matriz, i, j, value) => {
          set((state) => {
            const next = state;
            if (matriz === 'A') {
              next.A = state.A.map((row, r) =>
                r === i ? row.map((v, c) => (c === j ? value : v)) : row
              );
            } else if (matriz === 'b') {
              next.b = state.b.map((v, idx) => (idx === i ? value : v));
            } else {
              next.x0 = state.x0.map((v, idx) => (idx === i ? value : v));
            }
            next.resultado = null;
            return next;
          });
        },

        setTol: (value) => set({ tol: value, resultado: null }),
        setMaxIter: (value) => set({ maxIter: value, resultado: null }),
        setPrecondicionador: (value) =>
          set({ precondicionador: value, resultado: null }),

        loadScenario: (scenario: Scenario) => {
          set({
            A: scenario.A.map((row) => [...row]),
            b: [...scenario.b],
            x0: [...scenario.x0],
            lastScenario: scenario.key,
            activeScenario: scenario.key,
            resultado: null,
            isCalculating: false,
          });
        },

        reset: () => {
          set({
            A: emptyMatrix(),
            b: emptyVector(),
            x0: emptyVector(),
            resultado: null,
            lastScenario: null,
            activeScenario: null,
            isCalculating: false,
          });
        },

        calcular: () => {
          const { A, b, x0, tol, maxIter, precondicionador } = get();
          set({ isCalculating: true, resultado: null });

          setTimeout(() => {
            try {
              const spd = isSPD(A);
              const resultado = spd
                ? resolverSistema(A, b, x0, [
                    'Desarrollo de Software / SaaS',
                    'Infraestructura y Cloud',
                    'Marketing y Adquisición',
                    'Operaciones y Soporte',
                  ], {
                    tol,
                    maxIter,
                    precondicionador,
                  })
                : null;
              set({ resultado, isCalculating: false });
            } catch (error) {
              console.error('Error en el cálculo:', error);
              set({ isCalculating: false, resultado: null });
            }
          }, 0);
        },

        validarSPD: () => {
          const { A } = get();
          return isSPD(A);
        },
      }),
      {
        name: 'gradiente-financiera-storage',
        partialize: (state) => ({
          A: state.A,
          b: state.b,
          x0: state.x0,
          tol: state.tol,
          maxIter: state.maxIter,
          precondicionador: state.precondicionador,
        }),
      }
    )
  )
);

export type StoreState = ReturnType<typeof useLinearSystemStore.getState>;
