import { TrainingLog, GeneralNote, FocusJourney, AppSettings, TechniqueTag } from '../types';

// Helper to generate unique IDs
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Default settings
export const defaultSettings: AppSettings = {
  displayName: 'BJJ Athlete',
  beltLevel: 'white',
  weeklyGoal: 3,
  annualTarget: 156,
  preferredRoundLength: 5,
  theme: 'light',
};

// Preset techniques
export const presetTechniques: TechniqueTag[] = [
  // Submissions
  { id: '1', name: 'Rear Naked Choke', category: 'submission' },
  { id: '2', name: 'Arm Triangle', category: 'submission' },
  { id: '3', name: 'Triangle Choke', category: 'submission' },
  { id: '4', name: 'Armbar', category: 'submission' },
  { id: '5', name: 'Kimura', category: 'submission' },
  { id: '6', name: 'Omoplata', category: 'submission' },
  { id: '7', name: 'Heel Hook', category: 'submission' },
  { id: '8', name: 'Knee Reap', category: 'submission' },
  { id: '9', name: 'Guillotine', category: 'submission' },
  { id: '10', name: 'Darce Choke', category: 'submission' },

  // Guard
  { id: '11', name: 'Closed Guard', category: 'guard' },
  { id: '12', name: 'Half Guard', category: 'guard' },
  { id: '13', name: 'Open Guard', category: 'guard' },
  { id: '14', name: 'De La Riva Guard', category: 'guard' },
  { id: '15', name: 'Lasso Guard', category: 'guard' },
  { id: '16', name: 'Spider Guard', category: 'guard' },
  { id: '17', name: 'Butterfly Guard', category: 'guard' },
  { id: '18', name: 'Rubber Guard', category: 'guard' },

  // Pass
  { id: '19', name: 'Knee Slice Pass', category: 'pass' },
  { id: '20', name: 'Toreando Pass', category: 'pass' },
  { id: '21', name: 'Pressure Pass', category: 'pass' },
  { id: '22', name: 'Leglock Pass', category: 'pass' },
  { id: '23', name: 'Smash Pass', category: 'pass' },

  // Escape
  { id: '24', name: 'Bridge Escape', category: 'escape' },
  { id: '25', name: 'Side Control Escape', category: 'escape' },
  { id: '26', name: 'Mount Escape', category: 'escape' },
  { id: '27', name: 'Back Control Escape', category: 'escape' },

  // Takedown
  { id: '28', name: 'Single Leg', category: 'takedown' },
  { id: '29', name: 'Double Leg', category: 'takedown' },
  { id: '30', name: 'Hip Throw', category: 'takedown' },
  { id: '31', name: 'Osoto Gari', category: 'takedown' },
  { id: '32', name: 'Ankle Pick', category: 'takedown' },

  // Sweep
  { id: '33', name: 'Hip Bump Sweep', category: 'sweep' },
  { id: '34', name: 'Scissor Sweep', category: 'sweep' },
  { id: '35', name: 'De La Riva Sweep', category: 'sweep' },
  { id: '36', name: 'Reversal', category: 'sweep' },
  { id: '37', name: 'Berimbolo', category: 'sweep' },
];

// Preset injuries
export const presetInjuries = [
  'Tweaked my knee',
  'Hurt my shoulder',
  'Stiff neck',
  'Wrist pain',
  'Elbow pain',
  'Lower back strain',
  'Hip flexor pain',
  'Foot/ankle tweak',
];