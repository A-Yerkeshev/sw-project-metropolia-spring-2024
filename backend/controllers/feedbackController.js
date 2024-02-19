const { Session } = require('../models/sessionModel');
const { Course } = require('../models/courseModel');
const { Feedback } = require('../models/feedbackModel');
const mongoose = require('mongoose');

// GET all feedbacks of a session in a course
const getAllFeedbacks = async (req, res) => {
  const { courseId, sessionId } = req.params;

  // check if courseId and sessionId are valid
  if (
    !mongoose.Types.ObjectId.isValid(courseId) ||
    !mongoose.Types.ObjectId.isValid(sessionId)
  ) {
    return res.status(400).json({ error: 'Invalid course ID or session ID' });
  }

  try {
    // check if session exists and belongs to the course
    const session = await Session.findOne({ _id: sessionId, course: courseId });
    if (!session) {
      return res.status(404).json({ error: 'Session not found in the course' });
    }

    // retrieve all feedbacks of the session, and populate their "session" and "course" reference
    const feedbacks = await Feedback.find({ session: sessionId })
      .populate({
        path: 'session',
        populate: {
          path: 'course',
        },
      })
      .exec();

    res.status(200).json({ feedbacks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET one feedback of a session in a course
const getOneFeedback = async (req, res) => {
  const { courseId, sessionId, feedbackId } = req.params;

  // check if courseId and sessionId are valid
  if (
    !mongoose.Types.ObjectId.isValid(courseId) ||
    !mongoose.Types.ObjectId.isValid(sessionId) ||
    !mongoose.Types.ObjectId.isValid(feedbackId)
  ) {
    return res
      .status(400)
      .json({ error: 'Invalid course ID, session ID or feedback ID' });
  }

  try {
    // check if session exists and belongs to the course
    const session = await Session.findOne({ _id: sessionId, course: courseId });
    if (!session) {
      return res.status(404).json({ error: 'Session not found in the course' });
    }

    // check if feedback belongs to the session
    const feedback = await Feedback.findOne({
      _id: feedbackId,
      session: sessionId,
    })
      .populate({
        path: 'session',
        populate: {
          path: 'course',
        },
      })
      .exec();

    if (!feedback) {
      return res
        .status(404)
        .json({ error: 'Feedback not found in the session' });
    }

    res.status(200).json({ feedback });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST a feedback to a session in a course
const createFeedback = async (req, res) => {
  const { courseId, sessionId } = req.params;
  const { rating, text, studentId } = req.body;

  // input validation
  if (!rating) {
    return res.status(400).json({ error: 'Missing required field: rating' });
  }

  if (!studentId) {
    return res.status(400).json({ error: 'Missing required field: student id' });
  }

  // check if courseId and sessionId are valid
  if (
    !mongoose.Types.ObjectId.isValid(courseId) ||
    !mongoose.Types.ObjectId.isValid(sessionId)
  ) {
    return res.status(400).json({ error: 'Invalid course ID or session ID' });
  }

  try {
    // check if session exists and belongs to the course
    const session = await Session.findOne({ _id: sessionId, course: courseId });
    if (!session) {
      return res.status(404).json({ error: 'Session not found in the course' });
    }

    // create new feedback and include provided session Id
    const feedback = await Feedback.create({
      rating,
      text,
      session: sessionId,
      studentId
    });

    // include the newly created feedback's Id in the session's "feedbacks" array
    await Session.findByIdAndUpdate(sessionId, {
      $push: { feedbacks: feedback._id },
    });

    res.status(200).json({ feedback });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE one feedback from a session in a course
const deleteFeedback = async (req, res) => {
  const { courseId, sessionId, feedbackId } = req.params;

  // check if courseId and sessionId are valid
  if (
    !mongoose.Types.ObjectId.isValid(courseId) ||
    !mongoose.Types.ObjectId.isValid(sessionId) ||
    !mongoose.Types.ObjectId.isValid(feedbackId)
  ) {
    return res
      .status(400)
      .json({ error: 'Invalid course ID, session ID or feedback ID' });
  }

  try {
    // check if session exists and belongs to the course
    const session = await Session.findOne({ _id: sessionId, course: courseId });
    if (!session) {
      return res.status(404).json({ error: 'Session not found in the course' });
    }

    // check if feedback belongs to the session
    const deletedFeedback = await Feedback.findOneAndDelete({
      _id: feedbackId,
      session: sessionId,
    });

    if (!deletedFeedback) {
      return res
        .status(404)
        .json({ error: 'Feedback not found in the session' });
    }

    // remove the deleted feedback's Id from the session's "feedbacks" array
    await Session.findByIdAndUpdate(sessionId, {
      $pull: { feedbacks: feedbackId },
    });

    res.status(200).json({ deletedFeedback });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllFeedbacks,
  getOneFeedback,
  createFeedback,
  deleteFeedback,
};
