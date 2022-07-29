import { defineStore } from "pinia";
import { useSessionStorage } from "@vueuse/core";

export const useOpenItems = defineStore("nav", {
  state() {
    return {
        loggedIn: false,
        username: useSessionStorage<string>("user_name", null),
        userID: useSessionStorage<string>("user_id", null)
    };
  },
  actions: {
    login(name: string, id: string) {
      this.navOpen = !this.navOpen;
    },
    logout() {
      this.loggedIn = false;
    },
  },
});