const { Session } = require('../models/sessionModel');
const { Feedback } = require('../models/feedbackModel');
const mongoose = require('mongoose');
const { Course } = require('../models/courseModel');

// GET all feedbacks of a session in a course
const getAllFeedbacks = async (req, res) => {
  const { sessionId } = req.query;

  // check if and sessionId are valid
  if (!mongoose.Types.ObjectId.isValid(sessionId)) {
    return res.status(400).json({ error: 'Invalid session ID' });
  }

  try {
    // check if session exists and belongs to the course
    const session = await Session.findOne({ _id: sessionId });
    if (!session) {
      return res.status(404).json({ error: 'Session not found in the course' });
    }

    // retrieve all feedbacks of the session, and populate their "session" and "course" reference
    const feedbacks = await Feedback.find({ sessionId: sessionId })
      .populate({
        path: 'sessionId',
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
  const { feedbackId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(feedbackId)) {
    return res.status(400).json({ error: 'Invalid feedback ID' });
  }

  try {
    // check if feedback belongs to the session
    const feedback = await Feedback.findOne({
      _id: feedbackId,
    });
    // .populate({
    //   path: 'session',
    //   populate: {
    //     path: 'course',
    //   },
    // })
    // .exec();

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
  const { sessionId, rating, text, studentId } = req.body;

  // input validation
  if (!rating) {
    return res.status(400).json({ error: 'Missing required field: rating' });
  }

  if (!studentId) {
    return res
      .status(400)
      .json({ error: 'Missing required field: student id' });
  }

  // check if and sessionId is valid
  if (!mongoose.Types.ObjectId.isValid(sessionId)) {
    return res.status(400).json({ error: 'Invalid session ID' });
  }

  try {
    // check if session exists and belongs to the course
    const session = await Session.findOne({ _id: sessionId });
    if (!session) {
      return res.status(404).json({ error: 'Session not found in the course' });
    }

    // check that session has not expired yet
    // if (Date.now() > session.end.getTime()) {
    //   return res.status(400).json({ error: "Session has expired. You cannot submit feedback anymore." });
    // }

    // check that student is enrolled for this course
    const course = await Course.findOne({ _id: session.course });
    console.log(
      `Checking for studentId ${studentId} from the studentId list of course ${course._id}`
    );
    if (!course.students.includes(studentId)) {
      return res
        .status(400)
        .json({ error: 'You are not enrolled to this course.' });
    }

    // check that user has not submitted feedback for this session yet
    console.log(
      `Checking existing feedback for studentId: ${studentId}, sessionId: ${sessionId}`
    );
    const existingFeedback = await Feedback.findOne({
      studentId: studentId,
      sessionId: sessionId,
    });

    if (existingFeedback) {
      return res
        .status(400)
        .json({ error: 'You already submitted feedback for this session.' });
    }

    // create new feedback and include provided session Id
    const feedback = await Feedback.create({
      rating,
      text,
      sessionId,
      studentId,
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
  const { feedbackId } = req.params;

  // check if and sessionId are valid
  if (!mongoose.Types.ObjectId.isValid(feedbackId)) {
    return res.status(400).json({ error: 'Invalid feedback ID' });
  }

  try {
    // check if feedback belongs to the session
    const deletedFeedback = await Feedback.findOneAndDelete({
      _id: feedbackId,
    });

    if (!deletedFeedback) {
      return res
        .status(404)
        .json({ error: 'Feedback not found in the session' });
    }

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
