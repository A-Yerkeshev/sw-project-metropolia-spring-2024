const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Feedback Schema
const feedbackSchema = new Schema({
  rating: { type: Number, required: true },
  text: { type: String }
}, {timestamps: true});

// Course Schema
const courseSchema = new Schema({
  name: { type: String, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  teachers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  sessions: [{ type: Schema.Types.ObjectId, ref: 'Session' }]
}, {timestamps: true});

// Define models

const Feedback = mongoose.model('Feedback', feedbackSchema);
const Course = mongoose.model('Course', courseSchema);

module.exports = {
  Feedback,
  Course
};
