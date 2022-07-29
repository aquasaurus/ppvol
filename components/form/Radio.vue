<template>
  <div
    :class="`flex ${
      inline ? 'flex-row space-x-4 items-center' : 'flex-col space-y-4'
    }`"
  >
    <div
      v-for="choice in choices"
      :key="choice"
      class="flex flex-row items-center space-x-2"
    > 
      <label :for="`choice_${friendlyName.replace(/\s/g, '_')}_${choice}`">{{ choice }}</label>
      <label
        :for="`choice_${friendlyName.replace(/\s/g, '_')}_${choice}`"
        :class="`p-2 transition duration-200 ease-in-out rounded-full w-4 ${
          chosen === choice
            ? 'bg-sky-500 dark:bg-sky-500'
            : 'bg-blue-100 dark:bg-gray-700 '
        }`"
      />
      <input
        type="radio"
        :name = "friendlyName"
        :id="`choice_${friendlyName.replace(/\s/g, '_')}_${choice}`"
        class="hidden"
        :value="choice"
        v-model="chosen"
        @change="(x) => $emit('update', chosen)"
      />
    </div>
  </div>
</template>
<script setup>
defineProps({
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
  inline: {
    type: Boolean,
    default() {
      return false;
    },
  },
});
const chosen = ref(null);
</script>