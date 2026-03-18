import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TrainingLogForm } from '@/components/forms/TrainingLogForm';
import type { TrainingLog } from '@/types';
import { useTrainingLogs } from '@/hooks/useTrainingLogs';

export default function LogDetailPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { getLogById, updateLog, deleteLog, duplicateLog } = useTrainingLogs();
  const [log, setLog] = useState<TrainingLog | null>(null);

  useEffect(() => {
    getLogById(id).then((item) => setLog(item ?? null)).catch(console.error);
  }, [getLogById, id]);

  if (!log) {
    return (
      <div className="space-y-4">
        <Link to="/logs" className="text-sm text-[var(--accent)]">Back to logs</Link>
        <div className="card-base">Log not found.</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Link to="/logs" className="text-sm text-[var(--accent)]">Back to logs</Link>
      <div>
        <h1 className="text-3xl font-bold">Edit Log</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">Update the session, duplicate it, or remove it.</p>
      </div>
      <TrainingLogForm
        initialValue={log}
        submitLabel="Update log"
        onSubmit={async (value) => {
          await updateLog(id, value);
          navigate('/logs');
        }}
        onDelete={async () => {
          await deleteLog(id);
          navigate('/logs');
        }}
        onDuplicate={async () => {
          const copy = await duplicateLog(id);
          if (copy) navigate(`/logs/${copy.id}`);
        }}
      />
    </div>
  );
}
