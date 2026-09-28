import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import studentRoutes from './routes/student.js';
import collegeRoutes from './routes/college.js';
import { verifyToken } from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection failed:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/student', verifyToken, studentRoutes);
app.use('/api/college', verifyToken, collegeRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server running successfully' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
