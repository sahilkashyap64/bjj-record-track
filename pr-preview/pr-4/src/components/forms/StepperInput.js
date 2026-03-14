import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function StepperInput({ label, value, onChange, min = 0, max = 99 }) {
    const clamp = (next) => Math.max(min, Math.min(max, next));
    return (_jsxs("div", { className: "rounded-[1.5rem] border border-[var(--line)] bg-white/75 p-3", children: [_jsx("div", { className: "mb-2 text-sm font-semibold", children: label }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("button", { type: "button", className: "h-10 w-10 rounded-full border border-[var(--line)]", onClick: () => onChange(clamp(value - 1)), children: "-" }), _jsx("div", { className: "text-lg font-bold", children: value }), _jsx("button", { type: "button", className: "h-10 w-10 rounded-full border border-[var(--line)]", onClick: () => onChange(clamp(value + 1)), children: "+" })] })] }));
}
