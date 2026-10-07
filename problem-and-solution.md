# Smart Study Planner - Problem & Solution

## SDG Alignment

This project supports **SDG 4: Quality Education** — ensuring inclusive and equitable
quality education and promoting lifelong learning opportunities. By centralizing
task tracking, study-hour allocation, and collaborative study groups, it helps
students (especially those without access to paid productivity tools) manage their
academic life in one place.

## Problem Statement

### The Problem

Students struggle with:

1. **Scattered tasks** - Assignments, exams, projects spread across WhatsApp, emails, notebooks
2. **No time management** - Don't know how to allocate study hours per subject
3. **Missed deadlines** - Forget due dates, leading to last-minute panic
4. **No progress tracking** - Can't see what's completed vs pending
5. **Isolation** - Can't coordinate study sessions with classmates

### Current Solutions & Their Flaws

| Solution | Flaw |
|----------|------|
| Google Calendar | No task tracking, no study time allocation |
| Notion/Todoist | Not student-focused, no deadline awareness |
| Paper planners | No reminders, can't share |
| WhatsApp groups | Chaotic, no structure |

---

## Our Solution: Smart Study Planner

### Core Value Proposition

> "A student-focused platform that helps you plan, track, and manage your academic life in one place."

### How We Solve Each Problem

| Problem | Our Solution |
|---------|--------------|
| Scattered tasks | Centralized dashboard for all subjects/tasks |
| No time management | Subject-wise study hour allocation + timer |
| Missed deadlines | Priority system + deadline reminders |
| No progress tracking | Visual progress bars + completion stats |
| Isolation | Study groups + shared task lists |

---

## User Flow

```
Login / Register
       |
       v
   Dashboard  --> View all tasks, deadlines, progress
       |
       +--> Add Subject
       |
       +--> Add Task (Assignment/Exam/Project)
       |
       +--> Track Study Hours (Pomodoro Timer)
       |
       +--> View Calendar (Deadlines)
       |
       +--> Join/Create Study Group
```

---

## Key Features

### Phase 1: Frontend Basics (HTML/CSS/JS)
- Landing page (HTML/CSS)
- Login/Register forms
- Dashboard layout
- Task cards with filters

### Phase 2: JavaScript & APIs
- Local storage for tasks
- Deadline sorting/filtering
- Pomodoro timer
- Weather API for study environment

### Phase 3: Backend (Node.js/Express)
- User authentication
- Task CRUD API
- Study group API
- Database (MongoDB/MySQL)

### Phase 4: React Frontend
- Dashboard components
- Calendar view
- Progress charts
- Real-time updates

### Phase 5: Deployment
- Host on Vercel/Netlify (frontend)
- Host backend on Render/Railway
- Custom domain

---

## Success Criteria

A student using this app should be able to:

1. See all tasks in one dashboard
2. Track study hours per subject
3. Never miss a deadline
4. Visualize progress
5. Collaborate with study group
