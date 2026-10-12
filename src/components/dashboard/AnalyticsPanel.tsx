import { useState } from 'react';
import {
  BarChart3,
  ShieldCheck,
  Trash2,
  Filter,
  ExternalLink,
  MousePointerClick,
  Clock,
  Layers,
} from 'lucide-react';
import { useStore } from '../../store';

export function AnalyticsPanel() {
  const analytics = useStore((state) => state.analytics);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [confirmClear, setConfirmClear] = useState<boolean>(false);

  const handleClearAnalytics = () => {
    useStore.setState({ analytics: [] });
    setConfirmClear(false);
  };

  // Extract unique types for filter options
  const eventTypes = Array.from(new Set(analytics.map((e) => e.type)));

  const filteredAnalytics = analytics.filter((event) => {
    if (selectedType === 'all') return true;
    return event.type === selectedType;
  });

  const formatTimestamp = (ts: string) => {
    try {
      const date = new Date(ts);
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    } catch {
      return ts;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type.toLowerCase()) {
      case 'cta_click':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'social_click':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'project_click':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#16213e]/70 border border-cyan-500/20 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase tracking-wider font-medium">Total Clicks</span>
            <MousePointerClick className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{analytics.length}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Live interaction events</span>
        </div>

        <div className="p-4 rounded-xl bg-[#16213e]/70 border border-purple-500/20 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase tracking-wider font-medium">Active Channels</span>
            <Layers className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white">{eventTypes.length}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Unique event categories</span>
        </div>

        <div className="p-4 rounded-xl bg-[#16213e]/70 border border-emerald-500/20 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase tracking-wider font-medium">Latest Activity</span>
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-sm font-medium text-white truncate">
            {analytics[0] ? formatTimestamp(analytics[0].timestamp) : 'No events yet'}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Most recent viewer action</span>
        </div>
      </div>

      {/* Filter and Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#16213e]/50 border border-slate-700/60 shadow-md">
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 mr-1" />
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Filter:
          </span>
          <button
            type="button"
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
              selectedType === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                : 'bg-[#1a1a2e] text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            All Events ({analytics.length})
          </button>
          {eventTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                selectedType === type
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                  : 'bg-[#1a1a2e] text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {type} ({analytics.filter((e) => e.type === type).length})
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {confirmClear ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-rose-400 font-medium">Clear all records?</span>
              <button
                type="button"
                onClick={handleClearAnalytics}
                className="px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-medium hover:bg-rose-500/30 transition-colors cursor-pointer"
              >
                Yes, Clear
              </button>
              <button
                type="button"
                onClick={() => setConfirmClear(false)}
                className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmClear(true)}
              disabled={analytics.length === 0}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30 border border-slate-700 text-slate-400 text-xs font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Analytics</span>
            </button>
          )}
        </div>
      </div>

      {/* Analytics Table */}
      <div className="rounded-xl border border-slate-800 bg-[#16213e]/40 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#1a1a2e]/90 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3 font-semibold">Event Type</th>
                <th className="px-4 py-3 font-semibold">Label</th>
                <th className="px-4 py-3 font-semibold">Target URL</th>
                <th className="px-4 py-3 font-semibold text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
              {filteredAnalytics.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-slate-500 font-sans">
                    <BarChart3 className="w-8 h-8 mx-auto text-slate-600 mb-2 opacity-50" />
                    <p className="text-sm">No analytics events recorded yet.</p>
                    <p className="text-xs text-slate-600 mt-1">
                      Viewer interactions from overlay/companion links will appear here.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredAnalytics.map((event) => (
                  <tr key={event.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getTypeBadge(
                          event.type
                        )}`}
                      >
                        {event.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-sans font-medium text-slate-200">
                      {event.label}
                    </td>
                    <td className="px-4 py-3 text-slate-400 max-w-xs truncate">
                      {event.url && event.url !== '#' ? (
                        <a
                          href={event.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 hover:underline"
                        >
                          <span className="truncate max-w-[200px]">{event.url}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-400 whitespace-nowrap">
                      {formatTimestamp(event.timestamp)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Privacy Note */}
      <div className="flex items-center space-x-3 p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-slate-300 text-xs">
        <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
        <p className="leading-relaxed">
          <strong className="text-cyan-300 font-semibold">Privacy Guarantee: </strong>
          Analytics are stored locally. No data is sent to external servers.
        </p>
      </div>
    </div>
  );
}

export default AnalyticsPanel;
