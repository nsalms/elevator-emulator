<script setup lang="ts">
import Cabin from "./components/Cabin.vue";
import Button from "./components/Button.vue";
import Settings from "./components/Settings.vue";
import { ref } from "vue";
import { useStore } from "./store";
import { storeToRefs } from "pinia";

const store = useStore();
const { settings } = storeToRefs(store);

const floors = ref([...Array(settings.value.floors).keys()]);
const elevators = ref([...Array(settings.value.elevators).keys()]);
</script>

<template>
  <Settings />

  <div class="wrap">
    <div class="col" v-for="index in elevators" :key="index">
      <Cabin :id="index" />
    </div>
    <div class="col">
      <div class="floor" v-for="index in floors" :key="index">
        <Button :floor="index" />
        <span> {{ index }} </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
  justify-content: space-between;

  > span {
    font-weight: bold;
    opacity: 0.5;
  }
}
</style>
