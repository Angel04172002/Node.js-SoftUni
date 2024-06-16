const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const port = 5000;

const db = {};

const secret = 'aaamqjhsbqjqksq';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.get('/', (req, res) => {

    const token = req.cookies['auth'];

    if(!token) {
        res.status(403).send('Unauthorized!');
    }

    try {
        const result = jwt.verify(token, secret);
        res.send('Welcome to home page ' + result.username);

    } catch(e) {
        res.status(403).send('Unauthorized!');
    }
});


app.get('/login', (req, res) => {

    res.send(`<form action="/login" method="post">

        <label for="username">Username</label>
        <input type="text" name="username"> 

        <label for="password">Password</label>
        <input type="text" name="password">

        <input type="submit" value="Login">
    </form>`);
});

app.post('/login', async (req, res) => {

    const body = req.body
    const hashedPassword = db[body.username];

    if(!hashedPassword) {
        res.status(403).send('Unathorized!');
    }

    const isValid = await bcrypt.compare(body.password, hashedPassword);

    if(!isValid) {
        res.status(403).send('Unauthorized!');
    }

    const payload = {
        username: body.username
    };

    const token = jwt.sign(payload, secret);

    res.cookie('auth', token);
    res.end();
});

app.get('/register', (req, res) => {

    res.send(`<form action="/register" method="post">

        <label for="username">Username</label>
        <input type="text" name="username"> 

        <label for="password">Password</label>
        <input type="text" name="password">

        <input type="submit" value="Register">
    </form>`)

});

app.post('/register', async (req, res) => {

    const body = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    db[body.username] = hashedPassword;

    res.redirect('/login');
});

app.get('/logout', (req, res) => {

    res.clearCookie('auth');
    res.end();
});

app.listen(port, () => `Server is listening on port ${port}`);
