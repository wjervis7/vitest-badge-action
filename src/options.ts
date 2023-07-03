import * as core from "@actions/core";
import { IInputOptions } from "@/types/optionTypes";
import { CoverageType } from "@/types/coverageTypes";
import logger from "@/logger";

export function readOptions(): IInputOptions {
    logger.debug("Entering options:readOptions");
    const resultType = core.getInput("result-type") as CoverageType;
    const summaryPath = core.getInput("summary-path");
    const vitestConfigPath = core.getInput("vitest-config-path");
    const badgePassColor = core.getInput("badge-pass-color");
    const badgeFailColor = core.getInput("badge-fail-color");
    const badgeNeutralColor = core.getInput("badge-neutral-color");

    const options: IInputOptions = {
        resultType,
        summaryPath,
        vitestConfigPath,
        badgePassColor,
        badgeFailColor,
        badgeNeutralColor
    };

    logger.debug(`Inputs: ${JSON.stringify(options)}`);
    return options;
}
