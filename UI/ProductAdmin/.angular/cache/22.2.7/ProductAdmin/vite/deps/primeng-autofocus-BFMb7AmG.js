import { u as isPlatformBrowser } from "./common-BHJivUlT.js";
import { En as ElementRef, In as Input, O as booleanAttribute, Wi as setClassMetadata, X as input, ao as ɵɵdefineNgModule, ca as ɵɵInheritDefinitionFeature, dl as inject, io as ɵɵdefineDirective, jl as ɵɵdefineInjector, jo as ɵɵgetInheritedFactory, qn as NgModule, wn as Directive } from "./core-BRnM5AcM.js";
import { i as DomHandler, t as BaseComponent } from "./primeng-basecomponent-eFp8WNlF.js";
import { n as _objectSpread2, r as _defineProperty } from "./asyncToGenerator-CE9zIWF7.js";
// ../node_modules/primeng/fesm2022/primeng-autofocus.mjs
var _AutoFocus = class AutoFocus extends BaseComponent {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "autofocus", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "autofocus" } : /* istanbul ignore next */ {}), {}, {
			alias: "pAutoFocus",
			transform: booleanAttribute
		})));
		_defineProperty(this, "focused", false);
		_defineProperty(this, "host", inject(ElementRef));
	}
	onAfterContentChecked() {
		if (this.autofocus() === false) this.host.nativeElement.removeAttribute("autofocus");
		else this.host.nativeElement.setAttribute("autofocus", true);
		if (!this.focused) this.autoFocus();
	}
	onAfterViewChecked() {
		if (!this.focused) this.autoFocus();
	}
	autoFocus() {
		if (isPlatformBrowser(this.platformId) && this.autofocus()) setTimeout(() => {
			var _this$host;
			const focusableElements = DomHandler.getFocusableElements((_this$host = this.host) === null || _this$host === void 0 ? void 0 : _this$host.nativeElement);
			if (focusableElements.length === 0) this.host.nativeElement.focus();
			if (focusableElements.length > 0) focusableElements[0].focus();
			this.focused = true;
		});
	}
};
var _AutoFocusModule;
var AutoFocus = (_defineProperty(_AutoFocus, "ɵfac", /*@__PURE__*/ (() => {
	let ɵAutoFocus_BaseFactory = void 0;
	return function AutoFocus_Factory(__ngFactoryType__) {
		return (ɵAutoFocus_BaseFactory || (ɵAutoFocus_BaseFactory = ɵɵgetInheritedFactory(_AutoFocus)))(__ngFactoryType__ || _AutoFocus);
	};
})()), _defineProperty(_AutoFocus, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _AutoFocus,
	selectors: [[
		"",
		"pAutoFocus",
		""
	]],
	inputs: { autofocus: [
		1,
		"pAutoFocus",
		"autofocus"
	] },
	features: [ɵɵInheritDefinitionFeature]
})), _AutoFocus);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AutoFocus, [{
		type: Directive,
		args: [{
			selector: "[pAutoFocus]",
			standalone: true
		}]
	}], null, { autofocus: [{
		type: Input,
		args: [{
			isSignal: true,
			alias: "pAutoFocus",
			required: false
		}]
	}] });
})();
var AutoFocusModule = (_AutoFocusModule = class AutoFocusModule {}, _defineProperty(_AutoFocusModule, "ɵfac", function AutoFocusModule_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _AutoFocusModule)();
}), _defineProperty(_AutoFocusModule, "ɵmod", /*@__PURE__*/ ɵɵdefineNgModule({
	type: _AutoFocusModule,
	imports: [AutoFocus],
	exports: [AutoFocus]
})), _defineProperty(_AutoFocusModule, "ɵinj", /*@__PURE__*/ ɵɵdefineInjector({})), _AutoFocusModule);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AutoFocusModule, [{
		type: NgModule,
		args: [{
			imports: [AutoFocus],
			exports: [AutoFocus]
		}]
	}], null, null);
})();
export { AutoFocus as t };
