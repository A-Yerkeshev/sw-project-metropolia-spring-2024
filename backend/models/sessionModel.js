const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Session Schema
const sessionSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true }
  }, {timestamps: true});

const Session = mongoose.model('Session', sessionSchema);

module.exports = {Session};