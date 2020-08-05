const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(e => console.log('MongoErr: ', e))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema)

async function createCourse() {
    const course = new Course({
        name: 'React Course',
        author: 'Greedo Ren',
        tags: ['react', 'frontend'],
        isPublished: true
    })

    const result = await course.save()
    console.log(result)
}

async function getCourses() {
    const pageNumber = 2
    const pageSize = 10

    const courses = await Course
        .find({ author: 'GR', isPublished: true })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 })
    console.log(courses)
}

async function updateCourse(id) {
    const course = await Course.findById(id)
    if (!course) return
    // course.isPublished = true
    // course.author = 'Another author'
    course.set({
        isPublished: true,
        author: 'Another author'
    })

    const result = await course.save()
    console.log(result)
}

updateCourse('5f271980cd75911710a78843')