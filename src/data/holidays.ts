import data2024 from './holidays-IN-2024.json';
import data2025 from './holidays-IN-2025.json';
import data2026 from './holidays-IN-2026.json';
import data2027 from './holidays-IN-2027.json';
import data2028 from './holidays-IN-2028.json';

export interface Holiday {
  date: string;
  name: string;
  color: string;
}

/**
 * Parses individual JSON payload structures extracting critical variables.
 * Categorically assigns explicit semantic structural colors mapped against the API event "type".
 */
const parseHolidays = (data: any): Holiday[] => {
  if (!data?.holidays) return [];
  
  return data.holidays.map((h: any) => {
    let color = '#8B5CF6'; // Default Fallback Purple (Other Observances)
    
    // Natively inject semantic color mapping explicitly against literal event severity
    if (h.type) {
      if (h.type.includes('Gazetted')) color = '#EF4444'; // Red (National Holiday)
      else if (h.type.includes('Restricted')) color = '#F97316'; // Orange (Optional Holiday)
      else if (h.type.includes('Observance')) color = '#3B82F6'; // Blue (Standard Observance)
      else if (h.type.includes('Season')) color = '#10B981'; // Green (Seasonal Equinox)
    }
    
    return {
      date: h.date,
      name: h.name,
      color
    };
  });
};

/**
 * Extracted, merged, and heavily consolidated master array pipeline providing robust local API fetching.
 */
export const INDIAN_HOLIDAYS: Holiday[] = [
  ...parseHolidays(data2024),
  ...parseHolidays(data2025),
  ...parseHolidays(data2026),
  ...parseHolidays(data2027),
  ...parseHolidays(data2028),
];
