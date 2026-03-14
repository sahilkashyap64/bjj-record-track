export type SessionType = 'regular_class' | 'private_class' | 'open_mat' | 'seminar' | 'other';
export type LogMode = 'quick' | 'detailed';
export type TechniqueCategory = 'submission' | 'guard' | 'pass' | 'escape' | 'takedown' | 'sweep' | 'other';
export type ResourcePlatform = 'youtube' | 'instagram' | 'tiktok' | 'article' | 'other';
export type BeltLevel = 'white' | 'blue' | 'purple' | 'brown' | 'black';
export type FocusJourneyStatus = 'active' | 'completed' | 'archived';

export interface TrainingLog {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  sessionDate: Date;
  sessionTime: string;
  mode: LogMode;
  gi: boolean;
  sessionType: SessionType;
  durationMinutes: number;
  instructor?: string;
  schoolOrClub?: string;
  
  // Techniques
  techniquesLearned: TechniqueTag[];
  
  // Endurance
  totalRounds: number;
  totalRolls: number;
  roundLengthMinutes: number;
  restLengthMinutes: number;
  cardioRating: number; // 1-5
  intensityRating: number; // 1-5
  
  // Performance
  submissions: number;
  taps: number;
  escapes: number;
  sweeps: number;
  takedowns: number;
  guardPasses: number;
  
  // Reflection
  wentWellText: string;
  improvementText: string;
  additionalNotes: string;
  
  // Resources & Injuries
  resources: ResourceLink[];
  injuries: InjuryEntry[];
  
  // Tags
  tags: string[];
}

export interface TechniqueTag {
  id: string;
  name: string;
  category: TechniqueCategory;
}

export interface ResourceLink {
  id: string;
  title: string;
  url: string;
  platform: ResourcePlatform;
}

export interface InjuryEntry {
  id: string;
  presetLabel: string;
  description: string;
  recoveryBreak: boolean;
  severity?: 'minor' | 'moderate' | 'severe';
}

export interface FocusJourney {
  id: string;
  techniqueName: string;
  durationDays: number;
  goalReps: number;
  customStartDate?: Date;
  customEndDate?: Date;
  resources: ResourceLink[];
  gamePlanNotes: string;
  createdAt: Date;
  status: FocusJourneyStatus;
}

export interface GeneralNote {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface AppSettings {
  displayName: string;
  beltLevel: BeltLevel;
  weeklyGoal: number; // sessions per week
  annualTarget?: number; // sessions per year
  preferredRoundLength: number; // minutes
  theme?: 'light' | 'dark';
}