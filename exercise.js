const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(e => console.log('MongoErr: ', e))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
})

const Course = mongoose.model('Course', courseSchema)

async function createCourse() {
    const course = new Course({
        name: 'React Course',
        author: 'Greedo Ren',
        tags: ['react', 'frontend'],
        date: `${Date.now()}`,
        isPublished: true,
        price: 16
    })

    const result = await course.save()
    console.log(result)
}

async function getCourses() {
    const pageNumber = 2
    const pageSize = 10

    return await Course
        .find({ isPublished: true })
        .or([
            { price: { $gte: 15 } },
            { name: /.*by.*/i }
        ])
        .sort({ price: -1 })
        .select({ name: 1, author: 1 })
}

async function run() {
    const courses = await getCourses()
    console.log(courses)
}

run()


