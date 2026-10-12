import { useState, useId } from 'react';
import { Plus, Trash2, CheckCircle2, Circle, ListTodo, Filter } from 'lucide-react';
import { useStore } from '../../store';
import type { TaskCategory } from '../../types';

const CATEGORY_CONFIG: Record<TaskCategory, { label: string; bg: string; text: string; border: string; hex: string }> = {
  dsa: {
    label: 'DSA',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    hex: '#f59e0b',
  },
  aiml: {
    label: 'AI / ML',
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
    hex: '#8b5cf6',
  },
  project: {
    label: 'Project',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    hex: '#10b981',
  },
  academic: {
    label: 'Academic',
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    hex: '#3b82f6',
  },
};

type FilterCategory = 'all' | TaskCategory;

export function TaskManager() {
  const tasks = useStore((state) => state.tasks);
  const addTask = useStore((state) => state.addTask);
  const toggleTask = useStore((state) => state.toggleTask);
  const removeTask = useStore((state) => state.removeTask);

  const [titleInput, setTitleInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory>('dsa');
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const categorySelectId = useId();

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = titleInput.trim();
    if (!trimmed) return;
    addTask(trimmed, selectedCategory);
    setTitleInput('');
  };

  // Completion calculation for today
  const todayStr = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter((t) => t.createdAt.startsWith(todayStr));
  const completedToday = todayTasks.filter((t) => t.completed).length;
  const totalToday = todayTasks.length;

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === 'all') return true;
    return task.category === activeFilter;
  });

  return (
    <div className="space-y-6">
      {/* Stats bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#16213e]/70 border border-cyan-500/20 shadow-lg backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <ListTodo className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-300">Daily Progress</h3>
            <p className="text-lg font-semibold text-white tracking-wide">
              <span className="text-cyan-400 font-mono text-xl">{completedToday}</span> of{' '}
              <span className="font-mono text-xl">{totalToday}</span> tasks completed today
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-48 bg-[#1a1a2e] rounded-full h-2.5 overflow-hidden border border-cyan-500/20">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full transition-all duration-500"
              style={{
                width: `${totalToday > 0 ? (completedToday / totalToday) * 100 : 0}%`,
              }}
            />
          </div>
          <span className="text-xs font-mono text-cyan-400 min-w-10 text-right">
            {totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0}%
          </span>
        </div>
      </div>

      {/* Add Task Form */}
      <form
        onSubmit={handleAddTask}
        className="p-5 rounded-xl bg-[#16213e]/40 border border-slate-700/60 shadow-md backdrop-blur-sm space-y-4"
      >
        <div className="flex items-center justify-between">
          <label htmlFor={categorySelectId} className="text-sm font-medium text-slate-300">
            Add New Stream Task
          </label>
          <span className="text-xs text-slate-400">Stream overlay auto-sync enabled</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            placeholder="e.g. Implement Dijkstra's Algorithm with Min Heap"
            className="flex-1 bg-[#1a1a2e] border border-slate-700 focus:border-cyan-400/80 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400/40 transition-colors"
          />

          <div className="flex items-center gap-2">
            <select
              id={categorySelectId}
              aria-label="Task Category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as TaskCategory)}
              className="bg-[#1a1a2e] border border-slate-700 focus:border-cyan-400/80 rounded-lg px-3 py-2.5 text-slate-200 text-sm focus:outline-none transition-colors"
            >
              <option value="dsa">DSA (#f59e0b)</option>
              <option value="aiml">AI / ML (#8b5cf6)</option>
              <option value="project">Project (#10b981)</option>
              <option value="academic">Academic (#3b82f6)</option>
            </select>

            <button
              type="submit"
              disabled={!titleInput.trim()}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </button>
          </div>
        </div>
      </form>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
            Category Filter:
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(['all', 'dsa', 'aiml', 'project', 'academic'] as const).map((cat) => {
            const isActive = activeFilter === cat;
            const count =
              cat === 'all'
                ? tasks.length
                : tasks.filter((t) => t.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 border ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm'
                    : 'bg-[#1a1a2e]/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span>{cat === 'all' ? 'All' : CATEGORY_CONFIG[cat].label}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-900/80 text-slate-300">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-2.5">
        {filteredTasks.length === 0 ? (
          <div className="py-12 text-center rounded-xl border border-dashed border-slate-800 bg-[#16213e]/20 text-slate-500">
            <p className="text-sm">No tasks found for this category.</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const categoryStyle = CATEGORY_CONFIG[task.category] || CATEGORY_CONFIG.dsa;

            return (
              <div
                key={task.id}
                className={`group flex items-center justify-between p-3.5 rounded-lg border transition-all ${
                  task.completed
                    ? 'bg-[#16213e]/30 border-slate-800/80 opacity-75'
                    : 'bg-[#16213e]/70 border-slate-700/60 hover:border-cyan-500/40'
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => toggleTask(task.id)}
                    className="text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer shrink-0"
                    title={task.completed ? 'Mark pending' : 'Mark completed'}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-500 group-hover:text-cyan-400" />
                    )}
                  </button>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm truncate transition-colors ${
                        task.completed
                          ? 'line-through text-slate-500'
                          : 'text-slate-200 font-medium'
                      }`}
                    >
                      {task.title}
                    </p>
                  </div>

                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border shrink-0 ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}
                  >
                    {categoryStyle.label}
                  </span>
                </div>

                <div className="ml-3 shrink-0 flex items-center">
                  <button
                    type="button"
                    onClick={() => removeTask(task.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors cursor-pointer"
                    title="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default TaskManager;
