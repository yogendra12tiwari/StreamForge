import { useStore } from '../../store';
import { ArrowUpRight } from 'lucide-react';

export function CTAWidget() {
  const isVisible = useStore((state) => state.widgets.cta);
  const cta = useStore((state) => state.cta);
  const accentColor = useStore((state) => state.accentColor);

  if (!isVisible || !cta?.enabled || !cta?.text) {
    return null;
  }

  return (
    <div
      className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md backdrop-blur-md transition-all duration-300 select-none shadow-sm"
      style={{
        backgroundColor: 'rgba(15, 17, 28, 0.82)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: `0 2px 10px -2px ${accentColor}15`,
      }}
    >
      <span
        className="text-[11px] font-medium tracking-wide text-slate-200"
      >
        {cta.text}
      </span>
      <ArrowUpRight size={13} style={{ color: accentColor }} className="shrink-0" />
    </div>
  );
}
