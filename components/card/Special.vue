<template>
  <div class="p-4">
    <div class="rounded-xl w-full p-4">
      <div class="flex flex-col items-left space-y-4">
        <div class="text-3xl font-bold">{{ title }}</div>
        <div class="flex flex-col items-left space-y-2 text-justify">
          <div
            v-for="(desc, i) in description"
            :key="`desc${i}`"
            class="text-base dark:text-zinc-100 text-zinc-900"
          >
            {{ desc }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const { title, description } = defineProps(["title", "description"]);
</script>
