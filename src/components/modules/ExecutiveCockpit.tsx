import React from 'react';
import { PortfolioKPIs, PortfolioAlert, ViewMode, FilterState } from '../../types/dashboard';
import {
  AlertTriangle,
  Layers,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Calendar,
  BarChart3,
  FileText,
  PieChart,
  Activity,
  Target,
  Users,
  Award
} from 'lucide-react';

interface ExecutiveCockpitProps {
  kpis: PortfolioKPIs;
  alerts: PortfolioAlert[];
  onNavigate: (view: ViewMode) => void;
  theme?: 'dark' | 'light';
  onDrillDown?: (item: any) => void;
  filters?: FilterState;
  onFilterChange?: (key: keyof FilterState, value: string) => void;
  lastUpdated?: string;
}

export const ExecutiveCockpit: React.FC<ExecutiveCockpitProps> = ({
  kpis,
  alerts,
  onNavigate,
  theme = 'dark',
  onDrillDown,
  filters,
  onFilterChange,
  lastUpdated = '20 Jul 2026 08:30 AM'
}) => {
  const isDark = theme === 'dark';

  // 1. Resumen Ejecutivo (6 Metric Cards)
  const executiveSummaryCards = [
    { count: 160, label: 'Ideas / Iniciativas', color: '#2563eb' },
    { count: 90, label: 'Priorizadas', color: '#16a34a' },
    { count: 50, label: 'Aprobadas', color: '#9333ea' },
    { count: 32, label: 'En Construcción', color: '#ea580c' },
    { count: 24, label: 'Productivas', color: '#0d9488' },
    { count: 18, label: 'Con ROI Medido', color: '#2563eb' },
  ];

  // 2. Embudo de Valor (Stage-Gate)
  const funnelRows = [
    { count: 160, label: 'Ideas / Iniciativas', color: '#2563eb', topW: 140, botW: 116 },
    { count: 90, label: 'Priorizadas', color: '#16a34a', topW: 114, botW: 90 },
    { count: 50, label: 'Aprobadas', color: '#9333ea', topW: 88, botW: 64 },
    { count: 32, label: 'En Construcción', color: '#ea580c', topW: 62, botW: 38 },
    { count: 24, label: 'Productivas (Go Live)', color: '#0d9488', topW: 36, botW: 20 },
    { count: 18, label: 'Con ROI Medido', color: '#0f172a', topW: 18, botW: 18 },
  ];

  // 3. Roadmap Estratégico
  const roadmapItems = [
    { name: 'IA Generativa', color: '#2563eb', startPct: 0, widthPct: 50 },
    { name: 'CRM 360°', color: '#16a34a', startPct: 20, widthPct: 50 },
    { name: 'Automatización SAP', color: '#9333ea', startPct: 45, widthPct: 50 },
    { name: 'Data Analytics', color: '#ea580c', startPct: 50, widthPct: 40 },
    { name: 'Portal del Cliente', color: '#0d9488', startPct: 55, widthPct: 40 },
  ];

  // 4. Alert Details for Drill-Down
  const getAlertDetails = (alertId: string, alertMessage: string) => {
    switch (alertId) {
      case 'A1':
        return {
          recommendation: 'Reunión extraordinaria de alineación PMO y renegociación de hitos críticos de avance.',
          items: [
            { name: 'Automatización SAP', detail: 'SPI: 0.85, CPI: 0.98 - Retraso en migración de módulos contables', status: 'Riesgo' },
            { name: 'Portal del Cliente', detail: 'SPI: 0.83, CPI: 0.95 - Pendiente validación de seguridad e integración API', status: 'Riesgo' },
            { name: 'Migración Cloud AWS', detail: 'SPI: 0.82, CPI: 0.92 - Dependencia con entrega de servidor por proveedor', status: 'Riesgo' },
            { name: 'Sistema de Facturación', detail: 'SPI: 0.80, CPI: 0.90 - Aprobación presupuestal adicional pendiente', status: 'Riesgo' },
            { name: 'Workflow Legal', detail: 'SPI: 0.81, CPI: 0.94 - Revisión de normas de cumplimiento normativo', status: 'Riesgo' },
            { name: 'App Proveedores', detail: 'SPI: 0.84, CPI: 0.96 - Cambio de requerimientos en Sprint 3', status: 'Riesgo' }
          ]
        };
      case 'A2':
        return {
          recommendation: 'Enviar recordatorio automático de encuesta Forms 3 a los sponsors operativos asignados.',
          items: [
            { name: 'Portal del Cliente', detail: 'Go-Live: 30 Abr 2026 - Encuesta agendada para Día 90', status: 'Pendiente' },
            { name: 'App Móvil Clientes', detail: 'Go-Live: 20 May 2026 - Encuesta agendada para Día 90', status: 'Pendiente' },
            { name: 'Firma Electrónica', detail: 'En fase de preparación de lanzamiento', status: 'Pendiente' },
            { name: 'Chatbot IA Operaciones', detail: 'Despliegue reciente en canal productivo', status: 'Pendiente' },
            { name: 'Gobierno de Datos TI', detail: 'Piloto operativo en revisión por el CIO', status: 'Pendiente' },
            { name: 'Gestión Documental', detail: 'Adopción en segunda fase corporativa', status: 'Pendiente' },
            { name: 'E-learning Corporativo', detail: 'Próximo despliegue a usuarios finales', status: 'Pendiente' },
            { name: 'Mesa de Ayuda TI', detail: 'Programada para aplicación en Forms 3', status: 'Pendiente' }
          ]
        };
      case 'A3':
        return {
          recommendation: 'Consolidar métricas de uso diario (DAU/MAU) antes de la sesión ejecutiva de captura de ROI.',
          items: [
            { name: 'CRM 360°', detail: 'Go-Live 15 Ene 2026 - Día 85 de evaluación post-salida', status: 'En Periodo' },
            { name: 'IA Contact Center', detail: 'Go-Live 28 Feb 2026 - Día 75 de evaluación post-salida', status: 'En Periodo' },
            { name: 'Automatización SAP', detail: 'Go-Live 10 Mar 2026 - Día 65 de evaluación post-salida', status: 'En Periodo' },
            { name: 'Portal del Cliente', detail: 'Go-Live 30 Abr 2026 - Día 45 de evaluación post-salida', status: 'En Periodo' },
            { name: 'App Móvil Clientes', detail: 'Go-Live 20 May 2026 - Día 25 de evaluación post-salida', status: 'En Periodo' },
            { name: 'Data Analytics', detail: 'Go-Live 10 Jun 2026 - Día 15 de evaluación post-salida', status: 'En Periodo' }
          ]
        };
      default:
        return {
          recommendation: 'Asignar equipo técnico dedicado para liberar bloqueos de alta severidad.',
          items: [
            { name: 'Infraestructura TI (6 tickets)', detail: 'Latencia en sincronización de servidores de base de datos', status: 'Crítico' },
            { name: 'Finanzas y Compras (4 tickets)', detail: 'Retraso en orden de pago de licencias de software', status: 'Riesgo' },
            { name: 'Operaciones UX (5 tickets)', detail: 'Ajustes menores de interfaz solicitados por usuarios', status: 'Pendiente' },
            { name: 'Compliance Legal (3 tickets)', detail: 'Revisión de cláusulas de confidencialidad de proveedores', status: 'Pendiente' }
          ]
        };
    }
  };

  const handleAlertClick = (alert: PortfolioAlert) => {
    if (onDrillDown) {
      onDrillDown({
        type: 'alert',
        title: alert.message,
        sourceForm: 'Formulario 2 (Brief & Gantt PMO)',
        data: getAlertDetails(alert.id, alert.message)
      });
    }
  };

  // 5 Alertas Principales matching exact reference image:
  const mainAlertsList = [
    { id: 'A1', type: 'warning', message: '6 proyectos en riesgo requieren atención', iconColor: 'text-amber-500' },
    { id: 'A2', type: 'danger', message: '8 proyectos sin encuesta NPS pendiente', iconColor: 'text-rose-500' },
    { id: 'A3', type: 'warning', message: '3 proyectos sin medición ROI a 90 días', iconColor: 'text-amber-500' },
    { id: 'A4', type: 'info', message: '18 issues abiertos requieren seguimiento', iconColor: 'text-cyan-500' },
  ];

  return (
    <div className="space-y-3 text-left w-full select-none">
      {/* Top Header Dark Navigation Bar (Exact Replica of Reference Banner) */}
      <div className="bg-[#09152b] border border-[#1b2f56] rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-white shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-[#0e2246] border border-[#1e3c74] flex items-center justify-center text-blue-400 shadow">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-white tracking-tight uppercase">
              EXECUTIVE COCKPIT - VISIÓN INTEGRAL DEL PORTAFOLIO
            </h1>
            <p className="text-xs text-slate-300 font-medium">
              Del concepto al valor real para el negocio
            </p>
          </div>
        </div>

        {/* Filter Controls Row Inside Header */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center space-x-1 bg-[#060e1d] px-2 py-1 rounded-md border border-[#1d3563]">
            <span className="text-slate-400 font-semibold text-[11px]">Año</span>
            <select
              value={filters?.year || '2026'}
              onChange={(e) => onFilterChange && onFilterChange('year', e.target.value)}
              className="bg-transparent text-white font-bold outline-none cursor-pointer text-xs"
            >
              <option value="2026" className="bg-[#060e1d]">2026</option>
            </select>
          </div>

          <div className="flex items-center space-x-1 bg-[#060e1d] px-2 py-1 rounded-md border border-[#1d3563]">
            <span className="text-slate-400 font-semibold text-[11px]">Dirección</span>
            <select
              value={filters?.direction || 'Todas'}
              onChange={(e) => onFilterChange && onFilterChange('direction', e.target.value)}
              className="bg-transparent text-white font-bold outline-none cursor-pointer text-xs"
            >
              <option value="Todas" className="bg-[#060e1d]">Todas</option>
              <option value="Tecnología" className="bg-[#060e1d]">Tecnología</option>
              <option value="Operaciones" className="bg-[#060e1d]">Operaciones</option>
            </select>
          </div>

          <div className="flex items-center space-x-1 bg-[#060e1d] px-2 py-1 rounded-md border border-[#1d3563]">
            <span className="text-slate-400 font-semibold text-[11px]">Sponsor</span>
            <select
              value={filters?.sponsor || 'Todos'}
              onChange={(e) => onFilterChange && onFilterChange('sponsor', e.target.value)}
              className="bg-transparent text-white font-bold outline-none cursor-pointer text-xs"
            >
              <option value="Todos" className="bg-[#060e1d]">Todos</option>
            </select>
          </div>

          <div className="flex items-center space-x-1 bg-[#060e1d] px-2 py-1 rounded-md border border-[#1d3563]">
            <span className="text-slate-400 font-semibold text-[11px]">Tipo</span>
            <select
              value={filters?.type || 'Todos'}
              onChange={(e) => onFilterChange && onFilterChange('type', e.target.value)}
              className="bg-transparent text-white font-bold outline-none cursor-pointer text-xs"
            >
              <option value="Todos" className="bg-[#060e1d]">Todos</option>
            </select>
          </div>

          <div className="flex items-center space-x-1.5 bg-[#060e1d] px-2.5 py-1 rounded-md border border-[#1d3563] text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-medium">Última actualización: <strong className="text-white">{lastUpdated}</strong></span>
          </div>
        </div>
      </div>

      {/* Main 5 Equal Columns Panel Row (Replicating exact layout of reference image) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3 items-stretch">
        {/* PANEL 1: RESUMEN EJECUTIVO */}
        <div className={`p-3.5 rounded-xl border flex flex-col justify-between transition-colors ${
          isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h3 className={`text-center text-xs font-extrabold tracking-wide uppercase border-b pb-2 ${
            isDark ? 'border-[#1d2d4f] text-slate-200' : 'border-slate-200 text-slate-900'
          }`}>
            RESUMEN EJECUTIVO
          </h3>

          <div className="grid grid-cols-2 gap-2 my-auto py-2">
            {executiveSummaryCards.map((card, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border text-center flex flex-col justify-center items-center ${
                  isDark ? 'bg-[#081020] border-[#172848]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className="text-2xl font-black" style={{ color: card.color }}>
                  {card.count}
                </span>
                <span className={`text-[10px] font-bold mt-0.5 leading-tight ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {card.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* PANEL 2: EMBUDO DE VALOR (STAGE-GATE) */}
        <div className={`p-3.5 rounded-xl border flex flex-col justify-between transition-colors ${
          isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h3 className={`text-center text-xs font-extrabold tracking-wide uppercase border-b pb-2 ${
            isDark ? 'border-[#1d2d4f] text-slate-200' : 'border-slate-200 text-slate-900'
          }`}>
            EMBUDO DE VALOR (STAGE-GATE)
          </h3>

          {/* 100% Linearly Aligned Funnel Rows */}
          <div className="py-2 space-y-1 my-auto">
            {funnelRows.map((row, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-2 h-8 border-b border-slate-100 dark:border-slate-800/60 last:border-b-0 px-1"
              >
                {/* Left 45%: Funnel Segment */}
                <div className="w-[45%] flex justify-center items-center h-full">
                  <svg viewBox="0 0 160 30" className="w-full h-6">
                    {idx < 5 ? (
                      <polygon
                        points={`${(160 - row.topW) / 2},2 ${(160 + row.topW) / 2},2 ${(160 + row.botW) / 2},28 ${(160 - row.botW) / 2},28`}
                        fill={row.color}
                      />
                    ) : (
                      <rect
                        x="71"
                        y="2"
                        width="18"
                        height="26"
                        rx="2"
                        fill={row.color}
                        stroke={isDark ? '#38bdf8' : '#1e3a8a'}
                        strokeWidth="1"
                      />
                    )}
                  </svg>
                </div>

                {/* Right 55%: Number & Label */}
                <div className="w-[55%] flex items-center space-x-1.5 text-xs">
                  <span className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {row.count}
                  </span>
                  <span className={`text-[10px] font-semibold truncate ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {row.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PANEL 3: ROADMAP ESTRATÉGICO - PRÓXIMOS 12 MESES */}
        <div className={`p-3.5 rounded-xl border flex flex-col justify-between transition-colors ${
          isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className={`flex items-center justify-between border-b pb-1.5 ${
            isDark ? 'border-[#1d2d4f]' : 'border-slate-200'
          }`}>
            <h3 className={`text-xs font-extrabold tracking-wide uppercase ${
              isDark ? 'text-slate-200' : 'text-slate-900'
            }`}>
              ROADMAP ESTRATÉGICO - PRÓXIMOS 12 MESES
            </h3>
          </div>

          <div className="my-auto py-1 space-y-2">
            {/* Timeline Header (Q1 2026, Q2 2026, Q3 2026, Q4 2026) */}
            <div className={`grid grid-cols-4 text-[9px] font-bold border-b pb-1 text-center ${
              isDark ? 'border-[#152342] text-slate-400' : 'border-slate-200 text-slate-500'
            }`}>
              <span>Q1 2026</span>
              <span>Q2 2026</span>
              <span>Q3 2026</span>
              <span>Q4 2026</span>
            </div>

            {/* Gantt Rows matching image */}
            <div className="space-y-2 text-xs">
              {roadmapItems.map((item, idx) => (
                <div key={idx} className="flex flex-col space-y-0.5">
                  <span className={`text-[10px] font-bold truncate ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    {item.name}
                  </span>
                  <div className={`h-3 rounded overflow-hidden relative border ${
                    isDark ? 'bg-[#060e1d] border-[#18294a]' : 'bg-slate-100 border-slate-200'
                  }`}>
                    <div
                      className="absolute h-full rounded transition-all"
                      style={{
                        left: `${item.startPct}%`,
                        width: `${item.widthPct}%`,
                        backgroundColor: item.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PANEL 4: KPIs CLAVE DEL PORTAFOLIO (With exact icons & layout) */}
        <div className={`p-3.5 rounded-xl border flex flex-col justify-between transition-colors ${
          isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h3 className={`text-center text-xs font-extrabold tracking-wide uppercase border-b pb-2 ${
            isDark ? 'border-[#1d2d4f] text-slate-200' : 'border-slate-200 text-slate-900'
          }`}>
            KPIs CLAVE DEL PORTAFOLIO
          </h3>

          <div className="grid grid-cols-2 gap-2 my-auto py-1 text-xs">
            {/* Metric 1: Inversión Total */}
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <div>
                <span className={`text-[9px] block font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Inversión Total</span>
                <strong className="text-emerald-500 text-sm font-black">${kpis.totalInvestmentRequired}M <span className="text-[9px] font-normal">MXN</span></strong>
              </div>
            </div>

            {/* Metric 2: Proyectos Activos */}
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <div>
                <span className={`text-[9px] block font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Proyectos Activos</span>
                <strong className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{kpis.activeProjects}</strong>
              </div>
            </div>

            {/* Metric 3: Beneficio Esperado */}
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <div>
                <span className={`text-[9px] block font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Beneficio Esperado</span>
                <strong className="text-emerald-500 text-sm font-black">${kpis.totalPotentialBenefit}M <span className="text-[9px] font-normal">MXN</span></strong>
              </div>
            </div>

            {/* Metric 4: Proyectos en Riesgo */}
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-rose-500 flex-shrink-0" />
              <div>
                <span className={`text-[9px] block font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Proyectos en Riesgo</span>
                <strong className="text-rose-500 text-sm font-black">{kpis.projectsInRisk}</strong>
              </div>
            </div>

            {/* Metric 5: ROI Promedio */}
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <div>
                <span className={`text-[9px] block font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>ROI Promedio</span>
                <strong className="text-emerald-500 text-sm font-black">{kpis.avgExpectedROI}%</strong>
              </div>
            </div>

            {/* Metric 6: Beneficio Realizado */}
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <div>
                <span className={`text-[9px] block font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Beneficio Realizado</span>
                <strong className="text-emerald-500 text-sm font-black">${kpis.realizedBenefitMXN}M <span className="text-[9px] font-normal">MXN</span></strong>
              </div>
            </div>

            {/* Metric 7: % Proyectos On Track */}
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <div>
                <span className={`text-[9px] block font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>% Proyectos On Track</span>
                <strong className="text-emerald-500 text-sm font-black">{kpis.pctOnTrack}%</strong>
              </div>
            </div>

            {/* Metric 8: NPS Promedio */}
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-cyan-500 flex-shrink-0" />
              <div>
                <span className={`text-[9px] block font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>NPS Promedio</span>
                <strong className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{kpis.avgNPS}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 5: ALERTAS PRINCIPALES */}
        <div className={`p-3.5 rounded-xl border flex flex-col justify-between transition-colors ${
          isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h3 className={`text-center text-xs font-extrabold tracking-wide uppercase border-b pb-2 ${
            isDark ? 'border-[#1d2d4f] text-slate-200' : 'border-slate-200 text-slate-900'
          }`}>
            ALERTAS PRINCIPALES
          </h3>

          <div className="my-auto py-1 space-y-2">
            {mainAlertsList.map((alert) => (
              <div
                key={alert.id}
                onClick={() => handleAlertClick(alert as any)}
                className={`p-2 rounded-lg border flex items-start space-x-2 cursor-pointer hover:border-amber-400 transition-all ${
                  isDark ? 'bg-[#081020] border-[#172848] hover:bg-[#112140]' : 'bg-slate-50 border-slate-200 hover:bg-amber-50/50'
                }`}
              >
                <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${alert.iconColor}`} />
                <span className={`text-[11px] font-semibold leading-snug ${
                  isDark ? 'text-slate-200' : 'text-slate-800'
                }`}>
                  {alert.message}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
