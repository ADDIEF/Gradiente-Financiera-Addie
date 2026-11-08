/**
 * scenarios.ts — Escenarios predefinidos de carga rápida.
 *
 * Caso financiero (Mención: Desarrollo de Sistemas):
 * Simulador de asignación presupuestaria de 4 categorías de una empresa de software.
 *
 * Variables (n = 4):
 *   x1 = Presupuesto para Desarrollo de Software / SaaS
 *   x2 = Presupuesto para Infraestructura y Cloud
 *   x3 = Presupuesto para Marketing y Adquisición de usuarios
 *   x4 = Presupuesto para Operaciones y Soporte técnico
 *
 * La matriz A representa la interdependencia entre categorías:
 *   - a_ii (diagonal): costo base / autoconsumo de cada categoría.
 *   - a_ij (fuera de diagonal): cuánto afecta la categoría j a la categoría i
 *     (compartición de recursos, dependencias de infraestructura, sinergias).
 * El vector b representa el requerimiento total de recursos (monto asignable)
 * para cada categoría bajo cada escenario.
 */

import type { Scenario, VariableDef } from '@/types';

export const VARIABLES: VariableDef[] = [
  {
    index: 1,
    nombre: 'Desarrollo de Software / SaaS',
    tecnico: 'x1: partida presupuestaria destinada al desarrollo y mantenimiento del producto de software como servicio.',
    humano: 'Cuánto dinero se destina a crear y mejorar el programa principal de la empresa (la aplicación o plataforma que se vende).',
    ejemplo: 'Sueldos de programadores, licencias de herramientas de desarrollo, pruebas de calidad.',
  },
  {
    index: 2,
    nombre: 'Infraestructura y Cloud',
    tecnico: 'x2: partida para servidores, almacenamiento, servicios en la nube y conectividad.',
    humano: 'Cuánto se paga por el "alquiler" de servidores y espacio en internet donde vive el software.',
    ejemplo: 'AWS, Google Cloud, servidores, bases de datos, ancho de banda.',
  },
  {
    index: 3,
    nombre: 'Marketing y Adquisición',
    tecnico: 'x3: partida para publicidad, captación de clientes y campañas de atracción de usuarios.',
    humano: 'Cuánto se invierte en hacer que la gente conozca el producto y se registre como cliente.',
    ejemplo: 'Anuncios en redes sociales, Google Ads, ferias, promociones.',
  },
  {
    index: 4,
    nombre: 'Operaciones y Soporte',
    tecnico: 'x4: partida para atención al cliente, soporte técnico y gestión operativa diaria.',
    humano: 'Cuánto se destina a atender a los clientes que ya compraron y resolver sus problemas.',
    ejemplo: 'Equipo de soporte, llamadas, tickets, atención al usuario.',
  },
];

export const SCENARIOS: Scenario[] = [
  {
    key: 'ideal',
    nombre: 'Ideal',
    descripcion:
      'Situación financiera estable y equilibrada. Matriz bien condicionada con número de condición bajo.',
    justificacionFinanciera:
      'La empresa tiene ingresos estables, costos controlados y poca interferencia entre departamentos. Cada categoría tiene su propio presupuesto bien definido y las dependencias entre ellas son bajas (fuera de diagonal pequeño). Es el escenario de referencia donde se espera convergencia rápida y soluciones precisas.',
    A: [
      [4.0, 0.5, 0.2, 0.1],
      [0.5, 4.0, 0.5, 0.2],
      [0.2, 0.5, 4.0, 0.5],
      [0.1, 0.2, 0.5, 4.0],
    ],
    b: [100.0, 80.0, 60.0, 40.0],
    x0: [0, 0, 0, 0],
    color: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    interpretacion:
      'En condiciones normales, cada departamento recibe una asignación estable y predecible. El sistema es fácil de resolver y pequeños cambios en b no provocan variaciones bruscas en x.',
  },
  {
    key: 'estres',
    nombre: 'Bajo Estrés Financiero',
    descripcion:
      'Escenario de perturbación financiera (incremento de costos, inflación, variación de ingresos o tasas).',
    justificacionFinanciera:
      'Ante una crisis o inflación, los costos de infraestructura y desarrollo suben (diagonal de A aumenta) y el requerimiento total b crece porque se necesita más recurso para mantener el mismo nivel de servicio. La matriz sigue siendo bien condicionada pero el punto de equilibrio se desplaza.',
    A: [
      [5.0, 0.8, 0.4, 0.3],
      [0.8, 5.0, 0.8, 0.4],
      [0.4, 0.8, 5.0, 0.8],
      [0.3, 0.4, 0.8, 5.0],
    ],
    b: [150.0, 120.0, 90.0, 70.0],
    x0: [0, 0, 0, 0],
    color: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    interpretacion:
      'Bajo estrés, se requiere asignar más presupuesto a todas las categorías, especialmente a desarrollo e infraestructura. El condicionamiento no empeora drásticamente, pero el monto total asignable es mayor.',
  },
  {
    key: 'malCondicionado',
    nombre: 'Mal Condicionado',
    descripcion:
      'Escenario con alto grado de interdependencia o mal escalamiento entre variables. Matriz casi singular.',
    justificacionFinanciera:
      'Las categorías dependen fuertemente unas de otras (correlación alta fuera de diagonal). Por ejemplo, si infraestructura falla, desarrollo no puede trabajar; si marketing no trae clientes, operaciones no tiene a quién atender. Esta fuerte interdependencia hace que A sea casi singular (κ(A) ≫ 1), lo que dificulta la convergencia de métodos iterativos sin precondicionamiento.',
    A: [
      [1.0, 0.99, 0.98, 0.97],
      [0.99, 1.0, 0.99, 0.98],
      [0.98, 0.99, 1.0, 0.99],
      [0.97, 0.98, 0.99, 1.0],
    ],
    b: [100.0, 100.0, 100.0, 100.0],
    x0: [0, 0, 0, 0],
    color: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
    interpretacion:
      'Cuando todo depende de todo, un pequeño cambio en el presupuesto de una categoría afecta fuertemente a las demás. El sistema es muy sensible: errores pequeños en los datos pueden producir soluciones muy diferentes. Aquí el precondicionador de Jacobi es esencial.',
  },
];

export function getScenarioByKey(key: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.key === key);
}
