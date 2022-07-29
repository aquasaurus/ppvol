<template>
  <div
    class="
      overflow-x-hidden
      transition-all
      duration-500
      ease-in-out
      flex flex-col
      items-center
      min-h-screen
      font-quicksand
      text-lg
      tracking-wide
      text-gray-900
      bg-white
      dark:bg-gray-800 dark:text-white
      font-semibold
    "
  >
    <div class="fixed -z-10 inset-0 w-full" />
    <LayoutNavbar
      :title="nuxtApp._route.path.split('/').reverse()[0] || 'dash'"
      class="lg:hidden"
    />
    <LayoutSidebar
      :title="nuxtApp._route.path.split('/').reverse()[0] || 'dash'"
      class="hidden lg:flex"
    />
    <main
      :class="`
        flex-1 transition-all duration-500 ease-in-out flex flex-col items-center
        w-full
        max-w-9xl
        ${toggleNav ? 'md:ml-72 lg:ml-96' : 'md:ml-8 lg:ml-8'}
        p-4
        md:px-8
        py-4
        mt-24
        mb-36
      `"
    >
      <slot />
    </main>
  </div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Quicksand:wght@300;400;500;600;700&display=swap');
</style> 
<script setup>
import { useOpenItems } from "@/store/openItems.ts";
const openItems = useOpenItems();
const toggleNav = computed(() => openItems.navOpen);
const nuxtApp = useNuxtApp();
const route = useRoute();
useHead({
  title: route.meta.title || "Volunteer Dashboard",
  description: route.meta.description,
});
</script>

