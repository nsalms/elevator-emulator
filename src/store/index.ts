import { createStore } from "vuex";

interface State {
  queue: Array<number>;
  lastQueue: number;
}

const store = createStore<State>({
  state: {
    queue: [],
    lastQueue: 0,
  },
  mutations: {},
  actions: {
    addToQueue({ commit, state }, floor: number) {
      // Ничего не делаем, если в очереди уже есть нужный этаж
      if (state.queue.some((item) => item == floor) || state.lastQueue == floor)
        return;

      // Добавляем в очередь и запоминаем последний этаж
      state.queue.push(floor);
      state.lastQueue = floor;
    },

    removeFromQueue({ state }) {
      state.queue.shift();
    },
  },
  getters: {
    isActive: (state) => (floor: number) => {
      return state.queue.some((item) => item == floor);
    },
  },
});

export default store;
