import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/public/"],
}

export default config
