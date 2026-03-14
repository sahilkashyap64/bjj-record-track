import { db } from './db';
import { TrainingLog, GeneralNote, FocusJourney } from '../types';
import { generateId, defaultSettings } from './schema';

export const seedDatabase = async () => {
  // Check if data already exists
  const existingLogs = await db.logs.count();
  if (existingLogs > 0) return; // Already seeded

  // Seed default settings
  await db.settings.add({
    ...defaultSettings,
  });

  // Seed sample training logs
  const today = new Date();
  const sampleLogs: TrainingLog[] = [];

  for (let i = 0; i < 10; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i * 2);

    sampleLogs.push({
      id: generateId(),
      createdAt: date,
      updatedAt: date,
      sessionDate: date,
      sessionTime: '18:00',
      mode: i % 2 === 0 ? 'quick' : 'detailed',
      gi: i % 2 === 0,
      sessionType: i % 3 === 0 ? 'open_mat' : 'regular_class',
      durationMinutes: 60,
      instructor: 'Coach John',
      schoolOrClub: 'Local BJJ Academy',
      techniquesLearned: [
        { id: '1', name: 'Rear Naked Choke', category: 'submission' },
        { id: '11', name: 'Closed Guard', category: 'guard' },
      ],
      totalRounds: 6,
      totalRolls: 6,
      roundLengthMinutes: 5,
      restLengthMinutes: 1,
      cardioRating: 4,
      intensityRating: 4,
      submissions: 2,
      taps: 3,
      escapes: 2,
      sweeps: 1,
      takedowns: 0,
      guardPasses: 2,
      wentWellText: 'I hit my submissions cleanly today and my defense improved.',
      improvementText: 'Need to work on my escape timing from side control.',
      additionalNotes: 'Great training session. Feel stronger.',
      resources: [],
      injuries: [],
      tags: [],
    });
  }

  await db.logs.bulkAdd(sampleLogs);

  // Seed sample notes
  const sampleNotes: GeneralNote[] = [
    {
      id: generateId(),
      title: 'Guard Passing Strategy',
      body: 'The key to effective guard passing is pressure and patience. Focus on controlling the hips.',
      createdAt: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000),
      tags: ['strategy', 'guard'],
    },
    {
      id: generateId(),
      title: 'New Year Resolution',
      body: 'Aim to hit 150 training sessions this year and get my blue belt.',
      createdAt: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000),
      tags: ['goals'],
    },
  ];

  await db.notes.bulkAdd(sampleNotes);

  // Seed sample focus journeys
  const sampleFocusJourneys: FocusJourney[] = [
    {
      id: generateId(),
      techniqueName: 'Rear Naked Choke',
      durationDays: 30,
      goalReps: 25,
      resources: [],
      gamePlanNotes: 'Practice RNC escapes and defenses from all positions.',
      createdAt: new Date(),
      status: 'active',
    },
  ];

  await db.focusJourneys.bulkAdd(sampleFocusJourneys);
};