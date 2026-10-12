import { useStore } from '../../store';
import { Globe, Link2, GitBranch } from 'lucide-react';

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
      return <GitBranch size={13} />;
    }
    if (key.includes('globe') || key.includes('portfolio') || key.includes('web')) {
      return <Globe size={13} />;
    }
    return <Link2 size={13} />;
  };

  const formatHandle = (url: string, platform: string) => {
    try {
      if (url.includes('github.com/')) {
        const parts = url.split('github.com/')[1]?.replace(/\/$/, '');
        if (parts) return `/${parts}`;
      }
      const parsed = new URL(url);
      return parsed.hostname.replace('www.', '');
    } catch {
      return platform;
    }
  };

  return (
    <div className="inline-flex items-center gap-2 transition-all duration-500">
      {enabledLinks.map((link, index) => {
        const handleOrHost = formatHandle(link.url, link.platform);

        return (
          <div
            key={`${link.platform}-${index}`}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md backdrop-blur-md transition-all duration-500"
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.85)',
              border: `1px solid ${accentColor}26`,
              boxShadow: `0 2px 10px -2px ${accentColor}14`,
            }}
          >
            <span style={{ color: accentColor }}>
              {getIcon(link.icon, link.platform)}
            </span>
            <div className="flex items-center gap-1 font-mono text-xs">
              <span className="text-white font-medium">{link.platform}</span>
              <span className="text-[11px] text-slate-400 font-normal">
                {handleOrHost}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
