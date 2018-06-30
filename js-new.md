# js 新知

## 管道操作符

> 目前只有火狐支持
> 语法： `expression |> function`

``` js
const square = (n) => n * n;
const increment = (n) => n + 1;

// 不使用管道操作符
square(increment(square(2))); // 25

// 使用管道操作符
2 |> square |> increment |> square; // 25
```

## Async/Await 解构

``` js
const [user, account] = await Promise.all([
  fetch('/user'),
  fetch('/account')
])
```

## 浅拷贝

``` js
const obj = { ...oldObj }
const arr = [ ...oldArr ]
```

## 多个异步处理顺序执行

``` js
   urls.reduce((previousValue, currentValue) => {
        return previousValue.then(() => Axios.get(currentValue))
    }, Promise.resolve())

    // 实现如下效果
     Promise.then(() => new Promise()).then(() => new Promise()).then(() => ...)
```

## toLocaleString

``` js
const date = new Date();
date.toLocaleString('zh');    // 2018/4/4 下午15:08:38
date.toLocaleString('en');    // 4/4/2018, 3:08:38 PM

const num = 2333333;
num.toLocaleString();   // 2,333,333

const a = 0.2
a.toLocaleString('zh',{ style: 'percent'});  // 20%

const date = new Date();
date.toLocaleString('zh', { hour12: true });        //2018/4/4 下午6:57:36
date.toLocaleString('zh', { hour12: false });       //2018/4/4 18:57:36

```

### 参考：
- [我未曾见过的 JS 特性](https://juejin.im/post/5a723216f265da3e2e62d0a5?utm_source=gold_browser_extension)
- [7 个 ES6 编码技巧](https://juejin.im/entry/5a6c2f3f518825732d7fd5ca?utm_source=gold_browser_extension)
- [想偷懒的话，toLocaleString 了解一下](https://juejin.im/post/5ac472016fb9a028c22afa9d)