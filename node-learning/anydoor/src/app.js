const http = require('http');
const config = require('./config/default');
const chalk = require('chalk');

// const hostname = 'localhost';
// const port = 3000;

const server = http.createServer((req, resp) => {
    resp.statusCode = 200;
    resp.setHeader('Content-type', 'text/plain');
    resp.end('Hello World\n');
});

server.listen(config.port, config.hostname, () => {
    const addr = `http://${config.hostname}:${config.port}`;
    // eslint-disable-next-line no-console
    console.log(`server running at: ${chalk.green(addr)}`);
});