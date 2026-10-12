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
      className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-lg select-none max-w-lg"
      style={{
        backgroundColor: '#121420',
        border: `1.5px solid ${accentColor}`,
        boxShadow: `0 4px 16px rgba(0, 0, 0, 0.6), 0 0 10px ${accentColor}33`,
      }}
    >
      <Target size={15} style={{ color: accentColor }} className="shrink-0" />

      {sessionTopic && (
        <>
          <span
            className="text-xs font-mono font-bold uppercase px-2 py-0.5 rounded"
            style={{
              color: '#ffffff',
              backgroundColor: `${accentColor}33`,
              border: `1px solid ${accentColor}66`,
            }}
          >
            {sessionTopic}
          </span>
          <span className="text-slate-500 font-mono text-xs">•</span>
        </>
      )}

      <p className="text-xs font-semibold text-white truncate tracking-wide">
        {currentMission}
      </p>
    </div>
  );
}
