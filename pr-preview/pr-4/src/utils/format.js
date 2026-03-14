export const formatHours = (hours) => `${hours.toFixed(hours >= 10 ? 0 : 1)}h`;
export const formatPercent = (value) => `${Math.round(value)}%`;
export const formatRatio = (value) => value.toFixed(1);
export const sentenceCase = (value) => value.replaceAll('_', ' ');
