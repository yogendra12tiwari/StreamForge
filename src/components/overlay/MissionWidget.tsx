import { useEffect, useState } from 'react';
import { useStore } from '../../store';
import { Target } from 'lucide-react';

export function MissionWidget() {
  const isVisible = useStore((state) => state.widgets.mission);
  const currentMission = useStore((state) => state.currentMission);
  const sessionTopic = useStore((state) => state.sessionTopic);
  const accentColor = useStore((state) => state.accentColor);

  const [displayedText, setDisplayedText] = useState(currentMission);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (currentMission !== displayedText) {
      const fadeTimer = setTimeout(() => setIsFading(true), 0);
      const swapTimer = setTimeout(() => {
        setDisplayedText(currentMission);
        setIsFading(false);
      }, 200);

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
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md backdrop-blur-md transition-all duration-300 select-none max-w-md shadow-sm"
      style={{
        backgroundColor: 'rgba(15, 17, 28, 0.82)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRight: `2.5px solid ${accentColor}`,
        boxShadow: `0 2px 12px -2px ${accentColor}15`,
      }}
    >
      <Target size={13} style={{ color: accentColor }} className="shrink-0" />

      {sessionTopic && (
        <>
          <span
            className="text-[10px] font-mono uppercase font-semibold px-1.5 py-0.2 rounded"
            style={{
              color: accentColor,
              backgroundColor: `${accentColor}15`,
            }}
          >
            {sessionTopic}
          </span>
          <span className="text-slate-600 font-mono text-[10px]">•</span>
        </>
      )}

      <p
        className="text-xs font-medium text-slate-200 truncate tracking-wide transition-opacity duration-200"
        style={{
          opacity: isFading ? 0 : 1,
        }}
      >
        {displayedText}
      </p>
    </div>
  );
}
