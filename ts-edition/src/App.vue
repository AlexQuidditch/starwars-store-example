<template>
  <App-Wrapper>
    <router-view />
  </App-Wrapper>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';

import AppWrapper from './components/layout/AppWrapper.vue';


@Component({
  inheritAttrs: false,
  components: {
    AppWrapper,
  },
})
export default class StarWarsStore extends Vue {}

</script>
