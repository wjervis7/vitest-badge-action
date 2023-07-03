var it = Object.defineProperty;
var at = (e, r, t) => r in e ? it(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t;
var H = (e, r, t) => (at(e, typeof r != "symbol" ? r + "" : r, t), t);
import de from "os";
import Be, { promises as Le } from "fs";
import Ve from "path";
import Fe from "http";
import xe from "https";
import "net";
import ut from "tls";
import ct from "events";
import "assert";
import lt from "util";
import Se from "node:path";
var w = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ft(e) {
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
var ye = {}, re = {}, ee = {};
Object.defineProperty(ee, "__esModule", { value: !0 });
ee.toCommandProperties = ee.toCommandValue = void 0;
function dt(e) {
  return e == null ? "" : typeof e == "string" || e instanceof String ? e : JSON.stringify(e);
}
ee.toCommandValue = dt;
function ht(e) {
  return Object.keys(e).length ? {
    title: e.title,
    file: e.file,
    line: e.startLine,
    endLine: e.endLine,
    col: e.startColumn,
    endColumn: e.endColumn
  } : {};
}
ee.toCommandProperties = ht;
var pt = w && w.__createBinding || (Object.create ? function(e, r, t, n) {
  n === void 0 && (n = t), Object.defineProperty(e, n, { enumerable: !0, get: function() {
    return r[t];
  } });
} : function(e, r, t, n) {
  n === void 0 && (n = t), e[n] = r[t];
}), gt = w && w.__setModuleDefault || (Object.create ? function(e, r) {
  Object.defineProperty(e, "default", { enumerable: !0, value: r });
} : function(e, r) {
  e.default = r;
}), mt = w && w.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var r = {};
  if (e != null)
    for (var t in e)
      t !== "default" && Object.hasOwnProperty.call(e, t) && pt(r, e, t);
  return gt(r, e), r;
};
Object.defineProperty(re, "__esModule", { value: !0 });
re.issue = re.issueCommand = void 0;
const vt = mt(de), Ge = ee;
function Je(e, r, t) {
  const n = new _t(e, r, t);
  process.stdout.write(n.toString() + vt.EOL);
}
re.issueCommand = Je;
function yt(e, r = "") {
  Je(e, {}, r);
}
re.issue = yt;
const $e = "::";
class _t {
  constructor(r, t, n) {
    r || (r = "missing.command"), this.command = r, this.properties = t, this.message = n;
  }
  toString() {
    let r = $e + this.command;
    if (this.properties && Object.keys(this.properties).length > 0) {
      r += " ";
      let t = !0;
      for (const n in this.properties)
        if (this.properties.hasOwnProperty(n)) {
          const o = this.properties[n];
          o && (t ? t = !1 : r += ",", r += `${n}=${bt(o)}`);
        }
    }
    return r += `${$e}${wt(this.message)}`, r;
  }
}
function wt(e) {
  return Ge.toCommandValue(e).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
}
function bt(e) {
  return Ge.toCommandValue(e).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
}
var ne = {}, fe, Ot = new Uint8Array(16);
function He() {
  if (!fe && (fe = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto), !fe))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return fe(Ot);
}
const Rt = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function he(e) {
  return typeof e == "string" && Rt.test(e);
}
var j = [];
for (var _e = 0; _e < 256; ++_e)
  j.push((_e + 256).toString(16).substr(1));
function pe(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, t = (j[e[r + 0]] + j[e[r + 1]] + j[e[r + 2]] + j[e[r + 3]] + "-" + j[e[r + 4]] + j[e[r + 5]] + "-" + j[e[r + 6]] + j[e[r + 7]] + "-" + j[e[r + 8]] + j[e[r + 9]] + "-" + j[e[r + 10]] + j[e[r + 11]] + j[e[r + 12]] + j[e[r + 13]] + j[e[r + 14]] + j[e[r + 15]]).toLowerCase();
  if (!he(t))
    throw TypeError("Stringified UUID is invalid");
  return t;
}
var Me, we, be = 0, Oe = 0;
function Et(e, r, t) {
  var n = r && t || 0, o = r || new Array(16);
  e = e || {};
  var s = e.node || Me, i = e.clockseq !== void 0 ? e.clockseq : we;
  if (s == null || i == null) {
    var u = e.random || (e.rng || He)();
    s == null && (s = Me = [u[0] | 1, u[1], u[2], u[3], u[4], u[5]]), i == null && (i = we = (u[6] << 8 | u[7]) & 16383);
  }
  var h = e.msecs !== void 0 ? e.msecs : Date.now(), m = e.nsecs !== void 0 ? e.nsecs : Oe + 1, a = h - be + (m - Oe) / 1e4;
  if (a < 0 && e.clockseq === void 0 && (i = i + 1 & 16383), (a < 0 || h > be) && e.nsecs === void 0 && (m = 0), m >= 1e4)
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  be = h, Oe = m, we = i, h += 122192928e5;
  var g = ((h & 268435455) * 1e4 + m) % 4294967296;
  o[n++] = g >>> 24 & 255, o[n++] = g >>> 16 & 255, o[n++] = g >>> 8 & 255, o[n++] = g & 255;
  var v = h / 4294967296 * 1e4 & 268435455;
  o[n++] = v >>> 8 & 255, o[n++] = v & 255, o[n++] = v >>> 24 & 15 | 16, o[n++] = v >>> 16 & 255, o[n++] = i >>> 8 | 128, o[n++] = i & 255;
  for (var O = 0; O < 6; ++O)
    o[n + O] = s[O];
  return r || pe(o);
}
function Ke(e) {
  if (!he(e))
    throw TypeError("Invalid UUID");
  var r, t = new Uint8Array(16);
  return t[0] = (r = parseInt(e.slice(0, 8), 16)) >>> 24, t[1] = r >>> 16 & 255, t[2] = r >>> 8 & 255, t[3] = r & 255, t[4] = (r = parseInt(e.slice(9, 13), 16)) >>> 8, t[5] = r & 255, t[6] = (r = parseInt(e.slice(14, 18), 16)) >>> 8, t[7] = r & 255, t[8] = (r = parseInt(e.slice(19, 23), 16)) >>> 8, t[9] = r & 255, t[10] = (r = parseInt(e.slice(24, 36), 16)) / 1099511627776 & 255, t[11] = r / 4294967296 & 255, t[12] = r >>> 24 & 255, t[13] = r >>> 16 & 255, t[14] = r >>> 8 & 255, t[15] = r & 255, t;
}
function St(e) {
  e = unescape(encodeURIComponent(e));
  for (var r = [], t = 0; t < e.length; ++t)
    r.push(e.charCodeAt(t));
  return r;
}
var Tt = "6ba7b810-9dad-11d1-80b4-00c04fd430c8", Pt = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
function Ye(e, r, t) {
  function n(o, s, i, u) {
    if (typeof o == "string" && (o = St(o)), typeof s == "string" && (s = Ke(s)), s.length !== 16)
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    var h = new Uint8Array(16 + o.length);
    if (h.set(s), h.set(o, s.length), h = t(h), h[6] = h[6] & 15 | r, h[8] = h[8] & 63 | 128, i) {
      u = u || 0;
      for (var m = 0; m < 16; ++m)
        i[u + m] = h[m];
      return i;
    }
    return pe(h);
  }
  try {
    n.name = e;
  } catch {
  }
  return n.DNS = Tt, n.URL = Pt, n;
}
function At(e) {
  if (typeof e == "string") {
    var r = unescape(encodeURIComponent(e));
    e = new Uint8Array(r.length);
    for (var t = 0; t < r.length; ++t)
      e[t] = r.charCodeAt(t);
  }
  return Ct(Ut($t(e), e.length * 8));
}
function Ct(e) {
  for (var r = [], t = e.length * 32, n = "0123456789abcdef", o = 0; o < t; o += 8) {
    var s = e[o >> 5] >>> o % 32 & 255, i = parseInt(n.charAt(s >>> 4 & 15) + n.charAt(s & 15), 16);
    r.push(i);
  }
  return r;
}
function ze(e) {
  return (e + 64 >>> 9 << 4) + 14 + 1;
}
function Ut(e, r) {
  e[r >> 5] |= 128 << r % 32, e[ze(r) - 1] = r;
  for (var t = 1732584193, n = -271733879, o = -1732584194, s = 271733878, i = 0; i < e.length; i += 16) {
    var u = t, h = n, m = o, a = s;
    t = k(t, n, o, s, e[i], 7, -680876936), s = k(s, t, n, o, e[i + 1], 12, -389564586), o = k(o, s, t, n, e[i + 2], 17, 606105819), n = k(n, o, s, t, e[i + 3], 22, -1044525330), t = k(t, n, o, s, e[i + 4], 7, -176418897), s = k(s, t, n, o, e[i + 5], 12, 1200080426), o = k(o, s, t, n, e[i + 6], 17, -1473231341), n = k(n, o, s, t, e[i + 7], 22, -45705983), t = k(t, n, o, s, e[i + 8], 7, 1770035416), s = k(s, t, n, o, e[i + 9], 12, -1958414417), o = k(o, s, t, n, e[i + 10], 17, -42063), n = k(n, o, s, t, e[i + 11], 22, -1990404162), t = k(t, n, o, s, e[i + 12], 7, 1804603682), s = k(s, t, n, o, e[i + 13], 12, -40341101), o = k(o, s, t, n, e[i + 14], 17, -1502002290), n = k(n, o, s, t, e[i + 15], 22, 1236535329), t = B(t, n, o, s, e[i + 1], 5, -165796510), s = B(s, t, n, o, e[i + 6], 9, -1069501632), o = B(o, s, t, n, e[i + 11], 14, 643717713), n = B(n, o, s, t, e[i], 20, -373897302), t = B(t, n, o, s, e[i + 5], 5, -701558691), s = B(s, t, n, o, e[i + 10], 9, 38016083), o = B(o, s, t, n, e[i + 15], 14, -660478335), n = B(n, o, s, t, e[i + 4], 20, -405537848), t = B(t, n, o, s, e[i + 9], 5, 568446438), s = B(s, t, n, o, e[i + 14], 9, -1019803690), o = B(o, s, t, n, e[i + 3], 14, -187363961), n = B(n, o, s, t, e[i + 8], 20, 1163531501), t = B(t, n, o, s, e[i + 13], 5, -1444681467), s = B(s, t, n, o, e[i + 2], 9, -51403784), o = B(o, s, t, n, e[i + 7], 14, 1735328473), n = B(n, o, s, t, e[i + 12], 20, -1926607734), t = L(t, n, o, s, e[i + 5], 4, -378558), s = L(s, t, n, o, e[i + 8], 11, -2022574463), o = L(o, s, t, n, e[i + 11], 16, 1839030562), n = L(n, o, s, t, e[i + 14], 23, -35309556), t = L(t, n, o, s, e[i + 1], 4, -1530992060), s = L(s, t, n, o, e[i + 4], 11, 1272893353), o = L(o, s, t, n, e[i + 7], 16, -155497632), n = L(n, o, s, t, e[i + 10], 23, -1094730640), t = L(t, n, o, s, e[i + 13], 4, 681279174), s = L(s, t, n, o, e[i], 11, -358537222), o = L(o, s, t, n, e[i + 3], 16, -722521979), n = L(n, o, s, t, e[i + 6], 23, 76029189), t = L(t, n, o, s, e[i + 9], 4, -640364487), s = L(s, t, n, o, e[i + 12], 11, -421815835), o = L(o, s, t, n, e[i + 15], 16, 530742520), n = L(n, o, s, t, e[i + 2], 23, -995338651), t = V(t, n, o, s, e[i], 6, -198630844), s = V(s, t, n, o, e[i + 7], 10, 1126891415), o = V(o, s, t, n, e[i + 14], 15, -1416354905), n = V(n, o, s, t, e[i + 5], 21, -57434055), t = V(t, n, o, s, e[i + 12], 6, 1700485571), s = V(s, t, n, o, e[i + 3], 10, -1894986606), o = V(o, s, t, n, e[i + 10], 15, -1051523), n = V(n, o, s, t, e[i + 1], 21, -2054922799), t = V(t, n, o, s, e[i + 8], 6, 1873313359), s = V(s, t, n, o, e[i + 15], 10, -30611744), o = V(o, s, t, n, e[i + 6], 15, -1560198380), n = V(n, o, s, t, e[i + 13], 21, 1309151649), t = V(t, n, o, s, e[i + 4], 6, -145523070), s = V(s, t, n, o, e[i + 11], 10, -1120210379), o = V(o, s, t, n, e[i + 2], 15, 718787259), n = V(n, o, s, t, e[i + 9], 21, -343485551), t = X(t, u), n = X(n, h), o = X(o, m), s = X(s, a);
  }
  return [t, n, o, s];
}
function $t(e) {
  if (e.length === 0)
    return [];
  for (var r = e.length * 8, t = new Uint32Array(ze(r)), n = 0; n < r; n += 8)
    t[n >> 5] |= (e[n / 8] & 255) << n % 32;
  return t;
}
function X(e, r) {
  var t = (e & 65535) + (r & 65535), n = (e >> 16) + (r >> 16) + (t >> 16);
  return n << 16 | t & 65535;
}
function Mt(e, r) {
  return e << r | e >>> 32 - r;
}
function ge(e, r, t, n, o, s) {
  return X(Mt(X(X(r, e), X(n, s)), o), t);
}
function k(e, r, t, n, o, s, i) {
  return ge(r & t | ~r & n, e, r, o, s, i);
}
function B(e, r, t, n, o, s, i) {
  return ge(r & n | t & ~n, e, r, o, s, i);
}
function L(e, r, t, n, o, s, i) {
  return ge(r ^ t ^ n, e, r, o, s, i);
}
function V(e, r, t, n, o, s, i) {
  return ge(t ^ (r | ~n), e, r, o, s, i);
}
var qt = Ye("v3", 48, At);
const It = qt;
function Nt(e, r, t) {
  e = e || {};
  var n = e.random || (e.rng || He)();
  if (n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, r) {
    t = t || 0;
    for (var o = 0; o < 16; ++o)
      r[t + o] = n[o];
    return r;
  }
  return pe(n);
}
function Dt(e, r, t, n) {
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
function Re(e, r) {
  return e << r | e >>> 32 - r;
}
function jt(e) {
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
  for (var g = 0; g < i; ++g) {
    for (var v = new Uint32Array(80), O = 0; O < 16; ++O)
      v[O] = u[g][O];
    for (var R = 16; R < 80; ++R)
      v[R] = Re(v[R - 3] ^ v[R - 8] ^ v[R - 14] ^ v[R - 16], 1);
    for (var T = t[0], N = t[1], J = t[2], D = t[3], $ = t[4], x = 0; x < 80; ++x) {
      var z = Math.floor(x / 20), Q = Re(T, 5) + Dt(z, N, J, D) + $ + r[z] + v[x] >>> 0;
      $ = D, D = J, J = Re(N, 30) >>> 0, N = T, T = Q;
    }
    t[0] = t[0] + T >>> 0, t[1] = t[1] + N >>> 0, t[2] = t[2] + J >>> 0, t[3] = t[3] + D >>> 0, t[4] = t[4] + $ >>> 0;
  }
  return [t[0] >> 24 & 255, t[0] >> 16 & 255, t[0] >> 8 & 255, t[0] & 255, t[1] >> 24 & 255, t[1] >> 16 & 255, t[1] >> 8 & 255, t[1] & 255, t[2] >> 24 & 255, t[2] >> 16 & 255, t[2] >> 8 & 255, t[2] & 255, t[3] >> 24 & 255, t[3] >> 16 & 255, t[3] >> 8 & 255, t[3] & 255, t[4] >> 24 & 255, t[4] >> 16 & 255, t[4] >> 8 & 255, t[4] & 255];
}
var kt = Ye("v5", 80, jt);
const Bt = kt, Lt = "00000000-0000-0000-0000-000000000000";
function Vt(e) {
  if (!he(e))
    throw TypeError("Invalid UUID");
  return parseInt(e.substr(14, 1), 16);
}
const Ft = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  NIL: Lt,
  parse: Ke,
  stringify: pe,
  v1: Et,
  v3: It,
  v4: Nt,
  v5: Bt,
  validate: he,
  version: Vt
}, Symbol.toStringTag, { value: "Module" })), xt = /* @__PURE__ */ ft(Ft);
var Gt = w && w.__createBinding || (Object.create ? function(e, r, t, n) {
  n === void 0 && (n = t), Object.defineProperty(e, n, { enumerable: !0, get: function() {
    return r[t];
  } });
} : function(e, r, t, n) {
  n === void 0 && (n = t), e[n] = r[t];
}), Jt = w && w.__setModuleDefault || (Object.create ? function(e, r) {
  Object.defineProperty(e, "default", { enumerable: !0, value: r });
} : function(e, r) {
  e.default = r;
}), Qe = w && w.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var r = {};
  if (e != null)
    for (var t in e)
      t !== "default" && Object.hasOwnProperty.call(e, t) && Gt(r, e, t);
  return Jt(r, e), r;
};
Object.defineProperty(ne, "__esModule", { value: !0 });
ne.prepareKeyValueMessage = ne.issueFileCommand = void 0;
const qe = Qe(Be), Te = Qe(de), Ht = xt, We = ee;
function Kt(e, r) {
  const t = process.env[`GITHUB_${e}`];
  if (!t)
    throw new Error(`Unable to find environment variable for file command ${e}`);
  if (!qe.existsSync(t))
    throw new Error(`Missing file at path: ${t}`);
  qe.appendFileSync(t, `${We.toCommandValue(r)}${Te.EOL}`, {
    encoding: "utf8"
  });
}
ne.issueFileCommand = Kt;
function Yt(e, r) {
  const t = `ghadelimiter_${Ht.v4()}`, n = We.toCommandValue(r);
  if (e.includes(t))
    throw new Error(`Unexpected input: name should not contain the delimiter "${t}"`);
  if (n.includes(t))
    throw new Error(`Unexpected input: value should not contain the delimiter "${t}"`);
  return `${e}<<${t}${Te.EOL}${n}${Te.EOL}${t}`;
}
ne.prepareKeyValueMessage = Yt;
var ae = {}, Xe = {}, oe = {};
Object.defineProperty(oe, "__esModule", { value: !0 });
oe.checkBypass = oe.getProxyUrl = void 0;
function zt(e) {
  const r = e.protocol === "https:";
  if (Ze(e))
    return;
  const t = (() => r ? process.env.https_proxy || process.env.HTTPS_PROXY : process.env.http_proxy || process.env.HTTP_PROXY)();
  if (t)
    return new URL(t);
}
oe.getProxyUrl = zt;
function Ze(e) {
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
oe.checkBypass = Ze;
var se = {}, Qt = ut, Pe = Fe, et = xe, Wt = ct, Xt = lt;
se.httpOverHttp = Zt;
se.httpsOverHttp = er;
se.httpOverHttps = tr;
se.httpsOverHttps = rr;
function Zt(e) {
  var r = new Y(e);
  return r.request = Pe.request, r;
}
function er(e) {
  var r = new Y(e);
  return r.request = Pe.request, r.createSocket = tt, r.defaultPort = 443, r;
}
function tr(e) {
  var r = new Y(e);
  return r.request = et.request, r;
}
function rr(e) {
  var r = new Y(e);
  return r.request = et.request, r.createSocket = tt, r.defaultPort = 443, r;
}
function Y(e) {
  var r = this;
  r.options = e || {}, r.proxyOptions = r.options.proxy || {}, r.maxSockets = r.options.maxSockets || Pe.Agent.defaultMaxSockets, r.requests = [], r.sockets = [], r.on("free", function(n, o, s, i) {
    for (var u = rt(o, s, i), h = 0, m = r.requests.length; h < m; ++h) {
      var a = r.requests[h];
      if (a.host === u.host && a.port === u.port) {
        r.requests.splice(h, 1), a.request.onSocket(n);
        return;
      }
    }
    n.destroy(), r.removeSocket(n);
  });
}
Xt.inherits(Y, Wt.EventEmitter);
Y.prototype.addRequest = function(r, t, n, o) {
  var s = this, i = Ae({ request: r }, s.options, rt(t, n, o));
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
  var s = Ae({}, n.proxyOptions, {
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
  function u(g) {
    g.upgrade = !0;
  }
  function h(g, v, O) {
    process.nextTick(function() {
      m(g, v, O);
    });
  }
  function m(g, v, O) {
    if (i.removeAllListeners(), v.removeAllListeners(), g.statusCode !== 200) {
      W(
        "tunneling socket could not be established, statusCode=%d",
        g.statusCode
      ), v.destroy();
      var R = new Error("tunneling socket could not be established, statusCode=" + g.statusCode);
      R.code = "ECONNRESET", r.request.emit("error", R), n.removeSocket(o);
      return;
    }
    if (O.length > 0) {
      W("got illegal response body from proxy"), v.destroy();
      var R = new Error("got illegal response body from proxy");
      R.code = "ECONNRESET", r.request.emit("error", R), n.removeSocket(o);
      return;
    }
    return W("tunneling connection has established"), n.sockets[n.sockets.indexOf(o)] = v, t(v);
  }
  function a(g) {
    i.removeAllListeners(), W(
      `tunneling socket could not be established, cause=%s
`,
      g.message,
      g.stack
    );
    var v = new Error("tunneling socket could not be established, cause=" + g.message);
    v.code = "ECONNRESET", r.request.emit("error", v), n.removeSocket(o);
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
function tt(e, r) {
  var t = this;
  Y.prototype.createSocket.call(t, e, function(n) {
    var o = e.request.getHeader("host"), s = Ae({}, t.options, {
      socket: n,
      servername: o ? o.replace(/:.*$/, "") : e.host
    }), i = Qt.connect(0, s);
    t.sockets[t.sockets.indexOf(n)] = i, r(i);
  });
}
function rt(e, r, t) {
  return typeof e == "string" ? {
    host: e,
    port: r,
    localAddress: t
  } : e;
}
function Ae(e) {
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
var nr = se;
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
    function y(b) {
      return b instanceof c ? b : new c(function(S) {
        S(b);
      });
    }
    return new (c || (c = Promise))(function(b, S) {
      function U(M) {
        try {
          E(l.next(M));
        } catch (q) {
          S(q);
        }
      }
      function C(M) {
        try {
          E(l.throw(M));
        } catch (q) {
          S(q);
        }
      }
      function E(M) {
        M.done ? b(M.value) : y(M.value).then(U, C);
      }
      E((l = l.apply(f, d || [])).next());
    });
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.HttpClient = e.isHttps = e.HttpClientResponse = e.HttpClientError = e.getProxyUrl = e.MediaTypes = e.Headers = e.HttpCodes = void 0;
  const s = n(Fe), i = n(xe), u = n(oe), h = n(nr);
  var m;
  (function(f) {
    f[f.OK = 200] = "OK", f[f.MultipleChoices = 300] = "MultipleChoices", f[f.MovedPermanently = 301] = "MovedPermanently", f[f.ResourceMoved = 302] = "ResourceMoved", f[f.SeeOther = 303] = "SeeOther", f[f.NotModified = 304] = "NotModified", f[f.UseProxy = 305] = "UseProxy", f[f.SwitchProxy = 306] = "SwitchProxy", f[f.TemporaryRedirect = 307] = "TemporaryRedirect", f[f.PermanentRedirect = 308] = "PermanentRedirect", f[f.BadRequest = 400] = "BadRequest", f[f.Unauthorized = 401] = "Unauthorized", f[f.PaymentRequired = 402] = "PaymentRequired", f[f.Forbidden = 403] = "Forbidden", f[f.NotFound = 404] = "NotFound", f[f.MethodNotAllowed = 405] = "MethodNotAllowed", f[f.NotAcceptable = 406] = "NotAcceptable", f[f.ProxyAuthenticationRequired = 407] = "ProxyAuthenticationRequired", f[f.RequestTimeout = 408] = "RequestTimeout", f[f.Conflict = 409] = "Conflict", f[f.Gone = 410] = "Gone", f[f.TooManyRequests = 429] = "TooManyRequests", f[f.InternalServerError = 500] = "InternalServerError", f[f.NotImplemented = 501] = "NotImplemented", f[f.BadGateway = 502] = "BadGateway", f[f.ServiceUnavailable = 503] = "ServiceUnavailable", f[f.GatewayTimeout = 504] = "GatewayTimeout";
  })(m = e.HttpCodes || (e.HttpCodes = {}));
  var a;
  (function(f) {
    f.Accept = "accept", f.ContentType = "content-type";
  })(a = e.Headers || (e.Headers = {}));
  var g;
  (function(f) {
    f.ApplicationJson = "application/json";
  })(g = e.MediaTypes || (e.MediaTypes = {}));
  function v(f) {
    const d = u.getProxyUrl(new URL(f));
    return d ? d.href : "";
  }
  e.getProxyUrl = v;
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
  ], T = ["OPTIONS", "GET", "DELETE", "HEAD"], N = 10, J = 5;
  class D extends Error {
    constructor(d, c) {
      super(d), this.name = "HttpClientError", this.statusCode = c, Object.setPrototypeOf(this, D.prototype);
    }
  }
  e.HttpClientError = D;
  class $ {
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
  e.HttpClientResponse = $;
  function x(f) {
    return new URL(f).protocol === "https:";
  }
  e.isHttps = x;
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
    sendStream(d, c, l, y) {
      return o(this, void 0, void 0, function* () {
        return this.request(d, c, l, y);
      });
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */
    getJson(d, c = {}) {
      return o(this, void 0, void 0, function* () {
        c[a.Accept] = this._getExistingOrDefaultHeader(c, a.Accept, g.ApplicationJson);
        const l = yield this.get(d, c);
        return this._processResponse(l, this.requestOptions);
      });
    }
    postJson(d, c, l = {}) {
      return o(this, void 0, void 0, function* () {
        const y = JSON.stringify(c, null, 2);
        l[a.Accept] = this._getExistingOrDefaultHeader(l, a.Accept, g.ApplicationJson), l[a.ContentType] = this._getExistingOrDefaultHeader(l, a.ContentType, g.ApplicationJson);
        const b = yield this.post(d, y, l);
        return this._processResponse(b, this.requestOptions);
      });
    }
    putJson(d, c, l = {}) {
      return o(this, void 0, void 0, function* () {
        const y = JSON.stringify(c, null, 2);
        l[a.Accept] = this._getExistingOrDefaultHeader(l, a.Accept, g.ApplicationJson), l[a.ContentType] = this._getExistingOrDefaultHeader(l, a.ContentType, g.ApplicationJson);
        const b = yield this.put(d, y, l);
        return this._processResponse(b, this.requestOptions);
      });
    }
    patchJson(d, c, l = {}) {
      return o(this, void 0, void 0, function* () {
        const y = JSON.stringify(c, null, 2);
        l[a.Accept] = this._getExistingOrDefaultHeader(l, a.Accept, g.ApplicationJson), l[a.ContentType] = this._getExistingOrDefaultHeader(l, a.ContentType, g.ApplicationJson);
        const b = yield this.patch(d, y, l);
        return this._processResponse(b, this.requestOptions);
      });
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    request(d, c, l, y) {
      return o(this, void 0, void 0, function* () {
        if (this._disposed)
          throw new Error("Client has already been disposed.");
        const b = new URL(c);
        let S = this._prepareRequest(d, b, y);
        const U = this._allowRetries && T.includes(d) ? this._maxRetries + 1 : 1;
        let C = 0, E;
        do {
          if (E = yield this.requestRaw(S, l), E && E.message && E.message.statusCode === m.Unauthorized) {
            let q;
            for (const G of this.handlers)
              if (G.canHandleAuthentication(E)) {
                q = G;
                break;
              }
            return q ? q.handleAuthentication(this, S, l) : E;
          }
          let M = this._maxRedirects;
          for (; E.message.statusCode && O.includes(E.message.statusCode) && this._allowRedirects && M > 0; ) {
            const q = E.message.headers.location;
            if (!q)
              break;
            const G = new URL(q);
            if (b.protocol === "https:" && b.protocol !== G.protocol && !this._allowRedirectDowngrade)
              throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
            if (yield E.readBody(), G.hostname !== b.hostname)
              for (const p in y)
                p.toLowerCase() === "authorization" && delete y[p];
            S = this._prepareRequest(d, G, y), E = yield this.requestRaw(S, l), M--;
          }
          if (!E.message.statusCode || !R.includes(E.message.statusCode))
            return E;
          C += 1, C < U && (yield E.readBody(), yield this._performExponentialBackoff(C));
        } while (C < U);
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
        return new Promise((l, y) => {
          function b(S, U) {
            S ? y(S) : U ? l(U) : y(new Error("Unknown error"));
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
      let y = !1;
      function b(C, E) {
        y || (y = !0, l(C, E));
      }
      const S = d.httpModule.request(d.options, (C) => {
        const E = new $(C);
        b(void 0, E);
      });
      let U;
      S.on("socket", (C) => {
        U = C;
      }), S.setTimeout(this._socketTimeout || 3 * 6e4, () => {
        U && U.end(), b(new Error(`Request timeout: ${d.options.path}`));
      }), S.on("error", function(C) {
        b(C);
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
      const y = {};
      y.parsedUrl = c;
      const b = y.parsedUrl.protocol === "https:";
      y.httpModule = b ? i : s;
      const S = b ? 443 : 80;
      if (y.options = {}, y.options.host = y.parsedUrl.hostname, y.options.port = y.parsedUrl.port ? parseInt(y.parsedUrl.port) : S, y.options.path = (y.parsedUrl.pathname || "") + (y.parsedUrl.search || ""), y.options.method = d, y.options.headers = this._mergeHeaders(l), this.userAgent != null && (y.options.headers["user-agent"] = this.userAgent), y.options.agent = this._getAgent(y.parsedUrl), this.handlers)
        for (const U of this.handlers)
          U.prepareRequest(y.options);
      return y;
    }
    _mergeHeaders(d) {
      return this.requestOptions && this.requestOptions.headers ? Object.assign({}, Q(this.requestOptions.headers), Q(d || {})) : Q(d || {});
    }
    _getExistingOrDefaultHeader(d, c, l) {
      let y;
      return this.requestOptions && this.requestOptions.headers && (y = Q(this.requestOptions.headers)[c]), d[c] || y || l;
    }
    _getAgent(d) {
      let c;
      const l = u.getProxyUrl(d), y = l && l.hostname;
      if (this._keepAlive && y && (c = this._proxyAgent), this._keepAlive && !y && (c = this._agent), c)
        return c;
      const b = d.protocol === "https:";
      let S = 100;
      if (this.requestOptions && (S = this.requestOptions.maxSockets || s.globalAgent.maxSockets), l && l.hostname) {
        const U = {
          maxSockets: S,
          keepAlive: this._keepAlive,
          proxy: Object.assign(Object.assign({}, (l.username || l.password) && {
            proxyAuth: `${l.username}:${l.password}`
          }), { host: l.hostname, port: l.port })
        };
        let C;
        const E = l.protocol === "https:";
        b ? C = E ? h.httpsOverHttps : h.httpsOverHttp : C = E ? h.httpOverHttps : h.httpOverHttp, c = C(U), this._proxyAgent = c;
      }
      if (this._keepAlive && !c) {
        const U = { keepAlive: this._keepAlive, maxSockets: S };
        c = b ? new i.Agent(U) : new s.Agent(U), this._agent = c;
      }
      return c || (c = b ? i.globalAgent : s.globalAgent), b && this._ignoreSslError && (c.options = Object.assign(c.options || {}, {
        rejectUnauthorized: !1
      })), c;
    }
    _performExponentialBackoff(d) {
      return o(this, void 0, void 0, function* () {
        d = Math.min(N, d);
        const c = J * Math.pow(2, d);
        return new Promise((l) => setTimeout(() => l(), c));
      });
    }
    _processResponse(d, c) {
      return o(this, void 0, void 0, function* () {
        return new Promise((l, y) => o(this, void 0, void 0, function* () {
          const b = d.message.statusCode || 0, S = {
            statusCode: b,
            result: null,
            headers: {}
          };
          b === m.NotFound && l(S);
          function U(M, q) {
            if (typeof q == "string") {
              const G = new Date(q);
              if (!isNaN(G.valueOf()))
                return G;
            }
            return q;
          }
          let C, E;
          try {
            E = yield d.readBody(), E && E.length > 0 && (c && c.deserializeDates ? C = JSON.parse(E, U) : C = JSON.parse(E), S.result = C), S.headers = d.message.headers;
          } catch {
          }
          if (b > 299) {
            let M;
            C && C.message ? M = C.message : E && E.length > 0 ? M = E : M = `Failed request: (${b})`;
            const q = new D(M, b);
            q.result = S.result, y(q);
          } else
            l(S);
        }));
      });
    }
  }
  e.HttpClient = z;
  const Q = (f) => Object.keys(f).reduce((d, c) => (d[c.toLowerCase()] = f[c], d), {});
})(Xe);
var Z = {}, Ce = w && w.__awaiter || function(e, r, t, n) {
  function o(s) {
    return s instanceof t ? s : new t(function(i) {
      i(s);
    });
  }
  return new (t || (t = Promise))(function(s, i) {
    function u(a) {
      try {
        m(n.next(a));
      } catch (g) {
        i(g);
      }
    }
    function h(a) {
      try {
        m(n.throw(a));
      } catch (g) {
        i(g);
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
class or {
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
    return Ce(this, void 0, void 0, function* () {
      throw new Error("not implemented");
    });
  }
}
Z.BasicCredentialHandler = or;
class sr {
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
    return Ce(this, void 0, void 0, function* () {
      throw new Error("not implemented");
    });
  }
}
Z.BearerCredentialHandler = sr;
class ir {
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
    return Ce(this, void 0, void 0, function* () {
      throw new Error("not implemented");
    });
  }
}
Z.PersonalAccessTokenCredentialHandler = ir;
var Ie;
function ar() {
  if (Ie)
    return ae;
  Ie = 1;
  var e = w && w.__awaiter || function(s, i, u, h) {
    function m(a) {
      return a instanceof u ? a : new u(function(g) {
        g(a);
      });
    }
    return new (u || (u = Promise))(function(a, g) {
      function v(T) {
        try {
          R(h.next(T));
        } catch (N) {
          g(N);
        }
      }
      function O(T) {
        try {
          R(h.throw(T));
        } catch (N) {
          g(N);
        }
      }
      function R(T) {
        T.done ? a(T.value) : m(T.value).then(v, O);
      }
      R((h = h.apply(s, i || [])).next());
    });
  };
  Object.defineProperty(ae, "__esModule", { value: !0 }), ae.OidcClient = void 0;
  const r = Xe, t = Z, n = nt();
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
        const a = (u = (yield o.createHttpClient().getJson(i).catch((g) => {
          throw new Error(`Failed to get ID Token. 
 
        Error Code : ${g.statusCode}
 
        Error Message: ${g.result.message}`);
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
var Ee = {}, Ne;
function De() {
  return Ne || (Ne = 1, function(e) {
    var r = w && w.__awaiter || function(m, a, g, v) {
      function O(R) {
        return R instanceof g ? R : new g(function(T) {
          T(R);
        });
      }
      return new (g || (g = Promise))(function(R, T) {
        function N($) {
          try {
            D(v.next($));
          } catch (x) {
            T(x);
          }
        }
        function J($) {
          try {
            D(v.throw($));
          } catch (x) {
            T(x);
          }
        }
        function D($) {
          $.done ? R($.value) : O($.value).then(N, J);
        }
        D((v = v.apply(m, a || [])).next());
      });
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.summary = e.markdownSummary = e.SUMMARY_DOCS_URL = e.SUMMARY_ENV_VAR = void 0;
    const t = de, n = Be, { access: o, appendFile: s, writeFile: i } = n.promises;
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
      wrap(a, g, v = {}) {
        const O = Object.entries(v).map(([R, T]) => ` ${R}="${T}"`).join("");
        return g ? `<${a}${O}>${g}</${a}>` : `<${a}${O}>`;
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
          const g = !!(a != null && a.overwrite), v = yield this.filePath();
          return yield (g ? i : s)(v, this._buffer, { encoding: "utf8" }), this.emptyBuffer();
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
      addRaw(a, g = !1) {
        return this._buffer += a, g ? this.addEOL() : this;
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
      addCodeBlock(a, g) {
        const v = Object.assign({}, g && { lang: g }), O = this.wrap("pre", this.wrap("code", a), v);
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
      addList(a, g = !1) {
        const v = g ? "ol" : "ul", O = a.map((T) => this.wrap("li", T)).join(""), R = this.wrap(v, O);
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
        const g = a.map((O) => {
          const R = O.map((T) => {
            if (typeof T == "string")
              return this.wrap("td", T);
            const { header: N, data: J, colspan: D, rowspan: $ } = T, x = N ? "th" : "td", z = Object.assign(Object.assign({}, D && { colspan: D }), $ && { rowspan: $ });
            return this.wrap(x, J, z);
          }).join("");
          return this.wrap("tr", R);
        }).join(""), v = this.wrap("table", g);
        return this.addRaw(v).addEOL();
      }
      /**
       * Adds a collapsable HTML details element to the summary buffer
       *
       * @param {string} label text for the closed state
       * @param {string} content collapsable content
       *
       * @returns {Summary} summary instance
       */
      addDetails(a, g) {
        const v = this.wrap("details", this.wrap("summary", a) + g);
        return this.addRaw(v).addEOL();
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
      addImage(a, g, v) {
        const { width: O, height: R } = v || {}, T = Object.assign(Object.assign({}, O && { width: O }), R && { height: R }), N = this.wrap("img", null, Object.assign({ src: a, alt: g }, T));
        return this.addRaw(N).addEOL();
      }
      /**
       * Adds an HTML section heading element
       *
       * @param {string} text heading text
       * @param {number | string} [level=1] (optional) the heading level, default: 1
       *
       * @returns {Summary} summary instance
       */
      addHeading(a, g) {
        const v = `h${g}`, O = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(v) ? v : "h1", R = this.wrap(O, a);
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
      addQuote(a, g) {
        const v = Object.assign({}, g && { cite: g }), O = this.wrap("blockquote", a, v);
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
      addLink(a, g) {
        const v = this.wrap("a", a, { href: g });
        return this.addRaw(v).addEOL();
      }
    }
    const h = new u();
    e.markdownSummary = h, e.summary = h;
  }(Ee)), Ee;
}
var K = {}, je;
function ur() {
  if (je)
    return K;
  je = 1;
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
  const n = t(Ve);
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
var ke;
function nt() {
  return ke || (ke = 1, function(e) {
    var r = w && w.__createBinding || (Object.create ? function(p, _, P, I) {
      I === void 0 && (I = P), Object.defineProperty(p, I, { enumerable: !0, get: function() {
        return _[P];
      } });
    } : function(p, _, P, I) {
      I === void 0 && (I = P), p[I] = _[P];
    }), t = w && w.__setModuleDefault || (Object.create ? function(p, _) {
      Object.defineProperty(p, "default", { enumerable: !0, value: _ });
    } : function(p, _) {
      p.default = _;
    }), n = w && w.__importStar || function(p) {
      if (p && p.__esModule)
        return p;
      var _ = {};
      if (p != null)
        for (var P in p)
          P !== "default" && Object.hasOwnProperty.call(p, P) && r(_, p, P);
      return t(_, p), _;
    }, o = w && w.__awaiter || function(p, _, P, I) {
      function ce(ie) {
        return ie instanceof P ? ie : new P(function(le) {
          le(ie);
        });
      }
      return new (P || (P = Promise))(function(ie, le) {
        function ot(te) {
          try {
            me(I.next(te));
          } catch (ve) {
            le(ve);
          }
        }
        function st(te) {
          try {
            me(I.throw(te));
          } catch (ve) {
            le(ve);
          }
        }
        function me(te) {
          te.done ? ie(te.value) : ce(te.value).then(ot, st);
        }
        me((I = I.apply(p, _ || [])).next());
      });
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.getIDToken = e.getState = e.saveState = e.group = e.endGroup = e.startGroup = e.info = e.notice = e.warning = e.error = e.debug = e.isDebug = e.setFailed = e.setCommandEcho = e.setOutput = e.getBooleanInput = e.getMultilineInput = e.getInput = e.addPath = e.setSecret = e.exportVariable = e.ExitCode = void 0;
    const s = re, i = ne, u = ee, h = n(de), m = n(Ve), a = ar();
    var g;
    (function(p) {
      p[p.Success = 0] = "Success", p[p.Failure = 1] = "Failure";
    })(g = e.ExitCode || (e.ExitCode = {}));
    function v(p, _) {
      const P = u.toCommandValue(_);
      if (process.env[p] = P, process.env.GITHUB_ENV || "")
        return i.issueFileCommand("ENV", i.prepareKeyValueMessage(p, _));
      s.issueCommand("set-env", { name: p }, P);
    }
    e.exportVariable = v;
    function O(p) {
      s.issueCommand("add-mask", {}, p);
    }
    e.setSecret = O;
    function R(p) {
      process.env.GITHUB_PATH || "" ? i.issueFileCommand("PATH", p) : s.issueCommand("add-path", {}, p), process.env.PATH = `${p}${m.delimiter}${process.env.PATH}`;
    }
    e.addPath = R;
    function T(p, _) {
      const P = process.env[`INPUT_${p.replace(/ /g, "_").toUpperCase()}`] || "";
      if (_ && _.required && !P)
        throw new Error(`Input required and not supplied: ${p}`);
      return _ && _.trimWhitespace === !1 ? P : P.trim();
    }
    e.getInput = T;
    function N(p, _) {
      const P = T(p, _).split(`
`).filter((I) => I !== "");
      return _ && _.trimWhitespace === !1 ? P : P.map((I) => I.trim());
    }
    e.getMultilineInput = N;
    function J(p, _) {
      const P = ["true", "True", "TRUE"], I = ["false", "False", "FALSE"], ce = T(p, _);
      if (P.includes(ce))
        return !0;
      if (I.includes(ce))
        return !1;
      throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${p}
Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
    }
    e.getBooleanInput = J;
    function D(p, _) {
      if (process.env.GITHUB_OUTPUT || "")
        return i.issueFileCommand("OUTPUT", i.prepareKeyValueMessage(p, _));
      process.stdout.write(h.EOL), s.issueCommand("set-output", { name: p }, u.toCommandValue(_));
    }
    e.setOutput = D;
    function $(p) {
      s.issue("echo", p ? "on" : "off");
    }
    e.setCommandEcho = $;
    function x(p) {
      process.exitCode = g.Failure, f(p);
    }
    e.setFailed = x;
    function z() {
      return process.env.RUNNER_DEBUG === "1";
    }
    e.isDebug = z;
    function Q(p) {
      s.issueCommand("debug", {}, p);
    }
    e.debug = Q;
    function f(p, _ = {}) {
      s.issueCommand("error", u.toCommandProperties(_), p instanceof Error ? p.toString() : p);
    }
    e.error = f;
    function d(p, _ = {}) {
      s.issueCommand("warning", u.toCommandProperties(_), p instanceof Error ? p.toString() : p);
    }
    e.warning = d;
    function c(p, _ = {}) {
      s.issueCommand("notice", u.toCommandProperties(_), p instanceof Error ? p.toString() : p);
    }
    e.notice = c;
    function l(p) {
      process.stdout.write(p + h.EOL);
    }
    e.info = l;
    function y(p) {
      s.issue("group", p);
    }
    e.startGroup = y;
    function b() {
      s.issue("endgroup");
    }
    e.endGroup = b;
    function S(p, _) {
      return o(this, void 0, void 0, function* () {
        y(p);
        let P;
        try {
          P = yield _();
        } finally {
          b();
        }
        return P;
      });
    }
    e.group = S;
    function U(p, _) {
      if (process.env.GITHUB_STATE || "")
        return i.issueFileCommand("STATE", i.prepareKeyValueMessage(p, _));
      s.issueCommand("save-state", { name: p }, u.toCommandValue(_));
    }
    e.saveState = U;
    function C(p) {
      return process.env[`STATE_${p}`] || "";
    }
    e.getState = C;
    function E(p) {
      return o(this, void 0, void 0, function* () {
        return yield a.OidcClient.getIDToken(p);
      });
    }
    e.getIDToken = E;
    var M = De();
    Object.defineProperty(e, "summary", { enumerable: !0, get: function() {
      return M.summary;
    } });
    var q = De();
    Object.defineProperty(e, "markdownSummary", { enumerable: !0, get: function() {
      return q.markdownSummary;
    } });
    var G = ur();
    Object.defineProperty(e, "toPosixPath", { enumerable: !0, get: function() {
      return G.toPosixPath;
    } }), Object.defineProperty(e, "toWin32Path", { enumerable: !0, get: function() {
      return G.toWin32Path;
    } }), Object.defineProperty(e, "toPlatformPath", { enumerable: !0, get: function() {
      return G.toPlatformPath;
    } });
  }(ye)), ye;
}
var F = nt();
class cr {
  constructor(r) {
    H(this, "logToCore");
    this.logToCore = process.env[r] !== "true";
  }
  debug(r) {
    this.logToCore && F.debug(r);
  }
  warning(r) {
    this.logToCore && F.warning(r);
  }
  error(r) {
    this.logToCore && F.error(r);
  }
  info(r) {
    this.logToCore && F.info(r);
  }
}
const A = new cr("VITEST");
function lr() {
  A.debug("Entering options:readOptions");
  const e = F.getInput("result-type"), r = F.getInput("summary-path"), t = F.getInput("vitest-config-path"), n = F.getInput("badge-pass-color"), o = F.getInput("badge-fail-color"), s = F.getInput("badge-neutral-color"), i = {
    resultType: e,
    summaryPath: r,
    vitestConfigPath: t,
    badgePassColor: n,
    badgeFailColor: o,
    badgeNeutralColor: s
  };
  return A.debug(`Inputs: ${JSON.stringify(i)}`), i;
}
class fr {
  constructor() {
    H(this, "results");
  }
  static async parse(r) {
    A.debug("Entering Summary.parse");
    try {
      const t = Se.resolve(process.cwd(), r), n = await Le.readFile(t, "utf8");
      return A.debug(`Summary: ${JSON.stringify(n)}`), {
        results: JSON.parse(n)
      };
    } catch (t) {
      return A.warning(`Unable to parse vitest config file:
 ${t}`), {};
    }
  }
}
const dr = /statements\s*:\s*(\d+)/, hr = /lines:\s*(\d+)/, pr = /branches\s*:\s*(\d+)/, gr = /functions\s*:\s*(\d+)/, ue = {
  lines: 60,
  branches: 60,
  functions: 60,
  statements: 60
};
class Ue {
  constructor() {
    H(this, "lines", ue.lines);
    H(this, "branches", ue.branches);
    H(this, "functions", ue.functions);
    H(this, "statements", ue.statements);
  }
  static async parse(r) {
    A.debug("Entering Threshold.parse");
    try {
      const t = Se.isAbsolute(r) ? r : Se.resolve(process.cwd(), r);
      A.debug(`Config Path: ${t}`);
      const n = await Le.readFile(t, "utf8");
      A.debug(`Config Contents: ${n}`);
      const o = n.match(hr), s = n.match(pr), i = n.match(gr), u = n.match(dr), h = new Ue();
      return o && (h.lines = parseInt(o[1])), s && (h.branches = parseInt(s[1])), i && (h.functions = parseInt(i[1])), u && (h.statements = parseInt(u[1])), A.debug(`Threshold: ${JSON.stringify(h)}`), h;
    } catch (t) {
      return A.warning(`Unable to parse vitest config file:
 ${t}`), ue;
    }
  }
}
class mr {
  constructor(r) {
    H(this, "_thresholdValue");
    H(this, "_summary");
    H(this, "_options");
    A.debug("Entering CoverageReport.ctor"), this._options = r;
  }
  async setup() {
    A.debug("Entering CoverageReport.setup");
    const r = await Ue.parse(this._options.vitestConfigPath);
    this._thresholdValue = r[this._options.resultType], A.debug(`Threshold value: ${this._thresholdValue}`);
    const t = await fr.parse(this._options.summaryPath);
    !t.results || !t.results.total || !t.results.total[this._options.resultType] ? (A.warning(`No results found for ${this._options.resultType}.`), this._summary = void 0) : (this._summary = t.results.total[this._options.resultType], A.debug(`Summary: ${JSON.stringify(this._summary)}`));
  }
  results() {
    if (A.debug("Entering CoverageReport.results"), !this._summary)
      return A.debug("Summary is null; returning neutral result."), {
        status: "neutral",
        percentage: "unknown",
        covered: "unknown",
        color: this._options.badgeNeutralColor
      };
    const r = this.getStatus(), t = {
      status: r,
      percentage: this.getPercentage(),
      covered: this.getCovered(),
      color: this.getBadgeColor(r)
    };
    return A.debug(`Result: ${JSON.stringify(t)}`), t;
  }
  getStatus() {
    A.debug("Entering CoverageReport.getStatus");
    const r = this._summary.pct >= this._thresholdValue ? "pass" : "fail";
    return A.debug(`Status: ${r}`), r;
  }
  getPercentage() {
    A.debug("Entering CoverageReport.getPercentage");
    const r = this._summary.pct;
    return A.debug(`Percentage: ${r}`), `${r}%`;
  }
  getCovered() {
    A.debug("Entering CoverageReport.getCovered");
    const r = `${this._summary.covered}/${this._summary.total}`;
    return A.debug(`Coverage: ${r}`), r;
  }
  getBadgeColor(r) {
    A.debug("Entering CoverageReport.getBadgeColor");
    const t = r === "pass" ? this._options.badgePassColor : this._options.badgeFailColor;
    return A.debug(`Color: ${t}`), t;
  }
}
async function vr() {
  try {
    A.debug("entering main");
    const e = lr(), r = new mr(e);
    await r.setup();
    const t = r.results();
    F.setOutput("status", t.status), F.setOutput("percentage", t.percentage), F.setOutput("covered", t.covered), F.setOutput("color", t.color), A.debug("exiting");
  } catch (e) {
    e instanceof Error && F.setFailed(e.message);
  }
}
vr();
