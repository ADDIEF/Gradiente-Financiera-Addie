/**
 * App.tsx — Layout principal con navegación lateral y todas las secciones del rubro.
 * Transiciones fluidas entre vistas con Framer Motion + AnimatePresence.
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  Code2,
  Sliders,
  Play,
  BarChart3,
  Table,
  ShieldAlert,
  Flag,
  BookOpen,
  RefreshCw,
} from 'lucide-react';
import { NotificationCenter } from '@/components/dashboard/NotificationCenter';
import type { Toast } from '@/types';

// Secciones
import { InicioSection } from '@/pages/InicioSection';
import { CasoEstudioSection } from '@/pages/CasoEstudioSection';
import { FormulacionSection } from '@/pages/FormulacionSection';
import { EntradaDatosSection } from '@/pages/EntradaDatosSection';
import { EscenariosSection } from '@/pages/EscenariosSection';
import { ResultadoSection } from '@/pages/ResultadoSection';
import { TablaComparativaSection } from '@/pages/TablaComparativaSection';
import { QASection } from '@/pages/QASection';
import { ConclusionesSection } from '@/pages/ConclusionesSection';
import { ReferenciasSection } from '@/pages/ReferenciasSection';

type Seccion =
  | 'inicio'
  | 'caso'
  | 'formulacion'
  | 'datos'
  | 'escenarios'
  | 'resultados'
  | 'comparativa'
  | 'qa'
  | 'conclusiones'
  | 'referencias';

const SECCIONES: { id: Seccion; label: string; icon: React.ElementType }[] = [
  { id: 'inicio', label: 'Inicio', icon: LayoutDashboard },
  { id: 'caso', label: 'Caso de estudio', icon: FileText },
  { id: 'formulacion', label: 'Formulación', icon: Code2 },
  { id: 'datos', label: 'Entrada de datos', icon: Sliders },
  { id: 'escenarios', label: 'Tres escenarios', icon: Play },
  { id: 'resultados', label: 'Resultados (6-8)', icon: BarChart3 },
  { id: 'comparativa', label: 'Tabla comparativa', icon: Table },
  { id: 'qa', label: 'Módulo QA', icon: ShieldAlert },
  { id: 'conclusiones', label: 'Conclusiones', icon: Flag },
  { id: 'referencias', label: 'Referencias', icon: BookOpen },
];

const COMPONENTES: Record<Seccion, React.ElementType> = {
  inicio: InicioSection,
  caso: CasoEstudioSection,
  formulacion: FormulacionSection,
  datos: EntradaDatosSection,
  escenarios: EscenariosSection,
  resultados: ResultadoSection,
  comparativa: TablaComparativaSection,
  qa: QASection,
  conclusiones: ConclusionesSection,
  referencias: ReferenciasSection,
};

export default function App() {
  const [seccion, setSeccion] = useState<Seccion>('inicio');
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const full: Toast = { ...toast, id, duracion: 6000 };
      setToasts((prev) => [...prev, full]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, full.duracion!);
    },
    []
  );

  const ComponenteSeccion = COMPONENTES[seccion];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fondo decorativo */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-600/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-slate-800/40 blur-[120px]"></div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 border-r border-slate-800/50 bg-slate-950/80 backdrop-blur-md z-20 flex-shrink-0">
          <div className="flex items-center gap-3 p-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-slate-700 flex items-center justify-center shadow-lg shadow-brand-500/20">
              <RefreshCw className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-slate-100 tracking-tight">Gradiente Financiera</div>
              <div className="text-xs text-slate-500">Ax = b (4×4)</div>
            </div>
          </div>

          <nav className="flex-1 space-y-0.5 px-3 py-4">
            {SECCIONES.map((s) => {
              const activo = seccion === s.id;
              const Icon = s.icon;
              return (
                <motion.button
                  key={s.id}
                  onClick={() => setSeccion(s.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activo
                      ? 'bg-brand-600/15 border border-brand-500/30 text-brand-300 shadow-[0_0_15px_rgba(14,165,233,0.2)]'
                      : 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200 hover:border-slate-700/50 border-transparent'
                  } border`}
                >
                  <Icon className={`w-5 h-5 ${activo ? 'text-brand-400' : 'text-slate-600'}`} />
                  <span className="flex-1">{s.label}</span>
                </motion.button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-800/50">
            <p className="text-[10px] text-slate-500 font-mono">
              Adriana Valeria Fernandez Flores<br />
              UMSA — Métodos Numéricos
            </p>
          </div>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 overflow-y-auto bg-slate-950 min-h-0">
          <header className="sticky top-0 z-20 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/50 px-6 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-600/20 flex items-center justify-center text-brand-400 flex-shrink-0">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-100">
                  {SECCIONES.find((s) => s.id === seccion)?.label}
                </div>
                <div className="text-xs text-slate-500">Simulador de asignación presupuestaria 4×4</div>
              </div>
            </div>
          </header>

          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={seccion}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ type: 'spring', damping: 18, stiffness: 120 }}
              >
                {seccion === 'qa' ? (
                  <QASection onShowToast={showToast} />
                ) : (
                  <ComponenteSeccion />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Notificaciones */}
      <NotificationCenter
        toasts={toasts}
        onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />
    </div>
  );
}
