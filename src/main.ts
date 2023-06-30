import * as core from "@actions/core";
import "core-js/es/reflect";
import { promises } from "fs";

import { container } from "tsyringe";
import { Threshold } from "./threshold";
import { IFs } from "./types/fs";
import { IOptions, readOptions } from "./options";
import { Summary } from "./summary";
import { CoverageReport } from "./coverageReport";

async function run(): Promise<void> {
    try {
        const options = await readOptions();

        container.register<IOptions>("options", { useValue: options });
        container.register<IFs>("fs", { useValue: promises });
        container.register<Threshold>(Threshold, { useClass: Threshold });
        container.register<Summary>(Summary, { useClass: Summary });
        container.register<CoverageReport>(CoverageReport, { useClass: CoverageReport });

        const report = container.resolve<CoverageReport>(CoverageReport);

        await report.setup();

        const results = report.results(options.resultType);

        core.setOutput("status", results.status);
        core.setOutput("percentage", results.percentage);
        core.setOutput("covered", results.covered);
        core.setOutput("color", results.color);
    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message);
    }
}

run();
