# UI库开发中样式的组件化

因为自己最近在开发两个UI库 [vue+scss](https://github.com/phoebeCodeSpace/emic-element) 和 [react+less](https://github.com/phoebeCodeSpace/emic-element-tsx)，在样式的组件化开发有所心得，在此总结。

本文会包括以下几个方面：

1. [样式目录结构](#样式目录结构)
2. [使用 CSS 预处理器](#使用-css-预处理器)
3. [Alert组件实践](#alert组件实践)
    - [前置知识](#alert组件实践)
    - [具体实现](#具体实现)

## 样式目录结构

将样式统一归放到一个文件夹下管理：

- `base`文件夹管理基本样式，如`reset`样式
- `mixin`文件夹管理方法混合，提升开发效率
- `theme`文件夹管理公共变量，以便更灵活地维护样式，实现样式可定制
- `widget`文件夹管理组件样式，并保持组件名与样式文件名一致

``` bash
styles/
  ├── base/               # 基本样式
  │   └── reset.less/reset.scss
  ├── mixin/              # 方法混合
  │   ├── animation.less/animation.scss
  │   ├── index.less/index.scss
  │   ├── layout.less/layout.scss
  │   ├── size.less/size.scss
  │   ├── layout.less/text.scss
  │   └── ...
  ├── theme/              # 定义变量
  │   └── default.less/default.scss
  ├── widget/             # 组件样式
  │    ├── alert.less/alert.scss
  │    ├── button.less/button.scss
  │    ├── icon.less/icon.scss
  │    ├── index.less/index.scss
  │    └── ...
  └── index.less          # 入口文件
```

## 使用 CSS 预处理器

1. 定义主题变量
    - 定义主题变量便于制定网站统一风格。
    - 根据变量文件可以很方便地调整网站整体样式，定制私有网站风格。
    例如，在运用`element`或`antd`UI组件库的时候，定制主题时根据变量修改值：
    - [element-variables.scss](https://github.com/ElemeFE/element/blob/dev/packages/theme-chalk/src/common/var.scss)
    - [antd-default.less](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less)
2. 利用嵌套添加作用域空间
    - 给样式加上作用域空间可以避免组件样式影响外部的样式。
    - 保持组件文件名、组件样式名、样式作用域空间一致，可以很好的将其关联起来，便于开发者理解。
3. 利用混合高效开发
    - 对于重复样式用混合封装，提高开发效率。
    - 减少重复性代码，使代码更精简。
4. 循环语句和判断语句实现样式可拓展性

## Alert组件实践

以下将以简单的alert组件为例，具体说明：

### 前置知识点

以下代码需要掌握的知识点：
1. [嵌套](http://lesscss.cn/features/#parent-selectors-feature)
    ``` less/scss
      .button{
        &-large{
          // ..
        }
        &-primary{
          // ..
        }
      }
    ```

2. [循环](http://lesscss.cn/features/#loops-feature)

    ``` less
      .generate-columns(4);

      .generate-columns(@n, @i: 1) when (@i =< @n) {
        .column-@{i} {
          width: (@i * 100% / @n);
        }
        .generate-columns(@n, (@i + 1));
      }
    ```

3. [函数](http://lesscss.cn/functions/)

    ``` less
      length(@list)             // 获取列表长度
      extract(@list,@index)     // 获取列表第index项值
      tint(@color,@weight)      // 相当于mix(#ffffff, @color, @weight)
    ```

### 具体实现

通过传递不同type属性（`success`、`info`、`warning`、`error`），改变提示样式。
![alert-style](./comp-style/alert-style.png)

#### 主要布局

通过vue或react最终渲染出的html布局如下：

``` html
<!-- info -->
<div class="emic-alert emic-alert-info">
  <i class="icon-info emic-icon"></i>
  <div class="emic-alert-message">information</div>
</div>
<!-- success  -->
<div class="emic-alert emic-alert-success">
  <i class="icon-success emic-icon"></i>
  <div class="emic-alert-message">success</div>
</div>
<!-- warning -->
<div class="emic-alert emic-alert-warning">
  <i class="icon-warning emic-icon"></i>
  <div class="emic-alert-message">warning</div>
</div>
<!-- error -->
<div class="emic-alert emic-alert-error">
  <i class="icon-error emic-icon"></i>
  <div class="emic-alert-message">error</div>
</div>
```

以上类名可以看出：

1. 采用`@prefix-@widget`作为**命名空间** ，这里命名空间定义为`emic-alert`；
2. 根据传递**类型**确定类名，不同类型Alert编译的类名分别为：`emic-alert-info`、`emic-alert-success`、`emic-alert-warning`、`emic-alert-error`，以同样的规则编译不同icon类型。

#### 变量定义

``` less
@prefix : emic;                 // 样式前缀

// color
@white-color: #fff;
@primary-color: #4cabe9;
@info-color: @primary-color;     // 信息提示主要颜色
@success-color: #6ed739;         // 成功提示主要颜色
@warning-color: #ffb31a;         // 成功提示主要颜色
@danger-color: #fe4e4e;
@error-color: @danger-color;     // 错误提示主要颜色
@title-color: #303133;
@text-color: #606265;            // 提示文本颜色
@descri-color: #909399;

// alert
@alert-padding : 8px 15px;        // 控制alert框大小
@alert-bg-lighten : 65%;          // alert框背景增加透明度
@alert-border-radius : 5px;       // alert框圆角

```

#### 循环遍历

``` less
@alert-prefix-cls : ~"@{prefix}-alert";         // alert组件样式前缀

.@{alert-prefix-cls} {
    // 其他代码
    ...

    // 定义类型
    @types:info,success,warning,error;
    @len: length(@types);
    // 遍历类型
    .typesLoop(@counter) when (@counter > 0) {
      .typesLoop((@counter - 1));
      @name:extract(@types, @counter);
      &-@{name} {
        @color: "@{name}-color";
        background-color:tint(@@color,@alert-bg-lighten);
        border: 1px solid @@color;

        [class*=~"@{prefix}-icon"]{
          color: @@color;
        }
      }
    }
    .typesLoop(@len);
}
```

如果用scss，循环会更加简单易懂：

``` scss
$alert-prefix-cls:#{$css-prefix}-alert;   // alert组件样式前缀
.#{$alert-prefix-cls}{
  // 其他代码
  ...
  // 定义类型
  $type-list: (info:$primary-color, warning:$warning-color, success:$success-color, error:$error-color);
  @each $type,$color in $type-list {
    &-#{$type}{
      background-color: mix($white-color, $color, $alert-bg-lighten);
      border: 1px solid $color;
    }
    .icon-#{$type}{
      color: $color;
    }
  }
}
```

编译出来的css:

``` css
.emic-alert-info {
  background-color: #c0e2f7;
  border: 1px solid #4cabe9;
}
.emic-alert-info [class*=emic-icon] {
  color: #4cabe9;
}
.emic-alert-success {
  background-color: #ccf1ba;
  border: 1px solid #6ed739;
}
.emic-alert-success [class*=emic-icon] {
  color: #6ed739;
}
.emic-alert-warning {
  background-color: #ffe4af;
  border: 1px solid #ffb31a;
}
.emic-alert-warning [class*=emic-icon] {
  color: #ffb31a;
}
.emic-alert-error {
  background-color: #ffc1c1;
  border: 1px solid #fe4e4e;
}
.emic-alert-error [class*=emic-icon] {
  color: #fe4e4e;
}
```