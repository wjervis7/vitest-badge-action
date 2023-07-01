var d = Object.defineProperty;
var f = (r, t, s) => t in r ? d(r, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[t] = s;
var o = (r, t, s) => (f(r, typeof t != "symbol" ? t + "" : t, s), s);
import * as e from "@actions/core";
import g from "node:path";
import { promises as m } from "fs";
async function y() {
  const r = e.getInput("result-type"), t = e.getInput("summary-path"), s = e.getInput("vitest-config-path"), n = e.getInput("badge-pass-color"), a = e.getInput("badge-fail-color"), u = e.getInput("badge-neutral-color");
  return {
    resultType: r,
    summaryPath: t,
    vitestConfigPath: s,
    badgePassColor: n,
    badgeFailColor: a,
    badgeNeutralColor: u
  };
}
class b {
  constructor() {
    o(this, "results");
  }
  static async parse(t) {
    try {
      const s = g.resolve(process.cwd(), t), n = await m.readFile(s, "utf8");
      return e.debug(`Summary: ${JSON.stringify(n)}`), {
        results: JSON.parse(n)
      };
    } catch (s) {
      return e.warning(`Unable to parse vitest config file:
 ${s}`), {};
    }
  }
}
const w = /100"?\s*:\s*true/, v = /statements\s*:\s*(\d+)/, _ = /lines:\s*(\d+)/, C = /branches\s*:\s*(\d+)/, I = /functions\s*:\s*(\d+)/, i = {
  lines: 60,
  branches: 60,
  functions: 60,
  statements: 60
};
class l {
  constructor() {
    o(this, "lines", i.lines);
    o(this, "branches", i.branches);
    o(this, "functions", i.functions);
    o(this, "statements", i.statements);
  }
  static async parse(t) {
    try {
      const s = g.resolve(process.cwd(), t), n = await m.readFile(s, "utf8");
      if (n.match(w))
        return {
          lines: 100,
          branches: 100,
          functions: 100,
          statements: 100
        };
      const a = n.match(_), u = n.match(C), h = n.match(I), p = n.match(v), c = new l();
      return a && (c.lines = parseInt(a[1])), u && (c.branches = parseInt(u[1])), h && (c.functions = parseInt(h[1])), p && (c.statements = parseInt(p[1])), e.debug(`Threshold: ${JSON.stringify(c)}`), c;
    } catch (s) {
      return e.warning(`Unable to parse vitest config file:
 ${s}`), i;
    }
  }
}
class P {
  constructor(t) {
    o(this, "_threshold");
    o(this, "_summary");
    o(this, "_options");
    this._options = t;
  }
  async setup() {
    this._threshold = await l.parse(this._options.vitestConfigPath), this._summary = await b.parse(this._options.summaryPath);
  }
  results(t) {
    const s = this._threshold[t], n = this.getSummary(t);
    if (n === null)
      return {
        status: "neutral",
        percentage: "unknown",
        covered: "unknown",
        color: this._options.badgeNeutralColor
      };
    const a = this.status(n, s);
    return {
      status: a,
      percentage: this.getPercentage(n),
      covered: this.getCovered(n),
      color: this.getBadgeColor(a)
    };
  }
  status(t, s) {
    return typeof t == "string" ? t : t.pct >= s ? "pass" : "fail";
  }
  getPercentage(t) {
    return `${t.pct}%`;
  }
  getCovered(t) {
    return `${t.covered} / ${t.total}`;
  }
  getBadgeColor(t) {
    switch (t) {
      case "pass":
        return this._options.badgePassColor;
      case "fail":
        return this._options.badgeFailColor;
      case "neutral":
        return this._options.badgeNeutralColor;
    }
  }
  getSummary(t) {
    return !this._summary || !this._summary.results || !this._summary.results.total || !this._summary.results.total[t] ? (e.warning(`No results found for ${t}.`), null) : this._summary.results.total[t];
  }
}
async function O() {
  try {
    const r = await y(), t = new P(r);
    await t.setup();
    const s = t.results(r.resultType);
    e.setOutput("status", s.status), e.setOutput("percentage", s.percentage), e.setOutput("covered", s.covered), e.setOutput("color", s.color);
  } catch (r) {
    r instanceof Error && e.setFailed(r.message);
  }
}
O();
