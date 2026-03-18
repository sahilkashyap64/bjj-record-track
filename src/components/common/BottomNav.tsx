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

  return (
    <nav className="fixed inset-x-3 bottom-3 z-40 rounded-[1.4rem] border border-[var(--line)] bg-[var(--panel-strong)]/95 p-2 shadow-lg backdrop-blur md:hidden">
      <div className="grid grid-cols-5 gap-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`rounded-xl px-2 py-2 text-center text-[11px] font-medium transition ${
                active ? 'bg-[var(--accent)] text-white' : 'text-slate-600 hover:bg-white/70'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
