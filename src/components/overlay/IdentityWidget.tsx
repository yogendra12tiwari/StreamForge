import { useStore } from '../../store';

export function IdentityWidget() {
  const isVisible = useStore((state) => state.widgets.identity);
  const accentColor = useStore((state) => state.accentColor);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="inline-flex flex-col gap-1.5 px-4 py-3 rounded-lg backdrop-blur-md transition-all duration-500"
      style={{
        backgroundColor: 'rgba(26, 26, 46, 0.85)',
        border: `1px solid ${accentColor}26`,
        boxShadow: `0 4px 20px -2px ${accentColor}1a`,
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
        />
        <h1
          className="text-base font-bold tracking-wider text-white uppercase select-none font-mono"
          style={{ textShadow: `0 0 12px ${accentColor}40` }}
        >
          Building in Public
        </h1>
      </div>
      <div className="flex items-center">
        <span
          className="text-xs px-2 py-0.5 rounded font-mono font-medium tracking-wide border"
          style={{
            color: accentColor,
            borderColor: `${accentColor}33`,
            backgroundColor: `${accentColor}10`,
          }}
        >
          DSA × AI/ML
        </span>
      </div>
    </div>
  );
}
