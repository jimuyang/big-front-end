// require总是相对于当前文件
const mod = require('./02_cusmod');
const path = require('path');
console.log(mod.testVar);

// __dirname总是返回文件的绝对路径
console.log('__dirname', __dirname);
// process.cwd() 总是返回node命令所在路径
console.log('process.cwd()', process.cwd());
// 其他时候相对于node命令所在路径
console.log('./', path.resolve('./'));

