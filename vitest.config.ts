import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'node',
      exclude: [...configDefaults.exclude, 'e2e/*', "src/__tests__/main.tests.ts"],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        provider: "istanbul",
        reporter: ["lcov", "json", "json-summary"],
        lines: 70,
        statements: 70,
        branches: 70,
        functions: 70
      }
    }
  })
)
