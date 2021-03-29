<template>
  <App-Wrapper>
    <router-view />
  </App-Wrapper>
</template>

<script lang="ts">

import { defineComponent } from 'vue-demi';

import AppWrapper from './components/layout/AppWrapper.vue';

export default defineComponent({
  inheritAttrs: false,
  components: { AppWrapper },
});

</script>
