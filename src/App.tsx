import React, { useState, useEffect } from 'react';
import { ViewMode, FilterState } from './types/dashboard';
import { calculateKPIs, mockKPIs, mockInitiatives, mockProjects, mockClosedProjects, mockAlerts } from './data/mockData';
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

export function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('cockpit');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [drillDownItem, setDrillDownItem] = useState<DrillDownItem | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('27 Jul 2026 00:00 AM');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // React state for real-time Excel integration and dynamic calculations
  const [initiatives, setInitiatives] = useState<any[]>(mockInitiatives);
  const [projects, setProjects] = useState<any[]>(mockProjects);
  const [closedProjects, setClosedProjects] = useState<any[]>(mockClosedProjects);
  const [alerts, setAlerts] = useState<any[]>(mockAlerts);

  // Compute KPIs dynamically whenever datasets are modified
  const kpis = calculateKPIs(initiatives, projects, closedProjects);

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

  const handleDataLoaded = (data: any) => {
    console.log('Processed upload data:', data);
    const { module, rows } = data;

    if (module === 'forms1') {
      // Map Forms 1 fields to Initiatives
      const mapped = rows.map((row: any, idx: number) => ({
        id: row.id || String(idx + 1),
        rank: row.rank || idx + 1,
        name: row.name || row['Nombre de Iniciativa'] || row['Iniciativa'] || 'Iniciativa sin nombre',
        area: row.area || row['Área'] || row['Area'] || 'Operaciones',
        sponsor: row.sponsor || row['Sponsor'] || 'Dirección General',
        score: Number(row.score || row['Score'] || row['Puntaje'] || 0),
        roiExpected: Number(row.roiExpected || row['ROI Esperado'] || row['ROI'] || 0),
        investmentRequired: Number(row.investmentRequired || row['Inversión Requerida'] || row['Inversion'] || 0),
        potentialBenefit: Number(row.potentialBenefit || row['Beneficio Potencial'] || row['Beneficio'] || 0),
        timeToValueMonths: Number(row.timeToValueMonths || row['Time to Value'] || row['Meses'] || 6),
        effort: row.effort || row['Esfuerzo'] || 'Bajo',
        value: row.value || row['Valor'] || 'Alto',
        quadrant: row.quadrant || row['Cuadrante'] || 'Quick Wins',
        category: row.category || row['Categoría'] || row['Categoria'] || 'Estratégica',
      }));
      setInitiatives(mapped);
    } else if (module === 'forms2') {
      // Map Forms 2 fields to active projects
      const mapped = rows.map((row: any, idx: number) => ({
        id: row.id || `P${idx + 1}`,
        name: row.name || row['Nombre del Proyecto'] || row['Proyecto'] || 'Proyecto sin nombre',
        area: row.area || row['Área'] || row['Area'] || 'Operaciones',
        sponsor: row.sponsor || row['Sponsor'] || 'Dirección General',
        pm: row.pm || row['Líder de Proyecto'] || row['PM'] || 'Sin Asignar',
        startDatePlan: row.startDatePlan || row['Fecha Inicio'] || '01 Ene',
        endDatePlan: row.endDatePlan || row['Fecha Fin'] || '31 Dic',
        budgetApproved: Number(row.budgetApproved || row['Presupuesto Aprobado'] || 0),
        budgetSpent: Number(row.budgetSpent || row['Presupuesto Consumido'] || 0),
        progressPlanPct: Number(row.progressPlanPct || row['Progreso Planificado'] || 0),
        progressRealPct: Number(row.progressRealPct || row['Progreso Real'] || 0),
        statusGantt: row.statusGantt || row['Estatus Gantt'] || 'On Track',
        timeHealth: row.timeHealth || row['Salud Tiempo'] || 'Verde',
        costHealth: row.costHealth || row['Salud Costo'] || 'Verde',
        scopeHealth: row.scopeHealth || row['Salud Alcance'] || 'Verde',
        riskHealth: row.riskHealth || row['Salud Riesgos'] || 'Verde',
        spi: Number(row.spi || row['SPI'] || 1.0),
        cpi: Number(row.cpi || row['CPI'] || 1.0),
      }));
      setProjects(mapped);
    } else if (module === 'forms3') {
      // Map Forms 3 fields to closed projects
      const mapped = rows.map((row: any, idx: number) => ({
        id: row.id || `C${idx + 1}`,
        name: row.name || row['Nombre del Proyecto'] || row['Proyecto'] || 'Proyecto sin nombre',
        area: row.area || row['Área'] || row['Area'] || 'Operaciones',
        deliveryDate: row.deliveryDate || row['Fecha de Cierre'] || '31 Dic 2026',
        roiExpectedPct: Number(row.roiExpectedPct || row['ROI Esperado'] || 0),
        roiReal90DaysPct: Number(row.roiReal90DaysPct || row['ROI Real 90 Días'] || 0),
        nps: Number(row.nps || row['NPS'] || 0),
        npsStatus: row.npsStatus || row['Estatus NPS'] || 'Excelente',
        adoptionPct: Number(row.adoptionPct || row['Adopción'] || 0),
        realBenefitMXN: Number(row.realBenefitMXN || row['Beneficio Real'] || 0),
        promisedBenefitMXN: Number(row.promisedBenefitMXN || row['Beneficio Comprometido'] || 0),
      }));
      setClosedProjects(mapped);
    }

    setLastUpdated(
      new Date().toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' })
    );
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
                    isCockpit={true}
                  />
                </div>

                {/* Module 2 Panel */}
                <div className="w-full min-w-0">
                  <Module2Execution
                    kpis={kpis}
                    projects={projects}
                    theme={theme}
                    onDrillDown={setDrillDownItem}
                    isCockpit={true}
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
                kpis={kpis}
                closedProjects={closedProjects}
                theme={theme}
                onDrillDown={setDrillDownItem}
              />
            </div>
          )}

          {/* Dedicated NPS & Adoption View */}
          {currentView === 'nps' && (
            <div className="w-full">
              <Module4NpsAdoption
                kpis={kpis}
                closedProjects={closedProjects}
                theme={theme}
              />
            </div>
          )}

          {/* PMO Tab: Interactive Kanban Governance View */}
          {currentView === 'pmo' && (
            <div className="w-full">
              <PMOKanbanView
                initiatives={initiatives}
                projects={projects}
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
