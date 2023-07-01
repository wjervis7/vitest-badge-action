import * as core from "@actions/core";
import { readOptions } from "@/options";
import { CoverageReport } from "@/coverageReport";

async function run(): Promise<void> {
    try {
        core.debug("entering main");
        const options = readOptions();

        const report = new CoverageReport(options);

        await report.setup();

        const results = report.results(options.resultType);

        core.setOutput("status", results.status);
        core.setOutput("percentage", results.percentage);
        core.setOutput("covered", results.covered);
        core.setOutput("color", results.color);

        core.debug("exiting");
    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message);
    }
}

run();
