import { jsx as _jsx } from "react/jsx-runtime";
export function SegmentedControl({ options, value, onChange, }) {
    return (_jsx("div", { className: "grid grid-cols-2 gap-2 rounded-[1.5rem] bg-white/60 p-1", children: options.map((option) => (_jsx("button", { type: "button", onClick: () => onChange(option.value), className: `rounded-[1.2rem] px-4 py-3 text-sm font-semibold transition ${option.value === value ? 'bg-[var(--accent)] text-white shadow' : 'text-slate-600'}`, children: option.label }, option.value))) }));
}
