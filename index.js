const express = require('express')
const Joi = require('joi')
const config = require('config')
const helmet = require('helmet')
const morgan = require('morgan')
const logger = require('./logger')

const app = express()
const courses = [
    { id: 1, name: 'course_1' },
    { id: 2, name: 'course_2' },
    { id: 3, name: 'course_3' },
    { id: 4, name: 'course_4' },
    { id: 5, name: 'course_5' }
]

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())

//config
console.log(`Application name: ${config.get('name')}`)
console.log(`Application name: ${config.get('mail.host')}`)

if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    console.log('Morgan enabled')
}


app.get('/', (req, res) => {
    res.send('Hellow world')
})

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3])
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(index => index.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('Invalid course ID')
    res.send(course)
})

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(index => index.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('Invalid course ID')

    const { error } = validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    course.name = req.body.name

    res.send(course)
})

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(index => index.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('Invalid course ID')

    const index = courses.indexOf(course)
    courses.splice(index)

    res.send(course)
})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return val = Joi.validate(course, schema)
}

app.listen(3000, () => {
    console.log('Listening on port 3000')
})