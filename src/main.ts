import * as core from "@actions/core";
import { readOptions } from "@/options";
import { CoverageReport } from "@/coverageReport";
import logger from "@/logger";

async function run(): Promise<void> {
    try {
        logger.debug("entering main");
        const options = readOptions();

        const report = new CoverageReport(options);

        await report.setup();

        const results = report.results();

        core.setOutput("status", results.status);
        core.setOutput("percentage", results.percentage);
        core.setOutput("covered", results.covered);
        core.setOutput("color", results.color);

        logger.debug("exiting");
    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message);
    }
}

run();
