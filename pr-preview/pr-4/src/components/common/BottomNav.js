import { jsx as _jsx } from "react/jsx-runtime";
import { Link, useLocation } from 'react-router-dom';
const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Logs', path: '/logs' },
    { label: 'Focus', path: '/focus' },
    { label: 'Notes', path: '/notes' },
    { label: 'Stats', path: '/stats' },
];
export function BottomNav() {
    const location = useLocation();
    return (_jsx("nav", { className: "fixed inset-x-3 bottom-3 z-40 rounded-[1.75rem] border border-[var(--line)] bg-[var(--panel-strong)]/95 p-2 shadow-lg backdrop-blur md:hidden", children: _jsx("div", { className: "grid grid-cols-5 gap-1", children: navItems.map((item) => {
                const active = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
                return (_jsx(Link, { to: item.path, className: `rounded-2xl px-2 py-2 text-center text-[11px] font-semibold transition ${active ? 'bg-[var(--accent)] text-white' : 'text-slate-600'}`, children: item.label }, item.path));
            }) }) }));
}
