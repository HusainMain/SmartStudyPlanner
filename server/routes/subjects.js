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

module.exports = router;
