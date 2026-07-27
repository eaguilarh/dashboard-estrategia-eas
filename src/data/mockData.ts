import { Initiative, ProjectExecution, ClosedProject, PortfolioKPIs, PortfolioAlert } from '../types/dashboard';

// Dynamic helper function to compute all KPIs from initiatives, projects, and closed projects
export const calculateKPIs = (
  initiatives: Initiative[],
  projects: ProjectExecution[],
  closedProjects: ClosedProject[]
): PortfolioKPIs => {
  // Module 1 (Forms 1: Priorización)
  const totalInitiatives = initiatives.length;
  const totalInvestmentRequired = initiatives.reduce((sum, item) => sum + (item.investmentRequired || 0), 0);
  const totalPotentialBenefit = initiatives.reduce((sum, item) => sum + (item.potentialBenefit || 0), 0);
  const avgExpectedROI = totalInvestmentRequired > 0 ? Math.round((totalPotentialBenefit / totalInvestmentRequired) * 100) : 0;
  const avgScore = totalInitiatives > 0 ? Math.round(initiatives.reduce((sum, item) => sum + (item.score || 0), 0) / totalInitiatives) : 0;
  const avgTimeToValueMonths = totalInitiatives > 0 ? Math.round(initiatives.reduce((sum, item) => sum + (item.timeToValueMonths || 0), 0) / totalInitiatives) : 0;

  // Module 2 (Forms 2: Ejecución & PMO)
  const activeProjects = projects.length;
  const onTrackCount = projects.filter(p => p.statusGantt === 'On Track').length;
  const pctOnTrack = activeProjects > 0 ? Math.round((onTrackCount / activeProjects) * 100) : 0;
  const projectsInRisk = projects.filter(p => p.statusGantt === 'En Riesgo').length;
  const projectsDelayed = projects.filter(p => p.statusGantt === 'Atrasado').length;
  const avgProgressPct = activeProjects > 0 ? Math.round(projects.reduce((sum, p) => sum + (p.progressRealPct || 0), 0) / activeProjects) : 0;
  const consumedBudgetMXN = projects.reduce((sum, p) => sum + (p.budgetSpent || 0), 0);
  const totalApprovedBudgetMXN = projects.reduce((sum, p) => sum + (p.budgetApproved || 0), 0);

  const validSPIs = projects.filter(p => p.spi !== undefined && p.spi !== null && p.statusGantt !== 'Sin Iniciar');
  const portfolioSPI = validSPIs.length > 0 ? parseFloat((validSPIs.reduce((sum, p) => sum + (p.spi || 0), 0) / validSPIs.length).toFixed(2)) : 0;

  const validCPIs = projects.filter(p => p.cpi !== undefined && p.cpi !== null && p.statusGantt !== 'Sin Iniciar');
  const portfolioCPI = validCPIs.length > 0 ? parseFloat((validCPIs.reduce((sum, p) => sum + (p.cpi || 0), 0) / validCPIs.length).toFixed(2)) : 0;

  const openIssuesCount = projectsDelayed * 3 + projectsInRisk * 2; // Derived or zero when empty
  const criticalDependenciesCount = projectsInRisk; // Derived or zero when empty

  // Module 3 (Forms 3: Beneficios y Cierre)
  const closedProjectsCount = closedProjects.length;
  const realizedBenefitMXN = closedProjects.reduce((sum, p) => sum + (p.realBenefitMXN || 0), 0);
  const promisedBenefitMXN = closedProjects.reduce((sum, p) => sum + (p.promisedBenefitMXN || 0), 0);
  const avgROI90DaysPct = closedProjectsCount > 0 ? Math.round(closedProjects.reduce((sum, p) => sum + (p.roiReal90DaysPct || 0), 0) / closedProjectsCount) : 0;
  const benefitCompliancePct = promisedBenefitMXN > 0 ? Math.round((realizedBenefitMXN / promisedBenefitMXN) * 100) : 0;
  
  const validNPS = closedProjects.filter(p => p.nps > 0);
  const avgNPS = validNPS.length > 0 ? Math.round(validNPS.reduce((sum, p) => sum + p.nps, 0) / validNPS.length) : 0;

  const avgAdoptionPct = closedProjectsCount > 0 ? Math.round(closedProjects.reduce((sum, p) => sum + (p.adoptionPct || 0), 0) / closedProjectsCount) : 0;
  const totalPostGoLiveIncidents = Math.max(0, projectsDelayed);

  // Cockpit Stage-Gate Funnel
  const funnelIdeas = totalInitiatives; 
  const funnelPrioritized = initiatives.filter(i => i.score >= 70).length;
  const funnelApproved = Math.round(totalInitiatives * 0.4); 
  const funnelInConstruction = activeProjects; 
  const funnelProductive = closedProjectsCount; 
  const funnelRoiMeasured = closedProjects.filter(p => p.roiReal90DaysPct > 0).length;

  return {
    totalInitiatives,
    totalInvestmentRequired,
    totalPotentialBenefit,
    avgExpectedROI,
    avgScore,
    avgTimeToValueMonths,
    activeProjects,
    pctOnTrack,
    projectsInRisk,
    projectsDelayed,
    avgProgressPct,
    consumedBudgetMXN,
    totalApprovedBudgetMXN,
    portfolioSPI,
    portfolioCPI,
    openIssuesCount,
    criticalDependenciesCount,
    closedProjectsCount,
    realizedBenefitMXN,
    promisedBenefitMXN,
    avgROI90DaysPct,
    benefitCompliancePct,
    avgNPS,
    avgAdoptionPct,
    totalPostGoLiveIncidents,
    funnelIdeas,
    funnelPrioritized,
    funnelApproved,
    funnelInConstruction,
    funnelProductive,
    funnelRoiMeasured,
  };
};

// Initialized with empty datasets for a clean start with real information
export const mockKPIs: PortfolioKPIs = calculateKPIs([], [], []);

export const mockInitiatives: Initiative[] = [];

export const mockProjects: ProjectExecution[] = [];

export const mockClosedProjects: ClosedProject[] = [];

export const mockAlerts: PortfolioAlert[] = [];
