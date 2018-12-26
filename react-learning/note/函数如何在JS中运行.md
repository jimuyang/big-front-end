# 也是在讲怎么使用 Function.prototype.bind().

简单的Function.prototype.bind() 伪源码
```js
Function.prototype.bind = function (scope) {
    var fn = this;
    return function () {
        return fn.apply(scope);
    };
}
```