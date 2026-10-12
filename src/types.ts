export type TaskCategory = 'dsa' | 'aiml' | 'project' | 'academic';

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  completed: boolean;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  link: string;
  active: boolean;
}

export interface CTAConfig {
  text: string;
  url: string;
  enabled: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  enabled: boolean;
}

export interface WidgetVisibility {
  identity: boolean;
  mission: boolean;
  progress: boolean;
  nowBuilding: boolean;
  cta: boolean;
  socialLinks: boolean;
  sessionStatus: boolean;
}

export interface AnalyticsEvent {
  id: string;
  type: string;
  label: string;
  url: string;
  timestamp: string;
}

export interface OverlayConfig {
  currentMission: string;
  currentChallenge?: string;
  tasks: Task[];
  projects: Project[];
  cta: CTAConfig;
  socialLinks: SocialLink[];
  widgets: WidgetVisibility;
  accentColor: string;
  sessionTopic: string;
  sessionStartTime: string | null;
  companionUrl: string;
}
