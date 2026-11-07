import React, { useState } from 'react';
import { 
  Award, 
  Plus, 
  TrendingUp, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  Clock,
  Target
} from 'lucide-react';
import { useJEE } from '../context/JEEContext';
import { formatDate } from '../utils/helpers';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

interface TestPerformanceProps {
  openAddModal: () => void;
}

export const TestPerformance: React.FC<TestPerformanceProps> = ({ openAddModal }) => {
  const { tests, deleteTest, settings } = useJEE();
  const [expandedTestId, setExpandedTestId] = useState<string | null>(null);

  // Overall Statistics
  const totalTests = tests.length;
  const highestScore = totalTests > 0 ? Math.max(...tests.map(t => t.totalMarks)) : 0;
  const averageScore = totalTests > 0 ? Math.round(tests.reduce((acc, t) => acc + t.totalMarks, 0) / totalTests) : 0;
  const averageAccuracy = totalTests > 0 ? (tests.reduce((acc, t) => acc + t.accuracy, 0) / totalTests).toFixed(1) : '0';

  // Average Subject Scores
  const avgPhy = totalTests > 0 ? Math.round(tests.reduce((acc, t) => acc + t.physics.marks, 0) / totalTests) : 0;
  const avgChem = totalTests > 0 ? Math.round(tests.reduce((acc, t) => acc + t.chemistry.marks, 0) / totalTests) : 0;
  const avgMath = totalTests > 0 ? Math.round(tests.reduce((acc, t) => acc + t.maths.marks, 0) / totalTests) : 0;

  // Chart Data: Score progression
  const scoreTrendData = tests.map((t, idx) => ({
    name: `Test ${idx + 1}`,
    testName: t.testName,
    date: t.date,
    Physics: t.physics.marks,
    Chemistry: t.chemistry.marks,
    Mathematics: t.maths.marks,
    Total: t.totalMarks,
    Target: settings.targetScore,
    Accuracy: t.accuracy
  }));

  // Aggregated Mistakes
  const mistakeCounts = tests.reduce(
    (acc, t) => {
      acc.silly += t.mistakes.silly || 0;
      acc.calculation += t.mistakes.calculationError || 0;
      acc.concept += t.mistakes.conceptGap || 0;
      acc.time += t.mistakes.timeCrunch || 0;
      acc.guess += t.mistakes.guessedWrong || 0;
      return acc;
    },
    { silly: 0, calculation: 0, concept: 0, time: 0, guess: 0 }
  );

  const mistakePieData = [
    { name: 'Silly Mistakes', value: mistakeCounts.silly, color: '#f87171' },
    { name: 'Calculation Error', value: mistakeCounts.calculation, color: '#fb923c' },
    { name: 'Concept Gap', value: mistakeCounts.concept, color: '#60a5fa' },
    { name: 'Time Crunch', value: mistakeCounts.time, color: '#a78bfa' },
    { name: 'Wrong Guess', value: mistakeCounts.guess, color: '#94a3b8' }
  ].filter(d => d.value > 0);

  const toggleExpand = (id: string) => {
    setExpandedTestId(expandedTestId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-emerald-400" />
            <h1 className="text-xl md:text-2xl font-bold text-white">Mock Test Performance & Mistakes Tracker</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            "Mock tests don't define your intelligence; they expose your blind spots." Analyze every mistake to gain +20 marks in your next test!
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm transition shadow-lg shadow-indigo-600/30 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Log Test Marks</span>
        </button>
      </div>

      {/* KPI Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Total Tests */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <span className="text-xs font-semibold text-slate-400 uppercase">Tests Logged</span>
          <div className="text-2xl font-extrabold text-white font-mono mt-1">{totalTests}</div>
          <span className="text-[11px] text-slate-500">Mains & Part tests</span>
        </div>

        {/* Highest Score */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <span className="text-xs font-semibold text-slate-400 uppercase">Highest Score</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">{highestScore} <span className="text-xs text-slate-500 font-normal">/ 300</span></div>
          <span className="text-[11px] text-emerald-500/80">Personal Best</span>
        </div>

        {/* Average Score */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <span className="text-xs font-semibold text-slate-400 uppercase">Average Score</span>
          <div className="text-2xl font-extrabold text-indigo-400 font-mono mt-1">{averageScore} <span className="text-xs text-slate-500 font-normal">/ 300</span></div>
          <span className="text-[11px] text-slate-500">Target: {settings.targetScore}</span>
        </div>

        {/* Overall Accuracy */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <span className="text-xs font-semibold text-slate-400 uppercase">Average Accuracy</span>
          <div className="text-2xl font-extrabold text-cyan-400 font-mono mt-1">{averageAccuracy}%</div>
          <span className="text-[11px] text-slate-500">Aim for &gt;85%</span>
        </div>
      </div>

      {/* Subject Averages Quick Pill */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
          <span className="text-xs text-blue-400 block font-medium">Physics Average</span>
          <span className="text-xl font-bold text-white font-mono">{avgPhy} / 100</span>
        </div>
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
          <span className="text-xs text-emerald-400 block font-medium">Chemistry Average</span>
          <span className="text-xl font-bold text-white font-mono">{avgChem} / 100</span>
        </div>
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
          <span className="text-xs text-amber-400 block font-medium">Mathematics Average</span>
          <span className="text-xl font-bold text-white font-mono">{avgMath} / 100</span>
        </div>
      </div>

      {/* Charts Row: Score Progression & Mistakes Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Progression Line Chart */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Score Progression & Accuracy
              </h3>
              <p className="text-xs text-slate-400">Total marks vs Target score ({settings.targetScore})</p>
            </div>
          </div>

          <div className="h-72 w-full">
            {scoreTrendData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={scoreTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                  <YAxis domain={[0, 300]} stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                    labelStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="Total" stroke="#818cf8" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="Physics" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Chemistry" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Mathematics" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Target" stroke="#f43f5e" strokeDasharray="5 5" strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500 text-xs">
                No tests logged yet. Click "Log Test Marks" above to begin.
              </div>
            )}
          </div>
        </div>

        {/* Mistakes Distribution Breakdown */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-white text-base flex items-center gap-2 mb-1">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              Mistake Analysis (Root Causes)
            </h3>
            <p className="text-xs text-slate-400">Total negative marks lost across tests</p>

            <div className="h-48 w-full mt-2">
              {mistakePieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mistakePieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {mistakePieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '10px', fontSize: '11px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500 text-xs">
                  No mistake data recorded.
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1.5 pt-3 border-t border-slate-800 text-xs">
            {mistakePieData.map((m, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }}></span>
                  {m.name}
                </span>
                <span className="font-mono font-bold text-white">{m.value} Qs</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Test Log History Table / Cards */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white text-base">Test Records History</h3>
          <span className="text-xs text-slate-400 font-mono">{tests.length} tests completed</span>
        </div>

        {tests.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            No mock tests logged yet.
          </div>
        ) : (
          <div className="space-y-3">
            {[...tests].reverse().map((test) => {
              const isExpanded = expandedTestId === test.id;
              return (
                <div
                  key={test.id}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden transition"
                >
                  {/* Summary Bar */}
                  <div
                    onClick={() => toggleExpand(test.id)}
                    className="p-4 cursor-pointer hover:bg-slate-900/60 transition flex flex-col md:flex-row md:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-white">{test.testName}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                          {test.testType}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(test.date)}
                        </span>
                      </div>

                      {/* Subject Marks Badges */}
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-blue-400 font-mono font-medium">P: {test.physics.marks}/100</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-emerald-400 font-mono font-medium">C: {test.chemistry.marks}/100</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-amber-400 font-mono font-medium">M: {test.maths.marks}/100</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end md:self-auto">
                      <div className="text-right">
                        <div className="text-lg font-bold text-white font-mono">
                          {test.totalMarks} <span className="text-xs text-slate-500 font-normal">/ {test.maxTotalMarks}</span>
                        </div>
                        <div className="text-[11px] text-emerald-400 font-semibold font-mono">
                          {test.accuracy}% accuracy
                        </div>
                      </div>

                      {test.percentile && (
                        <div className="hidden sm:block text-right border-l border-slate-800 pl-3">
                          <div className="text-xs font-semibold text-cyan-400">{test.percentile}%ile</div>
                          <div className="text-[10px] text-slate-500">Rank: #{test.rank || 'N/A'}</div>
                        </div>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTest(test.id);
                        }}
                        className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg transition"
                        title="Delete test"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="text-slate-400">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detailed Analysis */}
                  {isExpanded && (
                    <div className="p-4 bg-slate-900/90 border-t border-slate-800 space-y-4">
                      {/* Detailed Subject Stats */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20 text-xs">
                          <span className="font-bold text-blue-400 block mb-1">Physics Breakdown</span>
                          <div className="flex justify-between text-slate-300">
                            <span>Score:</span>
                            <span className="font-mono font-bold text-white">{test.physics.marks} / {test.physics.maxMarks}</span>
                          </div>
                          <div className="flex justify-between text-slate-400 text-[11px] mt-1">
                            <span className="text-emerald-400">✓ {test.physics.correct} Correct</span>
                            <span className="text-rose-400">✗ {test.physics.incorrect} Wrong</span>
                            <span>– {test.physics.unattempted} Unattempted</span>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-xs">
                          <span className="font-bold text-emerald-400 block mb-1">Chemistry Breakdown</span>
                          <div className="flex justify-between text-slate-300">
                            <span>Score:</span>
                            <span className="font-mono font-bold text-white">{test.chemistry.marks} / {test.chemistry.maxMarks}</span>
                          </div>
                          <div className="flex justify-between text-slate-400 text-[11px] mt-1">
                            <span className="text-emerald-400">✓ {test.chemistry.correct} Correct</span>
                            <span className="text-rose-400">✗ {test.chemistry.incorrect} Wrong</span>
                            <span>– {test.chemistry.unattempted} Unattempted</span>
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs">
                          <span className="font-bold text-amber-400 block mb-1">Mathematics Breakdown</span>
                          <div className="flex justify-between text-slate-300">
                            <span>Score:</span>
                            <span className="font-mono font-bold text-white">{test.maths.marks} / {test.maths.maxMarks}</span>
                          </div>
                          <div className="flex justify-between text-slate-400 text-[11px] mt-1">
                            <span className="text-emerald-400">✓ {test.maths.correct} Correct</span>
                            <span className="text-rose-400">✗ {test.maths.incorrect} Wrong</span>
                            <span>– {test.maths.unattempted} Unattempted</span>
                          </div>
                        </div>
                      </div>

                      {/* Mistakes Count Bar */}
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex flex-wrap items-center justify-between gap-3">
                        <span className="text-slate-400 font-semibold">Mistakes Classification:</span>
                        <span className="text-rose-400">Silly: <strong>{test.mistakes.silly}</strong></span>
                        <span className="text-amber-400">Calculation: <strong>{test.mistakes.calculationError}</strong></span>
                        <span className="text-blue-400">Concept Gap: <strong>{test.mistakes.conceptGap}</strong></span>
                        <span className="text-purple-400">Time Crunch: <strong>{test.mistakes.timeCrunch}</strong></span>
                        <span className="text-slate-400">Guessed: <strong>{test.mistakes.guessedWrong}</strong></span>
                      </div>

                      {/* Key Takeaways & Weak Topics */}
                      <div className="space-y-2 text-xs">
                        {test.notes && (
                          <p className="text-slate-300">
                            <strong className="text-slate-400">Test Notes:</strong> {test.notes}
                          </p>
                        )}
                        {test.keyTakeaways && (
                          <p className="text-emerald-300 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20">
                            <strong>Key Learnings for Next Mock:</strong> {test.keyTakeaways}
                          </p>
                        )}
                        {test.weakTopics && test.weakTopics.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            <span className="text-slate-400">Weak Topics Identified:</span>
                            {test.weakTopics.map((topic, i) => (
                              <span key={i} className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[10px]">
                                {topic}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
