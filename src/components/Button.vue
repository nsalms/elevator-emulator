<template>
  <button class="btn" @click="addToQueue(floor)">
    <span> ◉ </span>
  </button>
</template>

<script lang="ts">
import { mapActions } from "vuex";

export default {
  props: {
    floor: Number,
  },
  methods: {
    ...mapActions(["addToQueue"]),
  },
};
</script>

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

  > span {
    line-height: 0;
  }
}
</style>
