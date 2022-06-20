const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  rootDir: './',
  moduleDirectories: ['node_modules'],
  testPathIgnorePatterns: [
    "/tests/journey"
  ]
}

module.exports = createJestConfig(customJestConfig)
