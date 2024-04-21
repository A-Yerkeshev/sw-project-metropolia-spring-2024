const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const i18next = require('../i18n');

// User Schema
const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

//static signup method
userSchema.statics.signup = async function (
  firstName,
  lastName,
  email,
  password,
  language
) {
  //validation
  if (!firstName || !lastName || !email || !password) {
    throw new Error('All fields are required');
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error(i18next.t('signUp.userExist', { lng: language }));
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    firstName,
    lastName,
    email,
    password: hash,
  });

  return user;
};

//static login method
userSchema.statics.login = async function (email, password, language) {
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
    throw new Error(i18next.t('login.wrongPassword', { lng: language }));
  }
  throw new Error(i18next.t('login.wrongEmail', { lng: language }));
};

userSchema.statics.changePassword = async function ( email, newPassword ) {

  if (!email || !newPassword) {
    throw new Error('All fields are required');
  }

  const user = await this.findOne({ email });
  if (user) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    user.password = hash;
    await user.save();
    return { message: 'Password updated successfully' };
  }
  throw new Error(i18next.t('login.wrongEmail', { lng: language }));

};

const User = mongoose.model('User', userSchema);

module.exports = { User };
