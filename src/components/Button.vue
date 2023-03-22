<script setup lang="ts">
import { useStore } from "../store";

const store = useStore();
const props = defineProps({ floor: Number });
</script>

<template>
  <button
    class="btn"
    @click="store.addToQueue(0, props.floor)"
    :disabled="store.isButtonActive(props.floor)"
  >
    <span> ◉ </span>
  </button>
</template>

<style lang="scss" scoped>
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  background: white;
  border: 2px solid darkgrey;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  color: #535bf2;

  &:disabled {
    color: chocolate;
  }

  > span {
    line-height: 0;
  }
}
</style>
