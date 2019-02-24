import { createServer } from 'http';
import conf from './config/default';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import handlebars from 'handlebars';

// dir.tpl
const tplPath = path.join(__dirname, './templates/dir.tpl');
const dirTplFile = fs.readFileSync(tplPath, 'utf-8');
const dirTpl = handlebars.compile(dirTplFile.toString());

const fsStat = promisify(fs.stat);
const fsReaddir = promisify(fs.readdir);

const handler = async function (req, resp) {
    const filePath = path.join(conf.root, req.url);
    let fileStats = null;
    try {
        fileStats = await fsStat(filePath);
    } catch (err) {
        resp.setStatusCode = 404;
        resp.setHeader('Content-type', 'text/plain');
        resp.end(`cannot find directory or file: ${filePath}`);
        return;
    }

    if (fileStats.isFile()) {
        resp.statusCode = 200;
        resp.setHeader('Content-type', 'text/plain');
        fs.createReadStream(filePath).pipe(resp);
    } else if (fileStats.isDirectory()) {
        const files = await fsReaddir(filePath);
        resp.statusCode = 200;
        resp.setHeader('Content-Type', 'text/plain');
        // resp.end(files.join('\n'));
        const dir = '/' + path.relative(conf.root, filePath);
        const data = {
            title: path.basename(filePath),
            dir,
            files
        };
        resp.end(dirTpl(data));
    }
};
const server = createServer(handler);

server.listen(conf.port, conf.hostname, () => {
    const addr = `http://${conf.hostname}:${conf.port}`;
    console.log(`server running at: ${chalk.green(addr)}`);
});