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