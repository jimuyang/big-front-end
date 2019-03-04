const mySymbol = Symbol();
const a = {};

a.mySymbol = '1';
a['mySymbol'] = '2';
a[mySymbol] = '3';

console.log(a.mySymbol);
console.log(a[mySymbol]);
console.log(a['mySymbol']);


