import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts', '@testing-library/jest-dom'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.[t|j]sx?$': 'ts-jest',
    '\\.svg$': '<rootDir>/utils/svgTransform.cjs',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!lucide-react).+\\.js$',
  ],
}

export default createJestConfig(config)
