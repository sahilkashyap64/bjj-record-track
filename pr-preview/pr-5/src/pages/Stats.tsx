import { Chip } from '@/components/common/Chip';
import { SimpleChart } from '@/components/common/SimpleChart';
import { StatCard } from '@/components/common/StatCard';
import { Card } from '@/components/common/Card';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useSettings } from '@/hooks/useSettings';
import { useTrainingLogs } from '@/hooks/useTrainingLogs';
import { formatHours, formatPercent, formatRatio } from '@/utils/format';

export default function StatsPage() {
  const { logs } = useTrainingLogs();
  const { settings } = useSettings();
  const { range, setRange, snapshot } = useAnalytics(logs, settings);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">Stats</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">Analytics from saved logs only.</p>
      </div>
      <Card className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {[
            { label: '7 days', value: '7d' },
            { label: '30 days', value: '30d' },
            { label: 'All time', value: 'all' },
            { label: 'Custom', value: 'custom' },
          ].map((option) => (
            <Chip key={option.value} active={range.preset === option.value} onClick={() => setRange({ preset: option.value as typeof range.preset })}>
              {option.label}
            </Chip>
          ))}
        </div>
        {range.preset === 'custom' ? (
          <div className="grid gap-3 md:grid-cols-2">
            <input className="input-base" type="date" value={range.start ?? ''} onChange={(e) => setRange({ ...range, start: e.target.value })} />
            <input className="input-base" type="date" value={range.end ?? ''} onChange={(e) => setRange({ ...range, end: e.target.value })} />
          </div>
        ) : null}
      </Card>

      <div className="grid gap-3 md:grid-cols-4">
        <StatCard label="Weekly Goal" value={formatPercent(snapshot.weeklyGoalProgress)} helper={`${snapshot.currentStreak} current streak`} />
        <StatCard label="Annual Progress" value={formatPercent(snapshot.annualProgress)} helper={`${snapshot.bestStreak} best streak`} />
        <StatCard label="Gi Split" value={`${snapshot.summary.giCount} / ${snapshot.summary.noGiCount}`} helper="Gi / No-Gi" />
        <StatCard label="Avg Cardio" value={snapshot.averageCardio.toFixed(1)} helper={`Intensity ${snapshot.averageIntensity.toFixed(1)}`} />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <StatCard label="Sessions" value={`${snapshot.summary.sessions}`} helper="Selected range" />
        <StatCard label="Total Hours" value={formatHours(snapshot.summary.totalMatHours)} helper={`Rolling ${formatHours(snapshot.hoursRolling)}`} />
        <StatCard label="Rolls / Session" value={snapshot.rollsPerSession.toFixed(1)} helper={`Rounds ${snapshot.totalRounds}`} />
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <StatCard label="Submissions" value={`${snapshot.summary.submissions}`} helper={`Avg ${(snapshot.summary.sessions ? snapshot.summary.submissions / snapshot.summary.sessions : 0).toFixed(1)}`} />
        <StatCard label="Taps" value={`${snapshot.summary.taps}`} helper={`Avg ${(snapshot.summary.sessions ? snapshot.summary.taps / snapshot.summary.sessions : 0).toFixed(1)}`} />
        <StatCard label="Sub/Tap Ratio" value={formatRatio(snapshot.summary.subTapRatio)} helper="Higher is better" />
        <StatCard label="Injuries" value={`${snapshot.injuryCount}`} helper={`${snapshot.techniquesLearnedCount} techniques logged`} />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <SimpleChart title="Sessions per week" data={snapshot.sessionsPerWeek} />
        <SimpleChart title="Rolling time over time" data={snapshot.rollingTimeTrend} />
        <SimpleChart title="Submissions vs taps" data={snapshot.submissionsVsTaps} comparison />
        <SimpleChart title="Gi vs No-Gi distribution" data={snapshot.giDistribution} />
      </div>

      <Card className="grid gap-3 md:grid-cols-4">
        <div><div className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Sweeps</div><div className="text-2xl font-bold">{snapshot.sweeps}</div></div>
        <div><div className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Escapes</div><div className="text-2xl font-bold">{snapshot.escapes}</div></div>
        <div><div className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Passes</div><div className="text-2xl font-bold">{snapshot.passes}</div></div>
        <div><div className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Takedowns</div><div className="text-2xl font-bold">{snapshot.takedowns}</div></div>
      </Card>
    </div>
  );
}
