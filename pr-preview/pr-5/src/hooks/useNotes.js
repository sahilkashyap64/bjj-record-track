import { useCallback, useEffect, useState } from 'react';
import { createNote, deleteNote, getNoteById, listNotes, updateNote } from '@/db/repository';
export function useNotes() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const refresh = useCallback(async () => {
        setLoading(true);
        setNotes(await listNotes());
        setLoading(false);
    }, []);
    useEffect(() => {
        refresh().catch(console.error);
    }, [refresh]);
    return { notes, loading, refresh, createNote, updateNote, deleteNote, getNoteById };
}
