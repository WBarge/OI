import { Al as ɵɵdefineInjectable, Bc as PLATFORM_ID, Di as provideAppInitializer, Fn as Injectable, Rc as NgZone, Tl as signal, Wi as setClassMetadata, _c as DOCUMENT, _l as makeEnvironmentProviders, dl as inject, il as effect, jo as ɵɵgetInheritedFactory, kc as InjectionToken, qt as untracked, vc as DestroyRef } from "./core-BRnM5AcM.js";
import { FilterMatchMode } from "./primeng_api.js";
import { Wn as Subject } from "./zipWith-C1pHxpjx.js";
import { F as d$1, N as _e, Q as K$1, V as $$1, Z as J$1, b as Ie, d as Be, it as Se, mt as be, p as Ce, tt as Q$1, u as $e } from "./dist-BnkFXv39.js";
import { E as x$1, n as B$1 } from "./dist-D971aPsi.js";
import { d as isPlatformServer } from "./common-BHJivUlT.js";
import { a as prefixSelector, i as prefixClasses, n as getClassPrefix } from "./primeng-utils-Ddwu4wH2.js";
import { n as _objectSpread2, r as _defineProperty } from "./asyncToGenerator-CE9zIWF7.js";
// ../node_modules/@primeuix/styles/dist/base/index.mjs
var n$1 = "\n@layer primeui.base {\n    :where(:is([data-scope], [data-pc-section])),\n    :where(:is([data-scope], [data-pc-section]))::before,\n    :where(:is([data-scope], [data-pc-section]))::after {\n        box-sizing: border-box;\n    }\n\n    :where(button:is([data-scope], [data-pc-section])),\n    :where([type='button']:is([data-scope], [data-pc-section])),\n    :where([type='reset']:is([data-scope], [data-pc-section])),\n    :where([type='submit']:is([data-scope], [data-pc-section])) {\n        appearance: button;\n        background-color: transparent;\n        background-image: none;\n        border: 0 solid;\n        border-radius: 0;\n        padding: 0;\n        margin: 0;\n        font: inherit;\n        font-feature-settings: inherit;\n        font-variation-settings: inherit;\n        letter-spacing: inherit;\n        color: inherit;\n        text-align: inherit;\n        text-transform: none;\n        cursor: pointer;\n    }\n\n    :where(button:disabled:is([data-scope], [data-pc-section])) {\n        cursor: default;\n    }\n\n    :where(input:is([data-scope], [data-pc-section])),\n    :where(select:is([data-scope], [data-pc-section])),\n    :where(textarea:is([data-scope], [data-pc-section])),\n    :where(optgroup:is([data-scope], [data-pc-section])) {\n        appearance: none;\n        background-color: transparent;\n        background-image: none;\n        border: 0 solid;\n        border-radius: 0;\n        padding: 0;\n        margin: 0;\n        font: inherit;\n        font-feature-settings: inherit;\n        font-variation-settings: inherit;\n        letter-spacing: inherit;\n        color: inherit;\n        opacity: 1;\n    }\n\n    :where(textarea:is([data-scope], [data-pc-section])) {\n        resize: vertical;\n    }\n\n    :where(:is([data-scope], [data-pc-section]))::placeholder {\n        opacity: 1;\n        color: color-mix(in oklab, currentcolor 50%, transparent);\n    }\n\n    :where(:is([data-scope], [data-pc-section]))::-webkit-inner-spin-button,\n    :where(:is([data-scope], [data-pc-section]))::-webkit-outer-spin-button {\n        height: auto;\n    }\n\n    :where(:is([data-scope], [data-pc-section]))::-webkit-search-decoration {\n        -webkit-appearance: none;\n    }\n\n    :where(:is([data-scope], [data-pc-section]))::-webkit-datetime-edit {\n        display: inline-flex;\n    }\n\n    :where(:is([data-scope], [data-pc-section]))::-webkit-datetime-edit-fields-wrapper {\n        padding: 0;\n    }\n\n    :where(:-moz-ui-invalid:is([data-scope], [data-pc-section])) {\n        box-shadow: none;\n    }\n\n    :where(ul:is([data-scope], [data-pc-section])),\n    :where(ol:is([data-scope], [data-pc-section])),\n    :where(menu:is([data-scope], [data-pc-section])) {\n        list-style: none;\n        margin: 0;\n        padding: 0;\n    }\n\n    :where(table:is([data-scope], [data-pc-section])) {\n        border-collapse: collapse;\n        border-color: inherit;\n        text-indent: 0;\n    }\n\n    :where(caption:is([data-scope], [data-pc-section])),\n    :where(th:is([data-scope], [data-pc-section])),\n    :where(td:is([data-scope], [data-pc-section])) {\n        text-align: inherit;\n        font-weight: inherit;\n        padding: 0;\n    }\n\n    :where(h1:is([data-scope], [data-pc-section])),\n    :where(h2:is([data-scope], [data-pc-section])),\n    :where(h3:is([data-scope], [data-pc-section])),\n    :where(h4:is([data-scope], [data-pc-section])),\n    :where(h5:is([data-scope], [data-pc-section])),\n    :where(h6:is([data-scope], [data-pc-section])),\n    :where(p:is([data-scope], [data-pc-section])),\n    :where(figure:is([data-scope], [data-pc-section])),\n    :where(blockquote:is([data-scope], [data-pc-section])),\n    :where(dl:is([data-scope], [data-pc-section])),\n    :where(dd:is([data-scope], [data-pc-section])) {\n        font-size: inherit;\n        font-weight: inherit;\n        margin: 0;\n    }\n\n    :where(a:is([data-scope], [data-pc-section])) {\n        color: inherit;\n        -webkit-text-decoration: inherit;\n        text-decoration: inherit;\n    }\n\n    :where(fieldset:is([data-scope], [data-pc-section])),\n    :where(legend:is([data-scope], [data-pc-section])) {\n        border: 0 solid;\n        margin: 0;\n        padding: 0;\n    }\n\n    :where(img:is([data-scope], [data-pc-section])),\n    :where(svg:is([data-scope], [data-pc-section])),\n    :where(video:is([data-scope], [data-pc-section])),\n    :where(canvas:is([data-scope], [data-pc-section])),\n    :where(iframe:is([data-scope], [data-pc-section])),\n    :where(embed:is([data-scope], [data-pc-section])),\n    :where(object:is([data-scope], [data-pc-section])) {\n        display: block;\n        vertical-align: middle;\n    }\n\n    :where(img:is([data-scope], [data-pc-section])),\n    :where(video:is([data-scope], [data-pc-section])) {\n        max-width: 100%;\n    }\n\n    :where(img:is([data-scope], [data-pc-section]):not([height])),\n    :where(video:is([data-scope], [data-pc-section]):not([height])) {\n        height: auto;\n    }\n\n    :where(hr:is([data-scope], [data-pc-section])) {\n        height: 0;\n        color: inherit;\n        border-top-width: 1px;\n    }\n\n    :where(summary:is([data-scope], [data-pc-section])) {\n        display: list-item;\n    }\n\n    :where(dialog:is([data-scope], [data-pc-section])) {\n        border: 0 solid;\n        padding: 0;\n        margin: 0;\n        max-width: none;\n        max-height: none;\n        background-color: transparent;\n        color: inherit;\n    }\n\n    :where(:-moz-focusring:is([data-scope], [data-pc-section])) {\n        outline: auto;\n    }\n}\n";
var style = "\n    *,\n    ::before,\n    ::after {\n        box-sizing: border-box;\n    }\n\n    .p-component {\n        font-family: dt('typography.font.family');\n        font-feature-settings: inherit;\n        line-height: dt('typography.line.height');\n    }\n\n    .p-collapsible-enter-active {\n        animation: p-animate-collapsible-expand 0.2s ease-out;\n        overflow: hidden;\n    }\n\n    .p-collapsible-leave-active {\n        animation: p-animate-collapsible-collapse 0.2s ease-out;\n        overflow: hidden;\n    }\n\n    @keyframes p-animate-collapsible-expand {\n        from {\n            grid-template-rows: 0fr;\n        }\n        to {\n            grid-template-rows: 1fr;\n        }\n    }\n\n    @keyframes p-animate-collapsible-collapse {\n        from {\n            grid-template-rows: 1fr;\n        }\n        to {\n            grid-template-rows: 0fr;\n        }\n    }\n\n    .p-disabled,\n    .p-disabled * {\n        cursor: default;\n        pointer-events: none;\n        user-select: none;\n    }\n\n    .p-disabled,\n    .p-component:disabled {\n        opacity: dt('disabled.opacity');\n    }\n\n    .pi {\n        font-size: dt('icon.size');\n    }\n\n    .p-icon {\n        width: var(--px-icon-size, dt('icon.size'));\n        height: var(--px-icon-size, dt('icon.size'));\n        flex-shrink: 0;\n    }\n\n    .p-icon-spin {\n        -webkit-animation: p-icon-spin 2s infinite linear;\n        animation: p-icon-spin 2s infinite linear;\n    }\n\n    @-webkit-keyframes p-icon-spin {\n        0% {\n            -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n        }\n        100% {\n            -webkit-transform: rotate(359deg);\n            transform: rotate(359deg);\n        }\n    }\n\n    @keyframes p-icon-spin {\n        0% {\n            -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n        }\n        100% {\n            -webkit-transform: rotate(359deg);\n            transform: rotate(359deg);\n        }\n    }\n\n    .p-overlay-mask {\n        background: var(--px-mask-background, dt('mask.background'));\n        color: dt('mask.color');\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n    }\n\n    .p-overlay-mask-enter-active {\n        animation: p-animate-overlay-mask-enter dt('mask.transition.duration') forwards;\n    }\n\n    .p-overlay-mask-leave-active {\n        animation: p-animate-overlay-mask-leave dt('mask.transition.duration') forwards;\n    }\n\n    @keyframes p-animate-overlay-mask-enter {\n        from {\n            background: transparent;\n        }\n        to {\n            background: var(--px-mask-background, dt('mask.background'));\n        }\n    }\n    @keyframes p-animate-overlay-mask-leave {\n        from {\n            background: var(--px-mask-background, dt('mask.background'));\n        }\n        to {\n            background: transparent;\n        }\n    }\n\n    .p-anchored-overlay-enter-active {\n        animation: p-animate-anchored-overlay-enter 300ms cubic-bezier(.19,1,.22,1);\n    }\n\n    .p-anchored-overlay-leave-active {\n        animation: p-animate-anchored-overlay-leave 300ms cubic-bezier(.19,1,.22,1);\n        pointer-events: none;\n    }\n\n    @keyframes p-animate-anchored-overlay-enter {\n        from {\n            opacity: 0;\n            transform: scale(0.93);\n        }\n    }\n\n    @keyframes p-animate-anchored-overlay-leave {\n        to {\n            opacity: 0;\n            transform: scale(0.93);\n        }\n    }\n";
// ../node_modules/@primeuix/styled/dist/isolation/index.mjs
var a$1 = "data-p-dark";
function u$1(e, { warn: t = console.warn } = {}) {
	const n = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Map();
	let o = "";
	const s = (e) => {
		try {
			return !!o && e.documentElement.matches(o);
		} catch (e) {
			return !1;
		}
	};
	function c(e) {
		(function(e) {
			if (!o || r.has(e)) return;
			const t = new MutationObserver(() => {
				const t = s(e);
				n.forEach((n) => n.ownerDocument === e && n.toggleAttribute(a$1, t));
			});
			t.observe(e.documentElement, { attributes: !0 }), r.set(e, t);
		})(e.ownerDocument), e.toggleAttribute(a$1, s(e.ownerDocument));
	}
	function l() {
		r.forEach((e) => e.disconnect()), r.clear();
	}
	function u(e) {
		if (f || h && e === d) return;
		h = !0, d = e;
		const r = null == e || "none" === e || "boolean" == typeof e ? [] : Be.regex.resolve(e), s = r.filter(({ type: e }) => "custom" === e);
		s.length && t && t(`[primeuix] darkModeSelector ${s.map((e) => JSON.stringify(e.selector)).join(", ")} cannot be mirrored into an isolated scope; use a class (".dark"), an attribute ("[data-theme=dark]") or "system".`), o = r.filter(({ type: e }) => "class" === e || "attr" === e).map((e) => e.selector.split(",:host(")[0]).join(","), l(), n.forEach(c);
	}
	let d, f = !1, h = !1;
	return u(e), {
		add: (e) => f ? () => {} : (n.add(e), c(e), () => {
			var t;
			if (!n.delete(e)) return;
			e.removeAttribute(a$1);
			const o = e.ownerDocument;
			[...n].some((e) => e.ownerDocument === o) || (null == (t = r.get(o)) || t.disconnect(), r.delete(o));
		}),
		update: u,
		dispose() {
			f = !0, n.forEach((e) => e.removeAttribute(a$1)), n.clear(), l();
		}
	};
}
// ../node_modules/primeng/fesm2022/primeng-usestyle.mjs
var _UseStyle;
var _StyleScope;
var _id = 0;
var STYLE_ID_ATTRIBUTE = "data-primeng-style-id";
var styleSelector = (name) => `style[${STYLE_ID_ATTRIBUTE}=${Se(name)}]`;
var escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function darkHeadsOf() {
	const heads = Be.getColorSchemeOption($e.getOptions(), $e.defaults).filter(({ type }) => type === "class" || type === "attr").map(({ selector }) => escapeRegExp(selector.split(",:host(")[0]));
	return heads.length ? new RegExp(`(^|[,{}])\\s*(?:${heads.join("|")})\\s+(?=[^\\s,{}])`, "g") : void 0;
}
var canAdopt = (root) => {
	var _root$ownerDocument$d;
	return "adoptedStyleSheets" in root && ((_root$ownerDocument$d = root.ownerDocument.defaultView) === null || _root$ownerDocument$d === void 0 ? void 0 : _root$ownerDocument$d.CSSStyleSheet) === CSSStyleSheet;
};
function sheetOf(style) {
	if (!style.sheet) {
		style.sheet = new CSSStyleSheet();
		style.sheet.replaceSync(style.hostCss);
	}
	return style.sheet;
}
var UseStyle = (_UseStyle = class UseStyle {
	constructor() {
		_defineProperty(this, "document", inject(DOCUMENT));
		_defineProperty(this, "zone", inject(NgZone));
		_defineProperty(this, "sharedStyles", /* @__PURE__ */ new Map());
		_defineProperty(this, "shadowRoots", /* @__PURE__ */ new Map());
		_defineProperty(this, "owned", /* @__PURE__ */ new WeakSet());
		_defineProperty(this, "keyed", false);
		_defineProperty(this, "dark", void 0);
		_defineProperty(this, "onThemeChange", () => {
			var _Theme$getOptions;
			const selector = (_Theme$getOptions = $e.getOptions()) === null || _Theme$getOptions === void 0 ? void 0 : _Theme$getOptions.darkModeSelector;
			if (!this.dark || selector === this.dark.selector) return;
			this.dark.selector = selector;
			this.dark.heads = darkHeadsOf();
			this.dark.mirror.update(selector);
			this.sharedStyles.forEach((style, name) => {
				const old = style.sheet;
				style.hostCss = this.toHost(style.css);
				style.sheet = void 0;
				this.shadowRoots.forEach((state, shadowRoot) => this.update(shadowRoot, state, name, style, old));
			});
		});
	}
	addShadowRoot(shadowRoot) {
		var _this$shadowRoots$get;
		if ((shadowRoot === null || shadowRoot === void 0 ? void 0 : shadowRoot.nodeType) !== 11 || !("host" in shadowRoot)) return () => {};
		const state = (_this$shadowRoots$get = this.shadowRoots.get(shadowRoot)) !== null && _this$shadowRoots$get !== void 0 ? _this$shadowRoots$get : this.register(shadowRoot);
		state.count++;
		d$1.off("theme:change", this.onThemeChange);
		d$1.on("theme:change", this.onThemeChange);
		let released = false;
		return () => {
			if (released) return;
			released = true;
			if (!--state.count && this.shadowRoots.get(shadowRoot) === state) this.removeShadowRoot(shadowRoot);
		};
	}
	removeShadowRoot(shadowRoot) {
		const state = this.shadowRoots.get(shadowRoot);
		if (!state) return;
		this.shadowRoots.delete(shadowRoot);
		state.unmark();
		this.clear(shadowRoot, state);
		if (this.shadowRoots.size || !this.dark) return;
		d$1.off("theme:change", this.onThemeChange);
		this.dark.mirror.dispose();
		this.dark = void 0;
	}
	remove(name, el) {
		var _ref, _this$document;
		const style = this.sharedStyles.get(name);
		this.sharedStyles.delete(name);
		(_ref = (el === null || el === void 0 ? void 0 : el.isConnected) && el.getAttribute("data-primeng-style-id") === name ? el : (_this$document = this.document) === null || _this$document === void 0 ? void 0 : _this$document.querySelector(styleSelector(name))) === null || _ref === void 0 || _ref.remove();
		if (!style) return;
		this.shadowRoots.forEach((state, shadowRoot) => {
			var _state$copies$get;
			(_state$copies$get = state.copies.get(name)) === null || _state$copies$get === void 0 || _state$copies$get.remove();
			state.copies.delete(name);
			if (state.adopt && style.sheet) shadowRoot.adoptedStyleSheets = shadowRoot.adoptedStyleSheets.filter((sheet) => sheet !== style.sheet);
		});
	}
	use(css, options = {}) {
		var _cssRef;
		let cssRef = css;
		let styleRef = null;
		const { name = `style_${++_id}`, id = void 0, media = void 0, nonce = void 0, first = false, variables = false, unkeyed = void 0 } = options;
		if (!this.document) return;
		this.keyed || (this.keyed = !!unkeyed && unkeyed !== name);
		if (unkeyed) this.dropStale(unkeyed, name);
		styleRef = this.document.querySelector(styleSelector(name)) || id && this.document.getElementById(id) || this.document.createElement("style");
		this.owned.add(styleRef);
		if (styleRef) {
			if (!styleRef.isConnected) {
				cssRef = css;
				const HEAD = this.document.head;
				be(styleRef, "nonce", nonce);
				if (first && HEAD.firstChild) HEAD.insertBefore(styleRef, HEAD.firstChild);
				else HEAD.appendChild(styleRef);
				$$1(styleRef, {
					type: "text/css",
					media,
					nonce,
					[STYLE_ID_ATTRIBUTE]: name
				});
			}
			if (styleRef.textContent !== cssRef) styleRef.textContent = cssRef;
		}
		if (!variables) this.share(name, (_cssRef = cssRef) !== null && _cssRef !== void 0 ? _cssRef : "", first, nonce);
		return {
			id,
			name,
			el: styleRef,
			css: cssRef
		};
	}
	dropStale(unkeyed, name) {
		if (!this.keyed) return;
		this.document.querySelectorAll(`${styleSelector(unkeyed)},style[${STYLE_ID_ATTRIBUTE}^=${Se(`${unkeyed}@`)}]`).forEach((el) => {
			const staleName = el.getAttribute(STYLE_ID_ATTRIBUTE);
			if (staleName !== name && this.owned.has(el)) this.remove(staleName);
		});
	}
	register(shadowRoot) {
		if (!this.dark) {
			var _Theme$getOptions2;
			const selector = (_Theme$getOptions2 = $e.getOptions()) === null || _Theme$getOptions2 === void 0 ? void 0 : _Theme$getOptions2.darkModeSelector;
			this.dark = {
				selector,
				heads: darkHeadsOf(),
				mirror: this.zone.runOutsideAngular(() => u$1(selector))
			};
			this.sharedStyles.forEach((style) => (style.hostCss = this.toHost(style.css), style.sheet = void 0));
		}
		const dark = this.dark;
		const state = {
			count: 0,
			adopt: canAdopt(shadowRoot),
			copies: /* @__PURE__ */ new Map(),
			unmark: this.zone.runOutsideAngular(() => dark.mirror.add(shadowRoot.host))
		};
		this.shadowRoots.set(shadowRoot, state);
		this.apply(shadowRoot, state);
		return state;
	}
	apply(shadowRoot, state) {
		const sheets = [];
		this.sharedStyles.forEach((style, name) => style.first || !state.adopt ? this.copy(shadowRoot, state, name, style) : sheets.push(sheetOf(style)));
		if (sheets.length) shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, ...sheets.filter((sheet) => !shadowRoot.adoptedStyleSheets.includes(sheet))];
	}
	clear(shadowRoot, state) {
		state.copies.forEach((el) => el.remove());
		state.copies.clear();
		if (!state.adopt) return;
		const sheets = new Set([...this.sharedStyles.values()].map((style) => style.sheet));
		shadowRoot.adoptedStyleSheets = shadowRoot.adoptedStyleSheets.filter((sheet) => !sheets.has(sheet));
	}
	toHost(css) {
		var _this$dark;
		const heads = (_this$dark = this.dark) === null || _this$dark === void 0 ? void 0 : _this$dark.heads;
		return heads ? css.replace(heads, "$1:host([data-p-dark]) ") : css;
	}
	share(name, css, first, nonce) {
		const old = this.sharedStyles.get(name);
		if (old && old.css === css && old.first === first) return;
		const style = {
			css,
			first,
			nonce,
			hostCss: this.toHost(css)
		};
		this.sharedStyles.set(name, style);
		this.shadowRoots.forEach((state, shadowRoot) => this.update(shadowRoot, state, name, style, old === null || old === void 0 ? void 0 : old.sheet));
	}
	update(shadowRoot, state, name, style, old) {
		var _state$copies$get2;
		const sheets = state.adopt ? shadowRoot.adoptedStyleSheets : [];
		const at = old ? sheets.indexOf(old) : -1;
		if (style.first || !state.adopt) {
			this.copy(shadowRoot, state, name, style);
			if (at >= 0) shadowRoot.adoptedStyleSheets = sheets.filter((sheet) => sheet !== old);
			return;
		}
		(_state$copies$get2 = state.copies.get(name)) === null || _state$copies$get2 === void 0 || _state$copies$get2.remove();
		state.copies.delete(name);
		shadowRoot.adoptedStyleSheets = at >= 0 ? sheets.map((sheet, i) => i === at ? sheetOf(style) : sheet) : [...sheets, sheetOf(style)];
	}
	copy(shadowRoot, state, name, { hostCss: css, first, nonce }) {
		let el = state.copies.get(name);
		if (!el) {
			el = shadowRoot.ownerDocument.createElement("style");
			el.setAttribute(STYLE_ID_ATTRIBUTE, name);
			if (nonce) el.setAttribute("nonce", nonce);
			if (first) shadowRoot.prepend(el);
			else shadowRoot.append(el);
			state.copies.set(name, el);
		}
		if (el.textContent !== css) el.textContent = css;
	}
}, _defineProperty(_UseStyle, "ɵfac", function UseStyle_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _UseStyle)();
}), _defineProperty(_UseStyle, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _UseStyle,
	factory: _UseStyle.ɵfac,
	providedIn: "root"
})), _UseStyle);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UseStyle, [{
		type: Injectable,
		args: [{ providedIn: "root" }]
	}], null, null);
})();
var StyleScope = (_StyleScope = class StyleScope {
	constructor() {
		var _this$theme$service;
		_defineProperty(this, "isolated", false);
		_defineProperty(this, "document", inject(DOCUMENT));
		_defineProperty(this, "platformId", inject(PLATFORM_ID));
		_defineProperty(this, "useStyle", inject(UseStyle));
		_defineProperty(this, "theme", this.createTheme());
		_defineProperty(this, "resolvers", this.createResolvers());
		_defineProperty(this, "service", (_this$theme$service = this.theme.service) !== null && _this$theme$service !== void 0 ? _this$theme$service : d$1);
		_defineProperty(this, "coreStyleNames", void 0);
		_defineProperty(this, "isolation", void 0);
		_defineProperty(this, "_classPrefix", signal(this.readClassPrefix(), ...ngDevMode ? [{ debugName: "_classPrefix" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "classPrefix", this._classPrefix.asReadonly());
		_defineProperty(this, "onThemeChange", () => this.themeChanged());
		_defineProperty(this, "bodyLock", void 0);
		this.service.on("theme:change", this.onThemeChange);
		this.service.on("options:change", this.onThemeChange);
	}
	get key() {}
	styleName(name) {
		var _this$theme$styleName, _this$theme$styleName2, _this$theme;
		return (_this$theme$styleName = (_this$theme$styleName2 = (_this$theme = this.theme).styleName) === null || _this$theme$styleName2 === void 0 ? void 0 : _this$theme$styleName2.call(_this$theme, name)) !== null && _this$theme$styleName !== void 0 ? _this$theme$styleName : name;
	}
	prime(_theme) {}
	pcn(...classes) {
		return prefixClasses(classes.length > 1 ? classes : classes[0], this._classPrefix());
	}
	psel(selector) {
		return prefixSelector(selector, this._classPrefix());
	}
	batch(fn) {
		return fn();
	}
	connect(el, injector) {
		var _el$getRootNode;
		if (isPlatformServer(this.platformId)) return;
		const rootNode = el === null || el === void 0 || (_el$getRootNode = el.getRootNode) === null || _el$getRootNode === void 0 ? void 0 : _el$getRootNode.call(el);
		if ((rootNode === null || rootNode === void 0 ? void 0 : rootNode.nodeType) !== 11) return;
		injector.get(DestroyRef).onDestroy(this.useStyle.addShadowRoot(rootNode));
	}
	scopeCSS(css) {
		return css;
	}
	keyedId(id) {
		return id;
	}
	setInstanceStyle(_name, _css, _nonce) {}
	removeInstanceStyle(_name) {}
	overlayParent(target, _overlay) {
		return target;
	}
	lockBodyScroll(options) {
		var _this$document2;
		if (!this.isolation || !options || this.bodyLock || !((_this$document2 = this.document) === null || _this$document2 === void 0 ? void 0 : _this$document2.body)) return;
		this.isolation.set("body-scroll-lock", `body.${options.className}{overflow:hidden;padding-right:var(${options.variableName})}`);
		this.bodyLock = this.isolation.retain(this.document);
	}
	unlockBodyScroll() {
		var _this$isolation;
		if (!this.bodyLock) return;
		(_this$isolation = this.isolation) === null || _this$isolation === void 0 || _this$isolation.delete("body-scroll-lock");
		this.bodyLock();
		this.bodyLock = void 0;
	}
	ngOnDestroy() {
		this.unlockBodyScroll();
		this.service.off("theme:change", this.onThemeChange);
		this.service.off("options:change", this.onThemeChange);
	}
	createTheme() {
		return $e;
	}
	createResolvers() {
		return {
			dt: Ce,
			$dt: _e,
			css: Ie
		};
	}
	themeChanged() {
		this._classPrefix.set(this.readClassPrefix());
	}
	readClassPrefix() {
		var _getClassPrefix;
		return (_getClassPrefix = getClassPrefix(this.theme)) !== null && _getClassPrefix !== void 0 ? _getClassPrefix : "p";
	}
}, _defineProperty(_StyleScope, "ɵfac", function StyleScope_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _StyleScope)();
}), _defineProperty(_StyleScope, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _StyleScope,
	factory: _StyleScope.ɵfac,
	providedIn: "root"
})), _StyleScope);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StyleScope, [{
		type: Injectable,
		args: [{ providedIn: "root" }]
	}], () => [], null);
})();
// \0@oxc-project+runtime@0.156.0/helpers/esm/checkPrivateRedeclaration.js
function _checkPrivateRedeclaration(e, t) {
	if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
// \0@oxc-project+runtime@0.156.0/helpers/esm/classPrivateMethodInitSpec.js
function _classPrivateMethodInitSpec(e, a) {
	_checkPrivateRedeclaration(e, a), a.add(e);
}
// \0@oxc-project+runtime@0.156.0/helpers/esm/classPrivateFieldInitSpec.js
function _classPrivateFieldInitSpec(e, t, a) {
	_checkPrivateRedeclaration(e, t), t.set(e, a);
}
// \0@oxc-project+runtime@0.156.0/helpers/esm/assertClassBrand.js
function _assertClassBrand(e, t, n) {
	if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw new TypeError("Private element is not present on this object");
}
// \0@oxc-project+runtime@0.156.0/helpers/esm/classPrivateFieldGet2.js
function _classPrivateFieldGet2(s, a) {
	return s.get(_assertClassBrand(s, a));
}
// ../node_modules/primeng/fesm2022/primeng-base.mjs
var _BaseStyle;
var _scope;
var _BaseStyle_brand;
var base_default = {
	_loadedStyleNames: /* @__PURE__ */ new Set(),
	getLoadedStyleNames() {
		return this._loadedStyleNames;
	},
	isStyleNameLoaded(name) {
		return this._loadedStyleNames.has(name);
	},
	setLoadedStyleName(name) {
		this._loadedStyleNames.add(name);
	},
	deleteLoadedStyleName(name) {
		this._loadedStyleNames.delete(name);
	},
	clearLoadedStyleNames() {
		this._loadedStyleNames.clear();
	}
};
var css = `
.p-hidden-accessible {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}

.p-hidden-accessible input,
.p-hidden-accessible select {
    transform: scale(0);
}

.p-overflow-hidden {
    overflow: hidden;
    padding-right: dt('scrollbar.width');
}
`;
var BaseStyle = (_scope = /* @__PURE__ */ new WeakMap(), _BaseStyle_brand = /* @__PURE__ */ new WeakSet(), _BaseStyle = class BaseStyle {
	constructor() {
		_classPrivateMethodInitSpec(this, _BaseStyle_brand);
		_defineProperty(this, "name", "base");
		_defineProperty(this, "useStyle", inject(UseStyle));
		_classPrivateFieldInitSpec(this, _scope, inject(StyleScope));
		_defineProperty(this, "css", void 0);
		_defineProperty(this, "style", void 0);
		_defineProperty(this, "classes", {});
		_defineProperty(this, "inlineStyles", {});
		_defineProperty(this, "load", (style, options = {}, transform = (cs) => cs) => {
			const { css: Css, dt } = _classPrivateFieldGet2(_scope, this).resolvers;
			const computedStyle = transform(options.raw ? style : Css`${x$1(style, { dt })}`);
			return computedStyle ? _assertClassBrand(_BaseStyle_brand, this, _use).call(this, computedStyle, options) : {};
		});
		_defineProperty(this, "loadCSS", (options = {}) => this.load(this.css, options, (computedStyle) => _classPrivateFieldGet2(_scope, this).scopeCSS(computedStyle)));
		_defineProperty(this, "loadStyle", (options = {}, style = "") => this.load(this.style, options, (computedStyle = "") => _classPrivateFieldGet2(_scope, this).theme.transformCSS(options.name || this.name, `${computedStyle}${_classPrivateFieldGet2(_scope, this).resolvers.css`${style}`}`)));
		_defineProperty(this, "loadBaseCSS", (options = {}) => this.load(css, options, (computedStyle) => _classPrivateFieldGet2(_scope, this).scopeCSS(computedStyle)));
		_defineProperty(this, "loadBaseStyle", (options = {}, style$1 = "") => this.load(style, options, (computedStyle = "") => _classPrivateFieldGet2(_scope, this).theme.transformCSS(options.name || this.name, `${computedStyle}${_classPrivateFieldGet2(_scope, this).resolvers.css`${style$1}`}`)));
		_defineProperty(this, "loadPreflight", (options = {}) => this.load(n$1, _objectSpread2(_objectSpread2({}, options), {}, {
			name: "preflight-style",
			raw: true
		}), (computedStyle) => _classPrivateFieldGet2(_scope, this).scopeCSS(computedStyle)));
		_defineProperty(this, "getCommonTheme", (params) => _classPrivateFieldGet2(_scope, this).theme.getCommon(this.name, params));
		_defineProperty(this, "getComponentTheme", (params) => _classPrivateFieldGet2(_scope, this).theme.getComponent(this.name, params));
		_defineProperty(this, "getPresetTheme", (preset, selector, params) => _classPrivateFieldGet2(_scope, this).theme.getCustomPreset(this.name, preset, selector, params));
		_defineProperty(this, "getLayerOrderThemeCSS", () => _classPrivateFieldGet2(_scope, this).theme.getLayerOrderCSS(this.name));
		_defineProperty(this, "getStyleSheet", (extendedCSS = "", props = {}) => {
			if (this.css) {
				const { css: Css, dt } = _classPrivateFieldGet2(_scope, this).resolvers;
				const _css = x$1(this.css, { dt });
				const _style = B$1(Css`${_css}${extendedCSS}`);
				const _props = K$1(props).join(" ");
				return `<style type="text/css" ${this.styleIdAttributes(this.name)} ${_props}>${Q$1(_style)}</style>`;
			}
			return "";
		});
		_defineProperty(this, "getCommonThemeStyleSheet", (params, props = {}) => _classPrivateFieldGet2(_scope, this).theme.getCommonStyleSheet(this.name, params, props, (name) => _classPrivateFieldGet2(_scope, this).styleName(name)));
		_defineProperty(this, "getThemeStyleSheet", (params, props = {}) => {
			let css = [_classPrivateFieldGet2(_scope, this).theme.getStyleSheet(this.name, params, props, (name) => _classPrivateFieldGet2(_scope, this).styleName(name))];
			if (this.style) {
				const { css: Css, dt } = _classPrivateFieldGet2(_scope, this).resolvers;
				const name = this.name === "base" ? "global-style" : `${this.name}-style`;
				const _css = Css`${x$1(this.style, { dt })}`;
				const _style = B$1(_classPrivateFieldGet2(_scope, this).theme.transformCSS(name, _css));
				const _props = K$1(props).join(" ");
				css.push(`<style type="text/css" ${this.styleIdAttributes(name)} ${_props}>${Q$1(_style)}</style>`);
			}
			return css.join("");
		});
	}
	styleIdAttributes(name) {
		return `${STYLE_ID_ATTRIBUTE}="${J$1(_classPrivateFieldGet2(_scope, this).styleName(name))}"`;
	}
}, _defineProperty(_BaseStyle, "ɵfac", function BaseStyle_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _BaseStyle)();
}), _defineProperty(_BaseStyle, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _BaseStyle,
	factory: _BaseStyle.ɵfac,
	providedIn: "root"
})), _BaseStyle);
function _use(css, options) {
	const name = options.name || this.name;
	return this.useStyle.use(B$1(css), _objectSpread2(_objectSpread2({}, options), {}, {
		name: _classPrivateFieldGet2(_scope, this).styleName(name),
		unkeyed: name
	}));
}
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseStyle, [{
		type: Injectable,
		args: [{ providedIn: "root" }]
	}], null, null);
})();
// ../node_modules/@primeui/license-manager/dist/index.mjs
var e = Object.defineProperty;
var t = Object.getOwnPropertySymbols;
var r = Object.prototype.hasOwnProperty;
var n = Object.prototype.propertyIsEnumerable;
var i = (t, r, n) => r in t ? e(t, r, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : t[r] = n;
var o = (e, o) => {
	for (var c in o || (o = {})) r.call(o, c) && i(e, c, o[c]);
	if (t) for (var c of t(o)) n.call(o, c) && i(e, c, o[c]);
	return e;
};
var c = (e, t, r) => new Promise((n, i) => {
	var o = (e) => {
		try {
			u(r.next(e));
		} catch (e) {
			i(e);
		}
	}, c = (e) => {
		try {
			u(r.throw(e));
		} catch (e) {
			i(e);
		}
	}, u = (e) => e.done ? n(e.value) : Promise.resolve(e.value).then(o, c);
	u((r = r.apply(e, t)).next());
});
var u = class extends Error {};
var l = (e) => " " === e || "\n" === e || "\r" === e || "	" === e;
var a = (e) => void 0 !== e && e >= "0" && e <= "9";
function s(e) {
	if (void 0 === e) throw new u("Bad escape");
	if (e >= "0" && e <= "9") return e.charCodeAt(0) - 48;
	if (e >= "a" && e <= "f") return e.charCodeAt(0) - 87;
	if (e >= "A" && e <= "F") return e.charCodeAt(0) - 55;
	throw new u("Bad escape");
}
var f = (() => {
	const e = Object.create(null);
	for (let t = 0; t < 64; t++) e["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"[t]] = t;
	return e;
})();
function d(e) {
	if (1 == e.length % 4) throw new Error("Invalid base64url length");
	const t = Math.floor(6 * e.length / 8), r = new Uint8Array(t);
	let n = 0, i = 0, o = 0;
	for (let t = 0; t < e.length; t++) {
		const u = f[e[t]];
		if (void 0 === u) throw new Error("Invalid base64url character");
		n = n << 6 | u, i += 6, i >= 8 && (i -= 8, r[o++] = n >> i & 255);
	}
	if (i > 0 && n & (1 << i) - 1) throw new Error("Invalid base64url trailing bits");
	return r;
}
var y = Object.freeze({
	primeui: "primeui",
	scheduler: "primeui-pro:scheduler",
	texteditor: "primeui-pro:text-editor",
	charts: "primeui-pro:charts",
	diagram: "primeui-pro:diagram",
	pdfviewer: "primeui-pro:pdf-viewer",
	taskboard: "primeui-pro:task-board",
	datagrid: "primeui-pro:datagrid",
	ganttchart: "primeui-pro:gantt-chart",
	filemanager: "primeui-pro:file-manager"
});
var g = 16;
var v = 65536;
var m = () => new Array(g).fill(0);
function b(e) {
	const t = m();
	let r = e;
	for (let e = 0; e < g && 0 !== r; e++) t[e] = r % v, r = Math.floor(r / v);
	return t;
}
var x = m();
var U = b(1);
var E = (() => {
	const e = m();
	e[0] = 65517;
	for (let t = 1; t < 15; t++) e[t] = 65535;
	return e[15] = 32767, e;
})();
function z(e, t) {
	let r = t;
	for (; 0 !== r;) {
		let t = 38 * r;
		r = 0;
		for (let r = 0; r < g; r++) {
			const n = e[r] + t;
			if (t = Math.floor(n / v), e[r] = n - t * v, 0 === t) break;
		}
		r = t;
	}
}
function k(e, t) {
	const r = new Array(32).fill(0);
	for (let n = 0; n < g; n++) {
		const i = e[n];
		if (0 !== i) {
			for (let e = 0; e < g; e++) r[n + e] = r[n + e] + i * t[e];
			if (n % 4 == 3) {
				let e = 0;
				for (let t = 0; t < 32; t++) {
					const n = r[t] + e;
					e = Math.floor(n / v), r[t] = n - e * v;
				}
			}
		}
	}
	return function(e) {
		for (let t = g; t < e.length; t++) e[t - g] = e[t - g] + 38 * e[t], e[t] = 0;
		let t = 0;
		for (let r = 0; r < g; r++) {
			const n = e[r] + t;
			t = Math.floor(n / v), e[r] = n - t * v;
		}
		const r = e.slice(0, g);
		return z(r, t), r;
	}(r);
}
function A(e) {
	return k(e, e);
}
function O(e, t) {
	const r = m();
	let n = 0;
	for (let i = 0; i < g; i++) {
		const o = e[i] + t[i] + n;
		n = o >= v ? 1 : 0, r[i] = o - n * v;
	}
	return z(r, n), r;
}
function j(e, t) {
	const r = m();
	let n = 0;
	for (let i = 0; i < g; i++) {
		const o = e[i] - t[i] - n;
		n = o < 0 ? 1 : 0, r[i] = o + n * v;
	}
	return z(r, -n), r;
}
function P(e) {
	return j(x, e);
}
function I(e) {
	for (let t = 15; t >= 0; t--) {
		if (e[t] > E[t]) return !0;
		if (e[t] < E[t]) return !1;
	}
	return !0;
}
function D(e) {
	const t = function(e) {
		const t = e.slice();
		let r = 0;
		for (let e = 0; e < g; e++) {
			const n = t[e] + r;
			r = Math.floor(n / v), t[e] = n - r * v;
		}
		z(t, r);
		for (let e = 0; e < 2 && I(t); e++) {
			let e = 0;
			for (let r = 0; r < g; r++) {
				const n = t[r] - E[r] - e;
				e = n < 0 ? 1 : 0, t[r] = n + e * v;
			}
		}
		return t;
	}(e), r = /* @__PURE__ */ new Uint8Array(32);
	for (let e = 0; e < g; e++) r[2 * e] = 255 & t[e], r[2 * e + 1] = t[e] >> 8 & 255;
	return r;
}
function T(e) {
	const t = D(e);
	let r = 0;
	for (let e = 0; e < 32; e++) r |= t[e];
	return 0 === r;
}
function F(e, t) {
	return T(j(e, t));
}
function C(e, t) {
	let r = e;
	for (let e = 0; e < t; e++) r = A(r);
	return r;
}
function M(e) {
	const t = A(e), r = k(e, C(t, 2)), n = k(t, r), i = k(r, A(n)), o = k(C(i, 5), i), c = k(C(o, 10), o), l = k(C(k(C(c, 20), c), 10), o), a = k(C(l, 50), l);
	return {
		z11: n,
		z250: k(C(k(C(a, 100), a), 50), l)
	};
}
function $(e) {
	const { z11: t, z250: r } = M(e);
	return k(C(r, 5), t);
}
var B = k(P(b(121665)), $(b(121666)));
var N = (() => {
	const e = /* @__PURE__ */ new Uint8Array(32);
	e[0] = 251;
	for (let t = 1; t < 31; t++) e[t] = 255;
	e[31] = 31;
	let t = U, r = b(2);
	for (let n = 0; n < 32; n++) for (let i = 0; i < 8; i++) 1 == (e[n] >> i & 1) && (t = k(t, r)), r = A(r);
	return t;
})();
function L(e, t) {
	const r = k(j(e.y, e.x), j(t.y, t.x)), n = k(O(e.y, e.x), O(t.y, t.x)), i = k(k(O(B, B), e.t), t.t), o = k(O(e.z, e.z), t.z), c = j(n, r), u = j(o, i), l = O(o, i), a = O(n, r);
	return {
		x: k(c, u),
		y: k(l, a),
		z: k(u, l),
		t: k(c, a)
	};
}
function S(e) {
	return L(e, e);
}
function _(e, t) {
	let r = {
		x: x.slice(),
		y: U.slice(),
		z: U.slice(),
		t: x.slice()
	}, n = !1;
	for (let i = e.length - 1; i >= 0; i--) for (let o = 7; o >= 0; o--) n && (r = S(r)), 1 == (e[i] >> o & 1) && (n ? r = L(r, t) : (r = {
		x: t.x.slice(),
		y: t.y.slice(),
		z: t.z.slice(),
		t: t.t.slice()
	}, n = !0));
	return r;
}
function V(e) {
	if (32 !== e.length) return null;
	const t = Uint8Array.from(e), r = 1 == (t[31] >> 7 & 1);
	t[31] = 127 & t[31];
	const n = function(e) {
		const t = m();
		for (let r = 0; r < g; r++) t[r] = e[2 * r] | e[2 * r + 1] << 8;
		return t;
	}(t);
	if (I(n)) return null;
	const i = A(n), o = j(i, U), c = O(k(B, i), U), u = k(A(c), c), l = k(A(u), c);
	let a = k(k(o, u), function(e) {
		const { z250: t } = M(e);
		return k(C(t, 2), e);
	}(k(o, l)));
	return F(k(A(a), c), o) || (a = k(a, N), F(k(A(a), c), o)) ? T(a) && r ? null : (!(1 & ~D(a)[0]) !== r && (a = P(a)), {
		x: a,
		y: n,
		z: U.slice(),
		t: k(a, n)
	}) : null;
}
var W = (() => {
	const e = V(D(k(b(4), $(b(5)))));
	if (!e) throw new Error("[@primeui/license-manager] Ed25519 base point failed to initialise");
	return e;
})();
function G(e) {
	const t = S(S(S(e)));
	return T(k(t.x, t.z)) && F(t.y, t.z);
}
var R = new Uint8Array([
	237,
	211,
	245,
	92,
	26,
	99,
	18,
	88,
	214,
	156,
	247,
	162,
	222,
	249,
	222,
	20,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	16
]);
function q(e) {
	for (let t = 31; t >= 0; t--) {
		if (e[t] < R[t]) return !0;
		if (e[t] > R[t]) return !1;
	}
	return !1;
}
var K = Object.freeze({
	primeui: "PrimeUI",
	scheduler: "Scheduler",
	texteditor: "TextEditor",
	charts: "Charts",
	diagram: "Diagram",
	pdfviewer: "PDF Viewer",
	taskboard: "Task Board",
	datagrid: "DataGrid",
	ganttchart: "Gantt",
	filemanager: "File Manager"
});
var H = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
function J(e) {
	return H(K, e) ? K[e] : "PrimeUI";
}
function Q(e) {
	return H(y, e) ? y[e] : void 0;
}
function X(e, t = "PrimeUI") {
	switch (e) {
		case "active": return `${t} license is active.`;
		case "grace": return `${t} license is in its grace period. Renew soon to keep using this version.`;
		case "expired": return `${t} license does not cover this version. Renew at primeui.store, or downgrade to a version released within your updates window.`;
		case "tampered": return `${t} license signature is invalid.`;
		case "wrong-product": return `License does not cover ${t}.`;
		case "missing": return `No license key configured for ${t}.`;
		case "invalid": return `${t} license is malformed.`;
		case "unconfigured": return `${t} license is not configured.`;
		default: return `${t} license status unknown.`;
	}
}
var Y = [
	[1116352408, 3609767458],
	[1899447441, 602891725],
	[3049323471, 3964484399],
	[3921009573, 2173295548],
	[961987163, 4081628472],
	[1508970993, 3053834265],
	[2453635748, 2937671579],
	[2870763221, 3664609560],
	[3624381080, 2734883394],
	[310598401, 1164996542],
	[607225278, 1323610764],
	[1426881987, 3590304994],
	[1925078388, 4068182383],
	[2162078206, 991336113],
	[2614888103, 633803317],
	[3248222580, 3479774868],
	[3835390401, 2666613458],
	[4022224774, 944711139],
	[264347078, 2341262773],
	[604807628, 2007800933],
	[770255983, 1495990901],
	[1249150122, 1856431235],
	[1555081692, 3175218132],
	[1996064986, 2198950837],
	[2554220882, 3999719339],
	[2821834349, 766784016],
	[2952996808, 2566594879],
	[3210313671, 3203337956],
	[3336571891, 1034457026],
	[3584528711, 2466948901],
	[113926993, 3758326383],
	[338241895, 168717936],
	[666307205, 1188179964],
	[773529912, 1546045734],
	[1294757372, 1522805485],
	[1396182291, 2643833823],
	[1695183700, 2343527390],
	[1986661051, 1014477480],
	[2177026350, 1206759142],
	[2456956037, 344077627],
	[2730485921, 1290863460],
	[2820302411, 3158454273],
	[3259730800, 3505952657],
	[3345764771, 106217008],
	[3516065817, 3606008344],
	[3600352804, 1432725776],
	[4094571909, 1467031594],
	[275423344, 851169720],
	[430227734, 3100823752],
	[506948616, 1363258195],
	[659060556, 3750685593],
	[883997877, 3785050280],
	[958139571, 3318307427],
	[1322822218, 3812723403],
	[1537002063, 2003034995],
	[1747873779, 3602036899],
	[1955562222, 1575990012],
	[2024104815, 1125592928],
	[2227730452, 2716904306],
	[2361852424, 442776044],
	[2428436474, 593698344],
	[2756734187, 3733110249],
	[3204031479, 2999351573],
	[3329325298, 3815920427],
	[3391569614, 3928383900],
	[3515267271, 566280711],
	[3940187606, 3454069534],
	[4118630271, 4000239992],
	[116418474, 1914138554],
	[174292421, 2731055270],
	[289380356, 3203993006],
	[460393269, 320620315],
	[685471733, 587496836],
	[852142971, 1086792851],
	[1017036298, 365543100],
	[1126000580, 2618297676],
	[1288033470, 3409855158],
	[1501505948, 4234509866],
	[1607167915, 987167468],
	[1816402316, 1246189591]
];
var Z = [
	[1779033703, 4089235720],
	[3144134277, 2227873595],
	[1013904242, 4271175723],
	[2773480762, 1595750129],
	[1359893119, 2917565137],
	[2600822924, 725511199],
	[528734635, 4215389547],
	[1541459225, 327033209]
];
function ee(e, t, r) {
	return 32 === r ? [0 | t, 0 | e] : r < 32 ? [e >>> r | t << 32 - r, t >>> r | e << 32 - r] : [t >>> r - 32 | e << 64 - r, e >>> r - 32 | t << 64 - r];
}
function te(e, t, r) {
	return r < 32 ? [e >>> r, t >>> r | e << 32 - r] : [0, e >>> r - 32];
}
function re(e, t, r, n) {
	const i = (t >>> 0) + (n >>> 0);
	return [e + r + (i / 4294967296 | 0) | 0, 0 | i];
}
function ne(e) {
	const t = e.length, r = Math.floor(t / 536870912), n = t << 3 >>> 0, i = 128 * Math.ceil((t + 17) / 128), o = new Uint8Array(i);
	o.set(e), o[t] = 128;
	const c = new DataView(o.buffer);
	c.setUint32(i - 8, r), c.setUint32(i - 4, n);
	const u = Z.map((e) => [e[0], e[1]]), l = new Array(160);
	for (let e = 0; e < i; e += 128) {
		for (let t = 0; t < 16; t++) l[2 * t] = c.getUint32(e + 8 * t), l[2 * t + 1] = c.getUint32(e + 8 * t + 4);
		for (let e = 16; e < 80; e++) {
			const t = l[2 * (e - 15)], r = l[2 * (e - 15) + 1], [n, i] = ee(t, r, 1), [o, c] = ee(t, r, 8), [u, a] = te(t, r, 7), s = n ^ o ^ u, f = i ^ c ^ a, d = l[2 * (e - 2)], p = l[2 * (e - 2) + 1], [h, w] = ee(d, p, 19), [y, g] = ee(d, p, 61), [v, m] = te(d, p, 6), b = h ^ y ^ v, x = w ^ g ^ m;
			let [U, E] = re(l[2 * (e - 16)], l[2 * (e - 16) + 1], s, f);
			[U, E] = re(U, E, l[2 * (e - 7)], l[2 * (e - 7) + 1]), [U, E] = re(U, E, b, x), l[2 * e] = U, l[2 * e + 1] = E;
		}
		let [t, r] = u[0], [n, i] = u[1], [o, a] = u[2], [s, f] = u[3], [d, p] = u[4], [h, w] = u[5], [y, g] = u[6], [v, m] = u[7];
		for (let e = 0; e < 80; e++) {
			const [c, u] = ee(d, p, 14), [b, x] = ee(d, p, 18), [U, E] = ee(d, p, 41), z = c ^ b ^ U, k = u ^ x ^ E, A = d & h ^ ~d & y, O = p & w ^ ~p & g;
			let [j, P] = re(v, m, z, k);
			[j, P] = re(j, P, A, O), [j, P] = re(j, P, Y[e][0], Y[e][1]), [j, P] = re(j, P, l[2 * e], l[2 * e + 1]);
			const [I, D] = ee(t, r, 28), [T, F] = ee(t, r, 34), [C, M] = ee(t, r, 39), [S, _] = re(I ^ T ^ C, D ^ F ^ M, t & n ^ t & o ^ n & o, r & i ^ r & a ^ i & a);
			v = y, m = g, y = h, g = w, h = d, w = p, [d, p] = re(s, f, j, P), s = o, f = a, o = n, a = i, n = t, i = r, [t, r] = re(j, P, S, _);
		}
		u[0] = re(u[0][0], u[0][1], t, r), u[1] = re(u[1][0], u[1][1], n, i), u[2] = re(u[2][0], u[2][1], o, a), u[3] = re(u[3][0], u[3][1], s, f), u[4] = re(u[4][0], u[4][1], d, p), u[5] = re(u[5][0], u[5][1], h, w), u[6] = re(u[6][0], u[6][1], y, g), u[7] = re(u[7][0], u[7][1], v, m);
	}
	const a = /* @__PURE__ */ new Uint8Array(64), s = new DataView(a.buffer);
	for (let e = 0; e < 8; e++) s.setUint32(8 * e, u[e][0] >>> 0), s.setUint32(8 * e + 4, u[e][1] >>> 0);
	return a;
}
var ie = 864e5;
var oe = Date.UTC(2025, 0, 1);
var ce = (() => Object.assign(Object.create(null), {
	community: !0,
	commercial: !0
}))();
var ue = Object.create(null);
var le = [];
function ae(e) {
	let t = "";
	for (let r = 0; r < e.length; r++) t += (256 | e[r]).toString(16).slice(1);
	return t;
}
function se(e, t, r = {}) {
	return o({
		valid: "active" === e || "grace" === e,
		status: e,
		message: X(e, t)
	}, r);
}
function fe(e) {
	return "community" === e.tier;
}
function de(e, t) {
	return c(this, null, function* () {
		const r = t.productLabel;
		if ("string" != typeof e || e.length > 2048 || !e.includes(".")) return se("invalid", r);
		const n = e.split(".");
		if (2 !== n.length) return se("invalid", r);
		const [i, o] = n;
		let f;
		try {
			f = function(e) {
				let t = 0;
				const r = () => {
					for (; t < e.length && l(e[t]);) t++;
				}, n = (r) => {
					if (e.substr(t, r.length) !== r) throw new u("Unexpected token");
					t += r.length;
				}, i = () => {
					let r = "";
					for (;;) {
						if (t >= e.length) throw new u("Unterminated string");
						const n = e[t++];
						if ("\"" === n) return r;
						if (n < " ") throw new u("Control character in string");
						if ("\\" !== n) {
							r += n;
							continue;
						}
						const i = e[t++];
						switch (i) {
							case "\"":
							case "\\":
							case "/":
								r += i;
								break;
							case "b":
								r += "\b";
								break;
							case "f":
								r += "\f";
								break;
							case "n":
								r += "\n";
								break;
							case "r":
								r += "\r";
								break;
							case "t":
								r += "	";
								break;
							case "u": {
								const n = s(e[t]) << 12 | s(e[t + 1]) << 8 | s(e[t + 2]) << 4 | s(e[t + 3]);
								t += 4, r += String.fromCharCode(n);
								break;
							}
							default: throw new u("Bad escape");
						}
					}
				}, o = (c) => {
					if (c > 16) throw new u("Too deep");
					r();
					const l = e[t];
					if (void 0 === l) throw new u("Unexpected end");
					if ("{" === l) {
						t++;
						const n = {};
						if (r(), "}" === e[t]) return t++, n;
						for (;;) {
							if (r(), "\"" !== e[t]) throw new u("Expected key");
							t++;
							const l = i();
							if ("__proto__" === l || Object.prototype.hasOwnProperty.call(n, l)) throw new u("Bad key");
							if (r(), ":" !== e[t]) throw new u("Expected colon");
							if (t++, n[l] = o(c + 1), r(), "," !== e[t]) {
								if ("}" === e[t]) return t++, n;
								throw new u("Expected , or }");
							}
							t++;
						}
					}
					if ("[" === l) {
						t++;
						const n = [];
						if (r(), "]" === e[t]) return t++, n;
						for (;;) {
							if (n.push(o(c + 1)), r(), "," !== e[t]) {
								if ("]" === e[t]) return t++, n;
								throw new u("Expected , or ]");
							}
							t++;
						}
					}
					if ("\"" === l) return t++, i();
					if ("t" === l) return n("true"), !0;
					if ("f" === l) return n("false"), !1;
					if ("n" === l) return n("null"), null;
					if ("-" === l || a(l)) return (() => {
						const r = t;
						if ("-" === e[t] && t++, "0" === e[t]) t++;
						else {
							if (!a(e[t])) throw new u("Bad number");
							for (; a(e[t]);) t++;
						}
						if ("." === e[t]) {
							if (t++, !a(e[t])) throw new u("Bad number");
							for (; a(e[t]);) t++;
						}
						if ("e" === e[t] || "E" === e[t]) {
							if (t++, "+" !== e[t] && "-" !== e[t] || t++, !a(e[t])) throw new u("Bad number");
							for (; a(e[t]);) t++;
						}
						return Number(e.slice(r, t));
					})();
					throw new u("Unexpected token");
				}, c = o(0);
				if (r(), t !== e.length) throw new u("Trailing characters");
				return c;
			}(function(e) {
				const t = [];
				let r = 0;
				for (; r < e.length;) {
					const n = e[r++];
					if (n < 128) {
						t.push(n);
						continue;
					}
					let i, o, c;
					if (n >= 194 && n <= 223) i = 31 & n, o = 1, c = 128;
					else if (n >= 224 && n <= 239) i = 15 & n, o = 2, c = 2048;
					else {
						if (!(n >= 240 && n <= 244)) throw new u("Invalid UTF-8");
						i = 7 & n, o = 3, c = 65536;
					}
					if (r + o > e.length) throw new u("Invalid UTF-8");
					for (let t = 0; t < o; t++) {
						const t = e[r++];
						if (128 != (192 & t)) throw new u("Invalid UTF-8");
						i = i << 6 | 63 & t;
					}
					if (i < c || i > 1114111 || i >= 55296 && i <= 57343) throw new u("Invalid UTF-8");
					i >= 65536 ? (i -= 65536, t.push(55296 | i >> 10, 56320 | 1023 & i)) : t.push(i);
				}
				let n = "";
				for (let e = 0; e < t.length; e += 4096) n += String.fromCharCode.apply(null, t.slice(e, e + 4096));
				return n;
			}(d(i)));
		} catch (e) {
			return se("invalid", r);
		}
		if (!f || "object" != typeof f || Array.isArray(f)) return se("invalid", r);
		const p = f, y = (e) => Object.prototype.hasOwnProperty.call(p, e) ? p[e] : void 0, g = {
			id: y("id"),
			product: y("product"),
			tier: y("tier"),
			type: y("type"),
			iat: y("iat"),
			exp: y("exp")
		};
		if ("string" != typeof g.product || "string" != typeof g.type || !Number.isFinite(g.exp) || !Number.isFinite(g.iat) || "string" != typeof g.id) return se("invalid", r);
		if (void 0 !== g.tier && ("string" != typeof g.tier || !0 !== ce[g.tier])) return se("invalid", r);
		if (g.product === "primeui" && void 0 === g.tier) return se("invalid", r);
		let v, m, b;
		try {
			v = d(o), m = new TextEncoder().encode(i);
		} catch (e) {
			return se("invalid", r);
		}
		try {
			b = function(e) {
				if (!/^[0-9a-fA-F]*$/.test(e)) throw new Error("Invalid hex character");
				const t = /* @__PURE__ */ new Uint8Array(32);
				for (let r = 0; r < t.length; r++) t[r] = parseInt(e.slice(2 * r, 2 * r + 2), 16);
				return t;
			}("dae75e66b9f59bebf87d4bb29ca6494f37deccfcc2b132b98ee159ee7505373b");
		} catch (e) {
			return se("invalid", r);
		}
		let x = !1;
		try {
			x = yield function(e, t, r) {
				return c(this, null, function* () {
					if (!function(e, t, r) {
						const n = ae(r) + ":" + ae(e) + ":" + ae(t), i = ue[n];
						if (!0 === i || !1 === i) return i;
						const o = function(e, t, r, n) {
							if (64 !== e.length || 32 !== r.length) return !1;
							const i = e.slice(32, 64);
							if (!q(i)) return !1;
							const o = V(r);
							if (!o) return !1;
							if (G(o)) return !1;
							const c = e.slice(0, 32), u = V(c);
							if (!u) return !1;
							if (G(u)) return !1;
							const l = new Uint8Array(64 + t.length);
							l.set(c, 0), l.set(r, 32), l.set(t, 64);
							const a = function(e) {
								const t = /* @__PURE__ */ new Uint8Array(32);
								for (let r = e.length - 1; r >= 0; r--) {
									let n = e[r];
									for (let e = 0; e < 32; e++) {
										const r = 256 * t[e] + n;
										t[e] = 255 & r, n = r >> 8;
									}
									for (; n > 0 || !q(t);) {
										let e = 0;
										for (let r = 0; r < 32; r++) {
											const n = t[r] - R[r] - e;
											e = n < 0 ? 1 : 0, t[r] = n + 256 * e;
										}
										n -= e, n < 0 && (n = 0);
									}
								}
								return t;
							}(n(l)), s = _(i, W);
							return d = L(u, _(a, o)), F(k((f = s).x, d.z), k(d.x, f.z)) && F(k(f.y, d.z), k(d.y, f.z));
							var f, d;
						}(e, t, r, ne);
						return le.length >= 32 && delete ue[le.shift()], le.push(n), ue[n] = !0 === o, !0 === o;
					}(e, t, r)) return !1;
					const i = yield function(e, t, r) {
						return c(this, null, function* () {
							var n;
							const i = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0, o = null == (n = null == i ? void 0 : i.crypto) ? void 0 : n.subtle;
							if (o) try {
								const n = yield o.importKey("raw", r, { name: "Ed25519" }, !1, ["verify"]);
								return yield o.verify({ name: "Ed25519" }, n, e, t);
							} catch (e) {
								return;
							}
						});
					}(e, t, r);
					return void 0 === i || !0 === i;
				});
			}(v, m, b);
		} catch (e) {
			return se("tampered", r, { payload: g });
		}
		if (!x) return se("tampered", r, { payload: g });
		if (!function(e, t) {
			return e.product === t || !(!t.startsWith("primeui-pro:") || e.product !== "primeui" || "commercial" !== e.tier);
		}(g, t.product)) return se("wrong-product", r, { payload: g });
		const U = 1e3 * g.exp, E = Date.now(), z = Math.floor((U - E) / ie), A = function(e) {
			const t = function(e) {
				if ("number" == typeof e) return Number.isFinite(e) ? 1e3 * e : null;
				if ("string" != typeof e || "" === e) return null;
				const t = Date.parse(e);
				return Number.isNaN(t) ? null : t;
			}(e);
			return null !== t && t >= oe ? t : null;
		}(t.releaseDate);
		if (null === A && !fe(g)) return se("invalid", r, {
			daysUntilExpiry: z,
			payload: g
		});
		if (null !== A && A > U) return se("expired", r, {
			daysUntilExpiry: z,
			payload: g
		});
		if (fe(g)) {
			if (E > U + 30 * ie) return se("expired", r, {
				daysUntilExpiry: z,
				payload: g
			});
			if (E > U) return se("grace", r, {
				daysUntilExpiry: z,
				payload: g
			});
		}
		return se("active", r, {
			daysUntilExpiry: z,
			payload: g
		});
	});
}
function pe(e, t) {
	const r = Object.prototype.hasOwnProperty.call(e, t) ? e[t] : void 0;
	return "string" == typeof r ? r : void 0;
}
function he(e, t) {
	return {
		valid: !1,
		status: e,
		message: X(e, t)
	};
}
function we(e, t) {
	const r = {};
	return {
		verify(t, n) {
			return c(this, null, function* () {
				const i = Q(t), c = J(t), u = null == n ? void 0 : n.releaseDate;
				if (!i) return he("invalid", c);
				const l = pe(e, t), a = pe(e, "primeui");
				if (l) {
					const e = yield de(l, o({
						product: i,
						productLabel: c,
						releaseDate: u
					}, r));
					if (e.valid) return e;
					if ("wrong-product" !== e.status) return e;
				}
				return a && "primeui" !== t && i.startsWith("primeui-pro:") ? de(a, o({
					product: i,
					productLabel: c,
					releaseDate: u
				}, r)) : he(l ? "wrong-product" : "missing", c);
			});
		},
		has(t) {
			const r = Q(t);
			return !!r && (!!pe(e, t) || "primeui" !== t && r.startsWith("primeui-pro:") && !!pe(e, "primeui"));
		}
	};
}
var ye = null;
function ge(e, t) {
	if (!e) throw new Error("[@primeui/license-manager] registerLicense: keys argument is required.");
	return ye = we(e);
}
function me(e, t) {
	if (!ye) {
		const t = J(e);
		return Promise.resolve({
			valid: !1,
			status: "unconfigured",
			message: X("unconfigured", t)
		});
	}
	return ye.verify(e, t);
}
// ../node_modules/primeng/fesm2022/primeng-license.mjs
function showInvalidLicenseBanner() {
	if (typeof document === "undefined") return;
	if (document.getElementById("p-license-host")) return;
	const host = document.createElement("div");
	host.id = "p-license-host";
	host.style.cssText = "all:initial;position:fixed;bottom:16px;right:16px;z-index:2147483647;pointer-events:none;";
	const shadow = host.attachShadow({ mode: "closed" });
	shadow.innerHTML = "<div role=\"alert\" style=\"padding:10px 14px;background:#991b1b;color:#fff;font:600 13px/1.2 system-ui,-apple-system,sans-serif;border-radius:6px;box-shadow:0 4px 12px rgba(0,0,0,0.2);\">Invalid PrimeUI License</div>";
	document.body.appendChild(host);
}
// ../node_modules/primeng/fesm2022/primeng-config.mjs
var _ThemeProvider = class ThemeProvider {
	constructor() {
		_defineProperty(this, "theme", signal(void 0, ...ngDevMode ? [{ debugName: "theme" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "csp", signal({ nonce: void 0 }, ...ngDevMode ? [{ debugName: "csp" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "isThemeChanged", false);
		_defineProperty(this, "document", inject(DOCUMENT));
		_defineProperty(this, "baseStyle", inject(BaseStyle));
		_defineProperty(this, "styleScope", inject(StyleScope));
		_defineProperty(this, "clearCoreStyleNames", () => {
			var _this$styleScope$core;
			return ((_this$styleScope$core = this.styleScope.coreStyleNames) !== null && _this$styleScope$core !== void 0 ? _this$styleScope$core : base_default).clearLoadedStyleNames();
		});
		this.styleScope.service.on("theme:change", this.clearCoreStyleNames);
		effect(() => {
			this.styleScope.service.on("theme:change", (newTheme) => {
				untracked(() => {
					this.isThemeChanged = true;
					this.theme.set(newTheme);
				});
			});
		});
		effect(() => {
			const themeValue = this.theme();
			if (this.document && themeValue) {
				if (!this.isThemeChanged) this.onThemeChange(themeValue);
				this.isThemeChanged = false;
			}
		});
	}
	ngOnDestroy() {
		this.styleScope.service.off("theme:change", this.clearCoreStyleNames);
		if (this.styleScope.isolated) return;
		base_default.clearLoadedStyleNames();
		$e.clearLoadedStyleNames();
		d$1.clear();
	}
	onThemeChange(value) {
		this.styleScope.theme.setTheme(value);
		if (this.document) this.loadCommonTheme();
	}
	loadCommonTheme() {
		if (this.theme() === "none") return;
		if (!this.styleScope.theme.isStyleNameLoaded("common")) {
			var _this$baseStyle$getCo, _this$baseStyle, _this$csp;
			const { primitive, semantic, global, style } = ((_this$baseStyle$getCo = (_this$baseStyle = this.baseStyle).getCommonTheme) === null || _this$baseStyle$getCo === void 0 ? void 0 : _this$baseStyle$getCo.call(_this$baseStyle)) || {};
			const styleOptions = { nonce: (_this$csp = this.csp) === null || _this$csp === void 0 || (_this$csp = _this$csp.call(this)) === null || _this$csp === void 0 ? void 0 : _this$csp.nonce };
			this.baseStyle.load(primitive === null || primitive === void 0 ? void 0 : primitive.css, _objectSpread2({
				name: "primitive-variables",
				variables: true,
				raw: true
			}, styleOptions));
			this.baseStyle.load(semantic === null || semantic === void 0 ? void 0 : semantic.css, _objectSpread2({
				name: "semantic-variables",
				variables: true,
				raw: true
			}, styleOptions));
			this.baseStyle.load(global === null || global === void 0 ? void 0 : global.css, _objectSpread2({
				name: "global-variables",
				variables: true,
				raw: true
			}, styleOptions));
			this.baseStyle.loadBaseStyle(_objectSpread2({ name: "global-style" }, styleOptions), style);
			this.styleScope.theme.setLoadedStyleName("common");
		}
	}
	setThemeConfig(config) {
		const { theme, csp } = config || {};
		if (theme) this.styleScope.prime(theme);
		if (theme) this.theme.set(theme);
		if (csp) this.csp.set(csp);
	}
};
var _PrimeNG;
var ThemeProvider = (_defineProperty(_ThemeProvider, "ɵfac", function ThemeProvider_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _ThemeProvider)();
}), _defineProperty(_ThemeProvider, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _ThemeProvider,
	factory: _ThemeProvider.ɵfac,
	providedIn: "root"
})), _ThemeProvider);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThemeProvider, [{
		type: Injectable,
		args: [{ providedIn: "root" }]
	}], () => [], null);
})();
var PrimeNG = (_PrimeNG = class PrimeNG extends ThemeProvider {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "ripple", signal(false, ...ngDevMode ? [{ debugName: "ripple" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "platformId", inject(PLATFORM_ID));
		_defineProperty(this, "inputVariant", signal(null, ...ngDevMode ? [{ debugName: "inputVariant" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_verified", signal(null, ...ngDevMode ? [{ debugName: "_verified" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "verified", this._verified.asReadonly());
		_defineProperty(this, "overlayAppendTo", signal("self", ...ngDevMode ? [{ debugName: "overlayAppendTo" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "overlayOptions", {});
		_defineProperty(this, "csp", signal({ nonce: void 0 }, ...ngDevMode ? [{ debugName: "csp" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "unstyled", signal(void 0, ...ngDevMode ? [{ debugName: "unstyled" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "preflight", signal(false, ...ngDevMode ? [{ debugName: "preflight" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "pt", signal(void 0, ...ngDevMode ? [{ debugName: "pt" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "ptOptions", signal(void 0, ...ngDevMode ? [{ debugName: "ptOptions" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "filterMatchModeOptions", {
			text: [
				FilterMatchMode.STARTS_WITH,
				FilterMatchMode.CONTAINS,
				FilterMatchMode.NOT_CONTAINS,
				FilterMatchMode.ENDS_WITH,
				FilterMatchMode.EQUALS,
				FilterMatchMode.NOT_EQUALS
			],
			numeric: [
				FilterMatchMode.EQUALS,
				FilterMatchMode.NOT_EQUALS,
				FilterMatchMode.LESS_THAN,
				FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
				FilterMatchMode.GREATER_THAN,
				FilterMatchMode.GREATER_THAN_OR_EQUAL_TO
			],
			date: [
				FilterMatchMode.DATE_IS,
				FilterMatchMode.DATE_IS_NOT,
				FilterMatchMode.DATE_BEFORE,
				FilterMatchMode.DATE_AFTER
			]
		});
		_defineProperty(this, "translation", {
			startsWith: "Starts with",
			contains: "Contains",
			notContains: "Not contains",
			endsWith: "Ends with",
			equals: "Equals",
			notEquals: "Not equals",
			noFilter: "No Filter",
			lt: "Less than",
			lte: "Less than or equal to",
			gt: "Greater than",
			gte: "Greater than or equal to",
			is: "Is",
			isNot: "Is not",
			before: "Before",
			after: "After",
			dateIs: "Date is",
			dateIsNot: "Date is not",
			dateBefore: "Date is before",
			dateAfter: "Date is after",
			clear: "Clear",
			apply: "Apply",
			matchAll: "Match All",
			matchAny: "Match Any",
			addRule: "Add Rule",
			removeRule: "Remove Rule",
			accept: "Yes",
			reject: "No",
			choose: "Choose",
			completed: "Completed",
			upload: "Upload",
			cancel: "Cancel",
			pending: "Pending",
			fileSizeTypes: [
				"B",
				"KB",
				"MB",
				"GB",
				"TB",
				"PB",
				"EB",
				"ZB",
				"YB"
			],
			dayNames: [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday"
			],
			dayNamesShort: [
				"Sun",
				"Mon",
				"Tue",
				"Wed",
				"Thu",
				"Fri",
				"Sat"
			],
			dayNamesMin: [
				"Su",
				"Mo",
				"Tu",
				"We",
				"Th",
				"Fr",
				"Sa"
			],
			monthNames: [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			],
			monthNamesShort: [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec"
			],
			chooseYear: "Choose Year",
			chooseMonth: "Choose Month",
			chooseDate: "Choose Date",
			prevDecade: "Previous Decade",
			nextDecade: "Next Decade",
			prevYear: "Previous Year",
			nextYear: "Next Year",
			prevMonth: "Previous Month",
			nextMonth: "Next Month",
			prevHour: "Previous Hour",
			nextHour: "Next Hour",
			prevMinute: "Previous Minute",
			nextMinute: "Next Minute",
			prevSecond: "Previous Second",
			nextSecond: "Next Second",
			am: "am",
			pm: "pm",
			dateFormat: "mm/dd/yy",
			firstDayOfWeek: 0,
			today: "Today",
			weekHeader: "Wk",
			weak: "Weak",
			medium: "Medium",
			strong: "Strong",
			passwordPrompt: "Enter a password",
			emptyMessage: "No results found",
			searchMessage: "Search results are available",
			selectionMessage: "{0} items selected",
			emptySelectionMessage: "No selected item",
			emptySearchMessage: "No results found",
			emptyFilterMessage: "No results found",
			fileChosenMessage: "Files",
			noFileChosenMessage: "No file chosen",
			aria: {
				trueLabel: "True",
				falseLabel: "False",
				nullLabel: "Not Selected",
				star: "1 star",
				stars: "{star} stars",
				selectAll: "All items selected",
				unselectAll: "All items unselected",
				close: "Close",
				previous: "Previous",
				next: "Next",
				navigation: "Navigation",
				scrollTop: "Scroll Top",
				moveTop: "Move Top",
				moveUp: "Move Up",
				moveDown: "Move Down",
				moveBottom: "Move Bottom",
				moveToTarget: "Move to Target",
				moveToSource: "Move to Source",
				moveAllToTarget: "Move All to Target",
				moveAllToSource: "Move All to Source",
				pageLabel: "{page}",
				firstPageLabel: "First Page",
				lastPageLabel: "Last Page",
				nextPageLabel: "Next Page",
				prevPageLabel: "Previous Page",
				rowsPerPageLabel: "Rows per page",
				previousPageLabel: "Previous Page",
				jumpToPageDropdownLabel: "Jump to Page Dropdown",
				jumpToPageInputLabel: "Jump to Page Input",
				selectRow: "Row Selected",
				unselectRow: "Row Unselected",
				expandRow: "Row Expanded",
				collapseRow: "Row Collapsed",
				expand: "Expand",
				collapse: "Collapse",
				showFilterMenu: "Show Filter Menu",
				hideFilterMenu: "Hide Filter Menu",
				filter: "Filter",
				filterOperator: "Filter Operator",
				filterConstraint: "Filter Constraint",
				editRow: "Row Edit",
				saveEdit: "Save Edit",
				cancelEdit: "Cancel Edit",
				listView: "List View",
				gridView: "Grid View",
				slide: "Slide",
				slideNumber: "{slideNumber}",
				zoomImage: "Zoom Image",
				zoomIn: "Zoom In",
				zoomOut: "Zoom Out",
				rotateRight: "Rotate Right",
				rotateLeft: "Rotate Left",
				listLabel: "Option List",
				selectColor: "Select a color",
				removeLabel: "Remove",
				browseFiles: "Browse Files",
				maximizeLabel: "Maximize",
				minimizeLabel: "Minimize"
			}
		});
		_defineProperty(this, "zIndex", {
			modal: 1100,
			overlay: 1e3,
			menu: 1e3,
			tooltip: 1100
		});
		_defineProperty(this, "translationSource", new Subject());
		_defineProperty(this, "translationObserver", this.translationSource.asObservable());
	}
	_setVerified(value) {
		this._verified.set(value);
	}
	getTranslation(key) {
		return this.translation[key];
	}
	setTranslation(value) {
		this.translation = _objectSpread2(_objectSpread2({}, this.translation), value);
		this.translationSource.next(this.translation);
	}
	setConfig(config) {
		const { csp, ripple, inputVariant, theme, overlayOptions, translation, filterMatchModeOptions, overlayAppendTo, zIndex, ptOptions, pt, unstyled, preflight } = config || {};
		if (csp) this.csp.set(csp);
		if (overlayAppendTo) this.overlayAppendTo.set(overlayAppendTo);
		if (ripple) this.ripple.set(ripple);
		if (inputVariant) this.inputVariant.set(inputVariant);
		if (overlayOptions) this.overlayOptions = overlayOptions;
		if (translation) this.setTranslation(translation);
		if (filterMatchModeOptions) this.filterMatchModeOptions = filterMatchModeOptions;
		if (zIndex) this.zIndex = zIndex;
		if (pt) this.pt.set(pt);
		if (ptOptions) this.ptOptions.set(ptOptions);
		if (unstyled) this.unstyled.set(unstyled);
		if (preflight !== void 0) this.preflight.set(preflight);
		if (theme) this.setThemeConfig({
			theme,
			csp
		});
	}
}, _defineProperty(_PrimeNG, "ɵfac", /*@__PURE__*/ (() => {
	let ɵPrimeNG_BaseFactory = void 0;
	return function PrimeNG_Factory(__ngFactoryType__) {
		return (ɵPrimeNG_BaseFactory || (ɵPrimeNG_BaseFactory = ɵɵgetInheritedFactory(_PrimeNG)))(__ngFactoryType__ || _PrimeNG);
	};
})()), _defineProperty(_PrimeNG, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _PrimeNG,
	factory: _PrimeNG.ɵfac,
	providedIn: "root"
})), _PrimeNG);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PrimeNG, [{
		type: Injectable,
		args: [{ providedIn: "root" }]
	}], null, null);
})();
var PRIME_NG_CONFIG = new InjectionToken("PRIME_NG_CONFIG");
var RELEASE_DATE = "2026-11-12";
var isFeature = (value) => Array.isArray(value === null || value === void 0 ? void 0 : value.ɵproviders);
function providePrimeNG(...features) {
	const configs = features.filter((feature) => !isFeature(feature));
	const installed = features.filter(isFeature);
	const providers = configs.map((feature) => ({
		provide: PRIME_NG_CONFIG,
		useValue: feature,
		multi: false
	}));
	const initializer = provideAppInitializer(() => {
		const PrimeNGConfig = inject(PrimeNG);
		configs.forEach((feature) => PrimeNGConfig.setConfig(feature));
		const license = configs.map((f) => f.license).find(Boolean);
		if (license) ge({ primeui: license });
		me("primeui", { releaseDate: RELEASE_DATE }).then((result) => {
			PrimeNGConfig._setVerified(result.valid);
			if (!result.valid) {
				console.warn(`[PrimeUI] ${result.message}`);
				showInvalidLicenseBanner();
			}
		});
	});
	return makeEnvironmentProviders([
		...providers,
		...installed.flatMap((feature) => feature.ɵproviders),
		initializer
	]);
}
function injectIsolation() {
	return inject(StyleScope).isolation;
}
export { providePrimeNG as a, base_default as c, injectIsolation as i, StyleScope as l, PrimeNG as n, showInvalidLicenseBanner as o, ThemeProvider as r, BaseStyle as s, PRIME_NG_CONFIG as t };
