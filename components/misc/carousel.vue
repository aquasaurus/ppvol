<template>
  <div class="w-full flex flex-col items-center">
    <div
      class="
        flex flex-row
        items-center
        space-x-4 max-w-6xl
        w-full
        overflow-x-hidden
        relative
      "
    >
      <div class="relative inset-0 flex flex-row justify-start transition-all duration-500 ease-in-out transform" :style="{left:`-${current * 100}%`}">
        <div
          v-for="item in images"
          :key="item"
          class="p-2 relative flex-shrink-0 w-full"
        >
          <img :src="item" class="h-72 lg:h-[28rem] mx-auto" />
        </div>
      </div>
      <button class = "absolute left-0 inset-y-0 my-auto stroke-white fill-white stroke-2 transform rotate-180" @click="prev"><div class = "rounded-full p-2 bg-black/70"><SVGArrow :size="24" /></div></button>
      <button class = "absolute right-0 inset-y-0 my-auto stroke-white fill-white stroke-2" @click="next"><div class = "rounded-full p-2 bg-black/70"><SVGArrow :size="24" /></div></button>
</div>
  </div>
</template>
<script setup>
const { images } = defineProps(["images"]);

const current = ref(0);

const img = computed(() => {
  const i = [];
  let m = 0;
  for (let n in images) {
    i.push(images.at(current.value + m));
    m++;
  }
  return i;
});
let interval;
onMounted(() => {
  interval = setInterval(() => {
    current.value === images.length - 2 ? (current.value = 0) : next();
  }, 6000);
});

onBeforeUnmount(() => clearInterval(interval));

const next = () => current.value === images.length - 1 ? (current.value = 0) : current.value++;
const prev = () => current.value === 0 ? (current.value = images.length - 1) : current.value--;
</script>