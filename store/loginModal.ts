import { defineStore } from "pinia";

export const useModalConfig = defineStore("loginModals", {
  state() {
    return {
      loginModalIsOpen: false,
      signupModalIsOpen: false,
      feedbackModalIsOpen: false,
      reportModalIsOpen: false,
      loggedIn: false,
      username: "",
    };
  },
  actions: {
    login(name: string) {
      this.loggedIn = true;
      this.username = name;
    },
    logout() {
      this.loggedIn = false;
    },
    openLogin() {
      this.loginModalIsOpen = true;
    },
    openSignup() {
      this.signupModalIsOpen = true;
    },
    openFeedback() {
      this.feedbackModalIsOpen = true;
    },
    openReport() {
      this.reportModalIsOpen = true;
    },
    closeLogin() {
      this.loginModalIsOpen = false;
    },
    closeFeedback() {
      this.feedbackModalIsOpen = false;
    },
    closeReport() {
      this.reportModalIsOpen = false;
    },
    closeSignup() {
      this.signupModalIsOpen = false;
    },
  },
});