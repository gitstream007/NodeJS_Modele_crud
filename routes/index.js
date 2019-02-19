const mongoose = require('mongoose');

const routes = (rapid) => {
    rapid.registerRoute('/', 'GET', (req, res) => {
        mongoose.model('Beer').find({}, (err, items) => {

            res.end(rapid.render('index', { beers: items }));

        });
    });

    rapid.registerRoute('/create', 'GET', (req, res) => {
        res.end(rapid.render('create'));
    });


    rapid.registerRoute('/create', 'POST', (req, res) => {
        req.body.tested = req.body.tested === 'on' ? true : false;

        mongoose.model('Beer').create(req.body, (err, item) => {
            if (err) {
                res.writeHead(500);
                return res.end(JSON.stringify(err));
            }

            res.writeHead(302, { 'Location': '/' });
            res.end();
        });
    });

    rapid.registerRoute('/edit', 'GET', (req, res) => {
        if (req.query.id) {
            mongoose.model('Beer').findById(req.query.id, (err, item) => {
                res.end(rapid.render('edit', { beer: item }));
            });
        } else {
            res.writeHead(400);
            res.end('Bad Request');
        }
    });

    rapid.registerRoute('/edit', 'POST', (req, res) => {
        if (req.query.id) {

            req.body.tested = req.body.tested === 'on' ? true : false;
            mongoose.model('Beer').findByIdAndUpdate(req.query.id, req.body, (err, item) => {
                res.writeHead(302, { 'Location': '/' });
                res.end();
            });
        } else {
            res.writeHead(400);
            res.end('Bad Request');
        }
    });

    rapid.registerRoute('/delete', 'GET', (req, res) => {
        if (req.query.id) {
            mongoose.model('Beer').findByIdAndDelete(req.query.id, (err, item) => {
                res.writeHead(302, { 'Location': '/' });
                res.end();
            });
        } else {
            res.writeHead(400);
            res.end('Bad Request');
        }
    });

}

module.exports = routes;