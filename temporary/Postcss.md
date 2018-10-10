# webpack集成postcss —— 解决css问题方案

- 提升css开发效率
- css兼容优化：使用未来的css语法
- css引用资源优化
- css输出优化：输出质量更优的代码
  - css代码压缩
  
<!-- TOC -->

- [css效率优化](#css效率优化)
  - [语法效率](#语法效率)
  - [图片开发效率](#图片开发效率)
- [css兼容优化：使用未来的css语法](#css兼容优化使用未来的css语法)
- [css输出优化：输出质量更优的代码](#css输出优化输出质量更优的代码)
  - [css代码压缩](#css代码压缩)

<!-- /TOC -->

## css效率优化

### 语法效率

- [postcss-utilities](https://github.com/ismamz/postcss-utilities) 最常用的简写方式和书写帮助
- [precss](https://github.com/jonathantneal/precss) 在css中使用sass语法

### 图片开发效率

- [postcss-assets](https://github.com/borodean/postcss-assets) 自动计算图片尺寸和内联文件

```bash
npm install postcss-assets --save-dev
```

```css
width: width($deletePath, 2);
height: height($deletePath, 2);
background-size: size($deletePath, 2);
background-image: url($deletePath);
```

## css兼容优化：使用未来的css语法

- [autoprefixer](https://github.com/postcss/autoprefixer) 添加前缀
- [postcss-preset-env](https://github.com/csstools/postcss-preset-env)  兼容[未来的CSS]((https://preset-env.cssdb.org/features))

```bash
npm install postcss-preset-env autoprefixer --save-dev
```

```js
module.exports = {
    plugins: {
        'autoprefixer': {},
        'postcss-preset-env': {
            stage: 0
        }
    },
};
```

## css输出优化：输出质量更优的代码

### css代码压缩

- [cssnano](https://github.com/cssnano/cssnano)

```bash
npm install cssnano --save-dev
```

```js
module.exports = {
    plugins: {
        'cssnano': {}
    },
};
```