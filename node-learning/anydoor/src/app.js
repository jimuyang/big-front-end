const http = require('http');
const conf = require('./config/default');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

// const hostname = 'localhost';
// const port = 3000;

const server = http.createServer((req, resp) => {
    const filePath = path.join(conf.root, req.url);
    fs.stat(filePath, (err, fileStats) => {
        if (err) {
            resp.setStatusCode = 404;
            resp.setHeader('Content-type', 'text/plain');
            resp.end(`cannot find directory or file: ${filePath}`);
            return;
        }
        
        if(fileStats.isFile()) {
            resp.statusCode = 200;
            resp.setHeader('Content-type', 'text/plain');
            
        }


    });


    resp.statusCode = 200;
    resp.setHeader('Content-type', 'text/plain');
    // resp.end('Hello Node\n');
    resp.end(filePath);
});

server.listen(conf.port, conf.hostname, () => {
    const addr = `http://${conf.hostname}:${conf.port}`;
    // eslint-disable-next-line no-console
    console.log(`server running at: ${chalk.green(addr)}`);
});