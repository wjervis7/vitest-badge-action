import { describe, it, expect, beforeEach, beforeAll, afterAll } from "vitest";
import { Threshold, defaultThreshold } from "../threshold";
import { ICoverageThresholds } from "@/types/coverageTypes";
import { FileHelper } from "./testUtils";

describe("threshold.parse", () => {
    const tempFile = "./vitest.config.ts";
    const fileHelper = new FileHelper("threshold", tempFile);

    beforeAll(async () => {
        await fileHelper.ensureTempDir();
    });

    beforeEach(async () => {
        await fileHelper.clearTempFile();
    });

    afterAll(async () => {
        await fileHelper.rmTempDir();
    });

    it("file does not exist, returns default thresholds", async () => {
        // arrange
        await fileHelper.rmTempFile();

        // act
        const actual = await Threshold.parse(fileHelper.tempFilePath);

        // assert
        expect(actual).toEqual(defaultThreshold);
    });

    it("no thresholds, returns default thresholds", async () => {
        // arrange
        await fileHelper.writeFile(`
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
        reporter: ["lcov", "json", "json-summary"]
      }
    }
  })
)
`);

        // act
        const actual = await Threshold.parse(fileHelper.tempFilePath);

        // assert
        expect(actual).toEqual(defaultThreshold);
    });

    it("with thresholds, returns thresholds", async () => {
        // arrange
        await fileHelper.writeFile(`
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
        lines: 80,
        statements: 80,
        branches: 80,
        functions: 80
      }
    }
  })
)
`);
        const expected: ICoverageThresholds = {
            lines: 80,
            statements: 80,
            branches: 80,
            functions: 80
        };

        // act
        const actual = await Threshold.parse(fileHelper.tempFilePath);

        // assert
        expect(actual).toEqual(expected);
    });

    it("with partial thresholds, returns provided thresholds, with defaults for rest", async () => {
        // arrange
        await fileHelper.writeFile(`
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
        lines: 80,
        functions: 100
      }
    }
  })
)
`);
        const expected = defaultThreshold;
        expected.lines = 80;
        expected.functions = 100;

        // act
        const actual = await Threshold.parse(fileHelper.tempFilePath);

        // assert
        expect(actual).toEqual(expected);
    });
});
