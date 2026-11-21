import { Y as NgTemplateOutlet } from "./common-BHJivUlT.js";
import { $n as Output, A as contentChild, Al as ɵɵdefineInjectable, Ao as ɵɵgetCurrentView, Bl as ɵɵrestoreView, Bt as computed, Co as ɵɵelementStart, Cs as ɵɵreference, Da as ɵɵconditionalCreate, Dr as ViewEncapsulation, Fn as Injectable, Gs as ɵɵtemplate, In as Input, Js as ɵɵtextInterpolate, Ks as ɵɵtemplateRefExtractor, O as booleanAttribute, Qo as ɵɵlistener, Rl as ɵɵnamespaceSVG, S as ViewChild, Sa as ɵɵclassMap, So as ɵɵelementEnd, Ta as ɵɵconditional, Vs as ɵɵstyleMap, Wi as setClassMetadata, X as input, an as ChangeDetectionStrategy, ao as ɵɵdefineNgModule, at as output, bs as ɵɵqueryAdvance, ca as ɵɵInheritDefinitionFeature, cn as Component, cs as ɵɵprojectionDef, da as ɵɵadvance, dc as ɵɵviewQuerySignal, dl as inject, es as ɵɵnextContext, gt as viewChild, i as ContentChild, jl as ɵɵdefineInjector, jo as ɵɵgetInheritedFactory, ka as ɵɵcontentQuerySignal, kc as InjectionToken, ls as ɵɵproperty, nt as model, qn as NgModule, qs as ɵɵtext, ro as ɵɵdefineComponent, sa as ɵɵHostDirectivesFeature, ss as ɵɵprojection, ua as ɵɵProvidersFeature, vo as ɵɵelement, ya as ɵɵattribute, yo as ɵɵelementContainer, zl as ɵɵresetView } from "./core-BRnM5AcM.js";
import { SharedModule } from "./primeng_api.js";
import { n as PARENT_INSTANCE, t as BaseComponent } from "./primeng-basecomponent-eFp8WNlF.js";
import { Bind, BindModule } from "./primeng_bind.js";
import { n as Minus, t as Plus } from "./primeicons-angular-plus-BQD8I5Mb.js";
import { n as MotionDirective, r as MotionModule } from "./primeng-motion-BeilDcus.js";
import { s as BaseStyle } from "./primeng-config-E0JoXWcg.js";
import { n as _objectSpread2, r as _defineProperty } from "./asyncToGenerator-CE9zIWF7.js";
// ../node_modules/@primeuix/styles/dist/fieldset/index.mjs
var style = "\n    .p-fieldset {\n        background: dt('fieldset.background');\n        border: 1px solid dt('fieldset.border.color');\n        border-radius: dt('fieldset.border.radius');\n        color: dt('fieldset.color');\n        padding: dt('fieldset.padding');\n        margin: 0;\n    }\n\n    .p-fieldset-legend {\n        background: dt('fieldset.legend.background');\n        border-radius: dt('fieldset.legend.border.radius');\n        border-width: dt('fieldset.legend.border.width');\n        border-style: solid;\n        border-color: dt('fieldset.legend.border.color');\n        color: dt('fieldset.legend.color');\n        padding: dt('fieldset.legend.padding');\n        transition:\n            background dt('fieldset.transition.duration'),\n            color dt('fieldset.transition.duration'),\n            outline-color dt('fieldset.transition.duration'),\n            box-shadow dt('fieldset.transition.duration');\n    }\n\n    .p-fieldset-toggleable > .p-fieldset-legend {\n        padding: 0;\n    }\n\n    .p-fieldset-toggle-button {\n        cursor: pointer;\n        user-select: none;\n        overflow: hidden;\n        position: relative;\n        text-decoration: none;\n        display: flex;\n        gap: dt('fieldset.legend.gap');\n        align-items: center;\n        justify-content: center;\n        padding: dt('fieldset.legend.padding');\n        background: transparent;\n        border: 0 none;\n        border-radius: dt('fieldset.legend.border.radius');\n        transition:\n            background dt('fieldset.transition.duration'),\n            color dt('fieldset.transition.duration'),\n            outline-color dt('fieldset.transition.duration'),\n            box-shadow dt('fieldset.transition.duration');\n        outline-color: transparent;\n    }\n\n    .p-fieldset-legend-label {\n        font-weight: dt('fieldset.legend.font.weight');\n        font-size: dt('fieldset.legend.font.size');\n    }\n\n    .p-fieldset-toggle-button:focus-visible {\n        box-shadow: dt('fieldset.legend.focus.ring.shadow');\n        outline: dt('fieldset.legend.focus.ring.width') dt('fieldset.legend.focus.ring.style') dt('fieldset.legend.focus.ring.color');\n        outline-offset: dt('fieldset.legend.focus.ring.offset');\n    }\n\n    .p-fieldset-toggleable > .p-fieldset-legend:hover {\n        color: dt('fieldset.legend.hover.color');\n        background: dt('fieldset.legend.hover.background');\n    }\n\n    .p-fieldset-toggle-icon {\n        color: dt('fieldset.toggle.icon.color');\n        transition: color dt('fieldset.transition.duration');\n    }\n\n    .p-fieldset-toggleable > .p-fieldset-legend:hover .p-fieldset-toggle-icon {\n        color: dt('fieldset.toggle.icon.hover.color');\n    }\n\n    .p-fieldset-content-container {\n        display: grid;\n        grid-template-rows: 1fr;\n    }\n\n    .p-fieldset-content-wrapper {\n        min-height: 0;\n    }\n\n    .p-fieldset-content {\n        padding: dt('fieldset.content.padding');\n    }\n\n    .p-fieldset-trigger {\n        cursor: pointer;\n    }\n";
// ../node_modules/primeng/fesm2022/primeng-fieldset.mjs
var _FieldsetStyle;
var _Fieldset;
var _FieldsetModule;
var classes = {
	root: ({ instance }) => {
		return ["p-fieldset p-component", { "p-fieldset-toggleable": instance.toggleable() }];
	},
	legend: "p-fieldset-legend",
	legendLabel: "p-fieldset-legend-label",
	toggleButton: "p-fieldset-toggle-button",
	toggleIcon: "p-fieldset-toggle-icon",
	contentContainer: "p-fieldset-content-container",
	contentWrapper: "p-fieldset-content-wrapper",
	content: "p-fieldset-content"
};
var FieldsetStyle = (_FieldsetStyle = class FieldsetStyle extends BaseStyle {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "name", "fieldset");
		_defineProperty(this, "style", style);
		_defineProperty(this, "classes", classes);
	}
}, _defineProperty(_FieldsetStyle, "ɵfac", /*@__PURE__*/ (() => {
	let ɵFieldsetStyle_BaseFactory = void 0;
	return function FieldsetStyle_Factory(__ngFactoryType__) {
		return (ɵFieldsetStyle_BaseFactory || (ɵFieldsetStyle_BaseFactory = ɵɵgetInheritedFactory(_FieldsetStyle)))(__ngFactoryType__ || _FieldsetStyle);
	};
})()), _defineProperty(_FieldsetStyle, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _FieldsetStyle,
	factory: _FieldsetStyle.ɵfac
})), _FieldsetStyle);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FieldsetStyle, [{ type: Injectable }], null, null);
})();
var FieldsetClasses;
(function(FieldsetClasses) {
	FieldsetClasses["root"] = "p-fieldset";
	FieldsetClasses["legend"] = "p-fieldset-legend";
	FieldsetClasses["legendLabel"] = "p-fieldset-legend-label";
	FieldsetClasses["toggleIcon"] = "p-fieldset-toggle-icon";
	FieldsetClasses["contentContainer"] = "p-fieldset-content-container";
	FieldsetClasses["contentWrapper"] = "p-fieldset-content-wrapper";
	FieldsetClasses["content"] = "p-fieldset-content";
})(FieldsetClasses || (FieldsetClasses = {}));
var FIELDSET_INSTANCE = new InjectionToken("FIELDSET_INSTANCE");
var Fieldset = (_Fieldset = class Fieldset extends BaseComponent {
	constructor(..._args2) {
		var _inject;
		super(..._args2);
		_defineProperty(this, "componentName", "Fieldset");
		_defineProperty(this, "$pcFieldset", (_inject = inject(FIELDSET_INSTANCE, {
			optional: true,
			skipSelf: true
		})) !== null && _inject !== void 0 ? _inject : void 0);
		_defineProperty(this, "_componentStyle", inject(FieldsetStyle));
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		_defineProperty(this, "legend", input(...ngDevMode ? [void 0, { debugName: "legend" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "toggleable", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "toggleable" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "collapsed", model(false, ...ngDevMode ? [{ debugName: "collapsed" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "style", input(...ngDevMode ? [void 0, { debugName: "style" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "styleClass", input(...ngDevMode ? [void 0, { debugName: "styleClass" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "motionOptions", input(...ngDevMode ? [void 0, { debugName: "motionOptions" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "onBeforeToggle", output());
		_defineProperty(this, "onAfterToggle", output());
		_defineProperty(this, "headerTemplate", contentChild("header", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "headerTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "toggleIconTemplate", contentChild("toggleicon", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "toggleIconTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "expandIconTemplate", contentChild("expandicon", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "expandIconTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "collapseIconTemplate", contentChild("collapseicon", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "collapseIconTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "contentTemplate", contentChild("content", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "contentTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "contentWrapperViewChild", viewChild("contentWrapper", ...ngDevMode ? [{ debugName: "contentWrapperViewChild" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_id", this.$useId.next("pn_id_"));
		_defineProperty(this, "buttonAriaLabel", computed(() => this.legend(), ...ngDevMode ? [{ debugName: "buttonAriaLabel" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "toggleIconContext", computed(() => ({
			$implicit: this.collapsed(),
			collapsed: this.collapsed()
		}), ...ngDevMode ? [{ debugName: "toggleIconContext" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataP", computed(() => this.cn({ toggleable: this.toggleable() }), ...ngDevMode ? [{ debugName: "dataP" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "contentTabindex", computed(() => this.collapsed() ? "-1" : void 0, ...ngDevMode ? [{ debugName: "contentTabindex" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "isContentVisible", computed(() => !this.toggleable() || this.toggleable() && !this.collapsed(), ...ngDevMode ? [{ debugName: "isContentVisible" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "computedMotionOptions", computed(() => _objectSpread2(_objectSpread2({}, this.ptm("motion")), this.motionOptions()), ...ngDevMode ? [{ debugName: "computedMotionOptions" }] : /* istanbul ignore next */ []));
	}
	get id() {
		return this._id;
	}
	get headerId() {
		return this.id + "_header";
	}
	get contentId() {
		return this.id + "_content";
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.ptm("host"));
	}
	toggle(event) {
		this.onBeforeToggle.emit({
			originalEvent: event,
			collapsed: this.collapsed()
		});
		if (this.collapsed()) this.expand();
		else this.collapse();
		event.preventDefault();
	}
	onKeyDown(event) {
		if (event.code === "Enter" || event.code === "Space") {
			this.toggle(event);
			event.preventDefault();
		}
	}
	expand() {
		this.collapsed.set(false);
	}
	collapse() {
		this.collapsed.set(true);
	}
	getBlockableElement() {
		return this.el.nativeElement.children[0];
	}
	updateTabIndex() {
		const contentWrapper = this.contentWrapperViewChild();
		if (contentWrapper) contentWrapper.nativeElement.querySelectorAll("input, button, select, a, textarea, [tabindex]").forEach((element) => {
			if (this.collapsed()) element.setAttribute("tabindex", "-1");
			else element.removeAttribute("tabindex");
		});
	}
	onToggleDone(event) {
		this.onAfterToggle.emit({
			originalEvent: event,
			collapsed: this.collapsed()
		});
	}
}, _defineProperty(_Fieldset, "ɵfac", /*@__PURE__*/ (() => {
	let ɵFieldset_BaseFactory = void 0;
	return function Fieldset_Factory(__ngFactoryType__) {
		return (ɵFieldset_BaseFactory || (ɵFieldset_BaseFactory = ɵɵgetInheritedFactory(_Fieldset)))(__ngFactoryType__ || _Fieldset);
	};
})()), _defineProperty(_Fieldset, "ɵcmp", (function() {
	const _c0 = ["header"];
	const _c1 = ["toggleicon"];
	const _c2 = ["expandicon"];
	const _c3 = ["collapseicon"];
	const _c4 = ["content"];
	const _c5 = ["contentWrapper"];
	const _c6 = ["*", [["p-header"]]];
	const _c7 = ["*", "p-header"];
	function Fieldset_Conditional_2_Conditional_1_ng_container_1_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Fieldset_Conditional_2_Conditional_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "span", 2);
			ɵɵtemplate(1, Fieldset_Conditional_2_Conditional_1_ng_container_1_Template, 1, 0, "ng-container", 8);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext(2);
			ɵɵclassMap(ctx_r1.cx("toggleIcon"));
			ɵɵproperty("pBind", ctx_r1.ptm("toggleIcon"));
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", ctx_r1.toggleIconTemplate())("ngTemplateOutletContext", ctx_r1.toggleIconContext());
		}
	}
	function Fieldset_Conditional_2_Conditional_2_Conditional_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 10);
		}
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext(3);
			ɵɵclassMap(ctx_r1.cx("toggleIcon"));
			ɵɵproperty("pBind", ctx_r1.ptm("toggleIcon"));
		}
	}
	function Fieldset_Conditional_2_Conditional_2_Conditional_1_ng_container_1_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Fieldset_Conditional_2_Conditional_2_Conditional_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "span", 2);
			ɵɵtemplate(1, Fieldset_Conditional_2_Conditional_2_Conditional_1_ng_container_1_Template, 1, 0, "ng-container", 5);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext(3);
			ɵɵclassMap(ctx_r1.cx("toggleIcon"));
			ɵɵproperty("pBind", ctx_r1.ptm("toggleIcon"));
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", ctx_r1.expandIconTemplate());
		}
	}
	function Fieldset_Conditional_2_Conditional_2_Template(rf, ctx) {
		if (rf & 1) ɵɵconditionalCreate(0, Fieldset_Conditional_2_Conditional_2_Conditional_0_Template, 1, 3, "svg", 9)(1, Fieldset_Conditional_2_Conditional_2_Conditional_1_Template, 2, 4, "span", 7);
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext(2);
			ɵɵconditional(!ctx_r1.expandIconTemplate() ? 0 : 1);
		}
	}
	function Fieldset_Conditional_2_Conditional_3_Conditional_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 12);
		}
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext(3);
			ɵɵclassMap(ctx_r1.cx("toggleIcon"));
			ɵɵproperty("pBind", ctx_r1.ptm("toggleIcon"));
			ɵɵattribute("aria-hidden", true);
		}
	}
	function Fieldset_Conditional_2_Conditional_3_Conditional_1_ng_container_1_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Fieldset_Conditional_2_Conditional_3_Conditional_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "span", 2);
			ɵɵtemplate(1, Fieldset_Conditional_2_Conditional_3_Conditional_1_ng_container_1_Template, 1, 0, "ng-container", 5);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext(3);
			ɵɵclassMap(ctx_r1.cx("toggleIcon"));
			ɵɵproperty("pBind", ctx_r1.ptm("toggleIcon"));
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", ctx_r1.collapseIconTemplate());
		}
	}
	function Fieldset_Conditional_2_Conditional_3_Template(rf, ctx) {
		if (rf & 1) ɵɵconditionalCreate(0, Fieldset_Conditional_2_Conditional_3_Conditional_0_Template, 1, 4, "svg", 11)(1, Fieldset_Conditional_2_Conditional_3_Conditional_1_Template, 2, 4, "span", 7);
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext(2);
			ɵɵconditional(!ctx_r1.collapseIconTemplate() ? 0 : 1);
		}
	}
	function Fieldset_Conditional_2_ng_container_4_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Fieldset_Conditional_2_Template(rf, ctx) {
		if (rf & 1) {
			const _r1 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "button", 6);
			ɵɵlistener("click", function Fieldset_Conditional_2_Template_button_click_0_listener($event) {
				ɵɵrestoreView(_r1);
				const ctx_r1 = ɵɵnextContext();
				return ɵɵresetView(ctx_r1.toggle($event));
			})("keydown", function Fieldset_Conditional_2_Template_button_keydown_0_listener($event) {
				ɵɵrestoreView(_r1);
				const ctx_r1 = ɵɵnextContext();
				return ɵɵresetView(ctx_r1.onKeyDown($event));
			});
			ɵɵconditionalCreate(1, Fieldset_Conditional_2_Conditional_1_Template, 2, 5, "span", 7)(2, Fieldset_Conditional_2_Conditional_2_Template, 2, 1)(3, Fieldset_Conditional_2_Conditional_3_Template, 2, 1);
			ɵɵtemplate(4, Fieldset_Conditional_2_ng_container_4_Template, 1, 0, "ng-container", 5);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext();
			const legendContent_r3 = ɵɵreference(5);
			ɵɵclassMap(ctx_r1.cx("toggleButton"));
			ɵɵproperty("pBind", ctx_r1.ptm("toggleButton"));
			ɵɵattribute("id", ctx_r1.headerId)("aria-controls", ctx_r1.contentId)("aria-expanded", !ctx_r1.collapsed())("aria-label", ctx_r1.buttonAriaLabel());
			ɵɵadvance();
			ɵɵconditional(ctx_r1.toggleIconTemplate() ? 1 : ctx_r1.collapsed() ? 2 : 3);
			ɵɵadvance(3);
			ɵɵproperty("ngTemplateOutlet", legendContent_r3);
		}
	}
	function Fieldset_Conditional_3_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Fieldset_Conditional_3_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Fieldset_Conditional_3_ng_container_0_Template, 1, 0, "ng-container", 5);
		if (rf & 2) {
			ɵɵnextContext();
			const legendContent_r3 = ɵɵreference(5);
			ɵɵproperty("ngTemplateOutlet", legendContent_r3);
		}
	}
	function Fieldset_ng_template_4_ng_container_3_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Fieldset_ng_template_4_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "span", 2);
			ɵɵtext(1);
			ɵɵelementEnd();
			ɵɵprojection(2, 1);
			ɵɵtemplate(3, Fieldset_ng_template_4_ng_container_3_Template, 1, 0, "ng-container", 5);
		}
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext();
			ɵɵclassMap(ctx_r1.cx("legendLabel"));
			ɵɵproperty("pBind", ctx_r1.ptm("legendLabel"));
			ɵɵadvance();
			ɵɵtextInterpolate(ctx_r1.legend());
			ɵɵadvance(2);
			ɵɵproperty("ngTemplateOutlet", ctx_r1.headerTemplate());
		}
	}
	function Fieldset_ng_container_11_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _Fieldset,
		selectors: [["p-fieldset"]],
		contentQueries: function Fieldset_ContentQueries(rf, ctx, dirIndex) {
			if (rf & 1) ɵɵcontentQuerySignal(dirIndex, ctx.headerTemplate, _c0, 4)(dirIndex, ctx.toggleIconTemplate, _c1, 4)(dirIndex, ctx.expandIconTemplate, _c2, 4)(dirIndex, ctx.collapseIconTemplate, _c3, 4)(dirIndex, ctx.contentTemplate, _c4, 4);
			if (rf & 2) ɵɵqueryAdvance(5);
		},
		viewQuery: function Fieldset_Query(rf, ctx) {
			if (rf & 1) ɵɵviewQuerySignal(ctx.contentWrapperViewChild, _c5, 5);
			if (rf & 2) ɵɵqueryAdvance();
		},
		inputs: {
			legend: [1, "legend"],
			toggleable: [1, "toggleable"],
			collapsed: [1, "collapsed"],
			style: [1, "style"],
			styleClass: [1, "styleClass"],
			motionOptions: [1, "motionOptions"]
		},
		outputs: {
			collapsed: "collapsedChange",
			onBeforeToggle: "onBeforeToggle",
			onAfterToggle: "onAfterToggle"
		},
		features: [
			ɵɵProvidersFeature([
				FieldsetStyle,
				{
					provide: FIELDSET_INSTANCE,
					useExisting: _Fieldset
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: _Fieldset
				}
			]),
			ɵɵHostDirectivesFeature([Bind]),
			ɵɵInheritDefinitionFeature
		],
		ngContentSelectors: _c7,
		decls: 12,
		vars: 29,
		consts: [
			["legendContent", ""],
			["contentWrapper", ""],
			[3, "pBind"],
			[
				"tabindex",
				"0",
				"role",
				"button",
				3,
				"class",
				"pBind"
			],
			[
				"role",
				"region",
				3,
				"pMotionOnAfterEnter",
				"pMotionOnAfterLeave",
				"pBind",
				"pMotion",
				"pMotionName",
				"pMotionOptions",
				"id"
			],
			[4, "ngTemplateOutlet"],
			[
				"tabindex",
				"0",
				"role",
				"button",
				3,
				"click",
				"keydown",
				"pBind"
			],
			[
				3,
				"class",
				"pBind"
			],
			[
				4,
				"ngTemplateOutlet",
				"ngTemplateOutletContext"
			],
			[
				"data-p-icon",
				"plus",
				3,
				"class",
				"pBind"
			],
			[
				"data-p-icon",
				"plus",
				3,
				"pBind"
			],
			[
				"data-p-icon",
				"minus",
				3,
				"class",
				"pBind"
			],
			[
				"data-p-icon",
				"minus",
				3,
				"pBind"
			]
		],
		template: function Fieldset_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵprojectionDef(_c6);
				ɵɵelementStart(0, "fieldset", 2)(1, "legend", 2);
				ɵɵconditionalCreate(2, Fieldset_Conditional_2_Template, 5, 9, "button", 3)(3, Fieldset_Conditional_3_Template, 1, 1, "ng-container");
				ɵɵtemplate(4, Fieldset_ng_template_4_Template, 4, 5, "ng-template", null, 0, ɵɵtemplateRefExtractor);
				ɵɵelementEnd();
				ɵɵelementStart(6, "div", 4);
				ɵɵlistener("pMotionOnAfterEnter", function Fieldset_Template_div_pMotionOnAfterEnter_6_listener($event) {
					return ctx.onToggleDone($event);
				})("pMotionOnAfterLeave", function Fieldset_Template_div_pMotionOnAfterLeave_6_listener($event) {
					return ctx.onToggleDone($event);
				});
				ɵɵelementStart(7, "div", 2)(8, "div", 2, 1);
				ɵɵprojection(10);
				ɵɵtemplate(11, Fieldset_ng_container_11_Template, 1, 0, "ng-container", 5);
				ɵɵelementEnd()()()();
			}
			if (rf & 2) {
				ɵɵstyleMap(ctx.style());
				ɵɵclassMap(ctx.cn(ctx.cx("root"), ctx.styleClass()));
				ɵɵproperty("pBind", ctx.ptm("root"));
				ɵɵattribute("id", ctx.id)("data-p", ctx.dataP());
				ɵɵadvance();
				ɵɵclassMap(ctx.cx("legend"));
				ɵɵproperty("pBind", ctx.ptm("legend"));
				ɵɵattribute("data-p", ctx.dataP());
				ɵɵadvance();
				ɵɵconditional(ctx.toggleable() ? 2 : 3);
				ɵɵadvance(4);
				ɵɵclassMap(ctx.cx("contentContainer"));
				ɵɵproperty("pBind", ctx.ptm("contentContainer"))("pMotion", ctx.isContentVisible())("pMotionName", ctx.pcn("p-collapsible"))("pMotionOptions", ctx.computedMotionOptions())("id", ctx.contentId);
				ɵɵattribute("aria-labelledby", ctx.headerId)("aria-hidden", ctx.collapsed())("tabindex", ctx.contentTabindex());
				ɵɵadvance();
				ɵɵclassMap(ctx.cx("contentWrapper"));
				ɵɵproperty("pBind", ctx.ptm("contentWrapper"));
				ɵɵadvance();
				ɵɵclassMap(ctx.cx("content"));
				ɵɵproperty("pBind", ctx.ptm("content"));
				ɵɵadvance(3);
				ɵɵproperty("ngTemplateOutlet", ctx.contentTemplate());
			}
		},
		dependencies: [
			NgTemplateOutlet,
			Minus,
			Plus,
			SharedModule,
			BindModule,
			Bind,
			MotionModule,
			MotionDirective
		],
		encapsulation: 2
	});
})()), _Fieldset);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Fieldset, [{
		type: Component,
		args: [{
			selector: "p-fieldset",
			standalone: true,
			imports: [
				NgTemplateOutlet,
				Minus,
				Plus,
				SharedModule,
				BindModule,
				MotionModule
			],
			template: `
        <fieldset [attr.id]="id" [style]="style()" [class]="cn(cx('root'), styleClass())" [pBind]="ptm('root')" [attr.data-p]="dataP()">
            <legend [class]="cx('legend')" [pBind]="ptm('legend')" [attr.data-p]="dataP()">
                @if (toggleable()) {
                    <button
                        [attr.id]="headerId"
                        tabindex="0"
                        role="button"
                        [attr.aria-controls]="contentId"
                        [attr.aria-expanded]="!collapsed()"
                        [attr.aria-label]="buttonAriaLabel()"
                        (click)="toggle($event)"
                        (keydown)="onKeyDown($event)"
                        [class]="cx('toggleButton')"
                        [pBind]="ptm('toggleButton')"
                    >
                        @if (toggleIconTemplate()) {
                            <span [class]="cx('toggleIcon')" [pBind]="ptm('toggleIcon')">
                                <ng-container *ngTemplateOutlet="toggleIconTemplate(); context: toggleIconContext()"></ng-container>
                            </span>
                        } @else if (collapsed()) {
                            @if (!expandIconTemplate()) {
                                <svg data-p-icon="plus" [class]="cx('toggleIcon')" [pBind]="ptm('toggleIcon')" />
                            } @else {
                                <span [class]="cx('toggleIcon')" [pBind]="ptm('toggleIcon')">
                                    <ng-container *ngTemplateOutlet="expandIconTemplate()"></ng-container>
                                </span>
                            }
                        } @else {
                            @if (!collapseIconTemplate()) {
                                <svg data-p-icon="minus" [class]="cx('toggleIcon')" [attr.aria-hidden]="true" [pBind]="ptm('toggleIcon')" />
                            } @else {
                                <span [class]="cx('toggleIcon')" [pBind]="ptm('toggleIcon')">
                                    <ng-container *ngTemplateOutlet="collapseIconTemplate()"></ng-container>
                                </span>
                            }
                        }
                        <ng-container *ngTemplateOutlet="legendContent"></ng-container>
                    </button>
                } @else {
                    <ng-container *ngTemplateOutlet="legendContent"></ng-container>
                }
                <ng-template #legendContent>
                    <span [class]="cx('legendLabel')" [pBind]="ptm('legendLabel')">{{ legend() }}</span>
                    <ng-content select="p-header"></ng-content>
                    <ng-container *ngTemplateOutlet="headerTemplate()"></ng-container>
                </ng-template>
            </legend>
            <div
                [pBind]="ptm('contentContainer')"
                [pMotion]="isContentVisible()"
                [pMotionName]="pcn('p-collapsible')"
                [pMotionOptions]="computedMotionOptions()"
                [class]="cx('contentContainer')"
                [id]="contentId"
                role="region"
                [attr.aria-labelledby]="headerId"
                [attr.aria-hidden]="collapsed()"
                [attr.tabindex]="contentTabindex()"
                (pMotionOnAfterEnter)="onToggleDone($event)"
                (pMotionOnAfterLeave)="onToggleDone($event)"
            >
                <div [pBind]="ptm('contentWrapper')" [class]="cx('contentWrapper')">
                    <div [class]="cx('content')" [pBind]="ptm('content')" #contentWrapper>
                        <ng-content></ng-content>
                        <ng-container *ngTemplateOutlet="contentTemplate()"></ng-container>
                    </div>
                </div>
            </div>
        </fieldset>
    `,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None,
			providers: [
				FieldsetStyle,
				{
					provide: FIELDSET_INSTANCE,
					useExisting: Fieldset
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: Fieldset
				}
			],
			hostDirectives: [Bind]
		}]
	}], null, {
		legend: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "legend",
				required: false
			}]
		}],
		toggleable: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "toggleable",
				required: false
			}]
		}],
		collapsed: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "collapsed",
				required: false
			}]
		}, {
			type: Output,
			args: ["collapsedChange"]
		}],
		style: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "style",
				required: false
			}]
		}],
		styleClass: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "styleClass",
				required: false
			}]
		}],
		motionOptions: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "motionOptions",
				required: false
			}]
		}],
		onBeforeToggle: [{
			type: Output,
			args: ["onBeforeToggle"]
		}],
		onAfterToggle: [{
			type: Output,
			args: ["onAfterToggle"]
		}],
		headerTemplate: [{
			type: ContentChild,
			args: ["header", {
				descendants: false,
				isSignal: true
			}]
		}],
		toggleIconTemplate: [{
			type: ContentChild,
			args: ["toggleicon", {
				descendants: false,
				isSignal: true
			}]
		}],
		expandIconTemplate: [{
			type: ContentChild,
			args: ["expandicon", {
				descendants: false,
				isSignal: true
			}]
		}],
		collapseIconTemplate: [{
			type: ContentChild,
			args: ["collapseicon", {
				descendants: false,
				isSignal: true
			}]
		}],
		contentTemplate: [{
			type: ContentChild,
			args: ["content", {
				descendants: false,
				isSignal: true
			}]
		}],
		contentWrapperViewChild: [{
			type: ViewChild,
			args: ["contentWrapper", { isSignal: true }]
		}]
	});
})();
var FieldsetModule = (_FieldsetModule = class FieldsetModule {}, _defineProperty(_FieldsetModule, "ɵfac", function FieldsetModule_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _FieldsetModule)();
}), _defineProperty(_FieldsetModule, "ɵmod", /*@__PURE__*/ ɵɵdefineNgModule({
	type: _FieldsetModule,
	imports: [
		Fieldset,
		SharedModule,
		BindModule
	],
	exports: [
		Fieldset,
		SharedModule,
		BindModule
	]
})), _defineProperty(_FieldsetModule, "ɵinj", /*@__PURE__*/ ɵɵdefineInjector({ imports: [
	Fieldset,
	SharedModule,
	BindModule,
	SharedModule,
	BindModule
] })), _FieldsetModule);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FieldsetModule, [{
		type: NgModule,
		args: [{
			imports: [
				Fieldset,
				SharedModule,
				BindModule
			],
			exports: [
				Fieldset,
				SharedModule,
				BindModule
			]
		}]
	}], null, null);
})();
export { Fieldset, FieldsetClasses, FieldsetModule, FieldsetStyle };
