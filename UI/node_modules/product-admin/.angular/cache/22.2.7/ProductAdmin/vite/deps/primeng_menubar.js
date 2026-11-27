import { Y as NgTemplateOutlet, u as isPlatformBrowser } from "./common-CYN6T7fr.js";
import { $n as Output, A as contentChild, Al as ɵɵdefineInjectable, Ao as ɵɵgetCurrentView, Bl as ɵɵrestoreView, Bt as computed, Co as ɵɵelementStart, Da as ɵɵconditionalCreate, Dr as ViewEncapsulation, Fn as Injectable, Gs as ɵɵtemplate, In as Input, Is as ɵɵsanitizeUrl, Js as ɵɵtextInterpolate, Ms as ɵɵsanitizeHtml, O as booleanAttribute, Qo as ɵɵlistener, Rl as ɵɵnamespaceSVG, S as ViewChild, Sa as ɵɵclassMap, So as ɵɵelementEnd, Ta as ɵɵconditional, Tl as signal, Ts as ɵɵrepeaterCreate, Vs as ɵɵstyleMap, Wi as setClassMetadata, X as input, Ys as ɵɵtextInterpolate1, an as ChangeDetectionStrategy, ao as ɵɵdefineNgModule, at as output, bs as ɵɵqueryAdvance, ca as ɵɵInheritDefinitionFeature, cn as Component, cs as ɵɵprojectionDef, da as ɵɵadvance, dc as ɵɵviewQuerySignal, dl as inject, es as ɵɵnextContext, fs as ɵɵpureFunction2, gt as viewChild, i as ContentChild, il as effect, jl as ɵɵdefineInjector, jo as ɵɵgetInheritedFactory, ka as ɵɵcontentQuerySignal, kc as InjectionToken, lo as ɵɵdomElement, ls as ɵɵproperty, qn as NgModule, qs as ɵɵtext, ro as ɵɵdefineComponent, rt as numberAttribute, sa as ɵɵHostDirectivesFeature, ss as ɵɵprojection, ua as ɵɵProvidersFeature, vo as ɵɵelement, ws as ɵɵrepeater, ya as ɵɵattribute, yo as ɵɵelementContainer, zl as ɵɵresetView } from "./core-BVpAqhZc.js";
import { C as p, D as z, E as x, s as J, x as l } from "./dist-D971aPsi.js";
import { SharedModule } from "./primeng_api.js";
import { a as getEventTarget, n as PARENT_INSTANCE, t as BaseComponent } from "./primeng-basecomponent-DFIxl5Fy.js";
import { Bind, BindModule } from "./primeng_bind.js";
import { Ct as nt, ct as Wt, ht as fe, kt as rt } from "./dist-BnkFXv39.js";
import { t as CoreIcon } from "./primeicons-angular-core-ei4boJ1b.js";
import { n as _objectSpread2, r as _defineProperty } from "./asyncToGenerator-CE9zIWF7.js";
import { o as zindexutils_default } from "./primeng-utils-D5gG-ZJT.js";
import { f as RouterLink, m as RouterModule, p as RouterLinkActive } from "./router-UNimfvoo.js";
import { n as BadgeModule, t as Badge } from "./primeng-badge-byMXATm0.js";
import { t as AngleDown } from "./primeicons-angular-angle-down-q4bmsIAb.js";
import { t as AngleRight } from "./primeicons-angular-angle-right-D9I0UzzS.js";
import { n as MotionDirective, r as MotionModule } from "./primeng-motion-Dw02ysjU.js";
import { t as Ripple } from "./primeng-ripple-CKze7UFo.js";
import { n as TooltipModule, t as Tooltip } from "./primeng-tooltip-CHpSOeE6.js";
import { Qt as filter, Wn as Subject, kt as debounce, nn as interval } from "./zipWith-C1pHxpjx.js";
import { s as BaseStyle } from "./primeng-config-EnOVMCIx.js";
// ../node_modules/@primeicons/core/dist/esm/icons/bars.mjs
var t = {
	name: "bars",
	meta: { tags: [
		"bars",
		"menu",
		"options",
		"list",
		"categories",
		"hamburger"
	] },
	svg: {
		xmlns: "http://www.w3.org/2000/svg",
		width: 20,
		height: 20,
		viewBox: "0 0 20 20",
		fill: "none"
	},
	nodes: [["path", {
		d: "M17 13.75C17.4142 13.75 17.75 14.0858 17.75 14.5C17.75 14.9142 17.4142 15.25 17 15.25H3C2.58579 15.25 2.25 14.9142 2.25 14.5C2.25 14.0858 2.58579 13.75 3 13.75H17ZM17 9.25C17.4142 9.25 17.75 9.58579 17.75 10C17.75 10.4142 17.4142 10.75 17 10.75H3C2.58579 10.75 2.25 10.4142 2.25 10C2.25 9.58579 2.58579 9.25 3 9.25H17ZM17 4.75C17.4142 4.75 17.75 5.08579 17.75 5.5C17.75 5.91421 17.4142 6.25 17 6.25H3C2.58579 6.25 2.25 5.91421 2.25 5.5C2.25 5.08579 2.58579 4.75 3 4.75H17Z",
		fill: "currentColor",
		key: "1wyj6c"
	}]]
};
// ../node_modules/@primeicons/angular/fesm2022/primeicons-angular-bars.mjs
var _Bars;
var Bars = class extends CoreIcon {
	constructor() {
		super();
		this._icon = t;
	}
};
_Bars = Bars;
_defineProperty(Bars, "ɵfac", function Bars_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _Bars)();
});
_defineProperty(Bars, "ɵcmp", (function() {
	const _forTrack0 = ($index, $item) => $item[1]["key"] || $index;
	function Bars_For_1_Case_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "path");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("d", node_r1[1]["d"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("fill-rule", node_r1[1]["fillRule"])("clip-rule", node_r1[1]["clipRule"])("stroke", node_r1[1]["stroke"])("stroke-width", node_r1[1]["strokeWidth"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function Bars_For_1_Case_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "circle");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("r", node_r1[1]["r"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function Bars_For_1_Case_2_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "rect");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x", node_r1[1]["x"])("y", node_r1[1]["y"])("width", node_r1[1]["width"])("height", node_r1[1]["height"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function Bars_For_1_Case_3_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "line");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x1", node_r1[1]["x1"])("y1", node_r1[1]["y1"])("x2", node_r1[1]["x2"])("y2", node_r1[1]["y2"])("stroke", node_r1[1]["stroke"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function Bars_For_1_Case_4_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polyline");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function Bars_For_1_Case_5_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polygon");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function Bars_For_1_Case_6_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "ellipse");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function Bars_For_1_Template(rf, ctx) {
		if (rf & 1) ɵɵconditionalCreate(0, Bars_For_1_Case_0_Template, 1, 9, "path")(1, Bars_For_1_Case_1_Template, 1, 6, "circle")(2, Bars_For_1_Case_2_Template, 1, 9, "rect")(3, Bars_For_1_Case_3_Template, 1, 7, "line")(4, Bars_For_1_Case_4_Template, 1, 4, "polyline")(5, Bars_For_1_Case_5_Template, 1, 4, "polygon")(6, Bars_For_1_Case_6_Template, 1, 7, "ellipse");
		if (rf & 2) {
			let tmp_10_0 = void 0;
			const node_r1 = ctx.$implicit;
			ɵɵconditional((tmp_10_0 = node_r1[0]) === "path" ? 0 : tmp_10_0 === "circle" ? 1 : tmp_10_0 === "rect" ? 2 : tmp_10_0 === "line" ? 3 : tmp_10_0 === "polyline" ? 4 : tmp_10_0 === "polygon" ? 5 : tmp_10_0 === "ellipse" ? 6 : -1);
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _Bars,
		selectors: [[
			"svg",
			"data-p-icon",
			"bars"
		]],
		features: [ɵɵInheritDefinitionFeature],
		decls: 2,
		vars: 0,
		template: function Bars_Template(rf, ctx) {
			if (rf & 1) ɵɵrepeaterCreate(0, Bars_For_1_Template, 7, 1, null, null, _forTrack0);
			if (rf & 2) ɵɵrepeater(ctx.iconNodes());
		},
		encapsulation: 2,
		changeDetection: 1
	});
})());
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Bars, [{
		type: Component,
		args: [{
			selector: "svg[data-p-icon=\"bars\"]",
			standalone: true,
			template: "\n        @for (node of iconNodes(); track node[1]['key'] || $index) {\n            @switch (node[0]) {\n                @case ('path') {\n                    <svg:path\n                        [attr.d]=\"node[1]['d']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.fill-rule]=\"node[1]['fillRule']\"\n                        [attr.clip-rule]=\"node[1]['clipRule']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-width]=\"node[1]['strokeWidth']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('circle') {\n                    <svg:circle\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.r]=\"node[1]['r']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('rect') {\n                    <svg:rect\n                        [attr.x]=\"node[1]['x']\"\n                        [attr.y]=\"node[1]['y']\"\n                        [attr.width]=\"node[1]['width']\"\n                        [attr.height]=\"node[1]['height']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('line') {\n                    <svg:line\n                        [attr.x1]=\"node[1]['x1']\"\n                        [attr.y1]=\"node[1]['y1']\"\n                        [attr.x2]=\"node[1]['x2']\"\n                        [attr.y2]=\"node[1]['y2']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polyline') {\n                    <svg:polyline\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polygon') {\n                    <svg:polygon\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('ellipse') {\n                    <svg:ellipse\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n            }\n        }\n"
		}]
	}], () => [], null);
})();
// ../node_modules/@primeuix/styles/dist/menubar/index.mjs
var style$1 = "\n    .p-menubar {\n        display: flex;\n        align-items: center;\n        background: dt('menubar.background');\n        border: 1px solid dt('menubar.border.color');\n        border-radius: dt('menubar.border.radius');\n        color: dt('menubar.color');\n        padding: dt('menubar.padding');\n        gap: dt('menubar.gap');\n    }\n\n    .p-menubar-start,\n    .p-megamenu-end {\n        display: flex;\n        align-items: center;\n    }\n\n    .p-menubar-root-list,\n    .p-menubar-submenu {\n        display: flex;\n        margin: 0;\n        padding: 0;\n        list-style: none;\n        outline: 0 none;\n    }\n\n    .p-menubar-root-list {\n        align-items: center;\n        flex-wrap: wrap;\n        gap: dt('menubar.gap');\n    }\n\n    .p-menubar-root-list > .p-menubar-item > .p-menubar-item-content {\n        border-radius: dt('menubar.base.item.border.radius');\n    }\n\n    .p-menubar-root-list > .p-menubar-item > .p-menubar-item-content > .p-menubar-item-link {\n        padding: dt('menubar.base.item.padding');\n    }\n\n    .p-menubar-item-content {\n        transition:\n            background dt('menubar.transition.duration'),\n            color dt('menubar.transition.duration');\n        border-radius: dt('menubar.item.border.radius');\n        color: dt('menubar.item.color');\n    }\n\n    .p-menubar-item-link {\n        cursor: pointer;\n        display: flex;\n        align-items: center;\n        text-decoration: none;\n        overflow: hidden;\n        position: relative;\n        color: inherit;\n        padding: dt('menubar.item.padding');\n        gap: dt('menubar.item.gap');\n        user-select: none;\n        outline: 0 none;\n    }\n\n    .p-menubar-item-label {\n        font-weight: dt('menubar.item.label.font.weight');\n        font-size: dt('menubar.item.label.font.size');\n    }\n\n    .p-menubar-item-icon {\n        color: dt('menubar.item.icon.color');\n        font-size: dt('menubar.item.icon.size');\n        width: dt('menubar.item.icon.size');\n        height: dt('menubar.item.icon.size');\n    }\n\n    .p-menubar-submenu-icon {\n        color: dt('menubar.submenu.icon.color');\n        margin-left: auto;\n        font-size: dt('menubar.submenu.icon.size');\n        width: dt('menubar.submenu.icon.size');\n        height: dt('menubar.submenu.icon.size');\n    }\n\n    .p-menubar-submenu .p-menubar-submenu-icon:dir(rtl) {\n        margin-left: 0;\n        margin-right: auto;\n    }\n\n    .p-menubar-item.p-focus > .p-menubar-item-content {\n        color: dt('menubar.item.focus.color');\n        background: dt('menubar.item.focus.background');\n    }\n\n    .p-menubar-item.p-focus > .p-menubar-item-content .p-menubar-item-icon {\n        color: dt('menubar.item.icon.focus.color');\n    }\n\n    .p-menubar-item.p-focus > .p-menubar-item-content .p-menubar-submenu-icon {\n        color: dt('menubar.submenu.icon.focus.color');\n    }\n\n    .p-menubar-item:not(.p-disabled) > .p-menubar-item-content:hover {\n        color: dt('menubar.item.focus.color');\n        background: dt('menubar.item.focus.background');\n    }\n\n    .p-menubar-item:not(.p-disabled) > .p-menubar-item-content:hover .p-menubar-item-icon {\n        color: dt('menubar.item.icon.focus.color');\n    }\n\n    .p-menubar-item:not(.p-disabled) > .p-menubar-item-content:hover .p-menubar-submenu-icon {\n        color: dt('menubar.submenu.icon.focus.color');\n    }\n\n    .p-menubar-item-active > .p-menubar-item-content {\n        color: dt('menubar.item.active.color');\n        background: dt('menubar.item.active.background');\n    }\n\n    .p-menubar-item-active > .p-menubar-item-content .p-menubar-item-icon {\n        color: dt('menubar.item.icon.active.color');\n    }\n\n    .p-menubar-item-active > .p-menubar-item-content .p-menubar-submenu-icon {\n        color: dt('menubar.submenu.icon.active.color');\n    }\n\n    .p-menubar-submenu {\n        display: none;\n        position: absolute;\n        min-width: 12.5rem;\n        z-index: 1;\n        background: dt('menubar.submenu.background');\n        border: 1px solid dt('menubar.submenu.border.color');\n        border-radius: dt('menubar.submenu.border.radius');\n        box-shadow: dt('menubar.submenu.shadow');\n        color: dt('menubar.submenu.color');\n        flex-direction: column;\n        padding: dt('menubar.submenu.padding');\n        gap: dt('menubar.submenu.gap');\n        will-change: transform;\n    }\n\n    .p-menubar-submenu .p-menubar-separator {\n        border-block-start: 1px solid dt('menubar.separator.border.color');\n    }\n\n    .p-menubar-submenu .p-menubar-item {\n        position: relative;\n    }\n\n    .p-menubar-submenu > .p-menubar-item-active > .p-menubar-submenu {\n        display: block;\n        left: 100%;\n        top: 0;\n    }\n\n    .p-menubar-end {\n        margin-left: auto;\n        align-self: center;\n    }\n\n    .p-menubar-end:dir(rtl) {\n        margin-left: 0;\n        margin-right: auto;\n    }\n\n    .p-menubar-button {\n        display: none;\n        justify-content: center;\n        align-items: center;\n        cursor: pointer;\n        width: dt('menubar.mobile.button.size');\n        height: dt('menubar.mobile.button.size');\n        position: relative;\n        color: dt('menubar.mobile.button.color');\n        border: 0 none;\n        background: transparent;\n        border-radius: dt('menubar.mobile.button.border.radius');\n        transition:\n            background dt('menubar.transition.duration'),\n            color dt('menubar.transition.duration'),\n            outline-color dt('menubar.transition.duration');\n        outline-color: transparent;\n    }\n\n    .p-menubar-button:hover {\n        color: dt('menubar.mobile.button.hover.color');\n        background: dt('menubar.mobile.button.hover.background');\n    }\n\n    .p-menubar-button:focus-visible {\n        box-shadow: dt('menubar.mobile.button.focus.ring.shadow');\n        outline: dt('menubar.mobile.button.focus.ring.width') dt('menubar.mobile.button.focus.ring.style') dt('menubar.mobile.button.focus.ring.color');\n        outline-offset: dt('menubar.mobile.button.focus.ring.offset');\n    }\n\n    .p-menubar-mobile {\n        position: relative;\n    }\n\n    .p-menubar-mobile .p-menubar-button {\n        display: flex;\n    }\n\n    .p-menubar-mobile .p-menubar-root-list {\n        position: absolute;\n        display: none;\n        width: 100%;\n        flex-direction: column;\n        top: 100%;\n        left: 0;\n        z-index: 1;\n        padding: dt('menubar.submenu.padding');\n        background: dt('menubar.submenu.background');\n        border: 1px solid dt('menubar.submenu.border.color');\n        box-shadow: dt('menubar.submenu.shadow');\n        border-radius: dt('menubar.submenu.border.radius');\n        gap: dt('menubar.submenu.gap');\n    }\n\n    .p-menubar-mobile .p-menubar-root-list:dir(rtl) {\n        left: auto;\n        right: 0;\n    }\n\n    .p-menubar-mobile .p-menubar-root-list > .p-menubar-item > .p-menubar-item-content > .p-menubar-item-link {\n        padding: dt('menubar.item.padding');\n    }\n\n    .p-menubar-mobile-active .p-menubar-root-list {\n        display: flex;\n    }\n\n    .p-menubar-mobile .p-menubar-root-list .p-menubar-item {\n        width: 100%;\n        position: static;\n    }\n\n    .p-menubar-mobile .p-menubar-root-list .p-menubar-separator {\n        border-block-start: 1px solid dt('menubar.separator.border.color');\n    }\n\n    .p-menubar-mobile .p-menubar-root-list > .p-menubar-item > .p-menubar-item-content .p-menubar-submenu-icon {\n        margin-left: auto;\n        transition: transform 0.2s;\n    }\n\n    .p-menubar-mobile .p-menubar-root-list > .p-menubar-item > .p-menubar-item-content .p-menubar-submenu-icon:dir(rtl),\n    .p-menubar-mobile .p-menubar-submenu-icon:dir(rtl) {\n        margin-left: 0;\n        margin-right: auto;\n    }\n\n    .p-menubar-mobile .p-menubar-root-list > .p-menubar-item-active > .p-menubar-item-content .p-menubar-submenu-icon {\n        transform: rotate(-180deg);\n    }\n\n    .p-menubar-mobile .p-menubar-submenu .p-menubar-submenu-icon {\n        transition: transform 0.2s;\n        transform: rotate(90deg);\n    }\n\n    .p-menubar-mobile .p-menubar-item-active > .p-menubar-item-content .p-menubar-submenu-icon {\n        transform: rotate(-90deg);\n    }\n\n    .p-menubar-mobile .p-menubar-submenu {\n        width: 100%;\n        position: static;\n        box-shadow: none;\n        border: 0 none;\n        padding-inline-start: dt('menubar.submenu.mobile.indent');\n        padding-inline-end: 0;\n    }\n";
// ../node_modules/primeng/fesm2022/primeng-menubar.mjs
var _MenubarService;
var _MenuBarStyle;
var _MenubarSub;
var _Menubar;
var _MenubarModule;
var MenubarService = (_MenubarService = class MenubarService {
	constructor() {
		_defineProperty(this, "autoHide", void 0);
		_defineProperty(this, "autoHideDelay", void 0);
		_defineProperty(this, "mouseLeaves", new Subject());
		_defineProperty(this, "mouseLeft$", this.mouseLeaves.pipe(debounce(() => interval(this.autoHideDelay)), filter((mouseLeft) => this.autoHide && mouseLeft)));
	}
}, _defineProperty(_MenubarService, "ɵfac", function MenubarService_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _MenubarService)();
}), _defineProperty(_MenubarService, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _MenubarService,
	factory: _MenubarService.ɵfac
})), _MenubarService);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenubarService, [{ type: Injectable }], null, null);
})();
var style = `
${style$1}
.p-menubar-root-list > .p-menubar-item-active > .p-menubar-submenu,
.p-menubar-submenu > .p-menubar-item-active > .p-menubar-submenu {
    display: flex;
}
`;
var classes = {
	root: ({ instance }) => ["p-menubar p-component", {
		"p-menubar-mobile": instance.queryMatches(),
		"p-menubar-mobile-active": instance.mobileActive
	}],
	start: "p-menubar-start",
	button: "p-menubar-button",
	rootList: "p-menubar-root-list",
	item: ({ instance, processedItem }) => ["p-menubar-item", {
		"p-menubar-item-active": instance.isItemActive(processedItem),
		"p-focus": instance.isItemFocused(processedItem),
		"p-disabled": instance.isItemDisabled(processedItem)
	}],
	itemContent: "p-menubar-item-content",
	itemLink: "p-menubar-item-link",
	itemIcon: "p-menubar-item-icon",
	itemLabel: "p-menubar-item-label",
	submenuIcon: "p-menubar-submenu-icon",
	submenu: "p-menubar-submenu",
	separator: "p-menubar-separator",
	end: "p-menubar-end"
};
var MenuBarStyle = (_MenuBarStyle = class MenuBarStyle extends BaseStyle {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "name", "menubar");
		_defineProperty(this, "style", style);
		_defineProperty(this, "classes", classes);
	}
}, _defineProperty(_MenuBarStyle, "ɵfac", /*@__PURE__*/ (() => {
	let ɵMenuBarStyle_BaseFactory = void 0;
	return function MenuBarStyle_Factory(__ngFactoryType__) {
		return (ɵMenuBarStyle_BaseFactory || (ɵMenuBarStyle_BaseFactory = ɵɵgetInheritedFactory(_MenuBarStyle)))(__ngFactoryType__ || _MenuBarStyle);
	};
})()), _defineProperty(_MenuBarStyle, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _MenuBarStyle,
	factory: _MenuBarStyle.ɵfac
})), _MenuBarStyle);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuBarStyle, [{ type: Injectable }], null, null);
})();
var MenubarClasses;
(function(MenubarClasses) {
	MenubarClasses["root"] = "p-menubar";
	MenubarClasses["start"] = "p-menubar-start";
	MenubarClasses["button"] = "p-menubar-button";
	MenubarClasses["rootList"] = "p-menubar-root-list";
	MenubarClasses["item"] = "p-menubar-item";
	MenubarClasses["itemContent"] = "p-menubar-item-content";
	MenubarClasses["itemLink"] = "p-menubar-item-link";
	MenubarClasses["itemIcon"] = "p-menubar-item-icon";
	MenubarClasses["itemLabel"] = "p-menubar-item-label";
	MenubarClasses["submenuIcon"] = "p-menubar-submenu-icon";
	MenubarClasses["submenu"] = "p-menubar-submenu";
	MenubarClasses["separator"] = "p-menubar-separator";
	MenubarClasses["end"] = "p-menubar-end";
})(MenubarClasses || (MenubarClasses = {}));
var MenubarSub = (_MenubarSub = class MenubarSub extends BaseComponent {
	constructor(..._args2) {
		super(..._args2);
		_defineProperty(this, "hostId", computed(() => this.root() ? this.menuId() : null, ...ngDevMode ? [{ debugName: "hostId" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "hostClass", computed(() => this.level() === 0 ? this.cx("rootList") : this.cx("submenu"), ...ngDevMode ? [{ debugName: "hostClass" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "items", input(...ngDevMode ? [void 0, { debugName: "items" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "itemTemplate", input(...ngDevMode ? [void 0, { debugName: "itemTemplate" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "root", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "root" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "autoZIndex", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "autoZIndex" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "baseZIndex", input(0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "baseZIndex" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "mobileActive", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "mobileActive" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "autoDisplay", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "autoDisplay" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "menuId", input(...ngDevMode ? [void 0, { debugName: "menuId" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "ariaLabel", input(...ngDevMode ? [void 0, { debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "ariaLabelledBy", input(...ngDevMode ? [void 0, { debugName: "ariaLabelledBy" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "level", input(0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "level" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "focusedItemId", input(...ngDevMode ? [void 0, { debugName: "focusedItemId" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "activeItemPath", input(...ngDevMode ? [void 0, { debugName: "activeItemPath" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "inlineStyles", input(...ngDevMode ? [void 0, { debugName: "inlineStyles" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "motionOptions", input(...ngDevMode ? [void 0, { debugName: "motionOptions" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "submenuiconTemplate", input(...ngDevMode ? [void 0, { debugName: "submenuiconTemplate" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "itemClick", output());
		_defineProperty(this, "itemMouseEnter", output());
		_defineProperty(this, "menuFocus", output());
		_defineProperty(this, "menuBlur", output());
		_defineProperty(this, "menuKeydown", output());
		_defineProperty(this, "mouseLeaveSubscriber", void 0);
		_defineProperty(this, "menubarService", inject(MenubarService));
		_defineProperty(this, "_componentStyle", inject(MenuBarStyle));
		_defineProperty(this, "hostName", "Menubar");
	}
	onInit() {
		this.mouseLeaveSubscriber = this.menubarService.mouseLeft$.subscribe(() => {
			this.cd.markForCheck();
		});
	}
	onItemClick(event, processedItem) {
		this.getItemProp(processedItem, "command", {
			originalEvent: event,
			item: processedItem.item
		});
		this.itemClick.emit({
			originalEvent: event,
			processedItem,
			isFocus: true
		});
	}
	getItemProp(processedItem, name, params = null) {
		return processedItem && processedItem.item ? x(processedItem.item[name], params) : void 0;
	}
	getItemId(processedItem) {
		var _processedItem$item;
		return processedItem.item && ((_processedItem$item = processedItem.item) === null || _processedItem$item === void 0 ? void 0 : _processedItem$item.id) ? processedItem.item.id : `${this.menuId()}_${processedItem.key}`;
	}
	getItemLabelId(processedItem) {
		return `${this.menuId()}_${processedItem.key}_label`;
	}
	getItemLabel(processedItem) {
		return this.getItemProp(processedItem, "label");
	}
	isItemVisible(processedItem) {
		return this.getItemProp(processedItem, "visible") !== false;
	}
	isItemActive(processedItem) {
		const path = this.activeItemPath();
		if (path) return path.some((p) => p.key === processedItem.key);
		return false;
	}
	isItemDisabled(processedItem) {
		return this.getItemProp(processedItem, "disabled");
	}
	isItemFocused(processedItem) {
		return this.focusedItemId() === this.getItemId(processedItem);
	}
	isItemGroup(processedItem) {
		return l(processedItem.items);
	}
	getAriaSetSize() {
		const items = this.items();
		return items ? items.filter((processedItem) => this.isItemVisible(processedItem) && !this.getItemProp(processedItem, "separator")).length : 0;
	}
	getAriaPosInset(index) {
		const items = this.items();
		return items ? index - items.slice(0, index).filter((processedItem) => this.isItemVisible(processedItem) && this.getItemProp(processedItem, "separator")).length + 1 : 0;
	}
	onItemMouseEnter(param) {
		if (this.autoDisplay()) {
			const { originalEvent, processedItem } = param;
			this.itemMouseEnter.emit({
				originalEvent,
				processedItem
			});
		}
	}
	getRouterLinkActiveOptions(processedItem) {
		return this.getItemProp(processedItem, "routerLinkActiveOptions") || { exact: false };
	}
	getPTOptions(processedItem, index, key) {
		return this.ptm(key, { context: {
			item: processedItem.item,
			index,
			active: this.isItemActive(processedItem),
			focused: this.isItemFocused(processedItem),
			disabled: this.isItemDisabled(processedItem),
			level: this.level()
		} });
	}
	getItemTemplateContext(item, isRoot) {
		return {
			$implicit: item,
			root: isRoot
		};
	}
	onDestroy() {
		var _this$mouseLeaveSubsc;
		(_this$mouseLeaveSubsc = this.mouseLeaveSubscriber) === null || _this$mouseLeaveSubsc === void 0 || _this$mouseLeaveSubsc.unsubscribe();
	}
}, _defineProperty(_MenubarSub, "ɵfac", /*@__PURE__*/ (() => {
	let ɵMenubarSub_BaseFactory = void 0;
	return function MenubarSub_Factory(__ngFactoryType__) {
		return (ɵMenubarSub_BaseFactory || (ɵMenubarSub_BaseFactory = ɵɵgetInheritedFactory(_MenubarSub)))(__ngFactoryType__ || _MenubarSub);
	};
})()), _defineProperty(_MenubarSub, "ɵcmp", (function() {
	const _c0 = (a0, a1) => ({
		instance: a0,
		processedItem: a1
	});
	const _forTrack0 = ($index, $item) => $item.key;
	function MenubarSub_For_1_Conditional_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelement(0, "li", 3);
		if (rf & 2) {
			const processedItem_r1 = ɵɵnextContext().$implicit;
			const ctx_r1 = ɵɵnextContext();
			ɵɵstyleMap(ctx_r1.getItemProp(processedItem_r1, "style"));
			ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("separator"), ctx_r1.getItemProp(processedItem_r1, "styleClass")));
			ɵɵproperty("pBind", ctx_r1.ptm("separator"));
			ɵɵattribute("id", ctx_r1.getItemId(processedItem_r1));
		}
	}
	function MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_0_Conditional_1_Template(rf, ctx) {
		if (rf & 1) ɵɵelement(0, "span", 14);
		if (rf & 2) {
			const ctx_r3 = ɵɵnextContext(4);
			const processedItem_r1 = ctx_r3.$implicit;
			const $index_r5 = ctx_r3.$index;
			const ctx_r1 = ɵɵnextContext();
			ɵɵstyleMap(ctx_r1.getItemProp(processedItem_r1, "iconStyle"));
			ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("itemIcon"), ctx_r1.getItemProp(processedItem_r1, "icon"), ctx_r1.getItemProp(processedItem_r1, "iconClass")));
			ɵɵproperty("pBind", ctx_r1.getPTOptions(processedItem_r1, $index_r5, "itemIcon"));
			ɵɵattribute("tabindex", -1);
		}
	}
	function MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_0_Conditional_2_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "span", 15);
			ɵɵtext(1);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r3 = ɵɵnextContext(4);
			const processedItem_r1 = ctx_r3.$implicit;
			const $index_r5 = ctx_r3.$index;
			const ctx_r1 = ɵɵnextContext();
			ɵɵstyleMap(ctx_r1.getItemProp(processedItem_r1, "labelStyle"));
			ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("itemLabel"), ctx_r1.getItemProp(processedItem_r1, "labelClass")));
			ɵɵproperty("id", ctx_r1.getItemLabelId(processedItem_r1))("pBind", ctx_r1.getPTOptions(processedItem_r1, $index_r5, "itemLabel"));
			ɵɵadvance();
			ɵɵtextInterpolate1(" ", ctx_r1.getItemLabel(processedItem_r1), " ");
		}
	}
	function MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_0_Conditional_3_Template(rf, ctx) {
		if (rf & 1) ɵɵelement(0, "span", 16);
		if (rf & 2) {
			const ctx_r3 = ɵɵnextContext(4);
			const processedItem_r1 = ctx_r3.$implicit;
			const $index_r5 = ctx_r3.$index;
			const ctx_r1 = ɵɵnextContext();
			ɵɵstyleMap(ctx_r1.getItemProp(processedItem_r1, "labelStyle"));
			ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("itemLabel"), ctx_r1.getItemProp(processedItem_r1, "labelClass")));
			ɵɵproperty("innerHTML", ctx_r1.getItemLabel(processedItem_r1), ɵɵsanitizeHtml)("id", ctx_r1.getItemLabelId(processedItem_r1))("pBind", ctx_r1.getPTOptions(processedItem_r1, $index_r5, "itemLabel"));
		}
	}
	function MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_0_Conditional_4_Template(rf, ctx) {
		if (rf & 1) ɵɵelement(0, "p-badge", 17);
		if (rf & 2) {
			const ctx_r3 = ɵɵnextContext(4);
			const processedItem_r1 = ctx_r3.$implicit;
			const $index_r5 = ctx_r3.$index;
			const ctx_r1 = ɵɵnextContext();
			ɵɵclassMap(ctx_r1.getItemProp(processedItem_r1, "badgeStyleClass"));
			ɵɵproperty("value", ctx_r1.getItemProp(processedItem_r1, "badge"))("pt", ctx_r1.getPTOptions(processedItem_r1, $index_r5, "pcBadge"))("unstyled", ctx_r1.unstyled());
		}
	}
	function MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_0_Conditional_5_Conditional_0_Conditional_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 21);
		}
		if (rf & 2) {
			const ctx_r3 = ɵɵnextContext(6);
			const processedItem_r1 = ctx_r3.$implicit;
			const $index_r5 = ctx_r3.$index;
			const ctx_r1 = ɵɵnextContext();
			ɵɵclassMap(ctx_r1.cx("submenuIcon"));
			ɵɵproperty("pBind", ctx_r1.getPTOptions(processedItem_r1, $index_r5, "submenuIcon"));
		}
	}
	function MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_0_Conditional_5_Conditional_0_Conditional_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 22);
		}
		if (rf & 2) {
			const ctx_r3 = ɵɵnextContext(6);
			const processedItem_r1 = ctx_r3.$implicit;
			const $index_r5 = ctx_r3.$index;
			const ctx_r1 = ɵɵnextContext();
			ɵɵclassMap(ctx_r1.cx("submenuIcon"));
			ɵɵproperty("pBind", ctx_r1.getPTOptions(processedItem_r1, $index_r5, "submenuIcon"));
		}
	}
	function MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_0_Conditional_5_Conditional_0_Template(rf, ctx) {
		if (rf & 1) ɵɵconditionalCreate(0, MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_0_Conditional_5_Conditional_0_Conditional_0_Template, 1, 3, "svg", 19)(1, MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_0_Conditional_5_Conditional_0_Conditional_1_Template, 1, 3, "svg", 20);
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext(6);
			ɵɵconditional(ctx_r1.root() ? 0 : 1);
		}
	}
	function MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_0_Conditional_5_ng_container_1_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_0_Conditional_5_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵconditionalCreate(0, MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_0_Conditional_5_Conditional_0_Template, 2, 1);
			ɵɵtemplate(1, MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_0_Conditional_5_ng_container_1_Template, 1, 0, "ng-container", 18);
		}
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext(5);
			ɵɵconditional(!ctx_r1.submenuiconTemplate() ? 0 : -1);
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", ctx_r1.submenuiconTemplate());
		}
	}
	function MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "a", 9);
			ɵɵconditionalCreate(1, MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_0_Conditional_1_Template, 1, 6, "span", 10);
			ɵɵconditionalCreate(2, MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_0_Conditional_2_Template, 2, 7, "span", 11)(3, MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_0_Conditional_3_Template, 1, 7, "span", 12);
			ɵɵconditionalCreate(4, MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_0_Conditional_4_Template, 1, 5, "p-badge", 13);
			ɵɵconditionalCreate(5, MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_0_Conditional_5_Template, 2, 2);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r3 = ɵɵnextContext(3);
			const processedItem_r1 = ctx_r3.$implicit;
			const $index_r5 = ctx_r3.$index;
			const ctx_r1 = ɵɵnextContext();
			ɵɵstyleMap(ctx_r1.getItemProp(processedItem_r1, "linkStyle"));
			ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("itemLink"), ctx_r1.getItemProp(processedItem_r1, "linkClass")));
			ɵɵproperty("pBind", ctx_r1.getPTOptions(processedItem_r1, $index_r5, "itemLink"));
			ɵɵattribute("href", ctx_r1.getItemProp(processedItem_r1, "url"), ɵɵsanitizeUrl)("data-automationid", ctx_r1.getItemProp(processedItem_r1, "automationId"))("title", ctx_r1.getItemProp(processedItem_r1, "title"))("target", ctx_r1.getItemProp(processedItem_r1, "target"))("tabindex", -1);
			ɵɵadvance();
			ɵɵconditional(ctx_r1.getItemProp(processedItem_r1, "icon") ? 1 : -1);
			ɵɵadvance();
			ɵɵconditional(ctx_r1.getItemProp(processedItem_r1, "escape") ? 2 : 3);
			ɵɵadvance(2);
			ɵɵconditional(ctx_r1.getItemProp(processedItem_r1, "badge") ? 4 : -1);
			ɵɵadvance();
			ɵɵconditional(ctx_r1.isItemGroup(processedItem_r1) ? 5 : -1);
		}
	}
	function MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_1_Conditional_1_Template(rf, ctx) {
		if (rf & 1) ɵɵelement(0, "span", 14);
		if (rf & 2) {
			const ctx_r3 = ɵɵnextContext(4);
			const processedItem_r1 = ctx_r3.$implicit;
			const $index_r5 = ctx_r3.$index;
			const ctx_r1 = ɵɵnextContext();
			ɵɵstyleMap(ctx_r1.getItemProp(processedItem_r1, "iconStyle"));
			ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("itemIcon"), ctx_r1.getItemProp(processedItem_r1, "icon"), ctx_r1.getItemProp(processedItem_r1, "iconClass")));
			ɵɵproperty("pBind", ctx_r1.getPTOptions(processedItem_r1, $index_r5, "itemIcon"));
			ɵɵattribute("tabindex", -1);
		}
	}
	function MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_1_Conditional_2_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "span", 14);
			ɵɵtext(1);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r3 = ɵɵnextContext(4);
			const processedItem_r1 = ctx_r3.$implicit;
			const $index_r5 = ctx_r3.$index;
			const ctx_r1 = ɵɵnextContext();
			ɵɵstyleMap(ctx_r1.getItemProp(processedItem_r1, "labelStyle"));
			ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("itemLabel"), ctx_r1.getItemProp(processedItem_r1, "labelClass")));
			ɵɵproperty("pBind", ctx_r1.getPTOptions(processedItem_r1, $index_r5, "itemLabel"));
			ɵɵadvance();
			ɵɵtextInterpolate(ctx_r1.getItemLabel(processedItem_r1));
		}
	}
	function MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_1_Conditional_3_Template(rf, ctx) {
		if (rf & 1) ɵɵelement(0, "span", 25);
		if (rf & 2) {
			const ctx_r3 = ɵɵnextContext(4);
			const processedItem_r1 = ctx_r3.$implicit;
			const $index_r5 = ctx_r3.$index;
			const ctx_r1 = ɵɵnextContext();
			ɵɵstyleMap(ctx_r1.getItemProp(processedItem_r1, "labelStyle"));
			ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("itemLabel"), ctx_r1.getItemProp(processedItem_r1, "labelClass")));
			ɵɵproperty("innerHTML", ctx_r1.getItemLabel(processedItem_r1), ɵɵsanitizeHtml)("pBind", ctx_r1.getPTOptions(processedItem_r1, $index_r5, "itemLabel"));
		}
	}
	function MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_1_Conditional_4_Template(rf, ctx) {
		if (rf & 1) ɵɵelement(0, "p-badge", 17);
		if (rf & 2) {
			const ctx_r3 = ɵɵnextContext(4);
			const processedItem_r1 = ctx_r3.$implicit;
			const $index_r5 = ctx_r3.$index;
			const ctx_r1 = ɵɵnextContext();
			ɵɵclassMap(ctx_r1.getItemProp(processedItem_r1, "badgeStyleClass"));
			ɵɵproperty("value", ctx_r1.getItemProp(processedItem_r1, "badge"))("pt", ctx_r1.getPTOptions(processedItem_r1, $index_r5, "pcBadge"))("unstyled", ctx_r1.unstyled());
		}
	}
	function MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_1_Conditional_5_Conditional_0_Conditional_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 21);
		}
		if (rf & 2) {
			const ctx_r3 = ɵɵnextContext(6);
			const processedItem_r1 = ctx_r3.$implicit;
			const $index_r5 = ctx_r3.$index;
			const ctx_r1 = ɵɵnextContext();
			ɵɵclassMap(ctx_r1.cx("submenuIcon"));
			ɵɵproperty("pBind", ctx_r1.getPTOptions(processedItem_r1, $index_r5, "submenuIcon"));
		}
	}
	function MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_1_Conditional_5_Conditional_0_Conditional_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 22);
		}
		if (rf & 2) {
			const ctx_r3 = ɵɵnextContext(6);
			const processedItem_r1 = ctx_r3.$implicit;
			const $index_r5 = ctx_r3.$index;
			const ctx_r1 = ɵɵnextContext();
			ɵɵclassMap(ctx_r1.cx("submenuIcon"));
			ɵɵproperty("pBind", ctx_r1.getPTOptions(processedItem_r1, $index_r5, "submenuIcon"));
		}
	}
	function MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_1_Conditional_5_Conditional_0_Template(rf, ctx) {
		if (rf & 1) ɵɵconditionalCreate(0, MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_1_Conditional_5_Conditional_0_Conditional_0_Template, 1, 3, "svg", 19)(1, MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_1_Conditional_5_Conditional_0_Conditional_1_Template, 1, 3, "svg", 20);
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext(6);
			ɵɵconditional(ctx_r1.root() ? 0 : 1);
		}
	}
	function MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_1_Conditional_5_ng_container_1_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_1_Conditional_5_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵconditionalCreate(0, MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_1_Conditional_5_Conditional_0_Template, 2, 1);
			ɵɵtemplate(1, MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_1_Conditional_5_ng_container_1_Template, 1, 0, "ng-container", 18);
		}
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext(5);
			ɵɵconditional(!ctx_r1.submenuiconTemplate() ? 0 : -1);
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", ctx_r1.submenuiconTemplate());
		}
	}
	function MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "a", 23);
			ɵɵconditionalCreate(1, MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_1_Conditional_1_Template, 1, 6, "span", 10);
			ɵɵconditionalCreate(2, MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_1_Conditional_2_Template, 2, 6, "span", 10)(3, MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_1_Conditional_3_Template, 1, 6, "span", 24);
			ɵɵconditionalCreate(4, MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_1_Conditional_4_Template, 1, 5, "p-badge", 13);
			ɵɵconditionalCreate(5, MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_1_Conditional_5_Template, 2, 2);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r3 = ɵɵnextContext(3);
			const processedItem_r1 = ctx_r3.$implicit;
			const $index_r5 = ctx_r3.$index;
			const ctx_r1 = ɵɵnextContext();
			ɵɵstyleMap(ctx_r1.getItemProp(processedItem_r1, "linkStyle"));
			ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("itemLink"), ctx_r1.getItemProp(processedItem_r1, "linkClass")));
			ɵɵproperty("routerLink", ctx_r1.getItemProp(processedItem_r1, "routerLink"))("queryParams", ctx_r1.getItemProp(processedItem_r1, "queryParams"))("routerLinkActive", "p-menubar-item-link-active")("routerLinkActiveOptions", ctx_r1.getRouterLinkActiveOptions(processedItem_r1))("target", ctx_r1.getItemProp(processedItem_r1, "target"))("fragment", ctx_r1.getItemProp(processedItem_r1, "fragment"))("queryParamsHandling", ctx_r1.getItemProp(processedItem_r1, "queryParamsHandling"))("preserveFragment", ctx_r1.getItemProp(processedItem_r1, "preserveFragment"))("skipLocationChange", ctx_r1.getItemProp(processedItem_r1, "skipLocationChange"))("replaceUrl", ctx_r1.getItemProp(processedItem_r1, "replaceUrl"))("state", ctx_r1.getItemProp(processedItem_r1, "state"))("pBind", ctx_r1.getPTOptions(processedItem_r1, $index_r5, "itemLink"));
			ɵɵattribute("data-automationid", ctx_r1.getItemProp(processedItem_r1, "automationId"))("title", ctx_r1.getItemProp(processedItem_r1, "title"))("tabindex", -1);
			ɵɵadvance();
			ɵɵconditional(ctx_r1.getItemProp(processedItem_r1, "icon") ? 1 : -1);
			ɵɵadvance();
			ɵɵconditional(ctx_r1.getItemProp(processedItem_r1, "escape") ? 2 : 3);
			ɵɵadvance(2);
			ɵɵconditional(ctx_r1.getItemProp(processedItem_r1, "badge") ? 4 : -1);
			ɵɵadvance();
			ɵɵconditional(ctx_r1.isItemGroup(processedItem_r1) ? 5 : -1);
		}
	}
	function MenubarSub_For_1_Conditional_1_Conditional_3_Template(rf, ctx) {
		if (rf & 1) ɵɵconditionalCreate(0, MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_0_Template, 6, 14, "a", 7)(1, MenubarSub_For_1_Conditional_1_Conditional_3_Conditional_1_Template, 6, 23, "a", 8);
		if (rf & 2) {
			const processedItem_r1 = ɵɵnextContext(2).$implicit;
			const ctx_r1 = ɵɵnextContext();
			ɵɵconditional(!ctx_r1.getItemProp(processedItem_r1, "routerLink") ? 0 : 1);
		}
	}
	function MenubarSub_For_1_Conditional_1_Conditional_4_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function MenubarSub_For_1_Conditional_1_Conditional_4_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, MenubarSub_For_1_Conditional_1_Conditional_4_ng_container_0_Template, 1, 0, "ng-container", 26);
		if (rf & 2) {
			const processedItem_r1 = ɵɵnextContext(2).$implicit;
			const ctx_r1 = ɵɵnextContext();
			ɵɵproperty("ngTemplateOutlet", ctx_r1.itemTemplate())("ngTemplateOutletContext", ctx_r1.getItemTemplateContext(processedItem_r1.item, ctx_r1.root()));
		}
	}
	function MenubarSub_For_1_Conditional_1_Conditional_5_Template(rf, ctx) {
		if (rf & 1) {
			const _r6 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "ul", 27);
			ɵɵlistener("itemClick", function MenubarSub_For_1_Conditional_1_Conditional_5_Template_ul_itemClick_0_listener($event) {
				ɵɵrestoreView(_r6);
				const ctx_r1 = ɵɵnextContext(3);
				return ɵɵresetView(ctx_r1.itemClick.emit($event));
			})("itemMouseEnter", function MenubarSub_For_1_Conditional_1_Conditional_5_Template_ul_itemMouseEnter_0_listener($event) {
				ɵɵrestoreView(_r6);
				const ctx_r1 = ɵɵnextContext(3);
				return ɵɵresetView(ctx_r1.onItemMouseEnter($event));
			});
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const processedItem_r1 = ɵɵnextContext(2).$implicit;
			const ctx_r1 = ɵɵnextContext();
			ɵɵproperty("itemTemplate", ctx_r1.itemTemplate())("items", processedItem_r1.items)("mobileActive", ctx_r1.mobileActive())("autoDisplay", ctx_r1.autoDisplay())("menuId", ctx_r1.menuId())("activeItemPath", ctx_r1.activeItemPath())("focusedItemId", ctx_r1.focusedItemId())("level", ctx_r1.level() + 1)("pMotion", ctx_r1.isItemActive(processedItem_r1))("pMotionDisabled", ctx_r1.mobileActive())("pMotionName", ctx_r1.pcn("p-anchored-overlay"))("pMotionAppear", true)("pMotionOptions", ctx_r1.motionOptions())("motionOptions", ctx_r1.motionOptions())("pt", ctx_r1.pt())("pBind", ctx_r1.ptm("submenu"))("unstyled", ctx_r1.unstyled())("submenuiconTemplate", ctx_r1.submenuiconTemplate());
			ɵɵattribute("aria-labelledby", ctx_r1.getItemLabelId(processedItem_r1));
		}
	}
	function MenubarSub_For_1_Conditional_1_Template(rf, ctx) {
		if (rf & 1) {
			const _r3 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "li", 4, 0)(2, "div", 5);
			ɵɵlistener("click", function MenubarSub_For_1_Conditional_1_Template_div_click_2_listener($event) {
				ɵɵrestoreView(_r3);
				const processedItem_r1 = ɵɵnextContext().$implicit;
				const ctx_r1 = ɵɵnextContext();
				return ɵɵresetView(ctx_r1.onItemClick($event, processedItem_r1));
			})("mouseenter", function MenubarSub_For_1_Conditional_1_Template_div_mouseenter_2_listener($event) {
				ɵɵrestoreView(_r3);
				const processedItem_r1 = ɵɵnextContext().$implicit;
				const ctx_r1 = ɵɵnextContext();
				return ɵɵresetView(ctx_r1.onItemMouseEnter({
					originalEvent: $event,
					processedItem: processedItem_r1
				}));
			});
			ɵɵconditionalCreate(3, MenubarSub_For_1_Conditional_1_Conditional_3_Template, 2, 1)(4, MenubarSub_For_1_Conditional_1_Conditional_4_Template, 1, 2, "ng-container");
			ɵɵelementEnd();
			ɵɵconditionalCreate(5, MenubarSub_For_1_Conditional_1_Conditional_5_Template, 1, 19, "ul", 6);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r3 = ɵɵnextContext();
			const processedItem_r1 = ctx_r3.$implicit;
			const $index_r5 = ctx_r3.$index;
			const ctx_r1 = ɵɵnextContext();
			ɵɵstyleMap(ctx_r1.getItemProp(processedItem_r1, "style"));
			ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("item", ɵɵpureFunction2(22, _c0, ctx_r1, processedItem_r1)), ctx_r1.getItemProp(processedItem_r1, "styleClass")));
			ɵɵproperty("pBind", ctx_r1.getPTOptions(processedItem_r1, $index_r5, "item"))("tooltipOptions", ctx_r1.getItemProp(processedItem_r1, "tooltipOptions"))("pTooltipUnstyled", ctx_r1.unstyled());
			ɵɵattribute("id", ctx_r1.getItemId(processedItem_r1))("data-p-highlight", ctx_r1.isItemActive(processedItem_r1))("data-p-focused", ctx_r1.isItemFocused(processedItem_r1))("data-p-disabled", ctx_r1.isItemDisabled(processedItem_r1))("aria-label", ctx_r1.getItemLabel(processedItem_r1))("aria-disabled", ctx_r1.isItemDisabled(processedItem_r1) || void 0)("aria-haspopup", ctx_r1.isItemGroup(processedItem_r1) && !ctx_r1.getItemProp(processedItem_r1, "to") ? "menu" : void 0)("aria-expanded", ctx_r1.isItemGroup(processedItem_r1) ? ctx_r1.isItemActive(processedItem_r1) : void 0)("aria-setsize", ctx_r1.getAriaSetSize())("aria-posinset", ctx_r1.getAriaPosInset($index_r5));
			ɵɵadvance(2);
			ɵɵclassMap(ctx_r1.cx("itemContent"));
			ɵɵproperty("pBind", ctx_r1.getPTOptions(processedItem_r1, $index_r5, "itemContent"));
			ɵɵadvance();
			ɵɵconditional(!ctx_r1.itemTemplate() ? 3 : 4);
			ɵɵadvance(2);
			ɵɵconditional(ctx_r1.isItemVisible(processedItem_r1) && ctx_r1.isItemGroup(processedItem_r1) ? 5 : -1);
		}
	}
	function MenubarSub_For_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵconditionalCreate(0, MenubarSub_For_1_Conditional_0_Template, 1, 6, "li", 1);
			ɵɵconditionalCreate(1, MenubarSub_For_1_Conditional_1_Template, 6, 25, "li", 2);
		}
		if (rf & 2) {
			const processedItem_r1 = ctx.$implicit;
			const ctx_r1 = ɵɵnextContext();
			ɵɵconditional(ctx_r1.isItemVisible(processedItem_r1) && ctx_r1.getItemProp(processedItem_r1, "separator") ? 0 : -1);
			ɵɵadvance();
			ɵɵconditional(ctx_r1.isItemVisible(processedItem_r1) && !ctx_r1.getItemProp(processedItem_r1, "separator") ? 1 : -1);
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _MenubarSub,
		selectors: [["p-menubarsub"], [
			"",
			"pMenubarSub",
			""
		]],
		hostVars: 7,
		hostBindings: function MenubarSub_HostBindings(rf, ctx) {
			if (rf & 2) {
				ɵɵattribute("id", ctx.hostId())("aria-activedescendant", ctx.focusedItemId())("role", "menubar");
				ɵɵstyleMap(ctx.inlineStyles());
				ɵɵclassMap(ctx.hostClass());
			}
		},
		inputs: {
			items: [1, "items"],
			itemTemplate: [1, "itemTemplate"],
			root: [1, "root"],
			autoZIndex: [1, "autoZIndex"],
			baseZIndex: [1, "baseZIndex"],
			mobileActive: [1, "mobileActive"],
			autoDisplay: [1, "autoDisplay"],
			menuId: [1, "menuId"],
			ariaLabel: [1, "ariaLabel"],
			ariaLabelledBy: [1, "ariaLabelledBy"],
			level: [1, "level"],
			focusedItemId: [1, "focusedItemId"],
			activeItemPath: [1, "activeItemPath"],
			inlineStyles: [1, "inlineStyles"],
			motionOptions: [1, "motionOptions"],
			submenuiconTemplate: [1, "submenuiconTemplate"]
		},
		outputs: {
			itemClick: "itemClick",
			itemMouseEnter: "itemMouseEnter",
			menuFocus: "menuFocus",
			menuBlur: "menuBlur",
			menuKeydown: "menuKeydown"
		},
		features: [ɵɵInheritDefinitionFeature],
		decls: 2,
		vars: 0,
		consts: [
			["listItem", ""],
			[
				"role",
				"separator",
				3,
				"style",
				"class",
				"pBind"
			],
			[
				"role",
				"menuitem",
				"pTooltip",
				"",
				3,
				"style",
				"class",
				"pBind",
				"tooltipOptions",
				"pTooltipUnstyled"
			],
			[
				"role",
				"separator",
				3,
				"pBind"
			],
			[
				"role",
				"menuitem",
				"pTooltip",
				"",
				3,
				"pBind",
				"tooltipOptions",
				"pTooltipUnstyled"
			],
			[
				3,
				"click",
				"mouseenter",
				"pBind"
			],
			[
				"pMenubarSub",
				"",
				3,
				"itemTemplate",
				"items",
				"mobileActive",
				"autoDisplay",
				"menuId",
				"activeItemPath",
				"focusedItemId",
				"level",
				"pMotion",
				"pMotionDisabled",
				"pMotionName",
				"pMotionAppear",
				"pMotionOptions",
				"motionOptions",
				"pt",
				"pBind",
				"unstyled",
				"submenuiconTemplate"
			],
			[
				"pRipple",
				"",
				3,
				"class",
				"style",
				"pBind"
			],
			[
				"pRipple",
				"",
				3,
				"routerLink",
				"queryParams",
				"routerLinkActive",
				"routerLinkActiveOptions",
				"target",
				"class",
				"style",
				"fragment",
				"queryParamsHandling",
				"preserveFragment",
				"skipLocationChange",
				"replaceUrl",
				"state",
				"pBind"
			],
			[
				"pRipple",
				"",
				3,
				"pBind"
			],
			[
				3,
				"class",
				"style",
				"pBind"
			],
			[
				3,
				"class",
				"style",
				"id",
				"pBind"
			],
			[
				3,
				"class",
				"style",
				"innerHTML",
				"id",
				"pBind"
			],
			[
				3,
				"class",
				"value",
				"pt",
				"unstyled"
			],
			[3, "pBind"],
			[
				3,
				"id",
				"pBind"
			],
			[
				3,
				"innerHTML",
				"id",
				"pBind"
			],
			[
				3,
				"value",
				"pt",
				"unstyled"
			],
			[4, "ngTemplateOutlet"],
			[
				"data-p-icon",
				"angle-down",
				3,
				"class",
				"pBind"
			],
			[
				"data-p-icon",
				"angle-right",
				3,
				"class",
				"pBind"
			],
			[
				"data-p-icon",
				"angle-down",
				3,
				"pBind"
			],
			[
				"data-p-icon",
				"angle-right",
				3,
				"pBind"
			],
			[
				"pRipple",
				"",
				3,
				"routerLink",
				"queryParams",
				"routerLinkActive",
				"routerLinkActiveOptions",
				"target",
				"fragment",
				"queryParamsHandling",
				"preserveFragment",
				"skipLocationChange",
				"replaceUrl",
				"state",
				"pBind"
			],
			[
				3,
				"class",
				"style",
				"innerHTML",
				"pBind"
			],
			[
				3,
				"innerHTML",
				"pBind"
			],
			[
				4,
				"ngTemplateOutlet",
				"ngTemplateOutletContext"
			],
			[
				"pMenubarSub",
				"",
				3,
				"itemClick",
				"itemMouseEnter",
				"itemTemplate",
				"items",
				"mobileActive",
				"autoDisplay",
				"menuId",
				"activeItemPath",
				"focusedItemId",
				"level",
				"pMotion",
				"pMotionDisabled",
				"pMotionName",
				"pMotionAppear",
				"pMotionOptions",
				"motionOptions",
				"pt",
				"pBind",
				"unstyled",
				"submenuiconTemplate"
			]
		],
		template: function MenubarSub_Template(rf, ctx) {
			if (rf & 1) ɵɵrepeaterCreate(0, MenubarSub_For_1_Template, 2, 2, null, null, _forTrack0);
			if (rf & 2) ɵɵrepeater(ctx.items());
		},
		dependencies: [
			_MenubarSub,
			NgTemplateOutlet,
			RouterModule,
			RouterLink,
			RouterLinkActive,
			Ripple,
			TooltipModule,
			Tooltip,
			Bind,
			AngleDown,
			AngleRight,
			BadgeModule,
			Badge,
			SharedModule,
			BindModule,
			MotionModule,
			MotionDirective
		],
		encapsulation: 2
	});
})()), _MenubarSub);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenubarSub, [{
		type: Component,
		args: [{
			selector: "p-menubarsub, [pMenubarSub]",
			standalone: true,
			imports: [
				NgTemplateOutlet,
				RouterModule,
				Ripple,
				TooltipModule,
				AngleDown,
				AngleRight,
				BadgeModule,
				SharedModule,
				BindModule,
				MotionModule
			],
			template: `
        @for (processedItem of items(); track processedItem.key) {
            @if (isItemVisible(processedItem) && getItemProp(processedItem, 'separator')) {
                <li [attr.id]="getItemId(processedItem)" [style]="getItemProp(processedItem, 'style')" [class]="cn(cx('separator'), getItemProp(processedItem, 'styleClass'))" role="separator" [pBind]="ptm('separator')"></li>
            }
            @if (isItemVisible(processedItem) && !getItemProp(processedItem, 'separator')) {
                <li
                    #listItem
                    role="menuitem"
                    [attr.id]="getItemId(processedItem)"
                    [attr.data-p-highlight]="isItemActive(processedItem)"
                    [attr.data-p-focused]="isItemFocused(processedItem)"
                    [attr.data-p-disabled]="isItemDisabled(processedItem)"
                    [attr.aria-label]="getItemLabel(processedItem)"
                    [attr.aria-disabled]="isItemDisabled(processedItem) || undefined"
                    [attr.aria-haspopup]="isItemGroup(processedItem) && !getItemProp(processedItem, 'to') ? 'menu' : undefined"
                    [attr.aria-expanded]="isItemGroup(processedItem) ? isItemActive(processedItem) : undefined"
                    [attr.aria-setsize]="getAriaSetSize()"
                    [attr.aria-posinset]="getAriaPosInset($index)"
                    [style]="getItemProp(processedItem, 'style')"
                    [class]="cn(cx('item', { instance: this, processedItem }), getItemProp(processedItem, 'styleClass'))"
                    [pBind]="getPTOptions(processedItem, $index, 'item')"
                    pTooltip
                    [tooltipOptions]="getItemProp(processedItem, 'tooltipOptions')"
                    [pTooltipUnstyled]="unstyled()"
                >
                    <div [class]="cx('itemContent')" [pBind]="getPTOptions(processedItem, $index, 'itemContent')" (click)="onItemClick($event, processedItem)" (mouseenter)="onItemMouseEnter({ originalEvent: $event, processedItem })">
                        @if (!itemTemplate()) {
                            @if (!getItemProp(processedItem, 'routerLink')) {
                                <a
                                    [attr.href]="getItemProp(processedItem, 'url')"
                                    [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                                    [attr.title]="getItemProp(processedItem, 'title')"
                                    [attr.target]="getItemProp(processedItem, 'target')"
                                    [class]="cn(cx('itemLink'), getItemProp(processedItem, 'linkClass'))"
                                    [style]="getItemProp(processedItem, 'linkStyle')"
                                    [attr.tabindex]="-1"
                                    [pBind]="getPTOptions(processedItem, $index, 'itemLink')"
                                    pRipple
                                >
                                    @if (getItemProp(processedItem, 'icon')) {
                                        <span
                                            [class]="cn(cx('itemIcon'), getItemProp(processedItem, 'icon'), getItemProp(processedItem, 'iconClass'))"
                                            [style]="getItemProp(processedItem, 'iconStyle')"
                                            [attr.tabindex]="-1"
                                            [pBind]="getPTOptions(processedItem, $index, 'itemIcon')"
                                        >
                                        </span>
                                    }
                                    @if (getItemProp(processedItem, 'escape')) {
                                        <span
                                            [class]="cn(cx('itemLabel'), getItemProp(processedItem, 'labelClass'))"
                                            [style]="getItemProp(processedItem, 'labelStyle')"
                                            [id]="getItemLabelId(processedItem)"
                                            [pBind]="getPTOptions(processedItem, $index, 'itemLabel')"
                                        >
                                            {{ getItemLabel(processedItem) }}
                                        </span>
                                    } @else {
                                        <span
                                            [class]="cn(cx('itemLabel'), getItemProp(processedItem, 'labelClass'))"
                                            [style]="getItemProp(processedItem, 'labelStyle')"
                                            [innerHTML]="getItemLabel(processedItem)"
                                            [id]="getItemLabelId(processedItem)"
                                            [pBind]="getPTOptions(processedItem, $index, 'itemLabel')"
                                        ></span>
                                    }
                                    @if (getItemProp(processedItem, 'badge')) {
                                        <p-badge [class]="getItemProp(processedItem, 'badgeStyleClass')" [value]="getItemProp(processedItem, 'badge')" [pt]="getPTOptions(processedItem, $index, 'pcBadge')" [unstyled]="unstyled()" />
                                    }
                                    @if (isItemGroup(processedItem)) {
                                        @if (!submenuiconTemplate()) {
                                            @if (root()) {
                                                <svg data-p-icon="angle-down" [class]="cx('submenuIcon')" [pBind]="getPTOptions(processedItem, $index, 'submenuIcon')" />
                                            } @else {
                                                <svg data-p-icon="angle-right" [class]="cx('submenuIcon')" [pBind]="getPTOptions(processedItem, $index, 'submenuIcon')" />
                                            }
                                        }
                                        <ng-container *ngTemplateOutlet="submenuiconTemplate()"></ng-container>
                                    }
                                </a>
                            } @else {
                                <a
                                    [routerLink]="getItemProp(processedItem, 'routerLink')"
                                    [attr.data-automationid]="getItemProp(processedItem, 'automationId')"
                                    [attr.title]="getItemProp(processedItem, 'title')"
                                    [attr.tabindex]="-1"
                                    [queryParams]="getItemProp(processedItem, 'queryParams')"
                                    [routerLinkActive]="'p-menubar-item-link-active'"
                                    [routerLinkActiveOptions]="getRouterLinkActiveOptions(processedItem)"
                                    [target]="getItemProp(processedItem, 'target')"
                                    [class]="cn(cx('itemLink'), getItemProp(processedItem, 'linkClass'))"
                                    [style]="getItemProp(processedItem, 'linkStyle')"
                                    [fragment]="getItemProp(processedItem, 'fragment')"
                                    [queryParamsHandling]="getItemProp(processedItem, 'queryParamsHandling')"
                                    [preserveFragment]="getItemProp(processedItem, 'preserveFragment')"
                                    [skipLocationChange]="getItemProp(processedItem, 'skipLocationChange')"
                                    [replaceUrl]="getItemProp(processedItem, 'replaceUrl')"
                                    [state]="getItemProp(processedItem, 'state')"
                                    [pBind]="getPTOptions(processedItem, $index, 'itemLink')"
                                    pRipple
                                >
                                    @if (getItemProp(processedItem, 'icon')) {
                                        <span
                                            [class]="cn(cx('itemIcon'), getItemProp(processedItem, 'icon'), getItemProp(processedItem, 'iconClass'))"
                                            [style]="getItemProp(processedItem, 'iconStyle')"
                                            [attr.tabindex]="-1"
                                            [pBind]="getPTOptions(processedItem, $index, 'itemIcon')"
                                        ></span>
                                    }
                                    @if (getItemProp(processedItem, 'escape')) {
                                        <span [class]="cn(cx('itemLabel'), getItemProp(processedItem, 'labelClass'))" [style]="getItemProp(processedItem, 'labelStyle')" [pBind]="getPTOptions(processedItem, $index, 'itemLabel')">{{
                                            getItemLabel(processedItem)
                                        }}</span>
                                    } @else {
                                        <span
                                            [class]="cn(cx('itemLabel'), getItemProp(processedItem, 'labelClass'))"
                                            [style]="getItemProp(processedItem, 'labelStyle')"
                                            [innerHTML]="getItemLabel(processedItem)"
                                            [pBind]="getPTOptions(processedItem, $index, 'itemLabel')"
                                        ></span>
                                    }
                                    @if (getItemProp(processedItem, 'badge')) {
                                        <p-badge [class]="getItemProp(processedItem, 'badgeStyleClass')" [value]="getItemProp(processedItem, 'badge')" [pt]="getPTOptions(processedItem, $index, 'pcBadge')" [unstyled]="unstyled()" />
                                    }
                                    @if (isItemGroup(processedItem)) {
                                        @if (!submenuiconTemplate()) {
                                            @if (root()) {
                                                <svg data-p-icon="angle-down" [class]="cx('submenuIcon')" [pBind]="getPTOptions(processedItem, $index, 'submenuIcon')" />
                                            } @else {
                                                <svg data-p-icon="angle-right" [class]="cx('submenuIcon')" [pBind]="getPTOptions(processedItem, $index, 'submenuIcon')" />
                                            }
                                        }
                                        <ng-container *ngTemplateOutlet="submenuiconTemplate()"></ng-container>
                                    }
                                </a>
                            }
                        } @else {
                            <ng-container *ngTemplateOutlet="itemTemplate(); context: getItemTemplateContext(processedItem.item, root())"></ng-container>
                        }
                    </div>
                    @if (isItemVisible(processedItem) && isItemGroup(processedItem)) {
                        <ul
                            pMenubarSub
                            [itemTemplate]="itemTemplate()"
                            [items]="processedItem.items"
                            [mobileActive]="mobileActive()"
                            [autoDisplay]="autoDisplay()"
                            [menuId]="menuId()"
                            [activeItemPath]="activeItemPath()"
                            [focusedItemId]="focusedItemId()"
                            [level]="level() + 1"
                            [attr.aria-labelledby]="getItemLabelId(processedItem)"
                            (itemClick)="itemClick.emit($event)"
                            (itemMouseEnter)="onItemMouseEnter($event)"
                            [pMotion]="isItemActive(processedItem)"
                            [pMotionDisabled]="mobileActive()"
                            [pMotionName]="pcn('p-anchored-overlay')"
                            [pMotionAppear]="true"
                            [pMotionOptions]="motionOptions()"
                            [motionOptions]="motionOptions()"
                            [pt]="pt()"
                            [pBind]="ptm('submenu')"
                            [unstyled]="unstyled()"
                            [submenuiconTemplate]="submenuiconTemplate()"
                        ></ul>
                    }
                </li>
            }
        }
    `,
			encapsulation: ViewEncapsulation.None,
			host: {
				"[attr.id]": "hostId()",
				"[attr.aria-activedescendant]": "focusedItemId()",
				"[class]": "hostClass()",
				"[attr.role]": "'menubar'",
				"[style]": "inlineStyles()"
			}
		}]
	}], null, {
		items: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "items",
				required: false
			}]
		}],
		itemTemplate: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "itemTemplate",
				required: false
			}]
		}],
		root: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "root",
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
		mobileActive: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "mobileActive",
				required: false
			}]
		}],
		autoDisplay: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "autoDisplay",
				required: false
			}]
		}],
		menuId: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "menuId",
				required: false
			}]
		}],
		ariaLabel: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "ariaLabel",
				required: false
			}]
		}],
		ariaLabelledBy: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "ariaLabelledBy",
				required: false
			}]
		}],
		level: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "level",
				required: false
			}]
		}],
		focusedItemId: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "focusedItemId",
				required: false
			}]
		}],
		activeItemPath: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "activeItemPath",
				required: false
			}]
		}],
		inlineStyles: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "inlineStyles",
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
		submenuiconTemplate: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "submenuiconTemplate",
				required: false
			}]
		}],
		itemClick: [{
			type: Output,
			args: ["itemClick"]
		}],
		itemMouseEnter: [{
			type: Output,
			args: ["itemMouseEnter"]
		}],
		menuFocus: [{
			type: Output,
			args: ["menuFocus"]
		}],
		menuBlur: [{
			type: Output,
			args: ["menuBlur"]
		}],
		menuKeydown: [{
			type: Output,
			args: ["menuKeydown"]
		}]
	});
})();
var MENUBAR_INSTANCE = new InjectionToken("MENUBAR_INSTANCE");
var Menubar = (_Menubar = class Menubar extends BaseComponent {
	get visibleItems() {
		const processedItem = this.activeItemPath().find((p) => p.key === this.focusedItemInfo().parentKey);
		return processedItem ? processedItem.items : this.processedItems();
	}
	get navigationAriaLabel() {
		var _this$config$translat;
		return (_this$config$translat = this.config.translation) === null || _this$config$translat === void 0 || (_this$config$translat = _this$config$translat.aria) === null || _this$config$translat === void 0 ? void 0 : _this$config$translat.navigation;
	}
	get focusedItemId() {
		var _focusedItem$item;
		const focusedItem = this.focusedItemInfo();
		return focusedItem.item && ((_focusedItem$item = focusedItem.item) === null || _focusedItem$item === void 0 ? void 0 : _focusedItem$item.id) ? focusedItem.item.id : focusedItem.index !== -1 ? `${this.$id()}${l(focusedItem.parentKey) ? "_" + focusedItem.parentKey : ""}_${focusedItem.index}` : null;
	}
	constructor() {
		var _inject;
		super();
		_defineProperty(this, "componentName", "Menubar");
		_defineProperty(this, "$pcMenubar", (_inject = inject(MENUBAR_INSTANCE, {
			optional: true,
			skipSelf: true
		})) !== null && _inject !== void 0 ? _inject : void 0);
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		_defineProperty(this, "menubarService", inject(MenubarService));
		_defineProperty(this, "model", input(...ngDevMode ? [void 0, { debugName: "model" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "autoZIndex", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "autoZIndex" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "baseZIndex", input(0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "baseZIndex" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "motionOptions", input(...ngDevMode ? [void 0, { debugName: "motionOptions" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "autoDisplay", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "autoDisplay" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "autoHide", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "autoHide" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "breakpoint", input("960px", ...ngDevMode ? [{ debugName: "breakpoint" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "autoHideDelay", input(100, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "autoHideDelay" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "id", input(...ngDevMode ? [void 0, { debugName: "id" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "ariaLabel", input(...ngDevMode ? [void 0, { debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "ariaLabelledBy", input(...ngDevMode ? [void 0, { debugName: "ariaLabelledBy" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "onFocus", output());
		_defineProperty(this, "onBlur", output());
		_defineProperty(this, "startTemplate", contentChild("start", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "startTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "endTemplate", contentChild("end", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "endTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "itemTemplate", contentChild("item", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "itemTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "menuIconTemplate", contentChild("menuicon", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "menuIconTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "submenuIconTemplate", contentChild("submenuicon", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "submenuIconTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "menubutton", viewChild("menubutton", ...ngDevMode ? [{ debugName: "menubutton" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "rootmenu", viewChild("rootmenu", ...ngDevMode ? [{ debugName: "rootmenu" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_internalId", this.$useId.next("pn_id_"));
		_defineProperty(this, "$id", computed(() => this.id() || this._internalId, ...ngDevMode ? [{ debugName: "$id" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "computedMotionOptions", computed(() => _objectSpread2(_objectSpread2({}, this.ptm("motion")), this.motionOptions()), ...ngDevMode ? [{ debugName: "computedMotionOptions" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "mobileActive", void 0);
		_defineProperty(this, "matchMediaListener", void 0);
		_defineProperty(this, "query", void 0);
		_defineProperty(this, "queryMatches", signal(false, ...ngDevMode ? [{ debugName: "queryMatches" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "outsideClickListener", void 0);
		_defineProperty(this, "resizeListener", void 0);
		_defineProperty(this, "mouseLeaveSubscriber", void 0);
		_defineProperty(this, "dirty", false);
		_defineProperty(this, "focused", false);
		_defineProperty(this, "activeItemPath", signal([], ...ngDevMode ? [{ debugName: "activeItemPath" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "focusedItemInfo", signal({
			index: -1,
			level: 0,
			parentKey: "",
			item: null
		}, ...ngDevMode ? [{ debugName: "focusedItemInfo" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "searchValue", "");
		_defineProperty(this, "searchTimeout", null);
		_defineProperty(this, "_componentStyle", inject(MenuBarStyle));
		_defineProperty(this, "processedItems", computed(() => this.createProcessedItems(this.model() || []), ...ngDevMode ? [{ debugName: "processedItems" }] : /* istanbul ignore next */ []));
		effect(() => {
			const path = this.activeItemPath();
			if (l(path)) {
				this.bindOutsideClickListener();
				this.bindResizeListener();
			} else {
				this.unbindOutsideClickListener();
				this.unbindResizeListener();
			}
		});
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
	}
	onInit() {
		this.bindMatchMediaListener();
		this.menubarService.autoHide = this.autoHide();
		this.menubarService.autoHideDelay = this.autoHideDelay();
		this.mouseLeaveSubscriber = this.menubarService.mouseLeft$.subscribe(() => {
			this.hide();
		});
	}
	createProcessedItems(items, level = 0, parent = {}, parentKey = "") {
		const processedItems = [];
		if (items) items.forEach((item, index) => {
			const key = (parentKey !== "" ? parentKey + "_" : "") + index;
			const newItem = {
				item,
				index,
				level,
				key,
				parent,
				parentKey
			};
			newItem.items = this.createProcessedItems(item.items || [], level + 1, newItem, key);
			processedItems.push(newItem);
		});
		return processedItems;
	}
	bindMatchMediaListener() {
		if (isPlatformBrowser(this.platformId)) {
			if (!this.matchMediaListener) {
				const query = window.matchMedia(`(max-width: ${this.breakpoint()})`);
				this.query = query;
				this.queryMatches.set(query.matches);
				this.matchMediaListener = () => {
					this.queryMatches.set(query.matches);
					this.mobileActive = false;
					this.cd.markForCheck();
				};
				query.addEventListener("change", this.matchMediaListener);
			}
		}
	}
	unbindMatchMediaListener() {
		if (this.matchMediaListener) {
			this.query.removeEventListener("change", this.matchMediaListener);
			this.matchMediaListener = null;
		}
	}
	getItemProp(item, name) {
		return item ? x(item[name]) : void 0;
	}
	menuButtonClick(event) {
		this.toggle(event);
	}
	menuButtonKeydown(event) {
		if (event.code === "Enter" || event.code === "Space") this.menuButtonClick(event);
	}
	onItemClick(event) {
		this.dirty = true;
		const { originalEvent, processedItem } = event;
		const grouped = this.isProcessedItemGroup(processedItem);
		const root = p(processedItem.parent);
		if (this.isSelected(processedItem)) {
			var _this$rootmenu;
			const { index, key, level, parentKey, item } = processedItem;
			this.activeItemPath.set(this.activeItemPath().filter((p) => key !== p.key && key.startsWith(p.key)));
			this.focusedItemInfo.set({
				index,
				level,
				parentKey,
				item
			});
			this.dirty = !root;
			Wt((_this$rootmenu = this.rootmenu()) === null || _this$rootmenu === void 0 ? void 0 : _this$rootmenu.el.nativeElement);
		} else if (grouped) this.onItemChange(event);
		else {
			var _this$rootmenu2;
			const rootProcessedItem = root ? processedItem : this.activeItemPath().find((p) => p.parentKey === "");
			this.hide(originalEvent);
			this.changeFocusedItemIndex(originalEvent, rootProcessedItem ? rootProcessedItem.index : -1);
			this.mobileActive = false;
			Wt((_this$rootmenu2 = this.rootmenu()) === null || _this$rootmenu2 === void 0 ? void 0 : _this$rootmenu2.el.nativeElement);
		}
	}
	onItemMouseEnter(event) {
		if (!fe()) {
			if (this.dirty) this.onItemChange(event, "hover");
		} else this.onItemChange({
			originalEvent: event.originalEvent,
			processedItem: event.processedItem,
			isFocus: this.autoDisplay()
		}, "hover");
	}
	onMouseLeave(_event) {
		const autoHideEnabled = this.menubarService.autoHide;
		const autoHideDelay = this.menubarService.autoHideDelay;
		if (autoHideEnabled) setTimeout(() => {
			this.menubarService.mouseLeaves.next(true);
		}, autoHideDelay);
	}
	changeFocusedItemIndex(_event, index) {
		const processedItem = this.findVisibleItem(index);
		if (this.focusedItemInfo().index !== index) {
			var _processedItem$item2;
			const focusedItemInfo = this.focusedItemInfo();
			this.focusedItemInfo.set(_objectSpread2(_objectSpread2({}, focusedItemInfo), {}, {
				item: (_processedItem$item2 = processedItem === null || processedItem === void 0 ? void 0 : processedItem.item) !== null && _processedItem$item2 !== void 0 ? _processedItem$item2 : null,
				index
			}));
			this.scrollInView();
		}
	}
	scrollInView(index = -1) {
		var _this$rootmenu3;
		const id = index !== -1 ? `${this.$id()}_${index}` : this.focusedItemId;
		const element = nt((_this$rootmenu3 = this.rootmenu()) === null || _this$rootmenu3 === void 0 ? void 0 : _this$rootmenu3.el.nativeElement, `li[id="${id}"]`);
		if (element) {
			if (element.scrollIntoView) element.scrollIntoView({
				block: "nearest",
				inline: "nearest"
			});
		}
	}
	onItemChange(event, type) {
		var _this$rootmenu4;
		const { processedItem, isFocus } = event;
		if (p(processedItem)) return;
		const { index, key, level, parentKey, items, item } = processedItem;
		const grouped = l(items);
		const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== parentKey && p.parentKey !== key);
		if (grouped) activeItemPath.push(processedItem);
		this.focusedItemInfo.set({
			index,
			level,
			parentKey,
			item
		});
		if (grouped) this.dirty = true;
		if (isFocus) Wt((_this$rootmenu4 = this.rootmenu()) === null || _this$rootmenu4 === void 0 ? void 0 : _this$rootmenu4.el.nativeElement);
		if (type === "hover" && this.queryMatches()) return;
		this.activeItemPath.set(activeItemPath);
	}
	toggle(event) {
		if (this.mobileActive) {
			var _this$rootmenu5;
			this.mobileActive = false;
			zindexutils_default.clear((_this$rootmenu5 = this.rootmenu()) === null || _this$rootmenu5 === void 0 ? void 0 : _this$rootmenu5.el.nativeElement);
			this.hide();
		} else {
			var _this$rootmenu6;
			this.mobileActive = true;
			zindexutils_default.set("menu", (_this$rootmenu6 = this.rootmenu()) === null || _this$rootmenu6 === void 0 ? void 0 : _this$rootmenu6.el.nativeElement, this.config.zIndex.menu);
			setTimeout(() => {
				this.show();
			}, 0);
		}
		this.bindOutsideClickListener();
		event.preventDefault();
	}
	hide(_event, isFocus) {
		var _this$rootmenu7;
		if (this.mobileActive) setTimeout(() => {
			var _this$menubutton;
			Wt((_this$menubutton = this.menubutton()) === null || _this$menubutton === void 0 ? void 0 : _this$menubutton.nativeElement);
		}, 0);
		this.activeItemPath.set([]);
		this.focusedItemInfo.set({
			index: -1,
			level: 0,
			parentKey: "",
			item: null
		});
		if (isFocus) Wt((_this$rootmenu7 = this.rootmenu()) === null || _this$rootmenu7 === void 0 ? void 0 : _this$rootmenu7.el.nativeElement);
		this.dirty = false;
	}
	show() {
		var _processedItem$item3, _this$rootmenu8;
		const processedItem = this.findVisibleItem(this.findFirstFocusedItemIndex());
		this.focusedItemInfo.set({
			index: this.findFirstFocusedItemIndex(),
			level: 0,
			parentKey: "",
			item: (_processedItem$item3 = processedItem === null || processedItem === void 0 ? void 0 : processedItem.item) !== null && _processedItem$item3 !== void 0 ? _processedItem$item3 : null
		});
		Wt((_this$rootmenu8 = this.rootmenu()) === null || _this$rootmenu8 === void 0 ? void 0 : _this$rootmenu8.el.nativeElement);
	}
	onMenuMouseDown(_event) {
		this.dirty = true;
	}
	onMenuFocus(event) {
		this.focused = true;
		const relatedTarget = event.relatedTarget;
		if ((!relatedTarget || !this.el.nativeElement.contains(relatedTarget)) && this.focusedItemInfo().index === -1 && !this.activeItemPath().length && !this.dirty) {
			var _processedItem$item4;
			const processedItem = this.findVisibleItem(this.findFirstFocusedItemIndex());
			this.focusedItemInfo.set({
				index: this.findFirstFocusedItemIndex(),
				level: 0,
				parentKey: "",
				item: (_processedItem$item4 = processedItem === null || processedItem === void 0 ? void 0 : processedItem.item) !== null && _processedItem$item4 !== void 0 ? _processedItem$item4 : null
			});
		}
		this.onFocus.emit(event);
	}
	onMenuBlur(event) {
		const relatedTarget = event.relatedTarget;
		if (relatedTarget && this.el.nativeElement.contains(relatedTarget)) return;
		setTimeout(() => {
			const activeElement = rt(this.el.nativeElement);
			if (activeElement && this.el.nativeElement.contains(activeElement)) return;
			this.focused = false;
			this.focusedItemInfo.set({
				index: -1,
				level: 0,
				parentKey: "",
				item: null
			});
			this.searchValue = "";
			this.dirty = false;
			this.onBlur.emit(event);
		});
	}
	onKeyDown(event) {
		const metaKey = event.metaKey || event.ctrlKey;
		switch (event.code) {
			case "ArrowDown":
				this.onArrowDownKey(event);
				break;
			case "ArrowUp":
				this.onArrowUpKey(event);
				break;
			case "ArrowLeft":
				this.onArrowLeftKey(event);
				break;
			case "ArrowRight":
				this.onArrowRightKey(event);
				break;
			case "Home":
				this.onHomeKey(event);
				break;
			case "End":
				this.onEndKey(event);
				break;
			case "Space":
				this.onSpaceKey(event);
				break;
			case "Enter":
				this.onEnterKey(event);
				break;
			case "Escape":
				this.onEscapeKey(event);
				break;
			case "Tab":
				this.onTabKey(event);
				break;
			case "PageDown":
			case "PageUp":
			case "Backspace":
			case "ShiftLeft":
			case "ShiftRight": break;
			default: if (!metaKey && J(event.key)) this.searchItems(event, event.key);
		}
	}
	findVisibleItem(index) {
		return l(this.visibleItems) ? this.visibleItems[index] : null;
	}
	findFirstFocusedItemIndex() {
		const selectedIndex = this.findSelectedItemIndex();
		return selectedIndex < 0 ? this.findFirstItemIndex() : selectedIndex;
	}
	findFirstItemIndex() {
		return this.visibleItems.findIndex((processedItem) => this.isValidItem(processedItem));
	}
	findSelectedItemIndex() {
		return this.visibleItems.findIndex((processedItem) => this.isValidSelectedItem(processedItem));
	}
	isProcessedItemGroup(processedItem) {
		return processedItem && l(processedItem.items);
	}
	isSelected(processedItem) {
		return this.activeItemPath().some((p) => p.key === processedItem.key);
	}
	isValidSelectedItem(processedItem) {
		return this.isValidItem(processedItem) && this.isSelected(processedItem);
	}
	isValidItem(processedItem) {
		return !!processedItem && !this.isItemDisabled(processedItem.item) && !this.isItemSeparator(processedItem.item);
	}
	isItemDisabled(item) {
		return this.getItemProp(item, "disabled");
	}
	isItemSeparator(item) {
		return this.getItemProp(item, "separator");
	}
	isItemMatched(processedItem) {
		var _this$getProccessedIt;
		return this.isValidItem(processedItem) && !!((_this$getProccessedIt = this.getProccessedItemLabel(processedItem)) === null || _this$getProccessedIt === void 0 ? void 0 : _this$getProccessedIt.toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase()));
	}
	isProccessedItemGroup(processedItem) {
		return processedItem && l(processedItem.items);
	}
	searchItems(event, char) {
		this.searchValue = (this.searchValue || "") + char;
		let itemIndex = -1;
		let matched = false;
		if (this.focusedItemInfo().index !== -1) {
			itemIndex = this.visibleItems.slice(this.focusedItemInfo().index).findIndex((processedItem) => this.isItemMatched(processedItem));
			itemIndex = itemIndex === -1 ? this.visibleItems.slice(0, this.focusedItemInfo().index).findIndex((processedItem) => this.isItemMatched(processedItem)) : itemIndex + this.focusedItemInfo().index;
		} else itemIndex = this.visibleItems.findIndex((processedItem) => this.isItemMatched(processedItem));
		if (itemIndex !== -1) matched = true;
		if (itemIndex === -1 && this.focusedItemInfo().index === -1) itemIndex = this.findFirstFocusedItemIndex();
		if (itemIndex !== -1) this.changeFocusedItemIndex(event, itemIndex);
		if (this.searchTimeout) clearTimeout(this.searchTimeout);
		this.searchTimeout = setTimeout(() => {
			this.searchValue = "";
			this.searchTimeout = null;
		}, 500);
		return matched;
	}
	getProccessedItemLabel(processedItem) {
		return processedItem ? this.getItemLabel(processedItem.item) : void 0;
	}
	getItemLabel(item) {
		return this.getItemProp(item, "label");
	}
	onArrowDownKey(event) {
		const processedItem = this.visibleItems[this.focusedItemInfo().index];
		if (processedItem ? p(processedItem.parent) : null) {
			if (this.isProccessedItemGroup(processedItem)) {
				this.onItemChange({
					originalEvent: event,
					processedItem
				});
				this.focusedItemInfo.set({
					index: -1,
					level: processedItem.level + 1,
					parentKey: processedItem.key,
					item: processedItem.item
				});
				this.onArrowRightKey(event);
			}
		} else {
			const itemIndex = this.focusedItemInfo().index !== -1 ? this.findNextItemIndex(this.focusedItemInfo().index) : this.findFirstFocusedItemIndex();
			this.changeFocusedItemIndex(event, itemIndex);
			event.preventDefault();
		}
	}
	onArrowRightKey(event) {
		const processedItem = this.visibleItems[this.focusedItemInfo().index];
		if (processedItem ? this.activeItemPath().find((p) => p.key === processedItem.parentKey) : null) {
			if (this.isProccessedItemGroup(processedItem)) {
				this.onItemChange({
					originalEvent: event,
					processedItem
				});
				this.focusedItemInfo.set({
					index: -1,
					level: processedItem.level + 1,
					parentKey: processedItem.key,
					item: processedItem.item
				});
				this.onArrowDownKey(event);
			}
		} else {
			const itemIndex = this.focusedItemInfo().index !== -1 ? this.findNextItemIndex(this.focusedItemInfo().index) : this.findFirstFocusedItemIndex();
			this.changeFocusedItemIndex(event, itemIndex);
			event.preventDefault();
		}
	}
	onArrowUpKey(event) {
		const processedItem = this.visibleItems[this.focusedItemInfo().index];
		if (p(processedItem.parent)) {
			if (this.isProccessedItemGroup(processedItem)) {
				this.onItemChange({
					originalEvent: event,
					processedItem
				});
				this.focusedItemInfo.set({
					index: -1,
					level: processedItem.level + 1,
					parentKey: processedItem.key,
					item: processedItem.item
				});
				const itemIndex = this.findLastItemIndex();
				this.changeFocusedItemIndex(event, itemIndex);
			}
		} else {
			const parentItem = this.activeItemPath().find((p) => p.key === processedItem.parentKey);
			if (this.focusedItemInfo().index === 0) {
				var _parentItem$level;
				this.focusedItemInfo.set({
					index: -1,
					level: (_parentItem$level = parentItem === null || parentItem === void 0 ? void 0 : parentItem.level) !== null && _parentItem$level !== void 0 ? _parentItem$level : 0,
					parentKey: parentItem ? parentItem.parentKey : "",
					item: processedItem.item
				});
				this.searchValue = "";
				this.onArrowLeftKey(event);
				const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== this.focusedItemInfo().parentKey);
				this.activeItemPath.set(activeItemPath);
			} else {
				const itemIndex = this.focusedItemInfo().index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo().index) : this.findLastFocusedItemIndex();
				this.changeFocusedItemIndex(event, itemIndex);
			}
		}
		event.preventDefault();
	}
	onArrowLeftKey(event) {
		const processedItem = this.visibleItems[this.focusedItemInfo().index];
		const parentItem = processedItem ? this.activeItemPath().find((p) => p.key === processedItem.parentKey) : null;
		if (parentItem) {
			this.onItemChange({
				originalEvent: event,
				processedItem: parentItem
			});
			const activeItemPath = this.activeItemPath().filter((p) => p.parentKey !== this.focusedItemInfo().parentKey);
			this.activeItemPath.set(activeItemPath);
			event.preventDefault();
		} else {
			const itemIndex = this.focusedItemInfo().index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo().index) : this.findLastFocusedItemIndex();
			this.changeFocusedItemIndex(event, itemIndex);
			event.preventDefault();
		}
	}
	onHomeKey(event) {
		this.changeFocusedItemIndex(event, this.findFirstItemIndex());
		event.preventDefault();
	}
	onEndKey(event) {
		this.changeFocusedItemIndex(event, this.findLastItemIndex());
		event.preventDefault();
	}
	onSpaceKey(event) {
		this.onEnterKey(event);
	}
	onEscapeKey(event) {
		this.hide(event, true);
		this.focusedItemInfo().index = this.findFirstFocusedItemIndex();
		event.preventDefault();
	}
	onTabKey(event) {
		if (this.focusedItemInfo().index !== -1) {
			const processedItem = this.visibleItems[this.focusedItemInfo().index];
			if (!this.isProccessedItemGroup(processedItem)) this.onItemChange({
				originalEvent: event,
				processedItem
			});
		}
		this.hide();
	}
	onEnterKey(event) {
		if (this.focusedItemInfo().index !== -1) {
			var _this$rootmenu9;
			const element = nt((_this$rootmenu9 = this.rootmenu()) === null || _this$rootmenu9 === void 0 ? void 0 : _this$rootmenu9.el.nativeElement, `li[id="${`${this.focusedItemId}`}"]`);
			const anchorElement = element && (nt(element, "[data-pc-section=\"itemlink\"]") || nt(element, "a,button"));
			if (anchorElement) anchorElement.click();
			else if (element) element.click();
		}
		event.preventDefault();
	}
	findLastFocusedItemIndex() {
		const selectedIndex = this.findSelectedItemIndex();
		return selectedIndex < 0 ? this.findLastItemIndex() : selectedIndex;
	}
	findLastItemIndex() {
		return z(this.visibleItems, (processedItem) => this.isValidItem(processedItem));
	}
	findPrevItemIndex(index) {
		const matchedItemIndex = index > 0 ? z(this.visibleItems.slice(0, index), (processedItem) => this.isValidItem(processedItem)) : -1;
		return matchedItemIndex > -1 ? matchedItemIndex : index;
	}
	findNextItemIndex(index) {
		const matchedItemIndex = index < this.visibleItems.length - 1 ? this.visibleItems.slice(index + 1).findIndex((processedItem) => this.isValidItem(processedItem)) : -1;
		return matchedItemIndex > -1 ? matchedItemIndex + index + 1 : index;
	}
	bindResizeListener() {
		if (isPlatformBrowser(this.platformId)) {
			if (!this.resizeListener) this.resizeListener = this.renderer.listen(this.document.defaultView, "resize", (event) => {
				if (!fe()) this.hide(event, true);
				this.mobileActive = false;
			});
		}
	}
	bindOutsideClickListener() {
		if (isPlatformBrowser(this.platformId)) {
			if (!this.outsideClickListener) this.outsideClickListener = this.renderer.listen(this.document, "click", (event) => {
				var _this$rootmenu10, _this$menubutton2;
				const rootEl = (_this$rootmenu10 = this.rootmenu()) === null || _this$rootmenu10 === void 0 ? void 0 : _this$rootmenu10.el.nativeElement;
				const buttonEl = (_this$menubutton2 = this.menubutton()) === null || _this$menubutton2 === void 0 ? void 0 : _this$menubutton2.nativeElement;
				const node = getEventTarget(event, rootEl);
				const buttonNode = getEventTarget(event, buttonEl);
				const isOutsideContainer = rootEl !== node && !(rootEl === null || rootEl === void 0 ? void 0 : rootEl.contains(node));
				const isOutsideMenuButton = this.mobileActive && buttonEl !== buttonNode && !(buttonEl === null || buttonEl === void 0 ? void 0 : buttonEl.contains(buttonNode));
				if (isOutsideContainer) {
					if (isOutsideMenuButton) this.mobileActive = false;
					else this.hide();
				}
			});
		}
	}
	unbindOutsideClickListener() {
		if (this.outsideClickListener) {
			this.outsideClickListener();
			this.outsideClickListener = null;
		}
	}
	unbindResizeListener() {
		if (this.resizeListener) {
			this.resizeListener();
			this.resizeListener = null;
		}
	}
	onDestroy() {
		var _this$mouseLeaveSubsc2;
		(_this$mouseLeaveSubsc2 = this.mouseLeaveSubscriber) === null || _this$mouseLeaveSubsc2 === void 0 || _this$mouseLeaveSubsc2.unsubscribe();
		this.unbindOutsideClickListener();
		this.unbindResizeListener();
		this.unbindMatchMediaListener();
	}
}, _defineProperty(_Menubar, "ɵfac", function Menubar_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _Menubar)();
}), _defineProperty(_Menubar, "ɵcmp", (function() {
	const _c0 = ["start"];
	const _c1 = ["end"];
	const _c2 = ["item"];
	const _c3 = ["menuicon"];
	const _c4 = ["submenuicon"];
	const _c5 = ["menubutton"];
	const _c6 = ["rootmenu"];
	const _c7 = ["*"];
	function Menubar_Conditional_0_ng_container_1_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Menubar_Conditional_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "div", 6);
			ɵɵtemplate(1, Menubar_Conditional_0_ng_container_1_Template, 1, 0, "ng-container", 7);
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
	function Menubar_Conditional_1_Conditional_2_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 9);
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵproperty("pBind", ctx_r0.ptm("buttonIcon"));
		}
	}
	function Menubar_Conditional_1_ng_container_3_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Menubar_Conditional_1_Template(rf, ctx) {
		if (rf & 1) {
			const _r2 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "a", 8, 1);
			ɵɵlistener("click", function Menubar_Conditional_1_Template_a_click_0_listener($event) {
				ɵɵrestoreView(_r2);
				const ctx_r0 = ɵɵnextContext();
				return ɵɵresetView(ctx_r0.menuButtonClick($event));
			})("keydown", function Menubar_Conditional_1_Template_a_keydown_0_listener($event) {
				ɵɵrestoreView(_r2);
				const ctx_r0 = ɵɵnextContext();
				return ɵɵresetView(ctx_r0.menuButtonKeydown($event));
			});
			ɵɵconditionalCreate(2, Menubar_Conditional_1_Conditional_2_Template, 1, 1, "svg", 9);
			ɵɵtemplate(3, Menubar_Conditional_1_ng_container_3_Template, 1, 0, "ng-container", 7);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵclassMap(ctx_r0.cx("button"));
			ɵɵproperty("pBind", ctx_r0.ptm("button"));
			ɵɵattribute("aria-haspopup", true)("aria-expanded", ctx_r0.mobileActive)("aria-controls", ctx_r0.$id())("aria-label", ctx_r0.navigationAriaLabel);
			ɵɵadvance(2);
			ɵɵconditional(!ctx_r0.menuIconTemplate() ? 2 : -1);
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", ctx_r0.menuIconTemplate());
		}
	}
	function Menubar_Conditional_4_ng_container_1_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Menubar_Conditional_4_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "div", 6);
			ɵɵtemplate(1, Menubar_Conditional_4_ng_container_1_Template, 1, 0, "ng-container", 7);
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
	function Menubar_Conditional_5_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "div");
			ɵɵprojection(1);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵclassMap(ctx_r0.cx("end"));
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _Menubar,
		selectors: [["p-menubar"]],
		contentQueries: function Menubar_ContentQueries(rf, ctx, dirIndex) {
			if (rf & 1) ɵɵcontentQuerySignal(dirIndex, ctx.startTemplate, _c0, 4)(dirIndex, ctx.endTemplate, _c1, 4)(dirIndex, ctx.itemTemplate, _c2, 4)(dirIndex, ctx.menuIconTemplate, _c3, 4)(dirIndex, ctx.submenuIconTemplate, _c4, 4);
			if (rf & 2) ɵɵqueryAdvance(5);
		},
		viewQuery: function Menubar_Query(rf, ctx) {
			if (rf & 1) ɵɵviewQuerySignal(ctx.menubutton, _c5, 5)(ctx.rootmenu, _c6, 5);
			if (rf & 2) ɵɵqueryAdvance(2);
		},
		hostVars: 2,
		hostBindings: function Menubar_HostBindings(rf, ctx) {
			if (rf & 2) ɵɵclassMap(ctx.cx("root"));
		},
		inputs: {
			model: [1, "model"],
			autoZIndex: [1, "autoZIndex"],
			baseZIndex: [1, "baseZIndex"],
			motionOptions: [1, "motionOptions"],
			autoDisplay: [1, "autoDisplay"],
			autoHide: [1, "autoHide"],
			breakpoint: [1, "breakpoint"],
			autoHideDelay: [1, "autoHideDelay"],
			id: [1, "id"],
			ariaLabel: [1, "ariaLabel"],
			ariaLabelledBy: [1, "ariaLabelledBy"]
		},
		outputs: {
			onFocus: "onFocus",
			onBlur: "onBlur"
		},
		features: [
			ɵɵProvidersFeature([
				MenubarService,
				MenuBarStyle,
				{
					provide: MENUBAR_INSTANCE,
					useExisting: _Menubar
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: _Menubar
				}
			]),
			ɵɵHostDirectivesFeature([Bind]),
			ɵɵInheritDefinitionFeature
		],
		ngContentSelectors: _c7,
		decls: 6,
		vars: 20,
		consts: [
			["rootmenu", ""],
			["menubutton", ""],
			[
				3,
				"class",
				"pBind"
			],
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
				"pMenubarSub",
				"",
				"tabindex",
				"0",
				3,
				"itemClick",
				"mousedown",
				"focus",
				"blur",
				"keydown",
				"itemMouseEnter",
				"mouseleave",
				"items",
				"itemTemplate",
				"motionOptions",
				"menuId",
				"root",
				"baseZIndex",
				"autoZIndex",
				"mobileActive",
				"autoDisplay",
				"focusedItemId",
				"submenuiconTemplate",
				"activeItemPath",
				"pt",
				"pBind",
				"unstyled"
			],
			[3, "class"],
			[3, "pBind"],
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
				"data-p-icon",
				"bars",
				3,
				"pBind"
			]
		],
		template: function Menubar_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵprojectionDef();
				ɵɵconditionalCreate(0, Menubar_Conditional_0_Template, 2, 4, "div", 2);
				ɵɵconditionalCreate(1, Menubar_Conditional_1_Template, 4, 9, "a", 3);
				ɵɵelementStart(2, "ul", 4, 0);
				ɵɵlistener("itemClick", function Menubar_Template_ul_itemClick_2_listener($event) {
					return ctx.onItemClick($event);
				})("mousedown", function Menubar_Template_ul_mousedown_2_listener($event) {
					return ctx.onMenuMouseDown($event);
				})("focus", function Menubar_Template_ul_focus_2_listener($event) {
					return ctx.onMenuFocus($event);
				})("blur", function Menubar_Template_ul_blur_2_listener($event) {
					return ctx.onMenuBlur($event);
				})("keydown", function Menubar_Template_ul_keydown_2_listener($event) {
					return ctx.onKeyDown($event);
				})("itemMouseEnter", function Menubar_Template_ul_itemMouseEnter_2_listener($event) {
					return ctx.onItemMouseEnter($event);
				})("mouseleave", function Menubar_Template_ul_mouseleave_2_listener($event) {
					return ctx.onMouseLeave($event);
				});
				ɵɵelementEnd();
				ɵɵconditionalCreate(4, Menubar_Conditional_4_Template, 2, 4, "div", 2)(5, Menubar_Conditional_5_Template, 2, 2, "div", 5);
			}
			if (rf & 2) {
				var _ctx$model, _ctx$focusedItemId;
				ɵɵconditional(ctx.startTemplate() ? 0 : -1);
				ɵɵadvance();
				ɵɵconditional(((_ctx$model = ctx.model()) === null || _ctx$model === void 0 ? void 0 : _ctx$model.length) ? 1 : -1);
				ɵɵadvance();
				ɵɵproperty("items", ctx.processedItems())("itemTemplate", ctx.itemTemplate())("motionOptions", ctx.computedMotionOptions())("menuId", ctx.$id())("root", true)("baseZIndex", ctx.baseZIndex())("autoZIndex", ctx.autoZIndex())("mobileActive", ctx.mobileActive)("autoDisplay", ctx.autoDisplay())("focusedItemId", ctx.focused ? (_ctx$focusedItemId = ctx.focusedItemId) !== null && _ctx$focusedItemId !== void 0 ? _ctx$focusedItemId : void 0 : void 0)("submenuiconTemplate", ctx.submenuIconTemplate())("activeItemPath", ctx.activeItemPath())("pt", ctx.pt())("pBind", ctx.ptm("rootList"))("unstyled", ctx.unstyled());
				ɵɵattribute("aria-label", ctx.ariaLabel())("aria-labelledby", ctx.ariaLabelledBy());
				ɵɵadvance(2);
				ɵɵconditional(ctx.endTemplate() ? 4 : 5);
			}
		},
		dependencies: [
			NgTemplateOutlet,
			MenubarSub,
			Bars,
			SharedModule,
			BindModule,
			Bind
		],
		encapsulation: 2
	});
})()), _Menubar);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Menubar, [{
		type: Component,
		args: [{
			selector: "p-menubar",
			standalone: true,
			imports: [
				NgTemplateOutlet,
				MenubarSub,
				Bars,
				SharedModule,
				BindModule
			],
			template: `
        @if (startTemplate()) {
            <div [class]="cx('start')" [pBind]="ptm('start')">
                <ng-container *ngTemplateOutlet="startTemplate()"></ng-container>
            </div>
        }
        @if (model()?.length) {
            <a
                #menubutton
                tabindex="0"
                role="button"
                [attr.aria-haspopup]="true"
                [attr.aria-expanded]="mobileActive"
                [attr.aria-controls]="$id()"
                [attr.aria-label]="navigationAriaLabel"
                [class]="cx('button')"
                [pBind]="ptm('button')"
                (click)="menuButtonClick($event)"
                (keydown)="menuButtonKeydown($event)"
            >
                @if (!menuIconTemplate()) {
                    <svg data-p-icon="bars" [pBind]="ptm('buttonIcon')" />
                }
                <ng-container *ngTemplateOutlet="menuIconTemplate()"></ng-container>
            </a>
        }
        <ul
            pMenubarSub
            #rootmenu
            [items]="processedItems()"
            [itemTemplate]="itemTemplate()"
            [motionOptions]="computedMotionOptions()"
            tabindex="0"
            [menuId]="$id()"
            [root]="true"
            [baseZIndex]="baseZIndex()"
            [autoZIndex]="autoZIndex()"
            [mobileActive]="mobileActive"
            [autoDisplay]="autoDisplay()"
            [attr.aria-label]="ariaLabel()"
            [attr.aria-labelledby]="ariaLabelledBy()"
            [focusedItemId]="focused ? (focusedItemId ?? undefined) : undefined"
            [submenuiconTemplate]="submenuIconTemplate()"
            [activeItemPath]="activeItemPath()"
            (itemClick)="onItemClick($event)"
            (mousedown)="onMenuMouseDown($event)"
            (focus)="onMenuFocus($event)"
            (blur)="onMenuBlur($event)"
            (keydown)="onKeyDown($event)"
            (itemMouseEnter)="onItemMouseEnter($event)"
            (mouseleave)="onMouseLeave($event)"
            [pt]="pt()"
            [pBind]="ptm('rootList')"
            [unstyled]="unstyled()"
        ></ul>
        @if (endTemplate()) {
            <div [class]="cx('end')" [pBind]="ptm('end')">
                <ng-container *ngTemplateOutlet="endTemplate()"></ng-container>
            </div>
        } @else {
            <div [class]="cx('end')">
                <ng-content></ng-content>
            </div>
        }
    `,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None,
			providers: [
				MenubarService,
				MenuBarStyle,
				{
					provide: MENUBAR_INSTANCE,
					useExisting: Menubar
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: Menubar
				}
			],
			host: { "[class]": "cx(\"root\")" },
			hostDirectives: [Bind]
		}]
	}], () => [], {
		model: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "model",
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
		motionOptions: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "motionOptions",
				required: false
			}]
		}],
		autoDisplay: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "autoDisplay",
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
		breakpoint: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "breakpoint",
				required: false
			}]
		}],
		autoHideDelay: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "autoHideDelay",
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
		ariaLabel: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "ariaLabel",
				required: false
			}]
		}],
		ariaLabelledBy: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "ariaLabelledBy",
				required: false
			}]
		}],
		onFocus: [{
			type: Output,
			args: ["onFocus"]
		}],
		onBlur: [{
			type: Output,
			args: ["onBlur"]
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
		itemTemplate: [{
			type: ContentChild,
			args: ["item", {
				descendants: false,
				isSignal: true
			}]
		}],
		menuIconTemplate: [{
			type: ContentChild,
			args: ["menuicon", {
				descendants: false,
				isSignal: true
			}]
		}],
		submenuIconTemplate: [{
			type: ContentChild,
			args: ["submenuicon", {
				descendants: false,
				isSignal: true
			}]
		}],
		menubutton: [{
			type: ViewChild,
			args: ["menubutton", { isSignal: true }]
		}],
		rootmenu: [{
			type: ViewChild,
			args: ["rootmenu", { isSignal: true }]
		}]
	});
})();
var MenubarModule = (_MenubarModule = class MenubarModule {}, _defineProperty(_MenubarModule, "ɵfac", function MenubarModule_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _MenubarModule)();
}), _defineProperty(_MenubarModule, "ɵmod", /*@__PURE__*/ ɵɵdefineNgModule({
	type: _MenubarModule,
	imports: [Menubar, SharedModule],
	exports: [Menubar, SharedModule]
})), _defineProperty(_MenubarModule, "ɵinj", /*@__PURE__*/ ɵɵdefineInjector({ imports: [
	Menubar,
	SharedModule,
	SharedModule
] })), _MenubarModule);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenubarModule, [{
		type: NgModule,
		args: [{
			imports: [Menubar, SharedModule],
			exports: [Menubar, SharedModule]
		}]
	}], null, null);
})();
export { MenuBarStyle, Menubar, MenubarClasses, MenubarModule };
