import { OpenMode, PathLike } from "fs";
import { FileHandle } from "fs/promises";
import { Abortable } from "node:events";

export type BufferEncoding =
    | "ascii"
    | "utf8"
    | "utf-8"
    | "utf16le"
    | "ucs2"
    | "ucs-2"
    | "base64"
    | "base64url"
    | "latin1"
    | "binary"
    | "hex";

export interface IFs {
    /**
     * Asynchronously reads the entire contents of a file.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * If a `FileHandle` is provided, the underlying file will _not_ be closed automatically.
     * @param options An object that may contain an optional flag.
     * If a flag is not provided, it defaults to `'r'`.
     */
    readFile(
        path: PathLike | FileHandle,
        options:
            | ({
                  encoding: BufferEncoding;
                  flag?: OpenMode | undefined;
              } & Abortable)
            | BufferEncoding
    ): Promise<string>;
}
