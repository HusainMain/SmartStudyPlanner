export default function TaskCard({ task, onToggle, onDelete, onEdit }) {
    const overdue = !task.completed && new Date(task.due) < new Date();
    return (
        <div className={`task-item ${overdue ? 'overdue' : ''}`}>
            <span className="task-name">{task.name} <small>({task.subject} · {task.priority})</small></span>
            <span className={`task-due ${overdue ? 'due-overdue' : ''}`}>
                Due: {new Date(task.due).toLocaleDateString()} {overdue && '(overdue)'}
            </span>
            <span className={`task-status ${task.completed ? 'completed' : 'pending'}`}>
                {task.completed ? 'Done' : 'Pending'}
            </span>
            <button className="task-toggle" onClick={() => onToggle(task)}>{task.completed ? 'Undo' : 'Complete'}</button>
            <button className="task-edit" onClick={() => onEdit(task)}>Edit</button>
            <button className="task-delete" onClick={() => { if (window.confirm('Delete this task?')) onDelete(task._id); }}>Delete</button>
        </div>
    );
}
