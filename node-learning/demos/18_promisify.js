const fs = require('fs');
const promisify = require('util').promisify;

const read = promisify(fs.readFile);

read('./18_promisify.js').then(data => {
    console.log(data.toString());
}).catch(ex => {
    console.log(ex);
});

async function test() {
    console.log('test');
    try {
        const content = await read('./18_promisify.js');
        console.log(content.toString());
    } catch (ex) {
        console.log(ex);
    }
}
test();