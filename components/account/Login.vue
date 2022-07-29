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
    <span class="py-2" v-show="isBad">Invalid Details</span>
    <div class="max-w-sm font-bold">
      <FormButtonSuccess caption="Login" @click="login" />
    </div>
    <a
      href="javascript:void(0)"
      @click="noAccount"
      class="font-normal text-maid underline"
      >Create a new account?</a
    >
  </div>
</template>
<script setup>
import { useModalConfig } from "@/store/loginModal.ts";

const mainConfig = useModalConfig();
const emit = defineEmits(["okay", "noAccount"]);

function noAccount() {
  emit("noAccount");
}

const router = useRouter()

const data = ref({
  email: "",
  password: "",
  confirm: "",
});

const isBad = ref(false);

function setData(key, val) {
  data.value[key] = val;
}

async function login() {
mainConfig.login(data.value.email)
/*
  const result = await fetch("http://localhost:8000/users/login", {
    method: "POST",
    headers: { contentType: "application/json" },
    body: JSON.stringify({
      email: data.value.email,
      password: data.value.password,
    }),
  });
  console.log(result);
  if (result.status !== 200) isBad.value = true;
  const res = await result.json();
  console.log(res);
  if (res.status !== 200) {
    isBad.value = true;
    return;
  }

  mainConfig.login(res.body.email);
  */
  emit("okay");
//  router.go()
}
</script>