const { Genre } = require('../models/genre')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const mvoies = await Movie.find().sort('name')
    res.send(movie)
})

router.post('/', async (req, res) => {
    const { error } = validateError(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(400).send('Invalid genre')

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dayliRentalRate: req.body.dayliRentalRate
    })

    movie = await movie.save()

    res.send(movie)
})

module.exports = router