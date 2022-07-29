<script setup>
import Navigation from "@/data/DashNavigation";
import * as Constants from "@/data/Constants";
import { useOpenItems } from "@/store/openItems.ts";
defineProps(["title"]);
const toggled = ref(
  Navigation.map((x) => x.key).reduce((acc, curr) => {
    acc[curr] = false;
    return acc;
  }, {})
);
const openItems = useOpenItems();
const toggleNav = computed(() => openItems.navOpen);
function toggleOff() {
  openItems.closeNav();
}
function toggleBoth() {
  openItems.toggleNav();
}
function toggleOn() {
  openItems.openNav();
}
function setState(someref) {
  if (toggled.value[someref]) toggled.value[someref] = !toggled.value[someref];
  else {
    resetState();
    toggled.value[someref] = !toggled.value[someref];
  }
}
function anyState() {
  if (Object.values(toggled.value).includes(true)) return true;
  return false;
}
function resetState() {
  toggled.value = Navigation.map((x) => x.key).reduce((acc, curr) => {
    acc[curr] = false;
    return acc;
  }, {});
}
</script>
<template>
  <div
    class="
      bg-zinc-900
      dark:bg-gray-900
      shadow-md
      md:shadow-none
      max-w-full
      block
      w-full
      fixed
      top-0
      z-50
    "
  >
    <div class="max-w-9xl mx-auto px-2 md:px-6 lg:px-8 md:mt-4">
      <div class="relative flex items-center justify-between h-16">
        <div
          class="
            flex-1 flex flex-col
            fixed
            md:static
            items-center
            md:items-stretch
          "
        >
          <div
            :class="`overflow-y-auto max-w-[7rem] hover:max-w-[20rem] left-0 top-0 z-30 block h-full mt-12 w-full top-0 left-0 bg-zinc-900 dark:bg-gray-900 fixed transform transition-all duration-500 ease-in-out p-8 group`"
          >
            <div class="flex flex-col justify-between space-y-1 w-full">
              <div class="flex space-y-4 flex-col pt-10">
                <div
                  class="stroke-current text-xs md:text-base"
                  v-for="{ name, route, key, icon } in Navigation"
                  :key="key"
                >
                  <NuxtLink
                    v-if="typeof route === 'string' && route.startsWith('/')"
                    :to="typeof route == 'string' ? route : '#'"
                    :class="
                      (title === key
                        ? 'text-sky-500 '
                        : 'text-white border-transparent ') +
                      (Array.isArray(route) ? 'group ' : '') +
                      'transition duration-500 ease-in-out tracking-wide px-3 flex flex-row items-center space-x-4 justify-start md:uppercase py-4  font-bold hover:text-sky-500'
                    "
                  >
                    <SVGWrapper :name="icon" />
                    <span
                      class="
                        py-1
                        block
                        max-w-0
                        group-hover:max-w-[100rem]
                        overflow-x-hidden
                        transition
                        duration-500
                        ease-in-out
                      "
                      >{{ name }}</span
                    >
                  </NuxtLink>
                  <div v-else-if="Array.isArray(route)">
                    <a
                      :href="'javascript:void(0)'"
                      @click="(x) => setState(key)"
                      :class="
                        (title === key ? 'text-sky-500 ' : 'text-white ') +
                        (Array.isArray(route) ? 'group ' : '') +
                        'relative  transition duration-500 ease-in-out tracking-wide px-3 flex flex-col space-y-4 md:uppercase py-4  font-bold hover:text-sky-500'
                      "
                    >
                      <div class="flex flex-row space-x-4 items-center w-full">
                        <SVGWrapper class = "stroke-2 stroke-white" :name="icon" />
                        <div class="flex flex-row justify-between w-full">
                          <span
                            class="
                              py-1
                              block
                              max-w-0
                              group-hover:max-w-[100rem]
                              overflow-x-hidden
                              transition
                              duration-500
                              ease-in-out
                            "
                            >{{ name }}</span
                          >
                          <span
                            :class="`transition duration-500 ease-in-out block transform max-w-0 group-hover:max-w-[100rem] overflow-x-hidden ${
                              toggled[key] ? 'rotate-180' : 'rotate-0'
                            }`"
                          >
                            <SVGDown />
                          </span>
                        </div>
                      </div>
                    </a>
                    <div
                      :class="`
                        flex
                        w-48 max-w-0 group-hover:max-w-[100rem] overflow-x-hidden transition duration-500 ease-in-out
                        overflow-y-hidden
                        text-xs
                        flex-col
                        max-h-0
                        ${toggled[key] ? 'py-2 group-hover:max-h-[100rem]' : 'py-0'}
                        transition-all
                        duration-300
                        ease-in-out
`"
                    >
                      <NuxtLink
                        v-for="anotherRoute in route"
                        :key="`${key}_${anotherRoute.key}`"
                        :class="`
                          p-2
                          flex flex-nowrap
                          ${
                            title === anotherRoute.key
                              ? 'text-sky-500'
                              : 'text-white'
                          }
                          transition
                          duration-500
                          ease-in-out
                          block ml-2 md:uppercase py-4 
                          hover:bg-zinc-800 hover:text-sky-500 hover:stroke-sky-500`"
                        :to="anotherRoute.route"
                        >{{ anotherRoute.name }}</NuxtLink
                      >
                    </div>
                  </div>
                  <a
                    v-else
                    :href="typeof route == 'string' ? route : '#'"
                    target="_blank"
                    :class="
                      (title === key ? 'text-sky-500 ' : 'dark:text-white') +
                      (Array.isArray(route) ? 'group ' : '') +
                      'transition duration-500 ease-in-out tracking-wide px-3 flex flex-row space-x-4 md:uppercase py-4  font-bold hover:text-sky-500 hover:stroke-sky-500'
                    "
                  >
                    <SVGWrapper :name="icon" />

                    <span
                      :class="`block max-w-0 group-hover:max-w-[100rem] overflow-x-hidden transition duration-500 ease-in-out`"
                      >{{ name }}</span
                    >
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            :class="`inset-0 w-full fixed h-full z-20 hidden ${
              toggleNav ? 'visible' : 'invisible'
            }`"
            @click="
              (x) => {
                toggleOff();
              }
            "
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>