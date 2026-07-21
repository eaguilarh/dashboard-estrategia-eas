import React from 'react';
import { PortfolioKPIs, ProjectExecution } from '../../types/dashboard';
import { KanbanSquare as Kanban, CheckCircle, AlertTriangle, XCircle, Clock, DollarSign, Gauge, ShieldAlert } from 'lucide-react';

interface Module2Props {
  kpis: PortfolioKPIs;
  projects: ProjectExecution[];
}

export const Module2Execution: React.FC<Module2Props> = ({ kpis, projects }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'On Track':
        return <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 w-max"><CheckCircle className="w-3 h-3" /> On Track</span>;
      case 'En Riesgo':
        return <span className="bg-amber-950 text-amber-400 border border-amber-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 w-max"><AlertTriangle className="w-3 h-3" /> En Riesgo</span>;
      case 'Atrasado':
        return <span className="bg-rose-950 text-rose-400 border border-rose-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 w-max"><XCircle className="w-3 h-3" /> Atrasado</span>;
      default:
        return <span className="bg-slate-800 text-slate-400 border border-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 w-max">Sin Iniciar</span>;
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

  return (
    <div className="space-y-4">
      {/* Module Banner Header */}
      <div className="bg-gradient-to-r from-[#0b1b3d] via-[#102450] to-[#0b1b3d] border border-[#1d3363] rounded-xl p-3.5 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center font-bold text-white shadow-md">
            2
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              PIPELINE DE PROYECTOS EN EJECUCIÓN
            </h2>
            <p className="text-xs text-cyan-300/80">
              ¿Cómo vamos con los proyectos en construcción?
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[11px] bg-cyan-950 text-cyan-300 border border-cyan-500/40 px-2.5 py-1 rounded-md font-medium">
            Brief de Iniciativas (Forms 2 & Excel PMO)
          </span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="executive-card p-3 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400">Proyectos Activos</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">{kpis.activeProjects}</span>
            <Kanban className="w-4 h-4 text-cyan-400" />
          </div>
        </div>

        <div className="executive-card p-3 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400">On Track</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-emerald-400">{kpis.pctOnTrack}%</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        <div className="executive-card p-3 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400">En Riesgo</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-amber-400">{kpis.projectsInRisk}</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
        </div>

        <div className="executive-card p-3 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400">Atrasados</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-rose-400">{kpis.projectsDelayed}</span>
            <XCircle className="w-4 h-4 text-rose-400" />
          </div>
        </div>

        <div className="executive-card p-3 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400">Avance Promedio</span>
          <div className="mt-1 flex items-baseline">
            <span className="text-2xl font-extrabold text-blue-400">{kpis.avgProgressPct}%</span>
          </div>
        </div>

        <div className="executive-card p-3 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400">Presupuesto Consumido</span>
          <div className="mt-1">
            <span className="text-xl font-extrabold text-emerald-400">${kpis.consumedBudgetMXN}M</span>
            <span className="text-[10px] text-slate-400 ml-1">de ${kpis.totalApprovedBudgetMXN}M</span>
          </div>
        </div>
      </div>

      {/* Main Gantt & Timeline View */}
      <div className="executive-card p-4">
        <div className="flex items-center justify-between mb-3 border-b border-[#1d2d4f] pb-2">
          <h3 className="text-sm font-bold text-white tracking-wide uppercase">
            ROADMAP / DIAGRAMA DE GANTT (2024)
          </h3>
          <div className="flex items-center space-x-3 text-[10px]">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block"></span> On Track</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block"></span> En Riesgo</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-rose-500 inline-block"></span> Atrasado</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-slate-600 inline-block"></span> Sin Iniciar</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1d2d4f] text-slate-400 text-[10px] uppercase">
                <th className="py-2 px-2 min-w-[140px]">Proyecto</th>
                <th className="py-2 px-1 text-center">Inicio Plan</th>
                <th className="py-2 px-1 text-center">Fin Plan</th>
                <th className="py-2 px-1 text-center">Ene</th>
                <th className="py-2 px-1 text-center">Feb</th>
                <th className="py-2 px-1 text-center">Mar</th>
                <th className="py-2 px-1 text-center">Abr</th>
                <th className="py-2 px-1 text-center">May</th>
                <th className="py-2 px-1 text-center">Jun</th>
                <th className="py-2 px-1 text-center bg-blue-900/30 text-cyan-300 font-bold border-x border-blue-500/30">Jul (Hoy)</th>
                <th className="py-2 px-1 text-center">Ago</th>
                <th className="py-2 px-1 text-center">Sep</th>
                <th className="py-2 px-1 text-center">Oct</th>
                <th className="py-2 px-1 text-center">Nov</th>
                <th className="py-2 px-1 text-center">Dic</th>
                <th className="py-2 px-2 text-right">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#152342]">
              {projects.map((prj, idx) => (
                <tr key={prj.id} className="hover:bg-[#132244] transition-colors">
                  <td className="py-2 px-2 font-bold text-white">{prj.name}</td>
                  <td className="py-2 px-1 text-center text-slate-300 font-medium">{prj.startDatePlan}</td>
                  <td className="py-2 px-1 text-center text-slate-300 font-medium">{prj.endDatePlan}</td>
                  
                  {/* Timeline Gantt Bar Cells */}
                  <td colSpan={12} className="py-2 px-1 relative">
                    <div className="relative h-4 w-full bg-[#081021] rounded-full overflow-hidden border border-[#16274a]">
                      {/* Gantt Bar representation */}
                      <div
                        className={`absolute top-0 bottom-0 rounded-full shadow-md transition-all ${
                          prj.statusGantt === 'On Track' ? 'bg-gradient-to-r from-emerald-600 to-emerald-400' :
                          prj.statusGantt === 'En Riesgo' ? 'bg-gradient-to-r from-amber-600 to-amber-400' :
                          prj.statusGantt === 'Atrasado' ? 'bg-gradient-to-r from-rose-600 to-rose-400' :
                          'bg-slate-700'
                        }`}
                        style={{
                          left: `${idx * 8 + 5}%`,
                          width: `${prj.statusGantt === 'Sin Iniciar' ? 15 : 45}%`
                        }}
                      />
                    </div>
                  </td>

                  <td className="py-2 px-2 text-right">
                    {getStatusBadge(prj.statusGantt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Desempeño & Semáforo Dual Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Desempeño del Portafolio (6 cols) */}
        <div className="lg:col-span-6 executive-card p-4">
          <h3 className="text-sm font-bold text-white tracking-wide uppercase mb-3 border-b border-[#1d2d4f] pb-2">
            DESEMPEÑO DEL PORTAFOLIO
          </h3>

          <div className="grid grid-cols-2 gap-4 items-center">
            {/* SPI (Tiempo) Gauge mockup */}
            <div className="bg-[#091224] border border-[#1a2b4e] rounded-xl p-3 text-center flex flex-col items-center">
              <span className="text-[11px] font-semibold text-slate-400">SPI (Tiempo)</span>
              <div className="relative w-24 h-14 mt-2 flex items-center justify-center">
                <div className="text-2xl font-extrabold text-amber-400">{kpis.portfolioSPI}</div>
              </div>
              <span className="text-[10px] text-amber-400/80 font-medium">Ligero desvío de tiempo</span>
            </div>

            {/* CPI (Costo) Gauge mockup */}
            <div className="bg-[#091224] border border-[#1a2b4e] rounded-xl p-3 text-center flex flex-col items-center">
              <span className="text-[11px] font-semibold text-slate-400">CPI (Costo)</span>
              <div className="relative w-24 h-14 mt-2 flex items-center justify-center">
                <div className="text-2xl font-extrabold text-emerald-400">{kpis.portfolioCPI}</div>
              </div>
              <span className="text-[10px] text-emerald-400/80 font-medium">Eficiencia en costo (+5%)</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2 text-center text-xs">
            <div className="bg-[#0b162c] p-2 rounded-lg border border-[#1a2948]">
              <span className="text-[10px] text-slate-400 block">Overall Score</span>
              <strong className="text-white text-sm font-bold">87/100</strong>
            </div>
            <div className="bg-[#0b162c] p-2 rounded-lg border border-[#1a2948]">
              <span className="text-[10px] text-slate-400 block">Desvío Presup.</span>
              <strong className="text-emerald-400 text-sm font-bold">+8% vs plan</strong>
            </div>
            <div className="bg-[#0b162c] p-2 rounded-lg border border-[#1a2948]">
              <span className="text-[10px] text-slate-400 block">Issues Abiertos</span>
              <strong className="text-amber-400 text-sm font-bold">{kpis.openIssuesCount}</strong>
            </div>
            <div className="bg-[#0b162c] p-2 rounded-lg border border-[#1a2948]">
              <span className="text-[10px] text-slate-400 block">Dependencias</span>
              <strong className="text-rose-400 text-sm font-bold">{kpis.criticalDependenciesCount}</strong>
            </div>
          </div>
        </div>

        {/* Semáforo de Salud por Proyecto (6 cols) */}
        <div className="lg:col-span-6 executive-card p-4">
          <h3 className="text-sm font-bold text-white tracking-wide uppercase mb-3 border-b border-[#1d2d4f] pb-2">
            SEMÁFORO DE SALUD POR PROYECTO
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#1d2d4f] text-slate-400 text-[10px] uppercase">
                  <th className="py-1.5 px-2">Proyecto</th>
                  <th className="py-1.5 px-2 text-center">Tiempo</th>
                  <th className="py-1.5 px-2 text-center">Coste</th>
                  <th className="py-1.5 px-2 text-center">Alcance</th>
                  <th className="py-1.5 px-2 text-center">Riesgos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#152342]">
                {projects.slice(0, 6).map((prj) => (
                  <tr key={prj.id} className="hover:bg-[#132244] transition-colors">
                    <td className="py-1.5 px-2 font-semibold text-white">{prj.name}</td>
                    <td className="py-1.5 px-2 text-center">
                      <span className={`inline-block w-3 h-3 rounded-full shadow ${getDotColor(prj.timeHealth)}`} />
                    </td>
                    <td className="py-1.5 px-2 text-center">
                      <span className={`inline-block w-3 h-3 rounded-full shadow ${getDotColor(prj.costHealth)}`} />
                    </td>
                    <td className="py-1.5 px-2 text-center">
                      <span className={`inline-block w-3 h-3 rounded-full shadow ${getDotColor(prj.scopeHealth)}`} />
                    </td>
                    <td className="py-1.5 px-2 text-center">
                      <span className={`inline-block w-3 h-3 rounded-full shadow ${getDotColor(prj.riskHealth)}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 flex items-center justify-center space-x-4 text-[10px] text-slate-400 pt-2 border-t border-[#1d2d4f]">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> En tiempo</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Riesgo</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Atrasado</span>
          </div>
        </div>
      </div>
    </div>
  );
};
