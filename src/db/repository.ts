import { db } from '@/db/db';
import {
  createId,
  defaultSettings,
  nowIso,
} from '@/db/schema';
import { disableSeeding, markSeedCompleted } from '@/db/seedData';
import type {
  AppSettings,
  ExportPayload,
  FocusJourney,
  GeneralNote,
  TrainingLog,
} from '@/types';

export const listLogs = () => db.logs.orderBy('sessionDate').reverse().toArray();
export const getLogById = (id: string) => db.logs.get(id);
export const createLog = async (log: Omit<TrainingLog, 'id' | 'createdAt' | 'updatedAt'>) => {
  const timestamp = nowIso();
  const fullLog: TrainingLog = { ...log, id: createId(), createdAt: timestamp, updatedAt: timestamp };
  await db.logs.put(fullLog);
  return fullLog;
};
export const updateLog = async (id: string, updates: Partial<TrainingLog>) => {
  await db.logs.update(id, { ...updates, updatedAt: nowIso() });
  return db.logs.get(id);
};
export const deleteLog = (id: string) => db.logs.delete(id);
export const duplicateLog = async (id: string) => {
  const existing = await db.logs.get(id);
  if (!existing) return undefined;
  const copy: TrainingLog = {
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
export const getNoteById = (id: string) => db.notes.get(id);
export const createNote = async (note: Omit<GeneralNote, 'id' | 'createdAt' | 'updatedAt'>) => {
  const timestamp = nowIso();
  const fullNote: GeneralNote = { ...note, id: createId(), createdAt: timestamp, updatedAt: timestamp };
  await db.notes.put(fullNote);
  return fullNote;
};
export const updateNote = async (id: string, updates: Partial<GeneralNote>) => {
  await db.notes.update(id, { ...updates, updatedAt: nowIso() });
  return db.notes.get(id);
};
export const deleteNote = (id: string) => db.notes.delete(id);

export const listFocusJourneys = () => db.focusJourneys.orderBy('createdAt').reverse().toArray();
export const getFocusJourneyById = (id: string) => db.focusJourneys.get(id);
export const createFocusJourney = async (
  journey: Omit<FocusJourney, 'id' | 'createdAt'>,
) => {
  const fullJourney: FocusJourney = { ...journey, id: createId(), createdAt: nowIso() };
  await db.focusJourneys.put(fullJourney);
  return fullJourney;
};
export const updateFocusJourney = async (id: string, updates: Partial<FocusJourney>) => {
  await db.focusJourneys.update(id, updates);
  return db.focusJourneys.get(id);
};
export const deleteFocusJourney = (id: string) => db.focusJourneys.delete(id);

export const getSettings = async () => (await db.settings.get('singleton')) ?? defaultSettings;
export const updateSettings = async (updates: Partial<AppSettings>) => {
  const current = await getSettings();
  const next = { ...current, ...updates, id: 'singleton' as const };
  await db.settings.put(next);
  return next;
};

export const exportAllData = async (): Promise<ExportPayload> => ({
  version: 1,
  exportedAt: nowIso(),
  logs: await listLogs(),
  notes: await listNotes(),
  focusJourneys: await listFocusJourneys(),
  settings: await getSettings(),
});

export const importAllData = async (payload: ExportPayload) => {
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
  markSeedCompleted();
};

export const clearAllData = async () => {
  await db.transaction('rw', db.logs, db.notes, db.focusJourneys, db.settings, async () => {
    await db.logs.clear();
    await db.notes.clear();
    await db.focusJourneys.clear();
    await db.settings.clear();
    await db.settings.put(defaultSettings);
  });
  disableSeeding();
};
