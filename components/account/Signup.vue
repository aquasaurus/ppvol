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
    <FormTextEmail
      some-placeholder="yourname@example.com"
      friendly-name="User Email"
      @update="(x) => setData('email', x)"
    />
    <FormTextPassword
      some-placeholder="Password"
      friendly-name="User Password"
      @update="(x) => setData('password', x)"
    />
    <FormTextPassword
      some-placeholder="Confirm Password"
      friendly-name="User Confirm Password"
      @update="(x) => setData('confirm', x)"
    />
    <span :class="`${isBad ? 'visible' : 'invisible'} text-rose-500`"
      >Passwords do not match!</span
    >
    <div class="max-w-sm font-bold">
      <FormButtonSuccess caption="Apply" @click="signUp" />
    </div>
    <a
      href="javascript:void(0)"
      @click="hasAccount"
      class="font-normal text-maid underline"
      >Already have an account?</a
    >
  </div>
</template>
<script setup>
const emit = defineEmits(["okay", "hasAccount"]);

const data = ref({
  email: "",
  password: "",
  confirm: "",
});

const isBad = ref(false);

function setData(key, val) {
  data.value[key] = val;

  if (data.value.password !== data.value.confirm) isBad.value = true;
  else isBad.value = false;
}

async function signUp() {
  if (data.value.password !== data.value.confirm) return;
  const result = await fetch("http://localhost:8000/users/new", {
    method: "POST",
    headers: { contentType: "application/json" },
    body: JSON.stringify({ user_email: data.value.email, user_password: data.value.password }),
  });
  console.log(result)
}

function hasAccount() {
  emit("hasAccount");
}
</script>