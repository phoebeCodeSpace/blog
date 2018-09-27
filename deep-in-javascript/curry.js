var records = [{
        "id": 1,
        "title": "Currying Things",
        "author": "Dave",
        "selfurl": "/posts/1",
        "published": 1437847125528,
        "tags": [
            "functional programming"
        ],
        "displayDate": "2015-07-25"
    },
    {
        "id": 2,
        "title": "ES6 Promises",
        "author": "Kurt",
        "selfurl": "/posts/2",
        "published": 1437926509394,
        "tags": [
            "es6",
            "promises"
        ],
        "displayDate": "2015-07-26"
    },
    {
        "id": 3,
        "title": "Monads, Futures, Promises",
        "author": "Beth",
        "selfurl": "/posts/3",
        "published": 1429984725528,
        "tags": [
            "promises",
            "futures"
        ],
        "displayDate": "2015-04-25"
    },
    {
        "id": 4,
        "title": "Basic Destructuring in ES6",
        "author": "Angie",
        "selfurl": "/posts/4",
        "published": 1433606509394,
        "tags": [
            "es6",
            "destructuring"
        ],
        "displayDate": "2015-06-06"
    },
    {
        "id": 5,
        "title": "Composing Functions",
        "author": "Tom",
        "selfurl": "/posts/5",
        "published": 1429034325528,
        "tags": [
            "functional programming"
        ],
        "displayDate": "2015-04-14"
    },
    {
        "id": 6,
        "title": "Lazy Sequences in FP",
        "author": "Dave",
        "selfurl": "/posts/6",
        "published": 1434902509394,
        "tags": [
            "functional programming"
        ],
        "displayDate": "2015-06-21"
    },
    {
        "id": 7,
        "title": "Common Promise Idioms",
        "author": "Kurt",
        "selfurl": "/posts/7",
        "published": 1438876909394,
        "tags": [
            "es6",
            "promises"
        ],
        "displayDate": "2015-08-06"
    },
    {
        "id": 8,
        "title": "Stop using Deferred",
        "author": "Dave",
        "selfurl": "/posts/8",
        "published": 1435773701255,
        "tags": [
            "promises",
            "futures"
        ],
        "displayDate": "2015-07-01"
    },
    {
        "id": 9,
        "title": "Default Function Parameters in ES6",
        "author": "Angie",
        "selfurl": "/posts/9",
        "published": 1436205701255,
        "tags": [
            "es6",
            "destructuring"
        ],
        "displayDate": "2015-07-06"
    },
    {
        "id": 10,
        "title": "Use more Parenthesis!",
        "author": "Tom",
        "selfurl": "/posts/10",
        "published": 1440604909394,
        "tags": [
            "functional programming"
        ],
        "displayDate": "2015-08-26"
    }
];

// 显示最近的文章（不超过一个月），按标签分组，按发布日期排序：
// 1. 过滤掉一个月以前的文章（ 比如30天）
// 封装过滤列表的行为。




// 2. 通过他们的 tags 对文章进行分组（ 这可能意味着如果他们有多个标签， 则会显示在两个分组中）
// 3. 按发布日期排序每个标签列表， 降序


function curry(fn) {
    // 返回名为  curried() 的命名函数表达式
    return function curried() {
        // 在 args 中存储传递给它的参数
        var args = [].slice.call(arguments),
            context = this; // 正确感知上下文
        // 如果参数的数量大于等于原始函数的数量
        return args.length >= fn.length ?
            // 返回使用所有参数调用的原始函数
            fn.apply(context, args) :
            // 返回一个接受更多参数的函数， 当被调用时， 将使用之前传递的原始参数与传递给新返回的函数的参数结合在一起， 再次调用我们的 curried 函数。
            function() {
                var rest = [].slice.call(arguments);
                return curried.apply(context, args.concat(rest));
            };
    };
}

// function max( /* variable arguments */ ) {
//     var args = [].slice.call(arguments);
//     return Math.max.apply(Math, args);
// }

// function range(start, end, step) {
//     var stop = Math.max(start, end),
//         start = Math.min(start, end),
//         set = [];
//     // step is optional
//     step = typeof step !== 'undefined' ? step : 1;
//     for (var i = start; i < = stop; i += step) {
//         set.push(i);
//     }
//     return set;
// }