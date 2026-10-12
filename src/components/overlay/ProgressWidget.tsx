import { useStore } from '../../store';
import { CheckCircle2 } from 'lucide-react';

export function ProgressWidget() {
  const isVisible = useStore((state) => state.widgets.progress);
  const tasks = useStore((state) => state.tasks);
  const accentColor = useStore((state) => state.accentColor);

  if (!isVisible) {
    return null;
  }

  const today = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter((task) => task.createdAt?.startsWith(today));
  const totalTasks = todayTasks.length;
  const completedTasks = todayTasks.filter((task) => task.completed).length;
  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div
      className="inline-flex flex-col gap-2 px-4 py-3 rounded-lg backdrop-blur-md transition-all duration-500 min-w-[200px]"
      style={{
        backgroundColor: 'rgba(26, 26, 46, 0.85)',
        border: `1px solid ${accentColor}26`,
        boxShadow: `0 4px 20px -2px ${accentColor}1a`,
      }}
    >
      <div className="flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-slate-300 font-mono">
          <CheckCircle2 size={14} style={{ color: accentColor }} />
          <span>Today's Progress</span>
        </div>
        <span className="font-mono font-semibold text-white">
          {completedTasks} / {totalTasks}
        </span>
      </div>

      <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden border border-slate-700/50">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: accentColor,
            boxShadow: percentage > 0 ? `0 0 8px ${accentColor}` : 'none',
          }}
        />
      </div>

      <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
        <span>{percentage}% finished</span>
        <span>{completedTasks} of {totalTasks} done</span>
      </div>
    </div>
  );
}
