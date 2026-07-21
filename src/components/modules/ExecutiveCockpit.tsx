import React from 'react';
import { PortfolioKPIs, PortfolioAlert, ViewMode } from '../../types/dashboard';
import { AlertTriangle, Layers, ArrowRight, CheckCircle2, ShieldCheck, TrendingUp, DollarSign } from 'lucide-react';

interface ExecutiveCockpitProps {
  kpis: PortfolioKPIs;
  alerts: PortfolioAlert[];
  onNavigate: (view: ViewMode) => void;
  theme?: 'dark' | 'light';
}

export const ExecutiveCockpit: React.FC<ExecutiveCockpitProps> = ({ kpis, alerts, onNavigate, theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <div className="space-y-4 text-left">
      {/* Banner Header for Executive Cockpit */}
      <div className={`border rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-2 shadow-md transition-colors ${
        isDark ? 'bg-gradient-to-r from-[#0b132b] via-[#102144] to-[#0b132b] border-[#1d325e]' : 'bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-slate-800 text-white'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-blue-600 text-white font-extrabold text-lg shadow">
            📊
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white tracking-tight uppercase">
              EXECUTIVE COCKPIT - VISIÓN INTEGRAL DEL PORTAFOLIO
            </h2>
            <p className="text-xs text-blue-200/90 font-medium">
              Del concepto al valor real para el negocio • Trazabilidad End-to-End EAS Consulting
            </p>
          </div>
        </div>
        <div className="text-right text-xs">
          <span className="bg-blue-950 text-cyan-300 border border-blue-500/40 px-3 py-1 rounded-md font-bold">
            Flujo Integrado de Portafolio
          </span>
        </div>
      </div>

      {/* Cadena de Trazabilidad Visual (End-to-End Traceability Ribbon) */}
      <div className={`p-3 rounded-xl border transition-colors ${
        isDark ? 'bg-[#0a1428] border-[#1a2d52]' : 'bg-blue-50/80 border-blue-200 shadow-sm'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5 ${
            isDark ? 'text-cyan-400' : 'text-blue-900'
          }`}>
            <Layers className="w-3.5 h-3.5" /> Trazabilidad de Ciclo de Vida: Forms 1 (Captura) ➔ Forms 2 (Ejecución) ➔ Forms 3 (ROI 90 Días)
          </span>
          <span className={`text-[9px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            100% Datos Conectados
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2 text-center text-xs">
          <div className={`p-2 rounded-lg border ${isDark ? 'bg-[#0e1933] border-[#1f3460]' : 'bg-white border-slate-200 shadow-xs'}`}>
            <span className="text-[9px] text-blue-500 font-bold block">1. FORMS 1 (IDEAS)</span>
            <strong className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{kpis.funnelIdeas}</strong>
            <span className="text-[8px] text-slate-400 block">Postulaciones</span>
          </div>

          <div className={`p-2 rounded-lg border ${isDark ? 'bg-[#0e1933] border-[#1f3460]' : 'bg-white border-slate-200 shadow-xs'}`}>
            <span className="text-[9px] text-cyan-500 font-bold block">2. PRIORIZADAS</span>
            <strong className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{kpis.funnelPrioritized}</strong>
            <span className="text-[8px] text-slate-400 block">Score {kpis.avgScore}/100 ($68M)</span>
          </div>

          <div className={`p-2 rounded-lg border ${isDark ? 'bg-[#0e1933] border-[#1f3460]' : 'bg-white border-slate-200 shadow-xs'}`}>
            <span className="text-[9px] text-emerald-500 font-bold block">3. APROBADAS</span>
            <strong className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{kpis.funnelApproved}</strong>
            <span className="text-[8px] text-slate-400 block">Presupuesto $66M</span>
          </div>

          <div className={`p-2 rounded-lg border ${isDark ? 'bg-[#0e1933] border-[#1f3460]' : 'bg-white border-slate-200 shadow-xs'}`}>
            <span className="text-[9px] text-amber-500 font-bold block">4. FORMS 2 (GANTT)</span>
            <strong className="text-base font-black text-amber-500">{kpis.funnelInConstruction}</strong>
            <span className="text-[8px] text-slate-400 block">22 On Track | 6 Riesgo</span>
          </div>

          <div className={`p-2 rounded-lg border ${isDark ? 'bg-[#0e1933] border-[#1f3460]' : 'bg-white border-slate-200 shadow-xs'}`}>
            <span className="text-[9px] text-purple-500 font-bold block">5. GO-LIVE</span>
            <strong className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{kpis.funnelProductive}</strong>
            <span className="text-[8px] text-slate-400 block">NPS {kpis.avgNPS} | Adop. 85%</span>
          </div>

          <div className={`p-2 rounded-lg border ${isDark ? 'bg-[#0e1933] border-[#1f3460]' : 'bg-white border-slate-200 shadow-xs'}`}>
            <span className="text-[9px] text-emerald-500 font-bold block">6. FORMS 3 (ROI 90D)</span>
            <strong className="text-base font-black text-emerald-500">{kpis.funnelRoiMeasured}</strong>
            <span className="text-[8px] text-slate-400 block">$96M Realizados (94%)</span>
          </div>
        </div>
      </div>

      {/* Main Cockpit Section: Funnel, Roadmap, KPIs */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3">
        {/* Embudo de Valor Stage-Gate (3 cols) */}
        <div className={`xl:col-span-3 p-3.5 rounded-xl border flex flex-col justify-between transition-colors ${
          isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h3 className={`text-xs font-bold tracking-wide uppercase border-b pb-1.5 ${isDark ? 'border-[#1d2d4f] text-white' : 'border-slate-200 text-slate-900'}`}>
            EMBUDO DE VALOR (STAGE-GATE)
          </h3>

          <div className="py-2 space-y-1.5 text-center text-xs">
            <div className="bg-blue-600 text-white font-bold py-1.5 px-3 rounded shadow flex justify-between items-center text-[11px]">
              <span>Ideas (Forms 1)</span>
              <span className="bg-blue-900 px-2 py-0.5 rounded text-white font-black">{kpis.funnelIdeas}</span>
            </div>
            <div className="bg-cyan-600 text-white font-bold py-1.5 px-3 rounded shadow flex justify-between items-center text-[11px]">
              <span>Priorizadas (Score)</span>
              <span className="bg-cyan-950 px-2 py-0.5 rounded text-white font-black">{kpis.funnelPrioritized}</span>
            </div>
            <div className="bg-emerald-600 text-white font-bold py-1.5 px-3 rounded shadow flex justify-between items-center text-[11px]">
              <span>Aprobadas ($66M)</span>
              <span className="bg-emerald-950 px-2 py-0.5 rounded text-white font-black">{kpis.funnelApproved}</span>
            </div>
            <div className="bg-amber-600 text-white font-bold py-1.5 px-3 rounded shadow flex justify-between items-center text-[11px]">
              <span>En Construcción (Forms 2)</span>
              <span className="bg-amber-950 px-2 py-0.5 rounded text-white font-black">{kpis.funnelInConstruction}</span>
            </div>
            <div className="bg-purple-600 text-white font-bold py-1.5 px-3 rounded shadow flex justify-between items-center text-[11px]">
              <span>Productivas (Go-Live)</span>
              <span className="bg-purple-950 px-2 py-0.5 rounded text-white font-black">{kpis.funnelProductive}</span>
            </div>
            <div className="bg-emerald-500 text-slate-950 font-black py-1.5 px-3 rounded shadow flex justify-between items-center text-[11px]">
              <span>ROI Medido (Forms 3)</span>
              <span className="bg-slate-900 px-2 py-0.5 rounded text-emerald-400 font-black">{kpis.funnelRoiMeasured}</span>
            </div>
          </div>

          <div className={`text-[9px] text-center border-t pt-1.5 ${isDark ? 'border-[#1d2d4f] text-slate-400' : 'border-slate-200 text-slate-500'}`}>
            Conversión de concepto a beneficio real
          </div>
        </div>

        {/* Roadmap Estratégico - Próximos 12 Meses (5 cols) */}
        <div className={`xl:col-span-5 p-3.5 rounded-xl border flex flex-col justify-between transition-colors ${
          isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className={`flex items-center justify-between border-b pb-1.5 ${isDark ? 'border-[#1d2d4f]' : 'border-slate-200'}`}>
            <h3 className={`text-xs font-bold tracking-wide uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
              ROADMAP ESTRATÉGICO - PRÓXIMOS 12 MESES
            </h3>
            <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>2026</span>
          </div>

          <div className="space-y-2 py-2 text-xs">
            <div className={`grid grid-cols-5 text-[9px] font-bold border-b pb-1 text-center ${
              isDark ? 'border-[#152342] text-slate-400' : 'border-slate-200 text-slate-500'
            }`}>
              <span className="text-left col-span-1">Proyecto</span>
              <span>Q1 2026</span>
              <span>Q2 2026</span>
              <span>Q3 2026</span>
              <span>Q4 2026</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`w-28 font-semibold text-[11px] truncate ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>IA Generativa</span>
                <div className={`flex-1 h-3.5 rounded overflow-hidden relative ml-2 border ${
                  isDark ? 'bg-[#091122] border-[#1a2a4c]' : 'bg-slate-100 border-slate-200'
                }`}>
                  <div className="absolute left-0 w-3/5 h-full bg-blue-600 rounded" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`w-28 font-semibold text-[11px] truncate ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>CRM 360°</span>
                <div className={`flex-1 h-3.5 rounded overflow-hidden relative ml-2 border ${
                  isDark ? 'bg-[#091122] border-[#1a2a4c]' : 'bg-slate-100 border-slate-200'
                }`}>
                  <div className="absolute left-[10%] w-3/4 h-full bg-emerald-600 rounded" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`w-28 font-semibold text-[11px] truncate ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Automatización SAP</span>
                <div className={`flex-1 h-3.5 rounded overflow-hidden relative ml-2 border ${
                  isDark ? 'bg-[#091122] border-[#1a2a4c]' : 'bg-slate-100 border-slate-200'
                }`}>
                  <div className="absolute left-[45%] w-1/2 h-full bg-purple-600 rounded" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`w-28 font-semibold text-[11px] truncate ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Data Analytics</span>
                <div className={`flex-1 h-3.5 rounded overflow-hidden relative ml-2 border ${
                  isDark ? 'bg-[#091122] border-[#1a2a4c]' : 'bg-slate-100 border-slate-200'
                }`}>
                  <div className="absolute left-[25%] w-3/5 h-full bg-amber-600 rounded" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className={`w-28 font-semibold text-[11px] truncate ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Portal del Cliente</span>
                <div className={`flex-1 h-3.5 rounded overflow-hidden relative ml-2 border ${
                  isDark ? 'bg-[#091122] border-[#1a2a4c]' : 'bg-slate-100 border-slate-200'
                }`}>
                  <div className="absolute left-[50%] w-2/5 h-full bg-cyan-600 rounded" />
                </div>
              </div>
            </div>
          </div>

          <div className={`text-[9px] border-t pt-1.5 flex justify-between ${
            isDark ? 'border-[#1d2d4f] text-slate-400' : 'border-slate-200 text-slate-500'
          }`}>
            <span>Línea temporal ajustada a entregas ejecutivas</span>
            <span className="text-cyan-500 font-semibold">Q1-Q4 Visión</span>
          </div>
        </div>

        {/* KPIs Clave del Portafolio (4 cols) */}
        <div className={`xl:col-span-4 p-3.5 rounded-xl border transition-colors ${
          isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h3 className={`text-xs font-bold tracking-wide uppercase border-b pb-1.5 mb-2.5 ${isDark ? 'border-[#1d2d4f] text-white' : 'border-slate-200 text-slate-900'}`}>
            KPIS CLAVE DEL PORTAFOLIO
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className={`p-2 rounded-lg border ${isDark ? 'bg-[#0b162c] border-[#1a2948]' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`text-[9px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Inversión Solicitada</span>
              <strong className="text-emerald-500 text-sm font-extrabold">${kpis.totalInvestmentRequired}M <span className="text-[9px] font-normal">MXN</span></strong>
            </div>

            <div className={`p-2 rounded-lg border ${isDark ? 'bg-[#0b162c] border-[#1a2948]' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`text-[9px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Proyectos Activos</span>
              <strong className={`text-sm font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>{kpis.activeProjects}</strong>
            </div>

            <div className={`p-2 rounded-lg border ${isDark ? 'bg-[#0b162c] border-[#1a2948]' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`text-[9px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Beneficio Esperado</span>
              <strong className="text-purple-500 text-sm font-extrabold">${kpis.totalPotentialBenefit}M <span className="text-[9px] font-normal">MXN</span></strong>
            </div>

            <div className={`p-2 rounded-lg border ${isDark ? 'bg-[#0b162c] border-[#1a2948]' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`text-[9px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Proyectos en Riesgo</span>
              <strong className="text-rose-500 text-sm font-extrabold">{kpis.projectsInRisk}</strong>
            </div>

            <div className={`p-2 rounded-lg border ${isDark ? 'bg-[#0b162c] border-[#1a2948]' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`text-[9px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>ROI Promedio</span>
              <strong className="text-amber-500 text-sm font-extrabold">{kpis.avgExpectedROI}%</strong>
            </div>

            <div className={`p-2 rounded-lg border ${isDark ? 'bg-[#0b162c] border-[#1a2948]' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`text-[9px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Beneficio Realizado</span>
              <strong className="text-emerald-500 text-sm font-extrabold">${kpis.realizedBenefitMXN}M <span className="text-[9px] font-normal">MXN</span></strong>
            </div>

            <div className={`p-2 rounded-lg border ${isDark ? 'bg-[#0b162c] border-[#1a2948]' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`text-[9px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>% Proyectos On Track</span>
              <strong className="text-emerald-500 text-sm font-extrabold">{kpis.pctOnTrack}%</strong>
            </div>

            <div className={`p-2 rounded-lg border ${isDark ? 'bg-[#0b162c] border-[#1a2948]' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`text-[9px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>NPS Promedio</span>
              <strong className="text-cyan-500 text-sm font-extrabold">{kpis.avgNPS}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Alertas Principales & Recommended Navigation */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3">
        {/* Alertas Principales (12 cols) */}
        <div className={`xl:col-span-12 p-3.5 rounded-xl border transition-colors ${
          isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className={`flex items-center justify-between mb-2 pb-1.5 border-b ${isDark ? 'border-[#1d2d4f]' : 'border-slate-200'}`}>
            <h3 className={`text-xs font-bold tracking-wide uppercase flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <AlertTriangle className="w-4 h-4 text-amber-500" /> ALERTAS PRINCIPALES DEL PORTAFOLIO
            </h3>
            <span className="text-[9px] bg-rose-500/10 text-rose-600 border border-rose-300 px-2 py-0.5 rounded font-bold">
              Atención PMO Requerida
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-2.5 rounded-lg border flex items-start space-x-2 ${
                isDark ? 'bg-[#0d172c] border-[#1b2b4e]' : 'bg-slate-50 border-slate-200'
              }`}>
                <AlertTriangle className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                  alert.type === 'danger' ? 'text-rose-500' : alert.type === 'warning' ? 'text-amber-500' : 'text-blue-500'
                }`} />
                <span className={`text-xs font-medium leading-tight ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{alert.message}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Navigation Footer */}
        <div className={`xl:col-span-12 border rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs transition-colors ${
          isDark ? 'bg-gradient-to-r from-blue-950 via-[#0d1e3d] to-blue-950 border-blue-500/30' : 'bg-blue-50 border-blue-200 text-blue-900'
        }`}>
          <div className="flex items-center space-x-2 font-medium">
            <Layers className="w-4 h-4 text-blue-500" />
            <span className={isDark ? 'text-cyan-300' : 'text-blue-900'}>Navegación recomendada del dashboard:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button onClick={() => onNavigate('iniciativas')} className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-semibold text-xs shadow-sm transition-colors">
              1. Iniciativas →
            </button>
            <button onClick={() => onNavigate('proyectos')} className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-semibold text-xs shadow-sm transition-colors">
              2. Proyectos →
            </button>
            <button onClick={() => onNavigate('beneficios')} className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-semibold text-xs shadow-sm transition-colors">
              3. Beneficios →
            </button>
            <button onClick={() => onNavigate('nps')} className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-semibold text-xs shadow-sm transition-colors">
              4. NPS / Adopción →
            </button>
            <button onClick={() => onNavigate('pmo')} className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-semibold text-xs shadow-sm transition-colors">
              5. PMO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
