import * as process from "process";
import * as cp from "child_process";
import * as path from "path";

// this really isn't a unit test, anymore, but a way of testing how the action will run
process.env["INPUT_RESULT-TYPE"] = "lines";
process.env["INPUT_UPLOAD-BADGE"] = "true";
process.env["INPUT_BADGE-PATH"] = "badge.svg";
process.env["INPUT_GIST-TOKEN"] = ""; // insert token
process.env["INPUT_GIST-URL"] = ""; // insert gist url
process.env["INPUT_VITEST-CONFIG-PATH"] = "vitest.config.ts";
process.env["INPUT_SUMMARY-PATH"] = "./coverage/coverage-summary.json";
process.env["INPUT_BADGE-TEXT"] = "Tests";
process.env["INPUT_BADGE-PASS-COLOR"] = "#31c653";
process.env["INPUT_BADGE-FAIL-COLOR"] = "#800000";
process.env["INPUT_BADGE-NEUTRAL-COLOR"] = "#696969";

const np = process.execPath;
const ip = path.join(__dirname, "..", "lib", "main.js");
const options: cp.ExecFileSyncOptions = {
    env: process.env
};
console.log(cp.execFileSync(np, [ip], options).toString());
