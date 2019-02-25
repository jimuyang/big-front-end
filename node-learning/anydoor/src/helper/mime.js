// const fs = require('fs');
const path = require('path');

const mimeType = {
    'css': 'text/css',
    'gif': 'image/gif',
    'html': 'text/html',
    'ico': 'image/x-icon',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'js': 'text/javascript',
    'json': 'application/json',
    'png': 'image/png',
    'txt': 'text/plain',
    'xml': 'text/xml'
};
module.exports = filePath => {
    let ext = path.extname(filePath).split('.').pop().toLowerCase() || filePath;
    return mimeType[ext] || 'text/plain';
};