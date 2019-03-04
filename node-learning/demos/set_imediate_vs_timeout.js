/**
 * Instead, the nextTickQueue will be processed after the current operation is completed, regardless of the current phase of the event loop. 
 * Here, an operation is defined as a transition from the underlying C/C++ handler, 
 * and handling the JavaScript that needs to be executed.
 */


setImmediate(() => {
    console.log(1);

    setTimeout(() => {
        console.log('setTimeout1');
        process.nextTick(() => {
            console.log('nextTick1');
        });
    }, 0);

    setImmediate(() => {
        console.log('setImmediate');
    });

    setTimeout(() => {
        console.log('setTimeout2');
        process.nextTick(() => {
            console.log('nextTick2');
        });
    }, 0);

    var i = 0;
    while (i < 10000000) {
        i++;
    }
});


// setTimeout(() => {
//     console.log('setTimeout1');
//     process.nextTick(() => {
//         console.log('nextTick1');
//     });
//     new Promise((resolve) => {
//         console.log('new promise1');
//         resolve();
//     }).then(() => {
//         console.log('promise1 resolved');
//     })
// });

// setImmediate(() => {
//     console.log('setImmediate');
// });

// setTimeout(() => {
//     console.log('setTimeout2');
//     process.nextTick(() => {
//         console.log('nextTick2');
//     });

//     new Promise((resolve) => {
//         console.log('new promise2');
//         resolve();
//     }).then(() => {
//         console.log('promise2 resolved');
//     })
// });

