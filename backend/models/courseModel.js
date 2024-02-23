const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Course Schema
const courseSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    students: [{ type: Number }],
    teacherId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sessions: [{ type: Schema.Types.ObjectId, ref: 'Session' }],
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);

module.exports = { Course };
