const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Feedback Schema
const feedbackSchema = new Schema({
  rating: { type: Number, required: true },
  text: { type: String }
}, {timestamps: true});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = {Feedback};