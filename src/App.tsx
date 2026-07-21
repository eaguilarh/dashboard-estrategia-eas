import React, { useState } from 'react';
import { ViewMode, FilterState } from './types/dashboard';
import { mockKPIs, mockInitiatives, mockProjects, mockClosedProjects, mockAlerts } from './data/mockData';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Module1Prioritization } from './components/modules/Module1Prioritization';
import { Module2Execution } from './components/modules/Module2Execution';
import { Module3Benefits } from './components/modules/Module3Benefits';
import { ExecutiveCockpit } from './components/modules/ExecutiveCockpit';
import { ExcelUploaderModal } from './components/modals/ExcelUploaderModal';

export function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('cockpit');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('20 May 2024 08:30 AM');
  
  const [filters, setFilters] = useState<FilterState>({
    year: '2024',
    direction: 'Todas',
    sponsor: 'Todos',
    type: 'Todos'
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleDataLoaded = (data: any) => {
    console.log('Processed upload data:', data);
    setLastUpdated(new Date().toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' }));
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#060b14] text-slate-100 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Executive Sidebar */}
      <Sidebar
        currentView={currentView}
        onSelectView={setCurrentView}
        onOpenUploadModal={() => setIsModalOpen(true)}
      />

      {/* Main App Workspace */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Executive Header */}
        <Header
          filters={filters}
          onFilterChange={handleFilterChange}
          onOpenUploadModal={() => setIsModalOpen(true)}
          lastUpdated={lastUpdated}
        />

        {/* View Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-5 space-y-4">
          {currentView === 'cockpit' && (
            <ExecutiveCockpit
              kpis={mockKPIs}
              alerts={mockAlerts}
              onNavigate={setCurrentView}
            />
          )}

          {currentView === 'iniciativas' && (
            <Module1Prioritization
              kpis={mockKPIs}
              initiatives={mockInitiatives}
            />
          )}

          {currentView === 'proyectos' && (
            <Module2Execution
              kpis={mockKPIs}
              projects={mockProjects}
            />
          )}

          {currentView === 'beneficios' && (
            <Module3Benefits
              kpis={mockKPIs}
              closedProjects={mockClosedProjects}
            />
          )}

          {currentView === 'nps' && (
            <div className="space-y-4">
              <div className="executive-card p-6 text-center space-y-3">
                <h2 className="text-xl font-bold text-white">Módulo NPS y Adopción del Usuario</h2>
                <p className="text-sm text-slate-400 max-w-xl mx-auto">
                  Seguimiento detallado de encuestas de satisfacción de usuarios finales (NPS) y métricas de uso continuo por cada solución implementada.
                </p>
                <div className="pt-4 flex justify-center">
                  <button onClick={() => setCurrentView('beneficios')} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg">
                    Ver en Módulo 3 de Beneficios
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentView === 'pmo' && (
            <div className="space-y-4">
              <div className="executive-card p-6 text-center space-y-3">
                <h2 className="text-xl font-bold text-white">Gobierno de Portafolio PMO</h2>
                <p className="text-sm text-slate-400 max-w-xl mx-auto">
                  Gestión de riesgos, dependencias críticas entre proyectos, asignación de PMs y control presupuestal de la PMO de EAS Consulting.
                </p>
                <div className="pt-4 flex justify-center">
                  <button onClick={() => setCurrentView('proyectos')} className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-lg">
                    Ver Pipeline de Proyectos
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentView === 'config' && (
            <div className="space-y-4">
              <div className="executive-card p-6 space-y-4 max-w-2xl mx-auto">
                <h2 className="text-lg font-bold text-white border-b border-[#1d2d4f] pb-2">
                  Configuración del Dashboard & Links a Forms
                </h2>

                <div className="space-y-3 text-xs">
                  <div className="bg-[#0a1224] p-3 rounded-lg border border-[#1b2b4e]">
                    <strong className="text-cyan-400 block mb-1">Formulario 1: Ingreso de Iniciativas</strong>
                    <span className="text-slate-300 font-mono break-all text-[11px]">
                      Ingreso de iniciativas.xlsx (Sincronizado vía SharePoint)
                    </span>
                  </div>

                  <div className="bg-[#0a1224] p-3 rounded-lg border border-[#1b2b4e]">
                    <strong className="text-emerald-400 block mb-1">Formulario 2: Brief de Iniciativas & Proyectos</strong>
                    <span className="text-slate-300 font-mono break-all text-[11px]">
                      Brief de Iniciativas - Estrategia de Negocio EAS.xlsx
                    </span>
                  </div>

                  <div className="bg-[#0a1224] p-3 rounded-lg border border-[#1b2b4e]">
                    <strong className="text-purple-400 block mb-1">Formulario 3: Evaluación NPS y Cierre 90 Días</strong>
                    <span className="text-slate-300 font-mono break-all text-[11px]">
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
    </div>
  );
}

export default App;
