<template>
  <div class="max-w-6xl w-full mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-2 w-full gap-8">
      <div class="col-span-2 w-full h-48 border-2 border-gray-700"></div>
      <div
        class="flex flex-col w-full h-[40rem] border-2 border-gray-700"
      ></div>
      <div class="flex flex-col w-full border-2 border-gray-700">
        <div v-for="report in items" :key="report.n">
          <ReportDetails :report="report" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  title: "Volunteer Dashboard",
});

const { data: items } = await useFetch("http://localhost:8000/reports/all");
console.log(items);
</script>
