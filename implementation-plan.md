# Implementation Plan - Smart Study Planner

## PBL Context

- **PBL Activity:** Complex Problem Solving — develop an SDG-oriented web application
- **SDG:** SDG 4 (Quality Education)
- **PBL Hours:** 15
- **Evaluation Criteria:** Innovation and technical depth

### Phase → Course Outcome (CO) Mapping

| Phase | Content | CO Covered |
|-------|---------|------------|
| 1. HTML & CSS Foundation | Responsive pages, flexbox/grid, media queries | CO-2 (Develop responsive webpages) |
| 2. JavaScript Interactivity | DOM, events, localStorage, fetch, Pomodoro timer | CO-3 (Interactive applications using JS and APIs) |
| 3. Backend Development | Express REST API, MongoDB/MySQL, JWT, Postman | CO-4 (Backend APIs with Node.js, Express, databases) |
| 4. React Frontend | Components, hooks, API integration, CORS | CO-5 (Frontend apps using React and cloud concepts) |
| 5. Deployment | Hosting, SEO, CAPTCHA, domain | CO-5 |

Module 1 (web technologies & client-server architecture) underpins CO-1 and is
reflected in the Phase 5 hosting/domain work.

---

## Project Status

**Overall: ~70% complete** (Phases 1–4 done)

| Phase | Status | % Done | Notes |
|-------|--------|--------|-------|
| 1. HTML & CSS Foundation | Done | 100% | Redesigned with indigo theme, Space Grotesk/DM Sans, responsive.css |
| 2. JavaScript Interactivity | Done | 100% | Auth validation, task CRUD via localStorage, filters, deadline sort, Pomodoro timer |
| 3. Backend Development | Done | 100% | Express + MongoDB (Mongoose), JWT auth, tasks/subjects CRUD |
| 4. React Frontend | Done | 100% | Vite + react-router; components; hooks; API integration; UX polish pass (edit task, editable timer, sort, add-subject, landing page, overdue highlight, token-expiry redirect) |
| 5. Deployment | Not Started | 0% | — |

### Milestone Tracker

| Week | Milestone | Status |
|------|-----------|--------|
| 1 | Landing + auth pages | Done |
| 2 | Dashboard layout + folder structure | Done |
| 3 | JS validation + localStorage | Done |
| 4 | Task CRUD + timer | Done |
| 5 | Express server + auth | Done |
| 6 | Tasks/subjects CRUD + DB | Done |
| 7 | React components | Done |
| 8 | React API integration | Done |
| 9 | Deployment | Pending |
| 10 | Docs + demo video | Pending |

Update the % and Status cells as you go; the overall number is a rough average of phase completion.

---

## Project Structure (target)

```
SmartStudyPlanner/
  index.html          (landing page)
  login.html          (login page)
  register.html       (register page)
  dashboard.html      (main dashboard)
  css/
    style.css
    responsive.css
  images/
  js/
    app.js            (Phase 2 interactivity)
  server/             (Phase 3 backend)
  client/             (Phase 4 React app, Vite)
```

---

## Milestones (10 weeks)

| Week | Milestone | Deliverable |
|------|-----------|-------------|
| 1 | Landing + auth pages | HTML done, styled, committed |
| 2 | Dashboard layout | Responsive (media queries), folder restructure |
| 3 | JS validation + localStorage | Login/register validation, task persistence |
| 4 | Task CRUD + timer | Working offline dashboard demo |
| 5 | Express server + auth | /api/auth endpoints, Postman collection |
| 6 | Tasks/subjects CRUD + DB | All API endpoints working, JWT tested |
| 7 | React components | Navbar, Dashboard, TaskCard, Timer |
| 8 | React API integration | Live data, loading/error states |
| 9 | Deployment | Frontend on Vercel, backend on Render, SEO |
| 10 | Docs + demo video | Final report, README, screenshots |

---

## Phase Details

### Phase 1: HTML & CSS Foundation

**Syllabus:** Module 1 (Web Technologies), Module 2 (HTML & CSS)

Tasks:
- [ ] Set up project folder structure (css/, images/, js/)
- [ ] Landing page: navbar, hero, features, footer
- [ ] Login/register pages
- [ ] Dashboard layout
- [ ] Flexbox for layouts, Grid for dashboard cards
- [ ] Media queries for responsive design
- [ ] Bootstrap components where appropriate

**Definition of done:** All pages render correctly on mobile and desktop; files committed to git.

### Phase 2: JavaScript Interactivity

**Syllabus:** Module 3 (JavaScript Fundamentals)

Tasks:
- [ ] Form validation (login/register)
- [ ] LocalStorage for tasks, preferences, persistence
- [ ] DOM manipulation: add/delete/update tasks, filter by subject/priority
- [ ] Event handling: clicks, form submit, keyboard shortcuts
- [ ] Pomodoro timer
- [ ] Sort tasks by deadline

**Definition of done:** Fully working offline dashboard (CRUD + timer + filters) without any backend. This is the demo-able prototype.

### Phase 3: Backend Development

**Syllabus:** Module 4 (APIs & HTTP), Module 5 (Node.js/Express)

Tasks:
- [ ] Set up Node.js project
- [ ] Express server
- [ ] REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |
| GET | /api/subjects | Get subjects |
| POST | /api/subjects | Add subject |

- [ ] MongoDB/MySQL database
- [ ] JWT authentication
- [ ] Postman testing

**Definition of done:** All endpoints pass Postman tests; Postman collection committed; frontend (vanilla JS) can call the API.

### Phase 4: React Frontend

**Syllabus:** Module 6 (React.js)

Tasks:
- [ ] Set up React project (Vite)
- [ ] Components: Navbar, Dashboard, TaskCard, TaskForm, Calendar, ProgressBar, Timer
- [ ] useState for task state, useEffect for API on mount
- [ ] Conditional rendering (loading/error/success)
- [ ] List rendering for tasks
- [ ] Props for component communication
- [ ] Axios/Fetch integration
- [ ] Handle CORS

**Definition of done:** React dashboard shows live API data with loading and error states.

### Phase 5: Deployment

**Syllabus:** Module 7 (Deployment & Modern Web Concepts)

Tasks:
- [ ] Build React app
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Deploy backend to Render/Railway
- [ ] Environment variables
- [ ] Domain setup (optional)
- [ ] SEO: meta tags, title tags, Open Graph
- [ ] reCAPTCHA on forms
- [ ] Final testing

**Definition of done:** Live app URL works end-to-end; README has links; demo video recorded.

---

## Risks & Fallbacks

| Risk | Fallback |
|------|----------|
| MongoDB setup fails | Switch to MySQL or JSON-file storage for the demo |
| React phase slips | Deploy the Phase 2 vanilla JS app as the final product |
| Backend deployment issues | Keep backend local, record a Postman demo video |
| Time overrun on Phase 3 | Cut study-group API, keep tasks + subjects + auth only |

---

## Git Strategy

- One commit per milestone at minimum: `feat(phase1): responsive layout`, `feat(phase2): pomodoro timer`, etc.
- Never push one final dump of the whole project.

---

## Learning Outcomes

| Module | Skills Gained |
|--------|---------------|
| HTML/CSS | Semantic HTML, Flexbox, Grid, Media Queries, Bootstrap |
| JavaScript | DOM, Events, Local Storage, Async/Await, Fetch API |
| APIs | REST API design, HTTP methods, Status codes, JSON |
| Node.js | Express, Routing, Middleware, JWT Auth, Database CRUD |
| React | Components, State, Hooks, Props, Conditional Rendering |
| Deployment | Hosting, SEO, Domain setup, Cloud basics |

---

## Progress Tracking

- [ ] Phase 1 completed: ___________
- [ ] Phase 2 completed: ___________
- [ ] Phase 3 completed: ___________
- [ ] Phase 4 completed: ___________
- [ ] Phase 5 completed: ___________
