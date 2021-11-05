require('./cfg');
require('./serverDB');
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;
    if (pathname.startsWith('/api')) {
      parsedUrl.pathname = '/api/main';
    }
    req.pathname = pathname;
    handle(req, res, parsedUrl);
  }).listen(process.cfg.server.port, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:' + process.cfg.server.port);
  });
});
