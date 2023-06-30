import { injectable } from "tsyringe";
import { Summary } from "./summary";
import { Threshold } from "./threshold";

@injectable()
export class CoverageReport {
    private _threshold: Threshold;
    private _summary: Summary;


    async constructor(vitestConfigPath: string, summaryConfigPath: string) {
        this._threshold = await Threshold.parse(vitestConfigPath);
        this._summary = Summary.parse(summaryConfigPath);
    }
}