const app = require('./middleware.js');


app.use(function(req, res, next) {
    req.name = 'Ivan';
    console.log(1);
    next();
});

app.use(function(req, res, next) {
    req.age = 20;
    console.log(2);
    next();
});

app.use(function(req, res, next) {
    req.isAuthenticated = true;
    console.log(3);
    next();
});


app.execute({}, {}, (req, res) => {
    console.log(req);
    console.log('END');
});

