const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: Number, required: true }
}, {timestamps: true});

// Feedback Schema
const feedbackSchema = new Schema({
  rating: { type: Number, required: true },
  text: { type: String }
}, {timestamps: true});

// Session Schema
const sessionSchema = new Schema({
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  feedbacks: [{ type: Schema.Types.ObjectId, ref: 'Feedback', required: true }]
}, {timestamps: true});

// Course Schema
const courseSchema = new Schema({
  name: { type: String, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  teachers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  sessions: [{ type: Schema.Types.ObjectId, ref: 'Session' }]
}, {timestamps: true});

// Define models
const User = mongoose.model('User', userSchema);
const Feedback = mongoose.model('Feedback', feedbackSchema);
const Session = mongoose.model('Session', sessionSchema);
const Course = mongoose.model('Course', courseSchema);

module.exports = {
  User,
  Feedback,
  Session,
  Course
};
