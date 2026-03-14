import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';

interface BaseProps {
  label: string;
  hint?: string;
  children?: ReactNode;
}

export function FormField({ label, hint, children }: BaseProps) {
  return (
    <label className="block space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-800">{label}</span>
        {hint ? <span className="text-xs text-[var(--muted)]">{hint}</span> : null}
      </div>
      {children}
    </label>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className="input-base" {...props} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className="input-base min-h-28 resize-y" {...props} />;
}

export function Select(props: InputHTMLAttributes<HTMLSelectElement>) {
  return <select className="input-base" {...props} />;
}
