import { Bt as computed, Hs as ɵɵstyleProp, In as Input, On as HostBinding, Sa as ɵɵclassMap, Tl as signal, Wi as setClassMetadata, X as input, io as ɵɵdefineDirective, wn as Directive, ya as ɵɵattribute } from "./core-BRnM5AcM.js";
import { n as a$1 } from "./classnames-CS4uITFG.js";
import { r as _defineProperty } from "./asyncToGenerator-CE9zIWF7.js";
// ../node_modules/@primeicons/core/dist/esm/utils.mjs
function a(n) {
	if (!(n == null || n === "")) return typeof n == "number" || /^\d+(\.\d+)?$/.test(n) ? `${n}px` : `${n}`;
}
// ../node_modules/@primeicons/angular/fesm2022/primeicons-angular-core.mjs
var _CoreIcon;
var ICON_TEMPLATE = `
        @for (node of iconNodes(); track node[1]['key'] || $index) {
            @switch (node[0]) {
                @case ('path') {
                    <svg:path
                        [attr.d]="node[1]['d']"
                        [attr.fill]="node[1]['fill']"
                        [attr.fill-opacity]="node[1]['fillOpacity']"
                        [attr.fill-rule]="node[1]['fillRule']"
                        [attr.clip-rule]="node[1]['clipRule']"
                        [attr.stroke]="node[1]['stroke']"
                        [attr.stroke-width]="node[1]['strokeWidth']"
                        [attr.stroke-opacity]="node[1]['strokeOpacity']"
                        [attr.opacity]="node[1]['opacity']"
                    />
                }
                @case ('circle') {
                    <svg:circle
                        [attr.cx]="node[1]['cx']"
                        [attr.cy]="node[1]['cy']"
                        [attr.r]="node[1]['r']"
                        [attr.fill]="node[1]['fill']"
                        [attr.fill-opacity]="node[1]['fillOpacity']"
                        [attr.opacity]="node[1]['opacity']"
                    />
                }
                @case ('rect') {
                    <svg:rect
                        [attr.x]="node[1]['x']"
                        [attr.y]="node[1]['y']"
                        [attr.width]="node[1]['width']"
                        [attr.height]="node[1]['height']"
                        [attr.rx]="node[1]['rx']"
                        [attr.ry]="node[1]['ry']"
                        [attr.fill]="node[1]['fill']"
                        [attr.fill-opacity]="node[1]['fillOpacity']"
                        [attr.opacity]="node[1]['opacity']"
                    />
                }
                @case ('line') {
                    <svg:line
                        [attr.x1]="node[1]['x1']"
                        [attr.y1]="node[1]['y1']"
                        [attr.x2]="node[1]['x2']"
                        [attr.y2]="node[1]['y2']"
                        [attr.stroke]="node[1]['stroke']"
                        [attr.stroke-opacity]="node[1]['strokeOpacity']"
                        [attr.opacity]="node[1]['opacity']"
                    />
                }
                @case ('polyline') {
                    <svg:polyline
                        [attr.points]="node[1]['points']"
                        [attr.fill]="node[1]['fill']"
                        [attr.fill-opacity]="node[1]['fillOpacity']"
                        [attr.opacity]="node[1]['opacity']"
                    />
                }
                @case ('polygon') {
                    <svg:polygon
                        [attr.points]="node[1]['points']"
                        [attr.fill]="node[1]['fill']"
                        [attr.fill-opacity]="node[1]['fillOpacity']"
                        [attr.opacity]="node[1]['opacity']"
                    />
                }
                @case ('ellipse') {
                    <svg:ellipse
                        [attr.cx]="node[1]['cx']"
                        [attr.cy]="node[1]['cy']"
                        [attr.rx]="node[1]['rx']"
                        [attr.ry]="node[1]['ry']"
                        [attr.fill]="node[1]['fill']"
                        [attr.fill-opacity]="node[1]['fillOpacity']"
                        [attr.opacity]="node[1]['opacity']"
                    />
                }
            }
        }
`;
var CoreIcon = class {
	constructor() {
		_defineProperty(this, "_iconSignal", signal(null, ...ngDevMode ? [{ debugName: "_iconSignal" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "size", input(void 0, ...ngDevMode ? [{ debugName: "size" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "color", input(void 0, ...ngDevMode ? [{ debugName: "color" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "styleClass", input(void 0, ...ngDevMode ? [{ debugName: "styleClass" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "spin", input(void 0, ...ngDevMode ? [{ debugName: "spin" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "iconNodes", computed(() => {
			var _this$_iconSignal$nod, _this$_iconSignal;
			return (_this$_iconSignal$nod = (_this$_iconSignal = this._iconSignal()) === null || _this$_iconSignal === void 0 ? void 0 : _this$_iconSignal.nodes) !== null && _this$_iconSignal$nod !== void 0 ? _this$_iconSignal$nod : [];
		}, ...ngDevMode ? [{ debugName: "iconNodes" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "computedSize", computed(() => {
			var _this$size;
			return (_this$size = this.size()) !== null && _this$size !== void 0 ? _this$size : 20;
		}, ...ngDevMode ? [{ debugName: "computedSize" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "computedClass", computed(() => {
			const icon = this._iconSignal();
			return a$1("p-icon", (icon === null || icon === void 0 ? void 0 : icon.name) && `p-icon-${icon.name}`, this.spin() && "p-icon-spin", this.styleClass());
		}, ...ngDevMode ? [{ debugName: "computedClass" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "hostAriaHidden", "true");
	}
	get _icon() {
		return this._iconSignal();
	}
	set _icon(value) {
		this._iconSignal.set(value);
	}
	get hostWidth() {
		return this.computedSize();
	}
	get hostHeight() {
		return this.computedSize();
	}
	get hostViewBox() {
		var _this$_iconSignal2;
		return (_this$_iconSignal2 = this._iconSignal()) === null || _this$_iconSignal2 === void 0 || (_this$_iconSignal2 = _this$_iconSignal2.svg) === null || _this$_iconSignal2 === void 0 ? void 0 : _this$_iconSignal2.viewBox;
	}
	get hostFill() {
		var _this$_iconSignal3;
		return (_this$_iconSignal3 = this._iconSignal()) === null || _this$_iconSignal3 === void 0 || (_this$_iconSignal3 = _this$_iconSignal3.svg) === null || _this$_iconSignal3 === void 0 ? void 0 : _this$_iconSignal3.fill;
	}
	get hostXmlns() {
		var _this$_iconSignal4;
		return (_this$_iconSignal4 = this._iconSignal()) === null || _this$_iconSignal4 === void 0 || (_this$_iconSignal4 = _this$_iconSignal4.svg) === null || _this$_iconSignal4 === void 0 ? void 0 : _this$_iconSignal4.xmlns;
	}
	get hostClass() {
		return this.computedClass();
	}
	get hostColor() {
		return this.color() || null;
	}
	get hostIconSize() {
		var _formatIconSize;
		return (_formatIconSize = a(this.size())) !== null && _formatIconSize !== void 0 ? _formatIconSize : null;
	}
};
_CoreIcon = CoreIcon;
_defineProperty(CoreIcon, "ɵfac", function CoreIcon_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _CoreIcon)();
});
_defineProperty(CoreIcon, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _CoreIcon,
	hostVars: 12,
	hostBindings: function CoreIcon_HostBindings(rf, ctx) {
		if (rf & 2) {
			ɵɵattribute("width", ctx.hostWidth)("height", ctx.hostHeight)("viewBox", ctx.hostViewBox)("fill", ctx.hostFill)("xmlns", ctx.hostXmlns)("aria-hidden", ctx.hostAriaHidden);
			ɵɵclassMap(ctx.hostClass);
			ɵɵstyleProp("color", ctx.hostColor)("--%NS%px-icon-size", ctx.hostIconSize);
		}
	},
	inputs: {
		size: [1, "size"],
		color: [1, "color"],
		styleClass: [1, "styleClass"],
		spin: [1, "spin"]
	}
}));
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CoreIcon, [{ type: Directive }], null, {
		size: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "size",
				required: false
			}]
		}],
		color: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "color",
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
		spin: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "spin",
				required: false
			}]
		}],
		hostWidth: [{
			type: HostBinding,
			args: ["attr.width"]
		}],
		hostHeight: [{
			type: HostBinding,
			args: ["attr.height"]
		}],
		hostViewBox: [{
			type: HostBinding,
			args: ["attr.viewBox"]
		}],
		hostFill: [{
			type: HostBinding,
			args: ["attr.fill"]
		}],
		hostXmlns: [{
			type: HostBinding,
			args: ["attr.xmlns"]
		}],
		hostAriaHidden: [{
			type: HostBinding,
			args: ["attr.aria-hidden"]
		}],
		hostClass: [{
			type: HostBinding,
			args: ["class"]
		}],
		hostColor: [{
			type: HostBinding,
			args: ["style.color"]
		}],
		hostIconSize: [{
			type: HostBinding,
			args: ["style.--px-icon-size"]
		}]
	});
})();
export { ICON_TEMPLATE as n, CoreIcon as t };
