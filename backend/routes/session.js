const express = require('express');
const {
  getAllSessions,
  getOneSession,
  createSession,
  deleteSession,
  updateSession,
} = require('../controllers/sessionController');

const router = express.Router();

// GET all sessions
router.get('/:courseId', getAllSessions);

// GET one session
router.get('/:courseId/:sessionId', getOneSession);

// POST one event
router.post('/:courseId', createSession);

// DELETE one event
router.delete('/:courseId/:sessionId', deleteSession);

// UPDATE one event
router.patch('/:courseId/:sessionId', updateSession);

module.exports = router;
