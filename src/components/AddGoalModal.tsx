import React, { useState } from 'react';
import { X, CheckSquare, Clock } from 'lucide-react';
import { useJEE } from '../context/JEEContext';
import { Subject, TaskType, Priority } from '../types';

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddGoalModal: React.FC<AddGoalModalProps> = ({ isOpen, onClose }) => {
  const { addGoal } = useJEE();

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState<Subject>('Physics');
  const [type, setType] = useState<TaskType>('PYQs/Practice');
  const [estimatedMinutes, setEstimatedMinutes] = useState(60);
  const [priority, setPriority] = useState<Priority>('High');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addGoal({
      title: title.trim(),
      subject,
      type,
      estimatedMinutes: Number(estimatedMinutes),
      priority,
      date,
      notes: notes.trim() ? notes.trim() : undefined
    });

    // Reset and close
    setTitle('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-base">Add Daily Study Target</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Target / Task Name *</label>
            <input
              type="text"
              required
              placeholder="e.g., Solve 30 PYQs of Rotation / Read NCERT Amines"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as Subject)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
                <option value="General">General / Mock</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Task Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as TaskType)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="PYQs/Practice">PYQs / Practice</option>
                <option value="Theory">Theory & Notes</option>
                <option value="Revision">Revision</option>
                <option value="DPP/Module">DPP / Module</option>
                <option value="Mock Test">Mock Test / Analysis</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Minutes</label>
              <input
                type="number"
                min="10"
                max="360"
                step="5"
                value={estimatedMinutes}
                onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
              >
              </input>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Notes / Specific Sheets (Optional)</label>
            <input
              type="text"
              placeholder="e.g., Focus on questions marked with star in Allen sheet"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-lg shadow-indigo-600/30"
            >
              Add Target
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
