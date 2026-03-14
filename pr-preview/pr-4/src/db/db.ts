import Dexie, { type Table } from 'dexie';
import type { AppSettings, FocusJourney, GeneralNote, TrainingLog } from '@/types';

export class BjjJournalDatabase extends Dexie {
  logs!: Table<TrainingLog, string>;
  notes!: Table<GeneralNote, string>;
  focusJourneys!: Table<FocusJourney, string>;
  settings!: Table<AppSettings, string>;

  constructor() {
    super('bjj-journal');
    this.version(1).stores({
      logs: 'id, sessionDate, updatedAt, sessionType, gi',
      notes: 'id, updatedAt, title',
      focusJourneys: 'id, status, techniqueName, createdAt',
      settings: 'id',
    });
  }
}

export const db = new BjjJournalDatabase();
