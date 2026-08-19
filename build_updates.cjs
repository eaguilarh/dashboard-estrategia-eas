const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const utilsDir = path.join(srcDir, 'utils');
if (!fs.existsSync(utilsDir)) {
  fs.mkdirSync(utilsDir, { recursive: true });
}

// 1. Create formatters.ts
const formattersTs = xport const formatNumber = (val: number | undefined | null, maxDecimals: number = 2): string => {
  if (val === undefined || val === null || isNaN(val)) return '0';
  const rounded = Math.round((val + Number.EPSILON) * 100) / 100;
  return rounded.toLocaleString('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: maxDecimals });
};

export const formatMillions = (val: number | undefined | null): string => {
  return \$\M\;
};

export const normalizeDateStr = (dateStr: string): string => {
  if (!dateStr) return dateStr;
  let str = String(dateStr).trim();
  
  if (str.includes('/')) {
    const parts = str.split('/');
    if (parts.length >= 2) {
      const day = parseInt(parts[0]);
      const monthNum = parseInt(parts[1]);
      const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      if (!isNaN(day) && !isNaN(monthNum) && monthNum >= 1 && monthNum <= 12) {
        return \\ \\;
      }
    }
  }

  const spaceParts = str.split(' ');
  if (spaceParts.length >= 3 && !isNaN(Number(spaceParts[2]))) {
    return \\ \\;
  }
  return str;
};

export const parseMonthDay = (dateStr: string): { monthIdx: number; day: number } => {
  const str = String(dateStr || '').trim().toLowerCase();
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  let monthIdx = 6;
  let day = 15;

  if (str.includes('/')) {
    const parts = str.split('/');
    if (parts.length >= 2) {
      const parsedDay = parseInt(parts[0]);
      const parsedMonth = parseInt(parts[1]);
      if (!isNaN(parsedDay) && !isNaN(parsedMonth) && parsedMonth >= 1 && parsedMonth <= 12) {
        return { monthIdx: parsedMonth - 1, day: parsedDay };
      }
    }
  }

  const dayMatch = str.match(/\\d+/);
  if (dayMatch) day = parseInt(dayMatch[0]);

  for (let i = 0; i < months.length; i++) {
    if (str.includes(months[i])) {
      monthIdx = i;
      break;
    }
  }

  return { monthIdx, day };
};
;
fs.writeFileSync(path.join(utilsDir, 'formatters.ts'), formattersTs, 'utf8');
console.log('1. Created formatters.ts');

// 2. Update mockData.ts
const mockDataPath = path.join(srcDir, 'data', 'mockData.ts');
let mockDataContent = fs.readFileSync(mockDataPath, 'utf8');

const calculateAlertsCode = 
// Dynamic Helper for Alerts
export const calculateAlerts = (
  initiatives: Initiative[],
  projects: ProjectExecution[],
  closedProjects: ClosedProject[],
  kpis: PortfolioKPIs
): PortfolioAlert[] => {
  const alerts: PortfolioAlert[] = [];

  // 1. Desviación de tiempo / Riesgo (SPI < 0.90 o estatus En Riesgo / Atrasado)
  const riskyProjects = projects.filter(
    p => p.statusGantt === 'En Riesgo' || p.statusGantt === 'Atrasado' || (p.spi !== undefined && p.spi < 0.90)
  );
  if (riskyProjects.length > 0) {
    alerts.push({
      id: 'A1',
      type: 'danger',
      message: \\ proyecto(s) presentan desviación de tiempo o riesgo (SPI < 0.90 / Estatus en Riesgo).\,
      count: riskyProjects.length,
    });
  }

  // 2. Desviación presupuestal (CPI < 0.95 o gasto excede presupuesto aprobado)
  const budgetDeviated = projects.filter(
    p => (p.cpi !== undefined && p.cpi < 0.95) || (p.budgetSpent > 0 && p.budgetApproved > 0 && p.budgetSpent > p.budgetApproved)
  );
  if (budgetDeviated.length > 0) {
    alerts.push({
      id: 'A2',
      type: 'warning',
      message: \\ proyecto(s) registran desviación presupuestal (CPI < 0.95 o presupuesto excedido).\,
      count: budgetDeviated.length,
    });
  }

  // 3. Captura de beneficios (Forms 3) para proyectos finalizados
  const pendingF3 = projects.filter(p => (p.progressRealPct || 0) >= 100 || p.statusGantt === 'Completado');
  if (pendingF3.length > 0 || closedProjects.length > 0) {
    const count = Math.max(pendingF3.length, closedProjects.length);
    alerts.push({
      id: 'A3',
      type: 'warning',
      message: \\ proyecto(s) completados requieren evaluación de beneficios a 90 días (Forms 3).\,
      count,
    });
  }

  // 4. Iniciativas de alta prioridad sin proyecto asignado
  const highScorePending = initiatives.filter(
    i => (i.score || 0) >= 70 && !projects.some(p => p.initiativeId === i.id || p.name.includes(i.name))
  );
  if (highScorePending.length > 0) {
    alerts.push({
      id: 'A4',
      type: 'info',
      message: \\ iniciativa(s) de alta prioridad (Score ≥ 70) pendientes de pase a construcción.\,
      count: highScorePending.length,
    });
  }

  if (alerts.length === 0) {
    alerts.push({
      id: 'A0',
      type: 'info',
      message: 'Portafolio en estado óptimo: 100% de los proyectos avanzan conforme a parámetros normativos.',
      count: projects.length,
    });
  }

  return alerts;
};
;

if (!mockDataContent.includes('calculateAlerts')) {
  mockDataContent += calculateAlertsCode;
  fs.writeFileSync(mockDataPath, mockDataContent, 'utf8');
  console.log('2. Updated mockData.ts with calculateAlerts');
}