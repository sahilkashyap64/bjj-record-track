import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
    const [editingId, setEditingId] = useState(null);
    const [draft, setDraft] = useState(createEmptyNote());
    const filtered = useMemo(() => notes.filter((note) => `${note.title} ${note.body} ${note.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())), [notes, query]);
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-end justify-between gap-3", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "Notes" }), _jsx("p", { className: "mt-1 text-sm text-[var(--muted)]", children: "Standalone ideas, reminders, and game plans." })] }), _jsx(Link, { to: "/notes/new", className: "text-sm font-semibold text-[var(--accent)]", children: "New note" })] }), _jsx("input", { className: "input-base", placeholder: "Search notes", value: query, onChange: (e) => setQuery(e.target.value) }), loading ? _jsx(Card, { children: "Loading notes..." }) : null, !loading && filtered.length === 0 ? (_jsx(EmptyState, { title: "No notes yet", description: "Capture strategy notes, drills, and reminders." })) : null, _jsx("div", { className: "grid gap-3 md:grid-cols-2", children: filtered.map((note) => (_jsx(Card, { className: "space-y-3", children: editingId === note.id ? (_jsxs(_Fragment, { children: [_jsx("input", { className: "input-base", value: draft.title, onChange: (e) => setDraft({ ...draft, title: e.target.value }) }), _jsx("textarea", { className: "input-base min-h-28", value: draft.body, onChange: (e) => setDraft({ ...draft, body: e.target.value }) }), _jsx("input", { className: "input-base", value: draft.tags.join(', '), onChange: (e) => setDraft({ ...draft, tags: e.target.value.split(',').map((item) => item.trim()).filter(Boolean) }) }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { size: "sm", onClick: async () => {
                                            await updateNote(note.id, { title: draft.title, body: draft.body, tags: draft.tags });
                                            setEditingId(null);
                                        }, children: "Save" }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setEditingId(null), children: "Cancel" })] })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { children: [_jsx("div", { className: "text-lg font-semibold", children: note.title }), _jsxs("div", { className: "text-xs text-[var(--muted)]", children: ["Updated ", toDisplayDate(note.updatedAt.slice(0, 10))] })] }), _jsx("p", { className: "text-sm text-slate-700", children: note.body }), _jsx("div", { className: "flex flex-wrap gap-2", children: note.tags.map((tag) => (_jsx("span", { className: "rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium text-[var(--accent)]", children: tag }, tag))) }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => {
                                            setEditingId(note.id);
                                            setDraft(note);
                                        }, children: "Edit" }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => deleteNote(note.id), children: "Delete" })] })] })) }, note.id))) }), _jsxs(Card, { className: "space-y-3 md:hidden", children: [_jsx("div", { className: "text-sm font-semibold", children: "Quick note" }), _jsx("input", { className: "input-base", placeholder: "Title", value: draft.title, onChange: (e) => setDraft({ ...draft, title: e.target.value }) }), _jsx("textarea", { className: "input-base min-h-28", placeholder: "Body", value: draft.body, onChange: (e) => setDraft({ ...draft, body: e.target.value }) }), _jsx(Button, { onClick: async () => {
                            if (!draft.title.trim())
                                return;
                            await createNote({ title: draft.title, body: draft.body, tags: draft.tags });
                            setDraft(createEmptyNote());
                        }, children: "Save note" })] })] }));
}
