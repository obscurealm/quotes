const defaultConfig = require("./cypress.config");
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    ...defaultConfig.e2e,
    screenshotsFolder: "journey/screenshots",
    screenshotOnRunFailure: true,
    video: true,
    videosFolder: "journey/videos",
  },
});
