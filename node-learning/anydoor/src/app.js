const http = require('http');
const conf = require('./config/default');
const mime = require('./helper/mime');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');

// dir.tpl
const tplPath = path.join(__dirname, './templates/dir.tpl');
const dirTplFile = fs.readFileSync(tplPath, 'utf-8');
const dirTpl = handlebars.compile(dirTplFile.toString());

const server = http.createServer((req, resp) => {
    const filePath = path.join(conf.root, req.url);
    fs.stat(filePath, (err, fileStats) => {
        if (err) {
            resp.setStatusCode = 404;
            resp.setHeader('Content-type', 'text/plain');
            resp.end(`cannot find directory or file: ${filePath}`);
            return;
        }
        if (fileStats.isFile()) {
            resp.statusCode = 200;
            resp.setHeader('Content-type', mime(filePath));
            fs.createReadStream(filePath).pipe(resp);
        } else if (fileStats.isDirectory()) {
            fs.readdir(filePath, (err, files) => {
                resp.statusCode = 200;
                resp.setHeader('Content-Type', 'text/html');
                // resp.end(files.join('\n'));
                const dir = path.relative(conf.root, filePath);
                const data = {
                    title: path.basename(filePath),
                    dir: dir || '',
                    files
                };
                resp.end(dirTpl(data));
            });
        }
    });
    // resp.statusCode = 200;
    // resp.setHeader('Content-type', 'text/plain');
    // resp.end('Hello Node\n');
    // resp.end(filePath);
});

server.listen(conf.port, conf.hostname, () => {
    const addr = `http://${conf.hostname}:${conf.port}`;
    // eslint-disable-next-line no-console
    console.log(`server running at: ${chalk.green(addr)}`);
});