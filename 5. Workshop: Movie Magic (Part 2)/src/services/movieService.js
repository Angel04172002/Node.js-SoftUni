const Movie = require('../models/Movie.js');


exports.getAll = () => Movie.find();

exports.getOne = (movieId) => Movie.findById(movieId).populate('casts');

exports.create = (movie) => Movie.create(movie);

exports.search = (title, genre, year) => {

    let query = {};

    if (title) {
        query.title = new RegExp(title, 'i'); 
    }

    if (genre) {
        query.genre = genre.toLowerCase();
    }

    if (year) {
       query.year = year;
    }


    return Movie.find(query);
};
