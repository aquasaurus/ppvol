<script setup>
import Navigation from "@/data/Navigation";
import * as Constants from "@/data/Constants";
import {useScroll} from "@vueuse/core"

import { useModalConfig } from "@/store/loginModal.ts";
const { title } = defineProps(["title"]);

const mainConfig = useModalConfig(); 

const _toggled = Navigation.map((x) => x.key);

const toggleNav = ref(false);

function getToggled() {
  const a = _toggled.reduce((acc, curr) => {
    acc[curr] = false;
    return acc;
  }, {});
  a.loginButton = false;
  return a;
}

const loggedIn = ref(true)

function login() {
    loggedIn.value = true;
}

const toggled = ref(getToggled());

const profileRoutes = [
  {
    name: `Profile`,
    route: `/`,
    key: `profile`,
  },
  {
    name: `Logout`,
    route: () => mainConfig.logout(),
    key: `logout`,
  },
];

const header = ref(null);
const _offsetTop = ref(0);
const offsetTop = () => {
  _offsetTop.value = header.value?.offsetTop;
};
setInterval(() => offsetTop(), 1000);

function toggleOff() {
  toggleNav.value = false;
}
function toggleBoth() {
  toggleNav.value = !toggleNav.value;
}
function toggleOn() {
  toggleNav.value = true;
}
function setState(ref) {
  const exists = Boolean(toggled.value[ref]);
  resetState();
  console.log(toggled.value);
  toggled.value[ref] = !exists;
}
function anyState() {
  if (Object.values(toggled.value).includes(true)) return true;
  return false;
}
function resetState() {
  toggled.value = getToggled();
}
</script>
<template>
  <div
    ref="header"
    :class="`
    ${toggleNav ? `bg-gray-700` : `bg-gray-600/60`}
    ${_offsetTop ? `lg:bg-gray-700/80` : `lg:bg-gray-700/40`}
    shadow-md
    max-w-full transition duration-500 ease-in-out
    w-full
    sticky
    top-0
    z-50
  `"
  >
    <div class="max-w-9xl mx-auto px-2 lg:px-8 lg:mt-4">
      <div class="relative flex items-center justify-between h-16">
        <div class="relative inset-y-0 left-0 flex items-center lg:hidden">
          <button
            :class="`
                      inline-flex
                      items-center
                      justify-center
                      p-2
                      rounded-md
                      text-white  lg:text-zinc-700 
                      hover:text-zinc-700 dark:text-white
                    `"
            @click="toggleBoth"
          >
            <span class="sr-only">Open menu</span>
            <svg
              class="block h-8 w-8 stroke-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 30 24"
              aria-hidden="true"
            >
              <path
                class="transition-all duration-500 transform ease-in-out"
                stroke-linecap="round"
                stroke-linejoin="round"
                :d="
                  toggleNav ? `M6 24L24 6M6 6l18 18` : `M4 6h24M4 14h16M4 22h24`
                "
              />
            </svg>
          </button>
        </div>
        <div
          class="flex-1 flex fixed lg:static items-center lg:items-stretch lg:justify-start"
        >
          <div class="flex-shrink-0 flex items-center">
            <a to="/">
              <img
                class="h-8 w-auto hidden lg:block dark:lg:hidden"
                :src="`/temp.png`"
                alt="Placeholder"
              />
              <img
                class="h-8 w-auto hidden dark:lg:block"
                :src="`/temp.png`"
                alt="Placeholder"
              />
            </a>
          </div>
          <div
            :class="`overflow-y-auto  lg:overflow-y-visible text-md lg:text-base z-40 block h-full top-12 left-0 w-full bg-gray-700  lg:bg-transparent fixed  lg:static transform transition duration-500 ease-in-out  lg:translate-x-0 p-8  lg:p-0  lg:block ${
              toggleNav ? 'translate-x-0' : '-translate-x-200  lg:ml-6'
            }`"
          >
            <a to="/">
              <img
                class="h-8 w-auto block lg:hidden"
                :src="`/temp.png`"
                alt="Placeholder"
              />
            </a>

            <div
              class="flex flex-col lg:flex-row justify-between space-x-1 w-full"
            >
              <div
                class="flex lg:space-x-4 flex-col lg:flex-row lg:justify-between lg:w-full lg:pt-0 pt-10"
              >
                <div
                  class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 lg:items-center"
                >
                  <div
                    v-for="{ name, route, key, tag } in Navigation"
                    :key="key"
                  >
                    <a
                      v-if="typeof route === 'string' && route.startsWith('/')"
                      :href="typeof route == 'string' ? route : '#'"
                      :class="
                        (title === key ? key !== 'home'
                          ? `text-gray-600 `
                          : 'text-white '
                          : key !== 'home' ? 'text-white border-transparent ' : 'text-white border-transparent ') +
                        (Array.isArray(route) ? 'group ' : '') +
                        'transition duration-500 ease-in-out tracking-wide px-3 flex flex-row space-x-4  lg:uppercase py-4 font-semibold hover:dark:text-gray-600 hover:text-zinc-800'
                      "
                    >
                      <span class="py-1">{{ name }}</span>
                    </a>
                    <a
                      v-else-if="Array.isArray(route)"
                      :href="'javascript:void(0)'"
                      @click="(x) => setState(key)"
                      :class="
                        (title === key ? key !== 'home'
                          ? `text-gray-600 `
                          : 'text-white '
                          : key !== 'home' ? 'text-white border-transparent ' : 'text-white border-transparent ') +                        (Array.isArray(route) ? 'group ' : '') +
                        'transition duration-500 ease-in-out tracking-wide px-3 flex flex-row space-x-4  lg:uppercase py-4 font-semibold hover:dark:text-gray-600 hover:text-zinc-800'
                      "
                    >
                      <span class="py-1">{{ name }}</span>
                      <span>
                        <SVGDown />
                      </span>

                      <div
                        :class="`
                                                                    absolute
                                                                    flex
                                                                    bg-black
                                                                    border-t
                                                                    w-48
                                                                    border-zinc-400
                                                                    shadow-md
                                                                    text-xs
                                                                    p-2
                                                                    flex-col
                                                                    ${
                                                                      toggled[
                                                                        key
                                                                      ]
                                                                        ? 'vivible translate-y-9'
                                                                        : 'invisible'
                                                                    }
                                                                     lg:hrefp-10
                                                                    transform
                                                                    transition
                                                                    duration-300
                                                                    ease-in-out
                                            `"
                      >
                        <a
                          v-for="{ name2, route2, key2 } in route"
                          :key="key2"
                          class="p-2 flex flex-nowrap text-zinc-800 hover:bg-zinc-100 hover:text-white"
                          :href="route2"
                          >{{ name2 }}</a
                        >
                      </div>
                    </a>
                    <a
                      v-else
                      :href="typeof route == 'string' ? route : '#'"
                      target="_blank"
                      :class="
                        (title === key ? key !== 'home'
                          ? `text-gray-600 `
                          : 'text-white '
                          : key !== 'home' ? 'text-white border-transparent ' : 'text-white border-transparent ') +
                        (Array.isArray(route) ? 'group ' : '') +
                        'transition duration-500 ease-in-out tracking-wide px-3 flex flex-row space-x-4  lg:uppercase py-4 font-semibold hover:dark:text-gray-600 hover:text-zinc-800'
                      "
                    >
                      <span class="py-1">{{ name }}</span>
                    </a>
                    <MiscTag v-if="tag">{{ tag }}</MiscTag>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            :class="`inset-0 w-full fixed h-full z-30 block ${
              toggleNav || anyState() ? 'visible' : 'invisible'
            }`"
            @click="
              (x) => {
                toggleOff();
                resetState();
              }
            "
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
