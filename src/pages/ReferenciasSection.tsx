/**
 * ReferenciasSection.tsx — Sección: Referencias bibliográficas.
 */

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { BookOpen } from 'lucide-react';

export function ReferenciasSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3">
        <BookOpen className="w-5 h-5 text-brand-400" />
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
          Referencias bibliográficas
        </h2>
      </div>
      <GlassCard>
        <ol className="space-y-3 text-sm text-slate-300 leading-relaxed list-decimal pl-6">
          <li>
            Suñagua S., P. (2020). <em>Método de Gradientes Conjugados Precondicionado.</em>
            Revista Boliviana de Matemática– UMSA, 04, 2–7. <span className="text-slate-500">(Artículo base del desafío)</span>
          </li>
          <li>
            Golub, G. H., & Van Loan, C. F. (2013). <em>Matrix Computations</em> (4th ed.).
            Johns Hopkins University Press.
          </li>
          <li>
            Saad, Y. (2003). <em>Iterative Methods for Sparse Linear Systems</em> (2nd ed.). SIAM.
          </li>
        </ol>
      </GlassCard>
    </motion.div>
  );
}
