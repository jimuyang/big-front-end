import { createServer } from 'http';
import conf from './config/default';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

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
        resp.end(files.join('\n'));
    }
};
const server = createServer(handler);

server.listen(conf.port, conf.hostname, () => {
    const addr = `http://${conf.hostname}:${conf.port}`;
    console.log(`server running at: ${chalk.green(addr)}`);
});