import { DailyGoal, TestRecord, BacklogItem, UserSettings } from '../types';

export const initialUserSettings: UserSettings = {
  studentName: 'Aspirant',
  targetScore: 230,
  targetYear: 2027,
  dailyGoalHours: 10,
  examDates: {
    jeeMainSession1: '2027-01-24',
    jeeMainSession2: '2027-04-06',
    jeeAdvanced: '2027-05-23'
  }
};

export const initialDailyGoals: DailyGoal[] = [
  {
    id: 'goal-1',
    title: 'Solve 35 PYQs of Ray Optics (Lenses & Prism)',
    subject: 'Physics',
    type: 'PYQs/Practice',
    estimatedMinutes: 90,
    completed: true,
    date: new Date().toISOString().split('T')[0],
    completedAt: '10:45 AM',
    priority: 'High',
    notes: 'Focus on JEE Main 2022-2024 shift questions'
  },
  {
    id: 'goal-2',
    title: 'Revise GOC Reaction Intermediates & Carbocation Rearrangement',
    subject: 'Chemistry',
    type: 'Revision',
    estimatedMinutes: 60,
    completed: true,
    date: new Date().toISOString().split('T')[0],
    completedAt: '12:15 PM',
    priority: 'High',
    notes: 'Cover stability orders and ring expansion'
  },
  {
    id: 'goal-3',
    title: 'Definite Integration - King\'s Property & Special Problems (30 Qs)',
    subject: 'Mathematics',
    type: 'PYQs/Practice',
    estimatedMinutes: 120,
    completed: false,
    date: new Date().toISOString().split('T')[0],
    priority: 'High',
    notes: 'Black Book / Sheet Level 2 questions'
  },
  {
    id: 'goal-4',
    title: 'Review Mock Test 4 Physics Mistakes & Formula Notebook',
    subject: 'Physics',
    type: 'Revision',
    estimatedMinutes: 45,
    completed: false,
    date: new Date().toISOString().split('T')[0],
    priority: 'Medium',
    notes: 'Write down notes on missed questions'
  },
  {
    id: 'goal-5',
    title: 'Inorganic NCERT Reading: Coordination Compounds CFT table',
    subject: 'Chemistry',
    type: 'Theory',
    estimatedMinutes: 50,
    completed: false,
    date: new Date().toISOString().split('T')[0],
    priority: 'Medium',
    notes: 'Memorize spectrochemical series and crystal field splitting values'
  }
];

export const initialTestRecords: TestRecord[] = [
  {
    id: 'test-1',
    testName: 'AITS Full Mock 1 (JEE Main Pattern)',
    testType: 'JEE Main',
    date: '2026-09-15',
    physics: { marks: 56, maxMarks: 100, correct: 15, incorrect: 4, unattempted: 6 },
    chemistry: { marks: 68, maxMarks: 100, correct: 18, incorrect: 4, unattempted: 3 },
    maths: { marks: 44, maxMarks: 100, correct: 12, incorrect: 4, unattempted: 9 },
    totalMarks: 168,
    maxTotalMarks: 300,
    accuracy: 75.0,
    percentile: 96.4,
    rank: 4820,
    mistakes: {
      silly: 4,
      calculationError: 3,
      conceptGap: 3,
      timeCrunch: 2,
      guessedWrong: 0
    },
    notes: 'Lost 20+ marks strictly to calculation errors in Math and units in Physics.',
    keyTakeaways: 'Give Maths at least 65 minutes. Do not rush Chemistry physical numericals.',
    weakTopics: ['Rotational Dynamics', 'Ionic Equilibrium', 'Definite Integrals']
  },
  {
    id: 'test-2',
    testName: 'Part Test 2 - Mechanics & Physical Chem',
    testType: 'Part Test',
    date: '2026-10-02',
    physics: { marks: 65, maxMarks: 100, correct: 17, incorrect: 3, unattempted: 5 },
    chemistry: { marks: 74, maxMarks: 100, correct: 19, incorrect: 2, unattempted: 4 },
    maths: { marks: 52, maxMarks: 100, correct: 14, incorrect: 4, unattempted: 7 },
    totalMarks: 191,
    maxTotalMarks: 300,
    accuracy: 81.0,
    percentile: 98.1,
    rank: 2450,
    mistakes: {
      silly: 2,
      calculationError: 2,
      conceptGap: 3,
      timeCrunch: 2,
      guessedWrong: 0
    },
    notes: 'Much better accuracy. Chemistry scored well due to NCERT thoroughness.',
    keyTakeaways: 'Work on time management in Maths calculus questions.',
    weakTopics: ['Center of Mass', 'Thermodynamics sign convention']
  },
  {
    id: 'test-3',
    testName: 'National Benchmark Test 3',
    testType: 'JEE Main',
    date: '2026-10-20',
    physics: { marks: 72, maxMarks: 100, correct: 19, incorrect: 4, unattempted: 2 },
    chemistry: { marks: 78, maxMarks: 100, correct: 20, incorrect: 2, unattempted: 3 },
    maths: { marks: 58, maxMarks: 100, correct: 15, incorrect: 2, unattempted: 8 },
    totalMarks: 208,
    maxTotalMarks: 300,
    accuracy: 86.2,
    percentile: 99.05,
    rank: 1280,
    mistakes: {
      silly: 2,
      calculationError: 1,
      conceptGap: 3,
      timeCrunch: 2,
      guessedWrong: 0
    },
    notes: 'Crossed 200 barrier! Accuracy improved significantly.',
    keyTakeaways: 'Maths coordinate geometry is strong, need to speed up indefinite integration.',
    weakTopics: ['Wave Optics', 'Aldol condensation questions']
  },
  {
    id: 'test-4',
    testName: 'JEE Main Full Test 4 (Computer Based Test)',
    testType: 'JEE Main',
    date: '2026-11-03',
    physics: { marks: 78, maxMarks: 100, correct: 20, incorrect: 2, unattempted: 3 },
    chemistry: { marks: 82, maxMarks: 100, correct: 21, incorrect: 2, unattempted: 2 },
    maths: { marks: 66, maxMarks: 100, correct: 17, incorrect: 2, unattempted: 6 },
    totalMarks: 226,
    maxTotalMarks: 300,
    accuracy: 88.2,
    percentile: 99.42,
    rank: 750,
    mistakes: {
      silly: 1,
      calculationError: 2,
      conceptGap: 2,
      timeCrunch: 1,
      guessedWrong: 0
    },
    notes: 'Personal best score! Reached target accuracy above 88%.',
    keyTakeaways: 'Maintain this composure. Next target is 240+.',
    weakTopics: ['Differential Equations', 'Fluids Surface Tension']
  }
];

export const initialBacklogs: BacklogItem[] = [
  {
    id: 'bl-1',
    chapterName: 'Rotational Motion',
    subject: 'Physics',
    missingDescription: 'Moment of Inertia of irregular shapes & Angular Momentum Conservation numericals pending',
    priority: 'High',
    estimatedHours: 8,
    targetClearanceDate: '2026-11-18',
    status: 'In Progress',
    notes: 'Watch 2 one-shot lectures + solve 40 PYQs',
    createdAt: '2026-11-01'
  },
  {
    id: 'bl-2',
    chapterName: 'Ionic Equilibrium',
    subject: 'Chemistry',
    missingDescription: 'Solubility Product (Ksp) & Buffer Solution advanced mixed problem sheet',
    priority: 'High',
    estimatedHours: 6,
    targetClearanceDate: '2026-11-20',
    status: 'Active',
    notes: 'Formula sheet made, but need practice on simultaneous equilibrium',
    createdAt: '2026-11-02'
  },
  {
    id: 'bl-3',
    chapterName: 'Parabola, Ellipse & Hyperbola',
    subject: 'Mathematics',
    missingDescription: 'Hyperbola tangents and normals standard properties + Conics mix questions',
    priority: 'High',
    estimatedHours: 10,
    targetClearanceDate: '2026-11-25',
    status: 'Active',
    notes: 'Coordinate geometry carries 4-5 questions in JEE Main',
    createdAt: '2026-11-03'
  },
  {
    id: 'bl-4',
    chapterName: 'Waves & Sound',
    subject: 'Physics',
    missingDescription: 'Doppler effect with moving observer/source and organ pipe harmonics',
    priority: 'Medium',
    estimatedHours: 4,
    targetClearanceDate: '2026-11-28',
    status: 'Active',
    notes: 'Easy scoring chapter, must complete before mock series',
    createdAt: '2026-11-04'
  },
  {
    id: 'bl-5',
    chapterName: 'Amines & Diazonium',
    subject: 'Chemistry',
    missingDescription: 'Diazonium coupling reactions and Gabriel Phthalimide mechanism notes',
    priority: 'Medium',
    estimatedHours: 5,
    targetClearanceDate: '2026-12-02',
    status: 'Active',
    notes: 'Direct NCERT questions are asked in Mains',
    createdAt: '2026-11-05'
  }
];
