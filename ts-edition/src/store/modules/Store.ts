/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable object-curly-newline */
import { Module, GetterTree, ActionTree, MutationTree } from 'vuex/types';
import { RootState, StoreState } from '@/@types/store';

import starships from '@/logic/starships';
import { Starship } from '@/@types';

import { getObjectCopy, validateNumber } from '@/utils';


const namespaced = true;

const state: StoreState = {
  starships: [],
};

const getters: GetterTree<StoreState, RootState> = {
  filteredStarshipsByFilter: (state) => (selectedFilter: string | Array<(string | null)>) => {
    if (typeof selectedFilter === 'string' && selectedFilter) {
      const src = getObjectCopy<Array<Starship>>(state.starships);

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

  filteredStarshipsByFilterAndSearch: (state, getters) => (selectedFilter: string | Array<(string | null)>, search: string) => {
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
};

const actions: ActionTree<StoreState, RootState> = {
  async loadStarships ({ commit }) {
    const result = await starships.loadAll();
    commit('SET_STARSHIPS', result);
  },
};

const mutations: MutationTree<StoreState> = {
  SET_STARSHIPS (state, payload: Array<Starship>) {
    state.starships.splice(0, state.starships.length, ...payload);
  },
};

const modules = {};

const module: Module<StoreState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
  modules,
};

export default module;
