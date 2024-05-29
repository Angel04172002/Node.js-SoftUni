const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');

const port = 5000;

const app = express();


const cats = [
    {
        name: 'Murka',
        age: 15,
        breed: 'Brown Cat'
    },
    {
        name: 'Furnaso',
        age: 8,
        breed: 'Brown Cat'
    },
    {
        name: 'Zelenski',
        age: 13,
        breed: 'Wild Cat'
    },
];



app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main'
}));

app.set('view engine', 'hbs');


//app.use(express.static("public"));

// app.use(function(req, res, next) {

//     if(Math.random() < 0.5) {
//         return res.send("An error occured");
//     }

//     next();
// });


app.get('/', (req, res) => {

    res.header({
        'content-type': 'text/html'
    });

    res.render('home');

});


app.get('/cats', (req, res) => {

    //let catsHtmlPath = path.join(__dirname, 'index.html');

    res.status(200).render('cats', { cats })
});


app.get('/cats/download', (req, res) => {

    let imagePath = path.join(__dirname, 'public', 'cat.jpg');
    res.status(200).download(imagePath);
});


app.get('/cats/json', (req, res) => {

    res.status(200).json(cats);
});


app.get('/cats/:id', (req, res) => {

    let id = req.params.id;

    res.header({
        'content-type': 'text/html'
    });

    res.status(200).send(`<h1>This is a cat with id: ${id}. </h1>`)

});


app.post('/cats', (req, res) => {

    res.status(201).send("Succesfully created new cat");
});


app.listen(port, () => console.log(`App is listening on port ${port}`));



