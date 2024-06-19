const express = require('express');

const homeController = require('./controllers/homeController');
const movieController = require('./controllers/movieController');
const castController = require('./controllers/castController');
const authController = require('./controllers/authController');

const router = express.Router();

router.use(homeController);
router.use(movieController);
router.use(castController);
router.use(authController);

router.get('*', (req, res) => {
    res.redirect('/404');
});


module.exports = router;
