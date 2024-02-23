const express = require('express');
const {
  getAllFeedbacks,
  getOneFeedback,
  createFeedback,
  deleteFeedback,
} = require('../controllers/feedbackController');

const router = express.Router();

// GET all feedbacks
router.get('/', getAllFeedbacks);

// GET one feedback
router.get('/:feedbackId', getOneFeedback);

// POST one feedback
router.post('/', createFeedback);

// DELETE one feedback
router.delete('/:feedbackId', deleteFeedback);

module.exports = router;
