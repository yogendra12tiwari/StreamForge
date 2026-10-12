import { useStore } from '../store';
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
  const scale = useStore((state) => state.scale ?? 1.0);
  const safeMargin = useStore((state) => state.safeMargin ?? 24);
  const distractionFree = useStore((state) => state.distractionFree ?? false);

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
      {/* 
        Scaled Overlay Container:
        Keeps 85-90% of screen center completely unobstructed for code/terminals/slides.
      */}
      <div
        className="w-full h-full relative transition-transform duration-300"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        {/* 1. TOP-LEFT: Identity / Brand Label */}
        <div
          className="absolute pointer-events-auto"
          style={{ top: `${safeMargin}px`, left: `${safeMargin}px` }}
        >
          <IdentityWidget />
        </div>

        {/* 2. TOP-RIGHT: Current Mission / Topic */}
        <div
          className="absolute pointer-events-auto"
          style={{ top: `${safeMargin}px`, right: `${safeMargin}px` }}
        >
          <MissionWidget />
        </div>

        {/* If distraction-free mode is enabled, only Brand and Mission are shown */}
        {!distractionFree && (
          <>
            {/* 3. BOTTOM-LEFT: Daily Task Progress (+ Optional NowBuilding next to it) */}
            <div
              className="absolute pointer-events-auto flex items-center gap-3"
              style={{ bottom: `${safeMargin}px`, left: `${safeMargin}px` }}
            >
              <ProgressWidget />
              <NowBuildingWidget />
            </div>

            {/* 4. BOTTOM-RIGHT: Coding Session Timer (+ Optional CTA / Socials) */}
            <div
              className="absolute pointer-events-auto flex items-center gap-3"
              style={{ bottom: `${safeMargin}px`, right: `${safeMargin}px` }}
            >
              <CTAWidget />
              <SocialLinksWidget />
              <SessionWidget />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
