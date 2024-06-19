
const express = require('express');
const expressConfig = require('./config/configExpress');
const handlebarsConfig = require('./config/configHandlebars');
const mongoose = require('mongoose');

const routes = require('./router');

const port = 5000;

const app = express();


expressConfig(app);
handlebarsConfig(app);


app.use(routes);


mongoose.connect('mongodb://localhost:27017/moviesDb')
    .then(() => {

        app.listen(port, () => console.log(`App is listening on port ${port}...`));
    });




