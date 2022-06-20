const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: [
    "/tests/journey"
  ]
}

module.exports = createJestConfig(customJestConfig)
