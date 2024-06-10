const Cast = require('../models/Cast.js');
const Movie = require('../models/Movie.js');

exports.getAll = () => Cast.find();

exports.getOne = (castId) => Cast.findById(castId);

exports.create = (data) => Cast.create(data);

exports.attach = async (castId, movieId) => {

    const cast = await this.getOne(castId);
    const movie = await Movie.findById(movieId);

    movie.casts.push(cast);
    cast.movies.push(movie);

    await movie.save();
    await cast.save();
};