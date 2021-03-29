/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable object-curly-newline */
import { Module } from 'vuex/types'
import { RootState } from '@/types/store'

import { Starship } from '@/types';

import { starshipsProvider } from '@/providers';

import { getObjectCopy, validateNumber } from '@/utils';
import { ACTIONS, GETTERS, MUTATIONS } from '../types';


const module: Module<RootState['Store'], RootState> = {
  namespaced: true,

  state: {
    starships: [],
  },

  getters: {
    [GETTERS.STORE.filteredStarshipsByFilter]: (state) => (selectedFilter: string | Array<(string | null)>) => {
      if (typeof selectedFilter === 'string' && selectedFilter) {
        const src = getObjectCopy<Starship[]>(state.starships);

        if (selectedFilter === 'starship_class') {
          return src.sort((prev, next) => {
            if (selectedFilter && typeof selectedFilter === 'string') {
              if (prev.starship_class > next.starship_class) { return -1; }
              if (prev.starship_class < next.starship_class) { return 1; }
            }
            return 0;
          });
        }

        return src.sort((prev, next) => validateNumber(next[selectedFilter]) - validateNumber(prev[selectedFilter]));
      }

      return state.starships;
    },

    [GETTERS.STORE.filteredStarshipsByFilterAndSearch]: (state, getters) => (selectedFilter: string | Array<(string | null)>, search: string) => {
      if (search.length) {
        return getters.filteredStarshipsByFilter(selectedFilter)
          .filter((starship: Starship) => {
            const results: Array<boolean> = [];

            for (const key in starship) {
              if (key) {
                const element = starship[key];
                results.push(String(element).toLowerCase().includes(search.toLowerCase()));
              }
            }
            return results.some((value) => value);
          });
      }

      return getters.filteredStarshipsByFilter(selectedFilter);
    },
  },

  actions: {
    async [ACTIONS.STORE.loadStarships] ({ commit }) {
      const result = await starshipsProvider.getEveryPage();
      commit(MUTATIONS.STORE.SET_STARSHIPS, result);
    },
  },

  mutations: {
    [MUTATIONS.STORE.SET_STARSHIPS] (state, payload: Array<Starship>) {
      state.starships.splice(0, state.starships.length, ...payload);
    },
  },

  modules: {},
}

export default module
