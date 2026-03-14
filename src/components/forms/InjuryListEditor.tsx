import type { InjuryEntry } from '@/types';
import { Button } from '@/components/common/Button';
import { Chip } from '@/components/common/Chip';
import { createEmptyInjury, injuryPresets } from '@/db/schema';

interface InjuryListEditorProps {
  value: InjuryEntry[];
  onChange: (next: InjuryEntry[]) => void;
}

export function InjuryListEditor({ value, onChange }: InjuryListEditorProps) {
  const update = (id: string, updates: Partial<InjuryEntry>) =>
    onChange(value.map((item) => (item.id === id ? { ...item, ...updates } : item)));

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {injuryPresets.map((preset) => (
          <Chip key={preset} onClick={() => onChange([...value, createEmptyInjury(preset)])}>
            {preset}
          </Chip>
        ))}
      </div>
      {value.map((item) => (
        <div key={item.id} className="grid gap-2 rounded-[1.5rem] border border-[var(--line)] bg-white/75 p-3">
          <input
            className="input-base"
            value={item.presetLabel}
            placeholder="Label"
            onChange={(event) => update(item.id, { presetLabel: event.target.value })}
          />
          <textarea
            className="input-base min-h-24"
            value={item.description}
            placeholder="Describe what happened"
            onChange={(event) => update(item.id, { description: event.target.value })}
          />
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={item.recoveryBreak}
              onChange={(event) => update(item.id, { recoveryBreak: event.target.checked })}
            />
            Taking a break to recover
          </label>
          <select
            className="input-base"
            value={item.severity ?? ''}
            onChange={(event) =>
              update(item.id, { severity: event.target.value ? (event.target.value as InjuryEntry['severity']) : undefined })
            }
          >
            <option value="">Severity</option>
            <option value="minor">Minor</option>
            <option value="moderate">Moderate</option>
            <option value="severe">Severe</option>
          </select>
          <Button variant="ghost" size="sm" onClick={() => onChange(value.filter((entry) => entry.id !== item.id))}>
            Remove injury
          </Button>
        </div>
      ))}
      <Button variant="outline" onClick={() => onChange([...value, createEmptyInjury()])}>
        Add injury note
      </Button>
    </div>
  );
}
