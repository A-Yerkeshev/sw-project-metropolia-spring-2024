const {Session} = require('../models/sessionModel')
const mongoose = require('mongoose')

// GET all sessions
const getAllSessions = async (req, res) => {
    try {
        const sessions = await Session.find({}).sort({createdAt: -1})
        res.status(200).json({ sessions })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// GET one session
const getOneSession = async (req, res) => {
    const { sessionId } = req.params

    // check if sessionId is valid    
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
        return res.status(404).json({ error: 'Invalid session ID'})
    }

    try {
        const session = await Session.findById(sessionId)

        // check if session exists
        if (!session) {
            return res.status(404).json({ error: 'Event not found'})
        }

        res.status(200).json({session })
    } catch (error) {
        console.log('Error fetching event: ',error);

        res.status(500).json({ error: 'Server error' });
    }
}

// POST one event
const createSession = async (req, res) => {
    const { name, description, start, end } = req.body

    // Input validation
    let emptyFields = []
    if (!name) emptyFields.push('name')
    if (!description) emptyFields.push('description')
    if (!start) emptyFields.push('start')
    if (!end) emptyFields.push('end')

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: `Missing required fields: ${emptyFields.join(', ')}` })
    }

    try {
        const session = await Session.create({ name, description, start, end });
        res.status(200).json({ session });

    } catch (error) {
        res.status(500).json({ error: 'Server error' })

    }
}

// DELETE one event
const deleteSession = async (req, res) => {
    const { sessionId } = req.params

    // check if sessionId is valid
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
        return res.status(400).json({ error: 'Invalid session ID'})
    }

    try {
        const deletedSession = await Session.findByIdAndDelete(sessionId)
        if (!deletedSession) {
            return res.status(404).json({ error: 'Session not found'})
        }
        res.status(200).json({ deletedSession })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


// UPDATE one session
const updateSession = async (req, res) => {
    const { sessionId } = req.params
    const { name, description, start, end } = req.body

    // check if eventId is valid
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
        return res.status(400).json({ error: 'Invalid event ID'})
    }

    try {
        const updatedSession = await Session.findByIdAndUpdate(sessionId, { name, description,start, end }, { new: true })
        res.status(200).json({ updatedSession })
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
}

module.exports = {
    getAllSessions,
    getOneSession,
    createSession,
    deleteSession,
    updateSession
}