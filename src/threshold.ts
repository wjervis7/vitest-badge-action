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

export class Threshold {
    lines?: number;
    branches?: number;
    functions?: number;
    statements?: number;

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

            return {
                lines: lines ? parseInt(lines[1]) : undefined,
                branches: branches ? parseInt(branches[1]) : undefined,
                functions: functions ? parseInt(functions[1]) : undefined,
                statements: statements ? parseInt(statements[1]) : undefined
            };
        } catch (err: unknown) {
            core.warning(`Unable to parse vitest config file:\n ${err}`);
            return {};
        }
    }
}
