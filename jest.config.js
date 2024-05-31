export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { diagnostics: { ignoreCodes: ["TS151001"] } }],
  },
  collectCoverageFrom: ["src/**/*.ts*", "!src/main.tsx"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  collectCoverage: true,
  coverageReporters: ["json", "html"],
};
