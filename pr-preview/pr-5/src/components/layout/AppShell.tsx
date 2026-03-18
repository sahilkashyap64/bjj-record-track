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
      <a
        href="#main-content"
        className="absolute left-3 top-3 z-50 -translate-y-20 rounded-lg bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white transition focus:translate-y-0"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--panel)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <Link to="/" className="text-lg font-extrabold tracking-[-0.02em] text-[var(--accent)]">
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
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                    active ? 'bg-[var(--accent)] text-white shadow-[0_10px_20px_-18px_rgba(33,57,82,0.8)]' : 'text-slate-600 hover:bg-white/70'
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
      <main id="main-content" className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
        <Outlet />
      </main>
      <Link
        to="/logs/new"
        className="fixed bottom-24 right-4 z-30 inline-flex items-center rounded-2xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 active:translate-y-px md:hidden"
      >
        New Log
      </Link>
      <BottomNav />
    </div>
  );
}
