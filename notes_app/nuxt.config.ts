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
  },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins!.push(vuetify({ autoImport: true }));
      });
    },
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
