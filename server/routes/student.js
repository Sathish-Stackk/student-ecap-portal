import express from 'express';
import Student from '../models/Student.js';

const router = express.Router();

// Get student profile
router.get('/profile', async (req, res) => {
  try {
    const student = await Student.findById(req.student.id)
      .select('-password')
      .populate('college', 'name code location contactInfo');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
  }
});

// Update student profile
router.put('/profile', async (req, res) => {
  try {
    const { name, phoneNumber, dateOfBirth, gender, address } = req.body;

    const student = await Student.findByIdAndUpdate(
      req.student.id,
      { name, phoneNumber, dateOfBirth, gender, address },
      { new: true }
    ).select('-password');

    res.json({ message: 'Profile updated successfully', student });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
});

// Get student dashboard info
router.get('/dashboard', async (req, res) => {
  try {
    const student = await Student.findById(req.student.id)
      .populate('college', 'name code placement facilities placements');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({
      name: student.name,
      registrationNumber: student.registrationNumber,
      rollNumber: student.rollNumber,
      department: student.department,
      semester: student.semester,
      college: student.college,
      email: student.email
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch dashboard', error: error.message });
  }
});

export default router;
