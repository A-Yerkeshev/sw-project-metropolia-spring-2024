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
router.get('/:courseId/session', getAllSessions);

// GET one session
router.get('/:courseId/session/:sessionId', getOneSession);

// POST one event
router.post('/:courseId/session', createSession);

// DELETE one event
router.delete('/:courseId/session/:sessionId', deleteSession);

// UPDATE one event
router.patch('/:courseId/session/:sessionId', updateSession);

module.exports = router;
