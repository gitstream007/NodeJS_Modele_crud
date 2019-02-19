// http://bit.ly/CoucouTuVeuxVoirMonCode
// http://git.estiam.com/sion.genders/E5NodeJS

const http = require('http'),
    fs = require('fs');

http.createServer((req, res) => {
    if(req.method !== 'GET')
        return res.end('Method not supported');
        
    if(req.url === '/')
        req.url = '/index.html';
    // const str = '.' + req.url;
    fs.readFile(`./html${req.url}`, (err, html) => {
        if (err) {
            if(err.code == 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('404 : File not found');
            } else {
                res.writeHead(500);
                res.end('500 : Internal Server Bleeding');
            }
        } else {
            res.write(html);
            res.end();
        }
    });

    // const monString = "toto";
    // const monStringKangourou = 'toto';
    // const monStringLeopard = `toto`;


    // let maReponse = '<h1>Hello World</h1>';
    // if (req.url === '/toto')
    //     maReponse = '<h1>Wesh Toto !</h1>';

    // res.end(maReponse);
}).listen(1337);

console.log('Server started at http://127.0.0.1:1337');