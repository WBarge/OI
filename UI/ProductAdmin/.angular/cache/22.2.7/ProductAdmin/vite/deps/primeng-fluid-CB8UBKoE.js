import { x as CommonModule } from "./common-BHJivUlT.js";
import { Al as ɵɵdefineInjectable, Dr as ViewEncapsulation, Fn as Injectable, Sa as ɵɵclassMap, Wi as setClassMetadata, an as ChangeDetectionStrategy, ao as ɵɵdefineNgModule, ca as ɵɵInheritDefinitionFeature, cn as Component, cs as ɵɵprojectionDef, dl as inject, jl as ɵɵdefineInjector, jo as ɵɵgetInheritedFactory, kc as InjectionToken, qn as NgModule, ro as ɵɵdefineComponent, sa as ɵɵHostDirectivesFeature, ss as ɵɵprojection, ua as ɵɵProvidersFeature } from "./core-BRnM5AcM.js";
import { n as PARENT_INSTANCE, t as BaseComponent } from "./primeng-basecomponent-eFp8WNlF.js";
import { Bind } from "./primeng_bind.js";
import { s as BaseStyle } from "./primeng-config-E0JoXWcg.js";
import { r as _defineProperty } from "./asyncToGenerator-CE9zIWF7.js";
// ../node_modules/primeng/fesm2022/primeng-fluid.mjs
var _FluidStyle;
var _Fluid;
var _FluidModule;
var classes = { root: "p-fluid" };
var FluidStyle = (_FluidStyle = class FluidStyle extends BaseStyle {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "name", "fluid");
		_defineProperty(this, "classes", classes);
	}
}, _defineProperty(_FluidStyle, "ɵfac", /*@__PURE__*/ (() => {
	let ɵFluidStyle_BaseFactory = void 0;
	return function FluidStyle_Factory(__ngFactoryType__) {
		return (ɵFluidStyle_BaseFactory || (ɵFluidStyle_BaseFactory = ɵɵgetInheritedFactory(_FluidStyle)))(__ngFactoryType__ || _FluidStyle);
	};
})()), _defineProperty(_FluidStyle, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _FluidStyle,
	factory: _FluidStyle.ɵfac
})), _FluidStyle);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FluidStyle, [{ type: Injectable }], null, null);
})();
var FluidClasses;
(function(FluidClasses) {
	FluidClasses["root"] = "p-fluid";
})(FluidClasses || (FluidClasses = {}));
var FLUID_INSTANCE = new InjectionToken("FLUID_INSTANCE");
var Fluid = (_Fluid = class Fluid extends BaseComponent {
	constructor(..._args2) {
		var _inject;
		super(..._args2);
		_defineProperty(this, "componentName", "Fluid");
		_defineProperty(this, "$pcFluid", (_inject = inject(FLUID_INSTANCE, {
			optional: true,
			skipSelf: true
		})) !== null && _inject !== void 0 ? _inject : void 0);
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		_defineProperty(this, "_componentStyle", inject(FluidStyle));
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
	}
}, _defineProperty(_Fluid, "ɵfac", /*@__PURE__*/ (() => {
	let ɵFluid_BaseFactory = void 0;
	return function Fluid_Factory(__ngFactoryType__) {
		return (ɵFluid_BaseFactory || (ɵFluid_BaseFactory = ɵɵgetInheritedFactory(_Fluid)))(__ngFactoryType__ || _Fluid);
	};
})()), _defineProperty(_Fluid, "ɵcmp", (function() {
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _Fluid,
		selectors: [["p-fluid"]],
		hostVars: 2,
		hostBindings: function Fluid_HostBindings(rf, ctx) {
			if (rf & 2) ɵɵclassMap(ctx.cx("root"));
		},
		features: [
			ɵɵProvidersFeature([
				FluidStyle,
				{
					provide: FLUID_INSTANCE,
					useExisting: _Fluid
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: _Fluid
				}
			]),
			ɵɵHostDirectivesFeature([Bind]),
			ɵɵInheritDefinitionFeature
		],
		ngContentSelectors: ["*"],
		decls: 1,
		vars: 0,
		template: function Fluid_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵprojectionDef();
				ɵɵprojection(0);
			}
		},
		dependencies: [CommonModule],
		encapsulation: 2
	});
})()), _Fluid);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Fluid, [{
		type: Component,
		args: [{
			selector: "p-fluid",
			template: ` <ng-content></ng-content> `,
			standalone: true,
			imports: [CommonModule],
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None,
			providers: [
				FluidStyle,
				{
					provide: FLUID_INSTANCE,
					useExisting: Fluid
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: Fluid
				}
			],
			host: { "[class]": "cx('root')" },
			hostDirectives: [Bind]
		}]
	}], null, null);
})();
var FluidModule = (_FluidModule = class FluidModule {}, _defineProperty(_FluidModule, "ɵfac", function FluidModule_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _FluidModule)();
}), _defineProperty(_FluidModule, "ɵmod", /*@__PURE__*/ ɵɵdefineNgModule({
	type: _FluidModule,
	imports: [Fluid],
	exports: [Fluid]
})), _defineProperty(_FluidModule, "ɵinj", /*@__PURE__*/ ɵɵdefineInjector({ imports: [Fluid] })), _FluidModule);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FluidModule, [{
		type: NgModule,
		args: [{
			imports: [Fluid],
			exports: [Fluid]
		}]
	}], null, null);
})();
export { Fluid as t };
