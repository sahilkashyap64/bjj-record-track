import Dexie from 'dexie';
export class BjjJournalDatabase extends Dexie {
    logs;
    notes;
    focusJourneys;
    settings;
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
