const express = require('express');
const movieService = require('../services/movieService');
const { isAuth } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/movie/create', isAuth, (req, res) => {
    res.render('movie/create');
});

router.post('/movie/create', isAuth, async (req, res) => {

    const body = req.body;
    body.creatorId = req.user.id;

    await movieService.create(body);

    res.redirect('/');
});


router.get('/movie/:movieId', isAuth, async (req, res) => {

    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();
    const isCreator = req.user.id == movie.creatorId;

    if (movie) {
        movie.ratingStars = new Array(Number(movie.rating)).fill(true);
        res.render('movie/details', { movie, isCreator });

    } else {
        res.redirect('/404');
    }

});


router.get('/movie/:movieId/edit', isAuth, async (req, res) => {

    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();


    res.render('movie/edit', { movie });
});


router.post('/movie/:movieId/edit', isAuth, async (req, res) => {

    const body = req.body;
    const movieId = req.params.movieId;

    await movieService.edit(movieId, body);

    res.redirect(`/movie/${movieId}`);
});

router.get('/movie/:movieId/delete', isAuth, async (req, res) => {

    const movieId = req.params.movieId;
    await movieService.delete(movieId);
    res.redirect('/');
});

router.get('/search', async (req, res) => {

    const { title, genre, year } = req.query;
    const movies = await movieService.search(title, genre, year).lean();

    res.render('movie/search', { movies, title, genre, year });
});



module.exports = router;