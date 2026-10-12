import { useStore } from '../../store';

export function IdentityWidget() {
  const isVisible = useStore((state) => state.widgets?.identity ?? true);
  const accentColor = useStore((state) => state.accentColor) || '#00d4ff';

  if (!isVisible) {
    return null;
  }

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
      <div className="flex items-center gap-1.5">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: accentColor,
            boxShadow: `0 0 6px ${accentColor}`,
          }}
        />
        <span className="text-[11px] font-mono font-bold tracking-wider text-slate-100 uppercase">
          Building in Public
        </span>
      </div>

      <span className="text-slate-600 font-mono text-[10px]">|</span>

      <span className="text-[10px] font-mono tracking-tight text-slate-300 font-medium">
        DSA · AI/ML · INTERNSHIP PREP
      </span>
    </div>
  );
}
