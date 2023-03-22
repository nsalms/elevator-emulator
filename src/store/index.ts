import { defineStore } from "pinia";

export interface Elevator {
  id: number;
  status: "idle" | "moving" | "blinking";
  queue: Array<number>;
  lastQueue: number;
  curFloor: number;
  duration: number;
  direction: boolean;
}

export const useStore = defineStore("counter", {
  state: () => {
    return {
      elevators: [] as Elevator[],
    };
  },
  actions: {
    initialize(elevatorId: number) {
      this.elevators.push({
        id: elevatorId,
        status: "idle",
        queue: [],
        lastQueue: 0,
        curFloor: 0,
        duration: 0,
        direction: false,
      });
    },

    addToQueue(elevatorId: number, floor: number) {
      const el = this.elevators[elevatorId];
      // Ничего не делаем, если в очереди уже есть нужный этаж
      if (el.queue.some((item) => item == floor) || el.lastQueue == floor)
        return;

      // Добавляем в очередь и запоминаем последний этаж
      el.queue.push(floor);
      el.lastQueue = floor;
    },

    removeFromQueue(elevatorId: number) {
      this.elevators[elevatorId].queue.shift();
    },
  },
  getters: {
    getElevator: (state) => (elevatorId: number) => {
      return state.elevators[elevatorId];
    },
    isButtonActive: (state) => (floor: number) => {
      return state.elevators.some((item) =>
        item.queue.some((el) => el == floor)
      );
    },
  },
});
