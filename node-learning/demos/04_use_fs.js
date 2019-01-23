const fs = require('fs');

fs.readFile('./04_use_fs.js', (err, data) => {
    console.log(data.toString());
});

console.log(1);