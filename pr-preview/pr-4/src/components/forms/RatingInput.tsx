interface RatingInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export function RatingInput({ label, value, onChange }: RatingInputProps) {
  return (
    <div className="rounded-[1.5rem] border border-[var(--line)] bg-white/75 p-3">
      <div className="mb-2 text-sm font-semibold">{label}</div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((score) => (
          <button
            key={score}
            type="button"
            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition ${
              score <= value ? 'bg-[var(--highlight)] text-slate-900' : 'bg-slate-100 text-slate-500'
            }`}
            onClick={() => onChange(score)}
          >
            {score}
          </button>
        ))}
      </div>
    </div>
  );
}
