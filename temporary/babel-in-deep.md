# 深入理解babel

## 概念：什么是babel

Babel 是一个 JavaScript 编译器。

Babel 通过语法转换器支持最新版本的 JavaScript 。 这些插件允许你立刻使用新语法，无需等待浏览器支持。

## 使用：配置文件 `.babelrc`

在.babelrc配置文件中，主要是对预设（presets）和插件（plugins）进行配置。

``` bash
{
  "presets": [],
  "plugins": []
}
```

[babel-handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md)
[babel之配置文件.babelrc入门详解](https://juejin.im/post/5a79adeef265da4e93116430)
[plugins](https://babeljs.cn/docs/plugins/)

### presets

#### Official Presets

babel-preset-env 相当于 es2015 ，es2016 ，es2017 及最新版本。

#### Stage-X (实验阶段 Presets)

> Stage-x preset 中的任何转换都是对未被批准为 JavaScript 版本一部分的语言的变化(如 es6 / es2015 )。
这些提案可能会有所改动，因此请**谨慎使用**，尤其是第 3 阶段以前的提案。

TC39 将提案分为以下几个阶段:

- Stage 0 - 稻草人: 只是一个想法，可能是 babel 插件。
- Stage 1 - 提案: 初步尝试。
- Stage 2 - 初稿: 完成初步规范。
- Stage 3 - 候选: 完成规范和浏览器初步实现。
- Stage 4 - 完成: 将被添加到下一年度发布。

具体[弄清楚babel的stage](https://zhuanlan.zhihu.com/p/25961891)

### plugins

## 原理：babel如何工作


``` bash
  babel : AST :: jQuery : DOM
```

babel 对于 AST 就相当于 jQuery 对于 DOM, 就是说babel给予了我们便捷查询和修改 AST 的能力。(AST -> Abstract Syntax Tree) 抽象语法树 后面会讲到。

## 参考
- [探索babel和babel插件是怎么工作的](https://www.hazyzh.com/b/180211145458) 原理部分
- [Babel工作原理及Babel插件开发探索](https://fanerge.github.io/Babel%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E5%8F%8ABabel%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%91%E6%8E%A2%E7%B4%A2.html) 原理部分
- [Babel是如何读懂JS代码的](https://zhuanlan.zhihu.com/p/27289600) 原理部分