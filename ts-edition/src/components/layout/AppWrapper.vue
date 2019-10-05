<template>
  <div
    id="wrapper"
    class="wrapper"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot name="default" />
  </div>
</template>


<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';


@Component({ inheritAttrs: false })
export default class AppWrapper extends Vue {}

</script>


<style lang="scss">

*,
*::before,
*::after {
  box-sizing: inherit;
}

body , html {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box;
}

.wrapper {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  max-width: 1180px;
  margin: 0 auto;
  padding: 16px;
  background-color: #efdecd;
}

</style>
