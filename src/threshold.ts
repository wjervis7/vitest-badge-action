import path from "node:path";
import { promises as fs } from "fs";
import { ICoverageThresholds } from "@/types/coverageTypes";
import logger from "@/logger";

const regexStatements = /statements\s*:\s*(\d+)/;
const regexLines = /lines:\s*(\d+)/;
const regexBranches = /branches\s*:\s*(\d+)/;
const regexFunctions = /functions\s*:\s*(\d+)/;

export const defaultThreshold: ICoverageThresholds = {
    lines: 60,
    branches: 60,
    functions: 60,
    statements: 60
};

export class Threshold implements ICoverageThresholds {
    lines = defaultThreshold.lines;
    branches = defaultThreshold.branches;
    functions = defaultThreshold.functions;
    statements = defaultThreshold.statements;

    static async parse(vitestConfigPath: string): Promise<Threshold> {
        logger.debug("Entering Threshold.parse");
        try {
            const resolvedPath = path.isAbsolute(vitestConfigPath) ? vitestConfigPath : path.resolve(process.cwd(), vitestConfigPath);
            logger.debug(`Config Path: ${resolvedPath}`);
            const rawContent = await fs.readFile(resolvedPath, "utf8");
            logger.debug(`Config Contents: ${rawContent}`);

            const lines = rawContent.match(regexLines);
            const branches = rawContent.match(regexBranches);
            const functions = rawContent.match(regexFunctions);
            const statements = rawContent.match(regexStatements);

            const threshold = new Threshold();

            if (lines) {
                threshold.lines = parseInt(lines[1]);
            }

            if (branches) {
                threshold.branches = parseInt(branches[1]);
            }

            if (functions) {
                threshold.functions = parseInt(functions[1]);
            }

            if (statements) {
                threshold.statements = parseInt(statements[1]);
            }

            logger.debug(`Threshold: ${JSON.stringify(threshold)}`);

            return threshold;
        } catch (err: unknown) {
            logger.warning(`Unable to parse vitest config file:\n ${err}`);
            return defaultThreshold;
        }
    }
}
