import { $n as Output, A as contentChild, Al as ɵɵdefineInjectable, Bt as computed, Co as ɵɵelementStart, Da as ɵɵconditionalCreate, Dr as ViewEncapsulation, Fn as Injectable, Gs as ɵɵtemplate, In as Input, Js as ɵɵtextInterpolate, O as booleanAttribute, Qo as ɵɵlistener, Rl as ɵɵnamespaceSVG, Sa as ɵɵclassMap, So as ɵɵelementEnd, Ta as ɵɵconditional, Vs as ɵɵstyleMap, Wi as setClassMetadata, X as input, an as ChangeDetectionStrategy, ao as ɵɵdefineNgModule, at as output, bs as ɵɵqueryAdvance, ca as ɵɵInheritDefinitionFeature, cn as Component, cs as ɵɵprojectionDef, da as ɵɵadvance, dl as inject, es as ɵɵnextContext, i as ContentChild, il as effect, io as ɵɵdefineDirective, jl as ɵɵdefineInjector, jo as ɵɵgetInheritedFactory, ka as ɵɵcontentQuerySignal, kc as InjectionToken, ls as ɵɵproperty, ol as forwardRef, qn as NgModule, qs as ɵɵtext, ro as ɵɵdefineComponent, rt as numberAttribute, sa as ɵɵHostDirectivesFeature, ss as ɵɵprojection, ua as ɵɵProvidersFeature, vo as ɵɵelement, wn as Directive, ya as ɵɵattribute, yo as ɵɵelementContainer } from "./core-BRnM5AcM.js";
import { n as PARENT_INSTANCE, t as BaseComponent } from "./primeng-basecomponent-eFp8WNlF.js";
import { Bind } from "./primeng_bind.js";
import { t as Fluid } from "./primeng-fluid-CB8UBKoE.js";
import { t as Ripple } from "./primeng-ripple-BNchaMDF.js";
import { s as BaseStyle } from "./primeng-config-E0JoXWcg.js";
import { Y as NgTemplateOutlet } from "./common-BHJivUlT.js";
import { t as Spinner } from "./primeicons-angular-spinner-Cr-2BDSP.js";
import { t as AutoFocus } from "./primeng-autofocus-BFMb7AmG.js";
import { n as BadgeModule, t as Badge } from "./primeng-badge-BpkNApnX.js";
import { n as _objectSpread2, r as _defineProperty } from "./asyncToGenerator-CE9zIWF7.js";
// ../node_modules/@primeuix/styles/dist/button/index.mjs
var style = "\n    .p-button {\n        display: inline-flex;\n        cursor: pointer;\n        user-select: none;\n        align-items: center;\n        justify-content: center;\n        overflow: hidden;\n        position: relative;\n        color: dt('button.primary.color');\n        background: dt('button.primary.background');\n        border: 1px solid dt('button.primary.border.color');\n        padding: dt('button.padding.y') dt('button.padding.x');\n        font-size: dt('button.font.size');\n        font-weight: dt('button.label.font.weight');\n        transition:\n            background dt('button.transition.duration'),\n            color dt('button.transition.duration'),\n            border-color dt('button.transition.duration'),\n            outline-color dt('button.transition.duration'),\n            box-shadow dt('button.transition.duration');\n        border-radius: dt('button.border.radius');\n        outline-color: transparent;\n        gap: dt('button.gap');\n    }\n\n    .p-button:disabled {\n        cursor: default;\n    }\n\n    .p-button-icon-right {\n        order: 1;\n    }\n\n    .p-button-icon-right:dir(rtl) {\n        order: -1;\n    }\n\n    .p-button:not(.p-button-vertical) .p-button-icon:not(.p-button-icon-right):dir(rtl) {\n        order: 1;\n    }\n\n    .p-button-icon-bottom {\n        order: 2;\n    }\n\n    .p-button-icon-only {\n        width: dt('button.icon.only.width');\n        padding-inline-start: 0;\n        padding-inline-end: 0;\n        gap: 0;\n    }\n\n    .p-button-icon-only.p-button-rounded {\n        border-radius: 50%;\n        height: dt('button.icon.only.width');\n    }\n\n    .p-button-icon-only .p-button-label {\n        visibility: hidden;\n        width: 0;\n    }\n\n    .p-button-icon-only::after {\n        content: \"\xA0\";\n        visibility: hidden;\n        width: 0;\n    }\n\n    .p-button-sm {\n        font-size: dt('button.sm.font.size');\n        padding: dt('button.sm.padding.y') dt('button.sm.padding.x');\n    }\n\n    .p-button-sm .p-button-icon {\n        font-size: dt('button.sm.font.size');\n    }\n\n    .p-button-sm.p-button-icon-only {\n        width: dt('button.sm.icon.only.width');\n    }\n\n    .p-button-sm.p-button-icon-only.p-button-rounded {\n        height: dt('button.sm.icon.only.width');\n    }\n\n    .p-button-lg {\n        font-size: dt('button.lg.font.size');\n        padding: dt('button.lg.padding.y') dt('button.lg.padding.x');\n    }\n\n    .p-button-lg .p-button-icon {\n        font-size: dt('button.lg.font.size');\n    }\n\n    .p-button-lg.p-button-icon-only {\n        width: dt('button.lg.icon.only.width');\n    }\n\n    .p-button-lg.p-button-icon-only.p-button-rounded {\n        height: dt('button.lg.icon.only.width');\n    }\n\n    .p-button-vertical {\n        flex-direction: column;\n    }\n\n    .p-button-label {\n        font-weight: dt('button.label.font.weight');\n    }\n\n    .p-button-fluid {\n        width: 100%;\n    }\n\n    .p-button-fluid.p-button-icon-only {\n        width: dt('button.icon.only.width');\n    }\n\n    .p-button:not(:disabled):hover {\n        background: dt('button.primary.hover.background');\n        border: 1px solid dt('button.primary.hover.border.color');\n        color: dt('button.primary.hover.color');\n    }\n\n    .p-button:not(:disabled):active {\n        background: dt('button.primary.active.background');\n        border: 1px solid dt('button.primary.active.border.color');\n        color: dt('button.primary.active.color');\n    }\n\n    .p-button:focus-visible {\n        box-shadow: dt('button.primary.focus.ring.shadow');\n        outline: dt('button.focus.ring.width') dt('button.focus.ring.style') dt('button.primary.focus.ring.color');\n        outline-offset: dt('button.focus.ring.offset');\n    }\n\n    .p-button .p-badge {\n        min-width: dt('button.badge.size');\n        height: dt('button.badge.size');\n        line-height: dt('button.badge.size');\n    }\n\n    .p-button-raised {\n        box-shadow: dt('button.raised.shadow');\n    }\n\n    .p-button-rounded {\n        border-radius: dt('button.rounded.border.radius');\n    }\n\n    .p-button-secondary {\n        background: dt('button.secondary.background');\n        border: 1px solid dt('button.secondary.border.color');\n        color: dt('button.secondary.color');\n    }\n\n    .p-button-secondary:not(:disabled):hover {\n        background: dt('button.secondary.hover.background');\n        border: 1px solid dt('button.secondary.hover.border.color');\n        color: dt('button.secondary.hover.color');\n    }\n\n    .p-button-secondary:not(:disabled):active {\n        background: dt('button.secondary.active.background');\n        border: 1px solid dt('button.secondary.active.border.color');\n        color: dt('button.secondary.active.color');\n    }\n\n    .p-button-secondary:focus-visible {\n        outline-color: dt('button.secondary.focus.ring.color');\n        box-shadow: dt('button.secondary.focus.ring.shadow');\n    }\n\n    .p-button-success {\n        background: dt('button.success.background');\n        border: 1px solid dt('button.success.border.color');\n        color: dt('button.success.color');\n    }\n\n    .p-button-success:not(:disabled):hover {\n        background: dt('button.success.hover.background');\n        border: 1px solid dt('button.success.hover.border.color');\n        color: dt('button.success.hover.color');\n    }\n\n    .p-button-success:not(:disabled):active {\n        background: dt('button.success.active.background');\n        border: 1px solid dt('button.success.active.border.color');\n        color: dt('button.success.active.color');\n    }\n\n    .p-button-success:focus-visible {\n        outline-color: dt('button.success.focus.ring.color');\n        box-shadow: dt('button.success.focus.ring.shadow');\n    }\n\n    .p-button-info {\n        background: dt('button.info.background');\n        border: 1px solid dt('button.info.border.color');\n        color: dt('button.info.color');\n    }\n\n    .p-button-info:not(:disabled):hover {\n        background: dt('button.info.hover.background');\n        border: 1px solid dt('button.info.hover.border.color');\n        color: dt('button.info.hover.color');\n    }\n\n    .p-button-info:not(:disabled):active {\n        background: dt('button.info.active.background');\n        border: 1px solid dt('button.info.active.border.color');\n        color: dt('button.info.active.color');\n    }\n\n    .p-button-info:focus-visible {\n        outline-color: dt('button.info.focus.ring.color');\n        box-shadow: dt('button.info.focus.ring.shadow');\n    }\n\n    .p-button-warn {\n        background: dt('button.warn.background');\n        border: 1px solid dt('button.warn.border.color');\n        color: dt('button.warn.color');\n    }\n\n    .p-button-warn:not(:disabled):hover {\n        background: dt('button.warn.hover.background');\n        border: 1px solid dt('button.warn.hover.border.color');\n        color: dt('button.warn.hover.color');\n    }\n\n    .p-button-warn:not(:disabled):active {\n        background: dt('button.warn.active.background');\n        border: 1px solid dt('button.warn.active.border.color');\n        color: dt('button.warn.active.color');\n    }\n\n    .p-button-warn:focus-visible {\n        outline-color: dt('button.warn.focus.ring.color');\n        box-shadow: dt('button.warn.focus.ring.shadow');\n    }\n\n    .p-button-help {\n        background: dt('button.help.background');\n        border: 1px solid dt('button.help.border.color');\n        color: dt('button.help.color');\n    }\n\n    .p-button-help:not(:disabled):hover {\n        background: dt('button.help.hover.background');\n        border: 1px solid dt('button.help.hover.border.color');\n        color: dt('button.help.hover.color');\n    }\n\n    .p-button-help:not(:disabled):active {\n        background: dt('button.help.active.background');\n        border: 1px solid dt('button.help.active.border.color');\n        color: dt('button.help.active.color');\n    }\n\n    .p-button-help:focus-visible {\n        outline-color: dt('button.help.focus.ring.color');\n        box-shadow: dt('button.help.focus.ring.shadow');\n    }\n\n    .p-button-danger {\n        background: dt('button.danger.background');\n        border: 1px solid dt('button.danger.border.color');\n        color: dt('button.danger.color');\n    }\n\n    .p-button-danger:not(:disabled):hover {\n        background: dt('button.danger.hover.background');\n        border: 1px solid dt('button.danger.hover.border.color');\n        color: dt('button.danger.hover.color');\n    }\n\n    .p-button-danger:not(:disabled):active {\n        background: dt('button.danger.active.background');\n        border: 1px solid dt('button.danger.active.border.color');\n        color: dt('button.danger.active.color');\n    }\n\n    .p-button-danger:focus-visible {\n        outline-color: dt('button.danger.focus.ring.color');\n        box-shadow: dt('button.danger.focus.ring.shadow');\n    }\n\n    .p-button-contrast {\n        background: dt('button.contrast.background');\n        border: 1px solid dt('button.contrast.border.color');\n        color: dt('button.contrast.color');\n    }\n\n    .p-button-contrast:not(:disabled):hover {\n        background: dt('button.contrast.hover.background');\n        border: 1px solid dt('button.contrast.hover.border.color');\n        color: dt('button.contrast.hover.color');\n    }\n\n    .p-button-contrast:not(:disabled):active {\n        background: dt('button.contrast.active.background');\n        border: 1px solid dt('button.contrast.active.border.color');\n        color: dt('button.contrast.active.color');\n    }\n\n    .p-button-contrast:focus-visible {\n        outline-color: dt('button.contrast.focus.ring.color');\n        box-shadow: dt('button.contrast.focus.ring.shadow');\n    }\n\n    .p-button-outlined {\n        background: transparent;\n        border-color: dt('button.outlined.primary.border.color');\n        color: dt('button.outlined.primary.color');\n    }\n\n    .p-button-outlined:not(:disabled):hover {\n        background: dt('button.outlined.primary.hover.background');\n        border-color: dt('button.outlined.primary.border.color');\n        color: dt('button.outlined.primary.color');\n    }\n\n    .p-button-outlined:not(:disabled):active {\n        background: dt('button.outlined.primary.active.background');\n        border-color: dt('button.outlined.primary.border.color');\n        color: dt('button.outlined.primary.color');\n    }\n\n    .p-button-outlined.p-button-secondary {\n        border-color: dt('button.outlined.secondary.border.color');\n        color: dt('button.outlined.secondary.color');\n    }\n\n    .p-button-outlined.p-button-secondary:not(:disabled):hover {\n        background: dt('button.outlined.secondary.hover.background');\n        border-color: dt('button.outlined.secondary.border.color');\n        color: dt('button.outlined.secondary.color');\n    }\n\n    .p-button-outlined.p-button-secondary:not(:disabled):active {\n        background: dt('button.outlined.secondary.active.background');\n        border-color: dt('button.outlined.secondary.border.color');\n        color: dt('button.outlined.secondary.color');\n    }\n\n    .p-button-outlined.p-button-success {\n        border-color: dt('button.outlined.success.border.color');\n        color: dt('button.outlined.success.color');\n    }\n\n    .p-button-outlined.p-button-success:not(:disabled):hover {\n        background: dt('button.outlined.success.hover.background');\n        border-color: dt('button.outlined.success.border.color');\n        color: dt('button.outlined.success.color');\n    }\n\n    .p-button-outlined.p-button-success:not(:disabled):active {\n        background: dt('button.outlined.success.active.background');\n        border-color: dt('button.outlined.success.border.color');\n        color: dt('button.outlined.success.color');\n    }\n\n    .p-button-outlined.p-button-info {\n        border-color: dt('button.outlined.info.border.color');\n        color: dt('button.outlined.info.color');\n    }\n\n    .p-button-outlined.p-button-info:not(:disabled):hover {\n        background: dt('button.outlined.info.hover.background');\n        border-color: dt('button.outlined.info.border.color');\n        color: dt('button.outlined.info.color');\n    }\n\n    .p-button-outlined.p-button-info:not(:disabled):active {\n        background: dt('button.outlined.info.active.background');\n        border-color: dt('button.outlined.info.border.color');\n        color: dt('button.outlined.info.color');\n    }\n\n    .p-button-outlined.p-button-warn {\n        border-color: dt('button.outlined.warn.border.color');\n        color: dt('button.outlined.warn.color');\n    }\n\n    .p-button-outlined.p-button-warn:not(:disabled):hover {\n        background: dt('button.outlined.warn.hover.background');\n        border-color: dt('button.outlined.warn.border.color');\n        color: dt('button.outlined.warn.color');\n    }\n\n    .p-button-outlined.p-button-warn:not(:disabled):active {\n        background: dt('button.outlined.warn.active.background');\n        border-color: dt('button.outlined.warn.border.color');\n        color: dt('button.outlined.warn.color');\n    }\n\n    .p-button-outlined.p-button-help {\n        border-color: dt('button.outlined.help.border.color');\n        color: dt('button.outlined.help.color');\n    }\n\n    .p-button-outlined.p-button-help:not(:disabled):hover {\n        background: dt('button.outlined.help.hover.background');\n        border-color: dt('button.outlined.help.border.color');\n        color: dt('button.outlined.help.color');\n    }\n\n    .p-button-outlined.p-button-help:not(:disabled):active {\n        background: dt('button.outlined.help.active.background');\n        border-color: dt('button.outlined.help.border.color');\n        color: dt('button.outlined.help.color');\n    }\n\n    .p-button-outlined.p-button-danger {\n        border-color: dt('button.outlined.danger.border.color');\n        color: dt('button.outlined.danger.color');\n    }\n\n    .p-button-outlined.p-button-danger:not(:disabled):hover {\n        background: dt('button.outlined.danger.hover.background');\n        border-color: dt('button.outlined.danger.border.color');\n        color: dt('button.outlined.danger.color');\n    }\n\n    .p-button-outlined.p-button-danger:not(:disabled):active {\n        background: dt('button.outlined.danger.active.background');\n        border-color: dt('button.outlined.danger.border.color');\n        color: dt('button.outlined.danger.color');\n    }\n\n    .p-button-outlined.p-button-contrast {\n        border-color: dt('button.outlined.contrast.border.color');\n        color: dt('button.outlined.contrast.color');\n    }\n\n    .p-button-outlined.p-button-contrast:not(:disabled):hover {\n        background: dt('button.outlined.contrast.hover.background');\n        border-color: dt('button.outlined.contrast.border.color');\n        color: dt('button.outlined.contrast.color');\n    }\n\n    .p-button-outlined.p-button-contrast:not(:disabled):active {\n        background: dt('button.outlined.contrast.active.background');\n        border-color: dt('button.outlined.contrast.border.color');\n        color: dt('button.outlined.contrast.color');\n    }\n\n    .p-button-outlined.p-button-plain {\n        border-color: dt('button.outlined.plain.border.color');\n        color: dt('button.outlined.plain.color');\n    }\n\n    .p-button-outlined.p-button-plain:not(:disabled):hover {\n        background: dt('button.outlined.plain.hover.background');\n        border-color: dt('button.outlined.plain.border.color');\n        color: dt('button.outlined.plain.color');\n    }\n\n    .p-button-outlined.p-button-plain:not(:disabled):active {\n        background: dt('button.outlined.plain.active.background');\n        border-color: dt('button.outlined.plain.border.color');\n        color: dt('button.outlined.plain.color');\n    }\n\n    .p-button-text {\n        background: transparent;\n        border-color: transparent;\n        color: dt('button.text.primary.color');\n    }\n\n    .p-button-text:not(:disabled):hover {\n        background: dt('button.text.primary.hover.background');\n        border-color: transparent;\n        color: dt('button.text.primary.color');\n    }\n\n    .p-button-text:not(:disabled):active {\n        background: dt('button.text.primary.active.background');\n        border-color: transparent;\n        color: dt('button.text.primary.color');\n    }\n\n    .p-button-text.p-button-secondary {\n        background: transparent;\n        border-color: transparent;\n        color: dt('button.text.secondary.color');\n    }\n\n    .p-button-text.p-button-secondary:not(:disabled):hover {\n        background: dt('button.text.secondary.hover.background');\n        border-color: transparent;\n        color: dt('button.text.secondary.color');\n    }\n\n    .p-button-text.p-button-secondary:not(:disabled):active {\n        background: dt('button.text.secondary.active.background');\n        border-color: transparent;\n        color: dt('button.text.secondary.color');\n    }\n\n    .p-button-text.p-button-success {\n        background: transparent;\n        border-color: transparent;\n        color: dt('button.text.success.color');\n    }\n\n    .p-button-text.p-button-success:not(:disabled):hover {\n        background: dt('button.text.success.hover.background');\n        border-color: transparent;\n        color: dt('button.text.success.color');\n    }\n\n    .p-button-text.p-button-success:not(:disabled):active {\n        background: dt('button.text.success.active.background');\n        border-color: transparent;\n        color: dt('button.text.success.color');\n    }\n\n    .p-button-text.p-button-info {\n        background: transparent;\n        border-color: transparent;\n        color: dt('button.text.info.color');\n    }\n\n    .p-button-text.p-button-info:not(:disabled):hover {\n        background: dt('button.text.info.hover.background');\n        border-color: transparent;\n        color: dt('button.text.info.color');\n    }\n\n    .p-button-text.p-button-info:not(:disabled):active {\n        background: dt('button.text.info.active.background');\n        border-color: transparent;\n        color: dt('button.text.info.color');\n    }\n\n    .p-button-text.p-button-warn {\n        background: transparent;\n        border-color: transparent;\n        color: dt('button.text.warn.color');\n    }\n\n    .p-button-text.p-button-warn:not(:disabled):hover {\n        background: dt('button.text.warn.hover.background');\n        border-color: transparent;\n        color: dt('button.text.warn.color');\n    }\n\n    .p-button-text.p-button-warn:not(:disabled):active {\n        background: dt('button.text.warn.active.background');\n        border-color: transparent;\n        color: dt('button.text.warn.color');\n    }\n\n    .p-button-text.p-button-help {\n        background: transparent;\n        border-color: transparent;\n        color: dt('button.text.help.color');\n    }\n\n    .p-button-text.p-button-help:not(:disabled):hover {\n        background: dt('button.text.help.hover.background');\n        border-color: transparent;\n        color: dt('button.text.help.color');\n    }\n\n    .p-button-text.p-button-help:not(:disabled):active {\n        background: dt('button.text.help.active.background');\n        border-color: transparent;\n        color: dt('button.text.help.color');\n    }\n\n    .p-button-text.p-button-danger {\n        background: transparent;\n        border-color: transparent;\n        color: dt('button.text.danger.color');\n    }\n\n    .p-button-text.p-button-danger:not(:disabled):hover {\n        background: dt('button.text.danger.hover.background');\n        border-color: transparent;\n        color: dt('button.text.danger.color');\n    }\n\n    .p-button-text.p-button-danger:not(:disabled):active {\n        background: dt('button.text.danger.active.background');\n        border-color: transparent;\n        color: dt('button.text.danger.color');\n    }\n\n    .p-button-text.p-button-contrast {\n        background: transparent;\n        border-color: transparent;\n        color: dt('button.text.contrast.color');\n    }\n\n    .p-button-text.p-button-contrast:not(:disabled):hover {\n        background: dt('button.text.contrast.hover.background');\n        border-color: transparent;\n        color: dt('button.text.contrast.color');\n    }\n\n    .p-button-text.p-button-contrast:not(:disabled):active {\n        background: dt('button.text.contrast.active.background');\n        border-color: transparent;\n        color: dt('button.text.contrast.color');\n    }\n\n    .p-button-text.p-button-plain {\n        background: transparent;\n        border-color: transparent;\n        color: dt('button.text.plain.color');\n    }\n\n    .p-button-text.p-button-plain:not(:disabled):hover {\n        background: dt('button.text.plain.hover.background');\n        border-color: transparent;\n        color: dt('button.text.plain.color');\n    }\n\n    .p-button-text.p-button-plain:not(:disabled):active {\n        background: dt('button.text.plain.active.background');\n        border-color: transparent;\n        color: dt('button.text.plain.color');\n    }\n\n    .p-button-link {\n        background: transparent;\n        border-color: transparent;\n        color: dt('button.link.color');\n    }\n\n    .p-button-link:not(:disabled):hover {\n        background: transparent;\n        border-color: transparent;\n        color: dt('button.link.hover.color');\n    }\n\n    .p-button-link:not(:disabled):hover .p-button-label {\n        text-decoration: underline;\n    }\n\n    .p-button-link:not(:disabled):active {\n        background: transparent;\n        border-color: transparent;\n        color: dt('button.link.active.color');\n    }\n";
// ../node_modules/primeng/fesm2022/primeng-button.mjs
var _ButtonStyle;
var _Button;
var _ButtonIcon;
var _ButtonLabel;
var _ButtonDirective;
var _ButtonModule;
var classes = {
	root: ({ instance }) => {
		const hasIcon = instance.hasIcon();
		const label = instance.label();
		const buttonProps = instance.buttonProps();
		const loading = instance.loading();
		const link = instance.link();
		const severity = instance.severity();
		const raised = instance.raised();
		const rounded = instance.rounded();
		const text = instance.text();
		const variant = instance.variant();
		const outlined = instance.outlined();
		const size = instance.size();
		const plain = instance.plain();
		const badge = instance.badge();
		const hasFluid = instance.hasFluid();
		const iconPos = instance.iconPos();
		return ["p-button p-component", {
			"p-button-icon-only": hasIcon && !label && !(buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.label) && !badge,
			"p-button-vertical": (iconPos === "top" || iconPos === "bottom") && label,
			"p-button-loading": loading || (buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.loading),
			"p-button-link": link || (buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.link),
			[`p-button-${severity || (buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.severity)}`]: severity || (buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.severity),
			"p-button-raised": raised || (buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.raised),
			"p-button-rounded": rounded || (buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.rounded),
			"p-button-text": text || variant === "text" || (buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.text) || (buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.variant) === "text",
			"p-button-outlined": outlined || variant === "outlined" || (buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.outlined) || (buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.variant) === "outlined",
			"p-button-sm": size === "small" || (buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.size) === "small",
			"p-button-lg": size === "large" || (buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.size) === "large",
			"p-button-plain": plain || (buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.plain),
			"p-button-fluid": hasFluid
		}];
	},
	loadingIcon: "p-button-loading-icon",
	icon: ({ instance }) => {
		const iconPos = instance.iconPos();
		const buttonProps = instance.buttonProps();
		const label = instance.label();
		return ["p-button-icon", {
			[`p-button-icon-${iconPos || (buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.iconPos)}`]: label || (buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.label),
			"p-button-icon-left": (iconPos === "left" || (buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.iconPos) === "left") && label || (buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.label),
			"p-button-icon-right": (iconPos === "right" || (buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.iconPos) === "right") && label || (buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.label),
			"p-button-icon-top": (iconPos === "top" || (buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.iconPos) === "top") && label || (buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.label),
			"p-button-icon-bottom": (iconPos === "bottom" || (buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.iconPos) === "bottom") && label || (buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.label)
		}];
	},
	spinnerIcon: ({ instance }) => Object.entries(instance.cx("icon")).filter(([, value]) => !!value).reduce((acc, [key]) => acc + ` ${key}`, "p-button-loading-icon"),
	label: "p-button-label"
};
var ButtonStyle = (_ButtonStyle = class ButtonStyle extends BaseStyle {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "name", "button");
		_defineProperty(this, "style", style);
		_defineProperty(this, "classes", classes);
	}
}, _defineProperty(_ButtonStyle, "ɵfac", /*@__PURE__*/ (() => {
	let ɵButtonStyle_BaseFactory = void 0;
	return function ButtonStyle_Factory(__ngFactoryType__) {
		return (ɵButtonStyle_BaseFactory || (ɵButtonStyle_BaseFactory = ɵɵgetInheritedFactory(_ButtonStyle)))(__ngFactoryType__ || _ButtonStyle);
	};
})()), _defineProperty(_ButtonStyle, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _ButtonStyle,
	factory: _ButtonStyle.ɵfac
})), _ButtonStyle);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ButtonStyle, [{ type: Injectable }], null, null);
})();
var ButtonClasses;
(function(ButtonClasses) {
	ButtonClasses["root"] = "p-button";
	ButtonClasses["loadingIcon"] = "p-button-loading-icon";
	ButtonClasses["icon"] = "p-button-icon";
	ButtonClasses["label"] = "p-button-label";
})(ButtonClasses || (ButtonClasses = {}));
var BUTTON_INSTANCE = new InjectionToken("BUTTON_INSTANCE");
var Button = (_Button = class Button extends BaseComponent {
	constructor(..._args2) {
		var _inject;
		super(..._args2);
		_defineProperty(this, "componentName", "Button");
		_defineProperty(this, "hostName", input("", ...ngDevMode ? [{ debugName: "hostName" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$pcButton", (_inject = inject(BUTTON_INSTANCE, {
			optional: true,
			skipSelf: true
		})) !== null && _inject !== void 0 ? _inject : void 0);
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		_defineProperty(this, "_componentStyle", inject(ButtonStyle));
		_defineProperty(this, "type", input("button", ...ngDevMode ? [{ debugName: "type" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "badge", input(...ngDevMode ? [void 0, { debugName: "badge" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "disabled", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "raised", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "raised" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "rounded", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "rounded" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "text", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "text" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "plain", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "plain" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "outlined", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "outlined" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "link", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "link" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "tabindex", input(0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "tabindex" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "size", input(...ngDevMode ? [void 0, { debugName: "size" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "variant", input(...ngDevMode ? [void 0, { debugName: "variant" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "style", input(...ngDevMode ? [void 0, { debugName: "style" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "styleClass", input(...ngDevMode ? [void 0, { debugName: "styleClass" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "badgeSeverity", input("secondary", ...ngDevMode ? [{ debugName: "badgeSeverity" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "ariaLabel", input(...ngDevMode ? [void 0, { debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "autofocus", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "autofocus" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "iconPos", input("left", ...ngDevMode ? [{ debugName: "iconPos" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "icon", input(...ngDevMode ? [void 0, { debugName: "icon" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "label", input(...ngDevMode ? [void 0, { debugName: "label" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "loading", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "loading" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "loadingIcon", input(...ngDevMode ? [void 0, { debugName: "loadingIcon" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "severity", input(...ngDevMode ? [void 0, { debugName: "severity" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "buttonProps", input(...ngDevMode ? [void 0, { debugName: "buttonProps" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "fluid", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "fluid" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "iconOnly", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "iconOnly" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "onClick", output());
		_defineProperty(this, "onFocus", output());
		_defineProperty(this, "onBlur", output());
		_defineProperty(this, "contentTemplate", contentChild("content", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "contentTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "loadingIconTemplate", contentChild("loadingicon", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "loadingIconTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "iconTemplate", contentChild("icon", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "iconTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "pcFluid", inject(Fluid, {
			optional: true,
			host: true,
			skipSelf: true
		}));
		_defineProperty(this, "hasFluid", computed(() => {
			var _this$fluid;
			return (_this$fluid = this.fluid()) !== null && _this$fluid !== void 0 ? _this$fluid : !!this.pcFluid;
		}, ...ngDevMode ? [{ debugName: "hasFluid" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$type", computed(() => {
			var _this$buttonProps;
			return this.type() || ((_this$buttonProps = this.buttonProps()) === null || _this$buttonProps === void 0 ? void 0 : _this$buttonProps.type);
		}, ...ngDevMode ? [{ debugName: "$type" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$ariaLabel", computed(() => {
			var _this$buttonProps2;
			return this.ariaLabel() || ((_this$buttonProps2 = this.buttonProps()) === null || _this$buttonProps2 === void 0 ? void 0 : _this$buttonProps2.ariaLabel);
		}, ...ngDevMode ? [{ debugName: "$ariaLabel" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "mergedStyle", computed(() => {
			var _this$buttonProps3;
			return this.style() || ((_this$buttonProps3 = this.buttonProps()) === null || _this$buttonProps3 === void 0 ? void 0 : _this$buttonProps3.style);
		}, ...ngDevMode ? [{ debugName: "mergedStyle" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$disabled", computed(() => {
			var _this$buttonProps4;
			return this.disabled() || this.loading() || ((_this$buttonProps4 = this.buttonProps()) === null || _this$buttonProps4 === void 0 ? void 0 : _this$buttonProps4.disabled);
		}, ...ngDevMode ? [{ debugName: "$disabled" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$severity", computed(() => {
			var _this$buttonProps5;
			return this.severity() || ((_this$buttonProps5 = this.buttonProps()) === null || _this$buttonProps5 === void 0 ? void 0 : _this$buttonProps5.severity);
		}, ...ngDevMode ? [{ debugName: "$severity" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$tabindex", computed(() => {
			var _this$buttonProps6;
			return this.tabindex() || ((_this$buttonProps6 = this.buttonProps()) === null || _this$buttonProps6 === void 0 ? void 0 : _this$buttonProps6.tabindex);
		}, ...ngDevMode ? [{ debugName: "$tabindex" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$autofocus", computed(() => {
			var _this$buttonProps7;
			return this.autofocus() || ((_this$buttonProps7 = this.buttonProps()) === null || _this$buttonProps7 === void 0 ? void 0 : _this$buttonProps7.autofocus);
		}, ...ngDevMode ? [{ debugName: "$autofocus" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$loading", computed(() => {
			var _this$buttonProps8;
			return this.loading() || ((_this$buttonProps8 = this.buttonProps()) === null || _this$buttonProps8 === void 0 ? void 0 : _this$buttonProps8.loading);
		}, ...ngDevMode ? [{ debugName: "$loading" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$icon", computed(() => {
			var _this$buttonProps9;
			return this.icon() || ((_this$buttonProps9 = this.buttonProps()) === null || _this$buttonProps9 === void 0 ? void 0 : _this$buttonProps9.icon);
		}, ...ngDevMode ? [{ debugName: "$icon" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$label", computed(() => {
			var _this$buttonProps10;
			return this.label() || ((_this$buttonProps10 = this.buttonProps()) === null || _this$buttonProps10 === void 0 ? void 0 : _this$buttonProps10.label);
		}, ...ngDevMode ? [{ debugName: "$label" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$badge", computed(() => {
			var _this$buttonProps11;
			return this.badge() || ((_this$buttonProps11 = this.buttonProps()) === null || _this$buttonProps11 === void 0 ? void 0 : _this$buttonProps11.badge);
		}, ...ngDevMode ? [{ debugName: "$badge" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$loadingIcon", computed(() => {
			var _this$buttonProps12;
			return this.loadingIcon() || ((_this$buttonProps12 = this.buttonProps()) === null || _this$buttonProps12 === void 0 ? void 0 : _this$buttonProps12.loadingIcon);
		}, ...ngDevMode ? [{ debugName: "$loadingIcon" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$badgeSeverity", computed(() => {
			var _this$buttonProps13;
			return this.badgeSeverity() || ((_this$buttonProps13 = this.buttonProps()) === null || _this$buttonProps13 === void 0 ? void 0 : _this$buttonProps13.badgeSeverity);
		}, ...ngDevMode ? [{ debugName: "$badgeSeverity" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "showLabel", computed(() => !this.contentTemplate() && this.$label(), ...ngDevMode ? [{ debugName: "showLabel" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "showBadge", computed(() => !this.contentTemplate() && this.$badge(), ...ngDevMode ? [{ debugName: "showBadge" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "hasIcon", computed(() => this.$icon() || this.iconTemplate() || this.loadingIcon() || this.loadingIconTemplate(), ...ngDevMode ? [{ debugName: "hasIcon" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$outlined", computed(() => {
			var _this$buttonProps14, _this$buttonProps15;
			return this.outlined() || this.variant() === "outlined" || ((_this$buttonProps14 = this.buttonProps()) === null || _this$buttonProps14 === void 0 ? void 0 : _this$buttonProps14.outlined) || ((_this$buttonProps15 = this.buttonProps()) === null || _this$buttonProps15 === void 0 ? void 0 : _this$buttonProps15.variant) === "outlined";
		}, ...ngDevMode ? [{ debugName: "$outlined" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$text", computed(() => {
			var _this$buttonProps16, _this$buttonProps17;
			return this.text() || this.variant() === "text" || ((_this$buttonProps16 = this.buttonProps()) === null || _this$buttonProps16 === void 0 ? void 0 : _this$buttonProps16.text) || ((_this$buttonProps17 = this.buttonProps()) === null || _this$buttonProps17 === void 0 ? void 0 : _this$buttonProps17.variant) === "text";
		}, ...ngDevMode ? [{ debugName: "$text" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$iconOnly", computed(() => this.iconOnly() || this.hasIcon() && !this.$label() && !this.$badge(), ...ngDevMode ? [{ debugName: "$iconOnly" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataP", computed(() => this.cn({
			[this.size()]: this.size(),
			"icon-only": this.$iconOnly(),
			loading: this.$loading(),
			fluid: this.hasFluid(),
			rounded: this.rounded(),
			raised: this.raised(),
			outlined: this.$outlined(),
			text: this.$text(),
			link: this.link(),
			vertical: (this.iconPos() === "top" || this.iconPos() === "bottom") && this.$label()
		}), ...ngDevMode ? [{ debugName: "dataP" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataIconP", computed(() => this.cn({
			[this.iconPos()]: this.iconPos(),
			[this.size()]: this.size()
		}), ...ngDevMode ? [{ debugName: "dataIconP" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataLabelP", computed(() => this.cn({
			[this.size()]: this.size(),
			"icon-only": this.$iconOnly()
		}), ...ngDevMode ? [{ debugName: "dataLabelP" }] : /* istanbul ignore next */ []));
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.ptm("host"));
	}
	getLoadingIconTemplateContext() {
		return {
			class: this.cx("loadingIcon"),
			pt: this.ptm("loadingIcon")
		};
	}
	getIconTemplateContext() {
		const iconClass = this.cx("icon");
		return {
			class: iconClass && this.cn(iconClass, this.$icon()),
			pt: this.ptm("icon")
		};
	}
}, _defineProperty(_Button, "ɵfac", /*@__PURE__*/ (() => {
	let ɵButton_BaseFactory = void 0;
	return function Button_Factory(__ngFactoryType__) {
		return (ɵButton_BaseFactory || (ɵButton_BaseFactory = ɵɵgetInheritedFactory(_Button)))(__ngFactoryType__ || _Button);
	};
})()), _defineProperty(_Button, "ɵcmp", (function() {
	const _c0 = ["content"];
	const _c1 = ["loadingicon"];
	const _c2 = ["icon"];
	const _c3 = ["*"];
	function Button_ng_container_2_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Button_Conditional_3_Conditional_0_Conditional_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelement(0, "span", 5);
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(3);
			ɵɵclassMap(ctx_r0.cn(ctx_r0.cx("loadingIcon"), "pi-spin", ctx_r0.$loadingIcon()));
			ɵɵproperty("pBind", ctx_r0.ptm("loadingIcon"));
			ɵɵattribute("aria-hidden", true);
		}
	}
	function Button_Conditional_3_Conditional_0_Conditional_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 6);
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(3);
			ɵɵclassMap(ctx_r0.cn(ctx_r0.cx("loadingIcon"), ctx_r0.cx("spinnerIcon")));
			ɵɵproperty("spin", true)("pBind", ctx_r0.ptm("loadingIcon"));
			ɵɵattribute("aria-hidden", true);
		}
	}
	function Button_Conditional_3_Conditional_0_Template(rf, ctx) {
		if (rf & 1) ɵɵconditionalCreate(0, Button_Conditional_3_Conditional_0_Conditional_0_Template, 1, 4, "span", 2)(1, Button_Conditional_3_Conditional_0_Conditional_1_Template, 1, 5, "svg", 4);
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵconditional(ctx_r0.$loadingIcon() ? 0 : 1);
		}
	}
	function Button_Conditional_3_Conditional_1_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Button_Conditional_3_Conditional_1_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Button_Conditional_3_Conditional_1_ng_container_0_Template, 1, 0, "ng-container", 7);
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵproperty("ngTemplateOutlet", ctx_r0.loadingIconTemplate())("ngTemplateOutletContext", ctx_r0.getLoadingIconTemplateContext());
		}
	}
	function Button_Conditional_3_Template(rf, ctx) {
		if (rf & 1) ɵɵconditionalCreate(0, Button_Conditional_3_Conditional_0_Template, 2, 1)(1, Button_Conditional_3_Conditional_1_Template, 1, 2, "ng-container");
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵconditional(!ctx_r0.loadingIconTemplate() ? 0 : 1);
		}
	}
	function Button_Conditional_4_Conditional_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelement(0, "span", 5);
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵclassMap(ctx_r0.cn(ctx_r0.cx("icon"), ctx_r0.$icon()));
			ɵɵproperty("pBind", ctx_r0.ptm("icon"));
			ɵɵattribute("data-p", ctx_r0.dataIconP());
		}
	}
	function Button_Conditional_4_Conditional_1_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Button_Conditional_4_Conditional_1_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Button_Conditional_4_Conditional_1_ng_container_0_Template, 1, 0, "ng-container", 7);
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵproperty("ngTemplateOutlet", ctx_r0.iconTemplate())("ngTemplateOutletContext", ctx_r0.getIconTemplateContext());
		}
	}
	function Button_Conditional_4_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵconditionalCreate(0, Button_Conditional_4_Conditional_0_Template, 1, 4, "span", 2);
			ɵɵconditionalCreate(1, Button_Conditional_4_Conditional_1_Template, 1, 2, "ng-container");
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵconditional(ctx_r0.$icon() && !ctx_r0.iconTemplate() ? 0 : -1);
			ɵɵadvance();
			ɵɵconditional(!ctx_r0.icon() && ctx_r0.iconTemplate() ? 1 : -1);
		}
	}
	function Button_Conditional_5_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "span", 5);
			ɵɵtext(1);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵclassMap(ctx_r0.cx("label"));
			ɵɵproperty("pBind", ctx_r0.ptm("label"));
			ɵɵattribute("aria-hidden", ctx_r0.$icon() && !ctx_r0.$label())("data-p", ctx_r0.dataLabelP());
			ɵɵadvance();
			ɵɵtextInterpolate(ctx_r0.$label());
		}
	}
	function Button_Conditional_6_Template(rf, ctx) {
		if (rf & 1) ɵɵelement(0, "p-badge", 3);
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵproperty("value", ctx_r0.$badge())("severity", ctx_r0.$badgeSeverity())("pt", ctx_r0.ptm("pcBadge"))("unstyled", ctx_r0.unstyled());
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _Button,
		selectors: [["p-button"]],
		contentQueries: function Button_ContentQueries(rf, ctx, dirIndex) {
			if (rf & 1) ɵɵcontentQuerySignal(dirIndex, ctx.contentTemplate, _c0, 4)(dirIndex, ctx.loadingIconTemplate, _c1, 4)(dirIndex, ctx.iconTemplate, _c2, 4);
			if (rf & 2) ɵɵqueryAdvance(3);
		},
		inputs: {
			hostName: [1, "hostName"],
			type: [1, "type"],
			badge: [1, "badge"],
			disabled: [1, "disabled"],
			raised: [1, "raised"],
			rounded: [1, "rounded"],
			text: [1, "text"],
			plain: [1, "plain"],
			outlined: [1, "outlined"],
			link: [1, "link"],
			tabindex: [1, "tabindex"],
			size: [1, "size"],
			variant: [1, "variant"],
			style: [1, "style"],
			styleClass: [1, "styleClass"],
			badgeSeverity: [1, "badgeSeverity"],
			ariaLabel: [1, "ariaLabel"],
			autofocus: [1, "autofocus"],
			iconPos: [1, "iconPos"],
			icon: [1, "icon"],
			label: [1, "label"],
			loading: [1, "loading"],
			loadingIcon: [1, "loadingIcon"],
			severity: [1, "severity"],
			buttonProps: [1, "buttonProps"],
			fluid: [1, "fluid"],
			iconOnly: [1, "iconOnly"]
		},
		outputs: {
			onClick: "onClick",
			onFocus: "onFocus",
			onBlur: "onBlur"
		},
		features: [
			ɵɵProvidersFeature([
				ButtonStyle,
				{
					provide: BUTTON_INSTANCE,
					useExisting: _Button
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: _Button
				}
			]),
			ɵɵHostDirectivesFeature([Bind]),
			ɵɵInheritDefinitionFeature
		],
		ngContentSelectors: _c3,
		decls: 7,
		vars: 18,
		consts: [
			[
				"pRipple",
				"",
				3,
				"click",
				"focus",
				"blur",
				"disabled",
				"pAutoFocus",
				"pBind"
			],
			[4, "ngTemplateOutlet"],
			[
				3,
				"class",
				"pBind"
			],
			[
				3,
				"value",
				"severity",
				"pt",
				"unstyled"
			],
			[
				"data-p-icon",
				"spinner",
				3,
				"class",
				"spin",
				"pBind"
			],
			[3, "pBind"],
			[
				"data-p-icon",
				"spinner",
				3,
				"spin",
				"pBind"
			],
			[
				4,
				"ngTemplateOutlet",
				"ngTemplateOutletContext"
			]
		],
		template: function Button_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵprojectionDef();
				ɵɵelementStart(0, "button", 0);
				ɵɵlistener("click", function Button_Template_button_click_0_listener($event) {
					return ctx.onClick.emit($event);
				})("focus", function Button_Template_button_focus_0_listener($event) {
					return ctx.onFocus.emit($event);
				})("blur", function Button_Template_button_blur_0_listener($event) {
					return ctx.onBlur.emit($event);
				});
				ɵɵprojection(1);
				ɵɵtemplate(2, Button_ng_container_2_Template, 1, 0, "ng-container", 1);
				ɵɵconditionalCreate(3, Button_Conditional_3_Template, 2, 1);
				ɵɵconditionalCreate(4, Button_Conditional_4_Template, 2, 2);
				ɵɵconditionalCreate(5, Button_Conditional_5_Template, 2, 6, "span", 2);
				ɵɵconditionalCreate(6, Button_Conditional_6_Template, 1, 4, "p-badge", 3);
				ɵɵelementEnd();
			}
			if (rf & 2) {
				var _ctx$buttonProps;
				ɵɵstyleMap(ctx.mergedStyle());
				ɵɵclassMap(ctx.cn(ctx.cx("root"), ctx.styleClass(), (_ctx$buttonProps = ctx.buttonProps()) === null || _ctx$buttonProps === void 0 ? void 0 : _ctx$buttonProps.styleClass));
				ɵɵproperty("disabled", ctx.$disabled())("pAutoFocus", ctx.$autofocus())("pBind", ctx.ptm("root"));
				ɵɵattribute("type", ctx.$type())("aria-label", ctx.$ariaLabel())("tabindex", ctx.$tabindex())("data-p", ctx.dataP())("data-p-disabled", ctx.$disabled())("data-p-severity", ctx.$severity());
				ɵɵadvance(2);
				ɵɵproperty("ngTemplateOutlet", ctx.contentTemplate());
				ɵɵadvance();
				ɵɵconditional(ctx.$loading() ? 3 : -1);
				ɵɵadvance();
				ɵɵconditional(!ctx.$loading() ? 4 : -1);
				ɵɵadvance();
				ɵɵconditional(ctx.showLabel() ? 5 : -1);
				ɵɵadvance();
				ɵɵconditional(ctx.showBadge() ? 6 : -1);
			}
		},
		dependencies: [
			NgTemplateOutlet,
			Ripple,
			AutoFocus,
			Spinner,
			BadgeModule,
			Badge,
			Bind
		],
		encapsulation: 2
	});
})()), _Button);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Button, [{
		type: Component,
		args: [{
			selector: "p-button",
			standalone: true,
			imports: [
				NgTemplateOutlet,
				Ripple,
				AutoFocus,
				Spinner,
				BadgeModule,
				Bind
			],
			template: `
        <button
            [attr.type]="$type()"
            [attr.aria-label]="$ariaLabel()"
            [style]="mergedStyle()"
            [disabled]="$disabled()"
            [class]="cn(cx('root'), styleClass(), buttonProps()?.styleClass)"
            (click)="onClick.emit($event)"
            (focus)="onFocus.emit($event)"
            (blur)="onBlur.emit($event)"
            pRipple
            [attr.tabindex]="$tabindex()"
            [pAutoFocus]="$autofocus()"
            [pBind]="ptm('root')"
            [attr.data-p]="dataP()"
            [attr.data-p-disabled]="$disabled()"
            [attr.data-p-severity]="$severity()"
        >
            <ng-content />
            <ng-container *ngTemplateOutlet="contentTemplate()" />
            @if ($loading()) {
                @if (!loadingIconTemplate()) {
                    @if ($loadingIcon()) {
                        <span [class]="cn(cx('loadingIcon'), 'pi-spin', $loadingIcon())" [pBind]="ptm('loadingIcon')" [attr.aria-hidden]="true"></span>
                    } @else {
                        <svg data-p-icon="spinner" [class]="cn(cx('loadingIcon'), cx('spinnerIcon'))" [spin]="true" [pBind]="ptm('loadingIcon')" [attr.aria-hidden]="true" />
                    }
                } @else {
                    <ng-container *ngTemplateOutlet="loadingIconTemplate(); context: getLoadingIconTemplateContext()" />
                }
            }
            @if (!$loading()) {
                @if ($icon() && !iconTemplate()) {
                    <span [class]="cn(cx('icon'), $icon())" [pBind]="ptm('icon')" [attr.data-p]="dataIconP()"></span>
                }
                @if (!icon() && iconTemplate()) {
                    <ng-container *ngTemplateOutlet="iconTemplate(); context: getIconTemplateContext()" />
                }
            }
            @if (showLabel()) {
                <span [class]="cx('label')" [attr.aria-hidden]="$icon() && !$label()" [pBind]="ptm('label')" [attr.data-p]="dataLabelP()">{{ $label() }}</span>
            }
            @if (showBadge()) {
                <p-badge [value]="$badge()" [severity]="$badgeSeverity()" [pt]="ptm('pcBadge')" [unstyled]="unstyled()" />
            }
        </button>
    `,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None,
			providers: [
				ButtonStyle,
				{
					provide: BUTTON_INSTANCE,
					useExisting: Button
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: Button
				}
			],
			hostDirectives: [Bind]
		}]
	}], null, {
		hostName: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "hostName",
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
		badge: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "badge",
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
		raised: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "raised",
				required: false
			}]
		}],
		rounded: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "rounded",
				required: false
			}]
		}],
		text: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "text",
				required: false
			}]
		}],
		plain: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "plain",
				required: false
			}]
		}],
		outlined: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "outlined",
				required: false
			}]
		}],
		link: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "link",
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
		size: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "size",
				required: false
			}]
		}],
		variant: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "variant",
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
		badgeSeverity: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "badgeSeverity",
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
		autofocus: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "autofocus",
				required: false
			}]
		}],
		iconPos: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "iconPos",
				required: false
			}]
		}],
		icon: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "icon",
				required: false
			}]
		}],
		label: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "label",
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
		loadingIcon: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "loadingIcon",
				required: false
			}]
		}],
		severity: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "severity",
				required: false
			}]
		}],
		buttonProps: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "buttonProps",
				required: false
			}]
		}],
		fluid: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "fluid",
				required: false
			}]
		}],
		iconOnly: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "iconOnly",
				required: false
			}]
		}],
		onClick: [{
			type: Output,
			args: ["onClick"]
		}],
		onFocus: [{
			type: Output,
			args: ["onFocus"]
		}],
		onBlur: [{
			type: Output,
			args: ["onBlur"]
		}],
		contentTemplate: [{
			type: ContentChild,
			args: ["content", {
				descendants: false,
				isSignal: true
			}]
		}],
		loadingIconTemplate: [{
			type: ContentChild,
			args: ["loadingicon", {
				descendants: false,
				isSignal: true
			}]
		}],
		iconTemplate: [{
			type: ContentChild,
			args: ["icon", {
				descendants: false,
				isSignal: true
			}]
		}]
	});
})();
var BUTTON_ICON_INSTANCE = new InjectionToken("BUTTON_ICON_INSTANCE");
var ButtonIcon = (_ButtonIcon = class ButtonIcon extends BaseComponent {
	constructor() {
		var _inject2;
		super();
		_defineProperty(this, "componentName", "ButtonIcon");
		_defineProperty(this, "pButtonIconPT", input(...ngDevMode ? [void 0, { debugName: "pButtonIconPT" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "pButtonUnstyled", input(...ngDevMode ? [void 0, { debugName: "pButtonUnstyled" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$pcButtonIcon", (_inject2 = inject(BUTTON_ICON_INSTANCE, {
			optional: true,
			skipSelf: true
		})) !== null && _inject2 !== void 0 ? _inject2 : void 0);
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		effect(() => {
			const pt = this.pButtonIconPT();
			if (pt) this.directivePT.set(pt);
		});
		effect(() => {
			if (this.pButtonUnstyled()) this.directiveUnstyled.set(this.pButtonUnstyled());
		});
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
	}
}, _defineProperty(_ButtonIcon, "ɵfac", function ButtonIcon_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _ButtonIcon)();
}), _defineProperty(_ButtonIcon, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _ButtonIcon,
	selectors: [[
		"",
		"pButtonIcon",
		""
	]],
	hostVars: 2,
	hostBindings: function ButtonIcon_HostBindings(rf, ctx) {
		if (rf & 2) ɵɵclassMap(ctx.$unstyled() ? void 0 : ctx.pcn("p-button-icon"));
	},
	inputs: {
		pButtonIconPT: [1, "pButtonIconPT"],
		pButtonUnstyled: [1, "pButtonUnstyled"]
	},
	features: [
		ɵɵProvidersFeature([
			ButtonStyle,
			{
				provide: BUTTON_ICON_INSTANCE,
				useExisting: _ButtonIcon
			},
			{
				provide: PARENT_INSTANCE,
				useExisting: _ButtonIcon
			}
		]),
		ɵɵHostDirectivesFeature([Bind]),
		ɵɵInheritDefinitionFeature
	]
})), _ButtonIcon);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ButtonIcon, [{
		type: Directive,
		args: [{
			selector: "[pButtonIcon]",
			providers: [
				ButtonStyle,
				{
					provide: BUTTON_ICON_INSTANCE,
					useExisting: ButtonIcon
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: ButtonIcon
				}
			],
			standalone: true,
			host: { "[class]": "$unstyled() ? undefined : pcn('p-button-icon')" },
			hostDirectives: [Bind]
		}]
	}], () => [], {
		pButtonIconPT: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pButtonIconPT",
				required: false
			}]
		}],
		pButtonUnstyled: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pButtonUnstyled",
				required: false
			}]
		}]
	});
})();
var BUTTON_LABEL_INSTANCE = new InjectionToken("BUTTON_LABEL_INSTANCE");
var ButtonLabel = (_ButtonLabel = class ButtonLabel extends BaseComponent {
	constructor() {
		var _inject3;
		super();
		_defineProperty(this, "componentName", "ButtonLabel");
		_defineProperty(this, "pButtonLabelPT", input(...ngDevMode ? [void 0, { debugName: "pButtonLabelPT" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "pButtonLabelUnstyled", input(...ngDevMode ? [void 0, { debugName: "pButtonLabelUnstyled" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$pcButtonLabel", (_inject3 = inject(BUTTON_LABEL_INSTANCE, {
			optional: true,
			skipSelf: true
		})) !== null && _inject3 !== void 0 ? _inject3 : void 0);
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		effect(() => {
			const pt = this.pButtonLabelPT();
			if (pt) this.directivePT.set(pt);
		});
		effect(() => {
			if (this.pButtonLabelUnstyled()) this.directiveUnstyled.set(this.pButtonLabelUnstyled());
		});
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
	}
}, _defineProperty(_ButtonLabel, "ɵfac", function ButtonLabel_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _ButtonLabel)();
}), _defineProperty(_ButtonLabel, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _ButtonLabel,
	selectors: [[
		"",
		"pButtonLabel",
		""
	]],
	hostVars: 2,
	hostBindings: function ButtonLabel_HostBindings(rf, ctx) {
		if (rf & 2) ɵɵclassMap(ctx.$unstyled() ? void 0 : ctx.pcn("p-button-label"));
	},
	inputs: {
		pButtonLabelPT: [1, "pButtonLabelPT"],
		pButtonLabelUnstyled: [1, "pButtonLabelUnstyled"]
	},
	features: [
		ɵɵProvidersFeature([
			ButtonStyle,
			{
				provide: BUTTON_LABEL_INSTANCE,
				useExisting: _ButtonLabel
			},
			{
				provide: PARENT_INSTANCE,
				useExisting: _ButtonLabel
			}
		]),
		ɵɵHostDirectivesFeature([Bind]),
		ɵɵInheritDefinitionFeature
	]
})), _ButtonLabel);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ButtonLabel, [{
		type: Directive,
		args: [{
			selector: "[pButtonLabel]",
			providers: [
				ButtonStyle,
				{
					provide: BUTTON_LABEL_INSTANCE,
					useExisting: ButtonLabel
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: ButtonLabel
				}
			],
			standalone: true,
			host: { "[class]": "$unstyled() ? undefined : pcn('p-button-label')" },
			hostDirectives: [Bind]
		}]
	}], () => [], {
		pButtonLabelPT: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pButtonLabelPT",
				required: false
			}]
		}],
		pButtonLabelUnstyled: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pButtonLabelUnstyled",
				required: false
			}]
		}]
	});
})();
var BUTTON_DIRECTIVE_INSTANCE = new InjectionToken("BUTTON_DIRECTIVE_INSTANCE");
var ButtonDirective = (_ButtonDirective = class ButtonDirective extends BaseComponent {
	constructor() {
		var _inject4;
		super();
		_defineProperty(this, "componentName", "Button");
		_defineProperty(this, "pButton", input(void 0, ...ngDevMode ? [{ debugName: "pButton" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "pButtonPT", input(...ngDevMode ? [void 0, { debugName: "pButtonPT" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "pButtonUnstyled", input(...ngDevMode ? [void 0, { debugName: "pButtonUnstyled" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "hostName", input("", ...ngDevMode ? [{ debugName: "hostName" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "text", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "text" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "plain", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "plain" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "raised", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "raised" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "size", input(...ngDevMode ? [void 0, { debugName: "size" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "outlined", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "outlined" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "link", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "link" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "rounded", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "rounded" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "fluid", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "fluid" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "variant", input(...ngDevMode ? [void 0, { debugName: "variant" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "iconOnly", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "iconOnly" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "loading", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "loading" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "severity", input(...ngDevMode ? [void 0, { debugName: "severity" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$pcButtonDirective", (_inject4 = inject(BUTTON_DIRECTIVE_INSTANCE, {
			optional: true,
			skipSelf: true
		})) !== null && _inject4 !== void 0 ? _inject4 : void 0);
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		_defineProperty(this, "pcFluid", inject(Fluid, {
			optional: true,
			host: true,
			skipSelf: true
		}));
		_defineProperty(this, "_componentStyle", inject(ButtonStyle));
		_defineProperty(this, "iconSignal", contentChild(ButtonIcon, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "iconSignal" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "labelSignal", contentChild(ButtonLabel, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "labelSignal" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "isIconOnly", computed(() => !!(!this.labelSignal() && this.iconSignal()), ...ngDevMode ? [{ debugName: "isIconOnly" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "styleClass", computed(() => {
			var _ref, _o$severity, _o$size, _o$variant, _ref2, _this$fluid2;
			if (this.$unstyled()) return "";
			const v = this.pButton();
			const o = typeof v === "object" && v !== null ? v : {};
			const stringSeverity = typeof v === "string" && v !== "" ? v : void 0;
			const severity = (_ref = (_o$severity = o.severity) !== null && _o$severity !== void 0 ? _o$severity : stringSeverity) !== null && _ref !== void 0 ? _ref : this.severity();
			const size = (_o$size = o.size) !== null && _o$size !== void 0 ? _o$size : this.size();
			const variant = (_o$variant = o.variant) !== null && _o$variant !== void 0 ? _o$variant : this.variant();
			const base = this.pcn("p-button", "p-component", {
				"p-button-icon-only": this.iconOnly() || o.iconOnly || this.isIconOnly(),
				"p-button-loading": this.loading(),
				"p-disabled": this.loading(),
				"p-button-text": this.text() || variant === "text" || o.text,
				"p-button-outlined": this.outlined() || variant === "outlined" || o.outlined,
				"p-button-link": this.link() || variant === "link" || o.link,
				"p-button-plain": this.plain() || o.plain,
				"p-button-raised": this.raised() || o.raised,
				"p-button-rounded": this.rounded() || o.rounded,
				"p-button-sm": size === "small",
				"p-button-lg": size === "large",
				"p-button-fluid": (_ref2 = (_this$fluid2 = this.fluid()) !== null && _this$fluid2 !== void 0 ? _this$fluid2 : o.fluid) !== null && _ref2 !== void 0 ? _ref2 : !!this.pcFluid,
				[`p-button-${severity}`]: !!severity
			});
			return o.styleClass ? `${base} ${o.styleClass}` : base;
		}, ...ngDevMode ? [{ debugName: "styleClass" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "hostStyle", computed(() => {
			var _style;
			const v = this.pButton();
			return (_style = (typeof v === "object" && v !== null ? v : {}).style) !== null && _style !== void 0 ? _style : null;
		}, ...ngDevMode ? [{ debugName: "hostStyle" }] : /* istanbul ignore next */ []));
		effect(() => {
			const pt = this.pButtonPT();
			if (pt) this.directivePT.set(pt);
		});
		effect(() => {
			const unstyled = this.pButtonUnstyled();
			if (unstyled !== void 0) this.directiveUnstyled.set(unstyled);
		});
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.ptm("root"));
	}
}, _defineProperty(_ButtonDirective, "ɵfac", function ButtonDirective_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _ButtonDirective)();
}), _defineProperty(_ButtonDirective, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _ButtonDirective,
	selectors: [[
		"",
		"pButton",
		""
	]],
	contentQueries: function ButtonDirective_ContentQueries(rf, ctx, dirIndex) {
		if (rf & 1) ɵɵcontentQuerySignal(dirIndex, ctx.iconSignal, ButtonIcon, 4)(dirIndex, ctx.labelSignal, ButtonLabel, 4);
		if (rf & 2) ɵɵqueryAdvance(2);
	},
	hostVars: 4,
	hostBindings: function ButtonDirective_HostBindings(rf, ctx) {
		if (rf & 2) {
			ɵɵstyleMap(ctx.hostStyle());
			ɵɵclassMap(ctx.styleClass());
		}
	},
	inputs: {
		pButton: [1, "pButton"],
		pButtonPT: [1, "pButtonPT"],
		pButtonUnstyled: [1, "pButtonUnstyled"],
		hostName: [1, "hostName"],
		text: [1, "text"],
		plain: [1, "plain"],
		raised: [1, "raised"],
		size: [1, "size"],
		outlined: [1, "outlined"],
		link: [1, "link"],
		rounded: [1, "rounded"],
		fluid: [1, "fluid"],
		variant: [1, "variant"],
		iconOnly: [1, "iconOnly"],
		loading: [1, "loading"],
		severity: [1, "severity"]
	},
	features: [
		ɵɵProvidersFeature([
			ButtonStyle,
			{
				provide: BUTTON_DIRECTIVE_INSTANCE,
				useExisting: _ButtonDirective
			},
			{
				provide: PARENT_INSTANCE,
				useExisting: _ButtonDirective
			}
		]),
		ɵɵHostDirectivesFeature([Bind, Ripple]),
		ɵɵInheritDefinitionFeature
	]
})), _ButtonDirective);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ButtonDirective, [{
		type: Directive,
		args: [{
			selector: "[pButton]",
			standalone: true,
			providers: [
				ButtonStyle,
				{
					provide: BUTTON_DIRECTIVE_INSTANCE,
					useExisting: ButtonDirective
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: ButtonDirective
				}
			],
			host: {
				"[class]": "styleClass()",
				"[style]": "hostStyle()"
			},
			hostDirectives: [Bind, Ripple]
		}]
	}], () => [], {
		pButton: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pButton",
				required: false
			}]
		}],
		pButtonPT: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pButtonPT",
				required: false
			}]
		}],
		pButtonUnstyled: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pButtonUnstyled",
				required: false
			}]
		}],
		hostName: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "hostName",
				required: false
			}]
		}],
		text: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "text",
				required: false
			}]
		}],
		plain: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "plain",
				required: false
			}]
		}],
		raised: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "raised",
				required: false
			}]
		}],
		size: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "size",
				required: false
			}]
		}],
		outlined: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "outlined",
				required: false
			}]
		}],
		link: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "link",
				required: false
			}]
		}],
		rounded: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "rounded",
				required: false
			}]
		}],
		fluid: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "fluid",
				required: false
			}]
		}],
		variant: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "variant",
				required: false
			}]
		}],
		iconOnly: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "iconOnly",
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
		severity: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "severity",
				required: false
			}]
		}],
		iconSignal: [{
			type: ContentChild,
			args: [forwardRef(() => ButtonIcon), {
				descendants: false,
				isSignal: true
			}]
		}],
		labelSignal: [{
			type: ContentChild,
			args: [forwardRef(() => ButtonLabel), {
				descendants: false,
				isSignal: true
			}]
		}]
	});
})();
var ButtonModule = (_ButtonModule = class ButtonModule {}, _defineProperty(_ButtonModule, "ɵfac", function ButtonModule_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _ButtonModule)();
}), _defineProperty(_ButtonModule, "ɵmod", /*@__PURE__*/ ɵɵdefineNgModule({
	type: _ButtonModule,
	imports: [
		ButtonDirective,
		Button,
		ButtonLabel,
		ButtonIcon
	],
	exports: [
		ButtonDirective,
		Button,
		ButtonLabel,
		ButtonIcon
	]
})), _defineProperty(_ButtonModule, "ɵinj", /*@__PURE__*/ ɵɵdefineInjector({ imports: [Button] })), _ButtonModule);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ButtonModule, [{
		type: NgModule,
		args: [{
			imports: [
				ButtonDirective,
				Button,
				ButtonLabel,
				ButtonIcon
			],
			exports: [
				ButtonDirective,
				Button,
				ButtonLabel,
				ButtonIcon
			]
		}]
	}], null, null);
})();
export { ButtonClasses as a, ButtonLabel as c, Button as i, ButtonModule as l, BUTTON_INSTANCE as n, ButtonDirective as o, BUTTON_LABEL_INSTANCE as r, ButtonIcon as s, BUTTON_ICON_INSTANCE as t, ButtonStyle as u };
