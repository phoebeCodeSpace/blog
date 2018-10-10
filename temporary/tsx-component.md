# 如何用tsx写一个组件

> 实例：模态框组件

## 脚手架构建项目

## 开始

一个组件的总体框架：

``` jsx
  import * as React from 'react';
  import PropTypes from 'prop-types';

  export interface AppProps {
  }

  export interface AppState {
  }

  export default class App extends React.Component<AppProps, AppState> {
    static defaultProps = {
    };
    static propTypes = {
    };
    constructor(props: AppProps) {
      super(props);

        // this.state = {
        // }
    }

    render() {
      return (
        <div>
          APP
        </div>
      );
    }
  }
```

需求整理：

[React typings](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react):
类型 |说明
---|---
[ReactNode](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts#L171) | react节点
[HTMLElement](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/global.d.ts#L27) | HTML 元素
[CSSProperties](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts#L822) | CSS样式
[MouseEvent](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts#L520) | 鼠标事件