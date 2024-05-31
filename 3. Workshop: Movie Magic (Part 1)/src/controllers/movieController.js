const express = require('express');
const movieService = require('../services/movieService');

const router = express.Router();

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {

    const body = req.body;
    movieService.create(body);

    res.redirect('/');
});


router.get('/movie/:movieId', (req, res) => {

    const movieId = req.params.movieId;
    const movie = movieService.getOne(movieId);

    if (movie) {
        movie.ratingStars = new Array(Number(movie.rating)).fill(true);
        res.render('details', { movie });

    } else {
        res.redirect('/404');
    }

});

router.get('/search', (req, res) => {

    const { title, genre, year } = req.query;
    const movies = movieService.search(title, genre, year);

    res.render('search', { movies, title, genre, year });
});



module.exports = router;