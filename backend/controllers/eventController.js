const Event = require('../models/eventModel')
const mongoose = require('mongoose')

// GET all events
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find({}).sort({createdAt: -1})
        res.status(200).json({ events })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// GET one event
const getOneEvent = async (req, res) => {
    const { eventId } = req.params

    // check if eventId is valid    
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
const createEvent = async (req, res) => {
    const { name, date, description, location, organizer, status } = req.body

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
        const event = await Event.create({ name, date, description, location, organizer, status })
        res.status(200).json({ event })
    } catch (error) {
        res.status(500).json({ error: 'Server error' })

    }
}

// DELETE one event
const deleteEvent = async (req, res) => {
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
const updateEvent = async (req, res) => {
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
    getAllEvents,
    getOneEvent,
    createEvent,
    deleteEvent,
    updateEvent
}