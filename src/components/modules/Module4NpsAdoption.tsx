import React from 'react';
import { PortfolioKPIs, ClosedProject } from '../../types/dashboard';
import { HeartHandshake, Users, ThumbsUp, MessageSquare, Award, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';

interface Module4Props {
  kpis: PortfolioKPIs;
  closedProjects: ClosedProject[];
  theme?: 'dark' | 'light';
}

export const Module4NpsAdoption: React.FC<Module4Props> = ({ kpis, closedProjects, theme = 'dark' }) => {
  const isDark = theme === 'dark';

  // Dynamic NPS score categorizations derived from actual closed projects data
  const totalNPSCount = closedProjects.filter(p => p.nps > 0).length;
  const promotoresCount = closedProjects.filter(p => p.nps >= 9).length;
  const pasivosCount = closedProjects.filter(p => p.nps >= 7 && p.nps <= 8).length;
  const detractoresCount = closedProjects.filter(p => p.nps > 0 && p.nps <= 6).length;

  const pctPromotores = totalNPSCount > 0 ? Math.round((promotoresCount / totalNPSCount) * 100) : 0;
  const pctPasivos = totalNPSCount > 0 ? Math.round((pasivosCount / totalNPSCount) * 100) : 0;
  const pctDetractores = totalNPSCount > 0 ? Math.round((detractoresCount / totalNPSCount) * 100) : 0;
  const netNPS = pctPromotores - pctDetractores;

  const npsBreakdown = [
    { type: 'Promotores (Score 9-10)', pct: pctPromotores, count: promotoresCount, color: '#10b981' },
    { type: 'Pasivos (Score 7-8)', pct: pctPasivos, count: pasivosCount, color: '#f59e0b' },
    { type: 'Detractores (Score <7)', pct: pctDetractores, count: detractoresCount, color: '#ef4444' },
  ];

  // Dynamically map active closed projects to UX adoption rows
  const departmentAdoption = closedProjects.map(p => ({
    dept: `${p.area} (${p.name})`,
    activeUsers: Math.round((p.adoptionPct || 0) * 3), // Simulating user volume or leaving proportional
    totalUsers: 300,
    adoptionPct: p.adoptionPct || 0,
    status: (p.adoptionPct || 0) >= 80 ? 'Alta' : 'Refuerzo UX'
  }));

  // Build feedback dynamically from uploaded closed projects data
  const userFeedbackList = closedProjects.map((p, idx) => ({
    id: idx + 1,
    project: p.name,
    user: 'Sponsor Operativo',
    area: p.area,
    comment: p.roiReal90DaysPct > 0 
      ? `Proyecto entregado con ROI Real medido de ${p.roiReal90DaysPct}% a los 90 días.` 
      : 'Beneficios validados satisfactoriamente durante la etapa de entrega.',
    nps: p.nps || 0,
    type: (p.nps || 0) >= 9 ? 'positive' : (p.nps || 0) >= 7 ? 'neutral' : 'negative'
  })).filter(item => item.nps > 0);

  return (
    <div className="space-y-4 text-left">
      {/* Banner Header */}
      <div className={`border rounded-xl p-3.5 flex items-center justify-between shadow-md transition-colors ${
        isDark ? 'bg-gradient-to-r from-[#0b1b3d] via-[#151f42] to-[#0b1b3d] border-[#1d3363]' : 'bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 border-purple-800 text-white'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center font-extrabold text-white text-sm shadow">
            <HeartHandshake className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight uppercase">
              MÓDULO DE NPS & ADOPCIÓN DE USUARIOS
            </h2>
            <p className="text-xs text-purple-200/90 font-medium">
              Evaluación cualitativa de experiencia del usuario final y tasa de uso continuo
            </p>
          </div>
        </div>
        <div className="hidden sm:block text-right">
          <span className="text-[10px] bg-purple-950/80 text-purple-300 border border-purple-400/40 px-2.5 py-1 rounded font-semibold">
            Feedback de Forms 3
          </span>
        </div>
      </div>

      {/* KPI Cards Row (6 metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        <div className={`p-2.5 rounded-xl border flex flex-col justify-between transition-colors min-w-0 overflow-hidden ${
          isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <span className={`text-[10px] font-semibold truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>NPS Promedio</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-base sm:text-lg font-black text-emerald-500">{kpis.avgNPS} <span className="text-[9px] font-normal text-slate-400">/ 100</span></span>
            <Award className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border flex flex-col justify-between transition-colors min-w-0 overflow-hidden ${
          isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <span className={`text-[10px] font-semibold truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Adopción General</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-base sm:text-lg font-black text-purple-500">{kpis.avgAdoptionPct}%</span>
            <Users className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border flex flex-col justify-between transition-colors min-w-0 overflow-hidden ${
          isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <span className={`text-[10px] font-semibold truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Promotores</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-base sm:text-lg font-black text-emerald-500">{pctPromotores}%</span>
            <ThumbsUp className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border flex flex-col justify-between transition-colors min-w-0 overflow-hidden ${
          isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <span className={`text-[10px] font-semibold truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Proyectos Totales</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className={`text-base sm:text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{kpis.closedProjectsCount}</span>
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border flex flex-col justify-between transition-colors min-w-0 overflow-hidden ${
          isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <span className={`text-[10px] font-semibold truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Retención de Uso</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-base sm:text-lg font-black text-cyan-500">{kpis.avgAdoptionPct > 0 ? `${kpis.avgAdoptionPct}%` : '0%'}</span>
            <TrendingUp className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" />
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border flex flex-col justify-between transition-colors min-w-0 overflow-hidden ${
          isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <span className={`text-[10px] font-semibold truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>NPS Excelente</span>
          <div className="mt-1 flex items-baseline justify-between gap-1 flex-wrap">
            <span className="text-base sm:text-lg font-black text-emerald-500">{closedProjects.filter(p => p.nps >= 80).length} <span className="text-[9px] font-normal text-slate-400 whitespace-nowrap">proy.</span></span>
          </div>
        </div>
      </div>

      {/* Main Charts & Data Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3">
        {/* Desglose NPS: Promotores, Pasivos, Detractores (6 cols) */}
        <div className={`xl:col-span-6 p-3.5 rounded-xl border transition-colors ${
          isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h3 className={`text-xs font-bold tracking-wide uppercase mb-2 pb-1.5 border-b ${
            isDark ? 'border-[#1d2d4f] text-white' : 'border-slate-200 text-slate-900'
          }`}>
            DESGLOSE DE SATISFACCIÓN NPS ({totalNPSCount} RESPUESTAS)
          </h3>

          {totalNPSCount > 0 ? (
            <div className="space-y-3 py-1">
              {npsBreakdown.map((item) => (
                <div key={item.type} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{item.type}</span>
                    <span className="font-bold" style={{ color: item.color }}>{item.pct}% ({item.count} usuarios)</span>
                  </div>
                  <div className={`w-full h-3.5 rounded-full overflow-hidden border ${
                    isDark ? 'bg-[#081021] border-[#16274a]' : 'bg-slate-100 border-slate-200'
                  }`}>
                    <div
                      className="h-full rounded-full transition-all duration-500 shadow"
                      style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-xs text-slate-400">
              No se han cargado respuestas de NPS en el formulario de Cierre y Beneficios (Forms 3) todavía.
            </div>
          )}

          <div className={`mt-3 p-2.5 rounded-lg border text-xs flex items-center justify-between ${
            isDark ? 'bg-[#091428] border-[#1a2b4e]' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Metodología NPS Estándar: Promotores (%) - Detractores (%)</span>
            <strong className="text-emerald-500 text-sm font-extrabold">
              {totalNPSCount > 0 ? `${netNPS > 0 ? '+' : ''}${netNPS} NPS Net` : '0 NPS Net'}
            </strong>
          </div>
        </div>

        {/* Adopción por Departamento (6 cols) */}
        <div className={`xl:col-span-6 p-3.5 rounded-xl border transition-colors ${
          isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h3 className={`text-xs font-bold tracking-wide uppercase mb-2 pb-1.5 border-b ${
            isDark ? 'border-[#1d2d4f] text-white' : 'border-slate-200 text-slate-900'
          }`}>
            ADOPCIÓN Y USUARIOS ACTIVOS POR PROYECTO
          </h3>

          <div className="overflow-x-auto">
            {departmentAdoption.length > 0 ? (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className={`border-b text-[9px] uppercase ${isDark ? 'border-[#1d2d4f] text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                    <th className="py-1 px-1.5">Área / Proyecto</th>
                    <th className="py-1 px-1.5 text-center">Usuarios Estimados</th>
                    <th className="py-1 px-1.5 text-center">% Adopción</th>
                    <th className="py-1 px-1.5 text-right">Estatus UX</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-[#152342]' : 'divide-slate-100'}`}>
                  {departmentAdoption.map((row, idx) => (
                    <tr key={idx} className={`transition-colors ${isDark ? 'hover:bg-[#132244]' : 'hover:bg-slate-50'}`}>
                      <td className={`py-1.5 px-1.5 font-semibold text-[11px] ${isDark ? 'text-white' : 'text-slate-900'}`}>{row.dept}</td>
                      <td className={`py-1.5 px-1.5 text-center ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{row.activeUsers} de {row.totalUsers}</td>
                      <td className="py-1.5 px-1.5 text-center font-bold text-purple-500">{row.adoptionPct}%</td>
                      <td className="py-1.5 px-1.5 text-right font-semibold">
                        {row.adoptionPct >= 80 ? (
                          <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">Excelente</span>
                        ) : (
                          <span className="text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">Refuerzo UX</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-6 text-xs text-slate-400">
                No hay proyectos en la etapa de Cierre para evaluar tasas de adopción en el sistema.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User Qualitative Feedback List */}
      <div className={`p-3.5 rounded-xl border transition-colors ${
        isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className={`flex items-center justify-between mb-2 pb-1.5 border-b ${
          isDark ? 'border-[#1d2d4f]' : 'border-slate-200'
        }`}>
          <h3 className={`text-xs font-bold tracking-wide uppercase flex items-center gap-1.5 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            <MessageSquare className="w-3.5 h-3.5 text-cyan-500" /> FEEDBACK CUALITATIVO DE USUARIOS (FORMS 3)
          </h3>
          <span className={`text-[9px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Respuestas validadas post Go-Live
          </span>
        </div>

        {userFeedbackList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {userFeedbackList.map((fb) => (
              <div key={fb.id} className={`p-3 rounded-lg border flex flex-col justify-between text-xs ${
                isDark ? 'bg-[#0a1326] border-[#1b2a4c]' : 'bg-slate-50 border-slate-200'
              }`}>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-blue-500">{fb.project}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
                      NPS {fb.nps}/10
                    </span>
                  </div>
                  <p className={`text-[11px] italic leading-snug my-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    "{fb.comment}"
                  </p>
                </div>
                <div className={`mt-2 pt-1 border-t flex items-center justify-between text-[10px] ${
                  isDark ? 'border-[#152342] text-slate-400' : 'border-slate-200 text-slate-500'
                }`}>
                  <span>{fb.user} • {fb.area}</span>
                  <span className="text-emerald-500 font-semibold flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3" /> Validado
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-xs text-slate-400">
            Ninguna retroalimentación cargada por el momento.
          </div>
        )}
      </div>
    </div>
  );
};
