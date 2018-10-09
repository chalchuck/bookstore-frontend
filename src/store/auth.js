// global localStorage

import User from '@/models/User';
import * as MutationTypes from './mutation_types';

const state = {
  user: User.from(localStorage.token),
};

const mutations = {
  // eslint-disable-next-line
  [MutationTypes.LOGIN](state) {
    state.user = User.from(localStorage.token);
  },
  // eslint-disable-next-line
  [MutationTypes.LOGOUT](state) {
    state.user = null;
  },
};

const getters = {
  // eslint-disable-next-line
  currentUser(state) {
    return state.user;
  },
};

const actions = {
  login({
    commit,
  }) {
    commit(MutationTypes.LOGIN);
  },

  logout({
    commit,
  }) {
    commit(MutationTypes.LOGOUT);
  },

};

export default {
  state,
  mutations,
  getters,
  actions,
};
