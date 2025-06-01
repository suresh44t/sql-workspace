module.exports = { 
  roots: ['<rootDir>/src'], 
  
  // Match test files 
  testMatch: [ 
    '**/__tests__/**/*.+(ts|tsx|js)', 
    '**/?(*.)+(spec|test).+(ts|tsx|js)' 
  ],

  // Setup files and modules to use in tests 
  setupFilesAfterEnv: [ 
    '<rootDir>/src/setupTests.ts', 
  ],

  // Test environment configuration 
  testEnvironment: 'jsdom', 
  
  // Module name mapper for imports 
  moduleNameMapper: { 
    '^@/(.*)$': '<rootDir>/src/$1', 
    '\\.(css|scss)$': 'identity-obj-proxy', 
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/tests/__mocks__/fileMock.js' 
  },

  // Transform files 
  transform: { 
    '^.+\\.(ts|tsx)$': 'ts-jest' 
  },

  // Coverage configuration 
  collectCoverageFrom: [ 
    'src/**/*.{js,jsx,ts,tsx}', 
    '!src/**/*.d.ts', 
    '!src/index.tsx', 
    '!src/reportWebVitals.ts' 
  ],
  coverageThreshold: { 
    global: { 
      branches: 80, 
      functions: 80, 
      lines: 80, 
      statements: 80 
    }
  },

  // Other configuration 
  verbose: true, 
  testTimeout: 10000, 
  maxWorkers: '50%' 
};
