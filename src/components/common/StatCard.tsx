import { Card } from '@/components/common/Card';

interface StatCardProps {
  label: string;
  value: string;
  helper?: string;
}

export function StatCard({ label, value, helper }: StatCardProps) {
  return (
    <Card className="space-y-2 rounded-[1.35rem]">
      <div className="text-xs font-medium tracking-[0.08em] text-[var(--muted)]">{label}</div>
      <div className="text-2xl font-semibold [font-variant-numeric:tabular-nums]">{value}</div>
      {helper ? <div className="text-sm text-[var(--muted)]">{helper}</div> : null}
    </Card>
  );
}
