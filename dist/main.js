var st = Object.defineProperty;
var it = (e, r, t) => r in e ? st(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t;
var J = (e, r, t) => (it(e, typeof r != "symbol" ? r + "" : r, t), t);
import fe from "os";
import je, { promises as ke } from "fs";
import Be from "path";
import Le from "http";
import Ve from "https";
import "net";
import at from "tls";
import ut from "events";
import "assert";
import ct from "util";
import Fe from "node:path";
var w = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function lt(e) {
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
var ge = {}, te = {}, Z = {};
Object.defineProperty(Z, "__esModule", { value: !0 });
Z.toCommandProperties = Z.toCommandValue = void 0;
function ft(e) {
  return e == null ? "" : typeof e == "string" || e instanceof String ? e : JSON.stringify(e);
}
Z.toCommandValue = ft;
function dt(e) {
  return Object.keys(e).length ? {
    title: e.title,
    file: e.file,
    line: e.startLine,
    endLine: e.endLine,
    col: e.startColumn,
    endColumn: e.endColumn
  } : {};
}
Z.toCommandProperties = dt;
var ht = w && w.__createBinding || (Object.create ? function(e, r, t, n) {
  n === void 0 && (n = t), Object.defineProperty(e, n, { enumerable: !0, get: function() {
    return r[t];
  } });
} : function(e, r, t, n) {
  n === void 0 && (n = t), e[n] = r[t];
}), pt = w && w.__setModuleDefault || (Object.create ? function(e, r) {
  Object.defineProperty(e, "default", { enumerable: !0, value: r });
} : function(e, r) {
  e.default = r;
}), mt = w && w.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var r = {};
  if (e != null)
    for (var t in e)
      t !== "default" && Object.hasOwnProperty.call(e, t) && ht(r, e, t);
  return pt(r, e), r;
};
Object.defineProperty(te, "__esModule", { value: !0 });
te.issue = te.issueCommand = void 0;
const vt = mt(fe), xe = Z;
function Ge(e, r, t) {
  const n = new yt(e, r, t);
  process.stdout.write(n.toString() + vt.EOL);
}
te.issueCommand = Ge;
function gt(e, r = "") {
  Ge(e, {}, r);
}
te.issue = gt;
const Ce = "::";
class yt {
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
          o && (t ? t = !1 : r += ",", r += `${n}=${wt(o)}`);
        }
    }
    return r += `${Ce}${_t(this.message)}`, r;
  }
}
function _t(e) {
  return xe.toCommandValue(e).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
}
function wt(e) {
  return xe.toCommandValue(e).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
}
var re = {}, le, bt = new Uint8Array(16);
function Je() {
  if (!le && (le = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto), !le))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return le(bt);
}
const Ot = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function de(e) {
  return typeof e == "string" && Ot.test(e);
}
var j = [];
for (var ye = 0; ye < 256; ++ye)
  j.push((ye + 256).toString(16).substr(1));
function he(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, t = (j[e[r + 0]] + j[e[r + 1]] + j[e[r + 2]] + j[e[r + 3]] + "-" + j[e[r + 4]] + j[e[r + 5]] + "-" + j[e[r + 6]] + j[e[r + 7]] + "-" + j[e[r + 8]] + j[e[r + 9]] + "-" + j[e[r + 10]] + j[e[r + 11]] + j[e[r + 12]] + j[e[r + 13]] + j[e[r + 14]] + j[e[r + 15]]).toLowerCase();
  if (!de(t))
    throw TypeError("Stringified UUID is invalid");
  return t;
}
var Ue, _e, we = 0, be = 0;
function Rt(e, r, t) {
  var n = r && t || 0, o = r || new Array(16);
  e = e || {};
  var s = e.node || Ue, i = e.clockseq !== void 0 ? e.clockseq : _e;
  if (s == null || i == null) {
    var u = e.random || (e.rng || Je)();
    s == null && (s = Ue = [u[0] | 1, u[1], u[2], u[3], u[4], u[5]]), i == null && (i = _e = (u[6] << 8 | u[7]) & 16383);
  }
  var h = e.msecs !== void 0 ? e.msecs : Date.now(), v = e.nsecs !== void 0 ? e.nsecs : be + 1, a = h - we + (v - be) / 1e4;
  if (a < 0 && e.clockseq === void 0 && (i = i + 1 & 16383), (a < 0 || h > we) && e.nsecs === void 0 && (v = 0), v >= 1e4)
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  we = h, be = v, _e = i, h += 122192928e5;
  var m = ((h & 268435455) * 1e4 + v) % 4294967296;
  o[n++] = m >>> 24 & 255, o[n++] = m >>> 16 & 255, o[n++] = m >>> 8 & 255, o[n++] = m & 255;
  var g = h / 4294967296 * 1e4 & 268435455;
  o[n++] = g >>> 8 & 255, o[n++] = g & 255, o[n++] = g >>> 24 & 15 | 16, o[n++] = g >>> 16 & 255, o[n++] = i >>> 8 | 128, o[n++] = i & 255;
  for (var O = 0; O < 6; ++O)
    o[n + O] = s[O];
  return r || he(o);
}
function He(e) {
  if (!de(e))
    throw TypeError("Invalid UUID");
  var r, t = new Uint8Array(16);
  return t[0] = (r = parseInt(e.slice(0, 8), 16)) >>> 24, t[1] = r >>> 16 & 255, t[2] = r >>> 8 & 255, t[3] = r & 255, t[4] = (r = parseInt(e.slice(9, 13), 16)) >>> 8, t[5] = r & 255, t[6] = (r = parseInt(e.slice(14, 18), 16)) >>> 8, t[7] = r & 255, t[8] = (r = parseInt(e.slice(19, 23), 16)) >>> 8, t[9] = r & 255, t[10] = (r = parseInt(e.slice(24, 36), 16)) / 1099511627776 & 255, t[11] = r / 4294967296 & 255, t[12] = r >>> 24 & 255, t[13] = r >>> 16 & 255, t[14] = r >>> 8 & 255, t[15] = r & 255, t;
}
function Et(e) {
  e = unescape(encodeURIComponent(e));
  for (var r = [], t = 0; t < e.length; ++t)
    r.push(e.charCodeAt(t));
  return r;
}
var St = "6ba7b810-9dad-11d1-80b4-00c04fd430c8", Pt = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
function Ke(e, r, t) {
  function n(o, s, i, u) {
    if (typeof o == "string" && (o = Et(o)), typeof s == "string" && (s = He(s)), s.length !== 16)
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    var h = new Uint8Array(16 + o.length);
    if (h.set(s), h.set(o, s.length), h = t(h), h[6] = h[6] & 15 | r, h[8] = h[8] & 63 | 128, i) {
      u = u || 0;
      for (var v = 0; v < 16; ++v)
        i[u + v] = h[v];
      return i;
    }
    return he(h);
  }
  try {
    n.name = e;
  } catch {
  }
  return n.DNS = St, n.URL = Pt, n;
}
function Tt(e) {
  if (typeof e == "string") {
    var r = unescape(encodeURIComponent(e));
    e = new Uint8Array(r.length);
    for (var t = 0; t < r.length; ++t)
      e[t] = r.charCodeAt(t);
  }
  return At(Ct(Ut(e), e.length * 8));
}
function At(e) {
  for (var r = [], t = e.length * 32, n = "0123456789abcdef", o = 0; o < t; o += 8) {
    var s = e[o >> 5] >>> o % 32 & 255, i = parseInt(n.charAt(s >>> 4 & 15) + n.charAt(s & 15), 16);
    r.push(i);
  }
  return r;
}
function Ye(e) {
  return (e + 64 >>> 9 << 4) + 14 + 1;
}
function Ct(e, r) {
  e[r >> 5] |= 128 << r % 32, e[Ye(r) - 1] = r;
  for (var t = 1732584193, n = -271733879, o = -1732584194, s = 271733878, i = 0; i < e.length; i += 16) {
    var u = t, h = n, v = o, a = s;
    t = k(t, n, o, s, e[i], 7, -680876936), s = k(s, t, n, o, e[i + 1], 12, -389564586), o = k(o, s, t, n, e[i + 2], 17, 606105819), n = k(n, o, s, t, e[i + 3], 22, -1044525330), t = k(t, n, o, s, e[i + 4], 7, -176418897), s = k(s, t, n, o, e[i + 5], 12, 1200080426), o = k(o, s, t, n, e[i + 6], 17, -1473231341), n = k(n, o, s, t, e[i + 7], 22, -45705983), t = k(t, n, o, s, e[i + 8], 7, 1770035416), s = k(s, t, n, o, e[i + 9], 12, -1958414417), o = k(o, s, t, n, e[i + 10], 17, -42063), n = k(n, o, s, t, e[i + 11], 22, -1990404162), t = k(t, n, o, s, e[i + 12], 7, 1804603682), s = k(s, t, n, o, e[i + 13], 12, -40341101), o = k(o, s, t, n, e[i + 14], 17, -1502002290), n = k(n, o, s, t, e[i + 15], 22, 1236535329), t = B(t, n, o, s, e[i + 1], 5, -165796510), s = B(s, t, n, o, e[i + 6], 9, -1069501632), o = B(o, s, t, n, e[i + 11], 14, 643717713), n = B(n, o, s, t, e[i], 20, -373897302), t = B(t, n, o, s, e[i + 5], 5, -701558691), s = B(s, t, n, o, e[i + 10], 9, 38016083), o = B(o, s, t, n, e[i + 15], 14, -660478335), n = B(n, o, s, t, e[i + 4], 20, -405537848), t = B(t, n, o, s, e[i + 9], 5, 568446438), s = B(s, t, n, o, e[i + 14], 9, -1019803690), o = B(o, s, t, n, e[i + 3], 14, -187363961), n = B(n, o, s, t, e[i + 8], 20, 1163531501), t = B(t, n, o, s, e[i + 13], 5, -1444681467), s = B(s, t, n, o, e[i + 2], 9, -51403784), o = B(o, s, t, n, e[i + 7], 14, 1735328473), n = B(n, o, s, t, e[i + 12], 20, -1926607734), t = L(t, n, o, s, e[i + 5], 4, -378558), s = L(s, t, n, o, e[i + 8], 11, -2022574463), o = L(o, s, t, n, e[i + 11], 16, 1839030562), n = L(n, o, s, t, e[i + 14], 23, -35309556), t = L(t, n, o, s, e[i + 1], 4, -1530992060), s = L(s, t, n, o, e[i + 4], 11, 1272893353), o = L(o, s, t, n, e[i + 7], 16, -155497632), n = L(n, o, s, t, e[i + 10], 23, -1094730640), t = L(t, n, o, s, e[i + 13], 4, 681279174), s = L(s, t, n, o, e[i], 11, -358537222), o = L(o, s, t, n, e[i + 3], 16, -722521979), n = L(n, o, s, t, e[i + 6], 23, 76029189), t = L(t, n, o, s, e[i + 9], 4, -640364487), s = L(s, t, n, o, e[i + 12], 11, -421815835), o = L(o, s, t, n, e[i + 15], 16, 530742520), n = L(n, o, s, t, e[i + 2], 23, -995338651), t = V(t, n, o, s, e[i], 6, -198630844), s = V(s, t, n, o, e[i + 7], 10, 1126891415), o = V(o, s, t, n, e[i + 14], 15, -1416354905), n = V(n, o, s, t, e[i + 5], 21, -57434055), t = V(t, n, o, s, e[i + 12], 6, 1700485571), s = V(s, t, n, o, e[i + 3], 10, -1894986606), o = V(o, s, t, n, e[i + 10], 15, -1051523), n = V(n, o, s, t, e[i + 1], 21, -2054922799), t = V(t, n, o, s, e[i + 8], 6, 1873313359), s = V(s, t, n, o, e[i + 15], 10, -30611744), o = V(o, s, t, n, e[i + 6], 15, -1560198380), n = V(n, o, s, t, e[i + 13], 21, 1309151649), t = V(t, n, o, s, e[i + 4], 6, -145523070), s = V(s, t, n, o, e[i + 11], 10, -1120210379), o = V(o, s, t, n, e[i + 2], 15, 718787259), n = V(n, o, s, t, e[i + 9], 21, -343485551), t = W(t, u), n = W(n, h), o = W(o, v), s = W(s, a);
  }
  return [t, n, o, s];
}
function Ut(e) {
  if (e.length === 0)
    return [];
  for (var r = e.length * 8, t = new Uint32Array(Ye(r)), n = 0; n < r; n += 8)
    t[n >> 5] |= (e[n / 8] & 255) << n % 32;
  return t;
}
function W(e, r) {
  var t = (e & 65535) + (r & 65535), n = (e >> 16) + (r >> 16) + (t >> 16);
  return n << 16 | t & 65535;
}
function $t(e, r) {
  return e << r | e >>> 32 - r;
}
function pe(e, r, t, n, o, s) {
  return W($t(W(W(r, e), W(n, s)), o), t);
}
function k(e, r, t, n, o, s, i) {
  return pe(r & t | ~r & n, e, r, o, s, i);
}
function B(e, r, t, n, o, s, i) {
  return pe(r & n | t & ~n, e, r, o, s, i);
}
function L(e, r, t, n, o, s, i) {
  return pe(r ^ t ^ n, e, r, o, s, i);
}
function V(e, r, t, n, o, s, i) {
  return pe(t ^ (r | ~n), e, r, o, s, i);
}
var Mt = Ke("v3", 48, Tt);
const qt = Mt;
function It(e, r, t) {
  e = e || {};
  var n = e.random || (e.rng || Je)();
  if (n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, r) {
    t = t || 0;
    for (var o = 0; o < 16; ++o)
      r[t + o] = n[o];
    return r;
  }
  return he(n);
}
function Nt(e, r, t, n) {
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
function Dt(e) {
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
    for (var v = new Uint32Array(16), a = 0; a < 16; ++a)
      v[a] = e[h * 64 + a * 4] << 24 | e[h * 64 + a * 4 + 1] << 16 | e[h * 64 + a * 4 + 2] << 8 | e[h * 64 + a * 4 + 3];
    u[h] = v;
  }
  u[i - 1][14] = (e.length - 1) * 8 / Math.pow(2, 32), u[i - 1][14] = Math.floor(u[i - 1][14]), u[i - 1][15] = (e.length - 1) * 8 & 4294967295;
  for (var m = 0; m < i; ++m) {
    for (var g = new Uint32Array(80), O = 0; O < 16; ++O)
      g[O] = u[m][O];
    for (var R = 16; R < 80; ++R)
      g[R] = Oe(g[R - 3] ^ g[R - 8] ^ g[R - 14] ^ g[R - 16], 1);
    for (var P = t[0], N = t[1], G = t[2], D = t[3], U = t[4], F = 0; F < 80; ++F) {
      var Y = Math.floor(F / 20), z = Oe(P, 5) + Nt(Y, N, G, D) + U + r[Y] + g[F] >>> 0;
      U = D, D = G, G = Oe(N, 30) >>> 0, N = P, P = z;
    }
    t[0] = t[0] + P >>> 0, t[1] = t[1] + N >>> 0, t[2] = t[2] + G >>> 0, t[3] = t[3] + D >>> 0, t[4] = t[4] + U >>> 0;
  }
  return [t[0] >> 24 & 255, t[0] >> 16 & 255, t[0] >> 8 & 255, t[0] & 255, t[1] >> 24 & 255, t[1] >> 16 & 255, t[1] >> 8 & 255, t[1] & 255, t[2] >> 24 & 255, t[2] >> 16 & 255, t[2] >> 8 & 255, t[2] & 255, t[3] >> 24 & 255, t[3] >> 16 & 255, t[3] >> 8 & 255, t[3] & 255, t[4] >> 24 & 255, t[4] >> 16 & 255, t[4] >> 8 & 255, t[4] & 255];
}
var jt = Ke("v5", 80, Dt);
const kt = jt, Bt = "00000000-0000-0000-0000-000000000000";
function Lt(e) {
  if (!de(e))
    throw TypeError("Invalid UUID");
  return parseInt(e.substr(14, 1), 16);
}
const Vt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  NIL: Bt,
  parse: He,
  stringify: he,
  v1: Rt,
  v3: qt,
  v4: It,
  v5: kt,
  validate: de,
  version: Lt
}, Symbol.toStringTag, { value: "Module" })), Ft = /* @__PURE__ */ lt(Vt);
var xt = w && w.__createBinding || (Object.create ? function(e, r, t, n) {
  n === void 0 && (n = t), Object.defineProperty(e, n, { enumerable: !0, get: function() {
    return r[t];
  } });
} : function(e, r, t, n) {
  n === void 0 && (n = t), e[n] = r[t];
}), Gt = w && w.__setModuleDefault || (Object.create ? function(e, r) {
  Object.defineProperty(e, "default", { enumerable: !0, value: r });
} : function(e, r) {
  e.default = r;
}), ze = w && w.__importStar || function(e) {
  if (e && e.__esModule)
    return e;
  var r = {};
  if (e != null)
    for (var t in e)
      t !== "default" && Object.hasOwnProperty.call(e, t) && xt(r, e, t);
  return Gt(r, e), r;
};
Object.defineProperty(re, "__esModule", { value: !0 });
re.prepareKeyValueMessage = re.issueFileCommand = void 0;
const $e = ze(je), Ee = ze(fe), Jt = Ft, Qe = Z;
function Ht(e, r) {
  const t = process.env[`GITHUB_${e}`];
  if (!t)
    throw new Error(`Unable to find environment variable for file command ${e}`);
  if (!$e.existsSync(t))
    throw new Error(`Missing file at path: ${t}`);
  $e.appendFileSync(t, `${Qe.toCommandValue(r)}${Ee.EOL}`, {
    encoding: "utf8"
  });
}
re.issueFileCommand = Ht;
function Kt(e, r) {
  const t = `ghadelimiter_${Jt.v4()}`, n = Qe.toCommandValue(r);
  if (e.includes(t))
    throw new Error(`Unexpected input: name should not contain the delimiter "${t}"`);
  if (n.includes(t))
    throw new Error(`Unexpected input: value should not contain the delimiter "${t}"`);
  return `${e}<<${t}${Ee.EOL}${n}${Ee.EOL}${t}`;
}
re.prepareKeyValueMessage = Kt;
var ie = {}, We = {}, ne = {};
Object.defineProperty(ne, "__esModule", { value: !0 });
ne.checkBypass = ne.getProxyUrl = void 0;
function Yt(e) {
  const r = e.protocol === "https:";
  if (Xe(e))
    return;
  const t = (() => r ? process.env.https_proxy || process.env.HTTPS_PROXY : process.env.http_proxy || process.env.HTTP_PROXY)();
  if (t)
    return new URL(t);
}
ne.getProxyUrl = Yt;
function Xe(e) {
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
ne.checkBypass = Xe;
var oe = {}, zt = at, Se = Le, Ze = Ve, Qt = ut, Wt = ct;
oe.httpOverHttp = Xt;
oe.httpsOverHttp = Zt;
oe.httpOverHttps = er;
oe.httpsOverHttps = tr;
function Xt(e) {
  var r = new K(e);
  return r.request = Se.request, r;
}
function Zt(e) {
  var r = new K(e);
  return r.request = Se.request, r.createSocket = et, r.defaultPort = 443, r;
}
function er(e) {
  var r = new K(e);
  return r.request = Ze.request, r;
}
function tr(e) {
  var r = new K(e);
  return r.request = Ze.request, r.createSocket = et, r.defaultPort = 443, r;
}
function K(e) {
  var r = this;
  r.options = e || {}, r.proxyOptions = r.options.proxy || {}, r.maxSockets = r.options.maxSockets || Se.Agent.defaultMaxSockets, r.requests = [], r.sockets = [], r.on("free", function(n, o, s, i) {
    for (var u = tt(o, s, i), h = 0, v = r.requests.length; h < v; ++h) {
      var a = r.requests[h];
      if (a.host === u.host && a.port === u.port) {
        r.requests.splice(h, 1), a.request.onSocket(n);
        return;
      }
    }
    n.destroy(), r.removeSocket(n);
  });
}
Wt.inherits(K, Qt.EventEmitter);
K.prototype.addRequest = function(r, t, n, o) {
  var s = this, i = Pe({ request: r }, s.options, tt(t, n, o));
  if (s.sockets.length >= this.maxSockets) {
    s.requests.push(i);
    return;
  }
  s.createSocket(i, function(u) {
    u.on("free", h), u.on("close", v), u.on("agentRemove", v), r.onSocket(u);
    function h() {
      s.emit("free", u, i);
    }
    function v(a) {
      s.removeSocket(u), u.removeListener("free", h), u.removeListener("close", v), u.removeListener("agentRemove", v);
    }
  });
};
K.prototype.createSocket = function(r, t) {
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
  r.localAddress && (s.localAddress = r.localAddress), s.proxyAuth && (s.headers = s.headers || {}, s.headers["Proxy-Authorization"] = "Basic " + new Buffer(s.proxyAuth).toString("base64")), Q("making CONNECT request");
  var i = n.request(s);
  i.useChunkedEncodingByDefault = !1, i.once("response", u), i.once("upgrade", h), i.once("connect", v), i.once("error", a), i.end();
  function u(m) {
    m.upgrade = !0;
  }
  function h(m, g, O) {
    process.nextTick(function() {
      v(m, g, O);
    });
  }
  function v(m, g, O) {
    if (i.removeAllListeners(), g.removeAllListeners(), m.statusCode !== 200) {
      Q(
        "tunneling socket could not be established, statusCode=%d",
        m.statusCode
      ), g.destroy();
      var R = new Error("tunneling socket could not be established, statusCode=" + m.statusCode);
      R.code = "ECONNRESET", r.request.emit("error", R), n.removeSocket(o);
      return;
    }
    if (O.length > 0) {
      Q("got illegal response body from proxy"), g.destroy();
      var R = new Error("got illegal response body from proxy");
      R.code = "ECONNRESET", r.request.emit("error", R), n.removeSocket(o);
      return;
    }
    return Q("tunneling connection has established"), n.sockets[n.sockets.indexOf(o)] = g, t(g);
  }
  function a(m) {
    i.removeAllListeners(), Q(
      `tunneling socket could not be established, cause=%s
`,
      m.message,
      m.stack
    );
    var g = new Error("tunneling socket could not be established, cause=" + m.message);
    g.code = "ECONNRESET", r.request.emit("error", g), n.removeSocket(o);
  }
};
K.prototype.removeSocket = function(r) {
  var t = this.sockets.indexOf(r);
  if (t !== -1) {
    this.sockets.splice(t, 1);
    var n = this.requests.shift();
    n && this.createSocket(n, function(o) {
      n.request.onSocket(o);
    });
  }
};
function et(e, r) {
  var t = this;
  K.prototype.createSocket.call(t, e, function(n) {
    var o = e.request.getHeader("host"), s = Pe({}, t.options, {
      socket: n,
      servername: o ? o.replace(/:.*$/, "") : e.host
    }), i = zt.connect(0, s);
    t.sockets[t.sockets.indexOf(n)] = i, r(i);
  });
}
function tt(e, r, t) {
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
var Q;
process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG) ? Q = function() {
  var e = Array.prototype.slice.call(arguments);
  typeof e[0] == "string" ? e[0] = "TUNNEL: " + e[0] : e.unshift("TUNNEL:"), console.error.apply(console, e);
} : Q = function() {
};
oe.debug = Q;
var rr = oe;
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
      function C($) {
        try {
          E(l.next($));
        } catch (M) {
          S(M);
        }
      }
      function A($) {
        try {
          E(l.throw($));
        } catch (M) {
          S(M);
        }
      }
      function E($) {
        $.done ? b($.value) : y($.value).then(C, A);
      }
      E((l = l.apply(f, d || [])).next());
    });
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.HttpClient = e.isHttps = e.HttpClientResponse = e.HttpClientError = e.getProxyUrl = e.MediaTypes = e.Headers = e.HttpCodes = void 0;
  const s = n(Le), i = n(Ve), u = n(ne), h = n(rr);
  var v;
  (function(f) {
    f[f.OK = 200] = "OK", f[f.MultipleChoices = 300] = "MultipleChoices", f[f.MovedPermanently = 301] = "MovedPermanently", f[f.ResourceMoved = 302] = "ResourceMoved", f[f.SeeOther = 303] = "SeeOther", f[f.NotModified = 304] = "NotModified", f[f.UseProxy = 305] = "UseProxy", f[f.SwitchProxy = 306] = "SwitchProxy", f[f.TemporaryRedirect = 307] = "TemporaryRedirect", f[f.PermanentRedirect = 308] = "PermanentRedirect", f[f.BadRequest = 400] = "BadRequest", f[f.Unauthorized = 401] = "Unauthorized", f[f.PaymentRequired = 402] = "PaymentRequired", f[f.Forbidden = 403] = "Forbidden", f[f.NotFound = 404] = "NotFound", f[f.MethodNotAllowed = 405] = "MethodNotAllowed", f[f.NotAcceptable = 406] = "NotAcceptable", f[f.ProxyAuthenticationRequired = 407] = "ProxyAuthenticationRequired", f[f.RequestTimeout = 408] = "RequestTimeout", f[f.Conflict = 409] = "Conflict", f[f.Gone = 410] = "Gone", f[f.TooManyRequests = 429] = "TooManyRequests", f[f.InternalServerError = 500] = "InternalServerError", f[f.NotImplemented = 501] = "NotImplemented", f[f.BadGateway = 502] = "BadGateway", f[f.ServiceUnavailable = 503] = "ServiceUnavailable", f[f.GatewayTimeout = 504] = "GatewayTimeout";
  })(v = e.HttpCodes || (e.HttpCodes = {}));
  var a;
  (function(f) {
    f.Accept = "accept", f.ContentType = "content-type";
  })(a = e.Headers || (e.Headers = {}));
  var m;
  (function(f) {
    f.ApplicationJson = "application/json";
  })(m = e.MediaTypes || (e.MediaTypes = {}));
  function g(f) {
    const d = u.getProxyUrl(new URL(f));
    return d ? d.href : "";
  }
  e.getProxyUrl = g;
  const O = [
    v.MovedPermanently,
    v.ResourceMoved,
    v.SeeOther,
    v.TemporaryRedirect,
    v.PermanentRedirect
  ], R = [
    v.BadGateway,
    v.ServiceUnavailable,
    v.GatewayTimeout
  ], P = ["OPTIONS", "GET", "DELETE", "HEAD"], N = 10, G = 5;
  class D extends Error {
    constructor(d, c) {
      super(d), this.name = "HttpClientError", this.statusCode = c, Object.setPrototypeOf(this, D.prototype);
    }
  }
  e.HttpClientError = D;
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
  class Y {
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
        c[a.Accept] = this._getExistingOrDefaultHeader(c, a.Accept, m.ApplicationJson);
        const l = yield this.get(d, c);
        return this._processResponse(l, this.requestOptions);
      });
    }
    postJson(d, c, l = {}) {
      return o(this, void 0, void 0, function* () {
        const y = JSON.stringify(c, null, 2);
        l[a.Accept] = this._getExistingOrDefaultHeader(l, a.Accept, m.ApplicationJson), l[a.ContentType] = this._getExistingOrDefaultHeader(l, a.ContentType, m.ApplicationJson);
        const b = yield this.post(d, y, l);
        return this._processResponse(b, this.requestOptions);
      });
    }
    putJson(d, c, l = {}) {
      return o(this, void 0, void 0, function* () {
        const y = JSON.stringify(c, null, 2);
        l[a.Accept] = this._getExistingOrDefaultHeader(l, a.Accept, m.ApplicationJson), l[a.ContentType] = this._getExistingOrDefaultHeader(l, a.ContentType, m.ApplicationJson);
        const b = yield this.put(d, y, l);
        return this._processResponse(b, this.requestOptions);
      });
    }
    patchJson(d, c, l = {}) {
      return o(this, void 0, void 0, function* () {
        const y = JSON.stringify(c, null, 2);
        l[a.Accept] = this._getExistingOrDefaultHeader(l, a.Accept, m.ApplicationJson), l[a.ContentType] = this._getExistingOrDefaultHeader(l, a.ContentType, m.ApplicationJson);
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
        const C = this._allowRetries && P.includes(d) ? this._maxRetries + 1 : 1;
        let A = 0, E;
        do {
          if (E = yield this.requestRaw(S, l), E && E.message && E.message.statusCode === v.Unauthorized) {
            let M;
            for (const x of this.handlers)
              if (x.canHandleAuthentication(E)) {
                M = x;
                break;
              }
            return M ? M.handleAuthentication(this, S, l) : E;
          }
          let $ = this._maxRedirects;
          for (; E.message.statusCode && O.includes(E.message.statusCode) && this._allowRedirects && $ > 0; ) {
            const M = E.message.headers.location;
            if (!M)
              break;
            const x = new URL(M);
            if (b.protocol === "https:" && b.protocol !== x.protocol && !this._allowRedirectDowngrade)
              throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
            if (yield E.readBody(), x.hostname !== b.hostname)
              for (const p in y)
                p.toLowerCase() === "authorization" && delete y[p];
            S = this._prepareRequest(d, x, y), E = yield this.requestRaw(S, l), $--;
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
        return new Promise((l, y) => {
          function b(S, C) {
            S ? y(S) : C ? l(C) : y(new Error("Unknown error"));
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
      function b(A, E) {
        y || (y = !0, l(A, E));
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
      const y = {};
      y.parsedUrl = c;
      const b = y.parsedUrl.protocol === "https:";
      y.httpModule = b ? i : s;
      const S = b ? 443 : 80;
      if (y.options = {}, y.options.host = y.parsedUrl.hostname, y.options.port = y.parsedUrl.port ? parseInt(y.parsedUrl.port) : S, y.options.path = (y.parsedUrl.pathname || "") + (y.parsedUrl.search || ""), y.options.method = d, y.options.headers = this._mergeHeaders(l), this.userAgent != null && (y.options.headers["user-agent"] = this.userAgent), y.options.agent = this._getAgent(y.parsedUrl), this.handlers)
        for (const C of this.handlers)
          C.prepareRequest(y.options);
      return y;
    }
    _mergeHeaders(d) {
      return this.requestOptions && this.requestOptions.headers ? Object.assign({}, z(this.requestOptions.headers), z(d || {})) : z(d || {});
    }
    _getExistingOrDefaultHeader(d, c, l) {
      let y;
      return this.requestOptions && this.requestOptions.headers && (y = z(this.requestOptions.headers)[c]), d[c] || y || l;
    }
    _getAgent(d) {
      let c;
      const l = u.getProxyUrl(d), y = l && l.hostname;
      if (this._keepAlive && y && (c = this._proxyAgent), this._keepAlive && !y && (c = this._agent), c)
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
        d = Math.min(N, d);
        const c = G * Math.pow(2, d);
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
          b === v.NotFound && l(S);
          function C($, M) {
            if (typeof M == "string") {
              const x = new Date(M);
              if (!isNaN(x.valueOf()))
                return x;
            }
            return M;
          }
          let A, E;
          try {
            E = yield d.readBody(), E && E.length > 0 && (c && c.deserializeDates ? A = JSON.parse(E, C) : A = JSON.parse(E), S.result = A), S.headers = d.message.headers;
          } catch {
          }
          if (b > 299) {
            let $;
            A && A.message ? $ = A.message : E && E.length > 0 ? $ = E : $ = `Failed request: (${b})`;
            const M = new D($, b);
            M.result = S.result, y(M);
          } else
            l(S);
        }));
      });
    }
  }
  e.HttpClient = Y;
  const z = (f) => Object.keys(f).reduce((d, c) => (d[c.toLowerCase()] = f[c], d), {});
})(We);
var X = {}, Te = w && w.__awaiter || function(e, r, t, n) {
  function o(s) {
    return s instanceof t ? s : new t(function(i) {
      i(s);
    });
  }
  return new (t || (t = Promise))(function(s, i) {
    function u(a) {
      try {
        v(n.next(a));
      } catch (m) {
        i(m);
      }
    }
    function h(a) {
      try {
        v(n.throw(a));
      } catch (m) {
        i(m);
      }
    }
    function v(a) {
      a.done ? s(a.value) : o(a.value).then(u, h);
    }
    v((n = n.apply(e, r || [])).next());
  });
};
Object.defineProperty(X, "__esModule", { value: !0 });
X.PersonalAccessTokenCredentialHandler = X.BearerCredentialHandler = X.BasicCredentialHandler = void 0;
class nr {
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
X.BasicCredentialHandler = nr;
class or {
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
X.BearerCredentialHandler = or;
class sr {
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
X.PersonalAccessTokenCredentialHandler = sr;
var Me;
function ir() {
  if (Me)
    return ie;
  Me = 1;
  var e = w && w.__awaiter || function(s, i, u, h) {
    function v(a) {
      return a instanceof u ? a : new u(function(m) {
        m(a);
      });
    }
    return new (u || (u = Promise))(function(a, m) {
      function g(P) {
        try {
          R(h.next(P));
        } catch (N) {
          m(N);
        }
      }
      function O(P) {
        try {
          R(h.throw(P));
        } catch (N) {
          m(N);
        }
      }
      function R(P) {
        P.done ? a(P.value) : v(P.value).then(g, O);
      }
      R((h = h.apply(s, i || [])).next());
    });
  };
  Object.defineProperty(ie, "__esModule", { value: !0 }), ie.OidcClient = void 0;
  const r = We, t = X, n = rt();
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
        const a = (u = (yield o.createHttpClient().getJson(i).catch((m) => {
          throw new Error(`Failed to get ID Token. 
 
        Error Code : ${m.statusCode}
 
        Error Message: ${m.result.message}`);
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
            const v = encodeURIComponent(i);
            u = `${u}&audience=${v}`;
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
  return ie.OidcClient = o, ie;
}
var Re = {}, qe;
function Ie() {
  return qe || (qe = 1, function(e) {
    var r = w && w.__awaiter || function(v, a, m, g) {
      function O(R) {
        return R instanceof m ? R : new m(function(P) {
          P(R);
        });
      }
      return new (m || (m = Promise))(function(R, P) {
        function N(U) {
          try {
            D(g.next(U));
          } catch (F) {
            P(F);
          }
        }
        function G(U) {
          try {
            D(g.throw(U));
          } catch (F) {
            P(F);
          }
        }
        function D(U) {
          U.done ? R(U.value) : O(U.value).then(N, G);
        }
        D((g = g.apply(v, a || [])).next());
      });
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.summary = e.markdownSummary = e.SUMMARY_DOCS_URL = e.SUMMARY_ENV_VAR = void 0;
    const t = fe, n = je, { access: o, appendFile: s, writeFile: i } = n.promises;
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
      wrap(a, m, g = {}) {
        const O = Object.entries(g).map(([R, P]) => ` ${R}="${P}"`).join("");
        return m ? `<${a}${O}>${m}</${a}>` : `<${a}${O}>`;
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
          const m = !!(a != null && a.overwrite), g = yield this.filePath();
          return yield (m ? i : s)(g, this._buffer, { encoding: "utf8" }), this.emptyBuffer();
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
      addRaw(a, m = !1) {
        return this._buffer += a, m ? this.addEOL() : this;
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
      addCodeBlock(a, m) {
        const g = Object.assign({}, m && { lang: m }), O = this.wrap("pre", this.wrap("code", a), g);
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
      addList(a, m = !1) {
        const g = m ? "ol" : "ul", O = a.map((P) => this.wrap("li", P)).join(""), R = this.wrap(g, O);
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
        const m = a.map((O) => {
          const R = O.map((P) => {
            if (typeof P == "string")
              return this.wrap("td", P);
            const { header: N, data: G, colspan: D, rowspan: U } = P, F = N ? "th" : "td", Y = Object.assign(Object.assign({}, D && { colspan: D }), U && { rowspan: U });
            return this.wrap(F, G, Y);
          }).join("");
          return this.wrap("tr", R);
        }).join(""), g = this.wrap("table", m);
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
      addDetails(a, m) {
        const g = this.wrap("details", this.wrap("summary", a) + m);
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
      addImage(a, m, g) {
        const { width: O, height: R } = g || {}, P = Object.assign(Object.assign({}, O && { width: O }), R && { height: R }), N = this.wrap("img", null, Object.assign({ src: a, alt: m }, P));
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
      addHeading(a, m) {
        const g = `h${m}`, O = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(g) ? g : "h1", R = this.wrap(O, a);
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
      addQuote(a, m) {
        const g = Object.assign({}, m && { cite: m }), O = this.wrap("blockquote", a, g);
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
      addLink(a, m) {
        const g = this.wrap("a", a, { href: m });
        return this.addRaw(g).addEOL();
      }
    }
    const h = new u();
    e.markdownSummary = h, e.summary = h;
  }(Re)), Re;
}
var H = {}, Ne;
function ar() {
  if (Ne)
    return H;
  Ne = 1;
  var e = w && w.__createBinding || (Object.create ? function(u, h, v, a) {
    a === void 0 && (a = v), Object.defineProperty(u, a, { enumerable: !0, get: function() {
      return h[v];
    } });
  } : function(u, h, v, a) {
    a === void 0 && (a = v), u[a] = h[v];
  }), r = w && w.__setModuleDefault || (Object.create ? function(u, h) {
    Object.defineProperty(u, "default", { enumerable: !0, value: h });
  } : function(u, h) {
    u.default = h;
  }), t = w && w.__importStar || function(u) {
    if (u && u.__esModule)
      return u;
    var h = {};
    if (u != null)
      for (var v in u)
        v !== "default" && Object.hasOwnProperty.call(u, v) && e(h, u, v);
    return r(h, u), h;
  };
  Object.defineProperty(H, "__esModule", { value: !0 }), H.toPlatformPath = H.toWin32Path = H.toPosixPath = void 0;
  const n = t(Be);
  function o(u) {
    return u.replace(/[\\]/g, "/");
  }
  H.toPosixPath = o;
  function s(u) {
    return u.replace(/[/]/g, "\\");
  }
  H.toWin32Path = s;
  function i(u) {
    return u.replace(/[/\\]/g, n.sep);
  }
  return H.toPlatformPath = i, H;
}
var De;
function rt() {
  return De || (De = 1, function(e) {
    var r = w && w.__createBinding || (Object.create ? function(p, _, T, q) {
      q === void 0 && (q = T), Object.defineProperty(p, q, { enumerable: !0, get: function() {
        return _[T];
      } });
    } : function(p, _, T, q) {
      q === void 0 && (q = T), p[q] = _[T];
    }), t = w && w.__setModuleDefault || (Object.create ? function(p, _) {
      Object.defineProperty(p, "default", { enumerable: !0, value: _ });
    } : function(p, _) {
      p.default = _;
    }), n = w && w.__importStar || function(p) {
      if (p && p.__esModule)
        return p;
      var _ = {};
      if (p != null)
        for (var T in p)
          T !== "default" && Object.hasOwnProperty.call(p, T) && r(_, p, T);
      return t(_, p), _;
    }, o = w && w.__awaiter || function(p, _, T, q) {
      function ue(se) {
        return se instanceof T ? se : new T(function(ce) {
          ce(se);
        });
      }
      return new (T || (T = Promise))(function(se, ce) {
        function nt(ee) {
          try {
            me(q.next(ee));
          } catch (ve) {
            ce(ve);
          }
        }
        function ot(ee) {
          try {
            me(q.throw(ee));
          } catch (ve) {
            ce(ve);
          }
        }
        function me(ee) {
          ee.done ? se(ee.value) : ue(ee.value).then(nt, ot);
        }
        me((q = q.apply(p, _ || [])).next());
      });
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.getIDToken = e.getState = e.saveState = e.group = e.endGroup = e.startGroup = e.info = e.notice = e.warning = e.error = e.debug = e.isDebug = e.setFailed = e.setCommandEcho = e.setOutput = e.getBooleanInput = e.getMultilineInput = e.getInput = e.addPath = e.setSecret = e.exportVariable = e.ExitCode = void 0;
    const s = te, i = re, u = Z, h = n(fe), v = n(Be), a = ir();
    var m;
    (function(p) {
      p[p.Success = 0] = "Success", p[p.Failure = 1] = "Failure";
    })(m = e.ExitCode || (e.ExitCode = {}));
    function g(p, _) {
      const T = u.toCommandValue(_);
      if (process.env[p] = T, process.env.GITHUB_ENV || "")
        return i.issueFileCommand("ENV", i.prepareKeyValueMessage(p, _));
      s.issueCommand("set-env", { name: p }, T);
    }
    e.exportVariable = g;
    function O(p) {
      s.issueCommand("add-mask", {}, p);
    }
    e.setSecret = O;
    function R(p) {
      process.env.GITHUB_PATH || "" ? i.issueFileCommand("PATH", p) : s.issueCommand("add-path", {}, p), process.env.PATH = `${p}${v.delimiter}${process.env.PATH}`;
    }
    e.addPath = R;
    function P(p, _) {
      const T = process.env[`INPUT_${p.replace(/ /g, "_").toUpperCase()}`] || "";
      if (_ && _.required && !T)
        throw new Error(`Input required and not supplied: ${p}`);
      return _ && _.trimWhitespace === !1 ? T : T.trim();
    }
    e.getInput = P;
    function N(p, _) {
      const T = P(p, _).split(`
`).filter((q) => q !== "");
      return _ && _.trimWhitespace === !1 ? T : T.map((q) => q.trim());
    }
    e.getMultilineInput = N;
    function G(p, _) {
      const T = ["true", "True", "TRUE"], q = ["false", "False", "FALSE"], ue = P(p, _);
      if (T.includes(ue))
        return !0;
      if (q.includes(ue))
        return !1;
      throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${p}
Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
    }
    e.getBooleanInput = G;
    function D(p, _) {
      if (process.env.GITHUB_OUTPUT || "")
        return i.issueFileCommand("OUTPUT", i.prepareKeyValueMessage(p, _));
      process.stdout.write(h.EOL), s.issueCommand("set-output", { name: p }, u.toCommandValue(_));
    }
    e.setOutput = D;
    function U(p) {
      s.issue("echo", p ? "on" : "off");
    }
    e.setCommandEcho = U;
    function F(p) {
      process.exitCode = m.Failure, f(p);
    }
    e.setFailed = F;
    function Y() {
      return process.env.RUNNER_DEBUG === "1";
    }
    e.isDebug = Y;
    function z(p) {
      s.issueCommand("debug", {}, p);
    }
    e.debug = z;
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
        let T;
        try {
          T = yield _();
        } finally {
          b();
        }
        return T;
      });
    }
    e.group = S;
    function C(p, _) {
      if (process.env.GITHUB_STATE || "")
        return i.issueFileCommand("STATE", i.prepareKeyValueMessage(p, _));
      s.issueCommand("save-state", { name: p }, u.toCommandValue(_));
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
    var $ = Ie();
    Object.defineProperty(e, "summary", { enumerable: !0, get: function() {
      return $.summary;
    } });
    var M = Ie();
    Object.defineProperty(e, "markdownSummary", { enumerable: !0, get: function() {
      return M.markdownSummary;
    } });
    var x = ar();
    Object.defineProperty(e, "toPosixPath", { enumerable: !0, get: function() {
      return x.toPosixPath;
    } }), Object.defineProperty(e, "toWin32Path", { enumerable: !0, get: function() {
      return x.toWin32Path;
    } }), Object.defineProperty(e, "toPlatformPath", { enumerable: !0, get: function() {
      return x.toPlatformPath;
    } });
  }(ge)), ge;
}
var I = rt();
function ur() {
  const e = I.getInput("result-type"), r = I.getInput("summary-path"), t = I.getInput("vitest-config-path"), n = I.getInput("badge-pass-color"), o = I.getInput("badge-fail-color"), s = I.getInput("badge-neutral-color");
  return {
    resultType: e,
    summaryPath: r,
    vitestConfigPath: t,
    badgePassColor: n,
    badgeFailColor: o,
    badgeNeutralColor: s
  };
}
class cr {
  constructor() {
    J(this, "results");
  }
  static async parse(r) {
    try {
      const t = Fe.resolve(process.cwd(), r), n = await ke.readFile(t, "utf8");
      return I.debug(`Summary: ${JSON.stringify(n)}`), {
        results: JSON.parse(n)
      };
    } catch (t) {
      return I.warning(`Unable to parse vitest config file:
 ${t}`), {};
    }
  }
}
const lr = /100"?\s*:\s*true/, fr = /statements\s*:\s*(\d+)/, dr = /lines:\s*(\d+)/, hr = /branches\s*:\s*(\d+)/, pr = /functions\s*:\s*(\d+)/, ae = {
  lines: 60,
  branches: 60,
  functions: 60,
  statements: 60
};
class Ae {
  constructor() {
    J(this, "lines", ae.lines);
    J(this, "branches", ae.branches);
    J(this, "functions", ae.functions);
    J(this, "statements", ae.statements);
  }
  static async parse(r) {
    try {
      const t = Fe.resolve(process.cwd(), r), n = await ke.readFile(t, "utf8");
      if (n.match(lr))
        return {
          lines: 100,
          branches: 100,
          functions: 100,
          statements: 100
        };
      const o = n.match(dr), s = n.match(hr), i = n.match(pr), u = n.match(fr), h = new Ae();
      return o && (h.lines = parseInt(o[1])), s && (h.branches = parseInt(s[1])), i && (h.functions = parseInt(i[1])), u && (h.statements = parseInt(u[1])), I.debug(`Threshold: ${JSON.stringify(h)}`), h;
    } catch (t) {
      return I.warning(`Unable to parse vitest config file:
 ${t}`), ae;
    }
  }
}
class mr {
  constructor(r) {
    J(this, "_threshold");
    J(this, "_summary");
    J(this, "_options");
    this._options = r;
  }
  async setup() {
    I.debug("Entering CoverageReport.setup"), this._threshold = await Ae.parse(this._options.vitestConfigPath), this._summary = await cr.parse(this._options.summaryPath);
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
    return !this._summary || !this._summary.results || !this._summary.results.total || !this._summary.results.total[r] ? (I.warning(`No results found for ${r}.`), null) : this._summary.results.total[r];
  }
}
async function vr() {
  try {
    I.debug("entering main");
    const e = ur(), r = new mr(e);
    await r.setup();
    const t = r.results(e.resultType);
    I.setOutput("status", t.status), I.setOutput("percentage", t.percentage), I.setOutput("covered", t.covered), I.setOutput("color", t.color), I.debug("exiting");
  } catch (e) {
    e instanceof Error && I.setFailed(e.message);
  }
}
vr();
