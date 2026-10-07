import { useState, useEffect } from 'react';

export default function TaskForm({ onSubmit, initial, submitLabel = 'Add' }) {
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [due, setDue] = useState('');
    const [priority, setPriority] = useState('medium');

    useEffect(() => {
        if (initial) {
            setName(initial.name);
            setSubject(initial.subject);
            setDue(initial.due ? initial.due.slice(0, 10) : '');
            setPriority(initial.priority || 'medium');
        }
    }, [initial]);

    async function handleSubmit(e) {
        e.preventDefault();
        await onSubmit({ name, subject, due, priority });
        if (!initial) {
            setName(''); setSubject(''); setDue(''); setPriority('medium');
        }
    }

    return (
        <form id="task-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Task name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} />
            <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required maxLength={50} />
            <input type="date" value={due} onChange={(e) => setDue(e.target.value)} required />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
            </select>
            <button type="submit">{submitLabel}</button>
        </form>
    );
}
