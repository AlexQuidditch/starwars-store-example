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
        src="//upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/240px-JavaScript-logo.png"
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

<script>

import AnimatedNumber from 'animated-number-vue';

import StarshipItem from '../components/StarshipItem.vue';

export default {
  name: 'Store',

  components: {
    StarshipItem,
    AnimatedNumber,
  },

  data: () => ({
    interval: 0,
    counter: 0,
    search: '',
    filters: [
      'cost_in_credits',
      'hyperdrive_rating',
      'starship_class',
    ],
  }),

  computed: {
    filteredStarships () {
      const { search, selectedFilter } = this;
      return this.$store.getters['Store/filteredStarshipsByFilterAndSearch'](selectedFilter, search);
    },

    summary () {
      return this.$store.getters['Cart/summary'];
    },

    total () {
      return this.$store.getters['Cart/total'];
    },

    selectedFilter: {
      get () {
        return this.$route.query.filter_by;
      },
      set (value) {
        if (value.length) this.$router.push({ query: { filter_by: value } });
        else this.$router.replace({ query: {} });
      },
    }
  },

  async mounted () {
    await this.$nextTick();
    this.callLoadStarships();

    this.interval = setInterval(this.callLoadStarships, 60000);
  },

  methods: {
    async callLoadStarships () {
      await this.$store.dispatch('Store/loadStarships');
      this.counter = this.counter + 1;
    },

    stopLoadingStarships () {
      clearInterval(this.interval);
    },

    formatToPrice (value) {
      return value.toFixed(0);
    },
  }

};

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
