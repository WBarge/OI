import { u as isPlatformBrowser } from "./common-BHJivUlT.js";
import { Al as ɵɵdefineInjectable, Fn as Injectable, Sa as ɵɵclassMap, Wi as setClassMetadata, ao as ɵɵdefineNgModule, ca as ɵɵInheritDefinitionFeature, dl as inject, il as effect, io as ɵɵdefineDirective, jl as ɵɵdefineInjector, jo as ɵɵgetInheritedFactory, qn as NgModule, qt as untracked, ua as ɵɵProvidersFeature, wn as Directive } from "./core-BRnM5AcM.js";
import "./dist-D971aPsi.js";
import { $ as L, Et as pe, K as Dt, et as M, ft as Zt, gt as ft, nt as R, st as W } from "./dist-BnkFXv39.js";
import { t as BaseComponent } from "./primeng-basecomponent-eFp8WNlF.js";
import { s as BaseStyle } from "./primeng-config-E0JoXWcg.js";
import { r as _defineProperty } from "./asyncToGenerator-CE9zIWF7.js";
// ../node_modules/@primeuix/styles/dist/ripple/index.mjs
var style$1 = "\n    .p-ink {\n        display: block;\n        position: absolute;\n        background: dt('ripple.background');\n        border-radius: 100%;\n        transform: scale(0);\n        pointer-events: none;\n    }\n\n    .p-ink-active {\n        animation: ripple 0.4s linear;\n    }\n\n    @keyframes ripple {\n        100% {\n            opacity: 0;\n            transform: scale(2.5);\n        }\n    }\n";
// ../node_modules/primeng/fesm2022/primeng-ripple.mjs
var _RippleStyle;
var _Ripple;
var _RippleModule;
var style = `
    ${style$1}

    /* For PrimeNG */
    .p-ripple {
        overflow: hidden;
        position: relative;
    }

    .p-ripple-disabled .p-ink {
        display: none !important;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`;
var classes = { root: "p-ink" };
var RippleStyle = (_RippleStyle = class RippleStyle extends BaseStyle {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "name", "ripple");
		_defineProperty(this, "style", style);
		_defineProperty(this, "classes", classes);
	}
}, _defineProperty(_RippleStyle, "ɵfac", /*@__PURE__*/ (() => {
	let ɵRippleStyle_BaseFactory = void 0;
	return function RippleStyle_Factory(__ngFactoryType__) {
		return (ɵRippleStyle_BaseFactory || (ɵRippleStyle_BaseFactory = ɵɵgetInheritedFactory(_RippleStyle)))(__ngFactoryType__ || _RippleStyle);
	};
})()), _defineProperty(_RippleStyle, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _RippleStyle,
	factory: _RippleStyle.ɵfac
})), _RippleStyle);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RippleStyle, [{ type: Injectable }], null, null);
})();
var RippleClasses;
(function(RippleClasses) {
	RippleClasses["root"] = "p-ink";
})(RippleClasses || (RippleClasses = {}));
var Ripple = (_Ripple = class Ripple extends BaseComponent {
	constructor() {
		super();
		_defineProperty(this, "componentName", "Ripple");
		_defineProperty(this, "_componentStyle", inject(RippleStyle));
		_defineProperty(this, "animationListener", void 0);
		_defineProperty(this, "mouseDownListener", void 0);
		_defineProperty(this, "timeout", void 0);
		effect(() => {
			if (isPlatformBrowser(this.platformId)) {
				if (this.config.ripple()) untracked(() => {
					if (this.getInk()) return;
					this.create();
					this.mouseDownListener = this.renderer.listen(this.el.nativeElement, "mousedown", this.onMouseDown.bind(this));
				});
				else this.remove();
			}
		});
	}
	onMouseDown(event) {
		var _this$document$defaul;
		let ink = this.getInk();
		if (!ink || ((_this$document$defaul = this.document.defaultView) === null || _this$document$defaul === void 0 ? void 0 : _this$document$defaul.getComputedStyle(ink, null).display) === "none") return;
		if (!this.$unstyled()) W(ink, this.pcn("p-ink-active"));
		ink.setAttribute("data-p-ink-active", "false");
		if (!Dt(ink) && !Zt(ink)) {
			let d = Math.max(L(this.el.nativeElement), R(this.el.nativeElement));
			ink.style.height = d + "px";
			ink.style.width = d + "px";
		}
		const offset = ft(this.el.nativeElement);
		let x = event.pageX - offset.left + this.document.body.scrollTop - Zt(ink) / 2;
		let y = event.pageY - offset.top + this.document.body.scrollLeft - Dt(ink) / 2;
		this.renderer.setStyle(ink, "top", y + "px");
		this.renderer.setStyle(ink, "left", x + "px");
		if (!this.$unstyled()) M(ink, this.pcn("p-ink-active"));
		ink.setAttribute("data-p-ink-active", "true");
		this.timeout = setTimeout(() => {
			let ink = this.getInk();
			if (ink) {
				if (!this.$unstyled()) W(ink, this.pcn("p-ink-active"));
				ink.setAttribute("data-p-ink-active", "false");
			}
		}, 401);
	}
	getInk() {
		const children = this.el.nativeElement.children;
		for (let i = 0; i < children.length; i++) if (children[i].getAttribute("data-p-ink") === "true") return children[i];
		return null;
	}
	resetInk() {
		let ink = this.getInk();
		if (ink) {
			if (!this.$unstyled()) W(ink, this.pcn("p-ink-active"));
			ink.setAttribute("data-p-ink-active", "false");
		}
	}
	onAnimationEnd(event) {
		if (this.timeout) clearTimeout(this.timeout);
		if (!this.$unstyled()) W(event.currentTarget, this.pcn("p-ink-active"));
		event.currentTarget.setAttribute("data-p-ink-active", "false");
	}
	create() {
		let ink = this.renderer.createElement("span");
		this.renderer.addClass(ink, this.pcn("p-ink"));
		this.renderer.appendChild(this.el.nativeElement, ink);
		this.renderer.setAttribute(ink, "data-p-ink", "true");
		this.renderer.setAttribute(ink, "data-p-ink-active", "false");
		this.renderer.setAttribute(ink, "aria-hidden", "true");
		this.renderer.setAttribute(ink, "role", "presentation");
		if (!this.animationListener) this.animationListener = this.renderer.listen(ink, "animationend", this.onAnimationEnd.bind(this));
	}
	remove() {
		let ink = this.getInk();
		if (ink) {
			if (this.mouseDownListener) this.mouseDownListener();
			if (this.animationListener) this.animationListener();
			this.mouseDownListener = null;
			this.animationListener = null;
			pe(ink);
		}
	}
	onDestroy() {
		if (this.config && this.config.ripple()) this.remove();
	}
}, _defineProperty(_Ripple, "ɵfac", function Ripple_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _Ripple)();
}), _defineProperty(_Ripple, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _Ripple,
	selectors: [[
		"",
		"pRipple",
		""
	]],
	hostVars: 2,
	hostBindings: function Ripple_HostBindings(rf, ctx) {
		if (rf & 2) ɵɵclassMap(ctx.pcn("p-ripple"));
	},
	features: [ɵɵProvidersFeature([RippleStyle]), ɵɵInheritDefinitionFeature]
})), _Ripple);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Ripple, [{
		type: Directive,
		args: [{
			selector: "[pRipple]",
			host: { "[class]": "pcn('p-ripple')" },
			standalone: true,
			providers: [RippleStyle]
		}]
	}], () => [], null);
})();
var RippleModule = (_RippleModule = class RippleModule {}, _defineProperty(_RippleModule, "ɵfac", function RippleModule_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _RippleModule)();
}), _defineProperty(_RippleModule, "ɵmod", /*@__PURE__*/ ɵɵdefineNgModule({
	type: _RippleModule,
	imports: [Ripple],
	exports: [Ripple]
})), _defineProperty(_RippleModule, "ɵinj", /*@__PURE__*/ ɵɵdefineInjector({})), _RippleModule);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RippleModule, [{
		type: NgModule,
		args: [{
			imports: [Ripple],
			exports: [Ripple]
		}]
	}], null, null);
})();
export { Ripple as t };
