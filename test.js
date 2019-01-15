
// var name = "windowsName";

// var obj = {
//     name: 'obj',
//     fn: function () {
//         var name = 'Cherry';
//         // console.log(this);
//         innerFunction();
//         function innerFunction() {
//             // console.log(this);
//             console.log(this.name);      // windowsName
//         }
//     }
// }

function sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
      continue;
    }
}


/**
 * 阻塞的调用同步函数
 */
function kaorou1(meat) {
    sleep(3000);
    return "考好的肉";
}


/**
 * 异步烤肉函数
 */
function kaorou2(meat, callback) {
    function chuli() {
        callback('考好的肉');
    }
    setTimeout(chuli, 3000);
}

function eat() {
    console.log('肉不错2');
}
kaorou2('生肉', eat);

var r = kaorou1('生肉');
console.log('肉不错1');


// console.log(kaorou());



// shaoshui(); //异步函数
// shuaya();
// xilian();