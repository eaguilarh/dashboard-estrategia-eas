import React from 'react';
import { PortfolioKPIs, Initiative } from '../../types/dashboard';
import { HelpCircle, Sparkles, TrendingUp, DollarSign, Award, Clock } from 'lucide-react';

interface Module1Props {
  kpis: PortfolioKPIs;
  initiatives: Initiative[];
}

export const Module1Prioritization: React.FC<Module1Props> = ({ kpis, initiatives }) => {
  const categories = [
    { name: 'Transformación Digital', pct: 40, color: '#1e68d7' },
    { name: 'Customer Experience', pct: 25, color: '#10b981' },
    { name: 'Automatización', pct: 20, color: '#f59e0b' },
    { name: 'Compliance', pct: 15, color: '#ef4444' },
  ];

  return (
    <div className="space-y-4">
      {/* Module Banner Header */}
      <div className="bg-gradient-to-r from-[#0b1b3d] via-[#102450] to-[#0b1b3d] border border-[#1d3363] rounded-xl p-3.5 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-md">
            1
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              PRIORIZACIÓN Y RANKEO DE INICIATIVAS
            </h2>
            <p className="text-xs text-blue-300/80">
              ¿Qué iniciativas debemos ejecutar primero?
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[11px] bg-blue-900/60 text-cyan-300 border border-blue-500/30 px-2.5 py-1 rounded-md font-medium">
            Formulario 1 (Ingreso de Iniciativas) Integrado
          </span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="executive-card p-3 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400">Total Iniciativas</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">{kpis.totalInitiatives}</span>
            <Sparkles className="w-4 h-4 text-blue-400" />
          </div>
        </div>

        <div className="executive-card p-3 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400">Inversión Requerida</span>
          <div className="mt-1">
            <span className="text-xl font-extrabold text-emerald-400">${kpis.totalInvestmentRequired}M</span>
            <span className="text-[10px] text-slate-400 ml-1">MXN</span>
          </div>
        </div>

        <div className="executive-card p-3 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400">Beneficio Potencial</span>
          <div className="mt-1">
            <span className="text-xl font-extrabold text-purple-400">${kpis.totalPotentialBenefit}M</span>
            <span className="text-[10px] text-slate-400 ml-1">MXN</span>
          </div>
        </div>

        <div className="executive-card p-3 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400">ROI Esperado</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-amber-400">{kpis.avgExpectedROI}%</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
        </div>

        <div className="executive-card p-3 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400">Score Promedio</span>
          <div className="mt-1 flex items-baseline">
            <span className="text-2xl font-extrabold text-cyan-400">{kpis.avgScore}</span>
            <span className="text-xs text-slate-400 font-medium ml-1">/100</span>
          </div>
        </div>

        <div className="executive-card p-3 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-slate-400">Time To Value Prom.</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">{kpis.avgTimeToValueMonths}</span>
            <span className="text-xs text-slate-400">meses</span>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Matriz Valor vs Esfuerzo (7 cols) */}
        <div className="lg:col-span-7 executive-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 border-b border-[#1d2d4f] pb-2">
            <h3 className="text-sm font-bold text-white tracking-wide uppercase">
              MATRIZ VALOR VS ESFUERZO
            </h3>
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-cyan-400" /> Basado en preguntas 4-13
            </span>
          </div>

          {/* Matrix Quadrants Container */}
          <div className="relative h-64 w-full bg-[#080f1e] rounded-lg border border-[#1a294a] p-2 quadrant-bg grid grid-cols-2 grid-rows-2 gap-2">
            {/* Quadrant 1: Quick Wins (Top Left) */}
            <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-md p-2 relative flex flex-col justify-between">
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-900/40 border border-emerald-500/30 px-1.5 py-0.5 rounded w-max">
                Quick Wins
              </span>
              {/* Dots for Quick Wins */}
              <div className="absolute inset-0 p-4 pointer-events-none flex flex-wrap gap-4 items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-md shadow-emerald-400/50 cursor-pointer hover:scale-125 transition-transform" title="IA Contact Center (Score 96)" />
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-md shadow-emerald-400/50 cursor-pointer hover:scale-125 transition-transform" title="Data Analytics (Score 87)" />
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-md shadow-emerald-400/50 cursor-pointer hover:scale-125 transition-transform" title="Portal del Cliente (Score 84)" />
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-md shadow-emerald-400/50 cursor-pointer hover:scale-125 transition-transform" title="Gestión Documental (Score 81)" />
              </div>
            </div>

            {/* Quadrant 2: Apuestas Estratégicas (Top Right) */}
            <div className="bg-blue-950/20 border border-blue-500/20 rounded-md p-2 relative flex flex-col justify-between">
              <span className="text-[10px] font-bold text-cyan-400 bg-blue-900/40 border border-blue-500/30 px-1.5 py-0.5 rounded w-max">
                Apuestas Estratégicas
              </span>
              {/* Dots for Strategic */}
              <div className="absolute inset-0 p-4 pointer-events-none flex flex-wrap gap-4 items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-blue-500 shadow-md shadow-blue-400/50 cursor-pointer hover:scale-125 transition-transform" title="CRM 360° (Score 93)" />
                <div className="w-3.5 h-3.5 rounded-full bg-blue-500 shadow-md shadow-blue-400/50 cursor-pointer hover:scale-125 transition-transform" title="Automatización SAP (Score 89)" />
                <div className="w-3.5 h-3.5 rounded-full bg-blue-500 shadow-md shadow-blue-400/50 cursor-pointer hover:scale-125 transition-transform" title="App Móvil Clientes (Score 76)" />
              </div>
            </div>

            {/* Quadrant 3: Relleno (Bottom Left) */}
            <div className="bg-amber-950/20 border border-amber-500/20 rounded-md p-2 relative flex flex-col justify-between">
              <span className="text-[10px] font-bold text-amber-400 bg-amber-900/40 border border-amber-500/30 px-1.5 py-0.5 rounded w-max">
                Relleno
              </span>
              <div className="absolute inset-0 p-4 pointer-events-none flex flex-wrap gap-4 items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-md shadow-amber-400/50 cursor-pointer hover:scale-125 transition-transform" title="Firma Electrónica (Score 78)" />
                <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-md shadow-amber-400/50 cursor-pointer hover:scale-125 transition-transform" title="Chatbot IA (Score 74)" />
              </div>
            </div>

            {/* Quadrant 4: Baja Prioridad (Bottom Right) */}
            <div className="bg-rose-950/20 border border-rose-500/20 rounded-md p-2 relative flex flex-col justify-between">
              <span className="text-[10px] font-bold text-rose-400 bg-rose-900/40 border border-rose-500/30 px-1.5 py-0.5 rounded w-max">
                Baja Prioridad
              </span>
              <div className="absolute inset-0 p-4 pointer-events-none flex flex-wrap gap-4 items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-md shadow-rose-400/50 cursor-pointer hover:scale-125 transition-transform" title="Gobierno de Datos (Score 72)" />
              </div>
            </div>

            {/* Y Axis Label */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              VALOR
            </div>
            {/* X Axis Label */}
            <div className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              ESFUERZO
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400 border-t border-[#1d2d4f] pt-2">
            <span>Alto Valor / Bajo Esfuerzo = Prioridad Máxima</span>
            <span className="font-semibold text-cyan-300">10 Top Iniciativas Mapeadas</span>
          </div>
        </div>

        {/* Right Column: Top 10 Ranking Table (5 cols) */}
        <div className="lg:col-span-5 executive-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 border-b border-[#1d2d4f] pb-2">
            <h3 className="text-sm font-bold text-white tracking-wide uppercase">
              TOP 10 RANKING DE INICIATIVAS
            </h3>
            <span className="text-[10px] bg-blue-900/50 text-cyan-300 px-2 py-0.5 rounded border border-blue-500/30">
              Score 0-100
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#1d2d4f] text-slate-400 text-[10px] uppercase">
                  <th className="py-1.5 px-2">Rank</th>
                  <th className="py-1.5 px-2">Iniciativa</th>
                  <th className="py-1.5 px-2 text-center">Score</th>
                  <th className="py-1.5 px-2 text-right">ROI Esperado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#152342]">
                {initiatives.slice(0, 10).map((item) => (
                  <tr key={item.id} className="hover:bg-[#132244] transition-colors">
                    <td className="py-1.5 px-2 font-bold text-cyan-400 text-center w-8">
                      {item.rank}
                    </td>
                    <td className="py-1.5 px-2 font-semibold text-white">
                      {item.name}
                    </td>
                    <td className="py-1.5 px-2 text-center">
                      <span className="px-2 py-0.5 rounded font-extrabold bg-blue-950 text-blue-300 border border-blue-600/40">
                        {item.score}
                      </span>
                    </td>
                    <td className="py-1.5 px-2 text-right font-bold text-emerald-400">
                      {item.roiExpected}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-2 text-[10px] text-slate-400 italic text-right">
            Ponderación basada en ahorro de tiempo, impacto económico y viabilidad
          </div>
        </div>
      </div>

      {/* Bottom Section: Distribución Estratégica & Footnote */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-6 executive-card p-4">
          <h3 className="text-sm font-bold text-white tracking-wide uppercase mb-3 border-b border-[#1d2d4f] pb-2">
            DISTRIBUCIÓN ESTRATÉGICA
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-around gap-4">
            {/* Custom Donut graphic */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-slate-800" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path strokeWidth="4" strokeDasharray="40, 100" stroke="#1e68d7" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" />
                <path strokeWidth="4" strokeDasharray="25, 100" strokeDashoffset="-40" stroke="#10b981" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" />
                <path strokeWidth="4" strokeDasharray="20, 100" strokeDashoffset="-65" stroke="#f59e0b" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" />
                <path strokeWidth="4" strokeDasharray="15, 100" strokeDashoffset="-85" stroke="#ef4444" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" />
              </svg>
              <div className="absolute text-center">
                <span className="text-lg font-bold text-white">100%</span>
                <span className="block text-[9px] text-slate-400">Categorías</span>
              </div>
            </div>

            {/* Legend list */}
            <div className="space-y-2 w-full max-w-xs">
              {categories.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: cat.color }} />
                    <span className="text-slate-300 font-medium">{cat.name}</span>
                  </div>
                  <span className="font-bold text-white">{cat.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Informative footer card */}
        <div className="lg:col-span-6 bg-[#091224] border border-[#1b2c4e] rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-full bg-blue-900/50 text-cyan-300 border border-blue-500/30">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Metodología de Ponderación Automática</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Score final de 0 a 100 evaluado mediante 10 criterios clave. Mayor score = Mayor prioridad de ejecución.
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-cyan-400 bg-blue-950 border border-blue-500/40 px-3 py-1.5 rounded-lg whitespace-nowrap hidden sm:inline-block">
            Algoritmo Activo
          </span>
        </div>
      </div>
    </div>
  );
};
