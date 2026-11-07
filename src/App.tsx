import React, { useState } from 'react';
import { JEEProvider } from './context/JEEContext';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { DailyGoals } from './components/DailyGoals';
import { TestPerformance } from './components/TestPerformance';
import { SyllabusTracker } from './components/SyllabusTracker';
import { BacklogsTracker } from './components/BacklogsTracker';
import { Analytics } from './components/Analytics';
import { AddGoalModal } from './components/AddGoalModal';
import { AddTestModal } from './components/AddTestModal';
import { AddBacklogModal } from './components/AddBacklogModal';
import { SettingsModal } from './components/SettingsModal';
import { Heart, Sparkles, BookOpen } from 'lucide-react';

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const MainContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Modals state
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [isAddTestOpen, setIsAddTestOpen] = useState(false);
  const [isAddBacklogOpen, setIsAddBacklogOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header / Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            setActiveTab={setActiveTab}
            openAddGoalModal={() => setIsAddGoalOpen(true)}
            openAddTestModal={() => setIsAddTestOpen(true)}
            openAddBacklogModal={() => setIsAddBacklogOpen(true)}
          />
        )}

        {activeTab === 'goals' && (
          <DailyGoals
            openAddModal={() => setIsAddGoalOpen(true)}
          />
        )}

        {activeTab === 'tests' && (
          <TestPerformance
            openAddModal={() => setIsAddTestOpen(true)}
          />
        )}

        {activeTab === 'syllabus' && (
          <SyllabusTracker />
        )}

        {activeTab === 'backlogs' && (
          <BacklogsTracker
            openAddModal={() => setIsAddBacklogOpen(true)}
          />
        )}

        {activeTab === 'analytics' && (
          <Analytics />
        )}
      </main>

      {/* Modals */}
      <AddGoalModal
        isOpen={isAddGoalOpen}
        onClose={() => setIsAddGoalOpen(false)}
      />

      <AddTestModal
        isOpen={isAddTestOpen}
        onClose={() => setIsAddTestOpen(false)}
      />

      <AddBacklogModal
        isOpen={isAddBacklogOpen}
        onClose={() => setIsAddBacklogOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">JEE Prep Command Tracker</span>
            <span>•</span>
            <span className="text-slate-500">Designed for Serious Aspirants</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/missionjee/jee-tracker"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>missionjee/jee-tracker</span>
            </a>
            <span>•</span>
            <span className="text-emerald-400 font-mono">100% Offline LocalStorage Sync</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <JEEProvider>
      <MainContent />
    </JEEProvider>
  );
}

export default App;
