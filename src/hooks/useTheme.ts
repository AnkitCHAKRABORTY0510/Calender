import { MONTH_THEMES } from '../data/themes';

export function useTheme(currentDate: Date = new Date()) {
  const monthIndex = currentDate.getMonth();
  const selectedTheme = MONTH_THEMES[monthIndex];

  return { selectedTheme };
}
