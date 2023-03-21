<template>
  <div
    class="cabin"
    :class="{ 'cabin--blinking': status === 'blinking' }"
    :style="`transform: translateY(${curFloor * -100}%);
             transition-duration: ${duration}s;`"
  ></div>
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

    return { curFloor, duration, status };
  },
};
</script>

<style lang="scss" scoped>
.cabin {
  width: 4rem;
  height: 4rem;
  background: #535bf2;
  transition: all linear;

  &--blinking {
    animation: blinker 1s linear infinite;
  }
}

@keyframes blinker {
  50% {
    opacity: 0.5;
  }
}
</style>
