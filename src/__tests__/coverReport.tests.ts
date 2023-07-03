import { describe, it, expect, beforeEach, beforeAll, afterAll } from "vitest";
import { CoverageReport } from "@/coverageReport";
import { FileHelper } from "./testUtils";
import { IInputOptions } from "@/types/optionTypes";

describe("coverage.result", () => {
    const summaryFileHelper = new FileHelper("temp-coverageResult", "summary.json");
    const configFileHelper = new FileHelper("temp-coverageResult", "config.js");
    const mockSummary = `{
    "total": {
        "lines":{
            "total":382,
            "covered":147,
            "skipped":0,
            "pct":38.48
        },
        "statements":{
            "total":382,
            "covered":147,
            "skipped":0,
            "pct":38.48
        },
        "functions":{
            "total":15,
            "covered":11,
            "skipped":0,
            "pct":73.33
        },
        "branches":{
            "total":31,
            "covered":26,
            "skipped":0,
            "pct":83.87
        }
    }
}`;

    const mockConfig = `
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
`;

    beforeAll(async () => {
        await summaryFileHelper.ensureTempDir();
    });

    beforeEach(async () => {
        await summaryFileHelper.clearTempFile();
        await configFileHelper.clearTempFile();
    });

    afterAll(async () => {
        await summaryFileHelper.rmTempDir();
    });

    it("returns neutral object when summary doesn't exist", async () => {
        // arrange
        await summaryFileHelper.clearTempFile();
        const options: IInputOptions = {
            badgeFailColor: "red",
            badgeNeutralColor: "gray",
            badgePassColor: "green",
            resultType: "lines",
            summaryPath: summaryFileHelper.tempFilePath,
            vitestConfigPath: configFileHelper.tempFilePath
        };
        const report = new CoverageReport(options);
        await report.setup();

        // act
        const actual = report.results();

        // assert
        expect(actual).toEqual({
            status: "neutral",
            percentage: "unknown",
            covered: "unknown",
            color: options.badgeNeutralColor
        });
    });

    it("returns pass object with correct values when pct over threshold", async () => {
        // arrange
        await summaryFileHelper.writeFile(mockSummary);
        await configFileHelper.writeFile(mockConfig);
        const options: IInputOptions = {
            badgeFailColor: "red",
            badgeNeutralColor: "gray",
            badgePassColor: "green",
            resultType: "branches",
            summaryPath: summaryFileHelper.tempFilePath,
            vitestConfigPath: configFileHelper.tempFilePath
        };
        const report = new CoverageReport(options);
        await report.setup();

        // act
        const actual = report.results();

        // assert
        expect(actual).toEqual({
            status: "pass",
            percentage: "83.87%",
            covered: "26/31",
            color: options.badgePassColor
        });
    });

    it("returns fail object with correct values when pct over threshold", async () => {
        // arrange
        await summaryFileHelper.writeFile(mockSummary);
        await configFileHelper.writeFile(mockConfig);
        const options: IInputOptions = {
            badgeFailColor: "red",
            badgeNeutralColor: "gray",
            badgePassColor: "green",
            resultType: "statements",
            summaryPath: summaryFileHelper.tempFilePath,
            vitestConfigPath: configFileHelper.tempFilePath
        };
        const report = new CoverageReport(options);
        await report.setup();

        // act
        const actual = report.results();

        // assert
        expect(actual).toEqual({
            status: "fail",
            percentage: "38.48%",
            covered: "147/382",
            color: options.badgeFailColor
        });
    });
});
