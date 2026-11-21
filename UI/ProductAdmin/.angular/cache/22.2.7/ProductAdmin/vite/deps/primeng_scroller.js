import { Y as NgTemplateOutlet, u as isPlatformBrowser } from "./common-BHJivUlT.js";
import { $n as Output, A as contentChild, Al as ɵɵdefineInjectable, Bt as computed, Co as ɵɵelementStart, Da as ɵɵconditionalCreate, Dr as ViewEncapsulation, Ds as ɵɵrepeaterTrackByIndex, Fn as Injectable, Gs as ɵɵtemplate, Hs as ɵɵstyleProp, In as Input, Rl as ɵɵnamespaceSVG, S as ViewChild, Sa as ɵɵclassMap, So as ɵɵelementEnd, Ta as ɵɵconditional, Tl as signal, Ts as ɵɵrepeaterCreate, Vs as ɵɵstyleMap, Wi as setClassMetadata, X as input, an as ChangeDetectionStrategy, ao as ɵɵdefineNgModule, at as output, bs as ɵɵqueryAdvance, ca as ɵɵInheritDefinitionFeature, cn as Component, cs as ɵɵprojectionDef, da as ɵɵadvance, dc as ɵɵviewQuerySignal, dl as inject, es as ɵɵnextContext, gt as viewChild, i as ContentChild, il as effect, jl as ɵɵdefineInjector, jo as ɵɵgetInheritedFactory, ka as ɵɵcontentQuerySignal, kc as InjectionToken, ls as ɵɵproperty, qn as NgModule, qt as untracked, ro as ɵɵdefineComponent, sa as ɵɵHostDirectivesFeature, ss as ɵɵprojection, ua as ɵɵProvidersFeature, vo as ɵɵelement, ws as ɵɵrepeater, ya as ɵɵattribute, yo as ɵɵelementContainer } from "./core-BRnM5AcM.js";
import { t as Spinner } from "./primeicons-angular-spinner-Cr-2BDSP.js";
import { Ct as nt, Dt as pt, K as Dt, ft as Zt, ht as fe } from "./dist-BnkFXv39.js";
import "./dist-D971aPsi.js";
import { n as PARENT_INSTANCE, t as BaseComponent } from "./primeng-basecomponent-eFp8WNlF.js";
import { Bind } from "./primeng_bind.js";
import { s as BaseStyle } from "./primeng-config-E0JoXWcg.js";
import { n as _objectSpread2, r as _defineProperty } from "./asyncToGenerator-CE9zIWF7.js";
// ../node_modules/primeng/fesm2022/primeng-scroller.mjs
var _ScrollerStyle;
var _Scroller;
var _ScrollerModule;
var css = `
.p-virtualscroller {
    position: relative;
    overflow: auto;
    contain: strict;
    transform: translateZ(0);
    will-change: scroll-position;
    outline: 0 none;
}

.p-virtualscroller-content {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    min-width: 100%;
    will-change: transform;
}

.p-virtualscroller-spacer {
    position: absolute;
    top: 0;
    left: 0;
    height: 1px;
    width: 1px;
    transform-origin: 0 0;
    pointer-events: none;
}

.p-virtualscroller-loader {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: dt('virtualscroller.loader.mask.background');
    color: dt('virtualscroller.loader.mask.color');
}

.p-virtualscroller-loader-mask {
    display: flex;
    align-items: center;
    justify-content: center;
}

.p-virtualscroller-loading-icon {
    font-size: dt('virtualscroller.loader.icon.size');
    width: dt('virtualscroller.loader.icon.size');
    height: dt('virtualscroller.loader.icon.size');
}

.p-virtualscroller-horizontal > .p-virtualscroller-content {
    display: flex;
}

.p-virtualscroller-inline .p-virtualscroller-content {
    position: static;
}
`;
var classes = {
	root: ({ instance }) => ["p-virtualscroller", {
		"p-virtualscroller-inline": instance.inline(),
		"p-virtualscroller-both p-both-scroll": instance.both(),
		"p-virtualscroller-horizontal p-horizontal-scroll": instance.horizontal()
	}],
	content: "p-virtualscroller-content",
	spacer: "p-virtualscroller-spacer",
	loader: ({ instance }) => ["p-virtualscroller-loader", { "p-virtualscroller-loader-mask": !instance.loaderTemplate() }],
	loadingIcon: "p-virtualscroller-loading-icon"
};
var ScrollerStyle = (_ScrollerStyle = class ScrollerStyle extends BaseStyle {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "name", "virtualscroller");
		_defineProperty(this, "css", css);
		_defineProperty(this, "classes", classes);
	}
}, _defineProperty(_ScrollerStyle, "ɵfac", /*@__PURE__*/ (() => {
	let ɵScrollerStyle_BaseFactory = void 0;
	return function ScrollerStyle_Factory(__ngFactoryType__) {
		return (ɵScrollerStyle_BaseFactory || (ɵScrollerStyle_BaseFactory = ɵɵgetInheritedFactory(_ScrollerStyle)))(__ngFactoryType__ || _ScrollerStyle);
	};
})()), _defineProperty(_ScrollerStyle, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _ScrollerStyle,
	factory: _ScrollerStyle.ɵfac
})), _ScrollerStyle);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollerStyle, [{ type: Injectable }], null, null);
})();
var ScrollerClasses;
(function(ScrollerClasses) {
	ScrollerClasses["root"] = "p-virtualscroller";
	ScrollerClasses["content"] = "p-virtualscroller-content";
	ScrollerClasses["spacer"] = "p-virtualscroller-spacer";
	ScrollerClasses["loader"] = "p-virtualscroller-loader";
	ScrollerClasses["loadingIcon"] = "p-virtualscroller-loading-icon";
})(ScrollerClasses || (ScrollerClasses = {}));
var SCROLLER_INSTANCE = new InjectionToken("SCROLLER_INSTANCE");
var Scroller = (_Scroller = class Scroller extends BaseComponent {
	get loadedItems() {
		const items = this._items();
		if (items && !this.d_loading) {
			if (this.both()) return items.slice(this._appendOnly() ? 0 : this.first.rows, this.last.rows).map((item) => {
				if (this._columns()) return item;
				else if (Array.isArray(item)) return item.slice(this._appendOnly() ? 0 : this.first.cols, this.last.cols);
				else return item;
			});
			else if (this.horizontal() && this._columns()) return items;
			else return items.slice(this._appendOnly() ? 0 : this.first, this.last);
		}
		return [];
	}
	get loadedRows() {
		return this.d_loading ? this._loaderDisabled() ? this.loaderArr : [] : this.loadedItems;
	}
	get loadedColumns() {
		const columns = this._columns();
		if (columns && (this.both() || this.horizontal())) return this.d_loading && this._loaderDisabled() ? this.both() ? this.loaderArr[0] : this.loaderArr : columns.slice(this.both() ? this.first.cols : this.first, this.both() ? this.last.cols : this.last);
		return columns;
	}
	constructor() {
		var _inject;
		super();
		_defineProperty(this, "componentName", "VirtualScroller");
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		_defineProperty(this, "$pcScroller", (_inject = inject(SCROLLER_INSTANCE, {
			optional: true,
			skipSelf: true
		})) !== null && _inject !== void 0 ? _inject : void 0);
		_defineProperty(this, "hostName", input("", ...ngDevMode ? [{ debugName: "hostName" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "id", input(...ngDevMode ? [void 0, { debugName: "id" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "style", input(...ngDevMode ? [void 0, { debugName: "style" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "styleClass", input(...ngDevMode ? [void 0, { debugName: "styleClass" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "tabindex", input(0, ...ngDevMode ? [{ debugName: "tabindex" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "items", input(...ngDevMode ? [void 0, { debugName: "items" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "itemSize", input(0, ...ngDevMode ? [{ debugName: "itemSize" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "scrollHeight", input(...ngDevMode ? [void 0, { debugName: "scrollHeight" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "scrollWidth", input(...ngDevMode ? [void 0, { debugName: "scrollWidth" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "orientation", input("vertical", ...ngDevMode ? [{ debugName: "orientation" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "step", input(0, ...ngDevMode ? [{ debugName: "step" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "delay", input(0, ...ngDevMode ? [{ debugName: "delay" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "resizeDelay", input(10, ...ngDevMode ? [{ debugName: "resizeDelay" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "appendOnly", input(false, ...ngDevMode ? [{ debugName: "appendOnly" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "inline", input(false, ...ngDevMode ? [{ debugName: "inline" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "lazy", input(false, ...ngDevMode ? [{ debugName: "lazy" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "disabled", input(false, ...ngDevMode ? [{ debugName: "disabled" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "loaderDisabled", input(false, ...ngDevMode ? [{ debugName: "loaderDisabled" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "columns", input(...ngDevMode ? [void 0, { debugName: "columns" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "showSpacer", input(true, ...ngDevMode ? [{ debugName: "showSpacer" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "showLoader", input(false, ...ngDevMode ? [{ debugName: "showLoader" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "numToleratedItems", input(...ngDevMode ? [void 0, { debugName: "numToleratedItems" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "loading", input(...ngDevMode ? [void 0, { debugName: "loading" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "autoSize", input(false, ...ngDevMode ? [{ debugName: "autoSize" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "trackBy", input(...ngDevMode ? [void 0, { debugName: "trackBy" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "options", input(...ngDevMode ? [void 0, { debugName: "options" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_id", computed(() => {
			var _this$options$id, _this$options;
			return (_this$options$id = (_this$options = this.options()) === null || _this$options === void 0 ? void 0 : _this$options.id) !== null && _this$options$id !== void 0 ? _this$options$id : this.id();
		}, ...ngDevMode ? [{ debugName: "_id" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_style", computed(() => {
			var _this$options$style, _this$options2;
			return (_this$options$style = (_this$options2 = this.options()) === null || _this$options2 === void 0 ? void 0 : _this$options2.style) !== null && _this$options$style !== void 0 ? _this$options$style : this.style();
		}, ...ngDevMode ? [{ debugName: "_style" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_styleClass", computed(() => {
			var _this$options$styleCl, _this$options3;
			return (_this$options$styleCl = (_this$options3 = this.options()) === null || _this$options3 === void 0 ? void 0 : _this$options3.styleClass) !== null && _this$options$styleCl !== void 0 ? _this$options$styleCl : this.styleClass();
		}, ...ngDevMode ? [{ debugName: "_styleClass" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_tabindex", computed(() => {
			var _this$options$tabinde, _this$options4;
			return (_this$options$tabinde = (_this$options4 = this.options()) === null || _this$options4 === void 0 ? void 0 : _this$options4.tabindex) !== null && _this$options$tabinde !== void 0 ? _this$options$tabinde : this.tabindex();
		}, ...ngDevMode ? [{ debugName: "_tabindex" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_items", computed(() => {
			var _this$options$items, _this$options5;
			return (_this$options$items = (_this$options5 = this.options()) === null || _this$options5 === void 0 ? void 0 : _this$options5.items) !== null && _this$options$items !== void 0 ? _this$options$items : this.items();
		}, ...ngDevMode ? [{ debugName: "_items" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_itemSize", computed(() => {
			var _this$options$itemSiz, _this$options6;
			return (_this$options$itemSiz = (_this$options6 = this.options()) === null || _this$options6 === void 0 ? void 0 : _this$options6.itemSize) !== null && _this$options$itemSiz !== void 0 ? _this$options$itemSiz : this.itemSize();
		}, ...ngDevMode ? [{ debugName: "_itemSize" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_scrollHeight", computed(() => {
			var _this$options$scrollH, _this$options7;
			return (_this$options$scrollH = (_this$options7 = this.options()) === null || _this$options7 === void 0 ? void 0 : _this$options7.scrollHeight) !== null && _this$options$scrollH !== void 0 ? _this$options$scrollH : this.scrollHeight();
		}, ...ngDevMode ? [{ debugName: "_scrollHeight" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_scrollWidth", computed(() => {
			var _this$options$scrollW, _this$options8;
			return (_this$options$scrollW = (_this$options8 = this.options()) === null || _this$options8 === void 0 ? void 0 : _this$options8.scrollWidth) !== null && _this$options$scrollW !== void 0 ? _this$options$scrollW : this.scrollWidth();
		}, ...ngDevMode ? [{ debugName: "_scrollWidth" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_orientation", computed(() => {
			var _this$options$orienta, _this$options9;
			return (_this$options$orienta = (_this$options9 = this.options()) === null || _this$options9 === void 0 ? void 0 : _this$options9.orientation) !== null && _this$options$orienta !== void 0 ? _this$options$orienta : this.orientation();
		}, ...ngDevMode ? [{ debugName: "_orientation" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_step", computed(() => {
			var _this$options$step, _this$options10;
			return (_this$options$step = (_this$options10 = this.options()) === null || _this$options10 === void 0 ? void 0 : _this$options10.step) !== null && _this$options$step !== void 0 ? _this$options$step : this.step();
		}, ...ngDevMode ? [{ debugName: "_step" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_delay", computed(() => {
			var _this$options$delay, _this$options11;
			return (_this$options$delay = (_this$options11 = this.options()) === null || _this$options11 === void 0 ? void 0 : _this$options11.delay) !== null && _this$options$delay !== void 0 ? _this$options$delay : this.delay();
		}, ...ngDevMode ? [{ debugName: "_delay" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_resizeDelay", computed(() => {
			var _this$options$resizeD, _this$options12;
			return (_this$options$resizeD = (_this$options12 = this.options()) === null || _this$options12 === void 0 ? void 0 : _this$options12.resizeDelay) !== null && _this$options$resizeD !== void 0 ? _this$options$resizeD : this.resizeDelay();
		}, ...ngDevMode ? [{ debugName: "_resizeDelay" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_appendOnly", computed(() => {
			var _this$options$appendO, _this$options13;
			return (_this$options$appendO = (_this$options13 = this.options()) === null || _this$options13 === void 0 ? void 0 : _this$options13.appendOnly) !== null && _this$options$appendO !== void 0 ? _this$options$appendO : this.appendOnly();
		}, ...ngDevMode ? [{ debugName: "_appendOnly" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_inline", computed(() => {
			var _this$options$inline, _this$options14;
			return (_this$options$inline = (_this$options14 = this.options()) === null || _this$options14 === void 0 ? void 0 : _this$options14.inline) !== null && _this$options$inline !== void 0 ? _this$options$inline : this.inline();
		}, ...ngDevMode ? [{ debugName: "_inline" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_lazy", computed(() => {
			var _this$options$lazy, _this$options15;
			return (_this$options$lazy = (_this$options15 = this.options()) === null || _this$options15 === void 0 ? void 0 : _this$options15.lazy) !== null && _this$options$lazy !== void 0 ? _this$options$lazy : this.lazy();
		}, ...ngDevMode ? [{ debugName: "_lazy" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_disabled", computed(() => {
			var _this$options$disable, _this$options16;
			return (_this$options$disable = (_this$options16 = this.options()) === null || _this$options16 === void 0 ? void 0 : _this$options16.disabled) !== null && _this$options$disable !== void 0 ? _this$options$disable : this.disabled();
		}, ...ngDevMode ? [{ debugName: "_disabled" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_loaderDisabled", computed(() => {
			var _this$options$loaderD, _this$options17;
			return (_this$options$loaderD = (_this$options17 = this.options()) === null || _this$options17 === void 0 ? void 0 : _this$options17.loaderDisabled) !== null && _this$options$loaderD !== void 0 ? _this$options$loaderD : this.loaderDisabled();
		}, ...ngDevMode ? [{ debugName: "_loaderDisabled" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_columns", computed(() => {
			var _this$options$columns, _this$options18;
			return (_this$options$columns = (_this$options18 = this.options()) === null || _this$options18 === void 0 ? void 0 : _this$options18.columns) !== null && _this$options$columns !== void 0 ? _this$options$columns : this.columns();
		}, ...ngDevMode ? [{ debugName: "_columns" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_showSpacer", computed(() => {
			var _this$options$showSpa, _this$options19;
			return (_this$options$showSpa = (_this$options19 = this.options()) === null || _this$options19 === void 0 ? void 0 : _this$options19.showSpacer) !== null && _this$options$showSpa !== void 0 ? _this$options$showSpa : this.showSpacer();
		}, ...ngDevMode ? [{ debugName: "_showSpacer" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_showLoader", computed(() => {
			var _this$options$showLoa, _this$options20;
			return (_this$options$showLoa = (_this$options20 = this.options()) === null || _this$options20 === void 0 ? void 0 : _this$options20.showLoader) !== null && _this$options$showLoa !== void 0 ? _this$options$showLoa : this.showLoader();
		}, ...ngDevMode ? [{ debugName: "_showLoader" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_numToleratedItems", computed(() => {
			var _this$options$numTole, _this$options21;
			return (_this$options$numTole = (_this$options21 = this.options()) === null || _this$options21 === void 0 ? void 0 : _this$options21.numToleratedItems) !== null && _this$options$numTole !== void 0 ? _this$options$numTole : this.numToleratedItems();
		}, ...ngDevMode ? [{ debugName: "_numToleratedItems" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_loading", computed(() => {
			var _this$options$loading, _this$options22;
			return (_this$options$loading = (_this$options22 = this.options()) === null || _this$options22 === void 0 ? void 0 : _this$options22.loading) !== null && _this$options$loading !== void 0 ? _this$options$loading : this.loading();
		}, ...ngDevMode ? [{ debugName: "_loading" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_autoSize", computed(() => {
			var _this$options$autoSiz, _this$options23;
			return (_this$options$autoSiz = (_this$options23 = this.options()) === null || _this$options23 === void 0 ? void 0 : _this$options23.autoSize) !== null && _this$options$autoSiz !== void 0 ? _this$options$autoSiz : this.autoSize();
		}, ...ngDevMode ? [{ debugName: "_autoSize" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_trackBy", computed(() => {
			var _this$options$trackBy, _this$options24;
			return (_this$options$trackBy = (_this$options24 = this.options()) === null || _this$options24 === void 0 ? void 0 : _this$options24.trackBy) !== null && _this$options$trackBy !== void 0 ? _this$options$trackBy : this.trackBy();
		}, ...ngDevMode ? [{ debugName: "_trackBy" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "contentStyleClass", computed(() => {
			var _this$options25;
			return (_this$options25 = this.options()) === null || _this$options25 === void 0 ? void 0 : _this$options25.contentStyleClass;
		}, ...ngDevMode ? [{ debugName: "contentStyleClass" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "onLazyLoad", output());
		_defineProperty(this, "onScroll", output());
		_defineProperty(this, "onScrollIndexChange", output());
		_defineProperty(this, "elementViewChild", viewChild("element", ...ngDevMode ? [{ debugName: "elementViewChild" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "contentViewChild", viewChild("content", ...ngDevMode ? [{ debugName: "contentViewChild" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "hostHeight", signal(void 0, ...ngDevMode ? [{ debugName: "hostHeight" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "contentTemplate", contentChild("content", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "contentTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "itemTemplate", contentChild("item", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "itemTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "loaderTemplate", contentChild("loader", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "loaderTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "loaderIconTemplate", contentChild("loadericon", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "loaderIconTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "d_loading", false);
		_defineProperty(this, "d_numToleratedItems", void 0);
		_defineProperty(this, "contentEl", void 0);
		_defineProperty(this, "vertical", computed(() => this._orientation() === "vertical", ...ngDevMode ? [{ debugName: "vertical" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "horizontal", computed(() => this._orientation() === "horizontal", ...ngDevMode ? [{ debugName: "horizontal" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "both", computed(() => this._orientation() === "both", ...ngDevMode ? [{ debugName: "both" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "first", 0);
		_defineProperty(this, "last", 0);
		_defineProperty(this, "page", 0);
		_defineProperty(this, "isRangeChanged", false);
		_defineProperty(this, "numItemsInViewport", 0);
		_defineProperty(this, "lastScrollPos", 0);
		_defineProperty(this, "lazyLoadState", {});
		_defineProperty(this, "lastItemsLength", void 0);
		_defineProperty(this, "loaderArr", []);
		_defineProperty(this, "spacerStyle", void 0);
		_defineProperty(this, "contentStyle", void 0);
		_defineProperty(this, "scrollTimeout", void 0);
		_defineProperty(this, "resizeTimeout", void 0);
		_defineProperty(this, "_destroyed", false);
		_defineProperty(this, "initialized", false);
		_defineProperty(this, "windowResizeListener", void 0);
		_defineProperty(this, "defaultWidth", void 0);
		_defineProperty(this, "defaultHeight", void 0);
		_defineProperty(this, "defaultContentWidth", void 0);
		_defineProperty(this, "defaultContentHeight", void 0);
		_defineProperty(this, "_componentStyle", inject(ScrollerStyle));
		_defineProperty(this, "_loaderIconContext", computed(() => ({ options: { styleClass: this.pcn("p-virtualscroller-loading-icon") } }), ...ngDevMode ? [{ debugName: "_loaderIconContext" }] : /* istanbul ignore next */ []));
		effect(() => {
			if (this._scrollHeight() === "100%") this.hostHeight.set("100%");
		});
		effect(() => {
			const loading = this._loading();
			untracked(() => {
				if (this._lazy() && loading !== void 0 && loading !== this.d_loading) this.d_loading = loading;
			});
		});
		effect(() => {
			this._orientation();
			untracked(() => {
				this.lastScrollPos = this.both() ? {
					top: 0,
					left: 0
				} : 0;
			});
		});
		effect(() => {
			const numT = this._numToleratedItems();
			untracked(() => {
				if (numT !== void 0 && numT !== this.d_numToleratedItems) this.d_numToleratedItems = numT;
			});
		});
		effect(() => {
			this._itemSize();
			this._scrollHeight();
			this._scrollWidth();
			untracked(() => {
				if (this.initialized) {
					this.init();
					this.calculateAutoSize();
				}
			});
		});
		effect(() => {
			const length = (this._items() || []).length;
			untracked(() => {
				const lengthChanged = length !== this.lastItemsLength;
				const shouldInit = this._lazy() ? lengthChanged : true;
				this.lastItemsLength = length;
				if (this.initialized && shouldInit) this.init();
			});
		});
		effect(() => {
			const opts = this.options();
			untracked(() => {
				if ((opts === null || opts === void 0 ? void 0 : opts.contentStyle) !== void 0) this.contentStyle = opts.contentStyle;
			});
		});
		effect((onCleanup) => {
			var _this$elementViewChil;
			const element = (_this$elementViewChil = this.elementViewChild()) === null || _this$elementViewChil === void 0 ? void 0 : _this$elementViewChil.nativeElement;
			if (element && isPlatformBrowser(this.platformId)) onCleanup(this.renderer.listen(element, "scroll", (event) => this.onElementScroll(event)));
		});
	}
	get loaderIconContext() {
		return this._loaderIconContext();
	}
	onInit() {
		this.setInitialState();
	}
	onAfterViewInit() {
		Promise.resolve().then(() => {
			this.viewInit();
		});
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.ptm("host"));
		if (!this.initialized) this.viewInit();
	}
	onDestroy() {
		this._destroyed = true;
		this.unbindResizeListener();
		if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
		if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
		this.contentEl = null;
		this.initialized = false;
	}
	viewInit() {
		if (isPlatformBrowser(this.platformId) && !this.initialized) {
			var _this$elementViewChil2;
			if (pt((_this$elementViewChil2 = this.elementViewChild()) === null || _this$elementViewChil2 === void 0 ? void 0 : _this$elementViewChil2.nativeElement)) {
				var _this$elementViewChil3, _this$elementViewChil4;
				this.setInitialState();
				this.setContentEl(this.contentEl);
				this.init();
				this.defaultWidth = Zt((_this$elementViewChil3 = this.elementViewChild()) === null || _this$elementViewChil3 === void 0 ? void 0 : _this$elementViewChil3.nativeElement);
				this.defaultHeight = Dt((_this$elementViewChil4 = this.elementViewChild()) === null || _this$elementViewChil4 === void 0 ? void 0 : _this$elementViewChil4.nativeElement);
				this.defaultContentWidth = Zt(this.contentEl);
				this.defaultContentHeight = Dt(this.contentEl);
				this.initialized = true;
			}
		}
	}
	init() {
		if (!this._disabled()) {
			this.bindResizeListener();
			setTimeout(() => {
				this.setSpacerSize();
				this.setSize();
				this.calculateOptions();
				this.calculateAutoSize();
				this.cd.detectChanges();
			}, 1);
		}
	}
	setContentEl(el) {
		var _this$contentViewChil, _this$elementViewChil5;
		this.contentEl = el || ((_this$contentViewChil = this.contentViewChild()) === null || _this$contentViewChil === void 0 ? void 0 : _this$contentViewChil.nativeElement) || nt((_this$elementViewChil5 = this.elementViewChild()) === null || _this$elementViewChil5 === void 0 ? void 0 : _this$elementViewChil5.nativeElement, this.psel(".p-virtualscroller-content"));
	}
	setInitialState() {
		this.first = this.both() ? {
			rows: 0,
			cols: 0
		} : 0;
		this.last = this.both() ? {
			rows: 0,
			cols: 0
		} : 0;
		this.numItemsInViewport = this.both() ? {
			rows: 0,
			cols: 0
		} : 0;
		this.lastScrollPos = this.both() ? {
			top: 0,
			left: 0
		} : 0;
		if (this.d_loading === void 0 || this.d_loading === false) this.d_loading = this._loading() || false;
		this.d_numToleratedItems = this._numToleratedItems();
		this.loaderArr = this.loaderArr.length > 0 ? this.loaderArr : [];
	}
	getElementRef() {
		return this.elementViewChild();
	}
	getPageByFirst(first) {
		return Math.floor(((first !== null && first !== void 0 ? first : this.first) + this.d_numToleratedItems * 4) / (this._step() || 1));
	}
	isPageChanged(first) {
		return this._step() ? this.page !== this.getPageByFirst(first !== null && first !== void 0 ? first : this.first) : true;
	}
	scrollTo(options) {
		var _this$elementViewChil6;
		(_this$elementViewChil6 = this.elementViewChild()) === null || _this$elementViewChil6 === void 0 || (_this$elementViewChil6 = _this$elementViewChil6.nativeElement) === null || _this$elementViewChil6 === void 0 || _this$elementViewChil6.scrollTo(options);
	}
	scrollToIndex(index, behavior = "auto") {
		if (this.both() ? index.every((i) => i > -1) : index > -1) {
			var _this$elementViewChil7, _this$elementViewChil8;
			const first = this.first;
			const { scrollTop = 0, scrollLeft = 0 } = (_this$elementViewChil7 = (_this$elementViewChil8 = this.elementViewChild()) === null || _this$elementViewChil8 === void 0 ? void 0 : _this$elementViewChil8.nativeElement) !== null && _this$elementViewChil7 !== void 0 ? _this$elementViewChil7 : {};
			const { numToleratedItems } = this.calculateNumItems();
			const contentPos = this.getContentPosition();
			const itemSize = this._itemSize();
			const calculateFirst = (_index = 0, _numT) => _index <= _numT ? 0 : _index;
			const calculateCoord = (_first, _size, _cpos) => _first * _size + _cpos;
			const scrollTo = (left = 0, top = 0) => this.scrollTo({
				left,
				top,
				behavior
			});
			let newFirst = this.both() ? {
				rows: 0,
				cols: 0
			} : 0;
			let isRangeChanged = false, isScrollChanged = false;
			if (this.both()) {
				newFirst = {
					rows: calculateFirst(index[0], numToleratedItems[0]),
					cols: calculateFirst(index[1], numToleratedItems[1])
				};
				scrollTo(calculateCoord(newFirst.cols, itemSize[1], contentPos.left), calculateCoord(newFirst.rows, itemSize[0], contentPos.top));
				isScrollChanged = this.lastScrollPos.top !== scrollTop || this.lastScrollPos.left !== scrollLeft;
				isRangeChanged = newFirst.rows !== first.rows || newFirst.cols !== first.cols;
			} else {
				newFirst = calculateFirst(index, numToleratedItems);
				if (this.horizontal()) scrollTo(calculateCoord(newFirst, itemSize, contentPos.left), scrollTop);
				else scrollTo(scrollLeft, calculateCoord(newFirst, itemSize, contentPos.top));
				isScrollChanged = this.lastScrollPos !== (this.horizontal() ? scrollLeft : scrollTop);
				isRangeChanged = newFirst !== first;
			}
			this.isRangeChanged = isRangeChanged;
			if (isScrollChanged) this.first = newFirst;
		}
	}
	scrollInView(index, to, behavior = "auto") {
		if (to) {
			const { first, viewport } = this.getRenderedRange();
			const scrollTo = (left = 0, top = 0) => this.scrollTo({
				left,
				top,
				behavior
			});
			const isToStart = to === "to-start";
			const isToEnd = to === "to-end";
			if (isToStart) {
				if (this.both()) {
					if (viewport.first.rows - first.rows > index[0]) scrollTo(viewport.first.cols * this._itemSize()[1], (viewport.first.rows - 1) * this._itemSize()[0]);
					else if (viewport.first.cols - first.cols > index[1]) scrollTo((viewport.first.cols - 1) * this._itemSize()[1], viewport.first.rows * this._itemSize()[0]);
				} else if (viewport.first - first > index) {
					const pos = (viewport.first - 1) * this._itemSize();
					if (this.horizontal()) scrollTo(pos, 0);
					else scrollTo(0, pos);
				}
			} else if (isToEnd) {
				if (this.both()) {
					if (viewport.last.rows - first.rows <= index[0] + 1) scrollTo(viewport.first.cols * this._itemSize()[1], (viewport.first.rows + 1) * this._itemSize()[0]);
					else if (viewport.last.cols - first.cols <= index[1] + 1) scrollTo((viewport.first.cols + 1) * this._itemSize()[1], viewport.first.rows * this._itemSize()[0]);
				} else if (viewport.last - first <= index + 1) {
					const pos = (viewport.first + 1) * this._itemSize();
					if (this.horizontal()) scrollTo(pos, 0);
					else scrollTo(0, pos);
				}
			}
		} else this.scrollToIndex(index, behavior);
	}
	getRenderedRange() {
		var _this$elementViewChil9;
		const calculateFirstInViewport = (_pos, _size) => _size || _pos ? Math.floor(_pos / (_size || _pos)) : 0;
		let firstInViewport = this.first;
		let lastInViewport = 0;
		const el = (_this$elementViewChil9 = this.elementViewChild()) === null || _this$elementViewChil9 === void 0 ? void 0 : _this$elementViewChil9.nativeElement;
		if (el) {
			const { scrollTop, scrollLeft } = el;
			if (this.both()) {
				firstInViewport = {
					rows: calculateFirstInViewport(scrollTop, this._itemSize()[0]),
					cols: calculateFirstInViewport(scrollLeft, this._itemSize()[1])
				};
				lastInViewport = {
					rows: firstInViewport.rows + this.numItemsInViewport.rows,
					cols: firstInViewport.cols + this.numItemsInViewport.cols
				};
			} else {
				firstInViewport = calculateFirstInViewport(this.horizontal() ? scrollLeft : scrollTop, this._itemSize());
				lastInViewport = firstInViewport + this.numItemsInViewport;
			}
		}
		return {
			first: this.first,
			last: this.last,
			viewport: {
				first: firstInViewport,
				last: lastInViewport
			}
		};
	}
	calculateNumItems() {
		var _this$elementViewChil10;
		const contentPos = this.getContentPosition();
		const el = (_this$elementViewChil10 = this.elementViewChild()) === null || _this$elementViewChil10 === void 0 ? void 0 : _this$elementViewChil10.nativeElement;
		const contentWidth = (el ? el.offsetWidth - contentPos.left : 0) || 0;
		const contentHeight = (el ? el.offsetHeight - contentPos.top : 0) || 0;
		const calculateNumItemsInViewport = (_contentSize, _itemSize) => _itemSize || _contentSize ? Math.ceil(_contentSize / (_itemSize || _contentSize)) : 0;
		const calculateNumToleratedItems = (_numItems) => Math.ceil(_numItems / 2);
		const numItemsInViewport = this.both() ? {
			rows: calculateNumItemsInViewport(contentHeight, this._itemSize()[0]),
			cols: calculateNumItemsInViewport(contentWidth, this._itemSize()[1])
		} : calculateNumItemsInViewport(this.horizontal() ? contentWidth : contentHeight, this._itemSize());
		return {
			numItemsInViewport,
			numToleratedItems: this.d_numToleratedItems || (this.both() ? [calculateNumToleratedItems(numItemsInViewport.rows), calculateNumToleratedItems(numItemsInViewport.cols)] : calculateNumToleratedItems(numItemsInViewport))
		};
	}
	calculateOptions() {
		const { numItemsInViewport, numToleratedItems } = this.calculateNumItems();
		const calculateLast = (_first, _num, _numT, _isCols = false) => this.getLast(_first + _num + (_first < _numT ? 2 : 3) * _numT, _isCols);
		const first = this.first;
		const last = this.both() ? {
			rows: calculateLast(this.first.rows, numItemsInViewport.rows, numToleratedItems[0]),
			cols: calculateLast(this.first.cols, numItemsInViewport.cols, numToleratedItems[1], true)
		} : calculateLast(this.first, numItemsInViewport, numToleratedItems);
		this.last = last;
		this.numItemsInViewport = numItemsInViewport;
		this.d_numToleratedItems = numToleratedItems;
		if (this._showLoader()) this.loaderArr = this.both() ? Array.from({ length: numItemsInViewport.rows }).map(() => Array.from({ length: numItemsInViewport.cols })) : Array.from({ length: numItemsInViewport });
		if (this._lazy()) Promise.resolve().then(() => {
			this.lazyLoadState = {
				first: this._step() ? this.both() ? {
					rows: 0,
					cols: first.cols
				} : 0 : first,
				last: Math.min(this._step() ? this._step() : this.last, this._items().length)
			};
			this.handleEvents("onLazyLoad", this.lazyLoadState);
		});
	}
	calculateAutoSize() {
		if (this._autoSize() && !this.d_loading) Promise.resolve().then(() => {
			if (this.contentEl) {
				const { scrollTop, scrollLeft } = this.elementViewChild().nativeElement;
				this.contentEl.style.minHeight = this.contentEl.style.minWidth = "auto";
				this.contentEl.style.position = "relative";
				this.elementViewChild().nativeElement.style.contain = "none";
				const [contentWidth, contentHeight] = [Zt(this.contentEl), Dt(this.contentEl)];
				if (contentWidth !== this.defaultContentWidth) this.elementViewChild().nativeElement.style.width = "";
				if (contentHeight !== this.defaultContentHeight) this.elementViewChild().nativeElement.style.height = "";
				const [width, height] = [Zt(this.elementViewChild().nativeElement), Dt(this.elementViewChild().nativeElement)];
				if (this.both() || this.horizontal()) this.elementViewChild().nativeElement.style.width = width < this.defaultWidth ? width + "px" : this._scrollWidth() || this.defaultWidth + "px";
				if (this.both() || this.vertical()) this.elementViewChild().nativeElement.style.height = height < this.defaultHeight ? height + "px" : this._scrollHeight() || this.defaultHeight + "px";
				this.contentEl.style.minHeight = this.contentEl.style.minWidth = "";
				this.contentEl.style.position = "";
				this.elementViewChild().nativeElement.style.contain = "";
				if (this.elementViewChild().nativeElement.scrollTop !== scrollTop || this.elementViewChild().nativeElement.scrollLeft !== scrollLeft) this.scrollTo({
					top: scrollTop,
					left: scrollLeft
				});
			}
		});
	}
	getLast(last = 0, isCols = false) {
		const items = this._items();
		const columns = this._columns();
		return items ? Math.min(isCols ? (columns || items[0]).length : items.length, last) : 0;
	}
	getContentPosition() {
		if (this.contentEl) {
			const style = getComputedStyle(this.contentEl);
			const left = parseFloat(style.paddingLeft) + Math.max(parseFloat(style.left) || 0, 0);
			const right = parseFloat(style.paddingRight) + Math.max(parseFloat(style.right) || 0, 0);
			const top = parseFloat(style.paddingTop) + Math.max(parseFloat(style.top) || 0, 0);
			const bottom = parseFloat(style.paddingBottom) + Math.max(parseFloat(style.bottom) || 0, 0);
			return {
				left,
				right,
				top,
				bottom,
				x: left + right,
				y: top + bottom
			};
		}
		return {
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			x: 0,
			y: 0
		};
	}
	setSize() {
		var _this$elementViewChil11;
		const nativeElement = (_this$elementViewChil11 = this.elementViewChild()) === null || _this$elementViewChil11 === void 0 ? void 0 : _this$elementViewChil11.nativeElement;
		if (nativeElement) {
			var _nativeElement$parent;
			const parentElement = (_nativeElement$parent = nativeElement.parentElement) === null || _nativeElement$parent === void 0 ? void 0 : _nativeElement$parent.parentElement;
			const elementWidth = nativeElement.offsetWidth;
			const parentWidth = (parentElement === null || parentElement === void 0 ? void 0 : parentElement.offsetWidth) || 0;
			const width = this._scrollWidth() || `${elementWidth || parentWidth}px`;
			const elementHeight = nativeElement.offsetHeight;
			const parentHeight = (parentElement === null || parentElement === void 0 ? void 0 : parentElement.offsetHeight) || 0;
			const height = this._scrollHeight() || `${elementHeight || parentHeight}px`;
			const setProp = (_name, _value) => nativeElement.style[_name] = _value;
			if (this.both() || this.horizontal()) {
				setProp("height", height);
				setProp("width", width);
			} else setProp("height", height);
		}
	}
	setSpacerSize() {
		const items = this._items();
		if (items) {
			const contentPos = this.getContentPosition();
			const setProp = (_name, _value, _size, _cpos = 0) => this.spacerStyle = _objectSpread2(_objectSpread2({}, this.spacerStyle), {}, { [`${_name}`]: (_value || []).length * _size + _cpos + "px" });
			if (this.both()) {
				setProp("height", items, this._itemSize()[0], contentPos.y);
				setProp("width", this._columns() || items[1], this._itemSize()[1], contentPos.x);
			} else if (this.horizontal()) setProp("width", this._columns() || items, this._itemSize(), contentPos.x);
			else setProp("height", items, this._itemSize(), contentPos.y);
		}
	}
	setContentPosition(pos) {
		if (this.contentEl && !this._appendOnly()) {
			const first = pos ? pos.first : this.first;
			const calculateTranslateVal = (_first, _size) => _first * _size;
			const setTransform = (_x = 0, _y = 0) => this.contentStyle = _objectSpread2(_objectSpread2({}, this.contentStyle), {}, { transform: `translate3d(${_x}px, ${_y}px, 0)` });
			if (this.both()) setTransform(calculateTranslateVal(first.cols, this._itemSize()[1]), calculateTranslateVal(first.rows, this._itemSize()[0]));
			else {
				const translateVal = calculateTranslateVal(first, this._itemSize());
				if (this.horizontal()) setTransform(translateVal, 0);
				else setTransform(0, translateVal);
			}
		}
	}
	onScrollPositionChange(event) {
		const target = event.target;
		if (!target) throw new Error("Event target is null");
		const contentPos = this.getContentPosition();
		const calculateScrollPos = (_pos, _cpos) => _pos ? _pos > _cpos ? _pos - _cpos : _pos : 0;
		const calculateCurrentIndex = (_pos, _size) => _size || _pos ? Math.floor(_pos / (_size || _pos)) : 0;
		const calculateTriggerIndex = (_currentIndex, _first, _last, _num, _numT, _isScrollDownOrRight) => _currentIndex <= _numT ? _numT : _isScrollDownOrRight ? _last - _num - _numT : _first + _numT - 1;
		const calculateFirst = (_currentIndex, _triggerIndex, _first, _last, _num, _numT, _isScrollDownOrRight) => {
			if (_currentIndex <= _numT) return 0;
			else return Math.max(0, _isScrollDownOrRight ? _currentIndex < _triggerIndex ? _first : _currentIndex - _numT : _currentIndex > _triggerIndex ? _first : _currentIndex - 2 * _numT);
		};
		const calculateLast = (_currentIndex, _first, _last, _num, _numT, _isCols = false) => {
			let lastValue = _first + _num + 2 * _numT;
			if (_currentIndex >= _numT) lastValue += _numT + 1;
			return this.getLast(lastValue, _isCols);
		};
		const scrollTop = calculateScrollPos(target.scrollTop, contentPos.top);
		const scrollLeft = calculateScrollPos(target.scrollLeft, contentPos.left);
		let newFirst = this.both() ? {
			rows: 0,
			cols: 0
		} : 0;
		let newLast = this.last;
		let isRangeChanged = false;
		let newScrollPos = this.lastScrollPos;
		if (this.both()) {
			const isScrollDown = this.lastScrollPos.top <= scrollTop;
			const isScrollRight = this.lastScrollPos.left <= scrollLeft;
			if (!this._appendOnly() || this._appendOnly() && (isScrollDown || isScrollRight)) {
				const currentIndex = {
					rows: calculateCurrentIndex(scrollTop, this._itemSize()[0]),
					cols: calculateCurrentIndex(scrollLeft, this._itemSize()[1])
				};
				const triggerIndex = {
					rows: calculateTriggerIndex(currentIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
					cols: calculateTriggerIndex(currentIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
				};
				newFirst = {
					rows: calculateFirst(currentIndex.rows, triggerIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
					cols: calculateFirst(currentIndex.cols, triggerIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
				};
				newLast = {
					rows: calculateLast(currentIndex.rows, newFirst.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0]),
					cols: calculateLast(currentIndex.cols, newFirst.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], true)
				};
				isRangeChanged = newFirst.rows !== this.first.rows || newLast.rows !== this.last.rows || newFirst.cols !== this.first.cols || newLast.cols !== this.last.cols || this.isRangeChanged;
				newScrollPos = {
					top: scrollTop,
					left: scrollLeft
				};
			}
		} else {
			const scrollPos = this.horizontal() ? scrollLeft : scrollTop;
			const isScrollDownOrRight = this.lastScrollPos <= scrollPos;
			if (!this._appendOnly() || this._appendOnly() && isScrollDownOrRight) {
				const currentIndex = calculateCurrentIndex(scrollPos, this._itemSize());
				newFirst = calculateFirst(currentIndex, calculateTriggerIndex(currentIndex, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight), this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);
				newLast = calculateLast(currentIndex, newFirst, this.last, this.numItemsInViewport, this.d_numToleratedItems);
				isRangeChanged = newFirst !== this.first || newLast !== this.last || this.isRangeChanged;
				newScrollPos = scrollPos;
			}
		}
		return {
			first: newFirst,
			last: newLast,
			isRangeChanged,
			scrollPos: newScrollPos
		};
	}
	onScrollChange(event) {
		const { first, last, isRangeChanged, scrollPos } = this.onScrollPositionChange(event);
		if (isRangeChanged) {
			const newState = {
				first,
				last
			};
			this.setContentPosition(newState);
			this.first = first;
			this.last = last;
			this.lastScrollPos = scrollPos;
			this.handleEvents("onScrollIndexChange", newState);
			if (this._lazy() && this.isPageChanged(first)) {
				const lazyLoadState = {
					first: this._step() ? Math.min(this.getPageByFirst(first) * this._step(), this._items().length - this._step()) : first,
					last: Math.min(this._step() ? (this.getPageByFirst(first) + 1) * this._step() : last, this._items().length)
				};
				if (this.lazyLoadState.first !== lazyLoadState.first || this.lazyLoadState.last !== lazyLoadState.last) this.handleEvents("onLazyLoad", lazyLoadState);
				this.lazyLoadState = lazyLoadState;
			}
		}
		return isRangeChanged;
	}
	onContainerScroll(event) {
		this.handleEvents("onScroll", { originalEvent: event });
		if (this._delay()) {
			if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
			if (!this.d_loading && this._showLoader()) {
				const { isRangeChanged } = this.onScrollPositionChange(event);
				if (isRangeChanged || (this._step() ? this.isPageChanged() : false)) {
					this.d_loading = true;
					this.cd.detectChanges();
				}
			}
			this.scrollTimeout = setTimeout(() => {
				this.onScrollChange(event);
				if (this.d_loading && this._showLoader() && (!this._lazy() || this._loading() === void 0)) {
					this.d_loading = false;
					this.page = this.getPageByFirst();
				}
				this.cd.detectChanges();
			}, this._delay());
			return true;
		}
		return !this.d_loading && this.onScrollChange(event);
	}
	onElementScroll(event) {
		var _this$options26;
		if (this.onContainerScroll(event) || ((_this$options26 = this.options()) === null || _this$options26 === void 0 ? void 0 : _this$options26.onScroll)) this.cd.markForCheck();
	}
	bindResizeListener() {
		if (isPlatformBrowser(this.platformId)) {
			if (!this.windowResizeListener) {
				const window = this.document.defaultView;
				const event = fe() ? "orientationchange" : "resize";
				this.windowResizeListener = this.renderer.listen(window, event, this.onWindowResize.bind(this));
			}
		}
	}
	unbindResizeListener() {
		if (this.windowResizeListener) {
			this.windowResizeListener();
			this.windowResizeListener = null;
		}
	}
	onWindowResize() {
		if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
		this.resizeTimeout = setTimeout(() => {
			var _this$elementViewChil12;
			if (pt((_this$elementViewChil12 = this.elementViewChild()) === null || _this$elementViewChil12 === void 0 ? void 0 : _this$elementViewChil12.nativeElement)) {
				var _this$elementViewChil13, _this$elementViewChil14;
				const [width, height] = [Zt((_this$elementViewChil13 = this.elementViewChild()) === null || _this$elementViewChil13 === void 0 ? void 0 : _this$elementViewChil13.nativeElement), Dt((_this$elementViewChil14 = this.elementViewChild()) === null || _this$elementViewChil14 === void 0 ? void 0 : _this$elementViewChil14.nativeElement)];
				const [isDiffWidth, isDiffHeight] = [width !== this.defaultWidth, height !== this.defaultHeight];
				if (this.both() ? isDiffWidth || isDiffHeight : this.horizontal() ? isDiffWidth : this.vertical() ? isDiffHeight : false) {
					this.d_numToleratedItems = this._numToleratedItems();
					this.defaultWidth = width;
					this.defaultHeight = height;
					this.defaultContentWidth = Zt(this.contentEl);
					this.defaultContentHeight = Dt(this.contentEl);
					this.init();
				}
			}
		}, this._resizeDelay());
	}
	handleEvents(name, params) {
		if (this._destroyed) return;
		const opts = this.options();
		return opts && opts[name] ? opts[name](params) : this[name].emit(params);
	}
	getContentTemplateContext() {
		return {
			$implicit: this.loadedItems,
			options: this.getContentOptions()
		};
	}
	getItemTemplateContext(item, index) {
		return {
			$implicit: item,
			options: this.getOptions(index)
		};
	}
	getLoaderTemplateContext(index) {
		return { options: this.getLoaderOptions(index, this.both() && { numCols: this.numItemsInViewport.cols }) };
	}
	getDisabledContentTemplateContext() {
		var _this$_items;
		return {
			$implicit: this.items(),
			options: {
				rows: (_this$_items = this._items()) !== null && _this$_items !== void 0 ? _this$_items : void 0,
				columns: this.loadedColumns
			}
		};
	}
	getContentOptions() {
		var _this$elementViewChil15;
		return {
			contentStyleClass: this.pcn(`p-virtualscroller-content ${this.d_loading ? "p-virtualscroller-loading" : ""}`),
			items: this.loadedItems,
			getItemOptions: (index) => this.getOptions(index),
			loading: this.d_loading,
			getLoaderOptions: (index, options) => this.getLoaderOptions(index, options),
			itemSize: this._itemSize(),
			rows: this.loadedRows,
			columns: this.loadedColumns,
			spacerStyle: this.spacerStyle,
			contentStyle: this.contentStyle,
			vertical: this.vertical(),
			horizontal: this.horizontal(),
			both: this.both(),
			scrollTo: this.scrollTo.bind(this),
			scrollToIndex: this.scrollToIndex.bind(this),
			orientation: this._orientation(),
			scrollableElement: (_this$elementViewChil15 = this.elementViewChild()) === null || _this$elementViewChil15 === void 0 ? void 0 : _this$elementViewChil15.nativeElement
		};
	}
	getOptions(renderedIndex) {
		const count = (this._items() || []).length;
		const index = this.both() ? this.first.rows + renderedIndex : this.first + renderedIndex;
		return {
			index,
			count,
			first: index === 0,
			last: index === count - 1,
			even: index % 2 === 0,
			odd: index % 2 !== 0
		};
	}
	getLoaderOptions(index, extOptions) {
		const count = this.loaderArr.length;
		return _objectSpread2({
			index,
			count,
			first: index === 0,
			last: index === count - 1,
			even: index % 2 === 0,
			odd: index % 2 !== 0,
			loading: this.d_loading
		}, extOptions);
	}
}, _defineProperty(_Scroller, "ɵfac", function Scroller_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _Scroller)();
}), _defineProperty(_Scroller, "ɵcmp", (function() {
	const _c0 = ["content"];
	const _c1 = ["item"];
	const _c2 = ["loader"];
	const _c3 = ["loadericon"];
	const _c4 = ["element"];
	const _c5 = ["*"];
	function _forTrack0($index, $item) {
		return this._trackBy() ? this._trackBy()($index, $item) : $index;
	}
	function Scroller_Conditional_0_Conditional_2_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Scroller_Conditional_0_Conditional_2_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Scroller_Conditional_0_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 6);
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵproperty("ngTemplateOutlet", ctx_r0.contentTemplate())("ngTemplateOutletContext", ctx_r0.getContentTemplateContext());
		}
	}
	function Scroller_Conditional_0_Conditional_3_For_3_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Scroller_Conditional_0_Conditional_3_For_3_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Scroller_Conditional_0_Conditional_3_For_3_ng_container_0_Template, 1, 0, "ng-container", 6);
		if (rf & 2) {
			const item_r2 = ctx.$implicit;
			const ɵ$index_12_r3 = ctx.$index;
			const ctx_r0 = ɵɵnextContext(3);
			ɵɵproperty("ngTemplateOutlet", ctx_r0.itemTemplate())("ngTemplateOutletContext", ctx_r0.getItemTemplateContext(item_r2, ɵ$index_12_r3));
		}
	}
	function Scroller_Conditional_0_Conditional_3_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "div", 3, 1);
			ɵɵrepeaterCreate(2, Scroller_Conditional_0_Conditional_3_For_3_Template, 1, 2, "ng-container", null, _forTrack0, true);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵstyleMap(ctx_r0.contentStyle);
			ɵɵclassMap(ctx_r0.cn(ctx_r0.cx("content"), ctx_r0.contentStyleClass()));
			ɵɵproperty("pBind", ctx_r0.ptm("content"));
			ɵɵadvance(2);
			ɵɵrepeater(ctx_r0.loadedItems);
		}
	}
	function Scroller_Conditional_0_Conditional_4_Template(rf, ctx) {
		if (rf & 1) ɵɵelement(0, "div", 3);
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵstyleMap(ctx_r0.spacerStyle);
			ɵɵclassMap(ctx_r0.cx("spacer"));
			ɵɵproperty("pBind", ctx_r0.ptm("spacer"));
		}
	}
	function Scroller_Conditional_0_Conditional_5_Conditional_1_For_1_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Scroller_Conditional_0_Conditional_5_Conditional_1_For_1_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Scroller_Conditional_0_Conditional_5_Conditional_1_For_1_ng_container_0_Template, 1, 0, "ng-container", 6);
		if (rf & 2) {
			const ɵ$index_24_r4 = ctx.$index;
			const ctx_r0 = ɵɵnextContext(4);
			ɵɵproperty("ngTemplateOutlet", ctx_r0.loaderTemplate())("ngTemplateOutletContext", ctx_r0.getLoaderTemplateContext(ɵ$index_24_r4));
		}
	}
	function Scroller_Conditional_0_Conditional_5_Conditional_1_Template(rf, ctx) {
		if (rf & 1) ɵɵrepeaterCreate(0, Scroller_Conditional_0_Conditional_5_Conditional_1_For_1_Template, 1, 2, "ng-container", null, ɵɵrepeaterTrackByIndex);
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(3);
			ɵɵrepeater(ctx_r0.loaderArr);
		}
	}
	function Scroller_Conditional_0_Conditional_5_Conditional_2_Conditional_0_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Scroller_Conditional_0_Conditional_5_Conditional_2_Conditional_0_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Scroller_Conditional_0_Conditional_5_Conditional_2_Conditional_0_ng_container_0_Template, 1, 0, "ng-container", 6);
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(4);
			ɵɵproperty("ngTemplateOutlet", ctx_r0.loaderIconTemplate())("ngTemplateOutletContext", ctx_r0.loaderIconContext);
		}
	}
	function Scroller_Conditional_0_Conditional_5_Conditional_2_Conditional_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 8);
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(4);
			ɵɵclassMap(ctx_r0.cx("loadingIcon"));
			ɵɵproperty("spin", true)("pBind", ctx_r0.ptm("loadingIcon"));
		}
	}
	function Scroller_Conditional_0_Conditional_5_Conditional_2_Template(rf, ctx) {
		if (rf & 1) ɵɵconditionalCreate(0, Scroller_Conditional_0_Conditional_5_Conditional_2_Conditional_0_Template, 1, 2, "ng-container")(1, Scroller_Conditional_0_Conditional_5_Conditional_2_Conditional_1_Template, 1, 4, "svg", 7);
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(3);
			ɵɵconditional(ctx_r0.loaderIconTemplate() ? 0 : 1);
		}
	}
	function Scroller_Conditional_0_Conditional_5_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "div", 3);
			ɵɵconditionalCreate(1, Scroller_Conditional_0_Conditional_5_Conditional_1_Template, 2, 0)(2, Scroller_Conditional_0_Conditional_5_Conditional_2_Template, 2, 1);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵclassMap(ctx_r0.cx("loader"));
			ɵɵproperty("pBind", ctx_r0.ptm("loader"));
			ɵɵadvance();
			ɵɵconditional(ctx_r0.loaderTemplate() ? 1 : 2);
		}
	}
	function Scroller_Conditional_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "div", 3, 0);
			ɵɵconditionalCreate(2, Scroller_Conditional_0_Conditional_2_Template, 1, 2, "ng-container")(3, Scroller_Conditional_0_Conditional_3_Template, 4, 5, "div", 4);
			ɵɵconditionalCreate(4, Scroller_Conditional_0_Conditional_4_Template, 1, 5, "div", 4);
			ɵɵconditionalCreate(5, Scroller_Conditional_0_Conditional_5_Template, 3, 4, "div", 5);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵstyleMap(ctx_r0._style());
			ɵɵclassMap(ctx_r0.cn(ctx_r0.cx("root"), ctx_r0._styleClass()));
			ɵɵproperty("pBind", ctx_r0.ptm("root"));
			ɵɵattribute("id", ctx_r0._id())("tabindex", ctx_r0._tabindex());
			ɵɵadvance(2);
			ɵɵconditional(ctx_r0.contentTemplate() ? 2 : 3);
			ɵɵadvance(2);
			ɵɵconditional(ctx_r0._showSpacer() ? 4 : -1);
			ɵɵadvance();
			ɵɵconditional(!ctx_r0._loaderDisabled() && ctx_r0._showLoader() && ctx_r0.d_loading ? 5 : -1);
		}
	}
	function Scroller_Conditional_1_Conditional_1_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Scroller_Conditional_1_Conditional_1_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Scroller_Conditional_1_Conditional_1_ng_container_0_Template, 1, 0, "ng-container", 6);
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵproperty("ngTemplateOutlet", ctx_r0.contentTemplate())("ngTemplateOutletContext", ctx_r0.getDisabledContentTemplateContext());
		}
	}
	function Scroller_Conditional_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵprojection(0);
			ɵɵconditionalCreate(1, Scroller_Conditional_1_Conditional_1_Template, 1, 2, "ng-container");
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵadvance();
			ɵɵconditional(ctx_r0.contentTemplate() ? 1 : -1);
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _Scroller,
		selectors: [
			["p-scroller"],
			["p-virtualscroller"],
			["p-virtual-scroller"]
		],
		contentQueries: function Scroller_ContentQueries(rf, ctx, dirIndex) {
			if (rf & 1) ɵɵcontentQuerySignal(dirIndex, ctx.contentTemplate, _c0, 4)(dirIndex, ctx.itemTemplate, _c1, 4)(dirIndex, ctx.loaderTemplate, _c2, 4)(dirIndex, ctx.loaderIconTemplate, _c3, 4);
			if (rf & 2) ɵɵqueryAdvance(4);
		},
		viewQuery: function Scroller_Query(rf, ctx) {
			if (rf & 1) ɵɵviewQuerySignal(ctx.elementViewChild, _c4, 5)(ctx.contentViewChild, _c0, 5);
			if (rf & 2) ɵɵqueryAdvance(2);
		},
		hostVars: 2,
		hostBindings: function Scroller_HostBindings(rf, ctx) {
			if (rf & 2) ɵɵstyleProp("height", ctx.hostHeight());
		},
		inputs: {
			hostName: [1, "hostName"],
			id: [1, "id"],
			style: [1, "style"],
			styleClass: [1, "styleClass"],
			tabindex: [1, "tabindex"],
			items: [1, "items"],
			itemSize: [1, "itemSize"],
			scrollHeight: [1, "scrollHeight"],
			scrollWidth: [1, "scrollWidth"],
			orientation: [1, "orientation"],
			step: [1, "step"],
			delay: [1, "delay"],
			resizeDelay: [1, "resizeDelay"],
			appendOnly: [1, "appendOnly"],
			inline: [1, "inline"],
			lazy: [1, "lazy"],
			disabled: [1, "disabled"],
			loaderDisabled: [1, "loaderDisabled"],
			columns: [1, "columns"],
			showSpacer: [1, "showSpacer"],
			showLoader: [1, "showLoader"],
			numToleratedItems: [1, "numToleratedItems"],
			loading: [1, "loading"],
			autoSize: [1, "autoSize"],
			trackBy: [1, "trackBy"],
			options: [1, "options"]
		},
		outputs: {
			onLazyLoad: "onLazyLoad",
			onScroll: "onScroll",
			onScrollIndexChange: "onScrollIndexChange"
		},
		features: [
			ɵɵProvidersFeature([
				ScrollerStyle,
				{
					provide: SCROLLER_INSTANCE,
					useExisting: _Scroller
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: _Scroller
				}
			]),
			ɵɵHostDirectivesFeature([Bind]),
			ɵɵInheritDefinitionFeature
		],
		ngContentSelectors: _c5,
		decls: 2,
		vars: 1,
		consts: [
			["element", ""],
			["content", ""],
			[
				3,
				"style",
				"class",
				"pBind"
			],
			[3, "pBind"],
			[
				3,
				"class",
				"style",
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
				"spinner",
				3,
				"class",
				"spin",
				"pBind"
			],
			[
				"data-p-icon",
				"spinner",
				3,
				"spin",
				"pBind"
			]
		],
		template: function Scroller_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵprojectionDef();
				ɵɵconditionalCreate(0, Scroller_Conditional_0_Template, 6, 10, "div", 2)(1, Scroller_Conditional_1_Template, 2, 1);
			}
			if (rf & 2) ɵɵconditional(!ctx._disabled() ? 0 : 1);
		},
		dependencies: [
			NgTemplateOutlet,
			Spinner,
			Bind
		],
		encapsulation: 2,
		changeDetection: 1
	});
})()), _Scroller);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Scroller, [{
		type: Component,
		args: [{
			selector: "p-scroller, p-virtualscroller, p-virtual-scroller",
			imports: [
				NgTemplateOutlet,
				Spinner,
				Bind
			],
			standalone: true,
			template: `
        @if (!_disabled()) {
            <div #element [attr.id]="_id()" [attr.tabindex]="_tabindex()" [style]="_style()" [class]="cn(cx('root'), _styleClass())" [pBind]="ptm('root')">
                @if (contentTemplate()) {
                    <ng-container *ngTemplateOutlet="contentTemplate(); context: getContentTemplateContext()"></ng-container>
                } @else {
                    <div #content [class]="cn(cx('content'), contentStyleClass())" [style]="contentStyle" [pBind]="ptm('content')">
                        @for (item of loadedItems; track _trackBy() ? _trackBy()!($index, item) : $index; let index = $index) {
                            <ng-container *ngTemplateOutlet="itemTemplate(); context: getItemTemplateContext(item, index)"></ng-container>
                        }
                    </div>
                }
                @if (_showSpacer()) {
                    <div [class]="cx('spacer')" [style]="spacerStyle" [pBind]="ptm('spacer')"></div>
                }
                @if (!_loaderDisabled() && _showLoader() && d_loading) {
                    <div [class]="cx('loader')" [pBind]="ptm('loader')">
                        @if (loaderTemplate()) {
                            @for (item of loaderArr; track $index; let index = $index) {
                                <ng-container *ngTemplateOutlet="loaderTemplate(); context: getLoaderTemplateContext(index)"></ng-container>
                            }
                        } @else {
                            @if (loaderIconTemplate()) {
                                <ng-container *ngTemplateOutlet="loaderIconTemplate(); context: loaderIconContext"></ng-container>
                            } @else {
                                <svg data-p-icon="spinner" [class]="cx('loadingIcon')" [spin]="true" [pBind]="ptm('loadingIcon')" />
                            }
                        }
                    </div>
                }
            </div>
        } @else {
            <ng-content />
            @if (contentTemplate()) {
                <ng-container *ngTemplateOutlet="contentTemplate(); context: getDisabledContentTemplateContext()"></ng-container>
            }
        }
    `,
			changeDetection: ChangeDetectionStrategy.Default,
			encapsulation: ViewEncapsulation.None,
			providers: [
				ScrollerStyle,
				{
					provide: SCROLLER_INSTANCE,
					useExisting: Scroller
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: Scroller
				}
			],
			hostDirectives: [Bind],
			host: { "[style.height]": "hostHeight()" }
		}]
	}], () => [], {
		hostName: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "hostName",
				required: false
			}]
		}],
		id: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "id",
				required: false
			}]
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
		tabindex: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "tabindex",
				required: false
			}]
		}],
		items: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "items",
				required: false
			}]
		}],
		itemSize: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "itemSize",
				required: false
			}]
		}],
		scrollHeight: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "scrollHeight",
				required: false
			}]
		}],
		scrollWidth: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "scrollWidth",
				required: false
			}]
		}],
		orientation: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "orientation",
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
		delay: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "delay",
				required: false
			}]
		}],
		resizeDelay: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "resizeDelay",
				required: false
			}]
		}],
		appendOnly: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "appendOnly",
				required: false
			}]
		}],
		inline: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "inline",
				required: false
			}]
		}],
		lazy: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "lazy",
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
		loaderDisabled: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "loaderDisabled",
				required: false
			}]
		}],
		columns: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "columns",
				required: false
			}]
		}],
		showSpacer: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "showSpacer",
				required: false
			}]
		}],
		showLoader: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "showLoader",
				required: false
			}]
		}],
		numToleratedItems: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "numToleratedItems",
				required: false
			}]
		}],
		loading: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "loading",
				required: false
			}]
		}],
		autoSize: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "autoSize",
				required: false
			}]
		}],
		trackBy: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "trackBy",
				required: false
			}]
		}],
		options: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "options",
				required: false
			}]
		}],
		onLazyLoad: [{
			type: Output,
			args: ["onLazyLoad"]
		}],
		onScroll: [{
			type: Output,
			args: ["onScroll"]
		}],
		onScrollIndexChange: [{
			type: Output,
			args: ["onScrollIndexChange"]
		}],
		elementViewChild: [{
			type: ViewChild,
			args: ["element", { isSignal: true }]
		}],
		contentViewChild: [{
			type: ViewChild,
			args: ["content", { isSignal: true }]
		}],
		contentTemplate: [{
			type: ContentChild,
			args: ["content", {
				descendants: false,
				isSignal: true
			}]
		}],
		itemTemplate: [{
			type: ContentChild,
			args: ["item", {
				descendants: false,
				isSignal: true
			}]
		}],
		loaderTemplate: [{
			type: ContentChild,
			args: ["loader", {
				descendants: false,
				isSignal: true
			}]
		}],
		loaderIconTemplate: [{
			type: ContentChild,
			args: ["loadericon", {
				descendants: false,
				isSignal: true
			}]
		}]
	});
})();
var ScrollerModule = (_ScrollerModule = class ScrollerModule {}, _defineProperty(_ScrollerModule, "ɵfac", function ScrollerModule_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _ScrollerModule)();
}), _defineProperty(_ScrollerModule, "ɵmod", /*@__PURE__*/ ɵɵdefineNgModule({
	type: _ScrollerModule,
	imports: [Scroller],
	exports: [Scroller]
})), _defineProperty(_ScrollerModule, "ɵinj", /*@__PURE__*/ ɵɵdefineInjector({ imports: [Scroller] })), _ScrollerModule);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollerModule, [{
		type: NgModule,
		args: [{
			imports: [Scroller],
			exports: [Scroller]
		}]
	}], null, null);
})();
export { Scroller, ScrollerClasses, ScrollerModule, ScrollerStyle };
