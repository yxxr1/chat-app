module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  rootDir: '.',
  moduleNameMapper: {
    '^@/app(.*)$': '<rootDir>/src/app$1',
    '^@/pages(.*)$': '<rootDir>/src/pages$1',
    '^@/widgets(.*)$': '<rootDir>/src/widgets$1',
    '^@/features(.*)$': '<rootDir>/src/features$1',
    '^@/entities(.*)$': '<rootDir>/src/entities$1',
    '^@/shared/(.*)$': '<rootDir>/src/shared/$1',
    '^.+\\.(css|less|scss)$': 'babel-jest',
  },
};
