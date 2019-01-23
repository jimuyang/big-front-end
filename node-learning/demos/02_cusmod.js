
// console.log('02:This is a module');

const testVar = 100;
function test() {
    console.log(testVar);
}

// function useTest() {
// }
// useTest();

module.exports.testVar = testVar;
module.exports.testFn = test;

console.log('02......');
// console.log(module);


