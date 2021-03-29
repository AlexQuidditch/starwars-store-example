/* eslint-disable no-shadow */
/* eslint-disable object-curly-newline */
import { Module } from 'vuex/types'
import { RootState } from '@/types/store'

import { Starship, StarshipInCart } from '@/types';

import { validateNumber } from '@/utils';

import { GETTERS, MUTATIONS } from '../types';

const module: Module<RootState['Cart'], RootState> = {
  namespaced: true,

  state: {
    order: [],
  },

  getters: {
    [GETTERS.CART.summary]: (state) => state.order
      .reduce((accumulator, current) => (accumulator + current.quantity), 0),

    [GETTERS.CART.total]: state => state.order
      .reduce((accumulator, { cost_in_credits, quantity }) => (accumulator + validateNumber(cost_in_credits) * quantity), 0),

    [GETTERS.CART.checkStarshipInCart]: state => (name: StarshipInCart['name']) => state.order
      .find(starship => starship.name === name),
  },

  actions: {},

  mutations: {
    [MUTATIONS.CART.ADD_STARSHIP] (state, starship: Starship) {
      const isExist = state.order.find(ord => ord.name === starship.name);
      if (isExist) { isExist.quantity += 1; }
      else { state.order.push({ ...starship, quantity: 1 }); }
    },

    [MUTATIONS.CART.REMOVE_STARSHIP] (state, starship: StarshipInCart) {
      const isExistIndex = state.order.findIndex(ord => ord.name === starship.name);
      if (isExistIndex === -1) { return; }

      const isExist = state.order[isExistIndex];

      if (isExist) {
        if (isExist.quantity >= 2) { isExist.quantity -= 1; }
        else { state.order.splice(isExistIndex, 1); }
      }
    },

    [MUTATIONS.CART.CLEAR_CART] (state) {
      state.order.splice(0, state.order.length);
    },
  },

  modules: {},
}

export default module
