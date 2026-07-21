import React from 'react';
import { ViewMode } from '../../types/dashboard';
import { LayoutDashboard, Target, KanbanSquare as Kanban, TrendingUp, HeartHandshake, ShieldCheck, Settings, Upload } from 'lucide-react';

interface SidebarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  onOpenUploadModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onSelectView, onOpenUploadModal }) => {
  const navItems: { id: ViewMode; label: string; icon: React.ReactNode }[] = [
    { id: 'cockpit', label: 'Cockpit', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'iniciativas', label: 'Iniciativas', icon: <Target className="w-5 h-5" /> },
    { id: 'proyectos', label: 'Proyectos', icon: <Kanban className="w-5 h-5" /> },
    { id: 'beneficios', label: 'Beneficios', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'nps', label: 'NPS / Adopción', icon: <HeartHandshake className="w-5 h-5" /> },
    { id: 'pmo', label: 'PMO', icon: <ShieldCheck className="w-5 h-5" /> },
    { id: 'config', label: 'Configuración', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-20 lg:w-24 bg-[#0a1122] border-r border-[#1a2847] flex flex-col items-center py-4 flex-shrink-0 select-none">
      {/* Brand Icon */}
      <div className="mb-6 flex flex-col items-center">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-blue-900/40">
          EAS
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 w-full space-y-2 px-2">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectView(item.id)}
              title={item.label}
              className={`w-full flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-md shadow-blue-900/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#13203c]'
              }`}
            >
              <div className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-cyan-400'}`}>
                {item.icon}
              </div>
              <span className="text-[10px] font-medium tracking-tight mt-1 text-center line-clamp-1">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Forms & Excel Upload Trigger Button */}
      <div className="mt-auto px-2 w-full pt-4 border-t border-[#1a2847]">
        <button
          onClick={onOpenUploadModal}
          title="Cargar / Sincronizar Excel de Forms"
          className="w-full flex flex-col items-center justify-center py-2.5 px-1 rounded-xl bg-[#122347] hover:bg-blue-600 text-cyan-400 hover:text-white transition-all border border-blue-500/30 group shadow-sm"
        >
          <Upload className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-[9px] font-semibold tracking-tight mt-1 text-center leading-tight">
            Cargar Excel
          </span>
        </button>
      </div>
    </aside>
  );
};
