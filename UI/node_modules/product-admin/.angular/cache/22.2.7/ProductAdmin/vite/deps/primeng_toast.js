import { $n as Output, A as contentChild, Al as ɵɵdefineInjectable, Ao as ɵɵgetCurrentView, Bl as ɵɵrestoreView, Bt as computed, Co as ɵɵelementStart, Da as ɵɵconditionalCreate, Dr as ViewEncapsulation, Es as ɵɵrepeaterTrackByIdentity, Fn as Injectable, Gs as ɵɵtemplate, Hs as ɵɵstyleProp, In as Input, Js as ɵɵtextInterpolate, O as booleanAttribute, Qo as ɵɵlistener, Rl as ɵɵnamespaceSVG, Sa as ɵɵclassMap, So as ɵɵelementEnd, Ta as ɵɵconditional, Tl as signal, Ts as ɵɵrepeaterCreate, Vs as ɵɵstyleMap, Wi as setClassMetadata, X as input, Ys as ɵɵtextInterpolate1, an as ChangeDetectionStrategy, ao as ɵɵdefineNgModule, at as output, bs as ɵɵqueryAdvance, ca as ɵɵInheritDefinitionFeature, cn as Component, da as ɵɵadvance, dl as inject, es as ɵɵnextContext, i as ContentChild, il as effect, jl as ɵɵdefineInjector, jo as ɵɵgetInheritedFactory, ka as ɵɵcontentQuerySignal, kc as InjectionToken, lo as ɵɵdomElement, ls as ɵɵproperty, qn as NgModule, qs as ɵɵtext, ro as ɵɵdefineComponent, rt as numberAttribute, sa as ɵɵHostDirectivesFeature, ua as ɵɵProvidersFeature, vo as ɵɵelement, ws as ɵɵrepeater, ya as ɵɵattribute, yo as ɵɵelementContainer, zl as ɵɵresetView } from "./core-BVpAqhZc.js";
import { C as p } from "./dist-D971aPsi.js";
import { MessageService, SharedModule } from "./primeng_api.js";
import { n as PARENT_INSTANCE, o as getShadowRoot, t as BaseComponent } from "./primeng-basecomponent-DFIxl5Fy.js";
import { kt as rt, mt as be } from "./dist-BnkFXv39.js";
import { Bind } from "./primeng_bind.js";
import { o as zindexutils_default } from "./primeng-utils-D5gG-ZJT.js";
import { s as BaseStyle } from "./primeng-config-EnOVMCIx.js";
import { Y as NgTemplateOutlet } from "./common-CYN6T7fr.js";
import { t as Check } from "./primeicons-angular-check-CIQ67GgB.js";
import { t as CoreIcon } from "./primeicons-angular-core-ei4boJ1b.js";
import { n as _objectSpread2, r as _defineProperty } from "./asyncToGenerator-CE9zIWF7.js";
import { t as Times } from "./primeicons-angular-times-DaT-3yJd.js";
import { n as MotionDirective, r as MotionModule } from "./primeng-motion-Dw02ysjU.js";
// ../node_modules/@primeuix/styles/dist/toast/index.mjs
var style = "\n    .p-toast {\n        width: dt('toast.width');\n        white-space: pre-line;\n        word-break: break-word;\n    }\n\n    .p-toast-message {\n        --px-offset-y: calc(var(--px-swipe-amount-y) + (var(--px-toast-offset) + var(--px-toast-index) * var(--px-gap)) * var(--px-raise-factor));\n        --px-offset-x: var(--px-swipe-amount-x);\n        width: 100%;\n        outline: none;\n        position: absolute;\n        touch-action: none;\n        opacity: 0;\n        transform: translateX(var(--px-offset-x)) translateY(calc(100% * var(--px-raise-factor) * -1));\n        z-index: var(--px-toast-z-index);\n        transition: transform dt('toast.transition.duration'), opacity dt('toast.transition.duration'), height dt('toast.transition.duration');\n    }\n\n    .p-toast-message:focus-visible {\n        box-shadow: dt('toast.focus.ring.shadow');\n        outline: dt('toast.focus.ring.width') dt('toast.focus.ring.style') dt('focus.ring.color');\n        outline-offset: dt('toast.focus.ring.offset');\n    }\n\n    .p-toast-message[data-mounted] {\n        opacity: 1;\n        transform: translateY(0);\n    }\n\n    .p-toast-message:not([data-expanded]):not([data-front]) {\n        overflow: hidden;\n        height: var(--px-front-toast-height);\n        transform: translateX(var(--px-offset-x)) translateY(calc(var(--px-raise-factor) * var(--px-toast-index) * var(--px-gap))) scale(calc(var(--px-toast-index) * -0.05 + 1));\n    }\n\n    .p-toast-message[data-mounted][data-expanded] {\n        height: var(--px-initial-height);\n        transform: translateX(var(--px-offset-x)) translateY(var(--px-offset-y));\n    }\n\n    .p-toast-message[data-expanded]::after {\n        content: \"\";\n        position: absolute;\n        left: 0;\n        height: calc(var(--px-gap) + 1px);\n        width: 100%;\n        bottom: 100%;\n    }\n\n    .p-toast-message:not([data-visible]) {\n        opacity: 0;\n        pointer-events: none;\n        user-select: none;\n    }\n\n    .p-toast-message[data-removed][data-front]:not([data-swipe-out]) {\n        opacity: 0;\n        transform: translateX(var(--px-offset-x)) translateY(calc(var(--px-raise-factor) * -100%));\n    }\n\n    .p-toast-message[data-removed]:not([data-front]):not([data-swipe-out])[data-expanded] {\n        opacity: 0;\n        transform: translateX(var(--px-offset-x)) translateY(calc((var(--px-offset-y)) + (var(--px-raise-factor) * -100%)));\n    }\n\n    .p-toast-message[data-removed]:not([data-front]):not([data-swipe-out]):not([data-expanded]) {\n        opacity: 0;\n        transform: translateX(var(--px-offset-x)) translateY(calc(var(--px-raise-factor) * 40% * -1));\n        transition:\n            transform 500ms,\n            opacity 200ms;\n    }\n\n    .p-toast-message[data-swiping] {\n        transition: none;\n        transform: translateX(var(--px-offset-x)) translateY(var(--px-offset-y)) !important;\n    }\n\n    .p-toast-message[data-swiped] {\n        -webkit-user-select: none;\n        user-select: none;\n    }\n\n    .p-toast-message[data-swipe-out][data-swipe-direction=\"up\"] {\n        opacity: 0;\n        transform: translateX(var(--px-offset-x)) translateY(calc(var(--px-offset-y) - 100%)) !important;\n    }\n\n    .p-toast-message[data-swipe-out][data-swipe-direction=\"down\"] {\n        opacity: 0;\n        transform: translateX(var(--px-offset-x)) translateY(calc(var(--px-offset-y) + 100%)) !important;\n    }\n\n    .p-toast-message[data-swipe-out][data-swipe-direction=\"left\"] {\n        opacity: 0;\n        transform: translateX(calc(var(--px-offset-x) - 100%)) translateY(var(--px-offset-y)) !important;\n    }\n\n    .p-toast-message[data-swipe-out][data-swipe-direction=\"right\"] {\n        opacity: 0;\n        transform: translateX(calc(var(--px-offset-x) + 100%)) translateY(var(--px-offset-y)) !important;\n        transition:\n            transform 500ms,\n            opacity 200ms;\n    }\n\n    .p-toast-message-icon,\n    .p-toast-message-icon svg,\n    .p-toast-message-icon i {\n        flex-shrink: 0;\n        font-size: dt('toast.icon.size');\n        width: dt('toast.icon.size');\n        height: dt('toast.icon.size');\n        margin: dt('toast.icon.margin');\n    }\n\n    .p-toast-message-content {\n        display: flex;\n        align-items: flex-start;\n        padding: dt('toast.content.padding');\n        gap: dt('toast.content.gap');\n        min-height: 0;\n        overflow: hidden;\n        transition: padding 250ms ease-in;\n    }\n\n    .p-toast-message-text {\n        flex: 1 1 auto;\n        display: flex;\n        flex-direction: column;\n        gap: dt('toast.text.gap');\n    }\n\n    .p-toast-summary {\n        font-weight: dt('toast.summary.font.weight');\n        font-size: dt('toast.summary.font.size');\n    }\n\n    .p-toast-detail {\n        font-weight: dt('toast.detail.font.weight');\n        font-size: dt('toast.detail.font.size');\n    }\n\n    .p-toast-close-button {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        overflow: hidden;\n        position: absolute;\n        cursor: pointer;\n        background: transparent;\n        transition:\n            background dt('toast.transition.duration'),\n            color dt('toast.transition.duration'),\n            outline-color dt('toast.transition.duration'),\n            box-shadow dt('toast.transition.duration');\n        outline-color: transparent;\n        color: inherit;\n        width: dt('toast.close.button.width');\n        height: dt('toast.close.button.height');\n        border-radius: dt('toast.close.button.border.radius');\n        margin: 0;\n        top: 0.25rem;\n        right: 0.25rem;\n        padding: 0;\n        border: none;\n        user-select: none;\n    }\n\n    .p-toast-close-button:dir(rtl) {\n        left: 0.25rem;\n        right: auto;\n    }\n\n    .p-toast-message-normal,\n    .p-toast-message-info,\n    .p-toast-message-success,\n    .p-toast-message-warn,\n    .p-toast-message-error,\n    .p-toast-message-secondary,\n    .p-toast-message-contrast {\n        border-width: dt('toast.border.width');\n        border-style: solid;\n        backdrop-filter: blur(dt('toast.blur'));\n        border-radius: dt('toast.border.radius');\n    }\n\n    .p-toast-close-icon,\n    .p-toast-close-icon svg,\n    .p-toast-close-icon i {\n        font-size: dt('toast.close.icon.size');\n        width: dt('toast.close.icon.size');\n        height: dt('toast.close.icon.size');\n    }\n\n    .p-toast-close-button:focus-visible {\n        outline-width: dt('focus.ring.width');\n        outline-style: dt('focus.ring.style');\n        outline-offset: dt('focus.ring.offset');\n    }\n\n    .p-toast-message-normal {\n        background: dt('toast.normal.background');\n        border-color: dt('toast.normal.border.color');\n        color: dt('toast.normal.color');\n        box-shadow: dt('toast.normal.shadow');\n    }\n\n    .p-toast-message-normal .p-toast-detail {\n        color: dt('toast.normal.detail.color');\n    }\n\n    .p-toast-message-normal .p-toast-close-button:focus-visible {\n        outline-color: dt('toast.normal.close.button.focus.ring.color');\n        box-shadow: dt('toast.normal.close.button.focus.ring.shadow');\n    }\n\n    .p-toast-message-normal .p-toast-close-button:hover {\n        background: dt('toast.normal.close.button.hover.background');\n    }\n\n    .p-toast-message-info {\n        background: dt('toast.info.background');\n        border-color: dt('toast.info.border.color');\n        color: dt('toast.info.color');\n        box-shadow: dt('toast.info.shadow');\n    }\n\n    .p-toast-message-info .p-toast-detail {\n        color: dt('toast.info.detail.color');\n    }\n\n    .p-toast-message-info .p-toast-close-button:focus-visible {\n        outline-color: dt('toast.info.close.button.focus.ring.color');\n        box-shadow: dt('toast.info.close.button.focus.ring.shadow');\n    }\n\n    .p-toast-message-info .p-toast-close-button:hover {\n        background: dt('toast.info.close.button.hover.background');\n    }\n\n    .p-toast-message-success {\n        background: dt('toast.success.background');\n        border-color: dt('toast.success.border.color');\n        color: dt('toast.success.color');\n        box-shadow: dt('toast.success.shadow');\n    }\n\n    .p-toast-message-success .p-toast-detail {\n        color: dt('toast.success.detail.color');\n    }\n\n    .p-toast-message-success .p-toast-close-button:focus-visible {\n        outline-color: dt('toast.success.close.button.focus.ring.color');\n        box-shadow: dt('toast.success.close.button.focus.ring.shadow');\n    }\n\n    .p-toast-message-success .p-toast-close-button:hover {\n        background: dt('toast.success.close.button.hover.background');\n    }\n\n    .p-toast-message-warn {\n        background: dt('toast.warn.background');\n        border-color: dt('toast.warn.border.color');\n        color: dt('toast.warn.color');\n        box-shadow: dt('toast.warn.shadow');\n    }\n\n    .p-toast-message-warn .p-toast-detail {\n        color: dt('toast.warn.detail.color');\n    }\n\n    .p-toast-message-warn .p-toast-close-button:focus-visible {\n        outline-color: dt('toast.warn.close.button.focus.ring.color');\n        box-shadow: dt('toast.warn.close.button.focus.ring.shadow');\n    }\n\n    .p-toast-message-warn .p-toast-close-button:hover {\n        background: dt('toast.warn.close.button.hover.background');\n    }\n\n    .p-toast-message-error {\n        background: dt('toast.error.background');\n        border-color: dt('toast.error.border.color');\n        color: dt('toast.error.color');\n        box-shadow: dt('toast.error.shadow');\n    }\n\n    .p-toast-message-error .p-toast-detail {\n        color: dt('toast.error.detail.color');\n    }\n\n    .p-toast-message-error .p-toast-close-button:focus-visible {\n        outline-color: dt('toast.error.close.button.focus.ring.color');\n        box-shadow: dt('toast.error.close.button.focus.ring.shadow');\n    }\n\n    .p-toast-message-error .p-toast-close-button:hover {\n        background: dt('toast.error.close.button.hover.background');\n    }\n\n    .p-toast-message-secondary {\n        background: dt('toast.secondary.background');\n        border-color: dt('toast.secondary.border.color');\n        color: dt('toast.secondary.color');\n        box-shadow: dt('toast.secondary.shadow');\n    }\n\n    .p-toast-message-secondary .p-toast-detail {\n        color: dt('toast.secondary.detail.color');\n    }\n\n    .p-toast-message-secondary .p-toast-close-button:focus-visible {\n        outline-color: dt('toast.secondary.close.button.focus.ring.color');\n        box-shadow: dt('toast.secondary.close.button.focus.ring.shadow');\n    }\n\n    .p-toast-message-secondary .p-toast-close-button:hover {\n        background: dt('toast.secondary.close.button.hover.background');\n    }\n\n    .p-toast-message-contrast {\n        background: dt('toast.contrast.background');\n        border-color: dt('toast.contrast.border.color');\n        color: dt('toast.contrast.color');\n        box-shadow: dt('toast.contrast.shadow');\n    }\n    \n    .p-toast-message-contrast .p-toast-detail {\n        color: dt('toast.contrast.detail.color');\n    }\n\n    .p-toast-message-contrast .p-toast-close-button:focus-visible {\n        outline-color: dt('toast.contrast.close.button.focus.ring.color');\n        box-shadow: dt('toast.contrast.close.button.focus.ring.shadow');\n    }\n\n    .p-toast-message-contrast .p-toast-close-button:hover {\n        background: dt('toast.contrast.close.button.hover.background');\n    }\n\n    .p-toast {\n        position: fixed;\n        width: 18.75rem;\n        z-index: 2000;\n    }\n\n    .p-toast-center {\n        left: 50%;\n        transform: translateX(-50%) translateY(-50%);\n        top: 50%;\n    }\n\n    .p-toast-bottom-right {\n        right: 2rem;\n        bottom: 2rem;\n    }\n\n    .p-toast-bottom-center {\n        bottom: 2rem;\n        left: 50%;\n        transform: translateX(-50%);\n    }\n\n    .p-toast-bottom-left {\n        left: 2rem;\n        bottom: 2rem;\n    }\n\n    .p-toast-top-right {\n        right: 2rem;\n        top: 2rem;\n    }\n\n    .p-toast-top-center {\n        left: 50%;\n        transform: translateX(-50%);\n        top: 2rem;\n    }\n\n    .p-toast-top-left {\n        left: 2rem;\n        top: 2rem;\n    }\n\n    .p-toast-bottom-right .p-toast-message{\n        --px-raise-factor: -1;\n        bottom: 0;\n        right: 0;\n    }\n\n    .p-toast-bottom-center .p-toast-message{\n        --px-raise-factor: -1;\n        bottom: 0;\n    }\n\n    .p-toast[data-position=\"bottom-left\"] .p-toast-message{\n        --px-raise-factor: -1;\n        bottom: 0;\n        left: 0;\n    }\n\n    .p-toast[data-position=\"top-right\"] .p-toast-message{\n        --px-raise-factor: 1;\n        top: 0;\n        right: 0;\n    }\n\n    .p-toast[data-position=\"top-center\"] .p-toast-message{\n        --px-raise-factor: 1;\n        top: 0;\n    }\n\n    .p-toast[data-position=\"top-left\"] .p-toast-message{\n        --px-raise-factor: 1;\n        top: 0;\n        left: 0;\n    }\n\n    .p-toast[data-position=\"center\"] .p-toast-message{\n        --px-raise-factor: 1;\n        top: 0;\n    }\n";
// ../node_modules/@primeicons/core/dist/esm/icons/exclamation-triangle.mjs
var t = {
	name: "exclamation-triangle",
	meta: { tags: [
		"exclamation-triangle",
		"warning",
		"alert",
		"danger",
		"caution"
	] },
	svg: {
		xmlns: "http://www.w3.org/2000/svg",
		width: 20,
		height: 20,
		viewBox: "0 0 20 20",
		fill: "none"
	},
	nodes: [["path", {
		d: "M10 2.25C10.2691 2.25005 10.5179 2.39429 10.6514 2.62793L18.6514 16.6279C18.7839 16.8599 18.7825 17.1448 18.6485 17.376C18.5143 17.6072 18.2673 17.75 18 17.75H2C1.73266 17.75 1.48576 17.6072 1.35156 17.376C1.21753 17.1448 1.21609 16.86 1.34863 16.6279L9.34864 2.62793C9.48218 2.39428 9.73089 2.25 10 2.25ZM3.29297 16.25H16.7071L10 4.51172L3.29297 16.25ZM10 13.25C10.4142 13.2501 10.75 13.5858 10.75 14V14.5C10.75 14.9142 10.4142 15.2499 10 15.25C9.5858 15.25 9.25001 14.9142 9.25001 14.5V14C9.25001 13.5858 9.5858 13.25 10 13.25ZM10 7.25C10.4142 7.25007 10.75 7.58583 10.75 8V11.5C10.75 11.9142 10.4142 12.2499 10 12.25C9.5858 12.25 9.25001 11.9142 9.25001 11.5V8C9.25001 7.58579 9.5858 7.25 10 7.25Z",
		fill: "currentColor",
		key: "dk1648"
	}]]
};
// ../node_modules/@primeicons/angular/fesm2022/primeicons-angular-exclamation-triangle.mjs
var _ExclamationTriangle;
var ExclamationTriangle = class extends CoreIcon {
	constructor() {
		super();
		this._icon = t;
	}
};
_ExclamationTriangle = ExclamationTriangle;
_defineProperty(ExclamationTriangle, "ɵfac", function ExclamationTriangle_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _ExclamationTriangle)();
});
_defineProperty(ExclamationTriangle, "ɵcmp", (function() {
	const _forTrack0 = ($index, $item) => $item[1]["key"] || $index;
	function ExclamationTriangle_For_1_Case_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "path");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("d", node_r1[1]["d"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("fill-rule", node_r1[1]["fillRule"])("clip-rule", node_r1[1]["clipRule"])("stroke", node_r1[1]["stroke"])("stroke-width", node_r1[1]["strokeWidth"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function ExclamationTriangle_For_1_Case_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "circle");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("r", node_r1[1]["r"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function ExclamationTriangle_For_1_Case_2_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "rect");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x", node_r1[1]["x"])("y", node_r1[1]["y"])("width", node_r1[1]["width"])("height", node_r1[1]["height"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function ExclamationTriangle_For_1_Case_3_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "line");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x1", node_r1[1]["x1"])("y1", node_r1[1]["y1"])("x2", node_r1[1]["x2"])("y2", node_r1[1]["y2"])("stroke", node_r1[1]["stroke"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function ExclamationTriangle_For_1_Case_4_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polyline");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function ExclamationTriangle_For_1_Case_5_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polygon");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function ExclamationTriangle_For_1_Case_6_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "ellipse");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function ExclamationTriangle_For_1_Template(rf, ctx) {
		if (rf & 1) ɵɵconditionalCreate(0, ExclamationTriangle_For_1_Case_0_Template, 1, 9, "path")(1, ExclamationTriangle_For_1_Case_1_Template, 1, 6, "circle")(2, ExclamationTriangle_For_1_Case_2_Template, 1, 9, "rect")(3, ExclamationTriangle_For_1_Case_3_Template, 1, 7, "line")(4, ExclamationTriangle_For_1_Case_4_Template, 1, 4, "polyline")(5, ExclamationTriangle_For_1_Case_5_Template, 1, 4, "polygon")(6, ExclamationTriangle_For_1_Case_6_Template, 1, 7, "ellipse");
		if (rf & 2) {
			let tmp_10_0 = void 0;
			const node_r1 = ctx.$implicit;
			ɵɵconditional((tmp_10_0 = node_r1[0]) === "path" ? 0 : tmp_10_0 === "circle" ? 1 : tmp_10_0 === "rect" ? 2 : tmp_10_0 === "line" ? 3 : tmp_10_0 === "polyline" ? 4 : tmp_10_0 === "polygon" ? 5 : tmp_10_0 === "ellipse" ? 6 : -1);
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _ExclamationTriangle,
		selectors: [[
			"svg",
			"data-p-icon",
			"exclamation-triangle"
		]],
		features: [ɵɵInheritDefinitionFeature],
		decls: 2,
		vars: 0,
		template: function ExclamationTriangle_Template(rf, ctx) {
			if (rf & 1) ɵɵrepeaterCreate(0, ExclamationTriangle_For_1_Template, 7, 1, null, null, _forTrack0);
			if (rf & 2) ɵɵrepeater(ctx.iconNodes());
		},
		encapsulation: 2,
		changeDetection: 1
	});
})());
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExclamationTriangle, [{
		type: Component,
		args: [{
			selector: "svg[data-p-icon=\"exclamation-triangle\"]",
			standalone: true,
			template: "\n        @for (node of iconNodes(); track node[1]['key'] || $index) {\n            @switch (node[0]) {\n                @case ('path') {\n                    <svg:path\n                        [attr.d]=\"node[1]['d']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.fill-rule]=\"node[1]['fillRule']\"\n                        [attr.clip-rule]=\"node[1]['clipRule']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-width]=\"node[1]['strokeWidth']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('circle') {\n                    <svg:circle\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.r]=\"node[1]['r']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('rect') {\n                    <svg:rect\n                        [attr.x]=\"node[1]['x']\"\n                        [attr.y]=\"node[1]['y']\"\n                        [attr.width]=\"node[1]['width']\"\n                        [attr.height]=\"node[1]['height']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('line') {\n                    <svg:line\n                        [attr.x1]=\"node[1]['x1']\"\n                        [attr.y1]=\"node[1]['y1']\"\n                        [attr.x2]=\"node[1]['x2']\"\n                        [attr.y2]=\"node[1]['y2']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polyline') {\n                    <svg:polyline\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polygon') {\n                    <svg:polygon\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('ellipse') {\n                    <svg:ellipse\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n            }\n        }\n"
		}]
	}], () => [], null);
})();
// ../node_modules/@primeicons/core/dist/esm/icons/info-circle.mjs
var o = {
	name: "info-circle",
	meta: { tags: [
		"info-circle",
		"information",
		"help",
		"details"
	] },
	svg: {
		xmlns: "http://www.w3.org/2000/svg",
		width: 20,
		height: 20,
		viewBox: "0 0 20 20",
		fill: "none"
	},
	nodes: [["path", {
		d: "M10 1C14.9706 1 19 5.02944 19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1ZM10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5ZM10 8.25C10.4142 8.25 10.75 8.58579 10.75 9V14C10.75 14.4142 10.4142 14.75 10 14.75C9.58579 14.75 9.25 14.4142 9.25 14V9C9.25 8.58579 9.58579 8.25 10 8.25ZM10 5.25C10.4142 5.25 10.75 5.58579 10.75 6V6.5C10.75 6.91421 10.4142 7.25 10 7.25C9.58579 7.25 9.25 6.91421 9.25 6.5V6C9.25 5.58579 9.58579 5.25 10 5.25Z",
		fill: "currentColor",
		key: "l9ro38"
	}]]
};
// ../node_modules/@primeicons/angular/fesm2022/primeicons-angular-info-circle.mjs
var _InfoCircle;
var InfoCircle = class extends CoreIcon {
	constructor() {
		super();
		this._icon = o;
	}
};
_InfoCircle = InfoCircle;
_defineProperty(InfoCircle, "ɵfac", function InfoCircle_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _InfoCircle)();
});
_defineProperty(InfoCircle, "ɵcmp", (function() {
	const _forTrack0 = ($index, $item) => $item[1]["key"] || $index;
	function InfoCircle_For_1_Case_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "path");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("d", node_r1[1]["d"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("fill-rule", node_r1[1]["fillRule"])("clip-rule", node_r1[1]["clipRule"])("stroke", node_r1[1]["stroke"])("stroke-width", node_r1[1]["strokeWidth"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function InfoCircle_For_1_Case_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "circle");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("r", node_r1[1]["r"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function InfoCircle_For_1_Case_2_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "rect");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x", node_r1[1]["x"])("y", node_r1[1]["y"])("width", node_r1[1]["width"])("height", node_r1[1]["height"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function InfoCircle_For_1_Case_3_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "line");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x1", node_r1[1]["x1"])("y1", node_r1[1]["y1"])("x2", node_r1[1]["x2"])("y2", node_r1[1]["y2"])("stroke", node_r1[1]["stroke"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function InfoCircle_For_1_Case_4_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polyline");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function InfoCircle_For_1_Case_5_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polygon");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function InfoCircle_For_1_Case_6_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "ellipse");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function InfoCircle_For_1_Template(rf, ctx) {
		if (rf & 1) ɵɵconditionalCreate(0, InfoCircle_For_1_Case_0_Template, 1, 9, "path")(1, InfoCircle_For_1_Case_1_Template, 1, 6, "circle")(2, InfoCircle_For_1_Case_2_Template, 1, 9, "rect")(3, InfoCircle_For_1_Case_3_Template, 1, 7, "line")(4, InfoCircle_For_1_Case_4_Template, 1, 4, "polyline")(5, InfoCircle_For_1_Case_5_Template, 1, 4, "polygon")(6, InfoCircle_For_1_Case_6_Template, 1, 7, "ellipse");
		if (rf & 2) {
			let tmp_10_0 = void 0;
			const node_r1 = ctx.$implicit;
			ɵɵconditional((tmp_10_0 = node_r1[0]) === "path" ? 0 : tmp_10_0 === "circle" ? 1 : tmp_10_0 === "rect" ? 2 : tmp_10_0 === "line" ? 3 : tmp_10_0 === "polyline" ? 4 : tmp_10_0 === "polygon" ? 5 : tmp_10_0 === "ellipse" ? 6 : -1);
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _InfoCircle,
		selectors: [[
			"svg",
			"data-p-icon",
			"info-circle"
		]],
		features: [ɵɵInheritDefinitionFeature],
		decls: 2,
		vars: 0,
		template: function InfoCircle_Template(rf, ctx) {
			if (rf & 1) ɵɵrepeaterCreate(0, InfoCircle_For_1_Template, 7, 1, null, null, _forTrack0);
			if (rf & 2) ɵɵrepeater(ctx.iconNodes());
		},
		encapsulation: 2,
		changeDetection: 1
	});
})());
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InfoCircle, [{
		type: Component,
		args: [{
			selector: "svg[data-p-icon=\"info-circle\"]",
			standalone: true,
			template: "\n        @for (node of iconNodes(); track node[1]['key'] || $index) {\n            @switch (node[0]) {\n                @case ('path') {\n                    <svg:path\n                        [attr.d]=\"node[1]['d']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.fill-rule]=\"node[1]['fillRule']\"\n                        [attr.clip-rule]=\"node[1]['clipRule']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-width]=\"node[1]['strokeWidth']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('circle') {\n                    <svg:circle\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.r]=\"node[1]['r']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('rect') {\n                    <svg:rect\n                        [attr.x]=\"node[1]['x']\"\n                        [attr.y]=\"node[1]['y']\"\n                        [attr.width]=\"node[1]['width']\"\n                        [attr.height]=\"node[1]['height']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('line') {\n                    <svg:line\n                        [attr.x1]=\"node[1]['x1']\"\n                        [attr.y1]=\"node[1]['y1']\"\n                        [attr.x2]=\"node[1]['x2']\"\n                        [attr.y2]=\"node[1]['y2']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polyline') {\n                    <svg:polyline\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polygon') {\n                    <svg:polygon\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('ellipse') {\n                    <svg:ellipse\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n            }\n        }\n"
		}]
	}], () => [], null);
})();
// ../node_modules/@primeicons/core/dist/esm/icons/times-circle.mjs
var e = {
	name: "times-circle",
	meta: { tags: [
		"times-circle",
		"close",
		"cancel",
		"delete",
		"times"
	] },
	svg: {
		xmlns: "http://www.w3.org/2000/svg",
		width: 20,
		height: 20,
		viewBox: "0 0 20 20",
		fill: "none"
	},
	nodes: [["path", {
		d: "M10 1C14.9706 1 19 5.02944 19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1ZM10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5ZM12.4697 6.46973C12.7626 6.17683 13.2374 6.17683 13.5303 6.46973C13.8232 6.76262 13.8232 7.23738 13.5303 7.53027L11.0605 10L13.5303 12.4697C13.8232 12.7626 13.8232 13.2374 13.5303 13.5303C13.2374 13.8232 12.7626 13.8232 12.4697 13.5303L10 11.0605L7.53027 13.5303C7.23738 13.8232 6.76262 13.8232 6.46973 13.5303C6.17683 13.2374 6.17683 12.7626 6.46973 12.4697L8.93945 10L6.46973 7.53027C6.17683 7.23738 6.17683 6.76262 6.46973 6.46973C6.76262 6.17683 7.23738 6.17683 7.53027 6.46973L10 8.93945L12.4697 6.46973Z",
		fill: "currentColor",
		key: "8rdmue"
	}]]
};
// ../node_modules/@primeicons/angular/fesm2022/primeicons-angular-times-circle.mjs
var _TimesCircle;
var TimesCircle = class extends CoreIcon {
	constructor() {
		super();
		this._icon = e;
	}
};
_TimesCircle = TimesCircle;
_defineProperty(TimesCircle, "ɵfac", function TimesCircle_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _TimesCircle)();
});
_defineProperty(TimesCircle, "ɵcmp", (function() {
	const _forTrack0 = ($index, $item) => $item[1]["key"] || $index;
	function TimesCircle_For_1_Case_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "path");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("d", node_r1[1]["d"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("fill-rule", node_r1[1]["fillRule"])("clip-rule", node_r1[1]["clipRule"])("stroke", node_r1[1]["stroke"])("stroke-width", node_r1[1]["strokeWidth"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function TimesCircle_For_1_Case_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "circle");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("r", node_r1[1]["r"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function TimesCircle_For_1_Case_2_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "rect");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x", node_r1[1]["x"])("y", node_r1[1]["y"])("width", node_r1[1]["width"])("height", node_r1[1]["height"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function TimesCircle_For_1_Case_3_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "line");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x1", node_r1[1]["x1"])("y1", node_r1[1]["y1"])("x2", node_r1[1]["x2"])("y2", node_r1[1]["y2"])("stroke", node_r1[1]["stroke"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function TimesCircle_For_1_Case_4_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polyline");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function TimesCircle_For_1_Case_5_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polygon");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function TimesCircle_For_1_Case_6_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "ellipse");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function TimesCircle_For_1_Template(rf, ctx) {
		if (rf & 1) ɵɵconditionalCreate(0, TimesCircle_For_1_Case_0_Template, 1, 9, "path")(1, TimesCircle_For_1_Case_1_Template, 1, 6, "circle")(2, TimesCircle_For_1_Case_2_Template, 1, 9, "rect")(3, TimesCircle_For_1_Case_3_Template, 1, 7, "line")(4, TimesCircle_For_1_Case_4_Template, 1, 4, "polyline")(5, TimesCircle_For_1_Case_5_Template, 1, 4, "polygon")(6, TimesCircle_For_1_Case_6_Template, 1, 7, "ellipse");
		if (rf & 2) {
			let tmp_10_0 = void 0;
			const node_r1 = ctx.$implicit;
			ɵɵconditional((tmp_10_0 = node_r1[0]) === "path" ? 0 : tmp_10_0 === "circle" ? 1 : tmp_10_0 === "rect" ? 2 : tmp_10_0 === "line" ? 3 : tmp_10_0 === "polyline" ? 4 : tmp_10_0 === "polygon" ? 5 : tmp_10_0 === "ellipse" ? 6 : -1);
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _TimesCircle,
		selectors: [[
			"svg",
			"data-p-icon",
			"times-circle"
		]],
		features: [ɵɵInheritDefinitionFeature],
		decls: 2,
		vars: 0,
		template: function TimesCircle_Template(rf, ctx) {
			if (rf & 1) ɵɵrepeaterCreate(0, TimesCircle_For_1_Template, 7, 1, null, null, _forTrack0);
			if (rf & 2) ɵɵrepeater(ctx.iconNodes());
		},
		encapsulation: 2,
		changeDetection: 1
	});
})());
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TimesCircle, [{
		type: Component,
		args: [{
			selector: "svg[data-p-icon=\"times-circle\"]",
			standalone: true,
			template: "\n        @for (node of iconNodes(); track node[1]['key'] || $index) {\n            @switch (node[0]) {\n                @case ('path') {\n                    <svg:path\n                        [attr.d]=\"node[1]['d']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.fill-rule]=\"node[1]['fillRule']\"\n                        [attr.clip-rule]=\"node[1]['clipRule']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-width]=\"node[1]['strokeWidth']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('circle') {\n                    <svg:circle\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.r]=\"node[1]['r']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('rect') {\n                    <svg:rect\n                        [attr.x]=\"node[1]['x']\"\n                        [attr.y]=\"node[1]['y']\"\n                        [attr.width]=\"node[1]['width']\"\n                        [attr.height]=\"node[1]['height']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('line') {\n                    <svg:line\n                        [attr.x1]=\"node[1]['x1']\"\n                        [attr.y1]=\"node[1]['y1']\"\n                        [attr.x2]=\"node[1]['x2']\"\n                        [attr.y2]=\"node[1]['y2']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polyline') {\n                    <svg:polyline\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polygon') {\n                    <svg:polygon\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('ellipse') {\n                    <svg:ellipse\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n            }\n        }\n"
		}]
	}], () => [], null);
})();
// ../node_modules/primeng/fesm2022/primeng-toast.mjs
var _ToastStyle;
var _ToastItem;
var _Toast;
var _ToastModule;
var inlineStyles = { root: ({ instance }) => {
	const position = instance.position();
	return {
		position: "fixed",
		top: position === "top-right" || position === "top-left" || position === "top-center" ? "20px" : position === "center" ? "50%" : null,
		right: position === "top-right" || position === "bottom-right" ? "20px" : null,
		bottom: position === "bottom-left" || position === "bottom-right" || position === "bottom-center" ? "20px" : null,
		left: position === "top-left" || position === "bottom-left" ? "20px" : position === "center" || position === "top-center" || position === "bottom-center" ? "50%" : null
	};
} };
var classes = {
	root: ({ instance }) => ["p-toast p-component", `p-toast-${instance.position()}`],
	message: ({ instance }) => ({
		"p-toast-message": true,
		"p-toast-message-normal": instance.message().severity === "normal" || instance.message().severity === void 0,
		"p-toast-message-info": instance.message().severity === "info",
		"p-toast-message-warn": instance.message().severity === "warn",
		"p-toast-message-error": instance.message().severity === "error",
		"p-toast-message-success": instance.message().severity === "success",
		"p-toast-message-secondary": instance.message().severity === "secondary",
		"p-toast-message-contrast": instance.message().severity === "contrast"
	}),
	messageContent: "p-toast-message-content",
	messageIcon: ({ instance }) => ({
		"p-toast-message-icon": true,
		pi: !!instance.message().icon
	}),
	messageText: "p-toast-message-text",
	summary: "p-toast-summary",
	detail: "p-toast-detail",
	closeButton: "p-toast-close-button",
	closeIcon: ({ instance }) => ({
		"p-toast-close-icon": true,
		pi: !!instance.message().closeIcon
	})
};
var ToastStyle = (_ToastStyle = class ToastStyle extends BaseStyle {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "name", "toast");
		_defineProperty(this, "style", style);
		_defineProperty(this, "classes", classes);
		_defineProperty(this, "inlineStyles", inlineStyles);
	}
}, _defineProperty(_ToastStyle, "ɵfac", /*@__PURE__*/ (() => {
	let ɵToastStyle_BaseFactory = void 0;
	return function ToastStyle_Factory(__ngFactoryType__) {
		return (ɵToastStyle_BaseFactory || (ɵToastStyle_BaseFactory = ɵɵgetInheritedFactory(_ToastStyle)))(__ngFactoryType__ || _ToastStyle);
	};
})()), _defineProperty(_ToastStyle, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _ToastStyle,
	factory: _ToastStyle.ɵfac
})), _ToastStyle);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastStyle, [{ type: Injectable }], null, null);
})();
var ToastClasses;
(function(ToastClasses) {
	ToastClasses["root"] = "p-toast";
	ToastClasses["message"] = "p-toast-message";
	ToastClasses["messageContent"] = "p-toast-message-content";
	ToastClasses["messageIcon"] = "p-toast-message-icon";
	ToastClasses["messageText"] = "p-toast-message-text";
	ToastClasses["summary"] = "p-toast-summary";
	ToastClasses["detail"] = "p-toast-detail";
	ToastClasses["closeButton"] = "p-toast-close-button";
	ToastClasses["closeIcon"] = "p-toast-close-icon";
})(ToastClasses || (ToastClasses = {}));
var SWIPE_THRESHOLD = 50;
var VELOCITY_THRESHOLD = .11;
var SWIPE_OUT_DURATION = 500;
var ToastItem = (_ToastItem = class ToastItem extends BaseComponent {
	constructor() {
		super();
		_defineProperty(this, "message", input(...ngDevMode ? [void 0, { debugName: "message" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "index", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "index" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "life", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "life" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "template", input(...ngDevMode ? [void 0, { debugName: "template" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "headlessTemplate", input(...ngDevMode ? [void 0, { debugName: "headlessTemplate" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "motionOptions", input(...ngDevMode ? [void 0, { debugName: "motionOptions" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "clearAll", input(null, ...ngDevMode ? [{ debugName: "clearAll" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "stackExpanded", input(false, ...ngDevMode ? [{ debugName: "stackExpanded" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "stackIsHovered", input(false, ...ngDevMode ? [{ debugName: "stackIsHovered" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "stackIndex", input(0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "stackIndex" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "stackTotal", input(0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "stackTotal" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "stackOffset", input(0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "stackOffset" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "stackIsVisible", input(false, ...ngDevMode ? [{ debugName: "stackIsVisible" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "stackIsInteracting", input(false, ...ngDevMode ? [{ debugName: "stackIsInteracting" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "position", input("top-right", ...ngDevMode ? [{ debugName: "position" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "onAnimationStart", output());
		_defineProperty(this, "onAnimationEnd", output());
		_defineProperty(this, "onClose", output());
		_defineProperty(this, "onHeightChange", output());
		_defineProperty(this, "_componentStyle", inject(ToastStyle));
		_defineProperty(this, "timeout", null);
		_defineProperty(this, "visible", signal(void 0, ...ngDevMode ? [{ debugName: "visible" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "showCloseButton", computed(() => {
			var _this$message;
			return ((_this$message = this.message()) === null || _this$message === void 0 ? void 0 : _this$message.closable) !== false;
		}, ...ngDevMode ? [{ debugName: "showCloseButton" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "severityIcon", computed(() => {
			var _ToastItem$severityIc, _this$message2;
			return (_ToastItem$severityIc = ToastItem.severityIcons[(_this$message2 = this.message()) === null || _this$message2 === void 0 ? void 0 : _this$message2.severity]) !== null && _ToastItem$severityIc !== void 0 ? _ToastItem$severityIc : null;
		}, ...ngDevMode ? [{ debugName: "severityIcon" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "isDestroyed", false);
		_defineProperty(this, "mounted", signal(false, ...ngDevMode ? [{ debugName: "mounted" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "measuredHeight", signal(0, ...ngDevMode ? [{ debugName: "measuredHeight" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "removed", signal(false, ...ngDevMode ? [{ debugName: "removed" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "offsetBeforeRemove", signal(0, ...ngDevMode ? [{ debugName: "offsetBeforeRemove" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "swiping", signal(false, ...ngDevMode ? [{ debugName: "swiping" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "isSwiped", signal(false, ...ngDevMode ? [{ debugName: "isSwiped" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "swipeOut", signal(false, ...ngDevMode ? [{ debugName: "swipeOut" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "swipeDirection", signal(null, ...ngDevMode ? [{ debugName: "swipeDirection" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "swipeOutDirection", signal(null, ...ngDevMode ? [{ debugName: "swipeOutDirection" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "swipeAmountX", signal(0, ...ngDevMode ? [{ debugName: "swipeAmountX" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "swipeAmountY", signal(0, ...ngDevMode ? [{ debugName: "swipeAmountY" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "pointerStartPosition", null);
		_defineProperty(this, "swipeStartTime", 0);
		_defineProperty(this, "dataMounted", computed(() => this.mounted() ? "" : null, ...ngDevMode ? [{ debugName: "dataMounted" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataFront", computed(() => this.stackIndex() === 0 ? "" : null, ...ngDevMode ? [{ debugName: "dataFront" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataExpanded", computed(() => this.stackExpanded() ? "" : null, ...ngDevMode ? [{ debugName: "dataExpanded" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataVisible", computed(() => this.stackIsVisible() ? "" : null, ...ngDevMode ? [{ debugName: "dataVisible" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataRemoved", computed(() => this.removed() ? "" : null, ...ngDevMode ? [{ debugName: "dataRemoved" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataSwiping", computed(() => this.swiping() ? "" : null, ...ngDevMode ? [{ debugName: "dataSwiping" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataSwiped", computed(() => this.isSwiped() ? "" : null, ...ngDevMode ? [{ debugName: "dataSwiped" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataSwipeOut", computed(() => this.swipeOut() ? "" : null, ...ngDevMode ? [{ debugName: "dataSwipeOut" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataSwipeDirection", computed(() => this.swipeOutDirection() ? this.swipeOutDirection() : null, ...ngDevMode ? [{ debugName: "dataSwipeDirection" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataDismissible", computed(() => {
			var _this$message3;
			return String(((_this$message3 = this.message()) === null || _this$message3 === void 0 ? void 0 : _this$message3.closable) !== false);
		}, ...ngDevMode ? [{ debugName: "dataDismissible" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "stackStyles", computed(() => {
			const idx = this.stackIndex();
			const total = this.stackTotal();
			return {
				"--px-toast-index": this.removed() ? this.stackIndex() : idx,
				"--px-toast-z-index": total - idx,
				"--px-initial-height": this.measuredHeight() + "px",
				"--px-toast-offset": (this.removed() ? this.offsetBeforeRemove() : this.stackOffset()) + "px",
				"--px-swipe-amount-x": this.swipeAmountX() + "px",
				"--px-swipe-amount-y": this.swipeAmountY() + "px",
				"z-index": total - idx
			};
		}, ...ngDevMode ? [{ debugName: "stackStyles" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "remainingTime", 0);
		_defineProperty(this, "timerStartTime", 0);
		_defineProperty(this, "headlessContext", computed(() => ({
			$implicit: this.message(),
			closeFn: this.onCloseIconClick
		}), ...ngDevMode ? [{ debugName: "headlessContext" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "messageContext", computed(() => ({
			$implicit: this.message(),
			closeFn: this.onCloseIconClick
		}), ...ngDevMode ? [{ debugName: "messageContext" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataP", computed(() => {
			const msg = this.message();
			return this.cn({ [msg === null || msg === void 0 ? void 0 : msg.severity]: msg === null || msg === void 0 ? void 0 : msg.severity });
		}, ...ngDevMode ? [{ debugName: "dataP" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "onCloseIconClick", (event) => {
			this.clearTimeout();
			this.handleFocusOnRemove();
			this.closeStack();
			event === null || event === void 0 || event.preventDefault();
		});
		_defineProperty(this, "onPointerDown", (event) => {
			if (event.button !== 0) return;
			if (!this.isDismissible()) return;
			this.swipeStartTime = Date.now();
			this.offsetBeforeRemove.set(this.stackOffset());
			try {
				event.target.setPointerCapture(event.pointerId);
			} catch (_unused) {}
			this.swiping.set(true);
			this.pointerStartPosition = {
				x: event.clientX,
				y: event.clientY
			};
		});
		_defineProperty(this, "onPointerMove", (event) => {
			var _window$getSelection$, _window$getSelection, _this$position;
			if (!this.pointerStartPosition || !this.isDismissible()) return;
			if (((_window$getSelection$ = (_window$getSelection = window.getSelection()) === null || _window$getSelection === void 0 ? void 0 : _window$getSelection.toString().length) !== null && _window$getSelection$ !== void 0 ? _window$getSelection$ : 0) > 0) return;
			const yDelta = event.clientY - this.pointerStartPosition.y;
			const xDelta = event.clientX - this.pointerStartPosition.x;
			const isRealSwipe = Math.abs(xDelta) > 1 || Math.abs(yDelta) > 1;
			const positionParts = ((_this$position = this.position()) !== null && _this$position !== void 0 ? _this$position : "top-right").split("-");
			const side = positionParts[0];
			const align = positionParts[1];
			if (!this.swipeDirection() && isRealSwipe) this.swipeDirection.set(Math.abs(xDelta) > Math.abs(yDelta) ? "x" : "y");
			let nextX = 0;
			let nextY = 0;
			if (this.swipeDirection() === "x") nextX = align === "left" && xDelta < 0 || align === "right" && xDelta > 0 ? xDelta : this.applyDampening(xDelta);
			else if (this.swipeDirection() === "y") nextY = side === "top" && yDelta < 0 || side === "bottom" && yDelta > 0 ? yDelta : this.applyDampening(yDelta);
			if (Math.abs(nextX) > 0 || Math.abs(nextY) > 0) this.isSwiped.set(true);
			this.swipeAmountX.set(nextX);
			this.swipeAmountY.set(nextY);
		});
		_defineProperty(this, "onPointerUp", () => {
			if (this.swipeOut() || !this.isDismissible()) return;
			this.swiping.set(false);
			this.pointerStartPosition = null;
			const swipeAmount = this.swipeDirection() === "x" ? this.swipeAmountX() : this.swipeAmountY();
			const elapsed = Date.now() - (this.swipeStartTime || Date.now());
			const velocity = elapsed > 0 ? Math.abs(swipeAmount) / elapsed : 0;
			if (Math.abs(swipeAmount) >= SWIPE_THRESHOLD || velocity > VELOCITY_THRESHOLD) {
				this.offsetBeforeRemove.set(this.stackOffset());
				if (this.swipeDirection() === "x") this.swipeOutDirection.set(this.swipeAmountX() > 0 ? "right" : "left");
				else this.swipeOutDirection.set(this.swipeAmountY() > 0 ? "down" : "up");
				this.swipeOut.set(true);
				this.markRemoved();
				this.scheduleSwipeOutClose();
				return;
			}
			this.swipeAmountX.set(0);
			this.swipeAmountY.set(0);
			this.isSwiped.set(false);
			this.swipeDirection.set(null);
		});
		_defineProperty(this, "onDragEnd", () => {
			this.swiping.set(false);
			this.swipeDirection.set(null);
			this.pointerStartPosition = null;
		});
		effect(() => {
			if (this.clearAll()) this.visible.set(false);
		});
		effect(() => {
			if (this.swipeOut()) return;
			const hovered = this.stackIsHovered();
			const interacting = this.stackIsInteracting();
			const swiping = this.swiping();
			if (hovered || interacting || swiping) this.pauseStackTimer();
			else this.startStackTimer();
		});
	}
	closeStack() {
		this.markRemoved();
		this.visible.set(false);
	}
	isDismissible() {
		var _this$message4;
		return ((_this$message4 = this.message()) === null || _this$message4 === void 0 ? void 0 : _this$message4.closable) !== false;
	}
	markRemoved() {
		if (this.isDestroyed) return;
		this.offsetBeforeRemove.set(this.stackOffset());
		this.removed.set(true);
		this.onHeightChange.emit({
			index: this.index(),
			height: 0,
			removed: true
		});
	}
	applyDampening(delta) {
		const dampenedDelta = delta * (1 / (1.5 + Math.abs(delta) / 20));
		return Math.abs(dampenedDelta) < Math.abs(delta) ? dampenedDelta : delta;
	}
	scheduleSwipeOutClose() {
		this.clearTimeout();
		this.timeout = setTimeout(() => {
			this.visible.set(false);
		}, SWIPE_OUT_DURATION);
	}
	handleFocusOnRemove() {
		var _el$nextElementSiblin, _el$previousElementSi;
		const el = this.el.nativeElement;
		const activeEl = rt(el);
		if (!(el === null || el === void 0 ? void 0 : el.contains(activeEl))) return;
		const next = (_el$nextElementSiblin = el.nextElementSibling) === null || _el$nextElementSiblin === void 0 ? void 0 : _el$nextElementSiblin.querySelector("[data-pc-section=\"closebutton\"]");
		const prev = (_el$previousElementSi = el.previousElementSibling) === null || _el$previousElementSi === void 0 ? void 0 : _el$previousElementSi.querySelector("[data-pc-section=\"closebutton\"]");
		requestAnimationFrame(() => {
			if (next) next.focus({ preventScroll: true });
			else if (prev) prev.focus({ preventScroll: true });
		});
	}
	get closeAriaLabel() {
		return this.config.translation.aria ? this.config.translation.aria.close : void 0;
	}
	onBeforeEnter(event) {
		this.onAnimationStart.emit(event.element);
	}
	onAfterEnter() {
		this.measureStackHeight();
	}
	onAfterLeave(event) {
		if (!this.visible() && !this.isDestroyed) {
			this.onClose.emit({
				index: this.index(),
				message: this.message()
			});
			if (!this.isDestroyed) this.onAnimationEnd.emit(event.element);
		}
	}
	onAfterViewInit() {
		this.visible.set(true);
		this.measureStackHeight();
	}
	measureStackHeight() {
		if (this.mounted()) return;
		const el = this.el.nativeElement.querySelector("[data-stack]");
		if (!el) return;
		const orig = el.style.height;
		el.style.height = "auto";
		const height = el.getBoundingClientRect().height;
		el.style.height = orig;
		this.measuredHeight.set(height);
		this.onHeightChange.emit({
			index: this.index(),
			height
		});
		this.mounted.set(true);
	}
	startStackTimer() {
		const msg = this.message();
		if (msg === null || msg === void 0 ? void 0 : msg.sticky) return;
		this.clearTimeout();
		if (this.remainingTime <= 0) this.remainingTime = (msg === null || msg === void 0 ? void 0 : msg.life) || this.life() || 3e3;
		this.timerStartTime = Date.now();
		this.timeout = setTimeout(() => {
			this.handleFocusOnRemove();
			this.closeStack();
		}, this.remainingTime);
	}
	pauseStackTimer() {
		if (this.timerStartTime > 0 && this.timeout) {
			const elapsed = Date.now() - this.timerStartTime;
			this.remainingTime = Math.max(0, this.remainingTime - elapsed);
		}
		this.clearTimeout();
	}
	clearTimeout() {
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}
	}
	onDestroy() {
		this.isDestroyed = true;
		this.clearTimeout();
		this.visible.set(false);
	}
}, _defineProperty(_ToastItem, "severityIcons", {
	success: "check",
	info: "info-circle",
	error: "times-circle",
	warn: "exclamation-triangle",
	secondary: "info-circle",
	contrast: "info-circle"
}), _defineProperty(_ToastItem, "ɵfac", function ToastItem_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _ToastItem)();
}), _defineProperty(_ToastItem, "ɵcmp", (function() {
	function ToastItem_Conditional_2_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function ToastItem_Conditional_2_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, ToastItem_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 3);
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵproperty("ngTemplateOutlet", ctx_r0.headlessTemplate())("ngTemplateOutletContext", ctx_r0.headlessContext());
		}
	}
	function ToastItem_Conditional_3_Conditional_1_Conditional_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelement(0, "span", 4);
		if (rf & 2) {
			var _ctx_r0$message;
			const ctx_r0 = ɵɵnextContext(3);
			ɵɵclassMap(ctx_r0.cn(ctx_r0.cx("messageIcon"), (_ctx_r0$message = ctx_r0.message()) === null || _ctx_r0$message === void 0 ? void 0 : _ctx_r0$message.icon));
			ɵɵproperty("pBind", ctx_r0.ptm("messageIcon"));
		}
	}
	function ToastItem_Conditional_3_Conditional_1_Conditional_1_Case_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 9);
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(4);
			ɵɵclassMap(ctx_r0.cx("messageIcon"));
			ɵɵproperty("pBind", ctx_r0.ptm("messageIcon"));
			ɵɵattribute("aria-hidden", true);
		}
	}
	function ToastItem_Conditional_3_Conditional_1_Conditional_1_Case_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 10);
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(4);
			ɵɵclassMap(ctx_r0.cx("messageIcon"));
			ɵɵproperty("pBind", ctx_r0.ptm("messageIcon"));
			ɵɵattribute("aria-hidden", true);
		}
	}
	function ToastItem_Conditional_3_Conditional_1_Conditional_1_Case_2_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 11);
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(4);
			ɵɵclassMap(ctx_r0.cx("messageIcon"));
			ɵɵproperty("pBind", ctx_r0.ptm("messageIcon"));
			ɵɵattribute("aria-hidden", true);
		}
	}
	function ToastItem_Conditional_3_Conditional_1_Conditional_1_Case_3_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 12);
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(4);
			ɵɵclassMap(ctx_r0.cx("messageIcon"));
			ɵɵproperty("pBind", ctx_r0.ptm("messageIcon"));
			ɵɵattribute("aria-hidden", true);
		}
	}
	function ToastItem_Conditional_3_Conditional_1_Conditional_1_Template(rf, ctx) {
		if (rf & 1) ɵɵconditionalCreate(0, ToastItem_Conditional_3_Conditional_1_Conditional_1_Case_0_Template, 1, 4, "svg", 5)(1, ToastItem_Conditional_3_Conditional_1_Conditional_1_Case_1_Template, 1, 4, "svg", 6)(2, ToastItem_Conditional_3_Conditional_1_Conditional_1_Case_2_Template, 1, 4, "svg", 7)(3, ToastItem_Conditional_3_Conditional_1_Conditional_1_Case_3_Template, 1, 4, "svg", 8);
		if (rf & 2) {
			let tmp_4_0 = void 0;
			const ctx_r0 = ɵɵnextContext(3);
			ɵɵconditional((tmp_4_0 = ctx_r0.severityIcon()) === "check" ? 0 : tmp_4_0 === "times-circle" ? 1 : tmp_4_0 === "exclamation-triangle" ? 2 : tmp_4_0 === "info-circle" ? 3 : -1);
		}
	}
	function ToastItem_Conditional_3_Conditional_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵconditionalCreate(0, ToastItem_Conditional_3_Conditional_1_Conditional_0_Template, 1, 3, "span", 2)(1, ToastItem_Conditional_3_Conditional_1_Conditional_1_Template, 4, 1);
			ɵɵelementStart(2, "div", 4)(3, "div", 4);
			ɵɵtext(4);
			ɵɵelementEnd();
			ɵɵelementStart(5, "div", 4);
			ɵɵtext(6);
			ɵɵelementEnd()();
		}
		if (rf & 2) {
			var _ctx_r0$message2, _ctx_r0$message3, _ctx_r0$message4;
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵconditional(((_ctx_r0$message2 = ctx_r0.message()) === null || _ctx_r0$message2 === void 0 ? void 0 : _ctx_r0$message2.icon) ? 0 : ctx_r0.severityIcon() ? 1 : -1);
			ɵɵadvance(2);
			ɵɵclassMap(ctx_r0.cx("messageText"));
			ɵɵproperty("pBind", ctx_r0.ptm("messageText"));
			ɵɵattribute("data-p", ctx_r0.dataP());
			ɵɵadvance();
			ɵɵclassMap(ctx_r0.cx("summary"));
			ɵɵproperty("pBind", ctx_r0.ptm("summary"));
			ɵɵattribute("data-p", ctx_r0.dataP());
			ɵɵadvance();
			ɵɵtextInterpolate1(" ", (_ctx_r0$message3 = ctx_r0.message()) === null || _ctx_r0$message3 === void 0 ? void 0 : _ctx_r0$message3.summary, " ");
			ɵɵadvance();
			ɵɵclassMap(ctx_r0.cx("detail"));
			ɵɵproperty("pBind", ctx_r0.ptm("detail"));
			ɵɵattribute("data-p", ctx_r0.dataP());
			ɵɵadvance();
			ɵɵtextInterpolate((_ctx_r0$message4 = ctx_r0.message()) === null || _ctx_r0$message4 === void 0 ? void 0 : _ctx_r0$message4.detail);
		}
	}
	function ToastItem_Conditional_3_Conditional_2_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function ToastItem_Conditional_3_Conditional_2_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, ToastItem_Conditional_3_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 3);
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵproperty("ngTemplateOutlet", ctx_r0.template())("ngTemplateOutletContext", ctx_r0.messageContext());
		}
	}
	function ToastItem_Conditional_3_Conditional_3_Conditional_2_Template(rf, ctx) {
		if (rf & 1) ɵɵelement(0, "span", 4);
		if (rf & 2) {
			var _ctx_r0$message5;
			const ctx_r0 = ɵɵnextContext(3);
			ɵɵclassMap(ctx_r0.cn(ctx_r0.cx("closeIcon"), (_ctx_r0$message5 = ctx_r0.message()) === null || _ctx_r0$message5 === void 0 ? void 0 : _ctx_r0$message5.closeIcon));
			ɵɵproperty("pBind", ctx_r0.ptm("closeIcon"));
		}
	}
	function ToastItem_Conditional_3_Conditional_3_Conditional_3_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 15);
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(3);
			ɵɵclassMap(ctx_r0.cx("closeIcon"));
			ɵɵproperty("pBind", ctx_r0.ptm("closeIcon"));
			ɵɵattribute("aria-hidden", true);
		}
	}
	function ToastItem_Conditional_3_Conditional_3_Template(rf, ctx) {
		if (rf & 1) {
			const _r2 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "div")(1, "button", 13);
			ɵɵlistener("click", function ToastItem_Conditional_3_Conditional_3_Template_button_click_1_listener($event) {
				ɵɵrestoreView(_r2);
				const ctx_r0 = ɵɵnextContext(2);
				return ɵɵresetView(ctx_r0.onCloseIconClick($event));
			})("keydown.enter", function ToastItem_Conditional_3_Conditional_3_Template_button_keydown_enter_1_listener($event) {
				ɵɵrestoreView(_r2);
				const ctx_r0 = ɵɵnextContext(2);
				return ɵɵresetView(ctx_r0.onCloseIconClick($event));
			});
			ɵɵconditionalCreate(2, ToastItem_Conditional_3_Conditional_3_Conditional_2_Template, 1, 3, "span", 2)(3, ToastItem_Conditional_3_Conditional_3_Conditional_3_Template, 1, 4, "svg", 14);
			ɵɵelementEnd()();
		}
		if (rf & 2) {
			var _ctx_r0$message6;
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵadvance();
			ɵɵproperty("pBind", ctx_r0.ptm("closeButton"));
			ɵɵattribute("class", ctx_r0.cx("closeButton"))("aria-label", ctx_r0.closeAriaLabel)("data-p", ctx_r0.dataP());
			ɵɵadvance();
			ɵɵconditional(((_ctx_r0$message6 = ctx_r0.message()) === null || _ctx_r0$message6 === void 0 ? void 0 : _ctx_r0$message6.closeIcon) ? 2 : 3);
		}
	}
	function ToastItem_Conditional_3_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "div", 4);
			ɵɵconditionalCreate(1, ToastItem_Conditional_3_Conditional_1_Template, 7, 15);
			ɵɵconditionalCreate(2, ToastItem_Conditional_3_Conditional_2_Template, 1, 2, "ng-container");
			ɵɵconditionalCreate(3, ToastItem_Conditional_3_Conditional_3_Template, 4, 5, "div");
			ɵɵelementEnd();
		}
		if (rf & 2) {
			var _ctx_r0$message7;
			const ctx_r0 = ɵɵnextContext();
			ɵɵclassMap(ctx_r0.cn(ctx_r0.cx("messageContent"), (_ctx_r0$message7 = ctx_r0.message()) === null || _ctx_r0$message7 === void 0 ? void 0 : _ctx_r0$message7.contentStyleClass));
			ɵɵproperty("pBind", ctx_r0.ptm("messageContent"));
			ɵɵadvance();
			ɵɵconditional(!ctx_r0.template() ? 1 : -1);
			ɵɵadvance();
			ɵɵconditional(ctx_r0.template() ? 2 : -1);
			ɵɵadvance();
			ɵɵconditional(ctx_r0.showCloseButton() ? 3 : -1);
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _ToastItem,
		selectors: [["p-toast-item"]],
		inputs: {
			message: [1, "message"],
			index: [1, "index"],
			life: [1, "life"],
			template: [1, "template"],
			headlessTemplate: [1, "headlessTemplate"],
			motionOptions: [1, "motionOptions"],
			clearAll: [1, "clearAll"],
			stackExpanded: [1, "stackExpanded"],
			stackIsHovered: [1, "stackIsHovered"],
			stackIndex: [1, "stackIndex"],
			stackTotal: [1, "stackTotal"],
			stackOffset: [1, "stackOffset"],
			stackIsVisible: [1, "stackIsVisible"],
			stackIsInteracting: [1, "stackIsInteracting"],
			position: [1, "position"]
		},
		outputs: {
			onAnimationStart: "onAnimationStart",
			onAnimationEnd: "onAnimationEnd",
			onClose: "onClose",
			onHeightChange: "onHeightChange"
		},
		features: [ɵɵProvidersFeature([ToastStyle]), ɵɵInheritDefinitionFeature],
		decls: 4,
		vars: 21,
		consts: [
			["container", ""],
			[
				"role",
				"alert",
				"aria-live",
				"assertive",
				"aria-atomic",
				"true",
				"data-stack",
				"",
				3,
				"pMotionOnBeforeEnter",
				"pMotionOnAfterEnter",
				"pMotionOnAfterLeave",
				"pointerdown",
				"pointermove",
				"pointerup",
				"dragend",
				"pMotion",
				"pMotionAppear",
				"pMotionOptions",
				"pBind"
			],
			[
				3,
				"pBind",
				"class"
			],
			[
				4,
				"ngTemplateOutlet",
				"ngTemplateOutletContext"
			],
			[3, "pBind"],
			[
				"data-p-icon",
				"check",
				3,
				"pBind",
				"class"
			],
			[
				"data-p-icon",
				"times-circle",
				3,
				"pBind",
				"class"
			],
			[
				"data-p-icon",
				"exclamation-triangle",
				3,
				"pBind",
				"class"
			],
			[
				"data-p-icon",
				"info-circle",
				3,
				"pBind",
				"class"
			],
			[
				"data-p-icon",
				"check",
				3,
				"pBind"
			],
			[
				"data-p-icon",
				"times-circle",
				3,
				"pBind"
			],
			[
				"data-p-icon",
				"exclamation-triangle",
				3,
				"pBind"
			],
			[
				"data-p-icon",
				"info-circle",
				3,
				"pBind"
			],
			[
				"type",
				"button",
				"autofocus",
				"",
				3,
				"click",
				"keydown.enter",
				"pBind"
			],
			[
				"data-p-icon",
				"times",
				3,
				"pBind",
				"class"
			],
			[
				"data-p-icon",
				"times",
				3,
				"pBind"
			]
		],
		template: function ToastItem_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵelementStart(0, "div", 1, 0);
				ɵɵlistener("pMotionOnBeforeEnter", function ToastItem_Template_div_pMotionOnBeforeEnter_0_listener($event) {
					return ctx.onBeforeEnter($event);
				})("pMotionOnAfterEnter", function ToastItem_Template_div_pMotionOnAfterEnter_0_listener() {
					return ctx.onAfterEnter();
				})("pMotionOnAfterLeave", function ToastItem_Template_div_pMotionOnAfterLeave_0_listener($event) {
					return ctx.onAfterLeave($event);
				})("pointerdown", function ToastItem_Template_div_pointerdown_0_listener($event) {
					return ctx.onPointerDown($event);
				})("pointermove", function ToastItem_Template_div_pointermove_0_listener($event) {
					return ctx.onPointerMove($event);
				})("pointerup", function ToastItem_Template_div_pointerup_0_listener() {
					return ctx.onPointerUp();
				})("dragend", function ToastItem_Template_div_dragend_0_listener() {
					return ctx.onDragEnd();
				});
				ɵɵconditionalCreate(2, ToastItem_Conditional_2_Template, 1, 2, "ng-container")(3, ToastItem_Conditional_3_Template, 4, 6, "div", 2);
				ɵɵelementEnd();
			}
			if (rf & 2) {
				var _ctx$message, _ctx$message2;
				ɵɵstyleMap(ctx.stackStyles());
				ɵɵclassMap(ctx.cn(ctx.cx("message"), (_ctx$message = ctx.message()) === null || _ctx$message === void 0 ? void 0 : _ctx$message.styleClass));
				ɵɵproperty("pMotion", ctx.visible())("pMotionAppear", true)("pMotionOptions", ctx.motionOptions())("pBind", ctx.ptm("message"));
				ɵɵattribute("id", (_ctx$message2 = ctx.message()) === null || _ctx$message2 === void 0 ? void 0 : _ctx$message2.id)("data-p", ctx.dataP())("data-mounted", ctx.dataMounted())("data-removed", ctx.dataRemoved())("data-front", ctx.dataFront())("data-expanded", ctx.dataExpanded())("data-visible", ctx.dataVisible())("data-swiping", ctx.dataSwiping())("data-swiped", ctx.dataSwiped())("data-swipe-out", ctx.dataSwipeOut())("data-swipe-direction", ctx.dataSwipeDirection())("data-dismissible", ctx.dataDismissible());
				ɵɵadvance(2);
				ɵɵconditional(ctx.headlessTemplate() ? 2 : 3);
			}
		},
		dependencies: [
			NgTemplateOutlet,
			Check,
			InfoCircle,
			TimesCircle,
			ExclamationTriangle,
			Times,
			SharedModule,
			Bind,
			MotionModule,
			MotionDirective
		],
		encapsulation: 2
	});
})()), _ToastItem);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastItem, [{
		type: Component,
		args: [{
			selector: "p-toast-item",
			standalone: true,
			imports: [
				NgTemplateOutlet,
				Check,
				InfoCircle,
				TimesCircle,
				ExclamationTriangle,
				Times,
				SharedModule,
				Bind,
				MotionModule
			],
			template: `
        <div
            #container
            [pMotion]="visible()"
            [pMotionAppear]="true"
            [pMotionOptions]="motionOptions()"
            (pMotionOnBeforeEnter)="onBeforeEnter($event)"
            (pMotionOnAfterEnter)="onAfterEnter()"
            (pMotionOnAfterLeave)="onAfterLeave($event)"
            [attr.id]="message()?.id"
            [pBind]="ptm('message')"
            [class]="cn(cx('message'), message()?.styleClass)"
            [style]="stackStyles()"
            (pointerdown)="onPointerDown($event)"
            (pointermove)="onPointerMove($event)"
            (pointerup)="onPointerUp()"
            (dragend)="onDragEnd()"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            [attr.data-p]="dataP()"
            data-stack=""
            [attr.data-mounted]="dataMounted()"
            [attr.data-removed]="dataRemoved()"
            [attr.data-front]="dataFront()"
            [attr.data-expanded]="dataExpanded()"
            [attr.data-visible]="dataVisible()"
            [attr.data-swiping]="dataSwiping()"
            [attr.data-swiped]="dataSwiped()"
            [attr.data-swipe-out]="dataSwipeOut()"
            [attr.data-swipe-direction]="dataSwipeDirection()"
            [attr.data-dismissible]="dataDismissible()"
        >
            @if (headlessTemplate()) {
                <ng-container *ngTemplateOutlet="headlessTemplate(); context: headlessContext()"></ng-container>
            } @else {
                <div [pBind]="ptm('messageContent')" [class]="cn(cx('messageContent'), message()?.contentStyleClass)">
                    @if (!template()) {
                        @if (message()?.icon) {
                            <span [pBind]="ptm('messageIcon')" [class]="cn(cx('messageIcon'), message()?.icon)"></span>
                        } @else if (severityIcon()) {
                            @switch (severityIcon()) {
                                @case ('check') {
                                    <svg data-p-icon="check" [pBind]="ptm('messageIcon')" [class]="cx('messageIcon')" [attr.aria-hidden]="true" />
                                }
                                @case ('times-circle') {
                                    <svg data-p-icon="times-circle" [pBind]="ptm('messageIcon')" [class]="cx('messageIcon')" [attr.aria-hidden]="true" />
                                }
                                @case ('exclamation-triangle') {
                                    <svg data-p-icon="exclamation-triangle" [pBind]="ptm('messageIcon')" [class]="cx('messageIcon')" [attr.aria-hidden]="true" />
                                }
                                @case ('info-circle') {
                                    <svg data-p-icon="info-circle" [pBind]="ptm('messageIcon')" [class]="cx('messageIcon')" [attr.aria-hidden]="true" />
                                }
                            }
                        }
                        <div [pBind]="ptm('messageText')" [class]="cx('messageText')" [attr.data-p]="dataP()">
                            <div [pBind]="ptm('summary')" [class]="cx('summary')" [attr.data-p]="dataP()">
                                {{ message()?.summary }}
                            </div>
                            <div [pBind]="ptm('detail')" [class]="cx('detail')" [attr.data-p]="dataP()">{{ message()?.detail }}</div>
                        </div>
                    }
                    @if (template()) {
                        <ng-container *ngTemplateOutlet="template(); context: messageContext()"></ng-container>
                    }
                    @if (showCloseButton()) {
                        <div>
                            <button
                                [pBind]="ptm('closeButton')"
                                type="button"
                                [attr.class]="cx('closeButton')"
                                (click)="onCloseIconClick($event)"
                                (keydown.enter)="onCloseIconClick($event)"
                                [attr.aria-label]="closeAriaLabel"
                                autofocus
                                [attr.data-p]="dataP()"
                            >
                                @if (message()?.closeIcon) {
                                    <span [pBind]="ptm('closeIcon')" [class]="cn(cx('closeIcon'), message()?.closeIcon)"></span>
                                } @else {
                                    <svg [pBind]="ptm('closeIcon')" data-p-icon="times" [class]="cx('closeIcon')" [attr.aria-hidden]="true" />
                                }
                            </button>
                        </div>
                    }
                </div>
            }
        </div>
    `,
			encapsulation: ViewEncapsulation.None,
			changeDetection: ChangeDetectionStrategy.OnPush,
			providers: [ToastStyle]
		}]
	}], () => [], {
		message: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "message",
				required: false
			}]
		}],
		index: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "index",
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
		template: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "template",
				required: false
			}]
		}],
		headlessTemplate: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "headlessTemplate",
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
		clearAll: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "clearAll",
				required: false
			}]
		}],
		stackExpanded: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "stackExpanded",
				required: false
			}]
		}],
		stackIsHovered: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "stackIsHovered",
				required: false
			}]
		}],
		stackIndex: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "stackIndex",
				required: false
			}]
		}],
		stackTotal: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "stackTotal",
				required: false
			}]
		}],
		stackOffset: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "stackOffset",
				required: false
			}]
		}],
		stackIsVisible: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "stackIsVisible",
				required: false
			}]
		}],
		stackIsInteracting: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "stackIsInteracting",
				required: false
			}]
		}],
		position: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "position",
				required: false
			}]
		}],
		onAnimationStart: [{
			type: Output,
			args: ["onAnimationStart"]
		}],
		onAnimationEnd: [{
			type: Output,
			args: ["onAnimationEnd"]
		}],
		onClose: [{
			type: Output,
			args: ["onClose"]
		}],
		onHeightChange: [{
			type: Output,
			args: ["onHeightChange"]
		}]
	});
})();
var TOAST_INSTANCE = new InjectionToken("TOAST_INSTANCE");
var Toast = (_Toast = class Toast extends BaseComponent {
	constructor(..._args2) {
		var _inject;
		super(..._args2);
		_defineProperty(this, "componentName", "Toast");
		_defineProperty(this, "$pcToast", (_inject = inject(TOAST_INSTANCE, {
			optional: true,
			skipSelf: true
		})) !== null && _inject !== void 0 ? _inject : void 0);
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		_defineProperty(this, "key", input(...ngDevMode ? [void 0, { debugName: "key" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "autoZIndex", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "autoZIndex" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "baseZIndex", input(0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "baseZIndex" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "life", input(3e3, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "life" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "position", input("top-right", ...ngDevMode ? [{ debugName: "position" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "mode", input("stacked", ...ngDevMode ? [{ debugName: "mode" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "stackGap", input(8, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "stackGap" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "stackVisibleLimit", input(3, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "stackVisibleLimit" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "preventOpenDuplicates", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "preventOpenDuplicates" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "preventDuplicates", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "preventDuplicates" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "motionOptions", input(...ngDevMode ? [void 0, { debugName: "motionOptions" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "computedMotionOptions", computed(() => _objectSpread2(_objectSpread2({}, this.ptm("motion")), this.motionOptions()), ...ngDevMode ? [{ debugName: "computedMotionOptions" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "breakpoints", input(...ngDevMode ? [void 0, { debugName: "breakpoints" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "onClose", output());
		_defineProperty(this, "messageTemplate", contentChild("message", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "messageTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "headlessTemplate", contentChild("headless", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "headlessTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "messageSubscription", void 0);
		_defineProperty(this, "clearSubscription", void 0);
		_defineProperty(this, "messages", void 0);
		_defineProperty(this, "messageArchive", void 0);
		_defineProperty(this, "closingMessages", /* @__PURE__ */ new WeakSet());
		_defineProperty(this, "messageService", inject(MessageService));
		_defineProperty(this, "_componentStyle", inject(ToastStyle));
		_defineProperty(this, "styleElement", null);
		_defineProperty(this, "id", this.$useId.next("pn_id_"));
		_defineProperty(this, "clearAllTrigger", signal(null, ...ngDevMode ? [{ debugName: "clearAllTrigger" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "hovered", signal(false, ...ngDevMode ? [{ debugName: "hovered" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "isInteracting", signal(false, ...ngDevMode ? [{ debugName: "isInteracting" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "heights", signal([], ...ngDevMode ? [{ debugName: "heights" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "sortedHeights", computed(() => [...this.heights()].sort((a, b) => b.index - a.index), ...ngDevMode ? [{ debugName: "sortedHeights" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "frontToastHeight", computed(() => {
			var _this$sortedHeights$, _this$sortedHeights$2;
			return (_this$sortedHeights$ = (_this$sortedHeights$2 = this.sortedHeights()[0]) === null || _this$sortedHeights$2 === void 0 ? void 0 : _this$sortedHeights$2.height) !== null && _this$sortedHeights$ !== void 0 ? _this$sortedHeights$ : 0;
		}, ...ngDevMode ? [{ debugName: "frontToastHeight" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "stackOffsets", computed(() => {
			const sorted = this.sortedHeights();
			const offsets = [0];
			for (let i = 1; i < sorted.length; i++) offsets[i] = offsets[i - 1] + sorted[i - 1].height;
			return offsets;
		}, ...ngDevMode ? [{ debugName: "stackOffsets" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "visualStackIndices", computed(() => {
			const map = /* @__PURE__ */ new Map();
			this.sortedHeights().forEach((entry, idx) => map.set(entry.index, idx));
			return map;
		}, ...ngDevMode ? [{ debugName: "visualStackIndices" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "visibleIndices", computed(() => new Set(this.sortedHeights().slice(0, this.stackVisibleLimit()).map((x) => x.index)), ...ngDevMode ? [{ debugName: "visibleIndices" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "raiseFactor", computed(() => {
			return this.position().startsWith("bottom") ? -1 : 1;
		}, ...ngDevMode ? [{ debugName: "raiseFactor" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "isExpanded", computed(() => this.mode() === "expanded" || this.hovered(), ...ngDevMode ? [{ debugName: "isExpanded" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "hostDataExpanded", computed(() => this.isExpanded() ? "" : null, ...ngDevMode ? [{ debugName: "hostDataExpanded" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "stackTotal", computed(() => {
			var _this$messages$length, _this$messages;
			return (_this$messages$length = (_this$messages = this.messages) === null || _this$messages === void 0 ? void 0 : _this$messages.length) !== null && _this$messages$length !== void 0 ? _this$messages$length : 0;
		}, ...ngDevMode ? [{ debugName: "stackTotal" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataP", computed(() => {
			const pos = this.position();
			return this.cn({ [pos]: pos });
		}, ...ngDevMode ? [{ debugName: "dataP" }] : /* istanbul ignore next */ []));
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
	}
	getStackIndex(domIndex) {
		var _this$visualStackIndi, _this$messages$length2, _this$messages2;
		return (_this$visualStackIndi = this.visualStackIndices().get(domIndex)) !== null && _this$visualStackIndi !== void 0 ? _this$visualStackIndi : ((_this$messages$length2 = (_this$messages2 = this.messages) === null || _this$messages2 === void 0 ? void 0 : _this$messages2.length) !== null && _this$messages$length2 !== void 0 ? _this$messages$length2 : 0) - 1 - domIndex;
	}
	getStackOffset(domIndex) {
		var _this$visualStackIndi2, _this$stackOffsets$vi;
		const visualIdx = (_this$visualStackIndi2 = this.visualStackIndices().get(domIndex)) !== null && _this$visualStackIndi2 !== void 0 ? _this$visualStackIndi2 : 0;
		return (_this$stackOffsets$vi = this.stackOffsets()[visualIdx]) !== null && _this$stackOffsets$vi !== void 0 ? _this$stackOffsets$vi : 0;
	}
	isStackVisible(domIndex) {
		return this.visibleIndices().has(domIndex);
	}
	onInit() {
		this.messageSubscription = this.messageService.messageObserver.subscribe((messages) => {
			if (messages) {
				if (Array.isArray(messages)) {
					const filteredMessages = messages.filter((m) => this.canAdd(m));
					this.add(filteredMessages);
				} else if (this.canAdd(messages)) this.add([messages]);
			}
		});
		this.clearSubscription = this.messageService.clearObserver.subscribe((key) => {
			if (key) {
				if (this.key() === key) this.clearAll();
			} else this.clearAll();
			this.cd.markForCheck();
		});
	}
	clearAll() {
		this.clearAllTrigger.set({});
		this.heights.set([]);
		this.hovered.set(false);
		this.isInteracting.set(false);
		this.messageArchive = void 0;
	}
	onAfterViewInit() {
		if (this.breakpoints()) this.createStyle();
	}
	add(messages) {
		this.messages = this.messages ? [...this.messages, ...messages] : [...messages];
		if (this.preventDuplicates()) this.messageArchive = this.messageArchive ? [...this.messageArchive, ...messages] : [...messages];
		this.cd.markForCheck();
	}
	canAdd(message) {
		var _this$messageArchive;
		let allow = this.key() === message.key;
		if (allow && this.preventOpenDuplicates()) {
			var _this$messages3;
			const openMessages = ((_this$messages3 = this.messages) !== null && _this$messages3 !== void 0 ? _this$messages3 : []).filter((m) => !this.closingMessages.has(m));
			allow = !this.containsMessage(openMessages, message);
		}
		if (allow && this.preventDuplicates()) allow = !this.containsMessage((_this$messageArchive = this.messageArchive) !== null && _this$messageArchive !== void 0 ? _this$messageArchive : [], message);
		return allow;
	}
	containsMessage(collection, message) {
		if (!collection) return false;
		return collection.find((m) => m.summary === message.summary && m.detail == message.detail && m.severity === message.severity) != null;
	}
	onMessageClose(event) {
		var _this$messages4, _this$messages$length3, _this$messages5;
		(_this$messages4 = this.messages) === null || _this$messages4 === void 0 || _this$messages4.splice(event.index, 1);
		this.heights.update((h) => h.filter((x) => x.index !== event.index).map((x) => x.index > event.index ? _objectSpread2(_objectSpread2({}, x), {}, { index: x.index - 1 }) : x));
		if (((_this$messages$length3 = (_this$messages5 = this.messages) === null || _this$messages5 === void 0 ? void 0 : _this$messages5.length) !== null && _this$messages$length3 !== void 0 ? _this$messages$length3 : 0) <= 1) this.hovered.set(false);
		this.onClose.emit({ message: event.message });
		this.onAnimationEnd();
		this.cd.detectChanges();
	}
	onAnimationStart() {
		var _this$el, _this$el2, _this$el3;
		this.renderer.setAttribute((_this$el = this.el) === null || _this$el === void 0 ? void 0 : _this$el.nativeElement, this.id, "");
		if (this.autoZIndex() && ((_this$el2 = this.el) === null || _this$el2 === void 0 ? void 0 : _this$el2.nativeElement.style.zIndex) === "") zindexutils_default.set("modal", (_this$el3 = this.el) === null || _this$el3 === void 0 ? void 0 : _this$el3.nativeElement, this.baseZIndex() || this.config.zIndex.modal);
	}
	onAnimationEnd() {
		var _this$el4;
		if (this.autoZIndex() && p(this.messages)) zindexutils_default.clear((_this$el4 = this.el) === null || _this$el4 === void 0 ? void 0 : _this$el4.nativeElement);
	}
	onContainerMouseEnter() {
		this.hovered.set(true);
	}
	onContainerMouseLeave(event) {
		var _this$el5;
		if (this.isInteracting()) return;
		const container = (_this$el5 = this.el) === null || _this$el5 === void 0 ? void 0 : _this$el5.nativeElement;
		const relatedTarget = event.relatedTarget;
		if (relatedTarget && (container === null || container === void 0 ? void 0 : container.contains(relatedTarget))) return;
		this.hovered.set(false);
	}
	onContainerPointerDown(event) {
		const target = event.target;
		if (target && target.closest("[data-dismissible=\"false\"]")) return;
		this.isInteracting.set(true);
	}
	onContainerPointerUp() {
		this.isInteracting.set(false);
	}
	onItemHeightChange(event) {
		if (event.removed) {
			var _this$messages6;
			const closing = (_this$messages6 = this.messages) === null || _this$messages6 === void 0 ? void 0 : _this$messages6[event.index];
			if (closing) this.closingMessages.add(closing);
			this.heights.update((h) => h.filter((x) => x.index !== event.index));
			return;
		}
		this.heights.update((h) => {
			const existing = h.findIndex((x) => x.index === event.index);
			if (existing >= 0) {
				const copy = [...h];
				copy[existing] = event;
				return copy;
			}
			return [...h, event].sort((a, b) => a.index - b.index);
		});
	}
	createStyle() {
		if (this.$styleScope.isolated) {
			this.$isolatedStyle("breakpoints", this.psel(this.breakpointsCSS()));
			return;
		}
		if (!this.styleElement) {
			var _this$config, _getShadowRoot, _this$config2;
			const styleEl = this.renderer.createElement("style");
			be(styleEl, "nonce", (_this$config = this.config) === null || _this$config === void 0 || (_this$config = _this$config.csp()) === null || _this$config === void 0 ? void 0 : _this$config.nonce);
			this.renderer.appendChild((_getShadowRoot = getShadowRoot(this.el.nativeElement)) !== null && _getShadowRoot !== void 0 ? _getShadowRoot : this.document.head, styleEl);
			const innerHTML = this.breakpointsCSS();
			this.renderer.setProperty(styleEl, "innerHTML", this.psel(innerHTML));
			be(styleEl, "nonce", (_this$config2 = this.config) === null || _this$config2 === void 0 || (_this$config2 = _this$config2.csp()) === null || _this$config2 === void 0 ? void 0 : _this$config2.nonce);
			this.styleElement = styleEl;
		}
	}
	breakpointsCSS() {
		const bp = this.breakpoints();
		let innerHTML = "";
		for (let breakpoint in bp) {
			let breakpointStyle = "";
			for (let styleProp in bp[breakpoint]) breakpointStyle += styleProp + ":" + bp[breakpoint][styleProp] + " !important;";
			innerHTML += `
                    @media screen and (max-width: ${breakpoint}) {
                        .p-toast[${this.id}] {
                           ${breakpointStyle}
                        }
                    }
                `;
		}
		return innerHTML;
	}
	destroyStyle() {
		if (this.styleElement) {
			this.renderer.removeChild(this.document.head, this.styleElement);
			this.styleElement = null;
		}
	}
	onDestroy() {
		if (this.messageSubscription) this.messageSubscription.unsubscribe();
		if (this.el && this.autoZIndex()) zindexutils_default.clear(this.el.nativeElement);
		if (this.clearSubscription) this.clearSubscription.unsubscribe();
		this.destroyStyle();
	}
}, _defineProperty(_Toast, "ɵfac", /*@__PURE__*/ (() => {
	let ɵToast_BaseFactory = void 0;
	return function Toast_Factory(__ngFactoryType__) {
		return (ɵToast_BaseFactory || (ɵToast_BaseFactory = ɵɵgetInheritedFactory(_Toast)))(__ngFactoryType__ || _Toast);
	};
})()), _defineProperty(_Toast, "ɵcmp", (function() {
	const _c0 = ["message"];
	const _c1 = ["headless"];
	function Toast_For_1_Template(rf, ctx) {
		if (rf & 1) {
			const _r1 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "p-toast-item", 1);
			ɵɵlistener("onClose", function Toast_For_1_Template_p_toast_item_onClose_0_listener($event) {
				ɵɵrestoreView(_r1);
				const ctx_r1 = ɵɵnextContext();
				return ɵɵresetView(ctx_r1.onMessageClose($event));
			})("onAnimationEnd", function Toast_For_1_Template_p_toast_item_onAnimationEnd_0_listener() {
				ɵɵrestoreView(_r1);
				const ctx_r1 = ɵɵnextContext();
				return ɵɵresetView(ctx_r1.onAnimationEnd());
			})("onAnimationStart", function Toast_For_1_Template_p_toast_item_onAnimationStart_0_listener() {
				ɵɵrestoreView(_r1);
				const ctx_r1 = ɵɵnextContext();
				return ɵɵresetView(ctx_r1.onAnimationStart());
			})("onHeightChange", function Toast_For_1_Template_p_toast_item_onHeightChange_0_listener($event) {
				ɵɵrestoreView(_r1);
				const ctx_r1 = ɵɵnextContext();
				return ɵɵresetView(ctx_r1.onItemHeightChange($event));
			});
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const msg_r3 = ctx.$implicit;
			const ɵ$index_1_r4 = ctx.$index;
			const ctx_r1 = ɵɵnextContext();
			ɵɵproperty("message", msg_r3)("index", ɵ$index_1_r4)("life", ctx_r1.life())("clearAll", ctx_r1.clearAllTrigger())("template", ctx_r1.messageTemplate())("headlessTemplate", ctx_r1.headlessTemplate())("pt", ctx_r1.pt())("unstyled", ctx_r1.unstyled())("motionOptions", ctx_r1.computedMotionOptions())("stackExpanded", ctx_r1.isExpanded())("stackIsHovered", ctx_r1.hovered())("stackIsInteracting", ctx_r1.isInteracting())("stackIndex", ctx_r1.getStackIndex(ɵ$index_1_r4))("stackTotal", ctx_r1.stackTotal())("stackOffset", ctx_r1.getStackOffset(ɵ$index_1_r4))("stackIsVisible", ctx_r1.isStackVisible(ɵ$index_1_r4))("position", ctx_r1.position());
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _Toast,
		selectors: [["p-toast"]],
		contentQueries: function Toast_ContentQueries(rf, ctx, dirIndex) {
			if (rf & 1) ɵɵcontentQuerySignal(dirIndex, ctx.messageTemplate, _c0, 4)(dirIndex, ctx.headlessTemplate, _c1, 4);
			if (rf & 2) ɵɵqueryAdvance(2);
		},
		hostVars: 13,
		hostBindings: function Toast_HostBindings(rf, ctx) {
			if (rf & 1) ɵɵlistener("mouseenter", function Toast_mouseenter_HostBindingHandler() {
				return ctx.onContainerMouseEnter();
			})("mouseleave", function Toast_mouseleave_HostBindingHandler($event) {
				return ctx.onContainerMouseLeave($event);
			})("pointerdown", function Toast_pointerdown_HostBindingHandler($event) {
				return ctx.onContainerPointerDown($event);
			})("pointerup", function Toast_pointerup_HostBindingHandler() {
				return ctx.onContainerPointerUp();
			});
			if (rf & 2) {
				ɵɵattribute("data-p", ctx.dataP())("data-position", ctx.position())("data-expanded", ctx.hostDataExpanded());
				ɵɵstyleMap(ctx.sx("root"));
				ɵɵclassMap(ctx.cx("root"));
				ɵɵstyleProp("--%NS%px-gap", ctx.stackGap(), "px")("--%NS%px-front-toast-height", ctx.frontToastHeight(), "px")("--%NS%px-raise-factor", ctx.raiseFactor());
			}
		},
		inputs: {
			key: [1, "key"],
			autoZIndex: [1, "autoZIndex"],
			baseZIndex: [1, "baseZIndex"],
			life: [1, "life"],
			position: [1, "position"],
			mode: [1, "mode"],
			stackGap: [1, "stackGap"],
			stackVisibleLimit: [1, "stackVisibleLimit"],
			preventOpenDuplicates: [1, "preventOpenDuplicates"],
			preventDuplicates: [1, "preventDuplicates"],
			motionOptions: [1, "motionOptions"],
			breakpoints: [1, "breakpoints"]
		},
		outputs: { onClose: "onClose" },
		features: [
			ɵɵProvidersFeature([
				ToastStyle,
				{
					provide: TOAST_INSTANCE,
					useExisting: _Toast
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: _Toast
				}
			]),
			ɵɵHostDirectivesFeature([Bind]),
			ɵɵInheritDefinitionFeature
		],
		decls: 2,
		vars: 0,
		consts: [[
			3,
			"message",
			"index",
			"life",
			"clearAll",
			"template",
			"headlessTemplate",
			"pt",
			"unstyled",
			"motionOptions",
			"stackExpanded",
			"stackIsHovered",
			"stackIsInteracting",
			"stackIndex",
			"stackTotal",
			"stackOffset",
			"stackIsVisible",
			"position"
		], [
			3,
			"onClose",
			"onAnimationEnd",
			"onAnimationStart",
			"onHeightChange",
			"message",
			"index",
			"life",
			"clearAll",
			"template",
			"headlessTemplate",
			"pt",
			"unstyled",
			"motionOptions",
			"stackExpanded",
			"stackIsHovered",
			"stackIsInteracting",
			"stackIndex",
			"stackTotal",
			"stackOffset",
			"stackIsVisible",
			"position"
		]],
		template: function Toast_Template(rf, ctx) {
			if (rf & 1) ɵɵrepeaterCreate(0, Toast_For_1_Template, 1, 17, "p-toast-item", 0, ɵɵrepeaterTrackByIdentity);
			if (rf & 2) ɵɵrepeater(ctx.messages);
		},
		dependencies: [ToastItem, SharedModule],
		encapsulation: 2
	});
})()), _Toast);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Toast, [{
		type: Component,
		args: [{
			selector: "p-toast",
			standalone: true,
			imports: [ToastItem, SharedModule],
			template: `
        @for (msg of messages; track msg; let i = $index) {
            <p-toast-item
                [message]="msg"
                [index]="i"
                [life]="life()"
                [clearAll]="clearAllTrigger()"
                (onClose)="onMessageClose($event)"
                (onAnimationEnd)="onAnimationEnd()"
                (onAnimationStart)="onAnimationStart()"
                [template]="messageTemplate()"
                [headlessTemplate]="headlessTemplate()"
                [pt]="pt()"
                [unstyled]="unstyled()"
                [motionOptions]="computedMotionOptions()"
                [stackExpanded]="isExpanded()"
                [stackIsHovered]="hovered()"
                [stackIsInteracting]="isInteracting()"
                [stackIndex]="getStackIndex(i)"
                [stackTotal]="stackTotal()"
                [stackOffset]="getStackOffset(i)"
                [stackIsVisible]="isStackVisible(i)"
                [position]="position()"
                (onHeightChange)="onItemHeightChange($event)"
            ></p-toast-item>
        }
    `,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None,
			providers: [
				ToastStyle,
				{
					provide: TOAST_INSTANCE,
					useExisting: Toast
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: Toast
				}
			],
			host: {
				"[class]": "cx('root')",
				"[style]": "sx('root')",
				"[attr.data-p]": "dataP()",
				"[attr.data-position]": "position()",
				"[attr.data-expanded]": "hostDataExpanded()",
				"[style.--px-gap.px]": "stackGap()",
				"[style.--px-front-toast-height.px]": "frontToastHeight()",
				"[style.--px-raise-factor]": "raiseFactor()",
				"(mouseenter)": "onContainerMouseEnter()",
				"(mouseleave)": "onContainerMouseLeave($event)",
				"(pointerdown)": "onContainerPointerDown($event)",
				"(pointerup)": "onContainerPointerUp()"
			},
			hostDirectives: [Bind]
		}]
	}], null, {
		key: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "key",
				required: false
			}]
		}],
		autoZIndex: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "autoZIndex",
				required: false
			}]
		}],
		baseZIndex: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "baseZIndex",
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
		position: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "position",
				required: false
			}]
		}],
		mode: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "mode",
				required: false
			}]
		}],
		stackGap: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "stackGap",
				required: false
			}]
		}],
		stackVisibleLimit: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "stackVisibleLimit",
				required: false
			}]
		}],
		preventOpenDuplicates: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "preventOpenDuplicates",
				required: false
			}]
		}],
		preventDuplicates: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "preventDuplicates",
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
		breakpoints: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "breakpoints",
				required: false
			}]
		}],
		onClose: [{
			type: Output,
			args: ["onClose"]
		}],
		messageTemplate: [{
			type: ContentChild,
			args: ["message", {
				descendants: false,
				isSignal: true
			}]
		}],
		headlessTemplate: [{
			type: ContentChild,
			args: ["headless", {
				descendants: false,
				isSignal: true
			}]
		}]
	});
})();
var ToastModule = (_ToastModule = class ToastModule {}, _defineProperty(_ToastModule, "ɵfac", function ToastModule_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _ToastModule)();
}), _defineProperty(_ToastModule, "ɵmod", /*@__PURE__*/ ɵɵdefineNgModule({
	type: _ToastModule,
	imports: [Toast, SharedModule],
	exports: [Toast, SharedModule]
})), _defineProperty(_ToastModule, "ɵinj", /*@__PURE__*/ ɵɵdefineInjector({ imports: [
	Toast,
	SharedModule,
	SharedModule
] })), _ToastModule);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToastModule, [{
		type: NgModule,
		args: [{
			imports: [Toast, SharedModule],
			exports: [Toast, SharedModule]
		}]
	}], null, null);
})();
export { Toast, ToastClasses, ToastModule, ToastStyle };
