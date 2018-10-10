# 尾调用优化

实现斐波那契函数:

```js
// 递归
function fib1(num){
    if (num === 1 || num === 2){
        return 1;
    }
    return fib1(num - 1) + fib1(num - 2);
}
// 循环
function fib2(num){
    var n1 = 1,
        n2 = 1,
        n = 1;
    for (var i = 3; i<=num; i++){
        n = n1 + n2;
        n1 = n2;
        n2 = n;
    }
    return n;
}
```