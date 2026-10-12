import { useState, useEffect } from 'react';
import {
  ListTodo,
  FolderGit2,
  Megaphone,
  Sliders,
  BarChart3,
  Monitor,
  Play,
  Square,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../store';
import { TaskManager } from '../components/dashboard/TaskManager';
import { ProjectManager } from '../components/dashboard/ProjectManager';
import { CTAManager } from '../components/dashboard/CTAManager';
import { WidgetControls } from '../components/dashboard/WidgetControls';
import { AnalyticsPanel } from '../components/dashboard/AnalyticsPanel';
import { OverlayPreview } from '../components/dashboard/OverlayPreview';

type TabKey = 'tasks' | 'projects' | 'cta' | 'widgets' | 'analytics' | 'preview';

interface TabItem {
  key: TabKey;
  label: string;
  icon: typeof ListTodo;
  badge?: string | number;
}

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('tasks');

  // Store state and actions
  const sessionStartTime = useStore((state) => state.sessionStartTime);
  const sessionTopic = useStore((state) => state.sessionTopic);
  const startSession = useStore((state) => state.startSession);
  const stopSession = useStore((state) => state.stopSession);
  const tasks = useStore((state) => state.tasks);
  const projects = useStore((state) => state.projects);
  const analytics = useStore((state) => state.analytics);

  // Live session timer state
  const [elapsedTime, setElapsedTime] = useState<string>(() => {
    if (!sessionStartTime) return '00:00:00';
    const diffMs = Math.max(0, Date.now() - new Date(sessionStartTime).getTime());
    const totalSeconds = Math.floor(diffMs / 1000);
    const pad = (num: number) => String(num).padStart(2, '0');
    return `${pad(Math.floor(totalSeconds / 3600))}:${pad(Math.floor((totalSeconds % 3600) / 60))}:${pad(totalSeconds % 60)}`;
  });

  useEffect(() => {
    if (!sessionStartTime) {
      return;
    }

    const updateTimer = () => {
      const start = new Date(sessionStartTime).getTime();
      const now = Date.now();
      const diffMs = Math.max(0, now - start);

      const totalSeconds = Math.floor(diffMs / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const pad = (num: number) => String(num).padStart(2, '0');
      setElapsedTime(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
    };

    const intervalId = setInterval(updateTimer, 1000);
    return () => clearInterval(intervalId);
  }, [sessionStartTime]);

  const isSessionActive = Boolean(sessionStartTime);

  const pendingTasksCount = tasks.filter((t) => !t.completed).length;

  const tabs: TabItem[] = [
    {
      key: 'tasks',
      label: 'Tasks',
      icon: ListTodo,
      badge: pendingTasksCount > 0 ? pendingTasksCount : undefined,
    },
    {
      key: 'projects',
      label: 'Projects',
      icon: FolderGit2,
      badge: projects.length,
    },
    {
      key: 'cta',
      label: 'CTA & Links',
      icon: Megaphone,
    },
    {
      key: 'widgets',
      label: 'Widgets',
      icon: Sliders,
    },
    {
      key: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      badge: analytics.length > 0 ? analytics.length : undefined,
    },
    {
      key: 'preview',
      label: 'Preview',
      icon: Monitor,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#16213e]/90 backdrop-blur-md border-b border-cyan-500/15 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#1a1a2e] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold tracking-tight text-white">StreamForge</h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  OBS CONTROL PANEL
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Broadcast overlay management & live state sync
              </p>
            </div>
          </div>

          {/* Session Timer & Controls */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Timer Display */}
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#1a1a2e] border border-slate-700/80">
              <Clock
                className={`w-4 h-4 ${
                  isSessionActive ? 'text-red-400 animate-pulse' : 'text-slate-500'
                }`}
              />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-mono leading-none">
                  {isSessionActive ? 'Live Elapsed' : 'Offline'}
                </span>
                <span
                  className={`text-sm font-mono font-bold leading-none mt-1 ${
                    isSessionActive ? 'text-white' : 'text-slate-500'
                  }`}
                >
                  {elapsedTime}
                </span>
              </div>
            </div>

            {/* Start/Stop Session Button */}
            {isSessionActive ? (
              <button
                type="button"
                onClick={() => stopSession()}
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/40 text-xs sm:text-sm font-medium transition-all cursor-pointer shadow-sm"
              >
                <Square className="w-4 h-4 fill-rose-400 text-rose-400" />
                <span>Stop Session</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => startSession(sessionTopic)}
                className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-semibold text-xs sm:text-sm transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-950 text-slate-950" />
                <span>Start Session</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-2 overflow-x-auto scrollbar-hide border-t border-slate-800/80">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 py-3 px-3.5 text-xs sm:text-sm font-medium border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'border-cyan-400 text-cyan-300 font-semibold bg-cyan-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-[#121422] rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-2xl backdrop-blur-sm">
          {activeTab === 'tasks' && <TaskManager />}
          {activeTab === 'projects' && <ProjectManager />}
          {activeTab === 'cta' && <CTAManager />}
          {activeTab === 'widgets' && <WidgetControls />}
          {activeTab === 'analytics' && <AnalyticsPanel />}
          {activeTab === 'preview' && <OverlayPreview />}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-4 bg-[#0a0a12] text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>StreamForge Engine • OBS Studio 1080p Overlay System</span>
          </div>
          <div className="flex items-center space-x-4 text-slate-400">
            <span>Dynamic State: Zustand</span>
            <span>•</span>
            <span>Local Persistence Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default DashboardPage;
