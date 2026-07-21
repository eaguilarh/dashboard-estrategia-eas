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

export function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('cockpit');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [drillDownItem, setDrillDownItem] = useState<DrillDownItem | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('20 Jul 2026 08:30 AM');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

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
      className={`flex h-screen w-screen overflow-hidden font-['Plus_Jakarta_Sans',sans-serif] transition-colors duration-200 ${
        isDark ? 'bg-[#060b14] text-slate-100' : 'bg-slate-100 text-slate-900'
      }`}
    >
      {/* Executive Sidebar */}
      <Sidebar
        currentView={currentView}
        onSelectView={setCurrentView}
        onOpenUploadModal={() => setIsModalOpen(true)}
        theme={theme}
      />

      {/* Main App Workspace */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Executive Header */}
        <Header
          filters={filters}
          onFilterChange={handleFilterChange}
          lastUpdated={lastUpdated}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* View Content Area */}
        <main className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-4">
          {/* Main Full Cockpit View: Replicates the reference composite dashboard image! */}
          {currentView === 'cockpit' && (
            <div className="space-y-4">
              {/* Top Row: 3 Module Columns Side-by-Side matching the Reference Image */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-3.5 items-start">
                {/* Module 1 Panel */}
                <div className="w-full">
                  <Module1Prioritization
                    kpis={mockKPIs}
                    initiatives={mockInitiatives}
                    theme={theme}
                    onDrillDown={setDrillDownItem}
                  />
                </div>

                {/* Module 2 Panel */}
                <div className="w-full">
                  <Module2Execution
                    kpis={mockKPIs}
                    projects={mockProjects}
                    theme={theme}
                    onDrillDown={setDrillDownItem}
                  />
                </div>

                {/* Module 3 Panel */}
                <div className="w-full">
                  <Module3Benefits
                    kpis={mockKPIs}
                    closedProjects={mockClosedProjects}
                    theme={theme}
                    onDrillDown={setDrillDownItem}
                  />
                </div>
              </div>

              {/* Bottom Full-Width Panel: Executive Cockpit Consolidated */}
              <div className="w-full pt-2">
                <ExecutiveCockpit
                  kpis={mockKPIs}
                  alerts={mockAlerts}
                  onNavigate={setCurrentView}
                  theme={theme}
                  onDrillDown={setDrillDownItem}
                />
              </div>
            </div>
          )}

          {/* Focused Module 1 View */}
          {currentView === 'iniciativas' && (
            <Module1Prioritization
              kpis={mockKPIs}
              initiatives={mockInitiatives}
              theme={theme}
              onDrillDown={setDrillDownItem}
            />
          )}

          {/* Focused Module 2 View */}
          {currentView === 'proyectos' && (
            <Module2Execution
              kpis={mockKPIs}
              projects={mockProjects}
              theme={theme}
              onDrillDown={setDrillDownItem}
            />
          )}

          {/* Focused Module 3 View */}
          {currentView === 'beneficios' && (
            <Module3Benefits
              kpis={mockKPIs}
              closedProjects={mockClosedProjects}
              theme={theme}
              onDrillDown={setDrillDownItem}
            />
          )}

          {/* NPS & Adoption Dedicated High-Value View */}
          {currentView === 'nps' && (
            <Module4NpsAdoption
              kpis={mockKPIs}
              closedProjects={mockClosedProjects}
              theme={theme}
            />
          )}

          {/* PMO Tab: Interactive Kanban Governance View */}
          {currentView === 'pmo' && (
            <PMOKanbanView
              initiatives={mockInitiatives}
              projects={mockProjects}
              theme={theme}
              onDrillDown={setDrillDownItem}
            />
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
