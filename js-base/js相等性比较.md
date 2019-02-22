JavaScript提供三种不同的值比较操作：

* 严格相等 ("triple equals" 或 "identity")，使用 === (会用于Array.prototype.indexOf和case-matching)
* 宽松相等 ("double equals") ，使用 ==
* 以及 Object.is （ECMAScript 2015/ ES6 新特性）

> 简而言之，在比较两件事情时，双等号将执行类型转换; 三等号将进行相同的比较，而不进行类型转换 (如果类型不同, 只是总会返回 false );  而Object.is的行为方式与三等号相同，但是对于NaN和-0和+0进行特殊处理，所以最后两个不相同，而Object.is（NaN，NaN）将为 true。(通常使用双等号或三等号将NaN与NaN进行比较，结果为false，因为IEEE 754如是说.) 请注意，所有这些之间的区别都与其处理原语有关; 这三个运算符的原语中，没有一个会比较两个变量是否结构上概念类似。对于任意两个不同的非原始对象，即便他们有相同的结构， 以上三个运算符都会计算得到 false 。

#### 等式 (x !== x) 成立的唯一情况是 x 的值为 NaN


