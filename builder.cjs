const fs = require('fs');
const path = require('path');
const src = path.join(__dirname, 'src');

// 1. mockData.ts
const mockPath = path.join(src, 'data', 'mockData.ts');
let mockContent = fs.readFileSync(mockPath, 'utf8');
if (!mockContent.includes('calculateAlerts')) {
  mockContent += '\nexport const calculateAlerts = (initiatives, projects, closedProjects, kpis) => {\n' +
   '  const alerts = [];\n' +
   '  const risky = projects.filter(p => p.statusGantt === "En Riesgo" || p.statusGantt === "Atrasado" || (p.spi !== undefined && p.spi < 0.90));\n' +
   '  if (risky.length > 0) {\n' +
   '    alerts.push({ id: "A1", type: "danger", message: risky.length + " proyecto(s) presentan desviación de tiempo o riesgo (SPI < 0.90 / Estatus en Riesgo).", count: risky.length });\n' +
   '  }\n' +
   '  const budgetDev = projects.filter(p => (p.cpi !== undefined && p.cpi < 0.95) || (p.budgetSpent > 0 && p.budgetApproved > 0 && p.budgetSpent > p.budgetApproved));\n' +
   '  if (budgetDev.length > 0) {\n' +
   '    alerts.push({ id: "A2", type: "warning", message: budgetDev.length + " proyecto(s) registran desviación presupuestal (CPI < 0.95 o presupuesto excedido).", count: budgetDev.length });\n' +
   '  }\n' +
   '  const pendingF3 = projects.filter(p => (p.progressRealPct || 0) >= 100 || p.statusGantt === "Completado");\n' +
    '  if (pendingF3.length > 0 || closedProjects.length > 0) {' +
   '    const count = Math.max(pendingF3.length, closedProjects.length);\n' +
   '    alerts.push({ id: "A3", type: "warning", message: count + " proyecto(s) finalizados requieren evaluación de beneficios a 90 días (Forms 3).", count });\n' +
   '  }\n' +
   '  const highScorePending = initiatives.filter(i => (i.score || 0) >= 70 && !projects.some(p => p.initiativeId === i.id || p.name.includes(i.name)));\n' +
   '  if (highScorePending.length > 0) {\n' +
   '    alerts.push({ id: "A4", type: "info", message: highScorePending.length + " iniciativa(s) de alta prioridad (Score >= 70) pendientes de pase a construcción.", count: highScorePending.length });\n' +
   '  }\n' +
    '  if (alerts.length === 0) {c' +
    '    alerts.push({ id: "A2", type: "info", message: "Portafolio en estado óptimo: 100% de los proyectos avanzan conforme a parámetros normativos.", count: projects.length });\n' +
    '  }\n' +
   '  return alerts;\n' +
   '};\n';
  fs.writeFileSync(mockPath, mockContent, 'utf8');
  console.log('mockData.ts updated');
}
