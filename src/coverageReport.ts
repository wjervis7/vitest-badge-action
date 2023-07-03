import { CoverageStatus, ICoverageResult, ICoverageSummary } from "@/types/coverageTypes";
import { IInputOptions } from "@/types/optionTypes";
import { Summary } from "@/summary";
import { Threshold } from "@/threshold";
import logger from "@/logger";

export class CoverageReport {
    private _thresholdValue?: number;
    private _summary?: ICoverageSummary;
    private _options: IInputOptions;

    constructor(options: IInputOptions) {
        logger.debug("Entering CoverageReport.ctor");
        this._options = options;
    }

    async setup(): Promise<void> {
        logger.debug("Entering CoverageReport.setup");
        const threshold = await Threshold.parse(this._options.vitestConfigPath);

        this._thresholdValue = threshold[this._options.resultType];
        logger.debug(`Threshold value: ${this._thresholdValue}`);
        
        const summary = await Summary.parse(this._options.summaryPath);
        
        if (!summary.results || !summary.results.total || !summary.results.total[this._options.resultType]) {
            logger.warning(`No results found for ${this._options.resultType}.`);
            this._summary = undefined;
        } else {
            this._summary = summary.results.total[this._options.resultType];
            logger.debug(`Summary: ${JSON.stringify(this._summary)}`);
        }
    }

    results(): ICoverageResult {
        logger.debug("Entering CoverageReport.results");

        if (!this._summary) {
            logger.debug("Summary is null; returning neutral result.");
            return {
                status: "neutral",
                percentage: "unknown",
                covered: "unknown",
                color: this._options.badgeNeutralColor
            };
        }

        const status = this.getStatus();

        const result: ICoverageResult = {
            status,
            percentage: this.getPercentage(),
            covered: this.getCovered(),
            color: this.getBadgeColor(status)
        };

        logger.debug(`Result: ${JSON.stringify(result)}`);
        return result;
    }

    private getStatus(): CoverageStatus {
        logger.debug("Entering CoverageReport.getStatus");
        const status = this._summary!.pct >= this._thresholdValue! ? "pass" : "fail";

        logger.debug(`Status: ${status}`);
        return status;
    }

    private getPercentage(): string {
        logger.debug("Entering CoverageReport.getPercentage");
        const pct = this._summary!.pct;
        logger.debug(`Percentage: ${pct}`);
        return `${pct}%`;
    }

    private getCovered(): string {
        logger.debug("Entering CoverageReport.getCovered");
        const coverage = `${this._summary!.covered}/${this._summary!.total}`;
        logger.debug(`Coverage: ${coverage}`);
        return coverage;
    }

    private getBadgeColor(status: CoverageStatus): string {
        logger.debug("Entering CoverageReport.getBadgeColor");
        
        const color = status === "pass" ? this._options.badgePassColor : this._options.badgeFailColor;

        logger.debug(`Color: ${color}`);
        return color;
    }
}
