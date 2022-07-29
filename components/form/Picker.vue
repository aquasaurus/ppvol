<template>
  <div :class="`flex flex-col space-y-4 relative`">
    <div
      class="
        w-72
        h-8
        p-2
        bg-white
        text-gray-900
        border-zinc-900
        dark:bg-gray-700 dark:text-white dark:border-zinc-100
        flex flex-row
        items-center
        justify-between
      "
      @click="toggleDrop"
    >
      <span>{{ choices.find(x => x[1] === myChosen)?.[0] || "Choose" }}</span
      ><span
        :class="`transition duration-500 ease-in-out transform ${
          dropOpen ? 'rotate-180' : 'rotate-0'
        }`"
        ><SVGDown
      /></span>
    </div>
    <div
      :class="`absolute top-4 ${
        dropOpen ? 'h-48' : 'h-0'
      } w-72 overflow-y-scroll border-gray-300 dark:border-gray-100 border-b transition-all duration-500 ease-in-out flex flex-col space-y-2 bg-white text-gray-900 border-zinc-900 dark:bg-gray-700 dark:text-white`"
    >
      <div
        v-for="choice in choices"
        :key="`selection_${friendlyName.replace(/\s/g, '_')}_${choice[0].replace(/\s/g, '_')}`"
        class="
          h-8
          p-2
          dark:border-zinc-100
          cursor-pointer
          hover:bg-gray-100
          flex flex-row
          items-center
          transition
          duration-300
          ease-in-out
        "
        @click="(x) => chooseItem(choice[1])"
      >
        <span> {{ choice[0] }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
    friendlyName: {
    type: String,
    default() {
      return null;
    },
  },
  choices: {
    type: Array,
    default: null,
  },
  chosen: {
    default: null,
  },
});
const myChosen = ref(props.chosen);
const dropOpen = ref(false);

function toggleDrop() {
  dropOpen.value = !dropOpen.value;
  console.log(dropOpen.value);
}
function chooseItem(x) {
  myChosen.value = x[1];
  dropOpen.value = false;
}
</script>