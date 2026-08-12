import { Initiative, ProjectExecution, ClosedProject } from '../types/dashboard';
import { mapExcelToInitiatives, mapExcelToProjects, mapExcelToClosedProjects } from './excelMapper';

export interface FormsApiConfig {
  webhookUrl: string;
  autoSyncEnabled: boolean;
  syncIntervalMinutes: number;
  lastSyncTimestamp: string | null;
  status: 'idle' | 'syncing' | 'success' | 'error';
  errorMessage?: string;
}

const DEFAULT_CONFIG_KEY = 'eas_forms_api_config';

export function getFormsApiConfig(): FormsApiConfig {
  try {
    const saved = localStorage.getItem(DEFAULT_CONFIG_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error reading forms API config:', e);
  }
  return {
    webhookUrl: '',
    autoSyncEnabled: false,
    syncIntervalMinutes: 5,
    lastSyncTimestamp: null,
    status: 'idle',
  };
}

export function saveFormsApiConfig(config: Partial<FormsApiConfig>): FormsApiConfig {
  const current = getFormsApiConfig();
  const updated = { ...current, ...config };
  try {
    localStorage.setItem(DEFAULT_CONFIG_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving forms API config:', e);
  }
  return updated;
}

/**
 * Fetches data from configured Webhook or API URL.
 * Accepts JSON arrays or objects containing rows.
 */
export async function fetchRemoteFormsData(url?: string): Promise<{
  initiatives?: Initiative[];
  projects?: ProjectExecution[];
  closedProjects?: ClosedProject[];
  timestamp: string;
}> {
  const targetUrl = url || getFormsApiConfig().webhookUrl;
  
  if (!targetUrl) {
    throw new Error('No hay URL de Webhook o API configurada.');
  }

  const response = await fetch(targetUrl, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error en el servidor API (Status ${response.status}): ${response.statusText}`);
  }

  const payload = await response.json();
  const timestamp = new Date().toLocaleString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // Check structure of payload
  let rawInitiatives: any[] = [];
  let rawProjects: any[] = [];
  let rawClosedProjects: any[] = [];

  if (Array.isArray(payload)) {
    rawInitiatives = payload;
  } else if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.initiatives)) rawInitiatives = payload.initiatives;
    else if (Array.isArray(payload.rows)) rawInitiatives = payload.rows;
    else if (Array.isArray(payload.data)) rawInitiatives = payload.data;

    if (Array.isArray(payload.projects)) rawProjects = payload.projects;
    if (Array.isArray(payload.closedProjects)) rawClosedProjects = payload.closedProjects;
  }

  const mappedInitiatives = rawInitiatives.length > 0 ? mapExcelToInitiatives(rawInitiatives) : undefined;
  const mappedProjects = rawProjects.length > 0 ? mapExcelToProjects(rawProjects) : undefined;
  const mappedClosedProjects = rawClosedProjects.length > 0 ? mapExcelToClosedProjects(rawClosedProjects) : undefined;

  saveFormsApiConfig({
    lastSyncTimestamp: timestamp,
    status: 'success',
    errorMessage: undefined,
  });

  return {
    initiatives: mappedInitiatives,
    projects: mappedProjects,
    closedProjects: mappedClosedProjects,
    timestamp,
  };
}
