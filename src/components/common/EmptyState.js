import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/common/Button';
export function EmptyState({ title, description, actionLabel, onAction }) {
    return (_jsxs("div", { className: "card-base flex flex-col items-start gap-3 rounded-[2rem] border-dashed", children: [_jsx("div", { className: "text-xs font-medium italic tracking-[0.08em] text-[var(--muted)]", children: "Nothing here yet" }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold tracking-[-0.01em]", children: title }), _jsx("p", { className: "mt-1 text-sm text-[var(--muted)]", children: description })] }), actionLabel && onAction ? (_jsx(Button, { variant: "outline", onClick: onAction, children: actionLabel })) : null] }));
}
