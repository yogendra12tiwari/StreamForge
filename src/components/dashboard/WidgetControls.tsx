import { useId } from 'react';
import {
  Palette,
  Eye,
  Sliders,
  User,
  Compass,
  CheckSquare,
  Hammer,
  Megaphone,
  Share2,
  Clock,
} from 'lucide-react';
import { useStore } from '../../store';
import type { WidgetVisibility } from '../../types';

interface WidgetMeta {
  key: keyof WidgetVisibility;
  label: string;
  description: string;
  icon: typeof User;
  positionHint: string;
}

const WIDGET_LIST: WidgetMeta[] = [
  {
    key: 'identity',
    label: 'Identity Banner',
    description: 'Streamer handle, avatar, and active stream role/tag',
    icon: User,
    positionHint: 'Top-Left Header',
  },
  {
    key: 'mission',
    label: 'Mission Bar',
    description: 'Current challenge question and session objective',
    icon: Compass,
    positionHint: 'Top-Center Banner',
  },
  {
    key: 'sessionStatus',
    label: 'Session Status & Timer',
    description: 'Live broadcast status indicator and elapsed stream timer',
    icon: Clock,
    positionHint: 'Top-Right Header',
  },
  {
    key: 'progress',
    label: 'Task Progress',
    description: 'Daily tasks checklist with completion badges',
    icon: CheckSquare,
    positionHint: 'Sidebar / Top-Left List',
  },
  {
    key: 'nowBuilding',
    label: 'Now Building',
    description: 'Active project name, tech stack tags, and repository link',
    icon: Hammer,
    positionHint: 'Bottom-Left Overlay',
  },
  {
    key: 'cta',
    label: 'Call To Action',
    description: 'Highlighted promotional banner and callout link',
    icon: Megaphone,
    positionHint: 'Bottom-Center Bar',
  },
  {
    key: 'socialLinks',
    label: 'Social Links',
    description: 'GitHub and portfolio link badges for viewers',
    icon: Share2,
    positionHint: 'Bottom-Right Corner',
  },
];

const PRESET_COLORS = [
  { name: 'Cyan (Default)', hex: '#00d4ff' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Purple', hex: '#8b5cf6' },
  { name: 'Amber', hex: '#f59e0b' },
  { name: 'Rose', hex: '#f43f5e' },
  { name: 'Blue', hex: '#3b82f6' },
];

export function WidgetControls() {
  const widgets = useStore((state) => state.widgets);
  const toggleWidget = useStore((state) => state.toggleWidget);
  const accentColor = useStore((state) => state.accentColor);
  const setAccentColor = useStore((state) => state.setAccentColor);
  const colorPickerId = useId();

  return (
    <div className="space-y-6">
      {/* Accent Color Customizer */}
      <div className="p-5 rounded-xl bg-[#16213e]/70 border border-slate-700/60 shadow-lg backdrop-blur-sm space-y-4">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Stream Accent Color</h3>
            <p className="text-xs text-slate-400">
              Personalize highlights, borders, and glows across the overlay canvas
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                id={colorPickerId}
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0"
              />
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Hex Color</span>
              <span className="text-sm font-mono text-white font-semibold">{accentColor}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 mr-1">Presets:</span>
            {PRESET_COLORS.map((preset) => (
              <button
                key={preset.hex}
                type="button"
                onClick={() => setAccentColor(preset.hex)}
                className="group flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono border border-slate-700 bg-[#1a1a2e] hover:border-slate-500 transition-colors cursor-pointer"
                title={preset.name}
              >
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: preset.hex }}
                />
                <span className="text-slate-300 group-hover:text-white">{preset.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Canvas Layout Map Preview */}
      <div className="p-5 rounded-xl bg-[#16213e]/70 border border-slate-700/60 shadow-lg backdrop-blur-sm space-y-4">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Visual Layout Map (16:9 Canvas)</h3>
            <p className="text-xs text-slate-400">
              Interactive layout preview showing enabled/disabled component slots
            </p>
          </div>
        </div>

        {/* 16:9 Scaled Schematic */}
        <div className="relative w-full aspect-video rounded-xl bg-[#0b0c16] border-2 border-slate-800 p-4 flex flex-col justify-between overflow-hidden shadow-2xl">
          {/* Subtle grid lines background */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

          {/* Top Bar slots */}
          <div className="flex items-center justify-between gap-3 relative z-10">
            {/* Identity */}
            <div
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                widgets.identity
                  ? 'border-cyan-500/50 bg-[#16213e]/90 text-cyan-300 shadow-sm'
                  : 'border-dashed border-slate-800 bg-slate-900/40 text-slate-600'
              }`}
            >
              Identity
            </div>

            {/* Mission */}
            <div
              className={`px-4 py-1.5 rounded-lg border text-xs font-medium transition-all flex-1 max-w-md text-center ${
                widgets.mission
                  ? 'border-cyan-500/50 bg-[#16213e]/90 text-cyan-300 shadow-sm'
                  : 'border-dashed border-slate-800 bg-slate-900/40 text-slate-600'
              }`}
            >
              Mission: Active Goal
            </div>

            {/* Session Status */}
            <div
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                widgets.sessionStatus
                  ? 'border-cyan-500/50 bg-[#16213e]/90 text-cyan-300 shadow-sm'
                  : 'border-dashed border-slate-800 bg-slate-900/40 text-slate-600'
              }`}
            >
              Session Status
            </div>
          </div>

          {/* Middle Body / Sidebar */}
          <div className="flex items-center justify-between gap-4 relative z-10 my-auto">
            {/* Progress Checklist */}
            <div
              className={`p-3 rounded-lg border text-xs font-medium transition-all w-48 ${
                widgets.progress
                  ? 'border-cyan-500/50 bg-[#16213e]/90 text-cyan-300 shadow-sm'
                  : 'border-dashed border-slate-800 bg-slate-900/40 text-slate-600'
              }`}
            >
              <div className="font-semibold mb-1">Task Progress</div>
              <div className="space-y-1 text-[10px] text-slate-400">
                <div className="h-1.5 bg-slate-800 rounded w-full" />
                <div className="h-1.5 bg-slate-800 rounded w-4/5" />
              </div>
            </div>

            {/* Center OBS Main Video Area Placeholder */}
            <div className="text-center text-slate-600 text-xs font-mono uppercase tracking-widest pointer-events-none">
              OBS Stream Video Canvas
            </div>

            <div className="w-48 invisible" />
          </div>

          {/* Bottom Bar slots */}
          <div className="flex items-center justify-between gap-3 relative z-10">
            {/* Now Building */}
            <div
              className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all max-w-xs ${
                widgets.nowBuilding
                  ? 'border-cyan-500/50 bg-[#16213e]/90 text-cyan-300 shadow-sm'
                  : 'border-dashed border-slate-800 bg-slate-900/40 text-slate-600'
              }`}
            >
              Now Building
            </div>

            {/* CTA */}
            <div
              className={`px-4 py-1.5 rounded-lg border text-xs font-medium transition-all text-center ${
                widgets.cta
                  ? 'border-cyan-500/50 bg-[#16213e]/90 text-cyan-300 shadow-sm'
                  : 'border-dashed border-slate-800 bg-slate-900/40 text-slate-600'
              }`}
            >
              Call To Action
            </div>

            {/* Social Links */}
            <div
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                widgets.socialLinks
                  ? 'border-cyan-500/50 bg-[#16213e]/90 text-cyan-300 shadow-sm'
                  : 'border-dashed border-slate-800 bg-slate-900/40 text-slate-600'
              }`}
            >
              Social Links
            </div>
          </div>
        </div>
      </div>

      {/* Widget Toggles List */}
      <div className="p-5 rounded-xl bg-[#16213e]/70 border border-slate-700/60 shadow-lg backdrop-blur-sm space-y-4">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Widget Visibility Switches</h3>
            <p className="text-xs text-slate-400">
              Toggle overlay modules on or off without altering your underlying stream data
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {WIDGET_LIST.map((item) => {
            const Icon = item.icon;
            const isEnabled = widgets[item.key];

            return (
              <div
                key={item.key}
                onClick={() => toggleWidget(item.key)}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                  isEnabled
                    ? 'bg-[#1a1a2e]/80 border-cyan-500/40 shadow-sm'
                    : 'bg-[#16213e]/30 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0 pr-3">
                  <div
                    className={`p-2 rounded-lg border transition-colors ${
                      isEnabled
                        ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                        : 'bg-slate-800/50 border-slate-800 text-slate-500'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium text-white truncate">{item.label}</h4>
                      <span className="text-[10px] text-slate-500 hidden sm:inline">
                        ({item.positionHint})
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate">{item.description}</p>
                  </div>
                </div>

                <div className="relative inline-flex items-center shrink-0 pointer-events-none">
                  <div
                    className={`w-11 h-6 rounded-full transition-colors relative ${
                      isEnabled ? 'bg-cyan-500' : 'bg-slate-800'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-[2px] transition-transform ${
                        isEnabled ? 'translate-x-5' : 'translate-x-[2px]'
                      }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WidgetControls;
