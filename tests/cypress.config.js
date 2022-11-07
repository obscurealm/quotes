const { defineConfig } = require("cypress");
const { plugins } = require("./journey/plugins");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:4000",
    excludeSpecPattern: "**/plugins/*.js",
    fixturesFolder: "journey/fixtures",
    screenshotOnRunFailure: false,
    setupNodeEvents(on, config) {
      return plugins(on, config);
    },
    specPattern: "journey/*.test.js",
    supportFile: false,
    video: false,
  },
});
