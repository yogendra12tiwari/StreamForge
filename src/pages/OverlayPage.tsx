import { useEffect } from 'react';
import { useStore } from '../store';
import {
  IdentityWidget,
  MissionWidget,
  ProgressWidget,
  SessionWidget,
} from '../components/overlay';

export default function OverlayPage() {
  const safeMargin = useStore((state) => state.safeMargin ?? 24);

  useEffect(() => {
    // Ensure OBS browser canvas has zero scrollbars and no background
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.backgroundColor = 'transparent';
    document.body.style.backgroundColor = 'transparent';

    return () => {
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-transparent overflow-hidden select-none pointer-events-none"
      style={{
        backgroundColor: 'transparent',
      }}
    >
      {/* 
        Native Screen-Fitting 4-Corner Layout:
        Automatically adapts to ANY OBS Browser Source resolution (1080p, 720p, 1440p, 4K)
        without clipping, off-screen overflow, or complex transform-scales.
      */}

      {/* 1. TOP-LEFT: Brand & Focus Tag */}
      <div
        className="absolute pointer-events-auto"
        style={{ top: `${safeMargin}px`, left: `${safeMargin}px` }}
      >
        <IdentityWidget />
      </div>

      {/* 2. TOP-RIGHT: Current Challenge & Topic */}
      <div
        className="absolute pointer-events-auto"
        style={{ top: `${safeMargin}px`, right: `${safeMargin}px` }}
      >
        <MissionWidget />
      </div>

      {/* 3. BOTTOM-LEFT: Daily Task Counter & Progress */}
      <div
        className="absolute pointer-events-auto"
        style={{ bottom: `${safeMargin}px`, left: `${safeMargin}px` }}
      >
        <ProgressWidget />
      </div>

      {/* 4. BOTTOM-RIGHT: Coding Session Focus Timer */}
      <div
        className="absolute pointer-events-auto"
        style={{ bottom: `${safeMargin}px`, right: `${safeMargin}px` }}
      >
        <SessionWidget />
      </div>
    </div>
  );
}
