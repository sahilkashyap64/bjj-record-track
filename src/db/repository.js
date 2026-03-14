import { db } from '@/db/db';
import { createId, defaultSettings, nowIso, } from '@/db/schema';
export const listLogs = () => db.logs.orderBy('sessionDate').reverse().toArray();
export const getLogById = (id) => db.logs.get(id);
export const createLog = async (log) => {
    const timestamp = nowIso();
    const fullLog = { ...log, id: createId(), createdAt: timestamp, updatedAt: timestamp };
    await db.logs.put(fullLog);
    return fullLog;
};
export const updateLog = async (id, updates) => {
    await db.logs.update(id, { ...updates, updatedAt: nowIso() });
    return db.logs.get(id);
};
export const deleteLog = (id) => db.logs.delete(id);
export const duplicateLog = async (id) => {
    const existing = await db.logs.get(id);
    if (!existing)
        return undefined;
    const copy = {
        ...existing,
        id: createId(),
        createdAt: nowIso(),
        updatedAt: nowIso(),
        sessionDate: new Date().toISOString().slice(0, 10),
    };
    await db.logs.put(copy);
    return copy;
};
export const listNotes = () => db.notes.orderBy('updatedAt').reverse().toArray();
export const getNoteById = (id) => db.notes.get(id);
export const createNote = async (note) => {
    const timestamp = nowIso();
    const fullNote = { ...note, id: createId(), createdAt: timestamp, updatedAt: timestamp };
    await db.notes.put(fullNote);
    return fullNote;
};
export const updateNote = async (id, updates) => {
    await db.notes.update(id, { ...updates, updatedAt: nowIso() });
    return db.notes.get(id);
};
export const deleteNote = (id) => db.notes.delete(id);
export const listFocusJourneys = () => db.focusJourneys.orderBy('createdAt').reverse().toArray();
export const getFocusJourneyById = (id) => db.focusJourneys.get(id);
export const createFocusJourney = async (journey) => {
    const fullJourney = { ...journey, id: createId(), createdAt: nowIso() };
    await db.focusJourneys.put(fullJourney);
    return fullJourney;
};
export const updateFocusJourney = async (id, updates) => {
    await db.focusJourneys.update(id, updates);
    return db.focusJourneys.get(id);
};
export const deleteFocusJourney = (id) => db.focusJourneys.delete(id);
export const getSettings = async () => (await db.settings.get('singleton')) ?? defaultSettings;
export const updateSettings = async (updates) => {
    const current = await getSettings();
    const next = { ...current, ...updates, id: 'singleton' };
    await db.settings.put(next);
    return next;
};
export const exportAllData = async () => ({
    version: 1,
    exportedAt: nowIso(),
    logs: await listLogs(),
    notes: await listNotes(),
    focusJourneys: await listFocusJourneys(),
    settings: await getSettings(),
});
export const importAllData = async (payload) => {
    await db.transaction('rw', db.logs, db.notes, db.focusJourneys, db.settings, async () => {
        await db.logs.clear();
        await db.notes.clear();
        await db.focusJourneys.clear();
        await db.settings.clear();
        await db.logs.bulkPut(payload.logs);
        await db.notes.bulkPut(payload.notes);
        await db.focusJourneys.bulkPut(payload.focusJourneys);
        await db.settings.put(payload.settings);
    });
};
export const clearAllData = async () => {
    await db.transaction('rw', db.logs, db.notes, db.focusJourneys, db.settings, async () => {
        await db.logs.clear();
        await db.notes.clear();
        await db.focusJourneys.clear();
        await db.settings.clear();
        await db.settings.put(defaultSettings);
    });
};
