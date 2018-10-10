# babel

## Babel 用户手册

### 安装

1. babel-cli `npm install --save-dev babel-cli`
  > Babel 的 CLI 是一种在命令行下使用 Babel 编译文件的简单方法。

  命令| 描述 | 举例
  ---|--- | ---
  --out-file/-o | 将结果写入到指定的文件 | `babel example.js -o compiled.js`
  --out-dir/-d | 想要把一个目录整个编译成一个新的目录 | `babel src -d lib`

2. babel-register `npm install --save-dev babel-register`
  > 另一个常用的运行 Babel 的方法

### 配置

.babelrc babel配置文件

``` bash
# 预设（presets） 插件（plugins）
{
  "presets": [],
  "plugins": []
}
```

1. babel-preset-es2015 `npm install --save-dev babel-preset-es2015`
  ``` bash
  {
    "presets": [
  +     "es2015"
      ],
      "plugins": []
  }
  ```
2. babel-preset-react `npm install --save-dev babel-preset-react`
  ``` bash
  {
    "presets": [
      "es2015",
  +   "react"
    ],
    "plugins": []
  }
  ```
3. babel-preset-stage-x `npm install --save-dev babel-preset-stage-2`
  ``` bash
  {
    "presets": [
      "es2015",
      "react",
  +   "stage-2"
    ],
    "plugins": []
  }
  ```

### 执行 Babel 生成的代码

- babel-polyfill 兼容性补丁
- babel-runtime 保持生成代码的整洁
  ``` bash
    # 安装
    $ npm install --save-dev babel-plugin-transform-runtime
    $ npm install --save babel-runtime
    # 配置
    {
      "plugins": [
    +   "transform-runtime",
        "transform-es2015-classes"
      ]
    }
  ```

### 指定插件

[babel插件列表](http://babeljs.io/docs/plugins/)

1. 安装插件 npm install --save-dev babel-plugin-transform-es2015-classes
2. 

## 插件手册

### 抽象语法树（ASTs）

AST 的每一层都拥有相同的结构：

``` bash
{
  type: "FunctionDeclaration",
  id: {...},
  params: [...],
  body: {...}
}
```
这样的每一层结构也被叫做 节点（Node）, 它们组合在一起可以描述用于静态分析的程序语法。