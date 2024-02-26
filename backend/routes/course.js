const express = require('express');
const {
  getAllCourses,
  getOneCourse,
  createCourse,
  deleteCourse,
  updateCourse,
} = require('../controllers/courseController');

const router = express.Router();

// GET all courses
router.get('/', getAllCourses);

// GET one course
router.get('/:courseId', getOneCourse);

// POST one course
router.post('/', createCourse);

// DELETE one course
router.delete('/:courseId', deleteCourse);

// UPDATE one course
router.patch('/:courseId', updateCourse);

module.exports = router;
