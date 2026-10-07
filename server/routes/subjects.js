const express = require('express');
const Subject = require('../models/Subject');
const auth = require('../middleware/auth');

const router = express.Router();
router.use(auth);

// GET /api/subjects
router.get('/', async (req, res) => {
    const subjects = await Subject.find({ user: req.user.id });
    res.json(subjects);
});

// POST /api/subjects
router.post('/', async (req, res) => {
    try {
        const name = (req.body.name || '').trim();
        if (!name || name.length > 50) {
            return res.status(400).json({ message: 'Subject name required (max 50 chars)' });
        }
        const subject = await Subject.create({ name, user: req.user.id });
        res.status(201).json(subject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /api/subjects/:id
router.delete('/:id', async (req, res) => {
    const subject = await Subject.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!subject) return res.status(404).json({ message: 'Subject not found' });
    res.json({ message: 'Subject deleted' });
});

module.exports = router;
