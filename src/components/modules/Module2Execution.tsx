import React from 'react';
import { ProjectExecution, PortfolioKPIs } from '../../types/dashboard';
import { formatNumber, normalizeDateStr, parseMonthDay } from '../../utils/formatters';

interface Module2ExecutionProps {
  isDark?: boolean;
  theme?: 'dark' | 'light';
  isCockpit?: boolean;
  projects?: ProjectExecution[];
  kpis?: PortfolioKPIs;
  onSelectProject?: (project: ProjectExecution) => void;
  onDrillDown?: (item: any) => void;
}

export const Module2Execution: React.FC<Module2ExecutionProps> = ({
  isDark = true,
  isCockpit = false,
  projects = [],
  onSelectProject,
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'On Track':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            On Track
          </span>
        );
      case 'En Riesgo':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            En Riesgo
          </span>
        );
      case 'Atrasado':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30">
            Atrasado
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-500/20 text-slate-400 border border-slate-500/30">
            {status}
          </span>
        );
    }
  };

  const getDotColor = (health: string) => {
    switch (health) {
      case 'green':
      case 'Verde':
        return 'bg-emerald-400';
      case 'yellow':
      case 'Amarillo':
        return 'bg-amber-400';
      case 'red':
      case 'Rojo':
        return 'bg-rose-500';
      default:
        return 'bg-slate-400';
    }
  };

  const handleRowClick = (project: ProjectExecution) => {
    if (onSelectProject) {
      onSelectProject(project);
    }
  };

  const kpis = {
    portfolioSPI: 0.96,
    portfolioCPI: 1.02,
  };

  const bgCard = isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm';
  const textTitle = isDark ? 'text-white' : 'text-slate-900';
  const textSub = isDark ? 'text-slate-400' : 'text-slate-500';
  const textMeta = isDark ? 'text-slate-300' : 'text-slate-600';
  const borderHeader = isDark ? 'border-[#1d2d4f] text-slate-400' : 'border-slate-200 text-slate-500';
  const divideRows = isDark ? 'divide-[#152342]' : 'divide-slate-100';
  const hoverRow = isDark ? 'hover:bg-[#132244]' : 'hover:bg-slate-50';

  return (
    <div className="space-y-4 text-left w-full max-w-full overflow-hidden select-none">
      {/* Module 2 Banner Header */}
      {!isCockpit && (
        <div className={`border rounded-xl p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-md transition-colors ${
          isDark ? 'bg-gradient-to-r from-[#0b1b3d] via-[#102450] to-[#0b1b3d] border-[#1d3363]' : 'bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-900 border-indigo-800 text-white'
        }`}>
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center font-extrabold text-white text-sm shadow flex-shrink-0">
              2
            </div>
            <div>
              <h2 className="text-xs sm:text-base font-extrabold text-white tracking-tight uppercase">
                EJECUCIÓN DE PROYECTOS Y GOBERNANZA PMO
              </h2>
              <p className="text-[10px] sm:text-xs text-indigo-200/90 font-medium">
                ¿Cómo van nuestros proyectos en tiempo y costo? • Presione cualquier elemento para detalles
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right mt-1 sm:mt-0">
            <span className="text-xs bg-indigo-950/80 text-indigo-300 border border-indigo-400/40 px-2.5 py-1 rounded font-semibold inline-block">
              Forms 2 Ejecución
            </span>
          </div>
        </div>
      )}

      <div className={`p-3.5 sm:p-4 rounded-xl border transition-colors min-w-0 w-full ${bgCard}`}>
        <div className="flex items-center justify-between mb-3 pb-1.5 border-b border-slate-700/50">
          <div>
            <h3 className={`text-xs font-bold tracking-wide uppercase ${textTitle}`}>
              PIPELINE DE PROYECTOS EN EJECUCIÓN (ROADMAP GANTT)
            </h3>
            <p className={`text-[10px] ${textSub}`}>
              Cronograma detallado y rango de fechas por iniciativa
            </p>
          </div>
          <div className={`flex items-center space-x-3 text-[9px] ${textMeta}`}>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block"></span> On Track</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block"></span> En Riesgo</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-rose-500 inline-block"></span> Atrasado</span>
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          {(() => {
            const allMonths = [
              { id: 0, name: 'Ene' },
              { id: 1, name: 'Feb' },
              { id: 2, name: 'Mar' },
              { id: 3, name: 'Abr' },
              { id: 4, name: 'May' },
              { id: 5, name: 'Jun' },
              { id: 6, name: 'Jul (Hoy)', isToday: true },
              { id: 7, name: 'Ago' },
              { id: 8, name: 'Sep' },
              { id: 9, name: 'Oct' },
              { id: 10, name: 'Nov' },
              { id: 11, name: 'Dic' },
            ];

            const minStartMonthIndex = projects.length > 0
              ? Math.min(...projects.map(p => parseMonthDay(p.startDatePlan).monthIdx))
              : 6;

            const visibleMonths = allMonths.slice(minStartMonthIndex);
            const visibleSpanCount = visibleMonths.length;

            const getPctInVisibleSpan = (dateStr: string) => {
              const { monthIdx, day } = parseMonthDay(dateStr);
              const relativeMonth = Math.max(0, monthIdx - minStartMonthIndex);
              const dayFraction = (Math.max(1, Math.min(day, 31)) - 1) / 31;
              return ((relativeMonth + dayFraction) / Math.max(1, visibleSpanCount)) * 100;
            };

            return (
              <table className="w-full text-left text-xs min-w-[650px]">
                <thead>
                  <tr className={`border-b text-[9px] uppercase ${borderHeader}`}>
                    <th className="py-1.5 px-2 min-w-[130px]">Proyecto</th>
                    <th className="py-1.5 px-1 text-center">Inicio Plan</th>
                    <th className="py-1.5 px-1 text-center">Fin Plan</th>
                    {visibleMonths.map(m => (
                      <th
                        key={m.id}
                        className={`py-1.5 px-1 text-center ${
                          m.isToday
                            ? (isDark
                              ? 'bg-blue-900/30 text-cyan-300 border-x border-blue-500/30 font-bold'
                              : 'bg-blue-100 text-blue-900 border-x border-blue-300 font-bold')
                            : ''
                        }`}
                      >
                        {m.name}
                      </th>
                    ))}
                    <th className="py-1.5 px-2 text-right">Estado</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${divideRows}`}>
                  {projects.map((prj, idx) => {
                    const startDateStr = normalizeDateStr(prj.startDatePlan);
                    const endDateStr = normalizeDateStr(prj.endDatePlan);
                    const rawStart = getPctInVisibleSpan(prj.startDatePlan);
                    const rawEnd = getPctInVisibleSpan(prj.endDatePlan);
                    const startPct = Math.max(0, Math.min(96, rawStart));
                    const endPct = Math.max(startPct + 3, Math.min(100, rawEnd));
                    const widthPct = Math.max(4, endPct - startPct);

                    return (
                      <tr
                        key={prj.id}
                        onClick={() => handleRowClick(prj)}
                        className={`transition-colors cursor-pointer ${hoverRow}`}
                      >
                        <td className={`py-1.5 px-2 font-bold text-[11px] whitespace-normal break-words ${textTitle}`}>
                          <span className="font-extrabold text-cyan-400 mr-1 text-[11px]">{idx + 1}.</span>
                          {prj.name}
                        </td>
                        <td className={`py-1.5 px-1 text-center font-medium ${textMeta}`}>{startDateStr}</td>
                        <td className={`py-1.5 px-1 text-center font-medium ${textMeta}`}>{endDateStr}</td>

                        <td colSpan={visibleSpanCount} className="py-1.5 px-1 relative">
                          <div className={`relative h-3.5 w-full rounded-full overflow-hidden border ${
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
                                left: `${startPct}%`,
                                width: `${widthPct}%`,
                              }}
                            />
                          </div>
                        </td>
                        <td className="py-1.5 px-2 text-right">
                          {getStatusBadge(prj.statusGantt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            );
          })()}
        </div>
      </div>

      {isCockpit ? (
        <div className="space-y-4 w-full">
          <div className={`p-3.5 sm:p-4 rounded-xl border flex flex-col justify-between transition-colors min-w-0 w-full ${bgCard}`}>
            <h3 className={`text-xs font-bold tracking-wide uppercase mb-3 pb-1.5 border-b ${borderHeader}`}>
              SEMÁFORO DE SALUD POR PROYECTO
            </h3>

            <div className="overflow-x-auto my-auto w-full">
              <table className="w-full text-left text-xs min-w-[280px]">
                <thead>
                  <tr className={`border-b text-[9px] uppercase ${borderHeader}`}>
                    <th className="py-1.5 px-2">Proyecto</th>
                    <th className="py-1.5 px-2 text-center">Tiempo</th>
                    <th className="py-1.5 px-2 text-center">Coste</th>
                    <th className="py-1.5 px-2 text-center">Alcance</th>
                    <th className="py-1.5 px-2 text-center">Riesgos</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${divideRows}`}>
                  {projects.slice(0, 6).map((prj, idx) => (
                    <tr
                      key={prj.id}
                      onClick={() => handleRowClick(prj)}
                      className={`transition-colors cursor-pointer ${hoverRow}`}
                    >
                      <td className={`py-1.5 px-2 font-semibold text-[11px] ${textTitle}`}>
                        <span className="font-extrabold text-cyan-400 mr-1 text-[11px]">{idx + 1}.</span>
                        {prj.name}
                      </td>
                      <td className="py-1.5 px-2 text-center">
                        <span className={`inline-block w-2.5 h-2.5 rounded-full shadow ${getDotColor(prj.timeHealth)}`} />
                      </td>
                      <td className="py-1.5 px-2 text-center">
                        <span className={`inline-block w-2.5 h-2.5 rounded-full shadow ${getDotColor(prj.costHealth)}`} />
                      </td>
                      <td className="py-1.5 px-2 text-center">
                        <span className={`inline-block w-2.5 h-2.5 rounded-full shadow ${getDotColor(prj.scopeHealth)}`} />
                      </td>
                      <td className="py-1.5 px-2 text-center">
                        <span className={`inline-block w-2.5 h-2.5 rounded-full shadow ${getDotColor(prj.riskHealth)}`} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={`mt-3 flex items-center justify-center space-x-4 text-[9px] pt-2 border-t ${borderHeader}`}>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> En tiempo</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Riesgo</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Atrasado</span>
            </div>
          </div>

          <div className={`p-3.5 sm:p-4 rounded-xl border flex flex-col justify-between transition-colors min-w-0 w-full ${bgCard}`}>
            <h3 className={`text-xs font-bold tracking-wide uppercase mb-3 pb-1.5 border-b ${borderHeader}`}>
              DESEMPEÑO DEL PORTAFOLIO
            </h3>

            <div className="grid grid-cols-2 gap-3 items-center my-auto">
              <div className={`border rounded-xl p-3 text-center flex flex-col items-center ${isDark ? 'bg-[#091224] border-[#1a2b4e]' : 'bg-slate-50 border-slate-200'}`}>
                <span className={`text-[10px] font-semibold ${textSub}`}>SPI (Tiempo)</span>
                <div className="text-xl font-extrabold text-amber-500 my-1">{formatNumber(kpis.portfolioSPI)}</div>
                <span className="text-[9px] text-amber-600 font-medium">Ligero desvío de tiempo</span>
              </div>

              <div className={`border rounded-xl p-3 text-center flex flex-col items-center ${isDark ? 'bg-[#091224] border-[#1a2b4e]' : 'bg-slate-50 border-slate-200'}`}>
                <span className={`text-[10px] font-semibold ${textSub}`}>CPI (Costo)</span>
                <div className="text-xl font-extrabold text-emerald-500 my-1">{formatNumber(kpis.portfolioCPI)}</div>
                <span className="text-[9px] text-emerald-600 font-medium">En presupuesto</span>
              </div>
            </div>

            <div className={`mt-3 flex items-center justify-between text-[9px] pt-2 border-t ${borderHeader}`}>
              <span>SPI &ge; 1.0 (Óptimo)</span>
              <span>CPI &ge; 1.0 (Óptimo)</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
          <div className={`p-3.5 sm:p-4 rounded-xl border flex flex-col justify-between transition-colors min-w-0 w-full ${bgCard}`}>
            <h3 className={`text-xs font-bold tracking-wide uppercase mb-3 pb-1.5 border-b ${borderHeader}`}>
              SEMÁFORO DE SALUD POR PROYECTO
            </h3>

            <div className="overflow-x-auto my-auto w-full">
              <table className="w-full text-left text-xs min-w-[280px]">
                <thead>
                  <tr className={`border-b text-[9px] uppercase ${borderHeader}`}>
                    <th className="py-1.5 px-2">Proyecto</th>
                    <th className="py-1.5 px-2 text-center">Tiempo</th>
                    <th className="py-1.5 px-2 text-center">Coste</th>
                    <th className="py-1.5 px-2 text-center">Alcance</th>
                    <th className="py-1.5 px-2 text-center">Riesgos</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${divideRows}`}>
                  {projects.slice(0, 6).map((prj, idx) => (
                    <tr
                      key={prj.id}
                      onClick={() => handleRowClick(prj)}
                      className={`transition-colors cursor-pointer ${hoverRow}`}
                    >
                      <td className={`py-1.5 px-2 font-semibold text-[11px] ${textTitle}`}>
                        <span className="font-extrabold text-cyan-400 mr-1 text-[11px]">{idx + 1}.</span>
                        {prj.name}
                      </td>
                      <td className="py-1.5 px-2 text-center">
                        <span className={`inline-block w-2.5 h-2.5 rounded-full shadow ${getDotColor(prj.timeHealth)}`} />
                      </td>
                      <td className="py-1.5 px-2 text-center">
                        <span className={`inline-block w-2.5 h-2.5 rounded-full shadow ${getDotColor(prj.costHealth)}`} />
                      </td>
                      <td className="py-1.5 px-2 text-center">
                        <span className={`inline-block w-2.5 h-2.5 rounded-full shadow ${getDotColor(prj.scopeHealth)}`} />
                      </td>
                      <td className="py-1.5 px-2 text-center">
                        <span className={`inline-block w-2.5 h-2.5 rounded-full shadow ${getDotColor(prj.riskHealth)}`} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={`mt-3 flex items-center justify-center space-x-4 text-[9px] pt-2 border-t ${borderHeader}`}>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> En tiempo</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Riesgo</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Atrasado</span>
            </div>
          </div>

          <div className={`p-3.5 sm:p-4 rounded-xl border flex flex-col justify-between transition-colors min-w-0 w-full ${bgCard}`}>
            <h3 className={`text-xs font-bold tracking-wide uppercase mb-3 pb-1.5 border-b ${borderHeader}`}>
              DESEMPEÑO DEL PORTAFOLIO
            </h3>

            <div className="grid grid-cols-2 gap-3 items-center my-auto">
              <div className={`border rounded-xl p-3 text-center flex flex-col items-center ${isDark ? 'bg-[#091224] border-[#1a2b4e]' : 'bg-slate-50 border-slate-200'}`}>
                <span className={`text-[10px] font-semibold ${textSub}`}>SPI (Tiempo)</span>
                <div className="text-xl font-extrabold text-amber-500 my-1">{formatNumber(kpis.portfolioSPI)}</div>
                <span className="text-[9px] text-amber-600 font-medium">Ligero desvío de tiempo</span>
              </div>

              <div className={`border rounded-xl p-3 text-center flex flex-col items-center ${isDark ? 'bg-[#091224] border-[#1a2b4e]' : 'bg-slate-50 border-slate-200'}`}>
                <span className={`text-[10px] font-semibold ${textSub}`}>CPI (Costo)</span>
                <div className="text-xl font-extrabold text-emerald-500 my-1">{formatNumber(kpis.portfolioCPI)}</div>
                <span className="text-[9px] text-emerald-600 font-medium">En presupuesto</span>
              </div>
            </div>

            <div className={`mt-3 flex items-center justify-between text-[9px] pt-2 border-t ${borderHeader}`}>
              <span>SPI &ge; 1.0 (Óptimo)</span>
              <span>CPI &ge; 1.0 (Óptimo)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};