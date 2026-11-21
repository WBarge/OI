import { $n as Output, Al as ɵɵdefineInjectable, Bt as computed, Fn as Injectable, In as Input, O as booleanAttribute, Qo as ɵɵlistener, Sa as ɵɵclassMap, Wi as setClassMetadata, X as input, ao as ɵɵdefineNgModule, at as output, ca as ɵɵInheritDefinitionFeature, dl as inject, il as effect, io as ɵɵdefineDirective, jl as ɵɵdefineInjector, jo as ɵɵgetInheritedFactory, kc as InjectionToken, kn as HostListener, qn as NgModule, sa as ɵɵHostDirectivesFeature, ua as ɵɵProvidersFeature, vc as DestroyRef, wn as Directive } from "./core-BRnM5AcM.js";
import { t as takeUntilDestroyed } from "./rxjs-interop-DtRZiohl.js";
import { NgControl } from "./@angular_forms.js";
import { n as PARENT_INSTANCE } from "./primeng-basecomponent-eFp8WNlF.js";
import { t as BaseModelHolder } from "./primeng-basemodelholder-x_jYLQcg.js";
import { Bind } from "./primeng_bind.js";
import { t as Fluid } from "./primeng-fluid-CB8UBKoE.js";
import { s as BaseStyle } from "./primeng-config-E0JoXWcg.js";
import { n as _objectSpread2, r as _defineProperty } from "./asyncToGenerator-CE9zIWF7.js";
// ../node_modules/@primeuix/styles/dist/textarea/index.mjs
var style = "\n    .p-textarea {\n        font-weight: dt('textarea.font.weight');\n        font-size: dt('textarea.font.size');\n        color: dt('textarea.color');\n        background: dt('textarea.background');\n        padding-block: dt('textarea.padding.y');\n        padding-inline: dt('textarea.padding.x');\n        border: 1px solid dt('textarea.border.color');\n        transition:\n            background dt('textarea.transition.duration'),\n            color dt('textarea.transition.duration'),\n            border-color dt('textarea.transition.duration'),\n            outline-color dt('textarea.transition.duration'),\n            box-shadow dt('textarea.transition.duration');\n        appearance: none;\n        border-radius: dt('textarea.border.radius');\n        outline-color: transparent;\n        box-shadow: dt('textarea.shadow');\n    }\n\n    .p-textarea:enabled:hover {\n        border-color: dt('textarea.hover.border.color');\n    }\n\n    .p-textarea:enabled:focus {\n        border-color: dt('textarea.focus.border.color');\n        box-shadow: dt('textarea.focus.ring.shadow');\n        outline: dt('textarea.focus.ring.width') dt('textarea.focus.ring.style') dt('textarea.focus.ring.color');\n        outline-offset: dt('textarea.focus.ring.offset');\n    }\n\n    .p-textarea.p-invalid {\n        border-color: dt('textarea.invalid.border.color');\n    }\n\n    .p-textarea.p-variant-filled {\n        background: dt('textarea.filled.background');\n    }\n\n    .p-textarea.p-variant-filled:enabled:hover {\n        background: dt('textarea.filled.hover.background');\n    }\n\n    .p-textarea.p-variant-filled:enabled:focus {\n        background: dt('textarea.filled.focus.background');\n    }\n\n    .p-textarea:disabled {\n        opacity: 1;\n        background: dt('textarea.disabled.background');\n        color: dt('textarea.disabled.color');\n    }\n\n    .p-textarea::placeholder {\n        color: dt('textarea.placeholder.color');\n    }\n\n    .p-textarea.p-invalid::placeholder {\n        color: dt('textarea.invalid.placeholder.color');\n    }\n\n    .p-textarea-fluid {\n        width: 100%;\n    }\n\n    .p-textarea-resizable {\n        overflow: hidden;\n        resize: none;\n    }\n\n    .p-textarea-sm {\n        font-size: dt('textarea.sm.font.size');\n        padding-block: dt('textarea.sm.padding.y');\n        padding-inline: dt('textarea.sm.padding.x');\n    }\n\n    .p-textarea-lg {\n        font-size: dt('textarea.lg.font.size');\n        padding-block: dt('textarea.lg.padding.y');\n        padding-inline: dt('textarea.lg.padding.x');\n    }\n";
// ../node_modules/primeng/fesm2022/primeng-textarea.mjs
var _TextareaStyle;
var _Textarea;
var _TextareaModule;
var classes = { root: ({ instance }) => ["p-textarea p-component", {
	"p-filled": instance.$filled(),
	"p-textarea-resizable ": instance.autoResize(),
	"p-variant-filled": instance.$variant() === "filled",
	"p-textarea-fluid": instance.hasFluid,
	"p-inputfield-sm p-textarea-sm": instance.pSize() === "small",
	"p-textarea-lg p-inputfield-lg": instance.pSize() === "large",
	"p-invalid": instance.invalid()
}] };
var TextareaStyle = (_TextareaStyle = class TextareaStyle extends BaseStyle {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "name", "textarea");
		_defineProperty(this, "style", style);
		_defineProperty(this, "classes", classes);
	}
}, _defineProperty(_TextareaStyle, "ɵfac", /*@__PURE__*/ (() => {
	let ɵTextareaStyle_BaseFactory = void 0;
	return function TextareaStyle_Factory(__ngFactoryType__) {
		return (ɵTextareaStyle_BaseFactory || (ɵTextareaStyle_BaseFactory = ɵɵgetInheritedFactory(_TextareaStyle)))(__ngFactoryType__ || _TextareaStyle);
	};
})()), _defineProperty(_TextareaStyle, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _TextareaStyle,
	factory: _TextareaStyle.ɵfac
})), _TextareaStyle);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TextareaStyle, [{ type: Injectable }], null, null);
})();
var TextareaClasses;
(function(TextareaClasses) {
	TextareaClasses["root"] = "p-textarea";
})(TextareaClasses || (TextareaClasses = {}));
var TEXTAREA_INSTANCE = new InjectionToken("TEXTAREA_INSTANCE");
var Textarea = (_Textarea = class Textarea extends BaseModelHolder {
	get hasFluid() {
		var _this$fluid;
		return (_this$fluid = this.fluid()) !== null && _this$fluid !== void 0 ? _this$fluid : !!this.pcFluid;
	}
	constructor() {
		var _inject;
		super();
		_defineProperty(this, "componentName", "Textarea");
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		_defineProperty(this, "$pcTextarea", (_inject = inject(TEXTAREA_INSTANCE, {
			optional: true,
			skipSelf: true
		})) !== null && _inject !== void 0 ? _inject : void 0);
		_defineProperty(this, "pTextareaPT", input(...ngDevMode ? [void 0, { debugName: "pTextareaPT" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "pTextareaUnstyled", input(...ngDevMode ? [void 0, { debugName: "pTextareaUnstyled" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "autoResize", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "autoResize" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "pSize", input(...ngDevMode ? [void 0, { debugName: "pSize" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "variant", input(...ngDevMode ? [void 0, { debugName: "variant" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "fluid", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "fluid" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "invalid", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "invalid" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "$variant", computed(() => this.variant() || this.config.inputVariant() || void 0, ...ngDevMode ? [{ debugName: "$variant" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "onResize", output());
		_defineProperty(this, "_componentStyle", inject(TextareaStyle));
		_defineProperty(this, "ngControl", inject(NgControl, {
			optional: true,
			self: true
		}));
		_defineProperty(this, "pcFluid", inject(Fluid, {
			optional: true,
			host: true,
			skipSelf: true
		}));
		_defineProperty(this, "destroyRef", inject(DestroyRef));
		effect(() => {
			const pt = this.pTextareaPT();
			if (pt) this.directivePT.set(pt);
		});
		effect(() => {
			if (this.pTextareaUnstyled()) this.directiveUnstyled.set(this.pTextareaUnstyled());
		});
	}
	onInit() {
		if (this.ngControl && this.ngControl.valueChanges) this.ngControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
			this.updateState();
		});
	}
	onAfterViewInit() {
		if (this.autoResize()) this.resize();
		this.cd.detectChanges();
	}
	onAfterViewChecked() {
		var _this$ngControl$value, _this$ngControl;
		this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
		if (this.autoResize()) this.resize();
		this.writeModelValue((_this$ngControl$value = (_this$ngControl = this.ngControl) === null || _this$ngControl === void 0 ? void 0 : _this$ngControl.value) !== null && _this$ngControl$value !== void 0 ? _this$ngControl$value : this.el.nativeElement.value);
	}
	onInput(e) {
		var _e$target;
		this.writeModelValue((_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.value);
		this.updateState();
	}
	resize(event) {
		this.el.nativeElement.style.height = "auto";
		this.el.nativeElement.style.height = this.el.nativeElement.scrollHeight + "px";
		if (parseFloat(this.el.nativeElement.style.height) >= parseFloat(this.el.nativeElement.style.maxHeight)) {
			this.el.nativeElement.style.overflowY = "scroll";
			this.el.nativeElement.style.height = this.el.nativeElement.style.maxHeight;
		} else this.el.nativeElement.style.overflow = "hidden";
		this.onResize.emit(event || {});
	}
	updateState() {
		if (this.autoResize()) this.resize();
	}
}, _defineProperty(_Textarea, "ɵfac", function Textarea_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _Textarea)();
}), _defineProperty(_Textarea, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _Textarea,
	selectors: [[
		"",
		"pTextarea",
		""
	], [
		"",
		"pInputTextarea",
		""
	]],
	hostVars: 2,
	hostBindings: function Textarea_HostBindings(rf, ctx) {
		if (rf & 1) ɵɵlistener("input", function Textarea_input_HostBindingHandler($event) {
			return ctx.onInput($event);
		});
		if (rf & 2) ɵɵclassMap(ctx.cx("root"));
	},
	inputs: {
		pTextareaPT: [1, "pTextareaPT"],
		pTextareaUnstyled: [1, "pTextareaUnstyled"],
		autoResize: [1, "autoResize"],
		pSize: [1, "pSize"],
		variant: [1, "variant"],
		fluid: [1, "fluid"],
		invalid: [1, "invalid"]
	},
	outputs: { onResize: "onResize" },
	features: [
		ɵɵProvidersFeature([
			TextareaStyle,
			{
				provide: TEXTAREA_INSTANCE,
				useExisting: _Textarea
			},
			{
				provide: PARENT_INSTANCE,
				useExisting: _Textarea
			}
		]),
		ɵɵHostDirectivesFeature([Bind]),
		ɵɵInheritDefinitionFeature
	]
})), _Textarea);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Textarea, [{
		type: Directive,
		args: [{
			selector: "[pTextarea], [pInputTextarea]",
			standalone: true,
			host: { "[class]": "cx('root')" },
			providers: [
				TextareaStyle,
				{
					provide: TEXTAREA_INSTANCE,
					useExisting: Textarea
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: Textarea
				}
			],
			hostDirectives: [Bind]
		}]
	}], () => [], {
		pTextareaPT: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pTextareaPT",
				required: false
			}]
		}],
		pTextareaUnstyled: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pTextareaUnstyled",
				required: false
			}]
		}],
		autoResize: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "autoResize",
				required: false
			}]
		}],
		pSize: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pSize",
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
		fluid: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "fluid",
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
		onResize: [{
			type: Output,
			args: ["onResize"]
		}],
		onInput: [{
			type: HostListener,
			args: ["input", ["$event"]]
		}]
	});
})();
var TextareaModule = (_TextareaModule = class TextareaModule {}, _defineProperty(_TextareaModule, "ɵfac", function TextareaModule_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _TextareaModule)();
}), _defineProperty(_TextareaModule, "ɵmod", /*@__PURE__*/ ɵɵdefineNgModule({
	type: _TextareaModule,
	imports: [Textarea],
	exports: [Textarea]
})), _defineProperty(_TextareaModule, "ɵinj", /*@__PURE__*/ ɵɵdefineInjector({})), _TextareaModule);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TextareaModule, [{
		type: NgModule,
		args: [{
			imports: [Textarea],
			exports: [Textarea]
		}]
	}], null, null);
})();
export { Textarea, TextareaClasses, TextareaModule, TextareaStyle };
