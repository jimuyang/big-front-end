'use strict';
console.log(__dirname);
console.log(__filename);

module.exports.name = 'xiaoming';
console.log(this);
this.a = 'a';
exports.b = 'b';
module.exports.c = 'c';

console.log(module.exports);

function test1() {
    const a = Math.random();
    const b = Math.random();
    const c = compare(a, b);
}

function compare(a, b) {
    if (a > b) {
        a += a * 2;
    } else {
        b -= a;
    }
    return a + b;
}


test1();