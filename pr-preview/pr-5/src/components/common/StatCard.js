import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from '@/components/common/Card';
export function StatCard({ label, value, helper }) {
    return (_jsxs(Card, { className: "space-y-2 rounded-[1.35rem]", children: [_jsx("div", { className: "text-xs font-medium tracking-[0.08em] text-[var(--muted)]", children: label }), _jsx("div", { className: "text-2xl font-semibold [font-variant-numeric:tabular-nums]", children: value }), helper ? _jsx("div", { className: "text-sm text-[var(--muted)]", children: helper }) : null] }));
}
