import { container } from "tsyringe";
import * as core from "@actions/core";
import path from "node:path";
import { IFs } from "./types/fs";

const fs = container.resolve<IFs>("fs");

export type TestType = "lines" | "branches" | "functions" | "statements";

export interface ReportNumbers {
    total: number;
    covered: number;
    skipped: number;
    pct: number;
}

interface SummaryReport {
    lines: ReportNumbers;
    statements: ReportNumbers;
    functions: ReportNumbers;
    branches: ReportNumbers;
}

type JsonSummary = {
    total: SummaryReport;
    [filePath: string]: SummaryReport;
};

export class Summary {
    results?: JsonSummary;

    static async parse(summaryFile: string): Promise<Summary> {
        try {
            const resolvedPath = path.resolve(process.cwd(), summaryFile);
            const rawContent = await fs.readFile(resolvedPath, "utf8");

            return {
                results: JSON.parse(rawContent) as JsonSummary
            };
        } catch (err: unknown) {
            core.warning(`Unable to parse vitest config file:\n ${err}`);
            return {};
        }
    }
}
