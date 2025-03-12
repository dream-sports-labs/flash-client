module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js)$': [
      'babel-jest',
      { plugins: ['babel-plugin-syntax-hermes-parser'] },
    ],
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@testing-utils$': '<rootDir>/jest/testing-utils',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '(/__tests__/.*|\\.test)\\.(ts|tsx|js)$',
  testPathIgnorePatterns: [
    '\\.snap$',
    '<rootDir>/node_modules/',
    'src/.*/*..mock.ts',
    '.perf-test.(ts|tsx|js)$',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-.*|@react-navigation|@react-native-community)/)',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  setupFiles: ['<rootDir>/jest/setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  globals: {
    __DEV__: true,
  },
}
