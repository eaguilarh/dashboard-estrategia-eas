import React from 'react';
import { X, FileSpreadsheet, Layers, Calendar, DollarSign, TrendingUp, Award, AlertTriangle, CheckCircle2, ShieldCheck, Clock, UserCheck, HelpCircle } from 'lucide-react';
import { Initiative, ProjectExecution, ClosedProject } from '../../types/dashboard';

export interface DrillDownItem {
  type: 'initiative' | 'project' | 'closedProject' | 'metric' | 'alert';
  title: string;
  sourceForm: 'Formulario 1 (Ingreso de Iniciativas)' | 'Formulario 2 (Brief & Gantt PMO)' | 'Formulario 3 (NPS & ROI 90 Días)' | 'Sistema Integrado';
  data: any;
}

interface DrillDownModalProps {
  item: DrillDownItem | null;
  onClose: () => void;
}

export const DrillDownModal: React.FC<DrillDownModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  const { title, sourceForm, data, type } = item;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 select-none animate-fadeIn">
      <div className="bg-[#0b1328] border border-[#1e3460] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0d1c3a] via-[#142850] to-[#0d1c3a] border-b border-[#1d325e] p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg border ${
              type === 'alert' ? 'bg-amber-500/20 border-amber-400/40 text-amber-400' : 'bg-blue-600/30 border-blue-400/40 text-cyan-400'
            }`}>
              {type === 'alert' ? <AlertTriangle className="w-5 h-5" /> : <FileSpreadsheet className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider block">
                Detalle y Trazabilidad de Origen
              </span>
              <h3 className="text-base font-extrabold text-white">{title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Source Badge */}
        <div className="bg-[#070e1e] px-4 py-2 border-b border-[#172748] flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-blue-400" />
            <span className="text-slate-400 font-medium">Origen de Datos:</span>
            <strong className="text-cyan-300 font-bold">{sourceForm}</strong>
          </div>
          <span className="bg-emerald-950 text-emerald-300 text-[10px] border border-emerald-500/30 px-2 py-0.5 rounded font-semibold">
            Trazabilidad Validada
          </span>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* ALERT DRILL-DOWN TYPE */}
          {type === 'alert' && (
            <div className="space-y-4">
              <div className="bg-amber-950/40 border border-amber-500/30 p-3 rounded-xl flex items-start space-x-3 text-amber-200">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-300 text-xs">Diagnóstico PMO e Impacto Operativo</h4>
                  <p className="text-[11px] mt-0.5 text-amber-100/90 leading-relaxed">
                    {data.recommendation || 'Se requiere revisión en el comité de gobierno semanal para asegurar la continuidad y mitigación de desvíos en el portafolio.'}
                  </p>
                </div>
              </div>

              {/* Items List Breakdown */}
              <div className="bg-[#081022] p-3.5 rounded-xl border border-[#17284a] space-y-2.5">
                <h4 className="font-bold text-white uppercase text-[11px] border-b border-[#1b2d52] pb-1.5 flex items-center justify-between">
                  <span>Proyectos e Elementos Involucrados</span>
                  <span className="text-cyan-400 font-extrabold text-[10px]">{data.items ? data.items.length : 0} Registros</span>
                </h4>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {data.items && data.items.map((it: any, idx: number) => (
                    <div key={idx} className="p-2.5 rounded-lg border bg-[#0e1933] border-[#1f3460] flex items-center justify-between text-xs">
                      <div>
                        <strong className="text-white block font-bold">{it.name || it.title || it}</strong>
                        <span className="text-[10px] text-slate-400">{it.detail || it.reason || 'Seguimiento por la PMO'}</span>
                      </div>
                      {it.status && (
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          it.status === 'Crítico' || it.status === 'Riesgo' ? 'bg-rose-950 text-rose-300 border-rose-500/30' :
                          it.status === 'Pendiente' ? 'bg-amber-950 text-amber-300 border-amber-500/30' :
                          'bg-blue-950 text-cyan-300 border-blue-500/30'
                        }`}>
                          {it.status}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {type === 'initiative' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-[#0f1b36] p-2.5 rounded-xl border border-[#1b2d54]">
                  <span className="text-[10px] text-slate-400 block">Score Evaluado</span>
                  <strong className="text-lg font-black text-cyan-400">{data.score} / 100</strong>
                </div>
                <div className="bg-[#0f1b36] p-2.5 rounded-xl border border-[#1b2d54]">
                  <span className="text-[10px] text-slate-400 block">ROI Esperado</span>
                  <strong className="text-lg font-black text-emerald-400">{data.roiExpected}%</strong>
                </div>
                <div className="bg-[#0f1b36] p-2.5 rounded-xl border border-[#1b2d54]">
                  <span className="text-[10px] text-slate-400 block">Inversión Requerida</span>
                  <strong className="text-lg font-black text-white">${data.investmentRequired}M MXN</strong>
                </div>
                <div className="bg-[#0f1b36] p-2.5 rounded-xl border border-[#1b2d54]">
                  <span className="text-[10px] text-slate-400 block">Cuadrante</span>
                  <strong className="text-sm font-bold text-amber-400">{data.quadrant}</strong>
                </div>
              </div>

              {/* Form 1 Questions Breakdown */}
              <div className="bg-[#081022] p-3 rounded-xl border border-[#17284a] space-y-2">
                <h4 className="font-bold text-white uppercase text-[11px] border-b border-[#1b2d52] pb-1">
                  Desglose de Ponderación (Preguntas 4 - 13 de Forms 1)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Área Responsable:</span>
                    <span className="text-slate-200 font-semibold">{data.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sponsor Directivo:</span>
                    <span className="text-slate-200 font-semibold">{data.sponsor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tiempo a Valor:</span>
                    <span className="text-slate-200 font-semibold">{data.timeToValueMonths} meses</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Categoría Estratégica:</span>
                    <span className="text-cyan-300 font-semibold">{data.category}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {type === 'project' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-[#0f1b36] p-2.5 rounded-xl border border-[#1b2d54]">
                  <span className="text-[10px] text-slate-400 block">Estado Gantt</span>
                  <strong className="text-base font-extrabold text-emerald-400">{data.statusGantt}</strong>
                </div>
                <div className="bg-[#0f1b36] p-2.5 rounded-xl border border-[#1b2d54]">
                  <span className="text-[10px] text-slate-400 block">SPI (Tiempo)</span>
                  <strong className="text-base font-extrabold text-amber-400">{data.spi}</strong>
                </div>
                <div className="bg-[#0f1b36] p-2.5 rounded-xl border border-[#1b2d54]">
                  <span className="text-[10px] text-slate-400 block">CPI (Costo)</span>
                  <strong className="text-base font-extrabold text-emerald-400">{data.cpi}</strong>
                </div>
                <div className="bg-[#0f1b36] p-2.5 rounded-xl border border-[#1b2d54]">
                  <span className="text-[10px] text-slate-400 block">Presupuesto Consumido</span>
                  <strong className="text-base font-extrabold text-white">${data.budgetSpent}M de ${data.budgetApproved}M</strong>
                </div>
              </div>

              {/* Form 2 Execution Details */}
              <div className="bg-[#081022] p-3 rounded-xl border border-[#17284a] space-y-2">
                <h4 className="font-bold text-white uppercase text-[11px] border-b border-[#1b2d52] pb-1">
                  Control de Cronograma y SLA (Forms 2 / PMO)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Project Manager (PM):</span>
                    <span className="text-slate-200 font-semibold">{data.pm}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fecha Inicio Plan:</span>
                    <span className="text-slate-200 font-semibold">{data.startDatePlan} 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fecha Fin Compromiso (SLA):</span>
                    <span className="text-slate-200 font-semibold">{data.endDatePlan} 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Avance Físico Real:</span>
                    <span className="text-cyan-400 font-bold">{data.progressRealPct}% (Plan: {data.progressPlanPct}%)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {type === 'closedProject' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-[#0f1b36] p-2.5 rounded-xl border border-[#1b2d54]">
                  <span className="text-[10px] text-slate-400 block">ROI Real 90 Días</span>
                  <strong className="text-lg font-black text-emerald-400">{data.roiReal90DaysPct}%</strong>
                </div>
                <div className="bg-[#0f1b36] p-2.5 rounded-xl border border-[#1b2d54]">
                  <span className="text-[10px] text-slate-400 block">NPS Registrado</span>
                  <strong className="text-lg font-black text-cyan-400">{data.nps > 0 ? `${data.nps}/100` : 'Pendiente'}</strong>
                </div>
                <div className="bg-[#0f1b36] p-2.5 rounded-xl border border-[#1b2d54]">
                  <span className="text-[10px] text-slate-400 block">Beneficio Realizado</span>
                  <strong className="text-lg font-black text-emerald-400">${data.realBenefitMXN}M MXN</strong>
                </div>
                <div className="bg-[#0f1b36] p-2.5 rounded-xl border border-[#1b2d54]">
                  <span className="text-[10px] text-slate-400 block">Adopción del Usuario</span>
                  <strong className="text-lg font-black text-purple-400">{data.adoptionPct}%</strong>
                </div>
              </div>

              {/* Form 3 Details */}
              <div className="bg-[#081022] p-3 rounded-xl border border-[#17284a] space-y-2">
                <h4 className="font-bold text-white uppercase text-[11px] border-b border-[#1b2d52] pb-1">
                  Certificación de Cierre y Beneficios (Forms 3)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fecha Entrega Go-Live:</span>
                    <span className="text-slate-200 font-semibold">{data.deliveryDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Beneficio Comprometido Inicial:</span>
                    <span className="text-slate-200 font-semibold">${data.promisedBenefitMXN}M MXN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Calificación NPS:</span>
                    <span className="text-cyan-300 font-bold">{data.npsStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Trazabilidad de Cierre:</span>
                    <span className="text-emerald-400 font-bold">Forms 3 Validado</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#070e1e] p-3 border-t border-[#172748] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow transition-colors cursor-pointer"
          >
            Cerrar Detalle
          </button>
        </div>
      </div>
    </div>
  );
};
