export const formatHours = (hours: number) => `${hours.toFixed(hours >= 10 ? 0 : 1)}h`;
export const formatPercent = (value: number) => `${Math.round(value)}%`;
export const formatRatio = (value: number) => value.toFixed(1);
export const sentenceCase = (value: string) => value.replaceAll('_', ' ');
