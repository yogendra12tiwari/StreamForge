import { useEffect, useState } from 'react';
import { useStore } from '../../store';
import { Clock, Radio } from 'lucide-react';

function getFormattedElapsed(startTimeIso: string | null): string {
  if (!startTimeIso) return '00:00:00';
  const startTime = new Date(startTimeIso).getTime();
  const now = Date.now();
  const diffMs = Math.max(0, now - startTime);

  const hours = Math.floor(diffMs / 3600000);
  const minutes = Math.floor((diffMs % 3600000) / 60000);
  const seconds = Math.floor((diffMs % 60000) / 1000);

  const hStr = String(hours).padStart(2, '0');
  const mStr = String(minutes).padStart(2, '0');
  const sStr = String(seconds).padStart(2, '0');

  return `${hStr}:${mStr}:${sStr}`;
}

export function SessionWidget() {
  const isVisible = useStore((state) => state.widgets.sessionStatus);
  const sessionStartTime = useStore((state) => state.sessionStartTime);
  const sessionTopic = useStore((state) => state.sessionTopic);
  const accentColor = useStore((state) => state.accentColor);

  const [elapsed, setElapsed] = useState<string>(() => getFormattedElapsed(sessionStartTime));

  useEffect(() => {
    if (!sessionStartTime) {
      return;
    }

    const interval = setInterval(() => {
      setElapsed(getFormattedElapsed(sessionStartTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionStartTime]);

  if (!isVisible) {
    return null;
  }

  // If no start time and no topic, nothing to show
  if (!sessionStartTime && !sessionTopic) {
    return null;
  }

  return (
    <div
      className="inline-flex items-center gap-3 px-3.5 py-2 rounded-lg backdrop-blur-md transition-all duration-500 font-mono"
      style={{
        backgroundColor: 'rgba(26, 26, 46, 0.85)',
        border: `1px solid ${accentColor}26`,
        boxShadow: `0 4px 20px -2px ${accentColor}1a`,
      }}
    >
      {sessionStartTime ? (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: accentColor }}
            />
            <Clock size={14} style={{ color: accentColor }} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase text-slate-400 font-semibold tracking-wider">
              Live
            </span>
            <span className="text-sm font-bold text-white tracking-widest">
              {elapsed}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 text-xs">
          <Radio size={14} style={{ color: accentColor }} />
          <span className="text-slate-400">Stream Status:</span>
          <span className="text-white font-medium">Ready</span>
        </div>
      )}

      {sessionTopic && (
        <>
          <div className="w-px h-4 bg-slate-700" />
          <div className="flex items-center gap-1 text-xs text-slate-300">
            <span className="text-slate-400">Currently:</span>
            <span
              className="font-semibold text-white tracking-wide"
              style={{ textShadow: `0 0 8px ${accentColor}25` }}
            >
              {sessionTopic}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
