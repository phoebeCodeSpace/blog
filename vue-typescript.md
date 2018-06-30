# vue+typescript中遇到的坑

## basic

[TypeScript-Vue-Starter](https://github.com/Microsoft/TypeScript-Vue-Starte)

- [`Property xxx has no initializer and is not definitely assigned in the constructor.`](https://github.com/kaorun343/vue-property-decorator/issues/81)

```typescript
  // error
  @Component
  export default class Modal extends Vue {
    @Prop()
    title: string;
  }

  // solve
  @Component
  export default class Modal extends Vue {
    @Prop()
    title!: string;
  }
```

- [`Invalid prop: type check failed for prop "value". Expected Object, got Number.`](https://github.com/kaorun343/vue-property-decorator/issues/69)

```typescript
  // error
  @Prop()
  service: Array<any>;
  @Prop()
  customer: Array<any>;

  // solve  https://github.com/vuejs/vue/issues/1032
  @Component({
    name: 'Conversation',
    props : {
      service: {
        type: Array,
        default: () => []
      },
      customer: {
        type: Array,
        default: () => []
      }
    }
  })
```

## router

``` js
// 注册路由钩子
// https://github.com/vuejs/vue-class-component
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
])
```