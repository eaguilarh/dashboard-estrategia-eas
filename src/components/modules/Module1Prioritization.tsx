import React, { useState } from 'react';
import { PortfolioKPIs, Initiative } from '../../types/dashboard';
import { Sparkles, TrendingUp, HelpCircle, Eye, ArrowUp, ArrowRight } from 'lucide-react';

interface Module1Props {
  kpis: PortfolioKPIs;
  initiatives: Initiative[];
  theme?: 'dark' | 'light';
  onDrillDown?: (item: any) => void;
  isCockpit?: boolean;
}

export const Module1Prioritization: React.FC<Module1Props> = ({ kpis, initiatives, theme = 'dark', onDrillDown, isCockpit = false }) => {
  const isDark = theme === 'dark';
  const [selectedQuadrant, setSelectedQuadrant] = useState<string | null>(null);

  // Calculate dynamic strategic distribution categories based on real initiatives
  const categoryCounts = initiatives.reduce((acc, init) => {
    acc[init.category] = (acc[init.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalInits = initiatives.length;
  const categories = [
    { name: 'Transformación Digital', pct: totalInits > 0 ? Math.round(((categoryCounts['Transformación Digital'] || 0) / totalInits) * 100) : 0, color: '#1e68d7' },
    { name: 'Customer Experience', pct: totalInits > 0 ? Math.round(((categoryCounts['Customer Experience'] || 0) / totalInits) * 100) : 0, color: '#10b981' },
    { name: 'Automatización', pct: totalInits > 0 ? Math.round(((categoryCounts['Automatización'] || 0) / totalInits) * 100) : 0, color: '#f59e0b' },
    { name: 'Compliance', pct: totalInits > 0 ? Math.round(((categoryCounts['Compliance'] || 0) / totalInits) * 100) : 0, color: '#ef4444' },
  ];

  const filteredInitiatives = selectedQuadrant
    ? initiatives.filter((i) => i.quadrant === selectedQuadrant)
    : initiatives;

  const handleItemClick = (init: Initiative) => {
    if (onDrillDown) {
      onDrillDown({
        type: 'initiative',
        title: `${init.rank}. ${init.name}`,
        sourceForm: 'Formulario 1 (Ingreso de Iniciativas)',
        data: init,
      });
    }
  };

  // Dynamically map real initiatives to coordinates inside the Matriz quadrant grid
  const scatterDots = initiatives.map((init) => {
    // Determine target coordinates based on quadrants
    let x = 50;
    let y = 50;
    let color = '#2563eb'; // Default

    const quad = String(init.quadrant || '').toUpperCase();

    if (quad === 'QUICK WINS') {
      x = 15 + ((init.score - 70) / 30) * 30; // 15% to 45%
      y = 15 + (1 - (init.score - 70) / 30) * 30; // 15% to 45%
      color = '#16a34a';
    } else if (quad === 'APUESTAS ESTRATÉGICAS' || quad === 'PROYECTOS CLAVE') {
      x = 55 + ((init.score - 50) / 50) * 30; // 55% to 85%
      y = 15 + (1 - (init.score - 50) / 50) * 30; // 15% to 45%
      color = '#2563eb';
    } else if (quad === 'RELLENO' || quad === 'OPTIMIZACIÓN') {
      x = 15 + (init.score / 50) * 30; // 15% to 45%
      y = 55 + (1 - init.score / 50) * 30; // 55% to 85%
      color = '#ca8a04';
    } else {
      // Baja Prioridad
      x = 55 + (init.score / 50) * 30; // 55% to 85%
      y = 55 + (1 - init.score / 50) * 30; // 55% to 85%
      color = '#dc2626';
    }

    return {
      initId: init.id,
      name: init.name,
      score: init.score,
      quadrant: init.quadrant,
      x: Math.max(8, Math.min(92, x)),
      y: Math.max(8, Math.min(92, y)),
      color
    };
  });

  return (
    <div className="space-y-4 text-left w-full select-none max-w-full overflow-hidden">
      {/* Module Banner Header */}
      <div className={`border rounded-xl p-3 sm:p-3.5 flex flex-wrap items-center justify-between gap-2 shadow-md transition-colors ${
        isDark ? 'bg-gradient-to-r from-[#0b1b3d] via-[#102450] to-[#0b1b3d] border-[#1d3363]' : 'bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 border-blue-800 text-white'
      }`}>
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600 flex items-center justify-center font-extrabold text-white text-sm sm:text-base shadow flex-shrink-0">
            1
          </div>
          <div>
            <h2 className="text-xs sm:text-base font-extrabold text-white tracking-tight uppercase">
              PRIORIZACIÓN Y RANKEO DE INICIATIVAS
            </h2>
            <p className="text-[10px] sm:text-xs text-blue-200/90 font-medium">
              ¿Qué iniciativas debemos ejecutar primero? • Presione cualquier elemento para detalles
            </p>
          </div>
        </div>
        <div className="text-left mt-1 sm:mt-0">
          <span className="text-xs bg-blue-950/80 text-cyan-300 border border-blue-400/40 px-2.5 py-1 rounded font-semibold inline-block">
            Forms 1 Ponderado
          </span>
        </div>
      </div>

      {/* KPI Cards Row (6 Metric Cards in horizontal row) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
        <div className={`p-2.5 sm:p-3 rounded-xl border flex flex-col justify-between transition-colors min-w-0 ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <span className={`text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400 block leading-tight break-words`}>Total Iniciativas</span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className={`text-lg sm:text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{kpis.totalInitiatives}</span>
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
          </div>
        </div>

        <div className={`p-2.5 sm:p-3 rounded-xl border flex flex-col justify-between transition-colors min-w-0 ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <span className={`text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400 block leading-tight break-words`}>Inversión Requerida</span>
          <div className="mt-1 flex flex-wrap items-baseline gap-0.5">
            <span className="text-base sm:text-xl font-extrabold text-emerald-500">${kpis.totalInvestmentRequired}M</span>
            <span className={`text-[8px] sm:text-[9px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>MXN</span>
          </div>
        </div>

        <div className={`p-2.5 sm:p-3 rounded-xl border flex flex-col justify-between transition-colors min-w-0 ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <span className={`text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400 block leading-tight break-words`}>Beneficio Potencial</span>
          <div className="mt-1 flex flex-wrap items-baseline gap-0.5">
            <span className="text-base sm:text-xl font-extrabold text-purple-500">${kpis.totalPotentialBenefit}M</span>
            <span className={`text-[8px] sm:text-[9px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>MXN</span>
          </div>
        </div>

        <div className={`p-2.5 sm:p-3 rounded-xl border flex flex-col justify-between transition-colors min-w-0 ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <span className={`text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400 block leading-tight break-words`}>ROI Esperado</span>
          <div className="mt-1 flex items-baseline justify-between gap-1 flex-wrap">
            <span className="text-lg sm:text-2xl font-black text-amber-500">{kpis.avgExpectedROI}%</span>
            <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 flex-shrink-0" />
          </div>
        </div>

        <div className={`p-2.5 sm:p-3 rounded-xl border flex flex-col justify-between transition-colors min-w-0 ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <span className={`text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400 block leading-tight break-words`}>Score Promedio</span>
          <div className="mt-1 flex flex-wrap items-baseline gap-0.5">
            <span className="text-lg sm:text-2xl font-black text-cyan-500">{kpis.avgScore}</span>
            <span className={`text-[9px] sm:text-[10px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>/100</span>
          </div>
        </div>

        <div className={`p-2.5 sm:p-3 rounded-xl border flex flex-col justify-between transition-colors min-w-0 ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
          <span className={`text-[10px] sm:text-[11px] font-semibold text-slate-500 dark:text-slate-400 block leading-tight break-words`}>Time To Value</span>
          <div className="mt-1 flex items-baseline justify-between gap-1 flex-wrap">
            <span className={`text-lg sm:text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{kpis.avgTimeToValueMonths}</span>
            <span className={`text-[8px] sm:text-[9px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>meses</span>
          </div>
        </div>
      </div>

      {/* Widgets Layout logic */}
      {isCockpit ? (
        /* Cockpit View: Matriz top full-width, with Top 10 and Distribución side-by-side below */
        <div className="space-y-4 w-full">
          {/* CARD 1: Matriz Valor vs Esfuerzo (Full width) */}
          <div className={`p-3.5 sm:p-4 rounded-xl border flex flex-col justify-between transition-colors min-w-0 w-full ${
            isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <h3 className={`text-center text-xs sm:text-sm font-extrabold tracking-wide uppercase mb-2 ${isDark ? 'text-white' : 'text-[#0f172a]'}`}>
              MATRIZ VALOR VS ESFUERZO
            </h3>

            <div className="relative flex items-center justify-center p-1 my-auto w-full">
              {/* Y Axis Label & Arrow */}
              <div className="absolute left-0 top-0 bottom-6 flex flex-col items-center justify-between text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 z-10">
                <span className="font-extrabold">Alto</span>
                <div className="flex items-center space-x-1 -rotate-90 my-auto font-black uppercase tracking-wider">
                  <span>VALOR</span>
                  <ArrowUp className="w-3 h-3 rotate-90" />
                </div>
                <span className="font-extrabold">Bajo</span>
              </div>

              {/* Matrix Proportional Canvas */}
              <div className="ml-7 mr-1 w-full max-w-[280px] aspect-square border-2 rounded-xl relative overflow-hidden transition-colors border-slate-300 dark:border-slate-700 bg-white dark:bg-[#070e1c] shadow-inner">
                {/* Vertical Center Axis Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-slate-300 dark:bg-slate-700" />
                {/* Horizontal Center Axis Line */}
                <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-slate-300 dark:bg-slate-700" />

                {/* Quadrant Titles - Anchored cleanly */}
                <div className="absolute top-2 left-2 z-0 pointer-events-none">
                  <span className="font-black text-[9px] sm:text-[10px] text-[#16a34a] uppercase tracking-wide whitespace-nowrap">
                    Quick Wins
                  </span>
                </div>

                <div className="absolute top-2 right-2 z-0 pointer-events-none text-right">
                  <span className="font-black text-[9px] sm:text-[10px] text-[#2563eb] uppercase tracking-wide whitespace-nowrap">
                    Proyectos Clave
                  </span>
                </div>

                <div className="absolute bottom-2 left-2 z-0 pointer-events-none">
                  <span className="font-black text-[9px] sm:text-[10px] text-[#ca8a04] uppercase tracking-wide whitespace-nowrap">
                    Optimización
                  </span>
                </div>

                <div className="absolute bottom-2 right-2 z-0 pointer-events-none text-right">
                  <span className="font-black text-[9px] sm:text-[10px] text-[#dc2626] uppercase tracking-wide whitespace-nowrap">
                    Baja Prioridad
                  </span>
                </div>

                {/* Scatter Circles */}
                {scatterDots.map((dot, idx) => {
                  const initObj = initiatives.find((i) => i.id === dot.initId) || {
                    id: dot.initId,
                    rank: idx + 1,
                    name: dot.name,
                    score: dot.score,
                    quadrant: dot.quadrant,
                    area: 'Operaciones',
                    sponsor: 'Dirección General',
                    roiExpected: 180,
                    investmentRequired: 10,
                    potentialBenefit: 18,
                    timeToValueMonths: 6,
                    effort: 'Bajo',
                    value: 'Alto',
                    category: 'Estratégica'
                  };

                  return (
                    <div
                      key={dot.initId + idx}
                      onClick={() => handleItemClick(initObj as Initiative)}
                      style={{ left: `${dot.x}%`, top: `${dot.y}%`, backgroundColor: dot.color }}
                      className="absolute w-4 h-4 rounded-full shadow-md border-2 border-white dark:border-slate-900 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-150 transition-all z-10 group"
                      title={`${dot.name} (Score ${dot.score}) - Clic para Drill-Down`}
                    >
                      <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-36 p-2 rounded-lg bg-slate-900 text-white text-[10px] shadow-2xl z-50 pointer-events-none border border-slate-700 text-center">
                        <strong className="block text-cyan-300 font-bold text-xs">{dot.name}</strong>
                        <span>Score: {dot.score}/100</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* X Axis Label & Arrow */}
            <div className="ml-7 flex items-center justify-between text-[10px] font-extrabold text-slate-700 dark:text-slate-300 pt-1">
              <span>Bajo</span>
              <div className="flex items-center space-x-1 font-black uppercase tracking-wider">
                <span>ESFUERZO</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
              </div>
              <span>Alto</span>
            </div>
          </div>

          {/* Row of Top 10 & Distribución Estratégica side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {/* CARD 2: Top 10 Ranking Table */}
            <div className={`p-3.5 sm:p-4 rounded-xl border flex flex-col justify-between transition-colors min-w-0 ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className={`flex items-center justify-between mb-2 pb-2 border-b ${isDark ? 'border-[#1d2d4f]' : 'border-slate-200'}`}>
                <h3 className={`text-xs font-extrabold tracking-wide uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  TOP 10 RANKING DE INICIATIVAS
                </h3>
                <span className={`text-[9px] px-2 py-0.5 rounded border font-bold ${
                  isDark ? 'bg-blue-950 text-cyan-300 border-blue-500/30' : 'bg-blue-50 text-blue-800 border-blue-200'
                }`}>
                  Score 0-100
                </span>
              </div>

              <div className="overflow-x-auto my-auto w-full">
                <table className="w-full text-left text-xs min-w-[240px]">
                  <thead>
                    <tr className={`border-b text-[9px] uppercase ${isDark ? 'border-[#1d2d4f] text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                      <th className="py-1 px-1">Rank</th>
                      <th className="py-1 px-1">Iniciativa</th>
                      <th className="py-1 px-1 text-center">Score</th>
                      <th className="py-1 px-1 text-right">ROI</th>
                      <th className="py-1 px-1 text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDark ? 'divide-[#152342]' : 'divide-slate-100'}`}>
                    {filteredInitiatives.slice(0, 10).map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                        className={`transition-colors cursor-pointer ${isDark ? 'hover:bg-[#132244]' : 'hover:bg-slate-50'}`}
                      >
                        <td className="py-1 px-1 font-black text-blue-500 text-center w-5 text-[11px]">{item.rank}</td>
                        <td className={`py-1 px-1 font-bold text-[11px] whitespace-normal break-words ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{item.name}</td>
                        <td className="py-1 px-1 text-center">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-black ${
                            isDark ? 'bg-blue-950 text-cyan-300 border border-blue-700/50' : 'bg-blue-100 text-blue-900'
                          }`}>
                            {item.score}
                          </span>
                        </td>
                        <td className="py-1 px-1 text-right font-black text-emerald-600 text-[11px]">{item.roiExpected}%</td>
                        <td className="py-1 px-1 text-center text-cyan-400 hover:text-white">
                          <Eye className="w-3.5 h-3.5 inline" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={`mt-2 text-[9px] italic text-right ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Ponderación basada en ahorro de tiempo e impacto
              </div>
            </div>

            {/* CARD 3: Distribución Estratégica & Algoritmo de Score */}
            <div className={`p-3.5 sm:p-4 rounded-xl border flex flex-col justify-between transition-colors min-w-0 ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex flex-col gap-4">
                <h3 className={`text-xs font-extrabold tracking-wide uppercase pb-2 border-b ${isDark ? 'border-[#1d2d4f] text-white' : 'border-slate-200 text-slate-900'}`}>
                  DISTRIBUCIÓN ESTRATÉGICA
                </h3>

                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="relative w-28 h-28 flex items-center justify-center flex-shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      {/* Background Track */}
                      <path className={isDark ? 'text-slate-800' : 'text-slate-200'} strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      
                      {/* Dynamic Category Segments */}
                      {(() => {
                        let accumulatedOffset = 0;
                        return categories.map((cat, idx) => {
                          if (cat.pct <= 0) return null;
                          const strokeDasharray = `${cat.pct} 100`;
                          const strokeDashoffset = -accumulatedOffset;
                          accumulatedOffset += cat.pct;
                          return (
                            <path
                              key={idx}
                              strokeWidth="4"
                              strokeDasharray={strokeDasharray}
                              strokeDashoffset={strokeDashoffset}
                              stroke={cat.color}
                              fill="none"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                          );
                        });
                      })()}
                    </svg>
                    <div className="absolute text-center">
                      <span className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {totalInits > 0 ? '100%' : '0%'}
                      </span>
                      <span className="block text-[8px] text-slate-400 font-semibold">Categorías</span>
                    </div>
                  </div>

                  <div className="space-y-2 w-full max-w-sm">
                    {categories.map((cat) => (
                      <div key={cat.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2 min-w-0">
                          <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: cat.color }} />
                          <span className={`whitespace-normal break-words font-semibold text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{cat.name}</span>
                        </div>
                        <span className={`font-black text-xs ml-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{cat.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`border rounded-xl p-3 flex flex-col justify-center gap-1.5 transition-colors w-full ${
                  isDark ? 'bg-[#091224] border-[#1b2c4e]' : 'bg-blue-50/70 border-blue-200'
                }`}>
                  <div className="flex items-center space-x-2">
                    <div className={`p-1 rounded-full border flex-shrink-0 ${isDark ? 'bg-blue-900/50 text-cyan-300 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-300'}`}>
                      <HelpCircle className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className={`text-[10px] font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Score Final de 0 a 100
                      </h4>
                      <p className={`text-[9px] leading-tight whitespace-normal ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Mayor score = Mayor prioridad (Forms 1).
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-slate-700/30">
                    <span className={`text-[9px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Priorización</span>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border ${
                      isDark ? 'bg-blue-950 text-cyan-400 border-blue-500/40' : 'bg-white text-blue-800 border-blue-300 shadow-sm'
                    }`}>
                      Algoritmo Activo
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Render Full Dashboard View in Dedicated Module Tab (3 elements in same row) */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch w-full">
          {/* CARD 1: Matriz Valor vs Esfuerzo */}
          <div className={`p-3.5 sm:p-4 rounded-xl border flex flex-col justify-between transition-colors min-w-0 ${
            isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <h3 className={`text-center text-xs sm:text-sm font-extrabold tracking-wide uppercase mb-2 ${isDark ? 'text-white' : 'text-[#0f172a]'}`}>
              MATRIZ VALOR VS ESFUERZO
            </h3>

            <div className="relative flex items-center justify-center p-1 my-auto w-full">
              {/* Y Axis Label & Arrow */}
              <div className="absolute left-0 top-0 bottom-6 flex flex-col items-center justify-between text-[10px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 z-10">
                <span className="font-extrabold">Alto</span>
                <div className="flex items-center space-x-1 -rotate-90 my-auto font-black uppercase tracking-wider">
                  <span>VALOR</span>
                  <ArrowUp className="w-3 h-3 rotate-90" />
                </div>
                <span className="font-extrabold">Bajo</span>
              </div>

              {/* Matrix Proportional Canvas */}
              <div className="ml-7 mr-1 w-full max-w-[280px] aspect-square border-2 rounded-xl relative overflow-hidden transition-colors border-slate-300 dark:border-slate-700 bg-white dark:bg-[#070e1c] shadow-inner">
                {/* Vertical Center Axis Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-slate-300 dark:bg-slate-700" />
                {/* Horizontal Center Axis Line */}
                <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-slate-300 dark:bg-slate-700" />

                {/* Quadrant Titles - Anchored cleanly */}
                <div className="absolute top-2 left-2 z-0 pointer-events-none">
                  <span className="font-black text-[9px] sm:text-[10px] text-[#16a34a] uppercase tracking-wide whitespace-nowrap">
                    Quick Wins
                  </span>
                </div>

                <div className="absolute top-2 right-2 z-0 pointer-events-none text-right">
                  <span className="font-black text-[9px] sm:text-[10px] text-[#2563eb] uppercase tracking-wide whitespace-nowrap">
                    Proyectos Clave
                  </span>
                </div>

                <div className="absolute bottom-2 left-2 z-0 pointer-events-none">
                  <span className="font-black text-[9px] sm:text-[10px] text-[#ca8a04] uppercase tracking-wide whitespace-nowrap">
                    Optimización
                  </span>
                </div>

                <div className="absolute bottom-2 right-2 z-0 pointer-events-none text-right">
                  <span className="font-black text-[9px] sm:text-[10px] text-[#dc2626] uppercase tracking-wide whitespace-nowrap">
                    Baja Prioridad
                  </span>
                </div>

                {/* Scatter Circles */}
                {scatterDots.map((dot, idx) => {
                  const initObj = initiatives.find((i) => i.id === dot.initId) || {
                    id: dot.initId,
                    rank: idx + 1,
                    name: dot.name,
                    score: dot.score,
                    quadrant: dot.quadrant,
                    area: 'Operaciones',
                    sponsor: 'Dirección General',
                    roiExpected: 180,
                    investmentRequired: 10,
                    potentialBenefit: 18,
                    timeToValueMonths: 6,
                    effort: 'Bajo',
                    value: 'Alto',
                    category: 'Estratégica'
                  };

                  return (
                    <div
                      key={dot.initId + idx}
                      onClick={() => handleItemClick(initObj as Initiative)}
                      style={{ left: `${dot.x}%`, top: `${dot.y}%`, backgroundColor: dot.color }}
                      className="absolute w-4 h-4 rounded-full shadow-md border-2 border-white dark:border-slate-900 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-150 transition-all z-10 group"
                      title={`${dot.name} (Score ${dot.score}) - Clic para Drill-Down`}
                    >
                      <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-36 p-2 rounded-lg bg-slate-900 text-white text-[10px] shadow-2xl z-50 pointer-events-none border border-slate-700 text-center">
                        <strong className="block text-cyan-300 font-bold text-xs">{dot.name}</strong>
                        <span>Score: {dot.score}/100</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* X Axis Label & Arrow */}
            <div className="ml-7 flex items-center justify-between text-[10px] font-extrabold text-slate-700 dark:text-slate-300 pt-1">
              <span>Bajo</span>
              <div className="flex items-center space-x-1 font-black uppercase tracking-wider">
                <span>ESFUERZO</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
              </div>
              <span>Alto</span>
            </div>
          </div>

          {/* CARD 2: Top 10 Ranking Table */}
          <div className={`p-3.5 sm:p-4 rounded-xl border flex flex-col justify-between transition-colors min-w-0 ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className={`flex items-center justify-between mb-2 pb-2 border-b ${isDark ? 'border-[#1d2d4f]' : 'border-slate-200'}`}>
              <h3 className={`text-xs font-extrabold tracking-wide uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
                TOP 10 RANKING DE INICIATIVAS
              </h3>
              <span className={`text-[9px] px-2 py-0.5 rounded border font-bold ${
                isDark ? 'bg-blue-950 text-cyan-300 border-blue-500/30' : 'bg-blue-50 text-blue-800 border-blue-200'
              }`}>
                Score 0-100
              </span>
            </div>

            <div className="overflow-x-auto my-auto w-full">
              <table className="w-full text-left text-xs min-w-[240px]">
                <thead>
                  <tr className={`border-b text-[9px] uppercase ${isDark ? 'border-[#1d2d4f] text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                    <th className="py-1 px-1">Rank</th>
                    <th className="py-1 px-1">Iniciativa</th>
                    <th className="py-1 px-1 text-center">Score</th>
                    <th className="py-1 px-1 text-right">ROI</th>
                    <th className="py-1 px-1 text-center">Acción</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-[#152342]' : 'divide-slate-100'}`}>
                  {filteredInitiatives.slice(0, 10).map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className={`transition-colors cursor-pointer ${isDark ? 'hover:bg-[#132244]' : 'hover:bg-slate-50'}`}
                    >
                      <td className="py-1 px-1 font-black text-blue-500 text-center w-5 text-[11px]">{item.rank}</td>
                      <td className={`py-1 px-1 font-bold text-[11px] whitespace-normal break-words ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{item.name}</td>
                      <td className="py-1 px-1 text-center">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-black ${
                          isDark ? 'bg-blue-950 text-cyan-300 border border-blue-700/50' : 'bg-blue-100 text-blue-900'
                        }`}>
                          {item.score}
                        </span>
                      </td>
                      <td className="py-1 px-1 text-right font-black text-emerald-600 text-[11px]">{item.roiExpected}%</td>
                      <td className="py-1 px-1 text-center text-cyan-400 hover:text-white">
                        <Eye className="w-3.5 h-3.5 inline" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={`mt-2 text-[9px] italic text-right ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Ponderación basada en ahorro de tiempo e impacto
            </div>
          </div>

          {/* CARD 3: Distribución Estratégica & Algoritmo de Score */}
          <div className={`p-3.5 sm:p-4 rounded-xl border flex flex-col justify-between transition-colors min-w-0 ${isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex flex-col gap-4">
              <h3 className={`text-xs font-extrabold tracking-wide uppercase pb-2 border-b ${isDark ? 'border-[#1d2d4f] text-white' : 'border-slate-200 text-slate-900'}`}>
                DISTRIBUCIÓN ESTRATÉGICA
              </h3>

              <div className="flex flex-col items-center justify-center gap-4">
                <div className="relative w-28 h-28 flex items-center justify-center flex-shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    {/* Background Track */}
                    <path className={isDark ? 'text-slate-800' : 'text-slate-200'} strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    
                    {/* Dynamic Category Segments */}
                    {(() => {
                      let accumulatedOffset = 0;
                      return categories.map((cat, idx) => {
                        if (cat.pct <= 0) return null;
                        const strokeDasharray = `${cat.pct} 100`;
                        const strokeDashoffset = -accumulatedOffset;
                        accumulatedOffset += cat.pct;
                        return (
                          <path
                            key={idx}
                            strokeWidth="4"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            stroke={cat.color}
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        );
                      });
                    })()}
                  </svg>
                  <div className="absolute text-center">
                    <span className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {totalInits > 0 ? '100%' : '0%'}
                    </span>
                    <span className="block text-[8px] text-slate-400 font-semibold">Categorías</span>
                  </div>
                </div>

                <div className="space-y-2 w-full max-w-sm">
                  {categories.map((cat) => (
                    <div key={cat.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2 min-w-0">
                        <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: cat.color }} />
                        <span className={`whitespace-normal break-words font-semibold text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{cat.name}</span>
                      </div>
                      <span className={`font-black text-xs ml-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{cat.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`border rounded-xl p-3 flex flex-col justify-center gap-1.5 transition-colors w-full ${
                isDark ? 'bg-[#091224] border-[#1b2c4e]' : 'bg-blue-50/70 border-blue-200'
              }`}>
                <div className="flex items-center space-x-2">
                  <div className={`p-1 rounded-full border flex-shrink-0 ${isDark ? 'bg-blue-900/50 text-cyan-300 border-blue-500/30' : 'bg-blue-100 text-blue-700 border-blue-300'}`}>
                    <HelpCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className={`text-[10px] font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Score Final de 0 a 100
                    </h4>
                    <p className={`text-[9px] leading-tight whitespace-normal ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Mayor score = Mayor prioridad (Forms 1).
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-slate-700/30">
                  <span className={`text-[9px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Priorización</span>
                  <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border ${
                    isDark ? 'bg-blue-950 text-cyan-400 border-blue-500/40' : 'bg-white text-blue-800 border-blue-300 shadow-sm'
                  }`}>
                    Algoritmo Activo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
