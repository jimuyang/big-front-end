
```javascript
const element = <h1> Hello, world!</h1>;
```

JSX: 一种javascript的语法扩展。长得像HTML，事实上完全是在javascript内部实现的。
JSX用来申明React中的元素。

# 你可以任意地在 JSX 当中使用 JavaScript 表达式，在 JSX 当中的表达式要包含在大括号里。

```javascript
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

## 推荐在 JSX 代码的外面扩上一个小括号，这样可以防止 分号自动插入 的 bug。


# 在编译之后 JSX其实会被转化为普通的javascript对象
## 什么样的对象呢：Babel 转译器会把 JSX 转换成一个名为React.createElement() 的方法调用。
```js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```
```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```
上面两种写法是完全等价的。

### React.createElement的返回对象大概是："React元素"
```js
// 注意: 以下示例是简化过的（不代表在 React 源码中是这样）
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world'
  }
};
```

### JSX可以防止注入XSS攻击 所有内容在渲染之前都被转化为了字符串

> 因为 JSX 的特性更接近 JavaScript 而不是 HTML , 所以 React DOM 使用 camelCase 小驼峰命名 来定义属性的名称，而不是使用 HTML 的属性名称。  
> 例如，class 变成了 className，而 tabindex 则对应着 tabIndex。

