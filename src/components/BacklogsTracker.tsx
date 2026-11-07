import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Plus, 
  CheckCircle, 
  Clock, 
  Calendar, 
  Trash2, 
  Sparkles, 
  ArrowRight,
  ShieldAlert,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { useJEE } from '../context/JEEContext';
import { BacklogItem } from '../types';
import { getSubjectColor, getPriorityBadge, getDaysRemaining, formatDate } from '../utils/helpers';

interface BacklogsTrackerProps {
  openAddModal: () => void;
}

export const BacklogsTracker: React.FC<BacklogsTrackerProps> = ({ openAddModal }) => {
  const { backlogs, updateBacklogStatus, deleteBacklog } = useJEE();
  const [activeTab, setActiveTab] = useState<'Active' | 'Cleared' | 'All'>('Active');
  const [subjectFilter, setSubjectFilter] = useState<string>('All');

  // Stats
  const activeItems = backlogs.filter(b => b.status !== 'Cleared');
  const clearedItems = backlogs.filter(b => b.status === 'Cleared');
  const highPriorityCount = activeItems.filter(b => b.priority === 'High').length;
  const totalHoursNeeded = activeItems.reduce((acc, curr) => acc + curr.estimatedHours, 0);

  // Filter items
  const filteredBacklogs = backlogs.filter(b => {
    const matchStatus = activeTab === 'All' 
      ? true 
      : activeTab === 'Cleared' ? b.status === 'Cleared' : b.status !== 'Cleared';
    const matchSubject = subjectFilter === 'All' || b.subject === subjectFilter;
    return matchStatus && matchSubject;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-rose-400" />
            <h1 className="text-xl md:text-2xl font-bold text-white">JEE Backlog Clearance Command Center</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            "Don't let yesterday take up too much of today." Systematically break down backlogs into scheduled study blocks and clear them for good.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs sm:text-sm transition shadow-lg shadow-rose-600/30 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Backlog Topic</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Active Backlogs */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <span className="text-xs font-semibold text-slate-400 uppercase">Active Backlogs</span>
          <div className="text-2xl font-extrabold text-rose-400 font-mono mt-1">{activeItems.length}</div>
          <span className="text-[11px] text-slate-500">Chapters / Topics pending</span>
        </div>

        {/* High Priority */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <span className="text-xs font-semibold text-slate-400 uppercase">High Priority</span>
          <div className="text-2xl font-extrabold text-amber-400 font-mono mt-1">{highPriorityCount}</div>
          <span className="text-[11px] text-amber-500/80">Need urgent clearance</span>
        </div>

        {/* Hours Needed */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <span className="text-xs font-semibold text-slate-400 uppercase">Estimated Hours</span>
          <div className="text-2xl font-extrabold text-indigo-400 font-mono mt-1">{totalHoursNeeded}h</div>
          <span className="text-[11px] text-slate-500">To clear all active items</span>
        </div>

        {/* Cleared Backlogs */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <span className="text-xs font-semibold text-slate-400 uppercase">Cleared Backlogs</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">{clearedItems.length}</div>
          <span className="text-[11px] text-emerald-500/80">Destroyed successfully!</span>
        </div>
      </div>

      {/* Controls & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/70 p-4 rounded-xl border border-slate-800 text-xs">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('Active')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'Active' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Active & In Progress ({activeItems.length})
          </button>
          <button
            onClick={() => setActiveTab('Cleared')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'Cleared' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Cleared ({clearedItems.length})
          </button>
          <button
            onClick={() => setActiveTab('All')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'All' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Items ({backlogs.length})
          </button>
        </div>

        {/* Subject Filter */}
        <div className="flex items-center gap-1.5">
          {['All', 'Physics', 'Chemistry', 'Mathematics'].map((sub) => (
            <button
              key={sub}
              onClick={() => setSubjectFilter(sub)}
              className={`px-3 py-1 rounded-lg font-medium transition ${
                subjectFilter === sub 
                  ? 'bg-slate-800 text-white border border-slate-700' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Backlogs List */}
      <div className="space-y-3">
        {filteredBacklogs.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800 p-8 text-xs text-slate-400">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h4 className="text-base font-semibold text-white">No backlogs in this view!</h4>
            <p className="mt-1 max-w-sm mx-auto">
              {activeTab === 'Active' 
                ? 'Great job keeping up with your coaching and self-study!' 
                : 'Any backlog cleared will be archived here for your confidence.'}
            </p>
          </div>
        ) : (
          filteredBacklogs.map((item) => {
            const colors = getSubjectColor(item.subject);
            const priorityBadge = getPriorityBadge(item.priority);
            const daysRemaining = getDaysRemaining(item.targetClearanceDate);
            const isCleared = item.status === 'Cleared';

            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isCleared
                    ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Left Side: Topic & Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
                      {item.subject}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${priorityBadge}`}>
                      {item.priority} Priority
                    </span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                      item.status === 'Cleared'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : item.status === 'In Progress'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      Status: {item.status}
                    </span>
                  </div>

                  <h4 className={`text-sm font-bold tracking-tight ${isCleared ? 'line-through text-slate-500' : 'text-white'}`}>
                    {item.chapterName}
                  </h4>

                  <p className="text-xs text-slate-300 mt-1">
                    {item.missingDescription}
                  </p>

                  {item.notes && (
                    <p className="text-xs text-slate-400 mt-1 italic">
                      Action Plan: {item.notes}
                    </p>
                  )}
                </div>

                {/* Right Side: Urgency & Actions */}
                <div className="flex items-center gap-4 self-end md:self-auto flex-shrink-0 text-xs">
                  <div className="text-right">
                    <span className={`font-mono text-xs font-semibold block ${
                      daysRemaining <= 2 ? 'text-rose-400' : 'text-slate-300'
                    }`}>
                      {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Target date passed!'}
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" />
                      {item.estimatedHours}h estimated
                    </span>
                  </div>

                  {/* Status Toggle Buttons */}
                  <div className="flex items-center gap-1.5">
                    {item.status !== 'Cleared' && (
                      <button
                        onClick={() => updateBacklogStatus(item.id, 'Cleared')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 font-semibold text-xs flex items-center gap-1 transition"
                        title="Mark as Cleared"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Mark Cleared</span>
                      </button>
                    )}

                    {item.status === 'Active' && (
                      <button
                        onClick={() => updateBacklogStatus(item.id, 'In Progress')}
                        className="px-2.5 py-1.5 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/30 text-amber-300 font-medium text-xs transition"
                        title="Start studying this topic"
                      >
                        Start Now
                      </button>
                    )}

                    {item.status === 'Cleared' && (
                      <button
                        onClick={() => updateBacklogStatus(item.id, 'Active')}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
                        title="Reopen backlog"
                      >
                        Reopen
                      </button>
                    )}

                    <button
                      onClick={() => deleteBacklog(item.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
