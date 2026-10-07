// Smart Study Planner - Phase 2 (interactivity) + Phase 3 (API integration)

const API = 'http://localhost:3000/api';
const $ = (id) => document.getElementById(id);
let cachedTasks = [];

/* ---------- Auth forms ---------- */
function setupAuthValidation(formId, path, isRegister) {
    const form = $(formId);
    if (!form) return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrors(form);
        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[name="password"]').value;
        let valid = true;

        if (!email.includes('@') || !email.includes('.')) {
            showError(form.querySelector('input[type="email"]'), 'Enter a valid email');
            valid = false;
        }
        if (password.length < 6) {
            showError(form.querySelector('input[name="password"]'), 'Password must be at least 6 characters');
            valid = false;
        }
        if (isRegister) {
            const name = form.querySelector('input[name="fullname"]').value;
            const confirm = form.querySelector('input[name="confirm-password"]').value;
            if (name.trim().length < 2) valid = (showError(form.querySelector('input[name="fullname"]'), 'Enter your full name'), false);
            if (confirm !== password) { showError(form.querySelector('input[name="confirm-password"]'), 'Passwords do not match'); valid = false; }
        }
        if (!valid) return;

        const body = isRegister
            ? { name: form.querySelector('input[name="fullname"]').value, email, password }
            : { email, password };

        try {
            const res = await fetch(`${API}/auth/${path}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = await res.json();
            if (!res.ok) {
                alert(data.message || 'Auth failed');
                return;
            }
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'dashboard.html';
        } catch {
            alert('Cannot reach server. Is the backend running on port 3000?');
        }
    });
}

function showError(input, msg) {
    const err = document.createElement('small');
    err.className = 'error-msg';
    err.style.color = '#dc2626';
    err.textContent = msg;
    input.parentElement.appendChild(err);
}

function clearErrors(form) {
    form.querySelectorAll('.error-msg').forEach((el) => el.remove());
}

/* ---------- Tasks via API ---------- */
function authHeaders() {
    return { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` };
}

async function fetchTasks() {
    try {
        const res = await fetch(`${API}/tasks`, { headers: authHeaders() });
        if (res.status === 401) { window.location.href = 'login.html'; return []; }
        cachedTasks = await res.json();
    } catch {
        alert('Cannot reach server. Is the backend running?');
    }
    return cachedTasks;
}

async function renderTasks() {
    const list = $('task-list');
    if (!list) return;
    let tasks = await fetchTasks();

    const subjFilter = $('filter-subject') ? $('filter-subject').value : 'all';
    const prioFilter = $('filter-priority') ? $('filter-priority').value : 'all';
    if (subjFilter !== 'all') tasks = tasks.filter((t) => t.subject === subjFilter);
    if (prioFilter !== 'all') tasks = tasks.filter((t) => t.priority === prioFilter);

    refreshSubjectFilter();

    list.innerHTML = '';
    tasks.forEach((task) => {
        const item = document.createElement('div');
        item.className = 'task-item';
        item.innerHTML = `
            <span class="task-name">${task.name} <small>(${task.subject} · ${task.priority})</small></span>
            <span class="task-due">Due: ${new Date(task.due).toLocaleDateString()}</span>
            <span class="task-status ${task.completed ? 'completed' : 'pending'}">${task.completed ? 'Done' : 'Pending'}</span>
            <button class="task-toggle" data-id="${task._id}" data-done="${task.completed}">${task.completed ? 'Undo' : 'Complete'}</button>
            <button class="task-delete" data-id="${task._id}">Delete</button>
        `;
        list.appendChild(item);
    });

    list.querySelectorAll('.task-toggle').forEach((btn) =>
        btn.addEventListener('click', async () => {
            await fetch(`${API}/tasks/${btn.dataset.id}`, {
                method: 'PUT',
                headers: authHeaders(),
                body: JSON.stringify({ completed: btn.dataset.done !== 'true' }),
            });
            renderTasks();
        })
    );
    list.querySelectorAll('.task-delete').forEach((btn) =>
        btn.addEventListener('click', async () => {
            await fetch(`${API}/tasks/${btn.dataset.id}`, { method: 'DELETE', headers: authHeaders() });
            renderTasks();
        })
    );
    updateStats();
}

function refreshSubjectFilter() {
    const sel = $('filter-subject');
    if (!sel) return;
    const subjects = [...new Set(cachedTasks.map((t) => t.subject))];
    const current = sel.value;
    sel.innerHTML = '<option value="all">All Subjects</option>' +
        subjects.map((s) => `<option value="${s}">${s}</option>`).join('');
    sel.value = subjects.includes(current) ? current : 'all';
}

function updateStats() {
    const tasks = cachedTasks;
    const completed = tasks.filter((t) => t.completed).length;
    const statNums = document.querySelectorAll('.stat-number');
    if (statNums.length >= 3) {
        statNums[0].textContent = tasks.length;
        statNums[1].textContent = completed;
        statNums[2].textContent = tasks.length - completed;
    }
    const fill = document.querySelector('.progress-fill');
    if (fill) {
        const pct = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
        fill.style.width = pct + '%';
        fill.textContent = pct + '%';
    }
}

/* ---------- Pomodoro Timer ---------- */
let timerInterval = null;
let secondsLeft = 25 * 60;

function updateTimerDisplay() {
    const m = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
    const s = String(secondsLeft % 60).padStart(2, '0');
    if ($('timer-display')) $('timer-display').textContent = `${m}:${s}`;
}

function setupTimer() {
    if (!$('timer-section')) return;
    $('btn-timer').addEventListener('click', () => {
        const sec = $('timer-section');
        sec.style.display = sec.style.display === 'none' ? 'block' : 'none';
    });
    $('timer-start').addEventListener('click', () => {
        if (timerInterval) return;
        timerInterval = setInterval(() => {
            secondsLeft--;
            updateTimerDisplay();
            if (secondsLeft <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                alert('Pomodoro complete! Take a 5-minute break.');
            }
        }, 1000);
    });
    $('timer-pause').addEventListener('click', () => { clearInterval(timerInterval); timerInterval = null; });
    $('timer-reset').addEventListener('click', () => {
        clearInterval(timerInterval);
        timerInterval = null;
        secondsLeft = 25 * 60;
        updateTimerDisplay();
    });
}

/* ---------- Dashboard ---------- */
function setupDashboard() {
    if (!$('task-form-section')) return;

    if (!localStorage.getItem('token')) {
        window.location.href = 'login.html';
        return;
    }
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const h1 = document.querySelector('.dashboard h1');
    if (h1 && user.name) h1.textContent = `Welcome, ${user.name}!`;

    $('btn-add-task').addEventListener('click', () => {
        const sec = $('task-form-section');
        sec.style.display = sec.style.display === 'none' ? 'block' : 'none';
    });
    $('btn-add-subject').addEventListener('click', async () => {
        const name = prompt('Subject name:');
        if (name) {
            await fetch(`${API}/subjects`, { method: 'POST', headers: authHeaders(), body: JSON.stringify({ name }) });
            alert(`Subject "${name}" added.`);
        }
    });
    $('task-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await fetch(`${API}/tasks`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify({
                name: $('task-name').value,
                subject: $('task-subject').value,
                due: $('task-due').value,
                priority: $('task-priority').value,
            }),
        });
        e.target.reset();
        $('task-form-section').style.display = 'none';
        renderTasks();
    });
    $('filter-subject').addEventListener('change', renderTasks);
    $('filter-priority').addEventListener('change', renderTasks);
    $('btn-sort-deadline').addEventListener('click', () => {
        cachedTasks.sort((a, b) => new Date(a.due) - new Date(b.due));
        renderTasks();
    });

    renderTasks();
    setupTimer();
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
    setupAuthValidation('login-form', 'login', false);
    setupAuthValidation('register-form', 'register', true);
    setupDashboard();
});
