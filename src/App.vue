<script setup lang="ts">
import Cabin from "./components/Cabin.vue";
import Button from "./components/Button.vue";
import { useStore } from "./store";

const store = useStore();

const elevators = [...Array(2).keys()];
const floors = [...Array(10).keys()];
//
// let itemRefs: any[] = [];
// const setItemRef = (el: any) => {
//   if (el) itemRefs.push(el);
// };
// onMounted(() => {
//   console.log(itemRefs);
//   itemRefs.forEach((el) => {
//     console.log(el.curFloor);
//   });
// });
//
// // Наблюдаем за очередью
// watch(store.state.queue, (newQueue) => {
//   const targetFloor = newQueue[0];
//
//   if (newQueue.length > 0) {
//     let a = itemRefs.reduce(function (prev, curr) {
//       return prev.curFloor - targetFloor < curr.curFloor ? prev : curr;
//     });
//     // && status.value == "idle"
//     a.elevate(targetFloor);
//   }
// });
</script>

<template>
  <div class="wrap">
    <div class="col" v-for="index in elevators" :key="index">
      <Cabin :id="index" />
    </div>
    <div class="col">
      <div class="floor" v-for="index in floors" :key="index">
        <Button :floor="index" />
      </div>
    </div>
    <div class="col">
      <pre>{{ JSON.stringify(store.elevators, undefined, 2) }}</pre>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  gap: 0.5rem;
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
}

.col {
  display: flex;
  flex-direction: column-reverse;
  border: 2px solid darkgrey;
  padding: 0.25rem;
}

.floor {
  width: 25rem;
  border-bottom: 2px solid darkgrey;
  height: 4rem;
  display: flex;
  align-items: center;
  padding: 1rem;
}
</style>
