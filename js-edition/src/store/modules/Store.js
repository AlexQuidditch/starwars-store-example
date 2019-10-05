/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable object-curly-newline */

import starships from '@/logic/starships';

import { getObjectCopy, validateNumber } from '@/utils';


const namespaced = true;

const state = {
  starships: [],
};

const getters = {
  filteredStarshipsByFilter: state => selectedFilter => {
    if (typeof selectedFilter === 'string' && selectedFilter) {
      const src = getObjectCopy(state.starships);

      if (selectedFilter === 'starship_class') {
        return src.sort((prev, next) => {
          if (selectedFilter && typeof selectedFilter === 'string') {
            if (prev.starship_class > next.starship_class) return -1;
            if (prev.starship_class < next.starship_class) return 1;
          }
          return 0;
        });
      }

      return src.sort((prev, next) => validateNumber(next[selectedFilter]) - validateNumber(prev[selectedFilter]));
    }

    return state.starships;
  },

  filteredStarshipsByFilterAndSearch: (state, getters) => (selectedFilter, search) => {
    if (search.length) {
      return getters.filteredStarshipsByFilter(selectedFilter)
        .filter(starship => {
          const results = [];

          for (const key in starship) {
            if (key) {
              const element = starship[key];
              results.push(String(element).toLowerCase().includes(search.toLowerCase()));
            }
          }
          return results.some(value => value);
        });
    }

    return getters.filteredStarshipsByFilter(selectedFilter);
  },
};

const actions = {
  async loadStarships ({ commit }) {
    const result = await starships.loadAll();
    commit('SET_STARSHIPS', result);
  }
};

const mutations = {
  SET_STARSHIPS (state, payload) {
    state.starships.splice(0, state.starships.length, ...payload);
  },
};

const modules = {};

const module = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
  modules,
};

export default module;
