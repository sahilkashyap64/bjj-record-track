import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/common/Card';
import { Chip } from '@/components/common/Chip';
import { EmptyState } from '@/components/common/EmptyState';
import { useTrainingLogs } from '@/hooks/useTrainingLogs';
import { sentenceCase } from '@/utils/format';
import { toDisplayDate } from '@/utils/date';

export default function LogsPage() {
  const { logs, loading } = useTrainingLogs();
  const [query, setQuery] = useState('');
  const [giFilter, setGiFilter] = useState<'all' | 'gi' | 'nogi'>('all');
  const [sessionType, setSessionType] = useState<'all' | string>('all');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const filtered = useMemo(
    () =>
      logs.filter((log) => {
        const matchesQuery =
          query === '' ||
          log.techniquesLearned.some((technique) => technique.name.toLowerCase().includes(query.toLowerCase())) ||
          log.instructor.toLowerCase().includes(query.toLowerCase()) ||
          log.additionalNotes.toLowerCase().includes(query.toLowerCase());
        const matchesGi = giFilter === 'all' || (giFilter === 'gi' ? log.gi : !log.gi);
        const matchesType = sessionType === 'all' || log.sessionType === sessionType;
        const matchesStart = !start || log.sessionDate >= start;
        const matchesEnd = !end || log.sessionDate <= end;
        return matchesQuery && matchesGi && matchesType && matchesStart && matchesEnd;
      }),
    [logs, query, giFilter, sessionType, start, end],
  );

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Logs</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">Search and review every session.</p>
        </div>
        <Link to="/logs/new" className="text-sm font-semibold text-[var(--accent)]">
          New log
        </Link>
      </div>
      <Card className="space-y-3">
        <input className="input-base" placeholder="Search logs" value={query} onChange={(e) => setQuery(e.target.value)} />
        <div className="flex flex-wrap gap-2">
          {['all', 'gi', 'nogi'].map((item) => (
            <Chip key={item} active={giFilter === item} onClick={() => setGiFilter(item as typeof giFilter)}>
              {item === 'all' ? 'All styles' : item === 'gi' ? 'Gi' : 'No-Gi'}
            </Chip>
          ))}
        </div>
        <select className="input-base" value={sessionType} onChange={(e) => setSessionType(e.target.value)}>
          <option value="all">All session types</option>
          <option value="regular_class">Regular class</option>
          <option value="private_class">Private class</option>
          <option value="open_mat">Open mat</option>
          <option value="seminar">Seminar</option>
          <option value="other">Other</option>
        </select>
        <div className="grid gap-3 md:grid-cols-2">
          <input className="input-base" type="date" value={start} onChange={(e) => setStart(e.target.value)} />
          <input className="input-base" type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
        </div>
      </Card>
      {loading ? <Card>Loading logs...</Card> : null}
      {!loading && filtered.length === 0 ? (
        <EmptyState title="No logs match" description="Try widening your search or create a new session log." />
      ) : null}
      <div className="grid gap-3">
        {filtered.map((log) => (
          <Link key={log.id} to={`/logs/${log.id}`}>
            <Card hoverable className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold">{toDisplayDate(log.sessionDate)}</div>
                  <div className="text-sm text-[var(--muted)]">
                    {log.gi ? 'Gi' : 'No-Gi'} · {sentenceCase(log.sessionType)} · {log.durationMinutes} min
                  </div>
                </div>
                <div className="text-sm text-[var(--muted)]">{log.techniquesLearned.length} techniques</div>
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-slate-700">
                <span>Subs {log.submissions}</span>
                <span>Taps {log.taps}</span>
                <span>Rolls {log.totalRolls}</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
