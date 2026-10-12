import { useState } from 'react';
import {
  Sparkles,
  ExternalLink,
  GitBranch,
  Globe,
  Share2,
  CheckCircle2,
  Circle,
  FolderGit2,
  Megaphone,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import { useStore } from '../store';

export default function CompanionPage() {
  const accentColor = useStore((state) => state.accentColor);
  const currentMission = useStore((state) => state.currentMission);
  const sessionTopic = useStore((state) => state.sessionTopic);
  const sessionStartTime = useStore((state) => state.sessionStartTime);
  const tasks = useStore((state) => state.tasks);
  const projects = useStore((state) => state.projects);
  const cta = useStore((state) => state.cta);
  const socialLinks = useStore((state) => state.socialLinks);
  const trackEvent = useStore((state) => state.trackEvent);

  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'projects'>('overview');

  const todayStr = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter((t) => t.createdAt?.startsWith(todayStr));
  const completedToday = todayTasks.filter((t) => t.completed).length;
  const activeProject = projects.find((p) => p.active) || projects[0];

  const handleCTAClick = () => {
    trackEvent('cta_click', cta.text, cta.url);
  };

  const handleSocialClick = (platform: string, url: string) => {
    trackEvent('social_click', platform, url);
  };

  const getSocialIcon = (iconName: string, platform: string) => {
    const key = (iconName || platform).toLowerCase();
    if (key.includes('git')) return <GitBranch className="w-4 h-4" />;
    if (key.includes('globe') || key.includes('portfolio')) return <Globe className="w-4 h-4" />;
    return <Share2 className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-[#0e0f1a] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Banner */}
      <header className="bg-[#16213e]/90 border-b border-cyan-500/20 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center p-0.5 shadow-md"
              style={{ backgroundColor: `${accentColor}25` }}
            >
              <Sparkles className="w-5 h-5" style={{ color: accentColor }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white tracking-tight">StreamForge</h1>
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: `${accentColor}15`,
                    borderColor: `${accentColor}40`,
                    color: accentColor,
                  }}
                >
                  LIVE COMPANION
                </span>
              </div>
              <p className="text-xs text-slate-400">Audience live companion view</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/dashboard"
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white hover:border-slate-600 transition-colors"
            >
              Host Dashboard
            </a>
            <a
              href="/overlay"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-cyan-500/40 bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors flex items-center gap-1"
            >
              <span>Overlay</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl w-full mx-auto px-4 py-6 space-y-6 flex-1">
        {/* Stream Focus Card */}
        <section
          className="p-5 rounded-2xl border backdrop-blur-md relative overflow-hidden"
          style={{
            backgroundColor: 'rgba(22, 33, 62, 0.7)',
            borderColor: `${accentColor}33`,
            boxShadow: `0 8px 32px -4px ${accentColor}1a`,
          }}
        >
          <div className="flex items-center justify-between gap-4 mb-3">
            <span className="text-xs uppercase tracking-widest font-mono text-slate-400 font-semibold flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: accentColor }}
              />
              Stream Mission
            </span>
            {sessionStartTime ? (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1">
                <Clock className="w-3 h-3" /> LIVE CODING
              </span>
            ) : (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                OFFLINE
              </span>
            )}
          </div>

          <h2 className="text-lg font-bold text-white mb-2 leading-snug">
            {currentMission || 'Building in public with clean architecture'}
          </h2>

          {sessionTopic && (
            <p className="text-xs text-slate-300 flex items-center gap-1.5">
              <span className="text-slate-400 font-medium">Topic:</span>
              <span
                className="font-mono font-semibold"
                style={{ color: accentColor }}
              >
                {sessionTopic}
              </span>
            </p>
          )}
        </section>

        {/* Featured CTA */}
        {cta.enabled && cta.text && (
          <section
            className="p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.85)',
              borderColor: `${accentColor}40`,
              boxShadow: `0 4px 20px -2px ${accentColor}20`,
            }}
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Megaphone className="w-4 h-4" style={{ color: accentColor }} />
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
                  Call To Action
                </span>
              </div>
              <p className="text-sm font-semibold text-white">{cta.text}</p>
            </div>

            <a
              href={cta.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCTAClick}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg font-medium text-xs shadow-md transition-all shrink-0 cursor-pointer text-slate-950 font-semibold"
              style={{
                backgroundColor: accentColor,
              }}
            >
              <span>Explore Link</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </section>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 gap-4">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`pb-3 text-xs font-medium border-b-2 transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'border-cyan-400 text-cyan-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Overview & Socials
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tasks')}
            className={`pb-3 text-xs font-medium border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'tasks'
                ? 'border-cyan-400 text-cyan-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Live Checklist</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300">
              {completedToday}/{todayTasks.length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('projects')}
            className={`pb-3 text-xs font-medium border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'projects'
                ? 'border-cyan-400 text-cyan-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Active Projects</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300">
              {projects.length}
            </span>
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {activeProject && (
              <div className="p-4 rounded-xl bg-[#16213e]/50 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm font-semibold text-white">{activeProject.name}</h3>
                  </div>
                  {activeProject.link && (
                    <a
                      href={activeProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <span>Repository</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activeProject.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Socials Grid */}
            <div className="p-4 rounded-xl bg-[#16213e]/50 border border-slate-800 space-y-3">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                Connect with the Streamer
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {socialLinks
                  .filter((link) => link.enabled)
                  .map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleSocialClick(link.platform, link.url)}
                      className="flex items-center justify-between p-3 rounded-lg bg-[#1a1a2e] border border-slate-700/80 hover:border-cyan-500/50 transition-all group"
                    >
                      <div className="flex items-center space-x-2.5">
                        <span style={{ color: accentColor }}>
                          {getSocialIcon(link.icon, link.platform)}
                        </span>
                        <span className="text-xs font-medium text-slate-200 group-hover:text-white">
                          {link.platform}
                        </span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                    </a>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Tasks Checklist */}
        {activeTab === 'tasks' && (
          <div className="space-y-2.5">
            {todayTasks.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">No tasks logged for today.</p>
            ) : (
              todayTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-[#16213e]/50 border border-slate-800"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                  )}
                  <span
                    className={`text-xs ${
                      task.completed ? 'line-through text-slate-500' : 'text-slate-200'
                    }`}
                  >
                    {task.title}
                  </span>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Projects */}
        {activeTab === 'projects' && (
          <div className="space-y-3">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-4 rounded-xl bg-[#16213e]/50 border border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">{proj.name}</h3>
                    {proj.active && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <span>Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        StreamForge Live Companion • Real-time viewer interaction
      </footer>
    </div>
  );
}
