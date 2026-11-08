# Gradiente Financiera — Simulador de Asignación Presupuestaria 4×4

SPA desarrollada con **React + TypeScript + Tailwind CSS + Framer Motion** para el Desafío Académico de Métodos Numéricos (UMSA).

**Autora:** Adriana Valeria Fernandez Flores  
**Mención:** Desarrollo de Sistemas  
**Materia:** Métodos Numéricos  
**Repositorio:** https://github.com/ADDIEF/Gradiente-Financiera-Addie.git

---

## 📋 Desafío cumplido (rúbrica 100 puntos)

| Criterio | Puntos | Estado |
|----------|--------|--------|
| Caso financiero y modelado (n ≥ 4) | 15 | ✅ |
| Solución numérica de referencia | 15 | ✅ |
| Implementación del algoritmo GCP | 20 | ✅ |
| Construcción de los tres escenarios | 15 | ✅ |
| Análisis de errores y condicionamiento | 15 | ✅ |
| Página web interactiva y módulo QA | 10 | ✅ |
| Aporte específico de la mención | 5 | ✅ |
| Interpretación y conclusiones | 5 | ✅ |
| **Total** | **100** | ✅ |

---

## 🗂️ Estructura de la aplicación (todas las secciones del rubro)

```
src/
├── types/index.ts              # Tipos compartidos
├── lib/
│   ├── mathUtils.ts            # ⚙️ Motor matemático (Cholesky, GC, GCP, errores, condición, Sylvester)
│   └── scenarios.ts            # Escenarios predefinidos + definiciones de variables
├── context/
│   └── useLinearSystemStore.ts # 🌐 Estado global (Zustand + localStorage)
├── components/
│   ├── ui/                     # GlassCard, InputField, Toast, NotificationCenter
│   └── dashboard/              # MatrixEditor, ScenarioButtons, SolverResults, ErrorTable, QAModule, ConditionSummary
└── pages/                      # 📄 Todas las secciones del rubro
    ├── InicioSection.tsx       # 1. Inicio (datos estudiante, mención, síntesis)
    ├── CasoEstudioSection.tsx  # 2. Caso de estudio (contexto, justificación, datos)
    ├── FormulacionSection.tsx  # 3. Formulación (variables, Ax=b, coeficientes, demostración SPD por Sylvester)
    ├── EntradaDatosSection.tsx # 4. Entrada de datos (editar A, b, x0, tol, Nmax, precondicionador)
    ├── EscenariosSection.tsx   # 5. Tres escenarios (botones carga rápida)
    ├── ResultadoSection.tsx    # 6-8. Solución de referencia, GCP vs GC, errores
    ├── TablaComparativaSection.tsx # Tabla comparativa obligatoria (3 escenarios)
    ├── QASection.tsx           # 9. Módulo QA (4 pruebas: Entrada/Esperado/Obtenido/Conclusión)
    ├── ConclusionesSection.tsx # 10. Conclusiones
    └── ReferenciasSection.tsx  # 10. Referencias (Suñagua 2020, Golub & Van Loan, Saad)
```

---

## 🧠 Modelo financiero (Mención: Desarrollo de Sistemas)

**Caso:** Asignación presupuestaria de 4 categorías de una empresa de software.

| Variable | Nombre | Significado técnico | Significado humano |
|----------|--------|---------------------|--------------------|
| x₁ | Desarrollo de Software / SaaS | Partida para desarrollo y mantenimiento del producto | Cuánto se destina a crear y mejorar el programa principal |
| x₂ | Infraestructura y Cloud | Servidores, almacenamiento, servicios en la nube | Cuánto se paga por el "alquiler" de servidores e internet |
| x₃ | Marketing y Adquisición | Publicidad y captación de clientes | Cuánto se invierte en dar a conocer el producto |
| x₄ | Operaciones y Soporte | Atención al cliente y soporte técnico | Cuánto se destina a atender a clientes existentes |

La matriz **A** modela interdependencias entre categorías (diagonal = costo base; fuera de diagonal = influencia mutua). El vector **b** es el requerimiento total de recursos por escenario.

---

## ⚙️ Motor matemático

- **Método directo de referencia:** Cholesky (A = L·Lᵀ) → solución clasificada como "exacta".
- **Gradientes Conjugados simple (GC):** contraste sin precondicionar.
- **Gradientes Conjugados Precondicionado (GCP):** precondicionador de Jacobi (diagonal), algoritmo de Suñagua (2020).
- **Criterio de parada:** ∥rₖ∥₂ / ∥b∥₂ < 10⁻⁶ (tolerancia configurable, por defecto 1e-6).
- **Errores por variable:** Ea,i = \|x_ref,i − x_metodo,i\|; Er,i = Ea,i / \|x_ref,i\| (no definido si x_ref,i = 0); Ep,i = Er,i × 100%.
- **Residuo relativo global:** ∥b − Ax∥₂ / ∥b∥₂.
- **Número de condición:** κ(A) = \|A\|∞·\|A⁻¹\|∞ y κ(M⁻¹A) (matriz precondicionada).
- **Demostración SPD:** simetría (A = Aᵀ) + Criterio de Sylvester (menores principales líderes > 0).

---

## 🧪 Módulo QA (4 pruebas obligatorias)

Cada prueba sigue el formato Entrada / Resultado Esperado / Resultado Obtenido / Conclusión:

1. **Carga de escenarios** — Verifica que Ideal, Bajo Estrés y Mal Condicionado carguen correctamente.
2. **Validación de matriz no válida** — Matriz no simétrica/no definida positiva: el sistema captura el error y notifica sin colapsar.
3. **Edición dinámica** — Modificación de coeficientes y recálculo instantáneo.
4. **Comparativa de precondicionamiento** — GCP alcanza la tolerancia en ≤ iteraciones que GC en mal condicionado.

---

## 🚀 Instalación y ejecución local

```bash
# 1. Clonar el repositorio
git clone https://github.com/ADDIEF/Gradiente-Financiera-Addie.git
cd Gradiente-Financiera-Addie

# 2. Instalar dependencias
npm install

# 3. Entorno de desarrollo (http://localhost:5173)
npm run dev

# 4. Build de producción
npm run build

# 5. Vista previa del build
npm run preview
```

Requisitos: Node.js ≥ 18.

---

## 📦 Despliegue público (entregable 1)

La página debe ser accesible públicamente sin credenciales. Opciones recomendadas (gratuitas):

- **Vercel:** `vercel --prod` (conectar el repositorio de GitHub)
- **Netlify:** arrastrar la carpeta `dist/` o conectar el repo
- **GitHub Pages:** build y subir la carpeta `dist/` a la rama `gh-pages`

---

## 🔗 Entregables

1. **Enlace público de la página web funcional** — desplegar en Vercel/Netlify/GitHub Pages.
2. **Enlace al repositorio de código fuente** — https://github.com/ADDIEF/Gradiente-Financiera-Addie.git (público, con historial de commits y este README).

---

## 📚 Bibliografía

- Suñagua S., P. (2020). Método de Gradientes Conjugados Precondicionado. Revista Boliviana de Matemática– UMSA, 04, 2–7.
- Golub, G. H., & Van Loan, C. F. (2013). Matrix Computations (4th ed.). Johns Hopkins University Press.
- Saad, Y. (2003). Iterative Methods for Sparse Linear Systems (2nd ed.). SIAM.

---

## ✅ Cómo subirlo a GitHub

Desde la carpeta del proyecto:

```bash
git init
git add .
git commit -m "feat: simulador completo Ax=b 4x4 con GCP, GC, Cholesky, QA y todas las secciones del rubro"
git branch -M main
git remote add origin https://github.com/ADDIEF/Gradiente-Financiera-Addie.git
git push -u origin main
```

Luego desplegar la carpeta `dist/` en Vercel o Netlify para obtener el enlace público.
