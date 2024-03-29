<template>
  <li :class="computedClassList">
    <h4 @click="opened = !opened">
      {{ starship.name }}
    </h4>

    <button
      v-show="inCart"
      type="button"
      class="starship-item__to-cart"
      style="margin-right:16px"
      @click="removeFromCart(starship)"
    >
      Remove from Cart
    </button>

    <button
      type="button"
      class="starship-item__to-cart"
      @click="addToCart(starship)"
    >
      Add to Cart
    </button>

    <div class="starship-item__details">
      <table>
        <thead>
          <tr>
            <th>Parameter:</th>
            <th>Value:</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(value, key) in starship"
            :key="key"
          >
            <td>{{ key }}</td>
            <td>{{ value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </li>
</template>

<script lang="ts">

import {
  ref,
  toRefs,
  computed,
  defineComponent,
} from 'vue-demi';

import { Starship } from '@/types';

import { useStore } from '@/store';
import { GETTERS, MODULES, MUTATIONS } from '@/store/types';

interface Props extends Record<string, any> {
  readonly starship: Starship;
}

export default defineComponent<Props>({
  props: {
    starship: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const { starship } = toRefs(props);

    const store = useStore();

    const opened = ref<boolean>(false);

    const computedClassList = computed(() => ['starship-item', { _opened: opened.value }]);

    const inCart = computed<boolean>(() => store.getters[`${MODULES.Cart}/${GETTERS.CART.checkStarshipInCart}`](starship.value.name));

    function addToCart(item: Starship) {
      return store.commit(`${MODULES.Cart}/${MUTATIONS.CART.ADD_STARSHIP}`, item);
    }

    function removeFromCart(item: Starship) {
      return store.commit(`${MODULES.Cart}/${MUTATIONS.CART.REMOVE_STARSHIP}`, item);
    }

    return {
      opened,
      computedClassList,
      inCart,
      addToCart,
      removeFromCart,
    };
  },
});

</script>

<style lang="scss">

.starship-item {
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row wrap;
  padding: 24px;
  margin: 12px 0;
  background-color: #fff;
  cursor: default;
  text-align: left;
  border-radius: 4px;
  box-shadow:
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);

  &._opened {
    .starship-item__details {
      display: block;
    }
  }

  &__to-cart {
    height: 36px;
    min-width: 64px;
    padding: 0 16px;
    border: none;
    border-radius: 4px;
    color: #fff;
    background-color: #934444;
    user-select: none;
    outline: none;
    cursor: pointer;
    text-transform: uppercase;
    transition: 0.3s ease-in;
    box-shadow:
      0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 1px 5px 0 rgba(0, 0, 0, 0.12),
      0 3px 1px -2px rgba(0, 0, 0, 0.2);

    &:hover,
    &:active,
    &:focus {
      box-shadow:
        0 3px 5px -1px rgba(0,0,0,.2),
        0 6px 10px 0 rgba(0,0,0,.14),
        0 1px 18px 0 rgba(0,0,0,.12);
    }
  }

  &__details {
    display: none;
    width: 100%;
  }

  h4 {
    flex: 1 1 auto;
    margin: 0;
    cursor: pointer;
    line-height: 36px;
  }

  p:last-child {
    margin: 0;
  }
}

</style>
