import { Card } from '@/components/common/Card';
import type { TrendPoint } from '@/types';

interface SimpleChartProps {
  title: string;
  data: TrendPoint[];
  comparison?: boolean;
}

export function SimpleChart({ title, data, comparison = false }: SimpleChartProps) {
  const max = Math.max(...data.flatMap((point) => [point.value, point.secondaryValue ?? 0]), 1);

  return (
    <Card className="space-y-4">
      <div className="text-sm font-semibold">{title}</div>
      <div className="space-y-3">
        {data.length === 0 ? (
          <div className="text-sm text-[var(--muted)]">No data in this range.</div>
        ) : (
          data.map((point) => (
            <div key={point.label} className="space-y-1">
              <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                <span>{point.label}</span>
                <span>
                  {point.value}
                  {comparison && point.secondaryValue !== undefined ? ` / ${point.secondaryValue}` : ''}
                </span>
              </div>
              <div className="flex gap-2">
                <div
                  className="h-3 rounded-full bg-[var(--accent)]"
                  style={{ width: `${(point.value / max) * 100}%` }}
                />
                {comparison && point.secondaryValue !== undefined ? (
                  <div
                    className="h-3 rounded-full bg-[var(--highlight)]"
                    style={{ width: `${(point.secondaryValue / max) * 100}%` }}
                  />
                ) : null}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
