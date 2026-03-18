import { useNavigate } from 'react-router-dom';
import { TrainingLogForm } from '@/components/forms/TrainingLogForm';
import { createEmptyLog } from '@/db/schema';
import { useTrainingLogs } from '@/hooks/useTrainingLogs';

export default function NewLogPage() {
  const navigate = useNavigate();
  const { createLog } = useTrainingLogs();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">New Training Log</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">Capture the session while details are still fresh.</p>
      </div>
      <TrainingLogForm
        initialValue={createEmptyLog()}
        submitLabel="Save log"
        onSubmit={async (value) => {
          const { id, createdAt, updatedAt, ...payload } = value;
          void id;
          void createdAt;
          void updatedAt;
          const created = await createLog(payload);
          navigate(`/logs/${created.id}`);
        }}
      />
    </div>
  );
}
