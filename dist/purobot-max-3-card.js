const Ae = "0.1.0";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = globalThis, G = I.ShadowRoot && (I.ShadyCSS === void 0 || I.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, X = Symbol(), ie = /* @__PURE__ */ new WeakMap();
let me = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== X) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (G && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = ie.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && ie.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Se = (t) => new me(typeof t == "string" ? t : t + "", void 0, X), fe = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((s, r, n) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + t[n + 1], t[0]);
  return new me(i, t, X);
}, Ee = (t, e) => {
  if (G) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const s = document.createElement("style"), r = I.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = i.cssText, t.appendChild(s);
  }
}, se = G ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return Se(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ke, defineProperty: Pe, getOwnPropertyDescriptor: Ce, getOwnPropertyNames: Oe, getOwnPropertySymbols: ze, getPrototypeOf: Ne } = Object, v = globalThis, re = v.trustedTypes, Me = re ? re.emptyScript : "", Re = v.reactiveElementPolyfillSupport, N = (t, e) => t, B = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Me : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let i = t;
  switch (e) {
    case Boolean:
      i = t !== null;
      break;
    case Number:
      i = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(t);
      } catch {
        i = null;
      }
  }
  return i;
} }, Z = (t, e) => !ke(t, e), ne = { attribute: !0, type: String, converter: B, reflect: !1, useDefault: !1, hasChanged: Z };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), v.litPropertyMetadata ?? (v.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let w = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = ne) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const s = Symbol(), r = this.getPropertyDescriptor(e, s, i);
      r !== void 0 && Pe(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    const { get: r, set: n } = Ce(this.prototype, e) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: r, set(a) {
      const l = r?.call(this);
      n?.call(this, a), this.requestUpdate(e, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ne;
  }
  static _$Ei() {
    if (this.hasOwnProperty(N("elementProperties"))) return;
    const e = Ne(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(N("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(N("properties"))) {
      const i = this.properties, s = [...Oe(i), ...ze(i)];
      for (const r of s) this.createProperty(r, i[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [s, r] of i) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const r = this._$Eu(i, s);
      r !== void 0 && this._$Eh.set(r, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const r of s) i.unshift(se(r));
    } else e !== void 0 && i.push(se(e));
    return i;
  }
  static _$Eu(e, i) {
    const s = i.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const s of i.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ee(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, i, s) {
    this._$AK(e, s);
  }
  _$ET(e, i) {
    const s = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, s);
    if (r !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : B).toAttribute(i, s.type);
      this._$Em = e, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const s = this.constructor, r = s._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const n = s.getPropertyOptions(r), a = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : B;
      this._$Em = r;
      const l = a.fromAttribute(i, n.type);
      this[r] = l ?? this._$Ej?.get(r) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, i, s, r = !1, n) {
    if (e !== void 0) {
      const a = this.constructor;
      if (r === !1 && (n = this[e]), s ?? (s = a.getPropertyOptions(e)), !((s.hasChanged ?? Z)(n, i) || s.useDefault && s.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, s)))) return;
      this.C(e, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: s, reflect: r, wrapped: n }, a) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? i ?? this[e]), n !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (i = void 0), this._$AL.set(e, i)), r === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, n] of s) {
        const { wrapped: a } = n, l = this[r];
        a !== !0 || this._$AL.has(r) || l === void 0 || this.C(r, void 0, n, l);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((i) => this._$ET(i, this[i]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, w[N("elementProperties")] = /* @__PURE__ */ new Map(), w[N("finalized")] = /* @__PURE__ */ new Map(), Re?.({ ReactiveElement: w }), (v.reactiveElementVersions ?? (v.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, ae = (t) => t, W = M.trustedTypes, oe = W ? W.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, ve = "$lit$", m = `lit$${Math.random().toFixed(9).slice(2)}$`, $e = "?" + m, Ue = `<${$e}>`, y = document, T = () => y.createComment(""), L = (t) => t === null || typeof t != "object" && typeof t != "function", Q = Array.isArray, Te = (t) => Q(t) || typeof t?.[Symbol.iterator] == "function", V = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, le = /-->/g, ce = />/g, $ = RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), de = /'/g, ue = /"/g, be = /^(?:script|style|textarea|title)$/i, Le = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), u = Le(1), S = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), he = /* @__PURE__ */ new WeakMap(), b = y.createTreeWalker(y, 129);
function ye(t, e) {
  if (!Q(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return oe !== void 0 ? oe.createHTML(e) : e;
}
const De = (t, e) => {
  const i = t.length - 1, s = [];
  let r, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = C;
  for (let l = 0; l < i; l++) {
    const o = t[l];
    let h, p, d = -1, _ = 0;
    for (; _ < o.length && (a.lastIndex = _, p = a.exec(o), p !== null); ) _ = a.lastIndex, a === C ? p[1] === "!--" ? a = le : p[1] !== void 0 ? a = ce : p[2] !== void 0 ? (be.test(p[2]) && (r = RegExp("</" + p[2], "g")), a = $) : p[3] !== void 0 && (a = $) : a === $ ? p[0] === ">" ? (a = r ?? C, d = -1) : p[1] === void 0 ? d = -2 : (d = a.lastIndex - p[2].length, h = p[1], a = p[3] === void 0 ? $ : p[3] === '"' ? ue : de) : a === ue || a === de ? a = $ : a === le || a === ce ? a = C : (a = $, r = void 0);
    const g = a === $ && t[l + 1].startsWith("/>") ? " " : "";
    n += a === C ? o + Ue : d >= 0 ? (s.push(h), o.slice(0, d) + ve + o.slice(d) + m + g) : o + m + (d === -2 ? l : g);
  }
  return [ye(t, n + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class D {
  constructor({ strings: e, _$litType$: i }, s) {
    let r;
    this.parts = [];
    let n = 0, a = 0;
    const l = e.length - 1, o = this.parts, [h, p] = De(e, i);
    if (this.el = D.createElement(h, s), b.currentNode = this.el.content, i === 2 || i === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (r = b.nextNode()) !== null && o.length < l; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const d of r.getAttributeNames()) if (d.endsWith(ve)) {
          const _ = p[a++], g = r.getAttribute(d).split(m), j = /([.?@])?(.*)/.exec(_);
          o.push({ type: 1, index: n, name: j[2], strings: g, ctor: j[1] === "." ? je : j[1] === "?" ? Ie : j[1] === "@" ? Be : q }), r.removeAttribute(d);
        } else d.startsWith(m) && (o.push({ type: 6, index: n }), r.removeAttribute(d));
        if (be.test(r.tagName)) {
          const d = r.textContent.split(m), _ = d.length - 1;
          if (_ > 0) {
            r.textContent = W ? W.emptyScript : "";
            for (let g = 0; g < _; g++) r.append(d[g], T()), b.nextNode(), o.push({ type: 2, index: ++n });
            r.append(d[_], T());
          }
        }
      } else if (r.nodeType === 8) if (r.data === $e) o.push({ type: 2, index: n });
      else {
        let d = -1;
        for (; (d = r.data.indexOf(m, d + 1)) !== -1; ) o.push({ type: 7, index: n }), d += m.length - 1;
      }
      n++;
    }
  }
  static createElement(e, i) {
    const s = y.createElement("template");
    return s.innerHTML = e, s;
  }
}
function E(t, e, i = t, s) {
  if (e === S) return e;
  let r = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const n = L(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(t), r._$AT(t, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = r : i._$Cl = r), r !== void 0 && (e = E(t, r._$AS(t, e.values), r, s)), e;
}
class He {
  constructor(e, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: i }, parts: s } = this._$AD, r = (e?.creationScope ?? y).importNode(i, !0);
    b.currentNode = r;
    let n = b.nextNode(), a = 0, l = 0, o = s[0];
    for (; o !== void 0; ) {
      if (a === o.index) {
        let h;
        o.type === 2 ? h = new H(n, n.nextSibling, this, e) : o.type === 1 ? h = new o.ctor(n, o.name, o.strings, this, e) : o.type === 6 && (h = new We(n, this, e)), this._$AV.push(h), o = s[++l];
      }
      a !== o?.index && (n = b.nextNode(), a++);
    }
    return b.currentNode = y, r;
  }
  p(e) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, i), i += s.strings.length - 2) : s._$AI(e[i])), i++;
  }
}
class H {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, s, r) {
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = s, this.options = r, this._$Cv = r?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && e?.nodeType === 11 && (e = i.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, i = this) {
    e = E(this, e, i), L(e) ? e === c || e == null || e === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : e !== this._$AH && e !== S && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Te(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== c && L(this._$AH) ? this._$AA.nextSibling.data = e : this.T(y.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: s } = e, r = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = D.createElement(ye(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const n = new He(r, this), a = n.u(this.options);
      n.p(i), this.T(a), this._$AH = n;
    }
  }
  _$AC(e) {
    let i = he.get(e.strings);
    return i === void 0 && he.set(e.strings, i = new D(e)), i;
  }
  k(e) {
    Q(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, r = 0;
    for (const n of e) r === i.length ? i.push(s = new H(this.O(T()), this.O(T()), this, this.options)) : s = i[r], s._$AI(n), r++;
    r < i.length && (this._$AR(s && s._$AB.nextSibling, r), i.length = r);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const s = ae(e).nextSibling;
      ae(e).remove(), e = s;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class q {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, s, r, n) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = e, this.name = i, this._$AM = r, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = c;
  }
  _$AI(e, i = this, s, r) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) e = E(this, e, i, 0), a = !L(e) || e !== this._$AH && e !== S, a && (this._$AH = e);
    else {
      const l = e;
      let o, h;
      for (e = n[0], o = 0; o < n.length - 1; o++) h = E(this, l[s + o], i, o), h === S && (h = this._$AH[o]), a || (a = !L(h) || h !== this._$AH[o]), h === c ? e = c : e !== c && (e += (h ?? "") + n[o + 1]), this._$AH[o] = h;
    }
    a && !r && this.j(e);
  }
  j(e) {
    e === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class je extends q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === c ? void 0 : e;
  }
}
class Ie extends q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== c);
  }
}
class Be extends q {
  constructor(e, i, s, r, n) {
    super(e, i, s, r, n), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = E(this, e, i, 0) ?? c) === S) return;
    const s = this._$AH, r = e === c && s !== c || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, n = e !== c && (s === c || r);
    r && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class We {
  constructor(e, i, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    E(this, e);
  }
}
const qe = M.litHtmlPolyfillSupport;
qe?.(D, H), (M.litHtmlVersions ?? (M.litHtmlVersions = [])).push("3.3.3");
const Fe = (t, e, i) => {
  const s = i?.renderBefore ?? e;
  let r = s._$litPart$;
  if (r === void 0) {
    const n = i?.renderBefore ?? null;
    s._$litPart$ = r = new H(e.insertBefore(T(), n), n, void 0, i ?? {});
  }
  return r._$AI(t), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis;
class A extends w {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var i;
    const e = super.createRenderRoot();
    return (i = this.renderOptions).renderBefore ?? (i.renderBefore = e.firstChild), e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Fe(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return S;
  }
}
A._$litElement$ = !0, A.finalized = !0, R.litElementHydrateSupport?.({ LitElement: A });
const Ve = R.litElementPolyfillSupport;
Ve?.({ LitElement: A });
(R.litElementVersions ?? (R.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xe = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Je = { attribute: !0, type: String, converter: B, reflect: !1, hasChanged: Z }, Ke = (t = Je, e, i) => {
  const { kind: s, metadata: r } = i;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), n.set(i.name, t), s === "accessor") {
    const { name: a } = i;
    return { set(l) {
      const o = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(a, o, t, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(a, void 0, t, l), l;
    } };
  }
  if (s === "setter") {
    const { name: a } = i;
    return function(l) {
      const o = this[a];
      e.call(this, l), this.requestUpdate(a, o, t, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Y(t) {
  return (e, i) => typeof i == "object" ? Ke(t, e, i) : ((s, r, n) => {
    const a = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, s), a ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ee(t) {
  return Y({ ...t, state: !0, attribute: !1 });
}
const pe = {
  // Status / sensors
  litter_state: "state",
  device_status: "state",
  error_message: "error",
  power: "power",
  rssi: "rssi",
  litter_level: "litter_level",
  sand_lack: "litter",
  litter_weight: "litter_weight",
  garbage_bag_box_state: "wastebin",
  package_used: "wastebin",
  odor_eliminator_n50_left_days: "n50",
  odor_eliminator_n60_left_days: "n60",
  purification_n60_left_days: "n60",
  litter_last_event: "last_event",
  last_used_by: "last_used_by",
  times_used: "times_used",
  average_time: "average_use",
  total_time: "total_use",
  // Buttons
  start_scoop: "clean",
  dump_litter: "dump",
  level_litter: "level",
  deodorize: "deodorize",
  start_maintenance: "start_maintenance",
  exit_maintenance: "exit_maintenance",
  reset_n50_odor_eliminator: "reset_n50",
  reset_n60_odor_eliminator: "reset_n60",
  action_pause: "pause_cleaning",
  action_continue: "clean",
  // Switches
  auto_clean: "auto_clean",
  avoid_repeat_clean: "avoid_repeat",
  periodic_cleaning: "periodic_cleaning",
  auto_deodor: "auto_deodor",
  periodic_deodorizing: "periodic_deodorizing",
  deep_deodor: "deep_deodor",
  cont_rotation: "continuous_rotation",
  deep_cleaning: "deep_cleaning",
  sand_saving: "enhanced_adsorption",
  light_weight: "light_weight",
  child_lock: "child_lock",
  child_lock_lb: "child_lock",
  display: "display",
  do_not_disturb: "do_not_disturb",
  kitten_mode: "kitten_mode",
  // Number / select
  cleaning_delay: "cleaning_delay",
  avoid_repeat_cleaning_interval: "cleaning_interval",
  litter_type: "litter_type"
}, _e = {
  state: "state",
  error: "error",
  power: "power",
  rssi: "rssi",
  "litter level": "litter_level",
  litter: "litter",
  "litter weight": "litter_weight",
  wastebin: "wastebin",
  "n50 odor eliminator": "n50",
  "n60 odor eliminator": "n60",
  "last event": "last_event",
  "last used by": "last_used_by",
  "times used": "times_used",
  "average use": "average_use",
  "total use": "total_use",
  "start/resume cleaning": "clean",
  "dump litter": "dump",
  "level litter": "level",
  deodorize: "deodorize",
  "start maintenance mode": "start_maintenance",
  "exit maintenance mode": "exit_maintenance",
  "reset n50 odor eliminator": "reset_n50",
  "reset n60 odor eliminator": "reset_n60",
  "pause cleaning": "pause_cleaning",
  "pause litter dumping": "pause_dumping",
  "pause exiting maintenance mode": "pause_exit_maintenance",
  "resume litter dumping": "resume_dumping",
  "resume exiting maintenance mode": "resume_exit_maintenance",
  "auto cleaning": "auto_clean",
  "avoid repeat cleaning": "avoid_repeat",
  "periodic cleaning": "periodic_cleaning",
  "auto deodorizing": "auto_deodor",
  "periodic deodorizing": "periodic_deodorizing",
  "deep deodorizing": "deep_deodor",
  "cleaning delay": "cleaning_delay",
  "cleaning interval": "cleaning_interval",
  "continuous rotation": "continuous_rotation",
  "deep cleaning": "deep_cleaning",
  "enhanced adsorption": "enhanced_adsorption",
  "light weight cleaning disabled": "light_weight",
  "child lock": "child_lock",
  display: "display",
  "do not disturb": "do_not_disturb",
  "kitten mode": "kitten_mode",
  "litter type": "litter_type"
}, x = {
  state: "State",
  error: "Error",
  power: "Power",
  rssi: "RSSI",
  litter_level: "Litter",
  litter: "Litter",
  litter_weight: "Litter weight",
  wastebin: "Waste",
  n50: "N50",
  n60: "N60",
  last_event: "Last event",
  last_used_by: "Last used by",
  times_used: "Times used",
  average_use: "Average use",
  total_use: "Total use",
  clean: "Clean",
  dump: "Dump",
  level: "Level",
  deodorize: "Deodorize",
  start_maintenance: "Start maintenance",
  exit_maintenance: "Exit maintenance",
  reset_n50: "Reset N50",
  reset_n60: "Reset N60",
  pause_cleaning: "Pause cleaning",
  pause_dumping: "Pause dumping",
  pause_exit_maintenance: "Pause exit maintenance",
  resume_dumping: "Resume dumping",
  resume_exit_maintenance: "Resume exit maintenance",
  auto_clean: "Auto clean",
  avoid_repeat: "Avoid repeat",
  periodic_cleaning: "Periodic cleaning",
  auto_deodor: "Auto deodorize",
  periodic_deodorizing: "Periodic deodorize",
  deep_deodor: "Deep deodorize",
  cleaning_delay: "Cleaning delay",
  cleaning_interval: "Cleaning interval",
  continuous_rotation: "Continuous rotation",
  deep_cleaning: "Deep cleaning",
  enhanced_adsorption: "Enhanced adsorption",
  light_weight: "Light-weight cleaning off",
  child_lock: "Child lock",
  display: "Display",
  do_not_disturb: "Do not disturb",
  kitten_mode: "Kitten mode",
  litter_type: "Litter type"
}, Ge = {
  clean: "mdi:broom",
  dump: "mdi:delete-circle-outline",
  level: "mdi:spirit-level",
  deodorize: "mdi:spray",
  pause_cleaning: "mdi:pause",
  pause_dumping: "mdi:pause",
  pause_exit_maintenance: "mdi:pause",
  resume_dumping: "mdi:play",
  resume_exit_maintenance: "mdi:play",
  start_maintenance: "mdi:progress-wrench",
  exit_maintenance: "mdi:location-exit",
  reset_n50: "mdi:restart",
  reset_n60: "mdi:restart",
  litter_level: "mdi:gauge-low",
  wastebin: "mdi:trash-can",
  n50: "mdi:scent",
  n60: "mdi:air-filter",
  auto_clean: "mdi:broom",
  avoid_repeat: "mdi:repeat",
  periodic_cleaning: "mdi:calendar",
  auto_deodor: "mdi:air-filter",
  periodic_deodorizing: "mdi:calendar-multiple-check",
  do_not_disturb: "mdi:minus-circle",
  cleaning_delay: "mdi:clock",
  cleaning_interval: "mdi:timer-pause"
}, Xe = [
  [/_start_scoop$/i, "clean"],
  [/_dump_litter$/i, "dump"],
  [/_level_litter$/i, "level"],
  [/_deodorize$/i, "deodorize"],
  [/_start_maintenance$/i, "start_maintenance"],
  [/_exit_maintenance$/i, "exit_maintenance"],
  [/_reset_n50/i, "reset_n50"],
  [/_reset_n60/i, "reset_n60"],
  [/_litter_level$/i, "litter_level"],
  [/_litter_weight$/i, "litter_weight"],
  [/_odor_eliminator_n50/i, "n50"],
  [/_odor_eliminator_n60/i, "n60"],
  [/_purification_n60/i, "n60"],
  [/_garbage_bag/i, "wastebin"],
  [/_auto_clean$/i, "auto_clean"],
  [/_periodic_cleaning$/i, "periodic_cleaning"],
  [/_cleaning_delay$/i, "cleaning_delay"],
  [/_avoid_repeat_cleaning_interval$/i, "cleaning_interval"],
  [/_litter_type$/i, "litter_type"],
  [/_last_used_by$/i, "last_used_by"],
  [/_times_used$/i, "times_used"],
  [/_average_time$/i, "average_use"],
  [/_total_time$/i, "total_use"],
  [/_litter_last_event$/i, "last_event"],
  [/_error_message$/i, "error"]
];
function J(t) {
  return t.toLowerCase().replace(/^petkit\s+/i, "").replace(/^purobot\s+max\s*3\s*/i, "").replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
}
function Ze(t, e, i) {
  const s = t.translation_key?.toLowerCase();
  if (s && pe[s])
    return pe[s];
  if (t.unique_id) {
    for (const [a, l] of Xe)
      if (a.test(t.unique_id))
        return l;
  }
  const r = e?.attributes.friendly_name || t.name || t.original_name || "";
  let n = J(r);
  if (i && (n = J(n.replace(J(i), ""))), _e[n])
    return _e[n];
  if (n.startsWith("pause ")) {
    if (n.includes("dump")) return "pause_dumping";
    if (n.includes("maintenance")) return "pause_exit_maintenance";
    if (n.includes("clean")) return "pause_cleaning";
  }
  if (n.startsWith("resume ")) {
    if (n.includes("dump")) return "resume_dumping";
    if (n.includes("maintenance")) return "resume_exit_maintenance";
  }
}
function we(t, e) {
  return t.devices?.[e];
}
function U(t) {
  return t && (t.name_by_user || t.name || t.model) || "Purobot Max 3";
}
function Qe(t, e) {
  const i = we(t, e), s = U(i), r = {}, n = Object.values(t.entities || {}).filter(
    (a) => a.device_id === e && !a.disabled_by
  );
  for (const a of n) {
    const l = t.states[a.entity_id], o = Ze(a, l, s);
    o && (!r[o] || !t.states[r[o]]) && (r[o] = a.entity_id);
  }
  return r;
}
function z(t, e) {
  if (e)
    return t.states[e];
}
function f(t) {
  return t ? t.state === "unavailable" || t.state === "unknown" : !0;
}
function K(t) {
  return t?.state === "on" || t?.state === "true";
}
function O(t, e) {
  if (!e) return "—";
  if (t.formatEntityState)
    try {
      return t.formatEntityState(e);
    } catch {
    }
  const i = e.attributes.unit_of_measurement;
  return i ? `${e.state} ${i}` : e.state;
}
function ge(t) {
  if (!t || f(t)) return null;
  const e = Number.parseFloat(t.state);
  return Number.isFinite(e) ? e : null;
}
function Ye(t, e) {
  const i = z(t, e.state);
  if (i && !f(i)) {
    const n = i.state.toLowerCase();
    if (n.includes("clean") || n.includes("dump") || n.includes("maintenance") || n.includes("level") || n.includes("deodor") || n.includes("working") || n.includes("busy") || n.includes("pause"))
      return !0;
    if (n === "idle" || n === "ok" || n === "standby" || n === "ready")
      return !1;
  }
  const s = z(t, e.clean);
  if (s && s.state === "unavailable") {
    const n = z(t, e.power);
    if (n && K(n)) return !0;
  }
  return [
    "pause_cleaning",
    "pause_dumping",
    "pause_exit_maintenance"
  ].some((n) => {
    const a = z(t, e[n]);
    return a && !f(a);
  });
}
function et(t) {
  if (!(t.identifiers || []).some(([r]) => r === "petkit")) return !1;
  const s = [
    t.model,
    t.name,
    t.name_by_user
  ].filter(Boolean).join(" ").toLowerCase();
  return s.includes("purobot") || s.includes("pura") || s.includes("litter") || s.includes("max 3") || s.includes("t4");
}
const tt = fe`
  :host {
    display: block;
  }

  ha-card {
    padding: 12px 14px 14px;
    overflow: hidden;
  }

  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 12px;
  }

  .title {
    font-size: 1.1rem;
    font-weight: 600;
    line-height: 1.3;
    color: var(--primary-text-color);
  }

  .subtitle {
    font-size: 0.8rem;
    color: var(--secondary-text-color);
    margin-top: 2px;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    justify-content: flex-end;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 0.75rem;
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
    color: var(--primary-text-color);
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .chip.error {
    background: color-mix(in srgb, var(--error-color, #db4437) 22%, transparent);
    color: var(--error-color, #db4437);
  }

  .chip.warn {
    background: color-mix(in srgb, var(--warning-color, #ffa600) 22%, transparent);
  }

  .chip.ok {
    background: color-mix(in srgb, var(--success-color, #43a047) 18%, transparent);
  }

  .section {
    margin-top: 12px;
  }

  .section-title {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--secondary-text-color);
    margin-bottom: 8px;
  }

  .gauges {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .gauge {
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    border-radius: 10px;
    padding: 10px;
  }

  .gauge-label {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: var(--secondary-text-color);
    margin-bottom: 6px;
  }

  .gauge-value {
    font-weight: 600;
    color: var(--primary-text-color);
  }

  .bar {
    height: 8px;
    border-radius: 999px;
    background: rgba(127, 127, 127, 0.25);
    overflow: hidden;
  }

  .bar > span {
    display: block;
    height: 100%;
    border-radius: 999px;
    background: var(--primary-color);
  }

  .bar.warn > span {
    background: var(--warning-color, #ffa600);
  }

  .bar.danger > span {
    background: var(--error-color, #db4437);
  }

  .consumables {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 8px;
    margin-top: 8px;
  }

  .stat {
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    border-radius: 10px;
    padding: 8px 10px;
  }

  .stat-label {
    font-size: 0.72rem;
    color: var(--secondary-text-color);
  }

  .stat-value {
    font-size: 0.95rem;
    font-weight: 600;
    margin-top: 2px;
    color: var(--primary-text-color);
    word-break: break-word;
  }

  .actions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(72px, 1fr));
    gap: 8px;
  }

  button.action {
    appearance: none;
    border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
    background: var(--card-background-color, var(--ha-card-background, white));
    color: var(--primary-text-color);
    border-radius: 10px;
    padding: 10px 6px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    font: inherit;
    font-size: 0.75rem;
    min-height: 64px;
  }

  button.action:hover:not(:disabled) {
    border-color: var(--primary-color);
  }

  button.action:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  button.action ha-icon {
    --mdc-icon-size: 22px;
    width: 22px;
    height: 22px;
  }

  .toggles {
    display: grid;
    grid-template-columns: 1fr;
    gap: 4px;
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    min-height: 36px;
    padding: 2px 0;
  }

  .row-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    color: var(--primary-text-color);
  }

  .row-control {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  input[type="range"] {
    width: 110px;
  }

  select.ha-select {
    max-width: 150px;
    padding: 4px 6px;
    border-radius: 6px;
    border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.35));
    background: var(--card-background-color, transparent);
    color: var(--primary-text-color);
    font: inherit;
  }

  .switch {
    position: relative;
    width: 40px;
    height: 22px;
    flex-shrink: 0;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    inset: 0;
    cursor: pointer;
    background: rgba(127, 127, 127, 0.35);
    border-radius: 999px;
    transition: 0.15s;
  }

  .slider::before {
    content: "";
    position: absolute;
    height: 16px;
    width: 16px;
    left: 3px;
    bottom: 3px;
    background: white;
    border-radius: 50%;
    transition: 0.15s;
  }

  .switch input:checked + .slider {
    background: var(--primary-color);
  }

  .switch input:checked + .slider::before {
    transform: translateX(18px);
  }

  .switch input:disabled + .slider {
    opacity: 0.45;
    cursor: not-allowed;
  }

  details.more {
    margin-top: 12px;
    border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
    padding-top: 8px;
  }

  details.more > summary {
    cursor: pointer;
    list-style: none;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--secondary-text-color);
    user-select: none;
  }

  details.more > summary::-webkit-details-marker {
    display: none;
  }

  .warning {
    padding: 12px;
    color: var(--error-color, #db4437);
    font-size: 0.9rem;
  }

  .activity-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }

  @media (max-width: 420px) {
    .gauges,
    .activity-grid {
      grid-template-columns: 1fr;
    }
  }
`;
var it = Object.defineProperty, st = Object.getOwnPropertyDescriptor, F = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? st(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && it(e, i, r), r;
};
let k = class extends A {
  constructor() {
    super(...arguments), this._moreOpen = !1;
  }
  static getStubConfig(t, e, i, s) {
    return {
      type: "custom:purobot-max-3-card",
      device_id: s || ""
    };
  }
  setConfig(t) {
    if (!t || typeof t != "object")
      throw new Error("Invalid configuration");
    if (!("device_id" in t) || !t.device_id)
      throw new Error("Please define a Petkit device_id");
    this._config = t;
  }
  getCardSize() {
    return 6;
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => at), document.createElement("purobot-max-3-card-editor");
  }
  shouldUpdate() {
    return !!(this._config && this.hass);
  }
  _roles() {
    return !this.hass || !this._config ? {} : Qe(this.hass, this._config.device_id);
  }
  async _call(t, e, i, s = {}) {
    await this.hass.callService(t, e, {
      entity_id: i,
      ...s
    });
  }
  async _press(t) {
    t && await this._call("button", "press", t);
  }
  async _toggle(t) {
    t && await this._call("switch", "toggle", t);
  }
  async _setNumber(t, e) {
    t && await this._call("number", "set_value", t, { value: e });
  }
  async _selectOption(t, e) {
    t && await this._call("select", "select_option", t, { option: e });
  }
  _entity(t, e) {
    return z(this.hass, t[e]);
  }
  _has(t, e) {
    return !!(t[e] && this.hass.states[t[e]]);
  }
  _hasAny(t, e) {
    return e.some((i) => this._has(t, i));
  }
  _gaugeTone(t, e = !1) {
    return t === null ? "ok" : e ? t >= 90 ? "danger" : t >= 70 ? "warn" : "ok" : t <= 15 ? "danger" : t <= 35 ? "warn" : "ok";
  }
  _renderGauge(t, e, i = !1) {
    if (!e) return c;
    const s = ge(e), r = s === null ? 0 : Math.max(0, Math.min(100, s)), n = this._gaugeTone(s, i), a = s === null ? O(this.hass, e) : `${Math.round(r)}%`;
    return u`
      <div class="gauge">
        <div class="gauge-label">
          <span>${t}</span>
          <span class="gauge-value">${a}</span>
        </div>
        <div class="bar ${n === "ok" ? "" : n}">
          <span style="width: ${s === null ? 0 : r}%"></span>
        </div>
      </div>
    `;
  }
  _renderAction(t, e, i) {
    if (!this._has(t, e)) return c;
    const s = t[e], r = this._entity(t, e), n = f(r), a = Ge[e] || "mdi:circle";
    return u`
      <button
        class="action"
        ?disabled=${n}
        title=${x[e]}
        @click=${() => this._press(s)}
      >
        <ha-icon .icon=${a}></ha-icon>
        <span>${i || x[e]}</span>
      </button>
    `;
  }
  _renderSwitch(t, e) {
    if (!this._has(t, e)) return c;
    const i = t[e], s = this._entity(t, e), r = f(s);
    return u`
      <div class="row">
        <div class="row-label">${x[e]}</div>
        <label class="switch">
          <input
            type="checkbox"
            .checked=${K(s)}
            ?disabled=${r}
            @change=${() => this._toggle(i)}
          />
          <span class="slider"></span>
        </label>
      </div>
    `;
  }
  _renderNumber(t, e) {
    if (!this._has(t, e)) return c;
    const i = t[e], s = this._entity(t, e), r = f(s), n = Number(s.attributes.min ?? 0), a = Number(s.attributes.max ?? 100), l = Number(s.attributes.step ?? 1), o = ge(s) ?? n, h = s.attributes.unit_of_measurement || "";
    return u`
      <div class="row">
        <div class="row-label">
          ${x[e]}
          <span class="stat-label">${O(this.hass, s)}</span>
        </div>
        <div class="row-control">
          <input
            type="range"
            .min=${String(n)}
            .max=${String(a)}
            .step=${String(l)}
            .value=${String(o)}
            ?disabled=${r}
            @change=${(p) => {
      const d = p.target;
      this._setNumber(i, Number(d.value));
    }}
          />
          ${h ? u`<span class="stat-label">${h}</span>` : c}
        </div>
      </div>
    `;
  }
  _renderSelect(t, e) {
    if (!this._has(t, e)) return c;
    const i = t[e], s = this._entity(t, e), r = f(s), n = s.attributes.options || [];
    return u`
      <div class="row">
        <div class="row-label">${x[e]}</div>
        <select
          class="ha-select"
          ?disabled=${r}
          .value=${s.state}
          @change=${(a) => {
      const l = a.target;
      this._selectOption(i, l.value);
    }}
        >
          ${n.length ? n.map(
      (a) => u`<option value=${a} ?selected=${a === s.state}>
                    ${a}
                  </option>`
    ) : u`<option value=${s.state}>${s.state}</option>`}
        </select>
      </div>
    `;
  }
  _renderStat(t, e) {
    if (!this._has(t, e)) return c;
    const i = this._entity(t, e);
    return u`
      <div class="stat">
        <div class="stat-label">${x[e]}</div>
        <div class="stat-value">${O(this.hass, i)}</div>
      </div>
    `;
  }
  _renderActions(t) {
    if (Ye(this.hass, t)) {
      const i = u`
        ${this._renderAction(t, "pause_cleaning")}
        ${this._renderAction(t, "pause_dumping")}
        ${this._renderAction(t, "pause_exit_maintenance")}
        ${this._renderAction(t, "clean", "Resume")}
        ${this._renderAction(t, "resume_dumping")}
        ${this._renderAction(t, "resume_exit_maintenance")}
      `;
      return u`<div class="actions">${i}</div>`;
    }
    return u`
      <div class="actions">
        ${this._renderAction(t, "clean")}
        ${this._renderAction(t, "level")}
        ${this._renderAction(t, "dump")}
        ${this._renderAction(t, "deodorize")}
      </div>
    `;
  }
  render() {
    if (!this._config || !this.hass)
      return u``;
    const t = we(this.hass, this._config.device_id);
    if (!t)
      return u`
        <ha-card>
          <div class="warning">
            Device not found. Check <code>device_id</code> for your Petkit
            Purobot Max 3.
          </div>
        </ha-card>
      `;
    const e = this._roles(), i = this._config.title || U(t), s = this._entity(e, "state"), r = this._entity(e, "error"), n = this._entity(e, "power"), a = r && !f(r) && r.state.toLowerCase() !== "ok" ? O(this.hass, r) : null, l = n ? K(n) : !0;
    return u`
      <ha-card>
        <div class="header">
          <div>
            <div class="title">${i}</div>
            ${t.model ? u`<div class="subtitle">${t.model}</div>` : c}
          </div>
          <div class="chips">
            ${n ? u`<span class="chip ${l ? "ok" : ""}"
                  >${l ? "Online" : "Off"}</span
                >` : c}
            ${s ? u`<span class="chip">${O(this.hass, s)}</span>` : c}
            ${a ? u`<span class="chip error">${a}</span>` : c}
          </div>
        </div>

        <div class="section">
          <div class="gauges">
            ${this._renderGauge(
      "Litter level",
      this._entity(e, "litter_level")
    )}
            ${this._renderGauge(
      "Wastebin",
      this._entity(e, "wastebin"),
      !0
    )}
          </div>
          <div class="consumables">
            ${this._renderStat(e, "n50")}
            ${this._renderStat(e, "n60")}
            ${this._renderStat(e, "litter_weight")}
          </div>
        </div>

        ${this._hasAny(e, [
      "clean",
      "level",
      "dump",
      "deodorize",
      "pause_cleaning",
      "pause_dumping",
      "pause_exit_maintenance",
      "resume_dumping",
      "resume_exit_maintenance"
    ]) ? u`
              <div class="section">
                <div class="section-title">Actions</div>
                ${this._renderActions(e)}
              </div>
            ` : c}

        ${this._hasAny(e, [
      "auto_clean",
      "avoid_repeat",
      "auto_deodor",
      "do_not_disturb"
    ]) ? u`
              <div class="section">
                <div class="section-title">Quick toggles</div>
                <div class="toggles">
                  ${this._renderSwitch(e, "auto_clean")}
                  ${this._renderSwitch(e, "avoid_repeat")}
                  ${this._renderSwitch(e, "auto_deodor")}
                  ${this._renderSwitch(e, "do_not_disturb")}
                </div>
              </div>
            ` : c}

        ${this._hasAny(e, [
      "periodic_cleaning",
      "cleaning_delay",
      "cleaning_interval",
      "periodic_deodorizing"
    ]) ? u`
              <div class="section">
                <div class="section-title">Schedule</div>
                <div class="toggles">
                  ${this._renderSwitch(e, "periodic_cleaning")}
                  ${this._renderNumber(e, "cleaning_delay")}
                  ${this._renderSelect(e, "cleaning_interval")}
                  ${this._renderSwitch(e, "periodic_deodorizing")}
                </div>
              </div>
            ` : c}

        ${this._hasAny(e, [
      "last_used_by",
      "last_event",
      "times_used",
      "average_use"
    ]) ? u`
              <div class="section">
                <div class="section-title">Activity</div>
                <div class="activity-grid">
                  ${this._renderStat(e, "last_used_by")}
                  ${this._renderStat(e, "last_event")}
                  ${this._renderStat(e, "times_used")}
                  ${this._renderStat(e, "average_use")}
                </div>
              </div>
            ` : c}

        <details
          class="more"
          ?open=${this._moreOpen}
          @toggle=${(o) => {
      this._moreOpen = o.target.open;
    }}
        >
          <summary>More</summary>
          <div class="section">
            <div class="actions">
              ${this._renderAction(e, "start_maintenance")}
              ${this._renderAction(e, "exit_maintenance")}
              ${this._renderAction(e, "reset_n50")}
              ${this._renderAction(e, "reset_n60")}
            </div>
          </div>
          <div class="toggles">
            ${this._renderSwitch(e, "child_lock")}
            ${this._renderSwitch(e, "display")}
            ${this._renderSwitch(e, "kitten_mode")}
            ${this._renderSwitch(e, "continuous_rotation")}
            ${this._renderSwitch(e, "deep_cleaning")}
            ${this._renderSwitch(e, "deep_deodor")}
            ${this._renderSwitch(e, "enhanced_adsorption")}
            ${this._renderSwitch(e, "light_weight")}
            ${this._renderSelect(e, "litter_type")}
          </div>
        </details>
      </ha-card>
    `;
  }
};
k.styles = tt;
F([
  Y({ attribute: !1 })
], k.prototype, "hass", 2);
F([
  ee()
], k.prototype, "_config", 2);
F([
  ee()
], k.prototype, "_moreOpen", 2);
k = F([
  xe("purobot-max-3-card")
], k);
var rt = Object.defineProperty, nt = Object.getOwnPropertyDescriptor, te = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? nt(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && rt(e, i, r), r;
};
let P = class extends A {
  setConfig(t) {
    this._config = t;
  }
  _devices() {
    return this.hass?.devices ? Object.values(this.hass.devices).filter(et).sort(
      (t, e) => U(t).localeCompare(U(e))
    ) : [];
  }
  _update(t) {
    if (!this._config) return;
    const e = { ...this._config, ...t };
    this._config = e, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: e },
        bubbles: !0,
        composed: !0
      })
    );
  }
  render() {
    if (!this._config || !this.hass) return c;
    const t = this._devices();
    return u`
      <div class="form">
        <label>
          Device
          <select
            .value=${this._config.device_id || ""}
            @change=${(e) => {
      const i = e.target;
      this._update({ device_id: i.value });
    }}
          >
            <option value="" disabled ?selected=${!this._config.device_id}>
              Select Petkit litter device
            </option>
            ${t.map(
      (e) => u`
                <option
                  value=${e.id}
                  ?selected=${e.id === this._config.device_id}
                >
                  ${U(e)}${e.model ? ` (${e.model})` : ""}
                </option>
              `
    )}
          </select>
        </label>

        <label>
          Title (optional)
          <input
            type="text"
            .value=${this._config.title || ""}
            placeholder="Defaults to device name"
            @input=${(e) => {
      const i = e.target;
      this._update({ title: i.value || void 0 });
    }}
          />
        </label>

        ${t.length ? c : u`<p class="hint">
              No Petkit litter devices found. Install and configure
              <a
                href="https://github.com/Jezza34000/homeassistant_petkit"
                target="_blank"
                rel="noreferrer"
                >homeassistant_petkit</a
              >
              first.
            </p>`}
      </div>
    `;
  }
};
P.styles = fe`
    .form {
      display: grid;
      gap: 12px;
      padding: 4px 0;
    }

    label {
      display: grid;
      gap: 4px;
      font-size: 0.9rem;
      color: var(--primary-text-color);
    }

    input,
    select {
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.35));
      background: var(--card-background-color, transparent);
      color: var(--primary-text-color);
      font: inherit;
    }

    .hint {
      font-size: 0.85rem;
      color: var(--secondary-text-color);
      margin: 0;
    }

    a {
      color: var(--primary-color);
    }
  `;
te([
  Y({ attribute: !1 })
], P.prototype, "hass", 2);
te([
  ee()
], P.prototype, "_config", 2);
P = te([
  xe("purobot-max-3-card-editor")
], P);
const at = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get PurobotMax3CardEditor() {
    return P;
  }
}, Symbol.toStringTag, { value: "Module" }));
window.customCards = window.customCards || [];
window.customCards.push({
  type: "purobot-max-3-card",
  name: "Purobot Max 3 Card",
  description: "Purpose-built control card for the Petkit Purobot Max 3 (Jezza34000/homeassistant_petkit).",
  preview: !0,
  documentationURL: "https://github.com/tsb3500/purobot_max_3_ha_card"
});
console.info(
  `%c PUROBOT-MAX-3-CARD %c ${Ae} `,
  "color:#fff;background:#2e7d32;font-weight:700",
  "color:#2e7d32;background:transparent;font-weight:700"
);
//# sourceMappingURL=purobot-max-3-card.js.map
