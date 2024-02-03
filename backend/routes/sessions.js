const express = require('express')
const { getAllSessions,
    getOneSession, 
    createSession, 
    deleteSession, 
    updateSession
} = require('../controllers/sessionController')

const router = express.Router()

// GET all events
router.get('/', getAllSessions)

// GET one event
router.get('/:sessionId', getOneSession)



// POST one event
router.post('/', createSession)

// DELETE one event
router.delete('/:sessionId', deleteSession)

// UPDATE one event
router.patch('/:sessionId', updateSession)

module.exports = router