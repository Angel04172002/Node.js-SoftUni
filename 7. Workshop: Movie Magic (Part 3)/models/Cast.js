const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        max: 120,
        min: 14
    },
    born: {
        type: String,
        required: true
    },
    movieName: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        match: /^https?/
    },
    movies: [{
        type: mongoose.Types.ObjectId,
        ref: 'Movie'
    }]
});

const Cast = mongoose.model('Cast', castSchema);

module.exports = Cast;

