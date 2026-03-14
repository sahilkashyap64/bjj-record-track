import { jsx as _jsx } from "react/jsx-runtime";
export function IconButton({ icon, className = '', ...props }) {
    return (_jsx("button", { type: "button", className: `inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-white/80 text-slate-700 transition hover:bg-white ${className}`, ...props, children: icon }));
}
