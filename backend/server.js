require('dotenv').config()

const port = process.env.PORT || 4000
const dbURI = process.env.MONGO_URI

const express = require('express')
const mongoose = require('mongoose')
const eventRoutes = require('./routes/events')
const { error } = require('console')

// Create express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
})

// routes
app.use('/api/events',eventRoutes)

//connect to mongodb
mongoose.connect(dbURI)
.then(()=> {
    // listen for requests
    app.listen(port, () => {
    console.log('connected to db & listening on port ' + port)
})
})
.catch((error) => {console.log(error)})




