import * as core from "@actions/core";

export class Logger {
    private logToCore: boolean;

    constructor(envVariable: string) {
        this.logToCore = process.env[envVariable] !== "true";
    }

    debug(message: string): void {
        if (this.logToCore) {
            core.debug(message);
        }
    }

    warning(message: string): void {
        if (this.logToCore) {
            core.warning(message);
        }
    }

    error(message: string): void {
        if (this.logToCore) {
            core.error(message);
        }
    }

    info(message: string): void {
        if (this.logToCore) {
            core.info(message);
        }
    }
}

const logger = new Logger("VITEST");

export default logger;
