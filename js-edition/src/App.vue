<template>
  <App-Wrapper>
    <router-view />
  </App-Wrapper>
</template>

<script>

import AppWrapper from './components/layout/AppWrapper.vue';


export default {
  name: 'StarWarsStore',
  components: {
    AppWrapper,
  },
  inheritAttrs: false,
};

</script>
