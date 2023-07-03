/**
 * Types of code coverage
 */
export type CoverageType = "lines" | "branches" | "functions" | "statements";

/**
 * Status of code coverage
 */
export type CoverageStatus = "pass" | "fail" | "neutral";

/**
 * Parsed result of code coverage.
 */
export interface ICoverageResult {
    /**
     * Coverage status, based on threshold.
     * If exceeds threshold, it passes.
     * If below threshold, it fails.
     * If summary doesn't contain coverage type, neutral is returned.
     */
    status: CoverageStatus;
    /**
     * Code coverage, represented as a percentage.
     */
    percentage: string;
    /**
     * Code coverage, represented as a fraction (covered/total).
     */
    covered: string;
    /**
     * Color to be used for the status badge. Based on status.
     */
    color: string;
}

/**
 * Coverage summary, for the type of code coverage.
 */
export interface ICoverageSummary {
    total: number;
    covered: number;
    skipped: number;
    pct: number;
}

/**
 * Details of the different types of coverage
 */
export interface SummaryReport {
    lines: ICoverageSummary;
    statements: ICoverageSummary;
    functions: ICoverageSummary;
    branches: ICoverageSummary;
}

/**
 * JSON Summary, provided by vitest coverage reporter 'json-summary'
 */
export type JsonSummary = {
    total: SummaryReport;
    [filePath: string]: SummaryReport;
};

export interface ICoverageThresholds {
    lines: number;
    branches: number;
    functions: number;
    statements: number;
}
