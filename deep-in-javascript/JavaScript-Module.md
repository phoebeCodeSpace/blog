# JavaScript 模块化

## 模块化概念

在js中，模块就是对象，定义一个对象，把自己的属性和方法封装起来。

模块化编程就是通过组合一些 **相对独立可复用** 的模块来进行功能的实现，其最核心的两部分是 **定义模块** 和 **引入模块**；

- 定义模块时，每个模块内部的执行逻辑是不被外部感知的，只是导出（暴露）出部分方法和数据；
- 引入模块时，同步 / 异步去加载待引入的代码，执行并获取到其暴露的方法和数据；

## 命名空间模式

最早的时候，我们这么写代码：

``` js
function fn1(){
//...
}

function fn2(){
//...
}
```

这种做法的缺点很明显：

- 污染了全局变量
- 无法保证不与其他模块发生变量名冲突
- 而且模块成员之间看不出直接关系

为了解决以上的问题，我们将方法封装到 **对象** 里：

``` js
var module = {
  fn1: function(){},
  fn2: function(){}
}
```

但是，这样的写法又暴露了令一些问题：

- 所有变量都必须声明为公有，所以都要加this指示作用域以引用这些变量
- 会暴露所有模块成员
- 内部状态可以被外部改写

为了避免暴露私有成员以及防止外部改变内部状态，于是我们用 **立即执行函数**：

``` js
var module1 = (function(){

  var _private = 0;

  var fn1 = function(){
  //...
  };

  var fn2 = function(){
  //...
  };

return {
  fn1 : fn1,
  fn2 : fn2
};

})();

// 外部访问不了私有属性，这样才能保证私有变量的安全。
module1._private  // undefined
```

当一个项目要用到模块化的时候，说明这个项目足够大足够复杂，一个模块可能需要继承另一个模块，或者扩充模块，这时候需要使用 **放大模式**：

``` js
// Define a module
var moduleA = (function ($, doc) {
  var methodA = function() {};
  var dataA = {};
  return {
    methodA: methodA,
    dataA: dataA
  };
})(jQuery, document);

// Use a module
var result = moduleA.mehodA();
```

可是，浏览器是一个不按常理出牌的环境，你永远不知道自己引用的模块是否已经加载。万一我之前的loveThing没有被加载，上面这段代码就会报错了（找不到对象）。解决方法就是所谓 **宽放大模式**：

``` js
var module1 = ( function (mod){
  //...
  return mod;
})(window.module1 || {});
```

＂宽放大模式＂就是”立即执行函数”的参数可以是空对象。


<!-- 通过立即执行函数（IIFE）来声明依赖以及导出数据，这与当下的模块化方案并无巨大的差异，可本质上却有千差万别，无法满足的一些重要的特性；

定义模块时，声明的依赖不是强制自动引入的，即在定义该模块之前，必须手动引入依赖的模块代码；
定义模块时，其代码就已经完成执行过程，无法实现按需加载；
跨文件使用模块时，需要将模块挂载到全局变量（window）上； -->

## CommonJS

2009年，nodejs横空出世，开创了一个新纪元，人们可以用js来编写服务端的代码了。如果说浏览器端的js即便没有模块化也可以忍的话，那服务端是万万不能的。

在CommonJS中，有一个全局性方法require()，用于加载模块。假定有一个数学模块math.js，就可以像下面这样加载。
CommonJs规范遵循的是 **同步** 加载模块规范，因为CommonJs是在Node上运行，处于服务器环境，服务器环境对模块的加载等同于硬盘的读写速度，是非常非常快的。

``` js
var math = require('math');
```

然后，就可以调用模块提供的方法：

``` js
var math = require('math');

math.add(2,3); // 5
```

## AMD/CMD

Modules/1.0规范源于服务端，无法直接用于浏览器端。
浏览器端的模块，不能采用”同步加载”（synchronous），只能采用”异步加载”（asynchronous）。这就是AMD规范诞生的背景。
异步加载所需的模块，然后在回调函数中执行主逻辑。
在CommonJs的基础上衍生出了AMD／CMD规范，其各自的实践分别是RequireJS和SeaJs

### AMD/RequireJs

[AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)是”Asynchronous Module Definition”的缩写，意思就是”异步模块定义”。
RequireJS 对模块定义的规范化产出
AMD规范定义了一个自由变量或者说是全局变量 define 的函数。

``` JS
define( id?, dependencies?, factory );
```

第一个参数 id 为字符串类型，表示了模块标识，为可选参数。若不存在则模块标识应该默认定义为在加载器中被请求脚本的标识。如果存在，那么模块标识必须为顶层的或者一个绝对的标识。

第二个参数，dependencies ，是一个当前模块依赖的，已被模块定义的模块标识的数组字面量。

第三个参数，factory，是一个需要进行实例化的函数或者一个对象。

``` js
// 创建模块标识为 alpha 的模块，依赖于 require， export，和标识为 beta 的模块
define("alpha", [ "require", "exports", "beta" ], function( require, exports, beta ){
    export.verb = function(){
        return beta.verb();
        // or:
        return require("beta").verb();
    }
});
```

### CMD/seajs

[CMD](https://github.com/cmdjs/specification/blob/master/draft/module.md)(Common Module Definition)
SeaJS 对模块定义的规范化产出

在CMD中，一个模块就是一个文件，格式为：

``` JS
// 全局函数define，用来定义模块。
define( factory );

//定义JSON数据模块
define({ "foo": "bar" });

//通过字符串定义模板模块
define('this is {{data}}.');

//factory 为函数的时候，表示模块的构造方法，执行构造方法便可以得到模块向外提供的接口
define( function(require, exports, module) {
    // 模块代码
});

define( 'module', ['module1', 'module2'], function( require, exports, module ){
    // 模块代码
} );
```

### 区别

**CMD 推崇依赖就近，AMD 推崇依赖前置。** AMD 的 API 默认是一个当多个用，CMD 的 API 严格区分，推崇职责单一。

``` js
// CMD
define(function(require, exports, module) {
    var a = require('./a')
    a.doSomething()
    // 此处略去 100 行
    var b = require('./b') // 依赖可以就近书写
    b.doSomething()
    // ...
})

// AMD 默认推荐的是
define(['./a', './b'], function(a, b) { // 依赖必须一开始就写好
    a.doSomething()
    // 此处略去 100 行
    b.doSomething()
    // ...
})
```

### 按需加载

页面需要什么模块，就加载什么模块(和这些模块依赖的模块)，从而实现了按需加载。
这个地方有个小缺陷，虽然模块化Js使得加载逻辑更清晰了，但是如此碎片化的Js会增加页面http的请求数，从而影响页面的加载速度。
对当前页面依赖的所有Js做一个合并处理，即合并压缩成一个Js文件， 这样能最大程度上的利用浏览器缓存，减少Http请求数。

## ES2015 Modules

每一个模块都有自己单独的作用域，模块之间的相互调用关系是通过 export 来规定模块对外暴露的接口，通过import来引用其它模块提供的接口。同时还为模块创造了命名空间，防止函数的命名冲突。

## 参考文档：

- [JavaScript 模块化七日谈](https://huangxuan.me/js-module-7day/)
- [Javascript 模块化指北](https://segmentfault.com/a/1190000016276287)
- [JavaScript 模块化历程](http://web.jobbole.com/83761/)
- [javascript模块化](https://segmentfault.com/a/1190000012058068)
- [JavaScript 模块演化简史](https://segmentfault.com/a/1190000008979684)
- [造轮子和用轮子：快速入门JavaScript模块化](https://segmentfault.com/a/1190000004619857)
- [Javascript模块化编程（一）：模块的写法](http://web.jobbole.com/29553/)