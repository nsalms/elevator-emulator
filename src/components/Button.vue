<template>
  <button class="btn" @click="call(floor)">
    <span> ◉ </span>
  </button>
</template>

<script lang="ts">
export default {
  props: {
    floor: Number,
  },
  methods: {
    call(floor: number) {
      console.log(floor);
    },
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
