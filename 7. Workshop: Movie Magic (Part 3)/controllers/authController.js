const express = require('express');
const authService = require('../services/authService');

const router = express.Router();


router.get('/login', (req, res) => {

    res.render('auth/login');
});

router.post('/login', async (req, res) => {

    const { email, password } = req.body;
    const token = await authService.login(email, password);

    res.cookie('auth', token);
    res.redirect('/');
});


router.get('/register', (req, res) => {

    res.render('auth/register');
});

router.post('/register', async (req, res) => {

    const body = req.body;

    await authService.register(body);

    res.redirect('/login');
});


router.get('/logout', (req, res) => {

    res.clearCookie('auth');
    res.redirect('/');
});


module.exports = router;