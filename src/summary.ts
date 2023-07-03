import path from "node:path";
import { promises as fs } from "fs";
import { JsonSummary } from "@/types/coverageTypes";
import logger from "@/logger";

export class Summary {
    results?: JsonSummary;

    static async parse(summaryFile: string): Promise<Summary> {
        logger.debug("Entering Summary.parse");
        try {
            const resolvedPath = path.resolve(process.cwd(), summaryFile);
            const rawContent = await fs.readFile(resolvedPath, "utf8");

            logger.debug(`Summary: ${JSON.stringify(rawContent)}`);

            return {
                results: JSON.parse(rawContent) as JsonSummary
            };
        } catch (err: unknown) {
            logger.warning(`Unable to parse vitest config file:\n ${err}`);
            return {};
        }
    }
}
