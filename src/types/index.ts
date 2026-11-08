export type Vector = number[];
export type Matrix = number[][];

export type ScenarioKey = 'ideal' | 'estres' | 'malCondicionado';

export interface VariableDef {
  index: number;
  nombre: string;
  tecnico: string;
  humano: string;
  ejemplo: string;
}

export interface Scenario {
  key: ScenarioKey;
  nombre: string;
  descripcion: string;
  justificacionFinanciera: string;
  A: Matrix;
  b: Vector;
  x0: Vector;
  color: string;
  interpretacion: string;
}

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

export interface QATestCase {
  id: number;
  nombre: string;
  entrada: string;
  resultadoEsperado: string;
  resultadoObtenido: string;
  conclusion: string;
  status: 'pendiente' | 'pasada' | 'fallida';
}

export interface LinearSystemState {
  A: Matrix;
  b: Vector;
  x0: Vector;
  n: number;
  tol: number;
  maxIter: number;
  precondicionador: 'jacobi' | 'ninguno';
  resultado: ComparisonResult | null;
  isCalculating: boolean;
  lastScenario: ScenarioKey | null;
  activeScenario: ScenarioKey | null;
  setCell: (matriz: 'A' | 'b' | 'x0', i: number, j: number, value: number) => void;
  setTol: (value: number) => void;
  setMaxIter: (value: number) => void;
  setPrecondicionador: (value: 'jacobi' | 'ninguno') => void;
  loadScenario: (scenario: Scenario) => void;
  reset: () => void;
  calcular: () => void;
  validarSPD: () => boolean;
}

export interface Toast {
  id: string;
  tipo: 'error' | 'success' | 'warning' | 'info';
  titulo: string;
  mensaje: string;
  duracion?: number;
}
