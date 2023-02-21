import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5173",
  },

  viewportHeight: 960,
  viewportWidth: 1536,

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
