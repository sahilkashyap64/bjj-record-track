import { Button } from '@/components/common/Button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="card-base flex flex-col items-start gap-3 rounded-[2rem] border-dashed">
      <div className="text-xs font-medium italic tracking-[0.08em] text-[var(--muted)]">Nothing here yet</div>
      <div>
        <h3 className="text-lg font-semibold tracking-[-0.01em]">{title}</h3>
        <p className="mt-1 text-sm text-[var(--muted)]">{description}</p>
      </div>
      {actionLabel && onAction ? (
        <Button variant="outline" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
