import React, { useState, useRef } from 'react';
import { 
  Target, 
  CheckSquare, 
  BarChart2, 
  BookOpen, 
  AlertCircle, 
  PieChart, 
  Settings, 
  Download, 
  Upload, 
  Flame,
  RotateCcw
} from 'lucide-react';
import { useJEE } from '../context/JEEContext';
import { getDaysRemaining } from '../utils/helpers';

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, openSettings }) => {
  const { settings, goals, exportData, importData, resetToDefault } = useJEE();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showDataMenu, setShowDataMenu] = useState(false);

  // Calculate today's streak and completed
  const todayStr = new Date().toISOString().split('T')[0];
  const todayGoals = goals.filter(g => g.date === todayStr);
  const completedToday = todayGoals.filter(g => g.completed).length;

  const daysToJeeMain1 = getDaysRemaining(settings.examDates.jeeMainSession1);
  const daysToJeeAdv = getDaysRemaining(settings.examDates.jeeAdvanced);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          const success = importData(content);
          if (success) {
            alert('Data restored successfully!');
          } else {
            alert('Failed to parse backup file. Please ensure it is a valid JSON file.');
          }
        }
      };
      reader.readAsText(file);
    }
    setShowDataMenu(false);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Target },
    { id: 'goals', label: 'Daily Goals', icon: CheckSquare, badge: todayGoals.length > 0 ? `${completedToday}/${todayGoals.length}` : undefined },
    { id: 'tests', label: 'Test Marks', icon: BarChart2 },
    { id: 'syllabus', label: 'Syllabus', icon: BookOpen },
    { id: 'backlogs', label: 'Backlogs', icon: AlertCircle },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-400 p-[2px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Target className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  JEE TRACKER
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {settings.targetYear}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <span>Target: <strong className="text-emerald-400">{settings.targetScore}+/300</strong></span>
                <span>•</span>
                <span className="text-amber-400 font-medium">
                  {daysToJeeMain1 > 0 ? `${daysToJeeMain1}d to Main 1` : 'Session 1 Active'}
                </span>
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-600/25'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-indigo-900/80 text-white' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Streak Indicator */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
              <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
              <span>Study Streak</span>
            </div>

            {/* Data backup menu */}
            <div className="relative">
              <button
                onClick={() => setShowDataMenu(!showDataMenu)}
                title="Backup / Restore Data"
                className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
              >
                <Download className="w-4 h-4" />
              </button>
              
              {showDataMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-800 shadow-xl py-2 z-50">
                  <button
                    onClick={() => {
                      exportData();
                      setShowDataMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs text-left text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    <Download className="w-4 h-4 text-indigo-400" />
                    <span>Export JSON Backup</span>
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs text-left text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span>Import JSON Backup</span>
                  </button>
                  <div className="border-t border-slate-800 my-1"></div>
                  <button
                    onClick={() => {
                      resetToDefault();
                      setShowDataMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs text-left text-rose-400 hover:bg-slate-800"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset to Demo Data</span>
                  </button>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>

            {/* Settings button */}
            <button
              onClick={openSettings}
              title="Target Settings"
              className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* GitHub Repo Link */}
            <a
              href="https://github.com/missionjee/jee-tracker"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
              title="View on GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-between overflow-x-auto py-2 gap-1 border-t border-slate-800/60 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
