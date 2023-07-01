import { Result } from "@/coverageReport";

export interface ICoverageResult {
    status: Result;
    percentage: string;
    covered: string;
    color: string;
}
