const express = require('express');
const homeController = require('./controllers/homeController');
const movieController = require('./controllers/movieController');

const router = express.Router();

router.use(homeController);
router.use(movieController);

router.get('*', (req, res) => {
    res.redirect('/404');
});


module.exports = router;