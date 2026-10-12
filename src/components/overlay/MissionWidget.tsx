import { useStore } from '../../store';
import { Target } from 'lucide-react';

export function MissionWidget() {
  const isVisible = useStore((state) => state.widgets?.mission ?? true);
  const currentMission = useStore((state) => state.currentMission) || 'Can I solve this problem in O(n)?';
  const sessionTopic = useStore((state) => state.sessionTopic) || 'Dynamic Programming';
  const accentColor = useStore((state) => state.accentColor) || '#00d4ff';

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md backdrop-blur-md transition-all duration-300 select-none max-w-md shadow-sm"
      style={{
        backgroundColor: 'rgba(15, 17, 28, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRight: `2.5px solid ${accentColor}`,
        boxShadow: `0 2px 12px -2px ${accentColor}20`,
      }}
    >
      <Target size={13} style={{ color: accentColor }} className="shrink-0" />

      {sessionTopic && (
        <>
          <span
            className="text-[10px] font-mono uppercase font-semibold px-1.5 py-0.5 rounded"
            style={{
              color: accentColor,
              backgroundColor: `${accentColor}18`,
            }}
          >
            {sessionTopic}
          </span>
          <span className="text-slate-600 font-mono text-[10px]">•</span>
        </>
      )}

      <p className="text-xs font-medium text-slate-200 truncate tracking-wide">
        {currentMission}
      </p>
    </div>
  );
}
