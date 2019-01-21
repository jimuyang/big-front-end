
var name = "windowsName";

var obj = {
    name: 'obj',
    fn: function () {
        var name = 'Cherry';
        // console.log(this);
        innerFunction();
        function innerFunction() {
            console.log(this);
            // console.log(this.name);      // windowsName
        }
    }
}
var o = {};
var fn = function() {

}

// obj.fn();
console.log('------');

// // function sleep(delay) {
// //     var start = (new Date()).getTime();
// //     while ((new Date()).getTime() - start < delay) {
// //       continue;
// //     }
// // }


// // /**
// //  * 阻塞的调用同步函数
// //  */
// // function kaorou1(meat) {
// //     sleep(3000);
// //     return "考好的肉";
// // }


// // /**
// //  * 异步烤肉函数
// //  */
// // function kaorou2(meat, callback) {
// //     function chuli() {
// //         callback('考好的肉');
// //     }
// //     setTimeout(chuli, 3000);
// // }

// // function eat() {
// //     console.log('肉不错2');
// // }
// // kaorou2('生肉', eat);

// // var r = kaorou1('生肉');
// // console.log('肉不错1');


// // // console.log(kaorou());



// // // shaoshui(); //异步函数
// // // shuaya();
// // // xilian();

// var a = 1;

// function addOne(num) {
//     return num++;
// }

// var result = addOne(a);

// console.log(a);      // 1
// console.log(result); // 1

// console.log('----------');
// for (var i = 0; i < 3; i++) {
//     console.log(i);
//     // 012
// }
// console.log('----------');
// for (var i = 0; i < 3; ++i) {
//     console.log(i);
//     // 012
// }


// console.log('----------');
// // i++ : i = i+1;
// // ++i : i = i+1;

// var i = 0;

// console.log(i++);
// console.log(i);

// console.log(i++ + ':' + ++i);

// i = 0;
// console.log((i = i + 2) + '' + (i = i + 3));


// var a = 1;
// b = a;
// a = 2;

function hello() {
    console.log('hello1');
}

hello();

function hello() {
    console.log('hello2');
}
hello();


console.log('--------');



console.log(f);
var f = function () {
    console.log('f');
}


console.log('--------');

console.log(f1); // function f1() {}   
console.log(f2); // undefined  
function f1() { }
var f2 = function () { }

console.log(f1);
console.log(f2);

var f3 = f2;
console.log(f3);


function digui() {
    console.log(1);
    digui();
}
digui();