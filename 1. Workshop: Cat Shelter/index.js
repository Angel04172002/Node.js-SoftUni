const http = require('http');
const fs = require('fs');
const qs = require('querystring');


const cats = [

    {
        "id": 1,
        "name": "Rumen",
        "breed": "Persian Cat",
        "description": "Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.",
        "image": "https://cdn.pixabay.com/photo/2015/06/19/14/20/cat-814952_1280.jpg"
    },
    {
        "id": 2,
        "name": "Furnasu",
        "breed": "Brown Cat",
        "description": "Very cute tho. And good as well",
        "image": "https://cdn.pixabay.com/photo/2015/06/19/14/20/cat-814952_1280.jpg"
    },
];

const breeds = [
    'Bombay Cat',
    'American Bobtail Cat',
    'Bengal Cat',
    'British Shorthair Cat',
    'Unknown'
];

const pathsWithViews = {
    'home': './views/homeTemplate.html',
    'cat': './views/partials/cat.html',
    'addCat': './views/addCatTemplate.html',
    'addBreed': './views/addBreedTemplate.html',
    'editCat': './views/editCatTemplate.html',
    'shelterCat': './views/shelterCatTemplate.html',
    'styles': './views/site.css'
};


const server = http.createServer((req, res) => {

    processRequest(req, res);

});



console.log('App running on port 3000');

server.listen(3000);




function processRequest(req, res) {

    if (req.url == '/') {

        showTemplate(pathsWithViews.cat, (data) => {

            render(data, cats, (html) => {

                showTemplate(pathsWithViews.home, (data) => {

                    let pattern = new RegExp('{{cats}}', 'g');
                    data = data.replace(pattern, html);

                    writeToResponse(data, res);

                });
            });
        });


    } else if (req.url == '/styles/site.css') {

        showTemplate(pathsWithViews.styles, (data) => {

            writeToResponse(data, res, 'text/css');
        });



    } else if (req.url == '/cats/add-cat' && req.method == 'GET') {

        showTemplate(pathsWithViews.addCat, (data) => {
            renderBreeds(breeds, '', (html) => {

                data = data.replace('{{breeds}}', html);
                writeToResponse(data, res);

            });
        });


    } else if (req.url == '/cats/add-cat' && req.method == 'POST') {

        processPostAction(req, (body) => {

            let parsedBody = qs.parse(body);
            parsedBody.id = cats[cats.length - 1].id + 1;

            cats.push(parsedBody);

            res.writeHead(302, {
                location: '/'
            });

            res.end();
        });




    } else if (req.url == '/cats/add-breed' && req.method == 'GET') {

        showTemplate(pathsWithViews.addBreed, (data) => {
            writeToResponse(data, res);
        })


    } else if (req.url == '/cats/add-breed' && req.method == 'POST') {

        processPostAction(req, (body) => {

            let parsedBody = qs.parse(body);
            breeds.push(parsedBody.breed);

            res.writeHead(302, {
                location: '/cats/add-cat'
            });

            res.end();
        })

    } else if (req.url.includes('/cats/edit-cat') && req.method == 'GET') {

        showTemplate(pathsWithViews.editCat, (data) => {

            let catToEdit = getCatByUrl(req.url);

            if (catToEdit == undefined) {
                return;
            }


            render(data, [catToEdit], (html) => {

                renderBreeds(breeds, catToEdit.breed, (breedData) => {

                    html = html.replace('{{breeds}}', breedData);

                    writeToResponse(html, res);

                });
            });
        })




    } else if (req.url.includes('/cats/edit-cat') && req.method == 'POST') {

        let catToEdit = getCatByUrl(req.url);
        
        if (catToEdit == undefined) {
            return;
        }

        processPostAction(req, (body) => {

            let parsedBody = qs.parse(body);

            catToEdit.name = parsedBody.name;
            catToEdit.description = parsedBody.description;
            catToEdit.breed = parsedBody.breed;
            catToEdit.image = parsedBody.image;

            res.writeHead(302, {
                location: '/'
            });

            res.end();
        })


    } else if (req.url.includes('/cats/shelter-cat') && req.method == 'GET') {

        showTemplate(pathsWithViews.shelterCat, (data) => {

            let catToShelter = getCatByUrl(req.url);

            if(catToShelter == undefined) {
                return;
            }

            render(data, [catToShelter], (html) => {

                writeToResponse(html, res);

            });
        });




    } else if (req.url.includes('/cats/shelter-cat') && req.method == 'POST') {


        let catId = getCatId(req.url) - 1;

        if (cats[catId] == undefined) {
            return;
        }

        cats.splice(catId, 1);

        res.writeHead(302, {
            location: '/'
        });

        res.end();

    } else if (req.url.includes('/cats/search') && req.method == 'POST') {

        processPostAction(req, (body) => {

            let parsedBody = qs.parse(body);
            let searchWord = parsedBody.text;

            let catsToFilter = cats.filter(cat =>
                cat.description.includes(searchWord) ||
                cat.name.includes(searchWord) ||
                cat.breed.includes(searchWord));


            showTemplate(pathsWithViews.cat, (data) => {

                render(data, catsToFilter, (html) => {

                    showTemplate(pathsWithViews.home, (data) => {

                        let pattern = new RegExp('{{cats}}', 'g');
                        data = data.replace(pattern, html);

                        writeToResponse(data, res);

                    });
                });
            })
        });
    }
    else {

        res.statusCode = 404;
        res.write("404 No Page Found!");
        res.end();
    }
}


function render(template, data, callback) {

    let resultArr = [];
    let initialTemplate = template;

    for (let element of data) {

        Object.keys(element).forEach(key => {

            let replaceWord = '{{' + key + '}}';

            let pattern = new RegExp(replaceWord, 'g');
            template = template.replace(pattern, element[key]);
        });

        resultArr.push(template);
        template = initialTemplate;
    }

    callback(resultArr.join('\n'));

}

function renderBreeds(data, breed = '', callback) {

    let html = '';

    for (let element of data) {

        let option = `<option value='${element}' ${breed && element == breed ? 'selected' : ''}>${element}</option>\n`;
        html += option;
    }

    return callback(html);
}

function showTemplate(view, callback) {

    fs.readFile(view, { encoding: 'utf-8' }, (err, data) => {

        if (err) {
            return;
        }

        callback(data);
    });
}

function writeToResponse(data, res, contentType = 'text/html') {

    res.writeHead(200, {
        'content-type': contentType
    });

    res.write(data);
    res.end();
}

function processPostAction(req, callback) {

    let body = '';

    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', () => {

        callback(body);
    });

}

function getCatByUrl(url) {

    let id = getCatId(url);
    return cats[id - 1];
}

function getCatId(url) {
    let index = url.indexOf('?');
    let query = url.substring(index + 1, url.length);
    let id = Number(query.split('=')[1]);

    return id;
}




