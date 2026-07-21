import React from 'react';
import { FilterState } from '../../types/dashboard';
import { Calendar, Filter, RefreshCw, UploadCloud } from 'lucide-react';

interface HeaderProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onOpenUploadModal: () => void;
  lastUpdated: string;
}

export const Header: React.FC<HeaderProps> = ({ filters, onFilterChange, onOpenUploadModal, lastUpdated }) => {
  return (
    <header className="bg-[#0b1328] border-b border-[#1a2847] px-4 py-3 flex flex-wrap items-center justify-between gap-4 select-none">
      {/* Title & Tagline */}
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-blue-900/40 border border-blue-500/30 text-cyan-400">
          <Filter className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-lg lg:text-xl font-bold tracking-tight text-white flex items-center gap-2">
            EXECUTIVE COCKPIT <span className="text-slate-400 font-normal text-sm">| VISIÓN INTEGRAL DEL PORTAFOLIO</span>
          </h1>
          <p className="text-xs text-blue-300/80 font-medium">
            Del concepto al valor real para el negocio • EAS Consulting
          </p>
        </div>
      </div>

      {/* Global Filters Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Filter: Año */}
        <div className="flex items-center space-x-1.5 bg-[#121e38] border border-[#21345e] rounded-lg px-2.5 py-1 text-xs">
          <span className="text-slate-400 font-medium">Año:</span>
          <select
            value={filters.year}
            onChange={(e) => onFilterChange('year', e.target.value)}
            className="bg-transparent text-white font-semibold outline-none cursor-pointer"
          >
            <option value="2024" className="bg-[#0b1328]">2024</option>
            <option value="2025" className="bg-[#0b1328]">2025</option>
          </select>
        </div>

        {/* Filter: Dirección */}
        <div className="flex items-center space-x-1.5 bg-[#121e38] border border-[#21345e] rounded-lg px-2.5 py-1 text-xs">
          <span className="text-slate-400 font-medium">Dirección:</span>
          <select
            value={filters.direction}
            onChange={(e) => onFilterChange('direction', e.target.value)}
            className="bg-transparent text-white font-semibold outline-none cursor-pointer"
          >
            <option value="Todas" className="bg-[#0b1328]">Todas</option>
            <option value="Operaciones" className="bg-[#0b1328]">Operaciones</option>
            <option value="Comercial" className="bg-[#0b1328]">Comercial</option>
            <option value="Finanzas" className="bg-[#0b1328]">Finanzas</option>
            <option value="TI" className="bg-[#0b1328]">TI</option>
          </select>
        </div>

        {/* Filter: Sponsor */}
        <div className="flex items-center space-x-1.5 bg-[#121e38] border border-[#21345e] rounded-lg px-2.5 py-1 text-xs">
          <span className="text-slate-400 font-medium">Sponsor:</span>
          <select
            value={filters.sponsor}
            onChange={(e) => onFilterChange('sponsor', e.target.value)}
            className="bg-transparent text-white font-semibold outline-none cursor-pointer"
          >
            <option value="Todos" className="bg-[#0b1328]">Todos</option>
            <option value="CEO" className="bg-[#0b1328]">CEO</option>
            <option value="CFO" className="bg-[#0b1328]">CFO</option>
            <option value="CIO" className="bg-[#0b1328]">CIO</option>
            <option value="CMO" className="bg-[#0b1328]">CMO</option>
          </select>
        </div>

        {/* Filter: Tipo */}
        <div className="flex items-center space-x-1.5 bg-[#121e38] border border-[#21345e] rounded-lg px-2.5 py-1 text-xs">
          <span className="text-slate-400 font-medium">Tipo:</span>
          <select
            value={filters.type}
            onChange={(e) => onFilterChange('type', e.target.value)}
            className="bg-transparent text-white font-semibold outline-none cursor-pointer"
          >
            <option value="Todos" className="bg-[#0b1328]">Todos</option>
            <option value="Estratégicos" className="bg-[#0b1328]">Estratégicos</option>
            <option value="Operativos" className="bg-[#0b1328]">Operativos</option>
          </select>
        </div>

        {/* Last Updated Badge */}
        <div className="flex items-center space-x-2 text-xs bg-[#0f2444] text-cyan-300 border border-cyan-500/30 rounded-lg px-3 py-1 font-medium">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span>Última actualización: <strong className="text-white">{lastUpdated}</strong></span>
        </div>

        {/* Upload Button */}
        <button
          onClick={onOpenUploadModal}
          className="flex items-center space-x-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg shadow-md shadow-blue-900/40 transition-all border border-cyan-400/30 cursor-pointer"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Sincronizar Excel</span>
        </button>
      </div>
    </header>
  );
};
