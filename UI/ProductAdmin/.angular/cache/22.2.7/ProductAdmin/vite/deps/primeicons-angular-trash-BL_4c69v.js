import { Da as ɵɵconditionalCreate, Rl as ɵɵnamespaceSVG, Ta as ɵɵconditional, Ts as ɵɵrepeaterCreate, Wi as setClassMetadata, ca as ɵɵInheritDefinitionFeature, cn as Component, es as ɵɵnextContext, lo as ɵɵdomElement, ro as ɵɵdefineComponent, ws as ɵɵrepeater, ya as ɵɵattribute } from "./core-BRnM5AcM.js";
import { t as CoreIcon } from "./primeicons-angular-core-CdzNRoje.js";
import { r as _defineProperty } from "./asyncToGenerator-CE9zIWF7.js";
// ../node_modules/@primeicons/core/dist/esm/icons/trash.mjs
var C = {
	name: "trash",
	meta: { tags: [
		"trash",
		"delete",
		"remove",
		"garbage",
		"waste"
	] },
	svg: {
		xmlns: "http://www.w3.org/2000/svg",
		width: 20,
		height: 20,
		viewBox: "0 0 20 20",
		fill: "none"
	},
	nodes: [["path", {
		d: "M12.7803 1.24023C14.0509 1.24046 15.3104 2.13265 15.3105 3.5V5.01074C15.3105 5.07641 15.2991 5.13949 15.2832 5.2002H18C18.4142 5.2002 18.75 5.53598 18.75 5.9502C18.7499 6.3643 18.4141 6.7002 18 6.7002H16.9707V16.4902C16.9706 17.8447 15.7145 18.7498 14.4404 18.75H5.55078C4.28003 18.75 3.02066 17.8578 3.02051 16.4902V6.7002H2C1.58587 6.7002 1.25013 6.3643 1.25 5.9502C1.25 5.53598 1.58579 5.2002 2 5.2002H4.7168C4.70088 5.13949 4.69049 5.07641 4.69043 5.01074V3.5C4.69058 2.14539 5.94651 1.24023 7.2207 1.24023H12.7803ZM4.52051 16.4902C4.52069 16.8026 4.86179 17.25 5.55078 17.25H14.4404C15.1256 17.2498 15.4705 16.7954 15.4707 16.4902V6.7002H4.52051V16.4902ZM8.21973 8.96973C8.63386 8.96973 8.96959 9.30563 8.96973 9.71973V14.2393C8.96973 14.6535 8.63394 14.9893 8.21973 14.9893C7.80564 14.9891 7.46973 14.6534 7.46973 14.2393V9.71973C7.46986 9.30572 7.80572 8.96987 8.21973 8.96973ZM11.7803 8.96973C12.1943 8.96987 12.5301 9.30572 12.5303 9.71973V14.2393C12.5303 14.6534 12.1944 14.9891 11.7803 14.9893C11.3661 14.9893 11.0303 14.6535 11.0303 14.2393V9.71973C11.0304 9.30563 11.3661 8.96973 11.7803 8.96973ZM7.2207 2.74023C6.53516 2.74023 6.19061 3.19475 6.19043 3.5V5.01074C6.19037 5.07641 6.179 5.13949 6.16309 5.2002H13.8369C13.821 5.13949 13.8106 5.07641 13.8105 5.01074V3.5C13.8104 3.18775 13.4689 2.74045 12.7803 2.74023H7.2207Z",
		fill: "currentColor",
		key: "sq6mcj"
	}]]
};
// ../node_modules/@primeicons/angular/fesm2022/primeicons-angular-trash.mjs
var _Trash;
var Trash = class extends CoreIcon {
	constructor() {
		super();
		this._icon = C;
	}
};
_Trash = Trash;
_defineProperty(Trash, "ɵfac", function Trash_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _Trash)();
});
_defineProperty(Trash, "ɵcmp", (function() {
	const _forTrack0 = ($index, $item) => $item[1]["key"] || $index;
	function Trash_For_1_Case_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "path");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("d", node_r1[1]["d"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("fill-rule", node_r1[1]["fillRule"])("clip-rule", node_r1[1]["clipRule"])("stroke", node_r1[1]["stroke"])("stroke-width", node_r1[1]["strokeWidth"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function Trash_For_1_Case_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "circle");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("r", node_r1[1]["r"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function Trash_For_1_Case_2_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "rect");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x", node_r1[1]["x"])("y", node_r1[1]["y"])("width", node_r1[1]["width"])("height", node_r1[1]["height"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function Trash_For_1_Case_3_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "line");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x1", node_r1[1]["x1"])("y1", node_r1[1]["y1"])("x2", node_r1[1]["x2"])("y2", node_r1[1]["y2"])("stroke", node_r1[1]["stroke"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function Trash_For_1_Case_4_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polyline");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function Trash_For_1_Case_5_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polygon");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function Trash_For_1_Case_6_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "ellipse");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function Trash_For_1_Template(rf, ctx) {
		if (rf & 1) ɵɵconditionalCreate(0, Trash_For_1_Case_0_Template, 1, 9, "path")(1, Trash_For_1_Case_1_Template, 1, 6, "circle")(2, Trash_For_1_Case_2_Template, 1, 9, "rect")(3, Trash_For_1_Case_3_Template, 1, 7, "line")(4, Trash_For_1_Case_4_Template, 1, 4, "polyline")(5, Trash_For_1_Case_5_Template, 1, 4, "polygon")(6, Trash_For_1_Case_6_Template, 1, 7, "ellipse");
		if (rf & 2) {
			let tmp_10_0 = void 0;
			const node_r1 = ctx.$implicit;
			ɵɵconditional((tmp_10_0 = node_r1[0]) === "path" ? 0 : tmp_10_0 === "circle" ? 1 : tmp_10_0 === "rect" ? 2 : tmp_10_0 === "line" ? 3 : tmp_10_0 === "polyline" ? 4 : tmp_10_0 === "polygon" ? 5 : tmp_10_0 === "ellipse" ? 6 : -1);
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _Trash,
		selectors: [[
			"svg",
			"data-p-icon",
			"trash"
		]],
		features: [ɵɵInheritDefinitionFeature],
		decls: 2,
		vars: 0,
		template: function Trash_Template(rf, ctx) {
			if (rf & 1) ɵɵrepeaterCreate(0, Trash_For_1_Template, 7, 1, null, null, _forTrack0);
			if (rf & 2) ɵɵrepeater(ctx.iconNodes());
		},
		encapsulation: 2,
		changeDetection: 1
	});
})());
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Trash, [{
		type: Component,
		args: [{
			selector: "svg[data-p-icon=\"trash\"]",
			standalone: true,
			template: "\n        @for (node of iconNodes(); track node[1]['key'] || $index) {\n            @switch (node[0]) {\n                @case ('path') {\n                    <svg:path\n                        [attr.d]=\"node[1]['d']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.fill-rule]=\"node[1]['fillRule']\"\n                        [attr.clip-rule]=\"node[1]['clipRule']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-width]=\"node[1]['strokeWidth']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('circle') {\n                    <svg:circle\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.r]=\"node[1]['r']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('rect') {\n                    <svg:rect\n                        [attr.x]=\"node[1]['x']\"\n                        [attr.y]=\"node[1]['y']\"\n                        [attr.width]=\"node[1]['width']\"\n                        [attr.height]=\"node[1]['height']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('line') {\n                    <svg:line\n                        [attr.x1]=\"node[1]['x1']\"\n                        [attr.y1]=\"node[1]['y1']\"\n                        [attr.x2]=\"node[1]['x2']\"\n                        [attr.y2]=\"node[1]['y2']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polyline') {\n                    <svg:polyline\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polygon') {\n                    <svg:polygon\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('ellipse') {\n                    <svg:ellipse\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n            }\n        }\n"
		}]
	}], () => [], null);
})();
export { Trash as t };
