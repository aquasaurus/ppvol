<template>
  <button
    class="
      p-4
      flex flex-row text-white
      items-center
      rounded-md justify-center
      bg-gray-700 text-center
      hover:bg-gray-600
      transition
      duration-500
      ease-in-out
      transform
      hover:-translate-y-1
    "
    @click="
      (x) => {
        $emit('okay');
      }
    "
  >
    {{ caption }}
  </button>
</template>
<script setup>
defineProps({
  caption: {
    type: String,
    default: null,
  },
});
</script>