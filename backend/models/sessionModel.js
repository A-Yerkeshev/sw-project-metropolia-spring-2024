const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Session Schema
const sessionSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    // feedbacks: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }],
  },
  { timestamps: true }
);

const Session = mongoose.model('Session', sessionSchema);

module.exports = { Session };
