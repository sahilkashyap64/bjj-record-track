import { Link } from 'react-router-dom';
import { Card } from '@/components/common/Card';
import { EmptyState } from '@/components/common/EmptyState';
import { StatCard } from '@/components/common/StatCard';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useFocusJourneys } from '@/hooks/useFocusJourneys';
import { useSettings } from '@/hooks/useSettings';
import { useTrainingLogs } from '@/hooks/useTrainingLogs';
import { formatHours, formatPercent, formatRatio } from '@/utils/format';
import { toDisplayDate } from '@/utils/date';

export default function HomePage() {
  const { logs } = useTrainingLogs();
  const { settings } = useSettings();
  const { journeys } = useFocusJourneys();
  const { snapshot } = useAnalytics(logs, settings);

  const activeJourneys = journeys.filter((journey) => journey.status === 'active');
  const recentLogs = logs.slice(0, 4);
  const level = Math.floor(logs.length / 10) + 1;

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(132,166,202,0.36),transparent_44%),linear-gradient(130deg,rgba(28,52,78,0.96),rgba(22,41,62,0.96))] px-5 py-6 text-white md:px-7">
        <div className="space-y-3">
          <div className="text-xs font-medium italic tracking-[0.1em] text-blue-100">daily snapshot</div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold tracking-[-0.03em]">Welcome back, {settings.displayName}</h1>
              <p className="mt-2 max-w-xl text-sm text-blue-50/90">
                Weekly goal {settings.weeklyGoal} sessions. Current streak {snapshot.currentStreak} weeks.
              </p>
            </div>
            <Link
              to="/logs/new"
              className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[var(--accent)] transition hover:-translate-y-0.5"
            >
              New Log
            </Link>
          </div>
        </div>
      </Card>

      <div className="grid gap-3 md:grid-cols-4">
        <StatCard label="Sessions" value={`${snapshot.summary.sessions}`} helper="Selected range" />
        <StatCard label="Mat Time" value={formatHours(snapshot.summary.totalMatHours)} helper="Total on mats" />
        <StatCard label="Rolling %" value={formatPercent(snapshot.summary.rollingPercent)} helper="Rolling vs mat time" />
        <StatCard label="Sub/Tap Ratio" value={formatRatio(snapshot.summary.subTapRatio)} helper={`${snapshot.summary.submissions} subs / ${snapshot.summary.taps} taps`} />
      </div>

      <div className="grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
        <Card className="space-y-3 md:row-span-2">
          <div className="text-sm font-semibold">Goal Progress</div>
          <div className="space-y-3">
            <div>
              <div className="mb-1 flex justify-between text-sm"><span>Weekly</span><span>{formatPercent(snapshot.weeklyGoalProgress)}</span></div>
              <div className="h-3 rounded-full bg-slate-200"><div className="h-3 rounded-full bg-[var(--accent)]" style={{ width: `${Math.min(100, snapshot.weeklyGoalProgress)}%` }} /></div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-sm"><span>Annual</span><span>{formatPercent(snapshot.annualProgress)}</span></div>
              <div className="h-3 rounded-full bg-slate-200"><div className="h-3 rounded-full bg-[#6f90b1]" style={{ width: `${Math.min(100, snapshot.annualProgress)}%` }} /></div>
            </div>
          </div>
        </Card>
        <Card className="space-y-2">
          <div className="text-sm font-semibold">Progression</div>
          <div className="text-4xl font-black text-[var(--accent)]">Lv {level}</div>
          <p className="text-sm text-[var(--muted)]">Session-based rank estimate. Next level in {Math.max(0, level * 10 - logs.length)} sessions.</p>
        </Card>
        <Card className="space-y-2">
          <div className="text-sm font-semibold">Style Split</div>
          <div className="text-lg font-bold">
            {snapshot.summary.giCount} Gi / {snapshot.summary.noGiCount} No-Gi
          </div>
          <p className="text-sm text-[var(--muted)]">Submissions {snapshot.summary.submissions} · Taps {snapshot.summary.taps}</p>
        </Card>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Logs</h2>
            <Link to="/logs" className="text-sm font-semibold text-[var(--accent)]">See all</Link>
          </div>
          {recentLogs.length === 0 ? (
            <EmptyState title="No training yet" description="Create your first log to start building stats and streaks." />
          ) : (
            recentLogs.map((log) => (
              <Link key={log.id} to={`/logs/${log.id}`}>
                <Card hoverable className="space-y-2">
                  <div className="font-semibold">{toDisplayDate(log.sessionDate)}</div>
                  <div className="text-sm text-[var(--muted)]">{log.gi ? 'Gi' : 'No-Gi'} · {log.durationMinutes} min</div>
                </Card>
              </Link>
            ))
          )}
        </section>
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Active Focus</h2>
            <Link to="/focus" className="text-sm font-semibold text-[var(--accent)]">Manage</Link>
          </div>
          {activeJourneys.length === 0 ? (
            <EmptyState title="No active journey" description="Start a focus cycle to guide what you drill and review." />
          ) : (
            activeJourneys.map((journey) => (
              <Card key={journey.id} className="space-y-2">
                <div className="font-semibold">{journey.techniqueName}</div>
                <div className="text-sm text-[var(--muted)]">{journey.durationDays} days · Goal {journey.goalReps} reps</div>
              </Card>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
