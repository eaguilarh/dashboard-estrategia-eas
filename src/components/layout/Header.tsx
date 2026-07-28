import React from 'react';
import { FilterState } from '../../types/dashboard';
import { Filter, Calendar, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  lastUpdated: string;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  filters,
  onFilterChange,
  lastUpdated,
  theme,
  onToggleTheme,
}) => {
  const isDark = theme === 'dark';

  return (
    <header
      className={`border-b px-3 sm:px-4 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3 select-none transition-colors duration-200 ${
        isDark
          ? 'bg-[#0b1328] border-[#1a2847]'
          : 'bg-white border-slate-200 shadow-sm'
      }`}
    >
      {/* Title & Brand Header */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div>
          <h1
            className={`text-base sm:text-lg lg:text-xl font-bold tracking-tight flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            EXECUTIVE COCKPIT{' '}
            <span
              className={`font-normal text-xs sm:text-sm hidden md:inline-block ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              | VISIÓN INTEGRAL DEL PORTAFOLIO
            </span>
          </h1>
          <p
            className={`text-[10px] sm:text-xs font-medium ${
              isDark ? 'text-blue-300/80' : 'text-blue-700'
            }`}
          >
            Del concepto al valor real para el negocio • EAS Consulting
          </p>
        </div>
      </div>

      {/* Global Filters & Theme Toggle Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Filter: Año */}
        <div
          className={`flex items-center space-x-1 border rounded-lg px-2 py-0.5 sm:py-1 text-[11px] sm:text-xs transition-colors ${
            isDark
              ? 'bg-[#121e38] border-[#21345e] text-slate-400'
              : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}
        >
          <span className="font-medium">Año:</span>
          <select
            value={filters.year}
            onChange={(e) => onFilterChange('year', e.target.value)}
            className={`bg-transparent font-semibold outline-none cursor-pointer ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            <option value="2026" className={isDark ? 'bg-[#0b1328]' : 'bg-white'}>2026</option>
            <option value="2027" className={isDark ? 'bg-[#0b1328]' : 'bg-white'}>2027</option>
          </select>
        </div>

        {/* Filter: Dirección */}
        <div
          className={`flex items-center space-x-1 border rounded-lg px-2 py-0.5 sm:py-1 text-[11px] sm:text-xs transition-colors ${
            isDark
              ? 'bg-[#121e38] border-[#21345e] text-slate-400'
              : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}
        >
          <span className="font-medium">Dirección:</span>
          <select
            value={filters.direction}
            onChange={(e) => onFilterChange('direction', e.target.value)}
            className={`bg-transparent font-semibold outline-none cursor-pointer ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            <option value="Todas" className={isDark ? 'bg-[#0b1328]' : 'bg-white'}>Todas</option>
            <option value="Operaciones" className={isDark ? 'bg-[#0b1328]' : 'bg-white'}>Operaciones</option>
            <option value="Comercial" className={isDark ? 'bg-[#0b1328]' : 'bg-white'}>Comercial</option>
            <option value="Finanzas" className={isDark ? 'bg-[#0b1328]' : 'bg-white'}>Finanzas</option>
            <option value="TI" className={isDark ? 'bg-[#0b1328]' : 'bg-white'}>TI</option>
          </select>
        </div>

        {/* Filter: Sponsor */}
        <div
          className={`flex items-center space-x-1 border rounded-lg px-2 py-0.5 sm:py-1 text-[11px] sm:text-xs transition-colors ${
            isDark
              ? 'bg-[#121e38] border-[#21345e] text-slate-400'
              : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}
        >
          <span className="font-medium">Sponsor:</span>
          <select
            value={filters.sponsor}
            onChange={(e) => onFilterChange('sponsor', e.target.value)}
            className={`bg-transparent font-semibold outline-none cursor-pointer ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            <option value="Todos" className={isDark ? 'bg-[#0b1328]' : 'bg-white'}>Todos</option>
            <option value="CEO" className={isDark ? 'bg-[#0b1328]' : 'bg-white'}>CEO</option>
            <option value="CFO" className={isDark ? 'bg-[#0b1328]' : 'bg-white'}>CFO</option>
            <option value="CIO" className={isDark ? 'bg-[#0b1328]' : 'bg-white'}>CIO</option>
            <option value="CMO" className={isDark ? 'bg-[#0b1328]' : 'bg-white'}>CMO</option>
          </select>
        </div>

        {/* Filter: Tipo */}
        <div
          className={`flex items-center space-x-1 border rounded-lg px-2 py-0.5 sm:py-1 text-[11px] sm:text-xs transition-colors ${
            isDark
              ? 'bg-[#121e38] border-[#21345e] text-slate-400'
              : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}
        >
          <span className="font-medium">Tipo:</span>
          <select
            value={filters.type}
            onChange={(e) => onFilterChange('type', e.target.value)}
            className={`bg-transparent font-semibold outline-none cursor-pointer ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            <option value="Todos" className={isDark ? 'bg-[#0b1328]' : 'bg-white'}>Todos</option>
            <option value="Estratégicos" className={isDark ? 'bg-[#0b1328]' : 'bg-white'}>Estratégicos</option>
            <option value="Operativos" className={isDark ? 'bg-[#0b1328]' : 'bg-white'}>Operativos</option>
          </select>
        </div>

        {/* Last Updated Badge */}
        <div
          className={`hidden sm:flex items-center space-x-1.5 text-[11px] sm:text-xs border rounded-lg px-2.5 py-1 font-medium ${
            isDark
              ? 'bg-[#0f2444] text-cyan-300 border-cyan-500/30'
              : 'bg-blue-50 text-blue-800 border-blue-200'
          }`}
        >
          <Calendar className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`} />
          <span>
            Última actualización: <strong className={isDark ? 'text-white' : 'text-blue-950'}>{lastUpdated}</strong>
          </span>
        </div>

        {/* Client Switcher Toggle Button */}
        <button
          onClick={() => {
            const isLight = filters.direction === 'CH';
            onFilterChange('direction', isLight ? 'Todas' : 'CH');
          }}
          title={filters.direction === 'CH' ? 'Mostrar Versión Completa' : 'Cambiar a Versión Light (CH/TQS)'}
          className={`flex items-center space-x-1.5 font-semibold text-xs px-2.5 py-1 sm:py-1.5 rounded-lg shadow-sm border transition-all cursor-pointer ${
            filters.direction === 'CH'
              ? isDark
                ? 'bg-[#0f2444] text-cyan-300 border-cyan-500/30'
                : 'bg-blue-50 text-blue-800 border-blue-200'
              : 'bg-slate-500/10 hover:bg-slate-500/20 text-slate-400 border-slate-700/30 dark:border-[#1d2d4f]'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${filters.direction === 'CH' ? 'bg-cyan-400 animate-pulse' : 'bg-slate-500'}`} />
          <span>Versión Light</span>
        </button>

        {/* Theme Toggle Button (Light/Dark mode) */}
        <button
          onClick={onToggleTheme}
          title={isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
          className={`flex items-center space-x-1 font-semibold text-xs px-2.5 py-1 sm:py-1.5 rounded-lg shadow-sm border transition-all cursor-pointer ${
            isDark
              ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
              : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
          }`}
        >
          {isDark ? (
            <>
              <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span>Modo Claro</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
              <span>Modo Oscuro</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
