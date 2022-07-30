<template>
  <div class="max-w-6xl w-full mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div
        class="p-2 border-b border-gray-700 flex flex-col lg:flex-row items-end justify-between lg:col-span-2"
      >
        <span class="text-4xl">Report #{{ report.i }} - {{ report.n }}</span>
        <span>{{ getTime(report.t) }}</span>
      </div>
      <div class="p-2 flex flex-col space-y-4">
        <span>{{ report.c }}</span>
        <div
          v-if="report.status !== 1"
          class="bg-gray-300 flex flex-col space-y-8 p-4 max-h-[30rem] overflow-y-auto"
        >
          <span class="text-2xl uppercase">Comments</span>
          <input
            type="text"
            class="p-2"
            v-model="comment"
            placeholder="Add A Comment"
            @keydown.enter="addComment"
          />
          <div
          v-if = "report.cs && report.cs.length !== 0"
            v-for="cs in report.cs
              .sort((a, b) => a.t - b.t)"
            :key="`comment_${i}`"
            class="flex flex-col space-y-1"
          >
            <span>{{ cs.c }}</span>
            <span class="text-xs">{{ getTime(cs.t) }}</span>
          </div>
        </div>
      </div>
      <div class="p-4 flex flex-col space-y-4 items-end">
        <button
          v-if="report.s === 1"
          class="p-2 bg-gray-700 rounded-xl text-white max-w-xs"
        >
          Mark As Attended
        </button>
        <button
          v-if="report.s === 2"
          class="p-2 bg-gray-700 rounded-xl text-white max-w-xs"
        >
          Close Report
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Duration from "@retraigo/duration.js";

const route = useRoute();
definePageMeta({
  title: "Volunteer Dashboard",
});

const comment = ref("");

const markAttended = async () => {
  const result = await useFetch(
    `http://localhost:8000/reports/attended/${report.value.i}`,
    {
      method: "POST",
      headers: { contentType: "application/json" },
      body: JSON.stringify({ comment: comment.value }),
    }
  );
  console.log(result);
};

const addComment = async () => {
  const result = await useFetch(
    `http://localhost:8000/reports/comments/${report.value.i}`,
    {
      method: "POST",
      headers: { contentType: "application/json" },
      body: JSON.stringify({ comment: comment.value }),
    }
  );
  if (result) {
    report.value.cs.push({c: comment.value, t: Date.now()});
  }
  console.log(result);
};

const { data: report } = await useFetch(
  `http://localhost:8000/reports/get/${route.params.id}`
);
console.log(report);

const getTime = (t) => {
  const reportDate = new Date(t);
  const time = reportDate
    .toISOString()
    .split("T")[1]
    .split(":")
    .map((x) => Number(x.match(/[0-9]+/)));
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
