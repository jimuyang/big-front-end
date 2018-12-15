# 组件可以将UI切分成一些独立的、可复用的部件，这样你就只需专注于构建每一个单独的部件。

`组件从概念上看就像是函数，它可以接收任意的输入值（称之为“props”），并返回一个需要在页面上展示的React元素`

定义一个组件最简单的方式是按照定义一个函数：
```js
function welcome(props) {
    return <h1> Hello, {props.name}</h1>;
}
```
更常见的做法是继承 React.Component
```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

> 组件名称必须以大写字母开头。
> 例如，<div /> 表示一个DOM标签，但 <Welcome /> 表示一个组件，并且在使用该组件时你必须定义或引入它


```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```
> 组件的返回值只能有一个根元素。这也是我们要用一个<div>来包裹所有<Welcome />元素的原因。


# React是非常灵活的，但它也有一个严格的规则：所有的React组件必须像纯函数那样使用它们的props。
`纯函数：不会改变自己的入参，不依赖除入参外的其他环境变量，相同的入参永远得到相同的结果`

