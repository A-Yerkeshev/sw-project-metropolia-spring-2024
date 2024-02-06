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

        //validation
        if (!firstName || !lastName || !email || !password) {
            throw new Error('All fields are required');
        }


        const exists = await this.findOne({ email });
        if (exists) {
            throw new Error('User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await this.create({ firstName, lastName, email, password: hash});

        return user;
    };

    //static login method
    userSchema.statics.login = async function (email, password) {

        //validation
        if (!email || !password) {
            throw new Error('All fields are required');
        }

        const user = await this.findOne({ email });
        if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {
                return user;
            }
            throw new Error('Incorrect password');
        }
        throw new Error('Incorrect email');
    };

  const User = mongoose.model('User', userSchema);

  module.exports = {User};