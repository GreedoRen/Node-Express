const express = require('express')
const app = express()
const courses = [
    { id: 1, name: 'course_1' },
    { id: 2, name: 'course_2' },
    { id: 3, name: 'course_3' },
    { id: 4, name: 'course_4' },
    { id: 5, name: 'course_5' }
]

app.get('/', (req, res) => {
    res.send('Hellow world')
})

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3])
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(index => index.id === parseInt(req.params.id))
    if (!course) res.status(404).send('Invalid course ID')
    res.send(course)
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})