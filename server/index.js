require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const subjectRoutes = require('./routes/subjects');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Smart Study Planner API' }));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/subjects', subjectRoutes);

mongoose
    .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
        console.log('MongoDB connected');
        app.listen(process.env.PORT || 10000, () => console.log(`Server running on http://localhost:${process.env.PORT || 10000}`));
    })
    .catch((err) => console.error('DB connection error:', err));

process.on('SIGINT', async () => {
    await mongoose.disconnect();
    process.exit(0);
});
