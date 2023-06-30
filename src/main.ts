import * as core from "@actions/core";
import "core-js/es/reflect";
import { promises } from "fs";

import { container } from "tsyringe";
import { Threshold } from "./threshold";
import { IFs } from "./types/fs";

container.register<IFs>("fs", { useValue: promises });
container.register<Threshold>(Threshold, { useClass: Threshold });

async function run(): Promise<void> {
    try {
        const ms: string = core.getInput("milliseconds");
        core.debug(`Waiting ${ms} milliseconds ...`); // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

        core.debug(new Date().toTimeString());
        await wait(parseInt(ms, 10));
        core.debug(new Date().toTimeString());

        core.setOutput("time", new Date().toTimeString());
    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message);
    }
}

run();
