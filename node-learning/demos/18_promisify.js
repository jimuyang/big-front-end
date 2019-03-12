const fs = require('fs');
const promisify = require('util').promisify;

const readFileP = promisify(fs.readFile);

// fs.readFile('./10_condition_debug.js', (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data.toString());
//     }
// })

// readFileP('./18_promisify.js')
//     .then(data => {
//         console.log(data.toString());
//     })
//     .catch(ex => {
//         console.log(ex);
//     });

function myPromisify(asyncFunc) {
    return function () {
        return new Promise((resolve, reject) => {
            asyncFunc(...arguments, (err, ...other) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(...other);
                }
            });
        });
    }
}

const myReadFile = myPromisify(fs.readFile);
myReadFile('./11_condition_debug.js')
    .then(data => {
        console.log(data.toString());
    })
    .catch(err => {
        console.log(err);
    });




// function sss(a, b, c, ...other) {
//     console.log(a, b, c);
//     console.log(other);
//     function ss() {
//         console.log(arguments);
//     };
//     ss(...other);
// }

// sss(1, 2, 3, 4, 5);



// async function test() {
//     console.log('test');
//     try {
//         const content = await read('./18_promisify.js');
//         console.log(content.toString());
//     } catch (ex) {
//         console.log(ex);
//     }
// }
// test();