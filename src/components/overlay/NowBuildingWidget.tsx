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
      className="inline-flex flex-col gap-2 p-3.5 rounded-lg backdrop-blur-md transition-all duration-500 max-w-sm"
      style={{
        backgroundColor: 'rgba(26, 26, 46, 0.85)',
        border: `1px solid ${accentColor}26`,
        boxShadow: `0 4px 20px -2px ${accentColor}1a`,
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="p-1 rounded flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
        >
          <Hammer size={14} />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
          Now Building
        </span>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-white tracking-tight">
          {currentProject.name}
        </h2>
        {currentProject.description && (
          <p className="text-xs text-slate-300 mt-0.5 line-clamp-2 leading-relaxed">
            {currentProject.description}
          </p>
        )}
      </div>

      {currentProject.techStack && currentProject.techStack.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {currentProject.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono px-2 py-0.5 rounded border"
              style={{
                color: accentColor,
                borderColor: `${accentColor}33`,
                backgroundColor: `${accentColor}10`,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
