import React, { useState } from 'react';
import { X, Award, AlertCircle } from 'lucide-react';
import { useJEE } from '../context/JEEContext';

interface AddTestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTestModal: React.FC<AddTestModalProps> = ({ isOpen, onClose }) => {
  const { addTest } = useJEE();

  const [testName, setTestName] = useState('');
  const [testType, setTestType] = useState<'JEE Main' | 'JEE Advanced' | 'Chapter Test' | 'Part Test'>('JEE Main');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Subject marks
  const [phyMarks, setPhyMarks] = useState(70);
  const [phyCorrect, setPhyCorrect] = useState(18);
  const [phyIncorrect, setPhyIncorrect] = useState(2);
  const [phyUnattempted, setPhyUnattempted] = useState(5);

  const [chemMarks, setChemMarks] = useState(75);
  const [chemCorrect, setChemCorrect] = useState(19);
  const [chemIncorrect, setChemIncorrect] = useState(2);
  const [chemUnattempted, setChemUnattempted] = useState(4);

  const [mathMarks, setMathMarks] = useState(60);
  const [mathCorrect, setMathCorrect] = useState(16);
  const [mathIncorrect, setMathIncorrect] = useState(3);
  const [mathUnattempted, setMathUnattempted] = useState(6);

  // Optional
  const [percentile, setPercentile] = useState<string>('');
  const [rank, setRank] = useState<string>('');

  // Mistakes
  const [silly, setSilly] = useState(2);
  const [calc, setCalc] = useState(1);
  const [concept, setConcept] = useState(2);
  const [time, setTime] = useState(1);
  const [guess, setGuess] = useState(0);

  // Takeaways
  const [notes, setNotes] = useState('');
  const [keyTakeaways, setKeyTakeaways] = useState('');
  const [weakTopicsStr, setWeakTopicsStr] = useState('');

  if (!isOpen) return null;

  const totalCalculated = Number(phyMarks) + Number(chemMarks) + Number(mathMarks);
  const totalAttempted = (Number(phyCorrect) + Number(phyIncorrect)) +
                         (Number(chemCorrect) + Number(chemIncorrect)) +
                         (Number(mathCorrect) + Number(mathIncorrect));
  const totalCorrect = Number(phyCorrect) + Number(chemCorrect) + Number(mathCorrect);
  const calculatedAccuracy = totalAttempted > 0 ? ((totalCorrect / totalAttempted) * 100).toFixed(1) : '0';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testName.trim()) return;

    addTest({
      testName: testName.trim(),
      testType,
      date,
      physics: {
        marks: Number(phyMarks),
        maxMarks: 100,
        correct: Number(phyCorrect),
        incorrect: Number(phyIncorrect),
        unattempted: Number(phyUnattempted)
      },
      chemistry: {
        marks: Number(chemMarks),
        maxMarks: 100,
        correct: Number(chemCorrect),
        incorrect: Number(chemIncorrect),
        unattempted: Number(chemUnattempted)
      },
      maths: {
        marks: Number(mathMarks),
        maxMarks: 100,
        correct: Number(mathCorrect),
        incorrect: Number(mathIncorrect),
        unattempted: Number(mathUnattempted)
      },
      maxTotalMarks: 300,
      percentile: percentile ? Number(percentile) : undefined,
      rank: rank ? Number(rank) : undefined,
      mistakes: {
        silly: Number(silly),
        calculationError: Number(calc),
        conceptGap: Number(concept),
        timeCrunch: Number(time),
        guessedWrong: Number(guess)
      },
      notes: notes.trim() ? notes.trim() : undefined,
      keyTakeaways: keyTakeaways.trim() ? keyTakeaways.trim() : undefined,
      weakTopics: weakTopicsStr.trim() ? weakTopicsStr.split(',').map(s => s.trim()).filter(Boolean) : undefined
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-base">Log JEE Mock Test & Mistakes</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Real-time score calculator preview banner */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-950/80 via-slate-950 to-slate-950 border border-indigo-500/30 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400">Total Score:</span>
              <div className="text-2xl font-black text-white font-mono">
                {totalCalculated} <span className="text-xs text-slate-400 font-normal">/ 300</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Estimated Accuracy:</span>
              <div className="text-lg font-bold text-emerald-400 font-mono">
                {calculatedAccuracy}%
              </div>
            </div>
          </div>

          {/* Test Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-1">
              <label className="text-xs font-semibold text-slate-300 block mb-1">Test Name *</label>
              <input
                type="text"
                required
                placeholder="e.g., AITS 3 / MathonGo Mock"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Test Pattern</label>
              <select
                value={testType}
                onChange={(e) => setTestType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="JEE Main">JEE Main (300 Marks)</option>
                <option value="JEE Advanced">JEE Advanced</option>
                <option value="Part Test">Part Test</option>
                <option value="Chapter Test">Chapter Test</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Subject Breakdown Inputs */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Subject Score & Question Breakdown (/100 each)
            </span>

            {/* Physics */}
            <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/20 grid grid-cols-4 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-blue-400 block mb-1">Physics Marks</label>
                <input
                  type="number"
                  value={phyMarks}
                  onChange={(e) => setPhyMarks(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] text-emerald-400 block mb-1">Correct Qs</label>
                <input
                  type="number"
                  value={phyCorrect}
                  onChange={(e) => setPhyCorrect(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] text-rose-400 block mb-1">Incorrect Qs</label>
                <input
                  type="number"
                  value={phyIncorrect}
                  onChange={(e) => setPhyIncorrect(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Unattempted</label>
                <input
                  type="number"
                  value={phyUnattempted}
                  onChange={(e) => setPhyUnattempted(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white font-mono"
                />
              </div>
            </div>

            {/* Chemistry */}
            <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 grid grid-cols-4 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-emerald-400 block mb-1">Chemistry Marks</label>
                <input
                  type="number"
                  value={chemMarks}
                  onChange={(e) => setChemMarks(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] text-emerald-400 block mb-1">Correct Qs</label>
                <input
                  type="number"
                  value={chemCorrect}
                  onChange={(e) => setChemCorrect(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] text-rose-400 block mb-1">Incorrect Qs</label>
                <input
                  type="number"
                  value={chemIncorrect}
                  onChange={(e) => setChemIncorrect(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Unattempted</label>
                <input
                  type="number"
                  value={chemUnattempted}
                  onChange={(e) => setChemUnattempted(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white font-mono"
                />
              </div>
            </div>

            {/* Mathematics */}
            <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 grid grid-cols-4 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-amber-400 block mb-1">Maths Marks</label>
                <input
                  type="number"
                  value={mathMarks}
                  onChange={(e) => setMathMarks(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] text-emerald-400 block mb-1">Correct Qs</label>
                <input
                  type="number"
                  value={mathCorrect}
                  onChange={(e) => setMathCorrect(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] text-rose-400 block mb-1">Incorrect Qs</label>
                <input
                  type="number"
                  value={mathIncorrect}
                  onChange={(e) => setMathIncorrect(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Unattempted</label>
                <input
                  type="number"
                  value={mathUnattempted}
                  onChange={(e) => setMathUnattempted(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white font-mono"
                />
              </div>
            </div>
          </div>

          {/* Mistake Classification */}
          <div>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              Mistake Root-Cause Count (Why did you lose marks?)
            </span>
            <div className="grid grid-cols-5 gap-2">
              <div>
                <label className="text-[10px] text-rose-400 block mb-1 font-medium">Silly Mistakes</label>
                <input
                  type="number"
                  min="0"
                  value={silly}
                  onChange={(e) => setSilly(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-xs text-white font-mono text-center"
                />
              </div>
              <div>
                <label className="text-[10px] text-amber-400 block mb-1 font-medium">Calculation</label>
                <input
                  type="number"
                  min="0"
                  value={calc}
                  onChange={(e) => setCalc(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-xs text-white font-mono text-center"
                />
              </div>
              <div>
                <label className="text-[10px] text-blue-400 block mb-1 font-medium">Concept Gap</label>
                <input
                  type="number"
                  min="0"
                  value={concept}
                  onChange={(e) => setConcept(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-xs text-white font-mono text-center"
                />
              </div>
              <div>
                <label className="text-[10px] text-purple-400 block mb-1 font-medium">Time Crunch</label>
                <input
                  type="number"
                  min="0"
                  value={time}
                  onChange={(e) => setTime(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-xs text-white font-mono text-center"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1 font-medium">Bad Guess</label>
                <input
                  type="number"
                  min="0"
                  value={guess}
                  onChange={(e) => setGuess(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-xs text-white font-mono text-center"
                />
              </div>
            </div>
          </div>

          {/* Percentile, Rank, Weak Topics */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Percentile (Optional)</label>
              <input
                type="number"
                step="0.01"
                placeholder="e.g., 99.25"
                value={percentile}
                onChange={(e) => setPercentile(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">All India Rank (Optional)</label>
              <input
                type="number"
                placeholder="e.g., 1420"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Weak Topics Identified (comma-separated)</label>
            <input
              type="text"
              placeholder="e.g., Rotational inertia, Ionic buffer, Definite integration"
              value={weakTopicsStr}
              onChange={(e) => setWeakTopicsStr(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Key Learnings & Action Items for Next Mock</label>
            <textarea
              rows={2}
              placeholder="e.g., Solve Chemistry in 45 mins. Leave lengthy coordinate questions for round 2."
              value={keyTakeaways}
              onChange={(e) => setKeyTakeaways(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-lg shadow-emerald-600/30"
            >
              Save Test Marks
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
