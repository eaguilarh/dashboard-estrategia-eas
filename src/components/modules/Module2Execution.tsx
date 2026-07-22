import React from 'react';
import { PortfolioKPIs, ProjectExecution } from '../../types/dashboard';
import { KanbanSquare as Kanban, CheckCircle, AlertTriangle, XCircle, Eye } from 'lucide-react';

interface Module2Props {
  kpis: PortfolioKPIs;
  projects: ProjectExecution[];
  theme?: 'dark' | 'light';
  onDrillDown?: (item: any) => void;
}

export const Module2Execution: React.FC<Module2Props> = ({ kpis, projects, theme = 'dark', onDrillDown }) => {
  const isDark = theme === 'dark';

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'On Track':
        return <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1 w-max"><CheckCircle className="w-2.5 h-2.5" /> On Track</span>;
      case 'En Riesgo':
        return <span className="bg-amber-950 text-amber-400 border border-amber-500/40 text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1 w-max"><AlertTriangle className="w-2.5 h-2.5" /> En Riesgo</span>;
      case 'Atrasado':
        return <span className="bg-rose-950 text-rose-400 border border-rose-500/40 text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1 w-max"><XCircle className="w-2.5 h-2.5" /> Atrasado</span>;
      default:
        return <span className="bg-slate-800 text-slate-400 border border-slate-600 text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1 w-max">Sin Iniciar</span>;
    }
  };

  const getDotColor = (health: string) => {
    switch (health) {
      case 'Verde': return 'bg-emerald-400 shadow-emerald-400/50';
      case 'Amarillo': return 'bg-amber-400 shadow-amber-400/50';
      case 'Rojo': return 'bg-rose-500 shadow-rose-500/50';
      default: return 'bg-slate-500';
    }
  };

  const handleRowClick = (prj: ProjectExecution) => {
    if (onDrillDown) {
      onDrillDown({
        type: 'project',
        title: prj.name,
        sourceForm: 'Formulario 2 (Brief & Gantt PMO)',
        data: prj,
      });
    }
  };

  return (
    <div className="space-y-4 text-left w-full max-w-full overflow-hidden">
      {/* Module Banner Header */}
      <div className={`border rounded-xl p-3 flex items-center justify-between shadow-md transition-colors ${
        isDark ? 'bg-gradient-to-r from-[#0b1b3d] via-[#102450] to-[#0b1b3d] border-[#1d3363]' : 'bg-gradient-to-r from-cyan-900 via-blue-900 to-cyan-900 border-cyan-800 text-white'
      }`}>
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-lg bg-cyan-600 flex items-center justify-center font-extrabold text-white text-sm shadow flex-shrink-0">
            2
          </div>
          <div>
            <h2 className="text-xs sm:text-base font-extrabold text-white tracking-tight uppercase">
              PIPELINE DE PROYECTOS EN EJECUCIÓN
            </h2>
            <p className="text-[10px] sm:text-xs text-cyan-200/90 font-medium">
              ¿Cómo vamos con los proyectos en construcción? • Haga clic para Drill-Down
            </p>
          </div>
        </div>
        <div className="hidden sm:block text-right">
          <span className="text-[10px] bg-cyan-950/80 text-cyan-300 border border-cyan-400/40 px-2 py-0.5 rounded font-semibold">
            Forms 2 & PMO
          </span>
        </div>
      </div>

      {/* KPI Cards Row (2x3 Grid inside module panel) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 gap-2 sm:gap-2.5">
        <div className={`p-2.5 rounded-xl border flex flex-col justify-between transition-colors min-w-0 ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <span className={`text-[10px] font-semibold truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Proyectos Activos</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className={`text-lg sm:text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>{kpis.activeProjects}</span>
            <Kanban className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" />
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border flex flex-col justify-between transition-colors min-w-0 ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <span className={`text-[10px] font-semibold truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>On Track</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-lg sm:text-xl font-extrabold text-emerald-500">{kpis.pctOnTrack}%</span>
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border flex flex-col justify-between transition-colors min-w-0 ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <span className={`text-[10px] font-semibold truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>En Riesgo</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-lg sm:text-xl font-extrabold text-amber-500">{kpis.projectsInRisk}</span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border flex flex-col justify-between transition-colors min-w-0 ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <span className={`text-[10px] font-semibold truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Atrasados</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-lg sm:text-xl font-extrabold text-rose-500">{kpis.projectsDelayed}</span>
            <XCircle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border flex flex-col justify-between transition-colors min-w-0 ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <span className={`text-[10px] font-semibold truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Avance Promed.</span>
          <div className="mt-1 flex items-baseline">
            <span className="text-lg sm:text-xl font-extrabold text-blue-500">{kpis.avgProgressPct}%</span>
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border flex flex-col justify-between transition-colors min-w-0 ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <span className={`text-[10px] font-semibold truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Presup. Consumido</span>
          <div className="mt-1">
            <span className="text-base sm:text-lg font-extrabold text-emerald-500">${kpis.consumedBudgetMXN}M</span>
            <span className={`text-[9px] ml-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>/ ${kpis.totalApprovedBudgetMXN}M</span>
          </div>
        </div>
      </div>

      {/* Main Gantt View */}
      <div className={`p-3.5 rounded-xl border transition-colors min-w-0 ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className={`flex items-center justify-between mb-2 pb-1.5 border-b ${isDark ? 'border-[#1d2d4f]' : 'border-slate-200'}`}>
          <h3 className={`text-xs font-bold tracking-wide uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
            ROADMAP / GANTT (2026)
          </h3>
          <div className={`flex items-center space-x-2 text-[8px] sm:text-[9px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-500 inline-block"></span> Track</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-amber-500 inline-block"></span> Riesgo</span>
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-xs min-w-[500px]">
            <thead>
              <tr className={`border-b text-[9px] uppercase ${isDark ? 'border-[#1d2d4f] text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                <th className="py-1.5 px-2 min-w-[110px]">Proyecto</th>
                <th className="py-1.5 px-1 text-center">Inicio</th>
                <th className="py-1.5 px-1 text-center">Fin</th>
                <th className="py-1.5 px-1 text-center">Ene-Jun</th>
                <th className={`py-1.5 px-1 text-center font-bold border-x ${
                  isDark ? 'bg-blue-900/30 text-cyan-300 border-blue-500/30' : 'bg-blue-100 text-blue-900 border-blue-300'
                }`}>Jul (Hoy)</th>
                <th className="py-1.5 px-1 text-center">Ago-Dic</th>
                <th className="py-1.5 px-2 text-right">Estado</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-[#152342]' : 'divide-slate-100'}`}>
              {projects.map((prj, idx) => (
                <tr
                  key={prj.id}
                  onClick={() => handleRowClick(prj)}
                  className={`transition-colors cursor-pointer ${isDark ? 'hover:bg-[#132244]' : 'hover:bg-slate-50'}`}
                >
                  <td className={`py-1.5 px-2 font-bold text-[10px] sm:text-[11px] truncate max-w-[110px] ${isDark ? 'text-white' : 'text-slate-900'}`}>{prj.name}</td>
                  <td className={`py-1.5 px-1 text-center text-[10px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{prj.startDatePlan}</td>
                  <td className={`py-1.5 px-1 text-center text-[10px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{prj.endDatePlan}</td>

                  <td colSpan={3} className="py-1.5 px-1 relative">
                    <div className={`relative h-3 w-full rounded-full overflow-hidden border ${
                      isDark ? 'bg-[#081021] border-[#16274a]' : 'bg-slate-100 border-slate-200'
                    }`}>
                      <div
                        className={`absolute top-0 bottom-0 rounded-full shadow transition-all ${
                          prj.statusGantt === 'On Track' ? 'bg-gradient-to-r from-emerald-600 to-emerald-400' :
                          prj.statusGantt === 'En Riesgo' ? 'bg-gradient-to-r from-amber-600 to-amber-400' :
                          prj.statusGantt === 'Atrasado' ? 'bg-gradient-to-r from-rose-600 to-rose-400' :
                          'bg-slate-400'
                        }`}
                        style={{
                          left: `${idx * 8 + 4}%`,
                          width: `${prj.statusGantt === 'Sin Iniciar' ? 15 : 45}%`
                        }}
                      />
                    </div>
                  </td>

                  <td className="py-1.5 px-2 text-right">
                    {getStatusBadge(prj.statusGantt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Desempeño & Semáforo Dual Section */}
      <div className="space-y-3">
        {/* Desempeño */}
        <div className={`p-3.5 rounded-xl border transition-colors min-w-0 ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <h3 className={`text-xs font-bold tracking-wide uppercase mb-2 pb-1.5 border-b ${isDark ? 'border-[#1d2d4f] text-white' : 'border-slate-200 text-slate-900'}`}>
            DESEMPEÑO DEL PORTAFOLIO
          </h3>

          <div className="grid grid-cols-2 gap-2.5 items-center">
            <div className={`border rounded-xl p-2 text-center flex flex-col items-center ${isDark ? 'bg-[#091224] border-[#1a2b4e]' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`text-[10px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>SPI (Tiempo)</span>
              <div className="text-lg font-extrabold text-amber-500 my-0.5">{kpis.portfolioSPI}</div>
              <span className="text-[9px] text-amber-600 font-medium leading-tight">Ligero desvío</span>
            </div>

            <div className={`border rounded-xl p-2 text-center flex flex-col items-center ${isDark ? 'bg-[#091224] border-[#1a2b4e]' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`text-[10px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>CPI (Costo)</span>
              <div className="text-lg font-extrabold text-emerald-500 my-0.5">{kpis.portfolioCPI}</div>
              <span className="text-[9px] text-emerald-600 font-medium leading-tight">Eficiencia (+5%)</span>
            </div>
          </div>

          <div className="mt-2.5 grid grid-cols-4 gap-1 text-center text-xs">
            <div className={`p-1 rounded-lg border ${isDark ? 'bg-[#0b162c] border-[#1a2948]' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`text-[8px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Score</span>
              <strong className={`text-[11px] font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>87/100</strong>
            </div>
            <div className={`p-1 rounded-lg border ${isDark ? 'bg-[#0b162c] border-[#1a2948]' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`text-[8px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Desvío</span>
              <strong className="text-emerald-500 text-[11px] font-bold">+8%</strong>
            </div>
            <div className={`p-1 rounded-lg border ${isDark ? 'bg-[#0b162c] border-[#1a2948]' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`text-[8px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Issues</span>
              <strong className="text-amber-500 text-[11px] font-bold">{kpis.openIssuesCount}</strong>
            </div>
            <div className={`p-1 rounded-lg border ${isDark ? 'bg-[#0b162c] border-[#1a2948]' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`text-[8px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Depend.</span>
              <strong className="text-rose-500 text-[11px] font-bold">{kpis.criticalDependenciesCount}</strong>
            </div>
          </div>
        </div>

        {/* Semáforo de Salud */}
        <div className={`p-3.5 rounded-xl border transition-colors min-w-0 ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <h3 className={`text-xs font-bold tracking-wide uppercase mb-2 pb-1.5 border-b ${isDark ? 'border-[#1d2d4f] text-white' : 'border-slate-200 text-slate-900'}`}>
            SEMÁFORO DE SALUD POR PROYECTO
          </h3>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs min-w-[260px]">
              <thead>
                <tr className={`border-b text-[9px] uppercase ${isDark ? 'border-[#1d2d4f] text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                  <th className="py-1 px-1">Proyecto</th>
                  <th className="py-1 px-1 text-center">Tiempo</th>
                  <th className="py-1 px-1 text-center">Coste</th>
                  <th className="py-1 px-1 text-center">Alcance</th>
                  <th className="py-1 px-1 text-center">Riesgos</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-[#152342]' : 'divide-slate-100'}`}>
                {projects.slice(0, 6).map((prj) => (
                  <tr
                    key={prj.id}
                    onClick={() => handleRowClick(prj)}
                    className={`transition-colors cursor-pointer ${isDark ? 'hover:bg-[#132244]' : 'hover:bg-slate-50'}`}
                  >
                    <td className={`py-1 px-1 font-semibold text-[10px] truncate max-w-[100px] ${isDark ? 'text-white' : 'text-slate-900'}`}>{prj.name}</td>
                    <td className="py-1 px-1 text-center">
                      <span className={`inline-block w-2.5 h-2.5 rounded-full shadow ${getDotColor(prj.timeHealth)}`} />
                    </td>
                    <td className="py-1 px-1 text-center">
                      <span className={`inline-block w-2.5 h-2.5 rounded-full shadow ${getDotColor(prj.costHealth)}`} />
                    </td>
                    <td className="py-1 px-1 text-center">
                      <span className={`inline-block w-2.5 h-2.5 rounded-full shadow ${getDotColor(prj.scopeHealth)}`} />
                    </td>
                    <td className="py-1 px-1 text-center">
                      <span className={`inline-block w-2.5 h-2.5 rounded-full shadow ${getDotColor(prj.riskHealth)}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={`mt-2 flex items-center justify-center space-x-3 text-[9px] pt-1.5 border-t ${
            isDark ? 'border-[#1d2d4f] text-slate-400' : 'border-slate-200 text-slate-500'
          }`}>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> Tiempo</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Riesgo</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Atraso</span>
          </div>
        </div>
      </div>
    </div>
  );
};
