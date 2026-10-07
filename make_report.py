# -*- coding: utf-8 -*-
"""Generate GTU-style PBL report DOCX for Smart Study Planner."""
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.enum.section import WD_SECTION

doc = Document()

# Page margins
for section in doc.sections:
    section.top_margin = Inches(0.8)
    section.bottom_margin = Inches(0.8)
    section.left_margin = Inches(1)
    section.right_margin = Inches(1)


def add_table(headers, rows):
    table = doc.add_table(rows=1, cols=len(headers))
    table.style = 'Light Grid Accent 1'
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    for i, h in enumerate(headers):
        cell = table.rows[0].cells[i]
        cell.text = h
        for run in cell.paragraphs[0].runs:
            run.font.bold = True
    for row in rows:
        cells = table.add_row().cells
        for i, val in enumerate(row):
            cells[i].text = val
    doc.add_paragraph()


def h1(text):
    doc.add_heading(text, level=1)


def h2(text):
    doc.add_heading(text, level=2)


def p(text):
    doc.add_paragraph(text)


def bullets(items):
    for it in items:
        doc.add_paragraph(it, style='List Bullet')


def caption(text):
    para = doc.add_paragraph(text)
    para.runs[0].italic = True
    para.runs[0].font.color.rgb = RGBColor(0x55, 0x55, 0x55)


# ============ TITLE PAGE ============
p('GUJARAT TECHNOLOGICAL UNIVERSITY')
p('Chandkheda, Ahmedabad')
p('Sardar Vallabhbhai Patel Institute of Technology, Vasad')
doc.add_paragraph()
doc.add_heading('A Project On', level=1).alignment = WD_ALIGN_PARAGRAPH.CENTER
p('PBL Activity 3: Complex Problem Solving (CPS)')
doc.add_heading('Smart Study Planner: An SDG-Oriented Personal Academic Planning Web Application', level=1).alignment = WD_ALIGN_PARAGRAPH.CENTER
p('Under the Subject')
doc.add_heading('Web Application Development (BE05000281)', level=1).alignment = WD_ALIGN_PARAGRAPH.CENTER
p('BE 3rd YEAR, SEM 5 (Computer Engineering branch)')
doc.add_paragraph()
p('Submitted by:')
p('Husain Bardanwala (240410107008)')
p('Nikunj Dhobi (240410107033)')
p('Prof. Nidhi Shah (Faculty Guide)')
p('Prof. Jayna Shah (Head of the Department)')
p('SARDAR VALLABHBHAI PATEL INSTITUTE OF TECHNOLOGY, VASAD')
doc.add_paragraph()
p('SUB NAME: Web Application Development')
p('SUBJECT CODE: BE05000281')
doc.add_page_break()

# ============ TOC ============
doc.add_heading('TABLE OF CONTENTS', level=1)
toc = [
    ('1', 'Title Page', '3'),
    ('2', 'Introduction', '3'),
    ('3', 'Project Definition & Problem Statement / Objectives', '4'),
    ('4', 'Proposed System / System Design', '5'),
    ('5', 'Screenshots of Results', '9'),
    ('6', 'Conclusion and Future Scope', '11'),
    ('7', 'References', '11'),
]
add_table(['Sr no.', 'Topic', 'Page no.'], toc)
doc.add_page_break()

# ============ 2. TITLE PAGE (Table) ============
doc.add_heading('1. Title Page', level=1)
doc.add_heading('SMART STUDY PLANNER: AN SDG-ORIENTED PERSONAL ACADEMIC PLANNING WEB APPLICATION', level=0).alignment = WD_ALIGN_PARAGRAPH.CENTER
p('A full-stack (React + Node.js + MongoDB) web application that helps students plan tasks, track study hours with a Pomodoro timer, and visualize progress to reduce missed deadlines.')
add_table(['Item', 'Details'], [
    ('Project title', 'Smart Study Planner: An SDG-Oriented Personal Academic Planning Web Application'),
    ('Activity', 'PBL Activity 3 – Complex Problem Solving (CPS)'),
    ('SDGs addressed', 'SDG 4 (Quality Education)'),
    ('Subject', 'Web Application Development (BE05000281)'),
    ('Technology stack', 'MongoDB, Express.js, React.js, Node.js (MERN)'),
    ('Submitted by', 'Husain Bardanwala (240410107008), Nikunj Dhobi (240410107033)'),
    ('Class', 'BE 3rd Year, Semester 5, Computer Engineering'),
    ('Faculty guide', 'Prof. Nidhi Shah'),
    ('Institute', 'Sardar Vallabhbhai Patel Institute of Technology, Vasad'),
])

# ============ 3. INTRODUCTION ============
doc.add_heading('2. Introduction', level=1)
p('A web application is software that runs on a web server and is used through a web browser. Unlike a static website that only shows fixed pages, a web application accepts input from users, stores data in a database and shows each user information that matches their role. Modern web applications are usually split into a frontend, a backend, and a database.')
p('The United Nations Sustainable Development Goals (SDGs) are 17 global goals for 2030. SDG 4 – Quality Education aims to ensure inclusive and equitable quality education and promote lifelong learning opportunities for all. Students who lack structured study habits often miss deadlines, cannot estimate time per subject, and rarely review progress.')
p('Before this project, task information was scattered across WhatsApp messages, personal notebooks, and calendar apps that do not understand the academic workload. There was no single place to view subjects, tasks, deadlines, study hours, and progress together.')
p('In this project, a web application named Smart Study Planner is designed and developed using the MERN stack. A student registers, logs in, creates subjects and tasks with due dates and priorities, marks tasks complete, and uses a configurable Pomodoro timer to focus. The dashboard shows total, completed, pending tasks, subject count, and an overall progress bar.')
p('Need of the project: centralize all academic tasks in one place, never miss a deadline again, visualize progress, and build consistent study habits with the Pomodoro timer.')
p('Web technologies used in this project:')
bullets([
    'HTML5 and CSS3 – semantic structure, Flexbox/Grid layouts and media queries for responsive design.',
    'JavaScript (ES6+) – arrow functions, destructuring, Promises and async/await for API calls.',
    'React.js – component-based SPA with hooks, routing and conditional rendering.',
    'Node.js and Express.js – REST API server with middleware for logging, authentication and error handling.',
    'MongoDB with Mongoose – NoSQL document database with schemas and validation.',
    'HTTP, JSON and REST – communication between browser and server, tested with Postman and curl.',
])

# ============ 4. PROJECT DEFINITION ============
doc.add_heading('3. Project Definition & Problem Statement / Objectives', level=1)
doc.add_heading('3.1 Project Definition', level=2)
add_table(['Item', 'Details'], [
    ('PBL activity', 'Activity 3 – Complex Problem Solving (CPS)'),
    ('Domain', 'Education / productivity (SDG-oriented web application)'),
    ('Project title', 'Smart Study Planner – Academic Task & Time Manager'),
    ('Users (roles)', 'Student'),
    ('Frontend', 'React 19, Vite, React Router, CSS3'),
    ('Backend', 'Node.js, Express.js, JSON Web Token (JWT), bcryptjs'),
    ('Database', 'MongoDB with Mongoose ODM'),
    ('Tools', 'VS Code, MongoDB Compass, Postman, npm, Git'),
])
doc.add_heading('3.2 Problem Statement', level=2)
p('Students today juggle assignments, exams, projects, and revision across multiple platforms. They do not have a single place to see what is due, what is done, which subjects need more time, and how much progress they have made. Missing due dates leads to last-minute panic and lower scores. This project delivers a single-page dashboard that centralizes subjects and tasks, highlights overdue items, and encourages focused study with a Pomodoro timer.')
doc.add_heading('3.3 Objectives', level=2)
bullets([
    '1. To design and develop a full-stack web application using React, Node.js, Express.js and MongoDB.',
    '2. To provide secure registration and login with hashed passwords and JWT-based authentication.',
    '3. To let students create, edit, complete and delete tasks with priorities and due dates.',
    '4. To build REST APIs that perform all CRUD operations on tasks and subjects.',
    '5. To show live dashboard stats and a progress bar based on completion.',
    '6. To implement a configurable Pomodoro timer for focused study.',
    '7. To make the interface responsive and usable on mobile phones and desktops.',
])
doc.add_heading('3.4 Scope of the Project', level=2)
p('The project covers user management, subject creation, task CRUD, filtering by subject/priority, deadline sorting, overdue highlighting, a progress bar, and a Pomodoro timer. Future enhancements include study-hour analytics, shared group lists, notifications, and calendar sync.')

# ============ 5. SYSTEM DESIGN ============
doc.add_heading('4. Proposed System / System Design', level=1)
doc.add_heading('4.1 System Architecture', level=2)
p('Smart Study Planner follows a three-tier client–server architecture. The React application runs in the browser and sends HTTP requests in JSON format. The Express server verifies the JWT token, runs business logic, and reads/writes data in MongoDB through Mongoose. The database stores users, tasks, and subjects.')
caption('Figure 1: System architecture of Smart Study Planner')
doc.add_heading('4.2 Technologies Used', level=2)
add_table(['Layer', 'Technology', 'Purpose in project'], [
    ('Frontend', 'React 19 + Vite', 'Component-based SPA, fast dev server'),
    ('Routing', 'React Router 6', 'Pages without full reload; protected routes'),
    ('HTTP client', 'fetch API', 'API calls; Authorization header with JWT'),
    ('Styling', 'CSS3 (Flexbox, Grid, media queries)', 'Responsive layout for mobile and desktop'),
    ('Backend', 'Node.js + Express.js', 'REST API, routing and middleware'),
    ('Security', 'bcryptjs, jsonwebtoken', 'Password hashing and token-based login'),
    ('Database', 'MongoDB + Mongoose', 'Document storage, schema validation'),
    ('Testing', 'Postman, curl, Playwright', 'API tests and UI smoke tests'),
    ('Deployment', 'Render, Vercel, Atlas', 'Cloud hosting'),
])
doc.add_heading('4.3 Modules of the System', level=2)
bullets([
    'Authentication module – register, log in, persist token in localStorage, log out.',
    'Dashboard module – stats cards, progress bar, quick actions.',
    'Task module – create, edit, toggle complete, delete, filter by subject/priority, sort by deadline, overdue badge.',
    'Subject module – add subjects and use them as task categories.',
    'Pomodoro timer module – configurable duration, start/pause/reset.',
])
doc.add_heading('4.4 Database Design', level=2)
add_table(['Collection', 'Fields', 'Rules'], [
    ('users', 'name, email, password, createdAt, updatedAt', 'email unique, password bcrypt-hashed'),
    ('tasks', 'name, subject, due, priority, completed, user, createdAt, updatedAt', 'name/ subject required, priority enum, user ref'),
    ('subjects', 'name, user, createdAt, updatedAt', 'name required, user ref'),
])
doc.add_heading('4.5 REST API Design', level=2)
add_table(['Method', 'Endpoint', 'Access', 'Purpose'], [
    ('POST', '/api/auth/register', 'Public', 'Register student'),
    ('POST', '/api/auth/login', 'Public', 'Login, receive JWT'),
    ('GET', '/api/auth/me', 'Logged in', 'Current user profile'),
    ('GET', '/api/tasks', 'Logged in', 'List my tasks'),
    ('POST', '/api/tasks', 'Logged in', 'Create task'),
    ('PUT', '/api/tasks/:id', 'Logged in', 'Update task (whitelisted fields)'),
    ('DELETE', '/api/tasks/:id', 'Logged in', 'Delete task'),
    ('GET', '/api/subjects', 'Logged in', 'List my subjects'),
    ('POST', '/api/subjects', 'Logged in', 'Add subject'),
    ('DELETE', '/api/subjects/:id', 'Logged in', 'Delete subject'),
])
doc.add_heading('4.6 Working of the System', level=2)
p('1. The student registers/logs in. The server checks the password with bcrypt and returns a signed JWT, which React saves in localStorage.')
p('2. The dashboard fetches tasks/subjects using the token in the Authorization header.')
p('3. The student creates a task; React sends POST /api/tasks. Mongoose validates the data and saves it.')
p('4. The student can mark a task complete, edit its details, delete it, or filter by subject/priority.')
p('5. The Pomodoro timer runs in the browser and helps the student focus in configurable intervals.')
doc.add_heading('4.7 Security Features', level=2)
bullets([
    'Passwords hashed with bcrypt (10 salt rounds).',
    'JWT authentication: protected routes return 401 without a valid token.',
    'User ID is taken from the token, not the request body.',
    'Whitelisted update fields on tasks/subjects.',
    'Secrets in .env, excluded from Git.',
    'CORS origin-configurable; input trimming and length validation.',
])
doc.add_heading('4.8 Implementation Steps', level=2)
bullets([
    'Install Node.js, MongoDB Community Server, create React+Vite client.',
    'Build backend: npm init, express, mongoose, cors, dotenv, bcryptjs, jsonwebtoken.',
    'Create Mongoose models, middleware, routes in MVC-style structure.',
    'Build React pages: Home, Login, Register, Dashboard; components: Navbar, TaskCard, TaskForm, Timer, ProgressBar.',
    'Test APIs with Postman/curl; add seed + demo data.',
    'Deploy: Atlas for DB, Render for API, Vercel for frontend.',
])

# ============ 6. SCREENSHOTS ============
doc.add_heading('5. Screenshots of Results', level=1)
p('The application was run with demo data. All functional tests produced the expected result.')
add_table(['Test', 'Action', 'Expected result', 'Result'], [
    ('1', 'Open home page', 'Hero + features shown, no login required', 'Pass'),
    ('2', 'Register new user', 'JWT returned, redirected to dashboard', 'Pass'),
    ('3', 'Login as student', 'Token issued, dashboard opens', 'Pass'),
    ('4', 'Add task', '201 Created, appears in list', 'Pass'),
    ('5', 'Mark complete', 'Status flips, progress bar updates', 'Pass'),
    ('6', 'Edit task', 'Fields prefilled, PUT updates list', 'Pass'),
    ('7', 'Filter by subject/priority', 'Only matching tasks shown', 'Pass'),
    ('8', 'Start Pomodoro', 'Countdown runs, pause/reset works', 'Pass'),
])
caption('Screenshot 1: Landing page with features')
caption('Screenshot 2: Login page')
caption('Screenshot 3: Dashboard with demo data and overdue task')
caption('Screenshot 4: Add task form')
caption('Screenshot 5: Pomodoro timer with presets')

# ============ 7. CONCLUSION ============
doc.add_heading('6. Conclusion and Future Scope', level=1)
p('Smart Study Planner solves a real academic productivity problem. Students can centralize subjects and tasks, mark them done, see their progress, and focus better with a Pomodoro timer. It demonstrates the full web application stack: HTML/CSS, JavaScript, React, Node.js/Express, MongoDB, JWT security, and cloud deployment.')
p('Future scope:')
bullets([
    'Study-hour analytics and weekly charts.',
    'Notifications before deadlines.',
    'Group tasks for study teams.',
    'Calendar view and Google Calendar sync.',
    'Mobile app (PWA) support.',
])

# ============ 8. REFERENCES ============
doc.add_heading('7. References', level=1)
bullets([
    'United Nations, "Sustainable Development Goals – Goal 4", sdgs.un.org.',
    'React documentation, react.dev.',
    'Express.js documentation, expressjs.com.',
    'MongoDB and Mongoose documentation, mongodb.com/docs and mongoosejs.com.',
    'MDN Web Docs – HTML, CSS, JavaScript and HTTP, developer.mozilla.org.',
])

doc.save(r'C:\Users\husai\Desktop\SmartStudyPlanner\PBL_Report_SmartStudyPlanner.docx')
print('DOCX created')
