# 函数式编程
<!-- TOC -->

- [函数式编程](#函数式编程)
  - [理解概念](#理解概念)
  - [纯函数](#纯函数)
  - [柯里化](#柯里化)
  - [Partial Application(偏函数应用)](#partial-application偏函数应用)
  - [合成](#合成)
  - [Point Free](#point-free)
  - [容器、Functor](#容器functor)
  - [错误处理、Either](#错误处理either)

<!-- /TOC -->
## 理解概念

什么是函数式编程 （通常简称为 FP）

> 是指通过 **复合** **纯函数**来构建软件的过程，它避免了共享的状态、易变的数据、以及副作用。函数式编程是 **声明式** 而不是命令式，并且应用程序状态通过纯函数流转。

> 函数式编程使用函数作为重复使用的声明表达式，避免对状态进行修改，消除了副作用，并使用合成来构建函数。

理解函数式编程中核心概念：

纯函数（Pure functions）
函数复合（Function composition）
避免共享状态（Avoid shared state）
避免改变状态（Avoid mutating state）
避免副作用（Avoid side effects）
声明式与命令式（Declarative and Imperative）

函数式编程语言有以下特性：

- 函数是“一等公民”（first class）
- 不可变数据
- 使用递归而不是循环
- 柯里化
- 惰性求值（lazy）：指求值的过程并不会立刻发生。
- 代数数据类型
- 模式匹配

## 纯函数

> 纯函数的定义是，对于相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用，也不依赖外部环境的状态。

1. 相同输入总是会返回相同的输出
2. 不产生副作用
3. 不依赖于外部状态

``` js
//  slice 是纯函数 splice是不纯的
var arr = [1,2,3,4,5];

xs.slice(0,3); //=> [1,2,3]
xs.slice(0,3); //=> [1,2,3]

xs.splice(0,3); //=> [1,2,3]
xs.splice(0,3); //=> [4,5]
```

纯函数可以：

- 有效降低系统的复杂度
- 可缓存性（Cacheable）
- 可测试性（Testable）
- 合理性（Reasonable）

函数复合是结合两个或多个函数，从而产生一个新函数或进行某些计算的过程。

## 柯里化

> Currying(柯里化) 是把一个接受 N 个参数的函数转换成接受一个单一参数的函数，(把一个多参数的函数，转化为单参数函数)并且返回接受余下的参数而且返回结果的新函数的技术。也就是说每个函数都接受1个参数。

<!-- 事实上柯里化是一种“预加载”函数的方法，通过传递较少的参数，得到一个已经记住了这些参数的新函数，某种意义上讲，这是一种对参数的 **缓存** ，是一种非常高效的编写函数的方法： -->

Currying(柯里化) 是如何工作？它的工作方式是通过为每个可能的参数嵌套函数，使用由 **嵌套函数** 创建的 **自然闭包** 来保留对每个连续参数的访问。

![Currying如何工作](http://newimg88.b0.upaiyun.com/newimg88/2017/08/curry-function-closures.png)

写一个通用的 curry()：

```js
function curry(fn){
  // 返回一个名为 curried() 的函数
  return function curried(){
    var args = [].slice.call(arguments),  // 存储传递给它的参数
        context = this;   // 正确感知上下文
        // 参数的数量大于等于原始函数参数的数量
    if(args.length>=fn.length){
      // 使用所有参数调用的原始函数
      return fn.apply(context,args)
    }
    else{
      // 返回一个接受更多参数的函数，当被调用时，将使用之前传递的原始参数与传递给新返回的函数的参数结合在一起，再次调用我们的 curried 函数。
      return function(){
        var rest = [].slice.call(arguments);
        return curried.apply(context,args.concat(rest))
      }
    }
  }
}

function add(a,b,c){ return a+b+c; }      // 备注：add.length = 3 add的参数数量为3
var curriedAdd = curry(add);
curriedAdd(1)(2)(3); // 6
curriedAdd(1)(2,3);  // 6
```

curry() 在 ES6 中的实现：

```js
function curry(fn) {  
  return function curried(...args) {
    return args.length >= fn.length ?
      fn.call(this, ...args) :
      (...rest) =>  curried.call(this, ...args, ...rest);
  };
}
```

## Partial Application(偏函数应用)

> Partial Application(偏函数应用) 是指使用一个函数并将其应用一个或多个参数，但不是全部参数，在这个过程中创建一个新函数。

```js
function apply(fn /* partial arguments... */) {  
    var args = [].slice.call(arguments, 1);
    return function() {
        var _args = [].slice.call(arguments);
        return fn.apply(this, args.concat(_args));
    }
}

function add3(a, b, c) { return a+b+c; }
add3(2,4,8);   // 14
var add6 = add3.bind(this, 2, 4);
add6(10)      // 16
```

apply() 在 ES6 中的实现：

```js
// 应用左边任意数量的参数
function apply(fn, ...args) {  
  return (..._args) =>  fn(...args, ..._args);
}
```

## 合成

``` js
const compose = function (f, g) {
  return function (x) {
    return f(g(x));
  };
}

// 函数的合成还必须满足结合律
compose(f, compose(g, h))
// 等同于
compose(compose(f, g), h)
// 等同于
compose(f, g, h)
```

## Point Free

所谓 point 就是指作为参数传进函数的数据。point free 就是脱离数据的代码风格。通过做到 point free，我们做到了行为和数据的分离，这利于我们写出更安全（组合行为时没有副作用），更易扩展（脱离数据的逻辑容易复用），和更易理解（读高阶函数的组合就像读普通英文一样）的代码。

## 容器、Functor

Functor（函子）是实现了 map 并遵守一些特定规则的容器类型。
函数式编程一般约定，函子有一个of方法，用来生成新的容器。

## 错误处理、Either