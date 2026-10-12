import { useState, useRef, useEffect } from 'react';
import { ExternalLink, RefreshCw, Monitor, Copy, Check } from 'lucide-react';

export function OverlayPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.5);
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  // Dynamically calculate the scale factor to fit 1920x1080 into the responsive container
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const newScale = containerWidth / 1920;
        setScale(newScale);
      }
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener('resize', updateScale);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
  };

  const overlayUrl = `${window.location.origin}/overlay`;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(overlayUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#16213e]/70 border border-cyan-500/20 shadow-lg backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Live OBS Overlay Canvas</h3>
            <p className="text-xs text-slate-400">
              1920x1080 native resolution viewport preview
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopyUrl}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
            title="Copy OBS Browser Source URL"
          >
            {copiedUrl ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied OBS URL</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy OBS URL</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleRefresh}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
            title="Reload iframe"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reload</span>
          </button>

          <a
            href="/overlay"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 text-xs font-medium transition-all cursor-pointer"
          >
            <span>Open in new tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* OBS Canvas Simulation Box */}
      <div className="relative rounded-2xl border-2 border-slate-800/80 bg-[#0a0a12] p-2 shadow-2xl overflow-hidden">
        {/* Subtle OBS checkerboard / dark pattern overlay */}
        <div className="absolute top-3 left-4 z-20 flex items-center space-x-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-red-500/20 text-red-400 border border-red-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-1.5 animate-pulse" />
            OBS CANVAS 1080P
          </span>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
            Scale: {Math.round(scale * 100)}%
          </span>
        </div>

        {/* 16:9 Aspect Ratio Container */}
        <div
          ref={containerRef}
          className="relative w-full aspect-video rounded-xl bg-transparent overflow-hidden shadow-inner"
        >
          <iframe
            key={iframeKey}
            src="/overlay"
            title="StreamForge Overlay Preview"
            className="border-0 absolute top-0 left-0 pointer-events-auto"
            style={{
              width: '1920px',
              height: '1080px',
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          />
        </div>
      </div>

      {/* Instructions callout */}
      <div className="p-4 rounded-xl bg-[#16213e]/40 border border-slate-800 text-xs text-slate-400 space-y-1">
        <p className="font-semibold text-slate-300">OBS Studio Integration Guide:</p>
        <p>
          1. In OBS Studio, add a <span className="text-cyan-400 font-mono">Browser</span> source.
        </p>
        <p>
          2. Set URL to <span className="text-cyan-400 font-mono">{overlayUrl}</span> with width{' '}
          <span className="text-slate-200 font-mono">1920</span> and height{' '}
          <span className="text-slate-200 font-mono">1080</span>.
        </p>
        <p>3. Check &quot;Shutdown source when not visible&quot; to optimize GPU and CPU usage.</p>
      </div>
    </div>
  );
}

export default OverlayPreview;
