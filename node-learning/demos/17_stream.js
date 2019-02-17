const fs = require('fs');

const readStream = fs.createReadStream('./17_stream.js');

readStream.pipe(process.stdout);

const writeStream = fs.createWriteStream('./for_write');

const tid = setInterval(() => {
    const num = parseInt(Math.random() * 10);
    if (num < 8) {
        writeStream.write(String(num));
    } else {
        clearInterval(tid);
        writeStream.end();
    }
}, 200);

writeStream.on('finish', () => {
    console.log('done');
});
