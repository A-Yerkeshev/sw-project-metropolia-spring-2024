const {User} = require('../models/userModel')
const mongoose = require('mongoose')

// login user
const loginUser = async (req, res) => {
    res.json({ message: 'login user' })
}
// signup user
const signupUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    try {
        const user = await User.signup(firstName, lastName, email, password)

        res.status(200).json( {email, user} )

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {signupUser, loginUser}