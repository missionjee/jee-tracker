import React, { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { useJEE } from '../context/JEEContext';
import { Priority } from '../types';

interface AddBacklogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddBacklogModal: React.FC<AddBacklogModalProps> = ({ isOpen, onClose }) => {
  const { addBacklog } = useJEE();

  const [chapterName, setChapterName] = useState('');
  const [subject, setSubject] = useState<'Physics' | 'Chemistry' | 'Mathematics'>('Physics');
  const [missingDescription, setMissingDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('High');
  const [estimatedHours, setEstimatedHours] = useState(6);
  const [targetClearanceDate, setTargetClearanceDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chapterName.trim() || !missingDescription.trim()) return;

    addBacklog({
      chapterName: chapterName.trim(),
      subject,
      missingDescription: missingDescription.trim(),
      priority,
      estimatedHours: Number(estimatedHours),
      targetClearanceDate,
      status: 'Active',
      notes: notes.trim() ? notes.trim() : undefined
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <h3 className="font-bold text-white text-base">Add Backlog Topic</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Chapter Name *</label>
            <input
              type="text"
              required
              placeholder="e.g., Rotational Motion / Ionic Equilibrium"
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="High">High (High Weightage)</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">What Exactly Is Missed? *</label>
            <textarea
              required
              rows={2}
              placeholder="e.g., Missed 4 lectures on angular momentum & Allen sheet Exercise 2 unsolved"
              value={missingDescription}
              onChange={(e) => setMissingDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Estimated Hours</label>
              <input
                type="number"
                min="1"
                max="50"
                value={estimatedHours}
                onChange={(e) => setEstimatedHours(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Target Clearance Date</label>
              <input
                type="date"
                value={targetClearanceDate}
                onChange={(e) => setTargetClearanceDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Action Plan / Resource Links (Optional)</label>
            <input
              type="text"
              placeholder="e.g., Watch Mohit Tyagi ABJ Sir lectures + solve 40 PYQs"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
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
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white transition shadow-lg shadow-rose-600/30"
            >
              Add Backlog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
