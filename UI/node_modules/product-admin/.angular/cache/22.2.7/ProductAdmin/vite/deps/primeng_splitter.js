import { Y as NgTemplateOutlet, u as isPlatformBrowser } from "./common-CYN6T7fr.js";
import { $n as Output, Al as ɵɵdefineInjectable, Ao as ɵɵgetCurrentView, Bl as ɵɵrestoreView, Bt as computed, Co as ɵɵelementStart, Da as ɵɵconditionalCreate, Dr as ViewEncapsulation, Ds as ɵɵrepeaterTrackByIndex, Fn as Injectable, Gs as ɵɵtemplate, Hs as ɵɵstyleProp, In as Input, Ks as ɵɵtemplateRefExtractor, O as booleanAttribute, Qo as ɵɵlistener, S as ViewChild, Sa as ɵɵclassMap, So as ɵɵelementEnd, Ta as ɵɵconditional, Tl as signal, Ts as ɵɵrepeaterCreate, Vs as ɵɵstyleMap, Wi as setClassMetadata, X as input, _o as ɵɵdomTemplate, a as ContentChildren, an as ChangeDetectionStrategy, ao as ɵɵdefineNgModule, at as output, bs as ɵɵqueryAdvance, ca as ɵɵInheritDefinitionFeature, cn as Component, cs as ɵɵprojectionDef, da as ɵɵadvance, dc as ɵɵviewQuerySignal, dl as inject, es as ɵɵnextContext, gt as viewChild, il as effect, j as contentChildren, jl as ɵɵdefineInjector, jo as ɵɵgetInheritedFactory, ka as ɵɵcontentQuerySignal, ls as ɵɵproperty, ol as forwardRef, qn as NgModule, qt as untracked, ro as ɵɵdefineComponent, rt as numberAttribute, sa as ɵɵHostDirectivesFeature, ss as ɵɵprojection, ua as ɵɵProvidersFeature, vo as ɵɵelement, ws as ɵɵrepeater, ya as ɵɵattribute, yo as ɵɵelementContainer, zl as ɵɵresetView } from "./core-BVpAqhZc.js";
import "./dist-D971aPsi.js";
import { Ot as q } from "./dist-BnkFXv39.js";
import { SharedModule } from "./primeng_api.js";
import { n as PARENT_INSTANCE, t as BaseComponent } from "./primeng-basecomponent-DFIxl5Fy.js";
import { Bind, BindModule } from "./primeng_bind.js";
import { s as BaseStyle } from "./primeng-config-EnOVMCIx.js";
import { n as _objectSpread2, r as _defineProperty } from "./asyncToGenerator-CE9zIWF7.js";
// ../node_modules/@primeuix/styles/dist/splitter/index.mjs
var style = "\n    .p-splitter {\n        display: flex;\n        flex-wrap: nowrap;\n        border: 1px solid dt('splitter.border.color');\n        background: dt('splitter.background');\n        border-radius: dt('border.radius.md');\n        color: dt('splitter.color');\n    }\n\n    .p-splitter-vertical {\n        flex-direction: column;\n    }\n\n    .p-splitter-gutter {\n        flex-grow: 0;\n        flex-shrink: 0;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        z-index: 1;\n        background: dt('splitter.gutter.background');\n        position: relative;\n    }\n\n    .p-splitter-gutter::before {\n        content: '';\n        position: absolute;\n    }\n\n    .p-splitter-gutter-handle {\n        border-radius: dt('splitter.handle.border.radius');\n        background: dt('splitter.handle.background');\n        transition:\n            outline-color dt('splitter.transition.duration'),\n            box-shadow dt('splitter.transition.duration');\n        outline-color: transparent;\n    }\n\n    .p-splitter-gutter:focus-visible {\n        outline: none;\n    }\n\n    .p-splitter-gutter:focus-visible > .p-splitter-gutter-handle {\n        box-shadow: dt('splitter.handle.focus.ring.shadow');\n        outline: dt('splitter.handle.focus.ring.width') dt('splitter.handle.focus.ring.style') dt('splitter.handle.focus.ring.color');\n        outline-offset: dt('splitter.handle.focus.ring.offset');\n    }\n\n    .p-splitter[data-orientation='horizontal'][data-resizing] {\n        cursor: col-resize;\n        user-select: none;\n    }\n\n    .p-splitter[data-orientation='vertical'][data-resizing] {\n        cursor: row-resize;\n        user-select: none;\n    }\n\n    .p-splitter[data-orientation='horizontal'] > .p-splitter-gutter > .p-splitter-gutter-handle {\n        height: dt('splitter.handle.size');\n        width: 100%;\n    }\n\n    .p-splitter[data-orientation='vertical'] > .p-splitter-gutter > .p-splitter-gutter-handle {\n        width: dt('splitter.handle.size');\n        height: 100%;\n    }\n\n    .p-splitter-panel:has(> .p-splitter) {\n        display: flex;\n    }\n\n    .p-splitter-panel > .p-splitter {\n        flex-grow: 1;\n        border: 0 none;\n    }\n\n    .p-splitter-gutter[data-orientation='horizontal']{\n        width: 1px;\n        cursor: col-resize;\n    }\n\n    .p-splitter-gutter[data-orientation='horizontal']::before {\n        content: '';\n        width: 5px;\n        position: absolute;\n        left: 50%;\n        top: 0;\n        bottom: 0;\n        transform: translateX(-50%);\n    }\n\n    .p-splitter-gutter[data-orientation='vertical']{\n        height: 1px;\n        cursor: row-resize;\n    }\n\n    .p-splitter-gutter[data-orientation='vertical']::before {\n        content: '';\n        height: 5px;\n        position: absolute;\n        left: 0;\n        top: 50%;\n        right: 0;\n        transform: translateY(-50%);\n    }\n\n    .p-splitter-gutter[data-disabled] {\n        cursor: default;\n        pointer-events: none;\n        opacity: 0.4;\n    }\n";
// ../node_modules/primeng/fesm2022/primeng-splitter.mjs
var _SplitterStyle;
var _SplitterPanel;
var _Splitter;
var _SplitterModule;
var classes = {
	root: ({ instance }) => ["p-splitter p-component", "p-splitter-" + instance.layout()],
	panel: "p-splitter-panel",
	gutter: "p-splitter-gutter",
	gutterHandle: "p-splitter-gutter-handle"
};
var SplitterStyle = (_SplitterStyle = class SplitterStyle extends BaseStyle {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "name", "splitter");
		_defineProperty(this, "style", style);
		_defineProperty(this, "classes", classes);
	}
}, _defineProperty(_SplitterStyle, "ɵfac", /*@__PURE__*/ (() => {
	let ɵSplitterStyle_BaseFactory = void 0;
	return function SplitterStyle_Factory(__ngFactoryType__) {
		return (ɵSplitterStyle_BaseFactory || (ɵSplitterStyle_BaseFactory = ɵɵgetInheritedFactory(_SplitterStyle)))(__ngFactoryType__ || _SplitterStyle);
	};
})()), _defineProperty(_SplitterStyle, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _SplitterStyle,
	factory: _SplitterStyle.ɵfac
})), _SplitterStyle);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SplitterStyle, [{ type: Injectable }], null, null);
})();
var SplitterClasses;
(function(SplitterClasses) {
	SplitterClasses["root"] = "p-splitter";
	SplitterClasses["panel"] = "p-splitter-panel";
	SplitterClasses["gutter"] = "p-splitter-gutter";
	SplitterClasses["gutterHandle"] = "p-splitter-gutter-handle";
})(SplitterClasses || (SplitterClasses = {}));
var SplitterPanel = (_SplitterPanel = class SplitterPanel extends BaseComponent {
	constructor(..._args2) {
		super(..._args2);
		_defineProperty(this, "componentName", "SplitterPanel");
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		_defineProperty(this, "size", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "size" } : /* istanbul ignore next */ {}), {}, { transform: (value) => value == null ? void 0 : numberAttribute(value) })));
		_defineProperty(this, "minSize", input(0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "minSize" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "maxSize", input(100, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "maxSize" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "collapsible", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "collapsible" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "collapsedSize", input(0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "collapsedSize" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "contentTemplate", viewChild("content", ...ngDevMode ? [{ debugName: "contentTemplate" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_componentStyle", inject(SplitterStyle));
	}
	get hostClass() {
		return this.el.nativeElement.className;
	}
	get hostStyle() {
		return this.el.nativeElement.getAttribute("style");
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.ptm("root"));
	}
}, _defineProperty(_SplitterPanel, "ɵfac", /*@__PURE__*/ (() => {
	let ɵSplitterPanel_BaseFactory = void 0;
	return function SplitterPanel_Factory(__ngFactoryType__) {
		return (ɵSplitterPanel_BaseFactory || (ɵSplitterPanel_BaseFactory = ɵɵgetInheritedFactory(_SplitterPanel)))(__ngFactoryType__ || _SplitterPanel);
	};
})()), _defineProperty(_SplitterPanel, "ɵcmp", (function() {
	const _c0 = ["content"];
	const _c1 = ["*"];
	function SplitterPanel_ng_template_0_Template(rf, ctx) {
		if (rf & 1) ɵɵprojection(0);
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _SplitterPanel,
		selectors: [["p-splitterpanel"], ["p-splitter-panel"]],
		viewQuery: function SplitterPanel_Query(rf, ctx) {
			if (rf & 1) ɵɵviewQuerySignal(ctx.contentTemplate, _c0, 5);
			if (rf & 2) ɵɵqueryAdvance();
		},
		inputs: {
			size: [1, "size"],
			minSize: [1, "minSize"],
			maxSize: [1, "maxSize"],
			collapsible: [1, "collapsible"],
			collapsedSize: [1, "collapsedSize"]
		},
		features: [
			ɵɵProvidersFeature([SplitterStyle, {
				provide: PARENT_INSTANCE,
				useExisting: _SplitterPanel
			}]),
			ɵɵHostDirectivesFeature([Bind]),
			ɵɵInheritDefinitionFeature
		],
		ngContentSelectors: _c1,
		decls: 2,
		vars: 0,
		consts: [["content", ""]],
		template: function SplitterPanel_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵprojectionDef();
				ɵɵdomTemplate(0, SplitterPanel_ng_template_0_Template, 1, 0, "ng-template", null, 0, ɵɵtemplateRefExtractor);
			}
		},
		encapsulation: 2
	});
})()), _SplitterPanel);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SplitterPanel, [{
		type: Component,
		args: [{
			selector: "p-splitterpanel, p-splitter-panel",
			standalone: true,
			template: `
        <ng-template #content>
            <ng-content></ng-content>
        </ng-template>
    `,
			encapsulation: ViewEncapsulation.None,
			changeDetection: ChangeDetectionStrategy.OnPush,
			hostDirectives: [Bind],
			providers: [SplitterStyle, {
				provide: PARENT_INSTANCE,
				useExisting: SplitterPanel
			}]
		}]
	}], null, {
		size: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "size",
				required: false
			}]
		}],
		minSize: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "minSize",
				required: false
			}]
		}],
		maxSize: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "maxSize",
				required: false
			}]
		}],
		collapsible: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "collapsible",
				required: false
			}]
		}],
		collapsedSize: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "collapsedSize",
				required: false
			}]
		}],
		contentTemplate: [{
			type: ViewChild,
			args: ["content", { isSignal: true }]
		}]
	});
})();
var Splitter = (_Splitter = class Splitter extends BaseComponent {
	constructor() {
		super();
		_defineProperty(this, "componentName", "Splitter");
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		_defineProperty(this, "styleClass", input(...ngDevMode ? [void 0, { debugName: "styleClass" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "panelStyleClass", input(...ngDevMode ? [void 0, { debugName: "panelStyleClass" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "panelStyle", input(...ngDevMode ? [void 0, { debugName: "panelStyle" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "stateStorage", input("session", ...ngDevMode ? [{ debugName: "stateStorage" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "stateKey", input(null, ...ngDevMode ? [{ debugName: "stateKey" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "layout", input("horizontal", ...ngDevMode ? [{ debugName: "layout" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "gutterSize", input(1, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "gutterSize" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "step", input(5, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "step" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "minSizes", input([], ...ngDevMode ? [{ debugName: "minSizes" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "panelSizes", input([], ...ngDevMode ? [{ debugName: "panelSizes" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "disabled", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "onResizeEnd", output());
		_defineProperty(this, "onResizeStart", output());
		_defineProperty(this, "onResize", output());
		_defineProperty(this, "onCollapse", output());
		_defineProperty(this, "panelComponents", contentChildren(SplitterPanel, ...ngDevMode ? [{ debugName: "panelComponents" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "panelChildren", contentChildren("panel", ...ngDevMode ? [{ debugName: "panelChildren" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "panels", computed(() => {
			const components = this.panelComponents();
			if (components && components.length) {
				const templates = components.map((panel) => panel.contentTemplate());
				return templates.every((template) => !!template) ? templates : [];
			}
			return [...this.panelChildren()];
		}, ...ngDevMode ? [{ debugName: "panels" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "panelMetas", computed(() => {
			const components = this.panelComponents();
			if (components && components.length) return components.map((panel) => {
				var _panel$minSize, _panel$maxSize, _panel$collapsible, _panel$collapsedSize;
				return {
					minSize: (_panel$minSize = panel.minSize()) !== null && _panel$minSize !== void 0 ? _panel$minSize : 0,
					maxSize: (_panel$maxSize = panel.maxSize()) !== null && _panel$maxSize !== void 0 ? _panel$maxSize : 100,
					collapsible: (_panel$collapsible = panel.collapsible()) !== null && _panel$collapsible !== void 0 ? _panel$collapsible : false,
					collapsedSize: (_panel$collapsedSize = panel.collapsedSize()) !== null && _panel$collapsedSize !== void 0 ? _panel$collapsedSize : 0,
					size: panel.size()
				};
			});
			const count = this.panelChildren().length;
			const minSizes = this.minSizes();
			const panelSizes = this.panelSizes();
			return Array.from({ length: count }, (_, i) => {
				var _minSizes$i;
				return {
					minSize: (_minSizes$i = minSizes[i]) !== null && _minSizes$i !== void 0 ? _minSizes$i : 0,
					maxSize: 100,
					collapsible: false,
					collapsedSize: 0,
					size: panelSizes[i]
				};
			});
		}, ...ngDevMode ? [{ debugName: "panelMetas" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "panelSignature", computed(() => {
			return `${this.panelMetas().map((meta) => {
				var _meta$size;
				return `${(_meta$size = meta.size) !== null && _meta$size !== void 0 ? _meta$size : ""}:${meta.minSize}:${meta.maxSize}:${meta.collapsible}:${meta.collapsedSize}`;
			}).join(",")}#${this.panelSizes().join(",")}`;
		}, ...ngDevMode ? [{ debugName: "panelSignature" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "panelClass", computed(() => {
			const components = this.panelComponents();
			const base = this.cn(this.cx("panel"), this.panelStyleClass());
			return this.panels().map((_, i) => {
				var _components$i;
				return this.cn(base, (_components$i = components[i]) === null || _components$i === void 0 ? void 0 : _components$i.hostClass);
			});
		}, ...ngDevMode ? [{ debugName: "panelClass" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "panelInlineStyle", computed(() => {
			const components = this.panelComponents();
			const fallback = this.panelStyle();
			return this.panels().map((_, i) => {
				var _components$i$hostSty, _components$i2;
				return (_components$i$hostSty = (_components$i2 = components[i]) === null || _components$i2 === void 0 ? void 0 : _components$i2.hostStyle) !== null && _components$i$hostSty !== void 0 ? _components$i$hostSty : fallback;
			});
		}, ...ngDevMode ? [{ debugName: "panelInlineStyle" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dragging", false);
		_defineProperty(this, "isResizing", signal(false, ...ngDevMode ? [{ debugName: "isResizing" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "resizingIndex", signal(null, ...ngDevMode ? [{ debugName: "resizingIndex" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "collapsed", signal([], ...ngDevMode ? [{ debugName: "collapsed" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "panelFlex", signal([], ...ngDevMode ? [{ debugName: "panelFlex" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataResizing", computed(() => this.isResizing() ? "" : null, ...ngDevMode ? [{ debugName: "dataResizing" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "pointerMoveListener", void 0);
		_defineProperty(this, "pointerUpListener", void 0);
		_defineProperty(this, "size", void 0);
		_defineProperty(this, "gutterElement", void 0);
		_defineProperty(this, "startPos", void 0);
		_defineProperty(this, "_panelSizes", []);
		_defineProperty(this, "panelRegistry", []);
		_defineProperty(this, "initialSizes", []);
		_defineProperty(this, "initialCollapsed", []);
		_defineProperty(this, "reportedCollapsed", []);
		_defineProperty(this, "initialTotal", 100);
		_defineProperty(this, "prevPanelIndex", void 0);
		_defineProperty(this, "timer", void 0);
		_defineProperty(this, "prevSize", void 0);
		_defineProperty(this, "_componentStyle", inject(SplitterStyle));
		_defineProperty(this, "rootClass", computed(() => this.cn(this.cx("root"), this.styleClass()), ...ngDevMode ? [{ debugName: "rootClass" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataP", computed(() => this.cn({
			[this.layout()]: this.layout(),
			resizing: this.isResizing(),
			disabled: this.disabled()
		}), ...ngDevMode ? [{ debugName: "dataP" }] : /* istanbul ignore next */ []));
		effect(() => {
			const panels = this.panels();
			this.panelSignature();
			if (!isPlatformBrowser(this.platformId) || panels.length === 0) return;
			if (untracked(() => this.isResizing())) return;
			this.initializePanels();
		});
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
	}
	buildPanelRegistry() {
		var _this$panelRegistry;
		const metas = this.panelMetas();
		const prev = (_this$panelRegistry = this.panelRegistry) !== null && _this$panelRegistry !== void 0 ? _this$panelRegistry : [];
		this.panelRegistry = metas.map((meta, i) => {
			var _meta$minSize, _meta$maxSize, _meta$collapsible, _meta$collapsedSize, _prev$i$collapsed, _prev$i;
			return {
				index: i,
				minSize: (_meta$minSize = meta.minSize) !== null && _meta$minSize !== void 0 ? _meta$minSize : 0,
				maxSize: (_meta$maxSize = meta.maxSize) !== null && _meta$maxSize !== void 0 ? _meta$maxSize : 100,
				collapsible: (_meta$collapsible = meta.collapsible) !== null && _meta$collapsible !== void 0 ? _meta$collapsible : false,
				collapsedSize: (_meta$collapsedSize = meta.collapsedSize) !== null && _meta$collapsedSize !== void 0 ? _meta$collapsedSize : 0,
				size: meta.size,
				collapsed: (_prev$i$collapsed = (_prev$i = prev[i]) === null || _prev$i === void 0 ? void 0 : _prev$i.collapsed) !== null && _prev$i$collapsed !== void 0 ? _prev$i$collapsed : false
			};
		});
	}
	initializePanels() {
		const panels = this.panels();
		if (!panels.length) return;
		this.buildPanelRegistry();
		let initialized = false;
		if (this.isStateful()) initialized = this.restoreState();
		if (!initialized) {
			const _panelSizes = [];
			const inputPanelSizes = this.panelSizes();
			panels.forEach((_, i) => {
				var _ref, _inputPanelSizes$i;
				const meta = this.panelRegistry[i];
				_panelSizes[i] = (_ref = (_inputPanelSizes$i = inputPanelSizes[i]) !== null && _inputPanelSizes$i !== void 0 ? _inputPanelSizes$i : meta === null || meta === void 0 ? void 0 : meta.size) !== null && _ref !== void 0 ? _ref : 100 / panels.length;
			});
			this.panelRegistry.forEach((info, i) => {
				var _info$collapsedSize;
				if (info === null || info === void 0 ? void 0 : info.collapsible) info.collapsed = _panelSizes[i] <= ((_info$collapsedSize = info.collapsedSize) !== null && _info$collapsedSize !== void 0 ? _info$collapsedSize : 0);
			});
			this._panelSizes = _panelSizes;
			this.prevSize = parseFloat(String(_panelSizes[0])).toFixed(4);
		}
		this.syncCollapsedState();
		this.updateFlex();
	}
	updateFlex() {
		this.panelFlex.set(this._panelSizes.map((panelSize) => panelSize + " 1 0px"));
	}
	syncCollapsedState() {
		this.collapsed.set(this.panelRegistry.map((info) => info.collapsed));
	}
	getPanelMinSize(index) {
		var _this$panelRegistry$i, _this$panelRegistry2;
		return (_this$panelRegistry$i = (_this$panelRegistry2 = this.panelRegistry) === null || _this$panelRegistry2 === void 0 || (_this$panelRegistry2 = _this$panelRegistry2[index]) === null || _this$panelRegistry2 === void 0 ? void 0 : _this$panelRegistry2.minSize) !== null && _this$panelRegistry$i !== void 0 ? _this$panelRegistry$i : 0;
	}
	getPanelMaxSize(index) {
		var _this$panelRegistry$i2, _this$panelRegistry3;
		return (_this$panelRegistry$i2 = (_this$panelRegistry3 = this.panelRegistry) === null || _this$panelRegistry3 === void 0 || (_this$panelRegistry3 = _this$panelRegistry3[index]) === null || _this$panelRegistry3 === void 0 ? void 0 : _this$panelRegistry3.maxSize) !== null && _this$panelRegistry$i2 !== void 0 ? _this$panelRegistry$i2 : 100;
	}
	resizeStart(event, index, isKeyDown) {
		const currentTarget = event.currentTarget || event.target;
		if (currentTarget) this.gutterElement = currentTarget;
		const panelElements = this.el.nativeElement.querySelectorAll(":scope > [data-index]");
		let totalPanelPx = 0;
		for (const el of panelElements) {
			const rect = el.getBoundingClientRect();
			totalPanelPx += this.horizontal() ? rect.width : rect.height;
		}
		this.size = totalPanelPx;
		if (!isKeyDown) {
			const pointerEvent = event;
			this.dragging = true;
			this.startPos = this.horizontal() ? pointerEvent.pageX : pointerEvent.pageY;
			this.isResizing.set(true);
			this.resizingIndex.set(index);
		}
		this.initialSizes = [...this._panelSizes];
		this.initialCollapsed = this.panelRegistry.map((info) => info.collapsed);
		this.reportedCollapsed = this.panelRegistry.map((info) => info.collapsed);
		this.initialTotal = this.initialSizes.reduce((a, b) => a + b, 0) || 100;
		this.prevPanelIndex = index;
		if (!isKeyDown) this.onResizeStart.emit({
			originalEvent: event,
			sizes: [...this._panelSizes]
		});
	}
	onResizeMove(event, step, isKeyDown) {
		if (this.size === null || this.prevPanelIndex === null || this.initialSizes.length === 0) return;
		const gutterIdx = this.prevPanelIndex;
		const total = this.initialTotal;
		let delta;
		if (isKeyDown) delta = total * (step !== null && step !== void 0 ? step : 0) / this.size;
		else {
			var _this$startPos, _this$startPos2;
			const pointerEvent = event;
			const pos = this.horizontal() ? pointerEvent.pageX : pointerEvent.pageY;
			if (this.horizontal() && q(this.el.nativeElement)) delta = (((_this$startPos = this.startPos) !== null && _this$startPos !== void 0 ? _this$startPos : 0) - pos) * total / this.size;
			else delta = (pos - ((_this$startPos2 = this.startPos) !== null && _this$startPos2 !== void 0 ? _this$startPos2 : 0)) * total / this.size;
		}
		const newSizes = [...this.initialSizes];
		this.panelRegistry.forEach((info, i) => {
			if (this.initialCollapsed[i] !== void 0) info.collapsed = this.initialCollapsed[i];
		});
		if (delta > 0) this.distribute(newSizes, gutterIdx, delta, isKeyDown, "forward");
		else if (delta < 0) this.distribute(newSizes, gutterIdx + 1, -delta, isKeyDown, "backward");
		this.panelRegistry.forEach((info, i) => {
			if (info.collapsed !== this.reportedCollapsed[i]) {
				this.reportedCollapsed[i] = info.collapsed;
				this.onCollapse.emit({
					index: i,
					collapsed: info.collapsed,
					sizes: [...newSizes]
				});
			}
		});
		this._panelSizes = newSizes;
		this.prevSize = newSizes[gutterIdx].toFixed(4);
		this.updateFlex();
		this.syncCollapsedState();
		this.onResize.emit({
			originalEvent: event,
			sizes: [...newSizes]
		});
	}
	distribute(newSizes, growIdx, requested, isKeyDown, direction) {
		const growInfo = this.panelRegistry[growIdx];
		const max = this.getPanelMaxSize(growIdx);
		let toGrow = Math.min(requested, Math.max(0, max - newSizes[growIdx]));
		if ((growInfo === null || growInfo === void 0 ? void 0 : growInfo.collapsible) && growInfo.collapsed) {
			const gapSize = this.getPanelMinSize(growIdx) - growInfo.collapsedSize;
			toGrow = Math.max(toGrow, gapSize);
			toGrow = Math.min(toGrow, Math.max(0, max - newSizes[growIdx]));
		}
		let shrunk = 0;
		const range = direction === "forward" ? this.range(growIdx + 1, newSizes.length, 1) : this.range(growIdx - 1, -1, -1);
		for (const i of range) {
			var _info$collapsedSize2;
			if (shrunk >= toGrow) break;
			const info = this.panelRegistry[i];
			const min = this.getPanelMinSize(i);
			if (info === null || info === void 0 ? void 0 : info.collapsed) continue;
			const effectiveMin = (info === null || info === void 0 ? void 0 : info.collapsible) ? (_info$collapsedSize2 = info.collapsedSize) !== null && _info$collapsedSize2 !== void 0 ? _info$collapsedSize2 : 0 : min;
			const available = Math.max(0, newSizes[i] - effectiveMin);
			const amount = Math.min(toGrow - shrunk, available);
			const rawSize = newSizes[i] - amount;
			const validated = this.validatePanelSize(rawSize, info, min, isKeyDown);
			const actualShrunk = newSizes[i] - validated.size;
			newSizes[i] = validated.size;
			shrunk += actualShrunk;
			if (info) info.collapsed = validated.collapsed;
		}
		newSizes[growIdx] += shrunk;
		if ((growInfo === null || growInfo === void 0 ? void 0 : growInfo.collapsible) && growInfo.collapsed && newSizes[growIdx] >= this.getPanelMinSize(growIdx)) growInfo.collapsed = false;
	}
	validatePanelSize(rawSize, info, min, isKeyDown) {
		var _info$collapsedSize3;
		if (!(info === null || info === void 0 ? void 0 : info.collapsible)) return {
			size: Math.max(rawSize, min),
			collapsed: false
		};
		const collapsedSize = (_info$collapsedSize3 = info.collapsedSize) !== null && _info$collapsedSize3 !== void 0 ? _info$collapsedSize3 : 0;
		if (rawSize >= min) return {
			size: rawSize,
			collapsed: false
		};
		return {
			size: collapsedSize,
			collapsed: true
		};
	}
	range(start, end, step) {
		const out = [];
		for (let i = start; step > 0 ? i < end : i > end; i += step) out.push(i);
		return out;
	}
	resizeEnd(event) {
		if (this.isStateful()) this.saveState();
		this.onResizeEnd.emit({
			originalEvent: event,
			sizes: [...this._panelSizes]
		});
		this.isResizing.set(false);
		this.resizingIndex.set(null);
		this.updateFlex();
		this.clear();
	}
	onGutterPointerDown(event, index) {
		if (this.disabled()) return;
		this.resizeStart(event, index);
		this.bindPointerListeners();
	}
	repeat(event, index, step) {
		this.resizeStart(event, index, true);
		this.onResizeMove(event, step, true);
	}
	setTimer(event, index, step) {
		if (!this.timer) {
			this.onResizeStart.emit({
				originalEvent: event,
				sizes: [...this._panelSizes]
			});
			this.repeat(event, index, step);
			this.timer = setInterval(() => {
				this.repeat(event, index, step);
			}, 40);
		}
	}
	clearTimer() {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = void 0;
		}
	}
	onGutterKeyUp(event) {
		if (!this.timer) return;
		this.clearTimer();
		this.resizeEnd(event);
	}
	onGutterKeyDown(event, index) {
		if (this.disabled()) return;
		switch (event.code) {
			case "ArrowLeft":
				if (this.layout() === "horizontal") this.setTimer(event, index, this.step() * -1);
				event.preventDefault();
				break;
			case "ArrowRight":
				if (this.layout() === "horizontal") this.setTimer(event, index, this.step());
				event.preventDefault();
				break;
			case "ArrowDown":
				if (this.layout() === "vertical") this.setTimer(event, index, this.step());
				event.preventDefault();
				break;
			case "ArrowUp":
				if (this.layout() === "vertical") this.setTimer(event, index, this.step() * -1);
				event.preventDefault();
		}
	}
	bindPointerListeners() {
		if (!this.pointerMoveListener) this.pointerMoveListener = this.renderer.listen(this.document, "pointermove", (event) => {
			this.onResizeMove(event);
		});
		if (!this.pointerUpListener) this.pointerUpListener = this.renderer.listen(this.document, "pointerup", (event) => {
			this.resizeEnd(event);
			this.unbindPointerListeners();
		});
	}
	unbindPointerListeners() {
		if (this.pointerMoveListener) {
			this.pointerMoveListener();
			this.pointerMoveListener = null;
		}
		if (this.pointerUpListener) {
			this.pointerUpListener();
			this.pointerUpListener = null;
		}
	}
	clear() {
		this.dragging = false;
		this.size = null;
		this.startPos = null;
		this.initialSizes = [];
		this.initialCollapsed = [];
		this.reportedCollapsed = [];
		this.initialTotal = 100;
		this.gutterElement = null;
		this.prevPanelIndex = null;
	}
	isStateful() {
		return this.stateKey() != null;
	}
	getStorage() {
		if (isPlatformBrowser(this.platformId)) switch (this.stateStorage()) {
			case "local":
				var _this$document$defaul;
				return (_this$document$defaul = this.document.defaultView) === null || _this$document$defaul === void 0 ? void 0 : _this$document$defaul.localStorage;
			case "session":
				var _this$document$defaul2;
				return (_this$document$defaul2 = this.document.defaultView) === null || _this$document$defaul2 === void 0 ? void 0 : _this$document$defaul2.sessionStorage;
			default: throw new Error(this.stateStorage() + " is not a valid value for the state storage, supported values are \"local\" and \"session\".");
		}
		else throw new Error("Storage is not a available by default on the server.");
	}
	saveState() {
		var _this$getStorage;
		(_this$getStorage = this.getStorage()) === null || _this$getStorage === void 0 || _this$getStorage.setItem(this.stateKey(), JSON.stringify(this._panelSizes));
	}
	restoreState() {
		var _this$getStorage2;
		const stateString = (_this$getStorage2 = this.getStorage()) === null || _this$getStorage2 === void 0 ? void 0 : _this$getStorage2.getItem(this.stateKey());
		if (stateString) {
			this._panelSizes = JSON.parse(stateString);
			this.panelRegistry.forEach((info, i) => {
				var _info$collapsedSize4;
				if (info === null || info === void 0 ? void 0 : info.collapsible) info.collapsed = this._panelSizes[i] <= ((_info$collapsedSize4 = info.collapsedSize) !== null && _info$collapsedSize4 !== void 0 ? _info$collapsedSize4 : 0);
			});
			this.prevSize = parseFloat(String(this._panelSizes[0])).toFixed(4);
			return true;
		}
		return false;
	}
	resetState() {
		this.initializePanels();
	}
	gutterInlineStyle() {
		return _objectSpread2({
			"touch-action": "none",
			"user-select": "none"
		}, this.horizontal() ? { width: this.gutterSize() + "px" } : { height: this.gutterSize() + "px" });
	}
	horizontal() {
		return this.layout() === "horizontal";
	}
	round(value) {
		return Math.round(value !== null && value !== void 0 ? value : 0);
	}
	onDestroy() {
		this.unbindPointerListeners();
		this.clearTimer();
	}
}, _defineProperty(_Splitter, "ɵfac", function Splitter_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _Splitter)();
}), _defineProperty(_Splitter, "ɵcmp", (function() {
	const _c0 = ["panel"];
	function Splitter_For_1_ng_container_1_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Splitter_For_1_Conditional_2_Template(rf, ctx) {
		if (rf & 1) {
			const _r1 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "div", 3);
			ɵɵlistener("pointerdown", function Splitter_For_1_Conditional_2_Template_div_pointerdown_0_listener($event) {
				ɵɵrestoreView(_r1);
				const ɵ$index_1_r2 = ɵɵnextContext().$index;
				const ctx_r2 = ɵɵnextContext();
				return ɵɵresetView(ctx_r2.onGutterPointerDown($event, ɵ$index_1_r2));
			})("keyup", function Splitter_For_1_Conditional_2_Template_div_keyup_0_listener($event) {
				ɵɵrestoreView(_r1);
				const ctx_r2 = ɵɵnextContext(2);
				return ɵɵresetView(ctx_r2.onGutterKeyUp($event));
			})("keydown", function Splitter_For_1_Conditional_2_Template_div_keydown_0_listener($event) {
				ɵɵrestoreView(_r1);
				const ɵ$index_1_r2 = ɵɵnextContext().$index;
				const ctx_r2 = ɵɵnextContext();
				return ɵɵresetView(ctx_r2.onGutterKeyDown($event, ɵ$index_1_r2));
			});
			ɵɵelement(1, "div", 4);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			var _ctx_r2$panelMetas$ɵ, _ctx_r2$panelMetas$mi, _ctx_r2$panelMetas;
			const ɵ$index_1_r2 = ɵɵnextContext().$index;
			const ctx_r2 = ɵɵnextContext();
			ɵɵstyleMap(ctx_r2.gutterInlineStyle());
			ɵɵclassMap(ctx_r2.cx("gutter"));
			ɵɵproperty("pBind", ctx_r2.ptm("gutter"));
			ɵɵattribute("tabindex", ctx_r2.disabled() ? -1 : 0)("aria-orientation", ctx_r2.layout())("aria-valuenow", ctx_r2.prevSize)("aria-valuemin", ctx_r2.round((_ctx_r2$panelMetas$ɵ = ctx_r2.panelMetas()[ɵ$index_1_r2]) === null || _ctx_r2$panelMetas$ɵ === void 0 ? void 0 : _ctx_r2$panelMetas$ɵ.minSize))("aria-valuemax", ctx_r2.round(100 - ((_ctx_r2$panelMetas$mi = (_ctx_r2$panelMetas = ctx_r2.panelMetas()[ɵ$index_1_r2 + 1]) === null || _ctx_r2$panelMetas === void 0 ? void 0 : _ctx_r2$panelMetas.minSize) !== null && _ctx_r2$panelMetas$mi !== void 0 ? _ctx_r2$panelMetas$mi : 0)))("aria-disabled", ctx_r2.disabled() || null)("data-orientation", ctx_r2.layout())("data-resizing", ctx_r2.isResizing() && ctx_r2.resizingIndex() === ɵ$index_1_r2 ? "" : null)("data-disabled", ctx_r2.disabled() ? "" : null);
			ɵɵadvance();
			ɵɵclassMap(ctx_r2.cx("gutterHandle"));
			ɵɵproperty("pBind", ctx_r2.ptm("gutterHandle"));
			ɵɵattribute("data-orientation", ctx_r2.layout())("data-resizing", ctx_r2.isResizing() && ctx_r2.resizingIndex() === ɵ$index_1_r2 ? "" : null);
		}
	}
	function Splitter_For_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "div", 0);
			ɵɵtemplate(1, Splitter_For_1_ng_container_1_Template, 1, 0, "ng-container", 1);
			ɵɵelementEnd();
			ɵɵconditionalCreate(2, Splitter_For_1_Conditional_2_Template, 2, 19, "div", 2);
		}
		if (rf & 2) {
			const panel_r4 = ctx.$implicit;
			const ɵ$index_1_r2 = ctx.$index;
			const ctx_r2 = ɵɵnextContext();
			ɵɵstyleMap(ctx_r2.panelInlineStyle()[ɵ$index_1_r2]);
			ɵɵclassMap(ctx_r2.panelClass()[ɵ$index_1_r2]);
			ɵɵstyleProp("flex", ctx_r2.panelFlex()[ɵ$index_1_r2])("overflow", "hidden")("min-width", ctx_r2.layout() === "horizontal" ? "0" : null)("min-height", ctx_r2.layout() === "vertical" ? "0" : null);
			ɵɵproperty("pBind", ctx_r2.ptm("panel"));
			ɵɵattribute("data-index", ɵ$index_1_r2)("data-collapsed", ctx_r2.collapsed()[ɵ$index_1_r2] ? "" : null)("data-resizing", ctx_r2.isResizing() && ctx_r2.resizingIndex() === ɵ$index_1_r2 ? "" : null);
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", panel_r4);
			ɵɵadvance();
			ɵɵconditional(ɵ$index_1_r2 !== ctx_r2.panels().length - 1 ? 2 : -1);
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _Splitter,
		selectors: [["p-splitter"]],
		contentQueries: function Splitter_ContentQueries(rf, ctx, dirIndex) {
			if (rf & 1) ɵɵcontentQuerySignal(dirIndex, ctx.panelComponents, SplitterPanel, 4)(dirIndex, ctx.panelChildren, _c0, 4);
			if (rf & 2) ɵɵqueryAdvance(2);
		},
		hostVars: 6,
		hostBindings: function Splitter_HostBindings(rf, ctx) {
			if (rf & 2) {
				ɵɵattribute("data-orientation", ctx.layout())("data-resizing", ctx.dataResizing())("data-disabled", ctx.disabled() ? "" : null)("data-p", ctx.dataP());
				ɵɵclassMap(ctx.rootClass());
			}
		},
		inputs: {
			styleClass: [1, "styleClass"],
			panelStyleClass: [1, "panelStyleClass"],
			panelStyle: [1, "panelStyle"],
			stateStorage: [1, "stateStorage"],
			stateKey: [1, "stateKey"],
			layout: [1, "layout"],
			gutterSize: [1, "gutterSize"],
			step: [1, "step"],
			minSizes: [1, "minSizes"],
			panelSizes: [1, "panelSizes"],
			disabled: [1, "disabled"]
		},
		outputs: {
			onResizeEnd: "onResizeEnd",
			onResizeStart: "onResizeStart",
			onResize: "onResize",
			onCollapse: "onCollapse"
		},
		features: [
			ɵɵProvidersFeature([SplitterStyle, {
				provide: PARENT_INSTANCE,
				useExisting: _Splitter
			}]),
			ɵɵHostDirectivesFeature([Bind]),
			ɵɵInheritDefinitionFeature
		],
		decls: 2,
		vars: 0,
		consts: [
			[
				"tabindex",
				"-1",
				3,
				"pBind"
			],
			[4, "ngTemplateOutlet"],
			[
				"role",
				"separator",
				3,
				"pBind",
				"class",
				"style"
			],
			[
				"role",
				"separator",
				3,
				"pointerdown",
				"keyup",
				"keydown",
				"pBind"
			],
			[3, "pBind"]
		],
		template: function Splitter_Template(rf, ctx) {
			if (rf & 1) ɵɵrepeaterCreate(0, Splitter_For_1_Template, 3, 18, null, null, ɵɵrepeaterTrackByIndex);
			if (rf & 2) ɵɵrepeater(ctx.panels());
		},
		dependencies: [
			NgTemplateOutlet,
			SharedModule,
			BindModule,
			Bind
		],
		encapsulation: 2
	});
})()), _Splitter);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Splitter, [{
		type: Component,
		args: [{
			selector: "p-splitter",
			standalone: true,
			imports: [
				NgTemplateOutlet,
				SharedModule,
				BindModule
			],
			template: `
        @for (panel of panels(); track $index; let i = $index) {
            <div
                [pBind]="ptm('panel')"
                [class]="panelClass()[i]"
                [style]="panelInlineStyle()[i]"
                [style.flex]="panelFlex()[i]"
                [style.overflow]="'hidden'"
                [style.min-width]="layout() === 'horizontal' ? '0' : null"
                [style.min-height]="layout() === 'vertical' ? '0' : null"
                tabindex="-1"
                [attr.data-index]="i"
                [attr.data-collapsed]="collapsed()[i] ? '' : null"
                [attr.data-resizing]="isResizing() && resizingIndex() === i ? '' : null"
            >
                <ng-container *ngTemplateOutlet="panel"></ng-container>
            </div>
            @if (i !== panels().length - 1) {
                <div
                    [pBind]="ptm('gutter')"
                    [class]="cx('gutter')"
                    role="separator"
                    [attr.tabindex]="disabled() ? -1 : 0"
                    [attr.aria-orientation]="layout()"
                    [attr.aria-valuenow]="prevSize"
                    [attr.aria-valuemin]="round(panelMetas()[i]?.minSize)"
                    [attr.aria-valuemax]="round(100 - (panelMetas()[i + 1]?.minSize ?? 0))"
                    [attr.aria-disabled]="disabled() || null"
                    [attr.data-orientation]="layout()"
                    [attr.data-resizing]="isResizing() && resizingIndex() === i ? '' : null"
                    [attr.data-disabled]="disabled() ? '' : null"
                    [style]="gutterInlineStyle()"
                    (pointerdown)="onGutterPointerDown($event, i)"
                    (keyup)="onGutterKeyUp($event)"
                    (keydown)="onGutterKeyDown($event, i)"
                >
                    <div [pBind]="ptm('gutterHandle')" [class]="cx('gutterHandle')" [attr.data-orientation]="layout()" [attr.data-resizing]="isResizing() && resizingIndex() === i ? '' : null"></div>
                </div>
            }
        }
    `,
			encapsulation: ViewEncapsulation.None,
			changeDetection: ChangeDetectionStrategy.OnPush,
			host: {
				"[class]": "rootClass()",
				"[attr.data-orientation]": "layout()",
				"[attr.data-resizing]": "dataResizing()",
				"[attr.data-disabled]": "disabled() ? '' : null",
				"[attr.data-p]": "dataP()"
			},
			providers: [SplitterStyle, {
				provide: PARENT_INSTANCE,
				useExisting: Splitter
			}],
			hostDirectives: [Bind]
		}]
	}], () => [], {
		styleClass: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "styleClass",
				required: false
			}]
		}],
		panelStyleClass: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "panelStyleClass",
				required: false
			}]
		}],
		panelStyle: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "panelStyle",
				required: false
			}]
		}],
		stateStorage: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "stateStorage",
				required: false
			}]
		}],
		stateKey: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "stateKey",
				required: false
			}]
		}],
		layout: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "layout",
				required: false
			}]
		}],
		gutterSize: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "gutterSize",
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
		minSizes: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "minSizes",
				required: false
			}]
		}],
		panelSizes: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "panelSizes",
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
		onResizeEnd: [{
			type: Output,
			args: ["onResizeEnd"]
		}],
		onResizeStart: [{
			type: Output,
			args: ["onResizeStart"]
		}],
		onResize: [{
			type: Output,
			args: ["onResize"]
		}],
		onCollapse: [{
			type: Output,
			args: ["onCollapse"]
		}],
		panelComponents: [{
			type: ContentChildren,
			args: [forwardRef(() => SplitterPanel), { isSignal: true }]
		}],
		panelChildren: [{
			type: ContentChildren,
			args: ["panel", { isSignal: true }]
		}]
	});
})();
var SplitterModule = (_SplitterModule = class SplitterModule {}, _defineProperty(_SplitterModule, "ɵfac", function SplitterModule_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _SplitterModule)();
}), _defineProperty(_SplitterModule, "ɵmod", /*@__PURE__*/ ɵɵdefineNgModule({
	type: _SplitterModule,
	imports: [
		Splitter,
		SplitterPanel,
		SharedModule,
		BindModule
	],
	exports: [
		Splitter,
		SplitterPanel,
		SharedModule,
		BindModule
	]
})), _defineProperty(_SplitterModule, "ɵinj", /*@__PURE__*/ ɵɵdefineInjector({ imports: [
	Splitter,
	SharedModule,
	BindModule,
	SharedModule,
	BindModule
] })), _SplitterModule);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SplitterModule, [{
		type: NgModule,
		args: [{
			imports: [
				Splitter,
				SplitterPanel,
				SharedModule,
				BindModule
			],
			exports: [
				Splitter,
				SplitterPanel,
				SharedModule,
				BindModule
			]
		}]
	}], null, null);
})();
export { Splitter, SplitterClasses, SplitterModule, SplitterPanel, SplitterStyle };
