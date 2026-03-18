import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "New Note" }), _jsx("p", { className: "mt-1 text-sm text-[var(--muted)]", children: "Store ideas that are not tied to a session." })] }), _jsxs(Card, { className: "space-y-3", children: [_jsx("input", { className: "input-base", placeholder: "Title", value: note.title, onChange: (e) => setNote({ ...note, title: e.target.value }) }), _jsx("textarea", { className: "input-base min-h-40", placeholder: "Body", value: note.body, onChange: (e) => setNote({ ...note, body: e.target.value }) }), _jsx("input", { className: "input-base", placeholder: "Tags separated by commas", value: note.tags.join(', '), onChange: (e) => setNote({ ...note, tags: e.target.value.split(',').map((item) => item.trim()).filter(Boolean) }) }), _jsx(Button, { onClick: async () => {
                            await createNote({ title: note.title, body: note.body, tags: note.tags });
                            navigate('/notes');
                        }, children: "Save note" })] })] }));
}
