import { useMemo, useState } from 'react';
import type { TechniqueCategory, TechniqueTag } from '@/types';
import { Chip } from '@/components/common/Chip';
import { createId, techniqueLibrary } from '@/db/schema';

interface TagInputProps {
  value: TechniqueTag[];
  onChange: (next: TechniqueTag[]) => void;
}

export function TagInput({ value, onChange }: TagInputProps) {
  const [query, setQuery] = useState('');
  const suggestions = useMemo(
    () =>
      techniqueLibrary.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) &&
          !value.some((selected) => selected.name === item.name),
      ),
    [query, value],
  );

  const addCustom = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    onChange([...value, { id: createId(), name: trimmed, category: 'other' as TechniqueCategory }]);
    setQuery('');
  };

  return (
    <div className="space-y-3">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search or add a technique"
        className="input-base"
      />
      <div className="flex flex-wrap gap-2">
        {value.map((item) => (
          <Chip key={item.id} onClick={() => onChange(value.filter((selected) => selected.id !== item.id))}>
            {item.name}
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.slice(0, 8).map((item) => (
          <Chip key={item.id} onClick={() => onChange([...value, item])}>
            {item.name}
          </Chip>
        ))}
        {query.trim() && !suggestions.some((item) => item.name.toLowerCase() === query.toLowerCase()) ? (
          <Chip active onClick={addCustom}>
            Add "{query.trim()}"
          </Chip>
        ) : null}
      </div>
    </div>
  );
}
