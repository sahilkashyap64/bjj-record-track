interface SegmentedControlProps<T extends string> {
  options: Array<{ label: string; value: T }>;
  value: T;
  onChange: (value: T) => void;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-[1.5rem] bg-white/60 p-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`rounded-[1.2rem] px-4 py-3 text-sm font-semibold transition ${
            option.value === value ? 'bg-[var(--accent)] text-white shadow' : 'text-slate-600'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
