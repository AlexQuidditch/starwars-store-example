<template>
  <div :class="computedClassList">
    <table>
      <caption>Cart</caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Cost</th>
          <th>Summ</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="starship in order"
          :key="starship.name"
        >
          <td style="text-align:left">
            {{ starship.name }}
          </td>
          <td>{{ starship.quantity }}</td>
          <td>{{ starship.cost_in_credits }}</td>
          <td>
            <animated-number
              :value="starship.quantity * validateNumber(starship.cost_in_credits)"
              :duration="450"
              easing="easeInOutQuad"
              :format-value="formatToPrice"
            />
          </td>
          <td>
            <button @click="removeStarship(starship)">
              Remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <p>
      Total: <b><animated-number
        :value="total"
        :duration="450"
        easing="easeInOutQuad"
        :format-value="formatToPrice"
      /></b>
    </p>

    <form @submit.prevent="onCheckOut">
      <fieldset>
        <legend>Имя *</legend>
        <input
          id="form_name"
          v-model="form.name"
          name="name"
          placeholder="Имя *"
          required
        >
      </fieldset>

      <fieldset>
        <legend>Раса *</legend>
        <input
          v-model="form.race"
          name="race"
          placeholder="Раса *"
          required
        >
      </fieldset>

      <fieldset>
        <legend>Дата доставки *</legend>
        <input
          v-model="form.date"
          name="date"
          type="datetime"
          placeholder="Дата доставки *"
          required
        >
      </fieldset>

      <button
        type="submit"
        :disabled="!formIsValid"
      >
        Оплатить
      </button>
    </form>

    <div class="cart-widget">
      <span>Starships: {{ summary }}</span>
      <span>
        Total: <animated-number
          :value="total"
          :duration="450"
          easing="easeInOutQuad"
          :format-value="formatToPrice"
        />
      </span>
      <button
        :disabled="summary === 0"
        @click="opened = !opened"
      >
        Cart
      </button>
    </div>
  </div>
</template>

<script lang="ts">

import {
  ref,
  watch,
  reactive,
  computed,
  defineComponent,
} from 'vue-demi';
import { mask } from 'vue-the-mask';

// @ts-ignore
import AnimatedNumber from 'animated-number-vue';

import { CartForm, StarshipInCart } from '@/types';

import { useStore } from '@/store';
import { GETTERS, MODULES, MUTATIONS } from '@/store/types';

import { validateNumber, getObjectCopy } from '@/utils';

export default defineComponent({
  inheritAttrs: false,

  directives: {
    mask,
  },

  components: {
    AnimatedNumber,
  },

  setup() {
    const store = useStore();

    const form = reactive<CartForm>({
      name: '',
      race: '',
      date: '',
    });

    const opened = ref<boolean>(false);

    const order = computed(() => store.state.Cart.order);

    const summary = computed<number>(() => store.getters[`${MODULES.Cart}/${GETTERS.CART.summary}`]);

    const total = computed<number>(() => store.getters[`${MODULES.Cart}/${GETTERS.CART.total}`]);

    const computedClassList = computed(() => ['cart', { _opened: opened.value }]);

    const formIsValid = computed(() => {
      const { name, race, date } = form;
      return !!(name.length && race.length && date.length);
    });

    function removeStarship(starship: StarshipInCart) {
      return store.commit(`${MODULES.Cart}/${MUTATIONS.CART.REMOVE_STARSHIP}`, starship);
    }

    function clearCart() {
      store.commit(`${MODULES.Cart}/${MUTATIONS.CART.CLEAR_CART}`);
      form.name = '';
      form.race = '';
      form.date = '';
      opened.value = false;
    }

    function onCheckOut() {
      console.table({ form: getObjectCopy(form) });
      console.log({ order: getObjectCopy(order.value) });
      clearCart();
    }

    function formatToPrice(value: number): string {
      return value.toFixed(0);
    }

    watch(
      () => summary.value,
      (value: number, prev: number) => {
        if (value !== 0 || prev <= 0) { return; }
        opened.value = false;
      },
    );

    return {
      form,
      opened,
      order,
      summary,
      total,
      computedClassList,
      formIsValid,
      onCheckOut,
      removeStarship,
      formatToPrice,
      validateNumber,
    };
  },
});

</script>

<style lang="scss">

.cart {
  z-index: 50;
  text-align: center;
  top: 0;
  right: auto;
  bottom: auto;
  left: 50%;
  position: fixed;
  width: 480px;
  background-color: #fff;
  transform: translate(-50%, calc(-100% + 60px));
  box-shadow:
    0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12),
    0 5px 5px -3px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  will-change: top, transform;
  transition:
    top 0.6s ease-in-out,
    transform 0.6s ease-in-out;

  &._opened {
    top: 30%;
    transform: translate(-50%, -30%);
  }

  .cart-widget {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 16px;

    button {
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
    }
  }

  table {
    width: 100%;
  }
  form {
    display: flex;
    flex-direction: column;
  }
}

</style>
