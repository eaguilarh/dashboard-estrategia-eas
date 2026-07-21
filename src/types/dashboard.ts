export type ViewMode = 'cockpit' | 'iniciativas' | 'proyectos' | 'beneficios' | 'nps' | 'pmo' | 'config';

export type GanttStatus = 'On Track' | 'En Riesgo' | 'Atrasado' | 'Sin Iniciar' | 'Completado';
export type HealthStatus = 'Verde' | 'Amarillo' | 'Rojo';

export interface Initiative {
  id: string;
  rank: number;
  name: string;
  area: string;
  sponsor: string;
  score: number; // 0-100
  roiExpected: number; // e.g. 220 (%)
  investmentRequired: number; // MXN
  potentialBenefit: number; // MXN
  timeToValueMonths: number;
  effort: 'Bajo' | 'Alto';
  value: 'Bajo' | 'Alto';
  quadrant: 'Quick Wins' | 'Apuestas Estratégicas' | 'Relleno' | 'Baja Prioridad';
  category: 'Transformación Digital' | 'Customer Experience' | 'Automatización' | 'Compliance';
}

export interface ProjectExecution {
  id: string;
  initiativeId?: string;
  name: string;
  area: string;
  sponsor: string;
  pm: string;
  startDatePlan: string;
  endDatePlan: string;
  startDateReal?: string;
  endDateEstimated?: string;
  budgetApproved: number; // MXN
  budgetSpent: number; // MXN
  progressPlanPct: number; // 0-100
  progressRealPct: number; // 0-100
  statusGantt: GanttStatus;
  timeHealth: HealthStatus;
  costHealth: HealthStatus;
  scopeHealth: HealthStatus;
  riskHealth: HealthStatus;
  spi: number; // e.g. 0.92
  cpi: number; // e.g. 1.05
}

export interface ClosedProject {
  id: string;
  name: string;
  area: string;
  deliveryDate: string;
  roiExpectedPct: number;
  roiReal90DaysPct: number;
  nps: number;
  npsStatus: 'Excelente' | 'Bueno' | 'Pendiente' | 'Bajo';
  adoptionPct: number;
  realBenefitMXN: number;
  promisedBenefitMXN: number;
}

export interface PortfolioKPIs {
  // Module 1 KPIs
  totalInitiatives: number;
  totalInvestmentRequired: number;
  totalPotentialBenefit: number;
  avgExpectedROI: number;
  avgScore: number;
  avgTimeToValueMonths: number;

  // Module 2 KPIs
  activeProjects: number;
  pctOnTrack: number;
  projectsInRisk: number;
  projectsDelayed: number;
  avgProgressPct: number;
  consumedBudgetMXN: number;
  totalApprovedBudgetMXN: number;
  portfolioSPI: number;
  portfolioCPI: number;
  openIssuesCount: number;
  criticalDependenciesCount: number;

  // Module 3 KPIs
  closedProjectsCount: number;
  realizedBenefitMXN: number;
  promisedBenefitMXN: number;
  avgROI90DaysPct: number;
  benefitCompliancePct: number;
  avgNPS: number;
  avgAdoptionPct: number;
  totalPostGoLiveIncidents: number;

  // Cockpit Funnel
  funnelIdeas: number;
  funnelPrioritized: number;
  funnelApproved: number;
  funnelInConstruction: number;
  funnelProductive: number;
  funnelRoiMeasured: number;
}

export interface PortfolioAlert {
  id: string;
  type: 'danger' | 'warning' | 'info';
  message: string;
  count?: number;
}

export interface FilterState {
  year: string;
  direction: string;
  sponsor: string;
  type: string;
}
