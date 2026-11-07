# 🎯 JEE Tracker — Ultimate Main & Advanced Prep Suite

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-purple?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

An all-in-one preparation tracker and analytics tool crafted specifically for **JEE Main & JEE Advanced** aspirants. Designed to eliminate study chaos, diagnose mock test score leaks, track authentic PCM syllabus completion, and destroy backlogs systematically.

---

## 🚀 Key Features

### 1. 🎯 Daily Goals & Focus Command (To-Do List)
- **Subject-Specific Tasks:** Tag targets as Physics, Chemistry, Mathematics, or General.
- **Categorization:** Tag task types — *Theory*, *PYQs/Practice*, *Revision*, *DPP/Module*, *Mock Test*.
- **Integrated JEE Focus Timer:** Built-in Pomodoro timer (25 min, 50 min, and 90 min deep work blocks) with zero distractions.
- **1-Click JEE Presets:** Instant presets like "Solve 30 PYQs in 75m", "Inorganic NCERT Reading", "Maths Level 2 DPP", and "Formula Book Active Recall".
- **Daily Progress & Time Logging:** Visual meters showing planned hours vs completed hours.
- **Streak & Celebration:** Visual confetti rewards upon completing goals to maintain discipline.

---

### 2. 📊 Mock Test Marks & Performance Tracker
- **Authentic Marking Pattern:** Log tests with marks (/100 each for Physics, Chemistry, Maths), correct count, incorrect count, and unattempted count.
- **Real-Time Accuracy & Total Calculation:** Instant score calculation (/300 for Mains) and accuracy percentage.
- **Mistake Root-Cause Diagnostic:**
  - Silly mistakes (reading error / wrong bubbling)
  - Calculation errors
  - Concept gaps
  - Time crunch
  - Flawed guessing
- **Visual Analytics:**
  - Total Score progression vs Target Score line (e.g., 230/300)
  - Multi-line subject trend (Physics, Chemistry, Maths)
  - Donut chart of mistake distribution
- **Detailed History & Key Learnings:** Save weak topics and actionable takeaways for the next mock.

---

### 3. 📚 Complete Authentic PCM Syllabus Tracker (Class 11 & 12)
- **45+ Preloaded Chapters:** Fully aligned with the authentic NTA JEE syllabus across Physics, Chemistry, and Mathematics.
- **Granular Multi-Stage Tracking:**
  - Status: *Not Started*, *In Progress*, *Completed*
  - Theory done checkbox
  - Short Notes made checkbox
  - PYQs (Previous Year Questions) solved checkbox
  - Revision rounds tracker (1x, 2x, 3x+ Mastered with celebration)
  - Confidence Level: *Low*, *Medium*, *High*
- **Sub-Topics Checklist:** Expand any chapter to see key concepts (e.g. *Kinematics 2D*, *VSEPR Theory*, *Bayes Theorem*).
- **Filters & Search:** Filter by Subject, Class (11th/12th), Weightage (High/Medium/Low), or search subtopics.

---

### 4. ⚠️ Backlogs Clearance Command Center
- **Backlog Triage:** Isolate specific missing items (e.g., *"Missed Lectures 4-8"*, *"Exercise 2 pending"*, *"Optics prism formula notes pending"*).
- **Time Estimation & Urgency:** Track estimated hours needed and live countdown to target clearance date.
- **Clearance Rewards:** Mark items as *In Progress* or *Cleared* with celebratory confetti feedback.

---

### 5. 📈 JEE Readiness Analytics & Marks Unlock
- **Readiness Score (0-100):** Weighted algorithm factoring syllabus coverage, mock test accuracy, and backlog health.
- **"Zero Silly Mistakes" Unlock:** Calculates exact marks gain (typically +15 to +35 marks) if careless mistakes are eliminated.
- **Subject Mastery Radar & Comparison:** Clear visual of which subject is lagging so you can rebalance study time.
- **High-Weightage Chapters Audit:** Instant identification of high-yield topics needing attention.
- **Printable / PDF Report:** 1-click printable summary for mentors or self-review.

---

### 6. 💾 100% Offline & Data Privacy
- **Local Storage First:** All data is auto-saved locally in your browser. No login or servers required.
- **JSON Backup & Restore:** Export all goals, tests, syllabus progress, and backlogs to a timestamped `.json` file anytime and restore on any device.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 6
- **Styling:** Tailwind CSS + Custom Dark Theme
- **Charts:** Recharts
- **Icons:** Lucide React
- **Effects:** Canvas Confetti

---

## ⚡ Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/missionjee/jee-tracker.git
cd jee-tracker
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Build for production
```bash
npm run build
```
Production assets are generated in `dist/`.

---

## 📂 Project Structure

```
jee-tracker/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx             # Header, navigation, backup/restore
│   │   ├── Dashboard.tsx          # Master dashboard, countdowns, KPIs
│   │   ├── DailyGoals.tsx         # To-Do list, focus timer, 1-click presets
│   │   ├── TestPerformance.tsx    # Test marks logging, mistake diagnostic, charts
│   │   ├── SyllabusTracker.tsx    # Full 45+ PCM chapters, subtopics, revision counter
│   │   ├── BacklogsTracker.tsx    # Backlogs management, estimated hours, deadlines
│   │   ├── Analytics.tsx          # Readiness score, silly mistake gains, weightage audit
│   │   ├── AddGoalModal.tsx       # Add task modal
│   │   ├── AddTestModal.tsx       # Log mock test modal
│   │   ├── AddBacklogModal.tsx    # Add backlog modal
│   │   └── SettingsModal.tsx      # Target score, exam dates, target year
│   ├── context/
│   │   └── JEEContext.tsx         # Central state, localStorage persistence, import/export
│   ├── data/
│   │   ├── syllabusData.ts        # Authentic NTA JEE PCM syllabus
│   │   └── initialData.ts         # Starter demo data
│   ├── types/
│   │   └── index.ts               # TypeScript interfaces
│   ├── utils/
│   │   └── helpers.ts             # Date and formatting utilities
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🎯 Target Exams

- **JEE Main** (Session 1 & Session 2)
- **JEE Advanced** (IIT Entrance)
- **BITSAT / WBJEE / MHT-CET / State Engineering Entrances**

---

## 📄 License

MIT License — feel free to fork, customize, and share with fellow JEE aspirants!
