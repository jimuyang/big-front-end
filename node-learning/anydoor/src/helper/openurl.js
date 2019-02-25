/* eslint-disable indent */
const { exec } = require('child_process');
const openurl = url => {
    switch (process.platform) {
        case 'darwin':
            exec(`open ${url}`);
            break;
        case 'win32':
            exec(`start ${url}`);
            break;
        default:
    }
};
module.exports = openurl;

