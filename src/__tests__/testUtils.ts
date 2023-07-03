import { promises as fs } from "fs";
import path from "node:path";

export class FileHelper {
    private tempDirPath: string;
    private tempFile: string;

    constructor(suffix: string, tempFile: string) {
        this.tempDirPath = path.resolve(process.cwd(), `tmp-${suffix}`);
        this.tempFile = tempFile;
    }

    get tempFilePath(): string {
        return path.resolve(this.tempDirPath, this.tempFile);
    }

    ensureTempDir = async (): Promise<void> => {
        let tmpExists;
        try {
            await fs.access(this.tempDirPath);
            tmpExists = true;
        } catch {
            tmpExists = false;
        }
        if (!tmpExists) {
            await fs.mkdir(this.tempDirPath);
        }
    };

    rmTempDir = (): Promise<void> => fs.rm(this.tempDirPath, { recursive: true, force: true });

    rmTempFile = (): Promise<void> => fs.rm(this.tempFilePath, { force: true });

    clearTempFile = (): Promise<void> => fs.writeFile(this.tempFilePath, "", "utf8");

    writeFile = (data: string): Promise<void> => fs.writeFile(this.tempFilePath, data, "utf8");
}
