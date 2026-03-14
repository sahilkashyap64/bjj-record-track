import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { createEmptyNote } from '@/db/schema';
import { useNotes } from '@/hooks/useNotes';

export default function NoteNewPage() {
  const navigate = useNavigate();
  const { createNote } = useNotes();
  const [note, setNote] = useState(createEmptyNote());

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">New Note</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">Store ideas that are not tied to a session.</p>
      </div>
      <Card className="space-y-3">
        <input className="input-base" placeholder="Title" value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} />
        <textarea className="input-base min-h-40" placeholder="Body" value={note.body} onChange={(e) => setNote({ ...note, body: e.target.value })} />
        <input
          className="input-base"
          placeholder="Tags separated by commas"
          value={note.tags.join(', ')}
          onChange={(e) => setNote({ ...note, tags: e.target.value.split(',').map((item) => item.trim()).filter(Boolean) })}
        />
        <Button
          onClick={async () => {
            await createNote({ title: note.title, body: note.body, tags: note.tags });
            navigate('/notes');
          }}
        >
          Save note
        </Button>
      </Card>
    </div>
  );
}
