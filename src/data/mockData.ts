import { Initiative, ProjectExecution, ClosedProject, PortfolioKPIs, PortfolioAlert } from '../types/dashboard';

export const mockKPIs: PortfolioKPIs = {
  // Module 1 (Forms 1: Priorización)
  totalInitiatives: 125, // Prioritised initiatives with valid score
  totalInvestmentRequired: 68, // Millions MXN (Total requested)
  totalPotentialBenefit: 125, // Millions MXN
  avgExpectedROI: 184, // % ($125M / $68M)
  avgScore: 82, // /100
  avgTimeToValueMonths: 8,

  // Module 2 (Forms 2: Ejecución & PMO)
  activeProjects: 32, // Projects in construction
  pctOnTrack: 69, // 22 of 32 = 68.75% ~ 69%
  projectsInRisk: 6, // 6 of 32
  projectsDelayed: 4, // 4 of 32 (22 + 6 + 4 = 32)
  avgProgressPct: 67,
  consumedBudgetMXN: 42,
  totalApprovedBudgetMXN: 66, // Approved budget out of $68M requested
  portfolioSPI: 0.92,
  portfolioCPI: 1.05,
  openIssuesCount: 18,
  criticalDependenciesCount: 7,

  // Module 3 (Forms 3: Beneficios y Cierre)
  closedProjectsCount: 24, // Productive / Go-live projects
  realizedBenefitMXN: 96,
  promisedBenefitMXN: 102,
  avgROI90DaysPct: 145,
  benefitCompliancePct: 94, // ($96M / $102M = 94.1%)
  avgNPS: 74,
  avgAdoptionPct: 85,
  totalPostGoLiveIncidents: 4,

  // Cockpit Stage-Gate Funnel (Perfect Lifecycle Traceability)
  funnelIdeas: 160,          // 1. Total Ideas Ingresadas en Forms 1
  funnelPrioritized: 125,    // 2. Evaluadas & Priorizadas (Score > 70)
  funnelApproved: 50,       // 3. Aprobadas por Comité/PMO ($66M Aprobados)
  funnelInConstruction: 32, // 4. En Ejecución Activa (Forms 2)
  funnelProductive: 24,     // 5. Entregadas en Producción / Go-Live
  funnelRoiMeasured: 18,    // 6. Beneficio & ROI Medido a 90 Días (Forms 3)
};

export const mockInitiatives: Initiative[] = [
  { id: '1', rank: 1, name: 'IA Contact Center', area: 'Operaciones', sponsor: 'Dirección Operaciones', score: 96, roiExpected: 220, investmentRequired: 12, potentialBenefit: 26.4, timeToValueMonths: 6, effort: 'Bajo', value: 'Alto', quadrant: 'Quick Wins', category: 'Customer Experience' },
  { id: '2', rank: 2, name: 'CRM 360°', area: 'Ventas', sponsor: 'Dirección Comercial', score: 93, roiExpected: 200, investmentRequired: 15, potentialBenefit: 30, timeToValueMonths: 9, effort: 'Alto', value: 'Alto', quadrant: 'Apuestas Estratégicas', category: 'Transformación Digital' },
  { id: '3', rank: 3, name: 'Automatización SAP', area: 'Finanzas', sponsor: 'CFO', score: 89, roiExpected: 180, investmentRequired: 8, potentialBenefit: 14.4, timeToValueMonths: 7, effort: 'Alto', value: 'Alto', quadrant: 'Apuestas Estratégicas', category: 'Automatización' },
  { id: '4', rank: 4, name: 'Data Analytics', area: 'TI', sponsor: 'CIO', score: 87, roiExpected: 175, investmentRequired: 10, potentialBenefit: 17.5, timeToValueMonths: 5, effort: 'Bajo', value: 'Alto', quadrant: 'Quick Wins', category: 'Transformación Digital' },
  { id: '5', rank: 5, name: 'Portal del Cliente', area: 'Atención Clientes', sponsor: 'CX Manager', score: 84, roiExpected: 160, investmentRequired: 6, potentialBenefit: 9.6, timeToValueMonths: 4, effort: 'Bajo', value: 'Alto', quadrant: 'Quick Wins', category: 'Customer Experience' },
  { id: '6', rank: 6, name: 'Gestión Documental', area: 'Legal', sponsor: 'Dirección Legal', score: 81, roiExpected: 150, investmentRequired: 4, potentialBenefit: 6, timeToValueMonths: 6, effort: 'Bajo', value: 'Alto', quadrant: 'Quick Wins', category: 'Compliance' },
  { id: '7', rank: 7, name: 'Firma Electrónica', area: 'Compliance', sponsor: 'Auditoría', score: 78, roiExpected: 140, investmentRequired: 3, potentialBenefit: 4.2, timeToValueMonths: 3, effort: 'Bajo', value: 'Bajo', quadrant: 'Relleno', category: 'Compliance' },
  { id: '8', rank: 8, name: 'App Móvil Clientes', area: 'Marketing', sponsor: 'CMO', score: 76, roiExpected: 135, investmentRequired: 7, potentialBenefit: 9.45, timeToValueMonths: 8, effort: 'Alto', value: 'Alto', quadrant: 'Apuestas Estratégicas', category: 'Customer Experience' },
  { id: '9', rank: 9, name: 'Chatbot IA', area: 'Servicios', sponsor: 'Dirección Servicios', score: 74, roiExpected: 130, investmentRequired: 2.5, potentialBenefit: 3.25, timeToValueMonths: 3, effort: 'Bajo', value: 'Bajo', quadrant: 'Relleno', category: 'Automatización' },
  { id: '10', rank: 10, name: 'Gobierno de Datos', area: 'TI', sponsor: 'CIO', score: 72, roiExpected: 120, investmentRequired: 5, potentialBenefit: 6, timeToValueMonths: 12, effort: 'Alto', value: 'Bajo', quadrant: 'Baja Prioridad', category: 'Compliance' },
];

export const mockProjects: ProjectExecution[] = [
  { id: 'P1', name: 'CRM 360°', area: 'Ventas', sponsor: 'Dirección Comercial', pm: 'Carlos Ruiz', startDatePlan: '15 Ene', endDatePlan: '30 Jun', budgetApproved: 15, budgetSpent: 10.5, progressPlanPct: 80, progressRealPct: 82, statusGantt: 'On Track', timeHealth: 'Verde', costHealth: 'Verde', scopeHealth: 'Verde', riskHealth: 'Verde', spi: 1.02, cpi: 1.05 },
  { id: 'P2', name: 'IA Contact Center', area: 'Operaciones', sponsor: 'Dirección Operaciones', pm: 'Ana Gómez', startDatePlan: '01 Feb', endDatePlan: '31 Jul', budgetApproved: 12, budgetSpent: 8.4, progressPlanPct: 70, progressRealPct: 70, statusGantt: 'On Track', timeHealth: 'Verde', costHealth: 'Verde', scopeHealth: 'Verde', riskHealth: 'Verde', spi: 1.00, cpi: 1.02 },
  { id: 'P3', name: 'Automatización SAP', area: 'Finanzas', sponsor: 'CFO', pm: 'Jorge Hernández', startDatePlan: '01 Mar', endDatePlan: '31 Ago', budgetApproved: 8, budgetSpent: 6.2, progressPlanPct: 65, progressRealPct: 55, statusGantt: 'En Riesgo', timeHealth: 'Amarillo', costHealth: 'Verde', scopeHealth: 'Amarillo', riskHealth: 'Amarillo', spi: 0.85, cpi: 0.98 },
  { id: 'P4', name: 'Portal del Cliente', area: 'Atención Clientes', sponsor: 'CX Manager', pm: 'Lucía Torres', startDatePlan: '15 Mar', endDatePlan: '15 Sep', budgetApproved: 6, budgetSpent: 4.8, progressPlanPct: 60, progressRealPct: 50, statusGantt: 'En Riesgo', timeHealth: 'Amarillo', costHealth: 'Amarillo', scopeHealth: 'Verde', riskHealth: 'Amarillo', spi: 0.83, cpi: 0.95 },
  { id: 'P5', name: 'Data Analytics', area: 'TI', sponsor: 'CIO', pm: 'David Morales', startDatePlan: '01 Abr', endDatePlan: '31 Oct', budgetApproved: 10, budgetSpent: 5.0, progressPlanPct: 45, progressRealPct: 48, statusGantt: 'On Track', timeHealth: 'Verde', costHealth: 'Verde', scopeHealth: 'Verde', riskHealth: 'Verde', spi: 1.06, cpi: 1.08 },
  { id: 'P6', name: 'App Móvil Clientes', area: 'Marketing', sponsor: 'CMO', pm: 'Mariana Pérez', startDatePlan: '01 May', endDatePlan: '30 Nov', budgetApproved: 7, budgetSpent: 4.2, progressPlanPct: 35, progressRealPct: 22, statusGantt: 'Atrasado', timeHealth: 'Rojo', costHealth: 'Amarillo', scopeHealth: 'Rojo', riskHealth: 'Rojo', spi: 0.63, cpi: 0.88 },
  { id: 'P7', name: 'Firma Electrónica', area: 'Compliance', sponsor: 'Auditoría', pm: 'Fernando Vega', startDatePlan: '01 Jun', endDatePlan: '15 Dic', budgetApproved: 3, budgetSpent: 0.2, progressPlanPct: 10, progressRealPct: 0, statusGantt: 'Sin Iniciar', timeHealth: 'Verde', costHealth: 'Verde', scopeHealth: 'Verde', riskHealth: 'Verde', spi: 0.00, cpi: 1.00 },
];

export const mockClosedProjects: ClosedProject[] = [
  { id: 'C1', name: 'CRM 360°', area: 'Ventas', deliveryDate: '15 Ene 2026', roiExpectedPct: 25, roiReal90DaysPct: 28, nps: 82, npsStatus: 'Excelente', adoptionPct: 92, realBenefitMXN: 32, promisedBenefitMXN: 30 },
  { id: 'C2', name: 'IA Contact Center', area: 'Operaciones', deliveryDate: '28 Feb 2026', roiExpectedPct: 35, roiReal90DaysPct: 40, nps: 78, npsStatus: 'Excelente', adoptionPct: 90, realBenefitMXN: 28, promisedBenefitMXN: 26 },
  { id: 'C3', name: 'Automatización SAP', area: 'Finanzas', deliveryDate: '10 Mar 2026', roiExpectedPct: 20, roiReal90DaysPct: 18, nps: 75, npsStatus: 'Bueno', adoptionPct: 88, realBenefitMXN: 16, promisedBenefitMXN: 18 },
  { id: 'C4', name: 'Portal del Cliente', area: 'Atención Clientes', deliveryDate: '30 Abr 2026', roiExpectedPct: 20, roiReal90DaysPct: 10, nps: 0, npsStatus: 'Pendiente', adoptionPct: 60, realBenefitMXN: 11, promisedBenefitMXN: 15 },
  { id: 'C5', name: 'App Móvil Clientes', area: 'Marketing', deliveryDate: '20 May 2026', roiExpectedPct: 15, roiReal90DaysPct: 13, nps: 0, npsStatus: 'Pendiente', adoptionPct: 55, realBenefitMXN: 9, promisedBenefitMXN: 13 },
];

export const mockAlerts: PortfolioAlert[] = [
  { id: 'A1', type: 'danger', message: '6 proyectos en riesgo requieren atención inmediata de la PMO', count: 6 },
  { id: 'A2', type: 'warning', message: '8 proyectos sin encuesta NPS pendiente de aplicar', count: 8 },
  { id: 'A3', type: 'warning', message: '6 proyectos en periodo de gracia post go-live (<90 días)', count: 6 },
  { id: 'A4', type: 'info', message: '18 issues abiertos requieren seguimiento operativo', count: 18 },
];
