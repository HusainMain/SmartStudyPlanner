const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    due: { type: Date, required: true },
    priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
    completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
