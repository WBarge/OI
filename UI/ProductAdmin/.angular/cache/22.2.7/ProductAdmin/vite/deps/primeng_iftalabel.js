import { Al as ɵɵdefineInjectable, Dr as ViewEncapsulation, Fn as Injectable, Sa as ɵɵclassMap, Wi as setClassMetadata, an as ChangeDetectionStrategy, ao as ɵɵdefineNgModule, ca as ɵɵInheritDefinitionFeature, cn as Component, cs as ɵɵprojectionDef, dl as inject, jl as ɵɵdefineInjector, jo as ɵɵgetInheritedFactory, kc as InjectionToken, qn as NgModule, ro as ɵɵdefineComponent, sa as ɵɵHostDirectivesFeature, ss as ɵɵprojection, ua as ɵɵProvidersFeature } from "./core-BVpAqhZc.js";
import { SharedModule } from "./primeng_api.js";
import { n as PARENT_INSTANCE, t as BaseComponent } from "./primeng-basecomponent-DFIxl5Fy.js";
import { Bind } from "./primeng_bind.js";
import { s as BaseStyle } from "./primeng-config-EnOVMCIx.js";
import { r as _defineProperty } from "./asyncToGenerator-CE9zIWF7.js";
// ../node_modules/@primeuix/styles/dist/iftalabel/index.mjs
var style = "\n    .p-iftalabel {\n        display: block;\n        position: relative;\n    }\n\n    .p-iftalabel label {\n        position: absolute;\n        pointer-events: none;\n        top: dt('iftalabel.top');\n        transition-property: all;\n        transition-timing-function: ease;\n        line-height: 1;\n        font-size: dt('iftalabel.font.size');\n        font-weight: dt('iftalabel.font.weight');\n        inset-inline-start: dt('iftalabel.position.x');\n        color: dt('iftalabel.color');\n        transition-duration: dt('iftalabel.transition.duration');\n    }\n\n    .p-iftalabel .p-inputtext,\n    .p-iftalabel .p-textarea,\n    .p-iftalabel .p-select-label,\n    .p-iftalabel .p-multiselect-label,\n    .p-iftalabel .p-multiselect-label:has(.p-chip),\n    .p-iftalabel .p-autocomplete-input-multiple,\n    .p-iftalabel .p-inputtags,\n    .p-iftalabel .p-cascadeselect-label,\n    .p-iftalabel .p-treeselect-label {\n        padding-block-start: dt('iftalabel.input.padding.top');\n        padding-block-end: dt('iftalabel.input.padding.bottom');\n    }\n\n    .p-iftalabel:has(.p-invalid) label {\n        color: dt('iftalabel.invalid.color');\n    }\n\n    .p-iftalabel:has(input:focus) label,\n    .p-iftalabel:has(input:-webkit-autofill) label,\n    .p-iftalabel:has(textarea:focus) label,\n    .p-iftalabel:has(.p-inputwrapper-focus) label {\n        color: dt('iftalabel.focus.color');\n    }\n\n    .p-iftalabel .p-inputicon {\n        margin-top: calc((dt('iftalabel.input.padding.top') - dt('iftalabel.input.padding.bottom') - dt('icon.size')) / 2);\n    }\n";
// ../node_modules/primeng/fesm2022/primeng-iftalabel.mjs
var _IftaLabelStyle;
var _IftaLabel;
var _IftaLabelModule;
var classes = { root: "p-iftalabel" };
var IftaLabelStyle = (_IftaLabelStyle = class IftaLabelStyle extends BaseStyle {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "name", "iftalabel");
		_defineProperty(this, "style", style);
		_defineProperty(this, "classes", classes);
	}
}, _defineProperty(_IftaLabelStyle, "ɵfac", /*@__PURE__*/ (() => {
	let ɵIftaLabelStyle_BaseFactory = void 0;
	return function IftaLabelStyle_Factory(__ngFactoryType__) {
		return (ɵIftaLabelStyle_BaseFactory || (ɵIftaLabelStyle_BaseFactory = ɵɵgetInheritedFactory(_IftaLabelStyle)))(__ngFactoryType__ || _IftaLabelStyle);
	};
})()), _defineProperty(_IftaLabelStyle, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _IftaLabelStyle,
	factory: _IftaLabelStyle.ɵfac
})), _IftaLabelStyle);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IftaLabelStyle, [{ type: Injectable }], null, null);
})();
var IftaLabelClasses;
(function(IftaLabelClasses) {
	IftaLabelClasses["root"] = "p-iftalabel";
})(IftaLabelClasses || (IftaLabelClasses = {}));
var IFTALABEL_INSTANCE = new InjectionToken("IFTALABEL_INSTANCE");
var IftaLabel = (_IftaLabel = class IftaLabel extends BaseComponent {
	constructor(..._args2) {
		var _inject;
		super(..._args2);
		_defineProperty(this, "componentName", "IftaLabel");
		_defineProperty(this, "_componentStyle", inject(IftaLabelStyle));
		_defineProperty(this, "$pcIftaLabel", (_inject = inject(IFTALABEL_INSTANCE, {
			optional: true,
			skipSelf: true
		})) !== null && _inject !== void 0 ? _inject : void 0);
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
	}
}, _defineProperty(_IftaLabel, "ɵfac", /*@__PURE__*/ (() => {
	let ɵIftaLabel_BaseFactory = void 0;
	return function IftaLabel_Factory(__ngFactoryType__) {
		return (ɵIftaLabel_BaseFactory || (ɵIftaLabel_BaseFactory = ɵɵgetInheritedFactory(_IftaLabel)))(__ngFactoryType__ || _IftaLabel);
	};
})()), _defineProperty(_IftaLabel, "ɵcmp", (function() {
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _IftaLabel,
		selectors: [["p-iftalabel"], ["p-ifta-label"]],
		hostVars: 2,
		hostBindings: function IftaLabel_HostBindings(rf, ctx) {
			if (rf & 2) ɵɵclassMap(ctx.cx("root"));
		},
		features: [
			ɵɵProvidersFeature([
				IftaLabelStyle,
				{
					provide: IFTALABEL_INSTANCE,
					useExisting: _IftaLabel
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: _IftaLabel
				}
			]),
			ɵɵHostDirectivesFeature([Bind]),
			ɵɵInheritDefinitionFeature
		],
		ngContentSelectors: ["*"],
		decls: 1,
		vars: 0,
		template: function IftaLabel_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵprojectionDef();
				ɵɵprojection(0);
			}
		},
		encapsulation: 2
	});
})()), _IftaLabel);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IftaLabel, [{
		type: Component,
		args: [{
			selector: "p-iftalabel, p-ifta-label",
			standalone: true,
			imports: [],
			template: `<ng-content></ng-content>`,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None,
			providers: [
				IftaLabelStyle,
				{
					provide: IFTALABEL_INSTANCE,
					useExisting: IftaLabel
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: IftaLabel
				}
			],
			hostDirectives: [Bind],
			host: { "[class]": "cx('root')" }
		}]
	}], null, null);
})();
var IftaLabelModule = (_IftaLabelModule = class IftaLabelModule {}, _defineProperty(_IftaLabelModule, "ɵfac", function IftaLabelModule_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _IftaLabelModule)();
}), _defineProperty(_IftaLabelModule, "ɵmod", /*@__PURE__*/ ɵɵdefineNgModule({
	type: _IftaLabelModule,
	imports: [IftaLabel, SharedModule],
	exports: [IftaLabel, SharedModule]
})), _defineProperty(_IftaLabelModule, "ɵinj", /*@__PURE__*/ ɵɵdefineInjector({ imports: [SharedModule, SharedModule] })), _IftaLabelModule);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IftaLabelModule, [{
		type: NgModule,
		args: [{
			imports: [IftaLabel, SharedModule],
			exports: [IftaLabel, SharedModule]
		}]
	}], null, null);
})();
export { IftaLabel, IftaLabelClasses, IftaLabelModule, IftaLabelStyle };
