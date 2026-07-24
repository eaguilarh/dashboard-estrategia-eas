import { Initiative, ProjectExecution, ClosedProject, PortfolioKPIs, PortfolioAlert } from '../types/dashboard';

// Clean initial state (all metrics set to 0 and arrays empty for real data input)
export const mockKPIs: PortfolioKPIs = {
  // Module 1 (Forms 1: Priorización)
  totalInitiatives: 0,
  totalInvestmentRequired: 0,
  totalPotentialBenefit: 0,
  avgExpectedROI: 0,
  avgScore: 0,
  avgTimeToValueMonths: 0,

  // Module 2 (Forms 2: Ejecución & PMO)
  activeProjects: 0,
  pctOnTrack: 0,
  projectsInRisk: 0,
  projectsDelayed: 0,
  avgProgressPct: 0,
  consumedBudgetMXN: 0,
  totalApprovedBudgetMXN: 0,
  portfolioSPI: 0,
  portfolioCPI: 0,
  openIssuesCount: 0,
  criticalDependenciesCount: 0,

  // Module 3 (Forms 3: Beneficios y Cierre)
  closedProjectsCount: 0,
  realizedBenefitMXN: 0,
  promisedBenefitMXN: 0,
  avgROI90DaysPct: 0,
  benefitCompliancePct: 0,
  avgNPS: 0,
  avgAdoptionPct: 0,
  totalPostGoLiveIncidents: 0,

  // Cockpit Stage-Gate Funnel
  funnelIdeas: 0,
  funnelPrioritized: 0,
  funnelApproved: 0,
  funnelInConstruction: 0,
  funnelProductive: 0,
  funnelRoiMeasured: 0,
};

export const mockInitiatives: Initiative[] = [];

export const mockProjects: ProjectExecution[] = [];

export const mockClosedProjects: ClosedProject[] = [];

export const mockAlerts: PortfolioAlert[] = [
  { id: 'A1', type: 'info', message: 'No hay alertas activas. Sincroniza datos de Excel para iniciar.', count: 0 },
];
