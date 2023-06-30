import path from "node:path";
import * as core from "@actions/core";
import { container } from "tsyringe";
import { IFs } from "./types/fs";

const fs = container.resolve<IFs>("fs");

const regex100 = /100"?\s*:\s*true/;
const regexStatements = /statements\s*:\s*(\d+)/;
const regexLines = /lines:\s*(\d+)/;
const regexBranches = /branches\s*:\s*(\d+)/;
const regexFunctions = /functions\s*:\s*(\d+)/;

const defaultThreshold = {
    lines: 100,
    branches: 100,
    functions: 100,
    statements: 100
};

export class Threshold {
    lines = defaultThreshold.lines;
    branches = defaultThreshold.branches;
    functions = defaultThreshold.functions;
    statements = defaultThreshold.statements;

    static async parse(vitestConfigPath: string): Promise<Threshold> {
        try {
            const resolvedPath = path.resolve(process.cwd(), vitestConfigPath);
            const rawContent = await fs.readFile(resolvedPath, "utf8");

            if (rawContent.match(regex100)) {
                return {
                    lines: 100,
                    branches: 100,
                    functions: 100,
                    statements: 100
                };
            }

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

            return threshold;
        } catch (err: unknown) {
            core.warning(`Unable to parse vitest config file:\n ${err}`);
            return defaultThreshold;
        }
    }
}
