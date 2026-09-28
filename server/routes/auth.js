import express from 'express';
import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';

const router = express.Router();

// Register Student
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, registrationNumber, rollNumber, department, semester, college, phoneNumber, dateOfBirth, gender, address } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const existingRegNo = await Student.findOne({ registrationNumber });
    if (existingRegNo) {
      return res.status(400).json({ message: 'Registration number already exists' });
    }

    // Create new student
    const student = new Student({
      name,
      email,
      password,
      registrationNumber,
      rollNumber,
      department,
      semester,
      college,
      phoneNumber,
      dateOfBirth,
      gender,
      address,
      role: 'student'
    });

    await student.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: student._id, email: student.email, role: 'student' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Student registered successfully',
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        department: student.department
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// Login Student
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find student
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if student is active
    if (!student.isActive) {
      return res.status(403).json({ message: 'Account is deactivated' });
    }

    // Verify password
    const isPasswordValid = await student.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: student._id, email: student.email, role: 'student' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        department: student.department,
        semester: student.semester,
        college: student.college
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

export default router;
