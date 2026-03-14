import { useMemo, useState } from 'react';
import type { SessionType, TrainingLog } from '@/types';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Chip } from '@/components/common/Chip';
import { FormField, TextArea, TextInput } from '@/components/forms/FormField';
import { InjuryListEditor } from '@/components/forms/InjuryListEditor';
import { RatingInput } from '@/components/forms/RatingInput';
import { ResourceListEditor } from '@/components/forms/ResourceListEditor';
import { SegmentedControl } from '@/components/forms/SegmentedControl';
import { StepperInput } from '@/components/forms/StepperInput';
import { TagInput } from '@/components/forms/TagInput';
import { improvementPrompts, wentWellPrompts } from '@/db/schema';

interface TrainingLogFormProps {
  initialValue: TrainingLog;
  submitLabel: string;
  onSubmit: (value: TrainingLog) => Promise<void>;
  onDelete?: () => Promise<void>;
  onDuplicate?: () => Promise<void>;
}

const sessionTypes: Array<{ label: string; value: SessionType }> = [
  { label: 'Class', value: 'regular_class' },
  { label: 'Private', value: 'private_class' },
  { label: 'Open Mat', value: 'open_mat' },
  { label: 'Seminar', value: 'seminar' },
  { label: 'Other', value: 'other' },
];

const metrics: Array<keyof Pick<TrainingLog, 'submissions' | 'taps' | 'escapes' | 'sweeps' | 'takedowns' | 'guardPasses'>> = [
  'submissions',
  'taps',
  'escapes',
  'sweeps',
  'takedowns',
  'guardPasses',
];

export function TrainingLogForm({
  initialValue,
  submitLabel,
  onSubmit,
  onDelete,
  onDuplicate,
}: TrainingLogFormProps) {
  const [value, setValue] = useState<TrainingLog>(initialValue);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValid = useMemo(
    () => Boolean(value.sessionDate && value.durationMinutes > 0 && value.totalRolls >= 0),
    [value],
  );

  const update = <K extends keyof TrainingLog>(key: K, next: TrainingLog[K]) =>
    setValue((current) => ({ ...current, [key]: next }));

  const submit = async () => {
    if (!isValid) {
      setError('Date, duration, and core session details are required.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await onSubmit({ ...value, updatedAt: new Date().toISOString() });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="space-y-4">
        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Log Mode</div>
          <SegmentedControl
            value={value.mode}
            onChange={(mode) => update('mode', mode)}
            options={[
              { label: 'Quick', value: 'quick' },
              { label: 'Detailed', value: 'detailed' },
            ]}
          />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <FormField label="Date">
            <TextInput type="date" value={value.sessionDate} onChange={(e) => update('sessionDate', e.target.value)} />
          </FormField>
          <FormField label="Time">
            <TextInput type="time" value={value.sessionTime} onChange={(e) => update('sessionTime', e.target.value)} />
          </FormField>
          <FormField label="Instructor">
            <TextInput value={value.instructor} onChange={(e) => update('instructor', e.target.value)} placeholder="Coach name" />
          </FormField>
          <FormField label="School / Club">
            <TextInput value={value.schoolOrClub} onChange={(e) => update('schoolOrClub', e.target.value)} placeholder="Academy" />
          </FormField>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-semibold">Style</div>
          <div className="flex gap-2">
            <Chip active={value.gi} onClick={() => update('gi', true)}>Gi</Chip>
            <Chip active={!value.gi} onClick={() => update('gi', false)}>No-Gi</Chip>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-semibold">Session Type</div>
          <div className="flex flex-wrap gap-2">
            {sessionTypes.map((item) => (
              <Chip key={item.value} active={value.sessionType === item.value} onClick={() => update('sessionType', item.value)}>
                {item.label}
              </Chip>
            ))}
          </div>
        </div>
        <StepperInput label="Duration (minutes)" value={value.durationMinutes} onChange={(next) => update('durationMinutes', next)} />
      </Card>

      <Card className="space-y-4">
        <div className="text-sm font-semibold">Techniques Learned</div>
        <TagInput value={value.techniquesLearned} onChange={(next) => update('techniquesLearned', next)} />
      </Card>

      <Card className="space-y-4">
        <div className="text-sm font-semibold">Endurance</div>
        <div className="grid gap-3 md:grid-cols-2">
          {value.mode === 'detailed' ? (
            <>
              <StepperInput label="Total rounds" value={value.totalRounds} onChange={(next) => update('totalRounds', next)} />
              <StepperInput label="Total rolls" value={value.totalRolls} onChange={(next) => update('totalRolls', next)} />
              <StepperInput label="Round length" value={value.roundLengthMinutes} onChange={(next) => update('roundLengthMinutes', next)} />
              <StepperInput label="Rest length" value={value.restLengthMinutes} onChange={(next) => update('restLengthMinutes', next)} />
            </>
          ) : (
            <StepperInput label="Total rolls" value={value.totalRolls} onChange={(next) => update('totalRolls', next)} />
          )}
          <RatingInput label="Cardio" value={value.cardioRating} onChange={(next) => update('cardioRating', next)} />
          <RatingInput label="Intensity" value={value.intensityRating} onChange={(next) => update('intensityRating', next)} />
        </div>
      </Card>

      <Card className="space-y-4">
        <div className="text-sm font-semibold">Performance Stats</div>
        <div className="grid gap-3 md:grid-cols-3">
          {metrics.map((metric) => (
            <StepperInput
              key={metric}
              label={metric === 'guardPasses' ? 'Guard passes' : metric[0].toUpperCase() + metric.slice(1)}
              value={value[metric]}
              onChange={(next) => update(metric, next)}
            />
          ))}
        </div>
      </Card>

      <Card className="space-y-4">
        <div className="text-sm font-semibold">Reflections</div>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {wentWellPrompts.map((prompt) => (
              <Chip key={prompt} active={value.wentWellPrompt === prompt} onClick={() => update('wentWellPrompt', prompt)}>
                {prompt}
              </Chip>
            ))}
          </div>
          <TextArea value={value.wentWellText} onChange={(e) => update('wentWellText', e.target.value)} placeholder="What went well?" />
        </div>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {improvementPrompts.map((prompt) => (
              <Chip key={prompt} active={value.improvementPrompt === prompt} onClick={() => update('improvementPrompt', prompt)}>
                {prompt}
              </Chip>
            ))}
          </div>
          <TextArea
            value={value.improvementText}
            onChange={(e) => update('improvementText', e.target.value)}
            placeholder="What needs improvement?"
          />
        </div>
        <TextArea
          value={value.additionalNotes}
          onChange={(e) => update('additionalNotes', e.target.value)}
          placeholder="Additional notes"
        />
      </Card>

      <Card className="space-y-4">
        <div className="text-sm font-semibold">Resources</div>
        <ResourceListEditor value={value.resources} onChange={(next) => update('resources', next)} />
      </Card>

      <Card className="space-y-4">
        <div className="text-sm font-semibold">Injuries</div>
        <InjuryListEditor value={value.injuries} onChange={(next) => update('injuries', next)} />
      </Card>

      {error ? <div className="text-sm font-medium text-rose-700">{error}</div> : null}
      <div className="flex flex-wrap gap-3">
        <Button onClick={submit} isLoading={saving}>
          {submitLabel}
        </Button>
        {onDuplicate ? (
          <Button variant="outline" onClick={() => onDuplicate()}>
            Duplicate
          </Button>
        ) : null}
        {onDelete ? (
          <Button variant="danger" onClick={() => onDelete()}>
            Delete
          </Button>
        ) : null}
      </div>
    </div>
  );
}
