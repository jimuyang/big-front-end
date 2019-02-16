const fs = require('fs');

fs.readFile('./15_fs.js', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data.toString());
});

const file = fs.readFileSync('./14_event.js');
console.log(file.toString());

fs.writeFile('./for_write', 'this is a test, 这是一个测试', { encoding: 'utf8' }, err => {
    if (err) throw err;
    console.log('写好了');
});