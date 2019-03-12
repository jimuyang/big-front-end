const http = require('http');
const conf = require('./config/default');
const mime = require('./helper/mime');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');
const compress = require('./helper/compress');
const openurl = require('./helper/openurl');

// dir.tpl
const tplPath = path.join(__dirname, './templates/dir.tpl');
const dirTplFile = fs.readFileSync(tplPath, 'utf-8');
const dirTpl = handlebars.compile(dirTplFile.toString());

class Server {
    constructor(config) {
        this.conf = Object.assign({}, conf, config);
    }

    start() {
        const server = http.createServer((req, resp) => {
            const filePath = path.join(this.conf.root, req.url);
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
                    // 压缩conf.compress定义的文件类型
                    let rs = fs.createReadStream(filePath, 'utf-8');
                    if (filePath.match(this.conf.compress)) {
                        console.log(filePath);
                        rs = compress(rs, req, resp);
                    }
                    rs.pipe(resp);
                } else if (fileStats.isDirectory()) {
                    fs.readdir(filePath, (err, files) => {
                        resp.statusCode = 200;
                        resp.setHeader('Content-Type', 'text/html');
                        // resp.end(files.join('\n'));
                        const dir = path.relative(this.conf.root, filePath);
                        const data = {
                            title: path.basename(filePath),
                            dir: dir ? '/' + dir : '',
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

        server.listen(this.conf.port, this.conf.host, () => {
            const addr = `http://${this.conf.host}:${this.conf.port}`;
            // eslint-disable-next-line no-console
            console.log(`server running at: ${chalk.green(addr)}`);
            openurl(addr);
        });
    }
}

module.exports = Server;
