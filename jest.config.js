module.exports = {
  verbose: true,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/Templates/',
    '/Server/',
    '/client/tests/mocks',
    '/client/tests/utils/testSetup.js',
    '/client/Index.jsx',
    '/client/coverage/'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],
  rootDir: 'client',
  roots: ['<rootDir>'],
  setupFiles: [
    '<rootDir>/tests/utils/testSetup.js'
  ],
  moduleFileExtensions: [
    'js',
    'jsx'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/js/tests/mocks/style.js'
  },
  snapshotSerializers: ['enzyme-to-json/serializer']
};
