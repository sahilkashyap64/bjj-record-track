import { db } from '@/db/db';
import { createId, defaultSettings, nowIso, techniqueLibrary, } from '@/db/schema';
const SEED_STATUS_KEY = 'mat-log-seed-status';
const getSeedStatus = () => {
    if (typeof window === 'undefined')
        return 'pending';
    return window.localStorage.getItem(SEED_STATUS_KEY) ?? 'pending';
};
export const markSeedCompleted = () => {
    if (typeof window === 'undefined')
        return;
    window.localStorage.setItem(SEED_STATUS_KEY, 'completed');
};
export const disableSeeding = () => {
    if (typeof window === 'undefined')
        return;
    window.localStorage.setItem(SEED_STATUS_KEY, 'disabled');
};
export const enableSeeding = () => {
    if (typeof window === 'undefined')
        return;
    window.localStorage.setItem(SEED_STATUS_KEY, 'pending');
};
const daysAgo = (days) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
};
const dateOnly = (date) => date.toISOString().slice(0, 10);
const timeOnly = (date) => date.toTimeString().slice(0, 5);
const sampleLogs = [0, 3, 5, 8, 10, 12, 15, 19, 22, 27].map((offset, index) => {
    const session = daysAgo(offset);
    return {
        id: createId(),
        createdAt: session.toISOString(),
        updatedAt: session.toISOString(),
        sessionDate: dateOnly(session),
        sessionTime: timeOnly(session),
        mode: index % 2 === 0 ? 'quick' : 'detailed',
        gi: index % 3 !== 0,
        sessionType: index % 4 === 0 ? 'open_mat' : 'regular_class',
        durationMinutes: index % 2 === 0 ? 75 : 60,
        instructor: index % 2 === 0 ? 'Coach Marco' : 'Coach Elena',
        schoolOrClub: 'Local Academy',
        techniquesLearned: [techniqueLibrary[index % techniqueLibrary.length], techniqueLibrary[(index + 3) % techniqueLibrary.length]],
        totalRounds: 6,
        totalRolls: 5,
        roundLengthMinutes: 5,
        restLengthMinutes: 1,
        cardioRating: 3 + (index % 3),
        intensityRating: 3 + ((index + 1) % 3),
        submissions: index % 4,
        taps: (index + 1) % 4,
        escapes: 1 + (index % 3),
        sweeps: index % 2,
        takedowns: index % 3,
        guardPasses: 1 + (index % 2),
        wentWellPrompt: 'I learned',
        wentWellText: 'Felt sharper during transitions and managed pacing well.',
        improvementPrompt: 'Need to drill',
        improvementText: 'Need more reps on off-balancing from seated guard.',
        additionalNotes: 'Good energy. Review the entry setup before next class.',
        resources: [],
        injuries: index === 4 ? [{ id: createId(), presetLabel: 'Stiff neck', description: 'Felt sore after rounds.', recoveryBreak: false, severity: 'minor' }] : [],
        tags: index % 2 === 0 ? ['competition prep'] : ['fundamentals'],
    };
});
const sampleNotes = [
    {
        id: createId(),
        title: 'Guard retention checklist',
        body: 'Head position, frame first, then hip escape. Do not accept flat hips.',
        createdAt: daysAgo(6).toISOString(),
        updatedAt: daysAgo(2).toISOString(),
        tags: ['guard', 'defense'],
    },
    {
        id: createId(),
        title: 'Open mat priorities',
        body: 'Start every round from seated guard and force a first exchange into wrestle-up entries.',
        createdAt: daysAgo(16).toISOString(),
        updatedAt: daysAgo(16).toISOString(),
        tags: ['open mat', 'game plan'],
    },
];
const sampleFocusJourneys = [
    {
        id: createId(),
        techniqueName: 'Knee Slice Pass',
        durationDays: 30,
        goalReps: 25,
        resources: [],
        gamePlanNotes: 'Track entries from headquarters and force the underhook finish this month.',
        createdAt: nowIso(),
        status: 'active',
    },
    {
        id: createId(),
        techniqueName: 'Single Leg',
        durationDays: 60,
        goalReps: 50,
        resources: [],
        gamePlanNotes: 'Hit one clean finish per live round set.',
        createdAt: daysAgo(45).toISOString(),
        status: 'completed',
    },
];
export const seedDatabase = async () => {
    if (getSeedStatus() !== 'pending') {
        return;
    }
    if ((await db.logs.count()) > 0) {
        markSeedCompleted();
        return;
    }
    await db.transaction('rw', db.logs, db.notes, db.focusJourneys, db.settings, async () => {
        await db.settings.put(defaultSettings);
        await db.logs.bulkPut(sampleLogs);
        await db.notes.bulkPut(sampleNotes);
        await db.focusJourneys.bulkPut(sampleFocusJourneys);
    });
    markSeedCompleted();
};
