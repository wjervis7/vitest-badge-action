import { describe, it, expect } from "vitest";
import { readOptions } from "@/options";

describe("options", () => {
    it("loads options correctly", () => {
        process.env["INPUT_RESULT-TYPE"] = "branches";
        process.env["INPUT_VITEST-CONFIG-PATH"] = "vitest.config.ts";
        process.env["INPUT_SUMMARY-PATH"] = "./coverage/coverage-summary.json";
        process.env["INPUT_BADGE-PASS-COLOR"] = "#31c653";
        process.env["INPUT_BADGE-FAIL-COLOR"] = "#800000";
        process.env["INPUT_BADGE-NEUTRAL-COLOR"] = "#696969";

        const options = readOptions();

        expect(options).toEqual({
            badgeFailColor: "#800000",
            badgeNeutralColor: "#696969",
            badgePassColor: "#31c653",
            resultType: "branches",
            summaryPath: "./coverage/coverage-summary.json",
            vitestConfigPath: "vitest.config.ts",
        });
    });
});
