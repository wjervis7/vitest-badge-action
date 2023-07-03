import { describe, it, expect, vi } from "vitest";
import * as core from "@actions/core";
import { Logger } from "@/logger";

type logMethod = "debug" | "warning" | "error" | "info";

const callLogMethod = (logger: Logger, logMethod: string, message: string) => {
    switch (logMethod) {
        case "debug":
            logger.debug(message);
            break;
        case "warning":
            logger.warning(message);
            break;
        case "error":
            logger.error(message);
            break;
        case "info":
            logger.info(message);
            break;
    }
};

describe.each(["debug", "warning", "error", "info"] as logMethod[])("logger.$level", (level) => {
    it("logToCore true, calls core method", () => {
        // arrange
        const envVar = "SKIP_LOGGING_VAR";
        process.env[envVar] = "false";
        const logger = new Logger(envVar);
        const spy = vi.spyOn(core, level);

        // act
        callLogMethod(logger, level, "test");

        // assert
        expect(spy).toHaveBeenCalledOnce();
    });

    it("logToCore false, does not call core method", () => {
        // arrange
        const envVar = "SKIP_LOGGING_VAR";
        process.env[envVar] = "true";
        const logger = new Logger(envVar);
        const spy = vi.spyOn(core, level);

        // act
        callLogMethod(logger, level, "test");

        // assert
        expect(spy).toHaveBeenCalledTimes(0);
    });
});
