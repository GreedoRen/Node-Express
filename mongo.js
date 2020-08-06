const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(e => console.log('MongoErr: ', e))

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 255 },
    category: { type: String, required: true, enum: ['web', 'mobile', 'network'] },
    author: String,
    tags: {
        type: Array, validate: {
            validator: function (v) {
                return v && v.length > 0
            },
            message: 'A course should have at least one tag'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { return this.isPublished },
        min: 10,
        max: 200
    }
})

const Course = mongoose.model('Course', courseSchema)

async function createCourse() {
    const course = new Course({
        name: 'React Course',
        category: 'web',
        author: 'Greedo Ren',
        tags: ['react'],
        isPublished: true,
        price: 15
    })

    try {
        //await course.validate()
        const result = await course.save()
        console.log(result)
    } catch (error) {
        console.log(error.message)
    }

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
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Jason',
            isPublished: false
        }
    }, { new: true })
    console.log(course)
}

async function removeCourse(id) {
    //const result = await Course.deleteMany({ _id: id })
    const course = await Course.findByIdAndRemove(id)
    console.log(course)
}

//removeCourse('5f271980cd75911710a78843')
createCourse()