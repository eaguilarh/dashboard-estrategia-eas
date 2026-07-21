import React from 'react';
import { PortfolioKPIs, ClosedProject } from '../../types/dashboard';
import { TrendingUp, Award, CheckCircle2, HeartHandshake, AlertCircle, PieChart, ShieldAlert } from 'lucide-react';

interface Module3Props {
  kpis: PortfolioKPIs;
  closedProjects: ClosedProject[];
}

export const Module3Benefits: React.FC<Module3Props> = ({ kpis, closedProjects }) => {
  const benefitAreas = [
    { area: 'Finanzas', pct: 38, color: '#1e68d7' },
    { area: 'Ventas', pct: 32, color: '#10b981' },
    { area: 'Operaciones', pct: 20, color: '#f59e0b' },
    { area: 'RRHH', pct: 10, color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-4">
      {/* Module Banner Header */}
      <div className="bg-gradient-to-r from-[#0b1b3d] via-[#102450] to-[#0b1b3d] border border-[#1d3363] rounded-xl p-3.5 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white shadow-md">
            3
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              BENEFICIOS REALIZADOS Y CIERRE
            </h2>
            <p className="text-xs text-emerald-300/80">
              ¿Estamos obteniendo el valor comprometido?
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[11px] bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-md font-medium">
            Formulario 3 (NPS y Cierre a 90 Días)
          </span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="executive-card p-3 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400">Proyectos Cerrados</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">{kpis.closedProjectsCount}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        <div className="executive-card p-3 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400">Beneficio Realizado</span>
          <div className="mt-1">
            <span className="text-xl font-extrabold text-emerald-400">${kpis.realizedBenefitMXN}M</span>
            <span className="text-[10px] text-slate-400 ml-1">MXN</span>
          </div>
        </div>

        <div className="executive-card p-3 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400">ROI 90 Días Promedio</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-emerald-400">{kpis.avgROI90DaysPct}%</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        <div className="executive-card p-3 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400">Cumpl. Beneficios</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-cyan-400">{kpis.benefitCompliancePct}%</span>
          </div>
        </div>

        <div className="executive-card p-3 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400">NPS Promedio</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">{kpis.avgNPS}</span>
            <HeartHandshake className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        <div className="executive-card p-3 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400">Adopción Promedio</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-purple-400">{kpis.avgAdoptionPct}%</span>
          </div>
        </div>
      </div>

      {/* Main Bar Chart & Gauge Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: ROI Esperado vs ROI Real (8 cols) */}
        <div className="lg:col-span-8 executive-card p-4">
          <div className="flex items-center justify-between mb-3 border-b border-[#1d2d4f] pb-2">
            <h3 className="text-sm font-bold text-white tracking-wide uppercase">
              ROI ESPERADO vs ROI REAL (90 DÍAS)
            </h3>
            <div className="flex items-center space-x-4 text-[10px]">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-slate-600"></span> ROI Esperado</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-500"></span> ROI Real</span>
            </div>
          </div>

          <div className="h-60 flex items-end justify-around gap-2 pt-4 px-2">
            {closedProjects.map((prj) => (
              <div key={prj.id} className="flex flex-col items-center gap-2 flex-1 max-w-[90px]">
                <div className="w-full flex items-end justify-center gap-1.5 h-44">
                  {/* ROI Esperado Bar */}
                  <div className="w-1/2 bg-slate-600 rounded-t flex flex-col justify-between p-1 text-center" style={{ height: `${prj.roiExpectedPct * 1.5}%` }}>
                    <span className="text-[9px] font-bold text-slate-200">{prj.roiExpectedPct}%</span>
                  </div>
                  {/* ROI Real Bar */}
                  <div className="w-1/2 bg-emerald-500 rounded-t flex flex-col justify-between p-1 text-center shadow-lg shadow-emerald-950" style={{ height: `${prj.roiReal90DaysPct * 1.5}%` }}>
                    <span className="text-[9px] font-bold text-white">{prj.roiReal90DaysPct}%</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-300 font-semibold text-center line-clamp-1 truncate w-full" title={prj.name}>
                  {prj.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Benefit Realization Index (4 cols) */}
        <div className="lg:col-span-4 executive-card p-4 flex flex-col justify-between items-center text-center">
          <h3 className="text-sm font-bold text-white tracking-wide uppercase border-b border-[#1d2d4f] pb-2 w-full">
            BENEFIT REALIZATION INDEX
          </h3>

          <div className="relative w-40 h-40 my-2 flex items-center justify-center">
            {/* SVG Gauge Circle */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path className="text-slate-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path strokeWidth="3.5" strokeDasharray="94, 100" stroke="#10b981" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute text-center">
              <span className="text-3xl font-extrabold text-white">94%</span>
              <span className="block text-[9px] text-slate-400">Captura Real</span>
            </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-2 pt-2 border-t border-[#1d2d4f] text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block">Beneficios Reales</span>
              <strong className="text-emerald-400 text-sm font-extrabold">${kpis.realizedBenefitMXN}M</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Comprometidos</span>
              <strong className="text-slate-300 text-sm font-bold">${kpis.promisedBenefitMXN}M</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Delivered Projects Table & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Delivered Projects Table (8 cols) */}
        <div className="lg:col-span-8 executive-card p-4">
          <h3 className="text-sm font-bold text-white tracking-wide uppercase mb-3 border-b border-[#1d2d4f] pb-2">
            PROYECTOS ENTREGADOS Y VALIDACIÓN 90 DÍAS
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#1d2d4f] text-slate-400 text-[10px] uppercase">
                  <th className="py-2 px-2">Proyecto</th>
                  <th className="py-2 px-2 text-center">Fecha Entrega</th>
                  <th className="py-2 px-2 text-center">ROI Esperado</th>
                  <th className="py-2 px-2 text-center">ROI 90 Días</th>
                  <th className="py-2 px-2 text-center">NPS</th>
                  <th className="py-2 px-2 text-center">Estado NPS</th>
                  <th className="py-2 px-2 text-right">Adopción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#152342]">
                {closedProjects.map((prj) => (
                  <tr key={prj.id} className="hover:bg-[#132244] transition-colors">
                    <td className="py-2 px-2 font-bold text-white">{prj.name}</td>
                    <td className="py-2 px-2 text-center text-slate-300">{prj.deliveryDate}</td>
                    <td className="py-2 px-2 text-center font-medium text-slate-400">{prj.roiExpectedPct}%</td>
                    <td className="py-2 px-2 text-center font-bold text-emerald-400">{prj.roiReal90DaysPct}%</td>
                    <td className="py-2 px-2 text-center font-bold text-cyan-300">{prj.nps > 0 ? prj.nps : '—'}</td>
                    <td className="py-2 px-2 text-center">
                      {prj.npsStatus === 'Excelente' && <span className="text-emerald-400 font-bold flex items-center justify-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> {prj.npsStatus}</span>}
                      {prj.npsStatus === 'Bueno' && <span className="text-blue-400 font-bold flex items-center justify-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> {prj.npsStatus}</span>}
                      {prj.npsStatus === 'Pendiente' && <span className="text-amber-400 font-bold flex items-center justify-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> Pendiente</span>}
                    </td>
                    <td className="py-2 px-2 text-right font-bold text-purple-300">{prj.adoptionPct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Breakdown Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          {/* NPS Meter */}
          <div className="executive-card p-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">NPS POR PROYECTO</span>
              <span className="text-2xl font-extrabold text-white">74 <span className="text-xs text-slate-400">/ 100</span></span>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-emerald-400 flex items-center justify-center text-emerald-400 font-bold text-sm bg-emerald-950/40">
              74
            </div>
          </div>

          {/* Benefit distribution */}
          <div className="executive-card p-3">
            <span className="text-[10px] text-slate-400 uppercase font-bold block mb-2">DISTRIBUCIÓN DE BENEFICIOS POR ÁREA</span>
            <div className="space-y-1.5">
              {benefitAreas.map((item) => (
                <div key={item.area} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-300">{item.area}</span>
                  </div>
                  <span className="font-bold text-white">{item.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Incidents Post Go-Live */}
          <div className="executive-card p-3 bg-gradient-to-r from-[#0d162b] to-[#16274a] border border-[#1e345e]">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">INCIDENTES POST GO-LIVE</span>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-white">{kpis.totalPostGoLiveIncidents}</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                ↓ 60% vs período anterior
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
