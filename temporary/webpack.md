# 优化

## webpack

### webpack体积优化

tree-shaking：去除没用过的代码

UglifyJsPlugin：压缩代码

ExtractTextPlugin：提取css出来

### webpack速度优化：

1. 减少打包文件数量

    - dll
    - 减少不必要的resolve
      - 看下webpack的每个rule下面include里面是不是有多余的resolve，或者看看有没有把node_modules文件夹exclude掉。
      - 用到babel-loader的地方，记得设置cacheDirectory，以利用bable的缓存。
      - resolve里面的extensions可以删除不必要的后缀名自动补全，减少webpack的查询时间，比如extensions: ['.js', '.vue', '.json','.scss','.css'],写这么多自动补全写代码的时候是省了后缀名了，但是这需要webpack打包时去自动查询后缀增加了时间开销。
      - import时多使用完整路径而不是目录名，如import './components/scroll/index.js'而不是import './components/scroll，减少webpack的路径查询。

2. 去除不必要的功能开销

    - 关掉source map
      ``` bash
        eval： 生成代码 每个模块都被eval执行，并且存在@sourceURL

        cheap-eval-source-map： 转换代码（行内） 每个模块被eval执行，并且sourcemap作为eval的一个dataurl

        cheap-module-eval-source-map： 原始代码（只有行内） 同样道理，但是更高的质量和更低的性能

        eval-source-map： 原始代码 同样道理，但是最高的质量和最低的性能

        cheap-source-map： 转换代码（行内） 生成的sourcemap没有列映射，从loaders生成的sourcemap没有被使用

        cheap-module-source-map： 原始代码（只有行内） 与上面一样除了每行特点的从loader中进行映射

        source-map： 原始代码 最好的sourcemap质量有完整的结果，但是会很慢
      ```
3. 优化打包方式：并行
    - UglifyJSPlugin并行
        ``` bash
          new UglifyJSPlugin({
                  parallel: true
                  ......
          })
        ```

## 

## 参考

- [webpack+react+antd脚手架优化](https://juejin.im/post/5abe022ff265da238059c181#heading-2)
- [移动spa商城优化记（一）---首屏优化篇](https://juejin.im/post/5aaf9e5cf265da239c7b2b93)
- [移动spa商城优化记（二）--- 减少70%的打包等待时间](https://juejin.im/post/5abf13bf6fb9a028cc61577d)