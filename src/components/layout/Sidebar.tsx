import React from 'react';
import { ViewMode } from '../../types/dashboard';
import { LayoutDashboard, Target, KanbanSquare as Kanban, TrendingUp, HeartHandshake, ShieldCheck, Settings, Upload } from 'lucide-react';
import { EasLogo } from '../common/EasLogo';

interface SidebarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  onOpenUploadModal: () => void;
  theme: 'dark' | 'light';
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onSelectView, onOpenUploadModal, theme }) => {
  const isDark = theme === 'dark';

  const navItems: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
    { id: 'cockpit', label: 'Cockpit', icon: <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'iniciativas', label: 'Iniciativas', icon: <Target className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'proyectos', label: 'Proyectos', icon: <Kanban className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'beneficios', label: 'Beneficios', icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'nps', label: 'NPS / Adopción', icon: <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'pmo', label: 'PMO', icon: <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'config', label: 'Configuración', icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" /> },
  ];

  return (
    <aside
      className={`w-14 sm:w-20 lg:w-24 border-r flex flex-col items-center py-3 sm:py-4 flex-shrink-0 select-none transition-colors duration-200 ${
        isDark
          ? 'bg-[#0a1122] border-[#1a2847]'
          : 'bg-white border-slate-200 shadow-sm'
      }`}
    >
      {/* Brand Official EAS Logo */}
      <div className="mb-4 sm:mb-5 flex flex-col items-center cursor-pointer group" onClick={() => onSelectView('cockpit')}>
        <div className="p-0.5 sm:p-1 rounded-2xl bg-gradient-to-b from-blue-500/10 to-cyan-500/5 border border-blue-500/20 group-hover:border-cyan-400/50 transition-colors">
          <EasLogo size={34} />
        </div>
        <span className={`text-[9px] sm:text-[10px] font-extrabold tracking-wider mt-1 ${isDark ? 'text-cyan-400' : 'text-blue-700'}`}>
          EAS
        </span>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 w-full space-y-1.5 sm:space-y-2 px-1 sm:px-2">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              title={item.label}
              className={`w-full flex flex-col items-center justify-center py-2 sm:py-2.5 px-0.5 sm:px-1 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-md shadow-blue-900/40'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200 hover:bg-[#13203c]'
                  : 'text-slate-600 hover:text-blue-700 hover:bg-slate-100'
              }`}
            >
              <div
                className={`transition-transform duration-200 group-hover:scale-110 ${
                  isActive
                    ? 'text-white'
                    : isDark
                    ? 'text-slate-400 group-hover:text-cyan-400'
                    : 'text-slate-500 group-hover:text-blue-600'
                }`}
              >
                {item.icon}
              </div>
              <span className="text-[8px] sm:text-[10px] font-medium tracking-tight mt-0.5 sm:mt-1 text-center whitespace-normal break-words leading-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Forms & Excel Upload Trigger Button */}
      <div className={`mt-auto px-1 sm:px-2 w-full pt-3 sm:pt-4 border-t ${isDark ? 'border-[#1a2847]' : 'border-slate-200'}`}>
        <button
          onClick={onOpenUploadModal}
          title="Cargar / Sincronizar Excel de Forms"
          className={`w-full flex flex-col items-center justify-center py-1.5 sm:py-2 px-0.5 sm:px-1 rounded-xl transition-all border group shadow-sm ${
            isDark
              ? 'bg-[#122347] hover:bg-blue-600 text-cyan-400 hover:text-white border-blue-500/30'
              : 'bg-slate-50 hover:bg-blue-50 text-blue-700 hover:text-blue-800 border-blue-200'
          }`}
        >
          <Upload className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
          <span className="text-[8px] sm:text-[9px] font-bold tracking-tight mt-0.5 sm:mt-1 text-center leading-tight">
            Cargar Excel
          </span>
        </button>
      </div>
    </aside>
  );
};
