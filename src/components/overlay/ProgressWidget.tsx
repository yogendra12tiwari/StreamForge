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
  const displayTasks = todayTasks.length > 0 ? todayTasks : tasks;
  const totalTasks = displayTasks.length;
  const completedTasks = displayTasks.filter((task) => task.completed).length;
  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div
      className="inline-flex items-center gap-3 px-3.5 py-2 rounded-lg select-none"
      style={{
        backgroundColor: '#121420',
        border: `1.5px solid ${accentColor}`,
        boxShadow: `0 4px 16px rgba(0, 0, 0, 0.6), 0 0 10px ${accentColor}33`,
      }}
    >
      <div className="flex items-center gap-2 text-xs font-mono">
        <CheckCircle2 size={15} style={{ color: accentColor }} />
        <span className="text-slate-300 font-medium">Tasks:</span>
        <span className="text-white font-bold">{completedTasks}/{totalTasks}</span>
      </div>

      <div className="w-20 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${percentage}%`,
            backgroundColor: accentColor,
            boxShadow: `0 0 8px ${accentColor}`,
          }}
        />
      </div>

      <span className="text-xs font-mono font-bold text-cyan-200">
        {percentage}%
      </span>
    </div>
  );
}
