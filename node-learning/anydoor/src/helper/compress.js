const { createGzip, createDeflate } = require('zlib');
module.exports = (readStream, req, resp) => {
    const acceptExcoding = req.headers['accept-encoding'];
    // 浏览器不支持压缩或不支持的压缩方式
    if (!acceptExcoding || !acceptExcoding.match(/\b(gzip|deflate)\b/)) {
        return readStream;
    } else if (acceptExcoding.match(/\bgzip\b/)) {
        console.log('using gzip');
        resp.setHeader('Content-Encoding', 'gzip');
        return readStream.pipe(createGzip());
    } else if (acceptExcoding.match(/\bdeflate\b/)) {
        console.log('using deflate');
        resp.setHeader('Content-Encoding', 'deflate');
        return readStream.pipe(createDeflate());
    }
    return readStream;
};