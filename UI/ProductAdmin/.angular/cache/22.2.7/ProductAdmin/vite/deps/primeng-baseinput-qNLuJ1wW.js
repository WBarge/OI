import { Bt as computed, In as Input, O as booleanAttribute, Tl as signal, Wi as setClassMetadata, X as input, ca as ɵɵInheritDefinitionFeature, dl as inject, io as ɵɵdefineDirective, jo as ɵɵgetInheritedFactory, wn as Directive } from "./core-BRnM5AcM.js";
import { t as BaseModelHolder } from "./primeng-basemodelholder-x_jYLQcg.js";
import { n as _objectSpread2, r as _defineProperty } from "./asyncToGenerator-CE9zIWF7.js";
import { t as Fluid } from "./primeng-fluid-CB8UBKoE.js";
// ../node_modules/primeng/fesm2022/primeng-baseeditableholder.mjs
var _BaseEditableHolder = class BaseEditableHolder extends BaseModelHolder {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "required", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "required" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "invalid", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "invalid" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "disabled", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "name", input(...ngDevMode ? [void 0, { debugName: "name" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_disabled", signal(false, ...ngDevMode ? [{ debugName: "_disabled" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$disabled", computed(() => this.disabled() || this._disabled(), ...ngDevMode ? [{ debugName: "$disabled" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "onModelChange", () => {});
		_defineProperty(this, "onModelTouched", () => {});
	}
	writeDisabledState(value) {
		this._disabled.set(value);
	}
	writeControlValue(value, setModelValue) {}
	writeValue(value) {
		this.writeControlValue(value, this.writeModelValue.bind(this));
	}
	registerOnChange(fn) {
		this.onModelChange = fn;
	}
	registerOnTouched(fn) {
		this.onModelTouched = fn;
	}
	setDisabledState(val) {
		this.writeDisabledState(val);
		this.cd.markForCheck();
	}
};
var BaseEditableHolder = (_defineProperty(_BaseEditableHolder, "ɵfac", /*@__PURE__*/ (() => {
	let ɵBaseEditableHolder_BaseFactory = void 0;
	return function BaseEditableHolder_Factory(__ngFactoryType__) {
		return (ɵBaseEditableHolder_BaseFactory || (ɵBaseEditableHolder_BaseFactory = ɵɵgetInheritedFactory(_BaseEditableHolder)))(__ngFactoryType__ || _BaseEditableHolder);
	};
})()), _defineProperty(_BaseEditableHolder, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _BaseEditableHolder,
	inputs: {
		required: [1, "required"],
		invalid: [1, "invalid"],
		disabled: [1, "disabled"],
		name: [1, "name"]
	},
	features: [ɵɵInheritDefinitionFeature]
})), _BaseEditableHolder);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseEditableHolder, [{
		type: Directive,
		args: [{ standalone: true }]
	}], null, {
		required: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "required",
				required: false
			}]
		}],
		invalid: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "invalid",
				required: false
			}]
		}],
		disabled: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "disabled",
				required: false
			}]
		}],
		name: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "name",
				required: false
			}]
		}]
	});
})();
// ../node_modules/primeng/fesm2022/primeng-baseinput.mjs
var _BaseInput = class BaseInput extends BaseEditableHolder {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "pcFluid", inject(Fluid, {
			optional: true,
			host: true,
			skipSelf: true
		}));
		_defineProperty(this, "fluid", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "fluid" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "variant", input(...ngDevMode ? [void 0, { debugName: "variant" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "size", input(...ngDevMode ? [void 0, { debugName: "size" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "inputSize", input(...ngDevMode ? [void 0, { debugName: "inputSize" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "pattern", input(...ngDevMode ? [void 0, { debugName: "pattern" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "min", input(...ngDevMode ? [void 0, { debugName: "min" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "max", input(...ngDevMode ? [void 0, { debugName: "max" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "step", input(...ngDevMode ? [void 0, { debugName: "step" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "minlength", input(...ngDevMode ? [void 0, { debugName: "minlength" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "maxlength", input(...ngDevMode ? [void 0, { debugName: "maxlength" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$variant", computed(() => this.variant() || this.config.inputVariant() || void 0, ...ngDevMode ? [{ debugName: "$variant" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$pattern", computed(() => {
			const v = this.pattern();
			return typeof v === "string" && v.length > 0 ? v : void 0;
		}, ...ngDevMode ? [{ debugName: "$pattern" }] : /* istanbul ignore next */ []));
	}
	get hasFluid() {
		var _this$fluid;
		return (_this$fluid = this.fluid()) !== null && _this$fluid !== void 0 ? _this$fluid : !!this.pcFluid;
	}
};
var BaseInput = (_defineProperty(_BaseInput, "ɵfac", /*@__PURE__*/ (() => {
	let ɵBaseInput_BaseFactory = void 0;
	return function BaseInput_Factory(__ngFactoryType__) {
		return (ɵBaseInput_BaseFactory || (ɵBaseInput_BaseFactory = ɵɵgetInheritedFactory(_BaseInput)))(__ngFactoryType__ || _BaseInput);
	};
})()), _defineProperty(_BaseInput, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _BaseInput,
	inputs: {
		fluid: [1, "fluid"],
		variant: [1, "variant"],
		size: [1, "size"],
		inputSize: [1, "inputSize"],
		pattern: [1, "pattern"],
		min: [1, "min"],
		max: [1, "max"],
		step: [1, "step"],
		minlength: [1, "minlength"],
		maxlength: [1, "maxlength"]
	},
	features: [ɵɵInheritDefinitionFeature]
})), _BaseInput);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseInput, [{
		type: Directive,
		args: [{ standalone: true }]
	}], null, {
		fluid: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "fluid",
				required: false
			}]
		}],
		variant: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "variant",
				required: false
			}]
		}],
		size: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "size",
				required: false
			}]
		}],
		inputSize: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "inputSize",
				required: false
			}]
		}],
		pattern: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pattern",
				required: false
			}]
		}],
		min: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "min",
				required: false
			}]
		}],
		max: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "max",
				required: false
			}]
		}],
		step: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "step",
				required: false
			}]
		}],
		minlength: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "minlength",
				required: false
			}]
		}],
		maxlength: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "maxlength",
				required: false
			}]
		}]
	});
})();
export { BaseEditableHolder as n, BaseInput as t };
