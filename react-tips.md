# react-tips

- [ref详细用法](https://segmentfault.com/a/1190000008665915)
  1. ref可以设置回调函数
      > ref属性可以设置为一个回调函数，这也是官方强烈推荐的用法；这个函数执行的时机为：
      > 组件被挂载后，回调函数被立即执行，回调函数的参数为该组件的具体实例。
      > 组件被卸载或者原有的ref属性本身发生变化时，回调也会被立即执行，此时回调函数参数为null，以确保内存泄露
      ``` bash
      refCb(instance){
        console.log(instance);
      },
      render(){
        <ConfirmPass ref={this.refCb} onChange={this.handleChange}/>
      }
      ```
  2. ref可以设置字符串
      ``` bash
        # 设置
        <input ref="input" />
        # 获取
        let inputEl = this.refs.input;
        let inputEl = ReactDOM.findDOMNode(input)
      ```
  3. ref在无状态组件中的使用
      ``` bash
        # 设置
        <div ref={(node) => refDom = node}>
            ...
        </div>

        # 获取
        this.refDom
      ```