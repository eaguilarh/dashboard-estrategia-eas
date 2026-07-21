import React, { useState } from 'react';
import { X, UploadCloud, FileSpreadsheet, CheckCircle2, AlertCircle } from 'lucide-react';
import * as XLSX from 'xlsx';

interface ExcelUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataLoaded: (data: any) => void;
}

export const ExcelUploaderModal: React.FC<ExcelUploaderModalProps> = ({ isOpen, onClose, onDataLoaded }) => {
  const [selectedModule, setSelectedModule] = useState<'forms1' | 'forms2' | 'forms3'>('forms1');
  const [fileName, setFileName] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

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

        setStatus('success');
        setMessage(`¡Archivo "${file.name}" leído exitosamente! Se procesaron ${data.length} registros.`);
        onDataLoaded({ module: selectedModule, rows: data });
      } catch (err) {
        setStatus('error');
        setMessage('Error al leer el archivo Excel. Asegúrate de cargar un formato válido (.xlsx).');
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 select-none animate-fadeIn">
      <div className="bg-[#0b1328] border border-[#1e2f54] rounded-2xl w-full max-w-lg shadow-2xl p-5 space-y-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#1d2d4f] pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-blue-900/50 text-cyan-400 border border-blue-500/30">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Sincronizador de Datos Excel / Forms</h3>
              <p className="text-xs text-slate-400">Actualiza el dashboard desde respuestas de SharePoint</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Module Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
          <button
            onClick={() => setSelectedModule('forms1')}
            className={`py-2 px-2 rounded-lg border text-center transition-all ${
              selectedModule === 'forms1'
                ? 'bg-blue-600 text-white border-cyan-400 shadow-md shadow-blue-900/50'
                : 'bg-[#0f1b36] text-slate-400 border-[#1d2d4f] hover:text-slate-200'
            }`}
          >
            1. Iniciativas (Forms 1)
          </button>

          <button
            onClick={() => setSelectedModule('forms2')}
            className={`py-2 px-2 rounded-lg border text-center transition-all ${
              selectedModule === 'forms2'
                ? 'bg-cyan-600 text-white border-cyan-300 shadow-md shadow-cyan-900/50'
                : 'bg-[#0f1b36] text-slate-400 border-[#1d2d4f] hover:text-slate-200'
            }`}
          >
            2. Proyectos (Forms 2)
          </button>

          <button
            onClick={() => setSelectedModule('forms3')}
            className={`py-2 px-2 rounded-lg border text-center transition-all ${
              selectedModule === 'forms3'
                ? 'bg-emerald-600 text-white border-emerald-300 shadow-md shadow-emerald-900/50'
                : 'bg-[#0f1b36] text-slate-400 border-[#1d2d4f] hover:text-slate-200'
            }`}
          >
            3. Beneficios (Forms 3)
          </button>
        </div>

        {/* File Drop Area */}
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

        {/* Status Notification */}
        {status === 'success' && (
          <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs p-3 rounded-lg flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs p-3 rounded-lg flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Actions Footer */}
        <div className="flex items-center justify-end space-x-3 pt-2 border-t border-[#1d2d4f]">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#121f3b] hover:bg-[#1a2d54] text-slate-300 text-xs font-semibold rounded-lg transition-colors"
          >
            Cerrar
          </button>
          <button
            onClick={() => {
              setStatus('success');
              setMessage('Datos recalculados con éxito.');
              setTimeout(onClose, 800);
            }}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-semibold rounded-lg shadow-md shadow-blue-950 transition-all"
          >
            Aplicar y Recalcular
          </button>
        </div>
      </div>
    </div>
  );
};
