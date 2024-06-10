const express = require('express');

const router = express.Router();

const movieService = require('../services/movieService');
const castService = require('../services/castService');

router.get('/cast/create', (req, res) => {

    res.render('cast/create');
});


router.post('/cast/create', async (req, res) => {

    const body = req.body;

    await castService.create(body);

    res.redirect('/');
});

router.get('/cast/:movieId/attach', async (req, res) => {

    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId).lean();
    const casts = await castService.getAll().lean();

    res.render('cast/attach', { movie, casts });
});

router.post('/cast/:movieId/attach', async (req, res) => {

    const movieId = req.params.movieId;
    const { cast } = req.body;

    await castService.attach(cast, movieId);

    res.redirect(`/movie/${movieId}`);
});


module.exports = router;