// promise 很重要

/**
 * Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。
 * 它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象。
 * 
 * 所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
 * （很像Java里的Future
 * 从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。
 * Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。
 * 
 * 2个特点：
 * 1. 对象的状态不受外界影响 pending fulfilled rejected 只有异步操作的结果可以决定当前是哪一种状态
 * 2. 一旦状态改变后，就不会再变，任何时候都可以得到这个结果。
 * (如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。
 * 这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的)
 * 
 * 
 * 
 * 
 */

// const promise = new Promise((resolve, reject) => {
//     // ...
//     if (/* 异步操作成功 */) {
//         resolve(value);
//     } else {
//         reject(err);
//     }
// })

const fs = require('fs');

const promise = new Promise((resolve, reject) => {
    fs.readFile('./test.file', (err, data) => {
        if (err) {
            reject(err);
        }
        resolve(data);
    });
});
promise.then(data => console.log(data.toString()))
    .catch(err => console.error(err));

const readFileP = function () {
    return new Promise((resolve, reject) => {
        fs.readFile(...arguments, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}

// const promisify = function (asyncFunc) {
//     return function () {
//         return new Promise((resolve, reject) => {
//             asyncFunc(...arguments, (err, data) => {
//                 if (err) {
//                     reject(err);
//                 }
//                 resolve(data);
//             });
//         });
//     }
// }

const promisify = asyncFunc => {
    return function() {
        return new Promise((resolve, reject) => {
            asyncFunc(...arguments, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }
}

readFileP('./test.file')
    .then(data => console.log(data.toString()))
    .catch(err => console.error(err));

promisify(fs.readFile)('./test.file')
    .then(data => console.log(data.toString()))
    .catch(err => console.error(err));


