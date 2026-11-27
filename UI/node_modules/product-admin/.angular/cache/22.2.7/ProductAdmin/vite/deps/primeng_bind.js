import { Bt as computed, En as ElementRef, In as Input, Sa as ɵɵclassMap, Tl as signal, Vs as ɵɵstyleMap, Wi as setClassMetadata, X as input, ao as ɵɵdefineNgModule, dl as inject, il as effect, io as ɵɵdefineDirective, ir as Renderer2, jl as ɵɵdefineInjector, qc as SecurityContext, qn as NgModule, wn as Directive } from "./core-BVpAqhZc.js";
import { r as DomSanitizer } from "./platform-browser-pU9S9n-8.js";
import { g as b } from "./dist-D971aPsi.js";
import { n as a } from "./classnames-CS4uITFG.js";
import { r as markInstance } from "./primeng-utils-D5gG-ZJT.js";
import { r as _defineProperty } from "./asyncToGenerator-CE9zIWF7.js";
// ../node_modules/primeng/fesm2022/primeng-bind.mjs
var _Bind;
var _BindModule;
var SANITIZED_SINKS = {
	innerhtml: SecurityContext.HTML,
	srcdoc: SecurityContext.HTML,
	href: SecurityContext.URL,
	src: SecurityContext.URL,
	action: SecurityContext.URL,
	formaction: SecurityContext.URL
};
var REJECTED_SINKS = /* @__PURE__ */ new Set(["outerhtml"]);
var Bind = (_Bind = class Bind {
	constructor() {
		_defineProperty(this, "pBind", input(void 0, ...ngDevMode ? [{ debugName: "pBind" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_attrs", signal(void 0, ...ngDevMode ? [{ debugName: "_attrs" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "attrs", computed(() => this._attrs() || this.pBind(), ...ngDevMode ? [{ debugName: "attrs" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "styles", computed(() => {
			var _this$attrs;
			return (_this$attrs = this.attrs()) === null || _this$attrs === void 0 ? void 0 : _this$attrs.style;
		}, ...ngDevMode ? [{ debugName: "styles" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "classes", computed(() => {
			var _this$attrs2;
			return a((_this$attrs2 = this.attrs()) === null || _this$attrs2 === void 0 ? void 0 : _this$attrs2.class);
		}, ...ngDevMode ? [{ debugName: "classes" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "listeners", []);
		_defineProperty(this, "el", inject(ElementRef));
		_defineProperty(this, "renderer", inject(Renderer2));
		_defineProperty(this, "sanitizer", inject(DomSanitizer));
		effect(() => {
			const attrs = this.attrs() || {};
			const rest = Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== "style" && key !== "class"));
			for (const [key, value] of Object.entries(rest)) {
				const normalizedKey = key.toLowerCase();
				if (normalizedKey.startsWith("on")) {
					if (typeof value === "function") {
						const eventName = normalizedKey.slice(2);
						if (!this.listeners.some((l) => l.eventName === eventName)) {
							const unlisten = this.renderer.listen(this.el.nativeElement, eventName, value);
							this.listeners.push({
								eventName,
								unlisten
							});
						}
					}
				} else if (value === null || value === void 0) this.renderer.removeAttribute(this.el.nativeElement, key);
				else if (REJECTED_SINKS.has(normalizedKey)) continue;
				else if (SANITIZED_SINKS[normalizedKey] !== void 0) {
					var _this$sanitizer$sanit;
					const safe = (_this$sanitizer$sanit = this.sanitizer.sanitize(SANITIZED_SINKS[normalizedKey], value.toString())) !== null && _this$sanitizer$sanit !== void 0 ? _this$sanitizer$sanit : "";
					this.renderer.setAttribute(this.el.nativeElement, key, safe);
					if (key in this.el.nativeElement) this.el.nativeElement[key] = safe;
				} else if (key === "data-pc-id") markInstance(this.el.nativeElement, value.toString());
				else {
					this.renderer.setAttribute(this.el.nativeElement, key, value.toString());
					if (key in this.el.nativeElement) this.el.nativeElement[key] = value;
				}
			}
		});
	}
	ngOnDestroy() {
		this.clearListeners();
	}
	setAttrs(attrs) {
		if (!b(this._attrs(), attrs)) this._attrs.set(attrs);
	}
	clearListeners() {
		this.listeners.forEach(({ unlisten }) => unlisten());
		this.listeners = [];
	}
}, _defineProperty(_Bind, "ɵfac", function Bind_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _Bind)();
}), _defineProperty(_Bind, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _Bind,
	selectors: [[
		"",
		"pBind",
		""
	]],
	hostVars: 4,
	hostBindings: function Bind_HostBindings(rf, ctx) {
		if (rf & 2) {
			ɵɵstyleMap(ctx.styles());
			ɵɵclassMap(ctx.classes());
		}
	},
	inputs: { pBind: [1, "pBind"] }
})), _Bind);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Bind, [{
		type: Directive,
		args: [{
			selector: "[pBind]",
			standalone: true,
			host: {
				"[style]": "styles()",
				"[class]": "classes()"
			}
		}]
	}], () => [], { pBind: [{
		type: Input,
		args: [{
			isSignal: true,
			alias: "pBind",
			required: false
		}]
	}] });
})();
var BindModule = (_BindModule = class BindModule {}, _defineProperty(_BindModule, "ɵfac", function BindModule_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _BindModule)();
}), _defineProperty(_BindModule, "ɵmod", /*@__PURE__*/ ɵɵdefineNgModule({
	type: _BindModule,
	imports: [Bind],
	exports: [Bind]
})), _defineProperty(_BindModule, "ɵinj", /*@__PURE__*/ ɵɵdefineInjector({})), _BindModule);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BindModule, [{
		type: NgModule,
		args: [{
			imports: [Bind],
			exports: [Bind]
		}]
	}], null, null);
})();
export { Bind, BindModule };
