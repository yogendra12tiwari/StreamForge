import { useEffect, useState } from 'react';
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

  // Responsive scale detection for preview windows or non-1920x1080 browser viewports
  const [viewportScale, setViewportScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      // In OBS Browser Source (1920x1080), window.innerWidth is 1920.
      // In regular browser preview, autoscale down so all 4 corners remain visible.
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w < 1920 || h < 1080) {
        const s = Math.min(w / 1920, h / 1080);
        setViewportScale(s);
      } else {
        setViewportScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const combinedScale = scale * viewportScale;

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-transparent overflow-hidden select-none pointer-events-none flex items-center justify-center"
      style={{
        backgroundColor: 'transparent',
      }}
    >
      {/* 
        1920x1080 Native Canvas Area
        Scaled smoothly to fit viewport while keeping 100% genuine transparency
      */}
      <div
        className="relative bg-transparent pointer-events-none"
        style={{
          width: '1920px',
          height: '1080px',
          transform: `scale(${combinedScale})`,
          transformOrigin: 'center center',
          backgroundColor: 'transparent',
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
