<script setup lang="ts">
// vue & store
import { watch } from "vue";
import { useStore } from "../store";
import { storeToRefs } from "pinia";

// types
import { Elevator } from "../store";

const props = defineProps<{ id: number }>();

const store = useStore();
store.initialize(props.id);
const { elevators } = storeToRefs(store);
const elevator: Elevator = elevators.value[props.id];

// Наблюдаем за очередью лифта
watch(elevator.queue, (newQueue) => {
  const targetFloor = newQueue[0];

  // Если в очереди еще есть этажи, и лифт свободен - начинаем движение
  if (newQueue.length > 0 && elevator.status == "idle") {
    elevate(targetFloor);
  }
});

// Функция для отправления на этаж
function elevate(floor: number) {
  elevator.duration = Math.abs(elevator.curFloor - floor); // Вычисляем время между этажами в сек.
  elevator.direction = elevator.curFloor - floor < 0; // Вычисляем направление движения
  elevator.status = "moving";
  elevator.curFloor = floor;

  setTimeout(() => {
    elevator.status = "blinking";
    setTimeout(() => {
      elevator.status = "idle";
      store.removeFromQueue(props.id);
    }, 3000);
  }, elevator.duration * 1000);
}
</script>

<template>
  <div
    class="cabin"
    :class="{ 'cabin--blinking': elevator.status === 'blinking' }"
    :style="`transform: translateY(${elevator.curFloor * -100}%);
             transition-duration: ${elevator.duration}s;`"
  >
    <div class="cabin__board" v-if="elevator.status === 'moving'">
      {{ elevator.direction ? "🡱" : "🡳" }} {{ elevator.curFloor }}
    </div>
  </div>
</template>

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
    color: white;
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

@keyframes blinker {
  50% {
    opacity: 0.5;
  }
}
</style>
