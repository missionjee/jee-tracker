import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Calendar, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  Trash2, 
  Edit3, 
  Sparkles, 
  CheckCircle2, 
  Flame,
  Tag,
  Filter
} from 'lucide-react';
import { useJEE } from '../context/JEEContext';
import { DailyGoal, Subject, TaskType, Priority } from '../types';
import { getSubjectColor, getPriorityBadge, formatDate } from '../utils/helpers';

interface DailyGoalsProps {
  openAddModal: () => void;
}

export const DailyGoals: React.FC<DailyGoalsProps> = ({ openAddModal }) => {
  const { goals, toggleGoal, deleteGoal, addGoal } = useJEE();
  
  // Selected date state (defaults to today)
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [subjectFilter, setSubjectFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Completed'>('All');

  // Focus Timer state
  const [timerDuration, setTimerDuration] = useState<number>(25 * 60); // 25 mins
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timerLabel, setTimerLabel] = useState<string>('Deep Focus');

  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerRunning) {
      setTimerRunning(false);
      alert('🎉 Focus Session Completed! Take a well-deserved short break.');
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const setPresetTimer = (minutes: number, label: string) => {
    setTimerDuration(minutes * 60);
    setTimeLeft(minutes * 60);
    setTimerRunning(false);
    setTimerLabel(label);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Filter goals
  const dateGoals = goals.filter(g => g.date === selectedDate);
  const filteredGoals = dateGoals.filter(g => {
    const matchSubject = subjectFilter === 'All' || g.subject === subjectFilter;
    const matchStatus = statusFilter === 'All' 
      ? true 
      : statusFilter === 'Completed' ? g.completed : !g.completed;
    return matchSubject && matchStatus;
  });

  const completedCount = dateGoals.filter(g => g.completed).length;
  const totalMinutes = dateGoals.reduce((a, b) => a + b.estimatedMinutes, 0);
  const completedMinutes = dateGoals.filter(g => g.completed).reduce((a, b) => a + b.estimatedMinutes, 0);

  // Quick preset adder
  const handleAddPreset = (title: string, subject: Subject, type: TaskType, mins: number) => {
    addGoal({
      title,
      subject,
      type,
      estimatedMinutes: mins,
      date: selectedDate,
      priority: 'High'
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Date Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-indigo-400" />
            <h1 className="text-xl md:text-2xl font-bold text-white">Daily Study Targets & Goals</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Build discipline with non-negotiable daily tasks. Complete them to maintain your study momentum!
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Date buttons */}
          <button
            onClick={() => setSelectedDate(todayStr)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              selectedDate === todayStr 
                ? 'bg-indigo-600 text-white border-indigo-500' 
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            Today
          </button>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={openAddModal}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition shadow-md shadow-indigo-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Add Target</span>
          </button>
        </div>
      </div>

      {/* Grid: Timer on one side, Goals on the other */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Built-in JEE Focus Timer & Quick Presets */}
        <div className="space-y-6">
          {/* Pomodoro Timer */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-400" />
                <span>JEE Focus Timer</span>
              </span>
              <span className="text-xs text-slate-400">{timerLabel}</span>
            </div>

            <div className="text-center py-4">
              <div className="text-5xl font-extrabold text-white font-mono tracking-tight">
                {formatTimer(timeLeft)}
              </div>
              <p className="text-xs text-slate-400 mt-2">Zero distractions • Phone in another room</p>
            </div>

            <div className="flex items-center justify-center gap-3 mt-2">
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition shadow-lg ${
                  timerRunning 
                    ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20' 
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                }`}
              >
                {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{timerRunning ? 'Pause' : 'Start Focus'}</span>
              </button>
              <button
                onClick={() => {
                  setTimerRunning(false);
                  setTimeLeft(timerDuration);
                }}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                title="Reset timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Presets */}
            <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-slate-800/80 text-xs">
              <button
                onClick={() => setPresetTimer(25, 'Pomodoro (25m)')}
                className={`py-1.5 px-2 rounded-lg border text-center transition ${
                  timerDuration === 25 * 60 ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                25 min
              </button>
              <button
                onClick={() => setPresetTimer(50, 'Standard Block (50m)')}
                className={`py-1.5 px-2 rounded-lg border text-center transition ${
                  timerDuration === 50 * 60 ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                50 min
              </button>
              <button
                onClick={() => setPresetTimer(90, 'Full Mock Block (90m)')}
                className={`py-1.5 px-2 rounded-lg border text-center transition ${
                  timerDuration === 90 * 60 ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                90 min
              </button>
            </div>
          </div>

          {/* Quick Add Presets for JEE */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>1-Click Preset Targets</span>
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => handleAddPreset('Solve 30 Physics PYQs with 2-min limit', 'Physics', 'PYQs/Practice', 75)}
                className="w-full text-left p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-blue-500/40 transition flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-semibold text-blue-400 block">30 Physics PYQs</span>
                  <span className="text-[11px] text-slate-400">Timed solving session</span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">75m</span>
              </button>

              <button
                onClick={() => handleAddPreset('Read NCERT Inorganic Chem Line-by-Line', 'Chemistry', 'Theory', 45)}
                className="w-full text-left p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-emerald-500/40 transition flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-semibold text-emerald-400 block">Inorganic NCERT Reading</span>
                  <span className="text-[11px] text-slate-400">Focus on tables & exceptions</span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">45m</span>
              </button>

              <button
                onClick={() => handleAddPreset('Maths DPP / Module Practice (25 Qs)', 'Mathematics', 'PYQs/Practice', 90)}
                className="w-full text-left p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-amber-500/40 transition flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-semibold text-amber-400 block">Maths Daily Problem Practice</span>
                  <span className="text-[11px] text-slate-400">Level 2 / Advanced tier</span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">90m</span>
              </button>

              <button
                onClick={() => handleAddPreset('Revise Short Notes & Formula Diary', 'General', 'Revision', 30)}
                className="w-full text-left p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-purple-500/40 transition flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-semibold text-purple-400 block">Formula Book Revision</span>
                  <span className="text-[11px] text-slate-400">Night active recall session</span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">30m</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Goals List & Stats */}
        <div className="lg:col-span-2 space-y-4">
          {/* Stats Bar */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400">Target for {formatDate(selectedDate)}</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-bold text-white font-mono">{completedCount} / {dateGoals.length}</span>
                <span className="text-xs font-semibold text-indigo-400">
                  ({dateGoals.length > 0 ? Math.round((completedCount / dateGoals.length) * 100) : 0}% done)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div>
                <span className="text-[11px] text-slate-400 block">Total Planned</span>
                <span className="text-sm font-bold text-slate-200 font-mono">{Math.round(totalMinutes / 60 * 10) / 10} hours</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">Completed</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">{Math.round(completedMinutes / 60 * 10) / 10} hours</span>
              </div>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/50 p-3 rounded-xl border border-slate-800 text-xs">
            {/* Subject Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {['All', 'Physics', 'Chemistry', 'Mathematics', 'General'].map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSubjectFilter(sub)}
                  className={`px-3 py-1 rounded-lg font-medium transition ${
                    subjectFilter === sub 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>

            {/* Status Filters */}
            <div className="flex items-center gap-1.5">
              {(['All', 'Pending', 'Completed'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                    statusFilter === st 
                      ? 'bg-slate-800 text-white border border-slate-700' 
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Goal items */}
          {filteredGoals.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800/80 p-8">
              <CheckCircle2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h4 className="text-base font-semibold text-slate-300">No targets found for this filter</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Add your daily JEE tasks, solve PYQs, and check them off to keep your preparation on track!
              </p>
              <button
                onClick={openAddModal}
                className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium"
              >
                Add Your First Task
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredGoals.map((goal) => {
                const colors = getSubjectColor(goal.subject);
                const priorityBadge = getPriorityBadge(goal.priority);

                return (
                  <div
                    key={goal.id}
                    className={`p-4 rounded-xl border transition-all flex items-start gap-4 ${
                      goal.completed
                        ? 'bg-slate-950/40 border-slate-800/50 opacity-60'
                        : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 shadow-sm'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={goal.completed}
                      onChange={() => toggleGoal(goal.id)}
                      className="mt-1 h-5 w-5 rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0 cursor-pointer"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
                          {goal.subject}
                        </span>
                        <span className="text-[10px] text-slate-300 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
                          {goal.type}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${priorityBadge}`}>
                          {goal.priority}
                        </span>
                        {goal.completedAt && (
                          <span className="text-[10px] text-emerald-400 font-mono ml-auto">
                            Done at {goal.completedAt}
                          </span>
                        )}
                      </div>

                      <h4 className={`text-sm font-semibold leading-relaxed ${goal.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                        {goal.title}
                      </h4>

                      {goal.notes && (
                        <p className="text-xs text-slate-400 mt-1 italic">
                          📝 {goal.notes}
                        </p>
                      )}

                      <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="w-3.5 h-3.5 text-indigo-400" />
                          {goal.estimatedMinutes} mins
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800/80 rounded-lg transition"
                      title="Delete goal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
