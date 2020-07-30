const express = require('express')
const Joi = require('joi')
const config = require('config')
const helmet = require('helmet')
const morgan = require('morgan')
const logger = require('./logger')
const debug = require('debug')('app:startup')

const app = express()
const courses = [
    { id: 1, name: 'course_1' },
    { id: 2, name: 'course_2' },
    { id: 3, name: 'course_3' },
    { id: 4, name: 'course_4' },
    { id: 5, name: 'course_5' }
]

app.set('view engine', 'pug')
app.set('views', './views') //default

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())

//config
console.log(`Application name: ${config.get('name')}`)
console.log(`Application name: ${config.get('mail.host')}`)
// console.log(`Application name: ${config.get('mail.password')}`)


if (app.get('env') === 'development') {
    app.use(morgan('tiny'))
    //console.log(startupDebugger)
    // startupDebugger.enabled = true
    debug('Morgan enabled') //console.log()
}

app.get('/', (req, res) => {
    res.render('index', { title: 'My Express App', message: 'Hello World' })
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})