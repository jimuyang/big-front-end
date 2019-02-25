const yargs = require('yargs');
const Server = require('./src/app');

const argv = yargs.usage('anydoor [options]')
    .option('p', {
        alias: 'port',
        describe: '端口号',
        default: 9888
    })
    .option('h', {
        alias: 'host',
        describe: 'host',
        default: 'localhost'
    })
    .option('d', {
        alias: 'root',
        describe: 'root dir',
        default: process.cwd()
    })
    .version().alias('v', 'version')
    .help()
    .argv;

const server = new Server(argv);
server.start();

