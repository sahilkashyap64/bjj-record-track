import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from '@/components/common/BottomNav';
import { Button } from '@/components/common/Button';
const desktopNav = [
    { label: 'Home', path: '/' },
    { label: 'Logs', path: '/logs' },
    { label: 'Focus', path: '/focus' },
    { label: 'Notes', path: '/notes' },
    { label: 'Stats', path: '/stats' },
    { label: 'Settings', path: '/settings' },
];
export function AppShell() {
    const location = useLocation();
    return (_jsxs("div", { className: "min-h-screen pb-28 md:pb-8", children: [_jsx("header", { className: "sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--panel)]/95 backdrop-blur", children: _jsxs("div", { className: "mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6", children: [_jsx(Link, { to: "/", className: "text-lg font-black uppercase tracking-[0.18em] text-[var(--accent)]", children: "Mat Log" }), _jsx("nav", { className: "hidden items-center gap-2 md:flex", children: desktopNav.map((item) => {
                                const active = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                                return (_jsx(Link, { to: item.path, className: `rounded-full px-4 py-2 text-sm font-medium transition ${active ? 'bg-[var(--accent)] text-white' : 'text-slate-600 hover:bg-white/70'}`, children: item.label }, item.path));
                            }) }), _jsx(Link, { to: "/logs/new", className: "hidden md:block", children: _jsx(Button, { size: "sm", children: "New Log" }) })] }) }), _jsx("main", { className: "mx-auto max-w-6xl px-4 py-5 md:px-6", children: _jsx(Outlet, {}) }), _jsx(Link, { to: "/logs/new", className: "fixed bottom-24 right-4 z-30 inline-flex items-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-lg md:hidden", children: "New Log" }), _jsx(BottomNav, {})] }));
}
