export type AiraState = 
  | 'neutral'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'smiling'
  | 'curious'
  | 'concerned'
  | 'excited'
  | 'caring';

export interface LivingStateInfo {
  id: AiraState;
  label: string;
  description: string;
  accentColor: string;
  pulseSpeed: string;
  particleCount: number;
}

export type CommandStatus = 'available' | 'requires_permission' | 'coming_soon';

export interface CommandItem {
  id: string;
  command: string;
  category: 'System' | 'Voice' | 'Memory' | 'Apps' | 'Productivity';
  status: CommandStatus;
  description: string;
  observedAction: string;
  plannedExecution: string;
  permissionRequired?: string;
}

export interface WorkflowStep {
  step: number;
  label: string;
  description: string;
  tag: string;
}

export interface ActionLoopPhase {
  phase: 'OBSERVE' | 'PLAN' | 'ACT' | 'VERIFY' | 'RECOVER';
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  category: string;
  description: string;
  badge?: string;
  details?: string[];
  icon: string;
}

export interface LanguageItem {
  name: string;
  nativeName: string;
  code: string;
  status: 'Supported' | 'Planned' | 'In Testing';
}

export interface DownloadInfo {
  latestVersion: string;
  releaseDate: string;
  apkSize: string;
  androidRequirement: string;
  minRam: string;
  targetArchitecture: string;
  sha256: string;
  downloadUrl: string;
  isDownloadReady: boolean;
  releaseNotes: string[];
  previousReleases: {
    version: string;
    date: string;
    apkSize: string;
    notes: string;
  }[];
}

export interface DocArticle {
  id: string;
  category: 'Getting Started' | 'Using AIRA' | 'Device Actions' | 'Troubleshooting' | 'Updates';
  title: string;
  readTime: string;
  content: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ChangelogItem {
  version: string;
  date: string;
  badge: string;
  highlights: string[];
  sections: {
    title: string;
    items: string[];
  }[];
}
