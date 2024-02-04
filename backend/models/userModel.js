const e = require('express');
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

  const User = mongoose.model('User', userSchema);

  module.exports = {User};