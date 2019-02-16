const path = require('path');
// console.log(path);
console.log(path.posix === path);

let baseName = path.posix.basename('C:\\Users\\xiaoming\\test.js');
// let baseName = path.posix.basename('/Users/muyi/Coding/test.js');
console.log(baseName);

console.log(process.env.PATH);
let p = process.env.PATH;

let envPaths = p.split(path.delimiter);
console.log(envPaths);

// normalize
console.log(path.normalize('/usr/local/bin//'));
console.log(path.normalize('/usr/../local/bin//'));



