import { defineNuxtConfig } from "nuxt";
import * as Constants from "./data/Constants.js";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  meta: {
    title: `${Constants.Name}`,
    titleTemplate: `%s - ${Constants.Name}`,
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", hid: "theme-color", content: "#ff00c3" },
      {
        name: "description",
        hid: "description",
        content: Constants.Description,
      },
      { name: "og:image", hid: "og-image", content: "/icon.png" },
      { name: "og:thumbnail", hid: "og-thumbnail", content: "/icon.png" },
    ],
    link: [
      { rel: "shortcut icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  },
  css: ["@/assets/transition.css"],
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
  ],
  content: {
    navigation: {
      fields: ["navTitle"],
    },
    highlight: {
      // See the available themes on https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-theme
      theme: "vitesse-dark",
    },
  },
  tailwindcss: { configPath: '~/tailwind.config.js' },

  //    loading: '@/components/Effects/PingEye.vue'
});