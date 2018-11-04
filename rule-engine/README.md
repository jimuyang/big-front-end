# 尝试用js实现一个简单的可视化规则引擎

规则引擎的核心就是 一个输入对象 经过用户定义的规则后得到的结果.
核心代码 
```javascript
var input = {} // provided input
var rule = new Function('input', '###code parsed by the rules defined by user###')
var result = rule(input) // the engine output
```