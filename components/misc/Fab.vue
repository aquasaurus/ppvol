<template>
  <div>
    <div class="fixed p-4 bottom-0 right-0 flex flex-col items-center z-40">
      <div
        id="fabItems"
        :class="`transform transition-all duration-500 ease-in-out mb-7 ${
          toggleNav ? 'translate-x-0' : 'translate-x-120 overflow-x-hidden'
        }`"
      >
        <ul
          :class="
            ` flex-col items-center space-y-4 w-full mx-auto`
          "
        >
          <div v-for="navItem in nav" :key="navItem.key">
            <a
              class="relative p-2 group flex items-center cursor-pointer"
              @click="navItem.route"
            >
              <li
                class="rounded-full relative flex group items-center p-4 w-16 h-16 bg-gray-600"
              >
                <div class="px-auto flex items-center mx-auto stroke-white stroke-2">
                  <SVGWrapper :name="navItem.routeIcon" />
                </div>
                <div :class = "`absolute -left-28 mr-4 max-w-[70rem] flex justify-end transition-all overflow-hidden duration-500 ease-in-out text-right lg:max-w-0 lg:group-hover:max-w-[70rem]`">
                <MiscTag>{{navItem.tooltip}}</MiscTag></div>
              </li>
            </a>
          </div>
        </ul>
      </div>

      <div
        id="fabButton"
        class="rounded-full bg-gray-500 flex items-center w-16 h-16 z-50"
      >
        <button
          :class="`p-4 transform transition duration-500 ease-in-out mx-auto block ${
            toggleNav ? 'rotate-90' : ''
          }`"
          @click="toggleBoth"
        >
          <svg
            :class="`block h-8 w-8 stroke-white stroke-2 ${toggleNav ? 'rotate-45': 'rotate-0'}`"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              :class="`transition-all duration-500 transform ease-in-out`"
              stroke-linecap="round"
              stroke-linejoin="round"
              :d="
                `M 0 12 h 24 M 12 0 v 24 m 0`
              "
            />
          </svg>
        </button>
      </div>
    </div>
    <div
      :class="`inset-0 w-full fixed h-full z-30 block bg-gray-800 bg-opacity-30 ${
        toggleNav ? 'visible' : 'invisible'
      }`"
      @click="toggleOff"
    ></div>
  </div>
</template>

<script setup>
const { nav } = defineProps(["nav"]);
const toggleNav = ref(false);

function toggleBoth() {
  toggleNav.value = !toggleNav.value;
}

function toggleOn() {
  toggleNav.value = true;
}

function toggleOff() {
  toggleNav.value = false;
}
</script>
