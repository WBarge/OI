import { u as isPlatformBrowser } from "./common-CYN6T7fr.js";
import { Al as ɵɵdefineInjectable, Bt as computed, Dr as ViewEncapsulation, En as ElementRef, Fn as Injectable, Hs as ɵɵstyleProp, In as Input, O as booleanAttribute, Qo as ɵɵlistener, Sa as ɵɵclassMap, Tl as signal, Vs as ɵɵstyleMap, Wi as setClassMetadata, X as input, an as ChangeDetectionStrategy, ao as ɵɵdefineNgModule, ca as ɵɵInheritDefinitionFeature, cn as Component, cs as ɵɵprojectionDef, dl as inject, jl as ɵɵdefineInjector, jo as ɵɵgetInheritedFactory, kc as InjectionToken, qn as NgModule, ro as ɵɵdefineComponent, rt as numberAttribute, sa as ɵɵHostDirectivesFeature, ss as ɵɵprojection, ua as ɵɵProvidersFeature, ya as ɵɵattribute } from "./core-BVpAqhZc.js";
import { SharedModule } from "./primeng_api.js";
import { n as PARENT_INSTANCE, t as BaseComponent } from "./primeng-basecomponent-DFIxl5Fy.js";
import { Bind, BindModule } from "./primeng_bind.js";
import { s as BaseStyle } from "./primeng-config-EnOVMCIx.js";
import { n as _objectSpread2, r as _defineProperty } from "./asyncToGenerator-CE9zIWF7.js";
// ../node_modules/@primeuix/styles/dist/scrollarea/index.mjs
var style = "\n    .p-scrollarea {\n        display: block;\n        background: dt('scrollarea.background');\n        border: 1px solid dt('scrollarea.border.color');\n        border-radius: dt('scrollarea.border.radius');\n    }\n\n    .p-scrollarea:has(> .p-scrollarea-viewport:focus-visible) {\n        box-shadow: dt('scrollarea.focus.ring.shadow');\n        outline: dt('scrollarea.focus.ring.width') dt('scrollarea.focus.ring.style') dt('scrollarea.focus.ring.color');\n        outline-offset: dt('scrollarea.focus.ring.offset');\n    }\n\n    .p-scrollarea-viewport {\n        display: block;\n        width: 100%;\n        height: 100%;\n        outline: none;\n        padding: dt('scrollarea.viewport.padding');\n    }\n\n    .p-scrollarea-mask .p-scrollarea-viewport[data-scroll-y-after] {\n        mask-image: linear-gradient(\n            to bottom,\n            black,\n            black calc(100% - dt('scrollarea.mask.fade.size')),\n            transparent\n        );\n    }\n\n    .p-scrollarea-mask .p-scrollarea-viewport[data-scroll-y-before] {\n        mask-image: linear-gradient(\n            to bottom,\n            transparent,\n            black dt('scrollarea.mask.fade.size'),\n            black\n        );\n    }\n\n    .p-scrollarea-mask .p-scrollarea-viewport[data-scroll-y-before][data-scroll-y-after] {\n        mask-image: linear-gradient(\n            to bottom,\n            transparent,\n            black dt('scrollarea.mask.fade.size'),\n            black calc(100% - dt('scrollarea.mask.fade.size')),\n            transparent\n        );\n    }\n\n    .p-scrollarea-mask .p-scrollarea-viewport[data-scroll-x-after] {\n        mask-image: linear-gradient(\n            to right,\n            black,\n            black calc(100% - dt('scrollarea.mask.fade.size')),\n            transparent\n        );\n    }\n\n    .p-scrollarea-mask .p-scrollarea-viewport[data-scroll-x-before] {\n        mask-image: linear-gradient(\n            to right,\n            transparent,\n            black dt('scrollarea.mask.fade.size'),\n            black\n        );\n    }\n\n    .p-scrollarea-mask .p-scrollarea-viewport[data-scroll-x-before][data-scroll-x-after] {\n        mask-image: linear-gradient(\n            to right,\n            transparent,\n            black dt('scrollarea.mask.fade.size'),\n            black calc(100% - dt('scrollarea.mask.fade.size')),\n            transparent\n        );\n    }\n\n    .p-scrollarea-scrollbar {\n        display: block;\n        margin: dt('scrollarea.scrollbar.margin');\n        background: dt('scrollarea.scrollbar.background');\n        border-radius: dt('scrollarea.border.radius');\n        z-index: 50;\n        transition: opacity dt('scrollarea.scrollbar.transition.duration') ease;\n    }\n\n    .p-scrollarea-scrollbar::before {\n        content: '';\n        position: absolute;\n        inset: 0;\n    }\n\n    .p-scrollarea-scrollbar[data-orientation='vertical'] {\n        width: dt('scrollarea.scrollbar.size');\n    }\n\n    .p-scrollarea-scrollbar[data-orientation='horizontal'] {\n        height: dt('scrollarea.scrollbar.size');\n    }\n\n    .p-scrollarea-scrollbar[data-orientation='vertical']::before {\n        width: 1.25rem;\n        left: 50%;\n        transform: translateX(-50%);\n    }\n\n    .p-scrollarea-scrollbar[data-orientation='horizontal']::before {\n        height: 1.25rem;\n        top: 50%;\n        transform: translateY(-50%);\n    }\n\n    .p-scrollarea[data-variant='auto'] .p-scrollarea-scrollbar {\n        opacity: 0;\n    }\n\n    .p-scrollarea[data-variant='auto'] .p-scrollarea-scrollbar:is([data-hovering], [data-scrolling]) {\n        opacity: 1;\n    }\n\n    .p-scrollarea[data-variant='hover'] .p-scrollarea-scrollbar {\n        opacity: 0;\n    }\n\n    .p-scrollarea[data-variant='hover'] .p-scrollarea-scrollbar[data-hovering] {\n        opacity: 1;\n    }\n\n    .p-scrollarea[data-variant='scroll'] .p-scrollarea-scrollbar {\n        opacity: 0;\n    }\n\n    .p-scrollarea[data-variant='scroll'] .p-scrollarea-scrollbar[data-scrolling] {\n        opacity: 1;\n    }\n\n    .p-scrollarea[data-variant='hidden'] .p-scrollarea-scrollbar {\n        opacity: 0;\n        pointer-events: none;\n    }\n\n    .p-scrollarea-content {\n        display: block;\n    }\n\n    .p-scrollarea-corner {\n        display: block;\n    }\n\n    .p-scrollarea[data-variant='hidden'] .p-scrollarea-corner {\n        display: none;\n    }\n\n    .p-scrollarea-handle {\n        display: block;\n        background: dt('scrollarea.handle.background');\n        border-radius: dt('scrollarea.border.radius');\n    }\n\n    .p-scrollarea-handle[data-orientation='vertical'] {\n        width: 100%;\n    }\n\n    .p-scrollarea-handle[data-orientation='horizontal'] {\n        height: 100%;\n    }\n";
// ../node_modules/primeng/fesm2022/primeng-scrollarea.mjs
var _ScrollAreaStyle;
var _ScrollAreaContent;
var _ScrollAreaCorner;
var _ScrollAreaScrollbar;
var _ScrollAreaHandle;
var _ScrollAreaViewport;
var _ScrollArea;
var _ScrollAreaModule;
var SCROLLAREA_INSTANCE = new InjectionToken("SCROLLAREA_INSTANCE");
var SCROLLAREA_VIEWPORT_INSTANCE = new InjectionToken("SCROLLAREA_VIEWPORT_INSTANCE");
var SCROLLAREA_SCROLLBAR_INSTANCE = new InjectionToken("SCROLLAREA_SCROLLBAR_INSTANCE");
var classes = {
	root: ({ instance }) => ["p-scrollarea p-component", { "p-scrollarea-mask": instance.mask() }],
	viewport: "p-scrollarea-viewport",
	content: "p-scrollarea-content",
	scrollbar: "p-scrollarea-scrollbar",
	handle: "p-scrollarea-handle",
	corner: "p-scrollarea-corner"
};
var inlineStyles = {
	root: { position: "relative" },
	viewport: {
		overflow: "scroll",
		scrollbarWidth: "none"
	},
	scrollbar: ({ instance }) => {
		const isVertical = instance.orientation() === "vertical";
		return {
			position: "absolute",
			touchAction: "none",
			userSelect: "none",
			WebkitUserSelect: "none",
			display: instance.isHidden() ? "none" : void 0,
			top: isVertical ? 0 : void 0,
			bottom: isVertical ? "var(--px-corner-height)" : 0,
			insetInlineEnd: isVertical ? 0 : "var(--px-corner-width)",
			insetInlineStart: !isVertical ? 0 : void 0
		};
	},
	corner: ({ instance }) => ({
		position: "absolute",
		bottom: 0,
		insetInlineEnd: 0,
		display: instance.isHidden() ? "none" : void 0
	})
};
var ScrollAreaStyle = (_ScrollAreaStyle = class ScrollAreaStyle extends BaseStyle {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "name", "scrollarea");
		_defineProperty(this, "style", style);
		_defineProperty(this, "classes", classes);
		_defineProperty(this, "inlineStyles", inlineStyles);
	}
}, _defineProperty(_ScrollAreaStyle, "ɵfac", /*@__PURE__*/ (() => {
	let ɵScrollAreaStyle_BaseFactory = void 0;
	return function ScrollAreaStyle_Factory(__ngFactoryType__) {
		return (ɵScrollAreaStyle_BaseFactory || (ɵScrollAreaStyle_BaseFactory = ɵɵgetInheritedFactory(_ScrollAreaStyle)))(__ngFactoryType__ || _ScrollAreaStyle);
	};
})()), _defineProperty(_ScrollAreaStyle, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _ScrollAreaStyle,
	factory: _ScrollAreaStyle.ɵfac
})), _ScrollAreaStyle);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollAreaStyle, [{ type: Injectable }], null, null);
})();
var ScrollAreaClasses;
(function(ScrollAreaClasses) {
	ScrollAreaClasses["root"] = "p-scrollarea";
	ScrollAreaClasses["viewport"] = "p-scrollarea-viewport";
	ScrollAreaClasses["content"] = "p-scrollarea-content";
	ScrollAreaClasses["scrollbar"] = "p-scrollarea-scrollbar";
	ScrollAreaClasses["handle"] = "p-scrollarea-handle";
	ScrollAreaClasses["corner"] = "p-scrollarea-corner";
})(ScrollAreaClasses || (ScrollAreaClasses = {}));
var ScrollAreaContent = (_ScrollAreaContent = class ScrollAreaContent extends BaseComponent {
	constructor(..._args2) {
		super(..._args2);
		_defineProperty(this, "componentName", "ScrollAreaContent");
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		_defineProperty(this, "pcScrollArea", inject(SCROLLAREA_INSTANCE));
		_defineProperty(this, "_componentStyle", inject(ScrollAreaStyle));
		_defineProperty(this, "contentMinWidth", computed(() => this.pcScrollArea.hasOverflowX() ? "fit-content" : null, ...ngDevMode ? [{ debugName: "contentMinWidth" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "contentMinHeight", computed(() => this.pcScrollArea.hasOverflowY() ? "fit-content" : null, ...ngDevMode ? [{ debugName: "contentMinHeight" }] : /* istanbul ignore next */ []));
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.pcScrollArea.ptms(["content"]));
	}
}, _defineProperty(_ScrollAreaContent, "ɵfac", /*@__PURE__*/ (() => {
	let ɵScrollAreaContent_BaseFactory = void 0;
	return function ScrollAreaContent_Factory(__ngFactoryType__) {
		return (ɵScrollAreaContent_BaseFactory || (ɵScrollAreaContent_BaseFactory = ɵɵgetInheritedFactory(_ScrollAreaContent)))(__ngFactoryType__ || _ScrollAreaContent);
	};
})()), _defineProperty(_ScrollAreaContent, "ɵcmp", (function() {
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _ScrollAreaContent,
		selectors: [["p-scrollarea-content"], ["p-scroll-area-content"]],
		hostVars: 6,
		hostBindings: function ScrollAreaContent_HostBindings(rf, ctx) {
			if (rf & 2) {
				ɵɵclassMap(ctx.cx("content"));
				ɵɵstyleProp("min-width", ctx.contentMinWidth())("min-height", ctx.contentMinHeight());
			}
		},
		features: [
			ɵɵProvidersFeature([{
				provide: PARENT_INSTANCE,
				useExisting: _ScrollAreaContent
			}]),
			ɵɵHostDirectivesFeature([Bind]),
			ɵɵInheritDefinitionFeature
		],
		ngContentSelectors: ["*"],
		decls: 1,
		vars: 0,
		template: function ScrollAreaContent_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵprojectionDef();
				ɵɵprojection(0);
			}
		},
		dependencies: [BindModule],
		encapsulation: 2
	});
})()), _ScrollAreaContent);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollAreaContent, [{
		type: Component,
		args: [{
			selector: "p-scrollarea-content, p-scroll-area-content",
			standalone: true,
			imports: [BindModule],
			template: `<ng-content></ng-content>`,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None,
			providers: [{
				provide: PARENT_INSTANCE,
				useExisting: ScrollAreaContent
			}],
			host: {
				"[class]": "cx(\"content\")",
				"[style.min-width]": "contentMinWidth()",
				"[style.min-height]": "contentMinHeight()"
			},
			hostDirectives: [Bind]
		}]
	}], null, null);
})();
var ScrollAreaCorner = (_ScrollAreaCorner = class ScrollAreaCorner extends BaseComponent {
	constructor(..._args3) {
		super(..._args3);
		_defineProperty(this, "componentName", "ScrollAreaCorner");
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		_defineProperty(this, "pcScrollArea", inject(SCROLLAREA_INSTANCE));
		_defineProperty(this, "_componentStyle", inject(ScrollAreaStyle));
		_defineProperty(this, "hostEl", inject(ElementRef));
		_defineProperty(this, "isHidden", computed(() => this.pcScrollArea.cornerHidden(), ...ngDevMode ? [{ debugName: "isHidden" }] : /* istanbul ignore next */ []));
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.pcScrollArea.ptms(["corner"]));
	}
	onAfterViewInit() {
		this.pcScrollArea.cornerEl = this.hostEl.nativeElement;
	}
}, _defineProperty(_ScrollAreaCorner, "ɵfac", /*@__PURE__*/ (() => {
	let ɵScrollAreaCorner_BaseFactory = void 0;
	return function ScrollAreaCorner_Factory(__ngFactoryType__) {
		return (ɵScrollAreaCorner_BaseFactory || (ɵScrollAreaCorner_BaseFactory = ɵɵgetInheritedFactory(_ScrollAreaCorner)))(__ngFactoryType__ || _ScrollAreaCorner);
	};
})()), _defineProperty(_ScrollAreaCorner, "ɵcmp", /*@__PURE__*/ ɵɵdefineComponent({
	type: _ScrollAreaCorner,
	selectors: [["p-scrollarea-corner"], ["p-scroll-area-corner"]],
	hostVars: 4,
	hostBindings: function ScrollAreaCorner_HostBindings(rf, ctx) {
		if (rf & 2) {
			ɵɵstyleMap(ctx.sx("corner"));
			ɵɵclassMap(ctx.cx("corner"));
		}
	},
	features: [
		ɵɵProvidersFeature([{
			provide: PARENT_INSTANCE,
			useExisting: _ScrollAreaCorner
		}]),
		ɵɵHostDirectivesFeature([Bind]),
		ɵɵInheritDefinitionFeature
	],
	decls: 0,
	vars: 0,
	template: function ScrollAreaCorner_Template(rf, ctx) {},
	dependencies: [BindModule],
	encapsulation: 2
})), _ScrollAreaCorner);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollAreaCorner, [{
		type: Component,
		args: [{
			selector: "p-scrollarea-corner, p-scroll-area-corner",
			standalone: true,
			imports: [BindModule],
			template: ``,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None,
			providers: [{
				provide: PARENT_INSTANCE,
				useExisting: ScrollAreaCorner
			}],
			host: {
				"[class]": "cx(\"corner\")",
				"[style]": "sx(\"corner\")"
			},
			hostDirectives: [Bind]
		}]
	}], null, null);
})();
var ScrollAreaScrollbar = (_ScrollAreaScrollbar = class ScrollAreaScrollbar extends BaseComponent {
	constructor(..._args4) {
		var _inject;
		super(..._args4);
		_defineProperty(this, "componentName", "ScrollAreaScrollbar");
		_defineProperty(this, "$pcScrollAreaScrollbar", (_inject = inject(SCROLLAREA_SCROLLBAR_INSTANCE, {
			optional: true,
			skipSelf: true
		})) !== null && _inject !== void 0 ? _inject : void 0);
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		_defineProperty(this, "pcScrollArea", inject(SCROLLAREA_INSTANCE));
		_defineProperty(this, "_componentStyle", inject(ScrollAreaStyle));
		_defineProperty(this, "hostEl", inject(ElementRef));
		_defineProperty(this, "orientation", input("vertical", ...ngDevMode ? [{ debugName: "orientation" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "isVertical", computed(() => this.orientation() === "vertical", ...ngDevMode ? [{ debugName: "isVertical" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "isHidden", computed(() => this.isVertical() ? this.pcScrollArea.hiddenY() : this.pcScrollArea.hiddenX(), ...ngDevMode ? [{ debugName: "isHidden" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataHovering", computed(() => this.pcScrollArea.hovering() ? "" : null, ...ngDevMode ? [{ debugName: "dataHovering" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataScrolling", computed(() => {
			return (this.isVertical() ? this.pcScrollArea.scrollingY() : this.pcScrollArea.scrollingX()) ? "" : null;
		}, ...ngDevMode ? [{ debugName: "dataScrolling" }] : /* istanbul ignore next */ []));
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.pcScrollArea.ptms(["scrollbar"]));
	}
	onAfterViewInit() {
		const el = this.hostEl.nativeElement;
		if (this.isVertical()) this.pcScrollArea.scrollbarYEl = el;
		else this.pcScrollArea.scrollbarXEl = el;
	}
}, _defineProperty(_ScrollAreaScrollbar, "ɵfac", /*@__PURE__*/ (() => {
	let ɵScrollAreaScrollbar_BaseFactory = void 0;
	return function ScrollAreaScrollbar_Factory(__ngFactoryType__) {
		return (ɵScrollAreaScrollbar_BaseFactory || (ɵScrollAreaScrollbar_BaseFactory = ɵɵgetInheritedFactory(_ScrollAreaScrollbar)))(__ngFactoryType__ || _ScrollAreaScrollbar);
	};
})()), _defineProperty(_ScrollAreaScrollbar, "ɵcmp", (function() {
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _ScrollAreaScrollbar,
		selectors: [["p-scrollarea-scrollbar"], ["p-scroll-area-scrollbar"]],
		hostVars: 7,
		hostBindings: function ScrollAreaScrollbar_HostBindings(rf, ctx) {
			if (rf & 1) ɵɵlistener("pointerdown", function ScrollAreaScrollbar_pointerdown_HostBindingHandler($event) {
				return ctx.pcScrollArea.onScrollbarPointerDown($event, ctx.orientation());
			})("pointermove", function ScrollAreaScrollbar_pointermove_HostBindingHandler($event) {
				return ctx.pcScrollArea.onScrollbarPointerMove($event);
			})("pointerup", function ScrollAreaScrollbar_pointerup_HostBindingHandler($event) {
				return ctx.pcScrollArea.onScrollbarPointerUp($event);
			})("wheel", function ScrollAreaScrollbar_wheel_HostBindingHandler($event) {
				return ctx.pcScrollArea.onScrollbarWheel($event, ctx.orientation());
			});
			if (rf & 2) {
				ɵɵattribute("data-orientation", ctx.orientation())("data-hovering", ctx.dataHovering())("data-scrolling", ctx.dataScrolling());
				ɵɵstyleMap(ctx.sx("scrollbar"));
				ɵɵclassMap(ctx.cx("scrollbar"));
			}
		},
		inputs: { orientation: [1, "orientation"] },
		features: [
			ɵɵProvidersFeature([{
				provide: SCROLLAREA_SCROLLBAR_INSTANCE,
				useExisting: _ScrollAreaScrollbar
			}, {
				provide: PARENT_INSTANCE,
				useExisting: _ScrollAreaScrollbar
			}]),
			ɵɵHostDirectivesFeature([Bind]),
			ɵɵInheritDefinitionFeature
		],
		ngContentSelectors: ["*"],
		decls: 1,
		vars: 0,
		template: function ScrollAreaScrollbar_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵprojectionDef();
				ɵɵprojection(0);
			}
		},
		dependencies: [BindModule],
		encapsulation: 2
	});
})()), _ScrollAreaScrollbar);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollAreaScrollbar, [{
		type: Component,
		args: [{
			selector: "p-scrollarea-scrollbar, p-scroll-area-scrollbar",
			standalone: true,
			imports: [BindModule],
			template: `<ng-content></ng-content>`,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None,
			providers: [{
				provide: SCROLLAREA_SCROLLBAR_INSTANCE,
				useExisting: ScrollAreaScrollbar
			}, {
				provide: PARENT_INSTANCE,
				useExisting: ScrollAreaScrollbar
			}],
			host: {
				"[class]": "cx(\"scrollbar\")",
				"[style]": "sx(\"scrollbar\")",
				"[attr.data-orientation]": "orientation()",
				"[attr.data-hovering]": "dataHovering()",
				"[attr.data-scrolling]": "dataScrolling()",
				"(pointerdown)": "pcScrollArea.onScrollbarPointerDown($event, orientation())",
				"(pointermove)": "pcScrollArea.onScrollbarPointerMove($event)",
				"(pointerup)": "pcScrollArea.onScrollbarPointerUp($event)",
				"(wheel)": "pcScrollArea.onScrollbarWheel($event, orientation())"
			},
			hostDirectives: [Bind]
		}]
	}], null, { orientation: [{
		type: Input,
		args: [{
			isSignal: true,
			alias: "orientation",
			required: false
		}]
	}] });
})();
var ScrollAreaHandle = (_ScrollAreaHandle = class ScrollAreaHandle extends BaseComponent {
	constructor(..._args5) {
		super(..._args5);
		_defineProperty(this, "componentName", "ScrollAreaHandle");
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		_defineProperty(this, "pcScrollArea", inject(SCROLLAREA_INSTANCE));
		_defineProperty(this, "pcScrollbar", inject(SCROLLAREA_SCROLLBAR_INSTANCE));
		_defineProperty(this, "_componentStyle", inject(ScrollAreaStyle));
		_defineProperty(this, "hostEl", inject(ElementRef));
		_defineProperty(this, "orientation", computed(() => this.pcScrollbar.orientation(), ...ngDevMode ? [{ debugName: "orientation" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "isVertical", computed(() => this.orientation() === "vertical", ...ngDevMode ? [{ debugName: "isVertical" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "handleHeight", computed(() => this.isVertical() ? "var(--px-handle-height, 0px)" : void 0, ...ngDevMode ? [{ debugName: "handleHeight" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "handleWidth", computed(() => this.isVertical() ? void 0 : "var(--px-handle-width, 0px)", ...ngDevMode ? [{ debugName: "handleWidth" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "handleTransform", computed(() => this.isVertical() ? "translate3d(0, var(--px-handle-offset, 0px), 0)" : "translate3d(var(--px-handle-offset, 0px), 0, 0)", ...ngDevMode ? [{ debugName: "handleTransform" }] : /* istanbul ignore next */ []));
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.pcScrollArea.ptms(["handle"]));
	}
	onAfterViewInit() {
		const el = this.hostEl.nativeElement;
		if (this.isVertical()) this.pcScrollArea.handleYEl = el;
		else this.pcScrollArea.handleXEl = el;
	}
}, _defineProperty(_ScrollAreaHandle, "ɵfac", /*@__PURE__*/ (() => {
	let ɵScrollAreaHandle_BaseFactory = void 0;
	return function ScrollAreaHandle_Factory(__ngFactoryType__) {
		return (ɵScrollAreaHandle_BaseFactory || (ɵScrollAreaHandle_BaseFactory = ɵɵgetInheritedFactory(_ScrollAreaHandle)))(__ngFactoryType__ || _ScrollAreaHandle);
	};
})()), _defineProperty(_ScrollAreaHandle, "ɵcmp", /*@__PURE__*/ ɵɵdefineComponent({
	type: _ScrollAreaHandle,
	selectors: [["p-scrollarea-handle"], ["p-scroll-area-handle"]],
	hostVars: 9,
	hostBindings: function ScrollAreaHandle_HostBindings(rf, ctx) {
		if (rf & 1) ɵɵlistener("pointerdown", function ScrollAreaHandle_pointerdown_HostBindingHandler($event) {
			return ctx.pcScrollArea.onHandlePointerDown($event, ctx.orientation());
		});
		if (rf & 2) {
			ɵɵattribute("data-orientation", ctx.orientation());
			ɵɵclassMap(ctx.cx("handle"));
			ɵɵstyleProp("height", ctx.handleHeight())("width", ctx.handleWidth())("transform", ctx.handleTransform());
		}
	},
	features: [
		ɵɵProvidersFeature([{
			provide: PARENT_INSTANCE,
			useExisting: _ScrollAreaHandle
		}]),
		ɵɵHostDirectivesFeature([Bind]),
		ɵɵInheritDefinitionFeature
	],
	decls: 0,
	vars: 0,
	template: function ScrollAreaHandle_Template(rf, ctx) {},
	dependencies: [BindModule],
	encapsulation: 2
})), _ScrollAreaHandle);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollAreaHandle, [{
		type: Component,
		args: [{
			selector: "p-scrollarea-handle, p-scroll-area-handle",
			standalone: true,
			imports: [BindModule],
			template: ``,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None,
			providers: [{
				provide: PARENT_INSTANCE,
				useExisting: ScrollAreaHandle
			}],
			host: {
				"[class]": "cx(\"handle\")",
				"[attr.data-orientation]": "orientation()",
				"[style.height]": "handleHeight()",
				"[style.width]": "handleWidth()",
				"[style.transform]": "handleTransform()",
				"(pointerdown)": "pcScrollArea.onHandlePointerDown($event, orientation())"
			},
			hostDirectives: [Bind]
		}]
	}], null, null);
})();
var ScrollAreaViewport = (_ScrollAreaViewport = class ScrollAreaViewport extends BaseComponent {
	constructor(..._args6) {
		var _inject2;
		super(..._args6);
		_defineProperty(this, "componentName", "ScrollAreaViewport");
		_defineProperty(this, "$pcScrollAreaViewport", (_inject2 = inject(SCROLLAREA_VIEWPORT_INSTANCE, {
			optional: true,
			skipSelf: true
		})) !== null && _inject2 !== void 0 ? _inject2 : void 0);
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		_defineProperty(this, "pcScrollArea", inject(SCROLLAREA_INSTANCE));
		_defineProperty(this, "_componentStyle", inject(ScrollAreaStyle));
		_defineProperty(this, "hostEl", inject(ElementRef));
		_defineProperty(this, "viewportTabindex", computed(() => this.pcScrollArea.hasOverflowX() || this.pcScrollArea.hasOverflowY() ? this.pcScrollArea.tabindex() : null, ...ngDevMode ? [{ debugName: "viewportTabindex" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataScrollYBefore", computed(() => this.pcScrollArea.yBefore() ? "" : null, ...ngDevMode ? [{ debugName: "dataScrollYBefore" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataScrollYAfter", computed(() => this.pcScrollArea.yAfter() ? "" : null, ...ngDevMode ? [{ debugName: "dataScrollYAfter" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataScrollXBefore", computed(() => this.pcScrollArea.xBefore() ? "" : null, ...ngDevMode ? [{ debugName: "dataScrollXBefore" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataScrollXAfter", computed(() => this.pcScrollArea.xAfter() ? "" : null, ...ngDevMode ? [{ debugName: "dataScrollXAfter" }] : /* istanbul ignore next */ []));
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.pcScrollArea.ptms(["viewport"]));
	}
	onAfterViewInit() {
		this.pcScrollArea.viewportEl = this.hostEl.nativeElement;
	}
}, _defineProperty(_ScrollAreaViewport, "ɵfac", /*@__PURE__*/ (() => {
	let ɵScrollAreaViewport_BaseFactory = void 0;
	return function ScrollAreaViewport_Factory(__ngFactoryType__) {
		return (ɵScrollAreaViewport_BaseFactory || (ɵScrollAreaViewport_BaseFactory = ɵɵgetInheritedFactory(_ScrollAreaViewport)))(__ngFactoryType__ || _ScrollAreaViewport);
	};
})()), _defineProperty(_ScrollAreaViewport, "ɵcmp", (function() {
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _ScrollAreaViewport,
		selectors: [["p-scrollarea-viewport"], ["p-scroll-area-viewport"]],
		hostVars: 9,
		hostBindings: function ScrollAreaViewport_HostBindings(rf, ctx) {
			if (rf & 1) ɵɵlistener("scroll", function ScrollAreaViewport_scroll_HostBindingHandler() {
				return ctx.pcScrollArea.onScroll();
			});
			if (rf & 2) {
				ɵɵattribute("tabindex", ctx.viewportTabindex())("data-scroll-y-before", ctx.dataScrollYBefore())("data-scroll-y-after", ctx.dataScrollYAfter())("data-scroll-x-before", ctx.dataScrollXBefore())("data-scroll-x-after", ctx.dataScrollXAfter());
				ɵɵstyleMap(ctx.sx("viewport"));
				ɵɵclassMap(ctx.cx("viewport"));
			}
		},
		features: [
			ɵɵProvidersFeature([{
				provide: SCROLLAREA_VIEWPORT_INSTANCE,
				useExisting: _ScrollAreaViewport
			}, {
				provide: PARENT_INSTANCE,
				useExisting: _ScrollAreaViewport
			}]),
			ɵɵHostDirectivesFeature([Bind]),
			ɵɵInheritDefinitionFeature
		],
		ngContentSelectors: ["*"],
		decls: 1,
		vars: 0,
		template: function ScrollAreaViewport_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵprojectionDef();
				ɵɵprojection(0);
			}
		},
		dependencies: [BindModule],
		encapsulation: 2
	});
})()), _ScrollAreaViewport);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollAreaViewport, [{
		type: Component,
		args: [{
			selector: "p-scrollarea-viewport, p-scroll-area-viewport",
			standalone: true,
			imports: [BindModule],
			template: `<ng-content></ng-content>`,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None,
			providers: [{
				provide: SCROLLAREA_VIEWPORT_INSTANCE,
				useExisting: ScrollAreaViewport
			}, {
				provide: PARENT_INSTANCE,
				useExisting: ScrollAreaViewport
			}],
			host: {
				"[class]": "cx(\"viewport\")",
				"[style]": "sx(\"viewport\")",
				"[attr.tabindex]": "viewportTabindex()",
				"[attr.data-scroll-y-before]": "dataScrollYBefore()",
				"[attr.data-scroll-y-after]": "dataScrollYAfter()",
				"[attr.data-scroll-x-before]": "dataScrollXBefore()",
				"[attr.data-scroll-x-after]": "dataScrollXAfter()",
				"(scroll)": "pcScrollArea.onScroll()"
			},
			hostDirectives: [Bind]
		}]
	}], null, null);
})();
var SCROLL_TIMEOUT = 500;
var MIN_HANDLE_SIZE = 20;
var ScrollArea = (_ScrollArea = class ScrollArea extends BaseComponent {
	constructor(..._args7) {
		var _inject3;
		super(..._args7);
		_defineProperty(this, "componentName", "ScrollArea");
		_defineProperty(this, "$pcScrollArea", (_inject3 = inject(SCROLLAREA_INSTANCE, {
			optional: true,
			skipSelf: true
		})) !== null && _inject3 !== void 0 ? _inject3 : void 0);
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		_defineProperty(this, "variant", input("auto", ...ngDevMode ? [{ debugName: "variant" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "mask", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "mask" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "tabindex", input(0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "tabindex" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "_componentStyle", inject(ScrollAreaStyle));
		_defineProperty(this, "hovering", signal(false, ...ngDevMode ? [{ debugName: "hovering" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "scrollingX", signal(false, ...ngDevMode ? [{ debugName: "scrollingX" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "scrollingY", signal(false, ...ngDevMode ? [{ debugName: "scrollingY" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "touchModality", signal(false, ...ngDevMode ? [{ debugName: "touchModality" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "hiddenX", signal(true, ...ngDevMode ? [{ debugName: "hiddenX" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "hiddenY", signal(true, ...ngDevMode ? [{ debugName: "hiddenY" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "cornerHidden", signal(true, ...ngDevMode ? [{ debugName: "cornerHidden" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "hasOverflowX", signal(false, ...ngDevMode ? [{ debugName: "hasOverflowX" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "hasOverflowY", signal(false, ...ngDevMode ? [{ debugName: "hasOverflowY" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "yBefore", signal(false, ...ngDevMode ? [{ debugName: "yBefore" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "yAfter", signal(false, ...ngDevMode ? [{ debugName: "yAfter" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "xBefore", signal(false, ...ngDevMode ? [{ debugName: "xBefore" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "xAfter", signal(false, ...ngDevMode ? [{ debugName: "xAfter" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "cornerWidthValue", signal(0, ...ngDevMode ? [{ debugName: "cornerWidthValue" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "cornerHeightValue", signal(0, ...ngDevMode ? [{ debugName: "cornerHeightValue" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "cornerWidthPx", computed(() => `${this.cornerWidthValue()}px`, ...ngDevMode ? [{ debugName: "cornerWidthPx" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "cornerHeightPx", computed(() => `${this.cornerHeightValue()}px`, ...ngDevMode ? [{ debugName: "cornerHeightPx" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataHovering", computed(() => this.hovering() ? "" : null, ...ngDevMode ? [{ debugName: "dataHovering" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataScrollingY", computed(() => this.scrollingY() ? "" : null, ...ngDevMode ? [{ debugName: "dataScrollingY" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataScrollingX", computed(() => this.scrollingX() ? "" : null, ...ngDevMode ? [{ debugName: "dataScrollingX" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "viewportEl", null);
		_defineProperty(this, "scrollbarYEl", null);
		_defineProperty(this, "scrollbarXEl", null);
		_defineProperty(this, "handleYEl", null);
		_defineProperty(this, "handleXEl", null);
		_defineProperty(this, "cornerEl", null);
		_defineProperty(this, "isDragging", false);
		_defineProperty(this, "dragOrientation", "vertical");
		_defineProperty(this, "dragStart", {
			pointerPos: 0,
			scrollPos: 0
		});
		_defineProperty(this, "prevScroll", {
			top: 0,
			left: 0
		});
		_defineProperty(this, "scrollXTimeout", null);
		_defineProperty(this, "scrollYTimeout", null);
		_defineProperty(this, "rafId", null);
		_defineProperty(this, "resizeObserver", null);
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
	}
	onAfterViewInit() {
		if (isPlatformBrowser(this.platformId)) {
			this.computeHandle();
			this.setupResizeObserver();
		}
	}
	onDestroy() {
		var _this$resizeObserver;
		(_this$resizeObserver = this.resizeObserver) === null || _this$resizeObserver === void 0 || _this$resizeObserver.disconnect();
		this.resizeObserver = null;
		if (this.scrollXTimeout) clearTimeout(this.scrollXTimeout);
		if (this.scrollYTimeout) clearTimeout(this.scrollYTimeout);
		if (this.rafId) cancelAnimationFrame(this.rafId);
	}
	setupResizeObserver() {
		const vp = this.viewportEl;
		if (!vp) return;
		let localRaf = null;
		this.resizeObserver = new ResizeObserver(() => {
			if (localRaf) return;
			localRaf = requestAnimationFrame(() => {
				localRaf = null;
				this.computeHandle();
			});
		});
		this.resizeObserver.observe(vp);
		if (vp.firstElementChild) this.resizeObserver.observe(vp.firstElementChild);
	}
	computeHandle() {
		const vp = this.viewportEl;
		if (!vp) return;
		const { scrollHeight, scrollWidth, clientHeight, clientWidth, scrollTop, scrollLeft } = vp;
		const yHidden = clientHeight >= scrollHeight;
		const xHidden = clientWidth >= scrollWidth;
		const scrollbarY = this.scrollbarYEl;
		const scrollbarX = this.scrollbarXEl;
		const cw = !yHidden && !xHidden && scrollbarY ? scrollbarY.offsetWidth : 0;
		const ch = !yHidden && !xHidden && scrollbarX ? scrollbarX.offsetHeight : 0;
		const scrollbarYHeight = scrollbarY && !yHidden ? scrollbarY.offsetHeight : 0;
		const scrollbarXWidth = scrollbarX && !xHidden ? scrollbarX.offsetWidth : 0;
		this.hiddenX.set(xHidden);
		this.hiddenY.set(yHidden);
		this.cornerHidden.set(xHidden || yHidden);
		this.cornerWidthValue.set(cw);
		this.cornerHeightValue.set(ch);
		this.hasOverflowX.set(!xHidden);
		this.hasOverflowY.set(!yHidden);
		this.xBefore.set(!xHidden && scrollLeft > 0);
		this.xAfter.set(!xHidden && scrollWidth - clientWidth - scrollLeft > 1);
		this.yBefore.set(!yHidden && scrollTop > 0);
		this.yAfter.set(!yHidden && scrollHeight - clientHeight - scrollTop > 1);
		if (scrollbarY && !yHidden && scrollbarYHeight > 0) {
			const handleRatio = clientHeight / scrollHeight;
			const handleHeight = Math.max(handleRatio * scrollbarYHeight, MIN_HANDLE_SIZE);
			const availableTrack = scrollbarYHeight - handleHeight;
			const maxScrollTop = scrollHeight - clientHeight;
			const offsetPx = (maxScrollTop > 0 ? scrollTop / maxScrollTop : 0) * availableTrack;
			scrollbarY.style.setProperty("--px-handle-height", `${handleHeight}px`);
			scrollbarY.style.setProperty("--px-handle-offset", `${offsetPx}px`);
		}
		if (scrollbarX && !xHidden && scrollbarXWidth > 0) {
			const handleRatio = clientWidth / scrollWidth;
			const handleWidth = Math.max(handleRatio * scrollbarXWidth, MIN_HANDLE_SIZE);
			const availableTrack = scrollbarXWidth - handleWidth;
			const maxScrollLeft = scrollWidth - clientWidth;
			const offsetPx = (maxScrollLeft > 0 ? scrollLeft / maxScrollLeft : 0) * availableTrack;
			scrollbarX.style.setProperty("--px-handle-width", `${handleWidth}px`);
			scrollbarX.style.setProperty("--px-handle-offset", `${offsetPx}px`);
		}
		this.cd.markForCheck();
	}
	onScroll() {
		if (!this.rafId) this.rafId = requestAnimationFrame(() => {
			this.rafId = null;
			this.computeHandle();
		});
		const vp = this.viewportEl;
		if (!vp) return;
		const { scrollTop, scrollLeft } = vp;
		if (scrollTop !== this.prevScroll.top) {
			this.scrollingY.set(true);
			if (this.scrollYTimeout) clearTimeout(this.scrollYTimeout);
			this.scrollYTimeout = setTimeout(() => {
				this.scrollingY.set(false);
				this.cd.markForCheck();
			}, SCROLL_TIMEOUT);
		}
		if (scrollLeft !== this.prevScroll.left) {
			this.scrollingX.set(true);
			if (this.scrollXTimeout) clearTimeout(this.scrollXTimeout);
			this.scrollXTimeout = setTimeout(() => {
				this.scrollingX.set(false);
				this.cd.markForCheck();
			}, SCROLL_TIMEOUT);
		}
		this.prevScroll.top = scrollTop;
		this.prevScroll.left = scrollLeft;
		this.cd.markForCheck();
	}
	onHandlePointerDown(event, orientation) {
		if (event.pointerType === "mouse" && event.button !== 0) return;
		event.preventDefault();
		event.stopPropagation();
		const isVertical = orientation === "vertical";
		const scrollbar = isVertical ? this.scrollbarYEl : this.scrollbarXEl;
		const vp = this.viewportEl;
		if (!scrollbar || !vp) return;
		scrollbar.setPointerCapture(event.pointerId);
		this.isDragging = true;
		this.dragOrientation = orientation;
		this.dragStart = {
			pointerPos: isVertical ? event.clientY : event.clientX,
			scrollPos: isVertical ? vp.scrollTop : vp.scrollLeft
		};
	}
	onScrollbarPointerDown(event, orientation) {
		if (event.pointerType === "mouse" && event.button !== 0) return;
		event.preventDefault();
		const isVertical = orientation === "vertical";
		const scrollbar = isVertical ? this.scrollbarYEl : this.scrollbarXEl;
		const vp = this.viewportEl;
		if (!scrollbar || !vp) return;
		scrollbar.setPointerCapture(event.pointerId);
		this.isDragging = true;
		this.dragOrientation = orientation;
		const rect = scrollbar.getBoundingClientRect();
		const handle = isVertical ? this.handleYEl : this.handleXEl;
		const handleSize = handle ? isVertical ? handle.offsetHeight : handle.offsetWidth : 0;
		const effectiveTrack = (isVertical ? rect.height : rect.width) - handleSize;
		if (effectiveTrack > 0) {
			const clickPos = (isVertical ? event.clientY - rect.top : event.clientX - rect.left) - handleSize / 2;
			const ratio = Math.max(0, Math.min(1, clickPos / effectiveTrack));
			const maxScroll = isVertical ? vp.scrollHeight - vp.clientHeight : vp.scrollWidth - vp.clientWidth;
			if (isVertical) vp.scrollTop = ratio * maxScroll;
			else vp.scrollLeft = ratio * maxScroll;
		}
		this.dragStart = {
			pointerPos: isVertical ? event.clientY : event.clientX,
			scrollPos: isVertical ? vp.scrollTop : vp.scrollLeft
		};
	}
	onScrollbarPointerMove(event) {
		if (!this.isDragging) return;
		event.preventDefault();
		const isVertical = this.dragOrientation === "vertical";
		const vp = this.viewportEl;
		const scrollbar = isVertical ? this.scrollbarYEl : this.scrollbarXEl;
		if (!vp || !scrollbar) return;
		const rect = scrollbar.getBoundingClientRect();
		const handle = isVertical ? this.handleYEl : this.handleXEl;
		const handleSize = handle ? isVertical ? handle.offsetHeight : handle.offsetWidth : 0;
		const effectiveTrack = (isVertical ? rect.height : rect.width) - handleSize;
		if (effectiveTrack <= 0) return;
		const delta = (isVertical ? event.clientY : event.clientX) - this.dragStart.pointerPos;
		const maxScroll = isVertical ? vp.scrollHeight - vp.clientHeight : vp.scrollWidth - vp.clientWidth;
		const scrollDelta = delta / effectiveTrack * maxScroll;
		if (isVertical) vp.scrollTop = this.dragStart.scrollPos + scrollDelta;
		else vp.scrollLeft = this.dragStart.scrollPos + scrollDelta;
	}
	onScrollbarPointerUp(event) {
		event.preventDefault();
		event.currentTarget.releasePointerCapture(event.pointerId);
		this.isDragging = false;
	}
	onScrollbarWheel(event, orientation) {
		const vp = this.viewportEl;
		if (!vp || event.ctrlKey) return;
		if (orientation === "vertical") vp.scrollTop += event.deltaY;
		else vp.scrollLeft += event.deltaX || event.deltaY;
	}
	onRootPointerEnter(event) {
		if (event.pointerType === "touch") this.touchModality.set(true);
		else {
			this.touchModality.set(false);
			this.hovering.set(true);
		}
	}
	onRootPointerLeave() {
		this.hovering.set(false);
	}
	onRootPointerDown(event) {
		if (event.pointerType === "touch") this.touchModality.set(true);
	}
	refresh() {
		this.computeHandle();
	}
}, _defineProperty(_ScrollArea, "ɵfac", /*@__PURE__*/ (() => {
	let ɵScrollArea_BaseFactory = void 0;
	return function ScrollArea_Factory(__ngFactoryType__) {
		return (ɵScrollArea_BaseFactory || (ɵScrollArea_BaseFactory = ɵɵgetInheritedFactory(_ScrollArea)))(__ngFactoryType__ || _ScrollArea);
	};
})()), _defineProperty(_ScrollArea, "ɵcmp", (function() {
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _ScrollArea,
		selectors: [["p-scrollarea"], ["p-scroll-area"]],
		hostVars: 9,
		hostBindings: function ScrollArea_HostBindings(rf, ctx) {
			if (rf & 1) ɵɵlistener("pointerenter", function ScrollArea_pointerenter_HostBindingHandler($event) {
				return ctx.onRootPointerEnter($event);
			})("pointerleave", function ScrollArea_pointerleave_HostBindingHandler() {
				return ctx.onRootPointerLeave();
			})("pointerdown", function ScrollArea_pointerdown_HostBindingHandler($event) {
				return ctx.onRootPointerDown($event);
			});
			if (rf & 2) {
				ɵɵattribute("data-variant", ctx.variant());
				ɵɵstyleMap(ctx.sx("root"));
				ɵɵclassMap(ctx.cx("root"));
				ɵɵstyleProp("--%NS%px-corner-height", ctx.cornerHeightPx())("--%NS%px-corner-width", ctx.cornerWidthPx());
			}
		},
		inputs: {
			variant: [1, "variant"],
			mask: [1, "mask"],
			tabindex: [1, "tabindex"]
		},
		features: [
			ɵɵProvidersFeature([
				ScrollAreaStyle,
				{
					provide: SCROLLAREA_INSTANCE,
					useExisting: _ScrollArea
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: _ScrollArea
				}
			]),
			ɵɵHostDirectivesFeature([Bind]),
			ɵɵInheritDefinitionFeature
		],
		ngContentSelectors: ["*"],
		decls: 1,
		vars: 0,
		template: function ScrollArea_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵprojectionDef();
				ɵɵprojection(0);
			}
		},
		dependencies: [SharedModule, BindModule],
		encapsulation: 2
	});
})()), _ScrollArea);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollArea, [{
		type: Component,
		args: [{
			selector: "p-scrollarea, p-scroll-area",
			standalone: true,
			imports: [SharedModule, BindModule],
			template: `<ng-content></ng-content>`,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None,
			providers: [
				ScrollAreaStyle,
				{
					provide: SCROLLAREA_INSTANCE,
					useExisting: ScrollArea
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: ScrollArea
				}
			],
			host: {
				"[class]": "cx(\"root\")",
				"[style]": "sx(\"root\")",
				"[attr.data-variant]": "variant()",
				"[style.--px-corner-height]": "cornerHeightPx()",
				"[style.--px-corner-width]": "cornerWidthPx()",
				"(pointerenter)": "onRootPointerEnter($event)",
				"(pointerleave)": "onRootPointerLeave()",
				"(pointerdown)": "onRootPointerDown($event)"
			},
			hostDirectives: [Bind]
		}]
	}], null, {
		variant: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "variant",
				required: false
			}]
		}],
		mask: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "mask",
				required: false
			}]
		}],
		tabindex: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "tabindex",
				required: false
			}]
		}]
	});
})();
var ScrollAreaModule = (_ScrollAreaModule = class ScrollAreaModule {}, _defineProperty(_ScrollAreaModule, "ɵfac", function ScrollAreaModule_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _ScrollAreaModule)();
}), _defineProperty(_ScrollAreaModule, "ɵmod", /*@__PURE__*/ ɵɵdefineNgModule({
	type: _ScrollAreaModule,
	imports: [
		ScrollArea,
		ScrollAreaViewport,
		ScrollAreaContent,
		ScrollAreaScrollbar,
		ScrollAreaHandle,
		ScrollAreaCorner,
		SharedModule,
		BindModule
	],
	exports: [
		ScrollArea,
		ScrollAreaViewport,
		ScrollAreaContent,
		ScrollAreaScrollbar,
		ScrollAreaHandle,
		ScrollAreaCorner,
		SharedModule,
		BindModule
	]
})), _defineProperty(_ScrollAreaModule, "ɵinj", /*@__PURE__*/ ɵɵdefineInjector({ imports: [
	ScrollArea,
	ScrollAreaViewport,
	ScrollAreaContent,
	ScrollAreaScrollbar,
	ScrollAreaHandle,
	ScrollAreaCorner,
	SharedModule,
	BindModule,
	SharedModule,
	BindModule
] })), _ScrollAreaModule);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollAreaModule, [{
		type: NgModule,
		args: [{
			imports: [
				ScrollArea,
				ScrollAreaViewport,
				ScrollAreaContent,
				ScrollAreaScrollbar,
				ScrollAreaHandle,
				ScrollAreaCorner,
				SharedModule,
				BindModule
			],
			exports: [
				ScrollArea,
				ScrollAreaViewport,
				ScrollAreaContent,
				ScrollAreaScrollbar,
				ScrollAreaHandle,
				ScrollAreaCorner,
				SharedModule,
				BindModule
			]
		}]
	}], null, null);
})();
export { SCROLLAREA_INSTANCE, SCROLLAREA_SCROLLBAR_INSTANCE, SCROLLAREA_VIEWPORT_INSTANCE, ScrollArea, ScrollAreaClasses, ScrollAreaContent, ScrollAreaCorner, ScrollAreaHandle, ScrollAreaModule, ScrollAreaScrollbar, ScrollAreaStyle, ScrollAreaViewport };
