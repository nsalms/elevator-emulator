<script setup lang="ts">
import Cabin from "./components/Cabin.vue";
import Button from "./components/Button.vue";

const elevators = [...Array(10).keys()];
const floors = [...Array(10).keys()];
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
