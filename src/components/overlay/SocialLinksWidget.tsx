import { useStore } from '../../store';
import { Globe, GitBranch } from 'lucide-react';

export function SocialLinksWidget() {
  const isVisible = useStore((state) => state.widgets.socialLinks);
  const socialLinks = useStore((state) => state.socialLinks);
  const accentColor = useStore((state) => state.accentColor);

  if (!isVisible) {
    return null;
  }

  const enabledLinks = socialLinks?.filter((link) => link.enabled) || [];

  if (enabledLinks.length === 0) {
    return null;
  }

  const getIcon = (iconName: string, platform: string) => {
    const key = (iconName || platform).toLowerCase();
    if (key.includes('git')) {
      return <GitBranch size={11} />;
    }
    return <Globe size={11} />;
  };

  const formatHandle = (url: string, platform: string) => {
    try {
      if (url.includes('github.com/')) {
        const parts = url.split('github.com/')[1]?.replace(/\/$/, '');
        if (parts) return parts;
      }
      const parsed = new URL(url);
      return parsed.hostname.replace('www.', '');
    } catch {
      return platform;
    }
  };

  return (
    <div className="inline-flex items-center gap-1.5 transition-all duration-300">
      {enabledLinks.map((link, index) => {
        const handleOrHost = formatHandle(link.url, link.platform);

        return (
          <div
            key={`${link.platform}-${index}`}
            className="flex items-center gap-1 px-2 py-0.5 rounded backdrop-blur-md transition-all duration-300 font-mono text-[10px] select-none"
            style={{
              backgroundColor: 'rgba(15, 17, 28, 0.82)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <span style={{ color: accentColor }}>
              {getIcon(link.icon, link.platform)}
            </span>
            <span className="text-slate-300">{handleOrHost}</span>
          </div>
        );
      })}
    </div>
  );
}
