import { useState, useEffect, useCallback } from 'react';
import { api } from '../api';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import Timer from '../components/Timer';
import ProgressBar from '../components/ProgressBar';

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showTimer, setShowTimer] = useState(false);
    const [editing, setEditing] = useState(null);
    const [filterSubject, setFilterSubject] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');
    const [userName, setUserName] = useState('');

    const loadTasks = useCallback(async () => {
        try {
            setLoading(true);
            const data = await api('/tasks');
            setTasks(data);
            setError('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const loadSubjects = useCallback(async () => {
        try {
            const data = await api('/subjects');
            setSubjects(data.map((s) => s.name));
        } catch { /* subjects are optional for display */ }
    }, []);

    useEffect(() => {
        loadTasks();
        loadSubjects();
        const stored = JSON.parse(localStorage.getItem('user') || '{}');
        if (stored.name) setUserName(stored.name);
        else api('/auth/me').then((u) => setUserName(u.name)).catch(() => {});
    }, [loadTasks, loadSubjects]);

    async function addTask(task) {
        await api('/tasks', { method: 'POST', body: JSON.stringify(task) });
        setShowForm(false);
        loadTasks();
    }

    async function updateTask(updates) {
        await api(`/tasks/${editing._id}`, { method: 'PUT', body: JSON.stringify(updates) });
        setEditing(null);
        loadTasks();
    }

    async function toggleTask(task) {
        await api(`/tasks/${task._id}`, { method: 'PUT', body: JSON.stringify({ completed: !task.completed }) });
        loadTasks();
    }

    async function deleteTask(id) {
        await api(`/tasks/${id}`, { method: 'DELETE' });
        loadTasks();
    }

    async function addSubject() {
        const name = window.prompt('Subject name:');
        if (!name) return;
        try {
            await api('/subjects', { method: 'POST', body: JSON.stringify({ name }) });
            loadSubjects();
        } catch (err) {
            alert(err.message);
        }
    }

    const allSubjects = [...new Set([...subjects, ...tasks.map((t) => t.subject)])];
    let visible = tasks;
    if (filterSubject !== 'all') visible = visible.filter((t) => t.subject === filterSubject);
    if (filterPriority !== 'all') visible = visible.filter((t) => t.priority === filterPriority);

    const completed = tasks.filter((t) => t.completed).length;
    const percent = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

    return (
        <main className="dashboard">
            <h1>Welcome, {userName || 'Student'}!</h1>

            <section className="stats">
                <div className="stat-card"><h3>📋 Total Tasks</h3><p className="stat-number">{tasks.length}</p></div>
                <div className="stat-card"><h3>✅ Completed</h3><p className="stat-number">{completed}</p></div>
                <div className="stat-card"><h3>⏳ Pending</h3><p className="stat-number">{tasks.length - completed}</p></div>
                <div className="stat-card"><h3>📚 Subjects</h3><p className="stat-number">{allSubjects.length}</p></div>
            </section>

            <ProgressBar percent={percent} />

            <section className="quick-actions">
                <h2>Quick Actions</h2>
                <div className="action-buttons">
                    <button onClick={() => setShowForm(!showForm)}>+ Add Task</button>
                    <button onClick={addSubject}>+ Add Subject</button>
                    <button onClick={() => setShowTimer(!showTimer)}>Start Timer</button>
                </div>
            </section>

            {showForm && <section className="task-form-section"><h2>Add New Task</h2><TaskForm onSubmit={addTask} /></section>}
            {editing && <section className="task-form-section"><h2>Edit Task</h2><TaskForm onSubmit={updateTask} initial={editing} submitLabel="Save" /></section>}
            {showTimer && <Timer />}

            <section className="filters">
                <h2>Recent Tasks</h2>
                <div className="filter-controls">
                    <select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
                        <option value="all">All Subjects</option>
                        {allSubjects.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
                        <option value="all">All Priorities</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                    <button type="button" onClick={() => setTasks([...tasks].sort((a, b) => new Date(a.due) - new Date(b.due)))}>Sort by Deadline</button>
                </div>
            </section>

            {loading && <p>Loading tasks...</p>}
            {error && <p style={{ color: '#dc2626' }}>{error}</p>}

            <div className="task-list">
                {visible.length === 0 && !loading && <p>No tasks yet. Click "+ Add Task" to create one.</p>}
                {visible.map((task) => (
                    <TaskCard key={task._id} task={task} onToggle={toggleTask} onDelete={deleteTask} onEdit={setEditing} />
                ))}
            </div>
        </main>
    );
}
