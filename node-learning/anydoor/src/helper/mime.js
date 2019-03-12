// const fs = require('fs');
const path = require('path');

const mimeType = {
    'css': 'text/css;charset=utf-8',
    'gif': 'image/gif',
    'html': 'text/html;charset=utf-8',
    'ico': 'image/x-icon',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'js': 'text/javascript;charset=utf-8',
    'json': 'application/json;charset=utf-8',
    'png': 'image/png',
    'txt': 'text/plain;charset=utf-8',
    'xml': 'text/xml;charset=utf-8'
};
module.exports = filePath => {
    let ext = path.extname(filePath).split('.').pop().toLowerCase() || filePath;
    return mimeType[ext] || 'text/plain';
};