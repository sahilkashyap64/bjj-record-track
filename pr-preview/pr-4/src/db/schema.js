export const createId = () => typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
export const nowIso = () => new Date().toISOString();
export const defaultSettings = {
    id: 'singleton',
    displayName: 'BJJ Athlete',
    beltLevel: 'white',
    weeklyGoal: 3,
    annualTarget: 156,
    preferredRoundLength: 5,
    theme: 'system',
};
export const techniqueLibrary = [
    { id: 'tech-rnc', name: 'Rear Naked Choke', category: 'submission' },
    { id: 'tech-armbar', name: 'Armbar', category: 'submission' },
    { id: 'tech-kimura', name: 'Kimura', category: 'submission' },
    { id: 'tech-triangle', name: 'Triangle Choke', category: 'submission' },
    { id: 'tech-closed-guard', name: 'Closed Guard', category: 'guard' },
    { id: 'tech-half-guard', name: 'Half Guard', category: 'guard' },
    { id: 'tech-butterfly', name: 'Butterfly Guard', category: 'guard' },
    { id: 'tech-knee-slice', name: 'Knee Slice Pass', category: 'pass' },
    { id: 'tech-toreando', name: 'Toreando Pass', category: 'pass' },
    { id: 'tech-side-escape', name: 'Side Control Escape', category: 'escape' },
    { id: 'tech-mount-escape', name: 'Mount Escape', category: 'escape' },
    { id: 'tech-single-leg', name: 'Single Leg', category: 'takedown' },
    { id: 'tech-double-leg', name: 'Double Leg', category: 'takedown' },
    { id: 'tech-scissor', name: 'Scissor Sweep', category: 'sweep' },
    { id: 'tech-hip-bump', name: 'Hip Bump Sweep', category: 'sweep' },
];
export const injuryPresets = [
    'Tweaked my knee',
    'Hurt my shoulder',
    'Stiff neck',
    'Lower back flare-up',
    'Elbow soreness',
    'Finger sprain',
];
export const wentWellPrompts = ['I learned', 'I hit a', 'My defense on', 'My timing for'];
export const improvementPrompts = ['Got caught in', 'Need to drill', 'Lost position when'];
export const createEmptyResource = () => ({
    id: createId(),
    title: '',
    url: '',
    platform: 'other',
});
export const createEmptyInjury = (presetLabel = '') => ({
    id: createId(),
    presetLabel,
    description: '',
    recoveryBreak: false,
});
export const createEmptyLog = () => ({
    id: createId(),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    sessionDate: new Date().toISOString().slice(0, 10),
    sessionTime: '19:00',
    mode: 'quick',
    gi: true,
    sessionType: 'regular_class',
    durationMinutes: 60,
    instructor: '',
    schoolOrClub: '',
    techniquesLearned: [],
    totalRounds: 0,
    totalRolls: 4,
    roundLengthMinutes: 5,
    restLengthMinutes: 1,
    cardioRating: 3,
    intensityRating: 3,
    submissions: 0,
    taps: 0,
    escapes: 0,
    sweeps: 0,
    takedowns: 0,
    guardPasses: 0,
    wentWellPrompt: wentWellPrompts[0],
    wentWellText: '',
    improvementPrompt: improvementPrompts[0],
    improvementText: '',
    additionalNotes: '',
    resources: [],
    injuries: [],
    tags: [],
});
export const createEmptyFocusJourney = () => ({
    id: createId(),
    techniqueName: '',
    durationDays: 30,
    goalReps: 25,
    resources: [],
    gamePlanNotes: '',
    createdAt: nowIso(),
    status: 'active',
});
export const createEmptyNote = () => ({
    id: createId(),
    title: '',
    body: '',
    createdAt: nowIso(),
    updatedAt: nowIso(),
    tags: [],
});
