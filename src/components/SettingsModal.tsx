import React, { useState } from 'react';
import { X, Settings as SettingsIcon, Save } from 'lucide-react';
import { useJEE } from '../context/JEEContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useJEE();

  const [studentName, setStudentName] = useState(settings.studentName || '');
  const [targetYear, setTargetYear] = useState(settings.targetYear || 2027);
  const [targetScore, setTargetScore] = useState(settings.targetScore || 230);
  const [dailyGoalHours, setDailyGoalHours] = useState(settings.dailyGoalHours || 10);
  
  const [jeeMain1, setJeeMain1] = useState(settings.examDates.jeeMainSession1);
  const [jeeMain2, setJeeMain2] = useState(settings.examDates.jeeMainSession2);
  const [jeeAdv, setJeeAdv] = useState(settings.examDates.jeeAdvanced);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      studentName: studentName.trim(),
      targetYear: Number(targetYear),
      targetScore: Number(targetScore),
      dailyGoalHours: Number(dailyGoalHours),
      examDates: {
        jeeMainSession1: jeeMain1,
        jeeMainSession2: jeeMain2,
        jeeAdvanced: jeeAdv
      }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-base">JEE Aspirant Target Settings</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Your Name</label>
              <input
                type="text"
                placeholder="Future IITian"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Target JEE Year</label>
              <input
                type="number"
                min="2025"
                max="2030"
                value={targetYear}
                onChange={(e) => setTargetYear(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Target Mock Score (/300)</label>
              <input
                type="number"
                min="100"
                max="300"
                step="5"
                value={targetScore}
                onChange={(e) => setTargetScore(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Daily Study Target (Hours)</label>
              <input
                type="number"
                min="1"
                max="18"
                value={dailyGoalHours}
                onChange={(e) => setDailyGoalHours(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Exam Date Countdowns
            </span>

            <div>
              <label className="text-[11px] text-blue-400 block mb-1">JEE Main Session 1 Date</label>
              <input
                type="date"
                value={jeeMain1}
                onChange={(e) => setJeeMain1(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[11px] text-emerald-400 block mb-1">JEE Main Session 2 Date</label>
              <input
                type="date"
                value={jeeMain2}
                onChange={(e) => setJeeMain2(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[11px] text-purple-400 block mb-1">JEE Advanced Exam Date</label>
              <input
                type="date"
                value={jeeAdv}
                onChange={(e) => setJeeAdv(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
            </div>
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
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-lg shadow-indigo-600/30"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
