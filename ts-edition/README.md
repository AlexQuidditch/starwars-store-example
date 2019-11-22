# starwars-store (TS Edition)

After installing dependencies, open `node_modules/vuex/types/vue.d.ts` and comment next lines:
```typescript
declare module "vue/types/vue" {
  interface Vue {
    $store: Store<any>;
  }
}
```
That will give you correct `$store` typings inside Vue Class Components.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
