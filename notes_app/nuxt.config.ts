import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import packageJson from "./package.json";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",

  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      appInfo: {
        name: process.env.APP_NAME,
        envName: process.env.APP_ENV_NAME,
        version: packageJson.version,
        author: packageJson.author,
      },
    },
    db: {
      mongodbURI: process.env.DB_MONGODB_URI,
      mongodbName: process.env.DB_MONGODB_DB_NAME,
    },
  },

  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },

  build: {
    transpile: ["vuetify"],
  },

  nitro: {
    plugins: ["~/server/index.ts"],

    routeRules: {
      "/server/**": {
        // proxy: "",
      },
    },
  },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins!.push(vuetify({ autoImport: true }));
      });
    },
    "@nuxtjs/i18n",
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  i18n: {
    lazy: true,
    strategy: "no_prefix",
    defaultLocale: "ja",
    langDir: "locales/",
    locales: [
      { code: "en", iso: "en-US", name: "English", file: "en.json" },
      { code: "ja", iso: "ja_JP", name: "日本語", file: "ja.json" },
      { code: "zh", iso: "zh-CN", name: "简体中文", file: "zh.json" },
    ],
  },
});
