const {Session} = require('../models')
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
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(404).json({ error: 'Invalid event ID'})
    }

    try {
        const event = await Event.findById(eventId)

        // check if event exists
        if (!event) {
            return res.status(404).json({ error: 'Event not found'})
        }

        res.status(200).json({ event })
    } catch (error) {
        console.log('Error fetching event: ',error);

        res.status(500).json({ error: 'Server error' });
    }
}

// POST one event
const createSession = async (req, res) => {
    const { name, description, start, end, feedbacks } = req.body

    // Input validation
    let emptyFields = []
    if (!name) emptyFields.push('name')
    if (!date) emptyFields.push('date')
    if (!description) emptyFields.push('description')
    if (!location) emptyFields.push('location')
    // if (!organizer) emptyFields.push('organizer')
    if (!status) emptyFields.push('status')

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: `Missing required fields: ${emptyFields.join(', ')}` })
    }


    try {
        const session = await Session.create({ start, end, feedbacks });
        res.status(200).json({ session });

    } catch (error) {
        res.status(500).json({ error: 'Server error' })

    }
}

// DELETE one event
const deleteSession = async (req, res) => {
    const { eventId } = req.params

    // check if eventId is valid
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({ error: 'Invalid event ID'})
    }

    try {
        const deletedEvent = await Event.findByIdAndDelete(eventId)
        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found'})
        }
        res.status(200).json({ deletedEvent })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


// UPDATE one event
const updateSession = async (req, res) => {
    const { eventId } = req.params
    const { name, date, description, location, organizer, status } = req.body

    // check if eventId is valid
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({ error: 'Invalid event ID'})
    }

    try {
        const updatedEvent = await Event.findByIdAndUpdate(eventId, { name, date, description, location, organizer, status }, { new: true })
        res.status(200).json({ updatedEvent })
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