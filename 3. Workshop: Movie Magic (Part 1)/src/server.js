
const express = require('express');
const expressConfig = require('./config/configExpress');
const handlebarsConfig = require('./config/configHandlebars');
const routes = require('./router');

const port = 5000;

const app = express();


expressConfig(app);
handlebarsConfig(app);


app.use(routes);


app.listen(port, () => console.log(`App is listening on port ${port}...`));

