import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'node',
      exclude: [
        ...configDefaults.exclude,
        'e2e/*',
        "src/__tests__/testUtils.ts",
        "src/main.ts",
        "src/types/*"
      ],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        provider: "v8",
        reporter: ["lcov", "json", "json-summary", "html"],
        lines: 70,
        statements: 70,
        branches: 70,
        functions: 70,
        all: true,
        include: [
          "src/**/*.ts"
        ],
        exclude: [
          "src/__tests__/**",
          "src/main.ts",
          "src/types/*"
        ]
      }
    }
  })
)
