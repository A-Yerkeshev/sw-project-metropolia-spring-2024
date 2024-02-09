const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Course Schema
const courseSchema = new Schema({
  name: { type: String, required: true },
  students: [{ type: Number }],
  teachers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {timestamps: true});

const Course = mongoose.model('Course', courseSchema);

module.exports = {Course};
