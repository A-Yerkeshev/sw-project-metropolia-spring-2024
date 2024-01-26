const express = require('express')
const { getAllEvents,
    getOneEvent, 
    createEvent, 
    deleteEvent, 
    updateEvent
} = require('../controllers/eventController')

const router = express.Router()

// GET all events
router.get('/', getAllEvents)

// GET one event
router.get('/:eventId', getOneEvent)



// POST one event
router.post('/', createEvent)

// DELETE one event
router.delete('/:eventId', deleteEvent)

// UPDATE one event
router.patch('/:eventId', updateEvent)

module.exports = router