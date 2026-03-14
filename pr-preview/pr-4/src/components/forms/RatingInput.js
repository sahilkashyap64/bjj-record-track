import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function RatingInput({ label, value, onChange }) {
    return (_jsxs("div", { className: "rounded-[1.5rem] border border-[var(--line)] bg-white/75 p-3", children: [_jsx("div", { className: "mb-2 text-sm font-semibold", children: label }), _jsx("div", { className: "flex gap-2", children: [1, 2, 3, 4, 5].map((score) => (_jsx("button", { type: "button", className: `flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition ${score <= value ? 'bg-[var(--highlight)] text-slate-900' : 'bg-slate-100 text-slate-500'}`, onClick: () => onChange(score), children: score }, score))) })] }));
}
