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


    const courses = await Course
        // .find({ author: 'GR', isPublished: true })
        // .find({price: {$in: [10, 15, 20]}})
        // .or([{ author: 'GR' }, { isPublished: true }])
        .find({ author: /^Greedo/ }) //start
        .find({ author: /Ren$/i }) //end
        .find({ author: /.*Greedo.*/i }) //contains

        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 })
    console.log(courses)
}

createCourse()