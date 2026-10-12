import { useStore } from '../../store';
import { ArrowUpRight } from 'lucide-react';

export function CTAWidget() {
  const isVisible = useStore((state) => state.widgets.cta);
  const cta = useStore((state) => state.cta);
  const companionUrl = useStore((state) => state.companionUrl);
  const accentColor = useStore((state) => state.accentColor);

  if (!isVisible || !cta?.enabled || !cta?.text) {
    return null;
  }

  // Use companionUrl or fallback to cta.url if cleaner
  const displayUrl = companionUrl || cta.url;

  return (
    <div
      className="inline-flex flex-col gap-1.5 px-4 py-2.5 rounded-lg backdrop-blur-md transition-all duration-500"
      style={{
        backgroundColor: 'rgba(26, 26, 46, 0.85)',
        border: `1px solid ${accentColor}26`,
        boxShadow: `0 4px 20px -2px ${accentColor}1a`,
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="text-sm font-semibold tracking-wide"
          style={{
            color: accentColor,
            textShadow: `0 0 10px ${accentColor}33`,
          }}
        >
          {cta.text}
        </span>
        <div
          className="animate-pulse"
          style={{ color: accentColor }}
        >
          <ArrowUpRight size={16} />
        </div>
      </div>

      {displayUrl && (
        <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
          <span className="text-slate-500">Visit:</span>
          <span className="text-slate-300 underline decoration-slate-600 underline-offset-2">
            {displayUrl.replace(/^https?:\/\//, '')}
          </span>
        </div>
      )}
    </div>
  );
}
