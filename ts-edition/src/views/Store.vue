<template>
  <div class="store">
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
      <router-link :to="{ name: 'Cart' }">
        Cart
      </router-link>
    </div>

    <div class="store-header">
      <img
        alt="Vue logo"
        src="@/assets/logo.png"
      >
      <img
        alt="TypeScript logo"
        src="//raw.githubusercontent.com/remojansen/logo.ts/master/ts.png"
      >
      <p>Catalog updated: {{ counter }} times</p>
      <button @click="stopLoadingStarships">
        stop update starships
      </button>
    </div>

    <div class="store-controls">
      <fieldset class="store-controls__search">
        <legend>Search by name</legend>

        <label>
          <input
            v-model="search"
            type="search"
            placeholder="Search..."
          >
        </label>
      </fieldset>

      <fieldset class="store-controls__filter">
        <legend>Filter by parameter</legend>

        <select
          v-model="selectedFilter"
          aria-placeholder="sdqwd"
        >
          <option
            key="empty"
            value=""
          >
            empty
          </option>
          <option
            v-for="filter in filters"
            :key="filter"
            :value="filter"
          >
            {{ filter }}
          </option>
        </select>
      </fieldset>
    </div>


    <ul class="starship-list">
      <Starship-Item
        v-for="(starship, index) in filteredStarships"
        :key="index"
        v-bind="{ starship }"
      />
    </ul>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-restricted-syntax */

import { Component, Vue, Watch } from 'vue-property-decorator';
// @ts-ignore
import AnimatedNumber from 'animated-number-vue';

import { Starship } from '@/@types';

import StarshipItem from '@/components/StarshipItem.vue';


@Component({
  components: {
    StarshipItem,
    AnimatedNumber,
  },
})
export default class Store extends Vue {
  private interval: number = 0;
  private counter: number = 0;
  private search: string = '';
  private filters: Array<string> = [
    'cost_in_credits',
    'hyperdrive_rating',
    'starship_class',
  ];

  // не самый изящный алгоритм поиска
  private get filteredStarships (): Array<Starship> {
    const { search, selectedFilter } = this;
    return this.$store.getters['Store/filteredStarshipsByFilterAndSearch'](selectedFilter, search);
  }

  private get summary (): number {
    return this.$store.getters['Cart/summary'];
  }

  private get total (): number {
    return this.$store.getters['Cart/total'];
  }

  private get selectedFilter () {
    return this.$route.query.filter_by;
  }

  private set selectedFilter (value) {
    if (value.length) this.$router.push({ query: { filter_by: value } });
    else this.$router.replace({ query: {} });
  }

  public async mounted () {
    await this.$nextTick();
    this.callLoadStarships();

    this.interval = setInterval(this.callLoadStarships, 60000);
  }

  private async callLoadStarships () {
    await this.$store.dispatch('Store/loadStarships');
    this.counter = this.counter + 1;
  }

  private stopLoadingStarships () {
    clearInterval(this.interval);
  }

  private formatToPrice (value: number): string {
    return value.toFixed(0);
  }
}
</script>


<style lang="scss">

.store {
  img {
    width: 200px;
    margin: 0 16px;
    &:nth-child(2) {
      width: 187px;
    }
  }
}

.store-controls {
  display: flex;
  flex-flow: row nowrap;

  &__search {
    flex: 1 1 50%;
    input {
      width: 300px;
    }
  }
  &__filter {
    flex: 1 1 auto;
  }
}

.starship-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

</style>
