const mongoose = require('mongoose')
const Joi = require('joi')
const genres = require('./routes/genres')
const express = require('express')
const app = express()

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connect to MongoDB'))
    .catch(e => console.error(`MongoDB error: ${e}`))

app.use(express.json())
app.use('/api/genres', genres)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))