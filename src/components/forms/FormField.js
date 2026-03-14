import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function FormField({ label, hint, children }) {
    return (_jsxs("label", { className: "block space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm font-semibold text-slate-800", children: label }), hint ? _jsx("span", { className: "text-xs text-[var(--muted)]", children: hint }) : null] }), children] }));
}
export function TextInput(props) {
    return _jsx("input", { className: "input-base", ...props });
}
export function TextArea(props) {
    return _jsx("textarea", { className: "input-base min-h-28 resize-y", ...props });
}
export function Select(props) {
    return _jsx("select", { className: "input-base", ...props });
}
