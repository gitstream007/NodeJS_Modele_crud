const pug = require('pug');
const path = require('path');
const url = require('url');
const { parse } = require('querystring');

class Rapid {
    constructor() {
        this.routes = {};
        this.renderer = pug;
        this.rendererExtension = '.pug';
        this.defaultViewLocation = './views'
        this.locales = {};
    }

    render(viewName, options) {
        const opts = options ? Object.assign(options, this.locales) : this.locales;
        const pth = path.join(
            this.defaultViewLocation,
            `${viewName}${this.rendererExtension}`
        );
        return this.renderer.renderFile(pth, opts);
    }

    serve(req, res) {
        req.query = parse(url.parse(req.url).query);

        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString()
            });
            req.on('end', () => {
                req.body = parse(body);
                this._serve(req, res);
            });
        } else
            this._serve(req, res);
    }

    _serve(req, res) {
        const route = req.url.split('?')[0];
        const method = req.method;

        const match = this.routes[`${route}||${method}`];
        if (match != null) {
            match.callback(req, res);
        }
        else {
            res.writeHead(404);
            res.end('<h2>404 : File not found</h2>');
        }
    }

    registerRoute(route, method, callback) {
        this.routes[`${route}||${method}`] = { callback };
    }

    removeRoute(route, method) {
        delete this.routes[`${route}||${method}`];
    }

}

module.exports = Rapid;