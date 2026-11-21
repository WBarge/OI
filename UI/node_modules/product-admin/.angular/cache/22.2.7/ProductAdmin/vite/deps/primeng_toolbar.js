import { Y as NgTemplateOutlet } from "./common-BHJivUlT.js";
import { A as contentChild, Al as ɵɵdefineInjectable, Co as ɵɵelementStart, Da as ɵɵconditionalCreate, Dr as ViewEncapsulation, Fn as Injectable, Gs as ɵɵtemplate, In as Input, Sa as ɵɵclassMap, So as ɵɵelementEnd, Ta as ɵɵconditional, Wi as setClassMetadata, X as input, an as ChangeDetectionStrategy, ao as ɵɵdefineNgModule, bs as ɵɵqueryAdvance, ca as ɵɵInheritDefinitionFeature, cn as Component, cs as ɵɵprojectionDef, da as ɵɵadvance, dl as inject, es as ɵɵnextContext, i as ContentChild, jl as ɵɵdefineInjector, jo as ɵɵgetInheritedFactory, ka as ɵɵcontentQuerySignal, kc as InjectionToken, ls as ɵɵproperty, qn as NgModule, ro as ɵɵdefineComponent, sa as ɵɵHostDirectivesFeature, ss as ɵɵprojection, ua as ɵɵProvidersFeature, ya as ɵɵattribute, yo as ɵɵelementContainer } from "./core-BRnM5AcM.js";
import { SharedModule } from "./primeng_api.js";
import { n as PARENT_INSTANCE, t as BaseComponent } from "./primeng-basecomponent-eFp8WNlF.js";
import { Bind, BindModule } from "./primeng_bind.js";
import { s as BaseStyle } from "./primeng-config-E0JoXWcg.js";
import { n as _objectSpread2, r as _defineProperty } from "./asyncToGenerator-CE9zIWF7.js";
// ../node_modules/@primeuix/styles/dist/toolbar/index.mjs
var style = "\n    .p-toolbar {\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n        flex-wrap: wrap;\n        padding: dt('toolbar.padding');\n        background: dt('toolbar.background');\n        border: 1px solid dt('toolbar.border.color');\n        color: dt('toolbar.color');\n        border-radius: dt('toolbar.border.radius');\n        gap: dt('toolbar.gap');\n    }\n\n    .p-toolbar-start,\n    .p-toolbar-center,\n    .p-toolbar-end {\n        display: flex;\n        align-items: center;\n    }\n";
// ../node_modules/primeng/fesm2022/primeng-toolbar.mjs
var _ToolbarStyle;
var _Toolbar;
var _ToolbarModule;
var classes = {
	root: () => ["p-toolbar p-component"],
	start: "p-toolbar-start",
	center: "p-toolbar-center",
	end: "p-toolbar-end"
};
var ToolbarStyle = (_ToolbarStyle = class ToolbarStyle extends BaseStyle {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "name", "toolbar");
		_defineProperty(this, "style", style);
		_defineProperty(this, "classes", classes);
	}
}, _defineProperty(_ToolbarStyle, "ɵfac", /*@__PURE__*/ (() => {
	let ɵToolbarStyle_BaseFactory = void 0;
	return function ToolbarStyle_Factory(__ngFactoryType__) {
		return (ɵToolbarStyle_BaseFactory || (ɵToolbarStyle_BaseFactory = ɵɵgetInheritedFactory(_ToolbarStyle)))(__ngFactoryType__ || _ToolbarStyle);
	};
})()), _defineProperty(_ToolbarStyle, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _ToolbarStyle,
	factory: _ToolbarStyle.ɵfac
})), _ToolbarStyle);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToolbarStyle, [{ type: Injectable }], null, null);
})();
var ToolbarClasses;
(function(ToolbarClasses) {
	ToolbarClasses["root"] = "p-toolbar";
	ToolbarClasses["start"] = "p-toolbar-start";
	ToolbarClasses["center"] = "p-toolbar-center";
	ToolbarClasses["end"] = "p-toolbar-end";
})(ToolbarClasses || (ToolbarClasses = {}));
var TOOLBAR_INSTANCE = new InjectionToken("TOOLBAR_INSTANCE");
var Toolbar = (_Toolbar = class Toolbar extends BaseComponent {
	constructor(..._args2) {
		var _inject;
		super(..._args2);
		_defineProperty(this, "componentName", "Toolbar");
		_defineProperty(this, "$pcToolbar", (_inject = inject(TOOLBAR_INSTANCE, {
			optional: true,
			skipSelf: true
		})) !== null && _inject !== void 0 ? _inject : void 0);
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		_defineProperty(this, "ariaLabelledBy", input(...ngDevMode ? [void 0, { debugName: "ariaLabelledBy" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_componentStyle", inject(ToolbarStyle));
		_defineProperty(this, "startTemplate", contentChild("start", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "startTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "endTemplate", contentChild("end", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "endTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "centerTemplate", contentChild("center", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "centerTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
	}
	getBlockableElement() {
		return this.el.nativeElement.children[0];
	}
}, _defineProperty(_Toolbar, "ɵfac", /*@__PURE__*/ (() => {
	let ɵToolbar_BaseFactory = void 0;
	return function Toolbar_Factory(__ngFactoryType__) {
		return (ɵToolbar_BaseFactory || (ɵToolbar_BaseFactory = ɵɵgetInheritedFactory(_Toolbar)))(__ngFactoryType__ || _Toolbar);
	};
})()), _defineProperty(_Toolbar, "ɵcmp", (function() {
	const _c0 = ["start"];
	const _c1 = ["end"];
	const _c2 = ["center"];
	const _c3 = ["*"];
	function Toolbar_Conditional_1_ng_container_1_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Toolbar_Conditional_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "div", 1);
			ɵɵtemplate(1, Toolbar_Conditional_1_ng_container_1_Template, 1, 0, "ng-container", 2);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵclassMap(ctx_r0.cx("start"));
			ɵɵproperty("pBind", ctx_r0.ptm("start"));
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", ctx_r0.startTemplate());
		}
	}
	function Toolbar_Conditional_2_ng_container_1_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Toolbar_Conditional_2_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "div", 1);
			ɵɵtemplate(1, Toolbar_Conditional_2_ng_container_1_Template, 1, 0, "ng-container", 2);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵclassMap(ctx_r0.cx("center"));
			ɵɵproperty("pBind", ctx_r0.ptm("center"));
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", ctx_r0.centerTemplate());
		}
	}
	function Toolbar_Conditional_3_ng_container_1_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Toolbar_Conditional_3_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "div", 1);
			ɵɵtemplate(1, Toolbar_Conditional_3_ng_container_1_Template, 1, 0, "ng-container", 2);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵclassMap(ctx_r0.cx("end"));
			ɵɵproperty("pBind", ctx_r0.ptm("end"));
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", ctx_r0.endTemplate());
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _Toolbar,
		selectors: [["p-toolbar"]],
		contentQueries: function Toolbar_ContentQueries(rf, ctx, dirIndex) {
			if (rf & 1) ɵɵcontentQuerySignal(dirIndex, ctx.startTemplate, _c0, 4)(dirIndex, ctx.endTemplate, _c1, 4)(dirIndex, ctx.centerTemplate, _c2, 4);
			if (rf & 2) ɵɵqueryAdvance(3);
		},
		hostAttrs: ["role", "toolbar"],
		hostVars: 3,
		hostBindings: function Toolbar_HostBindings(rf, ctx) {
			if (rf & 2) {
				ɵɵattribute("aria-labelledby", ctx.ariaLabelledBy());
				ɵɵclassMap(ctx.cx("root"));
			}
		},
		inputs: { ariaLabelledBy: [1, "ariaLabelledBy"] },
		features: [
			ɵɵProvidersFeature([
				ToolbarStyle,
				{
					provide: TOOLBAR_INSTANCE,
					useExisting: _Toolbar
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: _Toolbar
				}
			]),
			ɵɵHostDirectivesFeature([Bind]),
			ɵɵInheritDefinitionFeature
		],
		ngContentSelectors: _c3,
		decls: 4,
		vars: 3,
		consts: [
			[
				3,
				"class",
				"pBind"
			],
			[3, "pBind"],
			[4, "ngTemplateOutlet"]
		],
		template: function Toolbar_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵprojectionDef();
				ɵɵprojection(0);
				ɵɵconditionalCreate(1, Toolbar_Conditional_1_Template, 2, 4, "div", 0);
				ɵɵconditionalCreate(2, Toolbar_Conditional_2_Template, 2, 4, "div", 0);
				ɵɵconditionalCreate(3, Toolbar_Conditional_3_Template, 2, 4, "div", 0);
			}
			if (rf & 2) {
				ɵɵadvance();
				ɵɵconditional(ctx.startTemplate() ? 1 : -1);
				ɵɵadvance();
				ɵɵconditional(ctx.centerTemplate() ? 2 : -1);
				ɵɵadvance();
				ɵɵconditional(ctx.endTemplate() ? 3 : -1);
			}
		},
		dependencies: [
			NgTemplateOutlet,
			SharedModule,
			BindModule,
			Bind
		],
		encapsulation: 2
	});
})()), _Toolbar);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Toolbar, [{
		type: Component,
		args: [{
			selector: "p-toolbar",
			standalone: true,
			imports: [
				NgTemplateOutlet,
				SharedModule,
				BindModule
			],
			template: `
        <ng-content></ng-content>
        @if (startTemplate()) {
            <div [class]="cx('start')" [pBind]="ptm('start')">
                <ng-container *ngTemplateOutlet="startTemplate()"></ng-container>
            </div>
        }
        @if (centerTemplate()) {
            <div [class]="cx('center')" [pBind]="ptm('center')">
                <ng-container *ngTemplateOutlet="centerTemplate()"></ng-container>
            </div>
        }
        @if (endTemplate()) {
            <div [class]="cx('end')" [pBind]="ptm('end')">
                <ng-container *ngTemplateOutlet="endTemplate()"></ng-container>
            </div>
        }
    `,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None,
			providers: [
				ToolbarStyle,
				{
					provide: TOOLBAR_INSTANCE,
					useExisting: Toolbar
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: Toolbar
				}
			],
			host: {
				"[class]": "cx(\"root\")",
				role: "toolbar",
				"[attr.aria-labelledby]": "ariaLabelledBy()"
			},
			hostDirectives: [Bind]
		}]
	}], null, {
		ariaLabelledBy: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "ariaLabelledBy",
				required: false
			}]
		}],
		startTemplate: [{
			type: ContentChild,
			args: ["start", {
				descendants: false,
				isSignal: true
			}]
		}],
		endTemplate: [{
			type: ContentChild,
			args: ["end", {
				descendants: false,
				isSignal: true
			}]
		}],
		centerTemplate: [{
			type: ContentChild,
			args: ["center", {
				descendants: false,
				isSignal: true
			}]
		}]
	});
})();
var ToolbarModule = (_ToolbarModule = class ToolbarModule {}, _defineProperty(_ToolbarModule, "ɵfac", function ToolbarModule_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _ToolbarModule)();
}), _defineProperty(_ToolbarModule, "ɵmod", /*@__PURE__*/ ɵɵdefineNgModule({
	type: _ToolbarModule,
	imports: [
		Toolbar,
		SharedModule,
		BindModule
	],
	exports: [
		Toolbar,
		SharedModule,
		BindModule
	]
})), _defineProperty(_ToolbarModule, "ɵinj", /*@__PURE__*/ ɵɵdefineInjector({ imports: [
	Toolbar,
	SharedModule,
	BindModule,
	SharedModule,
	BindModule
] })), _ToolbarModule);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToolbarModule, [{
		type: NgModule,
		args: [{
			imports: [
				Toolbar,
				SharedModule,
				BindModule
			],
			exports: [
				Toolbar,
				SharedModule,
				BindModule
			]
		}]
	}], null, null);
})();
export { Toolbar, ToolbarClasses, ToolbarModule, ToolbarStyle };
