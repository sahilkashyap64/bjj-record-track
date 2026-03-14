import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { EmptyState } from '@/components/common/EmptyState';
import { createEmptyNote } from '@/db/schema';
import { useNotes } from '@/hooks/useNotes';
import { toDisplayDate } from '@/utils/date';

export default function NotesPage() {
  const { notes, loading, createNote, updateNote, deleteNote } = useNotes();
  const [query, setQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState(createEmptyNote());

  const filtered = useMemo(
    () => notes.filter((note) => `${note.title} ${note.body} ${note.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())),
    [notes, query],
  );

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Notes</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">Standalone ideas, reminders, and game plans.</p>
        </div>
        <Link to="/notes/new" className="text-sm font-semibold text-[var(--accent)]">
          New note
        </Link>
      </div>
      <input className="input-base" placeholder="Search notes" value={query} onChange={(e) => setQuery(e.target.value)} />
      {loading ? <Card>Loading notes...</Card> : null}
      {!loading && filtered.length === 0 ? (
        <EmptyState title="No notes yet" description="Capture strategy notes, drills, and reminders." />
      ) : null}
      <div className="grid gap-3 md:grid-cols-2">
        {filtered.map((note) => (
          <Card key={note.id} className="space-y-3">
            {editingId === note.id ? (
              <>
                <input className="input-base" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
                <textarea className="input-base min-h-28" value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })} />
                <input
                  className="input-base"
                  value={draft.tags.join(', ')}
                  onChange={(e) => setDraft({ ...draft, tags: e.target.value.split(',').map((item) => item.trim()).filter(Boolean) })}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={async () => {
                      await updateNote(note.id, { title: draft.title, body: draft.body, tags: draft.tags });
                      setEditingId(null);
                    }}
                  >
                    Save
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setEditingId(null)}>
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="text-lg font-semibold">{note.title}</div>
                  <div className="text-xs text-[var(--muted)]">Updated {toDisplayDate(note.updatedAt.slice(0, 10))}</div>
                </div>
                <p className="text-sm text-slate-700">{note.body}</p>
                <div className="flex flex-wrap gap-2">
                  {note.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium text-[var(--accent)]">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingId(note.id);
                      setDraft(note);
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteNote(note.id)}>
                    Delete
                  </Button>
                </div>
              </>
            )}
          </Card>
        ))}
      </div>
      <Card className="space-y-3 md:hidden">
        <div className="text-sm font-semibold">Quick note</div>
        <input className="input-base" placeholder="Title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
        <textarea className="input-base min-h-28" placeholder="Body" value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })} />
        <Button
          onClick={async () => {
            if (!draft.title.trim()) return;
            await createNote({ title: draft.title, body: draft.body, tags: draft.tags });
            setDraft(createEmptyNote());
          }}
        >
          Save note
        </Button>
      </Card>
    </div>
  );
}
