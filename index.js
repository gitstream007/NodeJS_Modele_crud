// http://bit.ly/CoucouTuVeuxVoirMonCode
// http://git.estiam.com/sion.genders/E5NodeJS

const http = require('http'),
    fs = require('fs');

const Rapid = require('./rapide/rapide.js');
const rapid = new Rapid();
const mongoose = require('mongoose');

require('./routes/index')(rapid);
require('./models/Beer');

mongoose.connect('mongodb://localhost/braumeister');




// rapid.registerRoute('/index', 'GET', (req, res) => {
//     fs.readFile('./html/index.html', (err, html) => {
//         res.write(html);
//         res.end();
//     });
// });

// rapid.registerRoute('/whoami', 'GET', (req, res) => {
//    res.end(`Luke, I'm your father`);
// });

// rapid.registerRoute('/pugpug', 'GET', (req, res) => {
//     res.end(rapid.render('demo'));
// })

http.createServer((req, res) => {
    rapid.serve(req, res);
}).listen(1337);

console.log('Server started at http://127.0.0.1:1337');