import { n as _objectSpread2, r as _defineProperty } from "./asyncToGenerator-CE9zIWF7.js";
import { Ac as Injector, Al as ɵɵdefineInjectable, Bc as PLATFORM_ID, Bt as computed, En as ElementRef, Fn as Injectable, In as Input, Tl as signal, Wi as setClassMetadata, X as input, _c as DOCUMENT, dl as inject, il as effect, io as ɵɵdefineDirective, ir as Renderer2, jo as ɵɵgetInheritedFactory, kc as InjectionToken, la as ɵɵNgOnChangesFeature, ml as isSignal, pc as APP_ID, r as ChangeDetectorRef, ua as ɵɵProvidersFeature, wn as Directive } from "./core-BRnM5AcM.js";
import { d as isPlatformServer } from "./common-BHJivUlT.js";
import { n as a } from "./classnames-CS4uITFG.js";
import { Ft as xt, Mt as wt, N as _e, Y as Gt, _ as G, g as F, pt as b, q as Ft, rt as S } from "./dist-BnkFXv39.js";
import { E as x$1, S as m$1, _ as c$1, c as K, r as C, t as A, x as l$1 } from "./dist-D971aPsi.js";
import { r as markInstance } from "./primeng-utils-Ddwu4wH2.js";
import { c as base_default, l as StyleScope, n as PrimeNG, o as showInvalidLicenseBanner, s as BaseStyle } from "./primeng-config-E0JoXWcg.js";
// ../node_modules/@primeuix/utils/dist/mergeprops/index.mjs
var x = Object.defineProperty;
var d = Object.getOwnPropertySymbols;
var c = Object.prototype.hasOwnProperty;
var y = Object.prototype.propertyIsEnumerable;
var p = (t, o, e) => o in t ? x(t, o, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: e
}) : t[o] = e;
var i = (t, o) => {
	for (var e in o || (o = {})) c.call(o, e) && p(t, e, o[e]);
	if (d) for (var e of d(o)) y.call(o, e) && p(t, e, o[e]);
	return t;
};
function f(...t) {
	let o = [];
	for (let e = 0; e < t.length; e++) {
		let a = t[e];
		if (!a) continue;
		let r = typeof a;
		if (r === "string" || r === "number") o.push(a);
		else if (r === "object") {
			let n = Array.isArray(a) ? [f(...a)] : Object.entries(a).map(([s, u]) => u ? s : void 0);
			o = n.length ? o.concat(n.filter((s) => !!s)) : o;
		}
	}
	return o.join(" ").trim();
}
function l(t) {
	return typeof t == "function" && "call" in t && "apply" in t;
}
function m({ skipUndefined: t = !1 }, ...o) {
	return o == null ? void 0 : o.reduce((e, a = {}) => {
		for (let r in a) {
			let n = a[r];
			if (!(t && n === void 0)) if (r === "style") e.style = i(i({}, e.style), a.style);
			else if (r === "class" || r === "className") e[r] = f(e[r], a[r]);
			else if (l(n)) {
				let s = e[r];
				e[r] = s ? (...u) => {
					s(...u), n(...u);
				} : n;
			} else e[r] = n;
		}
		return e;
	}, {});
}
function P(...t) {
	return m({ skipUndefined: !1 }, ...t);
}
// ../node_modules/primeng/fesm2022/primeng-dom.mjs
var _DomHandler = class DomHandler {
	static addClass(element, className) {
		if (element && className) {
			if (element.classList) element.classList.add(className);
			else element.className += " " + className;
		}
	}
	static addMultipleClasses(element, className) {
		if (element && className) {
			if (element.classList) {
				let styles = className.trim().split(" ");
				for (let i = 0; i < styles.length; i++) element.classList.add(styles[i]);
			} else {
				let styles = className.split(" ");
				for (let i = 0; i < styles.length; i++) element.className += " " + styles[i];
			}
		}
	}
	static removeClass(element, className) {
		if (element && className) {
			if (element.classList) element.classList.remove(className);
			else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
		}
	}
	static removeMultipleClasses(element, classNames) {
		if (element && classNames) [classNames].flat().filter(Boolean).forEach((cNames) => cNames.split(" ").forEach((className) => this.removeClass(element, className)));
	}
	static hasClass(element, className) {
		if (element && className) {
			if (element.classList) return element.classList.contains(className);
			else return new RegExp("(^| )" + className + "( |$)", "gi").test(element.className);
		}
		return false;
	}
	static siblings(element) {
		return Array.prototype.filter.call(element.parentNode.children, function(child) {
			return child !== element;
		});
	}
	static find(element, selector) {
		return Array.from(element.querySelectorAll(selector));
	}
	static findSingle(element, selector) {
		return this.isElement(element) ? element.querySelector(selector) : null;
	}
	static index(element) {
		let children = element.parentNode.childNodes;
		let num = 0;
		for (let i = 0; i < children.length; i++) {
			if (children[i] == element) return num;
			if (children[i].nodeType == 1) num++;
		}
		return -1;
	}
	static indexWithinGroup(element, attributeName) {
		let children = element.parentNode ? element.parentNode.childNodes : [];
		let num = 0;
		for (let i = 0; i < children.length; i++) {
			if (children[i] == element) return num;
			if (children[i].attributes && children[i].attributes[attributeName] && children[i].nodeType == 1) num++;
		}
		return -1;
	}
	static appendOverlay(overlay, target, appendTo = "self") {
		if (appendTo !== "self" && overlay && target) this.appendChild(overlay, target);
	}
	static alignOverlay(overlay, target, appendTo = "self", calculateMinWidth = true) {
		if (overlay && target) {
			if (calculateMinWidth) overlay.style.minWidth = `${DomHandler.getOuterWidth(target)}px`;
			if (appendTo === "self") this.relativePosition(overlay, target);
			else this.absolutePosition(overlay, target);
		}
	}
	static relativePosition(element, target, gutter = true) {
		var _getClosestRelativeEl;
		const getClosestRelativeElement = (el) => {
			if (!el) return;
			return getComputedStyle(el).getPropertyValue("position") === "relative" ? el : getClosestRelativeElement(el.parentElement);
		};
		const elementDimensions = element.offsetParent ? {
			width: element.offsetWidth,
			height: element.offsetHeight
		} : this.getHiddenElementDimensions(element);
		const targetHeight = target.offsetHeight;
		const targetOffset = target.getBoundingClientRect();
		const windowScrollTop = this.getWindowScrollTop();
		const windowScrollLeft = this.getWindowScrollLeft();
		const viewport = this.getViewport();
		const relativeElementOffset = ((_getClosestRelativeEl = getClosestRelativeElement(element)) === null || _getClosestRelativeEl === void 0 ? void 0 : _getClosestRelativeEl.getBoundingClientRect()) || {
			top: -1 * windowScrollTop,
			left: -1 * windowScrollLeft
		};
		let top, left, origin = "top";
		if (targetOffset.top + targetHeight + elementDimensions.height > viewport.height) {
			top = targetOffset.top - relativeElementOffset.top - elementDimensions.height;
			origin = "bottom";
			if (targetOffset.top + top < 0) top = -1 * targetOffset.top;
		} else {
			top = targetHeight + targetOffset.top - relativeElementOffset.top;
			origin = "top";
		}
		const horizontalOverflow = targetOffset.left + elementDimensions.width - viewport.width;
		const targetLeftOffsetInSpaceOfRelativeElement = targetOffset.left - relativeElementOffset.left;
		if (elementDimensions.width > viewport.width) left = (targetOffset.left - relativeElementOffset.left) * -1;
		else if (horizontalOverflow > 0) left = targetLeftOffsetInSpaceOfRelativeElement - horizontalOverflow;
		else left = targetOffset.left - relativeElementOffset.left;
		element.style.top = top + "px";
		element.style.left = left + "px";
		element.style.transformOrigin = origin;
		if (gutter) {
			var _getCSSVariableByRege;
			const gutterValue = (_getCSSVariableByRege = S(/-anchor-gutter$/)) === null || _getCSSVariableByRege === void 0 ? void 0 : _getCSSVariableByRege.value;
			element.style.marginTop = origin === "bottom" ? `calc(${gutterValue !== null && gutterValue !== void 0 ? gutterValue : "2px"} * -1)` : gutterValue !== null && gutterValue !== void 0 ? gutterValue : "";
		}
	}
	static absolutePosition(element, target, gutter = true) {
		const elementDimensions = element.offsetParent ? {
			width: element.offsetWidth,
			height: element.offsetHeight
		} : this.getHiddenElementDimensions(element);
		const elementOuterHeight = elementDimensions.height;
		const elementOuterWidth = elementDimensions.width;
		const targetOuterHeight = target.offsetHeight;
		const targetOuterWidth = target.offsetWidth;
		const targetOffset = target.getBoundingClientRect();
		const windowScrollTop = this.getWindowScrollTop();
		const windowScrollLeft = this.getWindowScrollLeft();
		const viewport = this.getViewport();
		let top, left;
		if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
			top = targetOffset.top + windowScrollTop - elementOuterHeight;
			element.style.transformOrigin = "bottom";
			if (top < 0) top = windowScrollTop;
		} else {
			top = targetOuterHeight + targetOffset.top + windowScrollTop;
			element.style.transformOrigin = "top";
		}
		if (targetOffset.left + elementOuterWidth > viewport.width) left = Math.max(0, targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth);
		else left = targetOffset.left + windowScrollLeft;
		element.style.top = top + "px";
		element.style.left = left + "px";
		if (gutter) element.style.marginTop = origin === "bottom" ? "calc(var(--p-anchor-gutter) * -1)" : "calc(var(--p-anchor-gutter))";
	}
	static getParents(element, parents = []) {
		const parent = element["parentNode"] instanceof ShadowRoot ? element["parentNode"].host : element["parentNode"];
		return parent == null ? parents : this.getParents(parent, parents.concat([parent]));
	}
	static getScrollableParents(element) {
		let scrollableParents = [];
		if (element) {
			let parents = this.getParents(element);
			const overflowRegex = /(auto|scroll)/;
			const overflowCheck = (node) => {
				let styleDeclaration = window["getComputedStyle"](node, null);
				return overflowRegex.test(styleDeclaration.getPropertyValue("overflow")) || overflowRegex.test(styleDeclaration.getPropertyValue("overflowX")) || overflowRegex.test(styleDeclaration.getPropertyValue("overflowY"));
			};
			for (let parent of parents) {
				let scrollSelectors = parent.nodeType === 1 && parent.dataset["scrollselectors"];
				if (scrollSelectors) {
					let selectors = scrollSelectors.split(",");
					for (let selector of selectors) {
						let el = this.findSingle(parent, selector);
						if (el && overflowCheck(el)) scrollableParents.push(el);
					}
				}
				if (parent.nodeType !== 9 && overflowCheck(parent)) scrollableParents.push(parent);
			}
		}
		return scrollableParents;
	}
	static getHiddenElementOuterHeight(element) {
		element.style.visibility = "hidden";
		element.style.display = "block";
		let elementHeight = element.offsetHeight;
		element.style.display = "none";
		element.style.visibility = "visible";
		return elementHeight;
	}
	static getHiddenElementOuterWidth(element) {
		element.style.visibility = "hidden";
		element.style.display = "block";
		let elementWidth = element.offsetWidth;
		element.style.display = "none";
		element.style.visibility = "visible";
		return elementWidth;
	}
	static getHiddenElementDimensions(element) {
		let dimensions = {};
		element.style.visibility = "hidden";
		element.style.display = "block";
		dimensions.width = element.offsetWidth;
		dimensions.height = element.offsetHeight;
		element.style.display = "none";
		element.style.visibility = "visible";
		return dimensions;
	}
	static scrollInView(container, item) {
		let borderTopValue = getComputedStyle(container).getPropertyValue("borderTopWidth");
		let borderTop = borderTopValue ? parseFloat(borderTopValue) : 0;
		let paddingTopValue = getComputedStyle(container).getPropertyValue("paddingTop");
		let paddingTop = paddingTopValue ? parseFloat(paddingTopValue) : 0;
		let containerRect = container.getBoundingClientRect();
		let offset = item.getBoundingClientRect().top + document.body.scrollTop - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
		let scroll = container.scrollTop;
		let elementHeight = container.clientHeight;
		let itemHeight = this.getOuterHeight(item);
		if (offset < 0) container.scrollTop = scroll + offset;
		else if (offset + itemHeight > elementHeight) container.scrollTop = scroll + offset - elementHeight + itemHeight;
	}
	static fadeIn(element, duration) {
		element.style.opacity = 0;
		let last = +/* @__PURE__ */ new Date();
		let opacity = 0;
		let tick = function() {
			opacity = +element.style.opacity.replace(",", ".") + ((/* @__PURE__ */ new Date()).getTime() - last) / duration;
			element.style.opacity = opacity;
			last = +/* @__PURE__ */ new Date();
			if (+opacity < 1) {
				if (window.requestAnimationFrame) window.requestAnimationFrame(tick);
				else setTimeout(tick, 16);
			}
		};
		tick();
	}
	static fadeOut(element, ms) {
		let opacity = 1, interval = 50, gap = interval / ms;
		let fading = setInterval(() => {
			opacity = opacity - gap;
			if (opacity <= 0) {
				opacity = 0;
				clearInterval(fading);
			}
			element.style.opacity = opacity;
		}, interval);
	}
	static getWindowScrollTop() {
		let doc = document.documentElement;
		return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
	}
	static getWindowScrollLeft() {
		let doc = document.documentElement;
		return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
	}
	static matches(element, selector) {
		let p = Element.prototype;
		return (p["matches"] || p.webkitMatchesSelector || p["mozMatchesSelector"] || p["msMatchesSelector"] || function(s) {
			return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
		}).call(element, selector);
	}
	static getOuterWidth(el, margin) {
		let width = el.offsetWidth;
		if (margin) {
			let style = getComputedStyle(el);
			width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
		}
		return width;
	}
	static getHorizontalPadding(el) {
		let style = getComputedStyle(el);
		return parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
	}
	static getHorizontalMargin(el) {
		let style = getComputedStyle(el);
		return parseFloat(style.marginLeft) + parseFloat(style.marginRight);
	}
	static innerWidth(el) {
		let width = el.offsetWidth;
		let style = getComputedStyle(el);
		width += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
		return width;
	}
	static width(el) {
		let width = el.offsetWidth;
		let style = getComputedStyle(el);
		width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
		return width;
	}
	static getInnerHeight(el) {
		let height = el.offsetHeight;
		let style = getComputedStyle(el);
		height += parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
		return height;
	}
	static getOuterHeight(el, margin) {
		let height = el.offsetHeight;
		if (margin) {
			let style = getComputedStyle(el);
			height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
		}
		return height;
	}
	static getHeight(el) {
		let height = el.offsetHeight;
		let style = getComputedStyle(el);
		height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
		return height;
	}
	static getWidth(el) {
		let width = el.offsetWidth;
		let style = getComputedStyle(el);
		width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
		return width;
	}
	static getViewport() {
		let win = window, d = document, e = d.documentElement, g = d.getElementsByTagName("body")[0];
		return {
			width: win.innerWidth || e.clientWidth || g.clientWidth,
			height: win.innerHeight || e.clientHeight || g.clientHeight
		};
	}
	static getOffset(el) {
		let rect = el.getBoundingClientRect();
		return {
			top: rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
			left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0)
		};
	}
	static replaceElementWith(element, replacementElement) {
		let parentNode = element.parentNode;
		if (!parentNode) throw `Can't replace element`;
		return parentNode.replaceChild(replacementElement, element);
	}
	static getUserAgent() {
		if (navigator && this.isClient()) return navigator.userAgent;
	}
	static isIE() {
		let ua = window.navigator.userAgent;
		if (ua.indexOf("MSIE ") > 0) return true;
		if (ua.indexOf("Trident/") > 0) return true;
		if (ua.indexOf("Edge/") > 0) return true;
		return false;
	}
	static isIOS() {
		return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window["MSStream"];
	}
	static isAndroid() {
		return /(android)/i.test(navigator.userAgent);
	}
	static isTouchDevice() {
		return "ontouchstart" in window || navigator.maxTouchPoints > 0;
	}
	static appendChild(element, target) {
		if (this.isElement(target)) target.appendChild(element);
		else if (target && target.el && target.el.nativeElement) target.el.nativeElement.appendChild(element);
		else throw "Cannot append " + target + " to " + element;
	}
	static removeChild(element, target) {
		if (this.isElement(target)) target.removeChild(element);
		else if (target.el && target.el.nativeElement) target.el.nativeElement.removeChild(element);
		else throw "Cannot remove " + element + " from " + target;
	}
	static removeElement(element) {
		var _element$parentNode;
		if (!("remove" in Element.prototype)) (_element$parentNode = element.parentNode) === null || _element$parentNode === void 0 || _element$parentNode.removeChild(element);
		else element.remove();
	}
	static isElement(obj) {
		return typeof HTMLElement === "object" ? obj instanceof HTMLElement : obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string";
	}
	static calculateScrollbarWidth(el) {
		if (el) {
			let style = getComputedStyle(el);
			return el.offsetWidth - el.clientWidth - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth);
		} else {
			if (this.calculatedScrollbarWidth !== null) return this.calculatedScrollbarWidth;
			let scrollDiv = document.createElement("div");
			scrollDiv.className = "p-scrollbar-measure";
			document.body.appendChild(scrollDiv);
			let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
			document.body.removeChild(scrollDiv);
			this.calculatedScrollbarWidth = scrollbarWidth;
			return scrollbarWidth;
		}
	}
	static calculateScrollbarHeight() {
		if (this.calculatedScrollbarHeight !== null) return this.calculatedScrollbarHeight;
		let scrollDiv = document.createElement("div");
		scrollDiv.className = "p-scrollbar-measure";
		document.body.appendChild(scrollDiv);
		let scrollbarHeight = scrollDiv.offsetHeight - scrollDiv.clientHeight;
		document.body.removeChild(scrollDiv);
		this.calculatedScrollbarWidth = scrollbarHeight;
		return scrollbarHeight;
	}
	static invokeElementMethod(element, methodName, args) {
		element[methodName].apply(element, args);
	}
	static clearSelection() {
		if (window.getSelection && window.getSelection()) {
			var _window$getSelection, _window$getSelection2, _window$getSelection3, _window$getSelection4, _window$getSelection5, _window$getSelection6;
			if ((_window$getSelection = window.getSelection()) === null || _window$getSelection === void 0 ? void 0 : _window$getSelection.empty) (_window$getSelection2 = window.getSelection()) === null || _window$getSelection2 === void 0 || _window$getSelection2.empty();
			else if (((_window$getSelection3 = window.getSelection()) === null || _window$getSelection3 === void 0 ? void 0 : _window$getSelection3.removeAllRanges) && (((_window$getSelection4 = window.getSelection()) === null || _window$getSelection4 === void 0 ? void 0 : _window$getSelection4.rangeCount) || 0) > 0 && (((_window$getSelection5 = window.getSelection()) === null || _window$getSelection5 === void 0 || (_window$getSelection5 = _window$getSelection5.getRangeAt(0)) === null || _window$getSelection5 === void 0 || (_window$getSelection5 = _window$getSelection5.getClientRects()) === null || _window$getSelection5 === void 0 ? void 0 : _window$getSelection5.length) || 0) > 0) (_window$getSelection6 = window.getSelection()) === null || _window$getSelection6 === void 0 || _window$getSelection6.removeAllRanges();
		} else if (document["selection"] && document["selection"].empty) try {
			document["selection"].empty();
		} catch (_unused) {}
	}
	static getBrowser() {
		if (!this.browser) {
			let matched = this.resolveUserAgent();
			this.browser = {};
			if (matched.browser) {
				this.browser[matched.browser] = true;
				this.browser["version"] = matched.version;
			}
			if (this.browser["chrome"]) this.browser["webkit"] = true;
			else if (this.browser["webkit"]) this.browser["safari"] = true;
		}
		return this.browser;
	}
	static resolveUserAgent() {
		let ua = navigator.userAgent.toLowerCase();
		let match = /(chrome)[ /]([\w.]+)/.exec(ua) || /(webkit)[ /]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ /]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
		return {
			browser: match[1] || "",
			version: match[2] || "0"
		};
	}
	static isInteger(value) {
		if (Number.isInteger) return Number.isInteger(value);
		else return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
	}
	static isHidden(element) {
		return !element || element.offsetParent === null;
	}
	static isVisible(element) {
		return element && element.offsetParent != null;
	}
	static isExist(element) {
		return element !== null && typeof element !== "undefined" && element.nodeName && element.parentNode;
	}
	static focus(element, options) {
		if (element && document.activeElement !== element) element.focus(options);
	}
	static getFocusableSelectorString(selector = "") {
		return `button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
        [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
        input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
        select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
        textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
        [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
        [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
        .p-inputtext:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
        .p-button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector}`;
	}
	static getFocusableElements(element, selector = "") {
		let focusableElements = this.find(element, this.getFocusableSelectorString(selector));
		let visibleFocusableElements = [];
		for (let focusableElement of focusableElements) {
			const computedStyle = getComputedStyle(focusableElement);
			if (this.isVisible(focusableElement) && computedStyle.display != "none" && computedStyle.visibility != "hidden") visibleFocusableElements.push(focusableElement);
		}
		return visibleFocusableElements;
	}
	static getFocusableElement(element, selector = "") {
		let focusableElement = this.findSingle(element, this.getFocusableSelectorString(selector));
		if (focusableElement) {
			const computedStyle = getComputedStyle(focusableElement);
			if (this.isVisible(focusableElement) && computedStyle.display != "none" && computedStyle.visibility != "hidden") return focusableElement;
		}
		return null;
	}
	static getFirstFocusableElement(element, selector = "") {
		const focusableElements = this.getFocusableElements(element, selector);
		return focusableElements.length > 0 ? focusableElements[0] : null;
	}
	static getLastFocusableElement(element, selector) {
		const focusableElements = this.getFocusableElements(element, selector);
		return focusableElements.length > 0 ? focusableElements[focusableElements.length - 1] : null;
	}
	static getNextFocusableElement(element, reverse = false) {
		const focusableElements = DomHandler.getFocusableElements(element);
		let index = 0;
		if (focusableElements && focusableElements.length > 0) {
			const focusedIndex = focusableElements.indexOf(focusableElements[0].ownerDocument.activeElement);
			if (reverse) {
				if (focusedIndex == -1 || focusedIndex === 0) index = focusableElements.length - 1;
				else index = focusedIndex - 1;
			} else if (focusedIndex != -1 && focusedIndex !== focusableElements.length - 1) index = focusedIndex + 1;
		}
		return focusableElements[index];
	}
	static generateZIndex() {
		this.zindex = this.zindex || 999;
		return ++this.zindex;
	}
	static getSelection() {
		var _window$getSelection7, _document$getSelectio;
		if (window.getSelection) return (_window$getSelection7 = window.getSelection()) === null || _window$getSelection7 === void 0 ? void 0 : _window$getSelection7.toString();
		else if (document.getSelection) return (_document$getSelectio = document.getSelection()) === null || _document$getSelectio === void 0 ? void 0 : _document$getSelectio.toString();
		else if (document["selection"]) return document["selection"].createRange().text;
		return null;
	}
	static getTargetElement(target, el) {
		if (!target) return null;
		switch (target) {
			case "document": return document;
			case "window": return window;
			case "@next": return el === null || el === void 0 ? void 0 : el.nextElementSibling;
			case "@prev": return el === null || el === void 0 ? void 0 : el.previousElementSibling;
			case "@parent": return el === null || el === void 0 ? void 0 : el.parentElement;
			case "@grandparent":
				var _el$parentElement;
				return el === null || el === void 0 || (_el$parentElement = el.parentElement) === null || _el$parentElement === void 0 ? void 0 : _el$parentElement.parentElement;
			default: {
				const type = typeof target;
				if (type === "string") return document.querySelector(target);
				else if (type === "object" && Object.prototype.hasOwnProperty.call(target, "nativeElement")) return this.isExist(target.nativeElement) ? target.nativeElement : void 0;
				const isFunction = (obj) => !!(obj && obj.constructor && obj.call && obj.apply);
				const element = isFunction(target) ? target() : target;
				return element && element.nodeType === 9 || this.isExist(element) ? element : null;
			}
		}
	}
	static isClient() {
		return !!(typeof window !== "undefined" && window.document && window.document.createElement);
	}
	static getAttribute(element, name) {
		if (element) {
			const value = element.getAttribute(name);
			if (!isNaN(value)) return +value;
			if (value === "true" || value === "false") return value === "true";
			return value;
		}
	}
	static calculateBodyScrollbarWidth() {
		return window.innerWidth - document.documentElement.offsetWidth;
	}
	static blockBodyScroll(className = "p-overflow-hidden") {
		document.body.style.setProperty("--px-scrollbar-width", this.calculateBodyScrollbarWidth() + "px");
		this.addClass(document.body, className);
	}
	static unblockBodyScroll(className = "p-overflow-hidden") {
		document.body.style.removeProperty("--px-scrollbar-width");
		this.removeClass(document.body, className);
	}
	static createElement(type, attributes = {}, ...children) {
		if (type) {
			const element = document.createElement(type);
			this.setAttributes(element, attributes);
			element.append(...children);
			return element;
		}
	}
	static setAttribute(element, attribute = "", value) {
		if (this.isElement(element) && value !== null && value !== void 0) element.setAttribute(attribute, value);
	}
	static setAttributes(element, attributes = {}) {
		if (this.isElement(element)) {
			const computedStyles = (rule, value) => {
				var _element$$attrs, _element$$attrs2;
				const styles = (element === null || element === void 0 || (_element$$attrs = element.$attrs) === null || _element$$attrs === void 0 ? void 0 : _element$$attrs[rule]) ? [element === null || element === void 0 || (_element$$attrs2 = element.$attrs) === null || _element$$attrs2 === void 0 ? void 0 : _element$$attrs2[rule]] : [];
				return [value].flat().reduce((cv, v) => {
					if (v !== null && v !== void 0) {
						const type = typeof v;
						if (type === "string" || type === "number") cv.push(v);
						else if (type === "object") {
							const _cv = Array.isArray(v) ? computedStyles(rule, v) : Object.entries(v).map(([_k, _v]) => rule === "style" && (!!_v || _v === 0) ? `${_k.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}:${_v}` : _v ? _k : void 0);
							cv = _cv.length ? cv.concat(_cv.filter((c) => !!c)) : cv;
						}
					}
					return cv;
				}, styles);
			};
			Object.entries(attributes).forEach(([key, value]) => {
				if (value !== void 0 && value !== null) {
					const matchedEvent = key.match(/^on(.+)/);
					if (matchedEvent) element.addEventListener(matchedEvent[1].toLowerCase(), value);
					else if (key === "pBind") this.setAttributes(element, value);
					else {
						value = key === "class" ? [...new Set(computedStyles("class", value))].join(" ").trim() : key === "style" ? computedStyles("style", value).join(";").trim() : value;
						if (element.$attrs = element.$attrs || {}) element.$attrs[key] = value;
						element.setAttribute(key, value);
					}
				}
			});
		}
	}
	static isFocusableElement(element, selector = "") {
		return this.isElement(element) ? element.matches(`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector}`) : false;
	}
};
var DomHandler = (_defineProperty(_DomHandler, "zindex", 1e3), _defineProperty(_DomHandler, "calculatedScrollbarWidth", null), _defineProperty(_DomHandler, "calculatedScrollbarHeight", null), _defineProperty(_DomHandler, "browser", void 0), _DomHandler);
function blockBodyScroll(options) {
	xt(_objectSpread2({ variableName: _e("scrollbar.width").name }, options));
}
function unblockBodyScroll(options) {
	wt(_objectSpread2({ variableName: _e("scrollbar.width").name }, options));
}
var ConnectedOverlayScrollHandler = class {
	constructor(element, listener = () => {}) {
		_defineProperty(this, "element", void 0);
		_defineProperty(this, "listener", void 0);
		_defineProperty(this, "scrollableParents", void 0);
		this.element = element;
		this.listener = listener;
	}
	bindScrollListener() {
		this.scrollableParents = DomHandler.getScrollableParents(this.element);
		for (let i = 0; i < this.scrollableParents.length; i++) this.scrollableParents[i].addEventListener("scroll", this.listener);
	}
	unbindScrollListener() {
		if (this.scrollableParents) for (let i = 0; i < this.scrollableParents.length; i++) this.scrollableParents[i].removeEventListener("scroll", this.listener);
	}
	destroy() {
		this.unbindScrollListener();
		this.element = null;
		this.listener = null;
		this.scrollableParents = null;
	}
};
function getShadowRoot(el) {
	var _toElement;
	return Gt((_toElement = b(el)) !== null && _toElement !== void 0 ? _toElement : el);
}
function getEventTarget(event, element) {
	return Ft(event, element);
}
// ../node_modules/primeng/fesm2022/primeng-useid.mjs
var _UseId = class UseId {
	constructor() {
		_defineProperty(this, "counters", /* @__PURE__ */ new Map());
		_defineProperty(this, "scope", ((appId) => appId === "ng" ? "" : `${appId}_`)(inject(APP_ID)));
	}
	next(prefix = "pui_id_") {
		var _this$counters$get;
		const value = ((_this$counters$get = this.counters.get(prefix)) !== null && _this$counters$get !== void 0 ? _this$counters$get : 0) + 1;
		this.counters.set(prefix, value);
		return `${prefix}${this.scope}${value}`;
	}
};
var UseId = (_defineProperty(_UseId, "ɵfac", function UseId_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _UseId)();
}), _defineProperty(_UseId, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _UseId,
	factory: _UseId.ɵfac,
	providedIn: "root"
})), _UseId);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UseId, [{
		type: Injectable,
		args: [{ providedIn: "root" }]
	}], null, null);
})();
// ../node_modules/primeng/fesm2022/primeng-basecomponent.mjs
var _BaseComponentStyle = class BaseComponentStyle extends BaseStyle {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "name", "common");
	}
};
var _BaseComponent;
var BaseComponentStyle = (_defineProperty(_BaseComponentStyle, "ɵfac", /*@__PURE__*/ (() => {
	let ɵBaseComponentStyle_BaseFactory = void 0;
	return function BaseComponentStyle_Factory(__ngFactoryType__) {
		return (ɵBaseComponentStyle_BaseFactory || (ɵBaseComponentStyle_BaseFactory = ɵɵgetInheritedFactory(_BaseComponentStyle)))(__ngFactoryType__ || _BaseComponentStyle);
	};
})()), _defineProperty(_BaseComponentStyle, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _BaseComponentStyle,
	factory: _BaseComponentStyle.ɵfac,
	providedIn: "root"
})), _BaseComponentStyle);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseComponentStyle, [{
		type: Injectable,
		args: [{ providedIn: "root" }]
	}], null, null);
})();
var PARENT_INSTANCE = new InjectionToken("PARENT_INSTANCE");
var BaseComponent = (_BaseComponent = class BaseComponent {
	get $name() {
		return this["componentName"] || "UnknownComponent";
	}
	get $hostName() {
		const hostName = this["hostName"];
		return isSignal(hostName) ? hostName() : hostName;
	}
	get $el() {
		var _this$el;
		return (_this$el = this.el) === null || _this$el === void 0 ? void 0 : _this$el.nativeElement;
	}
	get $globalPT() {
		var _this$config;
		return this._getPT((_this$config = this.config) === null || _this$config === void 0 ? void 0 : _this$config.pt(), void 0, (value) => x$1(value, this.$params));
	}
	get $defaultPT() {
		var _this$config2;
		return this._getPT((_this$config2 = this.config) === null || _this$config2 === void 0 ? void 0 : _this$config2.pt(), void 0, (value) => this._getOptionValue(value, this.$hostName || this.$name, this.$params) || x$1(value, this.$params));
	}
	get $style() {
		if (!this._$styleCache) this._$styleCache = _objectSpread2(_objectSpread2({
			theme: void 0,
			css: void 0,
			classes: void 0,
			inlineStyles: void 0
		}, (this._getHostInstance(this) || {}).$style), this["_componentStyle"]);
		return this._$styleCache;
	}
	get $styleOptions() {
		var _this$config3;
		return { nonce: (_this$config3 = this.config) === null || _this$config3 === void 0 ? void 0 : _this$config3.csp().nonce };
	}
	get $params() {
		if (!this._$paramsCache) {
			const parentInstance = this._getHostInstance(this) || this.$parentInstance;
			this._$paramsCache = {
				instance: this,
				parent: { instance: parentInstance }
			};
		}
		return this._$paramsCache;
	}
	onInit() {}
	onChanges(_changes) {}
	onDoCheck() {}
	onAfterContentInit() {}
	onAfterContentChecked() {}
	onAfterViewInit() {}
	onAfterViewChecked() {}
	onDestroy() {}
	constructor() {
		var _inject;
		_defineProperty(this, "document", inject(DOCUMENT));
		_defineProperty(this, "platformId", inject(PLATFORM_ID));
		_defineProperty(this, "el", inject(ElementRef));
		_defineProperty(this, "injector", inject(Injector));
		_defineProperty(this, "cd", inject(ChangeDetectorRef));
		_defineProperty(this, "renderer", inject(Renderer2));
		_defineProperty(this, "config", inject(PrimeNG));
		_defineProperty(this, "$parentInstance", (_inject = inject(PARENT_INSTANCE, {
			optional: true,
			skipSelf: true
		})) !== null && _inject !== void 0 ? _inject : void 0);
		_defineProperty(this, "baseComponentStyle", inject(BaseComponentStyle));
		_defineProperty(this, "baseStyle", inject(BaseStyle));
		_defineProperty(this, "$styleScope", inject(StyleScope));
		_defineProperty(this, "scopedStyleEl", void 0);
		_defineProperty(this, "_scopedStyleName", void 0);
		_defineProperty(this, "parent", this.$params.parent);
		_defineProperty(this, "cn", a);
		_defineProperty(this, "_themeScopedListener", void 0);
		_defineProperty(this, "_instanceStyles", void 0);
		_defineProperty(this, "themeChangeListenerMap", /* @__PURE__ */ new Map());
		_defineProperty(this, "dt", input(...ngDevMode ? [void 0, { debugName: "dt" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "unstyled", input(...ngDevMode ? [void 0, { debugName: "unstyled" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "pt", input(...ngDevMode ? [void 0, { debugName: "pt" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "ptOptions", input(...ngDevMode ? [void 0, { debugName: "ptOptions" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$useId", inject(UseId));
		_defineProperty(this, "$attrSelector", this.$useId.next("pc"));
		_defineProperty(this, "directivePT", signal(void 0, ...ngDevMode ? [{ debugName: "directivePT" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "directiveUnstyled", signal(void 0, ...ngDevMode ? [{ debugName: "directiveUnstyled" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$unstyled", computed(() => {
			var _ref, _ref2, _this$unstyled, _this$config4;
			return (_ref = (_ref2 = (_this$unstyled = this.unstyled()) !== null && _this$unstyled !== void 0 ? _this$unstyled : this.directiveUnstyled()) !== null && _ref2 !== void 0 ? _ref2 : (_this$config4 = this.config) === null || _this$config4 === void 0 ? void 0 : _this$config4.unstyled()) !== null && _ref !== void 0 ? _ref : false;
		}, ...ngDevMode ? [{ debugName: "$unstyled" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$preflight", computed(() => {
			var _this$config5;
			return !this.$unstyled() && ((_this$config5 = this.config) === null || _this$config5 === void 0 ? void 0 : _this$config5.preflight()) === true;
		}, ...ngDevMode ? [{ debugName: "$preflight" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$pt", computed(() => x$1(this.pt() || this.directivePT(), this.$params), ...ngDevMode ? [{ debugName: "$pt" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_$styleCache", void 0);
		_defineProperty(this, "_$paramsCache", void 0);
		effect((onCleanup) => {
			if (this.document && !isPlatformServer(this.platformId)) {
				if (this.dt()) {
					this._loadScopedThemeStyles(this.dt());
					this._themeScopedListener = () => this._loadScopedThemeStyles(this.dt());
					this._themeChangeListener("_themeScopedListener", this._themeScopedListener);
				} else this._unloadScopedThemeStyles();
			}
			onCleanup(() => {
				this._offThemeChangeListener("_themeScopedListener");
			});
		});
		effect((onCleanup) => {
			if (this.document && !isPlatformServer(this.platformId)) {
				if (!this.$unstyled()) {
					this._loadCoreStyles();
					this._themeChangeListener("_loadCoreStyles", this._loadCoreStyles);
				}
			}
			onCleanup(() => {
				this._offThemeChangeListener("_loadCoreStyles");
			});
		});
		this._hook("onBeforeInit");
	}
	ngOnInit() {
		this._$paramsCache = void 0;
		this._$styleCache = void 0;
		this.$styleScope.batch(() => {
			this._loadCoreStyles();
			this._loadStyles();
			this.$styleScope.connect(this.$el, this.injector);
		});
		this.onInit();
		this._hook("onInit");
	}
	ngOnChanges(changes) {
		this.onChanges(changes);
		this._hook("onChanges", changes);
	}
	ngDoCheck() {
		this.onDoCheck();
		this._hook("onDoCheck");
	}
	ngAfterContentInit() {
		this.onAfterContentInit();
		this._hook("onAfterContentInit");
	}
	ngAfterContentChecked() {
		this.onAfterContentChecked();
		this._hook("onAfterContentChecked");
	}
	ngAfterViewInit() {
		var _this$config6;
		this.$markInstance(this.$el);
		if (((_this$config6 = this.config) === null || _this$config6 === void 0 ? void 0 : _this$config6.verified()) === false) showInvalidLicenseBanner();
		this.onAfterViewInit();
		this._hook("onAfterViewInit");
	}
	ngAfterViewChecked() {
		this.onAfterViewChecked();
		this._hook("onAfterViewChecked");
	}
	ngOnDestroy() {
		this._removeThemeListeners();
		this._unloadScopedThemeStyles();
		this.onDestroy();
		if (this.$styleScope.isolated) {
			var _this$_instanceStyles;
			(_this$_instanceStyles = this._instanceStyles) === null || _this$_instanceStyles === void 0 || _this$_instanceStyles.forEach((name) => this.$styleScope.removeInstanceStyle(name));
			this._instanceStyles = void 0;
		}
		this._hook("onDestroy");
	}
	_mergeProps(fn, ...args) {
		return m$1(fn) ? fn(...args) : P(...args);
	}
	_getHostInstance(instance) {
		return instance ? this.$hostName ? this.$name === this.$hostName ? instance : this._getHostInstance(instance.$parentInstance) : instance.$parentInstance : void 0;
	}
	_getPropValue(name) {
		var _this$_getHostInstanc;
		return this[name] || ((_this$_getHostInstanc = this._getHostInstance(this)) === null || _this$_getHostInstanc === void 0 ? void 0 : _this$_getHostInstanc[name]);
	}
	_getOptionValue(options, key = "", params = {}) {
		return K(options, key, params);
	}
	_hook(hookName, ...args) {
		var _this$config7;
		if (this.$hostName) return;
		if (!this.pt() && !this.directivePT() && !((_this$config7 = this.config) === null || _this$config7 === void 0 ? void 0 : _this$config7.pt())) return;
		const selfHook = this._usePT(this._getPT(this.$pt(), this.$name), this._getOptionValue, `hooks.${hookName}`);
		const defaultHook = this._useDefaultPT(this._getOptionValue, `hooks.${hookName}`);
		selfHook === null || selfHook === void 0 || selfHook(...args);
		defaultHook === null || defaultHook === void 0 || defaultHook(...args);
	}
	get $theme() {
		return this.$styleScope.theme;
	}
	get $base() {
		var _this$$styleScope$cor;
		return (_this$$styleScope$cor = this.$styleScope.coreStyleNames) !== null && _this$$styleScope$cor !== void 0 ? _this$$styleScope$cor : base_default;
	}
	_load() {
		if (!this.$base.isStyleNameLoaded("base")) {
			this.baseStyle.loadBaseCSS(this.$styleOptions);
			this._loadGlobalStyles();
			this.$base.setLoadedStyleName("base");
		}
		if (this.$preflight() && !this.$base.isStyleNameLoaded("preflight")) {
			this.baseStyle.loadPreflight(this.$styleOptions);
			this.$base.setLoadedStyleName("preflight");
		}
		this._loadThemeStyles();
	}
	_loadStyles() {
		this._load();
		this._themeChangeListener("_load", () => this._load());
	}
	_loadGlobalStyles() {
		const globalCSS = this._useGlobalPT(this._getOptionValue, "global.css", this.$params);
		if (l$1(globalCSS)) this.baseStyle.load(globalCSS, _objectSpread2({ name: "global" }, this.$styleOptions), (computedStyle) => this.$styleScope.scopeCSS(computedStyle));
	}
	_loadCoreStyles() {
		var _this$$style, _this$$style2;
		if (!this.$base.isStyleNameLoaded((_this$$style = this.$style) === null || _this$$style === void 0 ? void 0 : _this$$style.name) && ((_this$$style2 = this.$style) === null || _this$$style2 === void 0 ? void 0 : _this$$style2.name)) {
			this.baseComponentStyle.loadCSS(this.$styleOptions);
			this.$style.loadCSS(this.$styleOptions);
			this.$base.setLoadedStyleName(this.$style.name);
		}
	}
	_loadThemeStyles() {
		var _this$config8;
		if (this.$unstyled()) return;
		if (((_this$config8 = this.config) === null || _this$config8 === void 0 ? void 0 : _this$config8.theme()) !== "none") this._loadThemeSheets();
		if (!this.$theme.isStyleNameLoaded("layer-order")) {
			var _this$$style3, _this$$style3$getLaye;
			const layerOrder = G(this.$preflight() ? F : void 0, (_this$$style3 = this.$style) === null || _this$$style3 === void 0 || (_this$$style3$getLaye = _this$$style3.getLayerOrderThemeCSS) === null || _this$$style3$getLaye === void 0 ? void 0 : _this$$style3$getLaye.call(_this$$style3));
			this.baseStyle.load(layerOrder, _objectSpread2({
				name: "layer-order",
				first: true
			}, this.$styleOptions));
			this.$theme.setLoadedStyleName("layer-order");
		}
	}
	_loadThemeSheets() {
		var _this$$style5, _this$$style6;
		if (!this.$theme.isStyleNameLoaded("common")) {
			var _this$$style4, _this$$style4$getComm;
			const { primitive, semantic, global, style } = ((_this$$style4 = this.$style) === null || _this$$style4 === void 0 || (_this$$style4$getComm = _this$$style4.getCommonTheme) === null || _this$$style4$getComm === void 0 ? void 0 : _this$$style4$getComm.call(_this$$style4)) || {};
			this.baseStyle.load(primitive === null || primitive === void 0 ? void 0 : primitive.css, _objectSpread2({
				name: "primitive-variables",
				variables: true,
				raw: true
			}, this.$styleOptions));
			this.baseStyle.load(semantic === null || semantic === void 0 ? void 0 : semantic.css, _objectSpread2({
				name: "semantic-variables",
				variables: true,
				raw: true
			}, this.$styleOptions));
			this.baseStyle.load(global === null || global === void 0 ? void 0 : global.css, _objectSpread2({
				name: "global-variables",
				variables: true,
				raw: true
			}, this.$styleOptions));
			this.baseStyle.loadBaseStyle(_objectSpread2({ name: "global-style" }, this.$styleOptions), style);
			this.$theme.setLoadedStyleName("common");
		}
		if (!this.$theme.isStyleNameLoaded((_this$$style5 = this.$style) === null || _this$$style5 === void 0 ? void 0 : _this$$style5.name) && ((_this$$style6 = this.$style) === null || _this$$style6 === void 0 ? void 0 : _this$$style6.name)) {
			var _this$$style7, _this$$style7$getComp, _this$$style8, _this$$style9, _this$$style10, _this$$style11;
			const { css, style } = ((_this$$style7 = this.$style) === null || _this$$style7 === void 0 || (_this$$style7$getComp = _this$$style7.getComponentTheme) === null || _this$$style7$getComp === void 0 ? void 0 : _this$$style7$getComp.call(_this$$style7)) || {};
			this.baseStyle.load(css, _objectSpread2({
				name: `${(_this$$style8 = this.$style) === null || _this$$style8 === void 0 ? void 0 : _this$$style8.name}-variables`,
				variables: true,
				raw: true
			}, this.$styleOptions));
			(_this$$style9 = this.$style) === null || _this$$style9 === void 0 || _this$$style9.loadStyle(_objectSpread2({ name: `${(_this$$style10 = this.$style) === null || _this$$style10 === void 0 ? void 0 : _this$$style10.name}-style` }, this.$styleOptions), style);
			this.$theme.setLoadedStyleName((_this$$style11 = this.$style) === null || _this$$style11 === void 0 ? void 0 : _this$$style11.name);
		}
	}
	_loadScopedThemeStyles(preset) {
		var _this$config9, _this$$style12, _this$$style13, _this$$style13$getPre, _this$$style14, _scopedStyle$name;
		if (((_this$config9 = this.config) === null || _this$config9 === void 0 || (_this$config9 = _this$config9.theme()) === null || _this$config9 === void 0 || (_this$config9 = _this$config9.options) === null || _this$config9 === void 0 ? void 0 : _this$config9.cssVariables) === false && ((_this$$style12 = this.$style) === null || _this$$style12 === void 0 ? void 0 : _this$$style12.name)) {
			if (this.$theme.addScopedToken({ [this.$style.name]: preset })) {
				this.$theme.deleteLoadedStyleName(this.$style.name);
				this._loadThemeStyles();
			}
		}
		const { css } = ((_this$$style13 = this.$style) === null || _this$$style13 === void 0 || (_this$$style13$getPre = _this$$style13.getPresetTheme) === null || _this$$style13$getPre === void 0 ? void 0 : _this$$style13$getPre.call(_this$$style13, preset, this.$instanceSelector)) || {};
		const scopedStyle = this.baseStyle.load(css, _objectSpread2({
			name: `${this.$attrSelector}-${(_this$$style14 = this.$style) === null || _this$$style14 === void 0 ? void 0 : _this$$style14.name}`,
			raw: true
		}, this.$styleOptions));
		this._scopedStyleName = (_scopedStyle$name = scopedStyle === null || scopedStyle === void 0 ? void 0 : scopedStyle.name) !== null && _scopedStyle$name !== void 0 ? _scopedStyle$name : this._scopedStyleName;
		this.scopedStyleEl = scopedStyle === null || scopedStyle === void 0 ? void 0 : scopedStyle.el;
	}
	_unloadScopedThemeStyles() {
		if (this._scopedStyleName === void 0) return;
		this.baseStyle.useStyle.remove(this._scopedStyleName, this.scopedStyleEl);
		this._scopedStyleName = void 0;
		this.scopedStyleEl = void 0;
	}
	_themeChangeListener(id, callback = () => {}) {
		this._offThemeChangeListener(id);
		const hold = callback.bind(this);
		this.themeChangeListenerMap.set(id, hold);
		this.$styleScope.service.on("theme:change", hold);
	}
	_removeThemeListeners() {
		this._offThemeChangeListener("_themeScopedListener");
		this._offThemeChangeListener("_loadCoreStyles");
		this._offThemeChangeListener("_load");
	}
	_offThemeChangeListener(id) {
		if (this.themeChangeListenerMap.has(id)) {
			this.$styleScope.service.off("theme:change", this.themeChangeListenerMap.get(id));
			this.themeChangeListenerMap.delete(id);
		}
	}
	_getPTValue(obj = {}, key = "", params = {}, searchInDefaultPT = true) {
		var _this$_getPropValue, _this$config10, _this$config10$ptOpti;
		const searchOut = /./g.test(key) && !!params[key.split(".")[0]];
		const { mergeSections = true, mergeProps: useMergeProps = false } = ((_this$_getPropValue = this._getPropValue("ptOptions")) === null || _this$_getPropValue === void 0 ? void 0 : _this$_getPropValue()) || ((_this$config10 = this.config) === null || _this$config10 === void 0 || (_this$config10$ptOpti = _this$config10["ptOptions"]) === null || _this$config10$ptOpti === void 0 ? void 0 : _this$config10$ptOpti.call(_this$config10)) || {};
		const global = searchInDefaultPT ? searchOut ? this._useGlobalPT(this._getPTClassValue, key, params) : this._useDefaultPT(this._getPTClassValue, key, params) : void 0;
		const self = searchOut ? void 0 : this._usePT(this._getPT(obj, this.$hostName || this.$name), this._getPTClassValue, key, _objectSpread2(_objectSpread2({}, params), {}, { global: global || {} }));
		const datasets = this._getPTDatasets(key);
		return mergeSections || !mergeSections && self ? useMergeProps ? this._mergeProps(useMergeProps, global, self, datasets) : _objectSpread2(_objectSpread2(_objectSpread2({}, global), self), datasets) : _objectSpread2(_objectSpread2({}, self), datasets);
	}
	_getPTDatasets(key = "") {
		var _this$$pt, _this$$pt2, _key$split$at;
		const datasetPrefix = "data-pc-";
		const isExtended = key === "root" && l$1((_this$$pt = this.$pt()) === null || _this$$pt === void 0 ? void 0 : _this$$pt["data-pc-section"]);
		return key !== "transition" && _objectSpread2(_objectSpread2({}, key === "root" && _objectSpread2(_objectSpread2({ [`${datasetPrefix}name`]: C(isExtended ? (_this$$pt2 = this.$pt()) === null || _this$$pt2 === void 0 ? void 0 : _this$$pt2["data-pc-section"] : this.$name) }, isExtended && { [`${datasetPrefix}extend`]: C(this.$name) }), {}, {
			"data-pc-id": this.$attrSelector,
			[this.$attrSelector]: ""
		})), {}, { [`${datasetPrefix}section`]: C(key.includes(".") ? (_key$split$at = key.split(".").at(-1)) !== null && _key$split$at !== void 0 ? _key$split$at : "" : key) });
	}
	_getPTClassValue(options, key, params) {
		const value = this._getOptionValue(options, key, params);
		return c$1(value) || A(value) ? { class: value } : value;
	}
	_getPT(pt, key = "", callback) {
		const getValue = (value, checkSameKey = false) => {
			var _ref3;
			const computedValue = callback ? callback(value) : value;
			const _key = C(key);
			const _cKey = C(this.$hostName || this.$name);
			return (_ref3 = checkSameKey ? _key !== _cKey ? computedValue === null || computedValue === void 0 ? void 0 : computedValue[_key] : void 0 : computedValue === null || computedValue === void 0 ? void 0 : computedValue[_key]) !== null && _ref3 !== void 0 ? _ref3 : computedValue;
		};
		return pt != null && Object.prototype.hasOwnProperty.call(pt, "_usept") ? {
			_usept: pt["_usept"],
			originalValue: getValue(pt.originalValue),
			value: getValue(pt.value)
		} : getValue(pt, true);
	}
	_usePT(pt, callback, key, params) {
		const fn = (value) => callback === null || callback === void 0 ? void 0 : callback.call(this, value, key, params);
		if (pt != null && Object.prototype.hasOwnProperty.call(pt, "_usept")) {
			var _this$config11;
			const { mergeSections = true, mergeProps: useMergeProps = false } = pt["_usept"] || ((_this$config11 = this.config) === null || _this$config11 === void 0 ? void 0 : _this$config11["ptOptions"]()) || {};
			const originalValue = fn(pt.originalValue);
			const value = fn(pt.value);
			if (originalValue === void 0 && value === void 0) return void 0;
			else if (c$1(value)) return value;
			else if (c$1(originalValue)) return originalValue;
			return mergeSections || !mergeSections && value ? useMergeProps ? this._mergeProps(useMergeProps, originalValue, value) : _objectSpread2(_objectSpread2({}, originalValue), value) : value;
		}
		return fn(pt);
	}
	_useGlobalPT(callback, key, params) {
		return this._usePT(this.$globalPT, callback, key, params);
	}
	_useDefaultPT(callback, key, params) {
		return this._usePT(this.$defaultPT, callback, key, params);
	}
	ptm(key = "", params = {}) {
		return this._getPTValue(this.$pt(), key, _objectSpread2(_objectSpread2({}, this.$params), params));
	}
	ptms(keys, params = {}) {
		return keys.reduce((acc, arg) => {
			acc = P(acc, this.ptm(arg, params)) || {};
			return acc;
		}, {});
	}
	ptmo(obj = {}, key = "", params = {}) {
		return this._getPTValue(obj, key, _objectSpread2({ instance: this }, params), false);
	}
	cx(key, params = {}) {
		return !this.$unstyled() ? this.$styleScope.pcn(this._getOptionValue(this.$style.classes, key, _objectSpread2(_objectSpread2({}, this.$params), params))) : void 0;
	}
	pcn(...classes) {
		return this.$styleScope.pcn(...classes);
	}
	psel(selector) {
		return this.$styleScope.psel(selector);
	}
	get $bodyScrollOptions() {
		if (!this.$styleScope.isolated && this.$styleScope.classPrefix() === "p") return void 0;
		return {
			className: this.pcn("p-overflow-hidden"),
			variableName: this.$styleScope.resolvers.$dt("scrollbar.width").name
		};
	}
	$blockBodyScroll() {
		const options = this.$bodyScrollOptions;
		blockBodyScroll(options);
		this.$styleScope.lockBodyScroll(options);
	}
	$unblockBodyScroll() {
		unblockBodyScroll(this.$bodyScrollOptions);
		this.$styleScope.unlockBodyScroll();
	}
	sx(key = "", when = true, params = {}) {
		if (when) {
			const self = this._getOptionValue(this.$style.inlineStyles, key, _objectSpread2(_objectSpread2({}, this.$params), params));
			return _objectSpread2(_objectSpread2({}, this._getOptionValue(this.baseComponentStyle.inlineStyles, key, _objectSpread2(_objectSpread2({}, this.$params), params))), self);
		}
	}
	$markInstance(el) {
		markInstance(el, this.$attrSelector);
	}
	get $instanceSelector() {
		return `[data-pc-id~="${this.$attrSelector}"]`;
	}
	$keyedId(id) {
		return this.$styleScope.keyedId(id);
	}
	$isolatedStyle(name, css) {
		var _this$config12, _this$_instanceStyles3;
		const id = `${this.$attrSelector}-${name}`;
		if (css === null) {
			var _this$_instanceStyles2;
			this.$styleScope.removeInstanceStyle(id);
			(_this$_instanceStyles2 = this._instanceStyles) === null || _this$_instanceStyles2 === void 0 || _this$_instanceStyles2.delete(id);
			return;
		}
		this.$styleScope.setInstanceStyle(id, css, (_this$config12 = this.config) === null || _this$config12 === void 0 || (_this$config12 = _this$config12.csp()) === null || _this$config12 === void 0 ? void 0 : _this$config12.nonce);
		((_this$_instanceStyles3 = this._instanceStyles) !== null && _this$_instanceStyles3 !== void 0 ? _this$_instanceStyles3 : this._instanceStyles = /* @__PURE__ */ new Set()).add(id);
	}
	$overlayParent(target, overlay) {
		return this.$styleScope.overlayParent(target, overlay);
	}
	translate(key, subKey) {
		const value = this.config.getTranslation(key);
		return subKey ? value === null || value === void 0 ? void 0 : value[subKey] : value;
	}
}, _defineProperty(_BaseComponent, "ɵfac", function BaseComponent_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _BaseComponent)();
}), _defineProperty(_BaseComponent, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _BaseComponent,
	inputs: {
		dt: [1, "dt"],
		unstyled: [1, "unstyled"],
		pt: [1, "pt"],
		ptOptions: [1, "ptOptions"]
	},
	features: [ɵɵProvidersFeature([BaseComponentStyle, BaseStyle]), ɵɵNgOnChangesFeature]
})), _BaseComponent);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseComponent, [{
		type: Directive,
		args: [{
			standalone: true,
			providers: [BaseComponentStyle, BaseStyle]
		}]
	}], () => [], {
		dt: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "dt",
				required: false
			}]
		}],
		unstyled: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "unstyled",
				required: false
			}]
		}],
		pt: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pt",
				required: false
			}]
		}],
		ptOptions: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "ptOptions",
				required: false
			}]
		}]
	});
})();
export { getEventTarget as a, DomHandler as i, PARENT_INSTANCE as n, getShadowRoot as o, ConnectedOverlayScrollHandler as r, unblockBodyScroll as s, BaseComponent as t };
