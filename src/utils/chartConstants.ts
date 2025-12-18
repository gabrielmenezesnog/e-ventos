export const PRIMARY_COLOR = "#ff00ff";
export const GRAY_COLOR_1 = "#f7f7f7";
export const GRAY_COLOR_5 = "#b2b2b2";
export const GRAY_COLOR_6 = "#9c9c9c";
export const GRAY_COLOR_11 = "#111";

export const CHART_COLORS = [
  PRIMARY_COLOR,
  "#9333ea",
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const MONTHS_FULL = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const DECIMAL_PLACES = 2;
export const PERCENTAGE_MULTIPLIER = 100;

export function formatCurrency(value: number): string {
  return `$${value.toFixed(DECIMAL_PLACES)}`;
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(DECIMAL_PLACES)}%`;
}

export function formatMonth(monthIndex: number): string {
  if (monthIndex >= 0 && monthIndex < MONTHS.length) {
    return MONTHS[monthIndex];
  }
  return "";
}

export function extractLocation(local: string): string {
  const parts = local.split(",");
  if (parts.length >= 2) {
    return parts[1].trim();
  }
  return local;
}

