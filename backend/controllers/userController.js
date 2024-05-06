const { User } = require('../models/userModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const i18next = require('../i18n');
const bcrypt = require('bcrypt');
secret = process.env.JWT_SECRET;

const createToken = (_id) => {
  return jwt.sign({ _id }, secret, {
    expiresIn: '30d',
  });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const language = req.headers['accept-language'];

  try {
    const user = await User.login(email, password, language);

    // create JWT token
    const token = createToken(user._id);
    const id = user._id;
    const firstName = user.firstName;

    // create password recovery token
    user.recoveryToken = createToken(user._id);
    user.save();

    res.status(200).json({ firstName, email, token, id });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const language = req.headers['accept-language'];

  try {
    const user = await User.signup(
      firstName,
      lastName,
      email,
      password,
      language
    );

    // create token
    const token = createToken(user._id);
    const id = user._id;
    res.status(200).json({ firstName, email, token, id });
  } catch (error) {
    console.error('Error in signupUser:', error);
    res.status(500).json({ error: error.message });
  }
};

const changePassword = async (req, res) => {
  const { token, email, password, passwordRep } = req.body;
  const language = req.headers['accept-language'];

  if (!token || !email || !password || !passwordRep) {
    return res.status(400).json({
      error: i18next.t('resetPassword.missingFields', { lng: language }),
    });
  }

  if (password !== passwordRep) {
    return res.status(400).json({
      error: i18next.t('resetPassword.passwordsMismatch', { lng: language }),
    });
  }

  const changeSuccessful = await User.changePassword(email, password, token);

  if (changeSuccessful === true) {
    return res.status(200).json({
      message: i18next.t('resetPassword.recoveryOk', { lng: language }),
    });
  } else {
    return res.status(500).json({
      error: i18next.t('resetPassword.recoveryFailed', { lng: language }),
    });
  }
};

module.exports = { signupUser, loginUser, changePassword };
