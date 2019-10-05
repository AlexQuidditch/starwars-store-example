/* eslint-disable no-shadow */
/* eslint-disable object-curly-newline */
import { Module, GetterTree, ActionTree, MutationTree } from 'vuex/types';
import { RootState, CartState } from '@/@types/store';

import { validateNumber } from '@/utils';
import { Starship, StarshipInCart } from '@/@types';


const namespaced = true;

const state: CartState = {
  order: [],
};

const getters: GetterTree<CartState, RootState> = {
  summary: (state) => state.order
    .map(({ quantity }) => quantity)
    .reduce((accumulator, currentValue) => (accumulator + currentValue), 0),

  total: (state) => state.order
    .map(({ cost_in_credits, quantity }) => validateNumber(cost_in_credits) * quantity)
    .reduce((accumulator, currentValue) => (accumulator + currentValue), 0),

  checkStarshipInCart: (state) => (name: StarshipInCart['name']) => state.order.find((starship) => starship.name === name),
};

const actions: ActionTree<CartState, RootState> = {};

const mutations: MutationTree<CartState> = {
  ADD_STARSHIP (state, starship: Starship) {
    const isExist = state.order.find((ord) => ord.name === starship.name);
    if (isExist) { isExist.quantity += 1; } else { state.order.push({ ...starship, quantity: 1 }); }
  },

  REMOVE_STARSHIP (state, starship: StarshipInCart) {
    const isExist = state.order.find((ord) => ord.name === starship.name);
    const isExistIndex = state.order.findIndex((ord) => ord.name === starship.name);
    if (isExist) {
      if (isExist.quantity >= 2) { isExist.quantity -= 1; } else { state.order.splice(isExistIndex, 1); }
    }
  },

  CLEAR_CART (state) {
    state.order.splice(0, state.order.length);
  },
};

const modules = {};

const module: Module<CartState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
  modules,
};


export default module;
