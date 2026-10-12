import { useStore } from '../../store';
import { CheckCircle2 } from 'lucide-react';

export function ProgressWidget() {
  const isVisible = useStore((state) => state.widgets?.progress ?? true);
  const tasks = useStore((state) => state.tasks) || [];
  const accentColor = useStore((state) => state.accentColor) || '#00d4ff';

  if (!isVisible) {
    return null;
  }

  const today = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter((task) => task.createdAt?.startsWith(today));
  // Use todayTasks if available, or all tasks as sensible fallback so progress always shows active feedback
  const displayTasks = todayTasks.length > 0 ? todayTasks : tasks;
  const totalTasks = displayTasks.length;
  const completedTasks = displayTasks.filter((task) => task.completed).length;
  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div
      className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md backdrop-blur-md transition-all duration-300 select-none shadow-sm"
      style={{
        backgroundColor: 'rgba(15, 17, 28, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderLeft: `2.5px solid ${accentColor}`,
        boxShadow: `0 2px 12px -2px ${accentColor}20`,
      }}
    >
      <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
        <CheckCircle2 size={13} style={{ color: accentColor }} />
        <span className="text-[11px] text-slate-400">Tasks:</span>
        <span className="text-white font-bold">{completedTasks}/{totalTasks}</span>
      </div>

      <div className="w-16 bg-slate-800 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${percentage}%`,
            backgroundColor: accentColor,
          }}
        />
      </div>

      <span className="text-[10px] font-mono text-slate-400">
        {percentage}%
      </span>
    </div>
  );
}
