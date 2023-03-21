import { createStore } from "vuex";

interface State {
  queue: Array<number>;
}

const store = createStore<State>({
  state: {
    queue: [],
  },
  mutations: {},
  actions: {
    addToQueue({ commit, state }, floor: number) {
      state.queue.push(floor);
    },
    removeFromQueue({ state }) {
      state.queue.shift();
    },
  },
  getters: {},
});

export default store;
