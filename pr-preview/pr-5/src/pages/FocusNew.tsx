import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Chip } from '@/components/common/Chip';
import { ResourceListEditor } from '@/components/forms/ResourceListEditor';
import { createEmptyFocusJourney } from '@/db/schema';
import { useFocusJourneys } from '@/hooks/useFocusJourneys';

export default function FocusNewPage() {
  const navigate = useNavigate();
  const { createFocusJourney } = useFocusJourneys();
  const [journey, setJourney] = useState(createEmptyFocusJourney());

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">New Focus Journey</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">Define a technique, a time block, and a rep target.</p>
      </div>
      <Card className="space-y-4">
        <input
          className="input-base"
          placeholder="Technique name"
          value={journey.techniqueName}
          onChange={(e) => setJourney({ ...journey, techniqueName: e.target.value })}
        />
        <div className="space-y-2">
          <div className="text-sm font-semibold">Focus period</div>
          <div className="flex flex-wrap gap-2">
            {[30, 60, 90].map((days) => (
              <Chip key={days} active={journey.durationDays === days} onClick={() => setJourney({ ...journey, durationDays: days })}>
                {days} days
              </Chip>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-semibold">Goal reps</div>
          <div className="flex flex-wrap gap-2">
            {[10, 25, 50, 100].map((reps) => (
              <Chip key={reps} active={journey.goalReps === reps} onClick={() => setJourney({ ...journey, goalReps: reps })}>
                {reps}
              </Chip>
            ))}
          </div>
        </div>
        <div className="rounded-[1.5rem] bg-[var(--accent-soft)] p-4 text-sm text-[var(--accent)]">
          Milestone preview: {Math.max(1, Math.floor(journey.goalReps / 5))} reps every training week.
        </div>
        <textarea
          className="input-base min-h-32"
          placeholder="Game plan notes"
          value={journey.gamePlanNotes}
          onChange={(e) => setJourney({ ...journey, gamePlanNotes: e.target.value })}
        />
        <ResourceListEditor value={journey.resources} onChange={(resources) => setJourney({ ...journey, resources })} />
        <Button
          onClick={async () => {
            await createFocusJourney({
              techniqueName: journey.techniqueName,
              durationDays: journey.durationDays,
              goalReps: journey.goalReps,
              customStartDate: journey.customStartDate,
              customEndDate: journey.customEndDate,
              resources: journey.resources,
              gamePlanNotes: journey.gamePlanNotes,
              status: journey.status,
            });
            navigate('/focus');
          }}
        >
          Save journey
        </Button>
      </Card>
    </div>
  );
}
