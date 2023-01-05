const path = require("path");
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: __dirname,
  }),
  testPathIgnorePatterns: ["index.ts"],
  coveragePathIgnorePatterns: ["index.ts"],
  collectCoverageFrom: ["src/**/*.ts"],
  coverageDirectory: path.resolve(__dirname, "./coverage"),
  coverageThreshold: {
    global: {
      statements: 99,
      branches: 99,
      functions: 99,
      lines: 99,
    },
  },
};
