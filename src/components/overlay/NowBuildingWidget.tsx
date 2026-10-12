import { useStore } from '../../store';
import { Hammer } from 'lucide-react';

export function NowBuildingWidget() {
  const isVisible = useStore((state) => state.widgets.nowBuilding);
  const projects = useStore((state) => state.projects);
  const accentColor = useStore((state) => state.accentColor);

  if (!isVisible) {
    return null;
  }

  const currentProject = projects.find((p) => p.active) || projects[0];

  if (!currentProject) {
    return null;
  }

  return (
    <div
      className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md backdrop-blur-md transition-all duration-300 max-w-xs select-none shadow-sm"
      style={{
        backgroundColor: 'rgba(15, 17, 28, 0.82)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: `0 2px 10px -2px ${accentColor}15`,
      }}
    >
      <Hammer size={12} style={{ color: accentColor }} className="shrink-0" />
      <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold">Building:</span>
      <span className="text-xs font-medium text-white truncate">{currentProject.name}</span>
    </div>
  );
}
