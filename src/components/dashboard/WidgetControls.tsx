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
  Maximize2,
  Sparkles,
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
    label: 'Brand Identity',
    description: '“BUILDING IN PUBLIC · DSA · AI/ML · INTERNSHIP PREP” header tag',
    icon: User,
    positionHint: 'Top-Left Corner',
  },
  {
    key: 'mission',
    label: 'Mission & Topic',
    description: 'Current challenge question and focus topic',
    icon: Compass,
    positionHint: 'Top-Right Corner',
  },
  {
    key: 'progress',
    label: 'Daily Task Progress',
    description: 'Factual today completed tasks counter & minimal progress bar',
    icon: CheckSquare,
    positionHint: 'Bottom-Left Corner',
  },
  {
    key: 'sessionStatus',
    label: 'Coding Session Timer',
    description: 'Live coding elapsed timer and focus indicator',
    icon: Clock,
    positionHint: 'Bottom-Right Corner',
  },
  {
    key: 'nowBuilding',
    label: 'Now Building',
    description: 'Active project name badge',
    icon: Hammer,
    positionHint: 'Bottom-Left (Next to Tasks)',
  },
  {
    key: 'cta',
    label: 'Call To Action',
    description: 'Optional single project/companion destination link',
    icon: Megaphone,
    positionHint: 'Bottom-Right (Next to Timer)',
  },
  {
    key: 'socialLinks',
    label: 'Social Badges',
    description: 'Subtle GitHub and portfolio badges',
    icon: Share2,
    positionHint: 'Bottom-Right (Corner)',
  },
];

const PRESET_COLORS = [
  { name: 'Cyan (Default)', hex: '#00d4ff' },
  { name: 'Violet', hex: '#a855f7' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Amber', hex: '#f59e0b' },
  { name: 'Rose', hex: '#f43f5e' },
  { name: 'Sky Blue', hex: '#38bdf8' },
];

export function WidgetControls() {
  const widgets = useStore((state) => state.widgets);
  const toggleWidget = useStore((state) => state.toggleWidget);
  const accentColor = useStore((state) => state.accentColor);
  const setAccentColor = useStore((state) => state.setAccentColor);
  const scale = useStore((state) => state.scale ?? 1.0);
  const setScale = useStore((state) => state.setScale);
  const safeMargin = useStore((state) => state.safeMargin ?? 24);
  const setSafeMargin = useStore((state) => state.setSafeMargin);
  const distractionFree = useStore((state) => state.distractionFree ?? false);
  const setDistractionFree = useStore((state) => state.setDistractionFree);

  const colorPickerId = useId();

  return (
    <div className="space-y-6">
      {/* 1. Screen-Sharing Distraction-Free & Layout Geometry Mode */}
      <div className="p-5 rounded-xl bg-[#16213e]/70 border border-slate-700/60 shadow-lg backdrop-blur-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Screen-Sharing Optimization</h3>
              <p className="text-xs text-slate-400">
                Ensure 85-90% central area stays clear for VS Code, Jupyter, terminals, and slides
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setDistractionFree(!distractionFree)}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs font-mono font-medium transition-all cursor-pointer ${
              distractionFree
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-sm'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <span>Distraction-Free Mode:</span>
            <span className="font-bold">{distractionFree ? 'ON' : 'OFF'}</span>
          </button>
        </div>

        {/* Sliders for Scale & Safe Margins */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <Maximize2 size={13} className="text-cyan-400" /> Overlay Global Scale
              </span>
              <span className="font-mono text-cyan-400 font-semibold">{Math.round(scale * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.75"
              max="1.25"
              step="0.05"
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>Compact (75%)</span>
              <span>Default (100%)</span>
              <span>Spacious (125%)</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <Sliders size={13} className="text-purple-400" /> Screen Outer Safe Margin
              </span>
              <span className="font-mono text-purple-400 font-semibold">{safeMargin}px</span>
            </div>
            <input
              type="range"
              min="12"
              max="48"
              step="4"
              value={safeMargin}
              onChange={(e) => setSafeMargin(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>Edge (12px)</span>
              <span>Standard (24px)</span>
              <span>Spacious (48px)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Accent Color Customizer */}
      <div className="p-5 rounded-xl bg-[#16213e]/70 border border-slate-700/60 shadow-lg backdrop-blur-sm space-y-4">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Theme Accent Color</h3>
            <p className="text-xs text-slate-400">
              Subtle cyan & violet accents across widget borders and micro-indicators
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

      {/* 3. Screen-First Visual Canvas Layout Map Preview */}
      <div className="p-5 rounded-xl bg-[#16213e]/70 border border-slate-700/60 shadow-lg backdrop-blur-sm space-y-4">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Screen-First 1080p Layout Map</h3>
            <p className="text-xs text-slate-400">
              Outer boundary anchors ensure zero obstruction over code editors & terminals
            </p>
          </div>
        </div>

        {/* 16:9 Scaled Schematic */}
        <div className="relative w-full aspect-video rounded-xl bg-[#090b14] border-2 border-slate-800 p-3 sm:p-5 flex flex-col justify-between overflow-hidden shadow-2xl">
          {/* Top Bar slots */}
          <div className="flex items-center justify-between gap-3 relative z-10">
            {/* Top-Left: Identity */}
            <div
              className={`px-3 py-1 rounded border text-[11px] font-mono transition-all ${
                widgets.identity
                  ? 'border-cyan-500/50 bg-[#16213e]/90 text-cyan-300 shadow-sm'
                  : 'border-dashed border-slate-800 bg-slate-900/40 text-slate-600'
              }`}
            >
              Building in Public
            </div>

            {/* Top-Right: Mission */}
            <div
              className={`px-3 py-1 rounded border text-[11px] font-mono transition-all ${
                widgets.mission
                  ? 'border-purple-500/50 bg-[#16213e]/90 text-purple-300 shadow-sm'
                  : 'border-dashed border-slate-800 bg-slate-900/40 text-slate-600'
              }`}
            >
              Current Mission & Topic
            </div>
          </div>

          {/* Central Area: Screen-Sharing Display (85-90% Clearance) */}
          <div className="my-auto text-center border border-dashed border-slate-800/80 rounded-xl py-8 sm:py-14 bg-slate-950/40">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-slate-400 font-semibold block">
              Clear Screen-Sharing Zone (85–90% Unobstructed)
            </span>
            <span className="text-[11px] text-slate-500 mt-1 block">
              VS Code • Terminal • Jupyter Notebook • Browser Docs • WebCam (Independent OBS source)
            </span>
          </div>

          {/* Bottom Bar slots */}
          <div className="flex items-center justify-between gap-3 relative z-10">
            {/* Bottom-Left: Progress + NowBuilding */}
            <div className="flex items-center gap-2">
              <div
                className={`px-3 py-1 rounded border text-[11px] font-mono transition-all ${
                  widgets.progress && !distractionFree
                    ? 'border-cyan-500/50 bg-[#16213e]/90 text-cyan-300 shadow-sm'
                    : 'border-dashed border-slate-800 bg-slate-900/40 text-slate-600'
                }`}
              >
                Today Tasks Progress
              </div>
              {widgets.nowBuilding && !distractionFree && (
                <div className="px-2 py-1 rounded border border-cyan-500/30 bg-[#16213e]/70 text-[10px] font-mono text-cyan-400">
                  Building: Project
                </div>
              )}
            </div>

            {/* Bottom-Right: Timer + CTA */}
            <div className="flex items-center gap-2">
              {widgets.cta && !distractionFree && (
                <div className="px-2 py-1 rounded border border-purple-500/30 bg-[#16213e]/70 text-[10px] font-mono text-purple-300">
                  CTA Link ↗
                </div>
              )}
              <div
                className={`px-3 py-1 rounded border text-[11px] font-mono transition-all ${
                  widgets.sessionStatus && !distractionFree
                    ? 'border-cyan-500/50 bg-[#16213e]/90 text-cyan-300 shadow-sm'
                    : 'border-dashed border-slate-800 bg-slate-900/40 text-slate-600'
                }`}
              >
                Focus Timer (HH:MM:SS)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Widget Visibility Toggles */}
      <div className="p-5 rounded-xl bg-[#16213e]/70 border border-slate-700/60 shadow-lg backdrop-blur-sm space-y-4">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Widget Visibility Switches</h3>
            <p className="text-xs text-slate-400">
              Enable or disable individual modules to tailor your overlay per stream session
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
