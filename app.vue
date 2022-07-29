<template>
  <div :class="``">
    <NuxtLayout>
      <NuxtPage />
      <div
        :class="`fixed z-50 inset-0 w-full flex flex-col items-center justify-center pointer-events-none ${
          openLogin ? 'visible' : 'invisible'
        }`"
      >
        <div class="pointer-events-auto">
          <AccountLogin @noAccount="hasNoAccount" @okay="closeAll" />
        </div>
      </div>
      <div
        :class="`fixed z-50 inset-0 w-full flex flex-col items-center justify-center pointer-events-none ${
          openSignup ? 'visible' : 'invisible'
        }`"
      >
        <div class="pointer-events-auto">
          <AccountSignup @hasAccount="hasAccount" />
        </div>
      </div>

      <div
        :class="`fixed z-50 inset-0 w-full flex flex-col items-center justify-center pointer-events-none ${
          openFeedback ? 'visible' : 'invisible'
        }`"
      >
        <div class="pointer-events-auto">
          <FormFeedback />
        </div>
      </div>

      <div
        :class="`fixed z-50 inset-0 w-full flex flex-col items-center justify-center pointer-events-none ${
          openReport ? 'visible' : 'invisible'
        }`"
      >
        <div class="pointer-events-auto">
          <FormReport @okay="mainConfig.closeReport" />
        </div>
      </div>
    </NuxtLayout>
    <div
      :class="`inset-0 z-40 w-full fixed backdrop-blur-lg bg-black/30 ${
        openSignup || openLogin || openFeedback || openReport ? 'block' : 'hidden'
      }`"
      @click="closeAll"
    />
    <div id = "toastContainer"></div>
  </div>
</template>
<script setup>
import { useModalConfig } from "@/store/loginModal.ts";
const mainConfig = useModalConfig();
let openLogin = computed(() => mainConfig.loginModalIsOpen);
let openSignup = computed(() => mainConfig.signupModalIsOpen);
let openFeedback = computed(() => mainConfig.feedbackModalIsOpen);
let openReport = computed(() => mainConfig.reportModalIsOpen)
function hasNoAccount() {
  mainConfig.closeLogin();
  mainConfig.openSignup();
}
function hasAccount() {
  mainConfig.closeSignup();
  mainConfig.openLogin();
}
function closeAll() {
  mainConfig.closeSignup();
  mainConfig.closeLogin();
  mainConfig.closeFeedback();
  mainConfig.closeReport();
}

</script>
