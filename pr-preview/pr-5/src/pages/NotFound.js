import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
export default function NotFoundPage() {
    return (_jsx("section", { className: "mx-auto max-w-2xl py-10 md:py-16", children: _jsxs(Card, { className: "space-y-4 px-6 py-8 md:px-8 md:py-10", children: [_jsx("p", { className: "text-xs font-medium italic tracking-[0.08em] text-[var(--muted)]", children: "404 \u00B7 page not found" }), _jsx("h1", { className: "text-3xl font-extrabold tracking-[-0.02em] text-[var(--ink)] md:text-4xl", children: "We couldn't find that page" }), _jsx("p", { className: "text-sm text-[var(--muted)]", children: "The link might be outdated or the page may have moved. You can head back to your dashboard or open training logs." }), _jsxs("div", { className: "flex flex-wrap gap-3 pt-1", children: [_jsx(Link, { to: "/", children: _jsx(Button, { children: "Go to home" }) }), _jsx(Link, { to: "/logs", children: _jsx(Button, { variant: "secondary", children: "View logs" }) })] })] }) }));
}
