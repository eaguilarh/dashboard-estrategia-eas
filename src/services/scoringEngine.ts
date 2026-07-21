export interface Forms1Input {
  initiativeName: string;
  area: string;
  isBackofficeExpense: boolean;
  timeSavings: 'Nulo' | 'Bajo' | 'Medio' | 'Alto' | 'Crítico';
  economicImpact: 'Nulo' | 'Bajo' | 'Medio' | 'Alto' | 'Crítico';
  efficiencyLevel: 'Mejora ligera' | 'Mejora moderada' | 'Automatización significativa' | 'Automatización casi total';
  impactedAreasCount: number;
  currentSituationsCount: number;
  monthlyFrequency: 'Menos de 3' | '3-5' | '5-10' | 'Más de 10';
  requirementClarity: 'Idea general' | 'Parcialmente definido' | 'Definido' | 'Totalmente definido';
  dataQuality: 'No disponible' | 'Parcial' | 'Mayormente disponible' | 'Completa';
  hasDocumentedFlow: boolean;
  hasClearOutput: boolean;
  hasBusinessRules: boolean;
  hasProcessOwner: boolean;
}

export function calculateInitiativeScore(input: Forms1Input): { score: number; value: 'Alto' | 'Bajo'; effort: 'Alto' | 'Bajo'; quadrant: 'Quick Wins' | 'Apuestas Estratégicas' | 'Relleno' | 'Baja Prioridad' } {
  let points = 0;

  // 1. Area expense factor
  if (!input.isBackofficeExpense) points += 1.0;

  // 2. Time savings
  const timeMap: Record<string, number> = { 'Nulo': 0, 'Bajo': 0.25, 'Medio': 0.50, 'Alto': 0.75, 'Crítico': 1.00 };
  points += timeMap[input.timeSavings] || 0;

  // 3. Economic impact
  const econMap: Record<string, number> = { 'Nulo': 0, 'Bajo': 0.25, 'Medio': 0.50, 'Alto': 0.75, 'Crítico': 1.00 };
  points += econMap[input.economicImpact] || 0;

  // 4. Efficiency level
  const effMap: Record<string, number> = {
    'Mejora ligera': 0.25,
    'Mejora moderada': 0.50,
    'Automatización significativa': 0.75,
    'Automatización casi total': 1.00
  };
  points += effMap[input.efficiencyLevel] || 0;

  // 5. Impacted areas
  points += Math.min(input.impactedAreasCount * 0.20, 1.0);

  // 6. Current situation
  points += Math.min(input.currentSituationsCount * 0.15, 0.75);

  // 7. Monthly frequency
  const freqMap: Record<string, number> = { 'Menos de 3': 0.25, '3-5': 0.50, '5-10': 0.75, 'Más de 10': 1.00 };
  points += freqMap[input.monthlyFrequency] || 0;

  // 8. Requirement clarity
  const reqMap: Record<string, number> = { 'Idea general': 0, 'Parcialmente definido': 0.25, 'Definido': 0.50, 'Totalmente definido': 0.75 };
  points += reqMap[input.requirementClarity] || 0;

  // 9. Data quality
  const dataMap: Record<string, number> = { 'No disponible': -2.00, 'Parcial': 0.25, 'Mayormente disponible': 0.75, 'Completa': 1.00 };
  points += dataMap[input.dataQuality] || 0;

  // 10. Checklist
  if (input.hasDocumentedFlow) points += 0.25;
  if (input.hasClearOutput) points += 0.25;
  if (input.hasBusinessRules) points += 0.25;
  if (input.hasProcessOwner) points += 0.25;

  // Scale to 0 - 100
  // Max potential points ~ 8.75, min ~ -1.5
  const normalizedScore = Math.max(0, Math.min(100, Math.round((points / 8.5) * 100)));

  // Quadrant classification
  const value: 'Alto' | 'Bajo' = normalizedScore >= 75 ? 'Alto' : 'Bajo';
  const effortScore = (input.hasDocumentedFlow ? 1 : 0) + (input.dataQuality === 'Completa' ? 1 : 0);
  const effort: 'Alto' | 'Bajo' = effortScore >= 1 ? 'Bajo' : 'Alto';

  let quadrant: 'Quick Wins' | 'Apuestas Estratégicas' | 'Relleno' | 'Baja Prioridad' = 'Quick Wins';
  if (value === 'Alto' && effort === 'Bajo') quadrant = 'Quick Wins';
  else if (value === 'Alto' && effort === 'Alto') quadrant = 'Apuestas Estratégicas';
  else if (value === 'Bajo' && effort === 'Bajo') quadrant = 'Relleno';
  else quadrant = 'Baja Prioridad';

  return { score: normalizedScore, value, effort, quadrant };
}
