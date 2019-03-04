/**
 * 异步事件驱动架构
 * 其中某些类型的对象（触发器）会周期性的触发命名事件来调用函数对象（监听器）
 * 例如：net.Server 对象会在每次有新连接时触发事件，fs.ReadStream会在文件被打开时触发事件；流对象 会在数据可读时触发事件
 * 
 * 所有能触发事件的对象都是 EventEmitter 类的实例。 这些对象有一个 eventEmitter.on() 函数，用于将一个或多个函数绑定到命名事件上。 事件的命名通常是驼峰式的字符串。
 * 当 EventEmitter 对象触发一个事件时，所有绑定在该事件上的函数都会被同步地调用。
 */
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {
}
const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
    console.log('触发事件');
});

myEmitter.emit('event');

var event = new EventEmitter();

var count = 0;
var num = 10;

event.on('some_event', function () {
    count++;
    console.log('some_event 事件触发' + count);
    if (count < num) {
        event.emit('some_event')
    }
});

event.emit('some_event');

console.log('what ?')

