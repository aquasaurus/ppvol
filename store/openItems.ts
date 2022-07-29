import { defineStore } from "pinia";

export const useOpenItems = defineStore("nav", {
  state() {
    return {
      navOpen: false,
    };
  },
  actions: {
    toggleNav() {
      this.navOpen = !this.navOpen;
    },
    openNav() {
      this.navOpen = true;
    },
    closeNav() {
      this.navOpen = false;
    },
  },
});