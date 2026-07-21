import React from 'react';
import { PortfolioKPIs, Initiative } from '../../types/dashboard';
import { Sparkles, TrendingUp, HelpCircle } from 'lucide-react';

interface Module1Props {
  kpis: PortfolioKPIs;
  initiatives: Initiative[];
  theme?: 'dark' | 'light';
}

export const Module1Prioritization: React.FC<Module1Props> = ({ kpis, initiatives, theme = 'dark' }) => {
  const isDark = theme === 'dark';

  const categories = [
    { name: 'Transformación Digital', pct: 40, color: '#1e68d7' },
    { name: 'Customer Experience', pct: 25, color: '#10b981' },
    { name: 'Automatización', pct: 20, color: '#f59e0b' },
    { name: 'Compliance', pct: 15, color: '#ef4444' },
  ];

  return (
    <div className="space-y-4 text-left">
      {/* Module Banner Header */}
      <div className={`border rounded-xl p-3 flex items-center justify-between shadow-md transition-colors ${
        isDark ? 'bg-gradient-to-r from-[#0b1b3d] via-[#102450] to-[#0b1b3d] border-[#1d3363]' : 'bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 border-blue-800 text-white'
      }`}>
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-extrabold text-white text-sm shadow">
            1
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight uppercase">
              PRIORIZACIÓN Y RANKEO DE INICIATIVAS
            </h2>
            <p className="text-[11px] text-blue-200/90 font-medium">
              ¿Qué iniciativas debemos ejecutar primero?
            </p>
          </div>
        </div>
        <div className="hidden sm:block text-right">
          <span className="text-[10px] bg-blue-950/80 text-cyan-300 border border-blue-400/40 px-2 py-0.5 rounded font-semibold">
            Forms 1 Ponderado
          </span>
        </div>
      </div>

      {/* KPI Cards Row (6 Metric Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        <div className={`p-2.5 rounded-xl border flex flex-col justify-between transition-colors ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <span className={`text-[10px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Total Iniciativas</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>{kpis.totalInitiatives}</span>
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border flex flex-col justify-between transition-colors ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <span className={`text-[10px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Inversión Requerida</span>
          <div className="mt-1">
            <span className="text-lg font-extrabold text-emerald-500">${kpis.totalInvestmentRequired}M</span>
            <span className={`text-[9px] ml-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>MXN</span>
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border flex flex-col justify-between transition-colors ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <span className={`text-[10px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Beneficio Potencial</span>
          <div className="mt-1">
            <span className="text-lg font-extrabold text-purple-500">${kpis.totalPotentialBenefit}M</span>
            <span className={`text-[9px] ml-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>MXN</span>
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border flex flex-col justify-between transition-colors ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <span className={`text-[10px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>ROI Esperado</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-xl font-extrabold text-amber-500">{kpis.avgExpectedROI}%</span>
            <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border flex flex-col justify-between transition-colors ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <span className={`text-[10px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Score Promedio</span>
          <div className="mt-1 flex items-baseline">
            <span className="text-xl font-extrabold text-cyan-500">{kpis.avgScore}</span>
            <span className={`text-[10px] ml-0.5 font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>/100</span>
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border flex flex-col justify-between transition-colors ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <span className={`text-[10px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Time To Value Prom.</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className={`text-xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>{kpis.avgTimeToValueMonths}</span>
            <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>meses</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Matriz Valor vs Esfuerzo & Top 10 Ranking */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3">
        {/* Matriz Valor vs Esfuerzo (7 cols) */}
        <div className={`xl:col-span-7 p-3.5 rounded-xl border flex flex-col justify-between transition-colors ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className={`flex items-center justify-between mb-2 pb-1.5 border-b ${isDark ? 'border-[#1d2d4f]' : 'border-slate-200'}`}>
            <h3 className={`text-xs font-bold tracking-wide uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
              MATRIZ VALOR VS ESFUERZO
            </h3>
            <span className={`text-[9px] flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <HelpCircle className="w-3 h-3 text-cyan-500" /> Preguntas 4-13
            </span>
          </div>

          {/* Quadrants Grid */}
          <div className={`relative h-60 w-full rounded-lg border p-2 quadrant-bg grid grid-cols-2 grid-rows-2 gap-2 ${
            isDark ? 'bg-[#080f1e] border-[#1a294a]' : 'bg-slate-50 border-slate-200'
          }`}>
            {/* Quick Wins (Top Left) */}
            <div className={`border rounded-md p-2 relative flex flex-col justify-between ${isDark ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200'}`}>
              <span className="text-[9px] font-bold text-emerald-600 bg-emerald-100 border border-emerald-300 px-1.5 py-0.5 rounded w-max">
                Quick Wins
              </span>
              <div className="absolute inset-0 p-3 pointer-events-none flex flex-wrap gap-3 items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-md cursor-pointer hover:scale-125 transition-transform" title="IA Contact Center (Score 96)" />
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-md cursor-pointer hover:scale-125 transition-transform" title="Data Analytics (Score 87)" />
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-md cursor-pointer hover:scale-125 transition-transform" title="Portal del Cliente (Score 84)" />
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-md cursor-pointer hover:scale-125 transition-transform" title="Gestión Documental (Score 81)" />
              </div>
            </div>

            {/* Apuestas Estratégicas (Top Right) */}
            <div className={`border rounded-md p-2 relative flex flex-col justify-between ${isDark ? 'bg-blue-950/20 border-blue-500/30' : 'bg-blue-50 border-blue-200'}`}>
              <span className="text-[9px] font-bold text-blue-600 bg-blue-100 border border-blue-300 px-1.5 py-0.5 rounded w-max">
                Apuestas Estratégicas
              </span>
              <div className="absolute inset-0 p-3 pointer-events-none flex flex-wrap gap-3 items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-blue-600 shadow-md cursor-pointer hover:scale-125 transition-transform" title="CRM 360° (Score 93)" />
                <div className="w-3.5 h-3.5 rounded-full bg-blue-600 shadow-md cursor-pointer hover:scale-125 transition-transform" title="Automatización SAP (Score 89)" />
                <div className="w-3.5 h-3.5 rounded-full bg-blue-600 shadow-md cursor-pointer hover:scale-125 transition-transform" title="App Móvil Clientes (Score 76)" />
              </div>
            </div>

            {/* Relleno (Bottom Left) */}
            <div className={`border rounded-md p-2 relative flex flex-col justify-between ${isDark ? 'bg-amber-950/20 border-amber-500/30' : 'bg-amber-50 border-amber-200'}`}>
              <span className="text-[9px] font-bold text-amber-700 bg-amber-100 border border-amber-300 px-1.5 py-0.5 rounded w-max">
                Relleno
              </span>
              <div className="absolute inset-0 p-3 pointer-events-none flex flex-wrap gap-3 items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-amber-500 shadow-md cursor-pointer hover:scale-125 transition-transform" title="Firma Electrónica (Score 78)" />
                <div className="w-3.5 h-3.5 rounded-full bg-amber-500 shadow-md cursor-pointer hover:scale-125 transition-transform" title="Chatbot IA (Score 74)" />
              </div>
            </div>

            {/* Baja Prioridad (Bottom Right) */}
            <div className={`border rounded-md p-2 relative flex flex-col justify-between ${isDark ? 'bg-rose-950/20 border-rose-500/30' : 'bg-rose-50 border-rose-200'}`}>
              <span className="text-[9px] font-bold text-rose-600 bg-rose-100 border border-rose-300 px-1.5 py-0.5 rounded w-max">
                Baja Prioridad
              </span>
              <div className="absolute inset-0 p-3 pointer-events-none flex flex-wrap gap-3 items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-md cursor-pointer hover:scale-125 transition-transform" title="Gobierno de Datos (Score 72)" />
              </div>
            </div>

            <div className="absolute -left-5 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] font-bold text-slate-400 tracking-widest uppercase">
              VALOR
            </div>
            <div className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-400 tracking-widest uppercase">
              ESFUERZO
            </div>
          </div>

          <div className={`mt-3 flex items-center justify-between text-[10px] pt-1.5 border-t ${
            isDark ? 'border-[#1d2d4f] text-slate-400' : 'border-slate-200 text-slate-500'
          }`}>
            <span>Alto Valor / Bajo Esfuerzo = Prioridad Máxima</span>
            <span className="font-semibold text-blue-500">10 Top Iniciativas Mapeadas</span>
          </div>
        </div>

        {/* Top 10 Ranking Table (5 cols) */}
        <div className={`xl:col-span-5 p-3.5 rounded-xl border flex flex-col justify-between transition-colors ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className={`flex items-center justify-between mb-2 pb-1.5 border-b ${isDark ? 'border-[#1d2d4f]' : 'border-slate-200'}`}>
            <h3 className={`text-xs font-bold tracking-wide uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
              TOP 10 RANKING DE INICIATIVAS
            </h3>
            <span className={`text-[9px] px-2 py-0.5 rounded border font-semibold ${
              isDark ? 'bg-blue-950 text-cyan-300 border-blue-500/30' : 'bg-blue-50 text-blue-800 border-blue-200'
            }`}>
              Score 0-100
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className={`border-b text-[9px] uppercase ${isDark ? 'border-[#1d2d4f] text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                  <th className="py-1 px-1.5">Rank</th>
                  <th className="py-1 px-1.5">Iniciativa</th>
                  <th className="py-1 px-1.5 text-center">Score</th>
                  <th className="py-1 px-1.5 text-right">ROI Esperado</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-[#152342]' : 'divide-slate-100'}`}>
                {initiatives.slice(0, 10).map((item) => (
                  <tr key={item.id} className={`transition-colors ${isDark ? 'hover:bg-[#132244]' : 'hover:bg-slate-50'}`}>
                    <td className="py-1 px-1.5 font-bold text-blue-500 text-center w-6">{item.rank}</td>
                    <td className={`py-1 px-1.5 font-semibold text-[11px] ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{item.name}</td>
                    <td className="py-1 px-1.5 text-center">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold ${
                        isDark ? 'bg-blue-950 text-cyan-300 border border-blue-700/50' : 'bg-blue-100 text-blue-900'
                      }`}>
                        {item.score}
                      </span>
                    </td>
                    <td className="py-1 px-1.5 text-right font-bold text-emerald-600 text-[11px]">{item.roiExpected}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={`mt-2 text-[9px] italic text-right ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Ponderación basada en ahorro de tiempo, impacto económico y viabilidad
          </div>
        </div>
      </div>

      {/* Bottom Section: Distribución Estratégica & Footnote */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3">
        <div className={`xl:col-span-6 p-3.5 rounded-xl border transition-colors ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <h3 className={`text-xs font-bold tracking-wide uppercase mb-2 pb-1.5 border-b ${isDark ? 'border-[#1d2d4f] text-white' : 'border-slate-200 text-slate-900'}`}>
            DISTRIBUCIÓN ESTRATÉGICA
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-around gap-3">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path className={isDark ? 'text-slate-800' : 'text-slate-200'} strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path strokeWidth="4" strokeDasharray="40, 100" stroke="#1e68d7" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" />
                <path strokeWidth="4" strokeDasharray="25, 100" strokeDashoffset="-40" stroke="#10b981" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" />
                <path strokeWidth="4" strokeDasharray="20, 100" strokeDashoffset="-65" stroke="#f59e0b" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" />
                <path strokeWidth="4" strokeDasharray="15, 100" strokeDashoffset="-85" stroke="#ef4444" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" />
              </svg>
              <div className="absolute text-center">
                <span className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>100%</span>
                <span className="block text-[8px] text-slate-400">Categorías</span>
              </div>
            </div>

            <div className="space-y-1.5 w-full max-w-xs">
              {categories.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: cat.color }} />
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{cat.name}</span>
                  </div>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{cat.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`xl:col-span-6 border rounded-xl p-3.5 flex items-center justify-between transition-colors ${
          isDark ? 'bg-[#091224] border-[#1b2c4e]' : 'bg-blue-50/70 border-blue-200'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full border ${isDark ? 'bg-blue-900/50 text-cyan-300 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-300'}`}>
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Score final de 0 a 100
              </h4>
              <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Mayor score = Mayor prioridad. Algoritmo automático configurado para Forms 1.
              </p>
            </div>
          </div>
          <span className={`text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap hidden sm:inline-block border ${
            isDark ? 'bg-blue-950 text-cyan-400 border-blue-500/40' : 'bg-white text-blue-800 border-blue-300 shadow-sm'
          }`}>
            Algoritmo Activo
          </span>
        </div>
      </div>
    </div>
  );
};
