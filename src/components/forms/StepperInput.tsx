interface StepperInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function StepperInput({ label, value, onChange, min = 0, max = 99 }: StepperInputProps) {
  const clamp = (next: number) => Math.max(min, Math.min(max, next));

  return (
    <div className="rounded-[1.5rem] border border-[var(--line)] bg-white/75 p-3">
      <div className="mb-2 text-sm font-semibold">{label}</div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="h-10 w-10 rounded-full border border-[var(--line)]"
          onClick={() => onChange(clamp(value - 1))}
        >
          -
        </button>
        <div className="text-lg font-bold">{value}</div>
        <button
          type="button"
          className="h-10 w-10 rounded-full border border-[var(--line)]"
          onClick={() => onChange(clamp(value + 1))}
        >
          +
        </button>
      </div>
    </div>
  );
}
