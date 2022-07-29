<template>
  <div
    class="
      bg-white
      dark:bg-gray-900
      shadow-xl
      rounded-xl
      max-w-lg
      flex flex-col
      items-center
      space-y-8
      p-4
    "
  >
  <span class = "text-2xl font-semibold text-center">Send Feedback</span>
  <FormTextField friendly-name="Your Name"   some-placeholder="Your Name"   @update="(x) => setData('name', x)"  />
    <FormTextEmail
      some-placeholder="yourname@example.com"
      friendly-name="Your Email"
      @update="(x) => setData('email', x)"
    />
    <FormTextField friendly-name="Feedback"  some-placeholder="Feedback"    @update="(x) => setData('feedback', x)"  />

    <div class="max-w-sm font-bold">
      <FormButtonSuccess caption="Send" @click="sendFeedback" />
    </div>
  </div>
</template>
<script setup>
const emit = defineEmits(["okay", "hasAccount"]);

const data = ref({
  email: "",
  name: "",
  feedback: "",
});


function setData(key, val) {
  data.value[key] = val;

}

async function sendFeedback() {
/*  const result = await fetch("http://localhost:8000/users/new", {
    method: "POST",
    headers: { contentType: "application/json" },
    body: JSON.stringify({ user_email: data.value.email, user_password: data.value.password }),
  });
  */
  console.log(result)
  emit("okay")
}

</script>