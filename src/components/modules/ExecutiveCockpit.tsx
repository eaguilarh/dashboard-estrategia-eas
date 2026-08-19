import React from 'react';
import { PortfolioKPIs, PortfolioAlert, ViewMode, FilterState, ProjectExecution } from '../../types/dashboard';
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

import { formatNumber, formatMillions, normalizeDateStr, parseMonthDay } from '../../utils/formatters';

interface ExecutiveCockpitProps {
  kpis: PortfolioKPIs;
  alerts: PortfolioAlert[];
  projects?: ProjectExecution[];
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
  projects = [],
  onNavigate,
  theme = 'dark',
  onDrillDown,
  filters,
  onFilterChange,
  lastUpdated = '20 Jul 2026 08:30 A'
}) => {
  const isDark = theme === 'dark';

  // 1. Resumen Ejecutivo (6 etric Cards dynamically pulling from computed KPIs)
  const executiveSummaryCards = [
    { count: kpis.totalInitiatives || 0, label: 'Ideas / Iniciativas', color: '#2563eb' },
    { count: kpis.funnelPrioritized || 0, label: 'Priorizadas', color: '#16a34a' },
    { count: kpis.funnelApproved || 0, label: 'Aprobadas', color: '#9333ea' },
    { count: kpis.activeProjects || 0, label: 'En Construcción', color: '#ea580c' },
    { count: kpis.closedProjectsCount || 0, label: 'Productivas', color: '#0d9488' },
    { count: kpis.funnelRoiMeasured || 0, label: 'Con ROI Medido', color: '#2563eb' },
  ];

  // 2. Embudo de Valor (Stage-Gate dynamically pulling from computed KPIs)
  const funnelRows = [
    { count: kpis.totalInitiatives || 0, label: 'Ideas / Iniciativas', color: '#2563eb', topW: 140, botW: 116 },
    { count: kpis.funnelPrioritized || 0, label: 'Priorizadas', color: '#16a34a', topW: 114, botW: 90 },
    { count: kpis.funnelApproved || 0, label: 'Aprobadas', color: '#9333ea', topW: 88, botW: 64 },
    { count: kpis.activeProjects || 0, label: 'En Construcción', color: '#ea580c', topW: 62, botW: 38 },
    { count: kpis.closedProjectsCount || 0, label: 'Productivas (Go Live)', color: '#0d9488', topW: 36, botW: 20 },
    { count: kpis.funnelRoiMeasured || 0, label: 'Con ROI Medido', color: '#0f172a', topW: 18, botW: 18 },
  ];

  // 3. Roadmap Estratégico - Pull from real projects
  const colors = ['#2563eb', '#16a34a', '#9333ea', '#ea580c', '#0d9488', '#0284c7'];
  const roadmapItems = projects.map((prj, idx) => {
    const start = parseMonthDay(prj.startDatePlan);
    const end = parseMonthDay(prj.endDatePlan);
    const startPct = Math.max(0, Math.min(90, ((start.monthIdx + (start.day / 31)) / 12) * 100));
    const endPct = Math.max(startPct + 5, Math.min(100, ((end.monthIdx + (end.day / 31)) / 12) * 100));
    const widthPct = Math.max(6, endPct - startPct);
    return {
      name: prj.name,
      startDatePlan: prj.startDatePlan,
      endDatePlan: prj.endDatePlan,
      color: colors[idx % colors.length],
      startPct,
      widthPct
    };
  });

  // 4. Alert Details for Drill-Down
  const getAlertDetails = (alertId: string, alertMessage: string) => {
    switch (alertId) {
      case 'A1':
        return {
          recommendation: 'Reunión extraordinaria de alineación PO y renegociación de hitos críticos de avance.',
          items: [
            { name: 'Automatización SAP', detail: 'SPI: 0.85, CPI: 0.98 - Retraso en migración de módulos contables', status: 'Riesgo' },
            { name: 'Portal del Cliente', detail: 'SPI: 0.83, CPI: 0.95 - Pendiente validación de seguridad e integración API', status: 'Riesgo' },
            { name: 'igración Cloud AWS', detail: 'SPI: 0.82, CPI: 0.92 - Dependencia con entrega de servidor por proveedor', status: 'Riesgo' },
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
            { name: 'App óvil Clientes', detail: 'Go-Live: 20 ay 2026 - Encuesta agendada para Día 90', status: 'Pendiente' },
            { name: 'Firma Electrónica', detail: 'En fase de preparación de lanzamiento', status: 'Pendiente' },
            { name: 'Chatbot IA Operaciones', detail: 'Despliegue reciente en canal productivo', status: 'Pendiente' },
            { name: 'Gobierno de Datos TI', detail: 'Piloto operativo en revisión por el CIO', status: 'Pendiente' },
            { name: 'Gestión Documental', detail: 'Adopción en segunda fase corporativa', status: 'Pendiente' },
            { name: 'E-learning Corporativo', detail: 'Próximo despliegue a usuarios finales', status: 'Pendiente' },
            { name: 'esa de Ayuda TI', detail: 'Programada para aplicación en Forms 3', status: 'Pendiente' }
          ]
        };
      case 'A3':
        return {
          recommendation: 'Realizar auditoría financiera del beneficio realizado vs esperado para certificar el ROI.',
          items: [
            { name: 'IA Contact Center', detail: 'Cerrado 15 Feb 2026 - F3 pendiente por comité directivo', status: 'Pendiente' },
            { name: 'CR 360°', detail: 'Cerrado 15 Ene 2026 - F3 pendiente por sponsor comercial', status: 'Pendiente' },
            { name: 'Automatización SAP', detail: 'Cerrado 10 ar 2026 - F3 programada', status: 'Pendiente' }
          ]
        };
      default:
        return {
          recommendation: 'Seguimiento por parte del PO Leader en las sesiones de status de los días jueves.',
          items: [
            { name: 'Workflow Legal', detail: '18 minutas de acuerdos pendientes de firma electrónica', status: 'Abierto' },
            { name: 'IA Contact Center', detail: 'Error en conexión telefónica intermitente', status: 'Abierto' }
          ]
        };
    }
  };

  const mainAlertsList = alerts.map((alert) => {
    const details = getAlertDetails(alert.id, alert.message);
    return {
      ...alert,
      recommendation: details.recommendation,
      affectedProjects: details.items
    };
  });

  const handleAlertClick = (alert: any) => {
    if (onDrillDown) {
      onDrillDown({
        type: 'alert',
        title: `Alerta: ${alert.message}`,
        sourceForm: 'onitoreo de Portafolio PO',
        data: alert
      });
    }
  };

  return (
    <div className="space-y-4 text-left w-full select-none max-w-full overflow-hidden">
      {/* Banner / Header Controls */}
      <div className={`border rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 shadow-md transition-colors ${
        isDark ? 'bg-gradient-to-r from-[#0b1b3d] via-[#102450] to-[#0b1b3d] border-[#1d3363]' : 'bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 border-blue-800 text-white'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-extrabold text-white text-base shadow flex-shrink-0">
            📊
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight uppercase">
              EXECUTIVE COCKPIT - VISIÓN INTEGRAL DEL PORTAFOLIO
            </h2>
            <p className="text-xs text-blue-200/90 font-medium">
              Del concepto al valor real para el negocio
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Filter: Año */}
          <div className="flex items-center space-x-1 bg-[#060e1d] px-2 py-1 rounded-md border border-[#1d3563]">
            <span className="text-slate-400 font-semibold text-[10px] sm:text-[11px]">Año</span>
            <select
              value={filters?.year || '2026'}
              onChange={(e) => onFilterChange && onFilterChange('year', e.target.value)}
              className="bg-transparent text-white font-bold outline-none cursor-pointer text-xs"
            >
              <option value="2026" className="bg-[#060e1d]">2026</option>
            </select>
          </div>

          <div className="flex items-center space-x-1 bg-[#060e1d] px-2 py-1 rounded-md border border-[#1d3563]">
            <span className="text-slate-400 font-semibold text-[10px] sm:text-[11px]">Dirección</span>
            <select
              value={filters?.direction || 'Todas'}
              onChange={(e) => onFilterChange && onFilterChange('direction', e.target.value)}
              className="bg-transparent text-white font-bold outline-none cursor-pointer text-xs"
            >
              <option value="Todas" className="bg-[#060e1d]">Todas</option>
            </select>
          </div>

          <div className="flex items-center space-x-1 bg-[#060e1d] px-2 py-1 rounded-md border border-[#1d3563]">
            <span className="text-slate-400 font-semibold text-[10px] sm:text-[11px]">Sponsor</span>
            <select
              value={filters?.sponsor || 'Todos'}
              onChange={(e) => onFilterChange && onFilterChange('sponsor', e.target.value)}
              className="bg-transparent text-white font-bold outline-none cursor-pointer text-xs"
            >
              <option value="Todos" className="bg-[#060e1d]">Todos</option>
            </select>
          </div>

          <div className="flex items-center space-x-1 bg-[#060e1d] px-2 py-1 rounded-md border border-[#1d3563]">
            <span className="text-slate-400 font-semibold text-[10px] sm:text-[11px]">Tipo</span>
            <select
              value={filters?.type || 'Todos'}
              onChange={(e) => onFilterChange && onFilterChange('type', e.target.value)}
              className="bg-transparent text-white font-bold outline-none cursor-pointer text-xs"
            >
              <option value="Todos" className="bg-[#060e1d]">Todos</option>
            </select>
          </div>

          <div className="flex items-center space-x-1.5 bg-[#060e1d] px-2.5 py-1 rounded-md border border-[#1d3563] text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
            <span className="text-[10px] font-medium">Última actualización: <strong className="text-white">{lastUpdated}</strong></span>
          </div>
        </div>
      </div>

      {/* ain 5 Equal Columns Panel Row (Fluid responsive & zoom-resistant) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3 items-stretch w-full">
        {/* PANEL 1: RESUMEN EJECUTIVO */}
        <div className={`min-w-0 p-3 sm:p-3.5 rounded-xl border flex flex-col justify-between transition-colors ${
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
                className={`p-2 sm:p-2.5 rounded-xl border text-center flex flex-col justify-center items-center ${
                  isDark ? 'bg-[#081020] border-[#172848]' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className="text-xl sm:text-2xl font-black" style={{ color: card.color }}>
                  {card.count}
                </span>
                <span className={`text-[9px] sm:text-[10px] font-bold mt-0.5 leading-tight whitespace-normal break-words ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {card.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* PANEL 2: EMBUDO DE VALOR (STAGE-GATE) */}
        <div className={`min-w-0 p-3 sm:p-3.5 rounded-xl border flex flex-col justify-between transition-colors ${
          isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h3 className={`text-center text-xs font-extrabold tracking-wide uppercase border-b pb-2 ${
            isDark ? 'border-[#1d2d4f] text-slate-200' : 'border-slate-200 text-slate-900'
          }`}>
            EMBUDO DE VALOR (STAGE-GATE)
          </h3>

          <div className="py-2 space-y-1 my-auto">
            {funnelRows.map((row, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-2 h-8 border-b border-slate-100 dark:border-slate-800/60 last:border-b-0 px-1"
              >
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

                <div className="w-[55%] flex items-center space-x-1.5 text-xs min-w-0">
                  <span className={`text-xs sm:text-sm font-black flex-shrink-0 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {row.count}
                  </span>
                  <span className={`text-[9px] sm:text-[10px] font-semibold truncate ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {row.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PANEL 3: ROADMAP ESTRATÉGICO - PRÓXIMOS 12 MESES */}
        <div className={`min-w-0 p-3 sm:p-3.5 rounded-xl border flex flex-col justify-between transition-colors ${
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
            <div className={`grid grid-cols-4 text-[9px] font-bold border-b pb-1 text-center ${
              isDark ? 'border-[#152342] text-slate-400' : 'border-slate-200 text-slate-500'
            }`}>
              <span>Q1 2026</span>
              <span>Q2 2026</span>
              <span>Q3 2026</span>
              <span>Q4 2026</span>
            </div>

            <div className="space-y-2 text-xs">
              {roadmapItems.length > 0 ? (
                roadmapItems.map((item, idx) => (
                  <div key={idx} className="flex flex-col space-y-0.5 min-w-0">
                    <div className="flex items-center justify-between gap-1 text-[9px] sm:text-[10px]">
                      <span className={`font-bold truncate ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        <span className="font-extrabold text-cyan-400 mr-1">{idx + 1}.</span>
                        {item.name}
                      </span>
                      <span className="text-[8px] text-slate-400 font-semibold whitespace-nowrap">
                        {normalizeDateStr(item.startDatePlan)} - {normalizeDateStr(item.endDatePlan)}
                      </span>
                    </div>
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
                ))
              ) : (
                <div className="text-center py-8 text-[10px] text-slate-500 font-semibold">
                  No hay proyectos activos en el roadmap.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PANEL 4: KPIs CLAVE DEL PORTAFOLIO */}
        <div className={`min-w-0 p-3 sm:p-3.5 rounded-xl border flex flex-col justify-between transition-colors ${
          isDark ? 'bg-[#0e172a] border-[#1e293b]' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h3 className={`text-center text-xs font-extrabold tracking-wide uppercase border-b pb-2 ${
            isDark ? 'border-[#1d2d4f] text-slate-200' : 'border-slate-200 text-slate-900'
          }`}>
            KPIs CLAVE DEL PORTAFOLIO
          </h3>

          <div className="grid grid-cols-2 gap-2 my-auto py-1 text-xs">
            <div className="flex items-center space-x-1.5 min-w-0">
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" />
              <div className="min-w-0">
                <span className={`text-[8px] sm:text-[9px] block font-semibold truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Inversión Total</span>
                <strong className="text-emerald-500 text-xs sm:text-sm font-black whitespace-nowrap">{formatMillions(kpis.totalInvestmentRequired)} <span className="text-[8px] font-normal">MXN</span></strong>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 min-w-0">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
              <div className="min-w-0">
                <span className={`text-[8px] sm:text-[9px] block font-semibold truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Proyectos Activos</span>
                <strong className={`text-xs sm:text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{kpis.activeProjects}</strong>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 min-w-0">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" />
              <div className="min-w-0">
                <span className={`text-[8px] sm:text-[9px] block font-semibold truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Beneficio Esperado</span>
                <strong className="text-emerald-500 text-xs sm:text-sm font-black whitespace-nowrap">{formatMillions(kpis.totalPotentialBenefit)} <span className="text-[8px] font-normal">MXN</span></strong>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 min-w-0">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 flex-shrink-0" />
              <div className="min-w-0">
                <span className={`text-[8px] sm:text-[9px] block font-semibold truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Proyectos en Riesgo</span>
                <strong className="text-rose-500 text-xs sm:text-sm font-black">{kpis.projectsInRisk}</strong>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 min-w-0">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" />
              <div className="min-w-0">
                <span className={`text-[8px] sm:text-[9px] block font-semibold truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>ROI Promedio</span>
                <strong className="text-emerald-500 text-xs sm:text-sm font-black">{formatNumber(kpis.avgExpectedROI, 2)}%</strong>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 min-w-0">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" />
              <div className="min-w-0">
                <span className={`text-[8px] sm:text-[9px] block font-semibold truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Beneficio Realizado</span>
                <strong className="text-emerald-500 text-xs sm:text-sm font-black whitespace-nowrap">{formatMillions(kpis.realizedBenefitMXN)} <span className="text-[8px] font-normal">MXN</span></strong>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 min-w-0">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" />
              <div className="min-w-0">
                <span className={`text-[8px] sm:text-[9px] block font-semibold truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>% Proyectos On Track</span>
                <strong className="text-emerald-500 text-xs sm:text-sm font-black">{formatNumber(kpis.pctOnTrack, 2)}%</strong>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 min-w-0">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-500 flex-shrink-0" />
              <div className="min-w-0">
                <span className={`text-[8px] sm:text-[9px] block font-semibold truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>NPS Promedio</span>
                <strong className={`text-xs sm:text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{formatNumber(kpis.avgNPS, 2)}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 5: ALERTAS PRINCIPALES */}
        <div className={`min-w-0 p-3 sm:p-3.5 rounded-xl border flex flex-col justify-between transition-colors ${
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
                <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                  alert.type === 'danger' ? 'text-rose-500' : alert.type === 'warning' ? 'text-amber-500' : 'text-cyan-500'
                }`} />
                <span className={`text-[10px] sm:text-[11px] font-semibold leading-snug ${
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
