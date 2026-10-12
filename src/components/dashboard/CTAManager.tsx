import { useState } from 'react';
import {
  Megaphone,
  Compass,
  Share2,
  Copy,
  Check,
  ExternalLink,
  GitBranch,
  Globe,
  Radio,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../../store';

export function CTAManager() {
  const cta = useStore((state) => state.cta);
  const updateCTA = useStore((state) => state.updateCTA);
  const currentMission = useStore((state) => state.currentMission);
  const setCurrentMission = useStore((state) => state.setCurrentMission);
  const sessionTopic = useStore((state) => state.sessionTopic);
  const setSessionTopic = useStore((state) => state.setSessionTopic);
  const socialLinks = useStore((state) => state.socialLinks);
  const updateSocialLink = useStore((state) => state.updateSocialLink);
  const companionUrl = useStore((state) => state.companionUrl);

  const [copiedCompanion, setCopiedCompanion] = useState(false);

  const handleCopyCompanion = async () => {
    try {
      await navigator.clipboard.writeText(companionUrl);
      setCopiedCompanion(true);
      setTimeout(() => setCopiedCompanion(false), 2000);
    } catch {
      // Fallback
    }
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github':
        return <GitBranch className="w-4 h-4 text-slate-300" />;
      case 'globe':
      case 'portfolio':
        return <Globe className="w-4 h-4 text-cyan-400" />;
      default:
        return <Share2 className="w-4 h-4 text-slate-300" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Call to Action Banner Settings */}
      <div className="p-5 rounded-xl bg-[#16213e]/60 border border-slate-700/60 shadow-lg backdrop-blur-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Call to Action (CTA)</h3>
              <p className="text-xs text-slate-400">
                Overlay interactive CTA banner shown to stream viewers
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={cta.enabled}
              onChange={(e) => updateCTA({ enabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500" />
            <span className="ml-2.5 text-xs font-medium text-slate-300">
              {cta.enabled ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Banner Text
            </label>
            <input
              type="text"
              value={cta.text}
              onChange={(e) => updateCTA({ text: e.target.value })}
              placeholder="e.g. Check out the project live ↗"
              className="w-full bg-[#1a1a2e] border border-slate-700 focus:border-cyan-400/80 rounded-lg px-3.5 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400/40"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Target Destination URL
            </label>
            <input
              type="text"
              value={cta.url}
              onChange={(e) => updateCTA({ url: e.target.value })}
              placeholder="https://..."
              className="w-full bg-[#1a1a2e] border border-slate-700 focus:border-cyan-400/80 rounded-lg px-3.5 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400/40"
            />
          </div>
        </div>
      </div>

      {/* 2. Stream Mission & Session Focus */}
      <div className="p-5 rounded-xl bg-[#16213e]/60 border border-slate-700/60 shadow-lg backdrop-blur-sm space-y-4">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/30">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Stream Mission & Topic</h3>
            <p className="text-xs text-slate-400">
              Header goals and active stream focal question
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Current Mission Text
            </label>
            <input
              type="text"
              value={currentMission}
              onChange={(e) => setCurrentMission(e.target.value)}
              placeholder="e.g. Can I solve this problem in O(n)?"
              className="w-full bg-[#1a1a2e] border border-slate-700 focus:border-cyan-400/80 rounded-lg px-3.5 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400/40"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Displayed on the top mission banner in the overlay
            </span>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-purple-400" /> Session Topic
            </label>
            <input
              type="text"
              value={sessionTopic}
              onChange={(e) => setSessionTopic(e.target.value)}
              placeholder="e.g. Dynamic Programming / Graph Theory"
              className="w-full bg-[#1a1a2e] border border-slate-700 focus:border-cyan-400/80 rounded-lg px-3.5 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400/40"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Displayed in the session indicator widget
            </span>
          </div>
        </div>
      </div>

      {/* 3. Social Links Editor */}
      <div className="p-5 rounded-xl bg-[#16213e]/60 border border-slate-700/60 shadow-lg backdrop-blur-sm space-y-4">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Social & Profile Links</h3>
            <p className="text-xs text-slate-400">
              Configure profile badges shown in the overlay
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {socialLinks.map((link, index) => (
            <div
              key={link.platform || index}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg bg-[#1a1a2e]/60 border border-slate-800"
            >
              <div className="flex items-center space-x-3 min-w-40">
                <div className="p-1.5 rounded-md bg-slate-800 border border-slate-700">
                  {getSocialIcon(link.icon || link.platform)}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-200">{link.platform}</h4>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {link.enabled ? 'Active on overlay' : 'Hidden'}
                  </span>
                </div>
              </div>

              <div className="flex-1 max-w-lg">
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => updateSocialLink(index, { url: e.target.value })}
                  placeholder={`https://${link.platform.toLowerCase()}.com/...`}
                  className="w-full bg-[#16213e] border border-slate-700 focus:border-cyan-400/80 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400/40"
                />
              </div>

              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={link.enabled}
                  onChange={(e) => updateSocialLink(index, { enabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500" />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Companion View URL */}
      <div className="p-5 rounded-xl bg-[#16213e]/40 border border-slate-800 shadow-md backdrop-blur-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-slate-300">Companion Web URL</h3>
            <p className="text-xs text-slate-400">
              Open on a secondary monitor, phone, or tablet to interact during the stream
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            LIVE COMPANION
          </span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={companionUrl}
            className="flex-1 bg-[#1a1a2e] border border-slate-700 rounded-lg px-3.5 py-2 text-slate-300 text-sm font-mono select-all focus:outline-none"
          />

          <button
            type="button"
            onClick={handleCopyCompanion}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-sm font-medium transition-colors cursor-pointer"
            title="Copy companion URL"
          >
            {copiedCompanion ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 text-xs">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-400" />
                <span className="text-xs">Copy</span>
              </>
            )}
          </button>

          <a
            href={companionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-sm font-medium transition-colors cursor-pointer"
            title="Open companion in new tab"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="text-xs">Open</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default CTAManager;
