<script setup lang="ts">
import Cabin from "./components/Cabin.vue";
import Button from "./components/Button.vue";
</script>

<template>
  <div class="wrap">
    <div class="col">
      <Cabin />
    </div>
    <div class="col">
      <div class="floor" v-for="index in floors" :key="index">
        <Button :floor="index" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      floors: 5,
    };
  },
};
</script>

<style scoped>
.wrap {
  gap: 2rem;
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
}

.col {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
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
