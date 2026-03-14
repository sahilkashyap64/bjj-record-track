import type { ResourceLink } from '@/types';
import { Button } from '@/components/common/Button';
import { createEmptyResource } from '@/db/schema';

interface ResourceListEditorProps {
  value: ResourceLink[];
  onChange: (next: ResourceLink[]) => void;
}

export function ResourceListEditor({ value, onChange }: ResourceListEditorProps) {
  const update = (id: string, updates: Partial<ResourceLink>) =>
    onChange(value.map((item) => (item.id === id ? { ...item, ...updates } : item)));

  return (
    <div className="space-y-3">
      {value.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-[var(--line)] p-4 text-sm text-[var(--muted)]">
          No resources added yet.
        </div>
      ) : null}
      {value.map((item) => (
        <div key={item.id} className="grid gap-2 rounded-[1.5rem] border border-[var(--line)] bg-white/75 p-3">
          <input
            className="input-base"
            placeholder="Title"
            value={item.title}
            onChange={(event) => update(item.id, { title: event.target.value })}
          />
          <input
            className="input-base"
            placeholder="https://"
            value={item.url}
            onChange={(event) => update(item.id, { url: event.target.value })}
          />
          <select
            className="input-base"
            value={item.platform}
            onChange={(event) => update(item.id, { platform: event.target.value as ResourceLink['platform'] })}
          >
            <option value="youtube">YouTube</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="article">Article</option>
            <option value="other">Other</option>
          </select>
          <Button variant="ghost" size="sm" onClick={() => onChange(value.filter((entry) => entry.id !== item.id))}>
            Remove resource
          </Button>
        </div>
      ))}
      <Button variant="outline" onClick={() => onChange([...value, createEmptyResource()])}>
        Add resource
      </Button>
    </div>
  );
}
