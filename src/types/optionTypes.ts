import { CoverageType } from "./coverageTypes";

export interface IInputOptions {
    resultType: CoverageType;
    summaryPath: string;
    vitestConfigPath: string;
    badgePassColor: string;
    badgeFailColor: string;
    badgeNeutralColor: string;
}
