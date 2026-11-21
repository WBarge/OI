import { Al as ɵɵdefineInjectable, Bt as computed, Dr as ViewEncapsulation, Fn as Injectable, Hs as ɵɵstyleProp, In as Input, Js as ɵɵtextInterpolate, O as booleanAttribute, Sa as ɵɵclassMap, Wi as setClassMetadata, X as input, an as ChangeDetectionStrategy, ao as ɵɵdefineNgModule, ca as ɵɵInheritDefinitionFeature, cn as Component, dl as inject, jl as ɵɵdefineInjector, jo as ɵɵgetInheritedFactory, kc as InjectionToken, qn as NgModule, qs as ɵɵtext, ro as ɵɵdefineComponent, sa as ɵɵHostDirectivesFeature, ua as ɵɵProvidersFeature, ya as ɵɵattribute } from "./core-BRnM5AcM.js";
import { SharedModule } from "./primeng_api.js";
import { n as PARENT_INSTANCE, t as BaseComponent } from "./primeng-basecomponent-eFp8WNlF.js";
import { Bind } from "./primeng_bind.js";
import { C as p, x as l } from "./dist-D971aPsi.js";
import { s as BaseStyle } from "./primeng-config-E0JoXWcg.js";
import { n as _objectSpread2, r as _defineProperty } from "./asyncToGenerator-CE9zIWF7.js";
// ../node_modules/@primeuix/styles/dist/badge/index.mjs
var style$1 = "\n    .p-badge {\n        display: inline-flex;\n        border-radius: dt('badge.border.radius');\n        align-items: center;\n        justify-content: center;\n        padding: dt('badge.padding');\n        background: dt('badge.primary.background');\n        color: dt('badge.primary.color');\n        font-size: dt('badge.font.size');\n        font-weight: dt('badge.font.weight');\n        min-width: dt('badge.min.width');\n        height: dt('badge.height');\n    }\n\n    .p-badge-dot {\n        width: dt('badge.dot.size');\n        min-width: dt('badge.dot.size');\n        height: dt('badge.dot.size');\n        border-radius: 50%;\n        padding: 0;\n    }\n\n    .p-badge-circle {\n        padding: 0;\n        border-radius: 50%;\n    }\n\n    .p-badge-secondary {\n        background: dt('badge.secondary.background');\n        color: dt('badge.secondary.color');\n    }\n\n    .p-badge-success {\n        background: dt('badge.success.background');\n        color: dt('badge.success.color');\n    }\n\n    .p-badge-info {\n        background: dt('badge.info.background');\n        color: dt('badge.info.color');\n    }\n\n    .p-badge-warn {\n        background: dt('badge.warn.background');\n        color: dt('badge.warn.color');\n    }\n\n    .p-badge-danger {\n        background: dt('badge.danger.background');\n        color: dt('badge.danger.color');\n    }\n\n    .p-badge-contrast {\n        background: dt('badge.contrast.background');\n        color: dt('badge.contrast.color');\n    }\n\n    .p-badge-sm {\n        font-size: dt('badge.sm.font.size');\n        min-width: dt('badge.sm.min.width');\n        height: dt('badge.sm.height');\n    }\n\n    .p-badge-lg {\n        font-size: dt('badge.lg.font.size');\n        min-width: dt('badge.lg.min.width');\n        height: dt('badge.lg.height');\n    }\n\n    .p-badge-xl {\n        font-size: dt('badge.xl.font.size');\n        min-width: dt('badge.xl.min.width');\n        height: dt('badge.xl.height');\n    }\n";
// ../node_modules/primeng/fesm2022/primeng-badge.mjs
var _BadgeStyle;
var _Badge;
var _BadgeModule;
var style = `
    ${style$1}
`;
var classes = { root: ({ instance }) => {
	const value = instance.value();
	const size = instance.size();
	const badgeSize = instance.badgeSize();
	const severity = instance.severity();
	return ["p-badge p-component", {
		"p-badge-circle": l(value) && String(value).length === 1,
		"p-badge-dot": p(value),
		"p-badge-sm": size === "small" || badgeSize === "small",
		"p-badge-lg": size === "large" || badgeSize === "large",
		"p-badge-xl": size === "xlarge" || badgeSize === "xlarge",
		"p-badge-info": severity === "info",
		"p-badge-success": severity === "success",
		"p-badge-warn": severity === "warn",
		"p-badge-danger": severity === "danger",
		"p-badge-secondary": severity === "secondary",
		"p-badge-contrast": severity === "contrast"
	}];
} };
var BadgeStyle = (_BadgeStyle = class BadgeStyle extends BaseStyle {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "name", "badge");
		_defineProperty(this, "style", style);
		_defineProperty(this, "classes", classes);
	}
}, _defineProperty(_BadgeStyle, "ɵfac", /*@__PURE__*/ (() => {
	let ɵBadgeStyle_BaseFactory = void 0;
	return function BadgeStyle_Factory(__ngFactoryType__) {
		return (ɵBadgeStyle_BaseFactory || (ɵBadgeStyle_BaseFactory = ɵɵgetInheritedFactory(_BadgeStyle)))(__ngFactoryType__ || _BadgeStyle);
	};
})()), _defineProperty(_BadgeStyle, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _BadgeStyle,
	factory: _BadgeStyle.ɵfac
})), _BadgeStyle);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BadgeStyle, [{ type: Injectable }], null, null);
})();
var BadgeClasses;
(function(BadgeClasses) {
	BadgeClasses["root"] = "p-badge";
})(BadgeClasses || (BadgeClasses = {}));
var BADGE_INSTANCE = new InjectionToken("BADGE_INSTANCE");
var Badge = (_Badge = class Badge extends BaseComponent {
	constructor(..._args2) {
		var _inject;
		super(..._args2);
		_defineProperty(this, "componentName", "Badge");
		_defineProperty(this, "$pcBadge", (_inject = inject(BADGE_INSTANCE, {
			optional: true,
			skipSelf: true
		})) !== null && _inject !== void 0 ? _inject : void 0);
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		_defineProperty(this, "badgeSize", input(...ngDevMode ? [void 0, { debugName: "badgeSize" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "size", input(...ngDevMode ? [void 0, { debugName: "size" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "severity", input(...ngDevMode ? [void 0, { debugName: "severity" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "value", input(...ngDevMode ? [void 0, { debugName: "value" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "badgeDisabled", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "badgeDisabled" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "_componentStyle", inject(BadgeStyle));
		_defineProperty(this, "displayStyle", computed(() => this.badgeDisabled() ? "none" : null, ...ngDevMode ? [{ debugName: "displayStyle" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataP", computed(() => {
			const value = this.value();
			const severity = this.severity();
			const size = this.size();
			return this.cn({
				circle: value != null && String(value).length === 1,
				empty: value == null,
				disabled: this.badgeDisabled(),
				[severity]: severity,
				[size]: size
			});
		}, ...ngDevMode ? [{ debugName: "dataP" }] : /* istanbul ignore next */ []));
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
	}
}, _defineProperty(_Badge, "ɵfac", /*@__PURE__*/ (() => {
	let ɵBadge_BaseFactory = void 0;
	return function Badge_Factory(__ngFactoryType__) {
		return (ɵBadge_BaseFactory || (ɵBadge_BaseFactory = ɵɵgetInheritedFactory(_Badge)))(__ngFactoryType__ || _Badge);
	};
})()), _defineProperty(_Badge, "ɵcmp", /*@__PURE__*/ ɵɵdefineComponent({
	type: _Badge,
	selectors: [["p-badge"]],
	hostVars: 5,
	hostBindings: function Badge_HostBindings(rf, ctx) {
		if (rf & 2) {
			ɵɵattribute("data-p", ctx.dataP());
			ɵɵclassMap(ctx.cx("root"));
			ɵɵstyleProp("display", ctx.displayStyle());
		}
	},
	inputs: {
		badgeSize: [1, "badgeSize"],
		size: [1, "size"],
		severity: [1, "severity"],
		value: [1, "value"],
		badgeDisabled: [1, "badgeDisabled"]
	},
	features: [
		ɵɵProvidersFeature([
			BadgeStyle,
			{
				provide: BADGE_INSTANCE,
				useExisting: _Badge
			},
			{
				provide: PARENT_INSTANCE,
				useExisting: _Badge
			}
		]),
		ɵɵHostDirectivesFeature([Bind]),
		ɵɵInheritDefinitionFeature
	],
	decls: 1,
	vars: 1,
	template: function Badge_Template(rf, ctx) {
		if (rf & 1) ɵɵtext(0);
		if (rf & 2) ɵɵtextInterpolate(ctx.value());
	},
	dependencies: [SharedModule],
	encapsulation: 2
})), _Badge);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Badge, [{
		type: Component,
		args: [{
			selector: "p-badge",
			template: `{{ value() }}`,
			standalone: true,
			imports: [SharedModule],
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None,
			providers: [
				BadgeStyle,
				{
					provide: BADGE_INSTANCE,
					useExisting: Badge
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: Badge
				}
			],
			host: {
				"[class]": "cx('root')",
				"[style.display]": "displayStyle()",
				"[attr.data-p]": "dataP()"
			},
			hostDirectives: [Bind]
		}]
	}], null, {
		badgeSize: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "badgeSize",
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
		severity: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "severity",
				required: false
			}]
		}],
		value: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "value",
				required: false
			}]
		}],
		badgeDisabled: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "badgeDisabled",
				required: false
			}]
		}]
	});
})();
var BadgeModule = (_BadgeModule = class BadgeModule {}, _defineProperty(_BadgeModule, "ɵfac", function BadgeModule_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _BadgeModule)();
}), _defineProperty(_BadgeModule, "ɵmod", /*@__PURE__*/ ɵɵdefineNgModule({
	type: _BadgeModule,
	imports: [Badge, SharedModule],
	exports: [Badge, SharedModule]
})), _defineProperty(_BadgeModule, "ɵinj", /*@__PURE__*/ ɵɵdefineInjector({ imports: [
	Badge,
	SharedModule,
	SharedModule
] })), _BadgeModule);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BadgeModule, [{
		type: NgModule,
		args: [{
			imports: [Badge, SharedModule],
			exports: [Badge, SharedModule]
		}]
	}], null, null);
})();
export { BadgeModule as n, Badge as t };
