import { useEffect, useState } from 'react';
import { useStore } from '../../store';
import { Sparkles } from 'lucide-react';

export function MissionWidget() {
  const isVisible = useStore((state) => state.widgets.mission);
  const currentMission = useStore((state) => state.currentMission);
  const accentColor = useStore((state) => state.accentColor);

  const [displayedText, setDisplayedText] = useState(currentMission);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (currentMission !== displayedText) {
      // Start fade out
      const fadeTimer = setTimeout(() => {
        setIsFading(true);
      }, 0);

      const swapTimer = setTimeout(() => {
        setDisplayedText(currentMission);
        setIsFading(false);
      }, 250);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(swapTimer);
      };
    }
  }, [currentMission, displayedText]);

  if (!isVisible || !displayedText) {
    return null;
  }

  return (
    <div
      className="inline-flex items-center gap-3 px-4 py-2.5 rounded-lg backdrop-blur-md transition-all duration-500 max-w-lg"
      style={{
        backgroundColor: 'rgba(26, 26, 46, 0.85)',
        border: `1px solid ${accentColor}26`,
        boxShadow: `0 4px 20px -2px ${accentColor}1a`,
      }}
    >
      <div
        className="p-1.5 rounded-md flex items-center justify-center shrink-0"
        style={{
          backgroundColor: `${accentColor}15`,
          color: accentColor,
        }}
      >
        <Sparkles size={16} />
      </div>

      <div className="flex flex-col min-w-0">
        <span
          className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold"
        >
          Active Mission
        </span>
        <p
          className="text-sm font-medium text-white italic tracking-wide transition-opacity duration-300 leading-snug truncate"
          style={{
            opacity: isFading ? 0 : 1,
            textShadow: `0 0 10px ${accentColor}25`,
          }}
        >
          "{displayedText}"
        </p>
      </div>
    </div>
  );
}
