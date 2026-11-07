import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Plus, 
  RotateCw,
  Flame,
  Award
} from 'lucide-react';
import { useJEE } from '../context/JEEContext';
import { SyllabusStatus, Confidence, Subject } from '../types';
import { getSubjectColor } from '../utils/helpers';

export const SyllabusTracker: React.FC = () => {
  const { syllabus, updateChapter, incrementRevision } = useJEE();

  // Filters state
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedWeightage, setSelectedWeightage] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedChapterId, setExpandedChapterId] = useState<string | null>(null);

  // Filter syllabus
  const filteredChapters = syllabus.filter(ch => {
    const matchSubject = selectedSubject === 'All' || ch.subject === selectedSubject;
    const matchClass = selectedClass === 'All' || ch.classLevel === selectedClass;
    const matchStatus = selectedStatus === 'All' || ch.status === selectedStatus;
    const matchWeightage = selectedWeightage === 'All' || ch.weightage === selectedWeightage;
    const matchSearch = searchQuery === '' || 
      ch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.subtopics?.some(st => st.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchSubject && matchClass && matchStatus && matchWeightage && matchSearch;
  });

  // Calculate stats
  const totalCount = syllabus.length;
  const completedCount = syllabus.filter(c => c.status === 'Completed').length;
  const inProgressCount = syllabus.filter(c => c.status === 'In Progress').length;
  const highConfidenceCount = syllabus.filter(c => c.confidence === 'High').length;

  const phyChaps = syllabus.filter(c => c.subject === 'Physics');
  const chemChaps = syllabus.filter(c => c.subject === 'Chemistry');
  const mathChaps = syllabus.filter(c => c.subject === 'Mathematics');

  const phyDone = phyChaps.filter(c => c.status === 'Completed').length;
  const chemDone = chemChaps.filter(c => c.status === 'Completed').length;
  const mathDone = mathChaps.filter(c => c.status === 'Completed').length;

  const toggleSubtopic = (chapterId: string) => {
    setExpandedChapterId(expandedChapterId === chapterId ? null : chapterId);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-cyan-400" />
            <h1 className="text-xl md:text-2xl font-bold text-white">Full JEE Mains & Advanced Syllabus Tracker</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Complete NTA & IIT JEE syllabus breakdown for Physics, Chemistry & Maths (45+ Chapters, Theory, Notes, PYQs & Revisions).
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold font-mono">
            {completedCount} / {totalCount} Chapters ({Math.round((completedCount / totalCount) * 100)}%)
          </span>
        </div>
      </div>

      {/* Subject Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Physics */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-blue-400 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Physics
            </span>
            <span className="font-mono text-slate-300 font-semibold">{phyDone}/{phyChaps.length} ({Math.round((phyDone/phyChaps.length)*100)}%)</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div className="bg-blue-500 h-full rounded-full transition-all" style={{ width: `${(phyDone/phyChaps.length)*100}%` }}></div>
          </div>
        </div>

        {/* Chemistry */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Chemistry
            </span>
            <span className="font-mono text-slate-300 font-semibold">{chemDone}/{chemChaps.length} ({Math.round((chemDone/chemChaps.length)*100)}%)</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${(chemDone/chemChaps.length)*100}%` }}></div>
          </div>
        </div>

        {/* Mathematics */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-amber-400 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Mathematics
            </span>
            <span className="font-mono text-slate-300 font-semibold">{mathDone}/{mathChaps.length} ({Math.round((mathDone/mathChaps.length)*100)}%)</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div className="bg-amber-500 h-full rounded-full transition-all" style={{ width: `${(mathDone/mathChaps.length)*100}%` }}></div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search chapters or subtopics (e.g., Rotational, Thermodynamics, Integration, SN1)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
          {/* Subject Filter */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {['All', 'Physics', 'Chemistry', 'Mathematics'].map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3 py-1 rounded-lg font-medium transition ${
                  selectedSubject === sub 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* Class, Status & Weightage Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-300 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Classes</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-300 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Not Started">Not Started</option>
            </select>

            <select
              value={selectedWeightage}
              onChange={(e) => setSelectedWeightage(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-300 text-xs focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Weightages</option>
              <option value="High">High Weightage</option>
              <option value="Medium">Medium Weightage</option>
              <option value="Low">Low Weightage</option>
            </select>
          </div>
        </div>
      </div>

      {/* Chapters List */}
      <div className="space-y-3">
        {filteredChapters.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800 p-8 text-xs text-slate-400">
            No syllabus chapters match your current filter.
          </div>
        ) : (
          filteredChapters.map((ch) => {
            const colors = getSubjectColor(ch.subject);
            const isExpanded = expandedChapterId === ch.id;

            return (
              <div
                key={ch.id}
                className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition"
              >
                <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Chapter Info */}
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="mt-0.5">
                      <select
                        value={ch.status}
                        onChange={(e) => updateChapter(ch.id, { status: e.target.value as SyllabusStatus })}
                        className={`text-xs font-semibold rounded-lg px-2 py-1 border focus:outline-none cursor-pointer ${
                          ch.status === 'Completed'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : ch.status === 'In Progress'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        <option value="Not Started" className="bg-slate-900 text-slate-400">Not Started</option>
                        <option value="In Progress" className="bg-slate-900 text-amber-400">In Progress</option>
                        <option value="Completed" className="bg-slate-900 text-emerald-400">Completed</option>
                      </select>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
                          {ch.subject}
                        </span>
                        <span className="text-[10px] text-slate-300 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
                          Class {ch.classLevel}
                        </span>
                        {ch.weightage === 'High' && (
                          <span className="text-[10px] font-bold text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                            ★ High Weightage
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-white tracking-tight">
                        {ch.name}
                      </h4>
                    </div>
                  </div>

                  {/* Checklist: Theory, Notes, PYQs, Revision, Confidence */}
                  <div className="flex flex-wrap items-center gap-3 md:gap-5 self-start md:self-auto text-xs">
                    {/* Theory */}
                    <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer hover:text-white">
                      <input
                        type="checkbox"
                        checked={ch.theoryDone}
                        onChange={(e) => updateChapter(ch.id, { theoryDone: e.target.checked })}
                        className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0"
                      />
                      <span>Theory</span>
                    </label>

                    {/* Notes */}
                    <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer hover:text-white">
                      <input
                        type="checkbox"
                        checked={ch.notesDone}
                        onChange={(e) => updateChapter(ch.id, { notesDone: e.target.checked })}
                        className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0"
                      />
                      <span>Notes</span>
                    </label>

                    {/* PYQs */}
                    <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer hover:text-white">
                      <input
                        type="checkbox"
                        checked={ch.pyqDone}
                        onChange={(e) => updateChapter(ch.id, { pyqDone: e.target.checked })}
                        className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0"
                      />
                      <span>PYQs</span>
                    </label>

                    {/* Revision Counter */}
                    <button
                      onClick={() => incrementRevision(ch.id)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border font-mono font-medium transition ${
                        ch.revisionCount >= 3
                          ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                          : ch.revisionCount > 0
                          ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                      title="Click to record another revision round!"
                    >
                      <RotateCw className="w-3 h-3" />
                      <span>{ch.revisionCount}x Rev</span>
                    </button>

                    {/* Confidence Selector */}
                    <select
                      value={ch.confidence}
                      onChange={(e) => updateChapter(ch.id, { confidence: e.target.value as Confidence })}
                      className={`text-xs rounded-lg px-2 py-1 border focus:outline-none cursor-pointer ${
                        ch.confidence === 'High'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : ch.confidence === 'Medium'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      }`}
                    >
                      <option value="Low" className="bg-slate-900 text-rose-400">Low Confidence</option>
                      <option value="Medium" className="bg-slate-900 text-amber-400">Medium Confidence</option>
                      <option value="High" className="bg-slate-900 text-emerald-400">High Confidence</option>
                    </select>

                    {/* Expand Subtopics Button */}
                    {ch.subtopics && ch.subtopics.length > 0 && (
                      <button
                        onClick={() => toggleSubtopic(ch.id)}
                        className="p-1 text-slate-400 hover:text-slate-200"
                        title="View subtopics"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Subtopics Checklist Panel */}
                {isExpanded && ch.subtopics && (
                  <div className="bg-slate-950/70 p-4 border-t border-slate-800">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                      Key Concepts & Sub-topics:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {ch.subtopics.map((topic, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800/60 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                          <span>{topic}</span>
                        </div>
                      ))}
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
};
