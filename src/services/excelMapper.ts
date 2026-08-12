import { Initiative, ProjectExecution, ClosedProject, PortfolioKPIs, PortfolioAlert } from '../types/dashboard';
import { calculateInitiativeScore, Forms1Input } from './scoringEngine';

// Parse Excel column names safely (handling accents, casing, and varying forms headers)
function getCellValue(row: any, keys: string[]): any {
  const normalizedRow: Record<string, any> = {};
  for (const k of Object.keys(row)) {
    normalizedRow[k.toLowerCase().trim()] = row[k];
  }
  for (const key of keys) {
    const val = normalizedRow[key.toLowerCase().trim()];
    if (val !== undefined) return val;
  }
  return undefined;
}

export function cleanInitiativeTitle(raw: string): string {
  if (!raw) return 'Iniciativa sin nombre';
  let str = String(raw).trim();
  if (str.startsWith('1. ')) {
    str = str.substring(3).trim();
  }
  if (str.toLowerCase().includes('prospección comercial') || str.toLowerCase().includes('prospeccion comercial') || str.toLowerCase().includes('inteligencia artificial para centralizar')) {
    return 'Plataforma de Prospección Comercial con IA';
  }
  if (str.length <= 65) return str;
  const firstSentence = str.split('.')[0].trim();
  if (firstSentence.length > 0 && firstSentence.length <= 65) return firstSentence;
  return str.substring(0, 60) + '...';
}

/**
 * Maps Excel row array from Microsoft Forms 1 (Ingreso de Iniciativas) into Dashboard Initiatives.
 */
export function mapExcelToInitiatives(rows: any[]): Initiative[] {
  return rows.map((row, index) => {
    // Basic fields: Title must strictly be extracted from Column F (index 5) or matching headers
    const rowKeys = Object.keys(row);
    const colFValue = rowKeys.length >= 6 ? row[rowKeys[5]] : undefined;

    const rawName = colFValue ||
      getCellValue(row, ['f', 'columna f', 'pregunta f', 'nombre de la iniciativa', 'título de la iniciativa', 'titulo de la iniciativa', 'iniciativa', 'nombre', 'pregunta 1', 'pregunta 2']) ||
      `Iniciativa ${index + 1}`;
    const name = cleanInitiativeTitle(rawName);
    const area = getCellValue(row, ['Área', 'area', 'departamento', 'pregunta 3']) || 'Operaciones';
    const sponsor = getCellValue(row, ['Sponsor', 'patrocinador', 'responsable']) || 'Dirección General';

    // Map Questions 4 to 13 (Forms 1 Scoring Inputs)
    // Question 4: Is Backoffice Expense?
    const q4Val = String(getCellValue(row, ['pregunta 4', 'gasto de backoffice', 'gasto']) || '').toLowerCase();
    const isBackofficeExpense = q4Val.includes('sí') || q4Val.includes('yes') || q4Val.includes('true');

    // Question 5: Time savings
    const timeSavings = (getCellValue(row, ['pregunta 5', 'ahorro de tiempo']) || 'Medio') as any;

    // Question 6: Economic impact
    const economicImpact = (getCellValue(row, ['pregunta 6', 'impacto económico', 'impacto economico']) || 'Medio') as any;

    // Question 7: Efficiency level
    const efficiencyLevel = (getCellValue(row, ['pregunta 7', 'nivel de eficiencia', 'eficiencia']) || 'Mejora moderada') as any;

    // Question 8: Impacted areas count
    const impactedAreasCount = Number(getCellValue(row, ['pregunta 8', 'áreas impactadas', 'areas impactadas']) || 1);

    // Question 9: Current situations count
    const currentSituationsCount = Number(getCellValue(row, ['pregunta 9', 'situaciones actuales', 'situacion actual']) || 1);

    // Question 10: Monthly frequency
    const monthlyFrequency = (getCellValue(row, ['pregunta 10', 'frecuencia mensual']) || '3-5') as any;

    // Question 11: Requirement clarity
    const requirementClarity = (getCellValue(row, ['pregunta 11', 'claridad del requerimiento', 'requerimientos']) || 'Idea general') as any;

    // Question 12: Data quality
    const dataQuality = (getCellValue(row, ['pregunta 12', 'calidad de datos', 'calidad de la informacion']) || 'Parcial') as any;

    // Question 13 Checklist items
    const checklistVal = String(getCellValue(row, ['pregunta 13', 'checklist', 'elementos clave']) || '').toLowerCase();
    const hasDocumentedFlow = checklistVal.includes('flujo documentado') || checklistVal.includes('proceso documentado');
    const hasClearOutput = checklistVal.includes('salida clara') || checklistVal.includes('output claro');
    const hasBusinessRules = checklistVal.includes('reglas de negocio');
    const hasProcessOwner = checklistVal.includes('propietario de proceso') || checklistVal.includes('dueño del proceso');

    // Extra variables
    const investmentRequired = Number(getCellValue(row, ['inversión requerida', 'inversión', 'costo estimado', 'inversion']) || 5);
    const potentialBenefit = Number(getCellValue(row, ['beneficio potencial', 'beneficio estimado', 'retorno estimado']) || 10);
    const timeToValueMonths = Number(getCellValue(row, ['time to value', 'tiempo de entrega', 'meses']) || 6);

    const formsInput: Forms1Input = {
      initiativeName: name,
      area,
      isBackofficeExpense,
      timeSavings,
      economicImpact,
      efficiencyLevel,
      impactedAreasCount,
      currentSituationsCount,
      monthlyFrequency,
      requirementClarity,
      dataQuality,
      hasDocumentedFlow,
      hasClearOutput,
      hasBusinessRules,
      hasProcessOwner,
    };

    // Calculate score, quadrant, effort
    const result = calculateInitiativeScore(formsInput);

    // Standard categorisation based on name or category column
    const categoryVal = String(getCellValue(row, ['categoría', 'categoria', 'tipo']) || '').toLowerCase();
    let category: Initiative['category'] = 'Transformación Digital';
    if (categoryVal.includes('experiencia') || categoryVal.includes('cx') || categoryVal.includes('customer')) {
      category = 'Customer Experience';
    } else if (categoryVal.includes('automa') || categoryVal.includes('robot') || categoryVal.includes('rpa')) {
      category = 'Automatización';
    } else if (categoryVal.includes('complian') || categoryVal.includes('legal') || categoryVal.includes('regula')) {
      category = 'Compliance';
    }

    // Expected ROI = (Potential Benefit / Investment) * 100
    const roiExpected = investmentRequired > 0 ? Math.round((potentialBenefit / investmentRequired) * 100) : 150;

    return {
      id: String(getCellValue(row, ['id', 'id_iniciativa']) || index + 1),
      rank: index + 1,
      name,
      area,
      sponsor,
      score: result.score,
      roiExpected,
      investmentRequired,
      potentialBenefit,
      timeToValueMonths,
      effort: result.effort,
      value: result.value,
      quadrant: result.quadrant,
      category,
    };
  });
}

/**
 * Maps Excel row array from Microsoft Forms 2 (Ejecución de Proyectos) into ProjectExecution structures.
 */
export function mapExcelToProjects(rows: any[]): ProjectExecution[] {
  return rows.map((row, index) => {
    const name = getCellValue(row, ['Nombre de proyecto', 'proyecto', 'nombre']) || `Proyecto ${index + 1}`;
    const area = getCellValue(row, ['Área', 'area']) || 'Operaciones';
    const sponsor = getCellValue(row, ['Sponsor', 'patrocinador']) || 'Dirección General';
    const pm = getCellValue(row, ['PM', 'project manager', 'responsable']) || 'Carlos Ruiz';

    const startDatePlan = getCellValue(row, ['Fecha_Inicio', 'inicio planificado', 'inicio']) || '01 Ene';
    const endDatePlan = getCellValue(row, ['Fecha_Fin', 'fin planificado', 'fin']) || '31 Dic';

    const budgetApproved = Number(getCellValue(row, ['Presupuesto_Aprobado', 'presupuesto aprobado', 'presupuesto']) || 10);
    const budgetSpent = Number(getCellValue(row, ['Presupuesto_Consumido', 'presupuesto consumido', 'ejercido']) || 5);

    const progressPlanPct = Number(getCellValue(row, ['Progreso_Plan_Pct', 'avance planeado', 'progreso planeado']) || 50);
    const progressRealPct = Number(getCellValue(row, ['Progreso_Real_Pct', 'avance real', 'progreso real']) || 45);

    const statusGanttVal = String(getCellValue(row, ['Estado_Salud', 'salud', 'estado']) || 'On Track');
    let statusGantt: ProjectExecution['statusGantt'] = 'On Track';
    if (statusGanttVal.toLowerCase().includes('riesgo')) statusGantt = 'En Riesgo';
    else if (statusGanttVal.toLowerCase().includes('atrasa')) statusGantt = 'Atrasado';
    else if (statusGanttVal.toLowerCase().includes('sin') || progressRealPct === 0) statusGantt = 'Sin Iniciar';
    else if (statusGanttVal.toLowerCase().includes('comple')) statusGantt = 'Completado';

    // Calculate SPI and CPI automatically
    const spi = progressPlanPct > 0 ? Number((progressRealPct / progressPlanPct).toFixed(2)) : 1.00;
    const cpi = budgetSpent > 0 ? Number(((progressRealPct / 100 * budgetApproved) / budgetSpent).toFixed(2)) : 1.00;

    // Time health based on SPI
    let timeHealth: ProjectExecution['timeHealth'] = 'Verde';
    if (spi < 0.85) timeHealth = 'Rojo';
    else if (spi < 0.95) timeHealth = 'Amarillo';

    // Cost health based on CPI
    let costHealth: ProjectExecution['costHealth'] = 'Verde';
    if (cpi < 0.85) costHealth = 'Rojo';
    else if (cpi < 0.95) costHealth = 'Amarillo';

    return {
      id: String(getCellValue(row, ['id_proyecto', 'id']) || `P${index + 1}`),
      name,
      area,
      sponsor,
      pm,
      startDatePlan: String(startDatePlan),
      endDatePlan: String(endDatePlan),
      budgetApproved,
      budgetSpent,
      progressPlanPct,
      progressRealPct,
      statusGantt,
      timeHealth,
      costHealth,
      scopeHealth: 'Verde',
      riskHealth: 'Verde',
      spi,
      cpi
    };
  });
}

/**
 * Maps Excel row array from Microsoft Forms 3 (NPS, ROI y Cierre) into ClosedProject structures.
 */
export function mapExcelToClosedProjects(rows: any[]): ClosedProject[] {
  return rows.map((row, index) => {
    const name = getCellValue(row, ['Nombre de proyecto', 'proyecto', 'nombre']) || `Proyecto ${index + 1}`;
    const area = getCellValue(row, ['Área', 'area']) || 'Operaciones';
    const deliveryDate = getCellValue(row, ['Fecha_Entrega', 'fecha de entrega', 'entrega']) || '31 Ene 2026';

    const realBenefitMXN = Number(getCellValue(row, ['Beneficio_Real_Capturado', 'beneficio real', 'beneficio']) || 10);
    const promisedBenefitMXN = Number(getCellValue(row, ['Beneficio_Esperado_Original', 'beneficio prometido', 'beneficio esperado']) || 12);
    const costFinal = Number(getCellValue(row, ['Costo_Final_Implementacion', 'costo final', 'presupuesto consumido']) || 5);

    const nps = Number(getCellValue(row, ['NPS', 'nps score', 'satisfaccion']) || 80);
    const adoptionPct = Number(getCellValue(row, ['Adopcion_Pct', 'adopcion', 'adopción']) || 85);

    // Expected ROI vs Real ROI calculations
    const roiExpectedPct = costFinal > 0 ? Math.round((promisedBenefitMXN / costFinal) * 100) : 100;
    const roiReal90DaysPct = costFinal > 0 ? Math.round((realBenefitMXN / costFinal) * 100) : 100;

    let npsStatus: ClosedProject['npsStatus'] = 'Bueno';
    if (nps >= 80) npsStatus = 'Excelente';
    else if (nps >= 50) npsStatus = 'Bueno';
    else if (nps === 0) npsStatus = 'Pendiente';
    else npsStatus = 'Bajo';

    return {
      id: String(getCellValue(row, ['id_cierre', 'id']) || `C${index + 1}`),
      name,
      area,
      deliveryDate: String(deliveryDate),
      roiExpectedPct,
      roiReal90DaysPct,
      nps,
      npsStatus,
      adoptionPct,
      realBenefitMXN,
      promisedBenefitMXN
    };
  });
}
