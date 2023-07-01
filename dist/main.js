var nt = Object.defineProperty;
var ot = (e, r, t) => r in e ? nt(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t;
var H = (e, r, t) => (ot(e, typeof r != "symbol" ? r + "" : r, t), t);
import je, { promises as ke } from "fs";
import Be from "node:path";
var w = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Le(e) {
  if (e.__esModule)
    return e;
  var r = e.default;
  if (typeof r == "function") {
    var t = function n() {
      if (this instanceof n) {
        var o = [null];
        o.push.apply(o, arguments);
        var s = Function.bind.apply(r, o);
        return new s();
      }
      return r.apply(this, arguments);
    };
    t.prototype = r.prototype;
  } else
    t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var o = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(t, n, o.get ? o : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), t;
}
var ge = {}, re = {};
const st = {}, it = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: st
}, Symbol.toStringTag, { value: "Module" })), G = /* @__PURE__ */ Le(it);
var ee = {};
Object.defineProperty(ee, "__esModule", { value: !0 });
ee.toCommandProperties = ee.toCommandValue = void 0;
function at(e) {
  return e == null ? "" : typeof e == "string" || e instanceof String ? e : JSON.stringify(e);
}
ee.toCommandValue = at;
function ut(e) {
  return Object.keys(e).length ? {
    title: e.title,
    file: e.file,
    line: e.startLine,
    endLine: e.endLine,
    col: e.startColumn,
    endColumn: e.endColumn
  } : {};
}
ee.toCommandProperties = ut;
var ct = w && w.__createBinding || (Object.create ? function(e, r, t, n) {
  n === void 0 && (n = t), Object.defineProperty(e, n, { enumerable: !0, get: function() {
    return r[t];
  } });
} : function(e, r, t, n) {
  n === void 0 && (n = t), e[n] = r[t];
}), lt = w && w.__setModuleDefault || (Object.create ? function(e, r) {
  Object.defineProperty(e, "default", { enumerable: !0, value: r });
} : function(e, r) {
  e.default = r;
}), ft = w && w.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var r = {};
  if (e != null)
    for (var t in e)
      t !== "default" && Object.hasOwnProperty.call(e, t) && ct(r, e, t);
  return lt(r, e), r;
};
Object.defineProperty(re, "__esModule", { value: !0 });
re.issue = re.issueCommand = void 0;
const dt = ft(G), Ve = ee;
function Fe(e, r, t) {
  const n = new pt(e, r, t);
  process.stdout.write(n.toString() + dt.EOL);
}
re.issueCommand = Fe;
function ht(e, r = "") {
  Fe(e, {}, r);
}
re.issue = ht;
const Ce = "::";
class pt {
  constructor(r, t, n) {
    r || (r = "missing.command"), this.command = r, this.properties = t, this.message = n;
  }
  toString() {
    let r = Ce + this.command;
    if (this.properties && Object.keys(this.properties).length > 0) {
      r += " ";
      let t = !0;
      for (const n in this.properties)
        if (this.properties.hasOwnProperty(n)) {
          const o = this.properties[n];
          o && (t ? t = !1 : r += ",", r += `${n}=${mt(o)}`);
        }
    }
    return r += `${Ce}${vt(this.message)}`, r;
  }
}
function vt(e) {
  return Ve.toCommandValue(e).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
}
function mt(e) {
  return Ve.toCommandValue(e).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
}
var ne = {}, fe, gt = new Uint8Array(16);
function xe() {
  if (!fe && (fe = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto), !fe))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return fe(gt);
}
const _t = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function de(e) {
  return typeof e == "string" && _t.test(e);
}
var D = [];
for (var _e = 0; _e < 256; ++_e)
  D.push((_e + 256).toString(16).substr(1));
function he(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, t = (D[e[r + 0]] + D[e[r + 1]] + D[e[r + 2]] + D[e[r + 3]] + "-" + D[e[r + 4]] + D[e[r + 5]] + "-" + D[e[r + 6]] + D[e[r + 7]] + "-" + D[e[r + 8]] + D[e[r + 9]] + "-" + D[e[r + 10]] + D[e[r + 11]] + D[e[r + 12]] + D[e[r + 13]] + D[e[r + 14]] + D[e[r + 15]]).toLowerCase();
  if (!de(t))
    throw TypeError("Stringified UUID is invalid");
  return t;
}
var Ue, ye, we = 0, be = 0;
function yt(e, r, t) {
  var n = r && t || 0, o = r || new Array(16);
  e = e || {};
  var s = e.node || Ue, i = e.clockseq !== void 0 ? e.clockseq : ye;
  if (s == null || i == null) {
    var u = e.random || (e.rng || xe)();
    s == null && (s = Ue = [u[0] | 1, u[1], u[2], u[3], u[4], u[5]]), i == null && (i = ye = (u[6] << 8 | u[7]) & 16383);
  }
  var h = e.msecs !== void 0 ? e.msecs : Date.now(), m = e.nsecs !== void 0 ? e.nsecs : be + 1, a = h - we + (m - be) / 1e4;
  if (a < 0 && e.clockseq === void 0 && (i = i + 1 & 16383), (a < 0 || h > we) && e.nsecs === void 0 && (m = 0), m >= 1e4)
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  we = h, be = m, ye = i, h += 122192928e5;
  var v = ((h & 268435455) * 1e4 + m) % 4294967296;
  o[n++] = v >>> 24 & 255, o[n++] = v >>> 16 & 255, o[n++] = v >>> 8 & 255, o[n++] = v & 255;
  var g = h / 4294967296 * 1e4 & 268435455;
  o[n++] = g >>> 8 & 255, o[n++] = g & 255, o[n++] = g >>> 24 & 15 | 16, o[n++] = g >>> 16 & 255, o[n++] = i >>> 8 | 128, o[n++] = i & 255;
  for (var O = 0; O < 6; ++O)
    o[n + O] = s[O];
  return r || he(o);
}
function Ge(e) {
  if (!de(e))
    throw TypeError("Invalid UUID");
  var r, t = new Uint8Array(16);
  return t[0] = (r = parseInt(e.slice(0, 8), 16)) >>> 24, t[1] = r >>> 16 & 255, t[2] = r >>> 8 & 255, t[3] = r & 255, t[4] = (r = parseInt(e.slice(9, 13), 16)) >>> 8, t[5] = r & 255, t[6] = (r = parseInt(e.slice(14, 18), 16)) >>> 8, t[7] = r & 255, t[8] = (r = parseInt(e.slice(19, 23), 16)) >>> 8, t[9] = r & 255, t[10] = (r = parseInt(e.slice(24, 36), 16)) / 1099511627776 & 255, t[11] = r / 4294967296 & 255, t[12] = r >>> 24 & 255, t[13] = r >>> 16 & 255, t[14] = r >>> 8 & 255, t[15] = r & 255, t;
}
function wt(e) {
  e = unescape(encodeURIComponent(e));
  for (var r = [], t = 0; t < e.length; ++t)
    r.push(e.charCodeAt(t));
  return r;
}
var bt = "6ba7b810-9dad-11d1-80b4-00c04fd430c8", Ot = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
function Je(e, r, t) {
  function n(o, s, i, u) {
    if (typeof o == "string" && (o = wt(o)), typeof s == "string" && (s = Ge(s)), s.length !== 16)
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    var h = new Uint8Array(16 + o.length);
    if (h.set(s), h.set(o, s.length), h = t(h), h[6] = h[6] & 15 | r, h[8] = h[8] & 63 | 128, i) {
      u = u || 0;
      for (var m = 0; m < 16; ++m)
        i[u + m] = h[m];
      return i;
    }
    return he(h);
  }
  try {
    n.name = e;
  } catch {
  }
  return n.DNS = bt, n.URL = Ot, n;
}
function Rt(e) {
  if (typeof e == "string") {
    var r = unescape(encodeURIComponent(e));
    e = new Uint8Array(r.length);
    for (var t = 0; t < r.length; ++t)
      e[t] = r.charCodeAt(t);
  }
  return Et(St(Pt(e), e.length * 8));
}
function Et(e) {
  for (var r = [], t = e.length * 32, n = "0123456789abcdef", o = 0; o < t; o += 8) {
    var s = e[o >> 5] >>> o % 32 & 255, i = parseInt(n.charAt(s >>> 4 & 15) + n.charAt(s & 15), 16);
    r.push(i);
  }
  return r;
}
function He(e) {
  return (e + 64 >>> 9 << 4) + 14 + 1;
}
function St(e, r) {
  e[r >> 5] |= 128 << r % 32, e[He(r) - 1] = r;
  for (var t = 1732584193, n = -271733879, o = -1732584194, s = 271733878, i = 0; i < e.length; i += 16) {
    var u = t, h = n, m = o, a = s;
    t = j(t, n, o, s, e[i], 7, -680876936), s = j(s, t, n, o, e[i + 1], 12, -389564586), o = j(o, s, t, n, e[i + 2], 17, 606105819), n = j(n, o, s, t, e[i + 3], 22, -1044525330), t = j(t, n, o, s, e[i + 4], 7, -176418897), s = j(s, t, n, o, e[i + 5], 12, 1200080426), o = j(o, s, t, n, e[i + 6], 17, -1473231341), n = j(n, o, s, t, e[i + 7], 22, -45705983), t = j(t, n, o, s, e[i + 8], 7, 1770035416), s = j(s, t, n, o, e[i + 9], 12, -1958414417), o = j(o, s, t, n, e[i + 10], 17, -42063), n = j(n, o, s, t, e[i + 11], 22, -1990404162), t = j(t, n, o, s, e[i + 12], 7, 1804603682), s = j(s, t, n, o, e[i + 13], 12, -40341101), o = j(o, s, t, n, e[i + 14], 17, -1502002290), n = j(n, o, s, t, e[i + 15], 22, 1236535329), t = k(t, n, o, s, e[i + 1], 5, -165796510), s = k(s, t, n, o, e[i + 6], 9, -1069501632), o = k(o, s, t, n, e[i + 11], 14, 643717713), n = k(n, o, s, t, e[i], 20, -373897302), t = k(t, n, o, s, e[i + 5], 5, -701558691), s = k(s, t, n, o, e[i + 10], 9, 38016083), o = k(o, s, t, n, e[i + 15], 14, -660478335), n = k(n, o, s, t, e[i + 4], 20, -405537848), t = k(t, n, o, s, e[i + 9], 5, 568446438), s = k(s, t, n, o, e[i + 14], 9, -1019803690), o = k(o, s, t, n, e[i + 3], 14, -187363961), n = k(n, o, s, t, e[i + 8], 20, 1163531501), t = k(t, n, o, s, e[i + 13], 5, -1444681467), s = k(s, t, n, o, e[i + 2], 9, -51403784), o = k(o, s, t, n, e[i + 7], 14, 1735328473), n = k(n, o, s, t, e[i + 12], 20, -1926607734), t = B(t, n, o, s, e[i + 5], 4, -378558), s = B(s, t, n, o, e[i + 8], 11, -2022574463), o = B(o, s, t, n, e[i + 11], 16, 1839030562), n = B(n, o, s, t, e[i + 14], 23, -35309556), t = B(t, n, o, s, e[i + 1], 4, -1530992060), s = B(s, t, n, o, e[i + 4], 11, 1272893353), o = B(o, s, t, n, e[i + 7], 16, -155497632), n = B(n, o, s, t, e[i + 10], 23, -1094730640), t = B(t, n, o, s, e[i + 13], 4, 681279174), s = B(s, t, n, o, e[i], 11, -358537222), o = B(o, s, t, n, e[i + 3], 16, -722521979), n = B(n, o, s, t, e[i + 6], 23, 76029189), t = B(t, n, o, s, e[i + 9], 4, -640364487), s = B(s, t, n, o, e[i + 12], 11, -421815835), o = B(o, s, t, n, e[i + 15], 16, 530742520), n = B(n, o, s, t, e[i + 2], 23, -995338651), t = L(t, n, o, s, e[i], 6, -198630844), s = L(s, t, n, o, e[i + 7], 10, 1126891415), o = L(o, s, t, n, e[i + 14], 15, -1416354905), n = L(n, o, s, t, e[i + 5], 21, -57434055), t = L(t, n, o, s, e[i + 12], 6, 1700485571), s = L(s, t, n, o, e[i + 3], 10, -1894986606), o = L(o, s, t, n, e[i + 10], 15, -1051523), n = L(n, o, s, t, e[i + 1], 21, -2054922799), t = L(t, n, o, s, e[i + 8], 6, 1873313359), s = L(s, t, n, o, e[i + 15], 10, -30611744), o = L(o, s, t, n, e[i + 6], 15, -1560198380), n = L(n, o, s, t, e[i + 13], 21, 1309151649), t = L(t, n, o, s, e[i + 4], 6, -145523070), s = L(s, t, n, o, e[i + 11], 10, -1120210379), o = L(o, s, t, n, e[i + 2], 15, 718787259), n = L(n, o, s, t, e[i + 9], 21, -343485551), t = X(t, u), n = X(n, h), o = X(o, m), s = X(s, a);
  }
  return [t, n, o, s];
}
function Pt(e) {
  if (e.length === 0)
    return [];
  for (var r = e.length * 8, t = new Uint32Array(He(r)), n = 0; n < r; n += 8)
    t[n >> 5] |= (e[n / 8] & 255) << n % 32;
  return t;
}
function X(e, r) {
  var t = (e & 65535) + (r & 65535), n = (e >> 16) + (r >> 16) + (t >> 16);
  return n << 16 | t & 65535;
}
function Tt(e, r) {
  return e << r | e >>> 32 - r;
}
function pe(e, r, t, n, o, s) {
  return X(Tt(X(X(r, e), X(n, s)), o), t);
}
function j(e, r, t, n, o, s, i) {
  return pe(r & t | ~r & n, e, r, o, s, i);
}
function k(e, r, t, n, o, s, i) {
  return pe(r & n | t & ~n, e, r, o, s, i);
}
function B(e, r, t, n, o, s, i) {
  return pe(r ^ t ^ n, e, r, o, s, i);
}
function L(e, r, t, n, o, s, i) {
  return pe(t ^ (r | ~n), e, r, o, s, i);
}
var At = Je("v3", 48, Rt);
const Ct = At;
function Ut(e, r, t) {
  e = e || {};
  var n = e.random || (e.rng || xe)();
  if (n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, r) {
    t = t || 0;
    for (var o = 0; o < 16; ++o)
      r[t + o] = n[o];
    return r;
  }
  return he(n);
}
function Mt(e, r, t, n) {
  switch (e) {
    case 0:
      return r & t ^ ~r & n;
    case 1:
      return r ^ t ^ n;
    case 2:
      return r & t ^ r & n ^ t & n;
    case 3:
      return r ^ t ^ n;
  }
}
function Oe(e, r) {
  return e << r | e >>> 32 - r;
}
function $t(e) {
  var r = [1518500249, 1859775393, 2400959708, 3395469782], t = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
  if (typeof e == "string") {
    var n = unescape(encodeURIComponent(e));
    e = [];
    for (var o = 0; o < n.length; ++o)
      e.push(n.charCodeAt(o));
  } else
    Array.isArray(e) || (e = Array.prototype.slice.call(e));
  e.push(128);
  for (var s = e.length / 4 + 2, i = Math.ceil(s / 16), u = new Array(i), h = 0; h < i; ++h) {
    for (var m = new Uint32Array(16), a = 0; a < 16; ++a)
      m[a] = e[h * 64 + a * 4] << 24 | e[h * 64 + a * 4 + 1] << 16 | e[h * 64 + a * 4 + 2] << 8 | e[h * 64 + a * 4 + 3];
    u[h] = m;
  }
  u[i - 1][14] = (e.length - 1) * 8 / Math.pow(2, 32), u[i - 1][14] = Math.floor(u[i - 1][14]), u[i - 1][15] = (e.length - 1) * 8 & 4294967295;
  for (var v = 0; v < i; ++v) {
    for (var g = new Uint32Array(80), O = 0; O < 16; ++O)
      g[O] = u[v][O];
    for (var R = 16; R < 80; ++R)
      g[R] = Oe(g[R - 3] ^ g[R - 8] ^ g[R - 14] ^ g[R - 16], 1);
    for (var P = t[0], I = t[1], J = t[2], N = t[3], U = t[4], F = 0; F < 80; ++F) {
      var z = Math.floor(F / 20), Q = Oe(P, 5) + Mt(z, I, J, N) + U + r[z] + g[F] >>> 0;
      U = N, N = J, J = Oe(I, 30) >>> 0, I = P, P = Q;
    }
    t[0] = t[0] + P >>> 0, t[1] = t[1] + I >>> 0, t[2] = t[2] + J >>> 0, t[3] = t[3] + N >>> 0, t[4] = t[4] + U >>> 0;
  }
  return [t[0] >> 24 & 255, t[0] >> 16 & 255, t[0] >> 8 & 255, t[0] & 255, t[1] >> 24 & 255, t[1] >> 16 & 255, t[1] >> 8 & 255, t[1] & 255, t[2] >> 24 & 255, t[2] >> 16 & 255, t[2] >> 8 & 255, t[2] & 255, t[3] >> 24 & 255, t[3] >> 16 & 255, t[3] >> 8 & 255, t[3] & 255, t[4] >> 24 & 255, t[4] >> 16 & 255, t[4] >> 8 & 255, t[4] & 255];
}
var qt = Je("v5", 80, $t);
const It = qt, Nt = "00000000-0000-0000-0000-000000000000";
function Dt(e) {
  if (!de(e))
    throw TypeError("Invalid UUID");
  return parseInt(e.substr(14, 1), 16);
}
const jt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  NIL: Nt,
  parse: Ge,
  stringify: he,
  v1: yt,
  v3: Ct,
  v4: Ut,
  v5: It,
  validate: de,
  version: Dt
}, Symbol.toStringTag, { value: "Module" })), kt = /* @__PURE__ */ Le(jt);
var Bt = w && w.__createBinding || (Object.create ? function(e, r, t, n) {
  n === void 0 && (n = t), Object.defineProperty(e, n, { enumerable: !0, get: function() {
    return r[t];
  } });
} : function(e, r, t, n) {
  n === void 0 && (n = t), e[n] = r[t];
}), Lt = w && w.__setModuleDefault || (Object.create ? function(e, r) {
  Object.defineProperty(e, "default", { enumerable: !0, value: r });
} : function(e, r) {
  e.default = r;
}), Ke = w && w.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var r = {};
  if (e != null)
    for (var t in e)
      t !== "default" && Object.hasOwnProperty.call(e, t) && Bt(r, e, t);
  return Lt(r, e), r;
};
Object.defineProperty(ne, "__esModule", { value: !0 });
ne.prepareKeyValueMessage = ne.issueFileCommand = void 0;
const Me = Ke(je), Ee = Ke(G), Vt = kt, Ye = ee;
function Ft(e, r) {
  const t = process.env[`GITHUB_${e}`];
  if (!t)
    throw new Error(`Unable to find environment variable for file command ${e}`);
  if (!Me.existsSync(t))
    throw new Error(`Missing file at path: ${t}`);
  Me.appendFileSync(t, `${Ye.toCommandValue(r)}${Ee.EOL}`, {
    encoding: "utf8"
  });
}
ne.issueFileCommand = Ft;
function xt(e, r) {
  const t = `ghadelimiter_${Vt.v4()}`, n = Ye.toCommandValue(r);
  if (e.includes(t))
    throw new Error(`Unexpected input: name should not contain the delimiter "${t}"`);
  if (n.includes(t))
    throw new Error(`Unexpected input: value should not contain the delimiter "${t}"`);
  return `${e}<<${t}${Ee.EOL}${n}${Ee.EOL}${t}`;
}
ne.prepareKeyValueMessage = xt;
var ae = {}, ze = {}, oe = {};
Object.defineProperty(oe, "__esModule", { value: !0 });
oe.checkBypass = oe.getProxyUrl = void 0;
function Gt(e) {
  const r = e.protocol === "https:";
  if (Qe(e))
    return;
  const t = (() => r ? process.env.https_proxy || process.env.HTTPS_PROXY : process.env.http_proxy || process.env.HTTP_PROXY)();
  if (t)
    return new URL(t);
}
oe.getProxyUrl = Gt;
function Qe(e) {
  if (!e.hostname)
    return !1;
  const r = process.env.no_proxy || process.env.NO_PROXY || "";
  if (!r)
    return !1;
  let t;
  e.port ? t = Number(e.port) : e.protocol === "http:" ? t = 80 : e.protocol === "https:" && (t = 443);
  const n = [e.hostname.toUpperCase()];
  typeof t == "number" && n.push(`${n[0]}:${t}`);
  for (const o of r.split(",").map((s) => s.trim().toUpperCase()).filter((s) => s))
    if (n.some((s) => s === o))
      return !0;
  return !1;
}
oe.checkBypass = Qe;
var se = {}, Jt = G, Se = G, We = G, Ht = G, Kt = G;
se.httpOverHttp = Yt;
se.httpsOverHttp = zt;
se.httpOverHttps = Qt;
se.httpsOverHttps = Wt;
function Yt(e) {
  var r = new Y(e);
  return r.request = Se.request, r;
}
function zt(e) {
  var r = new Y(e);
  return r.request = Se.request, r.createSocket = Xe, r.defaultPort = 443, r;
}
function Qt(e) {
  var r = new Y(e);
  return r.request = We.request, r;
}
function Wt(e) {
  var r = new Y(e);
  return r.request = We.request, r.createSocket = Xe, r.defaultPort = 443, r;
}
function Y(e) {
  var r = this;
  r.options = e || {}, r.proxyOptions = r.options.proxy || {}, r.maxSockets = r.options.maxSockets || Se.Agent.defaultMaxSockets, r.requests = [], r.sockets = [], r.on("free", function(n, o, s, i) {
    for (var u = Ze(o, s, i), h = 0, m = r.requests.length; h < m; ++h) {
      var a = r.requests[h];
      if (a.host === u.host && a.port === u.port) {
        r.requests.splice(h, 1), a.request.onSocket(n);
        return;
      }
    }
    n.destroy(), r.removeSocket(n);
  });
}
Kt.inherits(Y, Ht.EventEmitter);
Y.prototype.addRequest = function(r, t, n, o) {
  var s = this, i = Pe({ request: r }, s.options, Ze(t, n, o));
  if (s.sockets.length >= this.maxSockets) {
    s.requests.push(i);
    return;
  }
  s.createSocket(i, function(u) {
    u.on("free", h), u.on("close", m), u.on("agentRemove", m), r.onSocket(u);
    function h() {
      s.emit("free", u, i);
    }
    function m(a) {
      s.removeSocket(u), u.removeListener("free", h), u.removeListener("close", m), u.removeListener("agentRemove", m);
    }
  });
};
Y.prototype.createSocket = function(r, t) {
  var n = this, o = {};
  n.sockets.push(o);
  var s = Pe({}, n.proxyOptions, {
    method: "CONNECT",
    path: r.host + ":" + r.port,
    agent: !1,
    headers: {
      host: r.host + ":" + r.port
    }
  });
  r.localAddress && (s.localAddress = r.localAddress), s.proxyAuth && (s.headers = s.headers || {}, s.headers["Proxy-Authorization"] = "Basic " + new Buffer(s.proxyAuth).toString("base64")), W("making CONNECT request");
  var i = n.request(s);
  i.useChunkedEncodingByDefault = !1, i.once("response", u), i.once("upgrade", h), i.once("connect", m), i.once("error", a), i.end();
  function u(v) {
    v.upgrade = !0;
  }
  function h(v, g, O) {
    process.nextTick(function() {
      m(v, g, O);
    });
  }
  function m(v, g, O) {
    if (i.removeAllListeners(), g.removeAllListeners(), v.statusCode !== 200) {
      W(
        "tunneling socket could not be established, statusCode=%d",
        v.statusCode
      ), g.destroy();
      var R = new Error("tunneling socket could not be established, statusCode=" + v.statusCode);
      R.code = "ECONNRESET", r.request.emit("error", R), n.removeSocket(o);
      return;
    }
    if (O.length > 0) {
      W("got illegal response body from proxy"), g.destroy();
      var R = new Error("got illegal response body from proxy");
      R.code = "ECONNRESET", r.request.emit("error", R), n.removeSocket(o);
      return;
    }
    return W("tunneling connection has established"), n.sockets[n.sockets.indexOf(o)] = g, t(g);
  }
  function a(v) {
    i.removeAllListeners(), W(
      `tunneling socket could not be established, cause=%s
`,
      v.message,
      v.stack
    );
    var g = new Error("tunneling socket could not be established, cause=" + v.message);
    g.code = "ECONNRESET", r.request.emit("error", g), n.removeSocket(o);
  }
};
Y.prototype.removeSocket = function(r) {
  var t = this.sockets.indexOf(r);
  if (t !== -1) {
    this.sockets.splice(t, 1);
    var n = this.requests.shift();
    n && this.createSocket(n, function(o) {
      n.request.onSocket(o);
    });
  }
};
function Xe(e, r) {
  var t = this;
  Y.prototype.createSocket.call(t, e, function(n) {
    var o = e.request.getHeader("host"), s = Pe({}, t.options, {
      socket: n,
      servername: o ? o.replace(/:.*$/, "") : e.host
    }), i = Jt.connect(0, s);
    t.sockets[t.sockets.indexOf(n)] = i, r(i);
  });
}
function Ze(e, r, t) {
  return typeof e == "string" ? {
    host: e,
    port: r,
    localAddress: t
  } : e;
}
function Pe(e) {
  for (var r = 1, t = arguments.length; r < t; ++r) {
    var n = arguments[r];
    if (typeof n == "object")
      for (var o = Object.keys(n), s = 0, i = o.length; s < i; ++s) {
        var u = o[s];
        n[u] !== void 0 && (e[u] = n[u]);
      }
  }
  return e;
}
var W;
process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG) ? W = function() {
  var e = Array.prototype.slice.call(arguments);
  typeof e[0] == "string" ? e[0] = "TUNNEL: " + e[0] : e.unshift("TUNNEL:"), console.error.apply(console, e);
} : W = function() {
};
se.debug = W;
var Xt = se;
(function(e) {
  var r = w && w.__createBinding || (Object.create ? function(f, d, c, l) {
    l === void 0 && (l = c), Object.defineProperty(f, l, { enumerable: !0, get: function() {
      return d[c];
    } });
  } : function(f, d, c, l) {
    l === void 0 && (l = c), f[l] = d[c];
  }), t = w && w.__setModuleDefault || (Object.create ? function(f, d) {
    Object.defineProperty(f, "default", { enumerable: !0, value: d });
  } : function(f, d) {
    f.default = d;
  }), n = w && w.__importStar || function(f) {
    if (f && f.__esModule)
      return f;
    var d = {};
    if (f != null)
      for (var c in f)
        c !== "default" && Object.hasOwnProperty.call(f, c) && r(d, f, c);
    return t(d, f), d;
  }, o = w && w.__awaiter || function(f, d, c, l) {
    function _(b) {
      return b instanceof c ? b : new c(function(S) {
        S(b);
      });
    }
    return new (c || (c = Promise))(function(b, S) {
      function C(M) {
        try {
          E(l.next(M));
        } catch ($) {
          S($);
        }
      }
      function A(M) {
        try {
          E(l.throw(M));
        } catch ($) {
          S($);
        }
      }
      function E(M) {
        M.done ? b(M.value) : _(M.value).then(C, A);
      }
      E((l = l.apply(f, d || [])).next());
    });
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.HttpClient = e.isHttps = e.HttpClientResponse = e.HttpClientError = e.getProxyUrl = e.MediaTypes = e.Headers = e.HttpCodes = void 0;
  const s = n(G), i = n(G), u = n(oe), h = n(Xt);
  var m;
  (function(f) {
    f[f.OK = 200] = "OK", f[f.MultipleChoices = 300] = "MultipleChoices", f[f.MovedPermanently = 301] = "MovedPermanently", f[f.ResourceMoved = 302] = "ResourceMoved", f[f.SeeOther = 303] = "SeeOther", f[f.NotModified = 304] = "NotModified", f[f.UseProxy = 305] = "UseProxy", f[f.SwitchProxy = 306] = "SwitchProxy", f[f.TemporaryRedirect = 307] = "TemporaryRedirect", f[f.PermanentRedirect = 308] = "PermanentRedirect", f[f.BadRequest = 400] = "BadRequest", f[f.Unauthorized = 401] = "Unauthorized", f[f.PaymentRequired = 402] = "PaymentRequired", f[f.Forbidden = 403] = "Forbidden", f[f.NotFound = 404] = "NotFound", f[f.MethodNotAllowed = 405] = "MethodNotAllowed", f[f.NotAcceptable = 406] = "NotAcceptable", f[f.ProxyAuthenticationRequired = 407] = "ProxyAuthenticationRequired", f[f.RequestTimeout = 408] = "RequestTimeout", f[f.Conflict = 409] = "Conflict", f[f.Gone = 410] = "Gone", f[f.TooManyRequests = 429] = "TooManyRequests", f[f.InternalServerError = 500] = "InternalServerError", f[f.NotImplemented = 501] = "NotImplemented", f[f.BadGateway = 502] = "BadGateway", f[f.ServiceUnavailable = 503] = "ServiceUnavailable", f[f.GatewayTimeout = 504] = "GatewayTimeout";
  })(m = e.HttpCodes || (e.HttpCodes = {}));
  var a;
  (function(f) {
    f.Accept = "accept", f.ContentType = "content-type";
  })(a = e.Headers || (e.Headers = {}));
  var v;
  (function(f) {
    f.ApplicationJson = "application/json";
  })(v = e.MediaTypes || (e.MediaTypes = {}));
  function g(f) {
    const d = u.getProxyUrl(new URL(f));
    return d ? d.href : "";
  }
  e.getProxyUrl = g;
  const O = [
    m.MovedPermanently,
    m.ResourceMoved,
    m.SeeOther,
    m.TemporaryRedirect,
    m.PermanentRedirect
  ], R = [
    m.BadGateway,
    m.ServiceUnavailable,
    m.GatewayTimeout
  ], P = ["OPTIONS", "GET", "DELETE", "HEAD"], I = 10, J = 5;
  class N extends Error {
    constructor(d, c) {
      super(d), this.name = "HttpClientError", this.statusCode = c, Object.setPrototypeOf(this, N.prototype);
    }
  }
  e.HttpClientError = N;
  class U {
    constructor(d) {
      this.message = d;
    }
    readBody() {
      return o(this, void 0, void 0, function* () {
        return new Promise((d) => o(this, void 0, void 0, function* () {
          let c = Buffer.alloc(0);
          this.message.on("data", (l) => {
            c = Buffer.concat([c, l]);
          }), this.message.on("end", () => {
            d(c.toString());
          });
        }));
      });
    }
  }
  e.HttpClientResponse = U;
  function F(f) {
    return new URL(f).protocol === "https:";
  }
  e.isHttps = F;
  class z {
    constructor(d, c, l) {
      this._ignoreSslError = !1, this._allowRedirects = !0, this._allowRedirectDowngrade = !1, this._maxRedirects = 50, this._allowRetries = !1, this._maxRetries = 1, this._keepAlive = !1, this._disposed = !1, this.userAgent = d, this.handlers = c || [], this.requestOptions = l, l && (l.ignoreSslError != null && (this._ignoreSslError = l.ignoreSslError), this._socketTimeout = l.socketTimeout, l.allowRedirects != null && (this._allowRedirects = l.allowRedirects), l.allowRedirectDowngrade != null && (this._allowRedirectDowngrade = l.allowRedirectDowngrade), l.maxRedirects != null && (this._maxRedirects = Math.max(l.maxRedirects, 0)), l.keepAlive != null && (this._keepAlive = l.keepAlive), l.allowRetries != null && (this._allowRetries = l.allowRetries), l.maxRetries != null && (this._maxRetries = l.maxRetries));
    }
    options(d, c) {
      return o(this, void 0, void 0, function* () {
        return this.request("OPTIONS", d, null, c || {});
      });
    }
    get(d, c) {
      return o(this, void 0, void 0, function* () {
        return this.request("GET", d, null, c || {});
      });
    }
    del(d, c) {
      return o(this, void 0, void 0, function* () {
        return this.request("DELETE", d, null, c || {});
      });
    }
    post(d, c, l) {
      return o(this, void 0, void 0, function* () {
        return this.request("POST", d, c, l || {});
      });
    }
    patch(d, c, l) {
      return o(this, void 0, void 0, function* () {
        return this.request("PATCH", d, c, l || {});
      });
    }
    put(d, c, l) {
      return o(this, void 0, void 0, function* () {
        return this.request("PUT", d, c, l || {});
      });
    }
    head(d, c) {
      return o(this, void 0, void 0, function* () {
        return this.request("HEAD", d, null, c || {});
      });
    }
    sendStream(d, c, l, _) {
      return o(this, void 0, void 0, function* () {
        return this.request(d, c, l, _);
      });
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */
    getJson(d, c = {}) {
      return o(this, void 0, void 0, function* () {
        c[a.Accept] = this._getExistingOrDefaultHeader(c, a.Accept, v.ApplicationJson);
        const l = yield this.get(d, c);
        return this._processResponse(l, this.requestOptions);
      });
    }
    postJson(d, c, l = {}) {
      return o(this, void 0, void 0, function* () {
        const _ = JSON.stringify(c, null, 2);
        l[a.Accept] = this._getExistingOrDefaultHeader(l, a.Accept, v.ApplicationJson), l[a.ContentType] = this._getExistingOrDefaultHeader(l, a.ContentType, v.ApplicationJson);
        const b = yield this.post(d, _, l);
        return this._processResponse(b, this.requestOptions);
      });
    }
    putJson(d, c, l = {}) {
      return o(this, void 0, void 0, function* () {
        const _ = JSON.stringify(c, null, 2);
        l[a.Accept] = this._getExistingOrDefaultHeader(l, a.Accept, v.ApplicationJson), l[a.ContentType] = this._getExistingOrDefaultHeader(l, a.ContentType, v.ApplicationJson);
        const b = yield this.put(d, _, l);
        return this._processResponse(b, this.requestOptions);
      });
    }
    patchJson(d, c, l = {}) {
      return o(this, void 0, void 0, function* () {
        const _ = JSON.stringify(c, null, 2);
        l[a.Accept] = this._getExistingOrDefaultHeader(l, a.Accept, v.ApplicationJson), l[a.ContentType] = this._getExistingOrDefaultHeader(l, a.ContentType, v.ApplicationJson);
        const b = yield this.patch(d, _, l);
        return this._processResponse(b, this.requestOptions);
      });
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    request(d, c, l, _) {
      return o(this, void 0, void 0, function* () {
        if (this._disposed)
          throw new Error("Client has already been disposed.");
        const b = new URL(c);
        let S = this._prepareRequest(d, b, _);
        const C = this._allowRetries && P.includes(d) ? this._maxRetries + 1 : 1;
        let A = 0, E;
        do {
          if (E = yield this.requestRaw(S, l), E && E.message && E.message.statusCode === m.Unauthorized) {
            let $;
            for (const x of this.handlers)
              if (x.canHandleAuthentication(E)) {
                $ = x;
                break;
              }
            return $ ? $.handleAuthentication(this, S, l) : E;
          }
          let M = this._maxRedirects;
          for (; E.message.statusCode && O.includes(E.message.statusCode) && this._allowRedirects && M > 0; ) {
            const $ = E.message.headers.location;
            if (!$)
              break;
            const x = new URL($);
            if (b.protocol === "https:" && b.protocol !== x.protocol && !this._allowRedirectDowngrade)
              throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
            if (yield E.readBody(), x.hostname !== b.hostname)
              for (const p in _)
                p.toLowerCase() === "authorization" && delete _[p];
            S = this._prepareRequest(d, x, _), E = yield this.requestRaw(S, l), M--;
          }
          if (!E.message.statusCode || !R.includes(E.message.statusCode))
            return E;
          A += 1, A < C && (yield E.readBody(), yield this._performExponentialBackoff(A));
        } while (A < C);
        return E;
      });
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
      this._agent && this._agent.destroy(), this._disposed = !0;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(d, c) {
      return o(this, void 0, void 0, function* () {
        return new Promise((l, _) => {
          function b(S, C) {
            S ? _(S) : C ? l(C) : _(new Error("Unknown error"));
          }
          this.requestRawWithCallback(d, c, b);
        });
      });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(d, c, l) {
      typeof c == "string" && (d.options.headers || (d.options.headers = {}), d.options.headers["Content-Length"] = Buffer.byteLength(c, "utf8"));
      let _ = !1;
      function b(A, E) {
        _ || (_ = !0, l(A, E));
      }
      const S = d.httpModule.request(d.options, (A) => {
        const E = new U(A);
        b(void 0, E);
      });
      let C;
      S.on("socket", (A) => {
        C = A;
      }), S.setTimeout(this._socketTimeout || 3 * 6e4, () => {
        C && C.end(), b(new Error(`Request timeout: ${d.options.path}`));
      }), S.on("error", function(A) {
        b(A);
      }), c && typeof c == "string" && S.write(c, "utf8"), c && typeof c != "string" ? (c.on("close", function() {
        S.end();
      }), c.pipe(S)) : S.end();
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */
    getAgent(d) {
      const c = new URL(d);
      return this._getAgent(c);
    }
    _prepareRequest(d, c, l) {
      const _ = {};
      _.parsedUrl = c;
      const b = _.parsedUrl.protocol === "https:";
      _.httpModule = b ? i : s;
      const S = b ? 443 : 80;
      if (_.options = {}, _.options.host = _.parsedUrl.hostname, _.options.port = _.parsedUrl.port ? parseInt(_.parsedUrl.port) : S, _.options.path = (_.parsedUrl.pathname || "") + (_.parsedUrl.search || ""), _.options.method = d, _.options.headers = this._mergeHeaders(l), this.userAgent != null && (_.options.headers["user-agent"] = this.userAgent), _.options.agent = this._getAgent(_.parsedUrl), this.handlers)
        for (const C of this.handlers)
          C.prepareRequest(_.options);
      return _;
    }
    _mergeHeaders(d) {
      return this.requestOptions && this.requestOptions.headers ? Object.assign({}, Q(this.requestOptions.headers), Q(d || {})) : Q(d || {});
    }
    _getExistingOrDefaultHeader(d, c, l) {
      let _;
      return this.requestOptions && this.requestOptions.headers && (_ = Q(this.requestOptions.headers)[c]), d[c] || _ || l;
    }
    _getAgent(d) {
      let c;
      const l = u.getProxyUrl(d), _ = l && l.hostname;
      if (this._keepAlive && _ && (c = this._proxyAgent), this._keepAlive && !_ && (c = this._agent), c)
        return c;
      const b = d.protocol === "https:";
      let S = 100;
      if (this.requestOptions && (S = this.requestOptions.maxSockets || s.globalAgent.maxSockets), l && l.hostname) {
        const C = {
          maxSockets: S,
          keepAlive: this._keepAlive,
          proxy: Object.assign(Object.assign({}, (l.username || l.password) && {
            proxyAuth: `${l.username}:${l.password}`
          }), { host: l.hostname, port: l.port })
        };
        let A;
        const E = l.protocol === "https:";
        b ? A = E ? h.httpsOverHttps : h.httpsOverHttp : A = E ? h.httpOverHttps : h.httpOverHttp, c = A(C), this._proxyAgent = c;
      }
      if (this._keepAlive && !c) {
        const C = { keepAlive: this._keepAlive, maxSockets: S };
        c = b ? new i.Agent(C) : new s.Agent(C), this._agent = c;
      }
      return c || (c = b ? i.globalAgent : s.globalAgent), b && this._ignoreSslError && (c.options = Object.assign(c.options || {}, {
        rejectUnauthorized: !1
      })), c;
    }
    _performExponentialBackoff(d) {
      return o(this, void 0, void 0, function* () {
        d = Math.min(I, d);
        const c = J * Math.pow(2, d);
        return new Promise((l) => setTimeout(() => l(), c));
      });
    }
    _processResponse(d, c) {
      return o(this, void 0, void 0, function* () {
        return new Promise((l, _) => o(this, void 0, void 0, function* () {
          const b = d.message.statusCode || 0, S = {
            statusCode: b,
            result: null,
            headers: {}
          };
          b === m.NotFound && l(S);
          function C(M, $) {
            if (typeof $ == "string") {
              const x = new Date($);
              if (!isNaN(x.valueOf()))
                return x;
            }
            return $;
          }
          let A, E;
          try {
            E = yield d.readBody(), E && E.length > 0 && (c && c.deserializeDates ? A = JSON.parse(E, C) : A = JSON.parse(E), S.result = A), S.headers = d.message.headers;
          } catch {
          }
          if (b > 299) {
            let M;
            A && A.message ? M = A.message : E && E.length > 0 ? M = E : M = `Failed request: (${b})`;
            const $ = new N(M, b);
            $.result = S.result, _($);
          } else
            l(S);
        }));
      });
    }
  }
  e.HttpClient = z;
  const Q = (f) => Object.keys(f).reduce((d, c) => (d[c.toLowerCase()] = f[c], d), {});
})(ze);
var Z = {}, Te = w && w.__awaiter || function(e, r, t, n) {
  function o(s) {
    return s instanceof t ? s : new t(function(i) {
      i(s);
    });
  }
  return new (t || (t = Promise))(function(s, i) {
    function u(a) {
      try {
        m(n.next(a));
      } catch (v) {
        i(v);
      }
    }
    function h(a) {
      try {
        m(n.throw(a));
      } catch (v) {
        i(v);
      }
    }
    function m(a) {
      a.done ? s(a.value) : o(a.value).then(u, h);
    }
    m((n = n.apply(e, r || [])).next());
  });
};
Object.defineProperty(Z, "__esModule", { value: !0 });
Z.PersonalAccessTokenCredentialHandler = Z.BearerCredentialHandler = Z.BasicCredentialHandler = void 0;
class Zt {
  constructor(r, t) {
    this.username = r, this.password = t;
  }
  prepareRequest(r) {
    if (!r.headers)
      throw Error("The request has no headers");
    r.headers.Authorization = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString("base64")}`;
  }
  // This handler cannot handle 401
  canHandleAuthentication() {
    return !1;
  }
  handleAuthentication() {
    return Te(this, void 0, void 0, function* () {
      throw new Error("not implemented");
    });
  }
}
Z.BasicCredentialHandler = Zt;
class er {
  constructor(r) {
    this.token = r;
  }
  // currently implements pre-authorization
  // TODO: support preAuth = false where it hooks on 401
  prepareRequest(r) {
    if (!r.headers)
      throw Error("The request has no headers");
    r.headers.Authorization = `Bearer ${this.token}`;
  }
  // This handler cannot handle 401
  canHandleAuthentication() {
    return !1;
  }
  handleAuthentication() {
    return Te(this, void 0, void 0, function* () {
      throw new Error("not implemented");
    });
  }
}
Z.BearerCredentialHandler = er;
class tr {
  constructor(r) {
    this.token = r;
  }
  // currently implements pre-authorization
  // TODO: support preAuth = false where it hooks on 401
  prepareRequest(r) {
    if (!r.headers)
      throw Error("The request has no headers");
    r.headers.Authorization = `Basic ${Buffer.from(`PAT:${this.token}`).toString("base64")}`;
  }
  // This handler cannot handle 401
  canHandleAuthentication() {
    return !1;
  }
  handleAuthentication() {
    return Te(this, void 0, void 0, function* () {
      throw new Error("not implemented");
    });
  }
}
Z.PersonalAccessTokenCredentialHandler = tr;
var $e;
function rr() {
  if ($e)
    return ae;
  $e = 1;
  var e = w && w.__awaiter || function(s, i, u, h) {
    function m(a) {
      return a instanceof u ? a : new u(function(v) {
        v(a);
      });
    }
    return new (u || (u = Promise))(function(a, v) {
      function g(P) {
        try {
          R(h.next(P));
        } catch (I) {
          v(I);
        }
      }
      function O(P) {
        try {
          R(h.throw(P));
        } catch (I) {
          v(I);
        }
      }
      function R(P) {
        P.done ? a(P.value) : m(P.value).then(g, O);
      }
      R((h = h.apply(s, i || [])).next());
    });
  };
  Object.defineProperty(ae, "__esModule", { value: !0 }), ae.OidcClient = void 0;
  const r = ze, t = Z, n = et();
  class o {
    static createHttpClient(i = !0, u = 10) {
      const h = {
        allowRetries: i,
        maxRetries: u
      };
      return new r.HttpClient("actions/oidc-client", [new t.BearerCredentialHandler(o.getRequestToken())], h);
    }
    static getRequestToken() {
      const i = process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN;
      if (!i)
        throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable");
      return i;
    }
    static getIDTokenUrl() {
      const i = process.env.ACTIONS_ID_TOKEN_REQUEST_URL;
      if (!i)
        throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable");
      return i;
    }
    static getCall(i) {
      var u;
      return e(this, void 0, void 0, function* () {
        const a = (u = (yield o.createHttpClient().getJson(i).catch((v) => {
          throw new Error(`Failed to get ID Token. 
 
        Error Code : ${v.statusCode}
 
        Error Message: ${v.result.message}`);
        })).result) === null || u === void 0 ? void 0 : u.value;
        if (!a)
          throw new Error("Response json body do not have ID Token field");
        return a;
      });
    }
    static getIDToken(i) {
      return e(this, void 0, void 0, function* () {
        try {
          let u = o.getIDTokenUrl();
          if (i) {
            const m = encodeURIComponent(i);
            u = `${u}&audience=${m}`;
          }
          n.debug(`ID token url is ${u}`);
          const h = yield o.getCall(u);
          return n.setSecret(h), h;
        } catch (u) {
          throw new Error(`Error message: ${u.message}`);
        }
      });
    }
  }
  return ae.OidcClient = o, ae;
}
var Re = {}, qe;
function Ie() {
  return qe || (qe = 1, function(e) {
    var r = w && w.__awaiter || function(m, a, v, g) {
      function O(R) {
        return R instanceof v ? R : new v(function(P) {
          P(R);
        });
      }
      return new (v || (v = Promise))(function(R, P) {
        function I(U) {
          try {
            N(g.next(U));
          } catch (F) {
            P(F);
          }
        }
        function J(U) {
          try {
            N(g.throw(U));
          } catch (F) {
            P(F);
          }
        }
        function N(U) {
          U.done ? R(U.value) : O(U.value).then(I, J);
        }
        N((g = g.apply(m, a || [])).next());
      });
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.summary = e.markdownSummary = e.SUMMARY_DOCS_URL = e.SUMMARY_ENV_VAR = void 0;
    const t = G, n = je, { access: o, appendFile: s, writeFile: i } = n.promises;
    e.SUMMARY_ENV_VAR = "GITHUB_STEP_SUMMARY", e.SUMMARY_DOCS_URL = "https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary";
    class u {
      constructor() {
        this._buffer = "";
      }
      /**
       * Finds the summary file path from the environment, rejects if env var is not found or file does not exist
       * Also checks r/w permissions.
       *
       * @returns step summary file path
       */
      filePath() {
        return r(this, void 0, void 0, function* () {
          if (this._filePath)
            return this._filePath;
          const a = process.env[e.SUMMARY_ENV_VAR];
          if (!a)
            throw new Error(`Unable to find environment variable for $${e.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
          try {
            yield o(a, n.constants.R_OK | n.constants.W_OK);
          } catch {
            throw new Error(`Unable to access summary file: '${a}'. Check if the file has correct read/write permissions.`);
          }
          return this._filePath = a, this._filePath;
        });
      }
      /**
       * Wraps content in an HTML tag, adding any HTML attributes
       *
       * @param {string} tag HTML tag to wrap
       * @param {string | null} content content within the tag
       * @param {[attribute: string]: string} attrs key-value list of HTML attributes to add
       *
       * @returns {string} content wrapped in HTML element
       */
      wrap(a, v, g = {}) {
        const O = Object.entries(g).map(([R, P]) => ` ${R}="${P}"`).join("");
        return v ? `<${a}${O}>${v}</${a}>` : `<${a}${O}>`;
      }
      /**
       * Writes text in the buffer to the summary buffer file and empties buffer. Will append by default.
       *
       * @param {SummaryWriteOptions} [options] (optional) options for write operation
       *
       * @returns {Promise<Summary>} summary instance
       */
      write(a) {
        return r(this, void 0, void 0, function* () {
          const v = !!(a != null && a.overwrite), g = yield this.filePath();
          return yield (v ? i : s)(g, this._buffer, { encoding: "utf8" }), this.emptyBuffer();
        });
      }
      /**
       * Clears the summary buffer and wipes the summary file
       *
       * @returns {Summary} summary instance
       */
      clear() {
        return r(this, void 0, void 0, function* () {
          return this.emptyBuffer().write({ overwrite: !0 });
        });
      }
      /**
       * Returns the current summary buffer as a string
       *
       * @returns {string} string of summary buffer
       */
      stringify() {
        return this._buffer;
      }
      /**
       * If the summary buffer is empty
       *
       * @returns {boolen} true if the buffer is empty
       */
      isEmptyBuffer() {
        return this._buffer.length === 0;
      }
      /**
       * Resets the summary buffer without writing to summary file
       *
       * @returns {Summary} summary instance
       */
      emptyBuffer() {
        return this._buffer = "", this;
      }
      /**
       * Adds raw text to the summary buffer
       *
       * @param {string} text content to add
       * @param {boolean} [addEOL=false] (optional) append an EOL to the raw text (default: false)
       *
       * @returns {Summary} summary instance
       */
      addRaw(a, v = !1) {
        return this._buffer += a, v ? this.addEOL() : this;
      }
      /**
       * Adds the operating system-specific end-of-line marker to the buffer
       *
       * @returns {Summary} summary instance
       */
      addEOL() {
        return this.addRaw(t.EOL);
      }
      /**
       * Adds an HTML codeblock to the summary buffer
       *
       * @param {string} code content to render within fenced code block
       * @param {string} lang (optional) language to syntax highlight code
       *
       * @returns {Summary} summary instance
       */
      addCodeBlock(a, v) {
        const g = Object.assign({}, v && { lang: v }), O = this.wrap("pre", this.wrap("code", a), g);
        return this.addRaw(O).addEOL();
      }
      /**
       * Adds an HTML list to the summary buffer
       *
       * @param {string[]} items list of items to render
       * @param {boolean} [ordered=false] (optional) if the rendered list should be ordered or not (default: false)
       *
       * @returns {Summary} summary instance
       */
      addList(a, v = !1) {
        const g = v ? "ol" : "ul", O = a.map((P) => this.wrap("li", P)).join(""), R = this.wrap(g, O);
        return this.addRaw(R).addEOL();
      }
      /**
       * Adds an HTML table to the summary buffer
       *
       * @param {SummaryTableCell[]} rows table rows
       *
       * @returns {Summary} summary instance
       */
      addTable(a) {
        const v = a.map((O) => {
          const R = O.map((P) => {
            if (typeof P == "string")
              return this.wrap("td", P);
            const { header: I, data: J, colspan: N, rowspan: U } = P, F = I ? "th" : "td", z = Object.assign(Object.assign({}, N && { colspan: N }), U && { rowspan: U });
            return this.wrap(F, J, z);
          }).join("");
          return this.wrap("tr", R);
        }).join(""), g = this.wrap("table", v);
        return this.addRaw(g).addEOL();
      }
      /**
       * Adds a collapsable HTML details element to the summary buffer
       *
       * @param {string} label text for the closed state
       * @param {string} content collapsable content
       *
       * @returns {Summary} summary instance
       */
      addDetails(a, v) {
        const g = this.wrap("details", this.wrap("summary", a) + v);
        return this.addRaw(g).addEOL();
      }
      /**
       * Adds an HTML image tag to the summary buffer
       *
       * @param {string} src path to the image you to embed
       * @param {string} alt text description of the image
       * @param {SummaryImageOptions} options (optional) addition image attributes
       *
       * @returns {Summary} summary instance
       */
      addImage(a, v, g) {
        const { width: O, height: R } = g || {}, P = Object.assign(Object.assign({}, O && { width: O }), R && { height: R }), I = this.wrap("img", null, Object.assign({ src: a, alt: v }, P));
        return this.addRaw(I).addEOL();
      }
      /**
       * Adds an HTML section heading element
       *
       * @param {string} text heading text
       * @param {number | string} [level=1] (optional) the heading level, default: 1
       *
       * @returns {Summary} summary instance
       */
      addHeading(a, v) {
        const g = `h${v}`, O = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(g) ? g : "h1", R = this.wrap(O, a);
        return this.addRaw(R).addEOL();
      }
      /**
       * Adds an HTML thematic break (<hr>) to the summary buffer
       *
       * @returns {Summary} summary instance
       */
      addSeparator() {
        const a = this.wrap("hr", null);
        return this.addRaw(a).addEOL();
      }
      /**
       * Adds an HTML line break (<br>) to the summary buffer
       *
       * @returns {Summary} summary instance
       */
      addBreak() {
        const a = this.wrap("br", null);
        return this.addRaw(a).addEOL();
      }
      /**
       * Adds an HTML blockquote to the summary buffer
       *
       * @param {string} text quote text
       * @param {string} cite (optional) citation url
       *
       * @returns {Summary} summary instance
       */
      addQuote(a, v) {
        const g = Object.assign({}, v && { cite: v }), O = this.wrap("blockquote", a, g);
        return this.addRaw(O).addEOL();
      }
      /**
       * Adds an HTML anchor tag to the summary buffer
       *
       * @param {string} text link text/content
       * @param {string} href hyperlink
       *
       * @returns {Summary} summary instance
       */
      addLink(a, v) {
        const g = this.wrap("a", a, { href: v });
        return this.addRaw(g).addEOL();
      }
    }
    const h = new u();
    e.markdownSummary = h, e.summary = h;
  }(Re)), Re;
}
var K = {}, Ne;
function nr() {
  if (Ne)
    return K;
  Ne = 1;
  var e = w && w.__createBinding || (Object.create ? function(u, h, m, a) {
    a === void 0 && (a = m), Object.defineProperty(u, a, { enumerable: !0, get: function() {
      return h[m];
    } });
  } : function(u, h, m, a) {
    a === void 0 && (a = m), u[a] = h[m];
  }), r = w && w.__setModuleDefault || (Object.create ? function(u, h) {
    Object.defineProperty(u, "default", { enumerable: !0, value: h });
  } : function(u, h) {
    u.default = h;
  }), t = w && w.__importStar || function(u) {
    if (u && u.__esModule)
      return u;
    var h = {};
    if (u != null)
      for (var m in u)
        m !== "default" && Object.hasOwnProperty.call(u, m) && e(h, u, m);
    return r(h, u), h;
  };
  Object.defineProperty(K, "__esModule", { value: !0 }), K.toPlatformPath = K.toWin32Path = K.toPosixPath = void 0;
  const n = t(G);
  function o(u) {
    return u.replace(/[\\]/g, "/");
  }
  K.toPosixPath = o;
  function s(u) {
    return u.replace(/[/]/g, "\\");
  }
  K.toWin32Path = s;
  function i(u) {
    return u.replace(/[/\\]/g, n.sep);
  }
  return K.toPlatformPath = i, K;
}
var De;
function et() {
  return De || (De = 1, function(e) {
    var r = w && w.__createBinding || (Object.create ? function(p, y, T, q) {
      q === void 0 && (q = T), Object.defineProperty(p, q, { enumerable: !0, get: function() {
        return y[T];
      } });
    } : function(p, y, T, q) {
      q === void 0 && (q = T), p[q] = y[T];
    }), t = w && w.__setModuleDefault || (Object.create ? function(p, y) {
      Object.defineProperty(p, "default", { enumerable: !0, value: y });
    } : function(p, y) {
      p.default = y;
    }), n = w && w.__importStar || function(p) {
      if (p && p.__esModule)
        return p;
      var y = {};
      if (p != null)
        for (var T in p)
          T !== "default" && Object.hasOwnProperty.call(p, T) && r(y, p, T);
      return t(y, p), y;
    }, o = w && w.__awaiter || function(p, y, T, q) {
      function ce(ie) {
        return ie instanceof T ? ie : new T(function(le) {
          le(ie);
        });
      }
      return new (T || (T = Promise))(function(ie, le) {
        function tt(te) {
          try {
            ve(q.next(te));
          } catch (me) {
            le(me);
          }
        }
        function rt(te) {
          try {
            ve(q.throw(te));
          } catch (me) {
            le(me);
          }
        }
        function ve(te) {
          te.done ? ie(te.value) : ce(te.value).then(tt, rt);
        }
        ve((q = q.apply(p, y || [])).next());
      });
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.getIDToken = e.getState = e.saveState = e.group = e.endGroup = e.startGroup = e.info = e.notice = e.warning = e.error = e.debug = e.isDebug = e.setFailed = e.setCommandEcho = e.setOutput = e.getBooleanInput = e.getMultilineInput = e.getInput = e.addPath = e.setSecret = e.exportVariable = e.ExitCode = void 0;
    const s = re, i = ne, u = ee, h = n(G), m = n(G), a = rr();
    var v;
    (function(p) {
      p[p.Success = 0] = "Success", p[p.Failure = 1] = "Failure";
    })(v = e.ExitCode || (e.ExitCode = {}));
    function g(p, y) {
      const T = u.toCommandValue(y);
      if (process.env[p] = T, process.env.GITHUB_ENV || "")
        return i.issueFileCommand("ENV", i.prepareKeyValueMessage(p, y));
      s.issueCommand("set-env", { name: p }, T);
    }
    e.exportVariable = g;
    function O(p) {
      s.issueCommand("add-mask", {}, p);
    }
    e.setSecret = O;
    function R(p) {
      process.env.GITHUB_PATH || "" ? i.issueFileCommand("PATH", p) : s.issueCommand("add-path", {}, p), process.env.PATH = `${p}${m.delimiter}${process.env.PATH}`;
    }
    e.addPath = R;
    function P(p, y) {
      const T = process.env[`INPUT_${p.replace(/ /g, "_").toUpperCase()}`] || "";
      if (y && y.required && !T)
        throw new Error(`Input required and not supplied: ${p}`);
      return y && y.trimWhitespace === !1 ? T : T.trim();
    }
    e.getInput = P;
    function I(p, y) {
      const T = P(p, y).split(`
`).filter((q) => q !== "");
      return y && y.trimWhitespace === !1 ? T : T.map((q) => q.trim());
    }
    e.getMultilineInput = I;
    function J(p, y) {
      const T = ["true", "True", "TRUE"], q = ["false", "False", "FALSE"], ce = P(p, y);
      if (T.includes(ce))
        return !0;
      if (q.includes(ce))
        return !1;
      throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${p}
Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
    }
    e.getBooleanInput = J;
    function N(p, y) {
      if (process.env.GITHUB_OUTPUT || "")
        return i.issueFileCommand("OUTPUT", i.prepareKeyValueMessage(p, y));
      process.stdout.write(h.EOL), s.issueCommand("set-output", { name: p }, u.toCommandValue(y));
    }
    e.setOutput = N;
    function U(p) {
      s.issue("echo", p ? "on" : "off");
    }
    e.setCommandEcho = U;
    function F(p) {
      process.exitCode = v.Failure, f(p);
    }
    e.setFailed = F;
    function z() {
      return process.env.RUNNER_DEBUG === "1";
    }
    e.isDebug = z;
    function Q(p) {
      s.issueCommand("debug", {}, p);
    }
    e.debug = Q;
    function f(p, y = {}) {
      s.issueCommand("error", u.toCommandProperties(y), p instanceof Error ? p.toString() : p);
    }
    e.error = f;
    function d(p, y = {}) {
      s.issueCommand("warning", u.toCommandProperties(y), p instanceof Error ? p.toString() : p);
    }
    e.warning = d;
    function c(p, y = {}) {
      s.issueCommand("notice", u.toCommandProperties(y), p instanceof Error ? p.toString() : p);
    }
    e.notice = c;
    function l(p) {
      process.stdout.write(p + h.EOL);
    }
    e.info = l;
    function _(p) {
      s.issue("group", p);
    }
    e.startGroup = _;
    function b() {
      s.issue("endgroup");
    }
    e.endGroup = b;
    function S(p, y) {
      return o(this, void 0, void 0, function* () {
        _(p);
        let T;
        try {
          T = yield y();
        } finally {
          b();
        }
        return T;
      });
    }
    e.group = S;
    function C(p, y) {
      if (process.env.GITHUB_STATE || "")
        return i.issueFileCommand("STATE", i.prepareKeyValueMessage(p, y));
      s.issueCommand("save-state", { name: p }, u.toCommandValue(y));
    }
    e.saveState = C;
    function A(p) {
      return process.env[`STATE_${p}`] || "";
    }
    e.getState = A;
    function E(p) {
      return o(this, void 0, void 0, function* () {
        return yield a.OidcClient.getIDToken(p);
      });
    }
    e.getIDToken = E;
    var M = Ie();
    Object.defineProperty(e, "summary", { enumerable: !0, get: function() {
      return M.summary;
    } });
    var $ = Ie();
    Object.defineProperty(e, "markdownSummary", { enumerable: !0, get: function() {
      return $.markdownSummary;
    } });
    var x = nr();
    Object.defineProperty(e, "toPosixPath", { enumerable: !0, get: function() {
      return x.toPosixPath;
    } }), Object.defineProperty(e, "toWin32Path", { enumerable: !0, get: function() {
      return x.toWin32Path;
    } }), Object.defineProperty(e, "toPlatformPath", { enumerable: !0, get: function() {
      return x.toPlatformPath;
    } });
  }(ge)), ge;
}
var V = et();
function or() {
  const e = V.getInput("result-type"), r = V.getInput("summary-path"), t = V.getInput("vitest-config-path"), n = V.getInput("badge-pass-color"), o = V.getInput("badge-fail-color"), s = V.getInput("badge-neutral-color");
  return {
    resultType: e,
    summaryPath: r,
    vitestConfigPath: t,
    badgePassColor: n,
    badgeFailColor: o,
    badgeNeutralColor: s
  };
}
class sr {
  constructor() {
    H(this, "results");
  }
  static async parse(r) {
    try {
      const t = Be.resolve(process.cwd(), r), n = await ke.readFile(t, "utf8");
      return V.debug(`Summary: ${JSON.stringify(n)}`), {
        results: JSON.parse(n)
      };
    } catch (t) {
      return V.warning(`Unable to parse vitest config file:
 ${t}`), {};
    }
  }
}
const ir = /100"?\s*:\s*true/, ar = /statements\s*:\s*(\d+)/, ur = /lines:\s*(\d+)/, cr = /branches\s*:\s*(\d+)/, lr = /functions\s*:\s*(\d+)/, ue = {
  lines: 60,
  branches: 60,
  functions: 60,
  statements: 60
};
class Ae {
  constructor() {
    H(this, "lines", ue.lines);
    H(this, "branches", ue.branches);
    H(this, "functions", ue.functions);
    H(this, "statements", ue.statements);
  }
  static async parse(r) {
    try {
      const t = Be.resolve(process.cwd(), r), n = await ke.readFile(t, "utf8");
      if (n.match(ir))
        return {
          lines: 100,
          branches: 100,
          functions: 100,
          statements: 100
        };
      const o = n.match(ur), s = n.match(cr), i = n.match(lr), u = n.match(ar), h = new Ae();
      return o && (h.lines = parseInt(o[1])), s && (h.branches = parseInt(s[1])), i && (h.functions = parseInt(i[1])), u && (h.statements = parseInt(u[1])), V.debug(`Threshold: ${JSON.stringify(h)}`), h;
    } catch (t) {
      return V.warning(`Unable to parse vitest config file:
 ${t}`), ue;
    }
  }
}
class fr {
  constructor(r) {
    H(this, "_threshold");
    H(this, "_summary");
    H(this, "_options");
    this._options = r;
  }
  async setup() {
    this._threshold = await Ae.parse(this._options.vitestConfigPath), this._summary = await sr.parse(this._options.summaryPath);
  }
  results(r) {
    const t = this._threshold[r], n = this.getSummary(r);
    if (n === null)
      return {
        status: "neutral",
        percentage: "unknown",
        covered: "unknown",
        color: this._options.badgeNeutralColor
      };
    const o = this.status(n, t);
    return {
      status: o,
      percentage: this.getPercentage(n),
      covered: this.getCovered(n),
      color: this.getBadgeColor(o)
    };
  }
  status(r, t) {
    return typeof r == "string" ? r : r.pct >= t ? "pass" : "fail";
  }
  getPercentage(r) {
    return `${r.pct}%`;
  }
  getCovered(r) {
    return `${r.covered} / ${r.total}`;
  }
  getBadgeColor(r) {
    switch (r) {
      case "pass":
        return this._options.badgePassColor;
      case "fail":
        return this._options.badgeFailColor;
      case "neutral":
        return this._options.badgeNeutralColor;
    }
  }
  getSummary(r) {
    return !this._summary || !this._summary.results || !this._summary.results.total || !this._summary.results.total[r] ? (V.warning(`No results found for ${r}.`), null) : this._summary.results.total[r];
  }
}
async function dr() {
  try {
    const e = or(), r = new fr(e);
    await r.setup();
    const t = r.results(e.resultType);
    V.setOutput("status", t.status), V.setOutput("percentage", t.percentage), V.setOutput("covered", t.covered), V.setOutput("color", t.color);
  } catch (e) {
    e instanceof Error && V.setFailed(e.message);
  }
}
dr();
