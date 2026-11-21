import { $n as Output, Al as ɵɵdefineInjectable, Bt as computed, Da as ɵɵconditionalCreate, Fn as Injectable, In as Input, Sa as ɵɵclassMap, T as afterRenderEffect, Ta as ɵɵconditional, Tl as signal, Wi as setClassMetadata, X as input, ao as ɵɵdefineNgModule, at as output, ca as ɵɵInheritDefinitionFeature, cn as Component, cs as ɵɵprojectionDef, dl as inject, il as effect, io as ɵɵdefineDirective, jl as ɵɵdefineInjector, jo as ɵɵgetInheritedFactory, kc as InjectionToken, qn as NgModule, qt as untracked, ro as ɵɵdefineComponent, sa as ɵɵHostDirectivesFeature, ss as ɵɵprojection, ua as ɵɵProvidersFeature, wn as Directive } from "./core-BRnM5AcM.js";
import { x as CommonModule } from "./common-BHJivUlT.js";
import { T as se } from "./dist-D971aPsi.js";
import { At as ue, Pt as xe, et as M, jt as v, st as W$1, xt as le } from "./dist-BnkFXv39.js";
import { n as PARENT_INSTANCE, t as BaseComponent } from "./primeng-basecomponent-eFp8WNlF.js";
import { Bind, BindModule } from "./primeng_bind.js";
import { s as BaseStyle } from "./primeng-config-E0JoXWcg.js";
import { n as _objectSpread2, r as _defineProperty, t as _asyncToGenerator } from "./asyncToGenerator-CE9zIWF7.js";
// ../node_modules/@primeuix/motion/dist/index.mjs
var J = Object.defineProperty;
var N = Object.getOwnPropertySymbols;
var K = Object.prototype.hasOwnProperty;
var Q = Object.prototype.propertyIsEnumerable;
var S = (t, o, e) => o in t ? J(t, o, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: e
}) : t[o] = e;
var x = (t, o) => {
	for (var e in o || (o = {})) K.call(o, e) && S(t, e, o[e]);
	if (N) for (var e of N(o)) Q.call(o, e) && S(t, e, o[e]);
	return t;
};
var k = (t, o, e) => new Promise((i, u) => {
	var a = (s) => {
		try {
			h(e.next(s));
		} catch (f) {
			u(f);
		}
	}, M = (s) => {
		try {
			h(e.throw(s));
		} catch (f) {
			u(f);
		}
	}, h = (s) => s.done ? i(s.value) : Promise.resolve(s.value).then(a, M);
	h((e = e.apply(t, o)).next());
});
var p = "animation";
var E = "transition";
var Z = [
	"data-enter-phase",
	"data-enter-from",
	"data-enter-to",
	"data-enter-active",
	"data-leave-phase",
	"data-leave-from",
	"data-leave-to",
	"data-leave-active"
];
function j(t) {
	return t ? t.disabled || !!(t.safe && le()) : !1;
}
function V(t, o) {
	return t ? x(x({}, t), Object.entries(o).reduce((e, [i, u]) => {
		var a;
		return e[i] = (a = t[i]) != null ? a : u, e;
	}, {})) : x({}, o);
}
function _(t) {
	let { name: o, enterClass: e, leaveClass: i } = t || {};
	return {
		enter: {
			from: (e == null ? void 0 : e.from) || `${o}-enter-from`,
			to: (e == null ? void 0 : e.to) || `${o}-enter-to`,
			active: (e == null ? void 0 : e.active) || `${o}-enter-active`
		},
		leave: {
			from: (i == null ? void 0 : i.from) || `${o}-leave-from`,
			to: (i == null ? void 0 : i.to) || `${o}-leave-to`,
			active: (i == null ? void 0 : i.active) || `${o}-leave-active`
		}
	};
}
function C(t) {
	return {
		enter: {
			onBefore: t == null ? void 0 : t.onBeforeEnter,
			onStart: t == null ? void 0 : t.onEnter,
			onAfter: t == null ? void 0 : t.onAfterEnter,
			onCancelled: t == null ? void 0 : t.onEnterCancelled
		},
		leave: {
			onBefore: t == null ? void 0 : t.onBeforeLeave,
			onStart: t == null ? void 0 : t.onLeave,
			onAfter: t == null ? void 0 : t.onAfterLeave,
			onCancelled: t == null ? void 0 : t.onLeaveCancelled
		}
	};
}
function R(t, o) {
	let e = window.getComputedStyle(t), i = (d) => {
		let l = e[`${d}Duration`].split(", ").map(se), m = e[`${d}Delay`].split(", ").map(se);
		return m.length < l.length && m.length > 0 && (m = l.map((v, b) => m[b % m.length])), [m, l];
	}, [u, a] = i(E), [M, h] = i(p), s = Math.max(...a.map((d, l) => d + u[l])), f = Math.max(...h.map((d, l) => d + M[l])), r, n = 0, c = 0;
	return o === "transition" ? s > 0 && (r = "transition", n = s, c = a.length) : o === "animation" ? f > 0 && (r = "animation", n = f, c = h.length) : (n = Math.max(s, f), r = n > 0 ? s > f ? E : p : void 0, c = r ? r === "transition" ? a.length : h.length : 0), {
		type: r,
		timeout: n,
		count: c
	};
}
function q(t, o) {
	return typeof t == "number" ? t : t != null && typeof t == "object" && t[o] != null ? t[o] : null;
}
function W(t, o) {
	return t ? `--${t}-${o}` : `--${o}`;
}
function g(t, o, e) {
	let { autoHeight: i, autoWidth: u, cssVarPrefix: a } = o, M = typeof e == "object";
	i && xe(t, W(a, "height"), M ? e.height : e), u && xe(t, W(a, "width"), M ? e.width : e);
}
function P(t, o) {
	if (!o.autoHeight && !o.autoWidth) return;
	let e = t.scrollHeight, i = t.scrollWidth;
	if (!e || !i) {
		let u = v(t);
		e || (e = u.height), i || (i = u.width);
	}
	g(t, o, {
		height: e + "px",
		width: i + "px"
	});
}
function z(t, o) {
	t.setAttribute(`data-${o}-phase`, "");
}
function O(t, o, e) {
	t.removeAttribute("data-enter-from"), t.removeAttribute("data-enter-to"), t.removeAttribute("data-leave-from"), t.removeAttribute("data-leave-to"), t.setAttribute(`data-${o}-${e}`, ""), t.setAttribute(`data-${o}-active`, "");
}
function T(t) {
	t.removeAttribute("data-enter-phase"), t.removeAttribute("data-leave-phase");
}
function B(t) {
	Z.forEach((o) => t.removeAttribute(o));
}
var tt = Object.freeze({
	name: "p",
	safe: !0,
	disabled: !1,
	enter: !0,
	leave: !0,
	autoHeight: !0,
	autoWidth: !0,
	cssVarPrefix: ""
});
function dt(t, o) {
	if (!t) throw new Error("Element is required.");
	let e = {}, i = !1, u = {}, a = null, M$1 = {}, h = (r) => {
		for (let n of Object.keys(e)) delete e[n];
		if (Object.assign(e, V(r, tt)), !e.enter && !e.leave) throw new Error("Enter or leave must be true.");
		M$1 = C(e), i = j(e), u = _(e), a = null;
	}, s = (r) => k(null, null, function* () {
		a == null || a();
		let n = t, { onBefore: c, onStart: d, onAfter: l, onCancelled: m } = M$1[r] || {}, v = { element: t };
		if (z(n, r), i) {
			c == null || c(v), d == null || d(v), l == null || l(v), T(n), g(n, e, r === "enter" ? "auto" : "0px");
			return;
		}
		let { from: b, active: A, to: H } = u[r] || {};
		return c == null || c(v), r === "enter" ? g(n, e, "0px") : r === "leave" && P(n, e), M(n, b), M(n, A), O(n, r, "from"), n.offsetHeight, r === "enter" ? P(n, e) : r === "leave" && g(n, e, "0px"), W$1(n, b), M(n, H), O(n, r, "to"), d == null || d(v), new Promise((D) => {
			let U = q(e.duration, r), w = () => {
				W$1(n, [H, A]), a = null, B(n), T(n);
			}, G = () => {
				w(), l == null || l(v), D(), r === "enter" ? g(n, e, "auto") : r === "leave" && g(n, e, "0px");
			}, L = () => {};
			a = () => {
				L(), w(), m == null || m(v), D();
			}, L = ot(n, e.type, U, G);
		});
	});
	h(o), g(t, e, "0px");
	let f = {
		enter: () => e.enter ? s("enter") : Promise.resolve(),
		leave: () => e.leave ? s("leave") : Promise.resolve(),
		cancel: () => {
			a == null || a(), a = null;
		},
		update: (r, n) => {
			if (!r) throw new Error("Element is required.");
			t = r, f.cancel(), n && h(n);
		}
	};
	return e.appear && f.enter(), f;
}
var et = 0;
function ot(t, o, e, i) {
	let u = t._motionEndId = ++et, a = () => {
		u === t._motionEndId && i();
	};
	if (e != null) {
		let m = setTimeout(a, e);
		return () => clearTimeout(m);
	}
	let { type: M, timeout: h, count: s } = R(t, o);
	if (!M) return i(), () => {};
	let f = M + "end", r = 0, n = () => {
		t.removeEventListener(f, d, !0), clearTimeout(l);
	}, c = () => {
		n(), a();
	}, d = (m) => {
		m.target === t && ++r >= s && c();
	};
	t.addEventListener(f, d, { capture: !0 });
	let l = setTimeout(() => {
		r < s && c();
	}, h + 1);
	return n;
}
// ../node_modules/primeng/fesm2022/primeng-motion.mjs
var _MotionStyle;
var _Motion;
var _MotionDirective;
var _MotionModule;
var originalStyles = /* @__PURE__ */ new WeakMap();
function applyHiddenStyles(element, strategy) {
	if (!element) return;
	if (!originalStyles.has(element)) originalStyles.set(element, {
		display: element.style.display,
		visibility: element.style.visibility,
		maxHeight: element.style.maxHeight
	});
	switch (strategy) {
		case "display":
			element.style.display = "none";
			break;
		case "visibility":
			element.style.visibility = "hidden";
			element.style.maxHeight = "0";
	}
}
function resetStyles(element, strategy) {
	var _originalStyles$get;
	if (!element) return;
	const original = (_originalStyles$get = originalStyles.get(element)) !== null && _originalStyles$get !== void 0 ? _originalStyles$get : element.style;
	switch (strategy) {
		case "display":
			element.style.display = (original === null || original === void 0 ? void 0 : original.display) || "";
			break;
		case "visibility":
			element.style.visibility = (original === null || original === void 0 ? void 0 : original.visibility) || "";
			element.style.maxHeight = (original === null || original === void 0 ? void 0 : original.maxHeight) || "";
	}
	originalStyles.delete(element);
}
var style = `
    .p-motion {
        display: block;
    }
`;
var classes = { root: "p-motion" };
var MotionStyle = (_MotionStyle = class MotionStyle extends BaseStyle {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "name", "motion");
		_defineProperty(this, "style", style);
		_defineProperty(this, "classes", classes);
	}
}, _defineProperty(_MotionStyle, "ɵfac", /*@__PURE__*/ (() => {
	let ɵMotionStyle_BaseFactory = void 0;
	return function MotionStyle_Factory(__ngFactoryType__) {
		return (ɵMotionStyle_BaseFactory || (ɵMotionStyle_BaseFactory = ɵɵgetInheritedFactory(_MotionStyle)))(__ngFactoryType__ || _MotionStyle);
	};
})()), _defineProperty(_MotionStyle, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _MotionStyle,
	factory: _MotionStyle.ɵfac
})), _MotionStyle);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MotionStyle, [{ type: Injectable }], null, null);
})();
var MotionClasses;
(function(MotionClasses) {
	MotionClasses["root"] = "p-motion";
})(MotionClasses || (MotionClasses = {}));
var MOTION_INSTANCE = new InjectionToken("MOTION_INSTANCE");
var Motion = (_Motion = class Motion extends BaseComponent {
	constructor() {
		var _this;
		var _inject;
		super();
		_this = this;
		_defineProperty(this, "$pcMotion", (_inject = inject(MOTION_INSTANCE, {
			optional: true,
			skipSelf: true
		})) !== null && _inject !== void 0 ? _inject : void 0);
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		_defineProperty(this, "_componentStyle", inject(MotionStyle));
		_defineProperty(this, "visible", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "visible" } : /* istanbul ignore next */ {}), {}, { transform: (value) => value !== null && value !== void 0 ? value : false })));
		_defineProperty(this, "mountOnEnter", input(true, ...ngDevMode ? [{ debugName: "mountOnEnter" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "unmountOnLeave", input(true, ...ngDevMode ? [{ debugName: "unmountOnLeave" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "name", input(void 0, ...ngDevMode ? [{ debugName: "name" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "type", input(void 0, ...ngDevMode ? [{ debugName: "type" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "safe", input(void 0, ...ngDevMode ? [{ debugName: "safe" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "disabled", input(false, ...ngDevMode ? [{ debugName: "disabled" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "appear", input(false, ...ngDevMode ? [{ debugName: "appear" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "enter", input(true, ...ngDevMode ? [{ debugName: "enter" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "leave", input(true, ...ngDevMode ? [{ debugName: "leave" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "duration", input(void 0, ...ngDevMode ? [{ debugName: "duration" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "hideStrategy", input("display", ...ngDevMode ? [{ debugName: "hideStrategy" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "enterFromClass", input(void 0, ...ngDevMode ? [{ debugName: "enterFromClass" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "enterToClass", input(void 0, ...ngDevMode ? [{ debugName: "enterToClass" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "enterActiveClass", input(void 0, ...ngDevMode ? [{ debugName: "enterActiveClass" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "leaveFromClass", input(void 0, ...ngDevMode ? [{ debugName: "leaveFromClass" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "leaveToClass", input(void 0, ...ngDevMode ? [{ debugName: "leaveToClass" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "leaveActiveClass", input(void 0, ...ngDevMode ? [{ debugName: "leaveActiveClass" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "options", input({}, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "options" } : /* istanbul ignore next */ {}), {}, { transform: (value) => value !== null && value !== void 0 ? value : {} })));
		_defineProperty(this, "onBeforeEnter", output());
		_defineProperty(this, "onEnter", output());
		_defineProperty(this, "onAfterEnter", output());
		_defineProperty(this, "onEnterCancelled", output());
		_defineProperty(this, "onBeforeLeave", output());
		_defineProperty(this, "onLeave", output());
		_defineProperty(this, "onAfterLeave", output());
		_defineProperty(this, "onLeaveCancelled", output());
		_defineProperty(this, "motionOptions", computed(() => {
			var _options$name, _options$type, _options$safe, _options$disabled, _options$enter, _options$leave, _options$duration, _options$enterClass$f, _options$enterClass, _options$enterClass$t, _options$enterClass2, _options$enterClass$a, _options$enterClass3, _options$leaveClass$f, _options$leaveClass, _options$leaveClass$t, _options$leaveClass2, _options$leaveClass$a, _options$leaveClass3, _options$onBeforeEnte, _options$onEnter, _options$onAfterEnter, _options$onEnterCance, _options$onBeforeLeav, _options$onLeave, _options$onAfterLeave, _options$onLeaveCance;
			const options = this.options();
			return {
				name: (_options$name = options.name) !== null && _options$name !== void 0 ? _options$name : this.name(),
				type: (_options$type = options.type) !== null && _options$type !== void 0 ? _options$type : this.type(),
				safe: (_options$safe = options.safe) !== null && _options$safe !== void 0 ? _options$safe : this.safe(),
				disabled: (_options$disabled = options.disabled) !== null && _options$disabled !== void 0 ? _options$disabled : this.disabled(),
				appear: false,
				enter: (_options$enter = options.enter) !== null && _options$enter !== void 0 ? _options$enter : this.enter(),
				leave: (_options$leave = options.leave) !== null && _options$leave !== void 0 ? _options$leave : this.leave(),
				duration: (_options$duration = options.duration) !== null && _options$duration !== void 0 ? _options$duration : this.duration(),
				enterClass: {
					from: (_options$enterClass$f = (_options$enterClass = options.enterClass) === null || _options$enterClass === void 0 ? void 0 : _options$enterClass.from) !== null && _options$enterClass$f !== void 0 ? _options$enterClass$f : !options.name ? this.enterFromClass() : void 0,
					to: (_options$enterClass$t = (_options$enterClass2 = options.enterClass) === null || _options$enterClass2 === void 0 ? void 0 : _options$enterClass2.to) !== null && _options$enterClass$t !== void 0 ? _options$enterClass$t : !options.name ? this.enterToClass() : void 0,
					active: (_options$enterClass$a = (_options$enterClass3 = options.enterClass) === null || _options$enterClass3 === void 0 ? void 0 : _options$enterClass3.active) !== null && _options$enterClass$a !== void 0 ? _options$enterClass$a : !options.name ? this.enterActiveClass() : void 0
				},
				leaveClass: {
					from: (_options$leaveClass$f = (_options$leaveClass = options.leaveClass) === null || _options$leaveClass === void 0 ? void 0 : _options$leaveClass.from) !== null && _options$leaveClass$f !== void 0 ? _options$leaveClass$f : !options.name ? this.leaveFromClass() : void 0,
					to: (_options$leaveClass$t = (_options$leaveClass2 = options.leaveClass) === null || _options$leaveClass2 === void 0 ? void 0 : _options$leaveClass2.to) !== null && _options$leaveClass$t !== void 0 ? _options$leaveClass$t : !options.name ? this.leaveToClass() : void 0,
					active: (_options$leaveClass$a = (_options$leaveClass3 = options.leaveClass) === null || _options$leaveClass3 === void 0 ? void 0 : _options$leaveClass3.active) !== null && _options$leaveClass$a !== void 0 ? _options$leaveClass$a : !options.name ? this.leaveActiveClass() : void 0
				},
				onBeforeEnter: (_options$onBeforeEnte = options.onBeforeEnter) !== null && _options$onBeforeEnte !== void 0 ? _options$onBeforeEnte : this.handleBeforeEnter,
				onEnter: (_options$onEnter = options.onEnter) !== null && _options$onEnter !== void 0 ? _options$onEnter : this.handleEnter,
				onAfterEnter: (_options$onAfterEnter = options.onAfterEnter) !== null && _options$onAfterEnter !== void 0 ? _options$onAfterEnter : this.handleAfterEnter,
				onEnterCancelled: (_options$onEnterCance = options.onEnterCancelled) !== null && _options$onEnterCance !== void 0 ? _options$onEnterCance : this.handleEnterCancelled,
				onBeforeLeave: (_options$onBeforeLeav = options.onBeforeLeave) !== null && _options$onBeforeLeav !== void 0 ? _options$onBeforeLeav : this.handleBeforeLeave,
				onLeave: (_options$onLeave = options.onLeave) !== null && _options$onLeave !== void 0 ? _options$onLeave : this.handleLeave,
				onAfterLeave: (_options$onAfterLeave = options.onAfterLeave) !== null && _options$onAfterLeave !== void 0 ? _options$onAfterLeave : this.handleAfterLeave,
				onLeaveCancelled: (_options$onLeaveCance = options.onLeaveCancelled) !== null && _options$onLeaveCance !== void 0 ? _options$onLeaveCance : this.handleLeaveCancelled
			};
		}, ...ngDevMode ? [{ debugName: "motionOptions" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "motion", void 0);
		_defineProperty(this, "isInitialMount", true);
		_defineProperty(this, "cancelled", false);
		_defineProperty(this, "destroyed", false);
		_defineProperty(this, "rendered", signal(false, ...ngDevMode ? [{ debugName: "rendered" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "handleBeforeEnter", (event) => !this.destroyed && this.onBeforeEnter.emit(event));
		_defineProperty(this, "handleEnter", (event) => !this.destroyed && this.onEnter.emit(event));
		_defineProperty(this, "handleAfterEnter", (event) => !this.destroyed && this.onAfterEnter.emit(event));
		_defineProperty(this, "handleEnterCancelled", (event) => !this.destroyed && this.onEnterCancelled.emit(event));
		_defineProperty(this, "handleBeforeLeave", (event) => !this.destroyed && this.onBeforeLeave.emit(event));
		_defineProperty(this, "handleLeave", (event) => !this.destroyed && this.onLeave.emit(event));
		_defineProperty(this, "handleAfterLeave", (event) => !this.destroyed && this.onAfterLeave.emit(event));
		_defineProperty(this, "handleLeaveCancelled", (event) => !this.destroyed && this.onLeaveCancelled.emit(event));
		effect(() => {
			const hideStrategy = this.hideStrategy();
			if (this.isInitialMount) {
				applyHiddenStyles(this.$el, hideStrategy);
				this.rendered.set(this.visible() && this.mountOnEnter() || !this.mountOnEnter());
			} else if (this.visible() && !this.rendered()) {
				applyHiddenStyles(this.$el, hideStrategy);
				this.rendered.set(true);
			}
		});
		effect(() => {
			if (!this.motion) this.motion = dt(this.$el, this.motionOptions());
		});
		afterRenderEffect(_asyncToGenerator(function* () {
			if (!_this.$el) return;
			const shouldAppear = _this.isInitialMount && _this.visible() && _this.appear();
			const hideStrategy = _this.hideStrategy();
			if (_this.visible()) {
				yield ue();
				resetStyles(_this.$el, hideStrategy);
				if (shouldAppear || !_this.isInitialMount) {
					var _this$motion;
					_this.applyMotionDuration("enter");
					(_this$motion = _this.motion) === null || _this$motion === void 0 || _this$motion.enter();
				}
			} else if (!_this.isInitialMount) {
				var _this$motion2;
				yield ue();
				_this.applyMotionDuration("leave");
				(_this$motion2 = _this.motion) === null || _this$motion2 === void 0 || (_this$motion2 = _this$motion2.leave()) === null || _this$motion2 === void 0 || _this$motion2.then(_asyncToGenerator(function* () {
					if (_this.$el && !_this.cancelled && !_this.visible()) {
						applyHiddenStyles(_this.$el, hideStrategy);
						if (_this.unmountOnLeave()) {
							yield ue();
							if (!_this.cancelled) _this.rendered.set(false);
						}
					}
				}));
			}
			_this.isInitialMount = false;
		}));
	}
	applyMotionDuration(phase) {
		const options = untracked(this.motionOptions);
		const ms = q(options.duration, phase);
		if (ms == null || !this.$el) return;
		const el = this.$el;
		const durationValue = `${ms}ms`;
		if (options.type === "transition") el.style.transitionDuration = durationValue;
		else el.style.animationDuration = durationValue;
	}
	onAfterViewChecked() {
		var _this$options;
		const optionsAttrs = ((_this$options = this.options()) === null || _this$options === void 0 ? void 0 : _this$options.root) || {};
		this.bindDirectiveInstance.setAttrs(_objectSpread2(_objectSpread2({}, this.ptms(["host", "root"])), optionsAttrs));
	}
	onDestroy() {
		var _this$motion3, _this$$el;
		this.destroyed = true;
		this.cancelled = true;
		(_this$motion3 = this.motion) === null || _this$motion3 === void 0 || _this$motion3.cancel();
		this.motion = void 0;
		resetStyles(this.$el, this.hideStrategy());
		(_this$$el = this.$el) === null || _this$$el === void 0 || _this$$el.remove();
		this.isInitialMount = true;
	}
}, _defineProperty(_Motion, "ɵfac", function Motion_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _Motion)();
}), _defineProperty(_Motion, "ɵcmp", (function() {
	const _c0 = ["*"];
	function Motion_Conditional_0_Template(rf, ctx) {
		if (rf & 1) ɵɵprojection(0);
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _Motion,
		selectors: [["p-motion"]],
		hostVars: 2,
		hostBindings: function Motion_HostBindings(rf, ctx) {
			if (rf & 2) ɵɵclassMap(ctx.cx("root"));
		},
		inputs: {
			visible: [1, "visible"],
			mountOnEnter: [1, "mountOnEnter"],
			unmountOnLeave: [1, "unmountOnLeave"],
			name: [1, "name"],
			type: [1, "type"],
			safe: [1, "safe"],
			disabled: [1, "disabled"],
			appear: [1, "appear"],
			enter: [1, "enter"],
			leave: [1, "leave"],
			duration: [1, "duration"],
			hideStrategy: [1, "hideStrategy"],
			enterFromClass: [1, "enterFromClass"],
			enterToClass: [1, "enterToClass"],
			enterActiveClass: [1, "enterActiveClass"],
			leaveFromClass: [1, "leaveFromClass"],
			leaveToClass: [1, "leaveToClass"],
			leaveActiveClass: [1, "leaveActiveClass"],
			options: [1, "options"]
		},
		outputs: {
			onBeforeEnter: "onBeforeEnter",
			onEnter: "onEnter",
			onAfterEnter: "onAfterEnter",
			onEnterCancelled: "onEnterCancelled",
			onBeforeLeave: "onBeforeLeave",
			onLeave: "onLeave",
			onAfterLeave: "onAfterLeave",
			onLeaveCancelled: "onLeaveCancelled"
		},
		features: [
			ɵɵProvidersFeature([
				MotionStyle,
				{
					provide: MOTION_INSTANCE,
					useExisting: _Motion
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: _Motion
				}
			]),
			ɵɵHostDirectivesFeature([Bind]),
			ɵɵInheritDefinitionFeature
		],
		ngContentSelectors: _c0,
		decls: 1,
		vars: 1,
		template: function Motion_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵprojectionDef();
				ɵɵconditionalCreate(0, Motion_Conditional_0_Template, 1, 0);
			}
			if (rf & 2) ɵɵconditional(ctx.rendered() ? 0 : -1);
		},
		dependencies: [CommonModule, BindModule],
		encapsulation: 2
	});
})()), _Motion);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Motion, [{
		type: Component,
		args: [{
			selector: "p-motion",
			standalone: true,
			imports: [CommonModule, BindModule],
			template: `
        @if (rendered()) {
            <ng-content />
        }
    `,
			providers: [
				MotionStyle,
				{
					provide: MOTION_INSTANCE,
					useExisting: Motion
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: Motion
				}
			],
			host: { "[class]": "cx('root')" },
			hostDirectives: [Bind]
		}]
	}], () => [], {
		visible: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "visible",
				required: false
			}]
		}],
		mountOnEnter: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "mountOnEnter",
				required: false
			}]
		}],
		unmountOnLeave: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "unmountOnLeave",
				required: false
			}]
		}],
		name: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "name",
				required: false
			}]
		}],
		type: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "type",
				required: false
			}]
		}],
		safe: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "safe",
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
		appear: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "appear",
				required: false
			}]
		}],
		enter: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "enter",
				required: false
			}]
		}],
		leave: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "leave",
				required: false
			}]
		}],
		duration: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "duration",
				required: false
			}]
		}],
		hideStrategy: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "hideStrategy",
				required: false
			}]
		}],
		enterFromClass: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "enterFromClass",
				required: false
			}]
		}],
		enterToClass: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "enterToClass",
				required: false
			}]
		}],
		enterActiveClass: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "enterActiveClass",
				required: false
			}]
		}],
		leaveFromClass: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "leaveFromClass",
				required: false
			}]
		}],
		leaveToClass: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "leaveToClass",
				required: false
			}]
		}],
		leaveActiveClass: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "leaveActiveClass",
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
		onBeforeEnter: [{
			type: Output,
			args: ["onBeforeEnter"]
		}],
		onEnter: [{
			type: Output,
			args: ["onEnter"]
		}],
		onAfterEnter: [{
			type: Output,
			args: ["onAfterEnter"]
		}],
		onEnterCancelled: [{
			type: Output,
			args: ["onEnterCancelled"]
		}],
		onBeforeLeave: [{
			type: Output,
			args: ["onBeforeLeave"]
		}],
		onLeave: [{
			type: Output,
			args: ["onLeave"]
		}],
		onAfterLeave: [{
			type: Output,
			args: ["onAfterLeave"]
		}],
		onLeaveCancelled: [{
			type: Output,
			args: ["onLeaveCancelled"]
		}]
	});
})();
var MOTION_DIRECTIVE_INSTANCE = new InjectionToken("MOTION_DIRECTIVE_INSTANCE");
var MotionDirective = (_MotionDirective = class MotionDirective extends BaseComponent {
	constructor() {
		var _inject2;
		super();
		_defineProperty(this, "$pcMotionDirective", (_inject2 = inject(MOTION_DIRECTIVE_INSTANCE, {
			optional: true,
			skipSelf: true
		})) !== null && _inject2 !== void 0 ? _inject2 : void 0);
		_defineProperty(this, "visible", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "visible" } : /* istanbul ignore next */ {}), {}, {
			alias: "pMotion",
			transform: (value) => value !== null && value !== void 0 ? value : false
		})));
		_defineProperty(this, "name", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "name" } : /* istanbul ignore next */ {}), {}, { alias: "pMotionName" })));
		_defineProperty(this, "type", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "type" } : /* istanbul ignore next */ {}), {}, { alias: "pMotionType" })));
		_defineProperty(this, "safe", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "safe" } : /* istanbul ignore next */ {}), {}, { alias: "pMotionSafe" })));
		_defineProperty(this, "disabled", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {}), {}, { alias: "pMotionDisabled" })));
		_defineProperty(this, "appear", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "appear" } : /* istanbul ignore next */ {}), {}, { alias: "pMotionAppear" })));
		_defineProperty(this, "enter", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "enter" } : /* istanbul ignore next */ {}), {}, { alias: "pMotionEnter" })));
		_defineProperty(this, "leave", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "leave" } : /* istanbul ignore next */ {}), {}, { alias: "pMotionLeave" })));
		_defineProperty(this, "duration", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "duration" } : /* istanbul ignore next */ {}), {}, { alias: "pMotionDuration" })));
		_defineProperty(this, "hideStrategy", input("display", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "hideStrategy" } : /* istanbul ignore next */ {}), {}, { alias: "pMotionHideStrategy" })));
		_defineProperty(this, "enterFromClass", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "enterFromClass" } : /* istanbul ignore next */ {}), {}, { alias: "pMotionEnterFromClass" })));
		_defineProperty(this, "enterToClass", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "enterToClass" } : /* istanbul ignore next */ {}), {}, { alias: "pMotionEnterToClass" })));
		_defineProperty(this, "enterActiveClass", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "enterActiveClass" } : /* istanbul ignore next */ {}), {}, { alias: "pMotionEnterActiveClass" })));
		_defineProperty(this, "leaveFromClass", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "leaveFromClass" } : /* istanbul ignore next */ {}), {}, { alias: "pMotionLeaveFromClass" })));
		_defineProperty(this, "leaveToClass", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "leaveToClass" } : /* istanbul ignore next */ {}), {}, { alias: "pMotionLeaveToClass" })));
		_defineProperty(this, "leaveActiveClass", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "leaveActiveClass" } : /* istanbul ignore next */ {}), {}, { alias: "pMotionLeaveActiveClass" })));
		_defineProperty(this, "options", input({}, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "options" } : /* istanbul ignore next */ {}), {}, {
			alias: "pMotionOptions",
			transform: (value) => value !== null && value !== void 0 ? value : {}
		})));
		_defineProperty(this, "onBeforeEnter", output({ alias: "pMotionOnBeforeEnter" }));
		_defineProperty(this, "onEnter", output({ alias: "pMotionOnEnter" }));
		_defineProperty(this, "onAfterEnter", output({ alias: "pMotionOnAfterEnter" }));
		_defineProperty(this, "onEnterCancelled", output({ alias: "pMotionOnEnterCancelled" }));
		_defineProperty(this, "onBeforeLeave", output({ alias: "pMotionOnBeforeLeave" }));
		_defineProperty(this, "onLeave", output({ alias: "pMotionOnLeave" }));
		_defineProperty(this, "onAfterLeave", output({ alias: "pMotionOnAfterLeave" }));
		_defineProperty(this, "onLeaveCancelled", output({ alias: "pMotionOnLeaveCancelled" }));
		_defineProperty(this, "motionOptions", computed(() => {
			var _this$options2, _options$name2, _options$type2, _options$safe2, _options$disabled2, _options$enter2, _options$leave2, _options$duration2, _options$enterClass$f2, _options$enterClass4, _options$enterClass$t2, _options$enterClass5, _options$enterClass$a2, _options$enterClass6, _options$leaveClass$f2, _options$leaveClass4, _options$leaveClass$t2, _options$leaveClass5, _options$leaveClass$a2, _options$leaveClass6, _options$onBeforeEnte2, _options$onEnter2, _options$onAfterEnter2, _options$onEnterCance2, _options$onBeforeLeav2, _options$onLeave2, _options$onAfterLeave2, _options$onLeaveCance2;
			const options = (_this$options2 = this.options()) !== null && _this$options2 !== void 0 ? _this$options2 : {};
			return {
				name: (_options$name2 = options.name) !== null && _options$name2 !== void 0 ? _options$name2 : this.name(),
				type: (_options$type2 = options.type) !== null && _options$type2 !== void 0 ? _options$type2 : this.type(),
				safe: (_options$safe2 = options.safe) !== null && _options$safe2 !== void 0 ? _options$safe2 : this.safe(),
				disabled: (_options$disabled2 = options.disabled) !== null && _options$disabled2 !== void 0 ? _options$disabled2 : this.disabled(),
				appear: false,
				enter: (_options$enter2 = options.enter) !== null && _options$enter2 !== void 0 ? _options$enter2 : this.enter(),
				leave: (_options$leave2 = options.leave) !== null && _options$leave2 !== void 0 ? _options$leave2 : this.leave(),
				duration: (_options$duration2 = options.duration) !== null && _options$duration2 !== void 0 ? _options$duration2 : this.duration(),
				enterClass: {
					from: (_options$enterClass$f2 = (_options$enterClass4 = options.enterClass) === null || _options$enterClass4 === void 0 ? void 0 : _options$enterClass4.from) !== null && _options$enterClass$f2 !== void 0 ? _options$enterClass$f2 : !options.name ? this.enterFromClass() : void 0,
					to: (_options$enterClass$t2 = (_options$enterClass5 = options.enterClass) === null || _options$enterClass5 === void 0 ? void 0 : _options$enterClass5.to) !== null && _options$enterClass$t2 !== void 0 ? _options$enterClass$t2 : !options.name ? this.enterToClass() : void 0,
					active: (_options$enterClass$a2 = (_options$enterClass6 = options.enterClass) === null || _options$enterClass6 === void 0 ? void 0 : _options$enterClass6.active) !== null && _options$enterClass$a2 !== void 0 ? _options$enterClass$a2 : !options.name ? this.enterActiveClass() : void 0
				},
				leaveClass: {
					from: (_options$leaveClass$f2 = (_options$leaveClass4 = options.leaveClass) === null || _options$leaveClass4 === void 0 ? void 0 : _options$leaveClass4.from) !== null && _options$leaveClass$f2 !== void 0 ? _options$leaveClass$f2 : !options.name ? this.leaveFromClass() : void 0,
					to: (_options$leaveClass$t2 = (_options$leaveClass5 = options.leaveClass) === null || _options$leaveClass5 === void 0 ? void 0 : _options$leaveClass5.to) !== null && _options$leaveClass$t2 !== void 0 ? _options$leaveClass$t2 : !options.name ? this.leaveToClass() : void 0,
					active: (_options$leaveClass$a2 = (_options$leaveClass6 = options.leaveClass) === null || _options$leaveClass6 === void 0 ? void 0 : _options$leaveClass6.active) !== null && _options$leaveClass$a2 !== void 0 ? _options$leaveClass$a2 : !options.name ? this.leaveActiveClass() : void 0
				},
				onBeforeEnter: (_options$onBeforeEnte2 = options.onBeforeEnter) !== null && _options$onBeforeEnte2 !== void 0 ? _options$onBeforeEnte2 : this.handleBeforeEnter,
				onEnter: (_options$onEnter2 = options.onEnter) !== null && _options$onEnter2 !== void 0 ? _options$onEnter2 : this.handleEnter,
				onAfterEnter: (_options$onAfterEnter2 = options.onAfterEnter) !== null && _options$onAfterEnter2 !== void 0 ? _options$onAfterEnter2 : this.handleAfterEnter,
				onEnterCancelled: (_options$onEnterCance2 = options.onEnterCancelled) !== null && _options$onEnterCance2 !== void 0 ? _options$onEnterCance2 : this.handleEnterCancelled,
				onBeforeLeave: (_options$onBeforeLeav2 = options.onBeforeLeave) !== null && _options$onBeforeLeav2 !== void 0 ? _options$onBeforeLeav2 : this.handleBeforeLeave,
				onLeave: (_options$onLeave2 = options.onLeave) !== null && _options$onLeave2 !== void 0 ? _options$onLeave2 : this.handleLeave,
				onAfterLeave: (_options$onAfterLeave2 = options.onAfterLeave) !== null && _options$onAfterLeave2 !== void 0 ? _options$onAfterLeave2 : this.handleAfterLeave,
				onLeaveCancelled: (_options$onLeaveCance2 = options.onLeaveCancelled) !== null && _options$onLeaveCance2 !== void 0 ? _options$onLeaveCance2 : this.handleLeaveCancelled
			};
		}, ...ngDevMode ? [{ debugName: "motionOptions" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "motion", void 0);
		_defineProperty(this, "isInitialMount", true);
		_defineProperty(this, "cancelled", false);
		_defineProperty(this, "destroyed", false);
		_defineProperty(this, "handleBeforeEnter", (event) => !this.destroyed && this.onBeforeEnter.emit(event));
		_defineProperty(this, "handleEnter", (event) => !this.destroyed && this.onEnter.emit(event));
		_defineProperty(this, "handleAfterEnter", (event) => !this.destroyed && this.onAfterEnter.emit(event));
		_defineProperty(this, "handleEnterCancelled", (event) => !this.destroyed && this.onEnterCancelled.emit(event));
		_defineProperty(this, "handleBeforeLeave", (event) => !this.destroyed && this.onBeforeLeave.emit(event));
		_defineProperty(this, "handleLeave", (event) => !this.destroyed && this.onLeave.emit(event));
		_defineProperty(this, "handleAfterLeave", (event) => !this.destroyed && this.onAfterLeave.emit(event));
		_defineProperty(this, "handleLeaveCancelled", (event) => !this.destroyed && this.onLeaveCancelled.emit(event));
		afterRenderEffect(() => {
			var _this$motion4;
			if (!this.$el) return;
			(_this$motion4 = this.motion) !== null && _this$motion4 !== void 0 || (this.motion = dt(this.$el, untracked(this.motionOptions)));
			const shouldAppear = this.isInitialMount && this.visible() && this.appear();
			const hideStrategy = this.hideStrategy();
			if (this.visible()) {
				resetStyles(this.$el, hideStrategy);
				if (shouldAppear || !this.isInitialMount) {
					var _this$motion5;
					this.applyMotionDuration("enter");
					(_this$motion5 = this.motion) === null || _this$motion5 === void 0 || _this$motion5.enter();
				}
			} else if (!this.isInitialMount) {
				var _this$motion6;
				this.applyMotionDuration("leave");
				(_this$motion6 = this.motion) === null || _this$motion6 === void 0 || (_this$motion6 = _this$motion6.leave()) === null || _this$motion6 === void 0 || _this$motion6.then(() => {
					if (this.$el && !this.cancelled && !this.visible()) applyHiddenStyles(this.$el, hideStrategy);
				});
			} else applyHiddenStyles(this.$el, hideStrategy);
			this.isInitialMount = false;
		});
	}
	applyMotionDuration(phase) {
		const options = untracked(this.motionOptions);
		const ms = q(options.duration, phase);
		if (ms == null || !this.$el) return;
		const el = this.$el;
		const durationValue = `${ms}ms`;
		if (options.type === "transition") el.style.transitionDuration = durationValue;
		else el.style.animationDuration = durationValue;
	}
	onDestroy() {
		var _this$motion7, _this$$el2;
		this.destroyed = true;
		this.cancelled = true;
		(_this$motion7 = this.motion) === null || _this$motion7 === void 0 || _this$motion7.cancel();
		this.motion = void 0;
		resetStyles(this.$el, this.hideStrategy());
		(_this$$el2 = this.$el) === null || _this$$el2 === void 0 || _this$$el2.remove();
		this.isInitialMount = true;
	}
}, _defineProperty(_MotionDirective, "ɵfac", function MotionDirective_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _MotionDirective)();
}), _defineProperty(_MotionDirective, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _MotionDirective,
	selectors: [[
		"",
		"pMotion",
		""
	]],
	inputs: {
		visible: [
			1,
			"pMotion",
			"visible"
		],
		name: [
			1,
			"pMotionName",
			"name"
		],
		type: [
			1,
			"pMotionType",
			"type"
		],
		safe: [
			1,
			"pMotionSafe",
			"safe"
		],
		disabled: [
			1,
			"pMotionDisabled",
			"disabled"
		],
		appear: [
			1,
			"pMotionAppear",
			"appear"
		],
		enter: [
			1,
			"pMotionEnter",
			"enter"
		],
		leave: [
			1,
			"pMotionLeave",
			"leave"
		],
		duration: [
			1,
			"pMotionDuration",
			"duration"
		],
		hideStrategy: [
			1,
			"pMotionHideStrategy",
			"hideStrategy"
		],
		enterFromClass: [
			1,
			"pMotionEnterFromClass",
			"enterFromClass"
		],
		enterToClass: [
			1,
			"pMotionEnterToClass",
			"enterToClass"
		],
		enterActiveClass: [
			1,
			"pMotionEnterActiveClass",
			"enterActiveClass"
		],
		leaveFromClass: [
			1,
			"pMotionLeaveFromClass",
			"leaveFromClass"
		],
		leaveToClass: [
			1,
			"pMotionLeaveToClass",
			"leaveToClass"
		],
		leaveActiveClass: [
			1,
			"pMotionLeaveActiveClass",
			"leaveActiveClass"
		],
		options: [
			1,
			"pMotionOptions",
			"options"
		]
	},
	outputs: {
		onBeforeEnter: "pMotionOnBeforeEnter",
		onEnter: "pMotionOnEnter",
		onAfterEnter: "pMotionOnAfterEnter",
		onEnterCancelled: "pMotionOnEnterCancelled",
		onBeforeLeave: "pMotionOnBeforeLeave",
		onLeave: "pMotionOnLeave",
		onAfterLeave: "pMotionOnAfterLeave",
		onLeaveCancelled: "pMotionOnLeaveCancelled"
	},
	features: [ɵɵProvidersFeature([
		MotionStyle,
		{
			provide: MOTION_DIRECTIVE_INSTANCE,
			useExisting: _MotionDirective
		},
		{
			provide: PARENT_INSTANCE,
			useExisting: _MotionDirective
		}
	]), ɵɵInheritDefinitionFeature]
})), _MotionDirective);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MotionDirective, [{
		type: Directive,
		args: [{
			selector: "[pMotion]",
			standalone: true,
			providers: [
				MotionStyle,
				{
					provide: MOTION_DIRECTIVE_INSTANCE,
					useExisting: MotionDirective
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: MotionDirective
				}
			]
		}]
	}], () => [], {
		visible: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pMotion",
				required: false
			}]
		}],
		name: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pMotionName",
				required: false
			}]
		}],
		type: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pMotionType",
				required: false
			}]
		}],
		safe: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pMotionSafe",
				required: false
			}]
		}],
		disabled: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pMotionDisabled",
				required: false
			}]
		}],
		appear: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pMotionAppear",
				required: false
			}]
		}],
		enter: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pMotionEnter",
				required: false
			}]
		}],
		leave: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pMotionLeave",
				required: false
			}]
		}],
		duration: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pMotionDuration",
				required: false
			}]
		}],
		hideStrategy: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pMotionHideStrategy",
				required: false
			}]
		}],
		enterFromClass: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pMotionEnterFromClass",
				required: false
			}]
		}],
		enterToClass: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pMotionEnterToClass",
				required: false
			}]
		}],
		enterActiveClass: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pMotionEnterActiveClass",
				required: false
			}]
		}],
		leaveFromClass: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pMotionLeaveFromClass",
				required: false
			}]
		}],
		leaveToClass: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pMotionLeaveToClass",
				required: false
			}]
		}],
		leaveActiveClass: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pMotionLeaveActiveClass",
				required: false
			}]
		}],
		options: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pMotionOptions",
				required: false
			}]
		}],
		onBeforeEnter: [{
			type: Output,
			args: ["pMotionOnBeforeEnter"]
		}],
		onEnter: [{
			type: Output,
			args: ["pMotionOnEnter"]
		}],
		onAfterEnter: [{
			type: Output,
			args: ["pMotionOnAfterEnter"]
		}],
		onEnterCancelled: [{
			type: Output,
			args: ["pMotionOnEnterCancelled"]
		}],
		onBeforeLeave: [{
			type: Output,
			args: ["pMotionOnBeforeLeave"]
		}],
		onLeave: [{
			type: Output,
			args: ["pMotionOnLeave"]
		}],
		onAfterLeave: [{
			type: Output,
			args: ["pMotionOnAfterLeave"]
		}],
		onLeaveCancelled: [{
			type: Output,
			args: ["pMotionOnLeaveCancelled"]
		}]
	});
})();
var MotionModule = (_MotionModule = class MotionModule {}, _defineProperty(_MotionModule, "ɵfac", function MotionModule_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _MotionModule)();
}), _defineProperty(_MotionModule, "ɵmod", /*@__PURE__*/ ɵɵdefineNgModule({
	type: _MotionModule,
	imports: [Motion, MotionDirective],
	exports: [Motion, MotionDirective]
})), _defineProperty(_MotionModule, "ɵinj", /*@__PURE__*/ ɵɵdefineInjector({ imports: [Motion] })), _MotionModule);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MotionModule, [{
		type: NgModule,
		args: [{
			imports: [Motion, MotionDirective],
			exports: [Motion, MotionDirective]
		}]
	}], null, null);
})();
export { MotionDirective as n, MotionModule as r, Motion as t };
