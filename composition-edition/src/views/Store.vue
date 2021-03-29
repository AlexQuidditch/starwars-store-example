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

import {
  ref,
  computed,
  defineComponent,
  onMounted,
  nextTick,
} from 'vue-demi';

// @ts-ignore
import AnimatedNumber from 'animated-number-vue';

import { Starship } from '@/types';

import { useStore } from '@/store';
import { MODULES, GETTERS } from '@/store/types';

import { useRoute, useRouter } from '@/router';

import StarshipItem from '@/components/StarshipItem.vue';

export default defineComponent({
  components: {
    StarshipItem,
    AnimatedNumber,
  },

  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const interval = ref<any>(null); // timer

    const counter = ref<number>(0);

    const search = ref<string>('');

    const filters = ref<string[]>([
      'cost_in_credits',
      'hyperdrive_rating',
      'starship_class',
    ]);

    const selectedFilter = computed({
      get: () => route.query.filter_by,
      set(value) {
        if (value.length) router.push({ query: { filter_by: value } });
        else router.replace({ query: {} });
      },
    });

    // не самый изящный алгоритм поиска;
    const filteredStarships = computed<Starship[]>(() => store.getters['Store/filteredStarshipsByFilterAndSearch'](selectedFilter, search.value));

    const summary = computed<number>(() => store.getters[`${MODULES.Cart}/${GETTERS.CART.summary}`]);

    const total = computed<number>(() => store.getters[`${MODULES.Cart}/${GETTERS.CART.total}`]);

    async function callLoadStarships() {
      await store.dispatch('Store/loadStarships');
      counter.value += 1;
    }

    function stopLoadingStarships() {
      clearInterval(interval.value);
    }

    function formatToPrice(value: number): string {
      return value.toFixed(0);
    }

    onMounted(async () => {
      await nextTick();
      callLoadStarships();
      interval.value = setInterval(callLoadStarships, 60000);
    });

    return {
      interval,
      counter,
      search,
      filters,
      filteredStarships,
      summary,
      total,
      callLoadStarships,
      stopLoadingStarships,
      formatToPrice,
      selectedFilter,
    };
  },
});

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
