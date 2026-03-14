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

  return (
    <div className="min-h-screen pb-28 md:pb-8">
      <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--panel)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <Link to="/" className="text-lg font-black uppercase tracking-[0.18em] text-[var(--accent)]">
            Mat Log
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            {desktopNav.map((item) => {
              const active =
                location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    active ? 'bg-[var(--accent)] text-white' : 'text-slate-600 hover:bg-white/70'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Link to="/logs/new" className="hidden md:block">
            <Button size="sm">New Log</Button>
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-5 md:px-6">
        <Outlet />
      </main>
      <Link
        to="/logs/new"
        className="fixed bottom-24 right-4 z-30 inline-flex items-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-lg md:hidden"
      >
        New Log
      </Link>
      <BottomNav />
    </div>
  );
}
