const {User} = require('../models/userModel')
const mongoose = require('mongoose')

// login user
const loginUser = async (req, res) => {
    res.json({ message: 'login user' })
}
// signup user
const signupUser = async (req, res) => {
    res.json({ message: 'signup user' })
}

module.exports = {signupUser, loginUser}