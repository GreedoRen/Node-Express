const mongoose = require('mongoose')
const config = require('config')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const genres = require('./routes/genres')
const customers = require('./routes/customers')
const rentals = require('./routes/rentals')
const users = require('./routes/users')
const movies = require('./routes/movies')
const auth = require('./routes/auth')
const express = require('express')
const app = express()

if (!config.get('jwtPrivateKey')) {
    console.log('JWT is not defined!')
    process.exit(1)
}

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connect to MongoDB'))
    .catch(e => console.error(`MongoDB error: ${e}`))

app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/rentals', rentals)
app.use('/api/movies', movies)
app.use('/api/users', users)
app.use('/api/auth', auth)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))
