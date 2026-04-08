export interface Holiday {
  date: string;
  name: string;
  color: string;
}

export const INDIAN_HOLIDAYS: Holiday[] = [
  { date: "2026-01-26", name: "Republic Day",     color: "#F97316" },
  { date: "2026-08-15", name: "Independence Day", color: "#22C55E" },
  { date: "2026-10-02", name: "Gandhi Jayanti",   color: "#8B5CF6" },
  { date: "2026-03-25", name: "Holi",             color: "#EC4899" },
  { date: "2026-10-20", name: "Diwali",           color: "#F59E0B" },
];
