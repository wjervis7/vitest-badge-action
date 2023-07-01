import * as core from "@actions/core";
import { TestType } from "@/summary";

export interface IOptions {
    resultType: TestType;
    summaryPath: string;
    vitestConfigPath: string;
    badgePassColor: string;
    badgeFailColor: string;
    badgeNeutralColor: string;
}

export function readOptions(): IOptions {
    const resultType = core.getInput("result-type") as TestType;
    const summaryPath = core.getInput("summary-path");
    const vitestConfigPath = core.getInput("vitest-config-path");
    const badgePassColor = core.getInput("badge-pass-color");
    const badgeFailColor = core.getInput("badge-fail-color");
    const badgeNeutralColor = core.getInput("badge-neutral-color");

    return {
        resultType,
        summaryPath,
        vitestConfigPath,
        badgePassColor,
        badgeFailColor,
        badgeNeutralColor
    };
}
