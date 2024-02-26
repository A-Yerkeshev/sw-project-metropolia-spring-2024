const { Session } = require("../models/sessionModel");
const { Course } = require("../models/courseModel");
const mongoose = require("mongoose");
const { Feedback } = require("../models/feedbackModel");

// GET all sessions of a course by courseId
const getAllSessions = async (req, res) => {
  // retrieve courseId from parameter
  const { courseId } = req.params;

  // check if courseId is valid
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ error: "Invalid course ID" });
  }

  try {
    // check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // retrieve all sessions of this course, and populate the sessions' course and feedbacks
    const sessions = await Session.find({ course: courseId })
      .populate("course")
      // .populate({
      //   path: 'feedbacks',
      //   options: { sort: { createdAt: -1 } },
      //   populate: {
      //     path: 'session',
      //   },
      // })
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json({ sessions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET one session by its _id and its courseId property
const getOneSession = async (req, res) => {
  const { courseId, sessionId } = req.params;

  // check if courseId is valid
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ error: "Invalid course ID" });
  }

  // check if sessionId is valid
  if (!mongoose.Types.ObjectId.isValid(sessionId)) {
    return res.status(400).json({ error: "Invalid session ID" });
  }

  try {
    // check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // retrieving the session and populate its course and feedbacks
    const session = await Session.findById(sessionId)
      .populate("course")
      // .populate({
      //   path: 'feedbacks',
      //   options: { sort: { createdAt: -1 } },
      //   populate: {
      //     path: 'session',
      //   },
      // })
      .sort({ createdAt: -1 })
      .exec();

    // check if session exists
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    } else if (session.course._id != courseId) {
      // check if the session belongs to the course
      return res
        .status(404)
        .json({ error: "Session does not belong to the course" });
    }

    res.status(200).json({ session });
  } catch (error) {
    console.log("Error fetching event: ", error);

    res.status(500).json({ error: "Server error" });
  }
};

// POST one session
const createSession = async (req, res) => {
  const { courseId } = req.params;
  const { name, description, start, end } = req.body;

  // check if courseId is valid
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ error: "Invalid course ID" });
  }

  // Input validation
  let emptyFields = [];
  if (!name) emptyFields.push("name");
  if (!description) emptyFields.push("description");
  if (!start) emptyFields.push("start");
  if (!end) emptyFields.push("end");

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: `Missing required fields: ${emptyFields.join(", ")}` });
  }

  try {
    // check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // create new session and include provided course Id
    const session = await Session.create({
      name,
      description,
      start,
      end,
      course: courseId,
    });

    // include the newly created session's Id in the course's "sessions" array
    await Course.findByIdAndUpdate(courseId, {
      $push: { sessions: session._id },
    });

    res.status(200).json({ session });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE one session
const deleteSession = async (req, res) => {
  const { courseId, sessionId } = req.params;

  // check if courseId is valid
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ error: "Invalid course ID" });
  }

  // check if sessionId is valid
  if (!mongoose.Types.ObjectId.isValid(sessionId)) {
    return res.status(400).json({ error: "Invalid session ID" });
  }

  try {
    // check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const deletedSession = await Session.findById(sessionId);

    // check if the session exists
    if (!deletedSession) {
      return res.status(404).json({ error: "Session not found" });
    } else if (deletedSession.course != courseId) {
      // check if the session belongs to the course
      return res
        .status(404)
        .json({ error: "Session does not belong to the course" });
    }

    // delete all feedbacks associated with the session
    await Feedback.deleteMany({ session: sessionId });

    //delete the session itself
    await Session.findByIdAndDelete(sessionId);

    // remove the deleted session's Id from the course's "sessions" array
    await Course.findByIdAndUpdate(courseId, {
      $pull: { sessions: sessionId },
    });

    res.status(200).json({ deletedSession });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE one session
const updateSession = async (req, res) => {
  const { courseId, sessionId } = req.params;
  const { name, description, start, end } = req.body;

  // check if courseId is valid
  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ error: "Invalid course ID" });
  }

  // check if sessionId is valid
  if (!mongoose.Types.ObjectId.isValid(sessionId)) {
    return res.status(400).json({ error: "Invalid session ID" });
  }

  try {
    // check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // find session by its Id and update using info from req body
    const updatedSession = await Session.findByIdAndUpdate(
      sessionId,
      { name, description, start, end },
      { new: true }
    );

    // check if the session exists
    if (!updatedSession) {
      return res.status(404).json({ error: "Session not found" });
    } else if (updatedSession.course != courseId) {
      // check if the session belongs to the course
      return res
        .status(404)
        .json({ error: "Session does not belong to the course" });
    }

    res.status(200).json({ updatedSession });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllSessions,
  getOneSession,
  createSession,
  deleteSession,
  updateSession,
};
