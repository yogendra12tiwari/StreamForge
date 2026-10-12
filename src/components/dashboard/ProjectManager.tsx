import { useState } from 'react';
import {
  FolderGit2,
  Plus,
  Trash2,
  ExternalLink,
  Edit2,
  Check,
  X,
  Radio,
  Layers,
} from 'lucide-react';
import { useStore } from '../../store';
import type { Project } from '../../types';

export function ProjectManager() {
  const projects = useStore((state) => state.projects);
  const addProject = useStore((state) => state.addProject);
  const updateProject = useStore((state) => state.updateProject);
  const removeProject = useStore((state) => state.removeProject);

  // New project state
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newTechStack, setNewTechStack] = useState('');
  const [newLink, setNewLink] = useState('');

  // Inline editing state: holds the project ID currently being edited
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFields, setEditFields] = useState<{
    name: string;
    description: string;
    techStack: string;
    link: string;
  }>({
    name: '',
    description: '',
    techStack: '',
    link: '',
  });

  const handleStartEdit = (proj: Project) => {
    setEditingId(proj.id);
    setEditFields({
      name: proj.name,
      description: proj.description,
      techStack: proj.techStack.join(', '),
      link: proj.link,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = (id: string) => {
    const techStackArray = editFields.techStack
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    updateProject(id, {
      name: editFields.name.trim() || 'Untitled Project',
      description: editFields.description.trim(),
      techStack: techStackArray,
      link: editFields.link.trim(),
    });
    setEditingId(null);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const techArray = newTechStack
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    addProject({
      name: newName.trim(),
      description: newDescription.trim(),
      techStack: techArray.length ? techArray : ['TypeScript'],
      link: newLink.trim() || '#',
      active: projects.length === 0, // auto-active if first project
    });

    // Reset form
    setNewName('');
    setNewDescription('');
    setNewTechStack('');
    setNewLink('');
    setIsAdding(false);
  };

  const handleToggleActive = (id: string, currentStatus: boolean) => {
    // If activating this one, we can also make sure other projects are inactive
    // or just toggle it directly. In OBS overlays, typically one project is "Now Building".
    if (!currentStatus) {
      // Set all others to false and this to true
      projects.forEach((p) => {
        if (p.id !== id && p.active) {
          updateProject(p.id, { active: false });
        }
      });
      updateProject(id, { active: true });
    } else {
      updateProject(id, { active: false });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#16213e]/70 border border-cyan-500/20 shadow-lg backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-slate-300">Active Showcase</h3>
            <p className="text-xs text-slate-400">
              Select which project appears in the &quot;Now Building&quot; overlay widget
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 text-sm font-medium transition-all cursor-pointer self-start sm:self-auto"
        >
          {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{isAdding ? 'Cancel' : 'New Project'}</span>
        </button>
      </div>

      {/* Add New Project Collapsible Form */}
      {isAdding && (
        <form
          onSubmit={handleAddSubmit}
          className="p-5 rounded-xl bg-[#16213e]/90 border border-cyan-500/40 shadow-xl backdrop-blur-md space-y-4 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
            <h4 className="text-sm font-semibold text-cyan-300 flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Project to Portfolio
            </h4>
            <span className="text-xs text-slate-400">All fields update in real time</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Project Name *
              </label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Real-Time Distributed Cache"
                className="w-full bg-[#1a1a2e] border border-slate-700 focus:border-cyan-400/80 rounded-lg px-3.5 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400/40"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Repository or Live Link
              </label>
              <input
                type="url"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                placeholder="https://github.com/username/project"
                className="w-full bg-[#1a1a2e] border border-slate-700 focus:border-cyan-400/80 rounded-lg px-3.5 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400/40"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Brief summary of architecture, key algorithms, or problem solved..."
                className="w-full bg-[#1a1a2e] border border-slate-700 focus:border-cyan-400/80 rounded-lg px-3.5 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400/40 resize-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Tech Stack (comma-separated)
              </label>
              <input
                type="text"
                value={newTechStack}
                onChange={(e) => setNewTechStack(e.target.value)}
                placeholder="Rust, WebAssembly, React, Tailwind CSS"
                className="w-full bg-[#1a1a2e] border border-slate-700 focus:border-cyan-400/80 rounded-lg px-3.5 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400/40"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 text-sm transition-all shadow-md cursor-pointer"
            >
              Save Project
            </button>
          </div>
        </form>
      )}

      {/* Projects List */}
      <div className="grid grid-cols-1 gap-4">
        {projects.length === 0 ? (
          <div className="py-12 text-center rounded-xl border border-dashed border-slate-800 bg-[#16213e]/20 text-slate-500">
            <p className="text-sm">No projects added yet. Click &quot;New Project&quot; above.</p>
          </div>
        ) : (
          projects.map((proj) => {
            const isEditing = editingId === proj.id;

            return (
              <div
                key={proj.id}
                className={`p-5 rounded-xl border transition-all ${
                  proj.active
                    ? 'bg-[#16213e]/80 border-cyan-500/40 shadow-lg shadow-cyan-950/20'
                    : 'bg-[#16213e]/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                {isEditing ? (
                  /* Inline Edit Mode */
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                      <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                        Edit Project
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(proj.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40 text-xs font-medium cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" /> Save
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-xs font-medium cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" /> Cancel
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Name</label>
                        <input
                          type="text"
                          value={editFields.name}
                          onChange={(e) =>
                            setEditFields({ ...editFields, name: e.target.value })
                          }
                          className="w-full bg-[#1a1a2e] border border-slate-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Link</label>
                        <input
                          type="url"
                          value={editFields.link}
                          onChange={(e) =>
                            setEditFields({ ...editFields, link: e.target.value })
                          }
                          className="w-full bg-[#1a1a2e] border border-slate-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs text-slate-400 block mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={editFields.description}
                          onChange={(e) =>
                            setEditFields({ ...editFields, description: e.target.value })
                          }
                          className="w-full bg-[#1a1a2e] border border-slate-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-cyan-400 resize-none"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-xs text-slate-400 block mb-1">
                          Tech Stack (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={editFields.techStack}
                          onChange={(e) =>
                            setEditFields({ ...editFields, techStack: e.target.value })
                          }
                          className="w-full bg-[#1a1a2e] border border-slate-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* View Mode */
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-base font-semibold text-white tracking-wide">
                          {proj.name}
                        </h4>
                        {proj.active && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            Active on Stream
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-slate-300 leading-relaxed">
                        {proj.description || 'No description provided.'}
                      </p>

                      {/* Tech Stack tags */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <Layers className="w-3.5 h-3.5 text-slate-500 mr-1 shrink-0" />
                        {proj.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded text-xs font-mono bg-[#1a1a2e] text-slate-300 border border-slate-700/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Project Link */}
                      {proj.link && proj.link !== '#' && (
                        <div className="pt-1">
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span className="truncate max-w-sm">{proj.link}</span>
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(proj.id, proj.active)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                          proj.active
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/30'
                            : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200 hover:bg-slate-800'
                        }`}
                        title="Set as active project in OBS overlay"
                      >
                        <Radio className="w-3.5 h-3.5" />
                        <span>{proj.active ? 'Active' : 'Set Active'}</span>
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(proj)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors cursor-pointer"
                          title="Edit project"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeProject(proj.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                          title="Delete project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ProjectManager;
