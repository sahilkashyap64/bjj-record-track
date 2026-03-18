import { jsx as _jsx } from "react/jsx-runtime";
export function Chip({ active = false, className = '', children, ...props }) {
    return (_jsx("button", { type: "button", className: `rounded-full px-3 py-2 text-sm font-medium transition ${active
            ? 'bg-[var(--accent)] text-white'
            : 'border border-[var(--line)] bg-white/70 text-slate-700 hover:bg-white'} ${className}`, ...props, children: children }));
}
