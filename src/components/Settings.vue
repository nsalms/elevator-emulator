<script setup lang="ts">
import { useStore } from "../store";
import { storeToRefs } from "pinia";

const store = useStore();
const { settings } = storeToRefs(store);

const apply = () => window.location.reload();
</script>

<template>
  <div class="settings">
    <label for="floors">Количество этажей:</label>
    <input id="floors" type="number" v-model="settings.floors" /><br />

    <label for="elevators">Количество лифтов:</label>
    <input id="elevators" type="number" v-model="settings.elevators" />

    <input type="submit" @click="apply" value="Apply" />
  </div>
</template>

<style lang="scss" scoped>
.settings {
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: #535bf2;
  color: white;
  padding: 2rem;
  border-radius: 0.25rem;
}

input[type="number"] {
  max-width: 6rem;
}
</style>
