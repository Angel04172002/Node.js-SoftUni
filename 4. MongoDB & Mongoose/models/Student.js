const mongoose = require('mongoose');

const studentsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: [3, 'First name is below 3 symbols'],
        maxLenngth: 20
    },
    lastName: String,
    age: {
        type: Number,
        required: [true, 'Age field is required'],
        min: [0, 'Age is below 0 years old'],
        max: [120, 'Age is above 120 years old']
    },
    course: Number
});



studentsSchema.methods.getStudentInfo = function () {
    return `Student ${this.firstName} ${this.lastName} is ${this.age} years old and is ${this.course} course at university`;
};

studentsSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName
});

// studentsSchema.path('age').validate(function(value) {

//     return value > 0 && value <= 120;

// }, "Age must be between 0 and 120 years old!");


const Student = mongoose.model('Student', studentsSchema);


module.exports = Student;