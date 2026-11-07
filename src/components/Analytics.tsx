import React from 'react';
import { 
  PieChart as PieIcon, 
  TrendingUp, 
  Award, 
  AlertTriangle, 
  CheckCircle, 
  Zap, 
  Printer, 
  Flame, 
  BookOpen,
  Target
} from 'lucide-react';
import { useJEE } from '../context/JEEContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export const Analytics: React.FC = () => {
  const { settings, tests, syllabus, backlogs, goals } = useJEE();

  // Syllabus metrics
  const totalChapters = syllabus.length;
  const completedChapters = syllabus.filter(c => c.status === 'Completed').length;
  const syllabusPercent = Math.round((completedChapters / totalChapters) * 100);

  const phyChaps = syllabus.filter(c => c.subject === 'Physics');
  const chemChaps = syllabus.filter(c => c.subject === 'Chemistry');
  const mathChaps = syllabus.filter(c => c.subject === 'Mathematics');

  const phyDone = phyChaps.filter(c => c.status === 'Completed').length;
  const chemDone = chemChaps.filter(c => c.status === 'Completed').length;
  const mathDone = mathChaps.filter(c => c.status === 'Completed').length;

  // Test metrics
  const totalTests = tests.length;
  const avgScore = totalTests > 0 ? Math.round(tests.reduce((acc, t) => acc + t.totalMarks, 0) / totalTests) : 0;
  const highestScore = totalTests > 0 ? Math.max(...tests.map(t => t.totalMarks)) : 0;
  const avgAccuracy = totalTests > 0 ? Number((tests.reduce((acc, t) => acc + t.accuracy, 0) / totalTests).toFixed(1)) : 0;

  // Backlogs metric
  const activeBacklogs = backlogs.filter(b => b.status !== 'Cleared').length;
  const clearedBacklogs = backlogs.filter(b => b.status === 'Cleared').length;
  const totalBacklogs = backlogs.length;
  const backlogClearanceRate = totalBacklogs > 0 ? Math.round((clearedBacklogs / totalBacklogs) * 100) : 100;

  // JEE Readiness Score calculation (0 - 100 scale)
  // 40% syllabus completion, 40% test performance ratio (avgScore / targetScore), 20% backlog health
  const testScoreRatio = Math.min(1, avgScore / (settings.targetScore || 230));
  const backlogHealth = Math.max(0, 1 - (activeBacklogs / 15));
  const readinessScore = Math.round(
    (syllabusPercent * 0.40) +
    (testScoreRatio * 100 * 0.40) +
    (backlogHealth * 100 * 0.20)
  );

  // High weightage audit
  const highWeightageChaps = syllabus.filter(c => c.weightage === 'High');
  const highWeightageCompleted = highWeightageChaps.filter(c => c.status === 'Completed').length;
  const highWeightageNeedingWork = highWeightageChaps.filter(c => c.status !== 'Completed' || c.confidence === 'Low');

  // Potential Marks calculation if silly mistakes are eliminated
  const totalSillyMistakes = tests.reduce((acc, t) => acc + (t.mistakes.silly || 0), 0);
  const avgSillyPerTest = totalTests > 0 ? Math.round((totalSillyMistakes / totalTests) * 10) / 10 : 0;
  const potentialMarksGain = Math.round(avgSillyPerTest * 5); // +4 for question + 1 negative mark saved = 5 marks per question!

  // Subject Comparison Chart Data
  const subjectComparisonData = [
    {
      subject: 'Physics',
      avgMarks: totalTests > 0 ? Math.round(tests.reduce((acc, t) => acc + t.physics.marks, 0) / totalTests) : 0,
      syllabusDone: Math.round((phyDone / phyChaps.length) * 100),
      chapters: `${phyDone}/${phyChaps.length}`
    },
    {
      subject: 'Chemistry',
      avgMarks: totalTests > 0 ? Math.round(tests.reduce((acc, t) => acc + t.chemistry.marks, 0) / totalTests) : 0,
      syllabusDone: Math.round((chemDone / chemChaps.length) * 100),
      chapters: `${chemDone}/${chemChaps.length}`
    },
    {
      subject: 'Mathematics',
      avgMarks: totalTests > 0 ? Math.round(tests.reduce((acc, t) => acc + t.maths.marks, 0) / totalTests) : 0,
      syllabusDone: Math.round((mathDone / mathChaps.length) * 100),
      chapters: `${mathDone}/${mathChaps.length}`
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <PieIcon className="w-6 h-6 text-purple-400" />
            <h1 className="text-xl md:text-2xl font-bold text-white">JEE Advanced & Mains Readiness Analytics</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Data-driven strategic breakdown of your preparation strengths, potential marks gains, and subject balance.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition self-start sm:self-auto"
        >
          <Printer className="w-4 h-4" />
          <span>Print / PDF Report</span>
        </button>
      </div>

      {/* Top Banner: Readiness Index & Projected Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Readiness Index */}
        <div className="md:col-span-1 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 border border-indigo-500/30 rounded-2xl p-6 text-center flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider flex items-center justify-center gap-1.5 mb-2">
              <Zap className="w-4 h-4" />
              <span>Overall JEE Readiness Score</span>
            </span>
            <div className="text-6xl font-black text-white font-mono mt-3">
              {readinessScore}<span className="text-2xl text-indigo-400 font-bold">/100</span>
            </div>
            <p className="text-xs text-slate-400 mt-3 max-w-xs mx-auto">
              {readinessScore >= 80 
                ? '🔥 Outstanding readiness! You are tracking in the top 99 percentile tier.'
                : readinessScore >= 60
                ? '⚡ Strong foundation! Focus on clearing backlogs and high-weightage chapters to push above 99%ile.'
                : '🎯 In continuous progress! Consistent daily goals and PYQ solving will boost this rapidly.'}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <span className="text-[10px] text-slate-500 block">Syllabus</span>
              <span className="font-bold text-slate-300 font-mono">{syllabusPercent}%</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Avg Score</span>
              <span className="font-bold text-emerald-400 font-mono">{avgScore}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Accuracy</span>
              <span className="font-bold text-cyan-400 font-mono">{avgAccuracy}%</span>
            </div>
          </div>
        </div>

        {/* Silly Mistakes & Potential Marks Unlock */}
        <div className="md:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <span>The "Zero-Silly-Mistakes" Marks Unlock</span>
              </h3>
              <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-bold">
                +{potentialMarksGain} Marks Potential
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Your Current Average Score</span>
                <div className="text-3xl font-extrabold text-white font-mono">{avgScore} <span className="text-xs text-slate-500 font-normal">/ 300</span></div>
                <span className="text-[11px] text-slate-500 mt-1 block">With average {avgSillyPerTest} silly mistakes per test</span>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-tr from-emerald-950/40 to-slate-950 border border-emerald-500/30">
                <span className="text-xs text-emerald-400 block mb-1 font-semibold">Score with Silly Errors Fixed</span>
                <div className="text-3xl font-extrabold text-emerald-400 font-mono">{avgScore + potentialMarksGain} <span className="text-xs text-emerald-500/60 font-normal">/ 300</span></div>
                <span className="text-[11px] text-emerald-300 mt-1 block font-medium">Instantly catapults you +{potentialMarksGain} marks higher!</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-4 leading-relaxed">
              💡 <strong>Actionable Strategy:</strong> Every question you get wrong due to reading errors or careless calculation costs you 5 marks (+4 marks not earned, plus -1 negative mark). In the next mock test, allocate 5 minutes exclusively for double-checking arithmetic steps in numerical value questions.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Target Score: <strong className="text-white font-mono">{settings.targetScore}</strong></span>
            <span>Gap to Target: <strong className="text-amber-400 font-mono">{Math.max(0, settings.targetScore - avgScore)} marks</strong></span>
          </div>
        </div>
      </div>

      {/* Subject Comparison & High Weightage Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Strength Bar Chart */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
          <h3 className="font-bold text-white text-base mb-1">Subject Mastery & Average Marks</h3>
          <p className="text-xs text-slate-400 mb-4">Comparison of syllabus coverage % and average test marks out of 100</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="subject" stroke="#64748b" fontSize={12} />
                <YAxis domain={[0, 100]} stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="avgMarks" name="Avg Test Marks (/100)" fill="#6366f1" radius={[6, 6, 0, 0]} />
                <Bar dataKey="syllabusDone" name="Syllabus Done (%)" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800 text-center text-xs">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <span className="text-blue-400 block font-semibold">Physics</span>
              <span className="text-slate-300 font-mono">{phyDone}/{phyChaps.length} Chaps</span>
            </div>
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-emerald-400 block font-semibold">Chemistry</span>
              <span className="text-slate-300 font-mono">{chemDone}/{chemChaps.length} Chaps</span>
            </div>
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <span className="text-amber-400 block font-semibold">Mathematics</span>
              <span className="text-slate-300 font-mono">{mathDone}/{mathChaps.length} Chaps</span>
            </div>
          </div>
        </div>

        {/* High Weightage Chapter Focus List */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Target className="w-5 h-5 text-rose-400" />
                <span>High-Weightage Chapters Audit</span>
              </h3>
              <span className="text-xs font-mono font-semibold text-emerald-400">
                {highWeightageCompleted} / {highWeightageChaps.length} Mastered
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-3">
              These chapters have historically carried maximum weightage in JEE Main & Advanced. Prioritize these for maximum rank impact:
            </p>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {highWeightageNeedingWork.slice(0, 5).map((chap) => (
                <div key={chap.id} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{chap.name}</span>
                    <span className="text-[11px] text-slate-400">{chap.subject} • Class {chap.classLevel}</span>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    chap.status === 'In Progress' 
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' 
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                  }`}>
                    {chap.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400">
            <span>Clear the remaining {highWeightageNeedingWork.length} high-weightage chapters to lock in strong percentile safety.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
