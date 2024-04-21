const { User } = require('../models/userModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
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

    // create token
    const token = createToken(user._id);
    const id = user._id;
    res.status(200).json({ email, token, id });
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
    res.status(200).json({ email, token, id });
  } catch (error) {
    console.error('Error in signupUser:', error);
    res.status(500).json({ error: error.message });
  }
};

const changePassword = async (req, res) => {
  const {email, newPassword} = req.body;
  
  try {
    const changePassword = await User.changePassword(email, newPassword);
    res.status(200).json({message: 'Password updated successfully'});   
  } catch (error) {
    console.error('Error in changePassword:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser, changePassword };
