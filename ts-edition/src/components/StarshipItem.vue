<template>
  <li :class="computedClassList">
    <h4 @click="opened = !opened">
      {{ starship.name }}
      <!-- | {{ starship.cost_in_credits }} -->
      <!-- | {{ starship.hyperdrive_rating }} -->
      <!-- | {{ starship.starship_class }} -->
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

import { Vue, Component, Prop } from 'vue-property-decorator';

import { Starship } from '@/@types';


@Component({ inheritAttrs: false })
export default class StarshipItem extends Vue {
  @Prop({ required: true })
  private readonly starship!: Starship;

  private opened: boolean = false;

  private get computedClassList () {
    const { opened } = this;

    return [
      'starship-item',
      { _opened: opened },
    ];
  }

  private get inCart (): boolean {
    return this.$store.getters['Cart/checkStarshipInCart'](this.starship.name);
  }

  private addToCart (starship: Starship) {
    this.$store.commit('Cart/ADD_STARSHIP', starship);
  }

  private removeFromCart (starship: Starship) {
    this.$store.commit('Cart/REMOVE_STARSHIP', starship);
  }
}

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
