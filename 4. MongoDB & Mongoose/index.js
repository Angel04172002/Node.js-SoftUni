const mongoose = require('mongoose');
const Student = require('./models/Student');



mongoose.connect(connectionString)
    .then(() => console.log('Successfully connected to DB'));




const firstStudent = new Student({
    firstName: 'Jiaaa',
    lastName: 'Jivkov',
    course: 2,
    age: 99
});


// const secondStudent = new Student({
//     firstName: 'Georgi',
//     lastName: 'Nikolov',
//     age: 21,
//     course: 3
// });





//INSERT DATA

// firstStudent.save()
//     .then(result => {

//         console.log('New student created');
//         console.log(result);

//     });


// Student.create({
//     firstName: 'Stamat',
//     lastName: 'Ivanov',
//     age: 18,
//     course: 1

// }).then(result => {
//     console.log('New student created');
//     console.log(result);

// });








//GET DATA

// Student.find({})
//     .then(data => {
//         //data.forEach(x => console.log(x.fullName));
//         data.forEach(x => console.log(x.getStudentInfo()));
//     });



// Student.find({ age: { $gte: 20 } })
//     .then(data => {
//         //data.forEach(x => console.log(x.fullName));
//         data.forEach(x => console.log(x.getStudentInfo()));
//     });

Student.find({ course: { $in: [2, 3] } })
    .then(data => {
        data.forEach(x => console.log(x.getStudentInfo()));
    });

Student.findById('665c642417a52b7b4ddd00c9')
    .then(student => console.log(student.getStudentInfo()));






//UPDATE DATA
// Student.updateOne({ course: { $gt: 2 } }, { $set: { age: 30 } })
//     .then(data => console.log(data));

Student.findByIdAndUpdate('665c62c8727b6598e993a52e', { course: 4 })
    .then(data => console.log(data));


//DELETE DATA
Student.findByIdAndDelete('665c62c8727b6598e993a52e')
    .then(data => console.log(data));
