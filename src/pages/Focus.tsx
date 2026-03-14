import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { EmptyState } from '@/components/common/EmptyState';
import { useFocusJourneys } from '@/hooks/useFocusJourneys';

export default function FocusPage() {
  const { journeys, loading, updateFocusJourney } = useFocusJourneys();

  const active = journeys.filter((item) => item.status === 'active');
  const completed = journeys.filter((item) => item.status !== 'active');

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Focus Journeys</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">Run short mastery cycles for key techniques.</p>
        </div>
        <Link to="/focus/new" className="text-sm font-semibold text-[var(--accent)]">
          New journey
        </Link>
      </div>
      {loading ? <Card>Loading journeys...</Card> : null}
      {journeys.length === 0 ? (
        <EmptyState title="No focus journeys yet" description="Start one technique journey and keep it active for the next training block." />
      ) : null}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Active</h2>
        {active.map((journey) => (
          <Card key={journey.id} className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold">{journey.techniqueName}</div>
                <div className="text-sm text-[var(--muted)]">{journey.durationDays} days · Goal {journey.goalReps} reps</div>
              </div>
              <div className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">Active</div>
            </div>
            <div className="h-3 rounded-full bg-slate-200">
              <div className="h-3 rounded-full bg-[var(--accent)]" style={{ width: '45%' }} />
            </div>
            <p className="text-sm text-slate-700">{journey.gamePlanNotes || 'No game plan notes yet.'}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => updateFocusJourney(journey.id, { status: 'completed' })}>
                Complete
              </Button>
              <Button variant="ghost" size="sm" onClick={() => updateFocusJourney(journey.id, { status: 'archived' })}>
                Archive
              </Button>
            </div>
          </Card>
        ))}
      </section>
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Completed / Archived</h2>
        {completed.map((journey) => (
          <Card key={journey.id}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold">{journey.techniqueName}</div>
                <div className="text-sm text-[var(--muted)]">{journey.status}</div>
              </div>
              <div className="text-sm text-[var(--muted)]">{journey.goalReps} reps</div>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
