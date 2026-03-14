export const toDisplayDate = (value: string) =>
  new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export const startOfWeek = (input: Date) => {
  const date = new Date(input);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
};

export const endOfWeek = (input: Date) => {
  const date = startOfWeek(input);
  date.setDate(date.getDate() + 6);
  date.setHours(23, 59, 59, 999);
  return date;
};

export const isWithinRange = (dateValue: string, start?: string, end?: string) => {
  if (!start && !end) return true;
  const value = new Date(`${dateValue}T00:00:00`).getTime();
  const lower = start ? new Date(`${start}T00:00:00`).getTime() : Number.NEGATIVE_INFINITY;
  const upper = end ? new Date(`${end}T23:59:59`).getTime() : Number.POSITIVE_INFINITY;
  return value >= lower && value <= upper;
};

export const getLastNDaysRange = (days: number) => {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - (days - 1));
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
};
