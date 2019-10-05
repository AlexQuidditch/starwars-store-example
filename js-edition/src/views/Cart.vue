<template>
  <div class="cart">
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

    <button
      type="button"
      @click="opened = true"
    >
      Купить
    </button>

    <form
      :class="computedClassList"
      @submit.prevent="onCheckOut"
    >
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
  </div>
</template>

<script>

import AnimatedNumber from 'animated-number-vue';

import { validateNumber, getObjectCopy } from '@/utils';


export default {
  name: 'Cart',
  components: {
    AnimatedNumber,
  },
  inheritAttrs: false,

  data: () => ({
    opened: false,

    form: {
      name: '',
      race: '',
      date: '',
    },
  }),

  computed: {
    formIsValid () {
      const { name, race, date } = this.form;

      return !!(name.length && race.length && date.length);
    },

    order () {
      return this.$store.state.Cart.order;
    },

    summary () {
      return this.$store.getters['Cart/summary'];
    },

    total () {
      return this.$store.getters['Cart/total'];
    },

    computedClassList () {
      const { opened } = this;

      return [
        'checkout-widget',
        { _opened: opened }
      ];
    },
  },

  methods: {
    removeStarship (starship) {
      this.$store.commit('Cart/REMOVE_STARSHIP', starship);
    },

    clearCart () {
      this.$store.commit('Cart/CLEAR_CART');
      this.$router.push({ name: 'Store' });
    },

    onCheckOut () {
      const { form, order } = this;
      console.table({ form: getObjectCopy(form) });
      console.log({ order: getObjectCopy(order) });
      this.clearCart();
    },

    formatToPrice (value) {
      return value.toFixed(0);
    },

    validateNumber (value) {
      return validateNumber(value);
    }
  },
};

</script>


<style lang="scss" scoped>

.cart {
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

  .checkout-widget {
    z-index: 50;
    text-align: center;
    top: 0;
    right: auto;
    bottom: auto;
    left: 50%;
    position: fixed;
    width: 480px;
    background-color: #fff;
    transform: translate(-50%, -100%);
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
