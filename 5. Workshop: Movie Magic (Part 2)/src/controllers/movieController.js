const express = require('express');
const movieService = require('../services/movieService');

const router = express.Router();

router.get('/movie/create', (req, res) => {
    res.render('movie/create');
});

router.post('/movie/create', async (req, res) => {

    const body = req.body;

    await movieService.create(body);

    res.redirect('/');
});


router.get('/movie/:movieId', async (req, res) => {

    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();

    if (movie) {
        movie.ratingStars = new Array(Number(movie.rating)).fill(true);
        res.render('movie/details', { movie });

    } else {
        res.redirect('/404');
    }

});

router.get('/search', async (req, res) => {

    const { title, genre, year } = req.query;
    const movies = await movieService.search(title, genre, year).lean();

    res.render('movie/search', { movies, title, genre, year });
});



module.exports = router;