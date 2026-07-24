import React, { useState, useEffect } from 'react';
import { ViewMode, FilterState } from './types/dashboard';
import { mockKPIs, mockInitiatives, mockProjects, mockClosedProjects, mockAlerts } from './data/mockData';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Module1Prioritization } from './components/modules/Module1Prioritization';
import { Module2Execution } from './components/modules/Module2Execution';
import { Module3Benefits } from './components/modules/Module3Benefits';
import { Module4NpsAdoption } from './components/modules/Module4NpsAdoption';
import { PMOKanbanView } from './components/modules/PMOKanbanView';
import { ExecutiveCockpit } from './components/modules/ExecutiveCockpit';
import { ExcelUploaderModal } from './components/modals/ExcelUploaderModal';
import { DrillDownModal, DrillDownItem } from './components/modals/DrillDownModal';
import { mapExcelToInitiatives, mapExcelToProjects, mapExcelToClosedProjects } from './services/excelMapper';

export function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('cockpit');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [drillDownItem, setDrillDownItem] = useState<DrillDownItem | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('20 Jul 2026 08:30 AM');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Excel loaded state management
  const [kpis, setKpis] = useState(mockKPIs);
  const [initiatives, setInitiatives] = useState(mockInitiatives);
  const [projects, setProjects] = useState(mockProjects);
  const [closedProjects, setClosedProjects] = useState(mockClosedProjects);
  const [alerts, setAlerts] = useState(mockAlerts);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const [filters, setFilters] = useState<FilterState>({
    year: '2026',
    direction: 'Todas',
    sponsor: 'Todos',
    type: 'Todos',
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleDataLoaded = (data: { module: 'forms1' | 'forms2' | 'forms3'; rows: any[] }) => {
    console.log('Processed upload data for:', data.module, data.rows);
    setLastUpdated(
      new Date().toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' })
    );

    if (data.module === 'forms1') {
      const mappedInits = mapExcelToInitiatives(data.rows);
      setInitiatives(mappedInits);

      // Recalculate KPIs for Module 1
      const totalInits = mappedInits.length;
      const totalInv = mappedInits.reduce((sum, item) => sum + item.investmentRequired, 0);
      const totalBen = mappedInits.reduce((sum, item) => sum + item.potentialBenefit, 0);
      const avgRoi = totalInv > 0 ? Math.round((totalBen / totalInv) * 100) : 0;
      const avgScore = totalInits > 0 ? Math.round(mappedInits.reduce((sum, item) => sum + item.score, 0) / totalInits) : 0;
      const avgTimeToValue = totalInits > 0 ? Math.round(mappedInits.reduce((sum, item) => sum + item.timeToValueMonths, 0) / totalInits) : 0;

      setKpis(prev => ({
        ...prev,
        totalInitiatives: totalInits,
        totalInvestmentRequired: totalInv,
        totalPotentialBenefit: totalBen,
        avgExpectedROI: avgRoi,
        avgScore,
        avgTimeToValueMonths: avgTimeToValue,
        funnelIdeas: totalInits + 35,
        funnelPrioritized: totalInits,
      }));
    } else if (data.module === 'forms2') {
      const mappedPrjs = mapExcelToProjects(data.rows);
      setProjects(mappedPrjs);

      // Recalculate KPIs for Module 2
      const active = mappedPrjs.filter(p => p.statusGantt !== 'Sin Iniciar' && p.statusGantt !== 'Completado').length;
      const onTrack = mappedPrjs.filter(p => p.statusGantt === 'On Track').length;
      const delayed = mappedPrjs.filter(p => p.statusGantt === 'Atrasado').length;
      const inRisk = mappedPrjs.filter(p => p.statusGantt === 'En Riesgo').length;
      const pctOnTrack = active > 0 ? Math.round((onTrack / active) * 100) : 100;
      const avgProgress = mappedPrjs.length > 0 ? Math.round(mappedPrjs.reduce((sum, p) => sum + p.progressRealPct, 0) / mappedPrjs.length) : 0;

      const spent = mappedPrjs.reduce((sum, p) => sum + p.budgetSpent, 0);
      const approved = mappedPrjs.reduce((sum, p) => sum + p.budgetApproved, 0);

      // Average SPI and CPI
      const avgSpi = mappedPrjs.length > 0 ? Number((mappedPrjs.reduce((sum, p) => sum + p.spi, 0) / mappedPrjs.length).toFixed(2)) : 1.0;
      const avgCpi = mappedPrjs.length > 0 ? Number((mappedPrjs.reduce((sum, p) => sum + p.cpi, 0) / mappedPrjs.length).toFixed(2)) : 1.0;

      setKpis(prev => ({
        ...prev,
        activeProjects: active,
        pctOnTrack,
        projectsInRisk: inRisk,
        projectsDelayed: delayed,
        avgProgressPct: avgProgress,
        consumedBudgetMXN: spent,
        totalApprovedBudgetMXN: approved,
        portfolioSPI: avgSpi,
        portfolioCPI: avgCpi,
        funnelApproved: approved > 0 ? Math.round(approved * 0.8) : prev.funnelApproved,
        funnelInConstruction: active,
      }));

      // Update alert counters dynamically
      setAlerts(prev => prev.map(alert => {
        if (alert.message.includes('riesgo')) {
          return { ...alert, count: inRisk, message: `${inRisk} proyectos en riesgo requieren atención inmediata de la PMO` };
        }
        return alert;
      }));
    } else if (data.module === 'forms3') {
      const mappedClosed = mapExcelToClosedProjects(data.rows);
      setClosedProjects(mappedClosed);

      // Recalculate KPIs for Module 3
      const count = mappedClosed.length;
      const realBenefit = mappedClosed.reduce((sum, p) => sum + p.realBenefitMXN, 0);
      const promisedBenefit = mappedClosed.reduce((sum, p) => sum + p.promisedBenefitMXN, 0);
      const compliance = promisedBenefit > 0 ? Math.round((realBenefit / promisedBenefit) * 100) : 100;
      const avgRoi90 = count > 0 ? Math.round(mappedClosed.reduce((sum, p) => sum + p.roiReal90DaysPct, 0) / count) : 0;
      const avgNps = count > 0 ? Math.round(mappedClosed.reduce((sum, p) => sum + p.nps, 0) / count) : 0;
      const avgAdoption = count > 0 ? Math.round(mappedClosed.reduce((sum, p) => sum + p.adoptionPct, 0) / count) : 0;

      setKpis(prev => ({
        ...prev,
        closedProjectsCount: count,
        realizedBenefitMXN: realBenefit,
        promisedBenefitMXN: promisedBenefit,
        benefitCompliancePct: compliance,
        avgROI90DaysPct: avgRoi90,
        avgNPS: avgNps,
        avgAdoptionPct: avgAdoption,
        funnelProductive: count,
        funnelRoiMeasured: count,
      }));
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`h-screen w-screen flex overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] transition-colors duration-200 ${
        isDark ? 'bg-[#060b14] text-slate-100' : 'bg-slate-100 text-slate-900'
      }`}
    >
      {/* Executive Sidebar - Fixed / Immovable Navigation Bar */}
      <Sidebar
        currentView={currentView}
        onSelectView={setCurrentView}
        onOpenUploadModal={() => setIsModalOpen(true)}
        theme={theme}
      />

      {/* Main App Workspace */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        {/* Top Executive Header - Fixed / Immovable Header Bar */}
        <Header
          filters={filters}
          onFilterChange={handleFilterChange}
          lastUpdated={lastUpdated}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* View Content Area - ONLY THIS CANVAS SCROLLS VERTICALLY */}
        <main className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-5 min-w-0">
          {/* Main Cockpit Composite View */}
          {currentView === 'cockpit' && (
            <div className="space-y-6 w-full">
              {/* Top Section: 3 Module Panels Side-by-Side */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 items-start w-full">
                {/* Module 1 Panel */}
                <div className="w-full min-w-0">
                  <Module1Prioritization
                    kpis={kpis}
                    initiatives={initiatives}
                    theme={theme}
                    onDrillDown={setDrillDownItem}
                  />
                </div>

                {/* Module 2 Panel */}
                <div className="w-full min-w-0">
                  <Module2Execution
                    kpis={kpis}
                    projects={projects}
                    theme={theme}
                    onDrillDown={setDrillDownItem}
                  />
                </div>

                {/* Module 3 Panel */}
                <div className="w-full min-w-0">
                  <Module3Benefits
                    kpis={kpis}
                    closedProjects={closedProjects}
                    theme={theme}
                    onDrillDown={setDrillDownItem}
                  />
                </div>
              </div>

              {/* Bottom Section: Consolidated Executive Cockpit 5-Panel Layout */}
              <div className="w-full min-w-0 pt-2 border-t border-slate-800/80">
                <ExecutiveCockpit
                  kpis={kpis}
                  alerts={alerts}
                  onNavigate={setCurrentView}
                  theme={theme}
                  onDrillDown={setDrillDownItem}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  lastUpdated={lastUpdated}
                />
              </div>
            </div>
          )}

          {/* Focused Module 1 View */}
          {currentView === 'iniciativas' && (
            <div className="w-full">
              <Module1Prioritization
                kpis={kpis}
                initiatives={initiatives}
                theme={theme}
                onDrillDown={setDrillDownItem}
              />
            </div>
          )}

          {/* Focused Module 2 View */}
          {currentView === 'proyectos' && (
            <div className="w-full">
              <Module2Execution
                kpis={kpis}
                projects={projects}
                theme={theme}
                onDrillDown={setDrillDownItem}
              />
            </div>
          )}

          {/* Focused Module 3 View */}
          {currentView === 'beneficios' && (
            <div className="w-full">
              <Module3Benefits
                kpis={mockKPIs}
                closedProjects={mockClosedProjects}
                theme={theme}
                onDrillDown={setDrillDownItem}
              />
            </div>
          )}

          {/* Dedicated NPS & Adoption View */}
          {currentView === 'nps' && (
            <div className="w-full">
              <Module4NpsAdoption
                kpis={mockKPIs}
                closedProjects={mockClosedProjects}
                theme={theme}
              />
            </div>
          )}

          {/* PMO Tab: Interactive Kanban Governance View */}
          {currentView === 'pmo' && (
            <div className="w-full">
              <PMOKanbanView
                initiatives={mockInitiatives}
                projects={mockProjects}
                theme={theme}
                onDrillDown={setDrillDownItem}
              />
            </div>
          )}

          {/* Settings Tab */}
          {currentView === 'config' && (
            <div className="space-y-4">
              <div
                className={`p-6 rounded-2xl space-y-4 max-w-2xl mx-auto border transition-colors ${
                  isDark
                    ? 'bg-[#0e172a] border-[#1e293b]'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <h2
                  className={`text-lg font-bold border-b pb-2 ${
                    isDark ? 'border-[#1d2d4f] text-white' : 'border-slate-200 text-slate-900'
                  }`}
                >
                  Configuración del Dashboard & Formatos de Excel
                </h2>

                <div className="space-y-3 text-xs">
                  <div
                    className={`p-3 rounded-xl border ${
                      isDark
                        ? 'bg-[#0a1224] border-[#1b2b4e]'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <strong className="text-cyan-500 block mb-1">
                      Formulario 1: Ingreso de Iniciativas
                    </strong>
                    <span
                      className={`font-mono text-[11px] break-all ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      Ingreso de iniciativas.xlsx (Sincronizado vía SharePoint)
                    </span>
                  </div>

                  <div
                    className={`p-3 rounded-xl border ${
                      isDark
                        ? 'bg-[#0a1224] border-[#1b2b4e]'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <strong className="text-emerald-500 block mb-1">
                      Formulario 2: Brief de Iniciativas & Proyectos
                    </strong>
                    <span
                      className={`font-mono text-[11px] break-all ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      Brief de Iniciativas - Estrategia de Negocio EAS.xlsx
                    </span>
                  </div>

                  <div
                    className={`p-3 rounded-xl border ${
                      isDark
                        ? 'bg-[#0a1224] border-[#1b2b4e]'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <strong className="text-purple-500 block mb-1">
                      Formulario 3: Evaluación NPS y Cierre 90 Días
                    </strong>
                    <span
                      className={`font-mono text-[11px] break-all ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      NPS Evaluación de Proyecto – Estrategia de Negocios EAS.xlsx
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Excel Synchronizer Modal */}
      <ExcelUploaderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDataLoaded={handleDataLoaded}
      />

      {/* Drill-Down Interactive Modal */}
      <DrillDownModal
        item={drillDownItem}
        onClose={() => setDrillDownItem(null)}
      />
    </div>
  );
}

export default App;
