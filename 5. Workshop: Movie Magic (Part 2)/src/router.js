const express = require('express');
const homeController = require('./controllers/homeController');
const movieController = require('./controllers/movieController');
const castController = require('./controllers/castController');

const router = express.Router();

router.use(homeController);
router.use(movieController);
router.use(castController);

router.get('*', (req, res) => {
    res.redirect('/404');
});


module.exports = router;