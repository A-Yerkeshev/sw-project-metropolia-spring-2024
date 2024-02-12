const express = require('express');
const {
  getAllFeedbacks,
  getOneFeedback,
  createFeedback,
  deleteFeedback,
} = require('../controllers/feedbackController');

const router = express.Router();

// GET all feedbacks
router.get('/:courseId/session/:sessionId/feedback', getAllFeedbacks);

// GET one feedback
router.get(
  '/:courseId/session/:sessionId/feedback/:feedbackId',
  getOneFeedback
);

// POST one feedback
router.post('/:courseId/session/:sessionId/feedback', createFeedback);

// DELETE one feedback
router.delete(
  '/:courseId/session/:sessionId/feedback/:feedbackId',
  deleteFeedback
);

module.exports = router;
