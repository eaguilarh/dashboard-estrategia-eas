import React from 'react';
import { PortfolioKPIs, ClosedProject } from '../../types/dashboard';
import { TrendingUp, CheckCircle2, HeartHandshake, AlertCircle } from 'lucide-react';

interface Module3Props {
  kpis: PortfolioKPIs;
  closedProjects: ClosedProject[];
  theme?: 'dark' | 'light';
}

export const Module3Benefits: React.FC<Module3Props> = ({ kpis, closedProjects, theme = 'dark' }) => {
  const isDark = theme === 'dark';

  const benefitAreas = [
    { area: 'Finanzas', pct: 38, color: '#1e68d7' },
    { area: 'Ventas', pct: 32, color: '#10b981' },
    { area: 'Operaciones', pct: 20, color: '#f59e0b' },
    { area: 'RRHH', pct: 10, color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-4 text-left">
      {/* Module Banner Header */}
      <div className={`border rounded-xl p-3 flex items-center justify-between shadow-md transition-colors ${
        isDark ? 'bg-gradient-to-r from-[#0b1b3d] via-[#102450] to-[#0b1b3d] border-[#1d3363]' : 'bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-900 border-emerald-800 text-white'
      }`}>
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center font-extrabold text-white text-sm shadow">
            3
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight uppercase">
              BENEFICIOS REALIZADOS Y CIERRE
            </h2>
            <p className="text-[11px] text-emerald-200/90 font-medium">
              ¿Estamos obteniendo el valor comprometido?
            </p>
          </div>
        </div>
        <div className="hidden sm:block text-right">
          <span className="text-[10px] bg-emerald-950/80 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded font-semibold">
            Forms 3 Cierre (90 Días)
          </span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        <div className={`p-2.5 rounded-xl border flex flex-col justify-between transition-colors ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <span className={`text-[10px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Proyectos Cerrados</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>{kpis.closedProjectsCount}</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border flex flex-col justify-between transition-colors ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <span className={`text-[10px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Beneficio Realizado</span>
          <div className="mt-1">
            <span className="text-lg font-extrabold text-emerald-500">${kpis.realizedBenefitMXN}M</span>
            <span className={`text-[9px] ml-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>MXN</span>
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border flex flex-col justify-between transition-colors ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <span className={`text-[10px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>ROI 90 Días Promedio</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-xl font-extrabold text-emerald-500">{kpis.avgROI90DaysPct}%</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border flex flex-col justify-between transition-colors ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <span className={`text-[10px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Cumpl. Beneficios</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-xl font-extrabold text-cyan-500">{kpis.benefitCompliancePct}%</span>
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border flex flex-col justify-between transition-colors ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <span className={`text-[10px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>NPS Promedio</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>{kpis.avgNPS}</span>
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-500" />
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border flex flex-col justify-between transition-colors ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <span className={`text-[10px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Adopción Promedio</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-xl font-extrabold text-purple-500">{kpis.avgAdoptionPct}%</span>
          </div>
        </div>
      </div>

      {/* Main Bar Chart & Gauge Row */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3">
        {/* ROI Esperado vs Real (8 cols) */}
        <div className={`xl:col-span-8 p-3.5 rounded-xl border transition-colors ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className={`flex items-center justify-between mb-2 pb-1.5 border-b ${isDark ? 'border-[#1d2d4f]' : 'border-slate-200'}`}>
            <h3 className={`text-xs font-bold tracking-wide uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
              ROI ESPERADO vs ROI REAL (90 DÍAS)
            </h3>
            <div className={`flex items-center space-x-3 text-[9px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-slate-500 inline-block"></span> ROI Esperado</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block"></span> ROI Real</span>
            </div>
          </div>

          <div className="h-52 flex items-end justify-around gap-2 pt-3 px-1">
            {closedProjects.map((prj) => (
              <div key={prj.id} className="flex flex-col items-center gap-1.5 flex-1 max-w-[80px]">
                <div className="w-full flex items-end justify-center gap-1 h-36">
                  <div className="w-1/2 bg-slate-500 rounded-t flex flex-col justify-between p-0.5 text-center" style={{ height: `${prj.roiExpectedPct * 1.4}%` }}>
                    <span className="text-[8px] font-bold text-white">{prj.roiExpectedPct}%</span>
                  </div>
                  <div className="w-1/2 bg-emerald-500 rounded-t flex flex-col justify-between p-0.5 text-center shadow" style={{ height: `${prj.roiReal90DaysPct * 1.4}%` }}>
                    <span className="text-[8px] font-bold text-white">{prj.roiReal90DaysPct}%</span>
                  </div>
                </div>
                <span className={`text-[9px] font-semibold text-center truncate w-full ${isDark ? 'text-slate-300' : 'text-slate-700'}`} title={prj.name}>
                  {prj.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Benefit Realization Index (4 cols) */}
        <div className={`xl:col-span-4 p-3.5 rounded-xl border flex flex-col justify-between items-center text-center transition-colors ${
          isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h3 className={`text-xs font-bold tracking-wide uppercase pb-1.5 border-b w-full ${isDark ? 'border-[#1d2d4f] text-white' : 'border-slate-200 text-slate-900'}`}>
            BENEFIT REALIZATION INDEX
          </h3>

          <div className="relative w-32 h-32 my-1 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path className={isDark ? 'text-slate-800' : 'text-slate-200'} strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path strokeWidth="3.5" strokeDasharray="94, 100" stroke="#10b981" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute text-center">
              <span className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>94%</span>
              <span className="block text-[8px] text-slate-400">Captura Real</span>
            </div>
          </div>

          <div className={`w-full grid grid-cols-2 gap-1.5 pt-1.5 border-t text-xs ${isDark ? 'border-[#1d2d4f]' : 'border-slate-200'}`}>
            <div>
              <span className={`text-[9px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Beneficios Reales</span>
              <strong className="text-emerald-500 text-xs font-extrabold">${kpis.realizedBenefitMXN}M</strong>
            </div>
            <div>
              <span className={`text-[9px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Comprometidos</span>
              <strong className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>${kpis.promisedBenefitMXN}M</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Delivered Projects Table & Breakdown */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3">
        {/* Table (8 cols) */}
        <div className={`xl:col-span-8 p-3.5 rounded-xl border transition-colors ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <h3 className={`text-xs font-bold tracking-wide uppercase mb-2 pb-1.5 border-b ${isDark ? 'border-[#1d2d4f] text-white' : 'border-slate-200 text-slate-900'}`}>
            PROYECTOS ENTREGADOS Y VALIDACIÓN 90 DÍAS
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className={`border-b text-[9px] uppercase ${isDark ? 'border-[#1d2d4f] text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                  <th className="py-1 px-1.5">Proyecto</th>
                  <th className="py-1 px-1.5 text-center">Fecha Entrega</th>
                  <th className="py-1 px-1.5 text-center">ROI Esperado</th>
                  <th className="py-1 px-1.5 text-center">ROI 90 Días</th>
                  <th className="py-1 px-1.5 text-center">NPS</th>
                  <th className="py-1 px-1.5 text-center">Estado NPS</th>
                  <th className="py-1 px-1.5 text-right">Adopción</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-[#152342]' : 'divide-slate-100'}`}>
                {closedProjects.map((prj) => (
                  <tr key={prj.id} className={`transition-colors ${isDark ? 'hover:bg-[#132244]' : 'hover:bg-slate-50'}`}>
                    <td className={`py-1 px-1.5 font-bold text-[11px] ${isDark ? 'text-white' : 'text-slate-900'}`}>{prj.name}</td>
                    <td className={`py-1 px-1.5 text-center ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{prj.deliveryDate}</td>
                    <td className={`py-1 px-1.5 text-center font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{prj.roiExpectedPct}%</td>
                    <td className="py-1 px-1.5 text-center font-bold text-emerald-500">{prj.roiReal90DaysPct}%</td>
                    <td className="py-1 px-1.5 text-center font-bold text-cyan-500">{prj.nps > 0 ? prj.nps : '—'}</td>
                    <td className="py-1 px-1.5 text-center">
                      {prj.npsStatus === 'Excelente' && <span className="text-emerald-500 font-bold flex items-center justify-center gap-1"><CheckCircle2 className="w-3 h-3" /> {prj.npsStatus}</span>}
                      {prj.npsStatus === 'Bueno' && <span className="text-blue-500 font-bold flex items-center justify-center gap-1"><CheckCircle2 className="w-3 h-3" /> {prj.npsStatus}</span>}
                      {prj.npsStatus === 'Pendiente' && <span className="text-amber-500 font-bold flex items-center justify-center gap-1"><AlertCircle className="w-3 h-3" /> Pendiente</span>}
                    </td>
                    <td className="py-1 px-1.5 text-right font-bold text-purple-600">{prj.adoptionPct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Breakdown Panel (4 cols) */}
        <div className="xl:col-span-4 space-y-2.5">
          <div className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
            isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div>
              <span className={`text-[9px] uppercase font-bold block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>NPS POR PROYECTO</span>
              <span className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>74 <span className="text-xs text-slate-400 font-normal">/ 100</span></span>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-emerald-500 flex items-center justify-center text-emerald-500 font-bold text-sm bg-emerald-500/10">
              74
            </div>
          </div>

          <div className={`p-3 rounded-xl border transition-colors ${
            isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <span className={`text-[9px] uppercase font-bold block mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>DISTRIBUCIÓN DE BENEFICIOS POR ÁREA</span>
            <div className="space-y-1">
              {benefitAreas.map((item) => (
                <div key={item.area} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }} />
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{item.area}</span>
                  </div>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-3 rounded-xl border transition-colors ${
            isDark ? 'bg-gradient-to-r from-[#0d162b] to-[#16274a] border-[#1e345e]' : 'bg-slate-50 border-slate-200 shadow-sm'
          }`}>
            <span className={`text-[9px] uppercase font-bold block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>INCIDENTES POST GO-LIVE</span>
            <div className="mt-1 flex items-baseline justify-between">
              <span className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{kpis.totalPostGoLiveIncidents}</span>
              <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                ↓ 60% vs anterior
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
