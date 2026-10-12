import {
  IdentityWidget,
  MissionWidget,
  ProgressWidget,
  NowBuildingWidget,
  CTAWidget,
  SocialLinksWidget,
  SessionWidget,
} from '../components/overlay';

export default function OverlayPage() {
  return (
    <div
      className="relative w-screen h-screen bg-transparent overflow-hidden select-none pointer-events-none"
      style={{
        width: '1920px',
        height: '1080px',
        maxWidth: '1920px',
        maxHeight: '1080px',
      }}
    >
      {/* Top Header Row (Top-Left: Identity, Top-Center: Mission, Top-Right: Session) */}
      <header className="absolute top-8 left-8 right-8 flex items-start justify-between gap-6 pointer-events-auto">
        <div className="shrink-0">
          <IdentityWidget />
        </div>

        <div className="flex-1 flex justify-center max-w-2xl px-4">
          <MissionWidget />
        </div>

        <div className="shrink-0">
          <SessionWidget />
        </div>
      </header>

      {/* Middle Left: Progress / Task Tracker */}
      <aside className="absolute left-8 top-32 pointer-events-auto">
        <ProgressWidget />
      </aside>

      {/* Bottom Footer Row (Bottom-Left: Now Building, Bottom-Center: CTA, Bottom-Right: Social Links) */}
      <footer className="absolute bottom-8 left-8 right-8 flex items-end justify-between gap-6 pointer-events-auto">
        <div className="max-w-md shrink-0">
          <NowBuildingWidget />
        </div>

        <div className="flex-1 flex justify-center px-4">
          <CTAWidget />
        </div>

        <div className="shrink-0">
          <SocialLinksWidget />
        </div>
      </footer>
    </div>
  );
}
