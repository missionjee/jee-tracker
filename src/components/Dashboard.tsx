import React from 'react';
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  ChevronRight, 
  Award, 
  Plus, 
  Flame, 
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { useJEE } from '../context/JEEContext';
import { getDaysRemaining, getSubjectColor, formatDate } from '../utils/helpers';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface DashboardProps {
  setActiveTab: (tab: string) => void;
  openAddGoalModal: () => void;
  openAddTestModal: () => void;
  openAddBacklogModal: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  setActiveTab,
  openAddGoalModal,
  openAddTestModal,
  openAddBacklogModal
}) => {
  const { settings, goals, toggleGoal, tests, syllabus, backlogs } = useJEE();

  // Countdown calculations
  const daysMain1 = getDaysRemaining(settings.examDates.jeeMainSession1);
  const daysMain2 = getDaysRemaining(settings.examDates.jeeMainSession2);
  const daysAdv = getDaysRemaining(settings.examDates.jeeAdvanced);

  // Today's goals
  const todayStr = new Date().toISOString().split('T')[0];
  const todayGoals = goals.filter(g => g.date === todayStr);
  const completedToday = todayGoals.filter(g => g.completed).length;
  const totalMinutes = todayGoals.reduce((acc, curr) => acc + curr.estimatedMinutes, 0);
  const completedMinutes = todayGoals.filter(g => g.completed).reduce((acc, curr) => acc + curr.estimatedMinutes, 0);

  // Syllabus stats
  const totalChapters = syllabus.length;
  const completedChapters = syllabus.filter(ch => ch.status === 'Completed').length;
  const inProgressChapters = syllabus.filter(ch => ch.status === 'In Progress').length;
  const overallSyllabusPercent = Math.round((completedChapters / totalChapters) * 100);

  const phyChaps = syllabus.filter(c => c.subject === 'Physics');
  const chemChaps = syllabus.filter(c => c.subject === 'Chemistry');
  const mathChaps = syllabus.filter(c => c.subject === 'Mathematics');

  const phyPercent = Math.round((phyChaps.filter(c => c.status === 'Completed').length / phyChaps.length) * 100);
  const chemPercent = Math.round((chemChaps.filter(c => c.status === 'Completed').length / chemChaps.length) * 100);
  const mathPercent = Math.round((mathChaps.filter(c => c.status === 'Completed').length / mathChaps.length) * 100);

  // Latest test
  const latestTest = tests.length > 0 ? tests[tests.length - 1] : null;

  // Active high priority backlogs
  const activeBacklogs = backlogs.filter(b => b.status !== 'Cleared');
  const highPriorityBacklogs = activeBacklogs.filter(b => b.priority === 'High');

  // Prepare chart data
  const chartData = tests.map((t, idx) => ({
    name: `Test ${idx + 1}`,
    fullName: t.testName,
    date: t.date,
    Physics: t.physics.marks,
    Chemistry: t.chemistry.marks,
    Mathematics: t.maths.marks,
    Total: t.totalMarks,
    Target: settings.targetScore
  }));

  return (
    <div className="space-y-6">
      {/* Welcome & Motivational Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-900/40 p-6 md:p-8">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Targeting IIT / Top NIT JEE {settings.targetYear}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Keep Grinding, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">{settings.studentName || 'JEE Aspirant'}</span>!
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              "Success is the sum of small efforts, repeated day in and day out." Every solved PYQ and cleared concept counts toward your dream rank.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={openAddGoalModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition shadow-lg shadow-indigo-600/30"
            >
              <Plus className="w-4 h-4" />
              <span>Add Goal</span>
            </button>
            <button
              onClick={openAddTestModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-sm transition"
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Log Mock Test</span>
            </button>
            <button
              onClick={openAddBacklogModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-sm transition"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Add Backlog</span>
            </button>
          </div>
        </div>
      </div>

      {/* Countdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* JEE Main Session 1 */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 relative overflow-hidden group hover:border-blue-500/40 transition">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold text-blue-400 uppercase tracking-wider">JEE Main • Session 1</span>
            <Calendar className="w-4 h-4 text-slate-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl md:text-4xl font-extrabold text-white font-mono">
              {daysMain1 > 0 ? daysMain1 : '0'}
            </span>
            <span className="text-xs text-slate-400">days left</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span>Date: {formatDate(settings.examDates.jeeMainSession1)}</span>
            <span className="text-emerald-400 font-medium">Target: {settings.targetScore}+</span>
          </div>
          <div className="w-full bg-slate-800 h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${Math.min(100, Math.max(10, 100 - (daysMain1 / 300) * 100))}%` }}></div>
          </div>
        </div>

        {/* JEE Main Session 2 */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 relative overflow-hidden group hover:border-emerald-500/40 transition">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold text-emerald-400 uppercase tracking-wider">JEE Main • Session 2</span>
            <Calendar className="w-4 h-4 text-slate-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl md:text-4xl font-extrabold text-white font-mono">
              {daysMain2 > 0 ? daysMain2 : '0'}
            </span>
            <span className="text-xs text-slate-400">days left</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span>Date: {formatDate(settings.examDates.jeeMainSession2)}</span>
            <span className="text-emerald-400 font-medium">Final Main Rank</span>
          </div>
          <div className="w-full bg-slate-800 h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.min(100, Math.max(10, 100 - (daysMain2 / 365) * 100))}%` }}></div>
          </div>
        </div>

        {/* JEE Advanced */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 relative overflow-hidden group hover:border-purple-500/40 transition">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold text-purple-400 uppercase tracking-wider">JEE Advanced</span>
            <Award className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl md:text-4xl font-extrabold text-white font-mono">
              {daysAdv > 0 ? daysAdv : '0'}
            </span>
            <span className="text-xs text-slate-400">days left</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span>Date: {formatDate(settings.examDates.jeeAdvanced)}</span>
            <span className="text-purple-400 font-medium">IIT Gateway</span>
          </div>
          <div className="w-full bg-slate-800 h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-purple-500 h-full rounded-full" style={{ width: `${Math.min(100, Math.max(10, 100 - (daysAdv / 400) * 100))}%` }}></div>
          </div>
        </div>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Today's Goals KPI */}
        <div 
          onClick={() => setActiveTab('goals')}
          className="bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 rounded-xl p-5 cursor-pointer transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">Today's Goals</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white font-mono">{completedToday} / {todayGoals.length}</span>
            <span className="text-xs text-slate-400">completed</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span>{Math.round(completedMinutes / 60 * 10) / 10}h / {Math.round(totalMinutes / 60 * 10) / 10}h planned</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-indigo-500 h-full rounded-full transition-all" 
              style={{ width: `${todayGoals.length > 0 ? (completedToday / todayGoals.length) * 100 : 0}%` }}
            ></div>
          </div>
        </div>

        {/* Mock Test Score KPI */}
        <div 
          onClick={() => setActiveTab('tests')}
          className="bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 rounded-xl p-5 cursor-pointer transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">Latest Mock Score</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white font-mono">
              {latestTest ? `${latestTest.totalMarks} / 300` : 'N/A'}
            </span>
            {latestTest && (
              <span className="text-xs font-semibold text-emerald-400">
                {latestTest.accuracy}% acc
              </span>
            )}
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span>Target: {settings.targetScore}</span>
            {latestTest && latestTest.percentile && (
              <span className="text-cyan-400 font-medium">{latestTest.percentile}%ile</span>
            )}
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all" 
              style={{ width: `${latestTest ? Math.min(100, (latestTest.totalMarks / settings.targetScore) * 100) : 0}%` }}
            ></div>
          </div>
        </div>

        {/* Syllabus Completion KPI */}
        <div 
          onClick={() => setActiveTab('syllabus')}
          className="bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 rounded-xl p-5 cursor-pointer transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">Syllabus Covered</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white font-mono">{overallSyllabusPercent}%</span>
            <span className="text-xs text-slate-400">{completedChapters}/{totalChapters} chaps</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center gap-2">
            <span className="text-blue-400 font-medium">P:{phyPercent}%</span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">C:{chemPercent}%</span>
            <span>•</span>
            <span className="text-amber-400 font-medium">M:{mathPercent}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-cyan-500 h-full rounded-full transition-all" 
              style={{ width: `${overallSyllabusPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Backlogs KPI */}
        <div 
          onClick={() => setActiveTab('backlogs')}
          className="bg-slate-900/60 border border-slate-800/80 hover:border-rose-500/40 rounded-xl p-5 cursor-pointer transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">Active Backlogs</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white font-mono">{activeBacklogs.length}</span>
            <span className="text-xs text-slate-400">topics pending</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span className="text-rose-400 font-medium">{highPriorityBacklogs.length} High Priority</span>
            <span>{activeBacklogs.reduce((a, b) => a + b.estimatedHours, 0)}h needed</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-rose-500 h-full rounded-full transition-all" 
              style={{ width: `${Math.min(100, (activeBacklogs.length / 10) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Goals & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Today's Daily Goals Preview */}
        <div className="lg:col-span-1 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-white text-base">Today's Goals</h3>
              </div>
              <button
                onClick={() => setActiveTab('goals')}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5"
              >
                <span>View all</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {todayGoals.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                <p>No goals set for today yet.</p>
                <button
                  onClick={openAddGoalModal}
                  className="mt-3 px-3 py-1.5 rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs hover:bg-indigo-600/50"
                >
                  Set Daily Target
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {todayGoals.slice(0, 5).map((goal) => {
                  const colors = getSubjectColor(goal.subject);
                  return (
                    <div
                      key={goal.id}
                      className={`p-3 rounded-xl border transition flex items-start gap-3 ${
                        goal.completed
                          ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                          : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={goal.completed}
                        onChange={() => toggleGoal(goal.id)}
                        className="mt-1 h-4 w-4 rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0 cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${colors.bg} ${colors.text} ${colors.border}`}>
                            {goal.subject}
                          </span>
                          <span className="text-[10px] text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded">
                            {goal.type}
                          </span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 ml-auto">
                            <Clock className="w-3 h-3" />
                            {goal.estimatedMinutes}m
                          </span>
                        </div>
                        <p className={`text-xs font-medium truncate ${goal.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                          {goal.title}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">
              {completedToday} of {todayGoals.length} tasks completed
            </span>
            <button
              onClick={openAddGoalModal}
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add task</span>
            </button>
          </div>
        </div>

        {/* Right Column: Performance Trend Chart */}
        <div className="lg:col-span-2 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">Mock Test Performance Trend</h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Subject marks and total score progression towards your target ({settings.targetScore})
              </p>
            </div>
            <button
              onClick={() => setActiveTab('tests')}
              className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-0.5 self-start sm:self-auto"
            >
              <span>Detailed Analysis</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Line Chart */}
          <div className="h-64 w-full">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                  <YAxis domain={[0, 300]} stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                    labelStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                  />
                  <Line type="monotone" dataKey="Total" stroke="#818cf8" strokeWidth={3} dot={{ r: 4, fill: '#818cf8' }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="Physics" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Chemistry" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Mathematics" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Target" stroke="#f43f5e" strokeDasharray="5 5" strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500 text-xs">
                Log at least one test to visualize your score progression.
              </div>
            )}
          </div>

          {/* Chart Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-3 pt-3 border-t border-slate-800 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span> Total Score</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Physics</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Chemistry</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Mathematics</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-1 border-t-2 border-dashed border-rose-500"></span> Target ({settings.targetScore})</span>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Backlogs Alert & Syllabus Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Backlogs Spotlight */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <h3 className="font-bold text-white text-base">Urgent Backlogs</h3>
            </div>
            <button
              onClick={() => setActiveTab('backlogs')}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-0.5"
            >
              <span>Manage all ({activeBacklogs.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {activeBacklogs.length === 0 ? (
            <div className="p-6 text-center text-slate-400 text-xs">
              <span className="text-emerald-400 font-semibold block mb-1">🎉 Clean Slate!</span>
              No active backlogs. Keep staying ahead of your coaching schedule!
            </div>
          ) : (
            <div className="space-y-3">
              {activeBacklogs.slice(0, 3).map((item) => {
                const colors = getSubjectColor(item.subject);
                const daysRemaining = getDaysRemaining(item.targetClearanceDate);
                return (
                  <div key={item.id} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${colors.bg} ${colors.text} ${colors.border}`}>
                          {item.subject}
                        </span>
                        <span className="font-bold text-xs text-white">
                          {item.chapterName}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-1">
                        {item.missingDescription}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border block mb-1 ${
                        daysRemaining <= 3 ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}>
                        {daysRemaining > 0 ? `${daysRemaining}d left` : 'Due today'}
                      </span>
                      <span className="text-[10px] text-slate-500">{item.estimatedHours}h est.</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Syllabus Subject Breakdown */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-white text-base">Subject Syllabus Mastery</h3>
            </div>
            <button
              onClick={() => setActiveTab('syllabus')}
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5"
            >
              <span>Full syllabus</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Physics */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-blue-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span> Physics
                </span>
                <span className="font-mono text-slate-300">
                  {phyChaps.filter(c => c.status === 'Completed').length} / {phyChaps.length} chaps ({phyPercent}%)
                </span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div className="bg-blue-500 h-full rounded-full transition-all" style={{ width: `${phyPercent}%` }}></div>
              </div>
            </div>

            {/* Chemistry */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Chemistry
                </span>
                <span className="font-mono text-slate-300">
                  {chemChaps.filter(c => c.status === 'Completed').length} / {chemChaps.length} chaps ({chemPercent}%)
                </span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${chemPercent}%` }}></div>
              </div>
            </div>

            {/* Mathematics */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-amber-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span> Mathematics
                </span>
                <span className="font-mono text-slate-300">
                  {mathChaps.filter(c => c.status === 'Completed').length} / {mathChaps.length} chaps ({mathPercent}%)
                </span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div className="bg-amber-500 h-full rounded-full transition-all" style={{ width: `${mathPercent}%` }}></div>
              </div>
            </div>
          </div>

          <div className="mt-5 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 flex items-center justify-between">
            <span>Overall JEE PCM Completion</span>
            <span className="font-bold text-white font-mono">{overallSyllabusPercent}% Done</span>
          </div>
        </div>
      </div>
    </div>
  );
};
