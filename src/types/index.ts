export type SessionType = 'regular_class' | 'private_class' | 'open_mat' | 'seminar' | 'other';
export type LogMode = 'quick' | 'detailed';
export type TechniqueCategory =
  | 'submission'
  | 'guard'
  | 'pass'
  | 'escape'
  | 'takedown'
  | 'sweep'
  | 'other';
export type ResourcePlatform = 'youtube' | 'instagram' | 'tiktok' | 'article' | 'other';
export type BeltLevel = 'white' | 'blue' | 'purple' | 'brown' | 'black';
export type FocusJourneyStatus = 'active' | 'completed' | 'archived';
export type ThemeMode = 'light' | 'dark' | 'system';
export type RangePreset = '7d' | '30d' | 'all' | 'custom';

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

export interface TrainingLog {
  id: string;
  createdAt: string;
  updatedAt: string;
  sessionDate: string;
  sessionTime: string;
  mode: LogMode;
  gi: boolean;
  sessionType: SessionType;
  durationMinutes: number;
  instructor: string;
  schoolOrClub: string;
  techniquesLearned: TechniqueTag[];
  totalRounds: number;
  totalRolls: number;
  roundLengthMinutes: number;
  restLengthMinutes: number;
  cardioRating: number;
  intensityRating: number;
  submissions: number;
  taps: number;
  escapes: number;
  sweeps: number;
  takedowns: number;
  guardPasses: number;
  wentWellPrompt: string;
  wentWellText: string;
  improvementPrompt: string;
  improvementText: string;
  additionalNotes: string;
  resources: ResourceLink[];
  injuries: InjuryEntry[];
  tags: string[];
}

export interface FocusJourney {
  id: string;
  techniqueName: string;
  durationDays: number;
  goalReps: number;
  customStartDate?: string;
  customEndDate?: string;
  resources: ResourceLink[];
  gamePlanNotes: string;
  createdAt: string;
  status: FocusJourneyStatus;
}

export interface GeneralNote {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface AppSettings {
  id: 'singleton';
  displayName: string;
  beltLevel: BeltLevel;
  weeklyGoal: number;
  annualTarget?: number;
  preferredRoundLength: number;
  theme?: ThemeMode;
}

export interface ExportPayload {
  exportedAt: string;
  version: 1;
  logs: TrainingLog[];
  notes: GeneralNote[];
  focusJourneys: FocusJourney[];
  settings: AppSettings;
}

export interface DateRange {
  preset: RangePreset;
  start?: string;
  end?: string;
}

export interface DashboardSummary {
  sessions: number;
  totalMatHours: number;
  rollingPercent: number;
  submissions: number;
  taps: number;
  subTapRatio: number;
  giCount: number;
  noGiCount: number;
}

export interface TrendPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

export interface AnalyticsSnapshot {
  summary: DashboardSummary;
  totalRounds: number;
  totalRolls: number;
  hoursRolling: number;
  hoursResting: number;
  rollsPerSession: number;
  averageCardio: number;
  averageIntensity: number;
  techniquesLearnedCount: number;
  injuryCount: number;
  sweeps: number;
  escapes: number;
  passes: number;
  takedowns: number;
  weeklyGoalProgress: number;
  annualProgress: number;
  currentStreak: number;
  bestStreak: number;
  sessionsPerWeek: TrendPoint[];
  rollingTimeTrend: TrendPoint[];
  submissionsVsTaps: TrendPoint[];
  giDistribution: TrendPoint[];
}
