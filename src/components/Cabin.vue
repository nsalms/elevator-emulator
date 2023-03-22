<template>
  <div
    class="cabin"
    :class="{ 'cabin--blinking': status === 'blinking' }"
    :style="`transform: translateY(${curFloor * -100}%);
             transition-duration: ${duration}s;`"
  >
    <div class="cabin__board" v-if="status === 'moving'">
      {{ direction ? "🡱" : "🡳" }} {{ curFloor }}
    </div>
  </div>
  <span>{{ store.state.queue }}</span>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { ref, watch } from "vue";

type Status = "idle" | "moving" | "blinking";

export default {
  setup() {
    const store = useStore();

    let curFloor = ref(0);
    let duration = ref(0);
    let direction = ref(); // Направлеине движения: true = UP, false = DOWN
    let status = ref<Status>("idle");

    // Наблюдаем за очередью
    watch(store.state.queue, (newQueue) => {
      if (newQueue.length > 0 && status.value == "idle") {
        elevate(newQueue[0]);
      }
    });

    // Функция для отправления на этаж
    function elevate(floor: number) {
      duration.value = Math.abs(curFloor.value - floor); // Вычисляем время между этажами в сек.
      direction.value = curFloor.value - floor < 0; // Вычисляем направление движения
      status.value = "moving";
      curFloor.value = floor;

      setTimeout(() => {
        status.value = "blinking";
        setTimeout(() => {
          status.value = "idle";
          store.dispatch("removeFromQueue");
        }, 3000);
      }, duration.value * 1000);
    }

    return { curFloor, duration, direction, status, store };
  },
};
</script>

<style lang="scss" scoped>
.cabin {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  background: #535bf2;
  transition: all linear;

  &__board {
    background: rgba(#000, 0.6);
    border-radius: 0.5rem;
    padding: 0.5rem;
    font-size: 0.75rem;
    line-height: 0;
  }

  &--blinking {
    animation: blinker 1s linear infinite;
  }
}

span {
  color: red;
  position: relative;
  right: 200px;
}

@keyframes blinker {
  50% {
    opacity: 0.5;
  }
}
</style>
