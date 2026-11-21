import { u as isPlatformBrowser } from "./common-BHJivUlT.js";
import { Al as ɵɵdefineInjectable, Bt as computed, Er as ViewContainerRef, Fn as Injectable, In as Input, O as booleanAttribute, Rc as NgZone, Wi as setClassMetadata, X as input, ao as ɵɵdefineNgModule, ca as ɵɵInheritDefinitionFeature, dl as inject, il as effect, io as ɵɵdefineDirective, jl as ɵɵdefineInjector, jo as ɵɵgetInheritedFactory, kc as InjectionToken, qn as NgModule, qt as untracked, rt as numberAttribute, ua as ɵɵProvidersFeature, wn as Directive } from "./core-BRnM5AcM.js";
import "./dist-D971aPsi.js";
import { $ as L, Ct as nt, G as D, St as me, W as Ct, _t as h, at as V, bt as kt, dt as Z, kt as rt, nt as R, xt as le, yt as j } from "./dist-BnkFXv39.js";
import { a as getEventTarget, r as ConnectedOverlayScrollHandler, t as BaseComponent } from "./primeng-basecomponent-eFp8WNlF.js";
import { BindModule } from "./primeng_bind.js";
import { o as zindexutils_default } from "./primeng-utils-Ddwu4wH2.js";
import { s as BaseStyle } from "./primeng-config-E0JoXWcg.js";
import { n as _objectSpread2, r as _defineProperty } from "./asyncToGenerator-CE9zIWF7.js";
// ../node_modules/@primeuix/styles/dist/tooltip/index.mjs
var style = "\n    .p-tooltip {\n        position: absolute;\n        display: none;\n        max-width: dt('tooltip.max.width');\n    }\n\n    .p-tooltip-right,\n    .p-tooltip-left {\n        padding: 0 dt('tooltip.gutter');\n    }\n\n    .p-tooltip-top,\n    .p-tooltip-bottom {\n        padding: dt('tooltip.gutter') 0;\n    }\n\n    .p-tooltip-text {\n        white-space: pre-line;\n        word-break: break-word;\n        background: dt('tooltip.background');\n        color: dt('tooltip.color');\n        padding: dt('tooltip.padding');\n        box-shadow: dt('tooltip.shadow');\n        border-radius: dt('tooltip.border.radius');\n        font-weight: dt('tooltip.font.weight');\n        font-size: dt('tooltip.font.size');\n    }\n\n    .p-tooltip-arrow {\n        position: absolute;\n        width: 0;\n        height: 0;\n        border-color: transparent;\n        border-style: solid;\n    }\n\n    .p-tooltip-right .p-tooltip-arrow {\n        margin-top: calc(-1 * dt('tooltip.gutter'));\n        border-width: dt('tooltip.gutter') dt('tooltip.gutter') dt('tooltip.gutter') 0;\n        border-right-color: dt('tooltip.background');\n    }\n\n    .p-tooltip-left .p-tooltip-arrow {\n        margin-top: calc(-1 * dt('tooltip.gutter'));\n        border-width: dt('tooltip.gutter') 0 dt('tooltip.gutter') dt('tooltip.gutter');\n        border-left-color: dt('tooltip.background');\n    }\n\n    .p-tooltip-top .p-tooltip-arrow {\n        margin-left: calc(-1 * dt('tooltip.gutter'));\n        border-width: dt('tooltip.gutter') dt('tooltip.gutter') 0 dt('tooltip.gutter');\n        border-top-color: dt('tooltip.background');\n        border-bottom-color: dt('tooltip.background');\n    }\n\n    .p-tooltip-bottom .p-tooltip-arrow {\n        margin-left: calc(-1 * dt('tooltip.gutter'));\n        border-width: 0 dt('tooltip.gutter') dt('tooltip.gutter') dt('tooltip.gutter');\n        border-top-color: dt('tooltip.background');\n        border-bottom-color: dt('tooltip.background');\n    }\n";
// ../node_modules/primeng/fesm2022/primeng-tooltip.mjs
var _TooltipStyle;
var _Tooltip;
var _TooltipModule;
var classes = {
	root: "p-tooltip p-component",
	arrow: "p-tooltip-arrow",
	text: "p-tooltip-text"
};
var TooltipStyle = (_TooltipStyle = class TooltipStyle extends BaseStyle {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "name", "tooltip");
		_defineProperty(this, "style", style);
		_defineProperty(this, "classes", classes);
	}
}, _defineProperty(_TooltipStyle, "ɵfac", /*@__PURE__*/ (() => {
	let ɵTooltipStyle_BaseFactory = void 0;
	return function TooltipStyle_Factory(__ngFactoryType__) {
		return (ɵTooltipStyle_BaseFactory || (ɵTooltipStyle_BaseFactory = ɵɵgetInheritedFactory(_TooltipStyle)))(__ngFactoryType__ || _TooltipStyle);
	};
})()), _defineProperty(_TooltipStyle, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _TooltipStyle,
	factory: _TooltipStyle.ɵfac
})), _TooltipStyle);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipStyle, [{ type: Injectable }], null, null);
})();
var TooltipClasses;
(function(TooltipClasses) {
	TooltipClasses["root"] = "p-tooltip";
	TooltipClasses["arrow"] = "p-tooltip-arrow";
	TooltipClasses["text"] = "p-tooltip-text";
})(TooltipClasses || (TooltipClasses = {}));
var TOOLTIP_INSTANCE = new InjectionToken("TOOLTIP_INSTANCE");
function isTemplateRef(value) {
	return typeof (value === null || value === void 0 ? void 0 : value.createEmbeddedView) === "function";
}
var Tooltip = (_Tooltip = class Tooltip extends BaseComponent {
	constructor() {
		var _inject;
		super();
		_defineProperty(this, "componentName", "Tooltip");
		_defineProperty(this, "$pcTooltip", (_inject = inject(TOOLTIP_INSTANCE, {
			optional: true,
			skipSelf: true
		})) !== null && _inject !== void 0 ? _inject : void 0);
		_defineProperty(this, "tooltipPosition", input(...ngDevMode ? [void 0, { debugName: "tooltipPosition" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "tooltipEvent", input("hover", ...ngDevMode ? [{ debugName: "tooltipEvent" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "positionStyle", input(...ngDevMode ? [void 0, { debugName: "positionStyle" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "tooltipStyleClass", input(...ngDevMode ? [void 0, { debugName: "tooltipStyleClass" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "tooltipZIndex", input(...ngDevMode ? [void 0, { debugName: "tooltipZIndex" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "escape", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "escape" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "showDelay", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "showDelay" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "hideDelay", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "hideDelay" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "life", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "life" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "positionTop", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "positionTop" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "positionLeft", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "positionLeft" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "autoHide", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "autoHide" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "fitContent", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "fitContent" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "hideOnEscape", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "hideOnEscape" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "showOnEllipsis", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "showOnEllipsis" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "content", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "content" } : /* istanbul ignore next */ {}), {}, { alias: "pTooltip" })));
		_defineProperty(this, "tooltipDisabled", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "tooltipDisabled" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "tooltipOptions", input(...ngDevMode ? [void 0, { debugName: "tooltipOptions" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "appendTo", input(void 0, ...ngDevMode ? [{ debugName: "appendTo" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$appendTo", computed(() => this.appendTo() || this.config.overlayAppendTo(), ...ngDevMode ? [{ debugName: "$appendTo" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "tooltipId", this.$useId.next("pn_id_") + "_tooltip");
		_defineProperty(this, "_tooltipOptions", computed(() => {
			var _this$tooltipOptions, _this$tooltipPosition, _this$appendTo, _this$tooltipZIndex, _this$positionTop, _this$positionLeft;
			const options = Object.fromEntries(Object.entries((_this$tooltipOptions = this.tooltipOptions()) !== null && _this$tooltipOptions !== void 0 ? _this$tooltipOptions : {}).filter(([, value]) => value !== void 0));
			return _objectSpread2(_objectSpread2({
				tooltipLabel: this.content(),
				tooltipPosition: (_this$tooltipPosition = this.tooltipPosition()) !== null && _this$tooltipPosition !== void 0 ? _this$tooltipPosition : "right",
				tooltipEvent: this.tooltipEvent(),
				appendTo: (_this$appendTo = this.appendTo()) !== null && _this$appendTo !== void 0 ? _this$appendTo : "body",
				positionStyle: this.positionStyle(),
				tooltipStyleClass: this.tooltipStyleClass(),
				tooltipZIndex: (_this$tooltipZIndex = this.tooltipZIndex()) !== null && _this$tooltipZIndex !== void 0 ? _this$tooltipZIndex : "auto",
				escape: this.escape(),
				showDelay: this.showDelay(),
				hideDelay: this.hideDelay(),
				life: this.life(),
				positionTop: (_this$positionTop = this.positionTop()) !== null && _this$positionTop !== void 0 ? _this$positionTop : 0,
				positionLeft: (_this$positionLeft = this.positionLeft()) !== null && _this$positionLeft !== void 0 ? _this$positionLeft : 0,
				autoHide: this.autoHide(),
				hideOnEscape: this.hideOnEscape(),
				fitContent: this.fitContent(),
				showOnEllipsis: this.showOnEllipsis(),
				disabled: this.tooltipDisabled()
			}, options), {}, { id: this.tooltipId });
		}, ...ngDevMode ? [{ debugName: "_tooltipOptions" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "container", null);
		_defineProperty(this, "styleClass", void 0);
		_defineProperty(this, "tooltipText", null);
		_defineProperty(this, "rootPTClasses", "");
		_defineProperty(this, "showTimeout", null);
		_defineProperty(this, "hideTimeout", null);
		_defineProperty(this, "fadeInCancel", void 0);
		_defineProperty(this, "alignTimeout", null);
		_defineProperty(this, "active", void 0);
		_defineProperty(this, "mouseEnterListener", void 0);
		_defineProperty(this, "mouseLeaveListener", void 0);
		_defineProperty(this, "clickListener", void 0);
		_defineProperty(this, "focusListener", void 0);
		_defineProperty(this, "blurListener", void 0);
		_defineProperty(this, "touchStartListener", void 0);
		_defineProperty(this, "touchEndListener", void 0);
		_defineProperty(this, "containerMouseleaveListener", void 0);
		_defineProperty(this, "documentTouchListener", void 0);
		_defineProperty(this, "documentEscapeListener", void 0);
		_defineProperty(this, "scrollHandler", null);
		_defineProperty(this, "resizeListener", null);
		_defineProperty(this, "_componentStyle", inject(TooltipStyle));
		_defineProperty(this, "pTooltipPT", input(...ngDevMode ? [void 0, { debugName: "pTooltipPT" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "pTooltipUnstyled", input(...ngDevMode ? [void 0, { debugName: "pTooltipUnstyled" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "viewContainer", inject(ViewContainerRef));
		_defineProperty(this, "zone", inject(NgZone));
		effect(() => {
			const pt = this.pTooltipPT();
			if (pt) this.directivePT.set(pt);
		});
		effect(() => {
			if (this.pTooltipUnstyled()) this.directiveUnstyled.set(this.pTooltipUnstyled());
		});
		effect(() => {
			const content = this.content();
			untracked(() => {
				if (this.active) {
					if (content) {
						if (this.container && this.container.offsetParent) {
							this.updateText();
							this.align();
						} else this.show();
					} else this.hide();
				}
			});
		});
		effect(() => {
			const disabled = this.tooltipDisabled();
			untracked(() => {
				if (disabled) this.deactivate();
			});
		});
		effect(() => {
			const options = this.tooltipOptions();
			untracked(() => {
				if (options) {
					this.deactivate();
					if (this.active) {
						if (this.getOption("tooltipLabel")) {
							if (this.container && this.container.offsetParent) {
								this.updateText();
								this.align();
							} else this.show();
						} else this.hide();
					}
				}
			});
		});
	}
	onAfterViewInit() {
		if (isPlatformBrowser(this.platformId)) this.zone.runOutsideAngular(() => {
			const tooltipEvent = this.getOption("tooltipEvent");
			if (tooltipEvent === "hover" || tooltipEvent === "both") {
				this.mouseEnterListener = this.onMouseEnter.bind(this);
				this.mouseLeaveListener = this.onMouseLeave.bind(this);
				this.clickListener = this.onInputClick.bind(this);
				this.el.nativeElement.addEventListener("mouseenter", this.mouseEnterListener);
				this.el.nativeElement.addEventListener("click", this.clickListener);
				this.el.nativeElement.addEventListener("mouseleave", this.mouseLeaveListener);
				this.touchStartListener = this.onTouchStart.bind(this);
				this.touchEndListener = this.onTouchEnd.bind(this);
				this.el.nativeElement.addEventListener("touchstart", this.touchStartListener, { passive: true });
				this.el.nativeElement.addEventListener("touchend", this.touchEndListener, { passive: true });
			}
			if (tooltipEvent === "focus" || tooltipEvent === "both") {
				this.focusListener = this.onFocus.bind(this);
				this.blurListener = this.onBlur.bind(this);
				let target = this.el.nativeElement.querySelector(this.psel(".p-component"));
				if (!target) target = this.getTarget(this.el.nativeElement);
				target.addEventListener("focus", this.focusListener);
				target.addEventListener("blur", this.blurListener);
			}
		});
	}
	isAutoHide() {
		return !!this.getOption("autoHide");
	}
	onMouseEnter(e) {
		if (!this.container && !this.showTimeout) this.activate();
	}
	onMouseLeave(e) {
		if (!this.isAutoHide()) {
			if (!(D(e.relatedTarget, this.pcn("p-tooltip")) || D(e.relatedTarget, this.pcn("p-tooltip-text")) || D(e.relatedTarget, this.pcn("p-tooltip-arrow")))) this.deactivate();
		} else this.deactivate();
	}
	onTouchStart(e) {
		if (!this.container && !this.showTimeout) {
			this.activate();
			if (!this.isAutoHide()) this.bindDocumentTouchListener();
		}
	}
	onTouchEnd(e) {
		if (this.isAutoHide()) this.deactivate();
	}
	bindDocumentTouchListener() {
		if (!this.documentTouchListener) this.documentTouchListener = this.renderer.listen("document", "touchstart", (e) => {
			if (this.container && !this.container.contains(getEventTarget(e, this.container)) && !this.el.nativeElement.contains(getEventTarget(e, this.el.nativeElement))) {
				this.deactivate();
				this.unbindDocumentTouchListener();
			}
		});
	}
	unbindDocumentTouchListener() {
		if (this.documentTouchListener) {
			this.documentTouchListener();
			this.documentTouchListener = null;
		}
	}
	onFocus(e) {
		this.activate();
	}
	onBlur(e) {
		this.deactivate();
	}
	onInputClick(e) {
		if (this.getOption("tooltipEvent") === "both" && this.el.nativeElement.contains(rt(this.el.nativeElement))) return;
		this.deactivate();
	}
	hasEllipsis() {
		const el = this.el.nativeElement;
		return el.offsetWidth < el.scrollWidth || el.offsetHeight < el.scrollHeight;
	}
	activate() {
		if (this.active) return;
		if (this.getOption("showOnEllipsis") && !this.hasEllipsis()) return;
		this.active = true;
		this.clearHideTimeout();
		const showDelay = this.getOption("showDelay");
		if (showDelay) this.showTimeout = setTimeout(() => {
			this.show();
		}, showDelay);
		else this.show();
		const life = this.getOption("life");
		if (life) {
			const duration = showDelay ? life + showDelay : life;
			this.hideTimeout = setTimeout(() => {
				this.hide();
			}, duration);
		}
		if (this.getOption("hideOnEscape")) this.documentEscapeListener = this.renderer.listen("document", "keydown.escape", () => {
			var _this$documentEscapeL;
			this.deactivate();
			(_this$documentEscapeL = this.documentEscapeListener) === null || _this$documentEscapeL === void 0 || _this$documentEscapeL.call(this);
		});
	}
	deactivate() {
		this.active = false;
		this.clearShowTimeout();
		const hideDelay = this.getOption("hideDelay");
		if (hideDelay) {
			this.clearHideTimeout();
			this.hideTimeout = setTimeout(() => {
				this.hide();
			}, hideDelay);
		} else this.hide();
		if (this.documentEscapeListener) this.documentEscapeListener();
	}
	create() {
		if (this.container) {
			this.clearHideTimeout();
			this.remove();
		}
		const container = Z("div", {
			id: this.getOption("id"),
			class: this.cx("root"),
			"p-bind": this.ptm("root"),
			"data-pc-section": "root"
		});
		const tooltipArrow = Z("div", {
			class: this.cx("arrow"),
			"p-bind": this.ptm("arrow"),
			"data-pc-section": "arrow"
		});
		const tooltipText = Z("div", {
			class: this.cx("text"),
			"p-bind": this.ptm("text"),
			"data-pc-section": "text"
		});
		container.setAttribute("role", "tooltip");
		container.appendChild(tooltipArrow);
		this.container = container;
		this.tooltipText = tooltipText;
		this.updateText();
		const positionStyle = this.getOption("positionStyle");
		if (positionStyle) container.style.position = positionStyle;
		container.appendChild(tooltipText);
		if (this.getOption("appendTo") === "body") this.$overlayParent(document.body, container).appendChild(container);
		else if (this.getOption("appendTo") === "target") Ct(container, this.el.nativeElement);
		else Ct(this.$overlayParent(this.getOption("appendTo"), container), container);
		container.style.display = "none";
		if (this.getOption("fitContent")) container.style.width = "fit-content";
		if (this.isAutoHide()) container.style.pointerEvents = "none";
		else {
			container.style.pointerEvents = "unset";
			this.bindContainerMouseleaveListener();
		}
	}
	bindContainerMouseleaveListener() {
		if (!this.containerMouseleaveListener && this.container) this.containerMouseleaveListener = this.renderer.listen(this.container, "mouseleave", () => {
			this.deactivate();
		});
	}
	unbindContainerMouseleaveListener() {
		if (this.containerMouseleaveListener) {
			this.containerMouseleaveListener();
			this.containerMouseleaveListener = null;
		}
	}
	show() {
		if (!this.getOption("tooltipLabel") || this.getOption("disabled")) return;
		this.create();
		const container = this.container;
		if (this.el.nativeElement.closest("p-dialog")) this.alignTimeout = setTimeout(() => {
			if (this.container) {
				this.container.style.display = "inline-block";
				this.align();
				if (!le()) this.fadeInCancel = kt(this.container, 250);
			}
		}, 100);
		else {
			container.style.display = "inline-block";
			this.align();
			if (!le()) this.fadeInCancel = kt(container, 250);
		}
		if (this.getOption("tooltipZIndex") === "auto") zindexutils_default.set("tooltip", container, this.config.zIndex.tooltip);
		else container.style.zIndex = String(this.getOption("tooltipZIndex"));
		this.bindDocumentResizeListener();
		this.bindScrollListener();
		const target = this.getTarget(this.el.nativeElement);
		if (target && !target.getAttribute("aria-describedby")) target.setAttribute("aria-describedby", container.id);
	}
	hide() {
		if (this.getOption("tooltipZIndex") === "auto") zindexutils_default.clear(this.container);
		this.remove();
	}
	updateText() {
		if (!this.tooltipText) return;
		const content = this.getOption("tooltipLabel");
		if (isTemplateRef(content)) {
			const embeddedViewRef = this.viewContainer.createEmbeddedView(content);
			embeddedViewRef.detectChanges();
			embeddedViewRef.rootNodes.forEach((node) => this.tooltipText.appendChild(node));
		} else if (this.getOption("escape")) {
			this.tooltipText.textContent = "";
			this.tooltipText.appendChild(document.createTextNode(content !== null && content !== void 0 ? content : ""));
		} else this.tooltipText.innerHTML = content !== null && content !== void 0 ? content : "";
	}
	align() {
		const position = this.getOption("tooltipPosition");
		const alignFns = {
			top: [
				this.alignTop,
				this.alignBottom,
				this.alignRight,
				this.alignLeft
			],
			bottom: [
				this.alignBottom,
				this.alignTop,
				this.alignRight,
				this.alignLeft
			],
			left: [
				this.alignLeft,
				this.alignRight,
				this.alignTop,
				this.alignBottom
			],
			right: [
				this.alignRight,
				this.alignLeft,
				this.alignTop,
				this.alignBottom
			]
		}[position] || [];
		for (let [index, alignmentFn] of alignFns.entries()) if (index === 0) alignmentFn.call(this);
		else if (this.isOutOfBounds()) alignmentFn.call(this);
		else break;
	}
	getHostOffset() {
		if (this.getOption("appendTo") === "body" || this.getOption("appendTo") === "target") {
			let offset = this.anchorElement.getBoundingClientRect();
			return {
				left: offset.left + V(),
				top: offset.top + j()
			};
		} else return {
			left: 0,
			top: 0
		};
	}
	get activeElement() {
		return this.el.nativeElement.nodeName.startsWith("P-") ? nt(this.el.nativeElement, this.psel(".p-component")) : this.el.nativeElement;
	}
	get anchorElement() {
		var _this$activeElement;
		const host = this.el.nativeElement;
		const { width, height } = host.getBoundingClientRect();
		return width === 0 && height === 0 ? (_this$activeElement = this.activeElement) !== null && _this$activeElement !== void 0 ? _this$activeElement : host : host;
	}
	alignRight() {
		this.preAlign("right");
		const el = this.activeElement;
		const offsetLeft = L(el);
		const offsetTop = (R(el) - R(this.container)) / 2;
		this.alignTooltip(offsetLeft, offsetTop);
		let arrowElement = this.getArrowElement();
		if (arrowElement) {
			arrowElement.style.top = "50%";
			arrowElement.style.right = "";
			arrowElement.style.bottom = "";
			arrowElement.style.left = "0";
		}
	}
	alignLeft() {
		this.preAlign("left");
		let arrowElement = this.getArrowElement();
		let offsetLeft = L(this.container);
		let offsetTop = (R(this.anchorElement) - R(this.container)) / 2;
		this.alignTooltip(-offsetLeft, offsetTop);
		if (arrowElement) {
			arrowElement.style.top = "50%";
			arrowElement.style.right = "0";
			arrowElement.style.bottom = "";
			arrowElement.style.left = "";
		}
	}
	alignTop() {
		this.preAlign("top");
		let arrowElement = this.getArrowElement();
		let hostOffset = this.getHostOffset();
		let elementWidth = L(this.container);
		let offsetLeft = (L(this.anchorElement) - L(this.container)) / 2;
		let offsetTop = R(this.container);
		this.alignTooltip(offsetLeft, -offsetTop);
		let elementRelativeCenter = hostOffset.left - this.getHostOffset().left + elementWidth / 2;
		if (arrowElement) {
			arrowElement.style.top = "";
			arrowElement.style.right = "";
			arrowElement.style.bottom = "0";
			arrowElement.style.left = elementRelativeCenter + "px";
		}
	}
	getArrowElement() {
		return nt(this.container, "[data-pc-section=\"arrow\"]");
	}
	alignBottom() {
		this.preAlign("bottom");
		let arrowElement = this.getArrowElement();
		let elementWidth = L(this.container);
		let hostOffset = this.getHostOffset();
		let offsetLeft = (L(this.anchorElement) - L(this.container)) / 2;
		let offsetTop = R(this.anchorElement);
		this.alignTooltip(offsetLeft, offsetTop);
		let elementRelativeCenter = hostOffset.left - this.getHostOffset().left + elementWidth / 2;
		if (arrowElement) {
			arrowElement.style.top = "0";
			arrowElement.style.right = "";
			arrowElement.style.bottom = "";
			arrowElement.style.left = elementRelativeCenter + "px";
		}
	}
	alignTooltip(offsetLeft, offsetTop) {
		var _this$getOption, _this$getOption2;
		let hostOffset = this.getHostOffset();
		let left = hostOffset.left + offsetLeft;
		let top = hostOffset.top + offsetTop;
		this.container.style.left = left + ((_this$getOption = this.getOption("positionLeft")) !== null && _this$getOption !== void 0 ? _this$getOption : 0) + "px";
		this.container.style.top = top + ((_this$getOption2 = this.getOption("positionTop")) !== null && _this$getOption2 !== void 0 ? _this$getOption2 : 0) + "px";
	}
	getOption(option) {
		return this._tooltipOptions()[option];
	}
	getTarget(el) {
		return D(el, this.pcn("p-inputwrapper")) ? nt(el, "input") : el;
	}
	preAlign(position) {
		var _this$cn, _this$ptm, _this$getOption3;
		this.container.style.left = "-999px";
		this.container.style.top = "-999px";
		this.container.className = (_this$cn = this.cn(this.cx("root"), (_this$ptm = this.ptm("root")) === null || _this$ptm === void 0 ? void 0 : _this$ptm.class, this.pcn("p-tooltip-" + position), (_this$getOption3 = this.getOption("tooltipStyleClass")) !== null && _this$getOption3 !== void 0 ? _this$getOption3 : "")) !== null && _this$cn !== void 0 ? _this$cn : "";
	}
	isOutOfBounds() {
		let offset = this.container.getBoundingClientRect();
		let targetTop = offset.top;
		let targetLeft = offset.left;
		let width = L(this.container);
		let height = R(this.container);
		let viewport = h();
		return targetLeft + width > viewport.width || targetLeft < 0 || targetTop < 0 || targetTop + height > viewport.height;
	}
	onWindowResize(e) {
		this.hide();
	}
	bindDocumentResizeListener() {
		const listener = this.onWindowResize.bind(this);
		this.resizeListener = listener;
		window.addEventListener("resize", listener);
	}
	unbindDocumentResizeListener() {
		if (this.resizeListener) {
			window.removeEventListener("resize", this.resizeListener);
			this.resizeListener = null;
		}
	}
	bindScrollListener() {
		if (!this.scrollHandler) this.scrollHandler = new ConnectedOverlayScrollHandler(this.el.nativeElement, () => {
			if (this.container) this.hide();
		});
		this.scrollHandler.bindScrollListener();
	}
	unbindScrollListener() {
		if (this.scrollHandler) this.scrollHandler.unbindScrollListener();
	}
	unbindEvents() {
		const tooltipEvent = this.getOption("tooltipEvent");
		if (tooltipEvent === "hover" || tooltipEvent === "both") {
			this.el.nativeElement.removeEventListener("mouseenter", this.mouseEnterListener);
			this.el.nativeElement.removeEventListener("mouseleave", this.mouseLeaveListener);
			this.el.nativeElement.removeEventListener("click", this.clickListener);
			this.el.nativeElement.removeEventListener("touchstart", this.touchStartListener);
			this.el.nativeElement.removeEventListener("touchend", this.touchEndListener);
			this.unbindDocumentTouchListener();
		}
		if (tooltipEvent === "focus" || tooltipEvent === "both") {
			let target = this.el.nativeElement.querySelector(this.psel(".p-component"));
			if (!target) target = this.getTarget(this.el.nativeElement);
			target.removeEventListener("focus", this.focusListener);
			target.removeEventListener("blur", this.blurListener);
		}
		this.unbindDocumentResizeListener();
	}
	remove() {
		var _this$fadeInCancel;
		const target = this.getTarget(this.el.nativeElement);
		if (this.container && (target === null || target === void 0 ? void 0 : target.getAttribute("aria-describedby")) === this.container.id) target.removeAttribute("aria-describedby");
		if (this.container && this.container.parentElement) {
			if (this.$styleScope.isolated && this.getOption("appendTo") !== "target") this.container.remove();
			else if (this.getOption("appendTo") === "body") document.body.removeChild(this.container);
			else if (this.getOption("appendTo") === "target") this.el.nativeElement.removeChild(this.container);
			else me(this.getOption("appendTo"), this.container);
		}
		this.unbindDocumentResizeListener();
		this.unbindScrollListener();
		this.unbindContainerMouseleaveListener();
		this.unbindDocumentTouchListener();
		this.clearTimeouts();
		(_this$fadeInCancel = this.fadeInCancel) === null || _this$fadeInCancel === void 0 || _this$fadeInCancel.call(this);
		this.fadeInCancel = null;
		this.container = null;
		this.scrollHandler = null;
	}
	clearShowTimeout() {
		if (this.showTimeout) {
			clearTimeout(this.showTimeout);
			this.showTimeout = null;
		}
	}
	clearHideTimeout() {
		if (this.hideTimeout) {
			clearTimeout(this.hideTimeout);
			this.hideTimeout = null;
		}
	}
	clearAlignTimeout() {
		if (this.alignTimeout) {
			clearTimeout(this.alignTimeout);
			this.alignTimeout = null;
		}
	}
	clearTimeouts() {
		this.clearShowTimeout();
		this.clearHideTimeout();
		this.clearAlignTimeout();
	}
	onDestroy() {
		this.unbindEvents();
		if (this.container) zindexutils_default.clear(this.container);
		this.remove();
		if (this.documentEscapeListener) this.documentEscapeListener();
	}
}, _defineProperty(_Tooltip, "ɵfac", function Tooltip_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _Tooltip)();
}), _defineProperty(_Tooltip, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _Tooltip,
	selectors: [[
		"",
		"pTooltip",
		""
	]],
	inputs: {
		tooltipPosition: [1, "tooltipPosition"],
		tooltipEvent: [1, "tooltipEvent"],
		positionStyle: [1, "positionStyle"],
		tooltipStyleClass: [1, "tooltipStyleClass"],
		tooltipZIndex: [1, "tooltipZIndex"],
		escape: [1, "escape"],
		showDelay: [1, "showDelay"],
		hideDelay: [1, "hideDelay"],
		life: [1, "life"],
		positionTop: [1, "positionTop"],
		positionLeft: [1, "positionLeft"],
		autoHide: [1, "autoHide"],
		fitContent: [1, "fitContent"],
		hideOnEscape: [1, "hideOnEscape"],
		showOnEllipsis: [1, "showOnEllipsis"],
		content: [
			1,
			"pTooltip",
			"content"
		],
		tooltipDisabled: [1, "tooltipDisabled"],
		tooltipOptions: [1, "tooltipOptions"],
		appendTo: [1, "appendTo"],
		pTooltipPT: [1, "pTooltipPT"],
		pTooltipUnstyled: [1, "pTooltipUnstyled"]
	},
	features: [ɵɵProvidersFeature([TooltipStyle, {
		provide: TOOLTIP_INSTANCE,
		useExisting: _Tooltip
	}]), ɵɵInheritDefinitionFeature]
})), _Tooltip);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Tooltip, [{
		type: Directive,
		args: [{
			selector: "[pTooltip]",
			standalone: true,
			providers: [TooltipStyle, {
				provide: TOOLTIP_INSTANCE,
				useExisting: Tooltip
			}]
		}]
	}], () => [], {
		tooltipPosition: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "tooltipPosition",
				required: false
			}]
		}],
		tooltipEvent: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "tooltipEvent",
				required: false
			}]
		}],
		positionStyle: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "positionStyle",
				required: false
			}]
		}],
		tooltipStyleClass: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "tooltipStyleClass",
				required: false
			}]
		}],
		tooltipZIndex: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "tooltipZIndex",
				required: false
			}]
		}],
		escape: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "escape",
				required: false
			}]
		}],
		showDelay: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "showDelay",
				required: false
			}]
		}],
		hideDelay: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "hideDelay",
				required: false
			}]
		}],
		life: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "life",
				required: false
			}]
		}],
		positionTop: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "positionTop",
				required: false
			}]
		}],
		positionLeft: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "positionLeft",
				required: false
			}]
		}],
		autoHide: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "autoHide",
				required: false
			}]
		}],
		fitContent: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "fitContent",
				required: false
			}]
		}],
		hideOnEscape: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "hideOnEscape",
				required: false
			}]
		}],
		showOnEllipsis: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "showOnEllipsis",
				required: false
			}]
		}],
		content: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pTooltip",
				required: false
			}]
		}],
		tooltipDisabled: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "tooltipDisabled",
				required: false
			}]
		}],
		tooltipOptions: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "tooltipOptions",
				required: false
			}]
		}],
		appendTo: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "appendTo",
				required: false
			}]
		}],
		pTooltipPT: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pTooltipPT",
				required: false
			}]
		}],
		pTooltipUnstyled: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pTooltipUnstyled",
				required: false
			}]
		}]
	});
})();
var TooltipModule = (_TooltipModule = class TooltipModule {}, _defineProperty(_TooltipModule, "ɵfac", function TooltipModule_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _TooltipModule)();
}), _defineProperty(_TooltipModule, "ɵmod", /*@__PURE__*/ ɵɵdefineNgModule({
	type: _TooltipModule,
	imports: [Tooltip, BindModule],
	exports: [Tooltip, BindModule]
})), _defineProperty(_TooltipModule, "ɵinj", /*@__PURE__*/ ɵɵdefineInjector({ imports: [BindModule, BindModule] })), _TooltipModule);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TooltipModule, [{
		type: NgModule,
		args: [{
			imports: [Tooltip, BindModule],
			exports: [Tooltip, BindModule]
		}]
	}], null, null);
})();
export { TooltipModule as n, Tooltip as t };
