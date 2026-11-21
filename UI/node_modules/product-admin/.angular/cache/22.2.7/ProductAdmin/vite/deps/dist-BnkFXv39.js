import { C as p, E as x$2, _ as c$2, a as H$2, b as fe$1, c as K$3, h as ae, i as F$2, l as N$1, n as B, p as Z$2, t as A$2, u as Q$3, w as s$1, x as l$1 } from "./dist-D971aPsi.js";
// ../node_modules/@primeuix/utils/dist/eventbus/index.mjs
function v$1() {
	let s = /* @__PURE__ */ new Map(), r = {
		on(n, t) {
			let e = s.get(n);
			return e ? e.push(t) : e = [t], s.set(n, e), r;
		},
		off(n, t) {
			let e = s.get(n);
			if (e) {
				let o = e.indexOf(t);
				o !== -1 && e.splice(o, 1);
			}
			return r;
		},
		emit(n, ...t) {
			let e = s.get(n);
			e && e.forEach((o) => {
				o(t[0]);
			});
		},
		clear() {
			s.clear();
		}
	};
	return r;
}
// ../node_modules/@primeuix/utils/dist/dom/index.mjs
function D$2(t, e) {
	return t ? t.classList ? t.classList.contains(e) : new RegExp("(^| )" + e + "( |$)", "gi").test(t.className) : !1;
}
function M$1(t, e) {
	if (t && e) {
		let o = (n) => {
			D$2(t, n) || (t.classList ? t.classList.add(n) : t.className += " " + n);
		};
		[e].flat().filter(Boolean).forEach((n) => n.split(" ").forEach(o));
	}
}
function I$2() {
	return window.innerWidth - document.documentElement.offsetWidth;
}
function xt(t) {
	typeof t == "string" ? M$1(document.body, t || "p-overflow-hidden") : (t != null && t.variableName && document.body.style.setProperty(t.variableName, I$2() + "px"), M$1(document.body, (t == null ? void 0 : t.className) || "p-overflow-hidden"));
}
function W$2(t, e) {
	if (t && e) {
		let o = (n) => {
			t.classList ? t.classList.remove(n) : t.className = t.className.replace(new RegExp("(^|\\b)" + n.split(" ").join("|") + "(\\b|$)", "gi"), " ");
		};
		[e].flat().filter(Boolean).forEach((n) => n.split(" ").forEach(o));
	}
}
function wt(t) {
	typeof t == "string" ? W$2(document.body, t || "p-overflow-hidden") : (t != null && t.variableName && document.body.style.removeProperty(t.variableName), W$2(document.body, (t == null ? void 0 : t.className) || "p-overflow-hidden"));
}
function S(t) {
	if (typeof document == "undefined") return null;
	for (let e of Array.from(document.styleSheets || [])) try {
		for (let o of Array.from(e.cssRules || [])) {
			let n = o.style;
			if (n) {
				for (let r of Array.from(n)) if (t.lastIndex = 0, t.test(r)) return {
					name: r,
					value: n.getPropertyValue(r).trim()
				};
			}
		}
	} catch (o) {
		continue;
	}
	return null;
}
function v(t) {
	let e = {
		width: 0,
		height: 0
	};
	if (t) {
		let [o, n] = [t.style.visibility, t.style.display], r = t.getBoundingClientRect();
		t.style.visibility = "hidden", t.style.display = "block", e.width = r.width || t.offsetWidth, e.height = r.height || t.offsetHeight, t.style.display = n, t.style.visibility = o;
	}
	return e;
}
function h() {
	let t = window, e = document, o = e.documentElement, n = e.getElementsByTagName("body")[0];
	return {
		width: t.innerWidth || o.clientWidth || n.clientWidth,
		height: t.innerHeight || o.clientHeight || n.clientHeight
	};
}
function w$1(t) {
	return t ? Math.abs(t.scrollLeft) : 0;
}
function V$1() {
	let t = document.documentElement;
	return (window.pageXOffset || w$1(t)) - (t.clientLeft || 0);
}
function j$1() {
	let t = document.documentElement;
	return (window.pageYOffset || t.scrollTop) - (t.clientTop || 0);
}
function q$2(t) {
	return t ? getComputedStyle(t).direction === "rtl" : !1;
}
function z$1(t, e, o = !0) {
	var n, r, i, s;
	if (t) {
		let l = t.offsetParent ? {
			width: t.offsetWidth,
			height: t.offsetHeight
		} : v(t), d = l.height, f = l.width, a = e.getBoundingClientRect(), { offsetHeight: u, offsetWidth: p } = e, m = u != null ? u : a.height, T = p != null ? p : a.width, ct = j$1(), yt = V$1(), bt = h(), k, B, mt = "top";
		a.top + m + d > bt.height ? (k = a.top + ct - d, mt = "bottom", k < 0 && (k = ct)) : k = m + a.top + ct, a.left + f > bt.width ? B = Math.max(0, a.left + yt + T - f) : B = a.left + yt, q$2(t) ? t.style.insetInlineEnd = B + "px" : t.style.insetInlineStart = B + "px", t.style.top = k + "px", t.style.transformOrigin = mt, o && (t.style.marginTop = mt === "bottom" ? `calc(${(r = (n = S(/-anchor-gutter$/)) == null ? void 0 : n.value) != null ? r : "2px"} * -1)` : (s = (i = S(/-anchor-gutter$/)) == null ? void 0 : i.value) != null ? s : "");
	}
}
var we$1 = /expression\s*\(|url\s*\(\s*['"]?\s*(?:javascript|vbscript):|@import\s+['"]?\s*(?:javascript|vbscript|data):/i;
var Et = /url\s*\(\s*['"]?\s*(data:[^'")]*)/gi;
var Ee = /* @__PURE__ */ new Set([
	"href",
	"src",
	"xlink:href",
	"action",
	"formaction"
]);
var Te$1 = /* @__PURE__ */ new Set([
	"http",
	"https",
	"mailto",
	"tel",
	"sms",
	"ftp",
	"ftps",
	"blob"
]);
var Tt = /^data:image\/(?:png|gif|jpeg|jpg|webp|bmp|avif);base64,[a-z0-9+/=\s]+$/i;
function _$1(t) {
	if (typeof t != "string") return !1;
	if (we$1.test(t)) return !0;
	Et.lastIndex = 0;
	let e;
	for (; e = Et.exec(t);) if (!Tt.test(e[1].trim())) return !0;
	return !1;
}
function ve$1(t) {
	let e = "";
	for (let o of t) {
		let n = o.charCodeAt(0);
		n <= 31 || n === 127 || /\s/.test(o) || (e += o);
	}
	return e;
}
function Ce$1(t, e) {
	var i, s;
	let o = ve$1(t), n = e.toLowerCase();
	if (o.startsWith("#") || o.startsWith("/") || o.startsWith("./") || o.startsWith("../") || o.startsWith("?")) return !0;
	let r = (s = (i = o.match(/^([a-z][a-z0-9+.-]*):/i)) == null ? void 0 : i[1]) == null ? void 0 : s.toLowerCase();
	return r ? r === "data" ? (n === "src" || n === "xlink:href") && Tt.test(t.trim()) : Te$1.has(r) : !0;
}
function P$1(t, e) {
	return typeof e == "string" && Ee.has(t.toLowerCase()) && !Ce$1(e, t);
}
function O$1(t, e) {
	return t.toLowerCase() === "srcdoc" && typeof e == "string" && /<\s*script\b|on\w+\s*=|javascript:|data:text\/html/i.test(e);
}
function He(t) {
	return t.startsWith("--") ? t : t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function X$1(t, e, o = {}) {
	o.clear && (t.style.cssText = ""), e.forEach((n) => {
		let r = n.indexOf(":");
		if (r < 0) return;
		let i = n.slice(0, r).trim(), s = n.slice(r + 1).trim();
		if (!i || _$1(s)) return;
		let l = "";
		/!\s*important$/i.test(s) && (s = s.replace(/!\s*important$/i, "").trim(), l = "important"), t.style.setProperty(i, s, l);
	});
}
function Ae$1(t, e) {
	let o = 0;
	for (; e - 1 - o >= 0 && t[e - 1 - o] === "\\";) o++;
	return o % 2 === 1;
}
function Re(t) {
	let e = [], o = 0, n = "", r = 0;
	for (let i = 0; i < t.length; i++) {
		let s = t[i];
		n ? s === n && !Ae$1(t, i) && (n = "") : s === "'" || s === "\"" ? n = s : s === "(" ? r++ : s === ")" ? r = Math.max(0, r - 1) : s === ";" && r === 0 && (e.push(t.slice(o, i)), o = i + 1);
	}
	return e.push(t.slice(o)), e;
}
function E$1(t, e, o = {}) {
	if (typeof e == "string") {
		X$1(t, Re(e), o);
		return;
	}
	o.clear && (t.style.cssText = ""), Object.entries(e).forEach(([n, r]) => {
		if (r == null || _$1(r)) return;
		let i = String(r), s = "";
		/!\s*important$/i.test(i) && (i = i.replace(/!\s*important$/i, "").trim(), s = "important"), t.style.setProperty(He(n), i, s);
	});
}
function C$1(t, e) {
	t && (typeof e == "string" ? E$1(t, e, { clear: !0 }) : E$1(t, e || {}));
}
function L$1(t, e) {
	if (t instanceof HTMLElement) {
		let o = t.offsetWidth;
		if (e) {
			let n = getComputedStyle(t);
			o += parseFloat(n.marginLeft) + parseFloat(n.marginRight);
		}
		return o;
	}
	return 0;
}
function G$2(t, e, o = !0, n = void 0) {
	var r, i;
	if (t) {
		let s = t.offsetParent ? {
			width: t.offsetWidth,
			height: t.offsetHeight
		} : v(t), l = e.getBoundingClientRect(), d = (r = e.offsetHeight) != null ? r : l.height, f = h(), a, u, p = n != null ? n : "top";
		if (!n && l.top + d + s.height > f.height ? (a = -1 * s.height, p = "bottom", l.top + a < 0 && (a = -1 * l.top)) : a = d, s.width > f.width ? u = l.left * -1 : l.left + s.width > f.width ? u = (l.left + s.width - f.width) * -1 : u = 0, t.style.top = a + "px", t.style.insetInlineStart = u + "px", t.style.transformOrigin = p, o) {
			let m = (i = S(/-anchor-gutter$/)) == null ? void 0 : i.value;
			t.style.marginTop = p === "bottom" ? `calc(${m != null ? m : "2px"} * -1)` : m != null ? m : "";
		}
	}
}
function y(t) {
	if (t) {
		let e = t.parentNode;
		return e && e instanceof ShadowRoot && e.host && (e = e.host), e;
	}
	return null;
}
function H$1(t) {
	return !!(t !== null && typeof t != "undefined" && t.nodeName && y(t));
}
function c$1(t) {
	return typeof Element != "undefined" ? t instanceof Element : t !== null && typeof t == "object" && t.nodeType === 1 && typeof t.nodeName == "string";
}
function b$1(t) {
	var o;
	if (c$1(t)) return t;
	if (!t || typeof t != "object") return;
	let e = t;
	if ("current" in t) e = t.current, e = (o = b$1(e == null ? void 0 : e.elementRef)) != null ? o : e;
	else if ("value" in t) e = t.value;
	else if ("nativeElement" in t) e = t.nativeElement;
	else if ("el" in t) {
		let n = t.el;
		n && typeof n == "object" && "nativeElement" in n ? e = n.nativeElement : e = n;
	} else if ("elementRef" in t) return b$1(t.elementRef);
	return e = x$2(e), c$1(e) ? e : void 0;
}
function Y$1(t, e) {
	var o, n, r;
	if (t) switch (t) {
		case "document": return document;
		case "window": return window;
		case "body": return document.body;
		case "@next": return e == null ? void 0 : e.nextElementSibling;
		case "@prev": return e == null ? void 0 : e.previousElementSibling;
		case "@first": return e == null ? void 0 : e.firstElementChild;
		case "@last": return e == null ? void 0 : e.lastElementChild;
		case "@child": return (o = e == null ? void 0 : e.children) == null ? void 0 : o[0];
		case "@parent": return e == null ? void 0 : e.parentElement;
		case "@grandparent": return (n = e == null ? void 0 : e.parentElement) == null ? void 0 : n.parentElement;
		default: {
			if (typeof t == "string") {
				let d = t.match(/^@child\[(\d+)]/);
				return d ? ((r = e == null ? void 0 : e.children) == null ? void 0 : r[parseInt(d[1], 10)]) || null : document.querySelector(t) || null;
			}
			let s = ((d) => typeof d == "function" && "call" in d && "apply" in d)(t) ? t() : t, l = b$1(s);
			return H$1(l) ? l : (s == null ? void 0 : s.nodeType) === 9 ? s : void 0;
		}
	}
}
function Ct(t, e) {
	let o = Y$1(t, e);
	if (o) o.appendChild(e);
	else throw new Error("Cannot append " + e + " to " + t);
}
function A$1(t, e, o) {
	if (typeof o != "function" && !(typeof o == "object" && o !== null && "handleEvent" in o)) return;
	let n = t, r = n._pListeners || (n._pListeners = []), i = !1;
	for (let s = r.length - 1; s >= 0; s--) r[s][0] === e && (r[s][1] === o ? i = !0 : (t.removeEventListener(e, r[s][1]), r.splice(s, 1)));
	i || (t.addEventListener(e, o), r.push([e, o]));
}
function $$1(t, e = {}) {
	if (c$1(t)) {
		let o = t == null ? void 0 : t.$attrs, n = (s, l) => {
			let d = o != null && o[s] ? [o[s]] : [];
			return [l].flat().reduce((f, a) => {
				if (a != null) {
					let u = typeof a;
					if (u === "string" || u === "number") f.push(a);
					else if (u === "object") {
						let p = Array.isArray(a) ? n(s, a) : Object.entries(a).map(([m, T]) => s === "style" && (T || T === 0) ? `${m.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}:${T}` : T ? m : void 0);
						f = p.length ? f.concat(p.filter((m) => !!m)) : f;
					}
				}
				return f;
			}, d);
		}, r = (s) => {
			X$1(t, n("style", s));
		}, i = t;
		Object.entries(e).forEach(([s, l]) => {
			if (l != null) {
				let d = s.match(/^on(.+)/);
				if (d) A$1(t, d[1].toLowerCase(), l);
				else if (s === "p-bind" || s === "pBind") $$1(t, l);
				else if (s === "style") r(l), i.$attrs = i.$attrs || {}, i.$attrs[s] = t.style.cssText;
				else {
					if (P$1(s, l) || O$1(s, l)) return;
					l = s === "class" ? [...new Set(n("class", l))].join(" ").trim() : l, i.$attrs = i.$attrs || {}, i.$attrs[s] = l, t.setAttribute(s, l);
				}
			}
		});
	}
}
function Z$1(t, e = {}, ...o) {
	if (t) {
		let n = document.createElement(t);
		return $$1(n, e), n.append(...o), n;
	}
}
function Q$2(t) {
	return (t != null ? t : "").replace(/<\/(style)/gi, "<\\/$1");
}
function J$1(t) {
	return String(t).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function K$2(t = {}) {
	return Object.keys(t).filter((e) => /^[^\s"'<>/=]+$/.test(e)).map((e) => `${e}="${J$1(t[e])}"`);
}
function tt(t, e = {}) {
	return t ? `<style${K$2(e).reduce((o, n) => `${o} ${n}`, "")}>${Q$2(t)}</style>` : "";
}
function kt(t, e) {
	if (!t) return () => {};
	t.style.opacity = "0";
	let o = +/* @__PURE__ */ new Date(), n = 0, r, i, s = function() {
		n += ((/* @__PURE__ */ new Date()).getTime() - o) / e, t.style.opacity = `${n}`, o = +/* @__PURE__ */ new Date(), n < 1 && ("requestAnimationFrame" in window ? r = requestAnimationFrame(s) : i = setTimeout(s, 16));
	};
	return s(), () => {
		r !== void 0 && cancelAnimationFrame(r), i !== void 0 && clearTimeout(i);
	};
}
function ot(t, e) {
	return c$1(t) ? Array.from(t.querySelectorAll(e)) : [];
}
function nt(t, e) {
	return c$1(t) ? t.matches(e) ? t : t.querySelector(e) : null;
}
function rt(t) {
	var o, n, r, i, s;
	if (t && t.nodeType !== 9) {
		let l = (o = t.getRootNode) == null ? void 0 : o.call(t);
		if ((l == null ? void 0 : l.nodeType) === 9 || (l == null ? void 0 : l.nodeType) === 11) return (n = l.activeElement) != null ? n : null;
		t = void 0;
	}
	let e = (i = (r = t != null ? t : typeof document == "undefined" ? void 0 : document) == null ? void 0 : r.activeElement) != null ? i : null;
	for (; (s = e == null ? void 0 : e.shadowRoot) != null && s.activeElement;) e = e.shadowRoot.activeElement;
	return e;
}
function Wt(t, e) {
	t && rt(t) !== t && t.focus(e);
}
function it(t, e) {
	if (c$1(t)) {
		let o = t.getAttribute(e);
		return o !== null && o.trim() !== "" && !isNaN(o) ? +o : o === "true" || o === "false" ? o === "true" : o;
	}
}
function Ft(t, e) {
	var i, s, l, d, f, a, u;
	let o = [];
	for (let p = (i = e == null ? void 0 : e.getRootNode) == null ? void 0 : i.call(e); p; p = p.nodeType === 11 ? (s = p.host) == null ? void 0 : s.getRootNode() : void 0) o.push(p);
	let n = (d = (l = t == null ? void 0 : t.composedPath) == null ? void 0 : l.call(t)) == null ? void 0 : d[0], r = (f = n == null ? void 0 : n.getRootNode) == null ? void 0 : f.call(n);
	for (; r && !o.includes(r);) n = r.nodeType === 11 ? r.host : void 0, r = (a = n == null ? void 0 : n.getRootNode) == null ? void 0 : a.call(n);
	return (u = n != null ? n : t == null ? void 0 : t.target) != null ? u : null;
}
function x$1(t, e = "") {
	let o = ot(t, `button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [href]:not([tabindex = "-1"]):not([style*="display:none"]):not([hidden])${e},
            input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
            [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e}`), n = [];
	for (let r of o) {
		let i = getComputedStyle(r);
		i.display != "none" && i.visibility != "hidden" && n.push(r);
	}
	return n;
}
function Bt(t, e) {
	let o = x$1(t, e);
	return o.length > 0 ? o[0] : null;
}
function Dt(t) {
	if (t) {
		let e = t.offsetHeight, o = getComputedStyle(t);
		return e -= parseFloat(o.paddingTop) + parseFloat(o.paddingBottom) + parseFloat(o.borderTopWidth) + parseFloat(o.borderBottomWidth), e;
	}
	return 0;
}
function It(t) {
	var e;
	if (t) {
		let o = (e = y(t)) == null ? void 0 : e.childNodes, n = 0;
		if (o) for (let r = 0; r < o.length; r++) {
			if (o[r] === t) return n;
			o[r].nodeType === 1 && n++;
		}
	}
	return -1;
}
function Vt(t, e) {
	let o = x$1(t, e);
	return o.length > 0 ? o[o.length - 1] : null;
}
function ft(t) {
	if (t) {
		let e = t.getBoundingClientRect();
		return {
			top: e.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
			left: e.left + (window.pageXOffset || w$1(document.documentElement) || w$1(document.body) || 0)
		};
	}
	return {
		top: "auto",
		left: "auto"
	};
}
function R$1(t, e) {
	if (t) {
		let o = t.offsetHeight;
		if (e) {
			let n = getComputedStyle(t);
			o += parseFloat(n.marginTop) + parseFloat(n.marginBottom);
		}
		return o;
	}
	return 0;
}
function Xt() {
	if (window.getSelection) return window.getSelection().toString();
	if (document.getSelection) return document.getSelection().toString();
}
function Gt(t) {
	var o;
	let e = (o = t == null ? void 0 : t.getRootNode) == null ? void 0 : o.call(t);
	return e && e.nodeType === 11 && "host" in e ? e : null;
}
function Zt(t) {
	if (t) {
		let e = t.offsetWidth, o = getComputedStyle(t);
		return e -= parseFloat(o.paddingLeft) + parseFloat(o.paddingRight) + parseFloat(o.borderLeftWidth) + parseFloat(o.borderRightWidth), e;
	}
	return 0;
}
function oe(t) {
	if (t) {
		let e = t.nodeName, o = t.parentElement && t.parentElement.nodeName;
		return e === "INPUT" || e === "TEXTAREA" || e === "BUTTON" || e === "A" || o === "INPUT" || o === "TEXTAREA" || o === "BUTTON" || o === "A" || !!t.closest(".p-button, .p-checkbox, .p-radiobutton");
	}
	return !1;
}
function pt(t) {
	return !!(t && t.offsetParent != null);
}
function le() {
	return typeof window == "undefined" || !window.matchMedia ? !1 : window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function fe() {
	return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}
function ue() {
	return new Promise((t) => {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => t());
		});
	});
}
function pe(t) {
	var e;
	t && ("remove" in Element.prototype ? t.remove() : (e = t.parentNode) == null || e.removeChild(t));
}
function me$1(t, e) {
	let o = b$1(t);
	if (o) o.removeChild(e);
	else throw new Error("Cannot remove " + e + " from " + t);
}
function ye$1(t, e) {
	let o = getComputedStyle(t), n = o.getPropertyValue("border-top-width"), r = n ? parseFloat(n) : 0, i = o.getPropertyValue("padding-top"), s = i ? parseFloat(i) : 0, l = t.getBoundingClientRect(), f = e.getBoundingClientRect().top + document.body.scrollTop - (l.top + document.body.scrollTop) - r - s, a = t.scrollTop, u = t.clientHeight, p = R$1(e);
	f < 0 ? t.scrollTop = a + f : f + p > u && (t.scrollTop = a + f - u + p);
}
function be(t, e = "", o) {
	if (c$1(t) && o !== null && o !== void 0) {
		let n = e.toLowerCase();
		if (/^on[a-z]/.test(n)) {
			A$1(t, n.slice(2), o);
			return;
		}
		if (n === "style") {
			typeof o == "string" ? E$1(t, o, { clear: !0 }) : typeof o == "object" && E$1(t, o);
			return;
		}
		if (P$1(e, o) || O$1(e, o)) return;
		t.setAttribute(e, o);
	}
}
function xe$1(t, e, o = null, n) {
	e && t != null && t.style && t.style.setProperty(e, o, n);
}
function Se$1(t) {
	return `"${String(t).replace(/["\\]/g, "\\$&").replace(/[\n\r\f]/g, (e) => `\\${e.charCodeAt(0).toString(16)} `)}"`;
}
// ../node_modules/@primeuix/styled/dist/chunk-J33ABP3O.mjs
var e = Object.defineProperty;
var t = Object.defineProperties;
var r = Object.getOwnPropertyDescriptors;
var s = Object.getOwnPropertySymbols;
var n = Object.prototype.hasOwnProperty;
var i = Object.prototype.propertyIsEnumerable;
var o = (t, r, s) => r in t ? e(t, r, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: s
}) : t[r] = s;
var l = (e, t) => {
	for (var r in t || (t = {})) n.call(t, r) && o(e, r, t[r]);
	if (s) for (var r of s(t)) i.call(t, r) && o(e, r, t[r]);
	return e;
};
var a = (e, s) => t(e, r(s));
var c = (e, t) => {
	var r = {};
	for (var o in e) n.call(e, o) && t.indexOf(o) < 0 && (r[o] = e[o]);
	if (null != e && s) for (var o of s(e)) t.indexOf(o) < 0 && i.call(e, o) && (r[o] = e[o]);
	return r;
};
var d = /* @__PURE__ */ v$1();
var $ = /{([^{}]*)}/g;
var k = /(?:^|\D)(\d+\s+[+*/-]\s+\d+)/g;
var b = /var\((?:(?!var\()[^)])+\)/g;
function x(e) {
	return c$2(e) ? e.replace(/[A-Z]/g, (e, t) => 0 === t ? e : "." + e.toLowerCase()).toLowerCase() : e;
}
function O(e, t) {
	A$2(e) ? e.push(...t || []) : s$1(e) && Object.assign(e, t);
}
function _(e) {
	return s$1(e) && Object.prototype.hasOwnProperty.call(e, "$value") && Object.prototype.hasOwnProperty.call(e, "$type") ? e.$value : e;
}
function w(e, t = "") {
	if (![
		"opacity",
		"z-index",
		"line-height",
		"font-weight",
		"flex",
		"flex-grow",
		"flex-shrink",
		"order"
	].some((e) => t.endsWith(e))) return `${e}`.trim().split(" ").map((e) => Z$2(e) ? `${e}px` : e).join(" ");
	return e;
}
function C(e) {
	return /[^\w-]/.test(e) ? e.replace(/ /g, "").replace(/[^\w]/g, "-") : e;
}
function P(e = "", t = "") {
	return C(`${c$2(e, !1) && c$2(t, !1) ? `${e}-` : e}${t}`);
}
function j(e = "", t = "") {
	return `--${P(e, t)}`;
}
function N(e = "") {
	let t = 0;
	for (let r = 0; r < e.length; r++) {
		const s = e.charCodeAt(r);
		123 !== s && 125 !== s || t++;
	}
	return t % 2 != 0;
}
var T = (e) => -1 === e.indexOf("\r") && -1 === e.indexOf("\f") ? e : e.replace(/\r\n?|\f/g, "\n");
var A = (e) => 32 === e || 9 === e || 10 === e || 12 === e || 13 === e;
var L = (e) => e >= 48 && e <= 57 || (32 | e) >= 97 && (32 | e) <= 102;
var R = (e) => e >= 128 || 45 === e || 95 === e || e >= 48 && e <= 57 || (32 | e) >= 97 && (32 | e) <= 122;
function M(e) {
	if (-1 !== e.indexOf("\0")) return !1;
	const t = T(e), r = t.length;
	let s = 0, n = 0, i = !1, o = 0;
	for (; o < r;) {
		const e = t[o++];
		if ("\\" === e) {
			if (o >= r) return !1;
			let e = 0;
			for (; e < 6 && L(t.charCodeAt(o));) o++, e++;
			e ? A(t.charCodeAt(o)) && o++ : o++, i = !0;
		} else if ("\"" === e || "'" === e) for (;;) {
			if (o >= r) return !1;
			const s = t[o++];
			if (s === e) break;
			if ("\\" === s) o++;
			else if ("\n" === s || "\r" === s || "\f" === s) return !1;
		}
		else if ("(" === e) {
			if (i) return !1;
			if (108 == (32 | t.charCodeAt(o - 2)) && 114 == (32 | t.charCodeAt(o - 3)) && 117 == (32 | t.charCodeAt(o - 4)) && !R(t.charCodeAt(o - 5)) && "#" !== t[o - 5] && "@" !== t[o - 5]) {
				let e = o;
				for (; e < r && A(t.charCodeAt(e));) e++;
				if ("\"" !== t[e] && "'" !== t[e]) {
					for (;;) {
						if (e >= r) return !1;
						const s = t.charCodeAt(e++);
						if (41 === s) break;
						if (A(s)) {
							for (; e < r && A(t.charCodeAt(e));) e++;
							if (41 !== t.charCodeAt(e++)) return !1;
							break;
						}
						if (34 === s || 39 === s || 40 === s || s <= 8 || 11 === s || s >= 14 && s <= 31 || 127 === s) return !1;
						if (92 === s) {
							if (e >= r || 10 === t.charCodeAt(e)) return !1;
							let s = 0;
							for (; s < 6 && L(t.charCodeAt(e));) e++, s++;
							s ? A(t.charCodeAt(e)) && e++ : e++;
						}
					}
					o = e;
					continue;
				}
			}
			if (n++ > 29) return !1;
			s <<= 1;
		} else if ("[" === e) {
			if (n++ > 29) return !1;
			s = s << 1 | 1;
		} else if (")" === e || "]" === e) {
			if (n-- < 1 || (1 & s) != ("]" === e ? 1 : 0)) return !1;
			s >>= 1;
		} else if ("/" === e && "*" === t[o]) {
			const e = t.indexOf("*/", o + 1);
			if (e < 0) return !1;
			o = e + 2;
		} else {
			if (";" === e || "{" === e || "}" === e || "<" === e) return !1;
			R(t.charCodeAt(o - 1)) || (i = !1);
		}
	}
	return 0 === n;
}
function V(e, t = "", r = "", s = [], n) {
	if (c$2(e)) {
		if (e.length > 1e5) return;
		const t = e.trim();
		if (N(t)) return;
		if (H$2(t, $)) {
			const e = t.replace($, (e) => {
				const t = e.replace(/{|}/g, "").split(".").filter((e) => !s.some((t) => H$2(e, t)));
				return `var(${j(r, fe$1(t.join("-")))}${l$1(n) ? `, ${n}` : ""})`;
			});
			if (!M(e)) return;
			return H$2(e.replace(b, "0"), k) ? `calc(${e})` : e;
		}
		return M(t) ? t : void 0;
	}
	if (Z$2(e)) return e;
}
function E(e = {}, t) {
	if (c$2(t)) {
		const r = t.trim();
		return H$2(r, $) ? r.replace($, (t) => K$3(e, t.replace(/{|}/g, ""))) : r;
	}
	if (Z$2(t)) return t;
}
function I$1(e, t, r) {
	c$2(t, !1) && e.push(`${t}:${r};`);
}
function D$1(e, t) {
	return e ? `${e}{${t}}` : "";
}
var K$1;
var W$1 = ["icon"];
function z(e, t) {
	if (!t || "p" === t || "string" != typeof e || !e) return e;
	const r = /^p-[a-z]/.test(t) ? `p\\-${t.slice(2)}` : t, { css: s, attribute: n } = null != K$1 ? K$1 : (() => {
		const e = `(?!(?:${W$1.join("|")})(?!\\w))`, t = new RegExp(String.raw`\/\*[\s\S]*?(?:\*\/|$)|"(?:[^"\\\n\r\f]|\\[\s\S])*"?|'(?:[^'\\\n\r\f]|\\[\s\S])*'?|\\[\s\S]|(?:^|[^\w\\-])[uU][rR][lL]\((?!\s*["'])[^)]*\)?|(\.p-${e}(?=[a-z]))|(\[\s*[cC][lL][aA][sS][sS]\s*[~^*]=\s*(?:"[ \t]*p-(?:[^"\\\n\r\f]|\\[\s\S])*"?|'[ \t]*p-(?:[^'\\\n\r\f]|\\[\s\S])*'?|p-))`, "g");
		return null != K$1 ? K$1 : K$1 = {
			css: t,
			attribute: new RegExp(String.raw`(=\s*["']?[ \t]*)p-${e}`)
		};
	})();
	return e.replace(s, (e, t, s) => t ? `.${r}-` : s ? s.replace(n, (e, t) => `${t}${r}-`) : e);
}
function U$1(e, t) {
	let r = e.indexOf("dt(");
	if (-1 === r) return e;
	const s = [];
	for (; -1 !== r;) {
		let t = 1, n = e.indexOf("dt(", r + 3), i = e.indexOf(")", r + 3);
		for (; -1 !== i;) if (-1 !== n && n < i) t++, n = e.indexOf("dt(", n + 3);
		else {
			if (0 === --t) break;
			i = e.indexOf(")", i + 1);
		}
		if (-1 === i) break;
		s.push([r, i]), r = e.indexOf("dt(", i + 1);
	}
	if (!s.length) return e;
	const n = new Array(s.length);
	for (let r = s.length - 1; r >= 0; r--) {
		const [i, o] = s[r];
		n[r] = String(t(...Z(e.slice(i + 3, o), t)));
	}
	let i = "", o = 0;
	for (let t = 0; t < s.length; t++) i += e.slice(o, s[t][0]) + n[t], o = s[t][1] + 1;
	return i + e.slice(o);
}
function Z(e, t) {
	const r = [];
	let s = 0, n = null, i = 0;
	for (let o = 0; o <= e.length; o++) {
		const l = e[o];
		if ("\"" !== l && "'" !== l && "`" !== l || "\\" === e[o - 1] || (n = n === l ? null : l), !n && ("(" === l && i++, ")" === l && i--, ("," === l || o === e.length) && 0 === i)) {
			const n = e.slice(s, o).trim();
			r.push(n.startsWith("dt(") ? U$1(n, t) : q$1(n)), s = o + 1;
		}
	}
	return r;
}
function q$1(e) {
	const t = e[0];
	if (("\"" === t || "'" === t || "`" === t) && e[e.length - 1] === t) return e.slice(1, -1);
	const r = Number(e);
	return isNaN(r) ? e : r;
}
var F$1 = "primeui.base";
function G$1(e, t) {
	const r = null == t ? void 0 : t.replace(/^@layer\s*/, "").replace(/;\s*$/, "").trim();
	if (e && r) {
		const t = r.split(",").map((e) => e.trim()), s = t.indexOf(e.slice(0, e.lastIndexOf(".")));
		if (s > 0) return t.splice(s + 1, 0, e), `@layer ${t.join(",")};`;
	}
	const s = [e, r].filter(l$1).join(",");
	return l$1(s) ? `@layer ${s};` : t;
}
function H(e) {
	return 4 === e.length ? `#${e[1]}${e[1]}${e[2]}${e[2]}${e[3]}${e[3]}` : e;
}
function J(e) {
	const t = parseInt(e.substring(1), 16);
	return {
		r: t >> 16 & 255,
		g: t >> 8 & 255,
		b: 255 & t
	};
}
var Q$1 = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
var X = (e, t, r) => {
	if (!Q$1.test(e) || !Q$1.test(t)) return t;
	e = H(e), t = H(t);
	const s = (2 * (r / 100) - 1 + 1) / 2, n = 1 - s, i = J(e), o = J(t);
	return function(e, t, r) {
		return `#${e.toString(16).padStart(2, "0")}${t.toString(16).padStart(2, "0")}${r.toString(16).padStart(2, "0")}`;
	}(Math.round(i.r * s + o.r * n), Math.round(i.g * s + o.g * n), Math.round(i.b * s + o.b * n));
};
var Y = (e, t) => X("#000000", e, t);
var ee = (e, t) => X("#ffffff", e, t);
var me = {
	variable: {
		prefix: "p",
		selector: ":root,:host",
		excludedKeyRegex: /^(primitive|semantic|components|directives|variables|colorscheme|light|dark|common|root|states|extend|css)$/gi
	},
	options: {
		prefix: "p",
		darkModeSelector: "system",
		cssLayer: !1,
		cssVariables: !0,
		scoped: !1
	}
};
var ge = (e, t, r) => ({
	name: t,
	theme: e.theme,
	params: r,
	defaults: e.defaults,
	region: e._region(),
	set: { layerNames: e.setLayerNames.bind(e) },
	dt: e._dt
});
var ve = /^[A-Za-z_][\w-]*$/;
var ye = (e) => {
	if (void 0 !== e && "" !== e && ("string" != typeof e || !ve.test(e))) throw new TypeError("[primeuix] classPrefix takes letters, digits, \"_\" or \"-\".");
};
var Se = class {
	constructor(e) {
		this.defaults = me, this._theme = void 0, this._layerNames = /* @__PURE__ */ new Set(), this._loadedStyleNames = /* @__PURE__ */ new Set(), this._loadingStyles = /* @__PURE__ */ new Set(), this._tokens = {}, this._scopedTokenPaths = /* @__PURE__ */ new Set();
		for (let e = Object.getPrototypeOf(this); e && e !== Object.prototype; e = Object.getPrototypeOf(e)) for (const t of Object.getOwnPropertyNames(e)) "constructor" === t || Object.prototype.hasOwnProperty.call(this, t) || Object.defineProperty(this, t, a(l({}, Object.getOwnPropertyDescriptor(e, t)), { enumerable: !0 }));
		this.service = e;
	}
	static get defaults() {
		return me;
	}
	_styleId() {
		return this.key ? this.styleName.bind(this) : void 0;
	}
	_region() {}
	styleName(e) {
		var t;
		const { prefix: r = "p", classPrefix: s = "p" } = this.options, n = null != (t = this.key) ? t : "p" === s ? "" : `${r}-${s}`;
		return n ? `${e}@${n}` : e;
	}
	update(e = {}) {
		const { theme: t } = e;
		if (t) {
			const e = l(l({}, this.defaults.options), t.options);
			ye(e.classPrefix), this._theme = a(l({}, t), { options: e }), this._tokens = Be.createTokens(this.preset, this.defaults), this.resetCaches();
		}
	}
	get theme() {
		return this._theme;
	}
	get preset() {
		var e;
		return (null == (e = this.theme) ? void 0 : e.preset) || {};
	}
	get options() {
		var e;
		return (null == (e = this.theme) ? void 0 : e.options) || {};
	}
	get tokens() {
		return this._tokens;
	}
	hasScopedTokenPath(e) {
		return this._scopedTokenPaths.has(e);
	}
	getScopedTokenPaths() {
		return [...this._scopedTokenPaths];
	}
	addScopedToken(e) {
		let t = !1;
		return l$1(e) && N$1(e).forEach((e) => {
			const r = ae(e);
			this._scopedTokenPaths.has(r) || (this._scopedTokenPaths.add(r), t = !0);
		}), t;
	}
	clearScopedTokenPaths() {
		this._scopedTokenPaths.clear();
	}
	getTheme() {
		return this.theme;
	}
	setTheme(e) {
		this.update({ theme: e }), this.service.emit("theme:change", e);
	}
	getPreset() {
		return this.preset;
	}
	setPreset(e) {
		this._theme = a(l({}, this.theme), { preset: e }), this._tokens = Be.createTokens(e, this.defaults), this.resetCaches(), this.service.emit("preset:change", e), this.service.emit("theme:change", this.theme);
	}
	getOptions() {
		return this.options;
	}
	setOptions(e) {
		ye(null == e ? void 0 : e.classPrefix), this._theme = a(l({}, this.theme), { options: e }), this.resetStyleCaches(), this.service.emit("options:change", e), this.service.emit("theme:change", this.theme);
	}
	resetStyleCaches() {
		this.clearLoadedStyleNames(), this.clearLayerNames();
	}
	resetCaches() {
		this.resetStyleCaches(), this.clearScopedTokenPaths();
	}
	getLayerNames() {
		return [...this._layerNames];
	}
	setLayerNames(e) {
		this._layerNames.add(e);
	}
	clearLayerNames() {
		this._layerNames.clear();
	}
	getLoadedStyleNames() {
		return this._loadedStyleNames;
	}
	isStyleNameLoaded(e) {
		return this._loadedStyleNames.has(e);
	}
	setLoadedStyleName(e) {
		this._loadedStyleNames.add(e);
	}
	deleteLoadedStyleName(e) {
		this._loadedStyleNames.delete(e);
	}
	clearLoadedStyleNames() {
		this._loadedStyleNames.clear();
	}
	getTokenValue(e) {
		return Be.getTokenValue(this.tokens, e, this.defaults);
	}
	getCommon(e = "", t) {
		return Be.getCommon(ge(this, e, t));
	}
	getComponent(e = "", t) {
		return Be.getPresetC(ge(this, e, t));
	}
	getDirective(e = "", t) {
		return Be.getPresetD(ge(this, e, t));
	}
	getCustomPreset(e = "", t, r, s) {
		var n, i, o;
		const c = l({}, this._region());
		return r && Object.assign(c, {
			selector: null != (i = null == (n = c.within) ? void 0 : n.call(c, r)) ? i : r,
			darkSelector: null == (o = c.within) ? void 0 : o.call(c, r, !0)
		}), Be.getPreset(a(l({}, ge(this, e, s)), {
			preset: t,
			options: this.options,
			region: c,
			isScopedTokenPaths: !0
		}));
	}
	getLayerOrderCSS(e = "") {
		return Be.getLayerOrder(e, this.options, { names: this.getLayerNames() }, this.defaults);
	}
	transformCSS(e = "", t, r = "style", s) {
		return Be.transformCSS(e, t, s, r, this.options, { layerNames: this.setLayerNames.bind(this) }, this.defaults, void 0, this._region());
	}
	getCommonStyleSheet(e = "", t, r = {}, s) {
		return Be.getCommonStyleSheet(a(l({}, ge(this, e, t)), {
			props: r,
			styleId: null != s ? s : this._styleId()
		}));
	}
	getStyleSheet(e, t, r = {}, s) {
		return Be.getStyleSheet(a(l({}, ge(this, e, t)), {
			props: r,
			styleId: null != s ? s : this._styleId()
		}));
	}
	onStyleMounted(e) {
		this._loadingStyles.add(e);
	}
	onStyleUpdated(e) {
		this._loadingStyles.add(e);
	}
	onStyleLoaded(e, { name: t }) {
		this._loadingStyles.size && (this._loadingStyles.delete(t), this.service.emit(`theme:${t}:load`, e), this._loadingStyles.size || this.service.emit("theme:load"));
	}
};
var $e = /* @__PURE__ */ new Se(d);
var xe = (e, t, r, s, n, i) => {
	if ("string" != typeof t) return null != t ? t : e.getTokenValue(r);
	if ($.lastIndex = 0, !$.test(t)) return t;
	const o = r.slice(0, r.indexOf("."));
	return V(t.replace($, (t) => {
		const r = t.slice(1, -1), s = r.indexOf(".");
		if ((-1 === s ? r : r.slice(0, s)) !== o) return t;
		const n = e.getTokenValue(r);
		return null == n ? t : `${n}`;
	}), void 0, s, [n], i);
};
var Oe = (e, t, r, s, n) => {
	var i, o, l, a;
	const c = ((e, t) => {
		const r = e.split(".");
		let s = "";
		for (let e = 0; e < r.length; e++) {
			const n = x(r[e]);
			t.lastIndex = 0, t.test(n) || (s = s ? `${s}.${n}` : n);
		}
		return s;
	})(t, s), u = e.tokens;
	let d = Be._caches.strict.get(u);
	d || Be._caches.strict.set(u, d = /* @__PURE__ */ new Map());
	const h = null == n || "object" != typeof n, p = h && null != n ? `${r}|${c}|${n}` : `${r}|${c}`;
	let f = h ? d.get(p) : void 0;
	if (!(void 0 !== f || h && d.has(p))) {
		const t = null == (i = u[c]) ? void 0 : i.paths, m = null == t ? void 0 : t.find((e) => "none" === e.scheme), g = null != (o = null == t ? void 0 : t.find((e) => "light" === e.scheme)) ? o : m, v = null != (l = null == t ? void 0 : t.find((e) => "dark" === e.scheme)) ? l : m;
		if (g && v && g !== v) {
			const t = xe(e, g.value, c, r, s, n), i = xe(e, v.value, c, r, s, n);
			f = t === i ? t : `light-dark(${t},${i})`;
		} else f = xe(e, null == (a = null != g ? g : v) ? void 0 : a.value, c, r, s, n);
		"string" != typeof f || M(f) || (f = void 0), h && d.set(p, f);
	}
	return e.hasScopedTokenPath(c) ? V(`{${c}}`, void 0, r, [s], f) : f;
};
var _e = (e) => we($e, e);
var we = (e, t) => {
	var r, s, n;
	const i = e.getTheme(), o = `${null != (r = je(e, i, t, void 0, "variable")) ? r : ""}`;
	return {
		name: null != (n = null == (s = o.match(/--[\w-]+/g)) ? void 0 : s[0]) ? n : "",
		variable: o,
		value: je(e, i, t, void 0, "value")
	};
};
var Ce = (e, t, r) => je($e, $e.getTheme(), e, t, r);
var Pe = (e = {}, t, r, s) => je($e, e, t, r, s);
var je = (e, t = {}, r, s, n) => {
	var i, o, l, a, c;
	if (!r) return "";
	const u = e.defaults, d = null == t ? void 0 : t.options, h = null == u ? void 0 : u.variable, p$1 = null != (o = null == d ? void 0 : d.prefix) ? o : null == (i = null == u ? void 0 : u.options) ? void 0 : i.prefix, f = null == (c = null != (a = null == d ? void 0 : d.cssVariables) ? a : null == (l = null == u ? void 0 : u.options) ? void 0 : l.cssVariables) || c;
	if ("value" === n) return e.getTokenValue(r);
	if (p(n) && !f) return Oe(e, r, p$1, h.excludedKeyRegex, s);
	const m = "object" == typeof s && null !== s || !h.excludedKeyRegex ? void 0 : Ae(h.excludedKeyRegex), g = m && `${p$1}\0${r}\0${null != s ? s : ""}\0${void 0 === s ? 0 : "number" == typeof s ? 1 : 2}`;
	let v = null == m ? void 0 : m.get(g);
	if (void 0 === v && !(null == m ? void 0 : m.has(g))) v = V(H$2(r, $) ? r : `{${r}}`, void 0, p$1, [h.excludedKeyRegex], s), m && (m.size >= Ne && m.clear(), m.set(g, v));
	return v;
};
var Ne = 4096;
var Te = /* @__PURE__ */ new WeakMap();
var Ae = (e) => {
	let t = Te.get(e);
	return t || Te.set(e, t = /* @__PURE__ */ new Map()), t;
};
var Me = (...e) => {
	var t;
	return `${null != (t = Ce(...e)) ? t : ""}`;
};
function Ie(e, ...t) {
	var r;
	const s = null == (r = $e.getOptions()) ? void 0 : r.classPrefix;
	if (e instanceof Array) return z(U$1(e.reduce((e, r, s) => {
		var n;
		return e + r + (null != (n = x$2(t[s], { dt: Ce })) ? n : "");
	}, ""), Me), s);
	return z(x$2(e, { dt: Ce }), s);
}
var Ke = (e = {}, t = $e) => {
	let { preset: r, options: s } = e;
	return {
		preset(e) {
			return r = r ? Q$3(r, e) : e, this;
		},
		options(e) {
			return s = s ? l(l({}, s), e) : e, this;
		},
		primaryPalette(e) {
			const { semantic: t } = r || {};
			return r = a(l({}, r), { semantic: a(l({}, t), { primary: e }) }), this;
		},
		surfacePalette(e) {
			var t, s, n;
			const i = null != (t = null == r ? void 0 : r.semantic) ? t : {}, o = e && Object.prototype.hasOwnProperty.call(e, "light") ? e.light : e, c = e && Object.prototype.hasOwnProperty.call(e, "dark") ? e.dark : e, u = { colorScheme: {
				light: l(l({}, null == (s = i.colorScheme) ? void 0 : s.light), !!o && { surface: o }),
				dark: l(l({}, null == (n = i.colorScheme) ? void 0 : n.dark), !!c && { surface: c })
			} };
			return r = a(l({}, r), { semantic: l(l({}, i), u) }), this;
		},
		define: ({ useDefaultPreset: e = !1, useDefaultOptions: n = !1 } = {}) => ({
			preset: e ? t.getPreset() : r,
			options: n ? t.getOptions() : s
		}),
		update({ mergePresets: e = !0, mergeOptions: n = !0 } = {}) {
			const i = {
				preset: e ? Q$3(t.getPreset(), null != r ? r : {}) : r,
				options: n ? l(l({}, t.getOptions()), s) : s
			};
			return t.setTheme(i), i;
		},
		use(e) {
			const r = this.define(e);
			return t.setTheme(r), r;
		}
	};
};
function Ze(e, t = {}) {
	const r = $e.defaults.variable, { prefix: s = r.prefix, selector: n = r.selector, excludedKeyRegex: i = r.excludedKeyRegex } = t, o = [], l = [], a = [{
		node: e,
		path: s
	}];
	for (; a.length;) {
		const { node: e, path: t } = a.pop();
		for (const r of Object.keys(e)) {
			const n = _(e[r]), c = H$2(r, i) ? P(t) : P(t, fe$1(r));
			if (s$1(n)) a.push({
				node: n,
				path: c
			});
			else {
				const e = j(c), t = V(n, c, s, [i]);
				void 0 === t && "string" == typeof n || I$1(l, e, null == t ? t : `${t}`);
				let r = c;
				s && r.startsWith(s + "-") && (r = r.slice(s.length + 1)), o.push(r.replace(/-/g, "."));
			}
		}
	}
	const c = l.join("");
	return {
		value: l,
		tokens: o,
		declarations: c,
		css: D$1(n, c)
	};
}
var qe = (...e) => [...new Set(e.flatMap((e) => null != e ? e : []))];
var Be = {
	_caches: {
		value: /* @__PURE__ */ new WeakMap(),
		strict: /* @__PURE__ */ new WeakMap()
	},
	regex: {
		rules: {
			class: {
				pattern: /^\.([a-zA-Z][\w-]*)$/,
				resolve(e) {
					return {
						type: "class",
						selector: e,
						matched: this.pattern.test(e.trim())
					};
				}
			},
			attr: {
				pattern: /^\[(.*)\]$/,
				resolve(e) {
					return {
						type: "attr",
						selector: `:root${e},${/^(\[[^\]]*\])+$/.test(e.trim()) ? `:host(${e})` : `:host${e}`}`,
						matched: this.pattern.test(e.trim())
					};
				}
			},
			media: {
				pattern: /^@media (.*)$/,
				resolve(e) {
					return {
						type: "media",
						selector: e,
						matched: this.pattern.test(e.trim())
					};
				}
			},
			system: {
				pattern: /^system$/,
				resolve(e) {
					return {
						type: "system",
						selector: "@media (prefers-color-scheme: dark)",
						matched: this.pattern.test(e.trim())
					};
				}
			},
			custom: { resolve: (e) => ({
				type: "custom",
				selector: e,
				matched: !0
			}) }
		},
		resolve(e) {
			const t = Object.keys(this.rules).filter((e) => "custom" !== e).map((e) => this.rules[e]);
			return [e].flat().map((e) => {
				var r;
				return null != (r = t.map((t) => t.resolve(e)).find((e) => e.matched)) ? r : this.rules.custom.resolve(e);
			});
		}
	},
	_toVariables: (e, t) => Ze(e, { prefix: null == t ? void 0 : t.prefix }),
	getCommon({ name: e = "", theme: t = {}, params: r, set: s, defaults: n, selector: i, region: o, dt: l }) {
		const { preset: a, options: u } = t;
		let d, h, p, f, m, g, v;
		if (l$1(a)) {
			const { primitive: t, semantic: r, extend: y } = a, S = r || {}, { colorScheme: $ } = S, k = c(S, ["colorScheme"]), b = y || {}, { colorScheme: x } = b, O = c(b, ["colorScheme"]), _ = $ || {}, { dark: w } = _, C = c(_, ["dark"]), P = x || {}, { dark: j } = P, N = c(P, ["dark"]), T = (e, t) => {
				var r;
				const s = l$1(t) ? this._toVariables({ [e]: t }, u) : {};
				return [null != (r = s.declarations) ? r : "", s.tokens];
			}, [A, L] = T("primitive", t), [R, M] = T("semantic", k), [V, E] = T("light", C), [I, D] = T("dark", w), [K, W] = T("semantic", O), [U, Z] = T("light", N), [q, B] = T("dark", j);
			d = this.transformCSS(e, A, "light", "variable", u, s, n, i, o), h = L;
			p = `${this.transformCSS(e, `${R}${V}`, "light", "variable", u, s, n, i, o)}${this.transformCSS(e, `${I}`, "dark", "variable", u, s, n, i, o)}`, f = qe(M, E, D);
			m = `${this.transformCSS(e, `${K}${U}color-scheme:light`, "light", "variable", u, s, n, i, o)}${this.transformCSS(e, `${q}color-scheme:dark`, "dark", "variable", u, s, n, i, o)}`, g = qe(W, Z, B), v = z(x$2(a.css, { dt: null != l ? l : Ce }), null == u ? void 0 : u.classPrefix);
		}
		return {
			primitive: {
				css: d,
				tokens: h
			},
			semantic: {
				css: p,
				tokens: f
			},
			global: {
				css: m,
				tokens: g
			},
			style: v
		};
	},
	getPreset({ name: e = "", preset: t = {}, options: r, params: s, set: n, defaults: i, selector: o, region: a, isScopedTokenPaths: u, dt: d }) {
		var h, p, f, m;
		let g, v, y;
		if (l$1(t) && (null == (h = null == r ? void 0 : r.cssVariables) || h || u)) {
			const s = e.replace("-directive", ""), u = t, { colorScheme: h, extend: S, css: $ } = u, k = c(u, [
				"colorScheme",
				"extend",
				"css"
			]), b = S || {}, { colorScheme: x } = b, O = c(b, ["colorScheme"]), _ = h || {}, { dark: w } = _, C = c(_, ["dark"]), P = x || {}, { dark: j } = P, N = c(P, ["dark"]), T = l$1(k) ? this._toVariables({ [s]: l(l({}, k), O) }, r) : {}, A = l$1(C) ? this._toVariables({ [s]: l(l({}, C), N) }, r) : {}, L = l$1(w) ? this._toVariables({ [s]: l(l({}, w), j) }, r) : {};
			g = `${this.transformCSS(s, `${null != (p = T.declarations) ? p : ""}${null != (f = A.declarations) ? f : ""}`, "light", "variable", r, n, i, o, a)}${this.transformCSS(s, null != (m = L.declarations) ? m : "", "dark", "variable", r, n, i, o, a)}`, v = qe(T.tokens, A.tokens, L.tokens), y = z(x$2($, { dt: null != d ? d : Ce }), null == r ? void 0 : r.classPrefix);
		}
		return {
			css: g,
			tokens: v,
			style: y
		};
	},
	getScopedSelector(e, t) {
		if ((null == t ? void 0 : t.scoped) && e) return `[data-styled="${e}"]`;
	},
	withinRuntime: (e, t) => e && t ? `${t} ${e}` : null != e ? e : t,
	withinRegion(e, t, r = {}) {
		var s;
		const n = e && !t && (null == (s = r.within) ? void 0 : s.call(r, e));
		return a(l({}, r), n ? {
			selector: n,
			darkSelector: r.within(e, !0)
		} : {
			selector: this.withinRuntime(e, null != t ? t : r.selector),
			darkSelector: r.darkSelector && this.withinRuntime(e, r.darkSelector)
		});
	},
	getPresetC({ name: e = "", theme: t = {}, params: r, set: s, defaults: n, selector: i, region: o, dt: l }) {
		var a;
		const { preset: c, options: u } = t, d = null == (a = null == c ? void 0 : c.components) ? void 0 : a[e], h = this.getScopedSelector(e, u);
		return this.getPreset({
			name: e,
			preset: d,
			options: u,
			params: r,
			set: s,
			defaults: n,
			region: this.withinRegion(h, i, o),
			dt: l
		});
	},
	getPresetD({ name: e = "", theme: t = {}, params: r, set: s, defaults: n, selector: i, region: o, dt: l }) {
		var a, c;
		const u = e.replace("-directive", ""), { preset: d, options: h } = t, p = (null == (a = null == d ? void 0 : d.components) ? void 0 : a[u]) || (null == (c = null == d ? void 0 : d.directives) ? void 0 : c[u]), f = this.getScopedSelector(u, h);
		return this.getPreset({
			name: u,
			preset: p,
			options: h,
			params: r,
			set: s,
			defaults: n,
			region: this.withinRegion(f, i, o),
			dt: l
		});
	},
	applyDarkColorScheme(e) {
		const t = e.darkModeSelector;
		return !("none" === t || !1 === t);
	},
	getColorSchemeOption(e, t) {
		var r;
		return this.applyDarkColorScheme(e) ? this.regex.resolve(!0 === e.darkModeSelector ? t.options.darkModeSelector : null != (r = e.darkModeSelector) ? r : t.options.darkModeSelector) : [];
	},
	getLayerOrder(e, t = {}, r, s) {
		const { cssLayer: n } = t;
		if (n) return `@layer ${x$2(n.order || n.name || "primeui", r)}`;
		return "";
	},
	getCommonStyleSheet({ name: e = "", theme: t = {}, params: r, props: s = {}, set: n, defaults: i, selector: o, region: l, styleId: a = (e) => e, dt: c }) {
		const u = this.getCommon({
			name: e,
			theme: t,
			params: r,
			set: n,
			defaults: i,
			selector: o,
			region: l,
			dt: c
		}), d = K$2(s).join(" ");
		return Object.entries(u || {}).reduce((e, [t, r]) => {
			if (s$1(r) && Object.prototype.hasOwnProperty.call(r, "css")) {
				const s = B(r.css);
				e.push(`<style type="text/css" ${this.styleIdAttributes(a(`${t}-variables`))} ${d}>${Q$2(s)}</style>`);
			}
			return e;
		}, []).join("");
	},
	getStyleSheet({ name: e = "", theme: t = {}, params: r, props: s = {}, set: n, defaults: i, selector: o, region: l, styleId: a = (e) => e, dt: c }) {
		var u;
		const d = {
			name: e,
			theme: t,
			params: r,
			set: n,
			defaults: i,
			selector: o,
			region: l,
			dt: c
		}, h = null == (u = e.includes("-directive") ? this.getPresetD(d) : this.getPresetC(d)) ? void 0 : u.css, p = K$2(s).join(" ");
		return h ? `<style type="text/css" ${this.styleIdAttributes(a(`${e}-variables`))} ${p}>${Q$2(B(h))}</style>` : "";
	},
	styleIdAttributes: (e) => `data-primevue-style-id="${J$1(e)}"`,
	createTokens(e = {}, t, r = "", s = "", n = /* @__PURE__ */ Object.create(null)) {
		const i = function(e, t, r, s) {
			return e.replace($, (e) => {
				var n;
				const i = e.slice(1, -1), o = this.tokens[i];
				if (!o) return console.warn(`Token not found for path: ${i}`), "__UNRESOLVED__";
				const l = o.computed(t, r, s);
				if (Array.isArray(l) && 2 === l.length) {
					const e = l[0].value, t = l[1].value;
					return e === t ? null != e ? e : "__UNRESOLVED__" : `light-dark(${e},${t})`;
				}
				return null != (n = null == l ? void 0 : l.value) ? n : "__UNRESOLVED__";
			});
		}, o = function(e, t, r, s) {
			if (-1 === e.indexOf("light-dark(")) return e;
			const n = [], l = e.length;
			let a = 0;
			for (; a < l;) {
				const c = e.indexOf("light-dark(", a);
				if (-1 === c) {
					n.push(e.slice(a));
					break;
				}
				n.push(e.slice(a, c));
				let u = 1, d = c + 11, h = -1;
				for (; d < l && u > 0;) {
					const t = e.charCodeAt(d);
					40 === t ? u++ : 41 === t ? u-- : 44 === t && 1 === u && -1 === h && (h = d), d++;
				}
				if (0 !== u || -1 === h) {
					n.push(e.slice(c));
					break;
				}
				const p = e.slice(c + 11, h).trim(), f = e.slice(h + 1, d - 1).trim();
				if ("light" === t || "dark" === t) n.push(o.call(this, "light" === t ? p : f, t, r, s));
				else {
					const e = i.call(this, o.call(this, p, "light", r, s), "light", r, s), t = i.call(this, o.call(this, f, "dark", r, s), "dark", r, s);
					n.push(e === t ? e : `light-dark(${e},${t})`);
				}
				a = d;
			}
			return n.join("");
		}, l = function(e, t = {}, r = []) {
			if (r.includes(this.path)) return console.warn(`Circular reference detected at ${this.path}`), {
				colorScheme: e,
				path: this.path,
				paths: t,
				value: void 0
			};
			r.push(this.path), t.name = this.path, t.binding || (t.binding = {});
			let s = this.value;
			if ("string" == typeof this.value) {
				const n = this.value.trim(), l = -1 !== n.indexOf("light-dark("), a = -1 !== n.indexOf("{");
				if (l || a) {
					const a = l ? o.call(this, n, e, t, r) : n, c = -1 !== a.indexOf("{") ? i.call(this, a, e, t, r) : a;
					k.lastIndex = 0, b.lastIndex = 0, s = k.test(c.replace(b, "0")) ? `calc(${c})` : c;
				}
			}
			return p(t.binding) && delete t.binding, r.pop(), {
				colorScheme: e,
				path: this.path,
				paths: t,
				value: "string" == typeof s && -1 !== s.indexOf("__UNRESOLVED__") ? void 0 : s
			};
		}, a = (e, r, s) => {
			Object.entries(e).forEach(([e, i]) => {
				const o = H$2(e, t.variable.excludedKeyRegex) ? r : r ? `${r}.${x(e)}` : x(e), c = s ? [s, e].join(".") : e;
				if (s$1(i)) a(i, o, c);
				else {
					const e = {
						path: c,
						value: i,
						scheme: c.includes("colorScheme.light") ? "light" : c.includes("colorScheme.dark") ? "dark" : "none",
						computed: l,
						tokens: n
					}, t = n[o];
					if (t) t.paths.push(e);
					else {
						const t = { paths: [e] };
						t.computed = ((e) => (t, r = {}, s = []) => {
							const n = e.paths;
							if (1 === n.length) {
								const e = n[0], i = "none" !== e.scheme ? e.scheme : t;
								return e.computed(i, r.binding, s);
							}
							if (t && "none" !== t) for (let e = 0; e < n.length; e++) {
								const i = n[e];
								if (i.scheme === t) return i.computed(t, r.binding, s);
							}
							return n.map((e) => e.computed(e.scheme, r[e.scheme], s));
						})(t), n[o] = t;
					}
				}
			});
		};
		return a(e, r, s), n;
	},
	getTokenValue(e, t, r) {
		let s = this._caches.value.get(e);
		s || this._caches.value.set(e, s = /* @__PURE__ */ new Map());
		const n = s.get(t);
		if (void 0 !== n || s.has(t)) return n;
		const i = r.variable.excludedKeyRegex, o = t.split("."), l = [];
		for (let e = 0; e < o.length; e++) {
			const t = o[e];
			i.lastIndex = 0, i.test(t.toLowerCase()) || l.push(t);
		}
		const a = l.join("."), c = -1 !== t.indexOf("colorScheme.light") ? "light" : -1 !== t.indexOf("colorScheme.dark") ? "dark" : void 0, u = e[a];
		if (!(null == u ? void 0 : u.paths)) return void s.set(t, void 0);
		const d = (e) => {
			var t;
			const r = u.computed(e);
			return Array.isArray(r) ? null == (t = r.find((t) => (null == t ? void 0 : t.colorScheme) === e)) ? void 0 : t.value : null == r ? void 0 : r.value;
		};
		let h;
		if (c) h = d(c);
		else {
			const e = d("light"), t = d("dark");
			h = void 0 === e && void 0 === t ? void 0 : void 0 === e ? t : void 0 === t || e === t ? e : `light-dark(${e},${t})`;
		}
		return s.set(t, h), h;
	},
	getSelectorRule(e, t, r, s, n = ":root,:host", i) {
		if ("class" === r || "attr" === r) {
			if (!t) return D$1(e, s);
			const n = e.split(/,(?=:host\()/).flatMap((e) => {
				if (e.startsWith(":host")) return [`${e} ${t}`];
				return [("attr" === r && /^:root(\[[^\]]*\])+$/.test(e) ? e.slice(5) : e) + t, `${e} ${t}`];
			});
			return D$1((null == i ? void 0 : i.darkSelector) ? [...n, i.darkSelector].join(",") : n.join(","), s);
		}
		return D$1(e, D$1(null != t ? t : n, s));
	},
	transformCSS(e, t, r, s, n = {}, i, o, l, a) {
		var c, u;
		if (l$1(t)) {
			const { cssLayer: d } = n;
			if ("style" === s) t = z(t, n.classPrefix), null != a && a.scope && (t = a.scope(t));
			else {
				const e = this.getColorSchemeOption(n, o), s = null != (u = null == (c = null == o ? void 0 : o.variable) ? void 0 : c.selector) ? u : ":root,:host", i = null != l ? l : null == a ? void 0 : a.selector;
				t = "dark" === r ? e.reduce((e, { type: r, selector: n }) => (l$1(n) && (e += n.includes("[CSS]") ? n.replace("[CSS]", () => t) : this.getSelectorRule(n, i, r, t, s, a)), e), "") : D$1(null != i ? i : s, t);
			}
			if (d) {
				const r = {
					name: "primeui",
					order: "primeui"
				};
				s$1(d) && (r.name = x$2(d.name, {
					name: e,
					type: s
				})), l$1(r.name) && (t = D$1(`@layer ${r.name}`, t), null == i || i.layerNames(r.name));
			}
			return t;
		}
		return "";
	}
};
var Fe = [
	50,
	100,
	200,
	300,
	400,
	500,
	600,
	700,
	800,
	900,
	950
];
var Ge = (e) => {
	if (H$2(e, $)) {
		const t = e.replace(/{|}/g, "");
		return Fe.reduce((e, r) => (e[r] = `{${t}.${r}}`, e), {});
	}
	return Fe.reduce((t, r, s) => (t[r] = s <= 5 ? ee(e, 19 * (5 - s)) : Y(e, 15 * (s - 5)), t), {});
};
// ../node_modules/@primeuix/styled/dist/index.mjs
function U(e, ...t) {
	return F$2(e, ...t);
}
var W = (e) => {
	let s = q.get(e);
	return s || (s = {
		usePreset(t, ...s) {
			const r = F$2(t, ...s);
			return e.setPreset(r), r;
		},
		updatePreset(...t) {
			const s = F$2(e.getPreset(), ...t);
			return e.setPreset(s), s;
		},
		useTheme: (s) => Ke(s, e).update({
			mergePresets: !1,
			mergeOptions: !1
		}),
		updatePrimaryPalette: (s) => Ke({}, e).primaryPalette(null != s ? s : {}).update().preset,
		updateSurfacePalette: (s) => Ke({}, e).surfacePalette(null != s ? s : {}).update().preset
	}, q.set(e, s)), s;
};
var q = /* @__PURE__ */ new WeakMap();
function D(...e) {
	const t = F$2($e.getPreset(), ...e);
	return $e.setPreset(t), t;
}
function F(e) {
	return Ke().primaryPalette(null != e ? e : {}).update().preset;
}
function G(e) {
	return Ke().surfacePalette(null != e ? e : {}).update().preset;
}
function I(e, ...t) {
	const s = F$2(e, ...t);
	return $e.setPreset(s), s;
}
function K(e) {
	return Ke(e).update({
		mergePresets: !1,
		mergeOptions: !1
	});
}
var Q = class {
	constructor({ attrs: e } = {}) {
		this._styles = /* @__PURE__ */ new Map(), this._attrs = e || {};
	}
	get(e) {
		return this._styles.get(e);
	}
	has(e) {
		return this._styles.has(e);
	}
	delete(e) {
		this._styles.delete(e);
	}
	clear() {
		this._styles.clear();
	}
	add(e, t) {
		if (l$1(t)) {
			const s = {
				name: e,
				css: t,
				attrs: this._attrs,
				markup: tt(t, this._attrs)
			};
			this._styles.set(e, a(l({}, s), { element: this.createStyleElement(s) }));
		}
	}
	update() {}
	getStyles() {
		return this._styles;
	}
	getAllCSS() {
		return [...this._styles.values()].map((e) => e.css).filter((e) => !!e);
	}
	getAllMarkup() {
		return [...this._styles.values()].map((e) => e.markup).filter((e) => !!e);
	}
	getAllElements() {
		return [...this._styles.values()].map((e) => e.element);
	}
	createStyleElement(e = {}) {}
};
export { L$1 as $, Y as A, ue as At, x as B, O as C, nt as Ct, V as D, pt as Dt, U$1 as E, pe as Et, d as F, xt as Ft, D$2 as G, Bt as H, ee as I, ye$1 as It, G$2 as J, Dt as K, j as L, z$1 as Lt, _ as M, wt as Mt, _e as N, x$1 as Nt, W$1 as O, q$2 as Ot, b as P, xe$1 as Pt, K$2 as Q, k as R, N as S, me$1 as St, Pe as T, ot as Tt, C$1 as U, $$1 as V, Ct as W, It as X, Gt as Y, J$1 as Z, G$1 as _, h as _t, K as a, V$1 as at, Ie as b, kt as bt, W as c, Wt as ct, Be as d, Z$1 as dt, M$1 as et, C as f, Zt as ft, F$1 as g, ft as gt, E as h, fe as ht, I as i, Se$1 as it, Ze as j, v as jt, X as k, rt as kt, $ as l, Xt as lt, D$1 as m, be as mt, F as n, R$1 as nt, Q as o, Vt as ot, Ce as p, b$1 as pt, Ft as q, G as r, S as rt, U as s, W$2 as st, D as t, Q$2 as tt, $e as u, Y$1 as ut, Ge as v, it as vt, P as w, oe as wt, Ke as x, le as xt, I$1 as y, j$1 as yt, w as z };
