import { useStore } from '../../store';

export function IdentityWidget() {
  const isVisible = useStore((state) => state.widgets?.identity ?? true);
  const accentColor = useStore((state) => state.accentColor) || '#00d4ff';

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-lg select-none"
      style={{
        backgroundColor: '#121420',
        border: `1.5px solid ${accentColor}`,
        boxShadow: `0 4px 16px rgba(0, 0, 0, 0.6), 0 0 10px ${accentColor}33`,
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{
            backgroundColor: accentColor,
            boxShadow: `0 0 8px ${accentColor}`,
          }}
        />
        <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
          Building in Public
        </span>
      </div>

      <span className="text-slate-500 font-mono text-xs">|</span>

      <span className="text-xs font-mono font-semibold tracking-wide text-cyan-200">
        DSA · AI/ML · INTERNSHIP PREP
      </span>
    </div>
  );
}
