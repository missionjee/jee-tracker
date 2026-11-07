export type Subject = 'Physics' | 'Chemistry' | 'Mathematics' | 'General';

export type TaskType = 'Theory' | 'PYQs/Practice' | 'Revision' | 'Mock Test' | 'DPP/Module';

export type Priority = 'High' | 'Medium' | 'Low';

export type Confidence = 'Low' | 'Medium' | 'High';

export type SyllabusStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface DailyGoal {
  id: string;
  title: string;
  subject: Subject;
  type: TaskType;
  estimatedMinutes: number;
  completed: boolean;
  date: string; // YYYY-MM-DD
  completedAt?: string;
  priority: Priority;
  notes?: string;
}

export interface SubjectMarks {
  marks: number;
  maxMarks: number;
  correct: number;
  incorrect: number;
  unattempted: number;
}

export interface TestMistakes {
  silly: number;
  calculationError: number;
  conceptGap: number;
  timeCrunch: number;
  guessedWrong: number;
}

export interface TestRecord {
  id: string;
  testName: string;
  testType: 'JEE Main' | 'JEE Advanced' | 'Chapter Test' | 'Part Test';
  date: string;
  physics: SubjectMarks;
  chemistry: SubjectMarks;
  maths: SubjectMarks;
  totalMarks: number;
  maxTotalMarks: number;
  accuracy: number; // percentage
  percentile?: number;
  rank?: number;
  mistakes: TestMistakes;
  notes?: string;
  keyTakeaways?: string;
  weakTopics?: string[];
}

export interface SyllabusChapter {
  id: string;
  name: string;
  subject: 'Physics' | 'Chemistry' | 'Mathematics';
  classLevel: '11' | '12';
  weightage: 'High' | 'Medium' | 'Low';
  status: SyllabusStatus;
  theoryDone: boolean;
  notesDone: boolean;
  pyqDone: boolean;
  revisionCount: number;
  lastRevisedDate?: string;
  confidence: Confidence;
  subtopics?: string[];
}

export interface BacklogItem {
  id: string;
  chapterName: string;
  subject: 'Physics' | 'Chemistry' | 'Mathematics';
  missingDescription: string;
  priority: Priority;
  estimatedHours: number;
  targetClearanceDate: string;
  status: 'Active' | 'In Progress' | 'Cleared';
  notes?: string;
  createdAt: string;
}

export interface ExamCountdown {
  title: string;
  date: string;
  targetScore: number;
}

export interface UserSettings {
  studentName: string;
  targetScore: number;
  targetYear: number;
  dailyGoalHours: number;
  examDates: {
    jeeMainSession1: string;
    jeeMainSession2: string;
    jeeAdvanced: string;
  };
}
