import React, { useState } from 'react';
import { Initiative, ProjectExecution } from '../../types/dashboard';
import { Plus, Calendar, Clock, ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle, Layers, Play } from 'lucide-react';

interface PMOKanbanProps {
  initiatives: Initiative[];
  projects: ProjectExecution[];
  theme?: 'dark' | 'light';
  onDrillDown: (item: any) => void;
}

export const PMOKanbanView: React.FC<PMOKanbanProps> = ({ initiatives, projects, theme = 'dark', onDrillDown }) => {
  const isDark = theme === 'dark';

  // Local state for internal PMO transition simulator
  const [selectedInitiativeId, setSelectedInitiativeId] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('2026-08-03');
  const [durationWeeks, setDurationWeeks] = useState<number>(8);
  const [pmName, setPmName] = useState<string>('Ing. TBD');
  const [transitionStatus, setTransitionStatus] = useState<string | null>(null);

  const selectedInitiative = initiatives.find((i) => i.id === selectedInitiativeId) || initiatives[0];

  const handleCreateProjectSLA = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInitiative) {
      setTransitionStatus('Por favor, selecciona una iniciativa válida para promover.');
      return;
    }
    const start = new Date(startDate);
    const endDate = new Date(start.getTime() + durationWeeks * 7 * 24 * 60 * 60 * 1000);
    const endDateFormatted = endDate.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });

    setTransitionStatus(
      `¡Iniciativa "${selectedInitiative.name}" promovida a Proyecto Activo! Fecha Fin SLA: ${endDateFormatted} (${durationWeeks} semanas).`
    );
  };

  // Derive stage counters dynamically from real arrays
  const backlogInitiatives = initiatives.filter(i => i.score >= 70);
  const planningProjects = projects.filter(p => p.statusGantt === 'Sin Iniciar' || p.progressRealPct === 0);
  const constructionProjects = projects.filter(p => p.statusGantt !== 'Sin Iniciar' && p.progressRealPct > 0);
  const completedProjectsCount = projects.filter(p => p.progressRealPct === 100).length;

  return (
    <div className="space-y-4 text-left w-full select-none">
      {/* Header Banner */}
      <div className={`border rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-2 shadow-md transition-colors ${
        isDark ? 'bg-gradient-to-r from-[#0b132b] via-[#102450] to-[#0b132b] border-[#1d3363]' : 'bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 border-blue-800 text-white'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-cyan-600 text-white font-extrabold text-lg shadow flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight uppercase">
              TABLERO KANBAN DE GOBIERNO INTERNO & TRANSICIÓN PMO
            </h2>
            <p className="text-xs text-cyan-200/90 font-medium">
              Flujo interno para convertir Iniciativas Priorizadas (Forms 1) en Proyectos Activos (Forms 2) con SLA
            </p>
          </div>
        </div>
        <div className="text-right text-xs">
          <span className="bg-cyan-950 text-cyan-300 border border-cyan-500/40 px-3 py-1 rounded-md font-bold">
            Uso Interno PMO
          </span>
        </div>
      </div>

      {/* Transition Form Card (Transición de Iniciativa a Proyecto) */}
      <div className={`p-4 rounded-xl border transition-colors ${
        isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className={`flex items-center justify-between mb-3 pb-2 border-b ${
          isDark ? 'border-[#1d2d4f]' : 'border-slate-200'
        }`}>
          <h3 className={`text-xs font-extrabold tracking-wide uppercase flex items-center gap-1.5 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            <Play className="w-4 h-4 text-cyan-500" /> PROMOCIÓN DE INICIATIVA A PROYECTO ACTIVO (GENERADOR DE SLA)
          </h3>
          <span className="text-[10px] text-cyan-500 font-bold bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded">
            Cálculo Automático de Fecha Fin
          </span>
        </div>

        <form onSubmit={handleCreateProjectSLA} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3 text-xs">
          {/* Select Initiative */}
          <div>
            <label className={`block text-[10px] font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Iniciativa Aprobada (Forms 1)
            </label>
            <select
              value={selectedInitiativeId}
              onChange={(e) => setSelectedInitiativeId(e.target.value)}
              className={`w-full p-2 rounded-lg border font-bold outline-none ${
                isDark ? 'bg-[#081022] border-[#1f3460] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            >
              <option value="" className={isDark ? 'bg-[#0b1328]' : 'bg-white'}>Selecciona iniciativa...</option>
              {initiatives.map((init) => (
                <option key={init.id} value={init.id} className={isDark ? 'bg-[#0b1328]' : 'bg-white'}>
                  {init.rank}. {init.name} (Score: {init.score})
                </option>
              ))}
            </select>
          </div>

          {/* Fecha Inicio */}
          <div>
            <label className={`block text-[10px] font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Fecha de Inicio Propuesta
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={`w-full p-2 rounded-lg border font-bold outline-none ${
                isDark ? 'bg-[#081022] border-[#1f3460] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          {/* Semanas de Duración */}
          <div>
            <label className={`block text-[10px] font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Duración Estimada (Semanas)
            </label>
            <input
              type="number"
              min="1"
              max="52"
              value={durationWeeks}
              onChange={(e) => setDurationWeeks(Number(e.target.value))}
              className={`w-full p-2 rounded-lg border font-bold outline-none ${
                isDark ? 'bg-[#081022] border-[#1f3460] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          {/* PM Asignado */}
          <div>
            <label className={`block text-[10px] font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              PM Responsable Asignado
            </label>
            <input
              type="text"
              value={pmName}
              onChange={(e) => setPmName(e.target.value)}
              className={`w-full p-2 rounded-lg border font-bold outline-none ${
                isDark ? 'bg-[#081022] border-[#1f3460] text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          {/* Action Button */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full p-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-lg shadow transition-all border border-cyan-400/30 flex items-center justify-center gap-1.5 cursor-pointer text-xs"
            >
              <Plus className="w-4 h-4" /> Promover a Proyecto
            </button>
          </div>
        </form>

        {transitionStatus && (
          <div className="mt-3 bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs p-2.5 rounded-lg flex items-center gap-2 font-semibold">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
            <span>{transitionStatus}</span>
          </div>
        )}
      </div>

      {/* Kanban Board Columns (4 Stages of Lifecycle) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 text-xs">
        {/* Column 1: Aprobadas para Arranque */}
        <div className={`p-3 rounded-xl border space-y-2.5 ${
          isDark ? 'bg-[#0b1328] border-[#1b2b4e]' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center justify-between border-b pb-1.5 border-blue-500/40">
            <span className="font-extrabold text-blue-600 dark:text-blue-400 uppercase text-[11px]">1. Aprobadas / Backlog</span>
            <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded font-black">
              {backlogInitiatives.length}
            </span>
          </div>

          <div className="space-y-2">
            {backlogInitiatives.map((item) => (
              <div
                key={item.id}
                onClick={() => onDrillDown({ type: 'initiative', title: item.name, sourceForm: 'Formulario 1 (Ingreso de Iniciativas)', data: item })}
                className={`p-3 rounded-lg border cursor-pointer hover:border-blue-500 transition-all ${
                  isDark ? 'bg-[#0e1933] border-[#1e3058]' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.name}</span>
                  <span className="text-[9px] font-black text-cyan-300 bg-blue-950 px-1.5 py-0.5 rounded border border-blue-600/50">
                    Score {item.score}
                  </span>
                </div>
                <div className="text-[11px] flex items-center justify-between font-semibold">
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{item.area}</span>
                  <span className="font-black text-emerald-600 dark:text-emerald-400">${item.investmentRequired}M MXN</span>
                </div>
              </div>
            ))}
            {backlogInitiatives.length === 0 && (
              <div className="text-center py-6 text-slate-500 text-[11px]">
                Sin iniciativas aprobadas.
              </div>
            )}
          </div>
        </div>

        {/* Column 2: En Planificación & SLA */}
        <div className={`p-3 rounded-xl border space-y-2.5 ${
          isDark ? 'bg-[#0b1328] border-[#1b2b4e]' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center justify-between border-b pb-1.5 border-cyan-500/40">
            <span className="font-extrabold text-cyan-600 dark:text-cyan-400 uppercase text-[11px]">2. Planificación SLA</span>
            <span className="bg-cyan-600 text-white text-[10px] px-2 py-0.5 rounded font-black">
              {planningProjects.length}
            </span>
          </div>

          <div className="space-y-2">
            {planningProjects.map((prj) => (
              <div
                key={prj.id}
                onClick={() => onDrillDown({ type: 'project', title: prj.name, sourceForm: 'Formulario 2 (Brief & Gantt PMO)', data: prj })}
                className={`p-3 rounded-lg border cursor-pointer hover:border-cyan-500 transition-all ${
                  isDark ? 'bg-[#0e1933] border-[#1e3058]' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>{prj.name}</span>
                  <span className="text-[9px] font-bold text-amber-300 bg-amber-950 px-1.5 py-0.5 rounded border border-amber-500/40">
                    Plan
                  </span>
                </div>
                <div className="text-[11px] flex items-center justify-between font-semibold">
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>PM: {prj.pm}</span>
                  <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{prj.startDatePlan} - {prj.endDatePlan}</span>
                </div>
              </div>
            ))}
            {planningProjects.length === 0 && (
              <div className="text-center py-6 text-slate-500 text-[11px]">
                Sin proyectos en planificación.
              </div>
            )}
          </div>
        </div>

        {/* Column 3: En Construcción (Módulo 2) */}
        <div className={`p-3 rounded-xl border space-y-2.5 ${
          isDark ? 'bg-[#0b1328] border-[#1b2b4e]' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center justify-between border-b pb-1.5 border-amber-500/40">
            <span className="font-extrabold text-amber-600 dark:text-amber-400 uppercase text-[11px]">3. En Construcción (Gantt)</span>
            <span className="bg-amber-600 text-white text-[10px] px-2 py-0.5 rounded font-black">
              {constructionProjects.length}
            </span>
          </div>

          <div className="space-y-2">
            {constructionProjects.map((prj) => (
              <div
                key={prj.id}
                onClick={() => onDrillDown({ type: 'project', title: prj.name, sourceForm: 'Formulario 2 (Brief & Gantt PMO)', data: prj })}
                className={`p-3 rounded-lg border cursor-pointer hover:border-amber-500 transition-all ${
                  isDark ? 'bg-[#0e1933] border-[#1e3058]' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>{prj.name}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                    prj.statusGantt === 'On Track' ? 'bg-emerald-950 text-emerald-400 border-emerald-500/40' : 'bg-amber-950 text-amber-400 border-amber-500/40'
                  }`}>
                    {prj.statusGantt}
                  </span>
                </div>
                <div className="text-[11px] flex items-center justify-between font-semibold">
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Avance: {prj.progressRealPct}%</span>
                  <span className="font-bold text-cyan-600 dark:text-cyan-400 font-mono">SPI {prj.spi}</span>
                </div>
              </div>
            ))}
            {constructionProjects.length === 0 && (
              <div className="text-center py-6 text-slate-500 text-[11px]">
                Sin proyectos activos en construcción.
              </div>
            )}
          </div>
        </div>

        {/* Column 4: Go-Live & ROI 90 Días (Módulo 3) */}
        <div className={`p-3 rounded-xl border space-y-2.5 ${
          isDark ? 'bg-[#0b1328] border-[#1b2b4e]' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center justify-between border-b pb-1.5 border-emerald-500/40">
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400 uppercase text-[11px]">4. Productivo / ROI 90D</span>
            <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded font-black">
              {completedProjectsCount}
            </span>
          </div>

          <div className="space-y-2">
            {projects.filter(p => p.progressRealPct === 100).map((prj) => (
              <div
                key={prj.id}
                onClick={() => onDrillDown({ type: 'closedProject', title: prj.name, sourceForm: 'Formulario 3 (NPS & ROI 90 Días)', data: { ...prj, deliveryDate: '15 Ene 2026', roiReal90DaysPct: 28, nps: 82, npsStatus: 'Excelente', adoptionPct: 92, realBenefitMXN: 32, promisedBenefitMXN: 30 } })}
                className={`p-3 rounded-lg border cursor-pointer hover:border-emerald-500 transition-all ${
                  isDark ? 'bg-[#0e1933] border-[#1e3058]' : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>{prj.name}</span>
                  <span className="text-[9px] font-bold text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-500/40">
                    ROI 90D Medido
                  </span>
                </div>
                <div className="text-[11px] flex items-center justify-between font-semibold">
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Forms 3 Certificado</span>
                  <span className="font-black text-emerald-600 dark:text-emerald-400">Avance 100%</span>
                </div>
              </div>
            ))}
            {completedProjectsCount === 0 && (
              <div className="text-center py-6 text-slate-500 text-[11px]">
                Sin proyectos productivos finalizados.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
