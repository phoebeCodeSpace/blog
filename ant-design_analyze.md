# ant-design 源码分析

## common

- [omit.js](https://github.com/benjycui/omit.js) 移出对象的指定属性，而实现浅拷贝
- [classnames](https://github.com/JedWatson/classnames) 输出className的值
- [rc-animate](http://react-component.github.io/animate/) 实现react动画

目录结构：

``` bash
  1、demo：alert组件的使用方法
  2、style：组件内部可能用到的初始化样式
  3、2个.md说明文档，一个是英文版，一个是中文版
  4、index.tsx：alert组件（关于这个组件，我是有话要说的，这个命名应该用alert，然后index通常是用来导出alert组件，antd每个组件都不是同一个人写的，估计写alert组件的人也没考虑那么多。）
```

type:
React.ReactNode
React.MouseEventHandler<HTMLAnchorElement>
React.CSSProperties css样式

参考：
- [alert](https://segmentfault.com/a/1190000007904615)