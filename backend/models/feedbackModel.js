const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Feedback Schema
const feedbackSchema = new Schema({
  rating: { type: Number, required: true },
  text: { type: String },
  sessionId: { type: Schema.Types.ObjectId, ref: 'Session', required: true }
}, {timestamps: true});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = {Feedback};