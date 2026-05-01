/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: '<rootDir>/jest.environment.js',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg|ico)$': '<rootDir>/__mocks__/fileMock.ts',
  },
  testMatch: ['**/__tests__/**/*.(ts|tsx)', '**/*.(test|spec).(ts|tsx)'],
  collectCoverageFrom: [
    'src/app/api/**/*.{ts,tsx}',
    'src/components/Navigation.tsx',
    'src/components/chat/**/*.{ts,tsx}',
    'src/lib/gemini.ts',
    'src/lib/security.ts',
    'src/lib/rate-limit.ts',
    'src/lib/constants.ts',
    'src/lib/types.ts',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 55,
      lines: 60,
      statements: 60,
    },
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@phosphor-icons|framer-motion)/)',
  ],
};

module.exports = config;
