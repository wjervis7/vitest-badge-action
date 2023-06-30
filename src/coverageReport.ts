import * as core from "@actions/core";
import { autoInjectable, inject } from "tsyringe";
import { ReportNumbers, Summary, TestType } from "./summary";
import { Threshold } from "./threshold";
import { IOptions } from "./options";
import { ICoverageResult } from "./coverageResult";

export type Result = "pass" | "fail" | "neutral";

@autoInjectable()
export class CoverageReport {
    private _threshold?: Threshold;
    private _summary?: Summary;
    private _options: IOptions;

    constructor(@inject("options") options: IOptions) {
        this._options = options;
    }

    async setup(): Promise<void> {
        this._threshold = await Threshold.parse(this._options.vitestConfigPath);
        this._summary = await Summary.parse(this._options.summaryPath);
    }

    results(resultType: TestType): ICoverageResult {
        const threshold = this._threshold![resultType];
        const summary = this.getSummary(resultType);

        if (summary === null) {
            return {
                status: "neutral",
                percentage: "unknown",
                covered: "unknown",
                color: this._options.badgeNeutralColor
            };
        }

        const status = this.status(summary, threshold);

        return {
            status,
            percentage: this.getPercentage(summary),
            covered: this.getCovered(summary),
            color: this.getBadgeColor(status)
        };
    }

    private status(summary: ReportNumbers, threshold: number): Result {
        if (typeof summary === "string") {
            return summary as Result;
        }

        return summary.pct >= threshold ? "pass" : "fail";
    }

    private getPercentage(summary: ReportNumbers): string {
        return `${summary.pct}%`;
    }

    private getCovered(summary: ReportNumbers): string {
        return `${summary.covered} / ${summary.total}`;
    }

    private getBadgeColor(status: Result): string {
        switch (status) {
            case "pass":
                return this._options.badgePassColor;
            case "fail":
                return this._options.badgeFailColor;
            case "neutral":
                return this._options.badgeNeutralColor;
        }
    }

    private getSummary(testType: TestType): ReportNumbers | null {
        if (
            !this._summary ||
            !this._summary.results ||
            !this._summary.results.total ||
            !this._summary.results.total[testType]
        ) {
            core.warning(`No results found for ${testType}.`);
            return null;
        }

        return this._summary.results.total[testType];
    }
}
