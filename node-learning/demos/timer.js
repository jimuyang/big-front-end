// js event-loop

setImmediate(() => {
    console.log('setImmediate');
});

setTimeout(() => {
    console.log('setTimeout');
}, 0);

const promise = new Promise((resolve, reject) => {
    console.log('new Promise');
    resolve();
});

promise.then(() => {
    console.log('promise resolved');
});

process.nextTick(() => {
    console.log('nextTick');
    process.nextTick(() => {
        console.log('nextTick');
        process.nextTick(() => {
            console.log('nextTick');
            process.nextTick(() => {
                console.log('nextTick');
            });
        });
    });
});