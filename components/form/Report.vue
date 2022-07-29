<template>
  <div
    class="bg-white dark:bg-gray-900 shadow-xl rounded-xl max-w-2xl w-full flex flex-col items-center space-y-8 p-4"
  >
    <span class="text-2xl font-semibold text-center">Create Report</span>
    <div class="flex flex-col space-y-4">
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-4 items-center p-4"
      >
        <FormLabel friendly-name="Your Name" type="text" />
        <FormTextField
          friendly-name="Your Name"
          some-placeholder="Your Name"
          @update="(x) => setData('name', x)"
        />
      </div>
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-4 items-center p-4"
      >
        <FormLabel friendly-name="Your Phone Number" type="number" />

        <FormTextNumber
          prefix="+91"
          some-placeholder="9876543210"
          friendly-name="Your Phone Number"
          @update="(x) => setData('phone', x)"
        />
      </div>
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-4 items-center p-4"
      >
        <FormLabel friendly-name="Your Email" type="text" />

        <FormTextEmail
          some-placeholder="yourname@example.com"
          friendly-name="Your Email"
          @update="(x) => setData('email', x)"
        />
      </div>
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-4 items-center p-4"
      >
        <FormLabel friendly-name="Report Details" type="textarea" />

        <FormTextArea
          friendly-name="Content"
          some-placeholder="Details"
          @update="(x) => setData('content', x)"
        />
      </div>
    </div>
    <MiscMessage :class="`${isBad ? 'opacity-100' : 'opacity-0'} transition duration-500 ease-in-out`" type="error">
      Please ensure that name, phone number and content are filled.
    </MiscMessage>
    <MiscMessage :class="`${isGood ? 'opacity-100' : 'opacity-0'} transition duration-500 ease-in-out`" type="success">
      Your report has been submitted!
    </MiscMessage>
    <div class="max-w-sm font-bold">
      <FormButtonSuccess class="w-24" caption="Send" @click="createReport" :disabled="isGood" />
    </div>
  </div>
</template>
<script setup>
const emit = defineEmits(["okay"]);

const data = ref({
  email: "",
  name: "",
  content: "",
  phone: "",
});

const isBad = ref(false);

const isGood = ref(false)

function setData(key, val) {
  data.value[key] = val;

  if (!validateReport()) isBad.value = true;
  else isBad.value = false;
}

async function createReport() {
  if (!validateReport()) return;

  const result = await fetch("http://localhost:8000/reports/new", {
    method: "POST",
    headers: { contentType: "application/json" },
    body: JSON.stringify({
      report_name: data.value.name,
      report_phone: String(data.value.phone),
      report_email: data.value.email,
      report_content: data.value.content,
    }),
  });

  console.log(result);
  if (result.status === 200) {
    
    isGood.value = true;

    setTimeout(() => {isGood.value = false; emit("okay")}, 3000);
  }
}

function validateReport() {
  console.log(data.value);
  if (!data.value.phone) return false;
  if (data.value.phone.toString().length !== 10) return false;
  if (!data.value.name) return false;
  if (!data.value.content) return false;
  return true;
}
</script>
