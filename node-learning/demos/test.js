var obj = {};
function test(obj) {
    obj.name = 'xiaoming';
    obj = 1;
}
test(obj);
console.log(obj);


function add(n) {
    n++;
}
var n = 1;
add(n);
console.log(n);