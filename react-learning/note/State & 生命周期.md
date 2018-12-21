# 声明周期图解

开始
|
static defaultProps = {}
static propTypes = {}
|
constructor() {
    super(); this.state = {}
}
|
componentWillMount()
|
render()
|
componentDidMount()
|
组件运行时
当父组件重新render或props改变时：componentWillReceiveProps()
state改变：

性能优化点：shouldComponentUpdate()
false: doNothing
true: 

componentWillUpdate()

render()

componentDidUpdate()

## 正确的使用state
关于setState()需要知道：
### 不要直接更新state
构造函数是唯一能够初始化 this.state 的地方。 其他时候都需要this.setState
### 状态更新可能是异步的
```js
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```
### 数据自顶而下流动



