const { Course } = require('../models/courseModel');
const mongoose = require('mongoose');
const { Session } = require('../models/sessionModel');
const { Feedback } = require('../models/feedbackModel');

// GET all courses
const getAllCourses = async (req, res) => {
  try {
    // retrieve all courses, and populate their sessions and sessions' feedbacks
    const courses = await Course.find({})
      .populate({
        path: 'sessions',
        options: { sort: { createdAt: -1 } },
        populate: {
          path: 'feedbacks',
          options: { sort: { createdAt: -1 } },
        },
      })
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET one course
const getOneCourse = async (req, res) => {
  const { courseId } = req.params;

  // check if courseId is valid
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ error: 'Invalid course ID' });
  }

  try {
    // retrieve one course, and populate their sessions and sessions' feedbacks
    const course = await Course.findById(courseId)
      .populate({
        path: 'sessions',
        options: { sort: { createdAt: -1 } },
        populate: {
          path: 'feedbacks',
          options: { sort: { createdAt: -1 } },
        },
      })
      .exec();

    // check if the course exists
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json({ course });
  } catch (error) {
    console.log('Error fetching event: ', error);

    res.status(500).json({ error: 'Server error' });
  }
};

// POST one course
const createCourse = async (req, res) => {
  const { name, description, students } = req.body;

  // Input validation
  let emptyFields = [];
  if (!name) emptyFields.push('name');
  if (!description) emptyFields.push('description');

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: `Missing required fields: ${emptyFields.join(', ')}` });
  }

  try {
    // create course entry with provided info in req body
    const course = await Course.create({ name, description, students });

    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE one course
const deleteCourse = async (req, res) => {
  const { courseId } = req.params;

  // check if courseId is valid
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ error: 'Invalid course ID' });
  }

  try {
    // find the course by its Id
    const deletedCourse = await Course.findById(courseId);
    if (!deletedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // delete all sessions associated with the course
    await Session.deleteMany({ _id: { $in: deletedCourse.sessions } });

    // delete all feedbacks associated with the sessions
    await Feedback.deleteMany({ session: { $in: deletedCourse.sessions } });

    // delete the course itself
    await Course.deleteOne({ _id: courseId });

    res.status(200).json({ deletedCourse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE one course
const updateCourse = async (req, res) => {
  const { courseId } = req.params;
  const { name, description, students } = req.body;

  // check if courseId is valid
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ error: 'Invalid course ID' });
  }

  try {
    // find the course by its Id and update using info from req body
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { name, description, students },
      { new: true }
    );

    // check if the course exists
    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json({ updatedCourse });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllCourses,
  getOneCourse,
  createCourse,
  deleteCourse,
  updateCourse,
};
