import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export interface Elevator {
  id: number;
  status: "idle" | "moving" | "blinking";
  queue: Array<number>;
  lastQueue: number;
  curFloor: number;
  duration: number;
  direction: boolean;
}

export const useStore = defineStore("elevators", {
  // STATE
  state: () => {
    return {
      elevators: [] as Elevator[],
      settings: {
        floors: useLocalStorage("floors", 10),
        elevators: useLocalStorage("elevators", 4),
      },
    };
  },

  // ACTIONS
  actions: {
    initialize(elevatorId: number) {
      // Инициализация объекта данных
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

    addToQueue(floor: number) {
      // Функция добавляет в очередь
      let result;

      // Находим свободные лифты
      let vacant = this.elevators.filter((el) => el.status == "idle");
      if (vacant.length > 0) {
        // Находим самый ближайший из свободных
        result = vacant.reduce(function (prev, curr) {
          return Math.abs(prev.curFloor - floor) <
            Math.abs(curr.curFloor - floor)
            ? prev
            : curr;
        });
      } else {
        // Если свободных нет - истользуем лифт с самой маленькой очередью
        result = this.elevators.reduce(function (prev, curr) {
          return prev.queue.length < curr.queue.length ? prev : curr;
        });
      }

      // Ничего не делаем, если лифт уже на нужном этаже
      if (result.lastQueue == floor) return;

      // Добавляем в очередь и запоминаем последний этаж
      result.queue.push(floor);
      result.lastQueue = floor;
    },

    removeFromQueue(elevatorId: number) {
      // Функция удаляет первый элемент из очереди
      this.elevators[elevatorId].queue.shift();
    },
  },

  // GETTERS
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
