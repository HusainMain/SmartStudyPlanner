const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();
router.use(auth);

// GET /api/tasks
router.get('/', async (req, res) => {
    const tasks = await Task.find({ user: req.user.id }).sort({ due: 1 });
    res.json(tasks);
});

// POST /api/tasks
router.post('/', async (req, res) => {
    try {
        const { name, subject, due, priority } = req.body;
        if (!name || !name.trim() || name.length > 100) {
            return res.status(400).json({ message: 'Task name required (max 100 chars)' });
        }
        if (!subject || !subject.trim() || subject.length > 50) {
            return res.status(400).json({ message: 'Subject required (max 50 chars)' });
        }
        if (!due || isNaN(new Date(due))) {
            return res.status(400).json({ message: 'Valid due date required' });
        }
        const task = await Task.create({
            name: name.trim(),
            subject: subject.trim(),
            due,
            priority,
            completed: req.body.completed === true,
            user: req.user.id,
        });
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /api/tasks/:id
router.put('/:id', async (req, res) => {
    try {
        // whitelist editable fields — never let client reassign user
        const updates = {};
        for (const field of ['name', 'subject', 'due', 'priority', 'completed']) {
            if (req.body[field] !== undefined) updates[field] = req.body[field];
        }
        if (updates.name !== undefined) {
            if (!updates.name.trim() || updates.name.length > 100) {
                return res.status(400).json({ message: 'Task name required (max 100 chars)' });
            }
            updates.name = updates.name.trim();
        }
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            updates,
            { returnDocument: 'after', runValidators: true }
        );
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
});

module.exports = router;
