import React, { createContext, useContext, useState, useEffect } from 'react';
import { DailyGoal, TestRecord, SyllabusChapter, BacklogItem, UserSettings } from '../types';
import { initialDailyGoals, initialTestRecords, initialBacklogs, initialUserSettings } from '../data/initialData';
import { initialSyllabusData } from '../data/syllabusData';
import confetti from 'canvas-confetti';

interface JEEContextType {
  // Goals
  goals: DailyGoal[];
  addGoal: (goal: Omit<DailyGoal, 'id' | 'completed'>) => void;
  toggleGoal: (id: string) => void;
  deleteGoal: (id: string) => void;
  editGoal: (id: string, updated: Partial<DailyGoal>) => void;
  
  // Tests
  tests: TestRecord[];
  addTest: (test: Omit<TestRecord, 'id' | 'totalMarks' | 'accuracy'>) => void;
  deleteTest: (id: string) => void;
  editTest: (id: string, updated: Partial<TestRecord>) => void;

  // Syllabus
  syllabus: SyllabusChapter[];
  updateChapter: (id: string, updated: Partial<SyllabusChapter>) => void;
  incrementRevision: (id: string) => void;

  // Backlogs
  backlogs: BacklogItem[];
  addBacklog: (backlog: Omit<BacklogItem, 'id' | 'createdAt'>) => void;
  updateBacklogStatus: (id: string, status: BacklogItem['status']) => void;
  deleteBacklog: (id: string) => void;
  editBacklog: (id: string, updated: Partial<BacklogItem>) => void;

  // Settings
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;

  // Storage utilities
  exportData: () => void;
  importData: (jsonData: string) => boolean;
  resetToDefault: () => void;
  triggerCelebration: () => void;
}

const JEEContext = createContext<JEEContextType | undefined>(undefined);

export const JEEProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Goals
  const [goals, setGoals] = useState<DailyGoal[]>(() => {
    const saved = localStorage.getItem('jee_goals');
    return saved ? JSON.parse(saved) : initialDailyGoals;
  });

  // Tests
  const [tests, setTests] = useState<TestRecord[]>(() => {
    const saved = localStorage.getItem('jee_tests');
    return saved ? JSON.parse(saved) : initialTestRecords;
  });

  // Syllabus
  const [syllabus, setSyllabus] = useState<SyllabusChapter[]>(() => {
    const saved = localStorage.getItem('jee_syllabus');
    return saved ? JSON.parse(saved) : initialSyllabusData;
  });

  // Backlogs
  const [backlogs, setBacklogs] = useState<BacklogItem[]>(() => {
    const saved = localStorage.getItem('jee_backlogs');
    return saved ? JSON.parse(saved) : initialBacklogs;
  });

  // Settings
  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('jee_settings');
    return saved ? JSON.parse(saved) : initialUserSettings;
  });

  // Auto-save to LocalStorage
  useEffect(() => {
    localStorage.setItem('jee_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('jee_tests', JSON.stringify(tests));
  }, [tests]);

  useEffect(() => {
    localStorage.setItem('jee_syllabus', JSON.stringify(syllabus));
  }, [syllabus]);

  useEffect(() => {
    localStorage.setItem('jee_backlogs', JSON.stringify(backlogs));
  }, [backlogs]);

  useEffect(() => {
    localStorage.setItem('jee_settings', JSON.stringify(settings));
  }, [settings]);

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 }
    });
  };

  // Goals operations
  const addGoal = (goalData: Omit<DailyGoal, 'id' | 'completed'>) => {
    const newGoal: DailyGoal = {
      ...goalData,
      id: 'goal-' + Date.now(),
      completed: false
    };
    setGoals(prev => [newGoal, ...prev]);
  };

  const toggleGoal = (id: string) => {
    setGoals(prev => prev.map(g => {
      if (g.id === id) {
        const nextCompleted = !g.completed;
        if (nextCompleted) {
          triggerCelebration();
        }
        return {
          ...g,
          completed: nextCompleted,
          completedAt: nextCompleted ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined
        };
      }
      return g;
    }));
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  const editGoal = (id: string, updated: Partial<DailyGoal>) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, ...updated } : g));
  };

  // Test operations
  const addTest = (testData: Omit<TestRecord, 'id' | 'totalMarks' | 'accuracy'>) => {
    const totalMarks = testData.physics.marks + testData.chemistry.marks + testData.maths.marks;
    const totalAttempted = (testData.physics.correct + testData.physics.incorrect) +
                           (testData.chemistry.correct + testData.chemistry.incorrect) +
                           (testData.maths.correct + testData.maths.incorrect);
    const totalCorrect = testData.physics.correct + testData.chemistry.correct + testData.maths.correct;
    const accuracy = totalAttempted > 0 ? Number(((totalCorrect / totalAttempted) * 100).toFixed(1)) : 0;

    const newTest: TestRecord = {
      ...testData,
      id: 'test-' + Date.now(),
      totalMarks,
      accuracy
    };

    setTests(prev => [...prev, newTest]);
    triggerCelebration();
  };

  const deleteTest = (id: string) => {
    setTests(prev => prev.filter(t => t.id !== id));
  };

  const editTest = (id: string, updated: Partial<TestRecord>) => {
    setTests(prev => prev.map(t => {
      if (t.id === id) {
        const merged = { ...t, ...updated };
        const totalMarks = merged.physics.marks + merged.chemistry.marks + merged.maths.marks;
        const totalAttempted = (merged.physics.correct + merged.physics.incorrect) +
                               (merged.chemistry.correct + merged.chemistry.incorrect) +
                               (merged.maths.correct + merged.maths.incorrect);
        const totalCorrect = merged.physics.correct + merged.chemistry.correct + merged.maths.correct;
        const accuracy = totalAttempted > 0 ? Number(((totalCorrect / totalAttempted) * 100).toFixed(1)) : 0;
        return {
          ...merged,
          totalMarks,
          accuracy
        };
      }
      return t;
    }));
  };

  // Syllabus operations
  const updateChapter = (id: string, updated: Partial<SyllabusChapter>) => {
    setSyllabus(prev => prev.map(ch => ch.id === id ? { ...ch, ...updated } : ch));
  };

  const incrementRevision = (id: string) => {
    setSyllabus(prev => prev.map(ch => {
      if (ch.id === id) {
        const newCount = ch.revisionCount + 1;
        if (newCount >= 3) triggerCelebration();
        return {
          ...ch,
          revisionCount: newCount,
          lastRevisedDate: new Date().toISOString().split('T')[0]
        };
      }
      return ch;
    }));
  };

  // Backlogs operations
  const addBacklog = (backlogData: Omit<BacklogItem, 'id' | 'createdAt'>) => {
    const newItem: BacklogItem = {
      ...backlogData,
      id: 'bl-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setBacklogs(prev => [newItem, ...prev]);
  };

  const updateBacklogStatus = (id: string, status: BacklogItem['status']) => {
    if (status === 'Cleared') {
      triggerCelebration();
    }
    setBacklogs(prev => prev.map(bl => bl.id === id ? { ...bl, status } : bl));
  };

  const deleteBacklog = (id: string) => {
    setBacklogs(prev => prev.filter(bl => bl.id !== id));
  };

  const editBacklog = (id: string, updated: Partial<BacklogItem>) => {
    setBacklogs(prev => prev.map(bl => bl.id === id ? { ...bl, ...updated } : bl));
  };

  // Settings
  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // JSON Export / Import
  const exportData = () => {
    const data = {
      goals,
      tests,
      syllabus,
      backlogs,
      settings,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jee-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.goals) setGoals(parsed.goals);
      if (parsed.tests) setTests(parsed.tests);
      if (parsed.syllabus) setSyllabus(parsed.syllabus);
      if (parsed.backlogs) setBacklogs(parsed.backlogs);
      if (parsed.settings) setSettings(parsed.settings);
      triggerCelebration();
      return true;
    } catch (err) {
      console.error('Failed to parse import data', err);
      return false;
    }
  };

  const resetToDefault = () => {
    if (window.confirm('Reset all JEE data back to demo default values? Custom edits will be replaced.')) {
      setGoals(initialDailyGoals);
      setTests(initialTestRecords);
      setSyllabus(initialSyllabusData);
      setBacklogs(initialBacklogs);
      setSettings(initialUserSettings);
      localStorage.clear();
    }
  };

  return (
    <JEEContext.Provider value={{
      goals,
      addGoal,
      toggleGoal,
      deleteGoal,
      editGoal,
      tests,
      addTest,
      deleteTest,
      editTest,
      syllabus,
      updateChapter,
      incrementRevision,
      backlogs,
      addBacklog,
      updateBacklogStatus,
      deleteBacklog,
      editBacklog,
      settings,
      updateSettings,
      exportData,
      importData,
      resetToDefault,
      triggerCelebration
    }}>
      {children}
    </JEEContext.Provider>
  );
};

export const useJEE = () => {
  const context = useContext(JEEContext);
  if (!context) {
    throw new Error('useJEE must be used within a JEEProvider');
  }
  return context;
};
