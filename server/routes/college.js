import express from 'express';
import College from '../models/College.js';
import Student from '../models/Student.js';

const router = express.Router();

// Get all colleges (students can see all colleges)
router.get('/all', async (req, res) => {
  try {
    const colleges = await College.find()
      .select('name code location.city location.state contactInfo logo description established studentCount');

    res.json(colleges);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch colleges', error: error.message });
  }
});

// Get specific college details
router.get('/:collegeId', async (req, res) => {
  try {
    const college = await College.findById(req.params.collegeId);

    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }

    res.json(college);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch college details', error: error.message });
  }
});

// Get student's college details
router.get('/my/college', async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).populate('college');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student.college);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch college details', error: error.message });
  }
});

// Get college departments
router.get('/:collegeId/departments', async (req, res) => {
  try {
    const college = await College.findById(req.params.collegeId).select('departments name');

    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }

    res.json({
      collegeName: college.name,
      departments: college.departments
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch departments', error: error.message });
  }
});

// Get college placements info
router.get('/:collegeId/placements', async (req, res) => {
  try {
    const college = await College.findById(req.params.collegeId)
      .select('name placements');

    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }

    res.json({
      collegeName: college.name,
      placements: college.placements
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch placements data', error: error.message });
  }
});

// Get college facilities
router.get('/:collegeId/facilities', async (req, res) => {
  try {
    const college = await College.findById(req.params.collegeId)
      .select('name facilities libraryInfo hostel sports clubs');

    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }

    res.json({
      collegeName: college.name,
      facilities: college.facilities,
      library: college.libraryInfo,
      hostel: college.hostel,
      sports: college.sports,
      clubs: college.clubs
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch facilities', error: error.message });
  }
});

export default router;
