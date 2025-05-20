const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  // testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  // preset: "ts-jest",
  // globals: {
  //   "ts-jest": {
  //     tsconfig: "tsconfig.build.json",
  //   },
  // },
  // moduleNameMapper: {
  //   // "/^@app/(.*)$/": "./src/app/$1",
  //   "^@/(.*)$": "<rootDir>/src/$1",
  // },
  // extensionsToTreatAsEsm: [".ts", ".tsx"],
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  moduleNameMapper: {
    "^@app/(.*)$": "<rootDir>/src/$1",
  },
};
