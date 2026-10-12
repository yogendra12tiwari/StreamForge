import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type {
  Task,
  TaskCategory,
  Project,
  CTAConfig,
  SocialLink,
  WidgetVisibility,
  OverlayConfig,
  AnalyticsEvent,
} from './types';

interface StreamForgeState extends OverlayConfig {
  analytics: AnalyticsEvent[];
  // Actions
  addTask: (title: string, category: TaskCategory) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;
  updateCTA: (cta: Partial<CTAConfig>) => void;
  updateSocialLink: (index: number, link: Partial<SocialLink>) => void;
  toggleWidget: (widget: keyof WidgetVisibility) => void;
  setAccentColor: (color: string) => void;
  setCurrentMission: (mission: string) => void;
  setSessionTopic: (topic: string) => void;
  startSession: (topic?: string) => void;
  stopSession: () => void;
  trackEvent: (type: AnalyticsEvent['type'], label: string, url: string) => void;
  getCompletedToday: () => Task[];
}

const initialTasks: Task[] = [
  {
    id: uuidv4(),
    title: 'Implement LRU Cache with O(1) operations',
    category: 'dsa',
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Solve Trapping Rain Water problem',
    category: 'dsa',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Analyze Tree Diameters & Subtree queries',
    category: 'dsa',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Fine-tune VGG-19 feature extraction layers',
    category: 'aiml',
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Benchmark perceptual loss vs MSE loss weights',
    category: 'aiml',
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

const initialProjects: Project[] = [
  {
    id: uuidv4(),
    name: 'Neural Style Transfer',
    description: 'Real-time artistic style transfer using deep learning',
    techStack: ['PyTorch', 'ONNX', 'TypeScript', 'WebGL'],
    link: 'https://github.com/example/neural-style-transfer',
    active: true,
  },
];

const initialSocialLinks: SocialLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com',
    icon: 'Github',
    enabled: true,
  },
  {
    platform: 'Portfolio',
    url: 'https://portfolio.dev',
    icon: 'Globe',
    enabled: true,
  },
];

const initialWidgets: WidgetVisibility = {
  identity: true,
  mission: true,
  progress: true,
  nowBuilding: true,
  cta: true,
  socialLinks: true,
  sessionStatus: true,
};

export const useStore = create<StreamForgeState>()(
  persist(
    (set, get) => ({
      currentMission: 'Can I solve this problem in O(n)?',
      currentChallenge: 'Optimize space complexity to O(1)',
      tasks: initialTasks,
      projects: initialProjects,
      cta: {
        text: 'Explore the project ↗',
        url: '#',
        enabled: true,
      },
      socialLinks: initialSocialLinks,
      widgets: initialWidgets,
      accentColor: '#00d4ff',
      sessionTopic: 'Dynamic Programming',
      sessionStartTime: null,
      companionUrl: 'http://localhost:5173/companion',
      analytics: [],

      addTask: (title: string, category: TaskCategory) => {
        const newTask: Task = {
          id: uuidv4(),
          title,
          category,
          completed: false,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ tasks: [...state.tasks, newTask] }));
      },

      toggleTask: (id: string) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        }));
      },

      removeTask: (id: string) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      addProject: (project: Omit<Project, 'id'>) => {
        const newProject: Project = {
          ...project,
          id: uuidv4(),
        };
        set((state) => ({ projects: [...state.projects, newProject] }));
      },

      updateProject: (id: string, updatedFields: Partial<Project>) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, ...updatedFields } : project
          ),
        }));
      },

      removeProject: (id: string) => {
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
        }));
      },

      updateCTA: (ctaUpdate: Partial<CTAConfig>) => {
        set((state) => ({
          cta: { ...state.cta, ...ctaUpdate },
        }));
      },

      updateSocialLink: (index: number, linkUpdate: Partial<SocialLink>) => {
        set((state) => {
          const updatedLinks = [...state.socialLinks];
          if (updatedLinks[index]) {
            updatedLinks[index] = { ...updatedLinks[index], ...linkUpdate };
          }
          return { socialLinks: updatedLinks };
        });
      },

      toggleWidget: (widget: keyof WidgetVisibility) => {
        set((state) => ({
          widgets: {
            ...state.widgets,
            [widget]: !state.widgets[widget],
          },
        }));
      },

      setAccentColor: (accentColor: string) => {
        set({ accentColor });
      },

      setCurrentMission: (currentMission: string) => {
        set({ currentMission });
      },

      setSessionTopic: (sessionTopic: string) => {
        set({ sessionTopic });
      },

      startSession: (topic?: string) => {
        set((state) => ({
          sessionStartTime: new Date().toISOString(),
          sessionTopic: topic || state.sessionTopic,
        }));
      },

      stopSession: () => {
        set({ sessionStartTime: null });
      },

      trackEvent: (type: AnalyticsEvent['type'], label: string, url: string) => {
        const newEvent: AnalyticsEvent = {
          id: uuidv4(),
          type,
          label,
          url,
          timestamp: new Date().toISOString(),
        };
        set((state) => ({
          analytics: [newEvent, ...state.analytics],
        }));
      },

      getCompletedToday: () => {
        const today = new Date().toISOString().split('T')[0];
        return get().tasks.filter(
          (t) => t.completed && t.createdAt.startsWith(today)
        );
      },
    }),
    {
      name: 'streamforge-storage',
    }
  )
);
