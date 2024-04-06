const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Course Schema
const courseSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    sessions: [{ type: Schema.Types.ObjectId, ref: 'Session' }],
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);

module.exports = { Course };
