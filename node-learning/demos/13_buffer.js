// buffer 用于处理二进制数据流
// 类似整数数组 大小固定
// c++ 代码在V8堆外分配物理内存

// 用0填充 长度为10
const buf1 = Buffer.alloc(10);

// 使用0x1来填充的buffer
const buf2 = Buffer.alloc(10, 1);

console.log(buf1);
console.log(buf2);

console.log(Buffer.allocUnsafe(5, 1));
console.log(Buffer.from([1,257,3]));
console.log(Buffer.from('test'));


/*
Buffer class:
Buffer.byteLength()
Buffer.isBuffer()
Buffer.concat()
*/

console.log(Buffer.byteLength('test'));
console.log(Buffer.byteLength('测试'));

console.log(Buffer.isBuffer({}));
console.log(Buffer.isBuffer(Buffer.from([1,2,3])));

const buf3 = Buffer.from('This ');
const buf4 = Buffer.from('is ');
const buf5 = Buffer.from('a ');
const buf6 = Buffer.from('buffer.');

const buf = Buffer.concat([buf3, buf4, buf5, buf6])
console.log(buf.toString());

/*
buf.length
buf.toString()
buf.fill()
buf.equals()
buf.indexOf()
buf.copy()
*/

const buf7 = Buffer.from('This is a test!');
const buf9 = Buffer.from('这是一个测试!');
console.log(buf7.length);
console.log(buf9.length);

const buf8 = Buffer.alloc(10);
buf[0] = 2;
console.log(buf8.length);
