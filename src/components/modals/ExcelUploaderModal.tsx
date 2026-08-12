import React, { useState, useEffect } from 'react';
import { X, UploadCloud, FileSpreadsheet, CheckCircle2, AlertCircle, Zap, RefreshCw, Link2, Info, HelpCircle } from 'lucide-react';
import * as XLSX from 'xlsx';
import { getFormsApiConfig, saveFormsApiConfig, fetchRemoteFormsData, FormsApiConfig } from '../../services/formsApiService';

interface ExcelUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataLoaded: (data: any) => void;
}

export const ExcelUploaderModal: React.FC<ExcelUploaderModalProps> = ({ isOpen, onClose, onDataLoaded }) => {
  const [activeTab, setActiveTab] = useState<'live' | 'manual'>('live');
  const [selectedModule, setSelectedModule] = useState<'forms1' | 'forms2' | 'forms3'>('forms1');
  
  // File upload state
  const [fileName, setFileName] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<any[] | null>(null);

  // Live Api State
  const [apiConfig, setApiConfig] = useState<FormsApiConfig>(getFormsApiConfig());
  const [webhookUrlInput, setWebhookUrlInput] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  // Status message
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      const cfg = getFormsApiConfig();
      setApiConfig(cfg);
      setWebhookUrlInput(cfg.webhookUrl);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);

        setParsedData(data);
        setStatus('success');
        setMessage(`¡Archivo "${file.name}" leído exitosamente! Se procesaron ${data.length} registros.`);
      } catch (err) {
        setStatus('error');
        setMessage('Error al leer el archivo Excel. Asegúrate de cargar un formato válido (.xlsx).');
      }
    };

    reader.readAsBinaryString(file);
  };

  const handleApplyManual = () => {
    if (parsedData) {
      onDataLoaded({ module: selectedModule, rows: parsedData });
      setStatus('success');
      setMessage('Datos recalculados y aplicados con éxito desde archivo Excel.');
      setTimeout(onClose, 800);
    } else {
      setStatus('error');
      setMessage('Por favor, selecciona y carga un archivo Excel primero.');
    }
  };

  const handleSaveApiConfig = () => {
    const updated = saveFormsApiConfig({ webhookUrl: webhookUrlInput });
    setApiConfig(updated);
    setStatus('success');
    setMessage('Configuración de URL Webhook guardada correctamente.');
  };

  const handleTestSync = async () => {
    setIsSyncing(true);
    setStatus('idle');
    try {
      if (!webhookUrlInput.trim()) {
        throw new Error('Ingresa una URL de Webhook válida de Power Automate o API.');
      }
      
      saveFormsApiConfig({ webhookUrl: webhookUrlInput });
      const result = await fetchRemoteFormsData(webhookUrlInput);

      if (result.initiatives && result.initiatives.length > 0) {
        onDataLoaded({ module: 'live_initiatives', data: result.initiatives });
      }

      setStatus('success');
      setMessage(`Sincronización exitosa. Última actualización: ${result.timestamp}`);
      setApiConfig(getFormsApiConfig());
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Error al conectar con la URL Webhook de Forms.');
    } finally {
      setIsSyncing(false);
    }
  };

  // Demo simulation function for testing without Power Automate
  const handleSimulateNewInitiative = () => {
    const demoInitiative = {
      "Nombre de la iniciativa": "Iniciativa de Prueba Forms (" + new Date().toLocaleTimeString() + ")",
      "Área": "Tecnología de la Información",
      "Sponsor": "Enrique Aguilar",
      "Pregunta 4": "Sí",
      "Pregunta 5": "Alto",
      "Pregunta 6": "Alto",
      "Pregunta 7": "Revolucionario",
      "Pregunta 8": 3,
      "Pregunta 9": 4,
      "Pregunta 10": "10+",
      "Pregunta 11": "Documentado",
      "Pregunta 12": "Excelente",
      "Pregunta 13": "Flujo documentado, Salida clara, Reglas de negocio, Propietario de proceso",
      "Inversión requerida": 0.05,
      "Beneficio potencial": 0.25,
      "Time to value": 2
    };

    onDataLoaded({ module: 'forms1', rows: [demoInitiative] });
    setStatus('success');
    setMessage('⚡ ¡Simulación exitosa! Se ha integrado una nueva iniciativa directamente al Dashboard.');
    setTimeout(onClose, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 select-none animate-fadeIn">
      <div className="bg-[#0b1328] border border-[#1e2f54] rounded-2xl w-full max-w-xl shadow-2xl p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1d2d4f] pb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-700 text-white shadow-lg shadow-cyan-950">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Integración de Datos MS Forms / SharePoint</h3>
              <p className="text-xs text-slate-400">Automatización e Importación de Iniciativas en Tiempo Real</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Tabs (Live Sync vs Manual Excel) */}
        <div className="grid grid-cols-2 gap-2 bg-[#070e1c] p-1.5 rounded-xl border border-[#1d2d4f] text-xs font-bold">
          <button
            onClick={() => { setActiveTab('live'); setStatus('idle'); }}
            className={`py-2 rounded-lg flex items-center justify-center space-x-2 transition-all ${
              activeTab === 'live'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Automatización en Vivo (Power Automate)</span>
          </button>

          <button
            onClick={() => { setActiveTab('manual'); setStatus('idle'); }}
            className={`py-2 rounded-lg flex items-center justify-center space-x-2 transition-all ${
              activeTab === 'manual'
                ? 'bg-[#1e2f54] text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Carga Manual de Excel (.xlsx)</span>
          </button>
        </div>

        {/* TAB 1: LIVE AUTOMATION POWER AUTOMATE */}
        {activeTab === 'live' && (
          <div className="space-y-4">
            <div className="bg-[#0f1b36] border border-[#1d325a] rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-200 flex items-center space-x-2">
                  <Link2 className="w-4 h-4 text-cyan-400" />
                  <span>URL de Endpoint / Webhook (Power Automate):</span>
                </label>
                <button
                  onClick={() => setShowInstructions(!showInstructions)}
                  className="text-[11px] text-cyan-400 hover:underline flex items-center space-x-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>¿Cómo configurar en MS 365?</span>
                </button>
              </div>

              <div className="flex space-x-2">
                <input
                  type="url"
                  placeholder="https://prod-xx.westus.logic.azure.com/workflows/..."
                  value={webhookUrlInput}
                  onChange={(e) => setWebhookUrlInput(e.target.value)}
                  className="flex-1 bg-[#060c19] border border-[#1d2d4f] rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                />
                <button
                  onClick={handleSaveApiConfig}
                  className="px-3 py-2 bg-[#1b2b4d] hover:bg-[#253966] text-cyan-300 text-xs font-medium rounded-lg transition-colors"
                >
                  Guardar
                </button>
              </div>

              {/* Status information */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-[#1a2b4c]">
                <span>Última sincronización: <strong className="text-slate-200">{apiConfig.lastSyncTimestamp || 'Ninguna'}</strong></span>
                <span className="flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-emerald-400 font-semibold">Listo para recibir respuestas</span>
                </span>
              </div>
            </div>

            {/* Step-by-step instructions collapsable */}
            {showInstructions && (
              <div className="bg-[#070e1c] border border-cyan-500/30 rounded-xl p-4 text-xs text-slate-300 space-y-2 animate-fadeIn">
                <h4 className="font-bold text-cyan-300 flex items-center space-x-1">
                  <Info className="w-4 h-4" />
                  <span>Pasos para conectar Microsoft Forms a este Dashboard:</span>
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-300">
                  <li>Abre <strong>Microsoft Power Automate</strong> en tu cuenta de Office 365.</li>
                  <li>Crea un <i>Automated Cloud Flow</i> con detonador: <strong>"When a new response is submitted"</strong> (Microsoft Forms).</li>
                  <li>Agrega la acción <strong>"Get response details"</strong> para extraer los datos del formulario.</li>
                  <li>Agrega la acción <strong>"HTTP POST"</strong> enviando el objeto JSON a tu Webhook o API pública.</li>
                  <li>¡Listo! Cada envío en Forms enviará la iniciativa en tiempo real a este Dashboard.</li>
                </ol>
              </div>
            )}

            {/* Test buttons */}
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={handleSimulateNewInitiative}
                className="px-3 py-2 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-medium rounded-lg transition-all flex items-center space-x-1.5"
              >
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Simular registro de Forms ahora</span>
              </button>

              <button
                onClick={handleTestSync}
                disabled={isSyncing}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-md shadow-blue-950 flex items-center space-x-2 transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Sincronizando...' : 'Sincronizar Datos Remotos'}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: MANUAL EXCEL UPLOAD */}
        {activeTab === 'manual' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
              <button
                onClick={() => { setSelectedModule('forms1'); setParsedData(null); setFileName(null); setStatus('idle'); }}
                className={`py-2 px-2 rounded-lg border text-center transition-all ${
                  selectedModule === 'forms1'
                    ? 'bg-blue-600 text-white border-cyan-400 shadow-md shadow-blue-900/50'
                    : 'bg-[#0f1b36] text-slate-400 border-[#1d2d4f] hover:text-slate-200'
                }`}
              >
                1. Iniciativas (Forms 1)
              </button>

              <button
                onClick={() => { setSelectedModule('forms2'); setParsedData(null); setFileName(null); setStatus('idle'); }}
                className={`py-2 px-2 rounded-lg border text-center transition-all ${
                  selectedModule === 'forms2'
                    ? 'bg-cyan-600 text-white border-cyan-300 shadow-md shadow-cyan-900/50'
                    : 'bg-[#0f1b36] text-slate-400 border-[#1d2d4f] hover:text-slate-200'
                }`}
              >
                2. Proyectos (Forms 2)
              </button>

              <button
                onClick={() => { setSelectedModule('forms3'); setParsedData(null); setFileName(null); setStatus('idle'); }}
                className={`py-2 px-2 rounded-lg border text-center transition-all ${
                  selectedModule === 'forms3'
                    ? 'bg-emerald-600 text-white border-emerald-300 shadow-md shadow-emerald-900/50'
                    : 'bg-[#0f1b36] text-slate-400 border-[#1d2d4f] hover:text-slate-200'
                }`}
              >
                3. Beneficios (Forms 3)
              </button>
            </div>

            <div className="border-2 border-dashed border-[#1d325a] hover:border-cyan-400/60 rounded-xl p-6 text-center bg-[#070e1c] transition-colors relative cursor-pointer group">
              <input
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <UploadCloud className="w-10 h-10 text-cyan-400 mx-auto group-hover:scale-110 transition-transform mb-2" />
              <p className="text-xs font-semibold text-slate-200">
                Haz clic aquí para seleccionar o arrastra el archivo Excel (.xlsx)
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                Descargado desde SharePoint / Microsoft Forms
              </p>
              {fileName && (
                <div className="mt-3 inline-block bg-blue-950 text-cyan-300 text-xs px-3 py-1 rounded-md border border-cyan-500/40 font-mono">
                  📄 {fileName}
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleApplyManual}
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold rounded-lg shadow-md transition-all"
              >
                Aplicar Excel y Recalcular
              </button>
            </div>
          </div>
        )}

        {/* STATUS ALERT NOTIFICATION */}
        {status === 'success' && (
          <div className="bg-emerald-950/90 border border-emerald-500/40 text-emerald-200 text-xs p-3 rounded-xl flex items-center space-x-2.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-rose-950/90 border border-rose-500/40 text-rose-200 text-xs p-3 rounded-xl flex items-center space-x-2.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-[#1d2d4f]">
          <span className="text-[11px] text-slate-500">Dashboard EAS Strategy v1.0 • Power Automate Compatible</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#121f3b] hover:bg-[#1a2d54] text-slate-300 text-xs font-semibold rounded-lg transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
