import { describe, it, expect, beforeEach, beforeAll, afterAll } from "vitest";
import { Summary } from "@/summary";
import { FileHelper } from "./testUtils";

describe("summary.parse", () => {
    const tempFile = "./coverage.json";
    const fileHelper = new FileHelper("summary", tempFile);

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
        const actual = await Summary.parse(fileHelper.tempFilePath);

        // assert
        expect(actual).toEqual({});
    });

    it("with invalid json, returns empty object", async () => {
        // arrange
        await fileHelper.writeFile("{invalidjson}");

        // act
        const actual = await Summary.parse(fileHelper.tempFilePath);

        // assert
        expect(actual).toEqual({});
    });

    it("with valid json, returns summary", async () => {
        // arrange
        await fileHelper.writeFile(`{
    "total": {
        "lines":{
            "total":59,
            "covered":17,
            "skipped":0,
            "pct":28.81
        },
        "statements":{
            "total":59,
            "covered":17,
            "skipped":0,
            "pct":28.81
        },
        "functions":{
            "total":8,
            "covered":3,
            "skipped":0,
            "pct":37.5
        },
        "branches":{
            "total":16,
            "covered":1,
            "skipped":0,
            "pct":6.25
        }
    }
}`);
        const expected: Summary = {
            results: {
                total: {
                    lines: {
                        total: 59,
                        covered: 17,
                        skipped: 0,
                        pct: 28.81
                    },
                    statements: {
                        total: 59,
                        covered: 17,
                        skipped: 0,
                        pct: 28.81
                    },
                    functions: {
                        total: 8,
                        covered: 3,
                        skipped: 0,
                        pct: 37.5
                    },
                    branches: {
                        total: 16,
                        covered: 1,
                        skipped: 0,
                        pct: 6.25
                    }
                }
            }
        };

        // act
        const actual = await Summary.parse(fileHelper.tempFilePath);

        // assert
        expect(actual).toEqual(expected);
    });
});
