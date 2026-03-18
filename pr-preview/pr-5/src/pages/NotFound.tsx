import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';

export default function NotFoundPage() {
  return (
    <section className="mx-auto max-w-2xl py-10 md:py-16">
      <Card className="space-y-4 px-6 py-8 md:px-8 md:py-10">
        <p className="text-xs font-medium italic tracking-[0.08em] text-[var(--muted)]">404 · page not found</p>
        <h1 className="text-3xl font-extrabold tracking-[-0.02em] text-[var(--ink)] md:text-4xl">We couldn't find that page</h1>
        <p className="text-sm text-[var(--muted)]">The link might be outdated or the page may have moved. You can head back to your dashboard or open training logs.</p>
        <div className="flex flex-wrap gap-3 pt-1">
          <Link to="/">
            <Button>Go to home</Button>
          </Link>
          <Link to="/logs">
            <Button variant="secondary">View logs</Button>
          </Link>
        </div>
      </Card>
    </section>
  );
}
