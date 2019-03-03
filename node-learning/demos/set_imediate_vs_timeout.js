setImmediate(() => {
    console.log(1);

    setImmediate(() => {
        console.log('setImmediate');
    });

    setTimeout(() => {
        console.log('setTimeout');
    }, 0);
});