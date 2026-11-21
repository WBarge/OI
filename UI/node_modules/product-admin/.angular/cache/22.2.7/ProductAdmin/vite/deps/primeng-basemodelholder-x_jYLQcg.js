import { Bt as computed, Tl as signal, Wi as setClassMetadata, ca as ɵɵInheritDefinitionFeature, io as ɵɵdefineDirective, jo as ɵɵgetInheritedFactory, wn as Directive } from "./core-BRnM5AcM.js";
import { x as l } from "./dist-D971aPsi.js";
import { t as BaseComponent } from "./primeng-basecomponent-eFp8WNlF.js";
import { r as _defineProperty } from "./asyncToGenerator-CE9zIWF7.js";
// ../node_modules/primeng/fesm2022/primeng-basemodelholder.mjs
var _BaseModelHolder = class BaseModelHolder extends BaseComponent {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "modelValue", signal(void 0, ...ngDevMode ? [{ debugName: "modelValue" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$filled", computed(() => l(this.modelValue()), ...ngDevMode ? [{ debugName: "$filled" }] : /* istanbul ignore next */ []));
	}
	writeModelValue(value) {
		this.modelValue.set(value);
	}
};
var BaseModelHolder = (_defineProperty(_BaseModelHolder, "ɵfac", /*@__PURE__*/ (() => {
	let ɵBaseModelHolder_BaseFactory = void 0;
	return function BaseModelHolder_Factory(__ngFactoryType__) {
		return (ɵBaseModelHolder_BaseFactory || (ɵBaseModelHolder_BaseFactory = ɵɵgetInheritedFactory(_BaseModelHolder)))(__ngFactoryType__ || _BaseModelHolder);
	};
})()), _defineProperty(_BaseModelHolder, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _BaseModelHolder,
	features: [ɵɵInheritDefinitionFeature]
})), _BaseModelHolder);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseModelHolder, [{
		type: Directive,
		args: [{ standalone: true }]
	}], null, null);
})();
export { BaseModelHolder as t };
