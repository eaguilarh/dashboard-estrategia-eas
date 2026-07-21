import React from 'react';
import { PortfolioKPIs, PortfolioAlert, ViewMode } from '../../types/dashboard';
import { LayoutDashboard, ArrowRight, AlertTriangle, ShieldAlert, CheckCircle, TrendingUp, DollarSign, Award, Layers } from 'lucide-react';

interface ExecutiveCockpitProps {
  kpis: PortfolioKPIs;
  alerts: PortfolioAlert[];
  onNavigate: (view: ViewMode) => void;
}

export const ExecutiveCockpit: React.FC<ExecutiveCockpitProps> = ({ kpis, alerts, onNavigate }) => {
  return (
    <div className="space-y-4">
      {/* Resumen Ejecutivo Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="executive-card p-3 border-l-4 border-l-blue-500">
          <span className="text-2xl font-black text-white">{kpis.funnelIdeas}</span>
          <span className="block text-[11px] text-slate-400 font-medium mt-0.5">Ideas / Iniciativas</span>
        </div>

        <div className="executive-card p-3 border-l-4 border-l-cyan-500">
          <span className="text-2xl font-black text-white">{kpis.funnelPrioritized}</span>
          <span className="block text-[11px] text-slate-400 font-medium mt-0.5">Priorizadas</span>
        </div>

        <div className="executive-card p-3 border-l-4 border-l-emerald-500">
          <span className="text-2xl font-black text-white">{kpis.funnelApproved}</span>
          <span className="block text-[11px] text-slate-400 font-medium mt-0.5">Aprobadas</span>
        </div>

        <div className="executive-card p-3 border-l-4 border-l-amber-500">
          <span className="text-2xl font-black text-amber-400">{kpis.funnelInConstruction}</span>
          <span className="block text-[11px] text-slate-400 font-medium mt-0.5">En Construcción</span>
        </div>

        <div className="executive-card p-3 border-l-4 border-l-purple-500">
          <span className="text-2xl font-black text-white">{kpis.funnelProductive}</span>
          <span className="block text-[11px] text-slate-400 font-medium mt-0.5">Productivas</span>
        </div>

        <div className="executive-card p-3 border-l-4 border-l-emerald-400">
          <span className="text-2xl font-black text-emerald-400">{kpis.funnelRoiMeasured}</span>
          <span className="block text-[11px] text-slate-400 font-medium mt-0.5">Con ROI Medido</span>
        </div>
      </div>

      {/* Main Cockpit Section: Funnel, Roadmap, KPIs, Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Embudo de Valor Stage-Gate (3 cols) */}
        <div className="lg:col-span-3 executive-card p-4 flex flex-col justify-between">
          <h3 className="text-xs font-bold text-white tracking-wide uppercase border-b border-[#1d2d4f] pb-2">
            EMBUDO DE VALOR (STAGE-GATE)
          </h3>

          <div className="py-2 space-y-1.5 text-center text-xs">
            <div className="bg-blue-600/90 text-white font-bold py-1.5 px-3 rounded shadow clip-funnel-1 flex justify-between items-center text-[11px]">
              <span>Ideas / Iniciativas</span>
              <span className="bg-blue-900 px-2 py-0.5 rounded text-white font-black">{kpis.funnelIdeas}</span>
            </div>
            <div className="bg-cyan-600/90 text-white font-bold py-1.5 px-4 rounded shadow clip-funnel-2 flex justify-between items-center text-[11px] mx-1">
              <span>Priorizadas</span>
              <span className="bg-cyan-950 px-2 py-0.5 rounded text-white font-black">{kpis.funnelPrioritized}</span>
            </div>
            <div className="bg-emerald-600/90 text-white font-bold py-1.5 px-4 rounded shadow clip-funnel-3 flex justify-between items-center text-[11px] mx-2">
              <span>Aprobadas</span>
              <span className="bg-emerald-950 px-2 py-0.5 rounded text-white font-black">{kpis.funnelApproved}</span>
            </div>
            <div className="bg-amber-600/90 text-white font-bold py-1.5 px-3 rounded shadow clip-funnel-4 flex justify-between items-center text-[11px] mx-3">
              <span>En Construcción</span>
              <span className="bg-amber-950 px-2 py-0.5 rounded text-white font-black">{kpis.funnelInConstruction}</span>
            </div>
            <div className="bg-purple-600/90 text-white font-bold py-1.5 px-2 rounded shadow clip-funnel-5 flex justify-between items-center text-[11px] mx-4">
              <span>Productivas (Go-Live)</span>
              <span className="bg-purple-950 px-2 py-0.5 rounded text-white font-black">{kpis.funnelProductive}</span>
            </div>
            <div className="bg-emerald-500 text-slate-950 font-black py-1.5 px-2 rounded shadow flex justify-between items-center text-[11px] mx-5">
              <span>Con ROI Medido</span>
              <span className="bg-slate-900 px-2 py-0.5 rounded text-emerald-400">{kpis.funnelRoiMeasured}</span>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 text-center border-t border-[#1d2d4f] pt-2">
            Conversión de concepto a beneficio real
          </div>
        </div>

        {/* Roadmap Estratégico - Próximos 12 Meses (5 cols) */}
        <div className="lg:col-span-5 executive-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#1d2d4f] pb-2">
            <h3 className="text-xs font-bold text-white tracking-wide uppercase">
              ROADMAP ESTRATÉGICO - PRÓXIMOS 12 MESES
            </h3>
            <span className="text-[10px] text-slate-400">2024</span>
          </div>

          <div className="space-y-3 py-2 text-xs">
            <div className="grid grid-cols-5 text-[10px] text-slate-400 font-bold border-b border-[#152342] pb-1 text-center">
              <span className="text-left col-span-1">Proyecto</span>
              <span>Q1 2024</span>
              <span>Q2 2024</span>
              <span>Q3 2024</span>
              <span>Q4 2024</span>
            </div>

            {/* Project Bars */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="w-28 font-semibold text-slate-200 text-[11px] truncate">IA Generativa</span>
                <div className="flex-1 bg-[#091122] h-4 rounded overflow-hidden relative ml-2 border border-[#1a2a4c]">
                  <div className="absolute left-0 w-3/5 h-full bg-blue-600 rounded" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="w-28 font-semibold text-slate-200 text-[11px] truncate">CRM 360°</span>
                <div className="flex-1 bg-[#091122] h-4 rounded overflow-hidden relative ml-2 border border-[#1a2a4c]">
                  <div className="absolute left-[10%] w-3/4 h-full bg-emerald-600 rounded" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="w-28 font-semibold text-slate-200 text-[11px] truncate">Automatización SAP</span>
                <div className="flex-1 bg-[#091122] h-4 rounded overflow-hidden relative ml-2 border border-[#1a2a4c]">
                  <div className="absolute left-[45%] w-1/2 h-full bg-purple-600 rounded" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="w-28 font-semibold text-slate-200 text-[11px] truncate">Data Analytics</span>
                <div className="flex-1 bg-[#091122] h-4 rounded overflow-hidden relative ml-2 border border-[#1a2a4c]">
                  <div className="absolute left-[25%] w-3/5 h-full bg-amber-600 rounded" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="w-28 font-semibold text-slate-200 text-[11px] truncate">Portal del Cliente</span>
                <div className="flex-1 bg-[#091122] h-4 rounded overflow-hidden relative ml-2 border border-[#1a2a4c]">
                  <div className="absolute left-[50%] w-2/5 h-full bg-cyan-600 rounded" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 border-t border-[#1d2d4f] pt-2 flex justify-between">
            <span>Línea temporal ajustada a entregas ejecutivas</span>
            <span className="text-cyan-400 font-semibold">Q1-Q4 Visión</span>
          </div>
        </div>

        {/* KPIs Clave del Portafolio (4 cols) */}
        <div className="lg:col-span-4 executive-card p-4">
          <h3 className="text-xs font-bold text-white tracking-wide uppercase border-b border-[#1d2d4f] pb-2 mb-3">
            KPIS CLAVE DEL PORTAFOLIO
          </h3>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-[#0b162c] p-2.5 rounded-lg border border-[#1a2948]">
              <span className="text-[10px] text-slate-400 block">Inversión Total</span>
              <strong className="text-emerald-400 text-base font-extrabold">${kpis.totalInvestmentRequired}M <span className="text-[10px] text-slate-400 font-normal">MXN</span></strong>
            </div>

            <div className="bg-[#0b162c] p-2.5 rounded-lg border border-[#1a2948]">
              <span className="text-[10px] text-slate-400 block">Proyectos Activos</span>
              <strong className="text-white text-base font-extrabold">{kpis.activeProjects}</strong>
            </div>

            <div className="bg-[#0b162c] p-2.5 rounded-lg border border-[#1a2948]">
              <span className="text-[10px] text-slate-400 block">Beneficio Esperado</span>
              <strong className="text-purple-400 text-base font-extrabold">${kpis.totalPotentialBenefit}M <span className="text-[10px] text-slate-400 font-normal">MXN</span></strong>
            </div>

            <div className="bg-[#0b162c] p-2.5 rounded-lg border border-[#1a2948]">
              <span className="text-[10px] text-slate-400 block">Proyectos en Riesgo</span>
              <strong className="text-rose-400 text-base font-extrabold">{kpis.projectsInRisk}</strong>
            </div>

            <div className="bg-[#0b162c] p-2.5 rounded-lg border border-[#1a2948]">
              <span className="text-[10px] text-slate-400 block">ROI Promedio</span>
              <strong className="text-amber-400 text-base font-extrabold">{kpis.avgExpectedROI}%</strong>
            </div>

            <div className="bg-[#0b162c] p-2.5 rounded-lg border border-[#1a2948]">
              <span className="text-[10px] text-slate-400 block">Beneficio Realizado</span>
              <strong className="text-emerald-400 text-base font-extrabold">${kpis.realizedBenefitMXN}M <span className="text-[10px] text-slate-400 font-normal">MXN</span></strong>
            </div>

            <div className="bg-[#0b162c] p-2.5 rounded-lg border border-[#1a2948]">
              <span className="text-[10px] text-slate-400 block">% Proyectos On Track</span>
              <strong className="text-emerald-400 text-base font-extrabold">{kpis.pctOnTrack}%</strong>
            </div>

            <div className="bg-[#0b162c] p-2.5 rounded-lg border border-[#1a2948]">
              <span className="text-[10px] text-slate-400 block">NPS Promedio</span>
              <strong className="text-cyan-400 text-base font-extrabold">{kpis.avgNPS}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Alertas Principales & Recommended Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Alertas Principales (12 cols) */}
        <div className="lg:col-span-12 executive-card p-4">
          <div className="flex items-center justify-between mb-3 border-b border-[#1d2d4f] pb-2">
            <h3 className="text-xs font-bold text-white tracking-wide uppercase flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" /> ALERTAS PRINCIPALES DEL PORTAFOLIO
            </h3>
            <span className="text-[10px] bg-rose-950 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded font-bold">
              Atención PMO Requerida
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="bg-[#0d172c] border border-[#1b2b4e] rounded-lg p-3 flex items-start space-x-2.5">
                <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                  alert.type === 'danger' ? 'text-rose-400' : alert.type === 'warning' ? 'text-amber-400' : 'text-blue-400'
                }`} />
                <span className="text-xs text-slate-300 font-medium leading-tight">{alert.message}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Navigation Footer */}
        <div className="lg:col-span-12 bg-gradient-to-r from-blue-950 via-[#0d1e3d] to-blue-950 border border-blue-500/30 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-cyan-300 font-medium">
            <Layers className="w-4 h-4" />
            <span>Navegación recomendada del dashboard:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => onNavigate('iniciativas')} className="px-3 py-1 bg-blue-900/60 hover:bg-blue-600 text-white rounded border border-blue-400/30 transition-colors font-semibold">
              1. Iniciativas →
            </button>
            <button onClick={() => onNavigate('proyectos')} className="px-3 py-1 bg-blue-900/60 hover:bg-blue-600 text-white rounded border border-blue-400/30 transition-colors font-semibold">
              2. Proyectos →
            </button>
            <button onClick={() => onNavigate('beneficios')} className="px-3 py-1 bg-blue-900/60 hover:bg-blue-600 text-white rounded border border-blue-400/30 transition-colors font-semibold">
              3. Beneficios →
            </button>
            <button onClick={() => onNavigate('nps')} className="px-3 py-1 bg-blue-900/60 hover:bg-blue-600 text-white rounded border border-blue-400/30 transition-colors font-semibold">
              4. NPS / Adopción →
            </button>
            <button onClick={() => onNavigate('pmo')} className="px-3 py-1 bg-blue-900/60 hover:bg-blue-600 text-white rounded border border-blue-400/30 transition-colors font-semibold">
              5. PMO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
