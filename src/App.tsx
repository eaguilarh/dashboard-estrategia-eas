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
  // React state for real-time Excel integration and dynamic calculations with localStorage persistence
  const [initiatives, setInitiatives] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('eas_initiatives');
      return saved ? JSON.parse(saved) : mockInitiatives;
    } catch {
      return mockInitiatives;
    }
  });

  const [projects, setProjects] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('eas_projects');
      return saved ? JSON.parse(saved) : mockProjects;
    } catch {
      return mockProjects;
    }
  });

  const [closedProjects, setClosedProjects] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('eas_closedProjects');
      return saved ? JSON.parse(saved) : mockClosedProjects;
    } catch {
      return mockClosedProjects;
    }
  });

  const [lastUpdated, setLastUpdated] = useState<string>(() => {
    return localStorage.getItem('eas_lastUpdated') || '27 Jul 2026 00:00 AM';
  });

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // React state for alerts
  const [alerts, setAlerts] = useState<any[]>(mockAlerts);

  // Compute KPIs dynamically whenever datasets are modified
  const kpis = calculateKPIs(initiatives, projects, closedProjects);

  // Persistence side effects
  useEffect(() => {
    try {
      localStorage.setItem('eas_initiatives', JSON.stringify(initiatives));
    } catch (e) {
      console.error('Error writing initiatives to localStorage', e);
    }
  }, [initiatives]);

  useEffect(() => {
    try {
      localStorage.setItem('eas_projects', JSON.stringify(projects));
    } catch (e) {
      console.error('Error writing projects to localStorage', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem('eas_closedProjects', JSON.stringify(closedProjects));
    } catch (e) {
      console.error('Error writing closedProjects to localStorage', e);
    }
  }, [closedProjects]);

  useEffect(() => {
    localStorage.setItem('eas_lastUpdated', lastUpdated);
  }, [lastUpdated]);

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
      // Helper function to extract cell value by Excel column letter
      const valByCol = (row: any, colLetter: string) => {
        // Direct match
        if (row[colLetter] !== undefined) return row[colLetter];
        
        const colLetterUpper = colLetter.toUpperCase();

        // Match keys like "Columna I", "Pregunta I", or "I"
        const matchedKey = Object.keys(row).find(key => {
          const kUpper = key.toUpperCase();
          return kUpper === colLetterUpper ||
                 kUpper.startsWith(`COLUMNA ${colLetterUpper}`) ||
                 kUpper.endsWith(` ${colLetterUpper}`);
        });
        if (matchedKey) return row[matchedKey];

        // Resolve generic Excel Column names from XLSX parser (e.g. __EMPTY, __EMPTY_1 etc)
        const colIdx = colLetterUpper.charCodeAt(0) - 65; // A=0, B=1, F=5, I=8 etc
        if (colIdx === 0 && row['__EMPTY'] !== undefined) return row['__EMPTY'];
        const emptyKey = `__EMPTY_${colIdx}`;
        if (row[emptyKey] !== undefined) return row[emptyKey];

        // Positional fallback: extract by actual key order index
        const keys = Object.keys(row);
        if (colIdx >= 0 && colIdx < keys.length) {
          // If keys are parsed directly as headers, we find the column by index
          return row[keys[colIdx]];
        }
        
        // Final fallback: look up header names matching common Forms headers by index position
        // A=Id, B=Start time, C=Completion time, D=Email, E=Name, F=Nombre de la iniciativa, I=Area de pertenencia
        if (colLetterUpper === 'F') {
          const nameKey = Object.keys(row).find(k => k.toLowerCase().includes('iniciativa') || k.toLowerCase().includes('proyecto') || k.toLowerCase().includes('nombre'));
          if (nameKey) return row[nameKey];
        }
        if (colLetterUpper === 'I') {
          const areaKey = Object.keys(row).find(k => k.toLowerCase().includes('área') || k.toLowerCase().includes('area') || k.toLowerCase().includes('pertenece') || k.toLowerCase().includes('departamento'));
          if (areaKey) return row[areaKey];
        }

        return '';
      };

      // Helper function to score column answers based on user's qualifiers sheet
      const getScoreForCol = (val: any, colLetter: string): number => {
        const text = String(val || '').trim().toLowerCase();
        if (!text) return 0;

        switch (colLetter) {
          case 'I':
            // Si es administrativo o backoffice es gasto
            if (text.includes('administrativo') || text.includes('backoffice') || text.includes('gasto')) {
              return 2.0;
            }
            return 0;
          case 'J':
            if (text.includes('nulo')) return 0;
            if (text.includes('bajo')) return 0.25;
            if (text.includes('medio')) return 0.50;
            if (text.includes('alto')) return 0.75;
            if (text.includes('crítico') || text.includes('critico')) return 1.00;
            return 0;
          case 'K':
            if (text.includes('nulo')) return 0;
            if (text.includes('bajo')) return 0.25;
            if (text.includes('medio')) return 0.50;
            if (text.includes('alto')) return 0.75;
            if (text.includes('crítico') || text.includes('critico')) return 1.00;
            if (text.includes('sin información') || text.includes('sin informacion')) return 1.00;
            return 0;
          case 'L':
            if (text.includes('ligera') || text.includes('20%')) return 0.25;
            if (text.includes('moderada') || text.includes('50%')) return 0.50;
            if (text.includes('significativa') || text.includes('mayor al 50%')) return 0.75;
            if (text.includes('casi total') || text.includes('completamente automatizado')) return 1.00;
            return 0;
          case 'M': {
            // Cada opción agregada (separada por ";") que se seleccione sumar .2
            const items = text.split(';').map(s => s.trim()).filter(Boolean);
            return items.length * 0.20;
          }
          case 'N': {
            // Cada opción agregada (separada por ";") que se seleccione sumar .15
            const items = text.split(';').map(s => s.trim()).filter(Boolean);
            return items.length * 0.15;
          }
          case 'O':
            if (text.includes('menos de 3')) return 0.25;
            if (text.includes('3-5') || text.includes('3 a 5')) return 0.50;
            if (text.includes('5-10') || text.includes('5 a 10')) return 0.75;
            if (text.includes('más de 10') || text.includes('mas de 10')) return 1.00;
            return 0;
          case 'P':
            if (text.includes('idea general')) return 0.25;
            if (text.includes('parcialmente definido')) return 0.25;
            if (text.includes('definido')) return 0.50;
            if (text.includes('totalmente definido')) return 0.75; // case claro, lógica de solución
            return 0;
          case 'Q':
            if (text.includes('no disponible')) return -2.00;
            if (text.includes('parcial')) return 0.25;
            if (text.includes('mayormente disponible')) return 0.75;
            if (text.includes('completa')) return 1.00;
            return 0;
          case 'R':
            // Flujo del proceso documentado, definición clara, reglas, responsable: suma 0.25
            return 0.25;
          default:
            return 0;
        }
      };

      // Filter: Sólo items 1 y 3 (excluir Item/Id 2 que fue de prueba, y filas vacías o sin nombre de iniciativa)
      const validRows = rows.filter((row: any, idx: number) => {
        const idKey = Object.keys(row).find(k => k.toUpperCase() === 'ID' || k.toUpperCase() === 'ITEM' || k.toUpperCase() === 'NÚMERO' || k.toUpperCase() === 'NUMERO');
        const rawId = idKey ? row[idKey] : row.id || row.Id || row.ID || row.Item || '';
        const idStr = String(rawId).trim();
        
        // Exclude row with ID '2'.
        if (idStr === '2') return false;

        const nameVal = String(valByCol(row, 'F') || '').trim();
        if (!nameVal) return false; // Exclude empty initiative rows

        return true;
      });

      console.log('Filtradas filas válidas (excluyendo item 2 y vacías):', validRows);

      // Map Forms 1 fields to Initiatives applying dynamic scoring qualifiers
      const mapped = validRows.map((row: any, idx: number) => {
        // Extract basic identification fields from columns
        const nameVal = valByCol(row, 'F') || 'Iniciativa sin nombre';
        const areaVal = valByCol(row, 'I') || 'Operaciones';
        const idKey = Object.keys(row).find(k => k.toUpperCase() === 'ID' || k.toUpperCase() === 'ITEM' || k.toUpperCase() === 'NÚMERO' || k.toUpperCase() === 'NUMERO');
        const idVal = idKey ? row[idKey] : row.id || row.Id || row.ID || row['Item'] || String(idx + 1);

        // Sum qualifiers scores dynamically
        let rawScore = 0;
        ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'].forEach(col => {
          const val = valByCol(row, col);
          rawScore += getScoreForCol(val, col);
        });

        // Convert the raw score to a standard 1-100 score layout representation
        const score = Math.max(10, Math.min(100, Math.round(rawScore * 10)));

        // Map Category based on Area to feed strategic distribution chart
        let finalCategory = 'Transformación Digital';
        const areaLower = String(areaVal).toLowerCase();
        if (areaLower.includes('cliente') || areaLower.includes('experiencia') || areaLower.includes('cx')) {
          finalCategory = 'Customer Experience';
        } else if (areaLower.includes('automatización') || areaLower.includes('ti') || areaLower.includes('sistemas') || areaLower.includes('it')) {
          finalCategory = 'Automatización';
        } else if (areaLower.includes('cumplimiento') || areaLower.includes('compliance') || areaLower.includes('legal')) {
          finalCategory = 'Compliance';
        } else if (areaLower.includes('administración') || areaLower.includes('operaciones') || areaLower.includes('soporte')) {
          finalCategory = 'Automatización'; // Operaciones/Administración default to Automation / Digitalization
        }

        return {
          id: String(idVal),
          rank: idx + 1,
          name: String(nameVal),
          area: String(areaVal),
          sponsor: row.sponsor || row['Sponsor'] || 'Dirección General',
          score: score,
          roiExpected: Number(row.roiExpected || row['ROI Esperado'] || row['ROI'] || 150),
          investmentRequired: Number(row.investmentRequired || row['Inversión Requerida'] || row['Inversion'] || 5),
          potentialBenefit: Number(row.potentialBenefit || row['Beneficio Potencial'] || row['Beneficio'] || 12),
          timeToValueMonths: Number(row.timeToValueMonths || row['Time to Value'] || row['Meses'] || 6),
          effort: row.effort || (score > 50 ? 'Alto' : 'Bajo'),
          value: row.value || (score > 40 ? 'Alto' : 'Bajo'),
          quadrant: score >= 50 ? 'PROYECTOS CLAVE' : 'OPTIMIZACIÓN',
          category: finalCategory,
        };
      });

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
              {/* Top Row: M1 Prioritization (Only this is shown in Version Light) */}
              {filters.direction === 'CH' ? (
                <div className="w-full">
                  <Module1Prioritization
                    kpis={kpis}
                    initiatives={initiatives}
                    theme={theme}
                    onDrillDown={setDrillDownItem}
                    isCockpit={true}
                    isLightVersion={true}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 items-stretch w-full">
                  {/* Module 1 Panel */}
                  <div className="w-full min-w-0">
                    <Module1Prioritization
                      kpis={kpis}
                      initiatives={initiatives}
                      theme={theme}
                      onDrillDown={setDrillDownItem}
                      isCockpit={true}
                      isLightVersion={false}
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
              )}

              {/* Bottom Section: Consolidated Executive Cockpit 5-Panel Layout (Hidden in Version Light) */}
              {filters.direction !== 'CH' && (
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
              )}
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
                isLightVersion={filters.direction === 'CH' || filters.direction === 'TQS'}
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
