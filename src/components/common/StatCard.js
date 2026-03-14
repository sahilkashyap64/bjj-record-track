import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from '@/components/common/Card';
export function StatCard({ label, value, helper }) {
    return (_jsxs(Card, { className: "space-y-2", children: [_jsx("div", { className: "text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]", children: label }), _jsx("div", { className: "text-2xl font-bold", children: value }), helper ? _jsx("div", { className: "text-sm text-[var(--muted)]", children: helper }) : null] }));
}
