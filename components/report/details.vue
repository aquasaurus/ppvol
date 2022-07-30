<template>
  <div class="flex flex-col items-stretch">
    <div
      class="flex flex-row items-center cursor-pointer px-2 py-4 justify-between bg-gray-200"
      @click="toggleOpen"
    >
      <div
        class="flex flex-row space-x-4 justify-between items-center w-full px-2"
      >
        <span class="text-xl w-full">{{ report.n }}</span>
        <span class="text-base w-full">{{ getTime() }}</span>
      </div>
      <button
        @click="toggleOpen"
        :class="`${
          open ? 'rotate-180' : 'rotate-0'
        } transition duration-500 ease-in-out transform`"
      >
        <SVGDown class="stroke-black stroke-2" />
      </button>
    </div>
    <div
      :class="`flex flex-col transition-all duration-500 ease-in-out ${
        open ? 'max-h-[70rem]' : 'max-h-0'
      } overflow-y-hidden`"
    >
      <div class="flex flex-col space-y-1 p-2">
        <label
          class="uppercase text-gray-500"
          :for="`report_btn_${report.p}_${new Date(report.t).getTime()}`"
          >Actions</label
        >
        <a
          class="p-2 bg-gray-600 text-white rounded-xl transition duration-500 ease-in-out hover:bg-gray-400 w-24 text-center"
          :href="`/reports/view/${report.i}`"
          :id="`report_btn_${report.p}_${new Date(report.t).getTime()}`"
        >
          Actions
        </a>
      </div>
      <div class="flex flex-col space-y-1 p-2">
        <label
          class="uppercase text-gray-500"
          :for="`report_content_${report.p}_${new Date(report.t).getTime()}`"
          >Report Content</label
        >
        <div
          class="p-2"
          :id="`report_content_${report.p}_${new Date(report.t).getTime()}`"
        >
          {{ report.c }}
        </div>
      </div>
      <div class="flex flex-col space-y-1 p-2">
        <label
          class="uppercase text-gray-500"
          :for="`report_call_${report.p}_${new Date(report.t).getTime()}`"
          >Contact Number</label
        >
        <a
          :href="`tel:+91${report.p}`"
          class="p-2"
          :id="`report_call_${report.p}_${new Date(report.t).getTime()}`"
        >
          {{ report.p }}
        </a>
      </div>
    </div>
  </div>
</template>
<script setup>
import Duration from "@retraigo/duration.js";
const { report } = defineProps(["report"]);

const open = ref(false);

const toggleOpen = () => {
  open.value = !open.value;
};

const getTime = () => {
  const reportDate = new Date(report.t);
  const time = reportDate
    .toISOString()
    .split("T")[1]
    .split(":")
    .map((x) => Number(x.match(/[0-9]+/)));
  console.log(time);
  const reportTime = new Duration(0)
    .addHours(time[0])
    .addMinutes(time[1] + 330)
    .addSeconds(time[2])
    .toTimeString("h", "s");
  return `${reportTime}, ${reportDate
    .toISOString()
    .split("T")[0]
    .split("-")
    .reverse()
    .join("-")}`;
};
</script>
