const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// User Schema
const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
  }, {timestamps: true});


  //static signup method
    userSchema.statics.signup = async function (firstName, lastName, email, password) {

        const exists = await this.findOne({ email });
        if (exists) {
            throw new Error('User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await this.create({ firstName, lastName, email, password: hash});

        return user;
    };

  const User = mongoose.model('User', userSchema);

  module.exports = {User};