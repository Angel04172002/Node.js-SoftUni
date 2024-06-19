const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
        min: 1975,
        max: 2030
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    description: {
        type: String,
        required: true,
        maxLength: 300
    },
    imageUrl: {
        type: String,
        required: true,
        match: /^https?/
    },
    casts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Cast'
    }],
    creatorId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;