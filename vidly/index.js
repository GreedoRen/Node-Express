const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const genres = require('./routes/genres')
const customers = require('./routes/customers')
const rentals = require('./routes/rentals')
const express = require('express')
const app = express()

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connect to MongoDB'))
    .catch(e => console.error(`MongoDB error: ${e}`))

app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('api/rentals', rentals)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))
