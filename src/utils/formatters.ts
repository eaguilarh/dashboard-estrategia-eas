export const formatNumber = (num: number | undefined | null, decimals: number = 2): string => {
  if (num === undefined || num === null || isNaN(num)) return '0.00';
  return num.toLocaleString('es-MX', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const formatMillions = (num: number | undefined | null): string => {
  if (num === undefined || num === null || isNaN(num)) return '$0.00 M';
  const absNum = Math.abs(num);
  const val = absNum > 1000 ? absNum / 1_000_000 : absNum;
  return `$${formatNumber(val, 2)} M`;
};

export const normalizeDateStr = (rawDate: string): string => {
  if (!rawDate) return '';
  let str = String(rawDate).trim();
  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  if (str.includes('/')) {
    const parts = str.split('/');
    if (parts.length >= 2) {
      const day = parseInt(parts[0], 10);
      const monthIdx = parseInt(parts[1], 10) - 1;
      if (!isNaN(day) && !isNaN(monthIdx) && monthNames[monthIdx]) {
        return `${day} ${monthNames[monthIdx]}`;
      }
    }
  }

  if (str.includes('-') && str.length >= 8) {
    const parts = str.split('-');
    if (parts.length === 3 && parts[0].length === 4) {
      const day = parseInt(parts[2], 10);
      const monthIdx = parseInt(parts[1], 10) - 1;
      if (!isNaN(day) && !isNaN(monthIdx) && monthNames[monthIdx]) {
        return `${day} ${monthNames[monthIdx]}`;
      }
    }
  }

  const spaceParts = str.split(' ');
  if (spaceParts.length >= 3 && !isNaN(Number(spaceParts[2]))) {
    return `${spaceParts[0]} ${spaceParts[1]}`;
  }

  return str;
};

export const parseMonthDay = (dateStr: string): { monthIdx: number; day: number } => {
  const normalized = normalizeDateStr(dateStr);
  const monthsMap: Record<string, number> = {
    ene: 0, feb: 1, mar: 2, abr: 3, may: 4, jun: 5,
    jul: 6, ago: 7, sep: 8, oct: 9, nov: 10, dic: 11
  };

  const parts = normalized.split(' ');
  let day = 15;
  let monthIdx = 6;

  if (parts.length >= 1 && !isNaN(parseInt(parts[0], 10))) {
    day = parseInt(parts[0], 10);
  }

  if (parts.length >= 2) {
    const monthKey = parts[1].toLowerCase().substring(0, 3);
    if (monthsMap[monthKey] !== undefined) {
      monthIdx = monthsMap[monthKey];
    }
  }

  return { monthIdx, day };
};