/**
 * mathUtils.ts — Motor de cálculo numérico para sistemas lineales Ax = b (n ≥ 4)
 *
 * Implementa el algoritmo de Gradientes Conjugados Precondicionado (GCP) según
 * Suñagua S. (2020), Revista Boliviana de Matemática– UMSA, y el método directo
 * de Cholesky como solución de referencia. Incluye Gradientes Conjugados simple (GC)
 * como contraste, cálculo de errores por componente y números de condición.
 *
 * Tolerancia de parada por defecto: 1e-6 (∥r_k∥₂ / ∥b∥₂ < 1e-6).
 */

export type Vector = number[];
export type Matrix = number[][];

export interface SolveOptions {
  tol?: number;
  maxIter?: number;
  x0?: Vector;
  precondicionador?: 'jacobi' | 'ninguno';
}

export interface SolveResult {
  method: string;
  x: Vector;
  iterations: number;
  residualNorm: number;
  relativeResidual: number;
  converged: boolean;
  timeMs: number;
  tol: number;
}

export interface ErrorByComponent {
  i: number;
  variable: string;
  xRef: number;
  xApprox: number;
  ea: number;
  er: number | null;
  ep: number | null;
}

export interface ErrorMetrics {
  absolute: number;
  relative: number;
  percentage: number;
  componentWise: ErrorByComponent[];
  globalRelativeResidual: number;
}

export interface ComparisonResult {
  direct: SolveResult;
  gc: SolveResult;
  gcp: SolveResult;
  errorsGc: ErrorMetrics;
  errorsGcp: ErrorMetrics;
  conditionNumberA: number;
  conditionNumberPrecond: number;
  isSPD: boolean;
  timestamp: number;
}

/* ═══════════════════════════════════════════════════════════════════════
   Utilidades de álgebra lineal
   ═══════════════════════════════════════════════════════════════════════ */

export function zeros(n: number): Vector {
  return Array(n).fill(0);
}

export function zerosMatrix(n: number): Matrix {
  return Array.from({ length: n }, () => Array(n).fill(0));
}

export function copy(v: Vector): Vector {
  return [...v];
}

export function add(a: Vector, b: Vector): Vector {
  return a.map((v, i) => v + b[i]);
}

export function sub(a: Vector, b: Vector): Vector {
  return a.map((v, i) => v - b[i]);
}

export function scale(v: Vector, s: number): Vector {
  return v.map((x) => x * s);
}

export function dot(a: Vector, b: Vector): number {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}

export function norm2(v: Vector): number {
  return Math.sqrt(dot(v, v));
}

export function normInf(v: Vector): number {
  return Math.max(...v.map((x) => Math.abs(x)));
}

export function matVec(A: Matrix, v: Vector): Vector {
  return A.map((row) => dot(row, v));
}

export function identity(n: number): Matrix {
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  );
}

export function matMat(A: Matrix, B: Matrix): Matrix {
  const n = A.length;
  const m = B[0].length;
  const p = B.length;
  const C = zerosMatrix(n);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      let s = 0;
      for (let k = 0; k < p; k++) s += A[i][k] * B[k][j];
      C[i][j] = s;
    }
  }
  return C;
}

/* ═══════════════════════════════════════════════════════════════════════
   Validación: simétrica y definida positiva (SPD)
   ═══════════════════════════════════════════════════════════════════════ */

export function isSymmetric(A: Matrix, tol = 1e-8): boolean {
  const n = A.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (Math.abs(A[i][j] - A[j][i]) > tol) return false;
    }
  }
  return true;
}

export function isPositiveDefinite(A: Matrix): boolean {
  try {
    choleskyDecompose(A);
    return true;
  } catch {
    return false;
  }
}

export function isSPD(A: Matrix): boolean {
  return isSymmetric(A) && isPositiveDefinite(A);
}

/* ═══════════════════════════════════════════════════════════════════════
   Cholesky: A = L · Lᵀ  (método directo de referencia)
   ═══════════════════════════════════════════════════════════════════════ */

export function choleskyDecompose(A: Matrix): Matrix {
  const n = A.length;
  const L = zerosMatrix(n);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      let s = 0;
      for (let k = 0; k < j; k++) s += L[i][k] * L[j][k];

      if (i === j) {
        const val = A[i][i] - s;
        if (val <= 0) {
          throw new Error('Matriz no definida positiva (pivote <= 0 en Cholesky)');
        }
        L[i][j] = Math.sqrt(val);
      } else {
        if (Math.abs(L[j][j]) < 1e-14) {
          throw new Error('Pivote nulo en Cholesky');
        }
        L[i][j] = (A[i][j] - s) / L[j][j];
      }
    }
  }
  return L;
}

export function forwardSubstitution(L: Matrix, b: Vector): Vector {
  const n = L.length;
  const y = zeros(n);
  for (let i = 0; i < n; i++) {
    let s = 0;
    for (let k = 0; k < i; k++) s += L[i][k] * y[k];
    if (Math.abs(L[i][i]) < 1e-14) throw new Error('Pivote nulo en sustitución progresiva');
    y[i] = (b[i] - s) / L[i][i];
  }
  return y;
}

export function backwardSubstitution(L: Matrix, y: Vector): Vector {
  const n = L.length;
  const x = zeros(n);
  for (let i = n - 1; i >= 0; i--) {
    let s = 0;
    for (let k = i + 1; k < n; k++) s += L[k][i] * x[k];
    if (Math.abs(L[i][i]) < 1e-14) throw new Error('Pivote nulo en sustitución regresiva');
    x[i] = (y[i] - s) / L[i][i];
  }
  return x;
}

export function choleskySolve(A: Matrix, b: Vector, tol = 1e-6): SolveResult {
  const start = performance.now();
  const L = choleskyDecompose(A);
  const y = forwardSubstitution(L, b);
  const x = backwardSubstitution(L, y);
  const residual = sub(b, matVec(A, x));
  const bNorm = norm2(b);
  const end = performance.now();

  return {
    method: 'Cholesky (directo)',
    x,
    iterations: 1,
    residualNorm: norm2(residual),
    relativeResidual: bNorm === 0 ? 0 : norm2(residual) / bNorm,
    converged: true,
    timeMs: end - start,
    tol,
  };
}

export function inverseViaCholesky(A: Matrix): Matrix {
  const n = A.length;
  const L = choleskyDecompose(A);
  const I = identity(n);
  const X = zerosMatrix(n);
  for (let j = 0; j < n; j++) {
    const y = forwardSubstitution(L, I[j]);
    const x = backwardSubstitution(L, y);
    for (let i = 0; i < n; i++) X[i][j] = x[i];
  }
  return X;
}

export function normInfMatrix(A: Matrix): number {
  return Math.max(...A.map((row) => row.reduce((acc, v) => acc + Math.abs(v), 0)));
}

/** Número de condición: κ(A) = ||A||∞ · ||A⁻¹||∞ */
export function conditionNumber(A: Matrix): number {
  try {
    const Ainv = inverseViaCholesky(A);
    return normInfMatrix(A) * normInfMatrix(Ainv);
  } catch {
    return Infinity;
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   Gradientes Conjugados simple (GC) — Sin precondicionador
   ═══════════════════════════════════════════════════════════════════════ */

export function conjugateGradient(A: Matrix, b: Vector, opts: SolveOptions = {}): SolveResult {
  const start = performance.now();
  const n = A.length;
  const tol = opts.tol ?? 1e-6;
  const maxIter = opts.maxIter ?? 1000;
  const x = opts.x0 ? copy(opts.x0) : zeros(n);

  const bNorm = norm2(b);
  let r = sub(b, matVec(A, x));
  let p = copy(r);
  let rTr = dot(r, r);
  const r0Norm = norm2(r);
  let iterations = 0;
  let converged = r0Norm < (bNorm === 0 ? 1e-14 : tol * bNorm);

  for (let k = 0; k < maxIter && !converged; k++) {
    const Ap = matVec(A, p);
    const pAp = dot(p, Ap);
    if (Math.abs(pAp) < 1e-14) break;

    const alpha = rTr / pAp;
    for (let i = 0; i < n; i++) x[i] += alpha * p[i];

    r = sub(r, scale(Ap, alpha));
    iterations = k + 1;
    converged = norm2(r) < tol * bNorm;

    const rTrNew = dot(r, r);
    const beta = rTrNew / rTr;
    for (let i = 0; i < n; i++) p[i] = r[i] + beta * p[i];
    rTr = rTrNew;
  }

  const residual = sub(b, matVec(A, x));
  return {
    method: 'Gradientes Conjugados (GC)',
    x,
    iterations,
    residualNorm: norm2(residual),
    relativeResidual: bNorm === 0 ? 0 : norm2(residual) / bNorm,
    converged,
    timeMs: performance.now() - start,
    tol,
  };
}

/* ═══════════════════════════════════════════════════════════════════════
   Gradientes Conjugados Precondicionado (GCP) — Precondicionador Jacobi
   ═══════════════════════════════════════════════════════════════════════ */

export function jacobiPrecondition(A: Matrix, r: Vector): Vector {
  return r.map((ri, i) => {
    const d = A[i][i];
    if (Math.abs(d) < 1e-14) return ri;
    return ri / d;
  });
}

export function preconditionedConjugateGradient(
  A: Matrix,
  b: Vector,
  opts: SolveOptions = {}
): SolveResult {
  const start = performance.now();
  const n = A.length;
  const tol = opts.tol ?? 1e-6;
  const maxIter = opts.maxIter ?? 1000;
  const x = opts.x0 ? copy(opts.x0) : zeros(n);

  const bNorm = norm2(b);
  let r = sub(b, matVec(A, x));
  let z = jacobiPrecondition(A, r);
  let p = copy(z);
  let rZ = dot(r, z);
  const r0Norm = norm2(r);
  let iterations = 0;
  let converged = r0Norm < (bNorm === 0 ? 1e-14 : tol * bNorm);

  for (let k = 0; k < maxIter && !converged; k++) {
    const Ap = matVec(A, p);
    const pAp = dot(p, Ap);
    if (Math.abs(pAp) < 1e-14) break;

    const alpha = rZ / pAp;
    for (let i = 0; i < n; i++) x[i] += alpha * p[i];

    r = sub(r, scale(Ap, alpha));
    iterations = k + 1;
    converged = norm2(r) < tol * bNorm;

    z = jacobiPrecondition(A, r);
    const rZNew = dot(r, z);
    const beta = rZNew / rZ;
    for (let i = 0; i < n; i++) p[i] = z[i] + beta * p[i];
    rZ = rZNew;
  }

  const residual = sub(b, matVec(A, x));
  return {
    method: 'Gradientes Conjugados Precondicionado (GCP)',
    x,
    iterations,
    residualNorm: norm2(residual),
    relativeResidual: bNorm === 0 ? 0 : norm2(residual) / bNorm,
    converged,
    timeMs: performance.now() - start,
    tol,
  };
}

/* ═══════════════════════════════════════════════════════════════════════
   Errores por componente y globales
   ═══════════════════════════════════════════════════════════════════════ */

export function computeErrors(
  xApprox: Vector,
  xExact: Vector,
  variableNames: string[],
  b: Vector,
  A: Matrix
): ErrorMetrics {
  const n = xExact.length;
  const diff = sub(xApprox, xExact);
  const absolute = norm2(diff);
  const exactNorm = norm2(xExact);
  const relative = exactNorm === 0 ? absolute : absolute / exactNorm;
  const percentage = relative * 100;

  const bNorm = norm2(b);
  const residual = sub(b, matVec(A, xApprox));
  const globalRelativeResidual = bNorm === 0 ? 0 : norm2(residual) / bNorm;

  const componentWise: ErrorByComponent[] = [];
  for (let i = 0; i < n; i++) {
    const ea = Math.abs(diff[i]);
    const xRef = xExact[i];
    const er = Math.abs(xRef) < 1e-14 ? null : ea / Math.abs(xRef);
    const ep = er === null ? null : er * 100;
    componentWise.push({
      i: i + 1,
      variable: variableNames[i] ?? `x${i + 1}`,
      xRef,
      xApprox: xApprox[i],
      ea,
      er,
      ep,
    });
  }

  return { absolute, relative, percentage, componentWise, globalRelativeResidual };
}

/* ═══════════════════════════════════════════════════════════════════════
   Determinante y Criterio de Sylvester (demostración de definida positiva)
   ═══════════════════════════════════════════════════════════════════════ */

export function determinant(A: Matrix): number {
  const n = A.length;
  const M = A.map((row) => [...row]);
  let det = 1;
  for (let i = 0; i < n; i++) {
    let piv = i;
    for (let r = i + 1; r < n; r++) {
      if (Math.abs(M[r][i]) > Math.abs(M[piv][i])) piv = r;
    }
    if (Math.abs(M[piv][i]) < 1e-14) return 0;
    if (piv !== i) {
      [M[i], M[piv]] = [M[piv], M[i]];
      det = -det;
    }
    det *= M[i][i];
    for (let r = i + 1; r < n; r++) {
      const factor = M[r][i] / M[i][i];
      for (let c = i; c < n; c++) M[r][c] -= factor * M[i][c];
    }
  }
  return det;
}

/** Menores principales líderes: det de submatrices 1×1, 2×2, …, n×n.
 *  Si todos son positivos → A es definida positiva (Criterio de Sylvester). */
export function sylvesterMinors(A: Matrix): number[] {
  const n = A.length;
  const minors: number[] = [];
  for (let k = 1; k <= n; k++) {
    const sub = A.slice(0, k).map((row) => row.slice(0, k));
    minors.push(determinant(sub));
  }
  return minors;
}

/* ═══════════════════════════════════════════════════════════════════════
   Orquestador: resuelve con los 3 métodos y compara
   ═══════════════════════════════════════════════════════════════════════ */

export function resolverSistema(
  A: Matrix,
  b: Vector,
  x0: Vector,
  variableNames: string[],
  opts: SolveOptions = {}
): ComparisonResult {
  const isSPDMatrix = isSPD(A);

  const direct = choleskySolve(A, b, opts.tol);
  const gc = conjugateGradient(A, b, { ...opts, x0 });
  const gcp = preconditionedConjugateGradient(A, b, { ...opts, x0 });

  const errorsGc = computeErrors(gc.x, direct.x, variableNames, b, A);
  const errorsGcp = computeErrors(gcp.x, direct.x, variableNames, b, A);

  const condA = isSPDMatrix ? conditionNumber(A) : Infinity;

  // κ(M⁻¹A): condición de la matriz precondicionada (Jacobi: D⁻¹A)
  let condPrecond = Infinity;
  if (isSPDMatrix) {
    try {
      const n = A.length;
      const DInvA = zerosMatrix(n);
      for (let i = 0; i < n; i++) {
        const d = A[i][i];
        for (let j = 0; j < n; j++) {
          DInvA[i][j] = Math.abs(d) < 1e-14 ? 0 : A[i][j] / d;
        }
      }
      condPrecond = conditionNumber(DInvA);
    } catch {
      condPrecond = Infinity;
    }
  }

  return {
    direct,
    gc,
    gcp,
    errorsGc,
    errorsGcp,
    conditionNumberA: condA,
    conditionNumberPrecond: condPrecond,
    isSPD: isSPDMatrix,
    timestamp: Date.now(),
  };
}
