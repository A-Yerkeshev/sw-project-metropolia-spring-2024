const express = require('express');
const { route } = require('./session');

// controller functions
const { signupUser, loginUser, changePassword } = require('../controllers/userController');

const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

router.post('/changepassword', changePassword);

module.exports = router;
