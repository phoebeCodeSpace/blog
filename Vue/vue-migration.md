# vue 迁移小记

> 记录超级总机项目从vue1迁移到vue2的过程。

## 1. 安装[迁移工具](https://github.com/vuejs/vue-migration-helper)

`npm install --global vue-migration-helper`

## 2. 在**当前项目下**运行迁移工具

`vue-migration-helper`

## 3. 根据提示修改

当工具识别出旧有的特性后，就会告知你并给出建议，同时附上关于详细信息的链接。

如下图所示：每条第一行表示更改建议，第二行表示代码位置，第三行表示修改原因，第四条详细信息查看链接。

大部分可以通过查找和替换 (find-and-replace) 来实现升级

![image](./assets/1.png)

修改的建议作为参考，根据具体情况进行修改。下图为`vue-migration-helper`提示错误，是外部调用的插件，本应该不需要修改。

![image](./assets/2.png)

因为 `Vue Router 2` 与 `Vue 2` 保持兼容，所以 `Vue Router` 必须升级的，对于 Vuex ，版本 0.8+ 与 Vue 2 保持兼容，所以部分不必强制升级。

以下记录修改比较多的地方：

### [Vue 迁移](https://cn.vuejs.org/v2/guide/migration.html)

1. 生命周期钩子函数
    - `init` 替换为 `beforeCreate`
    - `ready` 替换为 `mounted`，此外要注意引用`vm.$nextTick`的情况

2. `v-for`
    - 遍历对象的参数顺序 `(key, value)` ——> `(value, key)`
    - 移除了 `$index` 和 `$key`
    - `track-by` 已经替换为 `key`
    - `v-for` 范围值变更：`v-for="number in 10"` 的 `number`计数变化，从 `0` 开始到 `9` 结束，到现在从 `1` 开始，到 `10` 结束。

3. `.once` 和 `.sync` 修饰符移除

4. `Array.prototype.$remove` 移除，用 `Array.prototype.splice` 替代

### [Vue Router迁移](https://cn.vuejs.org/v2/guide/migration-vue-router.html)

1. `router.start`

``` js
    // before
    router.start(App, '#app')

    // after
    /* eslint-disable no-new */
    new Vue({
        el: '#app',
        router: router,
        render: h => h(App)
    })
```

2. Route 定义
    - `subRoutes` 重命名为 `children`
    - `router.redirect` 替换
    - `router.map()` 被废弃，使用`routes` 选项数组
``` js
    // before
    let router = new VueRouter()
    router.map({
        '/Admin': {
            name: 'admin',
            component: admin,
            subRoutes: {
                '/': {
                    name: 'SuperEnterprise',
                    component: sepEnterprise
                },
                '/ServerManage': {
                    name: 'ServerManage',
                    component: serverManage
                }
            }
        }
    })
    router.redirect({
    '*': '/Admin'
    })

    // after
    let router = new Router({
    routes: [{
        path: '/Admin',
        name: 'admin',
        component: admin,
        children: [{
                path: '',
                name: 'SuperEnterprise',
                component: sepEnterprise
            },
            {
                path: 'ServerManage',
                name: 'ServerManage',
                component: serverManage
            }]
        },
        {
            path: '*',
            redirect: '/Admin'
        }]
    })

```

3. `v-link` 指令已经被一个新的 `<router-link>`

4. `router.go` 替换 `router.push`

5. `router.beforeEach` 参数替换（建议全局查询 `transition`）

``` js
    // before
    router.beforeEach((transition) => {
        if (transition.to.path === '/forbidden') {
            transition.abort()
        } else {
            transition.next()
        }
        })
    // after
    router.beforeEach((to, from, next) => {
        if (to.path === '/forbidden') {
            next(false)
        } else {
            next()
        }
    })
```

## 4. 运行项目，根据错误提示继续修改

![image](./assets/3.png)

## 5. 检查浏览器报错

## 6. 检查系统功能