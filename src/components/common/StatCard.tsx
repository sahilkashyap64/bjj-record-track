import { Card } from '@/components/common/Card';

interface StatCardProps {
  label: string;
  value: string;
  helper?: string;
}

export function StatCard({ label, value, helper }: StatCardProps) {
  return (
    <Card className="space-y-2">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
      {helper ? <div className="text-sm text-[var(--muted)]">{helper}</div> : null}
    </Card>
  );
}
