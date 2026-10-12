import { useEffect, useState } from 'react';
import { useStore } from '../../store';
import { Clock } from 'lucide-react';

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
  const isVisible = useStore((state) => state.widgets?.sessionStatus ?? true);
  const sessionStartTime = useStore((state) => state.sessionStartTime);
  const accentColor = useStore((state) => state.accentColor) || '#00d4ff';

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

  return (
    <div
      className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-lg font-mono select-none"
      style={{
        backgroundColor: '#121420',
        border: `1.5px solid ${accentColor}`,
        boxShadow: `0 4px 16px rgba(0, 0, 0, 0.6), 0 0 10px ${accentColor}33`,
      }}
    >
      <div className="flex items-center gap-1.5">
        <span
          className={`w-2.5 h-2.5 rounded-full ${sessionStartTime ? 'animate-pulse' : ''}`}
          style={{
            backgroundColor: sessionStartTime ? accentColor : '#10b981',
            boxShadow: `0 0 6px ${sessionStartTime ? accentColor : '#10b981'}`,
          }}
        />
        <Clock size={14} style={{ color: sessionStartTime ? accentColor : '#10b981' }} />
      </div>

      <span className="text-xs uppercase text-slate-300 font-bold tracking-wider">
        {sessionStartTime ? 'Live' : 'Status'}:
      </span>

      <span className="text-xs font-bold text-white tracking-widest">
        {sessionStartTime ? elapsed : 'Active'}
      </span>
    </div>
  );
}
