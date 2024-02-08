require('dotenv').config()

const port = process.env.PORT || 4000
const dbURI = process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TEST : process.env.MONGO_URI

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const sessionRoutes = require('./routes/sessions')
const userRoutes = require('./routes/user')
const { error } = require('console')
const bodyParser = require("body-parser")

// Create express app
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//configure cors
app.use(cors())

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
})

// routes
app.use('/api/sessions',sessionRoutes)
app.use('/api/user',userRoutes)

//connect to mongodb
mongoose.connect(dbURI)
.then(()=> {
    // listen for requests
    app.listen(port, () => {
    console.log('connected to db & listening on port ' + port)
})
})
.catch((error) => {console.log(error)})

module.exports = app


