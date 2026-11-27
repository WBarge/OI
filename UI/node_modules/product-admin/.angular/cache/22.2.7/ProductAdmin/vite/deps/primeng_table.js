import { $n as Output, A as contentChild, Aa as ɵɵcontrol, Ac as Injector, Al as ɵɵdefineInjectable, Ao as ɵɵgetCurrentView, Bl as ɵɵrestoreView, Bs as ɵɵstoreLet, Bt as computed, Co as ɵɵelementStart, Cs as ɵɵreference, Da as ɵɵconditionalCreate, Dr as ViewEncapsulation, Ds as ɵɵrepeaterTrackByIndex, En as ElementRef, Fn as Injectable, Gs as ɵɵtemplate, Hs as ɵɵstyleProp, In as Input, Js as ɵɵtextInterpolate, Ks as ɵɵtemplateRefExtractor, Ma as ɵɵdeclareLet, O as booleanAttribute, Qo as ɵɵlistener, Rl as ɵɵnamespaceSVG, S as ViewChild, Sa as ɵɵclassMap, So as ɵɵelementEnd, Ss as ɵɵreadContextLet, Ta as ɵɵconditional, Tl as signal, Ts as ɵɵrepeaterCreate, Vs as ɵɵstyleMap, Wi as setClassMetadata, X as input, Ys as ɵɵtextInterpolate1, _s as ɵɵpureFunction7, an as ChangeDetectionStrategy, ao as ɵɵdefineNgModule, at as output, bo as ɵɵelementContainerEnd, bs as ɵɵqueryAdvance, ca as ɵɵInheritDefinitionFeature, cc as ɵɵtwoWayProperty, cn as Component, da as ɵɵadvance, dc as ɵɵviewQuerySignal, dl as inject, ds as ɵɵpureFunction1, es as ɵɵnextContext, fa as ɵɵanimateEnter, fs as ɵɵpureFunction2, go as ɵɵdomProperty, gs as ɵɵpureFunction6, gt as viewChild, hs as ɵɵpureFunction5, i as ContentChild, il as effect, io as ɵɵdefineDirective, ja as ɵɵcontrolCreate, jl as ɵɵdefineInjector, jo as ɵɵgetInheritedFactory, ka as ɵɵcontentQuerySignal, kc as InjectionToken, kn as HostListener, lo as ɵɵdomElement, ls as ɵɵproperty, ma as ɵɵanimateLeave, ms as ɵɵpureFunction4, nt as model, oc as ɵɵtwoWayBindingSet, ol as forwardRef, qn as NgModule, qs as ɵɵtext, qt as untracked, ro as ɵɵdefineComponent, rt as numberAttribute, sa as ɵɵHostDirectivesFeature, sc as ɵɵtwoWayListener, ua as ɵɵProvidersFeature, us as ɵɵpureFunction0, vo as ɵɵelement, wn as Directive, ws as ɵɵrepeater, xo as ɵɵelementContainerStart, ya as ɵɵattribute, yo as ɵɵelementContainer, zl as ɵɵresetView } from "./core-BVpAqhZc.js";
import { s as BaseStyle } from "./primeng-config-EnOVMCIx.js";
import { Wn as Subject } from "./zipWith-C1pHxpjx.js";
import { Y as NgTemplateOutlet, u as isPlatformBrowser } from "./common-CYN6T7fr.js";
import { FormsModule, NG_VALUE_ACCESSOR, NgControl, NgControlStatus, NgModel, RequiredValidator } from "./@angular_forms.js";
import { t as CoreIcon } from "./primeicons-angular-core-ei4boJ1b.js";
import { n as _objectSpread2, r as _defineProperty } from "./asyncToGenerator-CE9zIWF7.js";
import { Ct as nt, Lt as z, Tt as ot, U as C$3, W as Ct, mt as be, vt as it, wt as oe } from "./dist-BnkFXv39.js";
import { t as Spinner } from "./primeicons-angular-spinner-BPdbYR9x.js";
import { g as b, m as _ } from "./dist-D971aPsi.js";
import { FilterMatchMode, FilterOperator, FilterService, OverlayService, SharedModule, TranslationKeys } from "./primeng_api.js";
import { a as getEventTarget, i as DomHandler, n as PARENT_INSTANCE, o as getShadowRoot, r as ConnectedOverlayScrollHandler, t as BaseComponent } from "./primeng-basecomponent-DFIxl5Fy.js";
import { Bind, BindModule } from "./primeng_bind.js";
import { t as AngleRight } from "./primeicons-angular-angle-right-D9I0UzzS.js";
import { i as InputNumberModule, n as InputNumber } from "./primeng-inputnumber-DDmXI3d0.js";
import { t as Ripple } from "./primeng-ripple-CKze7UFo.js";
import { i as SelectModule, n as Select } from "./primeng-select-BCavpc-T.js";
import { Scroller, ScrollerModule } from "./primeng_scroller.js";
import { o as zindexutils_default, t as ObjectUtils } from "./primeng-utils-D5gG-ZJT.js";
import { t as takeUntilDestroyed } from "./rxjs-interop-CCtdMojc.js";
import { n as BadgeModule, t as Badge } from "./primeng-badge-byMXATm0.js";
import { t as AutoFocus } from "./primeng-autofocus-BoqLEI9i.js";
import { n as BaseEditableHolder } from "./primeng-baseinput-C1r5r9U-.js";
import { t as Check } from "./primeicons-angular-check-CIQ67GgB.js";
import { n as Minus, t as Plus } from "./primeicons-angular-plus-C8MH2ch9.js";
import { t as Trash } from "./primeicons-angular-trash-xnpzWRUE.js";
import { l as ButtonModule, o as ButtonDirective } from "./primeng-button-BKn8zx5C.js";
import { i as DatePickerModule, n as DatePicker } from "./primeng-datepicker-CarKZ4ON.js";
import { r as InputTextModule, t as InputText } from "./primeng-inputtext-ByLrtQLp.js";
import { n as MotionDirective, r as MotionModule } from "./primeng-motion-Dw02ysjU.js";
// ../node_modules/@primeuix/styles/dist/datatable/index.mjs
var style$4 = "\n    .p-datatable {\n        position: relative;\n        display: block;\n    }\n\n    .p-datatable-table {\n        border-spacing: 0;\n        border-collapse: separate;\n        width: 100%;\n    }\n\n    .p-datatable-scrollable > .p-datatable-table-container {\n        position: relative;\n    }\n\n    .p-datatable-scrollable-table > .p-datatable-thead {\n        inset-block-start: 0;\n        z-index: 1;\n    }\n\n    .p-datatable-scrollable-table > .p-datatable-frozen-tbody {\n        position: sticky;\n        z-index: 1;\n    }\n\n    .p-datatable-scrollable-table > .p-datatable-tfoot {\n        inset-block-end: 0;\n        z-index: 1;\n    }\n\n    .p-datatable-scrollable .p-datatable-frozen-column {\n        position: sticky;\n    }\n\n    .p-datatable-scrollable th.p-datatable-frozen-column {\n        z-index: 1;\n    }\n\n    .p-datatable-scrollable td.p-datatable-frozen-column {\n        background: inherit;\n    }\n\n    .p-datatable-scrollable > .p-datatable-table-container > .p-datatable-table > .p-datatable-thead,\n    .p-datatable-scrollable > .p-datatable-table-container > .p-virtualscroller > .p-datatable-table > .p-datatable-thead {\n        background: dt('datatable.header.cell.background');\n    }\n\n    .p-datatable-scrollable > .p-datatable-table-container > .p-datatable-table > .p-datatable-tfoot,\n    .p-datatable-scrollable > .p-datatable-table-container > .p-virtualscroller > .p-datatable-table > .p-datatable-tfoot {\n        background: dt('datatable.footer.cell.background');\n    }\n\n    .p-datatable-flex-scrollable {\n        display: flex;\n        flex-direction: column;\n        height: 100%;\n    }\n\n    .p-datatable-flex-scrollable > .p-datatable-table-container {\n        display: flex;\n        flex-direction: column;\n        flex: 1;\n        height: 100%;\n    }\n\n    .p-datatable-scrollable-table > .p-datatable-tbody > .p-datatable-row-group-header {\n        position: sticky;\n        z-index: 1;\n    }\n\n    .p-datatable-resizable-table > .p-datatable-thead > tr > th,\n    .p-datatable-resizable-table > .p-datatable-tfoot > tr > td,\n    .p-datatable-resizable-table > .p-datatable-tbody > tr > td {\n        overflow: hidden;\n        white-space: nowrap;\n    }\n\n    .p-datatable-resizable-table > .p-datatable-thead > tr > th.p-datatable-resizable-column:not(.p-datatable-frozen-column) {\n        background-clip: padding-box;\n        position: relative;\n    }\n\n    .p-datatable-resizable-table-fit > .p-datatable-thead > tr > th.p-datatable-resizable-column:last-child .p-datatable-column-resizer {\n        display: none;\n    }\n\n    .p-datatable-column-resizer {\n        display: block;\n        position: absolute;\n        inset-block-start: 0;\n        inset-inline-end: 0;\n        margin: 0;\n        width: dt('datatable.column.resizer.width');\n        height: 100%;\n        padding: 0;\n        cursor: col-resize;\n        border: 1px solid transparent;\n    }\n\n    .p-datatable-column-header-content {\n        display: flex;\n        align-items: center;\n        gap: dt('datatable.header.cell.gap');\n    }\n\n    .p-datatable-column-resize-indicator {\n        width: dt('datatable.resize.indicator.width');\n        position: absolute;\n        z-index: 10;\n        display: none;\n        background: dt('datatable.resize.indicator.color');\n    }\n\n    .p-datatable-row-reorder-indicator-up,\n    .p-datatable-row-reorder-indicator-down {\n        position: absolute;\n        display: none;\n    }\n\n    .p-datatable-reorderable-column,\n    .p-datatable-reorderable-row-handle {\n        cursor: move;\n    }\n\n    .p-datatable-mask {\n        position: absolute;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        z-index: 2;\n    }\n\n    .p-datatable-inline-filter {\n        display: flex;\n        align-items: center;\n        width: 100%;\n        gap: dt('datatable.filter.inline.gap');\n    }\n\n    .p-datatable-inline-filter .p-datatable-filter-element-container {\n        flex: 1 1 auto;\n        width: 1%;\n    }\n\n    .p-datatable-filter-overlay {\n        background: dt('datatable.filter.overlay.select.background');\n        color: dt('datatable.filter.overlay.select.color');\n        border: 1px solid dt('datatable.filter.overlay.select.border.color');\n        border-radius: dt('datatable.filter.overlay.select.border.radius');\n        box-shadow: dt('datatable.filter.overlay.select.shadow');\n        min-width: 12.5rem;\n    }\n\n    .p-datatable-filter-constraint-list {\n        margin: 0;\n        list-style: none;\n        display: flex;\n        flex-direction: column;\n        padding: dt('datatable.filter.constraint.list.padding');\n        gap: dt('datatable.filter.constraint.list.gap');\n    }\n\n    .p-datatable-filter-constraint {\n        padding: dt('datatable.filter.constraint.padding');\n        color: dt('datatable.filter.constraint.color');\n        border-radius: dt('datatable.filter.constraint.border.radius');\n        cursor: pointer;\n        transition:\n            background dt('datatable.transition.duration'),\n            color dt('datatable.transition.duration'),\n            border-color dt('datatable.transition.duration'),\n            box-shadow dt('datatable.transition.duration');\n    }\n\n    .p-datatable-filter-constraint-selected {\n        background: dt('datatable.filter.constraint.selected.background');\n        color: dt('datatable.filter.constraint.selected.color');\n    }\n\n    .p-datatable-filter-constraint:not(.p-datatable-filter-constraint-selected):not(.p-disabled):hover {\n        background: dt('datatable.filter.constraint.focus.background');\n        color: dt('datatable.filter.constraint.focus.color');\n    }\n\n    .p-datatable-filter-constraint:focus-visible {\n        outline: 0 none;\n        background: dt('datatable.filter.constraint.focus.background');\n        color: dt('datatable.filter.constraint.focus.color');\n    }\n\n    .p-datatable-filter-constraint-selected:focus-visible {\n        outline: 0 none;\n        background: dt('datatable.filter.constraint.selected.focus.background');\n        color: dt('datatable.filter.constraint.selected.focus.color');\n    }\n\n    .p-datatable-filter-constraint-separator {\n        border-block-start: 1px solid dt('datatable.filter.constraint.separator.border.color');\n    }\n\n    .p-datatable-popover-filter {\n        display: inline-flex;\n        margin-inline-start: auto;\n    }\n\n    .p-datatable-filter-overlay-popover {\n        background: dt('datatable.filter.overlay.popover.background');\n        color: dt('datatable.filter.overlay.popover.color');\n        border: 1px solid dt('datatable.filter.overlay.popover.border.color');\n        border-radius: dt('datatable.filter.overlay.popover.border.radius');\n        box-shadow: dt('datatable.filter.overlay.popover.shadow');\n        min-width: 12.5rem;\n        padding: dt('datatable.filter.overlay.popover.padding');\n        display: flex;\n        flex-direction: column;\n        gap: dt('datatable.filter.overlay.popover.gap');\n    }\n\n    .p-datatable-filter-operator-dropdown {\n        width: 100%;\n    }\n\n    .p-datatable-filter-rule-list,\n    .p-datatable-filter-rule {\n        display: flex;\n        flex-direction: column;\n        gap: dt('datatable.filter.overlay.popover.gap');\n    }\n\n    .p-datatable-filter-rule {\n        border-block-end: 1px solid dt('datatable.filter.rule.border.color');\n        padding-bottom: dt('datatable.filter.overlay.popover.gap');\n    }\n\n    .p-datatable-filter-rule:last-child {\n        border-block-end: 0 none;\n        padding-bottom: 0;\n    }\n\n    .p-datatable-filter-add-rule-button {\n        width: 100%;\n    }\n\n    .p-datatable-filter-remove-rule-button {\n        width: 100%;\n    }\n\n    .p-datatable-filter-buttonbar {\n        padding: 0;\n        display: flex;\n        align-items: center;\n        justify-content: space-between;\n    }\n\n    .p-datatable-virtualscroller-spacer {\n        display: flex;\n    }\n\n    .p-datatable .p-virtualscroller .p-virtualscroller-loading {\n        transform: none !important;\n        min-height: 0;\n        position: sticky;\n        inset-block-start: 0;\n        inset-inline-start: 0;\n    }\n\n    .p-datatable-paginator-top {\n        border-color: dt('datatable.paginator.top.border.color');\n        border-style: solid;\n        border-width: dt('datatable.paginator.top.border.width');\n    }\n\n    .p-datatable-paginator-bottom {\n        border-color: dt('datatable.paginator.bottom.border.color');\n        border-style: solid;\n        border-width: dt('datatable.paginator.bottom.border.width');\n    }\n\n    .p-datatable-header {\n        background: dt('datatable.header.background');\n        color: dt('datatable.header.color');\n        border-color: dt('datatable.header.border.color');\n        border-style: solid;\n        border-width: dt('datatable.header.border.width');\n        padding: dt('datatable.header.padding');\n    }\n\n    .p-datatable-footer {\n        background: dt('datatable.footer.background');\n        color: dt('datatable.footer.color');\n        border-color: dt('datatable.footer.border.color');\n        border-style: solid;\n        border-width: dt('datatable.footer.border.width');\n        padding: dt('datatable.footer.padding');\n    }\n\n    .p-datatable-header-cell {\n        padding: dt('datatable.header.cell.padding');\n        background: dt('datatable.header.cell.background');\n        border-color: dt('datatable.header.cell.border.color');\n        border-style: solid;\n        border-width: 0 0 1px 0;\n        color: dt('datatable.header.cell.color');\n        font-weight: normal;\n        text-align: start;\n        transition:\n            background dt('datatable.transition.duration'),\n            color dt('datatable.transition.duration'),\n            border-color dt('datatable.transition.duration'),\n            outline-color dt('datatable.transition.duration'),\n            box-shadow dt('datatable.transition.duration');\n    }\n\n    .p-datatable-column-title {\n        font-weight: dt('datatable.column.title.font.weight');\n        font-size: dt('datatable.column.title.font.size');\n    }\n\n    .p-datatable-tbody > tr {\n        outline-color: transparent;\n        background: dt('datatable.row.background');\n        color: dt('datatable.row.color');\n        transition:\n            background dt('datatable.transition.duration'),\n            color dt('datatable.transition.duration'),\n            border-color dt('datatable.transition.duration'),\n            outline-color dt('datatable.transition.duration'),\n            box-shadow dt('datatable.transition.duration');\n    }\n\n    .p-datatable-tbody > tr > td {\n        text-align: start;\n        border-color: dt('datatable.body.cell.border.color');\n        border-style: solid;\n        border-width: 0 0 1px 0;\n        padding: dt('datatable.body.cell.padding');\n        font-weight: dt('datatable.body.cell.font.weight');\n        font-size: dt('datatable.body.cell.font.size');\n    }\n\n    .p-datatable-hoverable .p-datatable-tbody > tr:not(.p-datatable-row-selected):hover {\n        background: dt('datatable.row.hover.background');\n        color: dt('datatable.row.hover.color');\n    }\n\n    .p-datatable-tbody > tr.p-datatable-row-selected {\n        background: dt('datatable.row.selected.background');\n        color: dt('datatable.row.selected.color');\n    }\n\n    .p-datatable-tbody > tr:has(+ .p-datatable-row-selected) > td {\n        border-block-end-color: dt('datatable.body.cell.selected.border.color');\n    }\n\n    .p-datatable-tbody > tr.p-datatable-row-selected > td {\n        border-block-end-color: dt('datatable.body.cell.selected.border.color');\n    }\n\n    .p-datatable-tbody > tr:focus-visible,\n    .p-datatable-tbody > tr.p-datatable-contextmenu-row-selected {\n        box-shadow: dt('datatable.row.focus.ring.shadow');\n        outline: dt('datatable.row.focus.ring.width') dt('datatable.row.focus.ring.style') dt('datatable.row.focus.ring.color');\n        outline-offset: dt('datatable.row.focus.ring.offset');\n    }\n\n    .p-datatable-tfoot > tr > td {\n        text-align: start;\n        padding: dt('datatable.footer.cell.padding');\n        border-color: dt('datatable.footer.cell.border.color');\n        border-style: solid;\n        border-width: 0 0 1px 0;\n        color: dt('datatable.footer.cell.color');\n        background: dt('datatable.footer.cell.background');\n    }\n\n    .p-datatable-column-footer {\n        font-weight: dt('datatable.column.footer.font.weight');\n        font-size: dt('datatable.column.footer.font.size');\n    }\n\n    .p-datatable-sortable-column {\n        cursor: pointer;\n        user-select: none;\n        outline-color: transparent;\n    }\n\n    .p-datatable-column-title,\n    .p-datatable-sort-icon,\n    .p-datatable-sort-badge {\n        vertical-align: middle;\n    }\n\n    .p-datatable-sort-icon {\n        color: dt('datatable.sort.icon.color');\n        font-size: dt('datatable.sort.icon.size');\n        width: dt('datatable.sort.icon.size');\n        height: dt('datatable.sort.icon.size');\n        transition: color dt('datatable.transition.duration');\n    }\n\n    .p-datatable-sortable-column:not(.p-datatable-column-sorted):hover {\n        background: dt('datatable.header.cell.hover.background');\n        color: dt('datatable.header.cell.hover.color');\n    }\n\n    .p-datatable-sortable-column:not(.p-datatable-column-sorted):hover .p-datatable-sort-icon {\n        color: dt('datatable.sort.icon.hover.color');\n    }\n\n    .p-datatable-column-sorted {\n        background: dt('datatable.header.cell.selected.background');\n        color: dt('datatable.header.cell.selected.color');\n    }\n\n    .p-datatable-column-sorted .p-datatable-sort-icon {\n        color: dt('datatable.header.cell.selected.color');\n    }\n\n    .p-datatable-sortable-column:focus-visible {\n        box-shadow: dt('datatable.header.cell.focus.ring.shadow');\n        outline: dt('datatable.header.cell.focus.ring.width') dt('datatable.header.cell.focus.ring.style') dt('datatable.header.cell.focus.ring.color');\n        outline-offset: dt('datatable.header.cell.focus.ring.offset');\n    }\n\n    .p-datatable-hoverable .p-datatable-selectable-row {\n        cursor: pointer;\n    }\n\n    .p-datatable-tbody > tr.p-datatable-dragpoint-top > td {\n        box-shadow: inset 0 2px 0 0 dt('datatable.drop.point.color');\n    }\n\n    .p-datatable-tbody > tr.p-datatable-dragpoint-bottom > td {\n        box-shadow: inset 0 -2px 0 0 dt('datatable.drop.point.color');\n    }\n\n    .p-datatable-loading-icon {\n        font-size: dt('datatable.loading.icon.size');\n        width: dt('datatable.loading.icon.size');\n        height: dt('datatable.loading.icon.size');\n    }\n\n    .p-datatable-gridlines .p-datatable-header {\n        border-width: 1px 1px 0 1px;\n    }\n\n    .p-datatable-gridlines .p-datatable-footer {\n        border-width: 0 1px 1px 1px;\n    }\n\n    .p-datatable-gridlines .p-datatable-paginator-top {\n        border-width: 1px 1px 0 1px;\n    }\n\n    .p-datatable-gridlines .p-datatable-paginator-bottom {\n        border-width: 0 1px 1px 1px;\n    }\n\n    .p-datatable-gridlines .p-datatable-thead > tr > th {\n        border-width: 1px 0 1px 1px;\n    }\n\n    .p-datatable-gridlines .p-datatable-thead > tr > th:last-child {\n        border-width: 1px;\n    }\n\n    .p-datatable-gridlines .p-datatable-thead > tr:not(:first-child) > th {\n        border-block-start-width: 0;\n    }\n\n    .p-datatable-gridlines .p-datatable-tfoot > tr:not(:first-child) > td {\n        border-block-start-width: 0;\n    }\n\n    .p-datatable-gridlines .p-datatable-tbody > tr > td {\n        border-width: 1px 0 0 1px;\n    }\n\n    .p-datatable-gridlines .p-datatable-tbody > tr > td:last-child {\n        border-width: 1px 1px 0 1px;\n    }\n\n    .p-datatable-gridlines .p-datatable-tbody > tr:last-child > td {\n        border-width: 1px 0 1px 1px;\n    }\n\n    .p-datatable-gridlines .p-datatable-tbody > tr:last-child > td:last-child {\n        border-width: 1px;\n    }\n\n    .p-datatable-gridlines .p-datatable-tfoot > tr > td {\n        border-width: 1px 0 1px 1px;\n    }\n\n    .p-datatable-gridlines .p-datatable-tfoot > tr > td:last-child {\n        border-width: 1px 1px 1px 1px;\n    }\n\n    .p-datatable.p-datatable-gridlines .p-datatable-thead + .p-datatable-tfoot > tr > td {\n        border-width: 0 0 1px 1px;\n    }\n\n    .p-datatable.p-datatable-gridlines .p-datatable-thead + .p-datatable-tfoot > tr > td:last-child {\n        border-width: 0 1px 1px 1px;\n    }\n\n    .p-datatable.p-datatable-gridlines:has(.p-datatable-thead):has(.p-datatable-tbody) .p-datatable-tbody > tr > td {\n        border-width: 0 0 1px 1px;\n    }\n\n    .p-datatable.p-datatable-gridlines:has(.p-datatable-thead):has(.p-datatable-tbody) .p-datatable-tbody > tr > td:last-child {\n        border-width: 0 1px 1px 1px;\n    }\n\n    .p-datatable.p-datatable-gridlines:has(.p-datatable-tbody):has(.p-datatable-tfoot) .p-datatable-tbody > tr:last-child > td {\n        border-width: 0 0 0 1px;\n    }\n\n    .p-datatable.p-datatable-gridlines:has(.p-datatable-tbody):has(.p-datatable-tfoot) .p-datatable-tbody > tr:last-child > td:last-child {\n        border-width: 0 1px 0 1px;\n    }\n\n    .p-datatable.p-datatable-striped .p-datatable-tbody > tr.p-row-odd {\n        background: dt('datatable.row.striped.background');\n    }\n\n    .p-datatable.p-datatable-striped .p-datatable-tbody > tr.p-row-odd.p-datatable-row-selected {\n        background: dt('datatable.row.selected.background');\n        color: dt('datatable.row.selected.color');\n    }\n\n    .p-datatable-striped.p-datatable-hoverable .p-datatable-tbody > tr:not(.p-datatable-row-selected):hover {\n        background: dt('datatable.row.hover.background');\n        color: dt('datatable.row.hover.color');\n    }\n\n    .p-datatable.p-datatable-sm .p-datatable-header {\n        padding: dt('datatable.header.sm.padding');\n    }\n\n    .p-datatable.p-datatable-sm .p-datatable-thead > tr > th {\n        padding: dt('datatable.header.cell.sm.padding');\n    }\n\n    .p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {\n        padding: dt('datatable.body.cell.sm.padding');\n    }\n\n    .p-datatable.p-datatable-sm .p-datatable-tfoot > tr > td {\n        padding: dt('datatable.footer.cell.sm.padding');\n    }\n\n    .p-datatable.p-datatable-sm .p-datatable-footer {\n        padding: dt('datatable.footer.sm.padding');\n    }\n\n    .p-datatable.p-datatable-lg .p-datatable-header {\n        padding: dt('datatable.header.lg.padding');\n    }\n\n    .p-datatable.p-datatable-lg .p-datatable-thead > tr > th {\n        padding: dt('datatable.header.cell.lg.padding');\n    }\n\n    .p-datatable.p-datatable-lg .p-datatable-tbody > tr > td {\n        padding: dt('datatable.body.cell.lg.padding');\n    }\n\n    .p-datatable.p-datatable-lg .p-datatable-tfoot > tr > td {\n        padding: dt('datatable.footer.cell.lg.padding');\n    }\n\n    .p-datatable.p-datatable-lg .p-datatable-footer {\n        padding: dt('datatable.footer.lg.padding');\n    }\n\n    .p-datatable-row-toggle-button {\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        overflow: hidden;\n        position: relative;\n        width: dt('datatable.row.toggle.button.size');\n        height: dt('datatable.row.toggle.button.size');\n        color: dt('datatable.row.toggle.button.color');\n        border: 0 none;\n        background: transparent;\n        cursor: pointer;\n        border-radius: dt('datatable.row.toggle.button.border.radius');\n        transition:\n            background dt('datatable.transition.duration'),\n            color dt('datatable.transition.duration'),\n            border-color dt('datatable.transition.duration'),\n            outline-color dt('datatable.transition.duration'),\n            box-shadow dt('datatable.transition.duration');\n        outline-color: transparent;\n        user-select: none;\n    }\n\n    .p-datatable-row-toggle-button:enabled:hover {\n        color: dt('datatable.row.toggle.button.hover.color');\n        background: dt('datatable.row.toggle.button.hover.background');\n    }\n\n    .p-datatable-tbody > tr.p-datatable-row-selected .p-datatable-row-toggle-button:hover {\n        background: dt('datatable.row.toggle.button.selected.hover.background');\n        color: dt('datatable.row.toggle.button.selected.hover.color');\n    }\n\n    .p-datatable-row-toggle-button:focus-visible {\n        box-shadow: dt('datatable.row.toggle.button.focus.ring.shadow');\n        outline: dt('datatable.row.toggle.button.focus.ring.width') dt('datatable.row.toggle.button.focus.ring.style') dt('datatable.row.toggle.button.focus.ring.color');\n        outline-offset: dt('datatable.row.toggle.button.focus.ring.offset');\n    }\n\n    .p-datatable-row-toggle-icon:dir(rtl) {\n        transform: rotate(180deg);\n    }\n";
// ../node_modules/@primeicons/core/dist/esm/icons/arrow-down.mjs
var o = {
	name: "arrow-down",
	meta: { tags: [
		"arrow-down",
		"download",
		"decrease",
		"down",
		"lower"
	] },
	svg: {
		xmlns: "http://www.w3.org/2000/svg",
		width: 20,
		height: 20,
		viewBox: "0 0 20 20",
		fill: "none"
	},
	nodes: [["path", {
		d: "M10 2.25C10.4142 2.25003 10.75 2.58581 10.75 3V15.1895L15.4698 10.4697C15.7627 10.1769 16.2374 10.1769 16.5303 10.4697C16.8232 10.7626 16.8232 11.2374 16.5303 11.5303L10.5303 17.5303C10.2374 17.8232 9.76264 17.8232 9.46974 17.5303L3.46973 11.5303C3.17684 11.2374 3.17684 10.7626 3.46973 10.4697C3.76263 10.1769 4.2374 10.1769 4.53028 10.4697L9.25002 15.1895V3C9.25002 2.58579 9.5858 2.25 10 2.25Z",
		fill: "currentColor",
		key: "1tm2qt"
	}]]
};
// ../node_modules/@primeicons/angular/fesm2022/primeicons-angular-arrow-down.mjs
var _ArrowDown;
var ArrowDown = class extends CoreIcon {
	constructor() {
		super();
		this._icon = o;
	}
};
_ArrowDown = ArrowDown;
_defineProperty(ArrowDown, "ɵfac", function ArrowDown_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _ArrowDown)();
});
_defineProperty(ArrowDown, "ɵcmp", (function() {
	const _forTrack0 = ($index, $item) => $item[1]["key"] || $index;
	function ArrowDown_For_1_Case_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "path");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("d", node_r1[1]["d"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("fill-rule", node_r1[1]["fillRule"])("clip-rule", node_r1[1]["clipRule"])("stroke", node_r1[1]["stroke"])("stroke-width", node_r1[1]["strokeWidth"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function ArrowDown_For_1_Case_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "circle");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("r", node_r1[1]["r"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function ArrowDown_For_1_Case_2_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "rect");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x", node_r1[1]["x"])("y", node_r1[1]["y"])("width", node_r1[1]["width"])("height", node_r1[1]["height"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function ArrowDown_For_1_Case_3_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "line");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x1", node_r1[1]["x1"])("y1", node_r1[1]["y1"])("x2", node_r1[1]["x2"])("y2", node_r1[1]["y2"])("stroke", node_r1[1]["stroke"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function ArrowDown_For_1_Case_4_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polyline");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function ArrowDown_For_1_Case_5_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polygon");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function ArrowDown_For_1_Case_6_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "ellipse");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function ArrowDown_For_1_Template(rf, ctx) {
		if (rf & 1) ɵɵconditionalCreate(0, ArrowDown_For_1_Case_0_Template, 1, 9, "path")(1, ArrowDown_For_1_Case_1_Template, 1, 6, "circle")(2, ArrowDown_For_1_Case_2_Template, 1, 9, "rect")(3, ArrowDown_For_1_Case_3_Template, 1, 7, "line")(4, ArrowDown_For_1_Case_4_Template, 1, 4, "polyline")(5, ArrowDown_For_1_Case_5_Template, 1, 4, "polygon")(6, ArrowDown_For_1_Case_6_Template, 1, 7, "ellipse");
		if (rf & 2) {
			let tmp_10_0 = void 0;
			const node_r1 = ctx.$implicit;
			ɵɵconditional((tmp_10_0 = node_r1[0]) === "path" ? 0 : tmp_10_0 === "circle" ? 1 : tmp_10_0 === "rect" ? 2 : tmp_10_0 === "line" ? 3 : tmp_10_0 === "polyline" ? 4 : tmp_10_0 === "polygon" ? 5 : tmp_10_0 === "ellipse" ? 6 : -1);
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _ArrowDown,
		selectors: [[
			"svg",
			"data-p-icon",
			"arrow-down"
		]],
		features: [ɵɵInheritDefinitionFeature],
		decls: 2,
		vars: 0,
		template: function ArrowDown_Template(rf, ctx) {
			if (rf & 1) ɵɵrepeaterCreate(0, ArrowDown_For_1_Template, 7, 1, null, null, _forTrack0);
			if (rf & 2) ɵɵrepeater(ctx.iconNodes());
		},
		encapsulation: 2,
		changeDetection: 1
	});
})());
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ArrowDown, [{
		type: Component,
		args: [{
			selector: "svg[data-p-icon=\"arrow-down\"]",
			standalone: true,
			template: "\n        @for (node of iconNodes(); track node[1]['key'] || $index) {\n            @switch (node[0]) {\n                @case ('path') {\n                    <svg:path\n                        [attr.d]=\"node[1]['d']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.fill-rule]=\"node[1]['fillRule']\"\n                        [attr.clip-rule]=\"node[1]['clipRule']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-width]=\"node[1]['strokeWidth']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('circle') {\n                    <svg:circle\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.r]=\"node[1]['r']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('rect') {\n                    <svg:rect\n                        [attr.x]=\"node[1]['x']\"\n                        [attr.y]=\"node[1]['y']\"\n                        [attr.width]=\"node[1]['width']\"\n                        [attr.height]=\"node[1]['height']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('line') {\n                    <svg:line\n                        [attr.x1]=\"node[1]['x1']\"\n                        [attr.y1]=\"node[1]['y1']\"\n                        [attr.x2]=\"node[1]['x2']\"\n                        [attr.y2]=\"node[1]['y2']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polyline') {\n                    <svg:polyline\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polygon') {\n                    <svg:polygon\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('ellipse') {\n                    <svg:ellipse\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n            }\n        }\n"
		}]
	}], () => [], null);
})();
// ../node_modules/@primeicons/core/dist/esm/icons/arrow-up.mjs
var e$5 = {
	name: "arrow-up",
	meta: { tags: [
		"arrow-up",
		"upload",
		"increase",
		"up",
		"elevate"
	] },
	svg: {
		xmlns: "http://www.w3.org/2000/svg",
		width: 20,
		height: 20,
		viewBox: "0 0 20 20",
		fill: "none"
	},
	nodes: [["path", {
		d: "M9.52638 2.41791C9.82095 2.17769 10.2557 2.19512 10.5303 2.46967L16.5303 8.46969C16.8232 8.76256 16.8231 9.23734 16.5303 9.53024C16.2374 9.82314 15.7627 9.82314 15.4698 9.53024L10.75 4.8105V17C10.75 17.4142 10.4142 17.75 10 17.75C9.5858 17.75 9.25002 17.4142 9.25002 17V4.8105L4.53027 9.53024C4.23737 9.82314 3.76261 9.82314 3.46972 9.53024C3.17685 9.23735 3.17683 8.76258 3.46972 8.46969L9.46974 2.46967L9.52638 2.41791Z",
		fill: "currentColor",
		key: "s4tw6r"
	}]]
};
// ../node_modules/@primeicons/angular/fesm2022/primeicons-angular-arrow-up.mjs
var _ArrowUp;
var ArrowUp = class extends CoreIcon {
	constructor() {
		super();
		this._icon = e$5;
	}
};
_ArrowUp = ArrowUp;
_defineProperty(ArrowUp, "ɵfac", function ArrowUp_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _ArrowUp)();
});
_defineProperty(ArrowUp, "ɵcmp", (function() {
	const _forTrack0 = ($index, $item) => $item[1]["key"] || $index;
	function ArrowUp_For_1_Case_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "path");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("d", node_r1[1]["d"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("fill-rule", node_r1[1]["fillRule"])("clip-rule", node_r1[1]["clipRule"])("stroke", node_r1[1]["stroke"])("stroke-width", node_r1[1]["strokeWidth"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function ArrowUp_For_1_Case_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "circle");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("r", node_r1[1]["r"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function ArrowUp_For_1_Case_2_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "rect");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x", node_r1[1]["x"])("y", node_r1[1]["y"])("width", node_r1[1]["width"])("height", node_r1[1]["height"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function ArrowUp_For_1_Case_3_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "line");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x1", node_r1[1]["x1"])("y1", node_r1[1]["y1"])("x2", node_r1[1]["x2"])("y2", node_r1[1]["y2"])("stroke", node_r1[1]["stroke"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function ArrowUp_For_1_Case_4_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polyline");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function ArrowUp_For_1_Case_5_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polygon");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function ArrowUp_For_1_Case_6_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "ellipse");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function ArrowUp_For_1_Template(rf, ctx) {
		if (rf & 1) ɵɵconditionalCreate(0, ArrowUp_For_1_Case_0_Template, 1, 9, "path")(1, ArrowUp_For_1_Case_1_Template, 1, 6, "circle")(2, ArrowUp_For_1_Case_2_Template, 1, 9, "rect")(3, ArrowUp_For_1_Case_3_Template, 1, 7, "line")(4, ArrowUp_For_1_Case_4_Template, 1, 4, "polyline")(5, ArrowUp_For_1_Case_5_Template, 1, 4, "polygon")(6, ArrowUp_For_1_Case_6_Template, 1, 7, "ellipse");
		if (rf & 2) {
			let tmp_10_0 = void 0;
			const node_r1 = ctx.$implicit;
			ɵɵconditional((tmp_10_0 = node_r1[0]) === "path" ? 0 : tmp_10_0 === "circle" ? 1 : tmp_10_0 === "rect" ? 2 : tmp_10_0 === "line" ? 3 : tmp_10_0 === "polyline" ? 4 : tmp_10_0 === "polygon" ? 5 : tmp_10_0 === "ellipse" ? 6 : -1);
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _ArrowUp,
		selectors: [[
			"svg",
			"data-p-icon",
			"arrow-up"
		]],
		features: [ɵɵInheritDefinitionFeature],
		decls: 2,
		vars: 0,
		template: function ArrowUp_Template(rf, ctx) {
			if (rf & 1) ɵɵrepeaterCreate(0, ArrowUp_For_1_Template, 7, 1, null, null, _forTrack0);
			if (rf & 2) ɵɵrepeater(ctx.iconNodes());
		},
		encapsulation: 2,
		changeDetection: 1
	});
})());
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ArrowUp, [{
		type: Component,
		args: [{
			selector: "svg[data-p-icon=\"arrow-up\"]",
			standalone: true,
			template: "\n        @for (node of iconNodes(); track node[1]['key'] || $index) {\n            @switch (node[0]) {\n                @case ('path') {\n                    <svg:path\n                        [attr.d]=\"node[1]['d']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.fill-rule]=\"node[1]['fillRule']\"\n                        [attr.clip-rule]=\"node[1]['clipRule']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-width]=\"node[1]['strokeWidth']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('circle') {\n                    <svg:circle\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.r]=\"node[1]['r']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('rect') {\n                    <svg:rect\n                        [attr.x]=\"node[1]['x']\"\n                        [attr.y]=\"node[1]['y']\"\n                        [attr.width]=\"node[1]['width']\"\n                        [attr.height]=\"node[1]['height']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('line') {\n                    <svg:line\n                        [attr.x1]=\"node[1]['x1']\"\n                        [attr.y1]=\"node[1]['y1']\"\n                        [attr.x2]=\"node[1]['x2']\"\n                        [attr.y2]=\"node[1]['y2']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polyline') {\n                    <svg:polyline\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polygon') {\n                    <svg:polygon\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('ellipse') {\n                    <svg:ellipse\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n            }\n        }\n"
		}]
	}], () => [], null);
})();
// ../node_modules/@primeicons/core/dist/esm/icons/angle-double-left.mjs
var e$4 = {
	name: "angle-double-left",
	meta: { tags: [
		"angle-double-left",
		"fast-return",
		"left",
		"back",
		"previous"
	] },
	svg: {
		xmlns: "http://www.w3.org/2000/svg",
		width: 20,
		height: 20,
		viewBox: "0 0 20 20",
		fill: "none"
	},
	nodes: [["path", {
		d: "M8.46974 5.96973C8.76263 5.67684 9.2374 5.67684 9.53029 5.96973C9.82313 6.26263 9.82317 6.73741 9.53029 7.03028L6.56056 10L9.53029 12.9698C9.82313 13.2627 9.82317 13.7374 9.53029 14.0303C9.23742 14.3232 8.76264 14.3231 8.46974 14.0303L4.96973 10.5303C4.67684 10.2374 4.67684 9.76264 4.96973 9.46974L8.46974 5.96973ZM13.9698 5.96973C14.2626 5.67684 14.7374 5.67684 15.0303 5.96973C15.3231 6.26263 15.3232 6.73741 15.0303 7.03028L12.0606 10L15.0303 12.9698C15.3231 13.2627 15.3232 13.7374 15.0303 14.0303C14.7374 14.3232 14.2627 14.3231 13.9698 14.0303L10.4697 10.5303C10.1769 10.2374 10.1769 9.76264 10.4697 9.46974L13.9698 5.96973Z",
		fill: "currentColor",
		key: "yswbnk"
	}]]
};
// ../node_modules/@primeicons/angular/fesm2022/primeicons-angular-angle-double-left.mjs
var _AngleDoubleLeft;
var AngleDoubleLeft = class extends CoreIcon {
	constructor() {
		super();
		this._icon = e$4;
	}
};
_AngleDoubleLeft = AngleDoubleLeft;
_defineProperty(AngleDoubleLeft, "ɵfac", function AngleDoubleLeft_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _AngleDoubleLeft)();
});
_defineProperty(AngleDoubleLeft, "ɵcmp", (function() {
	const _forTrack0 = ($index, $item) => $item[1]["key"] || $index;
	function AngleDoubleLeft_For_1_Case_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "path");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("d", node_r1[1]["d"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("fill-rule", node_r1[1]["fillRule"])("clip-rule", node_r1[1]["clipRule"])("stroke", node_r1[1]["stroke"])("stroke-width", node_r1[1]["strokeWidth"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function AngleDoubleLeft_For_1_Case_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "circle");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("r", node_r1[1]["r"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function AngleDoubleLeft_For_1_Case_2_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "rect");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x", node_r1[1]["x"])("y", node_r1[1]["y"])("width", node_r1[1]["width"])("height", node_r1[1]["height"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function AngleDoubleLeft_For_1_Case_3_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "line");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x1", node_r1[1]["x1"])("y1", node_r1[1]["y1"])("x2", node_r1[1]["x2"])("y2", node_r1[1]["y2"])("stroke", node_r1[1]["stroke"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function AngleDoubleLeft_For_1_Case_4_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polyline");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function AngleDoubleLeft_For_1_Case_5_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polygon");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function AngleDoubleLeft_For_1_Case_6_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "ellipse");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function AngleDoubleLeft_For_1_Template(rf, ctx) {
		if (rf & 1) ɵɵconditionalCreate(0, AngleDoubleLeft_For_1_Case_0_Template, 1, 9, "path")(1, AngleDoubleLeft_For_1_Case_1_Template, 1, 6, "circle")(2, AngleDoubleLeft_For_1_Case_2_Template, 1, 9, "rect")(3, AngleDoubleLeft_For_1_Case_3_Template, 1, 7, "line")(4, AngleDoubleLeft_For_1_Case_4_Template, 1, 4, "polyline")(5, AngleDoubleLeft_For_1_Case_5_Template, 1, 4, "polygon")(6, AngleDoubleLeft_For_1_Case_6_Template, 1, 7, "ellipse");
		if (rf & 2) {
			let tmp_10_0 = void 0;
			const node_r1 = ctx.$implicit;
			ɵɵconditional((tmp_10_0 = node_r1[0]) === "path" ? 0 : tmp_10_0 === "circle" ? 1 : tmp_10_0 === "rect" ? 2 : tmp_10_0 === "line" ? 3 : tmp_10_0 === "polyline" ? 4 : tmp_10_0 === "polygon" ? 5 : tmp_10_0 === "ellipse" ? 6 : -1);
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _AngleDoubleLeft,
		selectors: [[
			"svg",
			"data-p-icon",
			"angle-double-left"
		]],
		features: [ɵɵInheritDefinitionFeature],
		decls: 2,
		vars: 0,
		template: function AngleDoubleLeft_Template(rf, ctx) {
			if (rf & 1) ɵɵrepeaterCreate(0, AngleDoubleLeft_For_1_Template, 7, 1, null, null, _forTrack0);
			if (rf & 2) ɵɵrepeater(ctx.iconNodes());
		},
		encapsulation: 2,
		changeDetection: 1
	});
})());
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngleDoubleLeft, [{
		type: Component,
		args: [{
			selector: "svg[data-p-icon=\"angle-double-left\"]",
			standalone: true,
			template: "\n        @for (node of iconNodes(); track node[1]['key'] || $index) {\n            @switch (node[0]) {\n                @case ('path') {\n                    <svg:path\n                        [attr.d]=\"node[1]['d']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.fill-rule]=\"node[1]['fillRule']\"\n                        [attr.clip-rule]=\"node[1]['clipRule']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-width]=\"node[1]['strokeWidth']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('circle') {\n                    <svg:circle\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.r]=\"node[1]['r']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('rect') {\n                    <svg:rect\n                        [attr.x]=\"node[1]['x']\"\n                        [attr.y]=\"node[1]['y']\"\n                        [attr.width]=\"node[1]['width']\"\n                        [attr.height]=\"node[1]['height']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('line') {\n                    <svg:line\n                        [attr.x1]=\"node[1]['x1']\"\n                        [attr.y1]=\"node[1]['y1']\"\n                        [attr.x2]=\"node[1]['x2']\"\n                        [attr.y2]=\"node[1]['y2']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polyline') {\n                    <svg:polyline\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polygon') {\n                    <svg:polygon\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('ellipse') {\n                    <svg:ellipse\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n            }\n        }\n"
		}]
	}], () => [], null);
})();
// ../node_modules/@primeicons/core/dist/esm/icons/angle-double-right.mjs
var e$3 = {
	name: "angle-double-right",
	meta: { tags: [
		"angle-double-right",
		"fast-proceed",
		"right",
		"next",
		"forward"
	] },
	svg: {
		xmlns: "http://www.w3.org/2000/svg",
		width: 20,
		height: 20,
		viewBox: "0 0 20 20",
		fill: "none"
	},
	nodes: [["path", {
		d: "M4.96972 5.96973C5.26262 5.67683 5.73738 5.67683 6.03027 5.96973L9.53028 9.46974C9.82312 9.76264 9.82316 10.2374 9.53028 10.5303L6.03027 14.0303C5.7374 14.3232 5.26262 14.3231 4.96972 14.0303C4.67683 13.7374 4.67683 13.2626 4.96972 12.9698L7.93946 10L4.96972 7.03028C4.67683 6.73738 4.67683 6.26262 4.96972 5.96973ZM10.4697 5.96973C10.7626 5.67683 11.2374 5.67683 11.5303 5.96973L15.0303 9.46974C15.3231 9.76264 15.3232 10.2374 15.0303 10.5303L11.5303 14.0303C11.2374 14.3232 10.7626 14.3231 10.4697 14.0303C10.1768 13.7374 10.1768 13.2626 10.4697 12.9698L13.4395 10L10.4697 7.03028C10.1768 6.73738 10.1768 6.26262 10.4697 5.96973Z",
		fill: "currentColor",
		key: "r8emu"
	}]]
};
// ../node_modules/@primeicons/angular/fesm2022/primeicons-angular-angle-double-right.mjs
var _AngleDoubleRight;
var AngleDoubleRight = class extends CoreIcon {
	constructor() {
		super();
		this._icon = e$3;
	}
};
_AngleDoubleRight = AngleDoubleRight;
_defineProperty(AngleDoubleRight, "ɵfac", function AngleDoubleRight_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _AngleDoubleRight)();
});
_defineProperty(AngleDoubleRight, "ɵcmp", (function() {
	const _forTrack0 = ($index, $item) => $item[1]["key"] || $index;
	function AngleDoubleRight_For_1_Case_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "path");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("d", node_r1[1]["d"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("fill-rule", node_r1[1]["fillRule"])("clip-rule", node_r1[1]["clipRule"])("stroke", node_r1[1]["stroke"])("stroke-width", node_r1[1]["strokeWidth"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function AngleDoubleRight_For_1_Case_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "circle");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("r", node_r1[1]["r"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function AngleDoubleRight_For_1_Case_2_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "rect");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x", node_r1[1]["x"])("y", node_r1[1]["y"])("width", node_r1[1]["width"])("height", node_r1[1]["height"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function AngleDoubleRight_For_1_Case_3_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "line");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x1", node_r1[1]["x1"])("y1", node_r1[1]["y1"])("x2", node_r1[1]["x2"])("y2", node_r1[1]["y2"])("stroke", node_r1[1]["stroke"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function AngleDoubleRight_For_1_Case_4_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polyline");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function AngleDoubleRight_For_1_Case_5_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polygon");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function AngleDoubleRight_For_1_Case_6_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "ellipse");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function AngleDoubleRight_For_1_Template(rf, ctx) {
		if (rf & 1) ɵɵconditionalCreate(0, AngleDoubleRight_For_1_Case_0_Template, 1, 9, "path")(1, AngleDoubleRight_For_1_Case_1_Template, 1, 6, "circle")(2, AngleDoubleRight_For_1_Case_2_Template, 1, 9, "rect")(3, AngleDoubleRight_For_1_Case_3_Template, 1, 7, "line")(4, AngleDoubleRight_For_1_Case_4_Template, 1, 4, "polyline")(5, AngleDoubleRight_For_1_Case_5_Template, 1, 4, "polygon")(6, AngleDoubleRight_For_1_Case_6_Template, 1, 7, "ellipse");
		if (rf & 2) {
			let tmp_10_0 = void 0;
			const node_r1 = ctx.$implicit;
			ɵɵconditional((tmp_10_0 = node_r1[0]) === "path" ? 0 : tmp_10_0 === "circle" ? 1 : tmp_10_0 === "rect" ? 2 : tmp_10_0 === "line" ? 3 : tmp_10_0 === "polyline" ? 4 : tmp_10_0 === "polygon" ? 5 : tmp_10_0 === "ellipse" ? 6 : -1);
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _AngleDoubleRight,
		selectors: [[
			"svg",
			"data-p-icon",
			"angle-double-right"
		]],
		features: [ɵɵInheritDefinitionFeature],
		decls: 2,
		vars: 0,
		template: function AngleDoubleRight_Template(rf, ctx) {
			if (rf & 1) ɵɵrepeaterCreate(0, AngleDoubleRight_For_1_Template, 7, 1, null, null, _forTrack0);
			if (rf & 2) ɵɵrepeater(ctx.iconNodes());
		},
		encapsulation: 2,
		changeDetection: 1
	});
})());
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngleDoubleRight, [{
		type: Component,
		args: [{
			selector: "svg[data-p-icon=\"angle-double-right\"]",
			standalone: true,
			template: "\n        @for (node of iconNodes(); track node[1]['key'] || $index) {\n            @switch (node[0]) {\n                @case ('path') {\n                    <svg:path\n                        [attr.d]=\"node[1]['d']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.fill-rule]=\"node[1]['fillRule']\"\n                        [attr.clip-rule]=\"node[1]['clipRule']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-width]=\"node[1]['strokeWidth']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('circle') {\n                    <svg:circle\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.r]=\"node[1]['r']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('rect') {\n                    <svg:rect\n                        [attr.x]=\"node[1]['x']\"\n                        [attr.y]=\"node[1]['y']\"\n                        [attr.width]=\"node[1]['width']\"\n                        [attr.height]=\"node[1]['height']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('line') {\n                    <svg:line\n                        [attr.x1]=\"node[1]['x1']\"\n                        [attr.y1]=\"node[1]['y1']\"\n                        [attr.x2]=\"node[1]['x2']\"\n                        [attr.y2]=\"node[1]['y2']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polyline') {\n                    <svg:polyline\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polygon') {\n                    <svg:polygon\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('ellipse') {\n                    <svg:ellipse\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n            }\n        }\n"
		}]
	}], () => [], null);
})();
// ../node_modules/@primeicons/core/dist/esm/icons/angle-left.mjs
var e$2 = {
	name: "angle-left",
	meta: { tags: [
		"angle-left",
		"back",
		"return",
		"left",
		"previous"
	] },
	svg: {
		xmlns: "http://www.w3.org/2000/svg",
		width: 20,
		height: 20,
		viewBox: "0 0 20 20",
		fill: "none"
	},
	nodes: [["path", {
		d: "M11.2197 5.96973C11.5126 5.67683 11.9874 5.67683 12.2803 5.96973C12.5732 6.26262 12.5732 6.73738 12.2803 7.03027L9.31054 10L12.2803 12.9697C12.5732 13.2626 12.5732 13.7374 12.2803 14.0303C11.9874 14.3232 11.5126 14.3232 11.2197 14.0303L7.71972 10.5303C7.42683 10.2374 7.42683 9.76262 7.71972 9.46973L11.2197 5.96973Z",
		fill: "currentColor",
		key: "6ofr4b"
	}]]
};
// ../node_modules/@primeicons/angular/fesm2022/primeicons-angular-angle-left.mjs
var _AngleLeft;
var AngleLeft = class extends CoreIcon {
	constructor() {
		super();
		this._icon = e$2;
	}
};
_AngleLeft = AngleLeft;
_defineProperty(AngleLeft, "ɵfac", function AngleLeft_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _AngleLeft)();
});
_defineProperty(AngleLeft, "ɵcmp", (function() {
	const _forTrack0 = ($index, $item) => $item[1]["key"] || $index;
	function AngleLeft_For_1_Case_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "path");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("d", node_r1[1]["d"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("fill-rule", node_r1[1]["fillRule"])("clip-rule", node_r1[1]["clipRule"])("stroke", node_r1[1]["stroke"])("stroke-width", node_r1[1]["strokeWidth"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function AngleLeft_For_1_Case_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "circle");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("r", node_r1[1]["r"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function AngleLeft_For_1_Case_2_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "rect");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x", node_r1[1]["x"])("y", node_r1[1]["y"])("width", node_r1[1]["width"])("height", node_r1[1]["height"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function AngleLeft_For_1_Case_3_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "line");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x1", node_r1[1]["x1"])("y1", node_r1[1]["y1"])("x2", node_r1[1]["x2"])("y2", node_r1[1]["y2"])("stroke", node_r1[1]["stroke"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function AngleLeft_For_1_Case_4_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polyline");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function AngleLeft_For_1_Case_5_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polygon");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function AngleLeft_For_1_Case_6_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "ellipse");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function AngleLeft_For_1_Template(rf, ctx) {
		if (rf & 1) ɵɵconditionalCreate(0, AngleLeft_For_1_Case_0_Template, 1, 9, "path")(1, AngleLeft_For_1_Case_1_Template, 1, 6, "circle")(2, AngleLeft_For_1_Case_2_Template, 1, 9, "rect")(3, AngleLeft_For_1_Case_3_Template, 1, 7, "line")(4, AngleLeft_For_1_Case_4_Template, 1, 4, "polyline")(5, AngleLeft_For_1_Case_5_Template, 1, 4, "polygon")(6, AngleLeft_For_1_Case_6_Template, 1, 7, "ellipse");
		if (rf & 2) {
			let tmp_10_0 = void 0;
			const node_r1 = ctx.$implicit;
			ɵɵconditional((tmp_10_0 = node_r1[0]) === "path" ? 0 : tmp_10_0 === "circle" ? 1 : tmp_10_0 === "rect" ? 2 : tmp_10_0 === "line" ? 3 : tmp_10_0 === "polyline" ? 4 : tmp_10_0 === "polygon" ? 5 : tmp_10_0 === "ellipse" ? 6 : -1);
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _AngleLeft,
		selectors: [[
			"svg",
			"data-p-icon",
			"angle-left"
		]],
		features: [ɵɵInheritDefinitionFeature],
		decls: 2,
		vars: 0,
		template: function AngleLeft_Template(rf, ctx) {
			if (rf & 1) ɵɵrepeaterCreate(0, AngleLeft_For_1_Template, 7, 1, null, null, _forTrack0);
			if (rf & 2) ɵɵrepeater(ctx.iconNodes());
		},
		encapsulation: 2,
		changeDetection: 1
	});
})());
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AngleLeft, [{
		type: Component,
		args: [{
			selector: "svg[data-p-icon=\"angle-left\"]",
			standalone: true,
			template: "\n        @for (node of iconNodes(); track node[1]['key'] || $index) {\n            @switch (node[0]) {\n                @case ('path') {\n                    <svg:path\n                        [attr.d]=\"node[1]['d']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.fill-rule]=\"node[1]['fillRule']\"\n                        [attr.clip-rule]=\"node[1]['clipRule']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-width]=\"node[1]['strokeWidth']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('circle') {\n                    <svg:circle\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.r]=\"node[1]['r']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('rect') {\n                    <svg:rect\n                        [attr.x]=\"node[1]['x']\"\n                        [attr.y]=\"node[1]['y']\"\n                        [attr.width]=\"node[1]['width']\"\n                        [attr.height]=\"node[1]['height']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('line') {\n                    <svg:line\n                        [attr.x1]=\"node[1]['x1']\"\n                        [attr.y1]=\"node[1]['y1']\"\n                        [attr.x2]=\"node[1]['x2']\"\n                        [attr.y2]=\"node[1]['y2']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polyline') {\n                    <svg:polyline\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polygon') {\n                    <svg:polygon\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('ellipse') {\n                    <svg:ellipse\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n            }\n        }\n"
		}]
	}], () => [], null);
})();
// ../node_modules/@primeuix/styles/dist/paginator/index.mjs
var style$3 = "\n    .p-paginator {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-wrap: wrap;\n        background: dt('paginator.background');\n        color: dt('paginator.color');\n        padding: dt('paginator.padding');\n        border-radius: dt('paginator.border.radius');\n        gap: dt('paginator.gap');\n    }\n\n    .p-paginator-content {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        flex-wrap: wrap;\n        gap: dt('paginator.gap');\n    }\n\n    .p-paginator-content-start {\n        margin-inline-end: auto;\n    }\n\n    .p-paginator-content-end {\n        margin-inline-start: auto;\n    }\n\n    .p-paginator-page,\n    .p-paginator-next,\n    .p-paginator-last,\n    .p-paginator-first,\n    .p-paginator-prev {\n        cursor: pointer;\n        display: inline-flex;\n        align-items: center;\n        justify-content: center;\n        user-select: none;\n        overflow: hidden;\n        position: relative;\n        background: dt('paginator.nav.button.background');\n        border: 0 none;\n        color: dt('paginator.nav.button.color');\n        min-width: dt('paginator.nav.button.width');\n        height: dt('paginator.nav.button.height');\n        font-weight: dt('paginator.nav.button.font.weight');\n        font-size: dt('paginator.nav.button.font.size');\n        transition:\n            background dt('paginator.transition.duration'),\n            color dt('paginator.transition.duration'),\n            outline-color dt('paginator.transition.duration'),\n            box-shadow dt('paginator.transition.duration');\n        border-radius: dt('paginator.nav.button.border.radius');\n        padding: 0;\n        margin: 0;\n    }\n\n    .p-paginator-page:focus-visible,\n    .p-paginator-next:focus-visible,\n    .p-paginator-last:focus-visible,\n    .p-paginator-first:focus-visible,\n    .p-paginator-prev:focus-visible {\n        box-shadow: dt('paginator.nav.button.focus.ring.shadow');\n        outline: dt('paginator.nav.button.focus.ring.width') dt('paginator.nav.button.focus.ring.style') dt('paginator.nav.button.focus.ring.color');\n        outline-offset: dt('paginator.nav.button.focus.ring.offset');\n    }\n\n    .p-paginator-page:not(.p-disabled):not(.p-paginator-page-selected):hover,\n    .p-paginator-first:not(.p-disabled):hover,\n    .p-paginator-prev:not(.p-disabled):hover,\n    .p-paginator-next:not(.p-disabled):hover,\n    .p-paginator-last:not(.p-disabled):hover {\n        background: dt('paginator.nav.button.hover.background');\n        color: dt('paginator.nav.button.hover.color');\n    }\n\n    .p-paginator-page.p-paginator-page-selected {\n        background: dt('paginator.nav.button.selected.background');\n        color: dt('paginator.nav.button.selected.color');\n    }\n\n    .p-paginator-current {\n        color: dt('paginator.current.page.report.color');\n        font-weight: dt('paginator.current.page.report.font.weight');\n        font-size: dt('paginator.current.page.report.font.size');\n    }\n\n    .p-paginator-pages {\n        display: flex;\n        align-items: center;\n        gap: dt('paginator.gap');\n    }\n\n    .p-paginator-jtp-input .p-inputtext {\n        max-width: dt('paginator.jump.to.page.input.max.width');\n    }\n\n    .p-paginator-first:dir(rtl),\n    .p-paginator-prev:dir(rtl),\n    .p-paginator-next:dir(rtl),\n    .p-paginator-last:dir(rtl) {\n        transform: rotate(180deg);\n    }\n";
// ../node_modules/primeng/fesm2022/primeng-paginator.mjs
var _PaginatorStyle;
var _Paginator;
var _PaginatorModule;
var classes$3 = {
	paginator: () => ["p-paginator p-component"],
	content: "p-paginator-content",
	contentStart: "p-paginator-content-start",
	contentEnd: "p-paginator-content-end",
	first: ({ instance }) => ["p-paginator-first", { "p-disabled": instance.isFirstPage() || instance.empty() }],
	firstIcon: "p-paginator-first-icon",
	prev: ({ instance }) => ["p-paginator-prev", { "p-disabled": instance.isFirstPage() || instance.empty() }],
	prevIcon: "p-paginator-prev-icon",
	next: ({ instance }) => ["p-paginator-next", { "p-disabled": instance.isLastPage() || instance.empty() }],
	nextIcon: "p-paginator-next-icon",
	last: ({ instance }) => ["p-paginator-last", { "p-disabled": instance.isLastPage() || instance.empty() }],
	lastIcon: "p-paginator-last-icon",
	pages: "p-paginator-pages",
	page: ({ instance, pageLink }) => ["p-paginator-page", { "p-paginator-page-selected": pageLink - 1 == instance.getPage() }],
	current: "p-paginator-current",
	pcRowPerPageDropdown: "p-paginator-rpp-dropdown",
	pcJumpToPageDropdown: "p-paginator-jtp-dropdown",
	pcJumpToPageInput: "p-paginator-jtp-input"
};
var PaginatorStyle = (_PaginatorStyle = class PaginatorStyle extends BaseStyle {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "name", "paginator");
		_defineProperty(this, "style", style$3);
		_defineProperty(this, "classes", classes$3);
	}
}, _defineProperty(_PaginatorStyle, "ɵfac", /*@__PURE__*/ (() => {
	let ɵPaginatorStyle_BaseFactory = void 0;
	return function PaginatorStyle_Factory(__ngFactoryType__) {
		return (ɵPaginatorStyle_BaseFactory || (ɵPaginatorStyle_BaseFactory = ɵɵgetInheritedFactory(_PaginatorStyle)))(__ngFactoryType__ || _PaginatorStyle);
	};
})()), _defineProperty(_PaginatorStyle, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _PaginatorStyle,
	factory: _PaginatorStyle.ɵfac
})), _PaginatorStyle);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PaginatorStyle, [{ type: Injectable }], null, null);
})();
var PaginatorClasses;
(function(PaginatorClasses) {
	PaginatorClasses["paginator"] = "p-paginator";
	PaginatorClasses["contentStart"] = "p-paginator-content-start";
	PaginatorClasses["contentEnd"] = "p-paginator-content-end";
	PaginatorClasses["first"] = "p-paginator-first";
	PaginatorClasses["firstIcon"] = "p-paginator-first-icon";
	PaginatorClasses["prev"] = "p-paginator-prev";
	PaginatorClasses["prevIcon"] = "p-paginator-prev-icon";
	PaginatorClasses["next"] = "p-paginator-next";
	PaginatorClasses["nextIcon"] = "p-paginator-next-icon";
	PaginatorClasses["last"] = "p-paginator-last";
	PaginatorClasses["lastIcon"] = "p-paginator-last-icon";
	PaginatorClasses["pages"] = "p-paginator-pages";
	PaginatorClasses["page"] = "p-paginator-page";
	PaginatorClasses["current"] = "p-paginator-current";
	PaginatorClasses["pcRowPerPageDropdown"] = "p-paginator-rpp-dropdown";
	PaginatorClasses["pcJumpToPageDropdown"] = "p-paginator-jtp-dropdown";
	PaginatorClasses["pcJumpToPageInput"] = "p-paginator-jtp-input";
})(PaginatorClasses || (PaginatorClasses = {}));
var PAGINATOR_INSTANCE = new InjectionToken("PAGINATOR_INSTANCE");
var Paginator = (_Paginator = class Paginator extends BaseComponent {
	constructor() {
		var _inject;
		super();
		_defineProperty(this, "componentName", "Paginator");
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		_defineProperty(this, "$pcPaginator", (_inject = inject(PAGINATOR_INSTANCE, {
			optional: true,
			skipSelf: true
		})) !== null && _inject !== void 0 ? _inject : void 0);
		_defineProperty(this, "pageLinkSize", input(5, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "pageLinkSize" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "alwaysShow", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "alwaysShow" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "templateLeft", input(...ngDevMode ? [void 0, { debugName: "templateLeft" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "templateRight", input(...ngDevMode ? [void 0, { debugName: "templateRight" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dropdownScrollHeight", input("200px", ...ngDevMode ? [{ debugName: "dropdownScrollHeight" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "currentPageReportTemplate", input("{currentPage} of {totalPages}", ...ngDevMode ? [{ debugName: "currentPageReportTemplate" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "showCurrentPageReport", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "showCurrentPageReport" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "showFirstLastIcon", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "showFirstLastIcon" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "totalRecords", input(0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "totalRecords" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "rows", model(0, ...ngDevMode ? [{ debugName: "rows" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "first", model(0, ...ngDevMode ? [{ debugName: "first" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "rowsPerPageOptions", input(...ngDevMode ? [void 0, { debugName: "rowsPerPageOptions" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "showJumpToPageDropdown", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "showJumpToPageDropdown" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "showJumpToPageInput", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "showJumpToPageInput" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "jumpToPageItemTemplate", input(...ngDevMode ? [void 0, { debugName: "jumpToPageItemTemplate" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "showPageLinks", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "showPageLinks" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "locale", input(...ngDevMode ? [void 0, { debugName: "locale" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dropdownItemTemplate", input(...ngDevMode ? [void 0, { debugName: "dropdownItemTemplate" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "appendTo", input(void 0, ...ngDevMode ? [{ debugName: "appendTo" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "onPageChange", output());
		_defineProperty(this, "dropdownIconTemplate", contentChild("dropdownicon", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "dropdownIconTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "firstPageLinkIconTemplate", contentChild("firstpagelinkicon", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "firstPageLinkIconTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "previousPageLinkIconTemplate", contentChild("previouspagelinkicon", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "previousPageLinkIconTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "lastPageLinkIconTemplate", contentChild("lastpagelinkicon", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "lastPageLinkIconTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "nextPageLinkIconTemplate", contentChild("nextpagelinkicon", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "nextPageLinkIconTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "_componentStyle", inject(PaginatorStyle));
		_defineProperty(this, "$appendTo", computed(() => this.appendTo() || this.config.overlayAppendTo(), ...ngDevMode ? [{ debugName: "$appendTo" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "pageLinks", computed(() => {
			const numberOfPages = this.getPageCount();
			const visiblePages = Math.min(this.pageLinkSize(), numberOfPages);
			const page = this.getPage();
			let start = Math.max(0, Math.ceil(page - visiblePages / 2));
			const end = Math.min(numberOfPages - 1, start + visiblePages - 1);
			const delta = this.pageLinkSize() - (end - start + 1);
			start = Math.max(0, start - delta);
			const links = [];
			for (let i = start; i <= end; i++) links.push(i + 1);
			return links;
		}, ...ngDevMode ? [{ debugName: "pageLinks" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "pageItems", computed(() => {
			if (!this.showJumpToPageDropdown()) return [];
			const items = [];
			for (let i = 0; i < this.getPageCount(); i++) items.push({
				label: String(i + 1),
				value: i
			});
			return items;
		}, ...ngDevMode ? [{ debugName: "pageItems" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "rowsPerPageItems", computed(() => {
			const options = this.rowsPerPageOptions();
			if (!options) return [];
			const items = [];
			let showAllItem = null;
			for (const opt of options) if (typeof opt === "object" && opt["showAll"]) showAllItem = {
				label: opt["showAll"],
				value: this.totalRecords()
			};
			else items.push({
				label: String(this.getLocalization(opt)),
				value: opt
			});
			if (showAllItem) items.push(showAllItem);
			return items;
		}, ...ngDevMode ? [{ debugName: "rowsPerPageItems" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "paginatorState", computed(() => ({
			page: this.getPage(),
			pageCount: this.getPageCount(),
			rows: this.rows(),
			first: this.first(),
			totalRecords: this.totalRecords()
		}), ...ngDevMode ? [{ debugName: "paginatorState" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "hostDisplay", computed(() => this.alwaysShow() || this.pageLinks().length > 1 ? null : "none", ...ngDevMode ? [{ debugName: "hostDisplay" }] : /* istanbul ignore next */ []));
		effect(() => {
			const totalRecords = this.totalRecords();
			untracked(() => {
				const page = this.getPage();
				if (page > 0 && totalRecords && this.first() >= totalRecords) Promise.resolve(null).then(() => this.changePage(page - 1));
			});
		});
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
	}
	getAriaLabel(labelType) {
		return this.config.translation.aria ? this.config.translation.aria[labelType] : void 0;
	}
	getPageAriaLabel(value) {
		var _this$config$translat;
		return this.config.translation.aria ? (_this$config$translat = this.config.translation.aria.pageLabel) === null || _this$config$translat === void 0 ? void 0 : _this$config$translat.replace(/{page}/g, `${value}`) : void 0;
	}
	getLocalization(digit) {
		const numerals = [...new Intl.NumberFormat(this.locale(), { useGrouping: false }).format(9876543210)].reverse();
		const index = new Map(numerals.map((d, i) => [i, d]));
		if (digit > 9) return String(digit).split("").map((number) => index.get(Number(number))).join("");
		else return index.get(digit);
	}
	isFirstPage() {
		return this.getPage() === 0;
	}
	isLastPage() {
		return this.getPage() === this.getPageCount() - 1;
	}
	getPageCount() {
		return Math.ceil(this.totalRecords() / this.rows());
	}
	getPage() {
		return Math.floor(this.first() / this.rows());
	}
	currentPage() {
		return this.getPageCount() > 0 ? this.getPage() + 1 : 0;
	}
	get currentPageReport() {
		return this.currentPageReportTemplate().replace("{currentPage}", String(this.currentPage())).replace("{totalPages}", String(this.getPageCount())).replace("{first}", String(this.totalRecords() > 0 ? this.first() + 1 : 0)).replace("{last}", String(Math.min(this.first() + this.rows(), this.totalRecords()))).replace("{rows}", String(this.rows())).replace("{totalRecords}", String(this.totalRecords()));
	}
	changePage(p) {
		const pc = this.getPageCount();
		if (p >= 0 && p < pc) {
			this.first.set(this.rows() * p);
			this.onPageChange.emit({
				page: p,
				first: this.first(),
				rows: this.rows(),
				pageCount: pc
			});
		}
	}
	changePageToFirst(event) {
		if (!this.isFirstPage()) this.changePage(0);
		event.preventDefault();
	}
	changePageToPrev(event) {
		this.changePage(this.getPage() - 1);
		event.preventDefault();
	}
	changePageToNext(event) {
		this.changePage(this.getPage() + 1);
		event.preventDefault();
	}
	changePageToLast(event) {
		if (!this.isLastPage()) this.changePage(this.getPageCount() - 1);
		event.preventDefault();
	}
	onPageLinkClick(event, page) {
		this.changePage(page);
		event.preventDefault();
	}
	onRppChange(_event) {
		this.changePage(this.getPage());
	}
	onPageDropdownChange(event) {
		this.changePage(event.value);
	}
	empty() {
		return this.getPageCount() === 0;
	}
}, _defineProperty(_Paginator, "ɵfac", function Paginator_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _Paginator)();
}), _defineProperty(_Paginator, "ɵcmp", (function() {
	const _c0 = ["dropdownicon"];
	const _c1 = ["firstpagelinkicon"];
	const _c2 = ["previouspagelinkicon"];
	const _c3 = ["lastpagelinkicon"];
	const _c4 = ["nextpagelinkicon"];
	const _c5 = (a0) => ({ $implicit: a0 });
	const _c6 = (a0) => ({ pageLink: a0 });
	const _c7 = () => ({ standalone: true });
	function Paginator_Conditional_0_ng_container_1_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Paginator_Conditional_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "div", 13);
			ɵɵtemplate(1, Paginator_Conditional_0_ng_container_1_Template, 1, 0, "ng-container", 14);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵclassMap(ctx_r0.cx("contentStart"));
			ɵɵproperty("pBind", ctx_r0.ptm("contentStart"));
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", ctx_r0.templateLeft())("ngTemplateOutletContext", ɵɵpureFunction1(5, _c5, ctx_r0.paginatorState()));
		}
	}
	function Paginator_Conditional_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "span", 13);
			ɵɵtext(1);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵclassMap(ctx_r0.cx("current"));
			ɵɵproperty("pBind", ctx_r0.ptm("current"));
			ɵɵadvance();
			ɵɵtextInterpolate(ctx_r0.currentPageReport);
		}
	}
	function Paginator_Conditional_2_Conditional_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 17);
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵclassMap(ctx_r0.cx("firstIcon"));
			ɵɵproperty("pBind", ctx_r0.ptm("firstIcon"));
		}
	}
	function Paginator_Conditional_2_Conditional_2_1_ng_template_0_Template(rf, ctx) {}
	function Paginator_Conditional_2_Conditional_2_1_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Paginator_Conditional_2_Conditional_2_1_ng_template_0_Template, 0, 0, "ng-template");
	}
	function Paginator_Conditional_2_Conditional_2_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "span");
			ɵɵtemplate(1, Paginator_Conditional_2_Conditional_2_1_Template, 1, 0, null, 18);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵclassMap(ctx_r0.cx("firstIcon"));
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", ctx_r0.firstPageLinkIconTemplate());
		}
	}
	function Paginator_Conditional_2_Template(rf, ctx) {
		if (rf & 1) {
			const _r2 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "button", 15);
			ɵɵlistener("click", function Paginator_Conditional_2_Template_button_click_0_listener($event) {
				ɵɵrestoreView(_r2);
				const ctx_r0 = ɵɵnextContext();
				return ɵɵresetView(ctx_r0.changePageToFirst($event));
			});
			ɵɵconditionalCreate(1, Paginator_Conditional_2_Conditional_1_Template, 1, 3, "svg", 16)(2, Paginator_Conditional_2_Conditional_2_Template, 2, 3, "span", 7);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵclassMap(ctx_r0.cx("first"));
			ɵɵproperty("pBind", ctx_r0.ptm("first"));
			ɵɵattribute("aria-label", ctx_r0.getAriaLabel("firstPageLabel"));
			ɵɵadvance();
			ɵɵconditional(!ctx_r0.firstPageLinkIconTemplate() ? 1 : 2);
		}
	}
	function Paginator_Conditional_4_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 19);
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵclassMap(ctx_r0.cx("prevIcon"));
			ɵɵproperty("pBind", ctx_r0.ptm("prevIcon"));
		}
	}
	function Paginator_Conditional_5_1_ng_template_0_Template(rf, ctx) {}
	function Paginator_Conditional_5_1_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Paginator_Conditional_5_1_ng_template_0_Template, 0, 0, "ng-template");
	}
	function Paginator_Conditional_5_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "span");
			ɵɵtemplate(1, Paginator_Conditional_5_1_Template, 1, 0, null, 18);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵclassMap(ctx_r0.cx("prevIcon"));
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", ctx_r0.previousPageLinkIconTemplate());
		}
	}
	function Paginator_Conditional_6_For_2_Template(rf, ctx) {
		if (rf & 1) {
			const _r3 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "button", 15);
			ɵɵlistener("click", function Paginator_Conditional_6_For_2_Template_button_click_0_listener($event) {
				const pageLink_r4 = ɵɵrestoreView(_r3).$implicit;
				const ctx_r0 = ɵɵnextContext(2);
				return ɵɵresetView(ctx_r0.onPageLinkClick($event, pageLink_r4 - 1));
			});
			ɵɵtext(1);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const pageLink_r4 = ctx.$implicit;
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵclassMap(ctx_r0.cx("page", ɵɵpureFunction1(6, _c6, pageLink_r4)));
			ɵɵproperty("pBind", ctx_r0.ptm("page"));
			ɵɵattribute("aria-label", ctx_r0.getPageAriaLabel(pageLink_r4))("aria-current", pageLink_r4 - 1 === ctx_r0.getPage() ? "page" : void 0);
			ɵɵadvance();
			ɵɵtextInterpolate1(" ", ctx_r0.getLocalization(pageLink_r4), " ");
		}
	}
	function Paginator_Conditional_6_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "span", 13);
			ɵɵrepeaterCreate(1, Paginator_Conditional_6_For_2_Template, 2, 8, "button", 4, ɵɵrepeaterTrackByIndex);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵclassMap(ctx_r0.cx("pages"));
			ɵɵproperty("pBind", ctx_r0.ptm("pages"));
			ɵɵadvance();
			ɵɵrepeater(ctx_r0.pageLinks());
		}
	}
	function Paginator_Conditional_7_ng_template_1_Template(rf, ctx) {
		if (rf & 1) ɵɵtext(0);
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵtextInterpolate(ctx_r0.currentPageReport);
		}
	}
	function Paginator_Conditional_7_Conditional_3_ng_template_0_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Paginator_Conditional_7_Conditional_3_ng_template_0_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Paginator_Conditional_7_Conditional_3_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 14);
		if (rf & 2) {
			const item_r6 = ctx.$implicit;
			const ctx_r0 = ɵɵnextContext(3);
			ɵɵproperty("ngTemplateOutlet", ctx_r0.jumpToPageItemTemplate())("ngTemplateOutletContext", ɵɵpureFunction1(2, _c5, item_r6));
		}
	}
	function Paginator_Conditional_7_Conditional_3_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Paginator_Conditional_7_Conditional_3_ng_template_0_Template, 1, 4, "ng-template", null, 1, ɵɵtemplateRefExtractor);
	}
	function Paginator_Conditional_7_Conditional_4_ng_template_0_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Paginator_Conditional_7_Conditional_4_ng_template_0_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Paginator_Conditional_7_Conditional_4_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 18);
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(3);
			ɵɵproperty("ngTemplateOutlet", ctx_r0.dropdownIconTemplate());
		}
	}
	function Paginator_Conditional_7_Conditional_4_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Paginator_Conditional_7_Conditional_4_ng_template_0_Template, 1, 1, "ng-template", null, 2, ɵɵtemplateRefExtractor);
	}
	function Paginator_Conditional_7_Template(rf, ctx) {
		if (rf & 1) {
			const _r5 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "p-select", 20);
			ɵɵcontrolCreate();
			ɵɵlistener("onChange", function Paginator_Conditional_7_Template_p_select_onChange_0_listener($event) {
				ɵɵrestoreView(_r5);
				const ctx_r0 = ɵɵnextContext();
				return ɵɵresetView(ctx_r0.onPageDropdownChange($event));
			});
			ɵɵtemplate(1, Paginator_Conditional_7_ng_template_1_Template, 1, 1, "ng-template", null, 0, ɵɵtemplateRefExtractor);
			ɵɵconditionalCreate(3, Paginator_Conditional_7_Conditional_3_Template, 2, 0);
			ɵɵconditionalCreate(4, Paginator_Conditional_7_Conditional_4_Template, 2, 0);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵclassMap(ctx_r0.cx("pcJumpToPageDropdown"));
			ɵɵproperty("options", ctx_r0.pageItems())("ngModel", ctx_r0.getPage())("ngModelOptions", ɵɵpureFunction0(13, _c7))("disabled", ctx_r0.empty())("appendTo", ctx_r0.$appendTo())("scrollHeight", ctx_r0.dropdownScrollHeight())("pt", ctx_r0.ptm("pcJumpToPageDropdown"))("unstyled", ctx_r0.unstyled());
			ɵɵattribute("aria-label", ctx_r0.getAriaLabel("jumpToPageDropdownLabel"));
			ɵɵcontrol();
			ɵɵadvance(3);
			ɵɵconditional(ctx_r0.jumpToPageItemTemplate() ? 3 : -1);
			ɵɵadvance();
			ɵɵconditional(ctx_r0.dropdownIconTemplate() ? 4 : -1);
		}
	}
	function Paginator_Conditional_9_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 21);
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵclassMap(ctx_r0.cx("nextIcon"));
			ɵɵproperty("pBind", ctx_r0.ptm("nextIcon"));
		}
	}
	function Paginator_Conditional_10_1_ng_template_0_Template(rf, ctx) {}
	function Paginator_Conditional_10_1_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Paginator_Conditional_10_1_ng_template_0_Template, 0, 0, "ng-template");
	}
	function Paginator_Conditional_10_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "span");
			ɵɵtemplate(1, Paginator_Conditional_10_1_Template, 1, 0, null, 18);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵclassMap(ctx_r0.cx("nextIcon"));
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", ctx_r0.nextPageLinkIconTemplate());
		}
	}
	function Paginator_Conditional_11_Conditional_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 23);
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵclassMap(ctx_r0.cx("lastIcon"));
			ɵɵproperty("pBind", ctx_r0.ptm("lastIcon"));
		}
	}
	function Paginator_Conditional_11_Conditional_2_1_ng_template_0_Template(rf, ctx) {}
	function Paginator_Conditional_11_Conditional_2_1_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Paginator_Conditional_11_Conditional_2_1_ng_template_0_Template, 0, 0, "ng-template");
	}
	function Paginator_Conditional_11_Conditional_2_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "span");
			ɵɵtemplate(1, Paginator_Conditional_11_Conditional_2_1_Template, 1, 0, null, 18);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵclassMap(ctx_r0.cx("lastIcon"));
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", ctx_r0.lastPageLinkIconTemplate());
		}
	}
	function Paginator_Conditional_11_Template(rf, ctx) {
		if (rf & 1) {
			const _r7 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "button", 5);
			ɵɵlistener("click", function Paginator_Conditional_11_Template_button_click_0_listener($event) {
				ɵɵrestoreView(_r7);
				const ctx_r0 = ɵɵnextContext();
				return ɵɵresetView(ctx_r0.changePageToLast($event));
			});
			ɵɵconditionalCreate(1, Paginator_Conditional_11_Conditional_1_Template, 1, 3, "svg", 22)(2, Paginator_Conditional_11_Conditional_2_Template, 2, 3, "span", 7);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵclassMap(ctx_r0.cx("last"));
			ɵɵproperty("pBind", ctx_r0.ptm("last"))("disabled", ctx_r0.isLastPage() || ctx_r0.empty());
			ɵɵattribute("aria-label", ctx_r0.getAriaLabel("lastPageLabel"));
			ɵɵadvance();
			ɵɵconditional(!ctx_r0.lastPageLinkIconTemplate() ? 1 : 2);
		}
	}
	function Paginator_Conditional_12_Template(rf, ctx) {
		if (rf & 1) {
			const _r8 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "p-inputnumber", 24);
			ɵɵcontrolCreate();
			ɵɵlistener("ngModelChange", function Paginator_Conditional_12_Template_p_inputnumber_ngModelChange_0_listener($event) {
				ɵɵrestoreView(_r8);
				const ctx_r0 = ɵɵnextContext();
				return ɵɵresetView(ctx_r0.changePage($event - 1));
			});
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵclassMap(ctx_r0.cx("pcJumpToPageInput"));
			ɵɵproperty("pt", ctx_r0.ptm("pcJumpToPageInput"))("ngModel", ctx_r0.currentPage())("ngModelOptions", ɵɵpureFunction0(7, _c7))("disabled", ctx_r0.empty())("unstyled", ctx_r0.unstyled());
			ɵɵcontrol();
		}
	}
	function Paginator_Conditional_13_Conditional_1_ng_template_0_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Paginator_Conditional_13_Conditional_1_ng_template_0_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Paginator_Conditional_13_Conditional_1_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 14);
		if (rf & 2) {
			const item_r10 = ctx.$implicit;
			const ctx_r0 = ɵɵnextContext(3);
			ɵɵproperty("ngTemplateOutlet", ctx_r0.dropdownItemTemplate())("ngTemplateOutletContext", ɵɵpureFunction1(2, _c5, item_r10));
		}
	}
	function Paginator_Conditional_13_Conditional_1_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Paginator_Conditional_13_Conditional_1_ng_template_0_Template, 1, 4, "ng-template", null, 1, ɵɵtemplateRefExtractor);
	}
	function Paginator_Conditional_13_Conditional_2_ng_template_0_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Paginator_Conditional_13_Conditional_2_ng_template_0_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Paginator_Conditional_13_Conditional_2_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 18);
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(3);
			ɵɵproperty("ngTemplateOutlet", ctx_r0.dropdownIconTemplate());
		}
	}
	function Paginator_Conditional_13_Conditional_2_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Paginator_Conditional_13_Conditional_2_ng_template_0_Template, 1, 1, "ng-template", null, 2, ɵɵtemplateRefExtractor);
	}
	function Paginator_Conditional_13_Template(rf, ctx) {
		if (rf & 1) {
			const _r9 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "p-select", 25);
			ɵɵcontrolCreate();
			ɵɵlistener("ngModelChange", function Paginator_Conditional_13_Template_p_select_ngModelChange_0_listener($event) {
				ɵɵrestoreView(_r9);
				const ctx_r0 = ɵɵnextContext();
				return ɵɵresetView(ctx_r0.rows.set($event));
			})("onChange", function Paginator_Conditional_13_Template_p_select_onChange_0_listener($event) {
				ɵɵrestoreView(_r9);
				const ctx_r0 = ɵɵnextContext();
				return ɵɵresetView(ctx_r0.onRppChange($event));
			});
			ɵɵconditionalCreate(1, Paginator_Conditional_13_Conditional_1_Template, 2, 0);
			ɵɵconditionalCreate(2, Paginator_Conditional_13_Conditional_2_Template, 2, 0);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵclassMap(ctx_r0.cx("pcRowPerPageDropdown"));
			ɵɵproperty("options", ctx_r0.rowsPerPageItems())("ngModel", ctx_r0.rows())("ngModelOptions", ɵɵpureFunction0(13, _c7))("disabled", ctx_r0.empty())("appendTo", ctx_r0.$appendTo())("scrollHeight", ctx_r0.dropdownScrollHeight())("ariaLabel", ctx_r0.getAriaLabel("rowsPerPageLabel"))("pt", ctx_r0.ptm("pcRowPerPageDropdown"))("unstyled", ctx_r0.unstyled());
			ɵɵcontrol();
			ɵɵadvance();
			ɵɵconditional(ctx_r0.dropdownItemTemplate() ? 1 : -1);
			ɵɵadvance();
			ɵɵconditional(ctx_r0.dropdownIconTemplate() ? 2 : -1);
		}
	}
	function Paginator_Conditional_14_ng_container_1_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Paginator_Conditional_14_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "div", 13);
			ɵɵtemplate(1, Paginator_Conditional_14_ng_container_1_Template, 1, 0, "ng-container", 14);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵclassMap(ctx_r0.cx("contentEnd"));
			ɵɵproperty("pBind", ctx_r0.ptm("contentEnd"));
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", ctx_r0.templateRight())("ngTemplateOutletContext", ɵɵpureFunction1(5, _c5, ctx_r0.paginatorState()));
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _Paginator,
		selectors: [["p-paginator"]],
		contentQueries: function Paginator_ContentQueries(rf, ctx, dirIndex) {
			if (rf & 1) ɵɵcontentQuerySignal(dirIndex, ctx.dropdownIconTemplate, _c0, 4)(dirIndex, ctx.firstPageLinkIconTemplate, _c1, 4)(dirIndex, ctx.previousPageLinkIconTemplate, _c2, 4)(dirIndex, ctx.lastPageLinkIconTemplate, _c3, 4)(dirIndex, ctx.nextPageLinkIconTemplate, _c4, 4);
			if (rf & 2) ɵɵqueryAdvance(5);
		},
		hostVars: 4,
		hostBindings: function Paginator_HostBindings(rf, ctx) {
			if (rf & 2) {
				ɵɵclassMap(ctx.cx("paginator"));
				ɵɵstyleProp("display", ctx.hostDisplay());
			}
		},
		inputs: {
			pageLinkSize: [1, "pageLinkSize"],
			alwaysShow: [1, "alwaysShow"],
			templateLeft: [1, "templateLeft"],
			templateRight: [1, "templateRight"],
			dropdownScrollHeight: [1, "dropdownScrollHeight"],
			currentPageReportTemplate: [1, "currentPageReportTemplate"],
			showCurrentPageReport: [1, "showCurrentPageReport"],
			showFirstLastIcon: [1, "showFirstLastIcon"],
			totalRecords: [1, "totalRecords"],
			rows: [1, "rows"],
			first: [1, "first"],
			rowsPerPageOptions: [1, "rowsPerPageOptions"],
			showJumpToPageDropdown: [1, "showJumpToPageDropdown"],
			showJumpToPageInput: [1, "showJumpToPageInput"],
			jumpToPageItemTemplate: [1, "jumpToPageItemTemplate"],
			showPageLinks: [1, "showPageLinks"],
			locale: [1, "locale"],
			dropdownItemTemplate: [1, "dropdownItemTemplate"],
			appendTo: [1, "appendTo"]
		},
		outputs: {
			rows: "rowsChange",
			first: "firstChange",
			onPageChange: "onPageChange"
		},
		features: [
			ɵɵProvidersFeature([
				PaginatorStyle,
				{
					provide: PAGINATOR_INSTANCE,
					useExisting: _Paginator
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: _Paginator
				}
			]),
			ɵɵHostDirectivesFeature([Bind]),
			ɵɵInheritDefinitionFeature
		],
		decls: 15,
		vars: 21,
		consts: [
			["selectedItem", ""],
			["item", ""],
			["dropdownicon", ""],
			[
				3,
				"pBind",
				"class"
			],
			[
				"type",
				"button",
				"pRipple",
				"",
				3,
				"pBind",
				"class"
			],
			[
				"type",
				"button",
				"pRipple",
				"",
				3,
				"click",
				"pBind",
				"disabled"
			],
			[
				"data-p-icon",
				"angle-left",
				3,
				"pBind",
				"class"
			],
			[3, "class"],
			[
				3,
				"options",
				"ngModel",
				"ngModelOptions",
				"disabled",
				"class",
				"appendTo",
				"scrollHeight",
				"pt",
				"unstyled"
			],
			[
				"data-p-icon",
				"angle-right",
				3,
				"pBind",
				"class"
			],
			[
				"type",
				"button",
				"pRipple",
				"",
				3,
				"pBind",
				"disabled",
				"class"
			],
			[
				3,
				"pt",
				"ngModel",
				"ngModelOptions",
				"class",
				"disabled",
				"unstyled"
			],
			[
				3,
				"options",
				"ngModel",
				"ngModelOptions",
				"class",
				"disabled",
				"appendTo",
				"scrollHeight",
				"ariaLabel",
				"pt",
				"unstyled"
			],
			[3, "pBind"],
			[
				4,
				"ngTemplateOutlet",
				"ngTemplateOutletContext"
			],
			[
				"type",
				"button",
				"pRipple",
				"",
				3,
				"click",
				"pBind"
			],
			[
				"data-p-icon",
				"angle-double-left",
				3,
				"pBind",
				"class"
			],
			[
				"data-p-icon",
				"angle-double-left",
				3,
				"pBind"
			],
			[4, "ngTemplateOutlet"],
			[
				"data-p-icon",
				"angle-left",
				3,
				"pBind"
			],
			[
				3,
				"onChange",
				"options",
				"ngModel",
				"ngModelOptions",
				"disabled",
				"appendTo",
				"scrollHeight",
				"pt",
				"unstyled"
			],
			[
				"data-p-icon",
				"angle-right",
				3,
				"pBind"
			],
			[
				"data-p-icon",
				"angle-double-right",
				3,
				"pBind",
				"class"
			],
			[
				"data-p-icon",
				"angle-double-right",
				3,
				"pBind"
			],
			[
				3,
				"ngModelChange",
				"pt",
				"ngModel",
				"ngModelOptions",
				"disabled",
				"unstyled"
			],
			[
				3,
				"ngModelChange",
				"onChange",
				"options",
				"ngModel",
				"ngModelOptions",
				"disabled",
				"appendTo",
				"scrollHeight",
				"ariaLabel",
				"pt",
				"unstyled"
			]
		],
		template: function Paginator_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵconditionalCreate(0, Paginator_Conditional_0_Template, 2, 7, "div", 3);
				ɵɵconditionalCreate(1, Paginator_Conditional_1_Template, 2, 4, "span", 3);
				ɵɵconditionalCreate(2, Paginator_Conditional_2_Template, 3, 5, "button", 4);
				ɵɵelementStart(3, "button", 5);
				ɵɵlistener("click", function Paginator_Template_button_click_3_listener($event) {
					return ctx.changePageToPrev($event);
				});
				ɵɵconditionalCreate(4, Paginator_Conditional_4_Template, 1, 3, "svg", 6)(5, Paginator_Conditional_5_Template, 2, 3, "span", 7);
				ɵɵelementEnd();
				ɵɵconditionalCreate(6, Paginator_Conditional_6_Template, 3, 3, "span", 3);
				ɵɵconditionalCreate(7, Paginator_Conditional_7_Template, 5, 14, "p-select", 8);
				ɵɵelementStart(8, "button", 5);
				ɵɵlistener("click", function Paginator_Template_button_click_8_listener($event) {
					return ctx.changePageToNext($event);
				});
				ɵɵconditionalCreate(9, Paginator_Conditional_9_Template, 1, 3, "svg", 9)(10, Paginator_Conditional_10_Template, 2, 3, "span", 7);
				ɵɵelementEnd();
				ɵɵconditionalCreate(11, Paginator_Conditional_11_Template, 3, 6, "button", 10);
				ɵɵconditionalCreate(12, Paginator_Conditional_12_Template, 1, 8, "p-inputnumber", 11);
				ɵɵconditionalCreate(13, Paginator_Conditional_13_Template, 3, 14, "p-select", 12);
				ɵɵconditionalCreate(14, Paginator_Conditional_14_Template, 2, 7, "div", 3);
			}
			if (rf & 2) {
				ɵɵconditional(ctx.templateLeft() ? 0 : -1);
				ɵɵadvance();
				ɵɵconditional(ctx.showCurrentPageReport() ? 1 : -1);
				ɵɵadvance();
				ɵɵconditional(ctx.showFirstLastIcon() ? 2 : -1);
				ɵɵadvance();
				ɵɵclassMap(ctx.cx("prev"));
				ɵɵproperty("pBind", ctx.ptm("prev"))("disabled", ctx.isFirstPage() || ctx.empty());
				ɵɵattribute("aria-label", ctx.getAriaLabel("prevPageLabel"));
				ɵɵadvance();
				ɵɵconditional(!ctx.previousPageLinkIconTemplate() ? 4 : 5);
				ɵɵadvance(2);
				ɵɵconditional(ctx.showPageLinks() ? 6 : -1);
				ɵɵadvance();
				ɵɵconditional(ctx.showJumpToPageDropdown() ? 7 : -1);
				ɵɵadvance();
				ɵɵclassMap(ctx.cx("next"));
				ɵɵproperty("pBind", ctx.ptm("next"))("disabled", ctx.isLastPage() || ctx.empty());
				ɵɵattribute("aria-label", ctx.getAriaLabel("nextPageLabel"));
				ɵɵadvance();
				ɵɵconditional(!ctx.nextPageLinkIconTemplate() ? 9 : 10);
				ɵɵadvance(2);
				ɵɵconditional(ctx.showFirstLastIcon() ? 11 : -1);
				ɵɵadvance();
				ɵɵconditional(ctx.showJumpToPageInput() ? 12 : -1);
				ɵɵadvance();
				ɵɵconditional(ctx.rowsPerPageOptions() ? 13 : -1);
				ɵɵadvance();
				ɵɵconditional(ctx.templateRight() ? 14 : -1);
			}
		},
		dependencies: [
			NgTemplateOutlet,
			Select,
			InputNumber,
			FormsModule,
			NgControlStatus,
			NgModel,
			Ripple,
			AngleDoubleLeft,
			AngleDoubleRight,
			AngleLeft,
			AngleRight,
			Bind
		],
		encapsulation: 2
	});
})()), _Paginator);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Paginator, [{
		type: Component,
		args: [{
			selector: "p-paginator",
			standalone: true,
			imports: [
				NgTemplateOutlet,
				Select,
				InputNumber,
				FormsModule,
				Ripple,
				AngleDoubleLeft,
				AngleDoubleRight,
				AngleLeft,
				AngleRight,
				Bind
			],
			template: `
        @if (templateLeft()) {
            <div [pBind]="ptm('contentStart')" [class]="cx('contentStart')">
                <ng-container *ngTemplateOutlet="templateLeft()!; context: { $implicit: paginatorState() }"></ng-container>
            </div>
        }
        @if (showCurrentPageReport()) {
            <span [pBind]="ptm('current')" [class]="cx('current')">{{ currentPageReport }}</span>
        }
        @if (showFirstLastIcon()) {
            <button [pBind]="ptm('first')" type="button" (click)="changePageToFirst($event)" pRipple [class]="cx('first')" [attr.aria-label]="getAriaLabel('firstPageLabel')">
                @if (!firstPageLinkIconTemplate()) {
                    <svg [pBind]="ptm('firstIcon')" data-p-icon="angle-double-left" [class]="cx('firstIcon')" />
                } @else {
                    <span [class]="cx('firstIcon')">
                        <ng-template *ngTemplateOutlet="firstPageLinkIconTemplate()!"></ng-template>
                    </span>
                }
            </button>
        }
        <button [pBind]="ptm('prev')" type="button" [disabled]="isFirstPage() || empty()" (click)="changePageToPrev($event)" pRipple [class]="cx('prev')" [attr.aria-label]="getAriaLabel('prevPageLabel')">
            @if (!previousPageLinkIconTemplate()) {
                <svg [pBind]="ptm('prevIcon')" data-p-icon="angle-left" [class]="cx('prevIcon')" />
            } @else {
                <span [class]="cx('prevIcon')">
                    <ng-template *ngTemplateOutlet="previousPageLinkIconTemplate()!"></ng-template>
                </span>
            }
        </button>
        @if (showPageLinks()) {
            <span [pBind]="ptm('pages')" [class]="cx('pages')">
                @for (pageLink of pageLinks(); track $index) {
                    <button
                        [pBind]="ptm('page')"
                        type="button"
                        [class]="cx('page', { pageLink })"
                        [attr.aria-label]="getPageAriaLabel(pageLink)"
                        [attr.aria-current]="pageLink - 1 === getPage() ? 'page' : undefined"
                        (click)="onPageLinkClick($event, pageLink - 1)"
                        pRipple
                    >
                        {{ getLocalization(pageLink) }}
                    </button>
                }
            </span>
        }
        @if (showJumpToPageDropdown()) {
            <p-select
                [options]="pageItems()"
                [ngModel]="getPage()"
                [ngModelOptions]="{ standalone: true }"
                [disabled]="empty()"
                [attr.aria-label]="getAriaLabel('jumpToPageDropdownLabel')"
                [class]="cx('pcJumpToPageDropdown')"
                (onChange)="onPageDropdownChange($event)"
                [appendTo]="$appendTo()"
                [scrollHeight]="dropdownScrollHeight()"
                [pt]="ptm('pcJumpToPageDropdown')"
                [unstyled]="unstyled()"
            >
                <ng-template #selectedItem>{{ currentPageReport }}</ng-template>
                @if (jumpToPageItemTemplate()) {
                    <ng-template #item let-item>
                        <ng-container *ngTemplateOutlet="jumpToPageItemTemplate()!; context: { $implicit: item }"></ng-container>
                    </ng-template>
                }
                @if (dropdownIconTemplate()) {
                    <ng-template #dropdownicon>
                        <ng-container *ngTemplateOutlet="dropdownIconTemplate()!"></ng-container>
                    </ng-template>
                }
            </p-select>
        }
        <button [pBind]="ptm('next')" type="button" [disabled]="isLastPage() || empty()" (click)="changePageToNext($event)" pRipple [class]="cx('next')" [attr.aria-label]="getAriaLabel('nextPageLabel')">
            @if (!nextPageLinkIconTemplate()) {
                <svg [pBind]="ptm('nextIcon')" data-p-icon="angle-right" [class]="cx('nextIcon')" />
            } @else {
                <span [class]="cx('nextIcon')">
                    <ng-template *ngTemplateOutlet="nextPageLinkIconTemplate()!"></ng-template>
                </span>
            }
        </button>
        @if (showFirstLastIcon()) {
            <button [pBind]="ptm('last')" type="button" [disabled]="isLastPage() || empty()" (click)="changePageToLast($event)" pRipple [class]="cx('last')" [attr.aria-label]="getAriaLabel('lastPageLabel')">
                @if (!lastPageLinkIconTemplate()) {
                    <svg [pBind]="ptm('lastIcon')" data-p-icon="angle-double-right" [class]="cx('lastIcon')" />
                } @else {
                    <span [class]="cx('lastIcon')">
                        <ng-template *ngTemplateOutlet="lastPageLinkIconTemplate()!"></ng-template>
                    </span>
                }
            </button>
        }
        @if (showJumpToPageInput()) {
            <p-inputnumber [pt]="ptm('pcJumpToPageInput')" [ngModel]="currentPage()" [ngModelOptions]="{ standalone: true }" [class]="cx('pcJumpToPageInput')" [disabled]="empty()" (ngModelChange)="changePage($event - 1)" [unstyled]="unstyled()" />
        }
        @if (rowsPerPageOptions()) {
            <p-select
                [options]="rowsPerPageItems()"
                [ngModel]="rows()"
                [ngModelOptions]="{ standalone: true }"
                (ngModelChange)="rows.set($event)"
                [class]="cx('pcRowPerPageDropdown')"
                [disabled]="empty()"
                (onChange)="onRppChange($event)"
                [appendTo]="$appendTo()"
                [scrollHeight]="dropdownScrollHeight()"
                [ariaLabel]="getAriaLabel('rowsPerPageLabel')"
                [pt]="ptm('pcRowPerPageDropdown')"
                [unstyled]="unstyled()"
            >
                @if (dropdownItemTemplate()) {
                    <ng-template #item let-item>
                        <ng-container *ngTemplateOutlet="dropdownItemTemplate()!; context: { $implicit: item }"></ng-container>
                    </ng-template>
                }
                @if (dropdownIconTemplate()) {
                    <ng-template #dropdownicon>
                        <ng-container *ngTemplateOutlet="dropdownIconTemplate()!"></ng-container>
                    </ng-template>
                }
            </p-select>
        }
        @if (templateRight()) {
            <div [pBind]="ptm('contentEnd')" [class]="cx('contentEnd')">
                <ng-container *ngTemplateOutlet="templateRight()!; context: { $implicit: paginatorState() }"></ng-container>
            </div>
        }
    `,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None,
			providers: [
				PaginatorStyle,
				{
					provide: PAGINATOR_INSTANCE,
					useExisting: Paginator
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: Paginator
				}
			],
			host: {
				"[class]": "cx('paginator')",
				"[style.display]": "hostDisplay()"
			},
			hostDirectives: [Bind]
		}]
	}], () => [], {
		pageLinkSize: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pageLinkSize",
				required: false
			}]
		}],
		alwaysShow: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "alwaysShow",
				required: false
			}]
		}],
		templateLeft: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "templateLeft",
				required: false
			}]
		}],
		templateRight: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "templateRight",
				required: false
			}]
		}],
		dropdownScrollHeight: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "dropdownScrollHeight",
				required: false
			}]
		}],
		currentPageReportTemplate: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "currentPageReportTemplate",
				required: false
			}]
		}],
		showCurrentPageReport: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "showCurrentPageReport",
				required: false
			}]
		}],
		showFirstLastIcon: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "showFirstLastIcon",
				required: false
			}]
		}],
		totalRecords: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "totalRecords",
				required: false
			}]
		}],
		rows: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "rows",
				required: false
			}]
		}, {
			type: Output,
			args: ["rowsChange"]
		}],
		first: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "first",
				required: false
			}]
		}, {
			type: Output,
			args: ["firstChange"]
		}],
		rowsPerPageOptions: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "rowsPerPageOptions",
				required: false
			}]
		}],
		showJumpToPageDropdown: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "showJumpToPageDropdown",
				required: false
			}]
		}],
		showJumpToPageInput: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "showJumpToPageInput",
				required: false
			}]
		}],
		jumpToPageItemTemplate: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "jumpToPageItemTemplate",
				required: false
			}]
		}],
		showPageLinks: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "showPageLinks",
				required: false
			}]
		}],
		locale: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "locale",
				required: false
			}]
		}],
		dropdownItemTemplate: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "dropdownItemTemplate",
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
		onPageChange: [{
			type: Output,
			args: ["onPageChange"]
		}],
		dropdownIconTemplate: [{
			type: ContentChild,
			args: ["dropdownicon", {
				descendants: false,
				isSignal: true
			}]
		}],
		firstPageLinkIconTemplate: [{
			type: ContentChild,
			args: ["firstpagelinkicon", {
				descendants: false,
				isSignal: true
			}]
		}],
		previousPageLinkIconTemplate: [{
			type: ContentChild,
			args: ["previouspagelinkicon", {
				descendants: false,
				isSignal: true
			}]
		}],
		lastPageLinkIconTemplate: [{
			type: ContentChild,
			args: ["lastpagelinkicon", {
				descendants: false,
				isSignal: true
			}]
		}],
		nextPageLinkIconTemplate: [{
			type: ContentChild,
			args: ["nextpagelinkicon", {
				descendants: false,
				isSignal: true
			}]
		}]
	});
})();
var PaginatorModule = (_PaginatorModule = class PaginatorModule {}, _defineProperty(_PaginatorModule, "ɵfac", function PaginatorModule_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _PaginatorModule)();
}), _defineProperty(_PaginatorModule, "ɵmod", /*@__PURE__*/ ɵɵdefineNgModule({
	type: _PaginatorModule,
	imports: [Paginator],
	exports: [Paginator]
})), _defineProperty(_PaginatorModule, "ɵinj", /*@__PURE__*/ ɵɵdefineInjector({ imports: [Paginator] })), _PaginatorModule);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PaginatorModule, [{
		type: NgModule,
		args: [{
			imports: [Paginator],
			exports: [Paginator]
		}]
	}], null, null);
})();
// ../node_modules/@primeicons/core/dist/esm/icons/sort-alt.mjs
var C$2 = {
	name: "sort-alt",
	meta: { tags: ["sort-alt"] },
	svg: {
		xmlns: "http://www.w3.org/2000/svg",
		width: 20,
		height: 20,
		viewBox: "0 0 20 20",
		fill: "none"
	},
	nodes: [["path", {
		d: "M6.0254 2.25098C6.03225 2.25121 6.03907 2.25153 6.04591 2.25195C6.08456 2.25429 6.12233 2.2596 6.15919 2.26758C6.19247 2.2748 6.22461 2.28607 6.25685 2.29785C6.26933 2.30242 6.28277 2.30437 6.29493 2.30957C6.31402 2.31772 6.33113 2.33004 6.34962 2.33984C6.37342 2.35248 6.39774 2.36387 6.41993 2.37891C6.45876 2.40523 6.49589 2.43533 6.53028 2.46973L9.03029 4.96973C9.32314 5.26261 9.32314 5.73739 9.03029 6.03027C8.7374 6.32316 8.26264 6.32314 7.96974 6.03027L6.75001 4.81055V17C6.75001 17.4142 6.4142 17.75 6.00001 17.75C5.5858 17.75 5.25001 17.4142 5.25001 17V4.81055L4.03028 6.03027C3.7374 6.32316 3.26263 6.32314 2.96973 6.03027C2.67684 5.73738 2.67684 5.26262 2.96973 4.96973L5.46974 2.46973L5.52638 2.41797C5.53657 2.40965 5.54808 2.40321 5.5586 2.39551C5.57414 2.38414 5.59004 2.37345 5.60645 2.36328C5.63035 2.34849 5.65462 2.3351 5.6797 2.32324C5.69787 2.31463 5.71642 2.30697 5.73536 2.2998C5.76294 2.28942 5.79095 2.28144 5.81935 2.27441C5.83941 2.26944 5.85923 2.26309 5.87989 2.25977C5.89095 2.25799 5.90199 2.25616 5.9131 2.25488C5.94159 2.2516 5.97064 2.25 6.00001 2.25C6.00851 2.25 6.01697 2.2507 6.0254 2.25098ZM14 2.25C14.4142 2.25003 14.75 2.58581 14.75 3V15.1895L15.9698 13.9697C16.2627 13.6769 16.7374 13.6768 17.0303 13.9697C17.3232 14.2626 17.3232 14.7374 17.0303 15.0303L14.5303 17.5303C14.4984 17.5622 14.4635 17.5893 14.4278 17.6143C14.3836 17.6451 14.3365 17.6715 14.2862 17.6924C14.2541 17.7056 14.2208 17.7141 14.1875 17.7227C14.1744 17.7261 14.1619 17.7317 14.1485 17.7344C14.1426 17.7356 14.1367 17.7363 14.1309 17.7373C14.0883 17.7448 14.0447 17.75 14 17.75L13.9229 17.7461C13.904 17.7442 13.8856 17.7406 13.8672 17.7373C13.8617 17.7363 13.8561 17.7355 13.8506 17.7344C13.8372 17.7317 13.8247 17.7261 13.8115 17.7227C13.7783 17.714 13.745 17.7057 13.7129 17.6924C13.6838 17.6803 13.6571 17.664 13.6299 17.6484C13.5732 17.616 13.5181 17.5787 13.4698 17.5303L10.9697 15.0303C10.6769 14.7374 10.6769 14.2626 10.9697 13.9697C11.2626 13.6769 11.7374 13.6768 12.0303 13.9697L13.25 15.1895V3C13.25 2.58579 13.5858 2.25 14 2.25Z",
		fill: "currentColor",
		key: "eomyyr"
	}]]
};
// ../node_modules/@primeicons/angular/fesm2022/primeicons-angular-sort-alt.mjs
var _SortAlt;
var SortAlt = class extends CoreIcon {
	constructor() {
		super();
		this._icon = C$2;
	}
};
_SortAlt = SortAlt;
_defineProperty(SortAlt, "ɵfac", function SortAlt_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _SortAlt)();
});
_defineProperty(SortAlt, "ɵcmp", (function() {
	const _forTrack0 = ($index, $item) => $item[1]["key"] || $index;
	function SortAlt_For_1_Case_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "path");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("d", node_r1[1]["d"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("fill-rule", node_r1[1]["fillRule"])("clip-rule", node_r1[1]["clipRule"])("stroke", node_r1[1]["stroke"])("stroke-width", node_r1[1]["strokeWidth"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function SortAlt_For_1_Case_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "circle");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("r", node_r1[1]["r"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function SortAlt_For_1_Case_2_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "rect");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x", node_r1[1]["x"])("y", node_r1[1]["y"])("width", node_r1[1]["width"])("height", node_r1[1]["height"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function SortAlt_For_1_Case_3_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "line");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x1", node_r1[1]["x1"])("y1", node_r1[1]["y1"])("x2", node_r1[1]["x2"])("y2", node_r1[1]["y2"])("stroke", node_r1[1]["stroke"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function SortAlt_For_1_Case_4_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polyline");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function SortAlt_For_1_Case_5_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polygon");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function SortAlt_For_1_Case_6_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "ellipse");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function SortAlt_For_1_Template(rf, ctx) {
		if (rf & 1) ɵɵconditionalCreate(0, SortAlt_For_1_Case_0_Template, 1, 9, "path")(1, SortAlt_For_1_Case_1_Template, 1, 6, "circle")(2, SortAlt_For_1_Case_2_Template, 1, 9, "rect")(3, SortAlt_For_1_Case_3_Template, 1, 7, "line")(4, SortAlt_For_1_Case_4_Template, 1, 4, "polyline")(5, SortAlt_For_1_Case_5_Template, 1, 4, "polygon")(6, SortAlt_For_1_Case_6_Template, 1, 7, "ellipse");
		if (rf & 2) {
			let tmp_10_0 = void 0;
			const node_r1 = ctx.$implicit;
			ɵɵconditional((tmp_10_0 = node_r1[0]) === "path" ? 0 : tmp_10_0 === "circle" ? 1 : tmp_10_0 === "rect" ? 2 : tmp_10_0 === "line" ? 3 : tmp_10_0 === "polyline" ? 4 : tmp_10_0 === "polygon" ? 5 : tmp_10_0 === "ellipse" ? 6 : -1);
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _SortAlt,
		selectors: [[
			"svg",
			"data-p-icon",
			"sort-alt"
		]],
		features: [ɵɵInheritDefinitionFeature],
		decls: 2,
		vars: 0,
		template: function SortAlt_Template(rf, ctx) {
			if (rf & 1) ɵɵrepeaterCreate(0, SortAlt_For_1_Template, 7, 1, null, null, _forTrack0);
			if (rf & 2) ɵɵrepeater(ctx.iconNodes());
		},
		encapsulation: 2,
		changeDetection: 1
	});
})());
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SortAlt, [{
		type: Component,
		args: [{
			selector: "svg[data-p-icon=\"sort-alt\"]",
			standalone: true,
			template: "\n        @for (node of iconNodes(); track node[1]['key'] || $index) {\n            @switch (node[0]) {\n                @case ('path') {\n                    <svg:path\n                        [attr.d]=\"node[1]['d']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.fill-rule]=\"node[1]['fillRule']\"\n                        [attr.clip-rule]=\"node[1]['clipRule']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-width]=\"node[1]['strokeWidth']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('circle') {\n                    <svg:circle\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.r]=\"node[1]['r']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('rect') {\n                    <svg:rect\n                        [attr.x]=\"node[1]['x']\"\n                        [attr.y]=\"node[1]['y']\"\n                        [attr.width]=\"node[1]['width']\"\n                        [attr.height]=\"node[1]['height']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('line') {\n                    <svg:line\n                        [attr.x1]=\"node[1]['x1']\"\n                        [attr.y1]=\"node[1]['y1']\"\n                        [attr.x2]=\"node[1]['x2']\"\n                        [attr.y2]=\"node[1]['y2']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polyline') {\n                    <svg:polyline\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polygon') {\n                    <svg:polygon\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('ellipse') {\n                    <svg:ellipse\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n            }\n        }\n"
		}]
	}], () => [], null);
})();
// ../node_modules/@primeicons/core/dist/esm/icons/sort-amount-down.mjs
var C$1 = {
	name: "sort-amount-down",
	meta: { tags: ["sort-amount-down"] },
	svg: {
		xmlns: "http://www.w3.org/2000/svg",
		width: 20,
		height: 20,
		viewBox: "0 0 20 20",
		fill: "none"
	},
	nodes: [["path", {
		d: "M6 2.25C6.41419 2.25003 6.75 2.58581 6.75 3V15.1895L7.96973 13.9697C8.26263 13.6769 8.73739 13.6768 9.03028 13.9697C9.32313 14.2626 9.32313 14.7374 9.03028 15.0303L6.53028 17.5303C6.4984 17.5622 6.46345 17.5893 6.42774 17.6143C6.38361 17.6451 6.3365 17.6715 6.28614 17.6924C6.25408 17.7056 6.22077 17.7141 6.1875 17.7227C6.17438 17.7261 6.16183 17.7317 6.14844 17.7344C6.14261 17.7356 6.13672 17.7363 6.13086 17.7373C6.0883 17.7448 6.04472 17.75 6 17.75L5.92286 17.7461C5.90403 17.7442 5.88558 17.7406 5.86719 17.7373C5.86166 17.7363 5.8561 17.7355 5.85059 17.7344C5.8372 17.7317 5.82465 17.7261 5.81153 17.7227C5.77828 17.714 5.74493 17.7057 5.71289 17.6924C5.68375 17.6803 5.65704 17.664 5.62989 17.6484C5.5732 17.616 5.51813 17.5787 5.46973 17.5303L2.96973 15.0303C2.67684 14.7374 2.67684 14.2626 2.96973 13.9697C3.26263 13.6769 3.73739 13.6768 4.03028 13.9697L5.25 15.1895V3C5.25 2.58579 5.58579 2.25 6 2.25ZM11 11.25C11.4142 11.25 11.75 11.5858 11.75 12C11.75 12.4142 11.4142 12.75 11 12.75H10.5C10.0858 12.75 9.75 12.4142 9.75 12C9.75 11.5858 10.0858 11.25 10.5 11.25H11ZM13 8.25C13.4142 8.25003 13.75 8.58581 13.75 9C13.75 9.4142 13.4142 9.74997 13 9.75H10.5C10.0858 9.75 9.75 9.41421 9.75 9C9.75 8.58579 10.0858 8.25 10.5 8.25H13ZM15 5.25C15.4142 5.25003 15.75 5.58581 15.75 6C15.75 6.4142 15.4142 6.74997 15 6.75H10.5C10.0858 6.75 9.75 6.41421 9.75 6C9.75 5.58579 10.0858 5.25 10.5 5.25H15ZM17 2.25C17.4142 2.25003 17.75 2.58581 17.75 3C17.75 3.41419 17.4142 3.74997 17 3.75H10.5C10.0858 3.75 9.75 3.41421 9.75 3C9.75 2.58579 10.0858 2.25 10.5 2.25H17Z",
		fill: "currentColor",
		key: "sij9t"
	}]]
};
// ../node_modules/@primeicons/angular/fesm2022/primeicons-angular-sort-amount-down.mjs
var _SortAmountDown;
var SortAmountDown = class extends CoreIcon {
	constructor() {
		super();
		this._icon = C$1;
	}
};
_SortAmountDown = SortAmountDown;
_defineProperty(SortAmountDown, "ɵfac", function SortAmountDown_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _SortAmountDown)();
});
_defineProperty(SortAmountDown, "ɵcmp", (function() {
	const _forTrack0 = ($index, $item) => $item[1]["key"] || $index;
	function SortAmountDown_For_1_Case_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "path");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("d", node_r1[1]["d"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("fill-rule", node_r1[1]["fillRule"])("clip-rule", node_r1[1]["clipRule"])("stroke", node_r1[1]["stroke"])("stroke-width", node_r1[1]["strokeWidth"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function SortAmountDown_For_1_Case_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "circle");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("r", node_r1[1]["r"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function SortAmountDown_For_1_Case_2_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "rect");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x", node_r1[1]["x"])("y", node_r1[1]["y"])("width", node_r1[1]["width"])("height", node_r1[1]["height"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function SortAmountDown_For_1_Case_3_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "line");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x1", node_r1[1]["x1"])("y1", node_r1[1]["y1"])("x2", node_r1[1]["x2"])("y2", node_r1[1]["y2"])("stroke", node_r1[1]["stroke"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function SortAmountDown_For_1_Case_4_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polyline");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function SortAmountDown_For_1_Case_5_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polygon");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function SortAmountDown_For_1_Case_6_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "ellipse");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function SortAmountDown_For_1_Template(rf, ctx) {
		if (rf & 1) ɵɵconditionalCreate(0, SortAmountDown_For_1_Case_0_Template, 1, 9, "path")(1, SortAmountDown_For_1_Case_1_Template, 1, 6, "circle")(2, SortAmountDown_For_1_Case_2_Template, 1, 9, "rect")(3, SortAmountDown_For_1_Case_3_Template, 1, 7, "line")(4, SortAmountDown_For_1_Case_4_Template, 1, 4, "polyline")(5, SortAmountDown_For_1_Case_5_Template, 1, 4, "polygon")(6, SortAmountDown_For_1_Case_6_Template, 1, 7, "ellipse");
		if (rf & 2) {
			let tmp_10_0 = void 0;
			const node_r1 = ctx.$implicit;
			ɵɵconditional((tmp_10_0 = node_r1[0]) === "path" ? 0 : tmp_10_0 === "circle" ? 1 : tmp_10_0 === "rect" ? 2 : tmp_10_0 === "line" ? 3 : tmp_10_0 === "polyline" ? 4 : tmp_10_0 === "polygon" ? 5 : tmp_10_0 === "ellipse" ? 6 : -1);
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _SortAmountDown,
		selectors: [[
			"svg",
			"data-p-icon",
			"sort-amount-down"
		]],
		features: [ɵɵInheritDefinitionFeature],
		decls: 2,
		vars: 0,
		template: function SortAmountDown_Template(rf, ctx) {
			if (rf & 1) ɵɵrepeaterCreate(0, SortAmountDown_For_1_Template, 7, 1, null, null, _forTrack0);
			if (rf & 2) ɵɵrepeater(ctx.iconNodes());
		},
		encapsulation: 2,
		changeDetection: 1
	});
})());
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SortAmountDown, [{
		type: Component,
		args: [{
			selector: "svg[data-p-icon=\"sort-amount-down\"]",
			standalone: true,
			template: "\n        @for (node of iconNodes(); track node[1]['key'] || $index) {\n            @switch (node[0]) {\n                @case ('path') {\n                    <svg:path\n                        [attr.d]=\"node[1]['d']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.fill-rule]=\"node[1]['fillRule']\"\n                        [attr.clip-rule]=\"node[1]['clipRule']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-width]=\"node[1]['strokeWidth']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('circle') {\n                    <svg:circle\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.r]=\"node[1]['r']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('rect') {\n                    <svg:rect\n                        [attr.x]=\"node[1]['x']\"\n                        [attr.y]=\"node[1]['y']\"\n                        [attr.width]=\"node[1]['width']\"\n                        [attr.height]=\"node[1]['height']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('line') {\n                    <svg:line\n                        [attr.x1]=\"node[1]['x1']\"\n                        [attr.y1]=\"node[1]['y1']\"\n                        [attr.x2]=\"node[1]['x2']\"\n                        [attr.y2]=\"node[1]['y2']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polyline') {\n                    <svg:polyline\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polygon') {\n                    <svg:polygon\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('ellipse') {\n                    <svg:ellipse\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n            }\n        }\n"
		}]
	}], () => [], null);
})();
// ../node_modules/@primeicons/core/dist/esm/icons/sort-amount-up-alt.mjs
var C = {
	name: "sort-amount-up-alt",
	meta: { tags: ["sort-amount-up-alt"] },
	svg: {
		xmlns: "http://www.w3.org/2000/svg",
		width: 20,
		height: 20,
		viewBox: "0 0 20 20",
		fill: "none"
	},
	nodes: [["path", {
		d: "M6.02539 2.25098C6.03224 2.25121 6.03906 2.25153 6.0459 2.25195C6.08456 2.25429 6.12233 2.2596 6.15918 2.26758C6.19246 2.2748 6.22461 2.28607 6.25684 2.29785C6.26932 2.30242 6.28276 2.30437 6.29493 2.30957C6.31401 2.31772 6.33112 2.33004 6.34961 2.33984C6.37341 2.35248 6.39773 2.36387 6.41993 2.37891C6.45875 2.40523 6.49589 2.43533 6.53028 2.46973L9.03028 4.96973C9.32313 5.26261 9.32313 5.73739 9.03028 6.03027C8.73739 6.32316 8.26263 6.32314 7.96973 6.03027L6.75 4.81055V17C6.75 17.4142 6.41419 17.75 6 17.75C5.58579 17.75 5.25 17.4142 5.25 17V4.81055L4.03028 6.03027C3.73739 6.32316 3.26263 6.32314 2.96973 6.03027C2.67684 5.73738 2.67684 5.26262 2.96973 4.96973L5.46973 2.46973L5.52637 2.41797C5.53657 2.40965 5.54808 2.40321 5.5586 2.39551C5.57414 2.38414 5.59004 2.37345 5.60645 2.36328C5.63035 2.34849 5.65462 2.3351 5.67969 2.32324C5.69787 2.31463 5.71641 2.30697 5.73536 2.2998C5.76293 2.28942 5.79094 2.28144 5.81934 2.27441C5.8394 2.26944 5.85922 2.26309 5.87989 2.25977C5.89094 2.25799 5.90198 2.25616 5.91309 2.25488C5.94158 2.2516 5.97063 2.25 6 2.25C6.00851 2.25 6.01696 2.2507 6.02539 2.25098ZM17 16.25C17.4142 16.25 17.75 16.5858 17.75 17C17.75 17.4142 17.4142 17.75 17 17.75H10.5C10.0858 17.75 9.75 17.4142 9.75 17C9.75 16.5858 10.0858 16.25 10.5 16.25H17ZM15 13.25C15.4142 13.25 15.75 13.5858 15.75 14C15.75 14.4142 15.4142 14.75 15 14.75H10.5C10.0858 14.75 9.75 14.4142 9.75 14C9.75 13.5858 10.0858 13.25 10.5 13.25H15ZM13 10.25C13.4142 10.25 13.75 10.5858 13.75 11C13.75 11.4142 13.4142 11.75 13 11.75H10.5C10.0858 11.75 9.75 11.4142 9.75 11C9.75 10.5858 10.0858 10.25 10.5 10.25H13ZM11 7.25C11.4142 7.25003 11.75 7.58581 11.75 8C11.75 8.4142 11.4142 8.74997 11 8.75H10.5C10.0858 8.75 9.75 8.41421 9.75 8C9.75 7.58579 10.0858 7.25 10.5 7.25H11Z",
		fill: "currentColor",
		key: "5lgl16"
	}]]
};
// ../node_modules/@primeicons/angular/fesm2022/primeicons-angular-sort-amount-up-alt.mjs
var _SortAmountUpAlt;
var SortAmountUpAlt = class extends CoreIcon {
	constructor() {
		super();
		this._icon = C;
	}
};
_SortAmountUpAlt = SortAmountUpAlt;
_defineProperty(SortAmountUpAlt, "ɵfac", function SortAmountUpAlt_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _SortAmountUpAlt)();
});
_defineProperty(SortAmountUpAlt, "ɵcmp", (function() {
	const _forTrack0 = ($index, $item) => $item[1]["key"] || $index;
	function SortAmountUpAlt_For_1_Case_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "path");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("d", node_r1[1]["d"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("fill-rule", node_r1[1]["fillRule"])("clip-rule", node_r1[1]["clipRule"])("stroke", node_r1[1]["stroke"])("stroke-width", node_r1[1]["strokeWidth"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function SortAmountUpAlt_For_1_Case_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "circle");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("r", node_r1[1]["r"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function SortAmountUpAlt_For_1_Case_2_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "rect");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x", node_r1[1]["x"])("y", node_r1[1]["y"])("width", node_r1[1]["width"])("height", node_r1[1]["height"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function SortAmountUpAlt_For_1_Case_3_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "line");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x1", node_r1[1]["x1"])("y1", node_r1[1]["y1"])("x2", node_r1[1]["x2"])("y2", node_r1[1]["y2"])("stroke", node_r1[1]["stroke"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function SortAmountUpAlt_For_1_Case_4_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polyline");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function SortAmountUpAlt_For_1_Case_5_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polygon");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function SortAmountUpAlt_For_1_Case_6_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "ellipse");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function SortAmountUpAlt_For_1_Template(rf, ctx) {
		if (rf & 1) ɵɵconditionalCreate(0, SortAmountUpAlt_For_1_Case_0_Template, 1, 9, "path")(1, SortAmountUpAlt_For_1_Case_1_Template, 1, 6, "circle")(2, SortAmountUpAlt_For_1_Case_2_Template, 1, 9, "rect")(3, SortAmountUpAlt_For_1_Case_3_Template, 1, 7, "line")(4, SortAmountUpAlt_For_1_Case_4_Template, 1, 4, "polyline")(5, SortAmountUpAlt_For_1_Case_5_Template, 1, 4, "polygon")(6, SortAmountUpAlt_For_1_Case_6_Template, 1, 7, "ellipse");
		if (rf & 2) {
			let tmp_10_0 = void 0;
			const node_r1 = ctx.$implicit;
			ɵɵconditional((tmp_10_0 = node_r1[0]) === "path" ? 0 : tmp_10_0 === "circle" ? 1 : tmp_10_0 === "rect" ? 2 : tmp_10_0 === "line" ? 3 : tmp_10_0 === "polyline" ? 4 : tmp_10_0 === "polygon" ? 5 : tmp_10_0 === "ellipse" ? 6 : -1);
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _SortAmountUpAlt,
		selectors: [[
			"svg",
			"data-p-icon",
			"sort-amount-up-alt"
		]],
		features: [ɵɵInheritDefinitionFeature],
		decls: 2,
		vars: 0,
		template: function SortAmountUpAlt_Template(rf, ctx) {
			if (rf & 1) ɵɵrepeaterCreate(0, SortAmountUpAlt_For_1_Template, 7, 1, null, null, _forTrack0);
			if (rf & 2) ɵɵrepeater(ctx.iconNodes());
		},
		encapsulation: 2,
		changeDetection: 1
	});
})());
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SortAmountUpAlt, [{
		type: Component,
		args: [{
			selector: "svg[data-p-icon=\"sort-amount-up-alt\"]",
			standalone: true,
			template: "\n        @for (node of iconNodes(); track node[1]['key'] || $index) {\n            @switch (node[0]) {\n                @case ('path') {\n                    <svg:path\n                        [attr.d]=\"node[1]['d']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.fill-rule]=\"node[1]['fillRule']\"\n                        [attr.clip-rule]=\"node[1]['clipRule']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-width]=\"node[1]['strokeWidth']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('circle') {\n                    <svg:circle\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.r]=\"node[1]['r']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('rect') {\n                    <svg:rect\n                        [attr.x]=\"node[1]['x']\"\n                        [attr.y]=\"node[1]['y']\"\n                        [attr.width]=\"node[1]['width']\"\n                        [attr.height]=\"node[1]['height']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('line') {\n                    <svg:line\n                        [attr.x1]=\"node[1]['x1']\"\n                        [attr.y1]=\"node[1]['y1']\"\n                        [attr.x2]=\"node[1]['x2']\"\n                        [attr.y2]=\"node[1]['y2']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polyline') {\n                    <svg:polyline\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polygon') {\n                    <svg:polygon\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('ellipse') {\n                    <svg:ellipse\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n            }\n        }\n"
		}]
	}], () => [], null);
})();
// ../node_modules/@primeuix/styles/dist/radiobutton/index.mjs
var style$2 = "\n    .p-radiobutton {\n        position: relative;\n        display: inline-flex;\n        user-select: none;\n        vertical-align: bottom;\n        width: dt('radiobutton.width');\n        height: dt('radiobutton.height');\n    }\n\n    .p-radiobutton-input {\n        cursor: pointer;\n        appearance: none;\n        position: absolute;\n        top: 0;\n        inset-inline-start: 0;\n        width: 100%;\n        height: 100%;\n        padding: 0;\n        margin: 0;\n        opacity: 0;\n        z-index: 1;\n        outline: 0 none;\n        border: 1px solid transparent;\n        border-radius: 50%;\n    }\n\n    .p-radiobutton-box {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        border-radius: 50%;\n        border: 1px solid dt('radiobutton.border.color');\n        background: dt('radiobutton.background');\n        width: dt('radiobutton.width');\n        height: dt('radiobutton.height');\n        transition:\n            background dt('radiobutton.transition.duration'),\n            color dt('radiobutton.transition.duration'),\n            border-color dt('radiobutton.transition.duration'),\n            box-shadow dt('radiobutton.transition.duration'),\n            outline-color dt('radiobutton.transition.duration');\n        outline-color: transparent;\n        box-shadow: dt('radiobutton.shadow');\n    }\n\n    .p-radiobutton-icon {\n        transition-duration: dt('radiobutton.transition.duration');\n        background: transparent;\n        font-size: dt('radiobutton.icon.size');\n        width: dt('radiobutton.icon.size');\n        height: dt('radiobutton.icon.size');\n        border-radius: 50%;\n        backface-visibility: hidden;\n        transform: translateZ(0) scale(0.1);\n    }\n\n    .p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:hover) .p-radiobutton-box {\n        border-color: dt('radiobutton.hover.border.color');\n    }\n\n    .p-radiobutton-checked .p-radiobutton-box {\n        border-color: dt('radiobutton.checked.border.color');\n        background: dt('radiobutton.checked.background');\n    }\n\n    .p-radiobutton-checked .p-radiobutton-box .p-radiobutton-icon {\n        background: dt('radiobutton.icon.checked.color');\n        transform: translateZ(0) scale(1, 1);\n        visibility: visible;\n    }\n\n    .p-radiobutton-checked:not(.p-disabled):has(.p-radiobutton-input:hover) .p-radiobutton-box {\n        border-color: dt('radiobutton.checked.hover.border.color');\n        background: dt('radiobutton.checked.hover.background');\n    }\n\n    .p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:hover).p-radiobutton-checked .p-radiobutton-box .p-radiobutton-icon {\n        background: dt('radiobutton.icon.checked.hover.color');\n    }\n\n    .p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {\n        border-color: dt('radiobutton.focus.border.color');\n        box-shadow: dt('radiobutton.focus.ring.shadow');\n        outline: dt('radiobutton.focus.ring.width') dt('radiobutton.focus.ring.style') dt('radiobutton.focus.ring.color');\n        outline-offset: dt('radiobutton.focus.ring.offset');\n    }\n\n    .p-radiobutton-checked:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {\n        border-color: dt('radiobutton.checked.focus.border.color');\n    }\n\n    .p-radiobutton.p-invalid > .p-radiobutton-box {\n        border-color: dt('radiobutton.invalid.border.color');\n    }\n\n    .p-radiobutton.p-variant-filled .p-radiobutton-box {\n        background: dt('radiobutton.filled.background');\n    }\n\n    .p-radiobutton.p-variant-filled.p-radiobutton-checked .p-radiobutton-box {\n        background: dt('radiobutton.checked.background');\n    }\n\n    .p-radiobutton.p-variant-filled:not(.p-disabled):has(.p-radiobutton-input:hover).p-radiobutton-checked .p-radiobutton-box {\n        background: dt('radiobutton.checked.hover.background');\n    }\n\n    .p-radiobutton.p-disabled {\n        opacity: 1;\n    }\n\n    .p-radiobutton.p-disabled .p-radiobutton-box {\n        background: dt('radiobutton.disabled.background');\n        border-color: dt('radiobutton.checked.disabled.border.color');\n    }\n\n    .p-radiobutton-checked.p-disabled .p-radiobutton-box .p-radiobutton-icon {\n        background: dt('radiobutton.icon.disabled.color');\n    }\n\n    .p-radiobutton-sm,\n    .p-radiobutton-sm .p-radiobutton-box {\n        width: dt('radiobutton.sm.width');\n        height: dt('radiobutton.sm.height');\n    }\n\n    .p-radiobutton-sm .p-radiobutton-icon {\n        font-size: dt('radiobutton.icon.sm.size');\n        width: dt('radiobutton.icon.sm.size');\n        height: dt('radiobutton.icon.sm.size');\n    }\n\n    .p-radiobutton-lg,\n    .p-radiobutton-lg .p-radiobutton-box {\n        width: dt('radiobutton.lg.width');\n        height: dt('radiobutton.lg.height');\n    }\n\n    .p-radiobutton-lg .p-radiobutton-icon {\n        font-size: dt('radiobutton.icon.lg.size');\n        width: dt('radiobutton.icon.lg.size');\n        height: dt('radiobutton.icon.lg.size');\n    }\n";
// ../node_modules/primeng/fesm2022/primeng-radiobutton.mjs
var _RadioButtonStyle;
var _RadioControlRegistry;
var _RadioButton;
var _RadioButtonModule;
var classes$2 = {
	root: ({ instance }) => ["p-radiobutton p-component", {
		"p-radiobutton-checked": instance.checked(),
		"p-disabled": instance.$disabled(),
		"p-invalid": instance.invalid(),
		"p-variant-filled": instance.$variant() === "filled",
		"p-radiobutton-sm p-inputfield-sm": instance.size() === "small",
		"p-radiobutton-lg p-inputfield-lg": instance.size() === "large"
	}],
	box: "p-radiobutton-box",
	input: "p-radiobutton-input",
	icon: "p-radiobutton-icon"
};
var RadioButtonStyle = (_RadioButtonStyle = class RadioButtonStyle extends BaseStyle {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "name", "radiobutton");
		_defineProperty(this, "style", style$2);
		_defineProperty(this, "classes", classes$2);
	}
}, _defineProperty(_RadioButtonStyle, "ɵfac", /*@__PURE__*/ (() => {
	let ɵRadioButtonStyle_BaseFactory = void 0;
	return function RadioButtonStyle_Factory(__ngFactoryType__) {
		return (ɵRadioButtonStyle_BaseFactory || (ɵRadioButtonStyle_BaseFactory = ɵɵgetInheritedFactory(_RadioButtonStyle)))(__ngFactoryType__ || _RadioButtonStyle);
	};
})()), _defineProperty(_RadioButtonStyle, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _RadioButtonStyle,
	factory: _RadioButtonStyle.ɵfac
})), _RadioButtonStyle);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RadioButtonStyle, [{ type: Injectable }], null, null);
})();
var RadioButtonClasses;
(function(RadioButtonClasses) {
	RadioButtonClasses["root"] = "p-radiobutton";
	RadioButtonClasses["box"] = "p-radiobutton-box";
	RadioButtonClasses["input"] = "p-radiobutton-input";
	RadioButtonClasses["icon"] = "p-radiobutton-icon";
})(RadioButtonClasses || (RadioButtonClasses = {}));
var RADIOBUTTON_INSTANCE = new InjectionToken("RADIOBUTTON_INSTANCE");
var RADIO_VALUE_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => RadioButton),
	multi: true
};
var RadioControlRegistry = (_RadioControlRegistry = class RadioControlRegistry {
	constructor() {
		_defineProperty(this, "accessors", []);
	}
	add(control, accessor) {
		this.accessors.push([control, accessor]);
	}
	remove(accessor) {
		this.accessors = this.accessors.filter((c) => c[1] !== accessor);
	}
	select(accessor) {
		this.accessors.forEach((c) => {
			if (this.isSameGroup(c, accessor) && c[1] !== accessor) c[1].writeValue(accessor.value());
		});
	}
	isSameGroup(controlPair, accessor) {
		if (!controlPair[0].control) return false;
		return controlPair[0].control.root === accessor.control.control.root && controlPair[1].name() === accessor.name();
	}
}, _defineProperty(_RadioControlRegistry, "ɵfac", function RadioControlRegistry_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _RadioControlRegistry)();
}), _defineProperty(_RadioControlRegistry, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _RadioControlRegistry,
	factory: _RadioControlRegistry.ɵfac,
	providedIn: "root"
})), _RadioControlRegistry);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RadioControlRegistry, [{
		type: Injectable,
		args: [{ providedIn: "root" }]
	}], null, null);
})();
var RadioButton = (_RadioButton = class RadioButton extends BaseEditableHolder {
	constructor(..._args2) {
		var _inject;
		super(..._args2);
		_defineProperty(this, "componentName", "RadioButton");
		_defineProperty(this, "$pcRadioButton", (_inject = inject(RADIOBUTTON_INSTANCE, {
			optional: true,
			skipSelf: true
		})) !== null && _inject !== void 0 ? _inject : void 0);
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		_defineProperty(this, "value", input(...ngDevMode ? [void 0, { debugName: "value" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "tabindex", input(...ngDevMode ? [void 0, { debugName: "tabindex" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "inputId", input(...ngDevMode ? [void 0, { debugName: "inputId" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "ariaLabelledBy", input(...ngDevMode ? [void 0, { debugName: "ariaLabelledBy" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "ariaLabel", input(...ngDevMode ? [void 0, { debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "autofocus", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "autofocus" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "binary", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "binary" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "variant", input(...ngDevMode ? [void 0, { debugName: "variant" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "size", input(...ngDevMode ? [void 0, { debugName: "size" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "onClick", output());
		_defineProperty(this, "onFocus", output());
		_defineProperty(this, "onBlur", output());
		_defineProperty(this, "inputViewChild", viewChild.required("input", ...ngDevMode ? [{ debugName: "inputViewChild" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$variant", computed(() => this.variant() || this.config.inputVariant() || void 0, ...ngDevMode ? [{ debugName: "$variant" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "attrRequired", computed(() => this.required() ? "" : void 0, ...ngDevMode ? [{ debugName: "attrRequired" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "attrDisabled", computed(() => this.$disabled() ? "" : void 0, ...ngDevMode ? [{ debugName: "attrDisabled" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataP", computed(() => this.cn({
			invalid: this.invalid(),
			checked: this.checked(),
			disabled: this.$disabled(),
			filled: this.$variant() === "filled",
			[this.size()]: this.size()
		}), ...ngDevMode ? [{ debugName: "dataP" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "checked", signal(null, ...ngDevMode ? [{ debugName: "checked" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "focused", void 0);
		_defineProperty(this, "control", void 0);
		_defineProperty(this, "_componentStyle", inject(RadioButtonStyle));
		_defineProperty(this, "injector", inject(Injector));
		_defineProperty(this, "registry", inject(RadioControlRegistry));
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
	}
	onInit() {
		this.control = this.injector.get(NgControl);
		this.registry.add(this.control, this);
	}
	onChange(event) {
		if (!this.$disabled()) this.select(event);
	}
	select(event) {
		if (!this.$disabled()) {
			this.checked.set(true);
			this.writeModelValue(this.checked());
			this.onModelChange(this.value());
			this.registry.select(this);
			this.onClick.emit({
				originalEvent: event,
				value: this.value()
			});
		}
	}
	onInputFocus(event) {
		this.focused = true;
		this.onFocus.emit(event);
	}
	onInputBlur(event) {
		this.focused = false;
		this.onModelTouched();
		this.onBlur.emit(event);
	}
	focus() {
		this.inputViewChild().nativeElement.focus();
	}
	writeControlValue(value, setModelValue) {
		this.checked.set(!this.binary() ? value == this.value() : !!value);
		setModelValue(this.checked());
	}
	onDestroy() {
		this.registry.remove(this);
	}
}, _defineProperty(_RadioButton, "ɵfac", /*@__PURE__*/ (() => {
	let ɵRadioButton_BaseFactory = void 0;
	return function RadioButton_Factory(__ngFactoryType__) {
		return (ɵRadioButton_BaseFactory || (ɵRadioButton_BaseFactory = ɵɵgetInheritedFactory(_RadioButton)))(__ngFactoryType__ || _RadioButton);
	};
})()), _defineProperty(_RadioButton, "ɵcmp", (function() {
	const _c0 = ["input"];
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _RadioButton,
		selectors: [["p-radiobutton"], ["p-radio-button"]],
		viewQuery: function RadioButton_Query(rf, ctx) {
			if (rf & 1) ɵɵviewQuerySignal(ctx.inputViewChild, _c0, 5);
			if (rf & 2) ɵɵqueryAdvance();
		},
		hostVars: 5,
		hostBindings: function RadioButton_HostBindings(rf, ctx) {
			if (rf & 2) {
				ɵɵattribute("data-p-disabled", ctx.$disabled())("data-p-checked", ctx.checked())("data-p", ctx.dataP());
				ɵɵclassMap(ctx.cx("root"));
			}
		},
		inputs: {
			value: [1, "value"],
			tabindex: [1, "tabindex"],
			inputId: [1, "inputId"],
			ariaLabelledBy: [1, "ariaLabelledBy"],
			ariaLabel: [1, "ariaLabel"],
			autofocus: [1, "autofocus"],
			binary: [1, "binary"],
			variant: [1, "variant"],
			size: [1, "size"]
		},
		outputs: {
			onClick: "onClick",
			onFocus: "onFocus",
			onBlur: "onBlur"
		},
		features: [
			ɵɵProvidersFeature([
				RADIO_VALUE_ACCESSOR,
				RadioButtonStyle,
				{
					provide: RADIOBUTTON_INSTANCE,
					useExisting: _RadioButton
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: _RadioButton
				}
			]),
			ɵɵHostDirectivesFeature([Bind]),
			ɵɵInheritDefinitionFeature
		],
		decls: 4,
		vars: 20,
		consts: [
			["input", ""],
			[
				"type",
				"radio",
				3,
				"focus",
				"blur",
				"change",
				"checked",
				"pAutoFocus",
				"pBind"
			],
			[3, "pBind"]
		],
		template: function RadioButton_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵelementStart(0, "input", 1, 0);
				ɵɵlistener("focus", function RadioButton_Template_input_focus_0_listener($event) {
					return ctx.onInputFocus($event);
				})("blur", function RadioButton_Template_input_blur_0_listener($event) {
					return ctx.onInputBlur($event);
				})("change", function RadioButton_Template_input_change_0_listener($event) {
					return ctx.onChange($event);
				});
				ɵɵelementEnd();
				ɵɵelementStart(2, "div", 2);
				ɵɵelement(3, "div", 2);
				ɵɵelementEnd();
			}
			if (rf & 2) {
				ɵɵclassMap(ctx.cx("input"));
				ɵɵproperty("checked", ctx.checked())("pAutoFocus", ctx.autofocus())("pBind", ctx.ptm("input"));
				ɵɵattribute("id", ctx.inputId())("name", ctx.name())("required", ctx.attrRequired())("disabled", ctx.attrDisabled())("value", ctx.modelValue())("aria-labelledby", ctx.ariaLabelledBy())("aria-label", ctx.ariaLabel())("aria-checked", ctx.checked())("tabindex", ctx.tabindex());
				ɵɵadvance(2);
				ɵɵclassMap(ctx.cx("box"));
				ɵɵproperty("pBind", ctx.ptm("box"));
				ɵɵadvance();
				ɵɵclassMap(ctx.cx("icon"));
				ɵɵproperty("pBind", ctx.ptm("icon"));
			}
		},
		dependencies: [
			AutoFocus,
			SharedModule,
			BindModule,
			Bind
		],
		encapsulation: 2
	});
})()), _RadioButton);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RadioButton, [{
		type: Component,
		args: [{
			selector: "p-radiobutton, p-radio-button",
			standalone: true,
			imports: [
				AutoFocus,
				SharedModule,
				BindModule
			],
			template: `
        <input
            #input
            [attr.id]="inputId()"
            type="radio"
            [class]="cx('input')"
            [attr.name]="name()"
            [attr.required]="attrRequired()"
            [attr.disabled]="attrDisabled()"
            [checked]="checked()"
            [attr.value]="modelValue()"
            [attr.aria-labelledby]="ariaLabelledBy()"
            [attr.aria-label]="ariaLabel()"
            [attr.aria-checked]="checked()"
            [attr.tabindex]="tabindex()"
            (focus)="onInputFocus($event)"
            (blur)="onInputBlur($event)"
            (change)="onChange($event)"
            [pAutoFocus]="autofocus()"
            [pBind]="ptm('input')"
        />
        <div [class]="cx('box')" [pBind]="ptm('box')">
            <div [class]="cx('icon')" [pBind]="ptm('icon')"></div>
        </div>
    `,
			providers: [
				RADIO_VALUE_ACCESSOR,
				RadioButtonStyle,
				{
					provide: RADIOBUTTON_INSTANCE,
					useExisting: RadioButton
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: RadioButton
				}
			],
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None,
			host: {
				"[class]": "cx('root')",
				"[attr.data-p-disabled]": "$disabled()",
				"[attr.data-p-checked]": "checked()",
				"[attr.data-p]": "dataP()"
			},
			hostDirectives: [Bind]
		}]
	}], null, {
		value: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "value",
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
		inputId: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "inputId",
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
		binary: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "binary",
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
		size: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "size",
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
		inputViewChild: [{
			type: ViewChild,
			args: ["input", { isSignal: true }]
		}]
	});
})();
var RadioButtonModule = (_RadioButtonModule = class RadioButtonModule {}, _defineProperty(_RadioButtonModule, "ɵfac", function RadioButtonModule_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _RadioButtonModule)();
}), _defineProperty(_RadioButtonModule, "ɵmod", /*@__PURE__*/ ɵɵdefineNgModule({
	type: _RadioButtonModule,
	imports: [RadioButton, SharedModule],
	exports: [RadioButton, SharedModule]
})), _defineProperty(_RadioButtonModule, "ɵinj", /*@__PURE__*/ ɵɵdefineInjector({ imports: [
	RadioButton,
	SharedModule,
	SharedModule
] })), _RadioButtonModule);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RadioButtonModule, [{
		type: NgModule,
		args: [{
			imports: [RadioButton, SharedModule],
			exports: [RadioButton, SharedModule]
		}]
	}], null, null);
})();
// ../node_modules/@primeuix/styles/dist/checkbox/index.mjs
var style$1 = "\n    .p-checkbox {\n        position: relative;\n        display: inline-flex;\n        user-select: none;\n        vertical-align: bottom;\n        width: dt('checkbox.width');\n        height: dt('checkbox.height');\n    }\n\n    .p-checkbox-input {\n        cursor: pointer;\n        appearance: none;\n        position: absolute;\n        inset-block-start: 0;\n        inset-inline-start: 0;\n        width: 100%;\n        height: 100%;\n        padding: 0;\n        margin: 0;\n        opacity: 0;\n        z-index: 1;\n        outline: 0 none;\n        border: 1px solid transparent;\n        border-radius: dt('checkbox.border.radius');\n    }\n\n    .p-checkbox-box {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        border-radius: dt('checkbox.border.radius');\n        border: 1px solid dt('checkbox.border.color');\n        background: dt('checkbox.background');\n        color: dt('checkbox.icon.color');\n        width: dt('checkbox.width');\n        height: dt('checkbox.height');\n        transition:\n            background dt('checkbox.transition.duration'),\n            border-color dt('checkbox.transition.duration'),\n            box-shadow dt('checkbox.transition.duration'),\n            outline-color dt('checkbox.transition.duration');\n        outline-color: transparent;\n        box-shadow: dt('checkbox.shadow');\n    }\n\n    .p-checkbox-indicator {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n    }\n\n    .p-checkbox-icon,\n    .p-checkbox-indicator svg,\n    .p-checkbox-indicator i {\n        width: dt('checkbox.icon.size');\n        height: dt('checkbox.icon.size');\n        font-size: dt('checkbox.icon.size');\n        transition-duration: dt('checkbox.transition.duration');\n    }\n\n    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {\n        border-color: dt('checkbox.hover.border.color');\n    }\n\n    .p-checkbox-checked .p-checkbox-box {\n        border-color: dt('checkbox.checked.border.color');\n        background: dt('checkbox.checked.background');\n        color: dt('checkbox.icon.checked.color');\n    }\n\n    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {\n        background: dt('checkbox.checked.hover.background');\n        border-color: dt('checkbox.checked.hover.border.color');\n        color: dt('checkbox.icon.checked.hover.color');\n    }\n\n    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {\n        border-color: dt('checkbox.focus.border.color');\n        box-shadow: dt('checkbox.focus.ring.shadow');\n        outline: dt('checkbox.focus.ring.width') dt('checkbox.focus.ring.style') dt('checkbox.focus.ring.color');\n        outline-offset: dt('checkbox.focus.ring.offset');\n    }\n\n    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {\n        border-color: dt('checkbox.checked.focus.border.color');\n    }\n\n    .p-checkbox.p-invalid > .p-checkbox-box {\n        border-color: dt('checkbox.invalid.border.color');\n    }\n\n    .p-checkbox.p-variant-filled .p-checkbox-box {\n        background: dt('checkbox.filled.background');\n    }\n\n    .p-checkbox-checked.p-variant-filled .p-checkbox-box {\n        background: dt('checkbox.checked.background');\n    }\n\n    .p-checkbox-checked.p-variant-filled:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {\n        background: dt('checkbox.checked.hover.background');\n    }\n\n    .p-checkbox.p-disabled {\n        opacity: 1;\n    }\n\n    .p-checkbox.p-disabled .p-checkbox-box {\n        background: dt('checkbox.disabled.background');\n        border-color: dt('checkbox.checked.disabled.border.color');\n        color: dt('checkbox.icon.disabled.color');\n    }\n\n    .p-checkbox-sm,\n    .p-checkbox-sm .p-checkbox-box {\n        width: dt('checkbox.sm.width');\n        height: dt('checkbox.sm.height');\n    }\n\n    .p-checkbox-sm .p-checkbox-icon,\n    .p-checkbox-sm .p-checkbox-indicator svg,\n    .p-checkbox-sm .p-checkbox-indicator i {\n        font-size: dt('checkbox.icon.sm.size');\n        width: dt('checkbox.icon.sm.size');\n        height: dt('checkbox.icon.sm.size');\n    }\n\n    .p-checkbox-lg,\n    .p-checkbox-lg .p-checkbox-box {\n        width: dt('checkbox.lg.width');\n        height: dt('checkbox.lg.height');\n    }\n\n    .p-checkbox-lg .p-checkbox-icon,\n    .p-checkbox-lg .p-checkbox-indicator svg,\n    .p-checkbox-lg .p-checkbox-indicator i {\n        font-size: dt('checkbox.icon.lg.size');\n        width: dt('checkbox.icon.lg.size');\n        height: dt('checkbox.icon.lg.size');\n    }\n";
// ../node_modules/primeng/fesm2022/primeng-checkbox.mjs
var _CheckboxStyle;
var _Checkbox;
var _CheckboxModule;
var classes$1 = {
	root: ({ instance }) => ["p-checkbox p-component", {
		"p-checkbox-checked": instance.checked(),
		"p-disabled": instance.$disabled(),
		"p-invalid": instance.invalid(),
		"p-variant-filled": instance.$variant() === "filled",
		"p-checkbox-sm p-inputfield-sm": instance.size() === "small",
		"p-checkbox-lg p-inputfield-lg": instance.size() === "large"
	}],
	box: "p-checkbox-box",
	input: "p-checkbox-input",
	indicator: "p-checkbox-indicator",
	icon: "p-checkbox-icon"
};
var CheckboxStyle = (_CheckboxStyle = class CheckboxStyle extends BaseStyle {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "name", "checkbox");
		_defineProperty(this, "style", style$1);
		_defineProperty(this, "classes", classes$1);
	}
}, _defineProperty(_CheckboxStyle, "ɵfac", /*@__PURE__*/ (() => {
	let ɵCheckboxStyle_BaseFactory = void 0;
	return function CheckboxStyle_Factory(__ngFactoryType__) {
		return (ɵCheckboxStyle_BaseFactory || (ɵCheckboxStyle_BaseFactory = ɵɵgetInheritedFactory(_CheckboxStyle)))(__ngFactoryType__ || _CheckboxStyle);
	};
})()), _defineProperty(_CheckboxStyle, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _CheckboxStyle,
	factory: _CheckboxStyle.ɵfac
})), _CheckboxStyle);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckboxStyle, [{ type: Injectable }], null, null);
})();
var CheckboxClasses;
(function(CheckboxClasses) {
	CheckboxClasses["root"] = "p-checkbox";
	CheckboxClasses["box"] = "p-checkbox-box";
	CheckboxClasses["input"] = "p-checkbox-input";
	CheckboxClasses["indicator"] = "p-checkbox-indicator";
	CheckboxClasses["icon"] = "p-checkbox-icon";
})(CheckboxClasses || (CheckboxClasses = {}));
var CHECKBOX_INSTANCE = new InjectionToken("CHECKBOX_INSTANCE");
var CHECKBOX_VALUE_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => Checkbox),
	multi: true
};
var Checkbox = (_Checkbox = class Checkbox extends BaseEditableHolder {
	constructor() {
		var _inject;
		super();
		_defineProperty(this, "componentName", "Checkbox");
		_defineProperty(this, "value", input(...ngDevMode ? [void 0, { debugName: "value" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "binary", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "binary" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "ariaLabelledBy", input(...ngDevMode ? [void 0, { debugName: "ariaLabelledBy" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "ariaLabel", input(...ngDevMode ? [void 0, { debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "tabindex", input(...ngDevMode ? [void 0, { debugName: "tabindex" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "inputId", input(...ngDevMode ? [void 0, { debugName: "inputId" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "inputStyle", input(...ngDevMode ? [void 0, { debugName: "inputStyle" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "inputClass", input(...ngDevMode ? [void 0, { debugName: "inputClass" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "indeterminate", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "indeterminate" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "formControl", input(...ngDevMode ? [void 0, { debugName: "formControl" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "checkboxIcon", input(...ngDevMode ? [void 0, { debugName: "checkboxIcon" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "readonly", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "readonly" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "autofocus", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "autofocus" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "trueValue", input(true, ...ngDevMode ? [{ debugName: "trueValue" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "falseValue", input(false, ...ngDevMode ? [{ debugName: "falseValue" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "variant", input(...ngDevMode ? [void 0, { debugName: "variant" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "size", input(...ngDevMode ? [void 0, { debugName: "size" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "onChange", output());
		_defineProperty(this, "onFocus", output());
		_defineProperty(this, "onBlur", output());
		_defineProperty(this, "inputViewChild", viewChild("input", ...ngDevMode ? [{ debugName: "inputViewChild" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "iconTemplate", contentChild("icon", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "iconTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "_indeterminate", signal(false, ...ngDevMode ? [{ debugName: "_indeterminate" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "focused", signal(false, ...ngDevMode ? [{ debugName: "focused" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_componentStyle", inject(CheckboxStyle));
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		_defineProperty(this, "$pcCheckbox", (_inject = inject(CHECKBOX_INSTANCE, {
			optional: true,
			skipSelf: true
		})) !== null && _inject !== void 0 ? _inject : void 0);
		_defineProperty(this, "$variant", computed(() => this.variant() || this.config.inputVariant() || void 0, ...ngDevMode ? [{ debugName: "$variant" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "requiredAttr", computed(() => this.required() ? "" : void 0, ...ngDevMode ? [{ debugName: "requiredAttr" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "readonlyAttr", computed(() => this.readonly() ? "" : void 0, ...ngDevMode ? [{ debugName: "readonlyAttr" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "disabledAttr", computed(() => this.$disabled() ? "" : void 0, ...ngDevMode ? [{ debugName: "disabledAttr" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "checked", computed(() => {
			if (this._indeterminate()) return false;
			return this.binary() ? this.modelValue() === this.trueValue() : _(this.value(), this.modelValue());
		}, ...ngDevMode ? [{ debugName: "checked" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "iconTemplateContext", computed(() => ({
			checked: this.checked(),
			class: this.cx("icon"),
			dataP: this.dataP()
		}), ...ngDevMode ? [{ debugName: "iconTemplateContext" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataP", computed(() => this.cn({
			invalid: this.invalid(),
			checked: this.checked(),
			disabled: this.$disabled(),
			filled: this.$variant() === "filled",
			[this.size()]: this.size()
		}), ...ngDevMode ? [{ debugName: "dataP" }] : /* istanbul ignore next */ []));
		effect(() => {
			const indeterminate = this.indeterminate();
			this._indeterminate.set(indeterminate);
		});
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
	}
	updateModel(event) {
		let newModelValue;
		const selfControl = this.injector.get(NgControl, null, {
			optional: true,
			self: true
		});
		const currentModelValue = selfControl && !this.formControl() ? selfControl.value : this.modelValue();
		if (!this.binary()) {
			if (this.checked() || this._indeterminate()) newModelValue = currentModelValue.filter((val) => !b(val, this.value()));
			else newModelValue = currentModelValue ? [...currentModelValue, this.value()] : [this.value()];
			this.onModelChange(newModelValue);
			this.writeModelValue(newModelValue);
			const formControl = this.formControl();
			if (formControl) formControl.setValue(newModelValue);
		} else {
			newModelValue = this._indeterminate() ? this.trueValue() : this.checked() ? this.falseValue() : this.trueValue();
			this.writeModelValue(newModelValue);
			this.onModelChange(newModelValue);
		}
		if (this._indeterminate()) this._indeterminate.set(false);
		this.onChange.emit({
			checked: newModelValue,
			originalEvent: event
		});
	}
	handleChange(event) {
		if (!this.readonly()) this.updateModel(event);
	}
	onInputFocus(event) {
		this.focused.set(true);
		this.onFocus.emit(event);
	}
	onInputBlur(event) {
		this.focused.set(false);
		this.onBlur.emit(event);
		this.onModelTouched();
	}
	focus() {
		var _this$inputViewChild;
		(_this$inputViewChild = this.inputViewChild()) === null || _this$inputViewChild === void 0 || _this$inputViewChild.nativeElement.focus();
	}
	writeControlValue(value, setModelValue) {
		setModelValue(value);
	}
}, _defineProperty(_Checkbox, "ɵfac", function Checkbox_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _Checkbox)();
}), _defineProperty(_Checkbox, "ɵcmp", (function() {
	const _c0 = ["icon"];
	const _c1 = ["input"];
	function Checkbox_Conditional_3_Conditional_0_Conditional_1_Template(rf, ctx) {
		if (rf & 1) ɵɵelement(0, "span", 2);
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(3);
			ɵɵclassMap(ctx_r0.cn(ctx_r0.cx("icon"), ctx_r0.checkboxIcon()));
			ɵɵproperty("pBind", ctx_r0.ptm("icon"));
			ɵɵattribute("data-p", ctx_r0.dataP());
		}
	}
	function Checkbox_Conditional_3_Conditional_0_Conditional_2_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 5);
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(3);
			ɵɵclassMap(ctx_r0.cx("icon"));
			ɵɵproperty("pBind", ctx_r0.ptm("icon"));
			ɵɵattribute("data-p", ctx_r0.dataP());
		}
	}
	function Checkbox_Conditional_3_Conditional_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "span", 2);
			ɵɵconditionalCreate(1, Checkbox_Conditional_3_Conditional_0_Conditional_1_Template, 1, 4, "span", 3)(2, Checkbox_Conditional_3_Conditional_0_Conditional_2_Template, 1, 4, "svg", 4);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵclassMap(ctx_r0.cx("indicator"));
			ɵɵproperty("pBind", ctx_r0.ptm("indicator"));
			ɵɵadvance();
			ɵɵconditional(ctx_r0.checkboxIcon() ? 1 : 2);
		}
	}
	function Checkbox_Conditional_3_Conditional_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "span", 2);
			ɵɵnamespaceSVG();
			ɵɵelement(1, "svg", 6);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵclassMap(ctx_r0.cx("indicator"));
			ɵɵproperty("pBind", ctx_r0.ptm("indicator"));
			ɵɵadvance();
			ɵɵclassMap(ctx_r0.cx("icon"));
			ɵɵproperty("pBind", ctx_r0.ptm("icon"));
			ɵɵattribute("data-p", ctx_r0.dataP());
		}
	}
	function Checkbox_Conditional_3_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵconditionalCreate(0, Checkbox_Conditional_3_Conditional_0_Template, 3, 4, "span", 3);
			ɵɵconditionalCreate(1, Checkbox_Conditional_3_Conditional_1_Template, 2, 7, "span", 3);
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵconditional(ctx_r0.checked() ? 0 : -1);
			ɵɵadvance();
			ɵɵconditional(ctx_r0._indeterminate() ? 1 : -1);
		}
	}
	function Checkbox_Conditional_4_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Checkbox_Conditional_4_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Checkbox_Conditional_4_ng_container_0_Template, 1, 0, "ng-container", 7);
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵproperty("ngTemplateOutlet", ctx_r0.iconTemplate())("ngTemplateOutletContext", ctx_r0.iconTemplateContext());
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _Checkbox,
		selectors: [["p-checkbox"], ["p-check-box"]],
		contentQueries: function Checkbox_ContentQueries(rf, ctx, dirIndex) {
			if (rf & 1) ɵɵcontentQuerySignal(dirIndex, ctx.iconTemplate, _c0, 4);
			if (rf & 2) ɵɵqueryAdvance();
		},
		viewQuery: function Checkbox_Query(rf, ctx) {
			if (rf & 1) ɵɵviewQuerySignal(ctx.inputViewChild, _c1, 5);
			if (rf & 2) ɵɵqueryAdvance();
		},
		hostVars: 6,
		hostBindings: function Checkbox_HostBindings(rf, ctx) {
			if (rf & 2) {
				ɵɵattribute("data-p-highlight", ctx.checked())("data-p-checked", ctx.checked())("data-p-disabled", ctx.$disabled())("data-p", ctx.dataP());
				ɵɵclassMap(ctx.cx("root"));
			}
		},
		inputs: {
			value: [1, "value"],
			binary: [1, "binary"],
			ariaLabelledBy: [1, "ariaLabelledBy"],
			ariaLabel: [1, "ariaLabel"],
			tabindex: [1, "tabindex"],
			inputId: [1, "inputId"],
			inputStyle: [1, "inputStyle"],
			inputClass: [1, "inputClass"],
			indeterminate: [1, "indeterminate"],
			formControl: [1, "formControl"],
			checkboxIcon: [1, "checkboxIcon"],
			readonly: [1, "readonly"],
			autofocus: [1, "autofocus"],
			trueValue: [1, "trueValue"],
			falseValue: [1, "falseValue"],
			variant: [1, "variant"],
			size: [1, "size"]
		},
		outputs: {
			onChange: "onChange",
			onFocus: "onFocus",
			onBlur: "onBlur"
		},
		features: [
			ɵɵProvidersFeature([
				CHECKBOX_VALUE_ACCESSOR,
				CheckboxStyle,
				{
					provide: CHECKBOX_INSTANCE,
					useExisting: _Checkbox
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: _Checkbox
				}
			]),
			ɵɵHostDirectivesFeature([Bind]),
			ɵɵInheritDefinitionFeature
		],
		decls: 5,
		vars: 20,
		consts: [
			["input", ""],
			[
				"type",
				"checkbox",
				3,
				"focus",
				"blur",
				"change",
				"checked",
				"pBind"
			],
			[3, "pBind"],
			[
				3,
				"class",
				"pBind"
			],
			[
				"data-p-icon",
				"check",
				3,
				"class",
				"pBind"
			],
			[
				"data-p-icon",
				"check",
				3,
				"pBind"
			],
			[
				"data-p-icon",
				"minus",
				3,
				"pBind"
			],
			[
				4,
				"ngTemplateOutlet",
				"ngTemplateOutletContext"
			]
		],
		template: function Checkbox_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵelementStart(0, "input", 1, 0);
				ɵɵlistener("focus", function Checkbox_Template_input_focus_0_listener($event) {
					return ctx.onInputFocus($event);
				})("blur", function Checkbox_Template_input_blur_0_listener($event) {
					return ctx.onInputBlur($event);
				})("change", function Checkbox_Template_input_change_0_listener($event) {
					return ctx.handleChange($event);
				});
				ɵɵelementEnd();
				ɵɵelementStart(2, "div", 2);
				ɵɵconditionalCreate(3, Checkbox_Conditional_3_Template, 2, 2)(4, Checkbox_Conditional_4_Template, 1, 2, "ng-container");
				ɵɵelementEnd();
			}
			if (rf & 2) {
				ɵɵstyleMap(ctx.inputStyle());
				ɵɵclassMap(ctx.cn(ctx.cx("input"), ctx.inputClass()));
				ɵɵproperty("checked", ctx.checked())("pBind", ctx.ptm("input"));
				ɵɵattribute("id", ctx.inputId())("value", ctx.value())("name", ctx.name())("tabindex", ctx.tabindex())("required", ctx.requiredAttr())("readonly", ctx.readonlyAttr())("disabled", ctx.disabledAttr())("aria-labelledby", ctx.ariaLabelledBy())("aria-label", ctx.ariaLabel());
				ɵɵadvance(2);
				ɵɵclassMap(ctx.cx("box"));
				ɵɵproperty("pBind", ctx.ptm("box"));
				ɵɵattribute("data-p", ctx.dataP());
				ɵɵadvance();
				ɵɵconditional(!ctx.iconTemplate() ? 3 : 4);
			}
		},
		dependencies: [
			NgTemplateOutlet,
			SharedModule,
			Check,
			Minus,
			BindModule,
			Bind
		],
		encapsulation: 2
	});
})()), _Checkbox);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Checkbox, [{
		type: Component,
		args: [{
			selector: "p-checkbox, p-check-box",
			standalone: true,
			imports: [
				NgTemplateOutlet,
				SharedModule,
				Check,
				Minus,
				BindModule
			],
			template: `
        <input
            #input
            [attr.id]="inputId()"
            type="checkbox"
            [attr.value]="value()"
            [attr.name]="name()"
            [checked]="checked()"
            [attr.tabindex]="tabindex()"
            [attr.required]="requiredAttr()"
            [attr.readonly]="readonlyAttr()"
            [attr.disabled]="disabledAttr()"
            [attr.aria-labelledby]="ariaLabelledBy()"
            [attr.aria-label]="ariaLabel()"
            [style]="inputStyle()"
            [class]="cn(cx('input'), inputClass())"
            [pBind]="ptm('input')"
            (focus)="onInputFocus($event)"
            (blur)="onInputBlur($event)"
            (change)="handleChange($event)"
        />
        <div [class]="cx('box')" [pBind]="ptm('box')" [attr.data-p]="dataP()">
            @if (!iconTemplate()) {
                @if (checked()) {
                    <span [class]="cx('indicator')" [pBind]="ptm('indicator')">
                        @if (checkboxIcon()) {
                            <span [class]="cn(cx('icon'), checkboxIcon())" [pBind]="ptm('icon')" [attr.data-p]="dataP()"></span>
                        } @else {
                            <svg data-p-icon="check" [class]="cx('icon')" [pBind]="ptm('icon')" [attr.data-p]="dataP()" />
                        }
                    </span>
                }
                @if (_indeterminate()) {
                    <span [class]="cx('indicator')" [pBind]="ptm('indicator')">
                        <svg data-p-icon="minus" [class]="cx('icon')" [pBind]="ptm('icon')" [attr.data-p]="dataP()" />
                    </span>
                }
            } @else {
                <ng-container *ngTemplateOutlet="iconTemplate(); context: iconTemplateContext()"></ng-container>
            }
        </div>
    `,
			providers: [
				CHECKBOX_VALUE_ACCESSOR,
				CheckboxStyle,
				{
					provide: CHECKBOX_INSTANCE,
					useExisting: Checkbox
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: Checkbox
				}
			],
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None,
			host: {
				"[class]": "cx('root')",
				"[attr.data-p-highlight]": "checked()",
				"[attr.data-p-checked]": "checked()",
				"[attr.data-p-disabled]": "$disabled()",
				"[attr.data-p]": "dataP()"
			},
			hostDirectives: [Bind]
		}]
	}], () => [], {
		value: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "value",
				required: false
			}]
		}],
		binary: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "binary",
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
		ariaLabel: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "ariaLabel",
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
		inputId: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "inputId",
				required: false
			}]
		}],
		inputStyle: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "inputStyle",
				required: false
			}]
		}],
		inputClass: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "inputClass",
				required: false
			}]
		}],
		indeterminate: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "indeterminate",
				required: false
			}]
		}],
		formControl: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "formControl",
				required: false
			}]
		}],
		checkboxIcon: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "checkboxIcon",
				required: false
			}]
		}],
		readonly: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "readonly",
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
		trueValue: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "trueValue",
				required: false
			}]
		}],
		falseValue: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "falseValue",
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
		size: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "size",
				required: false
			}]
		}],
		onChange: [{
			type: Output,
			args: ["onChange"]
		}],
		onFocus: [{
			type: Output,
			args: ["onFocus"]
		}],
		onBlur: [{
			type: Output,
			args: ["onBlur"]
		}],
		inputViewChild: [{
			type: ViewChild,
			args: ["input", { isSignal: true }]
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
var CheckboxModule = (_CheckboxModule = class CheckboxModule {}, _defineProperty(_CheckboxModule, "ɵfac", function CheckboxModule_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _CheckboxModule)();
}), _defineProperty(_CheckboxModule, "ɵmod", /*@__PURE__*/ ɵɵdefineNgModule({
	type: _CheckboxModule,
	imports: [Checkbox, SharedModule],
	exports: [Checkbox, SharedModule]
})), _defineProperty(_CheckboxModule, "ɵinj", /*@__PURE__*/ ɵɵdefineInjector({ imports: [
	Checkbox,
	SharedModule,
	SharedModule
] })), _CheckboxModule);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckboxModule, [{
		type: NgModule,
		args: [{
			imports: [Checkbox, SharedModule],
			exports: [Checkbox, SharedModule]
		}]
	}], null, null);
})();
// ../node_modules/@primeicons/core/dist/esm/icons/filter.mjs
var e$1 = {
	name: "filter",
	meta: { tags: [
		"filter",
		"refine",
		"criteria",
		"sort",
		"selection"
	] },
	svg: {
		xmlns: "http://www.w3.org/2000/svg",
		width: 20,
		height: 20,
		viewBox: "0 0 20 20",
		fill: "none"
	},
	nodes: [["path", {
		d: "M17.5 1.75C17.7826 1.75 18.0412 1.90903 18.1689 2.16113C18.2966 2.41322 18.2716 2.71547 18.1045 2.94336L12.75 10.2441V18C12.75 18.4142 12.4142 18.75 12 18.75H8C7.58579 18.75 7.25 18.4142 7.25 18V10.2441L1.89551 2.94336C1.72839 2.71547 1.70335 2.41322 1.83105 2.16113C1.95881 1.90903 2.21737 1.75 2.5 1.75H17.5ZM8.60449 9.55664C8.69883 9.68528 8.75 9.84048 8.75 10V17.25H11.25V10C11.25 9.84048 11.3012 9.68528 11.3955 9.55664L16.0205 3.25H3.97949L8.60449 9.55664Z",
		fill: "currentColor",
		key: "6kqlg6"
	}]]
};
// ../node_modules/@primeicons/angular/fesm2022/primeicons-angular-filter.mjs
var _Filter;
var Filter = class extends CoreIcon {
	constructor() {
		super();
		this._icon = e$1;
	}
};
_Filter = Filter;
_defineProperty(Filter, "ɵfac", function Filter_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _Filter)();
});
_defineProperty(Filter, "ɵcmp", (function() {
	const _forTrack0 = ($index, $item) => $item[1]["key"] || $index;
	function Filter_For_1_Case_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "path");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("d", node_r1[1]["d"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("fill-rule", node_r1[1]["fillRule"])("clip-rule", node_r1[1]["clipRule"])("stroke", node_r1[1]["stroke"])("stroke-width", node_r1[1]["strokeWidth"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function Filter_For_1_Case_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "circle");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("r", node_r1[1]["r"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function Filter_For_1_Case_2_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "rect");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x", node_r1[1]["x"])("y", node_r1[1]["y"])("width", node_r1[1]["width"])("height", node_r1[1]["height"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function Filter_For_1_Case_3_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "line");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x1", node_r1[1]["x1"])("y1", node_r1[1]["y1"])("x2", node_r1[1]["x2"])("y2", node_r1[1]["y2"])("stroke", node_r1[1]["stroke"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function Filter_For_1_Case_4_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polyline");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function Filter_For_1_Case_5_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polygon");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function Filter_For_1_Case_6_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "ellipse");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function Filter_For_1_Template(rf, ctx) {
		if (rf & 1) ɵɵconditionalCreate(0, Filter_For_1_Case_0_Template, 1, 9, "path")(1, Filter_For_1_Case_1_Template, 1, 6, "circle")(2, Filter_For_1_Case_2_Template, 1, 9, "rect")(3, Filter_For_1_Case_3_Template, 1, 7, "line")(4, Filter_For_1_Case_4_Template, 1, 4, "polyline")(5, Filter_For_1_Case_5_Template, 1, 4, "polygon")(6, Filter_For_1_Case_6_Template, 1, 7, "ellipse");
		if (rf & 2) {
			let tmp_10_0 = void 0;
			const node_r1 = ctx.$implicit;
			ɵɵconditional((tmp_10_0 = node_r1[0]) === "path" ? 0 : tmp_10_0 === "circle" ? 1 : tmp_10_0 === "rect" ? 2 : tmp_10_0 === "line" ? 3 : tmp_10_0 === "polyline" ? 4 : tmp_10_0 === "polygon" ? 5 : tmp_10_0 === "ellipse" ? 6 : -1);
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _Filter,
		selectors: [[
			"svg",
			"data-p-icon",
			"filter"
		]],
		features: [ɵɵInheritDefinitionFeature],
		decls: 2,
		vars: 0,
		template: function Filter_Template(rf, ctx) {
			if (rf & 1) ɵɵrepeaterCreate(0, Filter_For_1_Template, 7, 1, null, null, _forTrack0);
			if (rf & 2) ɵɵrepeater(ctx.iconNodes());
		},
		encapsulation: 2,
		changeDetection: 1
	});
})());
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Filter, [{
		type: Component,
		args: [{
			selector: "svg[data-p-icon=\"filter\"]",
			standalone: true,
			template: "\n        @for (node of iconNodes(); track node[1]['key'] || $index) {\n            @switch (node[0]) {\n                @case ('path') {\n                    <svg:path\n                        [attr.d]=\"node[1]['d']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.fill-rule]=\"node[1]['fillRule']\"\n                        [attr.clip-rule]=\"node[1]['clipRule']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-width]=\"node[1]['strokeWidth']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('circle') {\n                    <svg:circle\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.r]=\"node[1]['r']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('rect') {\n                    <svg:rect\n                        [attr.x]=\"node[1]['x']\"\n                        [attr.y]=\"node[1]['y']\"\n                        [attr.width]=\"node[1]['width']\"\n                        [attr.height]=\"node[1]['height']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('line') {\n                    <svg:line\n                        [attr.x1]=\"node[1]['x1']\"\n                        [attr.y1]=\"node[1]['y1']\"\n                        [attr.x2]=\"node[1]['x2']\"\n                        [attr.y2]=\"node[1]['y2']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polyline') {\n                    <svg:polyline\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polygon') {\n                    <svg:polygon\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('ellipse') {\n                    <svg:ellipse\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n            }\n        }\n"
		}]
	}], () => [], null);
})();
// ../node_modules/@primeicons/core/dist/esm/icons/filter-fill.mjs
var e = {
	name: "filter-fill",
	meta: { tags: [
		"filter-fill",
		"selection",
		"full-filter",
		"complete-criteria"
	] },
	svg: {
		xmlns: "http://www.w3.org/2000/svg",
		width: 20,
		height: 20,
		viewBox: "0 0 20 20",
		fill: "none"
	},
	nodes: [["path", {
		d: "M17.5002 1.5C17.7827 1.50007 18.0414 1.65908 18.1691 1.91113C18.2968 2.16317 18.2717 2.46551 18.1047 2.69336L12.7502 9.99414V17.75C12.7502 18.1642 12.4143 18.4999 12.0002 18.5H8.00018C7.58597 18.5 7.25018 18.1642 7.25018 17.75V9.99414L1.89569 2.69336C1.72858 2.46547 1.70354 2.16322 1.83124 1.91113C1.959 1.65907 2.21758 1.5 2.50018 1.5H17.5002Z",
		fill: "currentColor",
		key: "ckg1lv"
	}]]
};
// ../node_modules/@primeicons/angular/fesm2022/primeicons-angular-filter-fill.mjs
var _FilterFill;
var FilterFill = class extends CoreIcon {
	constructor() {
		super();
		this._icon = e;
	}
};
_FilterFill = FilterFill;
_defineProperty(FilterFill, "ɵfac", function FilterFill_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _FilterFill)();
});
_defineProperty(FilterFill, "ɵcmp", (function() {
	const _forTrack0 = ($index, $item) => $item[1]["key"] || $index;
	function FilterFill_For_1_Case_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "path");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("d", node_r1[1]["d"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("fill-rule", node_r1[1]["fillRule"])("clip-rule", node_r1[1]["clipRule"])("stroke", node_r1[1]["stroke"])("stroke-width", node_r1[1]["strokeWidth"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function FilterFill_For_1_Case_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "circle");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("r", node_r1[1]["r"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function FilterFill_For_1_Case_2_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "rect");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x", node_r1[1]["x"])("y", node_r1[1]["y"])("width", node_r1[1]["width"])("height", node_r1[1]["height"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function FilterFill_For_1_Case_3_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "line");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("x1", node_r1[1]["x1"])("y1", node_r1[1]["y1"])("x2", node_r1[1]["x2"])("y2", node_r1[1]["y2"])("stroke", node_r1[1]["stroke"])("stroke-opacity", node_r1[1]["strokeOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function FilterFill_For_1_Case_4_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polyline");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function FilterFill_For_1_Case_5_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "polygon");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("points", node_r1[1]["points"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function FilterFill_For_1_Case_6_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵdomElement(0, "ellipse");
		}
		if (rf & 2) {
			const node_r1 = ɵɵnextContext().$implicit;
			ɵɵattribute("cx", node_r1[1]["cx"])("cy", node_r1[1]["cy"])("rx", node_r1[1]["rx"])("ry", node_r1[1]["ry"])("fill", node_r1[1]["fill"])("fill-opacity", node_r1[1]["fillOpacity"])("opacity", node_r1[1]["opacity"]);
		}
	}
	function FilterFill_For_1_Template(rf, ctx) {
		if (rf & 1) ɵɵconditionalCreate(0, FilterFill_For_1_Case_0_Template, 1, 9, "path")(1, FilterFill_For_1_Case_1_Template, 1, 6, "circle")(2, FilterFill_For_1_Case_2_Template, 1, 9, "rect")(3, FilterFill_For_1_Case_3_Template, 1, 7, "line")(4, FilterFill_For_1_Case_4_Template, 1, 4, "polyline")(5, FilterFill_For_1_Case_5_Template, 1, 4, "polygon")(6, FilterFill_For_1_Case_6_Template, 1, 7, "ellipse");
		if (rf & 2) {
			let tmp_10_0 = void 0;
			const node_r1 = ctx.$implicit;
			ɵɵconditional((tmp_10_0 = node_r1[0]) === "path" ? 0 : tmp_10_0 === "circle" ? 1 : tmp_10_0 === "rect" ? 2 : tmp_10_0 === "line" ? 3 : tmp_10_0 === "polyline" ? 4 : tmp_10_0 === "polygon" ? 5 : tmp_10_0 === "ellipse" ? 6 : -1);
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _FilterFill,
		selectors: [[
			"svg",
			"data-p-icon",
			"filter-fill"
		]],
		features: [ɵɵInheritDefinitionFeature],
		decls: 2,
		vars: 0,
		template: function FilterFill_Template(rf, ctx) {
			if (rf & 1) ɵɵrepeaterCreate(0, FilterFill_For_1_Template, 7, 1, null, null, _forTrack0);
			if (rf & 2) ɵɵrepeater(ctx.iconNodes());
		},
		encapsulation: 2,
		changeDetection: 1
	});
})());
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FilterFill, [{
		type: Component,
		args: [{
			selector: "svg[data-p-icon=\"filter-fill\"]",
			standalone: true,
			template: "\n        @for (node of iconNodes(); track node[1]['key'] || $index) {\n            @switch (node[0]) {\n                @case ('path') {\n                    <svg:path\n                        [attr.d]=\"node[1]['d']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.fill-rule]=\"node[1]['fillRule']\"\n                        [attr.clip-rule]=\"node[1]['clipRule']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-width]=\"node[1]['strokeWidth']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('circle') {\n                    <svg:circle\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.r]=\"node[1]['r']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('rect') {\n                    <svg:rect\n                        [attr.x]=\"node[1]['x']\"\n                        [attr.y]=\"node[1]['y']\"\n                        [attr.width]=\"node[1]['width']\"\n                        [attr.height]=\"node[1]['height']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('line') {\n                    <svg:line\n                        [attr.x1]=\"node[1]['x1']\"\n                        [attr.y1]=\"node[1]['y1']\"\n                        [attr.x2]=\"node[1]['x2']\"\n                        [attr.y2]=\"node[1]['y2']\"\n                        [attr.stroke]=\"node[1]['stroke']\"\n                        [attr.stroke-opacity]=\"node[1]['strokeOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polyline') {\n                    <svg:polyline\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('polygon') {\n                    <svg:polygon\n                        [attr.points]=\"node[1]['points']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n                @case ('ellipse') {\n                    <svg:ellipse\n                        [attr.cx]=\"node[1]['cx']\"\n                        [attr.cy]=\"node[1]['cy']\"\n                        [attr.rx]=\"node[1]['rx']\"\n                        [attr.ry]=\"node[1]['ry']\"\n                        [attr.fill]=\"node[1]['fill']\"\n                        [attr.fill-opacity]=\"node[1]['fillOpacity']\"\n                        [attr.opacity]=\"node[1]['opacity']\"\n                    />\n                }\n            }\n        }\n"
		}]
	}], () => [], null);
})();
// ../node_modules/primeng/fesm2022/primeng-table.mjs
var _TableStyle;
var _TableService;
var _TableBody;
var _Table;
var _FrozenColumn;
var _EditableRow;
var _ReorderableRowHandle;
var _RowGroupHeader;
var _RowToggler;
var _SortableColumn;
var _SelectableRow;
var _SelectableRowDblClick;
var _ContextMenuRow;
var _ResizableColumn;
var _ReorderableColumn;
var _EditableColumn;
var _ReorderableRow;
var _InitEditableRow;
var _SaveEditableRow;
var _CancelEditableRow;
var _SortIcon;
var _CellEditor;
var _TableRadioButton;
var _TableCheckbox;
var _TableHeaderCheckbox;
var _ColumnFilterFormElement;
var _ColumnFilter;
var _TableModule;
var style = `
${style$4}

/* For PrimeNG */
.p-datatable-scrollable-table > .p-datatable-thead {
    top: 0;
    z-index: 2;
}

.p-datatable-scrollable-table > .p-datatable-frozen-tbody {
    position: sticky;
    z-index: 2;
}

.p-datatable-scrollable-table > .p-datatable-frozen-tbody + .p-datatable-frozen-tbody {
    z-index: 1;
}

.p-datatable-frozen-column {
    z-index: 1;
}

.p-datatable-mask.p-overlay-mask {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
}

.p-datatable-filter-overlay {
    position: absolute;
    background: dt('datatable.filter.overlay.select.background');
    color: dt('datatable.filter.overlay.select.color');
    border: 1px solid dt('datatable.filter.overlay.select.border.color');
    border-radius: dt('datatable.filter.overlay.select.border.radius');
    box-shadow: dt('datatable.filter.overlay.select.shadow');
    min-width: 12.5rem;
}

.p-datatable-filter-rule {
    border-bottom: 1px solid dt('datatable.filter.rule.border.color');
}

.p-datatable-filter-rule:last-child {
    border-bottom: 0 none;
}

.p-datatable-filter-add-rule-button,
.p-datatable-filter-remove-rule-button {
    width: 100%;
}

.p-datatable-filter-remove-button {
    width: 100%;
}

.p-datatable-thead > tr > th {
    padding: dt('datatable.header.cell.padding');
    background: dt('datatable.header.cell.background');
    border-color: dt('datatable.header.cell.border.color');
    border-style: solid;
    border-width: 0 0 1px 0;
    color: dt('datatable.header.cell.color');
    font-weight: dt('datatable.column.title.font.weight');
    text-align: start;
    transition:
        background dt('datatable.transition.duration'),
        color dt('datatable.transition.duration'),
        border-color dt('datatable.transition.duration'),
        outline-color dt('datatable.transition.duration'),
        box-shadow dt('datatable.transition.duration');
}

.p-datatable-thead > tr > th p-column-filter,
.p-datatable-thead > tr > th p-columnfilter {
    font-weight: normal;
}

.p-datatable-thead > tr > th,
.p-datatable-sort-icon,
.p-datatable-sort-badge {
    vertical-align: middle;
}

.p-datatable-thead > tr > th.p-datatable-column-sorted {
    background: dt('datatable.header.cell.selected.background');
    color: dt('datatable.header.cell.selected.color');
}

.p-datatable-thead > tr > th.p-datatable-column-sorted .p-datatable-sort-icon {
    color: dt('datatable.header.cell.selected.color');
}

.p-datatable.p-datatable-striped .p-datatable-tbody > tr:nth-child(odd) {
    background: dt('datatable.row.striped.background');
}

.p-datatable.p-datatable-striped .p-datatable-tbody > tr:nth-child(odd).p-datatable-row-selected {
    background: dt('datatable.row.selected.background');
    color: dt('datatable.row.selected.color');
}

p-sort-icon, p-sorticon {
    display: inline-flex;
    align-items: center;
    gap: dt('datatable.header.cell.gap');
}

.p-datatable .p-editable-column.p-cell-editing {
    padding: 0;
}

.p-datatable .p-editable-column.p-cell-editing p-cell-editor,
.p-datatable .p-editable-column.p-cell-editing p-celleditor {
    display: block;
    width: 100%;
}
`;
var classes = {
	root: ({ instance }) => ["p-datatable p-component", {
		"p-datatable-hoverable": instance.rowHover() || instance.selectionMode(),
		"p-datatable-resizable": instance.resizableColumns(),
		"p-datatable-resizable-fit": instance.resizableColumns() && instance.columnResizeMode() === "fit",
		"p-datatable-scrollable": instance.scrollable(),
		"p-datatable-flex-scrollable": instance.scrollable() && instance.scrollHeight() === "flex",
		"p-datatable-striped": instance.stripedRows(),
		"p-datatable-gridlines": instance.showGridlines(),
		"p-datatable-sm": instance.size() === "small",
		"p-datatable-lg": instance.size() === "large"
	}],
	mask: "p-datatable-mask p-overlay-mask",
	loadingIcon: "p-datatable-loading-icon",
	header: "p-datatable-header",
	pcPaginator: ({ instance }) => "p-datatable-paginator-" + instance.paginatorPosition(),
	tableContainer: "p-datatable-table-container",
	table: ({ instance }) => ["p-datatable-table", {
		"p-datatable-scrollable-table": instance.scrollable(),
		"p-datatable-resizable-table": instance.resizableColumns(),
		"p-datatable-resizable-table-fit": instance.resizableColumns() && instance.columnResizeMode() === "fit"
	}],
	thead: "p-datatable-thead",
	columnResizer: "p-datatable-column-resizer",
	columnHeaderContent: "p-datatable-column-header-content",
	columnTitle: "p-datatable-column-title",
	columnFooter: "p-datatable-column-footer",
	sortIcon: "p-datatable-sort-icon",
	pcSortBadge: "p-datatable-sort-badge",
	filter: ({ instance }) => ({
		"p-datatable-filter": true,
		"p-datatable-inline-filter": instance.display() === "row",
		"p-datatable-popover-filter": instance.display() === "menu"
	}),
	filterElementContainer: "p-datatable-filter-element-container",
	pcColumnFilterButton: "p-datatable-column-filter-button",
	pcColumnFilterClearButton: "p-datatable-column-filter-clear-button",
	filterOverlay: ({ instance }) => ({
		"p-datatable-filter-overlay p-component": true,
		"p-datatable-filter-overlay-popover": instance.display() === "menu"
	}),
	filterConstraintList: "p-datatable-filter-constraint-list",
	filterConstraint: ({ selected }) => ({
		"p-datatable-filter-constraint": true,
		"p-datatable-filter-constraint-selected": selected
	}),
	filterConstraintSeparator: "p-datatable-filter-constraint-separator",
	filterOperator: "p-datatable-filter-operator",
	pcFilterOperatorDropdown: "p-datatable-filter-operator-dropdown",
	filterRuleList: "p-datatable-filter-rule-list",
	filterRule: "p-datatable-filter-rule",
	pcFilterConstraintDropdown: "p-datatable-filter-constraint-dropdown",
	pcFilterRemoveRuleButton: "p-datatable-filter-remove-rule-button",
	pcFilterAddRuleButton: "p-datatable-filter-add-rule-button",
	filterButtonbar: "p-datatable-filter-buttonbar",
	pcFilterClearButton: "p-datatable-filter-clear-button",
	pcFilterApplyButton: "p-datatable-filter-apply-button",
	tbody: ({ instance }) => ({
		"p-datatable-tbody": true,
		"p-datatable-frozen-tbody": instance.frozenValue() || instance.frozenBodyTemplate(),
		"p-virtualscroller-content": instance.virtualScroll()
	}),
	rowGroupHeader: "p-datatable-row-group-header",
	rowToggleButton: "p-datatable-row-toggle-button",
	rowToggleIcon: "p-datatable-row-toggle-icon",
	rowExpansion: "p-datatable-row-expansion",
	rowGroupFooter: "p-datatable-row-group-footer",
	emptyMessage: "p-datatable-empty-message",
	bodyCell: ({ instance }) => ({ "p-datatable-frozen-column": instance.columnProp("frozen") }),
	reorderableRowHandle: "p-datatable-reorderable-row-handle",
	pcRowEditorInit: "p-datatable-row-editor-init",
	pcRowEditorSave: "p-datatable-row-editor-save",
	pcRowEditorCancel: "p-datatable-row-editor-cancel",
	tfoot: "p-datatable-tfoot",
	footerCell: ({ instance }) => ({ "p-datatable-frozen-column": instance.columnProp("frozen") }),
	virtualScrollerSpacer: "p-datatable-virtualscroller-spacer",
	footer: "p-datatable-tfoot",
	columnResizeIndicator: "p-datatable-column-resize-indicator",
	rowReorderIndicatorUp: "p-datatable-row-reorder-indicator-up",
	rowReorderIndicatorDown: "p-datatable-row-reorder-indicator-down",
	sortableColumn: ({ instance }) => ({
		"p-datatable-sortable-column": instance.isEnabled(),
		" p-datatable-column-sorted": instance.sorted()
	}),
	sortableColumnIcon: "p-datatable-sort-icon",
	sortableColumnBadge: "p-sortable-column-badge",
	selectableRow: ({ instance }) => ({
		"p-datatable-selectable-row": instance.isEnabled(),
		"p-datatable-row-selected": instance.selected
	}),
	resizableColumn: "p-datatable-resizable-column",
	reorderableColumn: "p-datatable-reorderable-column",
	rowEditorCancel: "p-datatable-row-editor-cancel",
	frozenColumn: ({ instance }) => ({
		"p-datatable-frozen-column": instance.frozen(),
		"p-datatable-frozen-column-left": instance.alignFrozen() === "left"
	}),
	contextMenuRowSelected: ({ instance }) => ({ "p-datatable-contextmenu-row-selected": instance.selected })
};
var inlineStyles = {
	tableContainer: ({ instance }) => ({
		"max-height": instance.virtualScroll() ? "" : instance.scrollHeight(),
		overflow: "auto"
	}),
	thead: { position: "sticky" },
	tfoot: { position: "sticky" },
	rowGroupHeader: ({ instance }) => ({ top: instance.getFrozenRowGroupHeaderStickyPosition })
};
var TableStyle = (_TableStyle = class TableStyle extends BaseStyle {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "name", "datatable");
		_defineProperty(this, "style", style);
		_defineProperty(this, "classes", classes);
		_defineProperty(this, "inlineStyles", inlineStyles);
	}
}, _defineProperty(_TableStyle, "ɵfac", /*@__PURE__*/ (() => {
	let ɵTableStyle_BaseFactory = void 0;
	return function TableStyle_Factory(__ngFactoryType__) {
		return (ɵTableStyle_BaseFactory || (ɵTableStyle_BaseFactory = ɵɵgetInheritedFactory(_TableStyle)))(__ngFactoryType__ || _TableStyle);
	};
})()), _defineProperty(_TableStyle, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _TableStyle,
	factory: _TableStyle.ɵfac
})), _TableStyle);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TableStyle, [{ type: Injectable }], null, null);
})();
var TableClasses;
(function(TableClasses) {
	TableClasses["root"] = "p-datatable";
	TableClasses["mask"] = "p-datatable-mask";
	TableClasses["loadingIcon"] = "p-datatable-loading-icon";
	TableClasses["header"] = "p-datatable-header";
	TableClasses["pcPaginator"] = "p-datatable-paginator-[position]";
	TableClasses["tableContainer"] = "p-datatable-table-container";
	TableClasses["table"] = "p-datatable-table";
	TableClasses["thead"] = "p-datatable-thead";
	TableClasses["columnResizer"] = "p-datatable-column-resizer";
	TableClasses["columnHeaderContent"] = "p-datatable-column-header-content";
	TableClasses["columnTitle"] = "p-datatable-column-title";
	TableClasses["sortIcon"] = "p-datatable-sort-icon";
	TableClasses["pcSortBadge"] = "p-datatable-sort-badge";
	TableClasses["filter"] = "p-datatable-filter";
	TableClasses["filterElementContainer"] = "p-datatable-filter-element-container";
	TableClasses["pcColumnFilterButton"] = "p-datatable-column-filter-button";
	TableClasses["pcColumnFilterClearButton"] = "p-datatable-column-filter-clear-button";
	TableClasses["filterOverlay"] = "p-datatable-filter-overlay";
	TableClasses["filterConstraintList"] = "p-datatable-filter-constraint-list";
	TableClasses["filterConstraint"] = "p-datatable-filter-constraint";
	TableClasses["filterConstraintSeparator"] = "p-datatable-filter-constraint-separator";
	TableClasses["filterOperator"] = "p-datatable-filter-operator";
	TableClasses["pcFilterOperatorDropdown"] = "p-datatable-filter-operator-dropdown";
	TableClasses["filterRuleList"] = "p-datatable-filter-rule-list";
	TableClasses["filterRule"] = "p-datatable-filter-rule";
	TableClasses["pcFilterConstraintDropdown"] = "p-datatable-filter-constraint-dropdown";
	TableClasses["pcFilterRemoveRuleButton"] = "p-datatable-filter-remove-rule-button";
	TableClasses["pcFilterAddRuleButton"] = "p-datatable-filter-add-rule-button";
	TableClasses["filterButtonbar"] = "p-datatable-filter-buttonbar";
	TableClasses["pcFilterClearButton"] = "p-datatable-filter-clear-button";
	TableClasses["pcFilterApplyButton"] = "p-datatable-filter-apply-button";
	TableClasses["tbody"] = "p-datatable-tbody";
	TableClasses["rowGroupHeader"] = "p-datatable-row-group-header";
	TableClasses["rowToggleButton"] = "p-datatable-row-toggle-button";
	TableClasses["rowToggleIcon"] = "p-datatable-row-toggle-icon";
	TableClasses["rowExpansion"] = "p-datatable-row-expansion";
	TableClasses["rowGroupFooter"] = "p-datatable-row-group-footer";
	TableClasses["emptyMessage"] = "p-datatable-empty-message";
	TableClasses["reorderableRowHandle"] = "p-datatable-reorderable-row-handle";
	TableClasses["pcRowEditorInit"] = "p-datatable-row-editor-init";
	TableClasses["pcRowEditorSave"] = "p-datatable-row-editor-save";
	TableClasses["pcRowEditorCancel"] = "p-datatable-row-editor-cancel";
	TableClasses["tfoot"] = "p-datatable-tfoot";
	TableClasses["virtualScrollerSpacer"] = "p-datatable-virtualscroller-spacer";
	TableClasses["footer"] = "p-datatable-footer";
	TableClasses["columnResizeIndicator"] = "p-datatable-column-resize-indicator";
	TableClasses["rowReorderIndicatorUp"] = "p-datatable-row-reorder-indicator-up";
	TableClasses["rowReorderIndicatorDown"] = "p-datatable-row-reorder-indicator-down";
	TableClasses["sortableColumn"] = "p-datatable-sortable-column";
	TableClasses["sortableColumnIcon"] = "p-sortable-column-icon";
	TableClasses["sortableColumnBadge"] = "p-sortable-column-badge";
	TableClasses["selectableRow"] = "p-datatable-selectable-row";
	TableClasses["resizableColumn"] = "p-datatable-resizable-column";
	TableClasses["rowEditorCancel"] = "p-datatable-row-editor-cancel";
	TableClasses["frozenColumn"] = "p-datatable-frozen-column";
	TableClasses["contextMenuRowSelected"] = "p-datatable-contextmenu-row-selected";
})(TableClasses || (TableClasses = {}));
var TABLE_INSTANCE = new InjectionToken("TABLE_INSTANCE");
var COLUMN_FILTER_INSTANCE = new InjectionToken("COLUMN_FILTER_INSTANCE");
var TableService = (_TableService = class TableService {
	constructor() {
		_defineProperty(this, "sortSource", new Subject());
		_defineProperty(this, "selectionSource", new Subject());
		_defineProperty(this, "contextMenuSource", new Subject());
		_defineProperty(this, "valueSource", new Subject());
		_defineProperty(this, "columnsSource", new Subject());
		_defineProperty(this, "sortSource$", this.sortSource.asObservable());
		_defineProperty(this, "selectionSource$", this.selectionSource.asObservable());
		_defineProperty(this, "contextMenuSource$", this.contextMenuSource.asObservable());
		_defineProperty(this, "valueSource$", this.valueSource.asObservable());
		_defineProperty(this, "columnsSource$", this.columnsSource.asObservable());
	}
	onSort(sortMeta) {
		this.sortSource.next(sortMeta);
	}
	onSelectionChange() {
		this.selectionSource.next(null);
	}
	onContextMenu(data) {
		this.contextMenuSource.next(data);
	}
	onValueChange(value) {
		this.valueSource.next(value);
	}
	onColumnsChange(columns) {
		this.columnsSource.next(columns);
	}
}, _defineProperty(_TableService, "ɵfac", function TableService_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _TableService)();
}), _defineProperty(_TableService, "ɵprov", /*@__PURE__*/ ɵɵdefineInjectable({
	token: _TableService,
	factory: _TableService.ɵfac
})), _TableService);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TableService, [{ type: Injectable }], null, null);
})();
var TableBody = (_TableBody = class TableBody extends BaseComponent {
	constructor() {
		super();
		_defineProperty(this, "hostName", "Table");
		_defineProperty(this, "columns", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "columns" } : /* istanbul ignore next */ {}), {}, { alias: "pTableBody" })));
		_defineProperty(this, "template", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "template" } : /* istanbul ignore next */ {}), {}, { alias: "pTableBodyTemplate" })));
		_defineProperty(this, "value", input(...ngDevMode ? [void 0, { debugName: "value" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "frozen", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "frozen" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "frozenRows", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "frozenRows" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "scrollerOptions", input(...ngDevMode ? [void 0, { debugName: "scrollerOptions" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataTable", inject(TABLE_INSTANCE));
		_defineProperty(this, "bodyContext", computed(() => ({
			$implicit: this.columns(),
			frozen: this.frozen()
		}), ...ngDevMode ? [{ debugName: "bodyContext" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataP", computed(() => this.cn({
			hoverable: this.dataTable.rowHover() || this.dataTable.selectionMode(),
			frozen: this.frozen()
		}), ...ngDevMode ? [{ debugName: "dataP" }] : /* istanbul ignore next */ []));
		effect(() => {
			if (this.value() !== void 0) {
				if (this.frozenRows()) this.updateFrozenRowStickyPosition();
				if (this.dataTable.scrollable() && this.dataTable.rowGroupMode() === "subheader") this.updateFrozenRowGroupHeaderStickyPosition();
			}
		});
	}
	onAfterViewInit() {
		if (this.frozenRows()) this.updateFrozenRowStickyPosition();
		if (this.dataTable.scrollable() && this.dataTable.rowGroupMode() === "subheader") this.updateFrozenRowGroupHeaderStickyPosition();
	}
	shouldRenderRowGroupHeader(value, rowData, i) {
		var _this$dataTable, _this$dataTable2, _this$dataTable3;
		let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, ((_this$dataTable = this.dataTable) === null || _this$dataTable === void 0 ? void 0 : _this$dataTable.groupRowsBy()) || "");
		let prevRowData = value[i - (((_this$dataTable2 = this.dataTable) === null || _this$dataTable2 === void 0 ? void 0 : _this$dataTable2.first()) || 0) - 1];
		if (prevRowData) return currentRowFieldData !== ObjectUtils.resolveFieldData(prevRowData, ((_this$dataTable3 = this.dataTable) === null || _this$dataTable3 === void 0 ? void 0 : _this$dataTable3.groupRowsBy()) || "");
		else return true;
	}
	shouldRenderRowGroupFooter(value, rowData, i) {
		var _this$dataTable4, _this$dataTable5, _this$dataTable6;
		let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, ((_this$dataTable4 = this.dataTable) === null || _this$dataTable4 === void 0 ? void 0 : _this$dataTable4.groupRowsBy()) || "");
		let nextRowData = value[i - (((_this$dataTable5 = this.dataTable) === null || _this$dataTable5 === void 0 ? void 0 : _this$dataTable5.first()) || 0) + 1];
		if (nextRowData) return currentRowFieldData !== ObjectUtils.resolveFieldData(nextRowData, ((_this$dataTable6 = this.dataTable) === null || _this$dataTable6 === void 0 ? void 0 : _this$dataTable6.groupRowsBy()) || "");
		else return true;
	}
	shouldRenderRowspan(value, rowData, i) {
		var _this$dataTable7, _this$dataTable8;
		let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, (_this$dataTable7 = this.dataTable) === null || _this$dataTable7 === void 0 ? void 0 : _this$dataTable7.groupRowsBy());
		let prevRowData = value[i - 1];
		if (prevRowData) return currentRowFieldData !== ObjectUtils.resolveFieldData(prevRowData, ((_this$dataTable8 = this.dataTable) === null || _this$dataTable8 === void 0 ? void 0 : _this$dataTable8.groupRowsBy()) || "");
		else return true;
	}
	calculateRowGroupSize(value, rowData, index) {
		var _this$dataTable9;
		let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, (_this$dataTable9 = this.dataTable) === null || _this$dataTable9 === void 0 ? void 0 : _this$dataTable9.groupRowsBy());
		let nextRowFieldData = currentRowFieldData;
		let groupRowSpan = 0;
		while (currentRowFieldData === nextRowFieldData) {
			var _this$dataTable10;
			groupRowSpan++;
			let nextRowData = value[++index];
			if (nextRowData) nextRowFieldData = ObjectUtils.resolveFieldData(nextRowData, ((_this$dataTable10 = this.dataTable) === null || _this$dataTable10 === void 0 ? void 0 : _this$dataTable10.groupRowsBy()) || "");
			else break;
		}
		return groupRowSpan === 1 ? null : groupRowSpan;
	}
	updateFrozenRowStickyPosition() {
		this.el.nativeElement.style.top = DomHandler.getOuterHeight(this.el.nativeElement.previousElementSibling) + "px";
	}
	updateFrozenRowGroupHeaderStickyPosition() {
		if (this.el.nativeElement.previousElementSibling) {
			let tableHeaderHeight = DomHandler.getOuterHeight(this.el.nativeElement.previousElementSibling);
			this.dataTable.rowGroupHeaderStyleObject.top = tableHeaderHeight + "px";
		}
	}
	getScrollerOption(option, options) {
		if (this.dataTable.virtualScroll()) {
			options = options || this.scrollerOptions();
			return options ? options[option] : null;
		}
		return null;
	}
	getRowIndex(rowIndex) {
		const index = this.dataTable.paginator() ? this.dataTable.first() + rowIndex : rowIndex;
		const getItemOptions = this.getScrollerOption("getItemOptions");
		return getItemOptions ? getItemOptions(index).index : index;
	}
}, _defineProperty(_TableBody, "ɵfac", function TableBody_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _TableBody)();
}), _defineProperty(_TableBody, "ɵcmp", (function() {
	const _c0 = (a0, a1, a2, a3, a4) => ({
		$implicit: a0,
		rowIndex: a1,
		columns: a2,
		editing: a3,
		frozen: a4
	});
	const _c1 = (a0, a1, a2, a3, a4, a5, a6) => ({
		$implicit: a0,
		rowIndex: a1,
		columns: a2,
		editing: a3,
		frozen: a4,
		rowgroup: a5,
		rowspan: a6
	});
	const _c2 = (a0, a1, a2, a3, a4, a5) => ({
		$implicit: a0,
		rowIndex: a1,
		columns: a2,
		expanded: a3,
		editing: a4,
		frozen: a5
	});
	const _c3 = (a0, a1, a2, a3) => ({
		$implicit: a0,
		rowIndex: a1,
		columns: a2,
		frozen: a3
	});
	function _forTrack0($index, $item) {
		return this.dataTable.rowTrackBy()($index, $item);
	}
	function TableBody_Conditional_5_For_1_Conditional_0_ng_container_1_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function TableBody_Conditional_5_For_1_Conditional_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementContainerStart(0, 0);
			ɵɵtemplate(1, TableBody_Conditional_5_For_1_Conditional_0_ng_container_1_Template, 1, 0, "ng-container", 1);
			ɵɵelementContainerEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			const rowData_r2 = ctx_r0.$implicit;
			const ɵ$index_7_r3 = ctx_r0.$index;
			const ctx_r3 = ɵɵnextContext(2);
			const groupHeaderTemplate_r5 = ɵɵreadContextLet(0);
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", groupHeaderTemplate_r5)("ngTemplateOutletContext", ɵɵpureFunction5(2, _c0, rowData_r2, ctx_r3.getRowIndex(ɵ$index_7_r3), ctx_r3.columns(), ctx_r3.dataTable.editMode() === "row" && ctx_r3.dataTable.isRowEditing(rowData_r2), ctx_r3.frozen()));
		}
	}
	function TableBody_Conditional_5_For_1_Conditional_1_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function TableBody_Conditional_5_For_1_Conditional_1_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, TableBody_Conditional_5_For_1_Conditional_1_ng_container_0_Template, 1, 0, "ng-container", 1);
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			const rowData_r2 = ctx_r0.$implicit;
			const ɵ$index_7_r3 = ctx_r0.$index;
			const ctx_r3 = ɵɵnextContext(2);
			const loadingBodyTemplate_r6 = ɵɵreadContextLet(2);
			ɵɵproperty("ngTemplateOutlet", rowData_r2 ? ctx_r3.template() : loadingBodyTemplate_r6)("ngTemplateOutletContext", ɵɵpureFunction5(2, _c0, rowData_r2, ctx_r3.getRowIndex(ɵ$index_7_r3), ctx_r3.columns(), ctx_r3.dataTable.editMode() === "row" && ctx_r3.dataTable.isRowEditing(rowData_r2), ctx_r3.frozen()));
		}
	}
	function TableBody_Conditional_5_For_1_Conditional_2_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function TableBody_Conditional_5_For_1_Conditional_2_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, TableBody_Conditional_5_For_1_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 1);
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			const rowData_r2 = ctx_r0.$implicit;
			const ɵ$index_7_r3 = ctx_r0.$index;
			const ctx_r3 = ɵɵnextContext(2);
			const loadingBodyTemplate_r6 = ɵɵreadContextLet(2);
			ɵɵproperty("ngTemplateOutlet", rowData_r2 ? ctx_r3.template() : loadingBodyTemplate_r6)("ngTemplateOutletContext", ɵɵpureFunction7(2, _c1, rowData_r2, ctx_r3.getRowIndex(ɵ$index_7_r3), ctx_r3.columns(), ctx_r3.dataTable.editMode() === "row" && ctx_r3.dataTable.isRowEditing(rowData_r2), ctx_r3.frozen(), ctx_r3.shouldRenderRowspan(ctx_r3.value(), rowData_r2, ɵ$index_7_r3), ctx_r3.calculateRowGroupSize(ctx_r3.value(), rowData_r2, ɵ$index_7_r3)));
		}
	}
	function TableBody_Conditional_5_For_1_Conditional_3_ng_container_1_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function TableBody_Conditional_5_For_1_Conditional_3_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementContainerStart(0, 0);
			ɵɵtemplate(1, TableBody_Conditional_5_For_1_Conditional_3_ng_container_1_Template, 1, 0, "ng-container", 1);
			ɵɵelementContainerEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			const rowData_r2 = ctx_r0.$implicit;
			const ɵ$index_7_r3 = ctx_r0.$index;
			const ctx_r3 = ɵɵnextContext(2);
			const groupFooterTemplate_r7 = ɵɵreadContextLet(1);
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", groupFooterTemplate_r7)("ngTemplateOutletContext", ɵɵpureFunction5(2, _c0, rowData_r2, ctx_r3.getRowIndex(ɵ$index_7_r3), ctx_r3.columns(), ctx_r3.dataTable.editMode() === "row" && ctx_r3.dataTable.isRowEditing(rowData_r2), ctx_r3.frozen()));
		}
	}
	function TableBody_Conditional_5_For_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵconditionalCreate(0, TableBody_Conditional_5_For_1_Conditional_0_Template, 2, 8, "ng-container", 0);
			ɵɵconditionalCreate(1, TableBody_Conditional_5_For_1_Conditional_1_Template, 1, 8, "ng-container");
			ɵɵconditionalCreate(2, TableBody_Conditional_5_For_1_Conditional_2_Template, 1, 10, "ng-container");
			ɵɵconditionalCreate(3, TableBody_Conditional_5_For_1_Conditional_3_Template, 2, 8, "ng-container", 0);
		}
		if (rf & 2) {
			const rowData_r2 = ctx.$implicit;
			const ɵ$index_7_r3 = ctx.$index;
			const ctx_r3 = ɵɵnextContext(2);
			const groupHeaderTemplate_r5 = ɵɵreadContextLet(0);
			const groupFooterTemplate_r7 = ɵɵreadContextLet(1);
			ɵɵconditional(groupHeaderTemplate_r5 && !ctx_r3.dataTable.virtualScroll() && ctx_r3.dataTable.rowGroupMode() === "subheader" && ctx_r3.shouldRenderRowGroupHeader(ctx_r3.value(), rowData_r2, ctx_r3.getRowIndex(ɵ$index_7_r3)) ? 0 : -1);
			ɵɵadvance();
			ɵɵconditional(ctx_r3.dataTable.rowGroupMode() !== "rowspan" ? 1 : -1);
			ɵɵadvance();
			ɵɵconditional(ctx_r3.dataTable.rowGroupMode() === "rowspan" ? 2 : -1);
			ɵɵadvance();
			ɵɵconditional(groupFooterTemplate_r7 && !ctx_r3.dataTable.virtualScroll() && ctx_r3.dataTable.rowGroupMode() === "subheader" && ctx_r3.shouldRenderRowGroupFooter(ctx_r3.value(), rowData_r2, ctx_r3.getRowIndex(ɵ$index_7_r3)) ? 3 : -1);
		}
	}
	function TableBody_Conditional_5_Template(rf, ctx) {
		if (rf & 1) ɵɵrepeaterCreate(0, TableBody_Conditional_5_For_1_Template, 4, 4, null, null, _forTrack0, true);
		if (rf & 2) {
			const ctx_r3 = ɵɵnextContext();
			ɵɵrepeater(ctx_r3.value());
		}
	}
	function TableBody_Conditional_6_For_1_Conditional_0_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function TableBody_Conditional_6_For_1_Conditional_0_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, TableBody_Conditional_6_For_1_Conditional_0_ng_container_0_Template, 1, 0, "ng-container", 1);
		if (rf & 2) {
			const ctx_r7 = ɵɵnextContext();
			const rowData_r9 = ctx_r7.$implicit;
			const ɵ$index_33_r10 = ctx_r7.$index;
			const ctx_r3 = ɵɵnextContext(2);
			ɵɵproperty("ngTemplateOutlet", ctx_r3.template())("ngTemplateOutletContext", ɵɵpureFunction6(2, _c2, rowData_r9, ctx_r3.getRowIndex(ɵ$index_33_r10), ctx_r3.columns(), ctx_r3.dataTable.isRowExpanded(rowData_r9), ctx_r3.dataTable.editMode() === "row" && ctx_r3.dataTable.isRowEditing(rowData_r9), ctx_r3.frozen()));
		}
	}
	function TableBody_Conditional_6_For_1_Conditional_1_ng_container_1_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function TableBody_Conditional_6_For_1_Conditional_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementContainerStart(0, 0);
			ɵɵtemplate(1, TableBody_Conditional_6_For_1_Conditional_1_ng_container_1_Template, 1, 0, "ng-container", 1);
			ɵɵelementContainerEnd();
		}
		if (rf & 2) {
			const ctx_r7 = ɵɵnextContext();
			const rowData_r9 = ctx_r7.$implicit;
			const ɵ$index_33_r10 = ctx_r7.$index;
			const ctx_r3 = ɵɵnextContext(2);
			const groupHeaderTemplate_r5 = ɵɵreadContextLet(0);
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", groupHeaderTemplate_r5)("ngTemplateOutletContext", ɵɵpureFunction6(2, _c2, rowData_r9, ctx_r3.getRowIndex(ɵ$index_33_r10), ctx_r3.columns(), ctx_r3.dataTable.isRowExpanded(rowData_r9), ctx_r3.dataTable.editMode() === "row" && ctx_r3.dataTable.isRowEditing(rowData_r9), ctx_r3.frozen()));
		}
	}
	function TableBody_Conditional_6_For_1_Conditional_2_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function TableBody_Conditional_6_For_1_Conditional_2_Conditional_1_ng_container_1_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function TableBody_Conditional_6_For_1_Conditional_2_Conditional_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementContainerStart(0, 0);
			ɵɵtemplate(1, TableBody_Conditional_6_For_1_Conditional_2_Conditional_1_ng_container_1_Template, 1, 0, "ng-container", 1);
			ɵɵelementContainerEnd();
		}
		if (rf & 2) {
			const ctx_r7 = ɵɵnextContext(2);
			const rowData_r9 = ctx_r7.$implicit;
			const ɵ$index_33_r10 = ctx_r7.$index;
			const ctx_r3 = ɵɵnextContext(2);
			const groupFooterTemplate_r7 = ɵɵreadContextLet(1);
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", groupFooterTemplate_r7)("ngTemplateOutletContext", ɵɵpureFunction6(2, _c2, rowData_r9, ctx_r3.getRowIndex(ɵ$index_33_r10), ctx_r3.columns(), ctx_r3.dataTable.isRowExpanded(rowData_r9), ctx_r3.dataTable.editMode() === "row" && ctx_r3.dataTable.isRowEditing(rowData_r9), ctx_r3.frozen()));
		}
	}
	function TableBody_Conditional_6_For_1_Conditional_2_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵtemplate(0, TableBody_Conditional_6_For_1_Conditional_2_ng_container_0_Template, 1, 0, "ng-container", 1);
			ɵɵconditionalCreate(1, TableBody_Conditional_6_For_1_Conditional_2_Conditional_1_Template, 2, 9, "ng-container", 0);
		}
		if (rf & 2) {
			const ctx_r7 = ɵɵnextContext();
			const rowData_r9 = ctx_r7.$implicit;
			const ɵ$index_33_r10 = ctx_r7.$index;
			const ctx_r3 = ɵɵnextContext(2);
			const groupFooterTemplate_r7 = ɵɵreadContextLet(1);
			const expandedRowTemplate_r11 = ɵɵreadContextLet(3);
			ɵɵproperty("ngTemplateOutlet", expandedRowTemplate_r11)("ngTemplateOutletContext", ɵɵpureFunction4(3, _c3, rowData_r9, ctx_r3.getRowIndex(ɵ$index_33_r10), ctx_r3.columns(), ctx_r3.frozen()));
			ɵɵadvance();
			ɵɵconditional(groupFooterTemplate_r7 && ctx_r3.dataTable.rowGroupMode() === "subheader" && ctx_r3.shouldRenderRowGroupFooter(ctx_r3.value(), rowData_r9, ctx_r3.getRowIndex(ɵ$index_33_r10)) ? 1 : -1);
		}
	}
	function TableBody_Conditional_6_For_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵconditionalCreate(0, TableBody_Conditional_6_For_1_Conditional_0_Template, 1, 9, "ng-container");
			ɵɵconditionalCreate(1, TableBody_Conditional_6_For_1_Conditional_1_Template, 2, 9, "ng-container", 0);
			ɵɵconditionalCreate(2, TableBody_Conditional_6_For_1_Conditional_2_Template, 2, 8);
		}
		if (rf & 2) {
			const rowData_r9 = ctx.$implicit;
			const ɵ$index_33_r10 = ctx.$index;
			const ctx_r3 = ɵɵnextContext(2);
			const groupHeaderTemplate_r5 = ɵɵreadContextLet(0);
			ɵɵconditional(!groupHeaderTemplate_r5 ? 0 : -1);
			ɵɵadvance();
			ɵɵconditional(groupHeaderTemplate_r5 && ctx_r3.dataTable.rowGroupMode() === "subheader" && ctx_r3.shouldRenderRowGroupHeader(ctx_r3.value(), rowData_r9, ctx_r3.getRowIndex(ɵ$index_33_r10)) ? 1 : -1);
			ɵɵadvance();
			ɵɵconditional(ctx_r3.dataTable.isRowExpanded(rowData_r9) ? 2 : -1);
		}
	}
	function TableBody_Conditional_6_Template(rf, ctx) {
		if (rf & 1) ɵɵrepeaterCreate(0, TableBody_Conditional_6_For_1_Template, 3, 3, null, null, _forTrack0, true);
		if (rf & 2) {
			const ctx_r3 = ɵɵnextContext();
			ɵɵrepeater(ctx_r3.value());
		}
	}
	function TableBody_Conditional_7_For_1_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function TableBody_Conditional_7_For_1_Conditional_1_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function TableBody_Conditional_7_For_1_Conditional_1_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, TableBody_Conditional_7_For_1_Conditional_1_ng_container_0_Template, 1, 0, "ng-container", 1);
		if (rf & 2) {
			const ctx_r11 = ɵɵnextContext();
			const rowData_r13 = ctx_r11.$implicit;
			const ɵ$index_59_r14 = ctx_r11.$index;
			const ctx_r3 = ɵɵnextContext(2);
			const frozenExpandedRowTemplate_r15 = ɵɵreadContextLet(4);
			ɵɵproperty("ngTemplateOutlet", frozenExpandedRowTemplate_r15)("ngTemplateOutletContext", ɵɵpureFunction4(2, _c3, rowData_r13, ctx_r3.getRowIndex(ɵ$index_59_r14), ctx_r3.columns(), ctx_r3.frozen()));
		}
	}
	function TableBody_Conditional_7_For_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵtemplate(0, TableBody_Conditional_7_For_1_ng_container_0_Template, 1, 0, "ng-container", 1);
			ɵɵconditionalCreate(1, TableBody_Conditional_7_For_1_Conditional_1_Template, 1, 7, "ng-container");
		}
		if (rf & 2) {
			const rowData_r13 = ctx.$implicit;
			const ɵ$index_59_r14 = ctx.$index;
			const ctx_r3 = ɵɵnextContext(2);
			ɵɵproperty("ngTemplateOutlet", ctx_r3.template())("ngTemplateOutletContext", ɵɵpureFunction6(3, _c2, rowData_r13, ctx_r3.getRowIndex(ɵ$index_59_r14), ctx_r3.columns(), ctx_r3.dataTable.isRowExpanded(rowData_r13), ctx_r3.dataTable.editMode() === "row" && ctx_r3.dataTable.isRowEditing(rowData_r13), ctx_r3.frozen()));
			ɵɵadvance();
			ɵɵconditional(ctx_r3.dataTable.isRowExpanded(rowData_r13) ? 1 : -1);
		}
	}
	function TableBody_Conditional_7_Template(rf, ctx) {
		if (rf & 1) ɵɵrepeaterCreate(0, TableBody_Conditional_7_For_1_Template, 2, 10, null, null, _forTrack0, true);
		if (rf & 2) {
			const ctx_r3 = ɵɵnextContext();
			ɵɵrepeater(ctx_r3.value());
		}
	}
	function TableBody_Conditional_8_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function TableBody_Conditional_8_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, TableBody_Conditional_8_ng_container_0_Template, 1, 0, "ng-container", 1);
		if (rf & 2) {
			const ctx_r3 = ɵɵnextContext();
			const loadingBodyTemplate_r6 = ɵɵreadContextLet(2);
			ɵɵproperty("ngTemplateOutlet", loadingBodyTemplate_r6)("ngTemplateOutletContext", ctx_r3.bodyContext());
		}
	}
	function TableBody_Conditional_9_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function TableBody_Conditional_9_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, TableBody_Conditional_9_ng_container_0_Template, 1, 0, "ng-container", 1);
		if (rf & 2) {
			const ctx_r3 = ɵɵnextContext();
			ɵɵproperty("ngTemplateOutlet", ctx_r3.dataTable.emptyMessageTemplate())("ngTemplateOutletContext", ctx_r3.bodyContext());
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _TableBody,
		selectors: [[
			"",
			"pTableBody",
			""
		]],
		hostVars: 1,
		hostBindings: function TableBody_HostBindings(rf, ctx) {
			if (rf & 2) ɵɵattribute("data-p", ctx.dataP());
		},
		inputs: {
			columns: [
				1,
				"pTableBody",
				"columns"
			],
			template: [
				1,
				"pTableBodyTemplate",
				"template"
			],
			value: [1, "value"],
			frozen: [1, "frozen"],
			frozenRows: [1, "frozenRows"],
			scrollerOptions: [1, "scrollerOptions"]
		},
		features: [ɵɵInheritDefinitionFeature],
		decls: 10,
		vars: 10,
		consts: [["role", "row"], [
			4,
			"ngTemplateOutlet",
			"ngTemplateOutletContext"
		]],
		template: function TableBody_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵdeclareLet(0)(1)(2)(3)(4);
				ɵɵconditionalCreate(5, TableBody_Conditional_5_Template, 2, 0);
				ɵɵconditionalCreate(6, TableBody_Conditional_6_Template, 2, 0);
				ɵɵconditionalCreate(7, TableBody_Conditional_7_Template, 2, 0);
				ɵɵconditionalCreate(8, TableBody_Conditional_8_Template, 1, 2, "ng-container");
				ɵɵconditionalCreate(9, TableBody_Conditional_9_Template, 1, 2, "ng-container");
			}
			if (rf & 2) {
				ɵɵstoreLet(ctx.dataTable.groupHeaderTemplate());
				ɵɵadvance();
				ɵɵstoreLet(ctx.dataTable.groupFooterTemplate());
				ɵɵadvance();
				ɵɵstoreLet(ctx.dataTable.loadingBodyTemplate());
				ɵɵadvance();
				const expandedRowTemplate_r16 = ɵɵstoreLet(ctx.dataTable.expandedRowTemplate());
				ɵɵadvance();
				const frozenExpandedRowTemplate_r17 = ɵɵstoreLet(ctx.dataTable.frozenExpandedRowTemplate());
				ɵɵadvance();
				ɵɵconditional(!expandedRowTemplate_r16 ? 5 : -1);
				ɵɵadvance();
				ɵɵconditional(expandedRowTemplate_r16 && !(ctx.frozen() && frozenExpandedRowTemplate_r17) ? 6 : -1);
				ɵɵadvance();
				ɵɵconditional(frozenExpandedRowTemplate_r17 && ctx.frozen() ? 7 : -1);
				ɵɵadvance();
				ɵɵconditional(ctx.dataTable.loading() ? 8 : -1);
				ɵɵadvance();
				ɵɵconditional(ctx.dataTable.isEmpty() && !ctx.dataTable.loading() ? 9 : -1);
			}
		},
		dependencies: [NgTemplateOutlet],
		encapsulation: 2,
		changeDetection: 1
	});
})()), _TableBody);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TableBody, [{
		type: Component,
		args: [{
			selector: "[pTableBody]",
			standalone: true,
			imports: [NgTemplateOutlet],
			template: `
        @let groupHeaderTemplate = dataTable.groupHeaderTemplate();
        @let groupFooterTemplate = dataTable.groupFooterTemplate();
        @let loadingBodyTemplate = dataTable.loadingBodyTemplate();
        @let expandedRowTemplate = dataTable.expandedRowTemplate();
        @let frozenExpandedRowTemplate = dataTable.frozenExpandedRowTemplate();
        @if (!expandedRowTemplate) {
            @for (rowData of value(); track dataTable.rowTrackBy()($index, rowData); let rowIndex = $index) {
                @if (groupHeaderTemplate && !dataTable.virtualScroll() && dataTable.rowGroupMode() === 'subheader' && shouldRenderRowGroupHeader(value(), rowData, getRowIndex(rowIndex))) {
                    <ng-container role="row">
                        <ng-container
                            *ngTemplateOutlet="
                                groupHeaderTemplate;
                                context: {
                                    $implicit: rowData,
                                    rowIndex: getRowIndex(rowIndex),
                                    columns: columns(),
                                    editing: dataTable.editMode() === 'row' && dataTable.isRowEditing(rowData),
                                    frozen: frozen()
                                }
                            "
                        ></ng-container>
                    </ng-container>
                }
                @if (dataTable.rowGroupMode() !== 'rowspan') {
                    <ng-container
                        *ngTemplateOutlet="
                            rowData ? template() : loadingBodyTemplate;
                            context: {
                                $implicit: rowData,
                                rowIndex: getRowIndex(rowIndex),
                                columns: columns(),
                                editing: dataTable.editMode() === 'row' && dataTable.isRowEditing(rowData),
                                frozen: frozen()
                            }
                        "
                    ></ng-container>
                }
                @if (dataTable.rowGroupMode() === 'rowspan') {
                    <ng-container
                        *ngTemplateOutlet="
                            rowData ? template() : loadingBodyTemplate;
                            context: {
                                $implicit: rowData,
                                rowIndex: getRowIndex(rowIndex),
                                columns: columns(),
                                editing: dataTable.editMode() === 'row' && dataTable.isRowEditing(rowData),
                                frozen: frozen(),
                                rowgroup: shouldRenderRowspan(value(), rowData, rowIndex),
                                rowspan: calculateRowGroupSize(value(), rowData, rowIndex)
                            }
                        "
                    ></ng-container>
                }
                @if (groupFooterTemplate && !dataTable.virtualScroll() && dataTable.rowGroupMode() === 'subheader' && shouldRenderRowGroupFooter(value(), rowData, getRowIndex(rowIndex))) {
                    <ng-container role="row">
                        <ng-container
                            *ngTemplateOutlet="
                                groupFooterTemplate;
                                context: {
                                    $implicit: rowData,
                                    rowIndex: getRowIndex(rowIndex),
                                    columns: columns(),
                                    editing: dataTable.editMode() === 'row' && dataTable.isRowEditing(rowData),
                                    frozen: frozen()
                                }
                            "
                        ></ng-container>
                    </ng-container>
                }
            }
        }
        @if (expandedRowTemplate && !(frozen() && frozenExpandedRowTemplate)) {
            @for (rowData of value(); track dataTable.rowTrackBy()($index, rowData); let rowIndex = $index) {
                @if (!groupHeaderTemplate) {
                    <ng-container
                        *ngTemplateOutlet="
                            template();
                            context: {
                                $implicit: rowData,
                                rowIndex: getRowIndex(rowIndex),
                                columns: columns(),
                                expanded: dataTable.isRowExpanded(rowData),
                                editing: dataTable.editMode() === 'row' && dataTable.isRowEditing(rowData),
                                frozen: frozen()
                            }
                        "
                    ></ng-container>
                }
                @if (groupHeaderTemplate && dataTable.rowGroupMode() === 'subheader' && shouldRenderRowGroupHeader(value(), rowData, getRowIndex(rowIndex))) {
                    <ng-container role="row">
                        <ng-container
                            *ngTemplateOutlet="
                                groupHeaderTemplate;
                                context: {
                                    $implicit: rowData,
                                    rowIndex: getRowIndex(rowIndex),
                                    columns: columns(),
                                    expanded: dataTable.isRowExpanded(rowData),
                                    editing: dataTable.editMode() === 'row' && dataTable.isRowEditing(rowData),
                                    frozen: frozen()
                                }
                            "
                        ></ng-container>
                    </ng-container>
                }
                @if (dataTable.isRowExpanded(rowData)) {
                    <ng-container
                        *ngTemplateOutlet="
                            expandedRowTemplate;
                            context: {
                                $implicit: rowData,
                                rowIndex: getRowIndex(rowIndex),
                                columns: columns(),
                                frozen: frozen()
                            }
                        "
                    ></ng-container>
                    @if (groupFooterTemplate && dataTable.rowGroupMode() === 'subheader' && shouldRenderRowGroupFooter(value(), rowData, getRowIndex(rowIndex))) {
                        <ng-container role="row">
                            <ng-container
                                *ngTemplateOutlet="
                                    groupFooterTemplate;
                                    context: {
                                        $implicit: rowData,
                                        rowIndex: getRowIndex(rowIndex),
                                        columns: columns(),
                                        expanded: dataTable.isRowExpanded(rowData),
                                        editing: dataTable.editMode() === 'row' && dataTable.isRowEditing(rowData),
                                        frozen: frozen()
                                    }
                                "
                            ></ng-container>
                        </ng-container>
                    }
                }
            }
        }
        @if (frozenExpandedRowTemplate && frozen()) {
            @for (rowData of value(); track dataTable.rowTrackBy()($index, rowData); let rowIndex = $index) {
                <ng-container
                    *ngTemplateOutlet="
                        template();
                        context: {
                            $implicit: rowData,
                            rowIndex: getRowIndex(rowIndex),
                            columns: columns(),
                            expanded: dataTable.isRowExpanded(rowData),
                            editing: dataTable.editMode() === 'row' && dataTable.isRowEditing(rowData),
                            frozen: frozen()
                        }
                    "
                ></ng-container>
                @if (dataTable.isRowExpanded(rowData)) {
                    <ng-container
                        *ngTemplateOutlet="
                            frozenExpandedRowTemplate;
                            context: {
                                $implicit: rowData,
                                rowIndex: getRowIndex(rowIndex),
                                columns: columns(),
                                frozen: frozen()
                            }
                        "
                    ></ng-container>
                }
            }
        }
        @if (dataTable.loading()) {
            <ng-container *ngTemplateOutlet="loadingBodyTemplate; context: bodyContext()"></ng-container>
        }
        @if (dataTable.isEmpty() && !dataTable.loading()) {
            <ng-container *ngTemplateOutlet="dataTable.emptyMessageTemplate(); context: bodyContext()"></ng-container>
        }
    `,
			changeDetection: ChangeDetectionStrategy.Default,
			encapsulation: ViewEncapsulation.None,
			host: { "[attr.data-p]": "dataP()" }
		}]
	}], () => [], {
		columns: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pTableBody",
				required: false
			}]
		}],
		template: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pTableBodyTemplate",
				required: false
			}]
		}],
		value: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "value",
				required: false
			}]
		}],
		frozen: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "frozen",
				required: false
			}]
		}],
		frozenRows: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "frozenRows",
				required: false
			}]
		}],
		scrollerOptions: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "scrollerOptions",
				required: false
			}]
		}]
	});
})();
var Table = (_Table = class Table extends BaseComponent {
	get editingRowKeys() {
		return this._editingRowKeys();
	}
	set editingRowKeys(value) {
		this._editingRowKeys.set(value);
	}
	get editingCell() {
		return this._editingCell();
	}
	set editingCell(value) {
		this._editingCell.set(value);
	}
	constructor() {
		super();
		_defineProperty(this, "componentName", "Table");
		_defineProperty(this, "frozenColumns", input(...ngDevMode ? [void 0, { debugName: "frozenColumns" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "frozenValue", input(...ngDevMode ? [void 0, { debugName: "frozenValue" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "tableStyle", input(...ngDevMode ? [void 0, { debugName: "tableStyle" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "tableStyleClass", input(...ngDevMode ? [void 0, { debugName: "tableStyleClass" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "paginator", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "paginator" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "pageLinks", input(5, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "pageLinks" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "rowsPerPageOptions", input(...ngDevMode ? [void 0, { debugName: "rowsPerPageOptions" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "alwaysShowPaginator", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "alwaysShowPaginator" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "paginatorPosition", input("bottom", ...ngDevMode ? [{ debugName: "paginatorPosition" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "paginatorStyleClass", input(...ngDevMode ? [void 0, { debugName: "paginatorStyleClass" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "paginatorDropdownAppendTo", input(...ngDevMode ? [void 0, { debugName: "paginatorDropdownAppendTo" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "paginatorDropdownScrollHeight", input("200px", ...ngDevMode ? [{ debugName: "paginatorDropdownScrollHeight" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "currentPageReportTemplate", input("{currentPage} of {totalPages}", ...ngDevMode ? [{ debugName: "currentPageReportTemplate" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "showCurrentPageReport", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "showCurrentPageReport" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "showJumpToPageDropdown", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "showJumpToPageDropdown" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "showJumpToPageInput", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "showJumpToPageInput" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "showFirstLastIcon", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "showFirstLastIcon" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "showPageLinks", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "showPageLinks" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "defaultSortOrder", input(1, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "defaultSortOrder" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "sortMode", input("single", ...ngDevMode ? [{ debugName: "sortMode" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "resetPageOnSort", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "resetPageOnSort" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "selectionMode", input(...ngDevMode ? [void 0, { debugName: "selectionMode" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "selectionPageOnly", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "selectionPageOnly" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "contextMenuSelectionInput", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "contextMenuSelectionInput" } : /* istanbul ignore next */ {}), {}, { alias: "contextMenuSelection" })));
		_defineProperty(this, "contextMenuSelection", void 0);
		_defineProperty(this, "contextMenuSelectionChange", output());
		_defineProperty(this, "dataKey", input(...ngDevMode ? [void 0, { debugName: "dataKey" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "metaKeySelection", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "metaKeySelection" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "rowSelectable", input(...ngDevMode ? [void 0, { debugName: "rowSelectable" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "rowTrackBy", input((index, item) => item !== null && item !== void 0 ? item : index, ...ngDevMode ? [{ debugName: "rowTrackBy" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "lazy", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "lazy" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "lazyLoadOnInit", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "lazyLoadOnInit" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "compareSelectionBy", input("deepEquals", ...ngDevMode ? [{ debugName: "compareSelectionBy" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "csvSeparator", input(",", ...ngDevMode ? [{ debugName: "csvSeparator" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "exportFilename", input("download", ...ngDevMode ? [{ debugName: "exportFilename" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "filtersInput", input({}, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "filtersInput" } : /* istanbul ignore next */ {}), {}, { alias: "filters" })));
		_defineProperty(this, "filters", {});
		_defineProperty(this, "globalFilterFields", input(...ngDevMode ? [void 0, { debugName: "globalFilterFields" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "filterDelay", input(300, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "filterDelay" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "filterLocale", input(...ngDevMode ? [void 0, { debugName: "filterLocale" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "expandedRowKeysInput", input({}, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "expandedRowKeysInput" } : /* istanbul ignore next */ {}), {}, { alias: "expandedRowKeys" })));
		_defineProperty(this, "expandedRowKeys", {});
		_defineProperty(this, "editingRowKeysInput", input({}, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "editingRowKeysInput" } : /* istanbul ignore next */ {}), {}, { alias: "editingRowKeys" })));
		_defineProperty(this, "_editingRowKeys", signal({}, ...ngDevMode ? [{ debugName: "_editingRowKeys" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "rowExpandMode", input("multiple", ...ngDevMode ? [{ debugName: "rowExpandMode" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "scrollable", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "scrollable" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "rowGroupMode", input(...ngDevMode ? [void 0, { debugName: "rowGroupMode" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "scrollHeight", input(...ngDevMode ? [void 0, { debugName: "scrollHeight" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "virtualScroll", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "virtualScroll" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "virtualScrollItemSize", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "virtualScrollItemSize" } : /* istanbul ignore next */ {}), {}, { transform: (v) => numberAttribute(v, void 0) })));
		_defineProperty(this, "virtualScrollOptions", input(...ngDevMode ? [void 0, { debugName: "virtualScrollOptions" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "virtualScrollDelay", input(250, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "virtualScrollDelay" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "frozenWidth", input(...ngDevMode ? [void 0, { debugName: "frozenWidth" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "contextMenu", input(...ngDevMode ? [void 0, { debugName: "contextMenu" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "resizableColumns", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "resizableColumns" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "columnResizeMode", input("fit", ...ngDevMode ? [{ debugName: "columnResizeMode" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "reorderableColumns", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "reorderableColumns" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "loading", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "loading" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "loadingIcon", input(...ngDevMode ? [void 0, { debugName: "loadingIcon" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "showLoader", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "showLoader" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "rowHover", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "rowHover" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "customSort", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "customSort" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "showInitialSortBadge", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "showInitialSortBadge" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "exportFunction", input(...ngDevMode ? [void 0, { debugName: "exportFunction" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "exportHeader", input(...ngDevMode ? [void 0, { debugName: "exportHeader" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "stateKey", input(...ngDevMode ? [void 0, { debugName: "stateKey" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "stateStorage", input("session", ...ngDevMode ? [{ debugName: "stateStorage" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "editMode", input("cell", ...ngDevMode ? [{ debugName: "editMode" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "groupRowsBy", input(...ngDevMode ? [void 0, { debugName: "groupRowsBy" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "size", input(...ngDevMode ? [void 0, { debugName: "size" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "showGridlines", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "showGridlines" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "stripedRows", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "stripedRows" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "groupRowsByOrder", input(1, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "groupRowsByOrder" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "paginatorLocale", input(...ngDevMode ? [void 0, { debugName: "paginatorLocale" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "valueInput", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "valueInput" } : /* istanbul ignore next */ {}), {}, { alias: "value" })));
		_defineProperty(this, "columnsInput", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "columnsInput" } : /* istanbul ignore next */ {}), {}, { alias: "columns" })));
		_defineProperty(this, "first", model(0, ...ngDevMode ? [{ debugName: "first" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "rows", model(...ngDevMode ? [void 0, { debugName: "rows" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "totalRecords", model(0, ...ngDevMode ? [{ debugName: "totalRecords" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "sortFieldInput", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "sortFieldInput" } : /* istanbul ignore next */ {}), {}, { alias: "sortField" })));
		_defineProperty(this, "sortOrderInput", input(1, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "sortOrderInput" } : /* istanbul ignore next */ {}), {}, { alias: "sortOrder" })));
		_defineProperty(this, "multiSortMetaInput", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "multiSortMetaInput" } : /* istanbul ignore next */ {}), {}, { alias: "multiSortMeta" })));
		_defineProperty(this, "selection", model(...ngDevMode ? [void 0, { debugName: "selection" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "selectAllInput", input(null, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "selectAllInput" } : /* istanbul ignore next */ {}), {}, { alias: "selectAll" })));
		_defineProperty(this, "selectAllChange", output());
		_defineProperty(this, "onRowSelect", output());
		_defineProperty(this, "onRowUnselect", output());
		_defineProperty(this, "onPage", output());
		_defineProperty(this, "onSort", output());
		_defineProperty(this, "onFilter", output());
		_defineProperty(this, "onLazyLoad", output());
		_defineProperty(this, "onRowExpand", output());
		_defineProperty(this, "onRowCollapse", output());
		_defineProperty(this, "onContextMenuSelect", output());
		_defineProperty(this, "onColResize", output());
		_defineProperty(this, "onColReorder", output());
		_defineProperty(this, "onRowReorder", output());
		_defineProperty(this, "onEditInit", output());
		_defineProperty(this, "onEditComplete", output());
		_defineProperty(this, "onEditCancel", output());
		_defineProperty(this, "onHeaderCheckboxToggle", output());
		_defineProperty(this, "sortFunction", output());
		_defineProperty(this, "onStateSave", output());
		_defineProperty(this, "onStateRestore", output());
		_defineProperty(this, "resizeHelperViewChild", viewChild("resizeHelper", ...ngDevMode ? [{ debugName: "resizeHelperViewChild" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "reorderIndicatorUpViewChild", viewChild("reorderIndicatorUp", ...ngDevMode ? [{ debugName: "reorderIndicatorUpViewChild" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "reorderIndicatorDownViewChild", viewChild("reorderIndicatorDown", ...ngDevMode ? [{ debugName: "reorderIndicatorDownViewChild" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "wrapperViewChild", viewChild("wrapper", ...ngDevMode ? [{ debugName: "wrapperViewChild" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "tableViewChild", viewChild("table", ...ngDevMode ? [{ debugName: "tableViewChild" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "tableHeaderViewChild", viewChild("thead", ...ngDevMode ? [{ debugName: "tableHeaderViewChild" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "tableFooterViewChild", viewChild("tfoot", ...ngDevMode ? [{ debugName: "tableFooterViewChild" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "scroller", viewChild("scroller", ...ngDevMode ? [{ debugName: "scroller" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "value", []);
		_defineProperty(this, "columns", void 0);
		_defineProperty(this, "filteredValue", void 0);
		_defineProperty(this, "headerTemplate", contentChild("header", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "headerTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "headerGroupedTemplate", contentChild("headergrouped", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "headerGroupedTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "bodyTemplate", contentChild("body", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "bodyTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "loadingBodyTemplate", contentChild("loadingbody", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "loadingBodyTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "captionTemplate", contentChild("caption", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "captionTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "footerTemplate", contentChild("footer", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "footerTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "footerGroupedTemplate", contentChild("footergrouped", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "footerGroupedTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "summaryTemplate", contentChild("summary", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "summaryTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "colGroupTemplate", contentChild("colgroup", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "colGroupTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "expandedRowTemplate", contentChild("expandedrow", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "expandedRowTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "groupHeaderTemplate", contentChild("groupheader", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "groupHeaderTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "groupFooterTemplate", contentChild("groupfooter", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "groupFooterTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "frozenExpandedRowTemplate", contentChild("frozenexpandedrow", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "frozenExpandedRowTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "frozenHeaderTemplate", contentChild("frozenheader", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "frozenHeaderTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "frozenBodyTemplate", contentChild("frozenbody", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "frozenBodyTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "frozenFooterTemplate", contentChild("frozenfooter", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "frozenFooterTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "frozenColGroupTemplate", contentChild("frozencolgroup", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "frozenColGroupTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "emptyMessageTemplate", contentChild("emptymessage", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "emptyMessageTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "paginatorLeftTemplate", contentChild("paginatorleft", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "paginatorLeftTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "paginatorRightTemplate", contentChild("paginatorright", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "paginatorRightTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "paginatorDropdownItemTemplate", contentChild("paginatordropdownitem", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "paginatorDropdownItemTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "loadingIconTemplate", contentChild("loadingicon", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "loadingIconTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "reorderIndicatorUpIconTemplate", contentChild("reorderindicatorupicon", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "reorderIndicatorUpIconTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "reorderIndicatorDownIconTemplate", contentChild("reorderindicatordownicon", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "reorderIndicatorDownIconTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "sortIconTemplate", contentChild("sorticon", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "sortIconTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "checkboxIconTemplate", contentChild("checkboxicon", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "checkboxIconTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "$checkboxIconTemplate", signal(void 0, ...ngDevMode ? [{ debugName: "$checkboxIconTemplate" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "headerCheckboxIconTemplate", contentChild("headercheckboxicon", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "headerCheckboxIconTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "paginatorDropdownIconTemplate", contentChild("paginatordropdownicon", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "paginatorDropdownIconTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "paginatorFirstPageLinkIconTemplate", contentChild("paginatorfirstpagelinkicon", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "paginatorFirstPageLinkIconTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "paginatorLastPageLinkIconTemplate", contentChild("paginatorlastpagelinkicon", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "paginatorLastPageLinkIconTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "paginatorPreviousPageLinkIconTemplate", contentChild("paginatorpreviouspagelinkicon", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "paginatorPreviousPageLinkIconTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "paginatorNextPageLinkIconTemplate", contentChild("paginatornextpagelinkicon", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "paginatorNextPageLinkIconTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "showLoadingMask", computed(() => this.loading() && this.showLoader(), ...ngDevMode ? [{ debugName: "showLoadingMask" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "showTopPaginator", computed(() => this.paginator() && (this.paginatorPosition() === "top" || this.paginatorPosition() === "both"), ...ngDevMode ? [{ debugName: "showTopPaginator" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "showBottomPaginator", computed(() => this.paginator() && (this.paginatorPosition() === "bottom" || this.paginatorPosition() === "both"), ...ngDevMode ? [{ debugName: "showBottomPaginator" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "showFrozenBody", computed(() => !!(this.frozenValue() || this.frozenBodyTemplate()), ...ngDevMode ? [{ debugName: "showFrozenBody" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "showFooter", computed(() => !!(this.footerGroupedTemplate() || this.footerTemplate()), ...ngDevMode ? [{ debugName: "showFooter" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "scrollerStyle", computed(() => ({ height: this.scrollHeight() !== "flex" ? this.scrollHeight() : void 0 }), ...ngDevMode ? [{ debugName: "scrollerStyle" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "scrollerScrollHeight", computed(() => this.scrollHeight() !== "flex" ? void 0 : "100%", ...ngDevMode ? [{ debugName: "scrollerScrollHeight" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "scrollerDelay", computed(() => this.lazy() ? this.virtualScrollDelay() : 0, ...ngDevMode ? [{ debugName: "scrollerDelay" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "selectionKeys", {});
		_defineProperty(this, "disabledSelectionKeys", /* @__PURE__ */ new Set());
		_defineProperty(this, "lastResizerHelperX", void 0);
		_defineProperty(this, "resizerHelperX", void 0);
		_defineProperty(this, "reorderIconWidth", void 0);
		_defineProperty(this, "reorderIconHeight", void 0);
		_defineProperty(this, "draggedColumn", void 0);
		_defineProperty(this, "draggedRowIndex", void 0);
		_defineProperty(this, "droppedRowIndex", void 0);
		_defineProperty(this, "rowDragging", void 0);
		_defineProperty(this, "dropPosition", void 0);
		_defineProperty(this, "_editingCell", signal(null, ...ngDevMode ? [{ debugName: "_editingCell" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "editingCellData", void 0);
		_defineProperty(this, "editingCellField", void 0);
		_defineProperty(this, "editingCellRowIndex", void 0);
		_defineProperty(this, "selfClick", void 0);
		_defineProperty(this, "documentEditListener", void 0);
		_defineProperty(this, "multiSortMeta", void 0);
		_defineProperty(this, "sortField", void 0);
		_defineProperty(this, "sortOrder", 1);
		_defineProperty(this, "preventSelectionSetterPropagation", void 0);
		_defineProperty(this, "_selectAll", null);
		_defineProperty(this, "anchorRowIndex", void 0);
		_defineProperty(this, "rangeRowIndex", void 0);
		_defineProperty(this, "filterTimeout", void 0);
		_defineProperty(this, "initialized", void 0);
		_defineProperty(this, "rowTouched", void 0);
		_defineProperty(this, "restoringSort", void 0);
		_defineProperty(this, "restoringFilter", void 0);
		_defineProperty(this, "stateRestored", void 0);
		_defineProperty(this, "columnOrderStateRestored", void 0);
		_defineProperty(this, "columnWidthsState", void 0);
		_defineProperty(this, "tableWidthState", void 0);
		_defineProperty(this, "overlaySubscription", void 0);
		_defineProperty(this, "resizeColumnElement", void 0);
		_defineProperty(this, "columnResizing", false);
		_defineProperty(this, "rowGroupHeaderStyleObject", {});
		_defineProperty(this, "id", this.$useId.next("pn_id_"));
		_defineProperty(this, "styleElement", void 0);
		_defineProperty(this, "overlayService", inject(OverlayService));
		_defineProperty(this, "filterService", inject(FilterService));
		_defineProperty(this, "tableService", inject(TableService));
		_defineProperty(this, "_componentStyle", inject(TableStyle));
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		_defineProperty(this, "_initialColWidths", void 0);
		_defineProperty(this, "_defaultRows", void 0);
		effect(() => {
			const initialRows = this.rows();
			untracked(() => {
				if (this._defaultRows === void 0 && initialRows !== void 0) this._defaultRows = initialRows;
			});
		});
		effect(() => {
			const val = this.valueInput();
			untracked(() => {
				if (val !== void 0) {
					if (this.isStateful() && !this.stateRestored && isPlatformBrowser(this.platformId)) this.restoreState();
					this.value = val;
					if (!this.lazy()) {
						this.totalRecords.set(this.value ? this.value.length : 0);
						if (this.sortMode() == "single" && (this.sortField || this.groupRowsBy())) this.sortSingle();
						else if (this.sortMode() == "multiple" && (this.multiSortMeta || this.groupRowsBy())) this.sortMultiple();
						else if (this.hasFilter()) this._filter();
					}
					this.tableService.onValueChange(val);
				}
			});
		});
		effect(() => {
			const cols = this.columnsInput();
			untracked(() => {
				if (cols !== void 0) {
					this.columns = cols;
					if (this.isStateful() && this.reorderableColumns() && !this.columnOrderStateRestored) this.restoreColumnOrder();
					this.tableService.onColumnsChange(this.columns);
				}
			});
		});
		effect(() => {
			const val = this.sortFieldInput();
			untracked(() => {
				if (val !== void 0) {
					this.sortField = val;
					if (!this.lazy() || this.initialized) {
						if (this.sortMode() === "single") this.sortSingle();
					}
				}
			});
		});
		effect(() => {
			this.groupRowsBy();
			untracked(() => {
				if (!this.lazy() || this.initialized) {
					if (this.sortMode() === "single") this.sortSingle();
				}
			});
		});
		effect(() => {
			const val = this.sortOrderInput();
			untracked(() => {
				this.sortOrder = val;
				if (!this.lazy() || this.initialized) {
					if (this.sortMode() === "single") this.sortSingle();
				}
			});
		});
		effect(() => {
			this.groupRowsByOrder();
			untracked(() => {
				if (!this.lazy() || this.initialized) {
					if (this.sortMode() === "single") this.sortSingle();
				}
			});
		});
		effect(() => {
			const val = this.multiSortMetaInput();
			untracked(() => {
				if (val !== void 0) {
					this.multiSortMeta = val;
					if (this.sortMode() === "multiple" && (this.initialized || !this.lazy() && !this.virtualScroll())) this.sortMultiple();
				}
			});
		});
		effect(() => {
			const val = this.selection();
			untracked(() => {
				if (val !== void 0) {
					if (!this.preventSelectionSetterPropagation) {
						this.updateSelectionKeys();
						this.tableService.onSelectionChange();
					}
					this.preventSelectionSetterPropagation = false;
				}
			});
		});
		effect(() => {
			const val = this.selectAllInput();
			untracked(() => {
				if (val !== null) {
					this._selectAll = val;
					if (!this.preventSelectionSetterPropagation) {
						this.updateSelectionKeys();
						this.tableService.onSelectionChange();
						if (this.isStateful()) this.saveState();
					}
					this.preventSelectionSetterPropagation = false;
				}
			});
		});
		effect(() => {
			const val = this.contextMenuSelectionInput();
			if (val !== void 0) this.contextMenuSelection = val;
		});
		effect(() => {
			const val = this.filtersInput();
			this.filters = val !== null && val !== void 0 ? val : {};
		});
		effect(() => {
			const val = this.expandedRowKeysInput();
			this.expandedRowKeys = val !== null && val !== void 0 ? val : {};
		});
		effect(() => {
			const val = this.editingRowKeysInput();
			this.editingRowKeys = val !== null && val !== void 0 ? val : {};
		});
	}
	onAfterContentChecked() {
		this.$checkboxIconTemplate.set(this.checkboxIconTemplate());
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
	}
	onInit() {
		if (this.lazy() && this.lazyLoadOnInit()) {
			if (!this.virtualScroll()) this.onLazyLoad.emit(this.createLazyLoadMetadata());
			if (this.restoringFilter) this.restoringFilter = false;
		}
		this.initialized = true;
	}
	onAfterViewInit() {
		if (isPlatformBrowser(this.platformId)) {
			if (this.isStateful() && this.resizableColumns()) this.restoreColumnWidths();
		}
	}
	get processedData() {
		return this.filteredValue || this.value || [];
	}
	dataToRender(data) {
		const _data = data || this.processedData;
		if (_data && this.paginator()) {
			const first = this.lazy() ? 0 : this.first();
			return _data.slice(first, first + this.rows());
		}
		return _data;
	}
	updateSelectionKeys() {
		if (this.dataKey() && this.selection()) {
			this.selectionKeys = {};
			if (Array.isArray(this.selection())) for (let data of this.selection()) this.selectionKeys[String(ObjectUtils.resolveFieldData(data, this.dataKey()))] = 1;
			else this.selectionKeys[String(ObjectUtils.resolveFieldData(this.selection(), this.dataKey()))] = 1;
		}
	}
	onPageChange(event) {
		this.first.set(event.first);
		this.rows.set(event.rows);
		this.onPage.emit({
			first: this.first(),
			rows: this.rows()
		});
		if (this.lazy()) this.onLazyLoad.emit(this.createLazyLoadMetadata());
		this.tableService.onValueChange(this.value);
		if (this.isStateful()) this.saveState();
		this.anchorRowIndex = null;
		if (this.scrollable()) this.resetScrollTop();
	}
	sort(event) {
		let originalEvent = event.originalEvent;
		if (this.sortMode() === "single") {
			this.sortOrder = this.sortField === event.field ? this.sortOrder * -1 : this.defaultSortOrder();
			this.sortField = event.field;
			if (this.resetPageOnSort()) {
				this.first.set(0);
				if (this.scrollable()) this.resetScrollTop();
			}
			this.sortSingle(this.resetPageOnSort());
		}
		if (this.sortMode() === "multiple") {
			let metaKey = originalEvent.metaKey || originalEvent.ctrlKey;
			let sortMeta = this.getSortMeta(event.field);
			if (sortMeta) {
				if (!metaKey) {
					this.multiSortMeta = [{
						field: event.field,
						order: sortMeta.order * -1
					}];
					if (this.resetPageOnSort()) {
						this.first.set(0);
						if (this.scrollable()) this.resetScrollTop();
					}
				} else sortMeta.order = sortMeta.order * -1;
			} else {
				if (!metaKey || !this.multiSortMeta) {
					this.multiSortMeta = [];
					if (this.resetPageOnSort()) this.first.set(0);
				}
				this.multiSortMeta.push({
					field: event.field,
					order: this.defaultSortOrder()
				});
			}
			this.sortMultiple(this.resetPageOnSort());
		}
		if (this.isStateful()) this.saveState();
		this.anchorRowIndex = null;
	}
	sortSingle(resetPage = true) {
		let field = this.sortField || this.groupRowsBy();
		let order = this.sortField ? this.sortOrder : this.groupRowsByOrder();
		if (this.groupRowsBy() && this.sortField && this.groupRowsBy() !== this.sortField) {
			this.multiSortMeta = [this.getGroupRowsMeta(), {
				field: this.sortField,
				order: this.sortOrder
			}];
			this.sortMultiple(resetPage);
			return;
		}
		if (field && order) {
			if (this.restoringSort) this.restoringSort = false;
			if (this.lazy()) this.onLazyLoad.emit(this.createLazyLoadMetadata());
			else if (this.value) {
				if (this.customSort()) this.sortFunction.emit({
					data: this.value,
					mode: this.sortMode(),
					field,
					order
				});
				else {
					this.value.sort((data1, data2) => {
						let value1 = ObjectUtils.resolveFieldData(data1, field);
						let value2 = ObjectUtils.resolveFieldData(data2, field);
						let result = null;
						if (value1 == null && value2 != null) result = -1;
						else if (value1 != null && value2 == null) result = 1;
						else if (value1 == null && value2 == null) result = 0;
						else if (typeof value1 === "string" && typeof value2 === "string") result = value1.localeCompare(value2);
						else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
						return order * (result || 0);
					});
					this.value = [...this.value];
				}
				if (this.hasFilter()) this._filter(resetPage);
			}
			let sortMeta = {
				field,
				order
			};
			this.onSort.emit(sortMeta);
			this.tableService.onSort(sortMeta);
		}
	}
	sortMultiple(resetPage = true) {
		if (this.groupRowsBy()) {
			if (!this.multiSortMeta) this.multiSortMeta = [this.getGroupRowsMeta()];
			else if (this.multiSortMeta[0].field !== this.groupRowsBy()) this.multiSortMeta = [this.getGroupRowsMeta(), ...this.multiSortMeta];
		}
		if (this.multiSortMeta && this.multiSortMeta.length > 0) {
			if (this.lazy()) this.onLazyLoad.emit(this.createLazyLoadMetadata());
			else if (this.value) {
				if (this.customSort()) this.sortFunction.emit({
					data: this.value,
					mode: this.sortMode(),
					multiSortMeta: this.multiSortMeta
				});
				else {
					this.value.sort((data1, data2) => this.multisortField(data1, data2, this.multiSortMeta, 0));
					this.value = [...this.value];
				}
				if (this.hasFilter()) this._filter(resetPage);
			}
			this.onSort.emit({ multisortmeta: this.multiSortMeta });
			this.tableService.onSort(this.multiSortMeta);
		}
	}
	multisortField(data1, data2, multiSortMeta, index) {
		const value1 = ObjectUtils.resolveFieldData(data1, multiSortMeta[index].field);
		const value2 = ObjectUtils.resolveFieldData(data2, multiSortMeta[index].field);
		if (ObjectUtils.compare(value1, value2, this.filterLocale()) === 0) return multiSortMeta.length - 1 > index ? this.multisortField(data1, data2, multiSortMeta, index + 1) : 0;
		return this.compareValuesOnSort(value1, value2, multiSortMeta[index].order);
	}
	compareValuesOnSort(value1, value2, order) {
		return ObjectUtils.sort(value1, value2, order, this.filterLocale(), this.sortOrder);
	}
	getSortMeta(field) {
		if (this.multiSortMeta && this.multiSortMeta.length) {
			for (let i = 0; i < this.multiSortMeta.length; i++) if (this.multiSortMeta[i].field === field) return this.multiSortMeta[i];
		}
		return null;
	}
	isSorted(field) {
		if (this.sortMode() === "single") return this.sortField && this.sortField === field;
		else if (this.sortMode() === "multiple") {
			let sorted = false;
			if (this.multiSortMeta) {
				for (let i = 0; i < this.multiSortMeta.length; i++) if (this.multiSortMeta[i].field == field) {
					sorted = true;
					break;
				}
			}
			return sorted;
		}
	}
	handleRowClick(event) {
		let target = event.originalEvent.target;
		let targetNode = target.nodeName;
		let parentNode = target.parentElement && target.parentElement.nodeName;
		if (targetNode == "INPUT" || targetNode == "BUTTON" || targetNode == "A" || parentNode == "INPUT" || parentNode == "BUTTON" || parentNode == "A" || oe(event.originalEvent.target)) return;
		if (this.selectionMode()) {
			let rowData = event.rowData;
			let rowIndex = event.rowIndex;
			this.preventSelectionSetterPropagation = true;
			if (this.isMultipleSelectionMode() && event.originalEvent.shiftKey && this.anchorRowIndex != null) {
				DomHandler.clearSelection();
				if (this.rangeRowIndex != null) this.clearSelectionRange(event.originalEvent);
				this.rangeRowIndex = rowIndex;
				this.selectRange(event.originalEvent, rowIndex);
			} else {
				let selected = this.isSelected(rowData);
				if (!selected && !this.isRowSelectable(rowData, rowIndex)) return;
				let metaSelection = this.rowTouched ? false : this.metaKeySelection();
				let dataKeyValue = this.dataKey() ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey())) : null;
				this.anchorRowIndex = rowIndex;
				this.rangeRowIndex = rowIndex;
				if (metaSelection) {
					let metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;
					if (selected && metaKey) {
						if (this.isSingleSelectionMode()) {
							this.selection.set(null);
							this.selectionKeys = {};
						} else {
							let selectionIndex = this.findIndexInSelection(rowData);
							this.selection.set(this.selection().filter((val, i) => i != selectionIndex));
							if (dataKeyValue) delete this.selectionKeys[dataKeyValue];
						}
						this.onRowUnselect.emit({
							originalEvent: event.originalEvent,
							data: rowData,
							type: "row"
						});
					} else {
						if (this.isSingleSelectionMode()) {
							this.selection.set(rowData);
							if (dataKeyValue) {
								this.selectionKeys = {};
								this.selectionKeys[dataKeyValue] = 1;
							}
						} else if (this.isMultipleSelectionMode()) {
							if (metaKey) this.selection.set(this.selection() || []);
							else {
								this.selection.set([]);
								this.selectionKeys = {};
							}
							this.selection.set([...this.selection(), rowData]);
							if (dataKeyValue) this.selectionKeys[dataKeyValue] = 1;
						}
						this.onRowSelect.emit({
							originalEvent: event.originalEvent,
							data: rowData,
							type: "row",
							index: rowIndex
						});
					}
				} else if (this.selectionMode() === "single") {
					if (selected) {
						this.selection.set(null);
						this.selectionKeys = {};
						this.onRowUnselect.emit({
							originalEvent: event.originalEvent,
							data: rowData,
							type: "row",
							index: rowIndex
						});
					} else {
						this.selection.set(rowData);
						this.onRowSelect.emit({
							originalEvent: event.originalEvent,
							data: rowData,
							type: "row",
							index: rowIndex
						});
						if (dataKeyValue) {
							this.selectionKeys = {};
							this.selectionKeys[dataKeyValue] = 1;
						}
					}
				} else if (this.selectionMode() === "multiple") {
					if (selected) {
						let selectionIndex = this.findIndexInSelection(rowData);
						this.selection.set(this.selection().filter((val, i) => i != selectionIndex));
						this.onRowUnselect.emit({
							originalEvent: event.originalEvent,
							data: rowData,
							type: "row",
							index: rowIndex
						});
						if (dataKeyValue) delete this.selectionKeys[dataKeyValue];
					} else {
						this.selection.set(this.selection() ? [...this.selection(), rowData] : [rowData]);
						this.onRowSelect.emit({
							originalEvent: event.originalEvent,
							data: rowData,
							type: "row",
							index: rowIndex
						});
						if (dataKeyValue) this.selectionKeys[dataKeyValue] = 1;
					}
				}
			}
			this.tableService.onSelectionChange();
			if (this.isStateful()) this.saveState();
		}
		this.rowTouched = false;
	}
	handleRowTouchEnd(event) {
		this.rowTouched = true;
	}
	handleRowRightClick(event) {
		if (this.contextMenu()) {
			const rowData = event.rowData;
			const showContextMenu = () => {
				this.contextMenu().show(event.originalEvent);
				this.contextMenu().hideCallback = () => {
					this.contextMenuSelection = null;
					this.contextMenuSelectionChange.emit(null);
					this.tableService.onContextMenu(null);
				};
			};
			this.contextMenuSelection = rowData;
			this.contextMenuSelectionChange.emit(rowData);
			this.tableService.onContextMenu(rowData);
			showContextMenu();
			this.onContextMenuSelect.emit({
				originalEvent: event.originalEvent,
				data: rowData,
				index: event.rowIndex
			});
		}
	}
	selectRange(event, rowIndex, isMetaKeySelection) {
		let rangeStart, rangeEnd;
		if (this.anchorRowIndex > rowIndex) {
			rangeStart = rowIndex;
			rangeEnd = this.anchorRowIndex;
		} else if (this.anchorRowIndex < rowIndex) {
			rangeStart = this.anchorRowIndex;
			rangeEnd = rowIndex;
		} else {
			rangeStart = rowIndex;
			rangeEnd = rowIndex;
		}
		if (this.lazy() && this.paginator()) {
			rangeStart -= this.first();
			rangeEnd -= this.first();
		}
		let rangeRowsData = [];
		for (let i = rangeStart; i <= rangeEnd; i++) {
			let rangeRowData = this.filteredValue ? this.filteredValue[i] : this.value[i];
			if (!this.isSelected(rangeRowData) && !isMetaKeySelection) {
				if (!this.isRowSelectable(rangeRowData, rowIndex)) continue;
				rangeRowsData.push(rangeRowData);
				let dataKeyValue = this.dataKey() ? String(ObjectUtils.resolveFieldData(rangeRowData, this.dataKey())) : null;
				if (dataKeyValue) this.selectionKeys[dataKeyValue] = 1;
			}
		}
		if (rangeRowsData.length > 0) this.selection.set([...this.selection(), ...rangeRowsData]);
		this.onRowSelect.emit({
			originalEvent: event,
			data: rangeRowsData,
			type: "row"
		});
	}
	clearSelectionRange(event) {
		let rangeStart, rangeEnd;
		let rangeRowIndex = this.rangeRowIndex;
		let anchorRowIndex = this.anchorRowIndex;
		if (rangeRowIndex > anchorRowIndex) {
			rangeStart = this.anchorRowIndex;
			rangeEnd = this.rangeRowIndex;
		} else if (rangeRowIndex < anchorRowIndex) {
			rangeStart = this.rangeRowIndex;
			rangeEnd = this.anchorRowIndex;
		} else {
			rangeStart = this.rangeRowIndex;
			rangeEnd = this.rangeRowIndex;
		}
		const indicesToRemove = /* @__PURE__ */ new Set();
		for (let i = rangeStart; i <= rangeEnd; i++) {
			let rangeRowData = this.value[i];
			let selectionIndex = this.findIndexInSelection(rangeRowData);
			if (selectionIndex !== -1) indicesToRemove.add(selectionIndex);
			let dataKeyValue = this.dataKey() ? String(ObjectUtils.resolveFieldData(rangeRowData, this.dataKey())) : null;
			if (dataKeyValue) delete this.selectionKeys[dataKeyValue];
			this.onRowUnselect.emit({
				originalEvent: event,
				data: rangeRowData,
				type: "row"
			});
		}
		this.selection.set(this.selection().filter((_, i) => !indicesToRemove.has(i)));
	}
	isSelected(rowData) {
		if (rowData && this.selection()) {
			if (this.dataKey()) return this.selectionKeys[ObjectUtils.resolveFieldData(rowData, this.dataKey())] !== void 0;
			else if (Array.isArray(this.selection())) return this.findIndexInSelection(rowData) > -1;
			else return this.equals(rowData, this.selection());
		}
		return false;
	}
	findIndexInSelection(rowData) {
		let index = -1;
		const sel = this.selection();
		if (sel && sel.length) {
			for (let i = 0; i < sel.length; i++) if (this.equals(rowData, sel[i])) {
				index = i;
				break;
			}
		}
		return index;
	}
	isRowSelectable(data, index) {
		if (this.rowSelectable() && !this.rowSelectable()({
			data,
			index
		})) return false;
		return true;
	}
	toggleRowWithRadio(event, rowData) {
		this.preventSelectionSetterPropagation = true;
		if (this.selection() != rowData) {
			if (!this.isRowSelectable(rowData, event.rowIndex)) return;
			this.selection.set(rowData);
			this.onRowSelect.emit({
				originalEvent: event.originalEvent,
				index: event.rowIndex,
				data: rowData,
				type: "radiobutton"
			});
			if (this.dataKey()) {
				this.selectionKeys = {};
				this.selectionKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey()))] = 1;
			}
		} else {
			this.selection.set(null);
			this.onRowUnselect.emit({
				originalEvent: event.originalEvent,
				index: event.rowIndex,
				data: rowData,
				type: "radiobutton"
			});
		}
		this.tableService.onSelectionChange();
		if (this.isStateful()) this.saveState();
	}
	toggleRowWithCheckbox(event, rowData) {
		if (!this.selection()) this.selection.set([]);
		let selected = this.isSelected(rowData);
		let dataKeyValue = this.dataKey() ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey())) : null;
		this.preventSelectionSetterPropagation = true;
		if (selected) {
			let selectionIndex = this.findIndexInSelection(rowData);
			this.selection.set(this.selection().filter((val, i) => i != selectionIndex));
			this.onRowUnselect.emit({
				originalEvent: event.originalEvent,
				index: event.rowIndex,
				data: rowData,
				type: "checkbox"
			});
			if (dataKeyValue) delete this.selectionKeys[dataKeyValue];
		} else {
			if (!this.isRowSelectable(rowData, event.rowIndex)) return;
			this.selection.set(this.selection() ? [...this.selection(), rowData] : [rowData]);
			this.onRowSelect.emit({
				originalEvent: event.originalEvent,
				index: event.rowIndex,
				data: rowData,
				type: "checkbox"
			});
			if (dataKeyValue) this.selectionKeys[dataKeyValue] = 1;
		}
		this.tableService.onSelectionChange();
		if (this.isStateful()) this.saveState();
	}
	toggleRowsWithCheckbox({ originalEvent }, check) {
		if (this._selectAll !== null) this.selectAllChange.emit({
			originalEvent,
			checked: check
		});
		else {
			const data = this.selectionPageOnly() ? this.dataToRender(this.processedData) : this.processedData;
			let selection = this.selectionPageOnly() && this.selection() ? this.selection().filter((s) => !data.some((d) => this.equals(s, d))) : [];
			const isSelectable = (rowData, index) => (!this.rowSelectable() || this.rowSelectable()({
				data: rowData,
				index
			})) && !this.isRowCheckboxDisabled(rowData);
			if (check) {
				selection = this.frozenValue() ? [
					...selection,
					...this.frozenValue(),
					...data
				] : [...selection, ...data];
				selection = selection.filter((rowData, index) => isSelectable(rowData, index));
			}
			const previousSelection = this.selection() || [];
			const selectedKeys = new Set(previousSelection.map((s) => this.getSelectionKey(s)));
			const alreadyIncluded = new Set(selection.map((s) => this.getSelectionKey(s)));
			(this.frozenValue() ? [...this.frozenValue(), ...data] : data).forEach((d, index) => {
				const key = this.getSelectionKey(d);
				if (!isSelectable(d, index) && selectedKeys.has(key) && !alreadyIncluded.has(key)) {
					selection.push(d);
					alreadyIncluded.add(key);
				}
			});
			this.preventSelectionSetterPropagation = true;
			this.selection.set(selection);
			this.updateSelectionKeys();
			this.tableService.onSelectionChange();
			this.onHeaderCheckboxToggle.emit({
				originalEvent,
				checked: check
			});
			if (this.isStateful()) this.saveState();
		}
	}
	equals(data1, data2) {
		return this.compareSelectionBy() === "equals" ? data1 === data2 : ObjectUtils.equals(data1, data2, this.dataKey());
	}
	getSelectionKey(data) {
		return this.dataKey() && this.compareSelectionBy() !== "equals" ? String(ObjectUtils.resolveFieldData(data, this.dataKey())) : data;
	}
	setRowCheckboxDisabled(rowData, disabled) {
		const key = this.getSelectionKey(rowData);
		if (disabled) this.disabledSelectionKeys.add(key);
		else this.disabledSelectionKeys.delete(key);
	}
	isRowCheckboxDisabled(rowData) {
		return this.disabledSelectionKeys.has(this.getSelectionKey(rowData));
	}
	filter(value, field, matchMode) {
		if (this.filterTimeout) clearTimeout(this.filterTimeout);
		if (!this.isFilterBlank(value)) this.filters[field] = {
			value,
			matchMode,
			applyFilter: true
		};
		else if (this.filters[field]) delete this.filters[field];
		this.filterTimeout = setTimeout(() => {
			this._filter();
			this.filterTimeout = null;
		}, this.filterDelay());
		this.anchorRowIndex = null;
	}
	filterGlobal(value, matchMode) {
		this.filter(value, "global", matchMode);
	}
	isFilterBlank(filter) {
		if (filter !== null && filter !== void 0) {
			if (typeof filter === "string" && filter.trim().length == 0 || Array.isArray(filter) && filter.length == 0) return true;
			else return false;
		}
		return true;
	}
	_filter(resetPage = true) {
		if (!this.restoringFilter && resetPage) this.first.set(0);
		if (this.lazy()) this.onLazyLoad.emit(this.createLazyLoadMetadata());
		else {
			if (!this.value) return;
			if (!this.hasFilter()) {
				this.filteredValue = null;
				if (this.paginator()) this.totalRecords.set(this.value ? this.value.length : 0);
			} else {
				let globalFilterFieldsArray;
				if (this.filters["global"]) {
					if (!this.columns && !this.globalFilterFields()) throw new Error("Global filtering requires dynamic columns or globalFilterFields to be defined.");
					else globalFilterFieldsArray = this.globalFilterFields() || this.columns;
				}
				this.filteredValue = [];
				for (let i = 0; i < this.value.length; i++) {
					let localMatch = true;
					let globalMatch = false;
					let localFiltered = false;
					for (let prop in this.filters) if (Object.prototype.hasOwnProperty.call(this.filters, prop) && prop !== "global") {
						localFiltered = true;
						let filterField = prop;
						let filterMeta = this.filters[filterField];
						if (Array.isArray(filterMeta)) for (let meta of filterMeta) {
							localMatch = this.executeLocalFilter(filterField, this.value[i], meta);
							if (meta.operator === FilterOperator.OR && localMatch || meta.operator === FilterOperator.AND && !localMatch) break;
						}
						else localMatch = this.executeLocalFilter(filterField, this.value[i], filterMeta);
						if (!localMatch) break;
					}
					if (this.filters["global"] && !globalMatch && globalFilterFieldsArray) for (let j = 0; j < globalFilterFieldsArray.length; j++) {
						let globalFilterField = globalFilterFieldsArray[j].field || globalFilterFieldsArray[j];
						globalMatch = this.filterService.filters[this.filters["global"].matchMode](ObjectUtils.resolveFieldData(this.value[i], globalFilterField), this.filters["global"].value, this.filterLocale());
						if (globalMatch) break;
					}
					let matches;
					if (this.filters["global"]) matches = localFiltered ? localFiltered && localMatch && globalMatch : globalMatch;
					else matches = localFiltered && localMatch;
					if (matches) this.filteredValue.push(this.value[i]);
				}
				if (this.filteredValue.length === this.value.length) this.filteredValue = null;
				if (this.paginator()) this.totalRecords.set(this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0);
			}
		}
		this.onFilter.emit({
			filters: this.filters,
			filteredValue: this.filteredValue || this.value
		});
		this.tableService.onValueChange(this.value);
		if (this.isStateful() && !this.restoringFilter) this.saveState();
		if (this.restoringFilter) this.restoringFilter = false;
		this.cd.markForCheck();
		if (this.scrollable() && resetPage) this.resetScrollTop();
	}
	executeLocalFilter(field, rowData, filterMeta) {
		let filterValue = filterMeta.value;
		let filterMatchMode = filterMeta.matchMode || FilterMatchMode.STARTS_WITH;
		let dataFieldValue = ObjectUtils.resolveFieldData(rowData, field);
		let filterConstraint = this.filterService.filters[filterMatchMode];
		return filterConstraint(dataFieldValue, filterValue, this.filterLocale());
	}
	hasFilter() {
		let empty = true;
		for (let prop in this.filters) if (Object.prototype.hasOwnProperty.call(this.filters, prop)) {
			empty = false;
			break;
		}
		return !empty;
	}
	createLazyLoadMetadata() {
		return {
			first: this.first(),
			rows: this.rows(),
			sortField: this.sortField,
			sortOrder: this.sortOrder,
			filters: this.filters,
			globalFilter: this.filters && this.filters["global"] ? this.filters["global"].value : null,
			multiSortMeta: this.multiSortMeta,
			forceUpdate: () => this.cd.detectChanges()
		};
	}
	clear() {
		this.sortField = null;
		this.sortOrder = this.defaultSortOrder();
		this.multiSortMeta = null;
		this.tableService.onSort(null);
		this.clearFilterValues();
		this.filteredValue = null;
		this.first.set(0);
		if (this._defaultRows !== void 0 && this.rows() !== this._defaultRows) this.rows.set(this._defaultRows);
		if (this.lazy()) this.onLazyLoad.emit(this.createLazyLoadMetadata());
		else this.totalRecords.set(this.value ? this.value.length : 0);
		this.tableService.onValueChange(this.value);
	}
	clearFilterValues() {
		for (const [, filterMetadata] of Object.entries(this.filters)) if (Array.isArray(filterMetadata)) for (let filter of filterMetadata) filter.value = null;
		else if (filterMetadata) filterMetadata.value = null;
	}
	reset() {
		this.clear();
	}
	getExportHeader(column) {
		return column[this.exportHeader()] || column.header || column.field;
	}
	exportCSV(options) {
		let data;
		let csv = "";
		let columns = this.columns;
		if (options && options.selectionOnly) data = this.selection() || [];
		else if (options && options.allValues) data = this.value || [];
		else {
			data = this.filteredValue || this.value;
			if (this.frozenValue()) data = data ? [...this.frozenValue(), ...data] : this.frozenValue();
		}
		const exportableColumns = columns.filter((column) => column.exportable !== false && column.field);
		csv += exportableColumns.map((column) => "\"" + this.getExportHeader(column) + "\"").join(this.csvSeparator());
		const body = data.map((record) => exportableColumns.map((column) => {
			let cellData = ObjectUtils.resolveFieldData(record, column.field);
			if (cellData != null) {
				if (this.exportFunction()) cellData = this.exportFunction()({
					data: cellData,
					field: column.field
				});
				else cellData = String(cellData).replace(/"/g, "\"\"");
			} else cellData = "";
			return "\"" + cellData + "\"";
		}).join(this.csvSeparator())).join("\n");
		if (body.length) csv += "\n" + body;
		let blob = new Blob([new Uint8Array([
			239,
			187,
			191
		]), csv], { type: "text/csv;charset=utf-8;" });
		let link = this.renderer.createElement("a");
		link.style.display = "none";
		this.renderer.appendChild(this.document.body, link);
		if (link.download !== void 0) {
			link.setAttribute("href", URL.createObjectURL(blob));
			link.setAttribute("download", this.exportFilename() + ".csv");
			link.click();
		} else {
			var _this$document$defaul;
			csv = "data:text/csv;charset=utf-8," + csv;
			(_this$document$defaul = this.document.defaultView) === null || _this$document$defaul === void 0 || _this$document$defaul.open(encodeURI(csv));
		}
		this.renderer.removeChild(this.document.body, link);
	}
	onLazyItemLoad(event) {
		this.onLazyLoad.emit(_objectSpread2(_objectSpread2(_objectSpread2({}, this.createLazyLoadMetadata()), event), {}, { rows: event.last - event.first }));
	}
	resetScrollTop() {
		if (this.virtualScroll()) this.scrollToVirtualIndex(0);
		else this.scrollTo({ top: 0 });
	}
	scrollToVirtualIndex(index) {
		var _this$scroller;
		(_this$scroller = this.scroller()) === null || _this$scroller === void 0 || _this$scroller.scrollToIndex(index);
	}
	scrollTo(options) {
		var _this$scroller2, _this$wrapperViewChil;
		if (this.virtualScroll()) (_this$scroller2 = this.scroller()) === null || _this$scroller2 === void 0 || _this$scroller2.scrollTo(options);
		else if ((_this$wrapperViewChil = this.wrapperViewChild()) === null || _this$wrapperViewChil === void 0 ? void 0 : _this$wrapperViewChil.nativeElement) {
			if (this.wrapperViewChild().nativeElement.scrollTo) this.wrapperViewChild().nativeElement.scrollTo(options);
			else {
				this.wrapperViewChild().nativeElement.scrollLeft = options.left;
				this.wrapperViewChild().nativeElement.scrollTop = options.top;
			}
		}
	}
	updateEditingCell(cell, data, field, index) {
		this.editingCell = cell;
		this.editingCellData = data;
		this.editingCellField = field;
		this.editingCellRowIndex = index;
		this.bindDocumentEditListener();
	}
	isEditingCellValid() {
		return this.editingCell && DomHandler.find(this.editingCell, ".ng-invalid.ng-dirty").length === 0;
	}
	bindDocumentEditListener() {
		if (!this.documentEditListener) this.documentEditListener = this.renderer.listen(this.document, "click", (event) => {
			if (this.editingCell && !this.selfClick && this.isEditingCellValid()) {
				if (!this.$unstyled()) DomHandler.removeClass(this.editingCell, this.pcn("p-cell-editing"));
				be(this.editingCell, "data-p-cell-editing", "false");
				this.editingCell = null;
				this.onEditComplete.emit({
					field: this.editingCellField,
					data: this.editingCellData,
					originalEvent: event,
					index: this.editingCellRowIndex
				});
				this.editingCellField = null;
				this.editingCellData = null;
				this.editingCellRowIndex = null;
				this.unbindDocumentEditListener();
				this.cd.markForCheck();
				if (this.overlaySubscription) this.overlaySubscription.unsubscribe();
			}
			this.selfClick = false;
		});
	}
	unbindDocumentEditListener() {
		if (this.documentEditListener) {
			this.documentEditListener();
			this.documentEditListener = null;
		}
	}
	initRowEdit(rowData) {
		let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey()));
		this.editingRowKeys = _objectSpread2(_objectSpread2({}, this.editingRowKeys), {}, { [dataKeyValue]: true });
	}
	saveRowEdit(rowData, rowElement) {
		if (DomHandler.find(rowElement, ".ng-invalid.ng-dirty").length === 0) {
			let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey()));
			const rest = _objectSpread2({}, this.editingRowKeys);
			delete rest[dataKeyValue];
			this.editingRowKeys = rest;
		}
	}
	cancelRowEdit(rowData) {
		let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey()));
		const rest = _objectSpread2({}, this.editingRowKeys);
		delete rest[dataKeyValue];
		this.editingRowKeys = rest;
	}
	toggleRow(rowData, event) {
		if (!this.dataKey() && !this.groupRowsBy()) throw new Error("dataKey or groupRowsBy must be defined to use row expansion");
		let dataKeyValue = this.groupRowsBy() ? String(ObjectUtils.resolveFieldData(rowData, this.groupRowsBy())) : String(ObjectUtils.resolveFieldData(rowData, this.dataKey()));
		if (this.expandedRowKeys[dataKeyValue] != null) {
			delete this.expandedRowKeys[dataKeyValue];
			this.onRowCollapse.emit({
				originalEvent: event,
				data: rowData
			});
		} else {
			if (this.rowExpandMode() === "single") this.expandedRowKeys = {};
			this.expandedRowKeys[dataKeyValue] = true;
			this.onRowExpand.emit({
				originalEvent: event,
				data: rowData
			});
		}
		if (event) event.preventDefault();
		if (this.isStateful()) this.saveState();
	}
	isRowExpanded(rowData) {
		return this.groupRowsBy() ? this.expandedRowKeys[String(ObjectUtils.resolveFieldData(rowData, this.groupRowsBy()))] === true : this.expandedRowKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey()))] === true;
	}
	isRowEditing(rowData) {
		return this.editingRowKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey()))] === true;
	}
	isSingleSelectionMode() {
		return this.selectionMode() === "single";
	}
	isMultipleSelectionMode() {
		return this.selectionMode() === "multiple";
	}
	onColumnResizeBegin(event) {
		var _this$el, _this$el2, _this$el3;
		let containerLeft = DomHandler.getOffset((_this$el = this.el) === null || _this$el === void 0 ? void 0 : _this$el.nativeElement).left;
		this.resizeColumnElement = event.target.closest("th");
		this.columnResizing = true;
		if (event.type == "touchstart") this.lastResizerHelperX = event.changedTouches[0].clientX - containerLeft + ((_this$el2 = this.el) === null || _this$el2 === void 0 ? void 0 : _this$el2.nativeElement.scrollLeft);
		else this.lastResizerHelperX = event.pageX - containerLeft + ((_this$el3 = this.el) === null || _this$el3 === void 0 ? void 0 : _this$el3.nativeElement.scrollLeft);
		this.onColumnResize(event);
		event.preventDefault();
	}
	onColumnResize(event) {
		var _this$el4, _this$el5, _this$el6, _this$el7, _this$el8;
		let containerLeft = DomHandler.getOffset((_this$el4 = this.el) === null || _this$el4 === void 0 ? void 0 : _this$el4.nativeElement).left;
		if (!this.$unstyled()) DomHandler.addClass((_this$el5 = this.el) === null || _this$el5 === void 0 ? void 0 : _this$el5.nativeElement, this.pcn("p-unselectable-text"));
		this.resizeHelperViewChild().nativeElement.style.height = ((_this$el6 = this.el) === null || _this$el6 === void 0 ? void 0 : _this$el6.nativeElement.offsetHeight) + "px";
		this.resizeHelperViewChild().nativeElement.style.top = "0px";
		if (event.type == "touchmove") this.resizerHelperX = event.changedTouches[0].clientX - containerLeft + ((_this$el7 = this.el) === null || _this$el7 === void 0 ? void 0 : _this$el7.nativeElement.scrollLeft);
		else this.resizerHelperX = event.pageX - containerLeft + ((_this$el8 = this.el) === null || _this$el8 === void 0 ? void 0 : _this$el8.nativeElement.scrollLeft);
		this.resizeHelperViewChild().nativeElement.style.left = this.resizerHelperX + "px";
		this.resizeHelperViewChild().nativeElement.style.display = "block";
	}
	onColumnResizeEnd() {
		var _this$el$nativeElemen, _this$el9, _this$el10;
		const isRTL = getComputedStyle((_this$el$nativeElemen = (_this$el9 = this.el) === null || _this$el9 === void 0 ? void 0 : _this$el9.nativeElement) !== null && _this$el$nativeElemen !== void 0 ? _this$el$nativeElemen : document.documentElement).direction === "rtl";
		const rawDelta = this.resizerHelperX - this.lastResizerHelperX;
		const delta = isRTL ? -rawDelta : rawDelta;
		const newColumnWidth = this.resizeColumnElement.offsetWidth + delta;
		const elementMinWidth = this.resizeColumnElement.style.minWidth.replace(/[^\d.]/g, "");
		if (delta !== 0 && newColumnWidth >= (elementMinWidth ? parseFloat(elementMinWidth) : 15)) {
			if (this.columnResizeMode() === "fit") {
				const nextColumnWidth = this.resizeColumnElement.nextElementSibling.offsetWidth - delta;
				if (newColumnWidth > 15 && nextColumnWidth > 15) this.resizeTableCells(newColumnWidth, nextColumnWidth);
			} else if (this.columnResizeMode() === "expand") {
				var _this$tableViewChild;
				this._initialColWidths = this._totalTableWidth();
				const tableWidth = ((_this$tableViewChild = this.tableViewChild()) === null || _this$tableViewChild === void 0 ? void 0 : _this$tableViewChild.nativeElement.offsetWidth) + delta;
				this.setResizeTableWidth(tableWidth + "px");
				this.resizeTableCells(newColumnWidth, null);
			}
			this.onColResize.emit({
				element: this.resizeColumnElement,
				delta
			});
			if (this.isStateful()) this.saveState();
		}
		this.resizeHelperViewChild().nativeElement.style.display = "none";
		DomHandler.removeClass((_this$el10 = this.el) === null || _this$el10 === void 0 ? void 0 : _this$el10.nativeElement, this.pcn("p-unselectable-text"));
	}
	_totalTableWidth() {
		let widths = [];
		const tableHead = DomHandler.findSingle(this.el.nativeElement, "[data-pc-section=\"thead\"]");
		DomHandler.find(tableHead, "tr > th").forEach((header) => widths.push(DomHandler.getOuterWidth(header)));
		return widths;
	}
	onColumnDragStart(event, columnElement) {
		var _this$reorderIndicato, _this$reorderIndicato2;
		this.reorderIconWidth = DomHandler.getHiddenElementOuterWidth((_this$reorderIndicato = this.reorderIndicatorUpViewChild()) === null || _this$reorderIndicato === void 0 ? void 0 : _this$reorderIndicato.nativeElement);
		this.reorderIconHeight = DomHandler.getHiddenElementOuterHeight((_this$reorderIndicato2 = this.reorderIndicatorDownViewChild()) === null || _this$reorderIndicato2 === void 0 ? void 0 : _this$reorderIndicato2.nativeElement);
		this.draggedColumn = columnElement;
		event.dataTransfer.setData("text", "b");
	}
	onColumnDragEnter(event, dropHeader) {
		if (this.reorderableColumns() && this.draggedColumn && dropHeader) event.preventDefault();
	}
	onColumnDragOver(event, dropHeader) {
		if (this.reorderableColumns() && this.draggedColumn && dropHeader) {
			var _this$el11;
			event.preventDefault();
			let containerOffset = DomHandler.getOffset((_this$el11 = this.el) === null || _this$el11 === void 0 ? void 0 : _this$el11.nativeElement);
			let dropHeaderOffset = DomHandler.getOffset(dropHeader);
			if (this.draggedColumn != dropHeader) {
				let targetLeft = dropHeaderOffset.left - containerOffset.left;
				let columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;
				this.reorderIndicatorUpViewChild().nativeElement.style.top = dropHeaderOffset.top - containerOffset.top - (this.reorderIconHeight - 1) + "px";
				this.reorderIndicatorDownViewChild().nativeElement.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + "px";
				if (event.pageX > columnCenter) {
					this.reorderIndicatorUpViewChild().nativeElement.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2) + "px";
					this.reorderIndicatorDownViewChild().nativeElement.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2) + "px";
					this.dropPosition = 1;
				} else {
					this.reorderIndicatorUpViewChild().nativeElement.style.left = targetLeft - Math.ceil(this.reorderIconWidth / 2) + "px";
					this.reorderIndicatorDownViewChild().nativeElement.style.left = targetLeft - Math.ceil(this.reorderIconWidth / 2) + "px";
					this.dropPosition = -1;
				}
				this.reorderIndicatorUpViewChild().nativeElement.style.display = "block";
				this.reorderIndicatorDownViewChild().nativeElement.style.display = "block";
			} else event.dataTransfer.dropEffect = "none";
		}
	}
	onColumnDragLeave(event) {
		if (this.reorderableColumns() && this.draggedColumn) {
			event.preventDefault();
			this.reorderIndicatorUpViewChild().nativeElement.style.display = "none";
			this.reorderIndicatorDownViewChild().nativeElement.style.display = "none";
		}
	}
	onColumnDragEnd(event) {
		if (this.reorderableColumns() && this.draggedColumn) {
			this.reorderIndicatorUpViewChild().nativeElement.style.display = "none";
			this.reorderIndicatorDownViewChild().nativeElement.style.display = "none";
			this.draggedColumn.draggable = false;
			this.draggedColumn = null;
			this.dropPosition = null;
		}
	}
	onColumnDrop(event, dropColumn) {
		event.preventDefault();
		if (this.draggedColumn) {
			let dragIndex = DomHandler.indexWithinGroup(this.draggedColumn, "preorderablecolumn");
			let dropIndex = DomHandler.indexWithinGroup(dropColumn, "preorderablecolumn");
			let allowDrop = dragIndex != dropIndex;
			if (allowDrop && (dropIndex - dragIndex == 1 && this.dropPosition === -1 || dragIndex - dropIndex == 1 && this.dropPosition === 1)) allowDrop = false;
			if (allowDrop && dropIndex < dragIndex && this.dropPosition === 1) dropIndex = dropIndex + 1;
			if (allowDrop && dropIndex > dragIndex && this.dropPosition === -1) dropIndex = dropIndex - 1;
			if (allowDrop) {
				ObjectUtils.reorderArray(this.columns, dragIndex, dropIndex);
				this.onColReorder.emit({
					dragIndex,
					dropIndex,
					columns: this.columns
				});
				if (this.isStateful()) setTimeout(() => {
					this.saveState();
				});
			}
			if (this.resizableColumns() && this.resizeColumnElement) {
				let width = this.columnResizeMode() === "expand" ? this._initialColWidths : this._totalTableWidth();
				ObjectUtils.reorderArray(width, dragIndex + 1, dropIndex + 1);
				this.updateStyleElement(width, dragIndex, 0, 0);
			}
			this.reorderIndicatorUpViewChild().nativeElement.style.display = "none";
			this.reorderIndicatorDownViewChild().nativeElement.style.display = "none";
			this.draggedColumn.draggable = false;
			this.draggedColumn = null;
			this.dropPosition = null;
		}
	}
	resizeTableCells(newColumnWidth, nextColumnWidth) {
		let colIndex = DomHandler.index(this.resizeColumnElement);
		let width = this.columnResizeMode() === "expand" ? this._initialColWidths : this._totalTableWidth();
		this.updateStyleElement(width, colIndex, newColumnWidth, nextColumnWidth);
	}
	updateStyleElement(width, colIndex, newColumnWidth, nextColumnWidth) {
		if (!this.$styleScope.isolated) {
			this.destroyStyleElement();
			this.createStyleElement();
		}
		let innerHTML = "";
		width.forEach((width, index) => {
			let colWidth = index === colIndex ? newColumnWidth : nextColumnWidth && index === colIndex + 1 ? nextColumnWidth : width;
			let style = `width: ${colWidth}px !important; max-width: ${colWidth}px !important;`;
			innerHTML += `
                #${this.id}-table > .p-datatable-thead > tr > th:nth-child(${index + 1}),
                #${this.id}-table > .p-datatable-tbody > tr > td:nth-child(${index + 1}),
                #${this.id}-table > .p-datatable-tfoot > tr > td:nth-child(${index + 1}) {
                    ${style}
                }
            `;
		});
		if (this.$styleScope.isolated) this.$isolatedStyle("columns", this.psel(innerHTML));
		else this.renderer.setProperty(this.styleElement, "innerHTML", this.psel(innerHTML));
	}
	onRowDragStart(event, index) {
		this.rowDragging = true;
		this.draggedRowIndex = index;
		event.dataTransfer.setData("text", "b");
	}
	onRowDragOver(event, index, rowElement) {
		if (this.rowDragging && this.draggedRowIndex !== index) {
			let rowY = DomHandler.getOffset(rowElement).top;
			let pageY = event.pageY;
			let rowMidY = rowY + DomHandler.getOuterHeight(rowElement) / 2;
			let prevRowElement = rowElement.previousElementSibling;
			if (pageY < rowMidY) {
				DomHandler.removeClass(rowElement, this.pcn("p-datatable-dragpoint-bottom"));
				this.droppedRowIndex = index;
				if (prevRowElement && !this.$unstyled()) DomHandler.addClass(prevRowElement, this.pcn("p-datatable-dragpoint-bottom"));
				else if (!this.$unstyled()) DomHandler.addClass(rowElement, this.pcn("p-datatable-dragpoint-top"));
			} else {
				if (prevRowElement && !this.$unstyled()) DomHandler.removeClass(prevRowElement, this.pcn("p-datatable-dragpoint-bottom"));
				else if (!this.$unstyled()) DomHandler.addClass(rowElement, this.pcn("p-datatable-dragpoint-top"));
				this.droppedRowIndex = index + 1;
				if (!this.$unstyled()) DomHandler.addClass(rowElement, this.pcn("p-datatable-dragpoint-bottom"));
			}
		}
	}
	onRowDragLeave(event, rowElement) {
		let prevRowElement = rowElement.previousElementSibling;
		if (prevRowElement) {
			if (!this.$unstyled()) DomHandler.removeClass(prevRowElement, this.pcn("p-datatable-dragpoint-bottom"));
		}
		if (!this.$unstyled()) DomHandler.removeClass(rowElement, this.pcn("p-datatable-dragpoint-bottom"));
		if (!this.$unstyled()) DomHandler.removeClass(rowElement, this.pcn("p-datatable-dragpoint-top"));
	}
	onRowDragEnd(event) {
		this.rowDragging = false;
		this.draggedRowIndex = null;
		this.droppedRowIndex = null;
	}
	onRowDrop(event, rowElement) {
		if (this.droppedRowIndex != null) {
			let dropIndex = this.draggedRowIndex > this.droppedRowIndex ? this.droppedRowIndex : this.droppedRowIndex === 0 ? 0 : this.droppedRowIndex - 1;
			ObjectUtils.reorderArray(this.value, this.draggedRowIndex, dropIndex);
			if (this.virtualScroll()) this.value = [...this.value];
			this.onRowReorder.emit({
				dragIndex: this.draggedRowIndex,
				dropIndex
			});
		}
		this.onRowDragLeave(event, rowElement);
		this.onRowDragEnd(event);
	}
	isEmpty() {
		let data = this.filteredValue || this.value;
		return data == null || data.length == 0;
	}
	getVirtualScrollerSpacerStyle(scrollerOptions) {
		return `height: calc(${scrollerOptions.spacerStyle.height} - ${scrollerOptions.rows.length * scrollerOptions.itemSize}px)`;
	}
	getBlockableElement() {
		return this.el.nativeElement.children[0];
	}
	getStorage() {
		if (isPlatformBrowser(this.platformId)) switch (this.stateStorage()) {
			case "local": return window.localStorage;
			case "session": return window.sessionStorage;
			default: throw new Error(this.stateStorage() + " is not a valid value for the state storage, supported values are \"local\" and \"session\".");
		}
		else throw new Error("Browser storage is not available in the server side.");
	}
	isStateful() {
		return this.stateKey() != null;
	}
	saveState() {
		const storage = this.getStorage();
		let state = {};
		if (this.paginator()) {
			state.first = this.first();
			state.rows = this.rows();
		}
		if (this.sortField) {
			state.sortField = this.sortField;
			state.sortOrder = this.sortOrder;
		}
		if (this.multiSortMeta) state.multiSortMeta = this.multiSortMeta;
		if (this.hasFilter()) state.filters = this.filters;
		if (this.resizableColumns()) this.saveColumnWidths(state);
		if (this.reorderableColumns()) this.saveColumnOrder(state);
		if (this.selection()) state.selection = this.selection();
		if (Object.keys(this.expandedRowKeys).length) state.expandedRowKeys = this.expandedRowKeys;
		storage.setItem(this.stateKey(), JSON.stringify(state));
		this.onStateSave.emit(state);
	}
	clearState() {
		const storage = this.getStorage();
		if (this.stateKey()) storage.removeItem(this.stateKey());
	}
	restoreState() {
		const stateString = this.getStorage().getItem(this.stateKey());
		const dateFormat = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;
		const reviver = function(key, value) {
			if (typeof value === "string" && dateFormat.test(value)) return new Date(value);
			return value;
		};
		if (stateString) {
			let state = JSON.parse(stateString, reviver);
			if (this.paginator()) {
				if (this.first() !== void 0) this.first.set(state.first);
				if (this.rows() !== void 0) this.rows.set(state.rows);
			}
			if (state.sortField) {
				this.restoringSort = true;
				this.sortField = state.sortField;
				this.sortOrder = state.sortOrder;
			}
			if (state.multiSortMeta) {
				this.restoringSort = true;
				this.multiSortMeta = state.multiSortMeta;
			}
			if (state.filters) {
				this.restoringFilter = true;
				for (const key in state.filters) if (Object.prototype.hasOwnProperty.call(state.filters, key)) {
					const fieldFilter = state.filters[key];
					const filter = Array.isArray(fieldFilter) ? fieldFilter[0] : fieldFilter;
					if (filter && !this.isFilterBlank(filter.value)) filter.applyFilter = true;
				}
				this.filters = state.filters;
			}
			if (this.resizableColumns()) {
				this.columnWidthsState = state.columnWidths;
				this.tableWidthState = state.tableWidth;
			}
			if (state.expandedRowKeys) this.expandedRowKeys = state.expandedRowKeys;
			if (state.selection) Promise.resolve(null).then(() => this.selection.set(state.selection));
			this.stateRestored = true;
			this.onStateRestore.emit(state);
		}
	}
	saveColumnWidths(state) {
		var _this$el12;
		let widths = [];
		let headers = [];
		const container = (_this$el12 = this.el) === null || _this$el12 === void 0 ? void 0 : _this$el12.nativeElement;
		if (container) headers = DomHandler.find(container, "[data-pc-section=\"thead\"] > tr > th");
		headers.forEach((header) => widths.push(DomHandler.getOuterWidth(header)));
		state.columnWidths = widths.join(",");
		if (this.columnResizeMode() === "expand" && this.tableViewChild()) state.tableWidth = DomHandler.getOuterWidth(this.tableViewChild().nativeElement);
	}
	setResizeTableWidth(width) {
		this.tableViewChild().nativeElement.style.width = width;
		this.tableViewChild().nativeElement.style.minWidth = width;
	}
	restoreColumnWidths() {
		if (this.columnWidthsState) {
			let widths = this.columnWidthsState.split(",");
			if (this.columnResizeMode() === "expand" && this.tableWidthState) this.setResizeTableWidth(this.tableWidthState + "px");
			if (ObjectUtils.isNotEmpty(widths)) {
				if (!this.$styleScope.isolated) this.createStyleElement();
				let innerHTML = "";
				widths.forEach((width, index) => {
					let style = `width: ${width}px !important; max-width: ${width}px !important`;
					innerHTML += `
                        #${this.id}-table > .p-datatable-thead > tr > th:nth-child(${index + 1}),
                        #${this.id}-table > .p-datatable-tbody > tr > td:nth-child(${index + 1}),
                        #${this.id}-table > .p-datatable-tfoot > tr > td:nth-child(${index + 1}) {
                            ${style}
                        }
                    `;
				});
				if (this.$styleScope.isolated) this.$isolatedStyle("columns", this.psel(innerHTML));
				else this.styleElement.innerHTML = this.psel(innerHTML);
			}
		}
	}
	saveColumnOrder(state) {
		if (this.columns) {
			let columnOrder = [];
			this.columns.map((column) => {
				columnOrder.push(column.field || column.key);
			});
			state.columnOrder = columnOrder;
		}
	}
	restoreColumnOrder() {
		const stateString = this.getStorage().getItem(this.stateKey());
		if (stateString) {
			let columnOrder = JSON.parse(stateString).columnOrder;
			if (columnOrder) {
				let reorderedColumns = [];
				columnOrder.map((key) => {
					let col = this.findColumnByKey(key);
					if (col) reorderedColumns.push(col);
				});
				this.columnOrderStateRestored = true;
				this.columns = reorderedColumns;
			}
		}
	}
	findColumnByKey(key) {
		if (this.columns) for (let col of this.columns) if (col.key === key || col.field === key) return col;
		else continue;
		else return null;
	}
	createStyleElement() {
		var _this$config, _getShadowRoot, _this$config2;
		this.styleElement = this.renderer.createElement("style");
		this.styleElement.type = "text/css";
		DomHandler.setAttribute(this.styleElement, "nonce", (_this$config = this.config) === null || _this$config === void 0 || (_this$config = _this$config.csp()) === null || _this$config === void 0 ? void 0 : _this$config.nonce);
		this.renderer.appendChild((_getShadowRoot = getShadowRoot(this.el.nativeElement)) !== null && _getShadowRoot !== void 0 ? _getShadowRoot : this.document.head, this.styleElement);
		DomHandler.setAttribute(this.styleElement, "nonce", (_this$config2 = this.config) === null || _this$config2 === void 0 || (_this$config2 = _this$config2.csp()) === null || _this$config2 === void 0 ? void 0 : _this$config2.nonce);
	}
	getGroupRowsMeta() {
		return {
			field: this.groupRowsBy(),
			order: this.groupRowsByOrder()
		};
	}
	destroyStyleElement() {
		if (this.styleElement) {
			this.renderer.removeChild(this.document.head, this.styleElement);
			this.styleElement = null;
		}
	}
	ngAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.ptms(["host", "root"]));
	}
	onDestroy() {
		this.unbindDocumentEditListener();
		this.editingCell = null;
		this.initialized = null;
		this.destroyStyleElement();
	}
	get dataP() {
		return this.cn({
			scrollable: this.scrollable(),
			"flex-scrollable": this.scrollable() && this.scrollHeight() === "flex",
			[this.size()]: this.size(),
			loading: this.loading(),
			empty: this.isEmpty()
		});
	}
}, _defineProperty(_Table, "ɵfac", function Table_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _Table)();
}), _defineProperty(_Table, "ɵcmp", (function() {
	const _c0 = ["header"];
	const _c1 = ["headergrouped"];
	const _c2 = ["body"];
	const _c3 = ["loadingbody"];
	const _c4 = ["caption"];
	const _c5 = ["footer"];
	const _c6 = ["footergrouped"];
	const _c7 = ["summary"];
	const _c8 = ["colgroup"];
	const _c9 = ["expandedrow"];
	const _c10 = ["groupheader"];
	const _c11 = ["groupfooter"];
	const _c12 = ["frozenexpandedrow"];
	const _c13 = ["frozenheader"];
	const _c14 = ["frozenbody"];
	const _c15 = ["frozenfooter"];
	const _c16 = ["frozencolgroup"];
	const _c17 = ["emptymessage"];
	const _c18 = ["paginatorleft"];
	const _c19 = ["paginatorright"];
	const _c20 = ["paginatordropdownitem"];
	const _c21 = ["loadingicon"];
	const _c22 = ["reorderindicatorupicon"];
	const _c23 = ["reorderindicatordownicon"];
	const _c24 = ["sorticon"];
	const _c25 = ["checkboxicon"];
	const _c26 = ["headercheckboxicon"];
	const _c27 = ["paginatordropdownicon"];
	const _c28 = ["paginatorfirstpagelinkicon"];
	const _c29 = ["paginatorlastpagelinkicon"];
	const _c30 = ["paginatorpreviouspagelinkicon"];
	const _c31 = ["paginatornextpagelinkicon"];
	const _c32 = ["resizeHelper"];
	const _c33 = ["reorderIndicatorUp"];
	const _c34 = ["reorderIndicatorDown"];
	const _c35 = ["wrapper"];
	const _c36 = ["table"];
	const _c37 = ["thead"];
	const _c38 = ["tfoot"];
	const _c39 = ["scroller"];
	const _c40 = (a0, a1) => ({
		$implicit: a0,
		options: a1
	});
	const _c41 = (a0) => ({ columns: a0 });
	const _c42 = (a0) => ({ $implicit: a0 });
	function Table_Conditional_0_Conditional_1_Template(rf, ctx) {
		if (rf & 1) ɵɵelement(0, "i", 17);
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext(2);
			ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("loadingIcon"), ctx_r1.loadingIcon()));
			ɵɵproperty("pBind", ctx_r1.ptm("loadingIcon"));
		}
	}
	function Table_Conditional_0_Conditional_2_Conditional_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 21);
		}
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext(3);
			ɵɵclassMap(ctx_r1.cx("loadingIcon"));
			ɵɵproperty("spin", true)("pBind", ctx_r1.ptm("loadingIcon"));
		}
	}
	function Table_Conditional_0_Conditional_2_Conditional_1_1_ng_template_0_Template(rf, ctx) {}
	function Table_Conditional_0_Conditional_2_Conditional_1_1_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Table_Conditional_0_Conditional_2_Conditional_1_1_ng_template_0_Template, 0, 0, "ng-template");
	}
	function Table_Conditional_0_Conditional_2_Conditional_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "span", 17);
			ɵɵtemplate(1, Table_Conditional_0_Conditional_2_Conditional_1_1_Template, 1, 0, null, 22);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext(3);
			ɵɵclassMap(ctx_r1.cx("loadingIcon"));
			ɵɵproperty("pBind", ctx_r1.ptm("loadingIcon"));
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", ctx_r1.loadingIconTemplate());
		}
	}
	function Table_Conditional_0_Conditional_2_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵconditionalCreate(0, Table_Conditional_0_Conditional_2_Conditional_0_Template, 1, 4, "svg", 20);
			ɵɵconditionalCreate(1, Table_Conditional_0_Conditional_2_Conditional_1_Template, 2, 4, "span", 15);
		}
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext(2);
			ɵɵconditional(!ctx_r1.loadingIconTemplate() ? 0 : -1);
			ɵɵadvance();
			ɵɵconditional(ctx_r1.loadingIconTemplate() ? 1 : -1);
		}
	}
	function Table_Conditional_0_Template(rf, ctx) {
		if (rf & 1) {
			const _r1 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "div", 17);
			ɵɵanimateLeave(function Table_Conditional_0_Template_animateleave_cb() {
				ɵɵrestoreView(_r1);
				const ctx_r1 = ɵɵnextContext();
				return ɵɵresetView(ctx_r1.pcn("p-overlay-mask-leave-active"));
			});
			ɵɵanimateEnter(function Table_Conditional_0_Template_animateenter_cb() {
				ɵɵrestoreView(_r1);
				const ctx_r1 = ɵɵnextContext();
				return ɵɵresetView(ctx_r1.pcn("p-overlay-mask-enter-active"));
			});
			ɵɵconditionalCreate(1, Table_Conditional_0_Conditional_1_Template, 1, 3, "i", 15);
			ɵɵconditionalCreate(2, Table_Conditional_0_Conditional_2_Template, 2, 2);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext();
			ɵɵclassMap(ctx_r1.cx("mask"));
			ɵɵproperty("pBind", ctx_r1.ptm("mask"));
			ɵɵadvance();
			ɵɵconditional(ctx_r1.loadingIcon() ? 1 : -1);
			ɵɵadvance();
			ɵɵconditional(!ctx_r1.loadingIcon() ? 2 : -1);
		}
	}
	function Table_Conditional_1_ng_container_1_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Table_Conditional_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "div", 17);
			ɵɵtemplate(1, Table_Conditional_1_ng_container_1_Template, 1, 0, "ng-container", 22);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext();
			ɵɵclassMap(ctx_r1.cx("header"));
			ɵɵproperty("pBind", ctx_r1.ptm("header"));
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", ctx_r1.captionTemplate());
		}
	}
	function Table_Conditional_2_Conditional_1_ng_template_0_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Table_Conditional_2_Conditional_1_ng_template_0_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Table_Conditional_2_Conditional_1_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 22);
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext(3);
			ɵɵproperty("ngTemplateOutlet", ctx_r1.paginatorDropdownIconTemplate());
		}
	}
	function Table_Conditional_2_Conditional_1_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Table_Conditional_2_Conditional_1_ng_template_0_Template, 1, 1, "ng-template", null, 2, ɵɵtemplateRefExtractor);
	}
	function Table_Conditional_2_Conditional_2_ng_template_0_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Table_Conditional_2_Conditional_2_ng_template_0_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Table_Conditional_2_Conditional_2_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 22);
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext(3);
			ɵɵproperty("ngTemplateOutlet", ctx_r1.paginatorFirstPageLinkIconTemplate());
		}
	}
	function Table_Conditional_2_Conditional_2_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Table_Conditional_2_Conditional_2_ng_template_0_Template, 1, 1, "ng-template", null, 3, ɵɵtemplateRefExtractor);
	}
	function Table_Conditional_2_Conditional_3_ng_template_0_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Table_Conditional_2_Conditional_3_ng_template_0_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Table_Conditional_2_Conditional_3_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 22);
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext(3);
			ɵɵproperty("ngTemplateOutlet", ctx_r1.paginatorPreviousPageLinkIconTemplate());
		}
	}
	function Table_Conditional_2_Conditional_3_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Table_Conditional_2_Conditional_3_ng_template_0_Template, 1, 1, "ng-template", null, 4, ɵɵtemplateRefExtractor);
	}
	function Table_Conditional_2_Conditional_4_ng_template_0_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Table_Conditional_2_Conditional_4_ng_template_0_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Table_Conditional_2_Conditional_4_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 22);
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext(3);
			ɵɵproperty("ngTemplateOutlet", ctx_r1.paginatorLastPageLinkIconTemplate());
		}
	}
	function Table_Conditional_2_Conditional_4_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Table_Conditional_2_Conditional_4_ng_template_0_Template, 1, 1, "ng-template", null, 5, ɵɵtemplateRefExtractor);
	}
	function Table_Conditional_2_Conditional_5_ng_template_0_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Table_Conditional_2_Conditional_5_ng_template_0_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Table_Conditional_2_Conditional_5_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 22);
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext(3);
			ɵɵproperty("ngTemplateOutlet", ctx_r1.paginatorNextPageLinkIconTemplate());
		}
	}
	function Table_Conditional_2_Conditional_5_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Table_Conditional_2_Conditional_5_ng_template_0_Template, 1, 1, "ng-template", null, 6, ɵɵtemplateRefExtractor);
	}
	function Table_Conditional_2_Template(rf, ctx) {
		if (rf & 1) {
			const _r3 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "p-paginator", 23);
			ɵɵlistener("onPageChange", function Table_Conditional_2_Template_p_paginator_onPageChange_0_listener($event) {
				ɵɵrestoreView(_r3);
				const ctx_r1 = ɵɵnextContext();
				return ɵɵresetView(ctx_r1.onPageChange($event));
			});
			ɵɵconditionalCreate(1, Table_Conditional_2_Conditional_1_Template, 2, 0);
			ɵɵconditionalCreate(2, Table_Conditional_2_Conditional_2_Template, 2, 0);
			ɵɵconditionalCreate(3, Table_Conditional_2_Conditional_3_Template, 2, 0);
			ɵɵconditionalCreate(4, Table_Conditional_2_Conditional_4_Template, 2, 0);
			ɵɵconditionalCreate(5, Table_Conditional_2_Conditional_5_Template, 2, 0);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext();
			ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("pcPaginator"), ctx_r1.paginatorStyleClass()));
			ɵɵproperty("rows", ctx_r1.rows())("first", ctx_r1.first())("totalRecords", ctx_r1.totalRecords())("pageLinkSize", ctx_r1.pageLinks())("alwaysShow", ctx_r1.alwaysShowPaginator())("rowsPerPageOptions", ctx_r1.rowsPerPageOptions())("templateLeft", ctx_r1.paginatorLeftTemplate())("templateRight", ctx_r1.paginatorRightTemplate())("appendTo", ctx_r1.paginatorDropdownAppendTo())("dropdownScrollHeight", ctx_r1.paginatorDropdownScrollHeight())("currentPageReportTemplate", ctx_r1.currentPageReportTemplate())("showFirstLastIcon", ctx_r1.showFirstLastIcon())("dropdownItemTemplate", ctx_r1.paginatorDropdownItemTemplate())("showCurrentPageReport", ctx_r1.showCurrentPageReport())("showJumpToPageDropdown", ctx_r1.showJumpToPageDropdown())("showJumpToPageInput", ctx_r1.showJumpToPageInput())("showPageLinks", ctx_r1.showPageLinks())("locale", ctx_r1.paginatorLocale())("pt", ctx_r1.ptm("pcPaginator"))("unstyled", ctx_r1.unstyled());
			ɵɵadvance();
			ɵɵconditional(ctx_r1.paginatorDropdownIconTemplate() ? 1 : -1);
			ɵɵadvance();
			ɵɵconditional(ctx_r1.paginatorFirstPageLinkIconTemplate() ? 2 : -1);
			ɵɵadvance();
			ɵɵconditional(ctx_r1.paginatorPreviousPageLinkIconTemplate() ? 3 : -1);
			ɵɵadvance();
			ɵɵconditional(ctx_r1.paginatorLastPageLinkIconTemplate() ? 4 : -1);
			ɵɵadvance();
			ɵɵconditional(ctx_r1.paginatorNextPageLinkIconTemplate() ? 5 : -1);
		}
	}
	function Table_Conditional_5_ng_template_2_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Table_Conditional_5_ng_template_2_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Table_Conditional_5_ng_template_2_ng_container_0_Template, 1, 0, "ng-container", 25);
		if (rf & 2) {
			const items_r5 = ctx.$implicit;
			const scrollerOptions_r6 = ctx.options;
			ɵɵnextContext(2);
			const buildInTable_r7 = ɵɵreference(8);
			ɵɵproperty("ngTemplateOutlet", buildInTable_r7)("ngTemplateOutletContext", ɵɵpureFunction2(2, _c40, items_r5, scrollerOptions_r6));
		}
	}
	function Table_Conditional_5_Template(rf, ctx) {
		if (rf & 1) {
			const _r4 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "p-scroller", 24, 7);
			ɵɵlistener("onLazyLoad", function Table_Conditional_5_Template_p_scroller_onLazyLoad_0_listener($event) {
				ɵɵrestoreView(_r4);
				const ctx_r1 = ɵɵnextContext();
				return ɵɵresetView(ctx_r1.onLazyItemLoad($event));
			});
			ɵɵtemplate(2, Table_Conditional_5_ng_template_2_Template, 1, 5, "ng-template", null, 8, ɵɵtemplateRefExtractor);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext();
			ɵɵstyleMap(ctx_r1.scrollerStyle());
			ɵɵproperty("items", ctx_r1.processedData)("columns", ctx_r1.columns)("scrollHeight", ctx_r1.scrollerScrollHeight())("itemSize", ctx_r1.virtualScrollItemSize())("step", ctx_r1.rows())("delay", ctx_r1.scrollerDelay())("inline", true)("autoSize", true)("lazy", ctx_r1.lazy())("loaderDisabled", true)("showSpacer", false)("showLoader", !!ctx_r1.loadingBodyTemplate())("options", ctx_r1.virtualScrollOptions())("pt", ctx_r1.ptm("virtualScroller"));
		}
	}
	function Table_Conditional_6_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Table_Conditional_6_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Table_Conditional_6_ng_container_0_Template, 1, 0, "ng-container", 25);
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext();
			const buildInTable_r7 = ɵɵreference(8);
			ɵɵproperty("ngTemplateOutlet", buildInTable_r7)("ngTemplateOutletContext", ɵɵpureFunction2(4, _c40, ctx_r1.processedData, ɵɵpureFunction1(2, _c41, ctx_r1.columns)));
		}
	}
	function Table_ng_template_7_ng_container_2_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Table_ng_template_7_ng_container_5_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Table_ng_template_7_Conditional_6_Template(rf, ctx) {
		if (rf & 1) ɵɵelement(0, "tbody", 32);
		if (rf & 2) {
			const scrollerOptions_r8 = ɵɵnextContext().options;
			const ctx_r1 = ɵɵnextContext();
			ɵɵclassMap(ctx_r1.cx("tbody"));
			ɵɵproperty("pBind", ctx_r1.ptm("tbody"))("value", ctx_r1.frozenValue())("frozenRows", true)("pTableBody", scrollerOptions_r8.columns)("pTableBodyTemplate", ctx_r1.frozenBodyTemplate())("unstyled", ctx_r1.unstyled())("frozen", true);
			ɵɵattribute("data-p-virtualscroll", ctx_r1.virtualScroll());
		}
	}
	function Table_ng_template_7_Conditional_8_Template(rf, ctx) {
		if (rf & 1) ɵɵelement(0, "tbody", 27);
		if (rf & 2) {
			const scrollerOptions_r8 = ɵɵnextContext().options;
			const ctx_r1 = ɵɵnextContext();
			ɵɵstyleMap(ctx_r1.getVirtualScrollerSpacerStyle(scrollerOptions_r8));
			ɵɵclassMap(ctx_r1.cx("virtualScrollerSpacer"));
			ɵɵproperty("pBind", ctx_r1.ptm("virtualScrollerSpacer"));
		}
	}
	function Table_ng_template_7_Conditional_9_ng_container_2_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Table_ng_template_7_Conditional_9_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "tfoot", 27, 11);
			ɵɵtemplate(2, Table_ng_template_7_Conditional_9_ng_container_2_Template, 1, 0, "ng-container", 25);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const scrollerOptions_r8 = ɵɵnextContext().options;
			const ctx_r1 = ɵɵnextContext();
			ɵɵstyleMap(ctx_r1.sx("tfoot"));
			ɵɵclassMap(ctx_r1.cx("footer"));
			ɵɵproperty("pBind", ctx_r1.ptm("tfoot"));
			ɵɵadvance(2);
			ɵɵproperty("ngTemplateOutlet", ctx_r1.footerGroupedTemplate() || ctx_r1.footerTemplate())("ngTemplateOutletContext", ɵɵpureFunction1(7, _c42, scrollerOptions_r8.columns));
		}
	}
	function Table_ng_template_7_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "table", 26, 9);
			ɵɵtemplate(2, Table_ng_template_7_ng_container_2_Template, 1, 0, "ng-container", 25);
			ɵɵelementStart(3, "thead", 27, 10);
			ɵɵtemplate(5, Table_ng_template_7_ng_container_5_Template, 1, 0, "ng-container", 25);
			ɵɵelementEnd();
			ɵɵconditionalCreate(6, Table_ng_template_7_Conditional_6_Template, 1, 10, "tbody", 28);
			ɵɵelement(7, "tbody", 29);
			ɵɵconditionalCreate(8, Table_ng_template_7_Conditional_8_Template, 1, 5, "tbody", 30);
			ɵɵconditionalCreate(9, Table_ng_template_7_Conditional_9_Template, 3, 9, "tfoot", 31);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const scrollerOptions_r8 = ctx.options;
			const ctx_r1 = ɵɵnextContext();
			ɵɵstyleMap(ctx_r1.tableStyle());
			ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("table"), ctx_r1.tableStyleClass()));
			ɵɵproperty("pBind", ctx_r1.ptm("table"));
			ɵɵattribute("id", ctx_r1.id + "-table");
			ɵɵadvance(2);
			ɵɵproperty("ngTemplateOutlet", ctx_r1.colGroupTemplate())("ngTemplateOutletContext", ɵɵpureFunction1(29, _c42, scrollerOptions_r8.columns));
			ɵɵadvance();
			ɵɵstyleMap(ctx_r1.sx("thead"));
			ɵɵclassMap(ctx_r1.cx("thead"));
			ɵɵproperty("pBind", ctx_r1.ptm("thead"));
			ɵɵadvance(2);
			ɵɵproperty("ngTemplateOutlet", ctx_r1.headerGroupedTemplate() || ctx_r1.headerTemplate())("ngTemplateOutletContext", ɵɵpureFunction1(31, _c42, scrollerOptions_r8.columns));
			ɵɵadvance();
			ɵɵconditional(ctx_r1.showFrozenBody() ? 6 : -1);
			ɵɵadvance();
			ɵɵstyleMap(scrollerOptions_r8.contentStyle);
			ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("tbody"), scrollerOptions_r8.contentStyleClass));
			ɵɵproperty("pBind", ctx_r1.ptm("tbody"))("value", ctx_r1.dataToRender(scrollerOptions_r8.rows))("pTableBody", scrollerOptions_r8.columns)("pTableBodyTemplate", ctx_r1.bodyTemplate())("scrollerOptions", scrollerOptions_r8)("unstyled", ctx_r1.unstyled());
			ɵɵattribute("data-p-virtualscroll", ctx_r1.virtualScroll());
			ɵɵadvance();
			ɵɵconditional(scrollerOptions_r8.spacerStyle ? 8 : -1);
			ɵɵadvance();
			ɵɵconditional(ctx_r1.showFooter() ? 9 : -1);
		}
	}
	function Table_Conditional_9_Conditional_1_ng_template_0_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Table_Conditional_9_Conditional_1_ng_template_0_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Table_Conditional_9_Conditional_1_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 22);
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext(3);
			ɵɵproperty("ngTemplateOutlet", ctx_r1.paginatorDropdownIconTemplate());
		}
	}
	function Table_Conditional_9_Conditional_1_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Table_Conditional_9_Conditional_1_ng_template_0_Template, 1, 1, "ng-template", null, 2, ɵɵtemplateRefExtractor);
	}
	function Table_Conditional_9_Conditional_2_ng_template_0_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Table_Conditional_9_Conditional_2_ng_template_0_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Table_Conditional_9_Conditional_2_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 22);
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext(3);
			ɵɵproperty("ngTemplateOutlet", ctx_r1.paginatorFirstPageLinkIconTemplate());
		}
	}
	function Table_Conditional_9_Conditional_2_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Table_Conditional_9_Conditional_2_ng_template_0_Template, 1, 1, "ng-template", null, 3, ɵɵtemplateRefExtractor);
	}
	function Table_Conditional_9_Conditional_3_ng_template_0_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Table_Conditional_9_Conditional_3_ng_template_0_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Table_Conditional_9_Conditional_3_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 22);
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext(3);
			ɵɵproperty("ngTemplateOutlet", ctx_r1.paginatorPreviousPageLinkIconTemplate());
		}
	}
	function Table_Conditional_9_Conditional_3_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Table_Conditional_9_Conditional_3_ng_template_0_Template, 1, 1, "ng-template", null, 4, ɵɵtemplateRefExtractor);
	}
	function Table_Conditional_9_Conditional_4_ng_template_0_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Table_Conditional_9_Conditional_4_ng_template_0_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Table_Conditional_9_Conditional_4_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 22);
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext(3);
			ɵɵproperty("ngTemplateOutlet", ctx_r1.paginatorLastPageLinkIconTemplate());
		}
	}
	function Table_Conditional_9_Conditional_4_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Table_Conditional_9_Conditional_4_ng_template_0_Template, 1, 1, "ng-template", null, 5, ɵɵtemplateRefExtractor);
	}
	function Table_Conditional_9_Conditional_5_ng_template_0_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Table_Conditional_9_Conditional_5_ng_template_0_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Table_Conditional_9_Conditional_5_ng_template_0_ng_container_0_Template, 1, 0, "ng-container", 22);
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext(3);
			ɵɵproperty("ngTemplateOutlet", ctx_r1.paginatorNextPageLinkIconTemplate());
		}
	}
	function Table_Conditional_9_Conditional_5_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Table_Conditional_9_Conditional_5_ng_template_0_Template, 1, 1, "ng-template", null, 6, ɵɵtemplateRefExtractor);
	}
	function Table_Conditional_9_Template(rf, ctx) {
		if (rf & 1) {
			const _r9 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "p-paginator", 23);
			ɵɵlistener("onPageChange", function Table_Conditional_9_Template_p_paginator_onPageChange_0_listener($event) {
				ɵɵrestoreView(_r9);
				const ctx_r1 = ɵɵnextContext();
				return ɵɵresetView(ctx_r1.onPageChange($event));
			});
			ɵɵconditionalCreate(1, Table_Conditional_9_Conditional_1_Template, 2, 0);
			ɵɵconditionalCreate(2, Table_Conditional_9_Conditional_2_Template, 2, 0);
			ɵɵconditionalCreate(3, Table_Conditional_9_Conditional_3_Template, 2, 0);
			ɵɵconditionalCreate(4, Table_Conditional_9_Conditional_4_Template, 2, 0);
			ɵɵconditionalCreate(5, Table_Conditional_9_Conditional_5_Template, 2, 0);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext();
			ɵɵclassMap(ctx_r1.cn(ctx_r1.cx("pcPaginator"), ctx_r1.paginatorStyleClass()));
			ɵɵproperty("rows", ctx_r1.rows())("first", ctx_r1.first())("totalRecords", ctx_r1.totalRecords())("pageLinkSize", ctx_r1.pageLinks())("alwaysShow", ctx_r1.alwaysShowPaginator())("rowsPerPageOptions", ctx_r1.rowsPerPageOptions())("templateLeft", ctx_r1.paginatorLeftTemplate())("templateRight", ctx_r1.paginatorRightTemplate())("appendTo", ctx_r1.paginatorDropdownAppendTo())("dropdownScrollHeight", ctx_r1.paginatorDropdownScrollHeight())("currentPageReportTemplate", ctx_r1.currentPageReportTemplate())("showFirstLastIcon", ctx_r1.showFirstLastIcon())("dropdownItemTemplate", ctx_r1.paginatorDropdownItemTemplate())("showCurrentPageReport", ctx_r1.showCurrentPageReport())("showJumpToPageDropdown", ctx_r1.showJumpToPageDropdown())("showJumpToPageInput", ctx_r1.showJumpToPageInput())("showPageLinks", ctx_r1.showPageLinks())("locale", ctx_r1.paginatorLocale())("pt", ctx_r1.ptm("pcPaginator"))("unstyled", ctx_r1.unstyled());
			ɵɵadvance();
			ɵɵconditional(ctx_r1.paginatorDropdownIconTemplate() ? 1 : -1);
			ɵɵadvance();
			ɵɵconditional(ctx_r1.paginatorFirstPageLinkIconTemplate() ? 2 : -1);
			ɵɵadvance();
			ɵɵconditional(ctx_r1.paginatorPreviousPageLinkIconTemplate() ? 3 : -1);
			ɵɵadvance();
			ɵɵconditional(ctx_r1.paginatorLastPageLinkIconTemplate() ? 4 : -1);
			ɵɵadvance();
			ɵɵconditional(ctx_r1.paginatorNextPageLinkIconTemplate() ? 5 : -1);
		}
	}
	function Table_Conditional_10_ng_container_1_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function Table_Conditional_10_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "div", 17);
			ɵɵtemplate(1, Table_Conditional_10_ng_container_1_Template, 1, 0, "ng-container", 22);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext();
			ɵɵclassMap(ctx_r1.cx("footer"));
			ɵɵproperty("pBind", ctx_r1.ptm("footer"));
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", ctx_r1.summaryTemplate());
		}
	}
	function Table_Conditional_11_Template(rf, ctx) {
		if (rf & 1) ɵɵelement(0, "div", 17, 12);
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext();
			ɵɵclassMap(ctx_r1.cx("columnResizeIndicator"));
			ɵɵstyleProp("display", "none");
			ɵɵproperty("pBind", ctx_r1.ptm("columnResizeIndicator"));
		}
	}
	function Table_Conditional_12_Conditional_2_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 33);
		}
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext(2);
			ɵɵproperty("pBind", ctx_r1.ptm("rowReorderIndicatorUp")["icon"]);
		}
	}
	function Table_Conditional_12_3_ng_template_0_Template(rf, ctx) {}
	function Table_Conditional_12_3_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Table_Conditional_12_3_ng_template_0_Template, 0, 0, "ng-template");
	}
	function Table_Conditional_12_Conditional_6_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 34);
		}
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext(2);
			ɵɵproperty("pBind", ctx_r1.ptm("rowReorderIndicatorDown")["icon"]);
		}
	}
	function Table_Conditional_12_7_ng_template_0_Template(rf, ctx) {}
	function Table_Conditional_12_7_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, Table_Conditional_12_7_ng_template_0_Template, 0, 0, "ng-template");
	}
	function Table_Conditional_12_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "span", 17, 13);
			ɵɵconditionalCreate(2, Table_Conditional_12_Conditional_2_Template, 1, 1, "svg", 33);
			ɵɵtemplate(3, Table_Conditional_12_3_Template, 1, 0, null, 22);
			ɵɵelementEnd();
			ɵɵelementStart(4, "span", 17, 14);
			ɵɵconditionalCreate(6, Table_Conditional_12_Conditional_6_Template, 1, 1, "svg", 34);
			ɵɵtemplate(7, Table_Conditional_12_7_Template, 1, 0, null, 22);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r1 = ɵɵnextContext();
			ɵɵclassMap(ctx_r1.cx("rowReorderIndicatorUp"));
			ɵɵstyleProp("display", "none");
			ɵɵproperty("pBind", ctx_r1.ptm("rowReorderIndicatorUp"));
			ɵɵadvance(2);
			ɵɵconditional(!ctx_r1.reorderIndicatorUpIconTemplate() ? 2 : -1);
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", ctx_r1.reorderIndicatorUpIconTemplate());
			ɵɵadvance();
			ɵɵclassMap(ctx_r1.cx("rowReorderIndicatorDown"));
			ɵɵstyleProp("display", "none");
			ɵɵproperty("pBind", ctx_r1.ptm("rowReorderIndicatorDown"));
			ɵɵadvance(2);
			ɵɵconditional(!ctx_r1.reorderIndicatorDownIconTemplate() ? 6 : -1);
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", ctx_r1.reorderIndicatorDownIconTemplate());
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _Table,
		selectors: [["p-table"]],
		contentQueries: function Table_ContentQueries(rf, ctx, dirIndex) {
			if (rf & 1) ɵɵcontentQuerySignal(dirIndex, ctx.headerTemplate, _c0, 4)(dirIndex, ctx.headerGroupedTemplate, _c1, 4)(dirIndex, ctx.bodyTemplate, _c2, 4)(dirIndex, ctx.loadingBodyTemplate, _c3, 4)(dirIndex, ctx.captionTemplate, _c4, 4)(dirIndex, ctx.footerTemplate, _c5, 4)(dirIndex, ctx.footerGroupedTemplate, _c6, 4)(dirIndex, ctx.summaryTemplate, _c7, 4)(dirIndex, ctx.colGroupTemplate, _c8, 4)(dirIndex, ctx.expandedRowTemplate, _c9, 4)(dirIndex, ctx.groupHeaderTemplate, _c10, 4)(dirIndex, ctx.groupFooterTemplate, _c11, 4)(dirIndex, ctx.frozenExpandedRowTemplate, _c12, 4)(dirIndex, ctx.frozenHeaderTemplate, _c13, 4)(dirIndex, ctx.frozenBodyTemplate, _c14, 4)(dirIndex, ctx.frozenFooterTemplate, _c15, 4)(dirIndex, ctx.frozenColGroupTemplate, _c16, 4)(dirIndex, ctx.emptyMessageTemplate, _c17, 4)(dirIndex, ctx.paginatorLeftTemplate, _c18, 4)(dirIndex, ctx.paginatorRightTemplate, _c19, 4)(dirIndex, ctx.paginatorDropdownItemTemplate, _c20, 4)(dirIndex, ctx.loadingIconTemplate, _c21, 4)(dirIndex, ctx.reorderIndicatorUpIconTemplate, _c22, 4)(dirIndex, ctx.reorderIndicatorDownIconTemplate, _c23, 4)(dirIndex, ctx.sortIconTemplate, _c24, 4)(dirIndex, ctx.checkboxIconTemplate, _c25, 4)(dirIndex, ctx.headerCheckboxIconTemplate, _c26, 4)(dirIndex, ctx.paginatorDropdownIconTemplate, _c27, 4)(dirIndex, ctx.paginatorFirstPageLinkIconTemplate, _c28, 4)(dirIndex, ctx.paginatorLastPageLinkIconTemplate, _c29, 4)(dirIndex, ctx.paginatorPreviousPageLinkIconTemplate, _c30, 4)(dirIndex, ctx.paginatorNextPageLinkIconTemplate, _c31, 4);
			if (rf & 2) ɵɵqueryAdvance(32);
		},
		viewQuery: function Table_Query(rf, ctx) {
			if (rf & 1) ɵɵviewQuerySignal(ctx.resizeHelperViewChild, _c32, 5)(ctx.reorderIndicatorUpViewChild, _c33, 5)(ctx.reorderIndicatorDownViewChild, _c34, 5)(ctx.wrapperViewChild, _c35, 5)(ctx.tableViewChild, _c36, 5)(ctx.tableHeaderViewChild, _c37, 5)(ctx.tableFooterViewChild, _c38, 5)(ctx.scroller, _c39, 5);
			if (rf & 2) ɵɵqueryAdvance(8);
		},
		hostVars: 3,
		hostBindings: function Table_HostBindings(rf, ctx) {
			if (rf & 2) {
				ɵɵattribute("data-p", ctx.dataP);
				ɵɵclassMap(ctx.cx("root"));
			}
		},
		inputs: {
			frozenColumns: [1, "frozenColumns"],
			frozenValue: [1, "frozenValue"],
			tableStyle: [1, "tableStyle"],
			tableStyleClass: [1, "tableStyleClass"],
			paginator: [1, "paginator"],
			pageLinks: [1, "pageLinks"],
			rowsPerPageOptions: [1, "rowsPerPageOptions"],
			alwaysShowPaginator: [1, "alwaysShowPaginator"],
			paginatorPosition: [1, "paginatorPosition"],
			paginatorStyleClass: [1, "paginatorStyleClass"],
			paginatorDropdownAppendTo: [1, "paginatorDropdownAppendTo"],
			paginatorDropdownScrollHeight: [1, "paginatorDropdownScrollHeight"],
			currentPageReportTemplate: [1, "currentPageReportTemplate"],
			showCurrentPageReport: [1, "showCurrentPageReport"],
			showJumpToPageDropdown: [1, "showJumpToPageDropdown"],
			showJumpToPageInput: [1, "showJumpToPageInput"],
			showFirstLastIcon: [1, "showFirstLastIcon"],
			showPageLinks: [1, "showPageLinks"],
			defaultSortOrder: [1, "defaultSortOrder"],
			sortMode: [1, "sortMode"],
			resetPageOnSort: [1, "resetPageOnSort"],
			selectionMode: [1, "selectionMode"],
			selectionPageOnly: [1, "selectionPageOnly"],
			contextMenuSelectionInput: [
				1,
				"contextMenuSelection",
				"contextMenuSelectionInput"
			],
			dataKey: [1, "dataKey"],
			metaKeySelection: [1, "metaKeySelection"],
			rowSelectable: [1, "rowSelectable"],
			rowTrackBy: [1, "rowTrackBy"],
			lazy: [1, "lazy"],
			lazyLoadOnInit: [1, "lazyLoadOnInit"],
			compareSelectionBy: [1, "compareSelectionBy"],
			csvSeparator: [1, "csvSeparator"],
			exportFilename: [1, "exportFilename"],
			filtersInput: [
				1,
				"filters",
				"filtersInput"
			],
			globalFilterFields: [1, "globalFilterFields"],
			filterDelay: [1, "filterDelay"],
			filterLocale: [1, "filterLocale"],
			expandedRowKeysInput: [
				1,
				"expandedRowKeys",
				"expandedRowKeysInput"
			],
			editingRowKeysInput: [
				1,
				"editingRowKeys",
				"editingRowKeysInput"
			],
			rowExpandMode: [1, "rowExpandMode"],
			scrollable: [1, "scrollable"],
			rowGroupMode: [1, "rowGroupMode"],
			scrollHeight: [1, "scrollHeight"],
			virtualScroll: [1, "virtualScroll"],
			virtualScrollItemSize: [1, "virtualScrollItemSize"],
			virtualScrollOptions: [1, "virtualScrollOptions"],
			virtualScrollDelay: [1, "virtualScrollDelay"],
			frozenWidth: [1, "frozenWidth"],
			contextMenu: [1, "contextMenu"],
			resizableColumns: [1, "resizableColumns"],
			columnResizeMode: [1, "columnResizeMode"],
			reorderableColumns: [1, "reorderableColumns"],
			loading: [1, "loading"],
			loadingIcon: [1, "loadingIcon"],
			showLoader: [1, "showLoader"],
			rowHover: [1, "rowHover"],
			customSort: [1, "customSort"],
			showInitialSortBadge: [1, "showInitialSortBadge"],
			exportFunction: [1, "exportFunction"],
			exportHeader: [1, "exportHeader"],
			stateKey: [1, "stateKey"],
			stateStorage: [1, "stateStorage"],
			editMode: [1, "editMode"],
			groupRowsBy: [1, "groupRowsBy"],
			size: [1, "size"],
			showGridlines: [1, "showGridlines"],
			stripedRows: [1, "stripedRows"],
			groupRowsByOrder: [1, "groupRowsByOrder"],
			paginatorLocale: [1, "paginatorLocale"],
			valueInput: [
				1,
				"value",
				"valueInput"
			],
			columnsInput: [
				1,
				"columns",
				"columnsInput"
			],
			first: [1, "first"],
			rows: [1, "rows"],
			totalRecords: [1, "totalRecords"],
			sortFieldInput: [
				1,
				"sortField",
				"sortFieldInput"
			],
			sortOrderInput: [
				1,
				"sortOrder",
				"sortOrderInput"
			],
			multiSortMetaInput: [
				1,
				"multiSortMeta",
				"multiSortMetaInput"
			],
			selection: [1, "selection"],
			selectAllInput: [
				1,
				"selectAll",
				"selectAllInput"
			]
		},
		outputs: {
			contextMenuSelectionChange: "contextMenuSelectionChange",
			first: "firstChange",
			rows: "rowsChange",
			totalRecords: "totalRecordsChange",
			selection: "selectionChange",
			selectAllChange: "selectAllChange",
			onRowSelect: "onRowSelect",
			onRowUnselect: "onRowUnselect",
			onPage: "onPage",
			onSort: "onSort",
			onFilter: "onFilter",
			onLazyLoad: "onLazyLoad",
			onRowExpand: "onRowExpand",
			onRowCollapse: "onRowCollapse",
			onContextMenuSelect: "onContextMenuSelect",
			onColResize: "onColResize",
			onColReorder: "onColReorder",
			onRowReorder: "onRowReorder",
			onEditInit: "onEditInit",
			onEditComplete: "onEditComplete",
			onEditCancel: "onEditCancel",
			onHeaderCheckboxToggle: "onHeaderCheckboxToggle",
			sortFunction: "sortFunction",
			onStateSave: "onStateSave",
			onStateRestore: "onStateRestore"
		},
		features: [
			ɵɵProvidersFeature([
				TableService,
				TableStyle,
				{
					provide: TABLE_INSTANCE,
					useExisting: _Table
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: _Table
				}
			]),
			ɵɵHostDirectivesFeature([Bind]),
			ɵɵInheritDefinitionFeature
		],
		decls: 13,
		vars: 15,
		consts: [
			["wrapper", ""],
			["buildInTable", ""],
			["dropdownicon", ""],
			["firstpagelinkicon", ""],
			["previouspagelinkicon", ""],
			["lastpagelinkicon", ""],
			["nextpagelinkicon", ""],
			["scroller", ""],
			["content", ""],
			["table", ""],
			["thead", ""],
			["tfoot", ""],
			["resizeHelper", ""],
			["reorderIndicatorUp", ""],
			["reorderIndicatorDown", ""],
			[
				3,
				"class",
				"pBind"
			],
			[
				3,
				"rows",
				"first",
				"totalRecords",
				"pageLinkSize",
				"alwaysShow",
				"rowsPerPageOptions",
				"templateLeft",
				"templateRight",
				"appendTo",
				"dropdownScrollHeight",
				"currentPageReportTemplate",
				"showFirstLastIcon",
				"dropdownItemTemplate",
				"showCurrentPageReport",
				"showJumpToPageDropdown",
				"showJumpToPageInput",
				"showPageLinks",
				"class",
				"locale",
				"pt",
				"unstyled"
			],
			[3, "pBind"],
			[
				3,
				"items",
				"columns",
				"style",
				"scrollHeight",
				"itemSize",
				"step",
				"delay",
				"inline",
				"autoSize",
				"lazy",
				"loaderDisabled",
				"showSpacer",
				"showLoader",
				"options",
				"pt"
			],
			[
				3,
				"class",
				"pBind",
				"display"
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
			],
			[4, "ngTemplateOutlet"],
			[
				3,
				"onPageChange",
				"rows",
				"first",
				"totalRecords",
				"pageLinkSize",
				"alwaysShow",
				"rowsPerPageOptions",
				"templateLeft",
				"templateRight",
				"appendTo",
				"dropdownScrollHeight",
				"currentPageReportTemplate",
				"showFirstLastIcon",
				"dropdownItemTemplate",
				"showCurrentPageReport",
				"showJumpToPageDropdown",
				"showJumpToPageInput",
				"showPageLinks",
				"locale",
				"pt",
				"unstyled"
			],
			[
				3,
				"onLazyLoad",
				"items",
				"columns",
				"scrollHeight",
				"itemSize",
				"step",
				"delay",
				"inline",
				"autoSize",
				"lazy",
				"loaderDisabled",
				"showSpacer",
				"showLoader",
				"options",
				"pt"
			],
			[
				4,
				"ngTemplateOutlet",
				"ngTemplateOutletContext"
			],
			[
				"role",
				"table",
				3,
				"pBind"
			],
			[
				"role",
				"rowgroup",
				3,
				"pBind"
			],
			[
				"role",
				"rowgroup",
				3,
				"class",
				"pBind",
				"value",
				"frozenRows",
				"pTableBody",
				"pTableBodyTemplate",
				"unstyled",
				"frozen"
			],
			[
				"role",
				"rowgroup",
				3,
				"pBind",
				"value",
				"pTableBody",
				"pTableBodyTemplate",
				"scrollerOptions",
				"unstyled"
			],
			[
				"role",
				"rowgroup",
				3,
				"style",
				"class",
				"pBind"
			],
			[
				"role",
				"rowgroup",
				3,
				"class",
				"style",
				"pBind"
			],
			[
				"role",
				"rowgroup",
				3,
				"pBind",
				"value",
				"frozenRows",
				"pTableBody",
				"pTableBodyTemplate",
				"unstyled",
				"frozen"
			],
			[
				"data-p-icon",
				"arrow-down",
				3,
				"pBind"
			],
			[
				"data-p-icon",
				"arrow-up",
				3,
				"pBind"
			]
		],
		template: function Table_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵconditionalCreate(0, Table_Conditional_0_Template, 3, 5, "div", 15);
				ɵɵconditionalCreate(1, Table_Conditional_1_Template, 2, 4, "div", 15);
				ɵɵconditionalCreate(2, Table_Conditional_2_Template, 6, 27, "p-paginator", 16);
				ɵɵelementStart(3, "div", 17, 0);
				ɵɵconditionalCreate(5, Table_Conditional_5_Template, 4, 16, "p-scroller", 18);
				ɵɵconditionalCreate(6, Table_Conditional_6_Template, 1, 7, "ng-container");
				ɵɵtemplate(7, Table_ng_template_7_Template, 10, 33, "ng-template", null, 1, ɵɵtemplateRefExtractor);
				ɵɵelementEnd();
				ɵɵconditionalCreate(9, Table_Conditional_9_Template, 6, 27, "p-paginator", 16);
				ɵɵconditionalCreate(10, Table_Conditional_10_Template, 2, 4, "div", 15);
				ɵɵconditionalCreate(11, Table_Conditional_11_Template, 2, 5, "div", 19);
				ɵɵconditionalCreate(12, Table_Conditional_12_Template, 8, 14);
			}
			if (rf & 2) {
				ɵɵconditional(ctx.showLoadingMask() ? 0 : -1);
				ɵɵadvance();
				ɵɵconditional(ctx.captionTemplate() ? 1 : -1);
				ɵɵadvance();
				ɵɵconditional(ctx.showTopPaginator() ? 2 : -1);
				ɵɵadvance();
				ɵɵstyleMap(ctx.sx("tableContainer"));
				ɵɵclassMap(ctx.cx("tableContainer"));
				ɵɵproperty("pBind", ctx.ptm("tableContainer"));
				ɵɵattribute("data-p", ctx.dataP);
				ɵɵadvance(2);
				ɵɵconditional(ctx.virtualScroll() ? 5 : -1);
				ɵɵadvance();
				ɵɵconditional(!ctx.virtualScroll() ? 6 : -1);
				ɵɵadvance(3);
				ɵɵconditional(ctx.showBottomPaginator() ? 9 : -1);
				ɵɵadvance();
				ɵɵconditional(ctx.summaryTemplate() ? 10 : -1);
				ɵɵadvance();
				ɵɵconditional(ctx.resizableColumns() ? 11 : -1);
				ɵɵadvance();
				ɵɵconditional(ctx.reorderableColumns() ? 12 : -1);
			}
		},
		dependencies: [
			NgTemplateOutlet,
			PaginatorModule,
			Paginator,
			ScrollerModule,
			Scroller,
			FormsModule,
			BindModule,
			Bind,
			Spinner,
			ArrowDown,
			ArrowUp,
			TableBody
		],
		encapsulation: 2,
		changeDetection: 1
	});
})()), _Table);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Table, [{
		type: Component,
		args: [{
			selector: "p-table",
			standalone: true,
			imports: [
				NgTemplateOutlet,
				PaginatorModule,
				ScrollerModule,
				FormsModule,
				BindModule,
				Spinner,
				ArrowDown,
				ArrowUp,
				TableBody
			],
			template: `
        @if (showLoadingMask()) {
            <div [class]="cx('mask')" [pBind]="ptm('mask')" [animate.enter]="pcn('p-overlay-mask-enter-active')" [animate.leave]="pcn('p-overlay-mask-leave-active')">
                @if (loadingIcon()) {
                    <i [class]="cn(cx('loadingIcon'), loadingIcon())" [pBind]="ptm('loadingIcon')"></i>
                }
                @if (!loadingIcon()) {
                    @if (!loadingIconTemplate()) {
                        <svg data-p-icon="spinner" [class]="cx('loadingIcon')" [spin]="true" [pBind]="ptm('loadingIcon')" />
                    }
                    @if (loadingIconTemplate()) {
                        <span [class]="cx('loadingIcon')" [pBind]="ptm('loadingIcon')">
                            <ng-template *ngTemplateOutlet="loadingIconTemplate()"></ng-template>
                        </span>
                    }
                }
            </div>
        }
        @if (captionTemplate()) {
            <div [class]="cx('header')" [pBind]="ptm('header')">
                <ng-container *ngTemplateOutlet="captionTemplate()"></ng-container>
            </div>
        }
        @if (showTopPaginator()) {
            <p-paginator
                [rows]="rows()!"
                [first]="first()!"
                [totalRecords]="totalRecords()"
                [pageLinkSize]="pageLinks()"
                [alwaysShow]="alwaysShowPaginator()"
                (onPageChange)="onPageChange($event)"
                [rowsPerPageOptions]="rowsPerPageOptions()"
                [templateLeft]="paginatorLeftTemplate()"
                [templateRight]="paginatorRightTemplate()"
                [appendTo]="paginatorDropdownAppendTo()"
                [dropdownScrollHeight]="paginatorDropdownScrollHeight()"
                [currentPageReportTemplate]="currentPageReportTemplate()"
                [showFirstLastIcon]="showFirstLastIcon()"
                [dropdownItemTemplate]="paginatorDropdownItemTemplate()"
                [showCurrentPageReport]="showCurrentPageReport()"
                [showJumpToPageDropdown]="showJumpToPageDropdown()"
                [showJumpToPageInput]="showJumpToPageInput()"
                [showPageLinks]="showPageLinks()"
                [class]="cn(cx('pcPaginator'), paginatorStyleClass())"
                [locale]="paginatorLocale()"
                [pt]="ptm('pcPaginator')"
                [unstyled]="unstyled()"
            >
                @if (paginatorDropdownIconTemplate()) {
                    <ng-template #dropdownicon>
                        <ng-container *ngTemplateOutlet="paginatorDropdownIconTemplate()"></ng-container>
                    </ng-template>
                }

                @if (paginatorFirstPageLinkIconTemplate()) {
                    <ng-template #firstpagelinkicon>
                        <ng-container *ngTemplateOutlet="paginatorFirstPageLinkIconTemplate()"></ng-container>
                    </ng-template>
                }

                @if (paginatorPreviousPageLinkIconTemplate()) {
                    <ng-template #previouspagelinkicon>
                        <ng-container *ngTemplateOutlet="paginatorPreviousPageLinkIconTemplate()"></ng-container>
                    </ng-template>
                }

                @if (paginatorLastPageLinkIconTemplate()) {
                    <ng-template #lastpagelinkicon>
                        <ng-container *ngTemplateOutlet="paginatorLastPageLinkIconTemplate()"></ng-container>
                    </ng-template>
                }

                @if (paginatorNextPageLinkIconTemplate()) {
                    <ng-template #nextpagelinkicon>
                        <ng-container *ngTemplateOutlet="paginatorNextPageLinkIconTemplate()"></ng-container>
                    </ng-template>
                }
            </p-paginator>
        }

        <div #wrapper [class]="cx('tableContainer')" [style]="sx('tableContainer')" [pBind]="ptm('tableContainer')" [attr.data-p]="dataP">
            @if (virtualScroll()) {
                <p-scroller
                    #scroller
                    [items]="processedData"
                    [columns]="columns"
                    [style]="scrollerStyle()"
                    [scrollHeight]="scrollerScrollHeight()"
                    [itemSize]="virtualScrollItemSize()!"
                    [step]="rows()!"
                    [delay]="scrollerDelay()"
                    [inline]="true"
                    [autoSize]="true"
                    [lazy]="lazy()"
                    (onLazyLoad)="onLazyItemLoad($event)"
                    [loaderDisabled]="true"
                    [showSpacer]="false"
                    [showLoader]="!!loadingBodyTemplate()"
                    [options]="virtualScrollOptions()"
                    [pt]="ptm('virtualScroller')"
                >
                    <ng-template #content let-items let-scrollerOptions="options">
                        <ng-container
                            *ngTemplateOutlet="
                                buildInTable;
                                context: {
                                    $implicit: items,
                                    options: scrollerOptions
                                }
                            "
                        ></ng-container>
                    </ng-template>
                </p-scroller>
            }
            @if (!virtualScroll()) {
                <ng-container
                    *ngTemplateOutlet="
                        buildInTable;
                        context: {
                            $implicit: processedData,
                            options: { columns }
                        }
                    "
                ></ng-container>
            }

            <ng-template #buildInTable let-items let-scrollerOptions="options">
                <table #table role="table" [class]="cn(cx('table'), tableStyleClass())" [pBind]="ptm('table')" [style]="tableStyle()" [attr.id]="id + '-table'">
                    <ng-container *ngTemplateOutlet="colGroupTemplate(); context: { $implicit: scrollerOptions.columns }"></ng-container>
                    <thead role="rowgroup" #thead [class]="cx('thead')" [style]="sx('thead')" [pBind]="ptm('thead')">
                        <ng-container
                            *ngTemplateOutlet="
                                headerGroupedTemplate() || headerTemplate();
                                context: {
                                    $implicit: scrollerOptions.columns
                                }
                            "
                        ></ng-container>
                    </thead>
                    @if (showFrozenBody()) {
                        <tbody
                            role="rowgroup"
                            [class]="cx('tbody')"
                            [pBind]="ptm('tbody')"
                            [value]="frozenValue()"
                            [frozenRows]="true"
                            [pTableBody]="scrollerOptions.columns"
                            [pTableBodyTemplate]="frozenBodyTemplate()"
                            [unstyled]="unstyled()"
                            [frozen]="true"
                            [attr.data-p-virtualscroll]="virtualScroll()"
                        ></tbody>
                    }
                    <tbody
                        role="rowgroup"
                        [class]="cn(cx('tbody'), scrollerOptions.contentStyleClass)"
                        [pBind]="ptm('tbody')"
                        [style]="scrollerOptions.contentStyle"
                        [value]="dataToRender(scrollerOptions.rows)"
                        [pTableBody]="scrollerOptions.columns"
                        [pTableBodyTemplate]="bodyTemplate()"
                        [scrollerOptions]="scrollerOptions"
                        [unstyled]="unstyled()"
                        [attr.data-p-virtualscroll]="virtualScroll()"
                    ></tbody>
                    @if (scrollerOptions.spacerStyle) {
                        <tbody role="rowgroup" [style]="getVirtualScrollerSpacerStyle(scrollerOptions)" [class]="cx('virtualScrollerSpacer')" [pBind]="ptm('virtualScrollerSpacer')"></tbody>
                    }
                    @if (showFooter()) {
                        <tfoot role="rowgroup" #tfoot [class]="cx('footer')" [style]="sx('tfoot')" [pBind]="ptm('tfoot')">
                            <ng-container
                                *ngTemplateOutlet="
                                    footerGroupedTemplate() || footerTemplate();
                                    context: {
                                        $implicit: scrollerOptions.columns
                                    }
                                "
                            ></ng-container>
                        </tfoot>
                    }
                </table>
            </ng-template>
        </div>

        @if (showBottomPaginator()) {
            <p-paginator
                [rows]="rows()!"
                [first]="first()!"
                [totalRecords]="totalRecords()"
                [pageLinkSize]="pageLinks()"
                [alwaysShow]="alwaysShowPaginator()"
                (onPageChange)="onPageChange($event)"
                [rowsPerPageOptions]="rowsPerPageOptions()"
                [templateLeft]="paginatorLeftTemplate()"
                [templateRight]="paginatorRightTemplate()"
                [appendTo]="paginatorDropdownAppendTo()"
                [dropdownScrollHeight]="paginatorDropdownScrollHeight()"
                [currentPageReportTemplate]="currentPageReportTemplate()"
                [showFirstLastIcon]="showFirstLastIcon()"
                [dropdownItemTemplate]="paginatorDropdownItemTemplate()"
                [showCurrentPageReport]="showCurrentPageReport()"
                [showJumpToPageDropdown]="showJumpToPageDropdown()"
                [showJumpToPageInput]="showJumpToPageInput()"
                [showPageLinks]="showPageLinks()"
                [class]="cn(cx('pcPaginator'), paginatorStyleClass())"
                [locale]="paginatorLocale()"
                [pt]="ptm('pcPaginator')"
                [unstyled]="unstyled()"
            >
                @if (paginatorDropdownIconTemplate()) {
                    <ng-template #dropdownicon>
                        <ng-container *ngTemplateOutlet="paginatorDropdownIconTemplate()"></ng-container>
                    </ng-template>
                }

                @if (paginatorFirstPageLinkIconTemplate()) {
                    <ng-template #firstpagelinkicon>
                        <ng-container *ngTemplateOutlet="paginatorFirstPageLinkIconTemplate()"></ng-container>
                    </ng-template>
                }

                @if (paginatorPreviousPageLinkIconTemplate()) {
                    <ng-template #previouspagelinkicon>
                        <ng-container *ngTemplateOutlet="paginatorPreviousPageLinkIconTemplate()"></ng-container>
                    </ng-template>
                }

                @if (paginatorLastPageLinkIconTemplate()) {
                    <ng-template #lastpagelinkicon>
                        <ng-container *ngTemplateOutlet="paginatorLastPageLinkIconTemplate()"></ng-container>
                    </ng-template>
                }

                @if (paginatorNextPageLinkIconTemplate()) {
                    <ng-template #nextpagelinkicon>
                        <ng-container *ngTemplateOutlet="paginatorNextPageLinkIconTemplate()"></ng-container>
                    </ng-template>
                }
            </p-paginator>
        }

        @if (summaryTemplate()) {
            <div [class]="cx('footer')" [pBind]="ptm('footer')">
                <ng-container *ngTemplateOutlet="summaryTemplate()"></ng-container>
            </div>
        }

        @if (resizableColumns()) {
            <div #resizeHelper [class]="cx('columnResizeIndicator')" [pBind]="ptm('columnResizeIndicator')" [style.display]="'none'"></div>
        }
        @if (reorderableColumns()) {
            <span #reorderIndicatorUp [class]="cx('rowReorderIndicatorUp')" [pBind]="ptm('rowReorderIndicatorUp')" [style.display]="'none'">
                @if (!reorderIndicatorUpIconTemplate()) {
                    <svg data-p-icon="arrow-down" [pBind]="ptm('rowReorderIndicatorUp')['icon']" />
                }
                <ng-template *ngTemplateOutlet="reorderIndicatorUpIconTemplate()"></ng-template>
            </span>
            <span #reorderIndicatorDown [class]="cx('rowReorderIndicatorDown')" [pBind]="ptm('rowReorderIndicatorDown')" [style.display]="'none'">
                @if (!reorderIndicatorDownIconTemplate()) {
                    <svg data-p-icon="arrow-up" [pBind]="ptm('rowReorderIndicatorDown')['icon']" />
                }
                <ng-template *ngTemplateOutlet="reorderIndicatorDownIconTemplate()"></ng-template>
            </span>
        }
    `,
			providers: [
				TableService,
				TableStyle,
				{
					provide: TABLE_INSTANCE,
					useExisting: Table
				},
				{
					provide: PARENT_INSTANCE,
					useExisting: Table
				}
			],
			changeDetection: ChangeDetectionStrategy.Default,
			encapsulation: ViewEncapsulation.None,
			host: {
				"[class]": "cx('root')",
				"[attr.data-p]": "dataP"
			},
			hostDirectives: [Bind]
		}]
	}], () => [], {
		frozenColumns: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "frozenColumns",
				required: false
			}]
		}],
		frozenValue: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "frozenValue",
				required: false
			}]
		}],
		tableStyle: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "tableStyle",
				required: false
			}]
		}],
		tableStyleClass: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "tableStyleClass",
				required: false
			}]
		}],
		paginator: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "paginator",
				required: false
			}]
		}],
		pageLinks: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pageLinks",
				required: false
			}]
		}],
		rowsPerPageOptions: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "rowsPerPageOptions",
				required: false
			}]
		}],
		alwaysShowPaginator: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "alwaysShowPaginator",
				required: false
			}]
		}],
		paginatorPosition: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "paginatorPosition",
				required: false
			}]
		}],
		paginatorStyleClass: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "paginatorStyleClass",
				required: false
			}]
		}],
		paginatorDropdownAppendTo: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "paginatorDropdownAppendTo",
				required: false
			}]
		}],
		paginatorDropdownScrollHeight: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "paginatorDropdownScrollHeight",
				required: false
			}]
		}],
		currentPageReportTemplate: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "currentPageReportTemplate",
				required: false
			}]
		}],
		showCurrentPageReport: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "showCurrentPageReport",
				required: false
			}]
		}],
		showJumpToPageDropdown: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "showJumpToPageDropdown",
				required: false
			}]
		}],
		showJumpToPageInput: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "showJumpToPageInput",
				required: false
			}]
		}],
		showFirstLastIcon: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "showFirstLastIcon",
				required: false
			}]
		}],
		showPageLinks: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "showPageLinks",
				required: false
			}]
		}],
		defaultSortOrder: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "defaultSortOrder",
				required: false
			}]
		}],
		sortMode: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "sortMode",
				required: false
			}]
		}],
		resetPageOnSort: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "resetPageOnSort",
				required: false
			}]
		}],
		selectionMode: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "selectionMode",
				required: false
			}]
		}],
		selectionPageOnly: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "selectionPageOnly",
				required: false
			}]
		}],
		contextMenuSelectionInput: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "contextMenuSelection",
				required: false
			}]
		}],
		contextMenuSelectionChange: [{
			type: Output,
			args: ["contextMenuSelectionChange"]
		}],
		dataKey: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "dataKey",
				required: false
			}]
		}],
		metaKeySelection: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "metaKeySelection",
				required: false
			}]
		}],
		rowSelectable: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "rowSelectable",
				required: false
			}]
		}],
		rowTrackBy: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "rowTrackBy",
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
		lazyLoadOnInit: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "lazyLoadOnInit",
				required: false
			}]
		}],
		compareSelectionBy: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "compareSelectionBy",
				required: false
			}]
		}],
		csvSeparator: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "csvSeparator",
				required: false
			}]
		}],
		exportFilename: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "exportFilename",
				required: false
			}]
		}],
		filtersInput: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "filters",
				required: false
			}]
		}],
		globalFilterFields: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "globalFilterFields",
				required: false
			}]
		}],
		filterDelay: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "filterDelay",
				required: false
			}]
		}],
		filterLocale: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "filterLocale",
				required: false
			}]
		}],
		expandedRowKeysInput: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "expandedRowKeys",
				required: false
			}]
		}],
		editingRowKeysInput: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "editingRowKeys",
				required: false
			}]
		}],
		rowExpandMode: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "rowExpandMode",
				required: false
			}]
		}],
		scrollable: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "scrollable",
				required: false
			}]
		}],
		rowGroupMode: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "rowGroupMode",
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
		virtualScroll: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "virtualScroll",
				required: false
			}]
		}],
		virtualScrollItemSize: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "virtualScrollItemSize",
				required: false
			}]
		}],
		virtualScrollOptions: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "virtualScrollOptions",
				required: false
			}]
		}],
		virtualScrollDelay: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "virtualScrollDelay",
				required: false
			}]
		}],
		frozenWidth: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "frozenWidth",
				required: false
			}]
		}],
		contextMenu: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "contextMenu",
				required: false
			}]
		}],
		resizableColumns: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "resizableColumns",
				required: false
			}]
		}],
		columnResizeMode: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "columnResizeMode",
				required: false
			}]
		}],
		reorderableColumns: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "reorderableColumns",
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
		showLoader: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "showLoader",
				required: false
			}]
		}],
		rowHover: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "rowHover",
				required: false
			}]
		}],
		customSort: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "customSort",
				required: false
			}]
		}],
		showInitialSortBadge: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "showInitialSortBadge",
				required: false
			}]
		}],
		exportFunction: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "exportFunction",
				required: false
			}]
		}],
		exportHeader: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "exportHeader",
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
		stateStorage: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "stateStorage",
				required: false
			}]
		}],
		editMode: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "editMode",
				required: false
			}]
		}],
		groupRowsBy: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "groupRowsBy",
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
		showGridlines: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "showGridlines",
				required: false
			}]
		}],
		stripedRows: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "stripedRows",
				required: false
			}]
		}],
		groupRowsByOrder: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "groupRowsByOrder",
				required: false
			}]
		}],
		paginatorLocale: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "paginatorLocale",
				required: false
			}]
		}],
		valueInput: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "value",
				required: false
			}]
		}],
		columnsInput: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "columns",
				required: false
			}]
		}],
		first: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "first",
				required: false
			}]
		}, {
			type: Output,
			args: ["firstChange"]
		}],
		rows: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "rows",
				required: false
			}]
		}, {
			type: Output,
			args: ["rowsChange"]
		}],
		totalRecords: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "totalRecords",
				required: false
			}]
		}, {
			type: Output,
			args: ["totalRecordsChange"]
		}],
		sortFieldInput: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "sortField",
				required: false
			}]
		}],
		sortOrderInput: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "sortOrder",
				required: false
			}]
		}],
		multiSortMetaInput: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "multiSortMeta",
				required: false
			}]
		}],
		selection: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "selection",
				required: false
			}]
		}, {
			type: Output,
			args: ["selectionChange"]
		}],
		selectAllInput: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "selectAll",
				required: false
			}]
		}],
		selectAllChange: [{
			type: Output,
			args: ["selectAllChange"]
		}],
		onRowSelect: [{
			type: Output,
			args: ["onRowSelect"]
		}],
		onRowUnselect: [{
			type: Output,
			args: ["onRowUnselect"]
		}],
		onPage: [{
			type: Output,
			args: ["onPage"]
		}],
		onSort: [{
			type: Output,
			args: ["onSort"]
		}],
		onFilter: [{
			type: Output,
			args: ["onFilter"]
		}],
		onLazyLoad: [{
			type: Output,
			args: ["onLazyLoad"]
		}],
		onRowExpand: [{
			type: Output,
			args: ["onRowExpand"]
		}],
		onRowCollapse: [{
			type: Output,
			args: ["onRowCollapse"]
		}],
		onContextMenuSelect: [{
			type: Output,
			args: ["onContextMenuSelect"]
		}],
		onColResize: [{
			type: Output,
			args: ["onColResize"]
		}],
		onColReorder: [{
			type: Output,
			args: ["onColReorder"]
		}],
		onRowReorder: [{
			type: Output,
			args: ["onRowReorder"]
		}],
		onEditInit: [{
			type: Output,
			args: ["onEditInit"]
		}],
		onEditComplete: [{
			type: Output,
			args: ["onEditComplete"]
		}],
		onEditCancel: [{
			type: Output,
			args: ["onEditCancel"]
		}],
		onHeaderCheckboxToggle: [{
			type: Output,
			args: ["onHeaderCheckboxToggle"]
		}],
		sortFunction: [{
			type: Output,
			args: ["sortFunction"]
		}],
		onStateSave: [{
			type: Output,
			args: ["onStateSave"]
		}],
		onStateRestore: [{
			type: Output,
			args: ["onStateRestore"]
		}],
		resizeHelperViewChild: [{
			type: ViewChild,
			args: ["resizeHelper", { isSignal: true }]
		}],
		reorderIndicatorUpViewChild: [{
			type: ViewChild,
			args: ["reorderIndicatorUp", { isSignal: true }]
		}],
		reorderIndicatorDownViewChild: [{
			type: ViewChild,
			args: ["reorderIndicatorDown", { isSignal: true }]
		}],
		wrapperViewChild: [{
			type: ViewChild,
			args: ["wrapper", { isSignal: true }]
		}],
		tableViewChild: [{
			type: ViewChild,
			args: ["table", { isSignal: true }]
		}],
		tableHeaderViewChild: [{
			type: ViewChild,
			args: ["thead", { isSignal: true }]
		}],
		tableFooterViewChild: [{
			type: ViewChild,
			args: ["tfoot", { isSignal: true }]
		}],
		scroller: [{
			type: ViewChild,
			args: ["scroller", { isSignal: true }]
		}],
		headerTemplate: [{
			type: ContentChild,
			args: ["header", {
				descendants: false,
				isSignal: true
			}]
		}],
		headerGroupedTemplate: [{
			type: ContentChild,
			args: ["headergrouped", {
				descendants: false,
				isSignal: true
			}]
		}],
		bodyTemplate: [{
			type: ContentChild,
			args: ["body", {
				descendants: false,
				isSignal: true
			}]
		}],
		loadingBodyTemplate: [{
			type: ContentChild,
			args: ["loadingbody", {
				descendants: false,
				isSignal: true
			}]
		}],
		captionTemplate: [{
			type: ContentChild,
			args: ["caption", {
				descendants: false,
				isSignal: true
			}]
		}],
		footerTemplate: [{
			type: ContentChild,
			args: ["footer", {
				descendants: false,
				isSignal: true
			}]
		}],
		footerGroupedTemplate: [{
			type: ContentChild,
			args: ["footergrouped", {
				descendants: false,
				isSignal: true
			}]
		}],
		summaryTemplate: [{
			type: ContentChild,
			args: ["summary", {
				descendants: false,
				isSignal: true
			}]
		}],
		colGroupTemplate: [{
			type: ContentChild,
			args: ["colgroup", {
				descendants: false,
				isSignal: true
			}]
		}],
		expandedRowTemplate: [{
			type: ContentChild,
			args: ["expandedrow", {
				descendants: false,
				isSignal: true
			}]
		}],
		groupHeaderTemplate: [{
			type: ContentChild,
			args: ["groupheader", {
				descendants: false,
				isSignal: true
			}]
		}],
		groupFooterTemplate: [{
			type: ContentChild,
			args: ["groupfooter", {
				descendants: false,
				isSignal: true
			}]
		}],
		frozenExpandedRowTemplate: [{
			type: ContentChild,
			args: ["frozenexpandedrow", {
				descendants: false,
				isSignal: true
			}]
		}],
		frozenHeaderTemplate: [{
			type: ContentChild,
			args: ["frozenheader", {
				descendants: false,
				isSignal: true
			}]
		}],
		frozenBodyTemplate: [{
			type: ContentChild,
			args: ["frozenbody", {
				descendants: false,
				isSignal: true
			}]
		}],
		frozenFooterTemplate: [{
			type: ContentChild,
			args: ["frozenfooter", {
				descendants: false,
				isSignal: true
			}]
		}],
		frozenColGroupTemplate: [{
			type: ContentChild,
			args: ["frozencolgroup", {
				descendants: false,
				isSignal: true
			}]
		}],
		emptyMessageTemplate: [{
			type: ContentChild,
			args: ["emptymessage", {
				descendants: false,
				isSignal: true
			}]
		}],
		paginatorLeftTemplate: [{
			type: ContentChild,
			args: ["paginatorleft", {
				descendants: false,
				isSignal: true
			}]
		}],
		paginatorRightTemplate: [{
			type: ContentChild,
			args: ["paginatorright", {
				descendants: false,
				isSignal: true
			}]
		}],
		paginatorDropdownItemTemplate: [{
			type: ContentChild,
			args: ["paginatordropdownitem", {
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
		reorderIndicatorUpIconTemplate: [{
			type: ContentChild,
			args: ["reorderindicatorupicon", {
				descendants: false,
				isSignal: true
			}]
		}],
		reorderIndicatorDownIconTemplate: [{
			type: ContentChild,
			args: ["reorderindicatordownicon", {
				descendants: false,
				isSignal: true
			}]
		}],
		sortIconTemplate: [{
			type: ContentChild,
			args: ["sorticon", {
				descendants: false,
				isSignal: true
			}]
		}],
		checkboxIconTemplate: [{
			type: ContentChild,
			args: ["checkboxicon", {
				descendants: false,
				isSignal: true
			}]
		}],
		headerCheckboxIconTemplate: [{
			type: ContentChild,
			args: ["headercheckboxicon", {
				descendants: false,
				isSignal: true
			}]
		}],
		paginatorDropdownIconTemplate: [{
			type: ContentChild,
			args: ["paginatordropdownicon", {
				descendants: false,
				isSignal: true
			}]
		}],
		paginatorFirstPageLinkIconTemplate: [{
			type: ContentChild,
			args: ["paginatorfirstpagelinkicon", {
				descendants: false,
				isSignal: true
			}]
		}],
		paginatorLastPageLinkIconTemplate: [{
			type: ContentChild,
			args: ["paginatorlastpagelinkicon", {
				descendants: false,
				isSignal: true
			}]
		}],
		paginatorPreviousPageLinkIconTemplate: [{
			type: ContentChild,
			args: ["paginatorpreviouspagelinkicon", {
				descendants: false,
				isSignal: true
			}]
		}],
		paginatorNextPageLinkIconTemplate: [{
			type: ContentChild,
			args: ["paginatornextpagelinkicon", {
				descendants: false,
				isSignal: true
			}]
		}]
	});
})();
var FrozenColumn = (_FrozenColumn = class FrozenColumn extends BaseComponent {
	constructor() {
		super();
		_defineProperty(this, "frozen", input(true, ...ngDevMode ? [{ debugName: "frozen" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "alignFrozen", input("left", ...ngDevMode ? [{ debugName: "alignFrozen" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "resizeListener", void 0);
		_defineProperty(this, "resizeObserver", void 0);
		_defineProperty(this, "_componentStyle", inject(TableStyle));
		effect(() => {
			if (this.frozen() !== void 0) Promise.resolve(null).then(() => this.updateStickyPosition());
		});
	}
	onAfterViewInit() {
		this.bindResizeListener();
		this.observeChanges();
	}
	bindResizeListener() {
		if (isPlatformBrowser(this.platformId)) {
			if (!this.resizeListener) this.resizeListener = this.renderer.listen(this.document.defaultView, "resize", () => {
				this.recalculateColumns();
			});
		}
	}
	unbindResizeListener() {
		if (this.resizeListener) {
			this.resizeListener();
			this.resizeListener = null;
		}
	}
	observeChanges() {
		if (isPlatformBrowser(this.platformId)) {
			const resizeObserver = new ResizeObserver(() => {
				this.recalculateColumns();
			});
			resizeObserver.observe(this.el.nativeElement);
			this.resizeObserver = resizeObserver;
		}
	}
	recalculateColumns() {
		const siblings = DomHandler.siblings(this.el.nativeElement);
		const index = DomHandler.index(this.el.nativeElement);
		const time = (siblings.length - index + 1) * 50;
		setTimeout(() => {
			this.updateStickyPosition();
		}, time);
	}
	updateStickyPosition() {
		if (!this.frozen()) return;
		const cell = this.el.nativeElement;
		if (this.alignFrozen() === "right") {
			let right = 0;
			let sibling = cell.nextElementSibling;
			while (sibling) {
				right += DomHandler.getOuterWidth(sibling);
				sibling = sibling.nextElementSibling;
			}
			cell.style.right = right + "px";
		} else {
			let left = 0;
			let sibling = cell.previousElementSibling;
			while (sibling) {
				left += DomHandler.getOuterWidth(sibling);
				sibling = sibling.previousElementSibling;
			}
			cell.style.left = left + "px";
		}
	}
	onDestroy() {
		this.unbindResizeListener();
		if (this.resizeObserver) this.resizeObserver.disconnect();
	}
}, _defineProperty(_FrozenColumn, "ɵfac", function FrozenColumn_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _FrozenColumn)();
}), _defineProperty(_FrozenColumn, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _FrozenColumn,
	selectors: [[
		"",
		"pFrozenColumn",
		""
	]],
	hostVars: 2,
	hostBindings: function FrozenColumn_HostBindings(rf, ctx) {
		if (rf & 2) ɵɵclassMap(ctx.cx("frozenColumn"));
	},
	inputs: {
		frozen: [1, "frozen"],
		alignFrozen: [1, "alignFrozen"]
	},
	features: [ɵɵProvidersFeature([TableStyle]), ɵɵInheritDefinitionFeature]
})), _FrozenColumn);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FrozenColumn, [{
		type: Directive,
		args: [{
			selector: "[pFrozenColumn]",
			standalone: true,
			host: { "[class]": "cx(\"frozenColumn\")" },
			providers: [TableStyle]
		}]
	}], () => [], {
		frozen: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "frozen",
				required: false
			}]
		}],
		alignFrozen: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "alignFrozen",
				required: false
			}]
		}]
	});
})();
var EditableRow = (_EditableRow = class EditableRow extends BaseComponent {
	constructor(..._args2) {
		super(..._args2);
		_defineProperty(this, "data", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "data" } : /* istanbul ignore next */ {}), {}, { alias: "pEditableRow" })));
		_defineProperty(this, "pEditableRowDisabled", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "pEditableRowDisabled" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
	}
	isEnabled() {
		return this.pEditableRowDisabled() !== true;
	}
}, _defineProperty(_EditableRow, "ɵfac", /*@__PURE__*/ (() => {
	let ɵEditableRow_BaseFactory = void 0;
	return function EditableRow_Factory(__ngFactoryType__) {
		return (ɵEditableRow_BaseFactory || (ɵEditableRow_BaseFactory = ɵɵgetInheritedFactory(_EditableRow)))(__ngFactoryType__ || _EditableRow);
	};
})()), _defineProperty(_EditableRow, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _EditableRow,
	selectors: [[
		"",
		"pEditableRow",
		""
	]],
	inputs: {
		data: [
			1,
			"pEditableRow",
			"data"
		],
		pEditableRowDisabled: [1, "pEditableRowDisabled"]
	},
	features: [ɵɵInheritDefinitionFeature]
})), _EditableRow);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EditableRow, [{
		type: Directive,
		args: [{
			selector: "[pEditableRow]",
			standalone: true
		}]
	}], null, {
		data: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pEditableRow",
				required: false
			}]
		}],
		pEditableRowDisabled: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pEditableRowDisabled",
				required: false
			}]
		}]
	});
})();
var ReorderableRowHandle = (_ReorderableRowHandle = class ReorderableRowHandle extends BaseComponent {
	constructor(..._args3) {
		super(..._args3);
		_defineProperty(this, "hostName", "Table");
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		_defineProperty(this, "_componentStyle", inject(TableStyle));
		_defineProperty(this, "el", inject(ElementRef));
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.ptm("reorderableRowHandle"));
	}
	onAfterViewInit() {}
}, _defineProperty(_ReorderableRowHandle, "ɵfac", /*@__PURE__*/ (() => {
	let ɵReorderableRowHandle_BaseFactory = void 0;
	return function ReorderableRowHandle_Factory(__ngFactoryType__) {
		return (ɵReorderableRowHandle_BaseFactory || (ɵReorderableRowHandle_BaseFactory = ɵɵgetInheritedFactory(_ReorderableRowHandle)))(__ngFactoryType__ || _ReorderableRowHandle);
	};
})()), _defineProperty(_ReorderableRowHandle, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _ReorderableRowHandle,
	selectors: [[
		"",
		"pReorderableRowHandle",
		""
	]],
	hostVars: 2,
	hostBindings: function ReorderableRowHandle_HostBindings(rf, ctx) {
		if (rf & 2) ɵɵclassMap(ctx.cx("reorderableRowHandle"));
	},
	features: [
		ɵɵProvidersFeature([TableStyle]),
		ɵɵHostDirectivesFeature([Bind]),
		ɵɵInheritDefinitionFeature
	]
})), _ReorderableRowHandle);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReorderableRowHandle, [{
		type: Directive,
		args: [{
			selector: "[pReorderableRowHandle]",
			standalone: true,
			host: { "[class]": "cx('reorderableRowHandle')" },
			providers: [TableStyle],
			hostDirectives: [Bind]
		}]
	}], null, null);
})();
var RowGroupHeader = (_RowGroupHeader = class RowGroupHeader extends BaseComponent {
	constructor(..._args4) {
		super(..._args4);
		_defineProperty(this, "dataTable", inject(TABLE_INSTANCE));
		_defineProperty(this, "_componentStyle", inject(TableStyle));
	}
	get getFrozenRowGroupHeaderStickyPosition() {
		return this.dataTable.rowGroupHeaderStyleObject ? this.dataTable.rowGroupHeaderStyleObject.top : "";
	}
}, _defineProperty(_RowGroupHeader, "ɵfac", /*@__PURE__*/ (() => {
	let ɵRowGroupHeader_BaseFactory = void 0;
	return function RowGroupHeader_Factory(__ngFactoryType__) {
		return (ɵRowGroupHeader_BaseFactory || (ɵRowGroupHeader_BaseFactory = ɵɵgetInheritedFactory(_RowGroupHeader)))(__ngFactoryType__ || _RowGroupHeader);
	};
})()), _defineProperty(_RowGroupHeader, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _RowGroupHeader,
	selectors: [[
		"",
		"pRowGroupHeader",
		""
	]],
	hostVars: 4,
	hostBindings: function RowGroupHeader_HostBindings(rf, ctx) {
		if (rf & 2) {
			ɵɵstyleMap(ctx.sx("rowGroupHeader"));
			ɵɵclassMap(ctx.cx("rowGroupHeader"));
		}
	},
	features: [ɵɵProvidersFeature([TableStyle]), ɵɵInheritDefinitionFeature]
})), _RowGroupHeader);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RowGroupHeader, [{
		type: Directive,
		args: [{
			selector: "[pRowGroupHeader]",
			standalone: true,
			host: {
				"[class]": "cx(\"rowGroupHeader\")",
				"[style]": "sx(\"rowGroupHeader\")"
			},
			providers: [TableStyle]
		}]
	}], null, null);
})();
var RowToggler = (_RowToggler = class RowToggler extends BaseComponent {
	constructor(..._args5) {
		super(..._args5);
		_defineProperty(this, "data", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "data" } : /* istanbul ignore next */ {}), {}, { alias: "pRowToggler" })));
		_defineProperty(this, "pRowTogglerDisabled", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "pRowTogglerDisabled" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "dataTable", inject(TABLE_INSTANCE));
	}
	onClick(event) {
		if (this.isEnabled()) {
			this.dataTable.toggleRow(this.data(), event);
			event.preventDefault();
		}
	}
	isEnabled() {
		return this.pRowTogglerDisabled() !== true;
	}
}, _defineProperty(_RowToggler, "ɵfac", /*@__PURE__*/ (() => {
	let ɵRowToggler_BaseFactory = void 0;
	return function RowToggler_Factory(__ngFactoryType__) {
		return (ɵRowToggler_BaseFactory || (ɵRowToggler_BaseFactory = ɵɵgetInheritedFactory(_RowToggler)))(__ngFactoryType__ || _RowToggler);
	};
})()), _defineProperty(_RowToggler, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _RowToggler,
	selectors: [[
		"",
		"pRowToggler",
		""
	]],
	hostBindings: function RowToggler_HostBindings(rf, ctx) {
		if (rf & 1) ɵɵlistener("click", function RowToggler_click_HostBindingHandler($event) {
			return ctx.onClick($event);
		});
	},
	inputs: {
		data: [
			1,
			"pRowToggler",
			"data"
		],
		pRowTogglerDisabled: [1, "pRowTogglerDisabled"]
	},
	features: [ɵɵInheritDefinitionFeature]
})), _RowToggler);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RowToggler, [{
		type: Directive,
		args: [{
			selector: "[pRowToggler]",
			standalone: true
		}]
	}], null, {
		data: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pRowToggler",
				required: false
			}]
		}],
		pRowTogglerDisabled: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pRowTogglerDisabled",
				required: false
			}]
		}],
		onClick: [{
			type: HostListener,
			args: ["click", ["$event"]]
		}]
	});
})();
var SortableColumn = (_SortableColumn = class SortableColumn extends BaseComponent {
	constructor() {
		var _this$el$nativeElemen2;
		super();
		_defineProperty(this, "field", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "field" } : /* istanbul ignore next */ {}), {}, { alias: "pSortableColumn" })));
		_defineProperty(this, "pSortableColumnDisabled", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "pSortableColumnDisabled" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "role", ((_this$el$nativeElemen2 = this.el.nativeElement) === null || _this$el$nativeElemen2 === void 0 ? void 0 : _this$el$nativeElemen2.tagName) !== "TH" ? "columnheader" : null);
		_defineProperty(this, "sorted", signal(false, ...ngDevMode ? [{ debugName: "sorted" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "sortOrder", signal(0, ...ngDevMode ? [{ debugName: "sortOrder" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "$tabindex", computed(() => this.isEnabled() ? "0" : null, ...ngDevMode ? [{ debugName: "$tabindex" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "ariaSort", computed(() => {
			const sorted = this.sorted();
			const order = this.sortOrder();
			return sorted ? order === 1 ? "ascending" : "descending" : "none";
		}, ...ngDevMode ? [{ debugName: "ariaSort" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_componentStyle", inject(TableStyle));
		_defineProperty(this, "dataTable", inject(TABLE_INSTANCE));
		if (this.isEnabled()) this.dataTable.tableService.sortSource$.pipe(takeUntilDestroyed()).subscribe(() => {
			this.updateSortState();
		});
	}
	onInit() {
		if (this.isEnabled()) this.updateSortState();
	}
	updateSortState() {
		let sorted = false;
		let sortOrder = 0;
		if (this.dataTable.sortMode() === "single") {
			sorted = this.dataTable.isSorted(this.field());
			sortOrder = this.dataTable.sortOrder;
		} else if (this.dataTable.sortMode() === "multiple") {
			const sortMeta = this.dataTable.getSortMeta(this.field());
			sorted = !!sortMeta;
			sortOrder = sortMeta ? sortMeta.order : 0;
		}
		this.sorted.set(sorted);
		this.sortOrder.set(sortOrder);
	}
	onClick(event) {
		if (this.isEnabled() && !this.isFilterElement(event.target) && !this.isResizerElement(event.target)) {
			this.updateSortState();
			this.dataTable.sort({
				originalEvent: event,
				field: this.field()
			});
			DomHandler.clearSelection();
		}
	}
	onEnterKey(event) {
		this.onClick(event);
		event.preventDefault();
	}
	isEnabled() {
		return this.pSortableColumnDisabled() !== true;
	}
	isFilterElement(element) {
		var _element$parentElemen;
		return this.isFilterElementIconOrButton(element) || this.isFilterElementIconOrButton(element === null || element === void 0 || (_element$parentElemen = element.parentElement) === null || _element$parentElemen === void 0 ? void 0 : _element$parentElemen.parentElement);
	}
	isResizerElement(element) {
		var _element$getAttribute;
		return (element === null || element === void 0 || (_element$getAttribute = element.getAttribute) === null || _element$getAttribute === void 0 ? void 0 : _element$getAttribute.call(element, "data-pc-column-resizer")) === "true";
	}
	isFilterElementIconOrButton(element) {
		if (!element) return false;
		return it(element, "[data-pc-name=\"pccolumnfilterbutton\"]") || it(element, "[data-pc-section=\"columnfilterbuttonicon\"]");
	}
}, _defineProperty(_SortableColumn, "ɵfac", function SortableColumn_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _SortableColumn)();
}), _defineProperty(_SortableColumn, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _SortableColumn,
	selectors: [[
		"",
		"pSortableColumn",
		""
	]],
	hostAttrs: ["role", "columnheader"],
	hostVars: 4,
	hostBindings: function SortableColumn_HostBindings(rf, ctx) {
		if (rf & 1) ɵɵlistener("click", function SortableColumn_click_HostBindingHandler($event) {
			return ctx.onClick($event);
		})("keydown.space", function SortableColumn_keydown_space_HostBindingHandler($event) {
			return ctx.onEnterKey($event);
		})("keydown.enter", function SortableColumn_keydown_enter_HostBindingHandler($event) {
			return ctx.onEnterKey($event);
		});
		if (rf & 2) {
			ɵɵdomProperty("tabIndex", ctx.$tabindex());
			ɵɵattribute("aria-sort", ctx.ariaSort());
			ɵɵclassMap(ctx.cx("sortableColumn"));
		}
	},
	inputs: {
		field: [
			1,
			"pSortableColumn",
			"field"
		],
		pSortableColumnDisabled: [1, "pSortableColumnDisabled"]
	},
	features: [ɵɵProvidersFeature([TableStyle]), ɵɵInheritDefinitionFeature]
})), _SortableColumn);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SortableColumn, [{
		type: Directive,
		args: [{
			selector: "[pSortableColumn]",
			standalone: true,
			host: {
				"[class]": "cx('sortableColumn')",
				"[tabindex]": "$tabindex()",
				role: "columnheader",
				"[attr.aria-sort]": "ariaSort()"
			},
			providers: [TableStyle]
		}]
	}], () => [], {
		field: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pSortableColumn",
				required: false
			}]
		}],
		pSortableColumnDisabled: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pSortableColumnDisabled",
				required: false
			}]
		}],
		onClick: [{
			type: HostListener,
			args: ["click", ["$event"]]
		}],
		onEnterKey: [{
			type: HostListener,
			args: ["keydown.space", ["$event"]]
		}, {
			type: HostListener,
			args: ["keydown.enter", ["$event"]]
		}]
	});
})();
var SelectableRow = (_SelectableRow = class SelectableRow extends BaseComponent {
	constructor() {
		super();
		_defineProperty(this, "data", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "data" } : /* istanbul ignore next */ {}), {}, { alias: "pSelectableRow" })));
		_defineProperty(this, "index", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "index" } : /* istanbul ignore next */ {}), {}, { alias: "pSelectableRowIndex" })));
		_defineProperty(this, "pSelectableRowDisabled", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "pSelectableRowDisabled" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "selected", void 0);
		_defineProperty(this, "_componentStyle", inject(TableStyle));
		_defineProperty(this, "dataTable", inject(TABLE_INSTANCE));
		_defineProperty(this, "tableService", inject(TableService));
		if (this.isEnabled()) this.dataTable.tableService.selectionSource$.pipe(takeUntilDestroyed()).subscribe(() => {
			this.selected = this.dataTable.isSelected(this.data());
		});
	}
	setRowTabIndex() {
		if (this.dataTable.selectionMode() === "single" || this.dataTable.selectionMode() === "multiple") {
			const anchorIndex = this.dataTable.anchorRowIndex;
			return anchorIndex != null ? anchorIndex === this.index() ? 0 : -1 : 0;
		}
	}
	onInit() {
		if (this.isEnabled()) this.selected = this.dataTable.isSelected(this.data());
	}
	onClick(event) {
		if (this.isEnabled()) this.dataTable.handleRowClick({
			originalEvent: event,
			rowData: this.data(),
			rowIndex: this.index()
		});
	}
	onTouchEnd(event) {
		if (this.isEnabled()) this.dataTable.handleRowTouchEnd(event);
	}
	onKeyDown(event) {
		switch (event.code) {
			case "ArrowDown":
				this.onArrowDownKey(event);
				break;
			case "ArrowUp":
				this.onArrowUpKey(event);
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
			default: if (event.code === "KeyA" && (event.metaKey || event.ctrlKey) && this.dataTable.selectionMode() === "multiple") {
				const data = this.dataTable.dataToRender(this.dataTable.processedData);
				this.dataTable.selection.set([...data]);
				this.dataTable.selectRange(event, data.length - 1, true);
				event.preventDefault();
			}
		}
	}
	onArrowDownKey(event) {
		if (!this.isEnabled()) return;
		const row = event.currentTarget;
		const nextRow = this.findNextSelectableRow(row);
		if (nextRow) nextRow.focus();
		event.preventDefault();
	}
	onArrowUpKey(event) {
		if (!this.isEnabled()) return;
		const row = event.currentTarget;
		const prevRow = this.findPrevSelectableRow(row);
		if (prevRow) prevRow.focus();
		event.preventDefault();
	}
	onEnterKey(event) {
		if (!this.isEnabled()) return;
		this.dataTable.handleRowClick({
			originalEvent: event,
			rowData: this.data(),
			rowIndex: this.index()
		});
	}
	onEndKey(event) {
		const lastRow = this.findLastSelectableRow();
		if (lastRow) this.focusRowChange(this.el.nativeElement, lastRow);
		if (event.ctrlKey && event.shiftKey) {
			const data = this.dataTable.dataToRender(this.dataTable.rows());
			const lastSelectableRowIndex = DomHandler.getAttribute(lastRow, "index");
			this.dataTable.anchorRowIndex = lastSelectableRowIndex;
			this.dataTable.selection.set(data.slice(this.index() || 0, data.length));
			this.dataTable.selectRange(event, this.index() || 0);
		}
		event.preventDefault();
	}
	onHomeKey(event) {
		const firstRow = this.findFirstSelectableRow();
		if (firstRow) this.focusRowChange(this.el.nativeElement, firstRow);
		if (event.ctrlKey && event.shiftKey) {
			const data = this.dataTable.dataToRender(this.dataTable.rows());
			const firstSelectableRowIndex = DomHandler.getAttribute(firstRow, "index");
			this.dataTable.anchorRowIndex = this.dataTable.anchorRowIndex || firstSelectableRowIndex || 0;
			this.dataTable.selection.set(data.slice(0, (this.index() || 0) + 1));
			this.dataTable.selectRange(event, this.index() || 0);
		}
		event.preventDefault();
	}
	onSpaceKey(event) {
		if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement) return;
		else {
			this.onEnterKey(event);
			if (event.shiftKey && this.dataTable.selection() !== null) {
				const data = this.dataTable.dataToRender(this.dataTable.rows());
				let index;
				const sel = this.dataTable.selection();
				if (ObjectUtils.isNotEmpty(sel) && sel.length > 0) {
					let firstSelectedRowIndex, lastSelectedRowIndex;
					firstSelectedRowIndex = ObjectUtils.findIndexInList(sel[0], data);
					lastSelectedRowIndex = ObjectUtils.findIndexInList(sel[sel.length - 1], data);
					index = (this.index() || 0) <= firstSelectedRowIndex ? lastSelectedRowIndex : firstSelectedRowIndex;
				} else index = ObjectUtils.findIndexInList(sel, data);
				this.dataTable.anchorRowIndex = index || 0;
				this.dataTable.selection.set(index !== this.index() ? data.slice(Math.min(index || 0, this.index() || 0), Math.max(index || 0, this.index() || 0) + 1) : [this.data()]);
				this.dataTable.selectRange(event, this.index() || 0);
			}
			event.preventDefault();
		}
	}
	focusRowChange(firstFocusableRow, currentFocusedRow) {
		firstFocusableRow.tabIndex = "-1";
		currentFocusedRow.tabIndex = "0";
		DomHandler.focus(currentFocusedRow);
	}
	findLastSelectableRow() {
		const rows = DomHandler.find(this.dataTable.el.nativeElement, "[data-p-selectable-row=\"true\"]");
		return rows ? rows[rows.length - 1] : null;
	}
	findFirstSelectableRow() {
		return DomHandler.findSingle(this.dataTable.el.nativeElement, "[data-p-selectable-row=\"true\"]");
	}
	findNextSelectableRow(row) {
		let nextRow = row.nextElementSibling;
		if (nextRow) {
			if (ot(nextRow, "[data-p-selectable-row=\"true\"]")) return nextRow;
			else return this.findNextSelectableRow(nextRow);
		} else return null;
	}
	findPrevSelectableRow(row) {
		let prevRow = row.previousElementSibling;
		if (prevRow) {
			if (ot(prevRow, "[data-p-selectable-row=\"true\"]")) return prevRow;
			else return this.findPrevSelectableRow(prevRow);
		} else return null;
	}
	isEnabled() {
		return this.pSelectableRowDisabled() !== true;
	}
}, _defineProperty(_SelectableRow, "ɵfac", function SelectableRow_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _SelectableRow)();
}), _defineProperty(_SelectableRow, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _SelectableRow,
	selectors: [[
		"",
		"pSelectableRow",
		""
	]],
	hostVars: 4,
	hostBindings: function SelectableRow_HostBindings(rf, ctx) {
		if (rf & 1) ɵɵlistener("click", function SelectableRow_click_HostBindingHandler($event) {
			return ctx.onClick($event);
		})("touchend", function SelectableRow_touchend_HostBindingHandler($event) {
			return ctx.onTouchEnd($event);
		})("keydown", function SelectableRow_keydown_HostBindingHandler($event) {
			return ctx.onKeyDown($event);
		});
		if (rf & 2) {
			ɵɵdomProperty("tabIndex", ctx.setRowTabIndex());
			ɵɵattribute("data-p-selectable-row", true);
			ɵɵclassMap(ctx.cx("selectableRow"));
		}
	},
	inputs: {
		data: [
			1,
			"pSelectableRow",
			"data"
		],
		index: [
			1,
			"pSelectableRowIndex",
			"index"
		],
		pSelectableRowDisabled: [1, "pSelectableRowDisabled"]
	},
	features: [ɵɵProvidersFeature([TableStyle]), ɵɵInheritDefinitionFeature]
})), _SelectableRow);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectableRow, [{
		type: Directive,
		args: [{
			selector: "[pSelectableRow]",
			standalone: true,
			host: {
				"[class]": "cx('selectableRow')",
				"[tabindex]": "setRowTabIndex()",
				"[attr.data-p-selectable-row]": "true"
			},
			providers: [TableStyle]
		}]
	}], () => [], {
		data: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pSelectableRow",
				required: false
			}]
		}],
		index: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pSelectableRowIndex",
				required: false
			}]
		}],
		pSelectableRowDisabled: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pSelectableRowDisabled",
				required: false
			}]
		}],
		onClick: [{
			type: HostListener,
			args: ["click", ["$event"]]
		}],
		onTouchEnd: [{
			type: HostListener,
			args: ["touchend", ["$event"]]
		}],
		onKeyDown: [{
			type: HostListener,
			args: ["keydown", ["$event"]]
		}]
	});
})();
var SelectableRowDblClick = (_SelectableRowDblClick = class SelectableRowDblClick extends BaseComponent {
	constructor() {
		super();
		_defineProperty(this, "data", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "data" } : /* istanbul ignore next */ {}), {}, { alias: "pSelectableRowDblClick" })));
		_defineProperty(this, "index", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "index" } : /* istanbul ignore next */ {}), {}, { alias: "pSelectableRowIndex" })));
		_defineProperty(this, "pSelectableRowDisabled", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "pSelectableRowDisabled" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "selected", void 0);
		_defineProperty(this, "_componentStyle", inject(TableStyle));
		_defineProperty(this, "dataTable", inject(TABLE_INSTANCE));
		_defineProperty(this, "tableService", inject(TableService));
		if (this.isEnabled()) this.dataTable.tableService.selectionSource$.pipe(takeUntilDestroyed()).subscribe(() => {
			this.selected = this.dataTable.isSelected(this.data());
		});
	}
	onInit() {
		if (this.isEnabled()) this.selected = this.dataTable.isSelected(this.data());
	}
	onClick(event) {
		if (this.isEnabled()) this.dataTable.handleRowClick({
			originalEvent: event,
			rowData: this.data(),
			rowIndex: this.index()
		});
	}
	isEnabled() {
		return this.pSelectableRowDisabled() !== true;
	}
}, _defineProperty(_SelectableRowDblClick, "ɵfac", function SelectableRowDblClick_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _SelectableRowDblClick)();
}), _defineProperty(_SelectableRowDblClick, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _SelectableRowDblClick,
	selectors: [[
		"",
		"pSelectableRowDblClick",
		""
	]],
	hostVars: 2,
	hostBindings: function SelectableRowDblClick_HostBindings(rf, ctx) {
		if (rf & 1) ɵɵlistener("dblclick", function SelectableRowDblClick_dblclick_HostBindingHandler($event) {
			return ctx.onClick($event);
		});
		if (rf & 2) ɵɵclassMap(ctx.cx("selectableRow"));
	},
	inputs: {
		data: [
			1,
			"pSelectableRowDblClick",
			"data"
		],
		index: [
			1,
			"pSelectableRowIndex",
			"index"
		],
		pSelectableRowDisabled: [1, "pSelectableRowDisabled"]
	},
	features: [ɵɵProvidersFeature([TableStyle]), ɵɵInheritDefinitionFeature]
})), _SelectableRowDblClick);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SelectableRowDblClick, [{
		type: Directive,
		args: [{
			selector: "[pSelectableRowDblClick]",
			standalone: true,
			host: { "[class]": "cx(\"selectableRow\")" },
			providers: [TableStyle]
		}]
	}], () => [], {
		data: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pSelectableRowDblClick",
				required: false
			}]
		}],
		index: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pSelectableRowIndex",
				required: false
			}]
		}],
		pSelectableRowDisabled: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pSelectableRowDisabled",
				required: false
			}]
		}],
		onClick: [{
			type: HostListener,
			args: ["dblclick", ["$event"]]
		}]
	});
})();
var ContextMenuRow = (_ContextMenuRow = class ContextMenuRow extends BaseComponent {
	constructor() {
		super();
		_defineProperty(this, "data", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "data" } : /* istanbul ignore next */ {}), {}, { alias: "pContextMenuRow" })));
		_defineProperty(this, "index", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "index" } : /* istanbul ignore next */ {}), {}, { alias: "pContextMenuRowIndex" })));
		_defineProperty(this, "pContextMenuRowDisabled", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "pContextMenuRowDisabled" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "selected", void 0);
		_defineProperty(this, "_componentStyle", inject(TableStyle));
		_defineProperty(this, "dataTable", inject(TABLE_INSTANCE));
		_defineProperty(this, "tableService", inject(TableService));
		if (this.isEnabled()) this.dataTable.tableService.contextMenuSource$.pipe(takeUntilDestroyed()).subscribe((data) => {
			this.selected = data ? this.dataTable.equals(this.data(), data) : false;
		});
	}
	onContextMenu(event) {
		if (this.isEnabled()) {
			this.dataTable.handleRowRightClick({
				originalEvent: event,
				rowData: this.data(),
				rowIndex: this.index()
			});
			this.el.nativeElement.focus();
			event.preventDefault();
		}
	}
	isEnabled() {
		return this.pContextMenuRowDisabled() !== true;
	}
}, _defineProperty(_ContextMenuRow, "ɵfac", function ContextMenuRow_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _ContextMenuRow)();
}), _defineProperty(_ContextMenuRow, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _ContextMenuRow,
	selectors: [[
		"",
		"pContextMenuRow",
		""
	]],
	hostVars: 3,
	hostBindings: function ContextMenuRow_HostBindings(rf, ctx) {
		if (rf & 1) ɵɵlistener("contextmenu", function ContextMenuRow_contextmenu_HostBindingHandler($event) {
			return ctx.onContextMenu($event);
		});
		if (rf & 2) {
			ɵɵattribute("tabindex", ctx.isEnabled() ? 0 : void 0);
			ɵɵclassMap(ctx.cx("contextMenuRowSelected"));
		}
	},
	inputs: {
		data: [
			1,
			"pContextMenuRow",
			"data"
		],
		index: [
			1,
			"pContextMenuRowIndex",
			"index"
		],
		pContextMenuRowDisabled: [1, "pContextMenuRowDisabled"]
	},
	features: [ɵɵProvidersFeature([TableStyle]), ɵɵInheritDefinitionFeature]
})), _ContextMenuRow);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContextMenuRow, [{
		type: Directive,
		args: [{
			selector: "[pContextMenuRow]",
			standalone: true,
			host: {
				"[class]": "cx(\"contextMenuRowSelected\")",
				"[attr.tabindex]": "isEnabled() ? 0 : undefined"
			},
			providers: [TableStyle]
		}]
	}], () => [], {
		data: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pContextMenuRow",
				required: false
			}]
		}],
		index: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pContextMenuRowIndex",
				required: false
			}]
		}],
		pContextMenuRowDisabled: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pContextMenuRowDisabled",
				required: false
			}]
		}],
		onContextMenu: [{
			type: HostListener,
			args: ["contextmenu", ["$event"]]
		}]
	});
})();
var ResizableColumn = (_ResizableColumn = class ResizableColumn extends BaseComponent {
	constructor(..._args6) {
		super(..._args6);
		_defineProperty(this, "pResizableColumnDisabled", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "pResizableColumnDisabled" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "resizer", void 0);
		_defineProperty(this, "resizerMouseDownListener", void 0);
		_defineProperty(this, "resizerTouchStartListener", void 0);
		_defineProperty(this, "resizerTouchMoveListener", void 0);
		_defineProperty(this, "resizerTouchEndListener", void 0);
		_defineProperty(this, "documentMouseMoveListener", void 0);
		_defineProperty(this, "documentMouseUpListener", void 0);
		_defineProperty(this, "_componentStyle", inject(TableStyle));
		_defineProperty(this, "dataTable", inject(TABLE_INSTANCE));
	}
	onAfterViewInit() {
		if (isPlatformBrowser(this.platformId)) {
			if (this.isEnabled()) {
				this.resizer = this.renderer.createElement("span");
				be(this.resizer, "data-pc-column-resizer", "true");
				if (!this.$unstyled()) this.renderer.addClass(this.resizer, this.pcn("p-datatable-column-resizer"));
				this.renderer.appendChild(this.el.nativeElement, this.resizer);
				this.resizerMouseDownListener = this.renderer.listen(this.resizer, "mousedown", this.onMouseDown.bind(this));
				this.resizerTouchStartListener = this.renderer.listen(this.resizer, "touchstart", this.onTouchStart.bind(this));
			}
		}
	}
	bindDocumentEvents() {
		this.documentMouseMoveListener = this.renderer.listen(this.document, "mousemove", this.onDocumentMouseMove.bind(this));
		this.documentMouseUpListener = this.renderer.listen(this.document, "mouseup", this.onDocumentMouseUp.bind(this));
		this.resizerTouchMoveListener = this.renderer.listen(this.resizer, "touchmove", this.onTouchMove.bind(this));
		this.resizerTouchEndListener = this.renderer.listen(this.resizer, "touchend", this.onTouchEnd.bind(this));
	}
	unbindDocumentEvents() {
		if (this.documentMouseMoveListener) {
			this.documentMouseMoveListener();
			this.documentMouseMoveListener = null;
		}
		if (this.documentMouseUpListener) {
			this.documentMouseUpListener();
			this.documentMouseUpListener = null;
		}
		if (this.resizerTouchMoveListener) {
			this.resizerTouchMoveListener();
			this.resizerTouchMoveListener = null;
		}
		if (this.resizerTouchEndListener) {
			this.resizerTouchEndListener();
			this.resizerTouchEndListener = null;
		}
	}
	onMouseDown(event) {
		this.dataTable.onColumnResizeBegin(event);
		this.bindDocumentEvents();
	}
	onTouchStart(event) {
		this.dataTable.onColumnResizeBegin(event);
		this.bindDocumentEvents();
	}
	onTouchMove(event) {
		this.dataTable.onColumnResize(event);
	}
	onDocumentMouseMove(event) {
		this.dataTable.onColumnResize(event);
	}
	onDocumentMouseUp(event) {
		this.dataTable.onColumnResizeEnd();
		this.unbindDocumentEvents();
	}
	onTouchEnd(event) {
		this.dataTable.onColumnResizeEnd();
		this.unbindDocumentEvents();
	}
	isEnabled() {
		return this.pResizableColumnDisabled() !== true;
	}
	onDestroy() {
		if (this.resizerMouseDownListener) {
			this.resizerMouseDownListener();
			this.resizerMouseDownListener = null;
		}
		this.unbindDocumentEvents();
	}
}, _defineProperty(_ResizableColumn, "ɵfac", /*@__PURE__*/ (() => {
	let ɵResizableColumn_BaseFactory = void 0;
	return function ResizableColumn_Factory(__ngFactoryType__) {
		return (ɵResizableColumn_BaseFactory || (ɵResizableColumn_BaseFactory = ɵɵgetInheritedFactory(_ResizableColumn)))(__ngFactoryType__ || _ResizableColumn);
	};
})()), _defineProperty(_ResizableColumn, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _ResizableColumn,
	selectors: [[
		"",
		"pResizableColumn",
		""
	]],
	hostVars: 2,
	hostBindings: function ResizableColumn_HostBindings(rf, ctx) {
		if (rf & 2) ɵɵclassMap(ctx.cx("resizableColumn"));
	},
	inputs: { pResizableColumnDisabled: [1, "pResizableColumnDisabled"] },
	features: [ɵɵProvidersFeature([TableStyle]), ɵɵInheritDefinitionFeature]
})), _ResizableColumn);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ResizableColumn, [{
		type: Directive,
		args: [{
			selector: "[pResizableColumn]",
			standalone: true,
			host: { "[class]": "cx('resizableColumn')" },
			providers: [TableStyle]
		}]
	}], null, { pResizableColumnDisabled: [{
		type: Input,
		args: [{
			isSignal: true,
			alias: "pResizableColumnDisabled",
			required: false
		}]
	}] });
})();
var ReorderableColumn = (_ReorderableColumn = class ReorderableColumn extends BaseComponent {
	constructor(..._args7) {
		super(..._args7);
		_defineProperty(this, "pReorderableColumnDisabled", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "pReorderableColumnDisabled" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "dragStartListener", void 0);
		_defineProperty(this, "dragOverListener", void 0);
		_defineProperty(this, "dragEnterListener", void 0);
		_defineProperty(this, "dragLeaveListener", void 0);
		_defineProperty(this, "dragEndListener", void 0);
		_defineProperty(this, "mouseDownListener", void 0);
		_defineProperty(this, "_componentStyle", inject(TableStyle));
		_defineProperty(this, "dataTable", inject(TABLE_INSTANCE));
	}
	onAfterViewInit() {
		if (this.isEnabled()) this.bindEvents();
	}
	bindEvents() {
		if (isPlatformBrowser(this.platformId)) {
			this.mouseDownListener = this.renderer.listen(this.el.nativeElement, "mousedown", this.onMouseDown.bind(this));
			this.dragStartListener = this.renderer.listen(this.el.nativeElement, "dragstart", this.onDragStart.bind(this));
			this.dragOverListener = this.renderer.listen(this.el.nativeElement, "dragover", this.onDragOver.bind(this));
			this.dragEnterListener = this.renderer.listen(this.el.nativeElement, "dragenter", this.onDragEnter.bind(this));
			this.dragLeaveListener = this.renderer.listen(this.el.nativeElement, "dragleave", this.onDragLeave.bind(this));
			this.dragEndListener = this.renderer.listen(this.el.nativeElement, "dragend", this.onDragEnd.bind(this));
		}
	}
	unbindEvents() {
		if (this.mouseDownListener) {
			this.mouseDownListener();
			this.mouseDownListener = null;
		}
		if (this.dragStartListener) {
			this.dragStartListener();
			this.dragStartListener = null;
		}
		if (this.dragOverListener) {
			this.dragOverListener();
			this.dragOverListener = null;
		}
		if (this.dragEnterListener) {
			this.dragEnterListener();
			this.dragEnterListener = null;
		}
		if (this.dragLeaveListener) {
			this.dragLeaveListener();
			this.dragLeaveListener = null;
		}
		if (this.dragEndListener) {
			this.dragEndListener();
			this.dragEndListener = null;
		}
	}
	onMouseDown(event) {
		if (event.target.nodeName === "INPUT" || event.target.nodeName === "TEXTAREA" || nt(event.target, "[data-pc-column-resizer=\"true\"]")) this.el.nativeElement.draggable = false;
		else this.el.nativeElement.draggable = true;
	}
	onDragStart(event) {
		this.dataTable.onColumnDragStart(event, this.el.nativeElement);
	}
	onDragOver(event) {
		this.dataTable.onColumnDragOver(event, this.el.nativeElement);
	}
	onDragEnter(event) {
		this.dataTable.onColumnDragEnter(event, this.el.nativeElement);
	}
	onDragLeave(event) {
		this.dataTable.onColumnDragLeave(event);
	}
	onDragEnd(event) {
		this.dataTable.onColumnDragEnd(event);
	}
	onDrop(event) {
		if (this.isEnabled()) this.dataTable.onColumnDrop(event, this.el.nativeElement);
	}
	isEnabled() {
		return this.pReorderableColumnDisabled() !== true;
	}
	onDestroy() {
		this.unbindEvents();
	}
}, _defineProperty(_ReorderableColumn, "ɵfac", /*@__PURE__*/ (() => {
	let ɵReorderableColumn_BaseFactory = void 0;
	return function ReorderableColumn_Factory(__ngFactoryType__) {
		return (ɵReorderableColumn_BaseFactory || (ɵReorderableColumn_BaseFactory = ɵɵgetInheritedFactory(_ReorderableColumn)))(__ngFactoryType__ || _ReorderableColumn);
	};
})()), _defineProperty(_ReorderableColumn, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _ReorderableColumn,
	selectors: [[
		"",
		"pReorderableColumn",
		""
	]],
	hostVars: 2,
	hostBindings: function ReorderableColumn_HostBindings(rf, ctx) {
		if (rf & 1) ɵɵlistener("drop", function ReorderableColumn_drop_HostBindingHandler($event) {
			return ctx.onDrop($event);
		});
		if (rf & 2) ɵɵclassMap(ctx.cx("reorderableColumn"));
	},
	inputs: { pReorderableColumnDisabled: [1, "pReorderableColumnDisabled"] },
	features: [ɵɵProvidersFeature([TableStyle]), ɵɵInheritDefinitionFeature]
})), _ReorderableColumn);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReorderableColumn, [{
		type: Directive,
		args: [{
			selector: "[pReorderableColumn]",
			standalone: true,
			host: { "[class]": "cx('reorderableColumn')" },
			providers: [TableStyle]
		}]
	}], null, {
		pReorderableColumnDisabled: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pReorderableColumnDisabled",
				required: false
			}]
		}],
		onDrop: [{
			type: HostListener,
			args: ["drop", ["$event"]]
		}]
	});
})();
var EditableColumn = (_EditableColumn = class EditableColumn extends BaseComponent {
	constructor() {
		super();
		_defineProperty(this, "data", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "data" } : /* istanbul ignore next */ {}), {}, { alias: "pEditableColumn" })));
		_defineProperty(this, "field", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "field" } : /* istanbul ignore next */ {}), {}, { alias: "pEditableColumnField" })));
		_defineProperty(this, "rowIndex", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "rowIndex" } : /* istanbul ignore next */ {}), {}, { alias: "pEditableColumnRowIndex" })));
		_defineProperty(this, "pEditableColumnDisabled", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "pEditableColumnDisabled" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "pFocusCellSelector", input(...ngDevMode ? [void 0, { debugName: "pFocusCellSelector" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "overlayEventListener", void 0);
		_defineProperty(this, "dataTable", inject(TABLE_INSTANCE));
		_defineProperty(this, "initialized", false);
		_defineProperty(this, "originalCellValue", void 0);
		effect(() => {
			const data = this.data();
			untracked(() => {
				if (this.el.nativeElement && this.initialized && this.dataTable.editingCell === this.el.nativeElement) this.dataTable.updateEditingCell(this.el.nativeElement, data, this.field(), this.rowIndex());
				this.initialized = true;
			});
		});
	}
	onAfterViewInit() {
		if (this.isEnabled()) {
			if (!this.$unstyled()) DomHandler.addClass(this.el.nativeElement, this.pcn("p-editable-column"));
		}
	}
	onClick(event) {
		if (this.isEnabled()) {
			this.dataTable.selfClick = true;
			if (this.dataTable.editingCell) {
				if (this.dataTable.editingCell !== this.el.nativeElement) {
					if (!this.dataTable.isEditingCellValid()) return;
					this.closeEditingCell(true, event);
					this.openCell();
				}
			} else this.openCell();
		}
	}
	openCell() {
		const editingRow = this.resolveEditingRow();
		const field = this.field();
		this.originalCellValue = editingRow && field != null ? editingRow[field] : this.data();
		this.dataTable.updateEditingCell(this.el.nativeElement, this.data(), this.field(), this.rowIndex());
		if (!this.$unstyled()) DomHandler.addClass(this.el.nativeElement, this.pcn("p-cell-editing"));
		be(this.el.nativeElement, "data-p-cell-editing", "true");
		this.dataTable.onEditInit.emit({
			field: this.field(),
			data: this.data(),
			index: this.rowIndex()
		});
		setTimeout(() => {
			let focusCellSelector = this.pFocusCellSelector() || "input, textarea, select, [tabindex]:not([tabindex=\"-1\"])";
			let focusableElement = DomHandler.findSingle(this.el.nativeElement, focusCellSelector);
			if (focusableElement) focusableElement.focus();
		}, 50);
		this.overlayEventListener = (e) => {
			if (this.el && this.el.nativeElement.contains(e.target)) this.dataTable.selfClick = true;
		};
		this.dataTable.overlaySubscription = this.dataTable.overlayService.clickObservable.subscribe(this.overlayEventListener);
	}
	closeEditingCell(completed, event) {
		const eventData = {
			field: this.dataTable.editingCellField,
			data: this.dataTable.editingCellData,
			originalEvent: event,
			index: this.dataTable.editingCellRowIndex
		};
		if (completed) this.dataTable.onEditComplete.emit(eventData);
		else {
			this.dataTable.onEditCancel.emit(eventData);
			const editingField = this.dataTable.editingCellField;
			const editingRow = this.resolveEditingRow();
			if (editingRow && editingField != null) editingRow[editingField] = this.originalCellValue;
		}
		this.originalCellValue = void 0;
		if (!this.$unstyled()) DomHandler.removeClass(this.dataTable.editingCell, this.pcn("p-cell-editing"));
		be(this.el.nativeElement, "data-p-cell-editing", "false");
		this.dataTable.editingCell = null;
		this.dataTable.editingCellData = null;
		this.dataTable.editingCellField = null;
		this.dataTable.unbindDocumentEditListener();
		if (this.dataTable.overlaySubscription) this.dataTable.overlaySubscription.unsubscribe();
	}
	resolveEditingRow() {
		const rows = this.dataTable.value;
		const data = this.data();
		if (data && typeof data === "object") return data;
		const rowIndex = this.rowIndex();
		if (typeof rowIndex === "number" && (rows === null || rows === void 0 ? void 0 : rows[rowIndex])) return rows[rowIndex];
		const field = this.field();
		if (field != null) return rows === null || rows === void 0 ? void 0 : rows.find((element) => element[field] === data);
	}
	onEnterKeyDown(event) {
		const keyboardEvent = event;
		if (this.isEnabled() && !keyboardEvent.shiftKey) {
			if (this.dataTable.isEditingCellValid()) this.closeEditingCell(true, event);
			event.preventDefault();
		}
	}
	onTabKeyDown(event) {
		if (this.isEnabled()) {
			if (this.dataTable.isEditingCellValid()) this.closeEditingCell(true, event);
			event.preventDefault();
		}
	}
	onEscapeKeyDown(event) {
		if (this.isEnabled()) {
			if (this.dataTable.isEditingCellValid()) this.closeEditingCell(false, event);
			event.preventDefault();
		}
	}
	onShiftKeyDown(event) {
		if (this.isEnabled()) {
			if (event.shiftKey) this.moveToPreviousCell(event);
			else this.moveToNextCell(event);
		}
	}
	onArrowDown(event) {
		if (this.isEnabled()) {
			let currentCell = this.findCell(event.target);
			if (currentCell) {
				let cellIndex = DomHandler.index(currentCell);
				let targetCell = this.findNextEditableColumnByIndex(currentCell, cellIndex);
				if (targetCell) {
					if (this.dataTable.isEditingCellValid()) this.closeEditingCell(true, event);
					DomHandler.invokeElementMethod(event.target, "blur");
					DomHandler.invokeElementMethod(targetCell, "click");
				}
				event.preventDefault();
			}
		}
	}
	onArrowUp(event) {
		if (this.isEnabled()) {
			let currentCell = this.findCell(event.target);
			if (currentCell) {
				let cellIndex = DomHandler.index(currentCell);
				let targetCell = this.findPrevEditableColumnByIndex(currentCell, cellIndex);
				if (targetCell) {
					if (this.dataTable.isEditingCellValid()) this.closeEditingCell(true, event);
					DomHandler.invokeElementMethod(event.target, "blur");
					DomHandler.invokeElementMethod(targetCell, "click");
				}
				event.preventDefault();
			}
		}
	}
	onArrowLeft(event) {
		if (this.isEnabled()) this.moveToPreviousCell(event);
	}
	onArrowRight(event) {
		if (this.isEnabled()) this.moveToNextCell(event);
	}
	findCell(element) {
		if (element) {
			let cell = element;
			while (cell && !nt(cell, "[data-p-cell-editing=\"true\"]")) cell = cell.parentElement;
			return cell;
		} else return null;
	}
	moveToPreviousCell(event) {
		let currentCell = this.findCell(event.target);
		if (currentCell) {
			let targetCell = this.findPreviousEditableColumn(currentCell);
			if (targetCell) {
				if (this.dataTable.isEditingCellValid()) this.closeEditingCell(true, event);
				DomHandler.invokeElementMethod(event.target, "blur");
				DomHandler.invokeElementMethod(targetCell, "click");
				event.preventDefault();
			}
		}
	}
	moveToNextCell(event) {
		let currentCell = this.findCell(event.target);
		if (currentCell) {
			let targetCell = this.findNextEditableColumn(currentCell);
			if (targetCell) {
				if (this.dataTable.isEditingCellValid()) this.closeEditingCell(true, event);
				DomHandler.invokeElementMethod(event.target, "blur");
				DomHandler.invokeElementMethod(targetCell, "click");
				event.preventDefault();
			} else if (this.dataTable.isEditingCellValid()) this.closeEditingCell(true, event);
		}
	}
	findPreviousEditableColumn(cell) {
		let prevCell = cell.previousElementSibling;
		if (!prevCell) {
			var _cell$parentElement;
			let previousRow = (_cell$parentElement = cell.parentElement) === null || _cell$parentElement === void 0 ? void 0 : _cell$parentElement.previousElementSibling;
			if (previousRow) prevCell = previousRow.lastElementChild;
		}
		if (prevCell) {
			if (nt(prevCell, "[data-p-editable-column=\"true\"]")) return prevCell;
			else return this.findPreviousEditableColumn(prevCell);
		} else return null;
	}
	findNextEditableColumn(cell) {
		let nextCell = cell.nextElementSibling;
		if (!nextCell) {
			var _cell$parentElement2;
			let nextRow = (_cell$parentElement2 = cell.parentElement) === null || _cell$parentElement2 === void 0 ? void 0 : _cell$parentElement2.nextElementSibling;
			if (nextRow) nextCell = nextRow.firstElementChild;
		}
		if (nextCell) {
			if (nt(nextCell, "[data-p-editable-column=\"true\"]")) return nextCell;
			else return this.findNextEditableColumn(nextCell);
		} else return null;
	}
	findNextEditableColumnByIndex(cell, index) {
		var _cell$parentElement3;
		let nextRow = (_cell$parentElement3 = cell.parentElement) === null || _cell$parentElement3 === void 0 ? void 0 : _cell$parentElement3.nextElementSibling;
		if (nextRow) {
			let nextCell = nextRow.children[index];
			if (nextCell && nt(nextCell, "[data-p-editable-column=\"true\"]")) return nextCell;
			return null;
		} else return null;
	}
	findPrevEditableColumnByIndex(cell, index) {
		var _cell$parentElement4;
		let prevRow = (_cell$parentElement4 = cell.parentElement) === null || _cell$parentElement4 === void 0 ? void 0 : _cell$parentElement4.previousElementSibling;
		if (prevRow) {
			let prevCell = prevRow.children[index];
			if (prevCell && nt(prevCell, "[data-p-editable-column=\"true\"]")) return prevCell;
			return null;
		} else return null;
	}
	isEnabled() {
		return this.pEditableColumnDisabled() !== true;
	}
	onDestroy() {
		if (this.dataTable.overlaySubscription) this.dataTable.overlaySubscription.unsubscribe();
	}
}, _defineProperty(_EditableColumn, "ɵfac", function EditableColumn_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _EditableColumn)();
}), _defineProperty(_EditableColumn, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _EditableColumn,
	selectors: [[
		"",
		"pEditableColumn",
		""
	]],
	hostVars: 1,
	hostBindings: function EditableColumn_HostBindings(rf, ctx) {
		if (rf & 1) ɵɵlistener("click", function EditableColumn_click_HostBindingHandler($event) {
			return ctx.onClick($event);
		})("keydown.enter", function EditableColumn_keydown_enter_HostBindingHandler($event) {
			return ctx.onEnterKeyDown($event);
		})("keydown.tab", function EditableColumn_keydown_tab_HostBindingHandler($event) {
			return ctx.onShiftKeyDown($event);
		})("keydown.escape", function EditableColumn_keydown_escape_HostBindingHandler($event) {
			return ctx.onEscapeKeyDown($event);
		})("keydown.shift.tab", function EditableColumn_keydown_shift_tab_HostBindingHandler($event) {
			return ctx.onShiftKeyDown($event);
		})("keydown.meta.tab", function EditableColumn_keydown_meta_tab_HostBindingHandler($event) {
			return ctx.onShiftKeyDown($event);
		})("keydown.arrowdown", function EditableColumn_keydown_arrowdown_HostBindingHandler($event) {
			return ctx.onArrowDown($event);
		})("keydown.arrowup", function EditableColumn_keydown_arrowup_HostBindingHandler($event) {
			return ctx.onArrowUp($event);
		})("keydown.arrowleft", function EditableColumn_keydown_arrowleft_HostBindingHandler($event) {
			return ctx.onArrowLeft($event);
		})("keydown.arrowright", function EditableColumn_keydown_arrowright_HostBindingHandler($event) {
			return ctx.onArrowRight($event);
		});
		if (rf & 2) ɵɵattribute("data-p-editable-column", true);
	},
	inputs: {
		data: [
			1,
			"pEditableColumn",
			"data"
		],
		field: [
			1,
			"pEditableColumnField",
			"field"
		],
		rowIndex: [
			1,
			"pEditableColumnRowIndex",
			"rowIndex"
		],
		pEditableColumnDisabled: [1, "pEditableColumnDisabled"],
		pFocusCellSelector: [1, "pFocusCellSelector"]
	},
	features: [ɵɵInheritDefinitionFeature]
})), _EditableColumn);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EditableColumn, [{
		type: Directive,
		args: [{
			selector: "[pEditableColumn]",
			standalone: true,
			host: { "[attr.data-p-editable-column]": "true" }
		}]
	}], () => [], {
		data: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pEditableColumn",
				required: false
			}]
		}],
		field: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pEditableColumnField",
				required: false
			}]
		}],
		rowIndex: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pEditableColumnRowIndex",
				required: false
			}]
		}],
		pEditableColumnDisabled: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pEditableColumnDisabled",
				required: false
			}]
		}],
		pFocusCellSelector: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pFocusCellSelector",
				required: false
			}]
		}],
		onClick: [{
			type: HostListener,
			args: ["click", ["$event"]]
		}],
		onEnterKeyDown: [{
			type: HostListener,
			args: ["keydown.enter", ["$event"]]
		}],
		onTabKeyDown: [{
			type: HostListener,
			args: ["keydown.tab", ["$event"]]
		}],
		onEscapeKeyDown: [{
			type: HostListener,
			args: ["keydown.escape", ["$event"]]
		}],
		onShiftKeyDown: [
			{
				type: HostListener,
				args: ["keydown.tab", ["$event"]]
			},
			{
				type: HostListener,
				args: ["keydown.shift.tab", ["$event"]]
			},
			{
				type: HostListener,
				args: ["keydown.meta.tab", ["$event"]]
			}
		],
		onArrowDown: [{
			type: HostListener,
			args: ["keydown.arrowdown", ["$event"]]
		}],
		onArrowUp: [{
			type: HostListener,
			args: ["keydown.arrowup", ["$event"]]
		}],
		onArrowLeft: [{
			type: HostListener,
			args: ["keydown.arrowleft", ["$event"]]
		}],
		onArrowRight: [{
			type: HostListener,
			args: ["keydown.arrowright", ["$event"]]
		}]
	});
})();
var ReorderableRow = (_ReorderableRow = class ReorderableRow extends BaseComponent {
	constructor(..._args8) {
		super(..._args8);
		_defineProperty(this, "hostName", "Table");
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		_defineProperty(this, "index", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "index" } : /* istanbul ignore next */ {}), {}, { alias: "pReorderableRow" })));
		_defineProperty(this, "pReorderableRowDisabled", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "pReorderableRowDisabled" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "mouseDownListener", void 0);
		_defineProperty(this, "dragStartListener", void 0);
		_defineProperty(this, "dragEndListener", void 0);
		_defineProperty(this, "dragOverListener", void 0);
		_defineProperty(this, "dragLeaveListener", void 0);
		_defineProperty(this, "dropListener", void 0);
		_defineProperty(this, "dataTable", inject(TABLE_INSTANCE));
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.ptm("reorderableRow"));
	}
	onAfterViewInit() {
		if (this.isEnabled()) {
			this.el.nativeElement.droppable = true;
			this.bindEvents();
		}
	}
	bindEvents() {
		this.mouseDownListener = this.renderer.listen(this.el.nativeElement, "mousedown", this.onMouseDown.bind(this));
		this.dragStartListener = this.renderer.listen(this.el.nativeElement, "dragstart", this.onDragStart.bind(this));
		this.dragEndListener = this.renderer.listen(this.el.nativeElement, "dragend", this.onDragEnd.bind(this));
		this.dragOverListener = this.renderer.listen(this.el.nativeElement, "dragover", this.onDragOver.bind(this));
		this.dragLeaveListener = this.renderer.listen(this.el.nativeElement, "dragleave", this.onDragLeave.bind(this));
	}
	unbindEvents() {
		if (this.mouseDownListener) {
			this.mouseDownListener();
			this.mouseDownListener = null;
		}
		if (this.dragStartListener) {
			this.dragStartListener();
			this.dragStartListener = null;
		}
		if (this.dragEndListener) {
			this.dragEndListener();
			this.dragEndListener = null;
		}
		if (this.dragOverListener) {
			this.dragOverListener();
			this.dragOverListener = null;
		}
		if (this.dragLeaveListener) {
			this.dragLeaveListener();
			this.dragLeaveListener = null;
		}
	}
	onMouseDown(event) {
		const targetElement = event.target;
		const isHandleClicked = this.isHandleElement(targetElement);
		this.el.nativeElement.draggable = isHandleClicked;
	}
	isHandleElement(element) {
		var _element$parentElemen2;
		if (element === null || element === void 0 ? void 0 : element.classList.contains(this.pcn("p-datatable-reorderable-row-handle"))) return true;
		if ((element === null || element === void 0 ? void 0 : element.parentElement) && !["TD", "TR"].includes(element === null || element === void 0 || (_element$parentElemen2 = element.parentElement) === null || _element$parentElemen2 === void 0 ? void 0 : _element$parentElemen2.tagName)) return this.isHandleElement(element === null || element === void 0 ? void 0 : element.parentElement);
		return false;
	}
	onDragStart(event) {
		this.dataTable.onRowDragStart(event, this.index());
	}
	onDragEnd(event) {
		this.dataTable.onRowDragEnd(event);
		this.el.nativeElement.draggable = false;
	}
	onDragOver(event) {
		this.dataTable.onRowDragOver(event, this.index(), this.el.nativeElement);
		event.preventDefault();
	}
	onDragLeave(event) {
		this.dataTable.onRowDragLeave(event, this.el.nativeElement);
	}
	isEnabled() {
		return this.pReorderableRowDisabled() !== true;
	}
	onDrop(event) {
		if (this.isEnabled() && this.dataTable.rowDragging) this.dataTable.onRowDrop(event, this.el.nativeElement);
		event.preventDefault();
	}
	onDestroy() {
		this.unbindEvents();
	}
}, _defineProperty(_ReorderableRow, "ɵfac", /*@__PURE__*/ (() => {
	let ɵReorderableRow_BaseFactory = void 0;
	return function ReorderableRow_Factory(__ngFactoryType__) {
		return (ɵReorderableRow_BaseFactory || (ɵReorderableRow_BaseFactory = ɵɵgetInheritedFactory(_ReorderableRow)))(__ngFactoryType__ || _ReorderableRow);
	};
})()), _defineProperty(_ReorderableRow, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _ReorderableRow,
	selectors: [[
		"",
		"pReorderableRow",
		""
	]],
	hostBindings: function ReorderableRow_HostBindings(rf, ctx) {
		if (rf & 1) ɵɵlistener("drop", function ReorderableRow_drop_HostBindingHandler($event) {
			return ctx.onDrop($event);
		});
	},
	inputs: {
		index: [
			1,
			"pReorderableRow",
			"index"
		],
		pReorderableRowDisabled: [1, "pReorderableRowDisabled"]
	},
	features: [ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature]
})), _ReorderableRow);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ReorderableRow, [{
		type: Directive,
		args: [{
			selector: "[pReorderableRow]",
			standalone: true,
			hostDirectives: [Bind]
		}]
	}], null, {
		index: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pReorderableRow",
				required: false
			}]
		}],
		pReorderableRowDisabled: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "pReorderableRowDisabled",
				required: false
			}]
		}],
		onDrop: [{
			type: HostListener,
			args: ["drop", ["$event"]]
		}]
	});
})();
var InitEditableRow = (_InitEditableRow = class InitEditableRow extends BaseComponent {
	constructor(..._args9) {
		super(..._args9);
		_defineProperty(this, "dataTable", inject(TABLE_INSTANCE));
		_defineProperty(this, "editableRow", inject(EditableRow));
	}
	onClick(event) {
		this.dataTable.initRowEdit(this.editableRow.data());
		event.preventDefault();
	}
}, _defineProperty(_InitEditableRow, "ɵfac", /*@__PURE__*/ (() => {
	let ɵInitEditableRow_BaseFactory = void 0;
	return function InitEditableRow_Factory(__ngFactoryType__) {
		return (ɵInitEditableRow_BaseFactory || (ɵInitEditableRow_BaseFactory = ɵɵgetInheritedFactory(_InitEditableRow)))(__ngFactoryType__ || _InitEditableRow);
	};
})()), _defineProperty(_InitEditableRow, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _InitEditableRow,
	selectors: [[
		"",
		"pInitEditableRow",
		""
	]],
	hostVars: 2,
	hostBindings: function InitEditableRow_HostBindings(rf, ctx) {
		if (rf & 1) ɵɵlistener("click", function InitEditableRow_click_HostBindingHandler($event) {
			return ctx.onClick($event);
		});
		if (rf & 2) ɵɵclassMap(ctx.pcn("p-datatable-row-editor-init"));
	},
	features: [ɵɵInheritDefinitionFeature]
})), _InitEditableRow);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InitEditableRow, [{
		type: Directive,
		args: [{
			selector: "[pInitEditableRow]",
			standalone: true,
			host: { "[class]": "pcn('p-datatable-row-editor-init')" }
		}]
	}], null, { onClick: [{
		type: HostListener,
		args: ["click", ["$event"]]
	}] });
})();
var SaveEditableRow = (_SaveEditableRow = class SaveEditableRow extends BaseComponent {
	constructor(..._args10) {
		super(..._args10);
		_defineProperty(this, "hostName", "Table");
		_defineProperty(this, "_componentStyle", inject(TableStyle));
		_defineProperty(this, "dataTable", inject(TABLE_INSTANCE));
		_defineProperty(this, "editableRow", inject(EditableRow));
	}
	onClick(event) {
		this.dataTable.saveRowEdit(this.editableRow.data(), this.editableRow.el.nativeElement);
		event.preventDefault();
	}
}, _defineProperty(_SaveEditableRow, "ɵfac", /*@__PURE__*/ (() => {
	let ɵSaveEditableRow_BaseFactory = void 0;
	return function SaveEditableRow_Factory(__ngFactoryType__) {
		return (ɵSaveEditableRow_BaseFactory || (ɵSaveEditableRow_BaseFactory = ɵɵgetInheritedFactory(_SaveEditableRow)))(__ngFactoryType__ || _SaveEditableRow);
	};
})()), _defineProperty(_SaveEditableRow, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _SaveEditableRow,
	selectors: [[
		"",
		"pSaveEditableRow",
		""
	]],
	hostVars: 2,
	hostBindings: function SaveEditableRow_HostBindings(rf, ctx) {
		if (rf & 1) ɵɵlistener("click", function SaveEditableRow_click_HostBindingHandler($event) {
			return ctx.onClick($event);
		});
		if (rf & 2) ɵɵclassMap(ctx.cx("pcRowEditorSave"));
	},
	features: [ɵɵProvidersFeature([TableStyle]), ɵɵInheritDefinitionFeature]
})), _SaveEditableRow);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SaveEditableRow, [{
		type: Directive,
		args: [{
			selector: "[pSaveEditableRow]",
			standalone: true,
			providers: [TableStyle],
			host: { "[class]": "cx(\"pcRowEditorSave\")" }
		}]
	}], null, { onClick: [{
		type: HostListener,
		args: ["click", ["$event"]]
	}] });
})();
var CancelEditableRow = (_CancelEditableRow = class CancelEditableRow extends BaseComponent {
	constructor(..._args11) {
		super(..._args11);
		_defineProperty(this, "dataTable", inject(TABLE_INSTANCE));
		_defineProperty(this, "editableRow", inject(EditableRow));
		_defineProperty(this, "_componentStyle", inject(TableStyle));
	}
	onClick(event) {
		this.dataTable.cancelRowEdit(this.editableRow.data());
		event.preventDefault();
	}
}, _defineProperty(_CancelEditableRow, "ɵfac", /*@__PURE__*/ (() => {
	let ɵCancelEditableRow_BaseFactory = void 0;
	return function CancelEditableRow_Factory(__ngFactoryType__) {
		return (ɵCancelEditableRow_BaseFactory || (ɵCancelEditableRow_BaseFactory = ɵɵgetInheritedFactory(_CancelEditableRow)))(__ngFactoryType__ || _CancelEditableRow);
	};
})()), _defineProperty(_CancelEditableRow, "ɵdir", /*@__PURE__*/ ɵɵdefineDirective({
	type: _CancelEditableRow,
	selectors: [[
		"",
		"pCancelEditableRow",
		""
	]],
	hostVars: 2,
	hostBindings: function CancelEditableRow_HostBindings(rf, ctx) {
		if (rf & 1) ɵɵlistener("click", function CancelEditableRow_click_HostBindingHandler($event) {
			return ctx.onClick($event);
		});
		if (rf & 2) ɵɵclassMap(ctx.cx("rowEditorCancel"));
	},
	features: [ɵɵProvidersFeature([TableStyle]), ɵɵInheritDefinitionFeature]
})), _CancelEditableRow);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CancelEditableRow, [{
		type: Directive,
		args: [{
			selector: "[pCancelEditableRow]",
			standalone: true,
			host: { "[class]": "cx('rowEditorCancel')" },
			providers: [TableStyle]
		}]
	}], null, { onClick: [{
		type: HostListener,
		args: ["click", ["$event"]]
	}] });
})();
var SortIcon = (_SortIcon = class SortIcon extends BaseComponent {
	constructor() {
		super();
		_defineProperty(this, "field", input(...ngDevMode ? [void 0, { debugName: "field" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "sortOrder", signal(0, ...ngDevMode ? [{ debugName: "sortOrder" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "_componentStyle", inject(TableStyle));
		_defineProperty(this, "dataTable", inject(TABLE_INSTANCE));
		this.dataTable.tableService.sortSource$.pipe(takeUntilDestroyed()).subscribe(() => {
			this.updateSortState();
			this.cd.markForCheck();
		});
	}
	onInit() {
		this.updateSortState();
	}
	onClick(event) {
		event.preventDefault();
	}
	updateSortState() {
		if (this.dataTable.sortMode() === "single") this.sortOrder.set(this.dataTable.isSorted(this.field()) ? this.dataTable.sortOrder : 0);
		else if (this.dataTable.sortMode() === "multiple") {
			let sortMeta = this.dataTable.getSortMeta(this.field());
			this.sortOrder.set(sortMeta ? sortMeta.order : 0);
		}
	}
	getMultiSortMetaIndex() {
		let multiSortMeta = this.dataTable.multiSortMeta;
		let index = -1;
		if (multiSortMeta && this.dataTable.sortMode() === "multiple" && this.dataTable.showInitialSortBadge() && multiSortMeta.length > 1) for (let i = 0; i < multiSortMeta.length; i++) {
			let meta = multiSortMeta[i];
			if (meta.field === this.field() || meta.field === this.field()) {
				index = i;
				break;
			}
		}
		return index;
	}
	getBadgeValue() {
		var _this$dataTable11;
		let index = this.getMultiSortMetaIndex();
		return (((_this$dataTable11 = this.dataTable) === null || _this$dataTable11 === void 0 ? void 0 : _this$dataTable11.groupRowsBy()) || "") && index > -1 ? index : index + 1;
	}
	isMultiSorted() {
		return this.dataTable.sortMode() === "multiple" && this.getMultiSortMetaIndex() > -1;
	}
}, _defineProperty(_SortIcon, "ɵfac", function SortIcon_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _SortIcon)();
}), _defineProperty(_SortIcon, "ɵcmp", (function() {
	const _c0 = (a0) => ({ $implicit: a0 });
	function SortIcon_Conditional_0_Conditional_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 5);
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵclassMap(ctx_r0.cx("sortableColumnIcon"));
		}
	}
	function SortIcon_Conditional_0_Conditional_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 6);
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵclassMap(ctx_r0.cx("sortableColumnIcon"));
		}
	}
	function SortIcon_Conditional_0_Conditional_2_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 7);
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵclassMap(ctx_r0.cx("sortableColumnIcon"));
		}
	}
	function SortIcon_Conditional_0_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵconditionalCreate(0, SortIcon_Conditional_0_Conditional_0_Template, 1, 2, "svg", 2);
			ɵɵconditionalCreate(1, SortIcon_Conditional_0_Conditional_1_Template, 1, 2, "svg", 3);
			ɵɵconditionalCreate(2, SortIcon_Conditional_0_Conditional_2_Template, 1, 2, "svg", 4);
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵconditional(ctx_r0.sortOrder() === 0 ? 0 : -1);
			ɵɵadvance();
			ɵɵconditional(ctx_r0.sortOrder() === 1 ? 1 : -1);
			ɵɵadvance();
			ɵɵconditional(ctx_r0.sortOrder() === -1 ? 2 : -1);
		}
	}
	function SortIcon_Conditional_1_1_ng_template_0_Template(rf, ctx) {}
	function SortIcon_Conditional_1_1_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, SortIcon_Conditional_1_1_ng_template_0_Template, 0, 0, "ng-template");
	}
	function SortIcon_Conditional_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "span");
			ɵɵtemplate(1, SortIcon_Conditional_1_1_Template, 1, 0, null, 8);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵclassMap(ctx_r0.cx("sortableColumnIcon"));
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", ctx_r0.dataTable.sortIconTemplate())("ngTemplateOutletContext", ɵɵpureFunction1(4, _c0, ctx_r0.sortOrder()));
		}
	}
	function SortIcon_Conditional_2_Template(rf, ctx) {
		if (rf & 1) ɵɵelement(0, "p-badge", 9);
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵclassMap(ctx_r0.cx("sortableColumnBadge"));
			ɵɵproperty("value", ctx_r0.getBadgeValue());
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _SortIcon,
		selectors: [["p-sort-icon"], ["p-sorticon"]],
		inputs: { field: [1, "field"] },
		features: [ɵɵProvidersFeature([TableStyle]), ɵɵInheritDefinitionFeature],
		decls: 3,
		vars: 3,
		consts: [
			[3, "class"],
			[
				"size",
				"small",
				3,
				"class",
				"value"
			],
			[
				"data-p-icon",
				"sort-alt",
				3,
				"class"
			],
			[
				"data-p-icon",
				"sort-amount-up-alt",
				3,
				"class"
			],
			[
				"data-p-icon",
				"sort-amount-down",
				3,
				"class"
			],
			["data-p-icon", "sort-alt"],
			["data-p-icon", "sort-amount-up-alt"],
			["data-p-icon", "sort-amount-down"],
			[
				4,
				"ngTemplateOutlet",
				"ngTemplateOutletContext"
			],
			[
				"size",
				"small",
				3,
				"value"
			]
		],
		template: function SortIcon_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵconditionalCreate(0, SortIcon_Conditional_0_Template, 3, 3);
				ɵɵconditionalCreate(1, SortIcon_Conditional_1_Template, 2, 6, "span", 0);
				ɵɵconditionalCreate(2, SortIcon_Conditional_2_Template, 1, 3, "p-badge", 1);
			}
			if (rf & 2) {
				ɵɵconditional(!ctx.dataTable.sortIconTemplate() ? 0 : -1);
				ɵɵadvance();
				ɵɵconditional(ctx.dataTable.sortIconTemplate() ? 1 : -1);
				ɵɵadvance();
				ɵɵconditional(ctx.isMultiSorted() ? 2 : -1);
			}
		},
		dependencies: [
			NgTemplateOutlet,
			BadgeModule,
			Badge,
			SortAlt,
			SortAmountUpAlt,
			SortAmountDown
		],
		encapsulation: 2
	});
})()), _SortIcon);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SortIcon, [{
		type: Component,
		args: [{
			selector: "p-sort-icon, p-sorticon",
			standalone: true,
			imports: [
				NgTemplateOutlet,
				BadgeModule,
				SortAlt,
				SortAmountUpAlt,
				SortAmountDown
			],
			template: `
        @if (!dataTable.sortIconTemplate()) {
            @if (sortOrder() === 0) {
                <svg data-p-icon="sort-alt" [class]="cx('sortableColumnIcon')" />
            }
            @if (sortOrder() === 1) {
                <svg data-p-icon="sort-amount-up-alt" [class]="cx('sortableColumnIcon')" />
            }
            @if (sortOrder() === -1) {
                <svg data-p-icon="sort-amount-down" [class]="cx('sortableColumnIcon')" />
            }
        }
        @if (dataTable.sortIconTemplate()) {
            <span [class]="cx('sortableColumnIcon')">
                <ng-template *ngTemplateOutlet="dataTable.sortIconTemplate(); context: { $implicit: sortOrder() }"></ng-template>
            </span>
        }
        @if (isMultiSorted()) {
            <p-badge [class]="cx('sortableColumnBadge')" [value]="getBadgeValue()" size="small" />
        }
    `,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None,
			providers: [TableStyle]
		}]
	}], () => [], { field: [{
		type: Input,
		args: [{
			isSignal: true,
			alias: "field",
			required: false
		}]
	}] });
})();
var CellEditor = (_CellEditor = class CellEditor extends BaseComponent {
	constructor(..._args12) {
		super(..._args12);
		_defineProperty(this, "_inputTemplate", contentChild("input", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "_inputTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "_outputTemplate", contentChild("output", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "_outputTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "dataTable", inject(TABLE_INSTANCE));
		_defineProperty(this, "editableColumn", inject(EditableColumn, { optional: true }));
		_defineProperty(this, "editableRow", inject(EditableRow, { optional: true }));
	}
	get editing() {
		return !!(this.dataTable.editingCell && this.editableColumn && this.dataTable.editingCell === this.editableColumn.el.nativeElement || this.editableRow && this.dataTable.editMode() === "row" && this.dataTable.isRowEditing(this.editableRow.data()));
	}
}, _defineProperty(_CellEditor, "ɵfac", /*@__PURE__*/ (() => {
	let ɵCellEditor_BaseFactory = void 0;
	return function CellEditor_Factory(__ngFactoryType__) {
		return (ɵCellEditor_BaseFactory || (ɵCellEditor_BaseFactory = ɵɵgetInheritedFactory(_CellEditor)))(__ngFactoryType__ || _CellEditor);
	};
})()), _defineProperty(_CellEditor, "ɵcmp", (function() {
	const _c0 = ["input"];
	const _c1 = ["output"];
	function CellEditor_Conditional_0_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function CellEditor_Conditional_0_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, CellEditor_Conditional_0_ng_container_0_Template, 1, 0, "ng-container", 0);
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵproperty("ngTemplateOutlet", ctx_r0._inputTemplate());
		}
	}
	function CellEditor_Conditional_1_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function CellEditor_Conditional_1_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, CellEditor_Conditional_1_ng_container_0_Template, 1, 0, "ng-container", 0);
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵproperty("ngTemplateOutlet", ctx_r0._outputTemplate());
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _CellEditor,
		selectors: [["p-cell-editor"], ["p-celleditor"]],
		contentQueries: function CellEditor_ContentQueries(rf, ctx, dirIndex) {
			if (rf & 1) ɵɵcontentQuerySignal(dirIndex, ctx._inputTemplate, _c0, 4)(dirIndex, ctx._outputTemplate, _c1, 4);
			if (rf & 2) ɵɵqueryAdvance(2);
		},
		features: [ɵɵInheritDefinitionFeature],
		decls: 2,
		vars: 2,
		consts: [[4, "ngTemplateOutlet"]],
		template: function CellEditor_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵconditionalCreate(0, CellEditor_Conditional_0_Template, 1, 1, "ng-container");
				ɵɵconditionalCreate(1, CellEditor_Conditional_1_Template, 1, 1, "ng-container");
			}
			if (rf & 2) {
				ɵɵconditional(ctx.editing ? 0 : -1);
				ɵɵadvance();
				ɵɵconditional(!ctx.editing ? 1 : -1);
			}
		},
		dependencies: [NgTemplateOutlet],
		encapsulation: 2
	});
})()), _CellEditor);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CellEditor, [{
		type: Component,
		args: [{
			selector: "p-cell-editor, p-celleditor",
			standalone: true,
			imports: [NgTemplateOutlet],
			template: `
        @if (editing) {
            <ng-container *ngTemplateOutlet="_inputTemplate()"></ng-container>
        }
        @if (!editing) {
            <ng-container *ngTemplateOutlet="_outputTemplate()"></ng-container>
        }
    `,
			encapsulation: ViewEncapsulation.None
		}]
	}], null, {
		_inputTemplate: [{
			type: ContentChild,
			args: ["input", {
				descendants: false,
				isSignal: true
			}]
		}],
		_outputTemplate: [{
			type: ContentChild,
			args: ["output", {
				descendants: false,
				isSignal: true
			}]
		}]
	});
})();
var TableRadioButton = (_TableRadioButton = class TableRadioButton extends BaseComponent {
	get aria() {
		return this.dataTable.config.translation.aria;
	}
	constructor() {
		super();
		_defineProperty(this, "value", input(...ngDevMode ? [void 0, { debugName: "value" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "disabled", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "index", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "index" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "inputId", input(...ngDevMode ? [void 0, { debugName: "inputId" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "name", input(...ngDevMode ? [void 0, { debugName: "name" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "ariaLabel", input(...ngDevMode ? [void 0, { debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "inputViewChild", viewChild("rb", ...ngDevMode ? [{ debugName: "inputViewChild" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "checked", signal(false, ...ngDevMode ? [{ debugName: "checked" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataTable", inject(TABLE_INSTANCE));
		_defineProperty(this, "resolvedAriaLabel", computed(() => {
			const checked = this.checked();
			return this.ariaLabel() || (this.aria ? checked ? this.aria.selectRow : this.aria.unselectRow : void 0);
		}, ...ngDevMode ? [{ debugName: "resolvedAriaLabel" }] : /* istanbul ignore next */ []));
		this.dataTable.tableService.selectionSource$.pipe(takeUntilDestroyed()).subscribe(() => {
			this.checked.set(this.dataTable.isSelected(this.value()));
		});
	}
	onInit() {
		this.checked.set(this.dataTable.isSelected(this.value()));
	}
	onClick(event) {
		if (!this.disabled()) {
			var _this$inputViewChild;
			this.dataTable.toggleRowWithRadio({
				originalEvent: event.originalEvent,
				rowIndex: this.index()
			}, this.value());
			(_this$inputViewChild = this.inputViewChild()) === null || _this$inputViewChild === void 0 || (_this$inputViewChild = _this$inputViewChild.inputViewChild().nativeElement) === null || _this$inputViewChild === void 0 || _this$inputViewChild.focus();
		}
		DomHandler.clearSelection();
	}
}, _defineProperty(_TableRadioButton, "ɵfac", function TableRadioButton_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _TableRadioButton)();
}), _defineProperty(_TableRadioButton, "ɵcmp", (function() {
	const _c0 = ["rb"];
	const _c1 = () => ({ standalone: true });
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _TableRadioButton,
		selectors: [["p-table-radio-button"], ["p-tableradiobutton"]],
		viewQuery: function TableRadioButton_Query(rf, ctx) {
			if (rf & 1) ɵɵviewQuerySignal(ctx.inputViewChild, _c0, 5);
			if (rf & 2) ɵɵqueryAdvance();
		},
		inputs: {
			value: [1, "value"],
			disabled: [1, "disabled"],
			index: [1, "index"],
			inputId: [1, "inputId"],
			name: [1, "name"],
			ariaLabel: [1, "ariaLabel"]
		},
		features: [ɵɵInheritDefinitionFeature],
		decls: 2,
		vars: 10,
		consts: [["rb", ""], [
			3,
			"ngModelChange",
			"onClick",
			"ngModel",
			"ngModelOptions",
			"disabled",
			"inputId",
			"name",
			"ariaLabel",
			"binary",
			"value",
			"unstyled"
		]],
		template: function TableRadioButton_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵelementStart(0, "p-radiobutton", 1, 0);
				ɵɵcontrolCreate();
				ɵɵlistener("ngModelChange", function TableRadioButton_Template_p_radiobutton_ngModelChange_0_listener($event) {
					return ctx.checked.set($event);
				})("onClick", function TableRadioButton_Template_p_radiobutton_onClick_0_listener($event) {
					return ctx.onClick($event);
				});
				ɵɵelementEnd();
			}
			if (rf & 2) {
				ɵɵproperty("ngModel", ctx.checked())("ngModelOptions", ɵɵpureFunction0(9, _c1))("disabled", ctx.disabled())("inputId", ctx.inputId())("name", ctx.name())("ariaLabel", ctx.resolvedAriaLabel())("binary", true)("value", ctx.value())("unstyled", ctx.unstyled());
				ɵɵcontrol();
			}
		},
		dependencies: [
			RadioButtonModule,
			RadioButton,
			FormsModule,
			NgControlStatus,
			NgModel
		],
		encapsulation: 2
	});
})()), _TableRadioButton);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TableRadioButton, [{
		type: Component,
		args: [{
			selector: "p-table-radio-button, p-tableradiobutton",
			standalone: true,
			imports: [RadioButtonModule, FormsModule],
			template: `<p-radiobutton
        #rb
        [ngModel]="checked()"
        [ngModelOptions]="{ standalone: true }"
        (ngModelChange)="checked.set($event)"
        [disabled]="disabled()"
        [inputId]="inputId()"
        [name]="name()!"
        [ariaLabel]="resolvedAriaLabel()"
        [binary]="true"
        [value]="value()"
        (onClick)="onClick($event)"
        [unstyled]="unstyled()"
    /> `,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None
		}]
	}], () => [], {
		value: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "value",
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
		index: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "index",
				required: false
			}]
		}],
		inputId: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "inputId",
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
		ariaLabel: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "ariaLabel",
				required: false
			}]
		}],
		inputViewChild: [{
			type: ViewChild,
			args: ["rb", { isSignal: true }]
		}]
	});
})();
var TableCheckbox = (_TableCheckbox = class TableCheckbox extends BaseComponent {
	get aria() {
		return this.dataTable.config.translation.aria;
	}
	constructor() {
		super();
		_defineProperty(this, "value", input(...ngDevMode ? [void 0, { debugName: "value" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "disabled", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "required", input(false, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "required" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "index", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "index" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "inputId", input(...ngDevMode ? [void 0, { debugName: "inputId" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "name", input(...ngDevMode ? [void 0, { debugName: "name" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "ariaLabel", input(...ngDevMode ? [void 0, { debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "checked", signal(false, ...ngDevMode ? [{ debugName: "checked" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataTable", inject(TABLE_INSTANCE));
		_defineProperty(this, "resolvedAriaLabel", computed(() => {
			const checked = this.checked();
			return this.ariaLabel() || (this.aria ? checked ? this.aria.selectRow : this.aria.unselectRow : void 0);
		}, ...ngDevMode ? [{ debugName: "resolvedAriaLabel" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "tableService", inject(TableService));
		this.dataTable.tableService.selectionSource$.pipe(takeUntilDestroyed()).subscribe(() => {
			this.checked.set(this.dataTable.isSelected(this.value()));
		});
		effect((onCleanup) => {
			const value = this.value();
			this.dataTable.setRowCheckboxDisabled(value, !!this.disabled());
			onCleanup(() => this.dataTable.setRowCheckboxDisabled(value, false));
		});
	}
	onInit() {
		this.checked.set(this.dataTable.isSelected(this.value()));
	}
	onClick({ originalEvent }) {
		if (!this.disabled()) this.dataTable.toggleRowWithCheckbox({
			originalEvent,
			rowIndex: this.index() || 0
		}, this.value());
		DomHandler.clearSelection();
	}
}, _defineProperty(_TableCheckbox, "ɵfac", function TableCheckbox_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _TableCheckbox)();
}), _defineProperty(_TableCheckbox, "ɵcmp", (function() {
	const _c0 = () => ({ standalone: true });
	const _c1 = (a0) => ({ $implicit: a0 });
	function TableCheckbox_Conditional_1_ng_template_0_0_ng_template_0_Template(rf, ctx) {}
	function TableCheckbox_Conditional_1_ng_template_0_0_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, TableCheckbox_Conditional_1_ng_template_0_0_ng_template_0_Template, 0, 0, "ng-template");
	}
	function TableCheckbox_Conditional_1_ng_template_0_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, TableCheckbox_Conditional_1_ng_template_0_0_Template, 1, 0, null, 2);
		if (rf & 2) {
			const template_r1 = ɵɵnextContext();
			const ctx_r1 = ɵɵnextContext();
			ɵɵproperty("ngTemplateOutlet", template_r1)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c1, ctx_r1.checked()));
		}
	}
	function TableCheckbox_Conditional_1_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, TableCheckbox_Conditional_1_ng_template_0_Template, 1, 4, "ng-template", null, 0, ɵɵtemplateRefExtractor);
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _TableCheckbox,
		selectors: [["p-table-checkbox"], ["p-tablecheckbox"]],
		inputs: {
			value: [1, "value"],
			disabled: [1, "disabled"],
			required: [1, "required"],
			index: [1, "index"],
			inputId: [1, "inputId"],
			name: [1, "name"],
			ariaLabel: [1, "ariaLabel"]
		},
		features: [ɵɵInheritDefinitionFeature],
		decls: 2,
		vars: 11,
		consts: [
			["icon", ""],
			[
				3,
				"ngModelChange",
				"onChange",
				"ngModel",
				"ngModelOptions",
				"binary",
				"required",
				"disabled",
				"inputId",
				"name",
				"ariaLabel",
				"unstyled"
			],
			[
				4,
				"ngTemplateOutlet",
				"ngTemplateOutletContext"
			]
		],
		template: function TableCheckbox_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵelementStart(0, "p-checkbox", 1);
				ɵɵcontrolCreate();
				ɵɵlistener("ngModelChange", function TableCheckbox_Template_p_checkbox_ngModelChange_0_listener($event) {
					return ctx.checked.set($event);
				})("onChange", function TableCheckbox_Template_p_checkbox_onChange_0_listener($event) {
					return ctx.onClick($event);
				});
				ɵɵconditionalCreate(1, TableCheckbox_Conditional_1_Template, 2, 0);
				ɵɵelementEnd();
			}
			if (rf & 2) {
				let tmp_10_0 = void 0;
				ɵɵproperty("ngModel", ctx.checked())("ngModelOptions", ɵɵpureFunction0(10, _c0))("binary", true)("required", ctx.required())("disabled", ctx.disabled())("inputId", ctx.inputId())("name", ctx.name())("ariaLabel", ctx.resolvedAriaLabel())("unstyled", ctx.unstyled());
				ɵɵcontrol();
				ɵɵadvance();
				ɵɵconditional((tmp_10_0 = ctx.dataTable.$checkboxIconTemplate()) ? 1 : -1, tmp_10_0);
			}
		},
		dependencies: [
			NgTemplateOutlet,
			CheckboxModule,
			Checkbox,
			FormsModule,
			NgControlStatus,
			RequiredValidator,
			NgModel
		],
		encapsulation: 2
	});
})()), _TableCheckbox);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TableCheckbox, [{
		type: Component,
		args: [{
			selector: "p-table-checkbox, p-tablecheckbox",
			standalone: true,
			imports: [
				NgTemplateOutlet,
				CheckboxModule,
				FormsModule
			],
			template: `
        <p-checkbox
            [ngModel]="checked()"
            [ngModelOptions]="{ standalone: true }"
            (ngModelChange)="checked.set($event)"
            [binary]="true"
            (onChange)="onClick($event)"
            [required]="required()"
            [disabled]="disabled()"
            [inputId]="inputId()"
            [name]="name()!"
            [ariaLabel]="resolvedAriaLabel()"
            [unstyled]="unstyled()"
        >
            @if (dataTable.$checkboxIconTemplate(); as template) {
                <ng-template #icon>
                    <ng-template *ngTemplateOutlet="template; context: { $implicit: checked() }" />
                </ng-template>
            }
        </p-checkbox>
    `,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None
		}]
	}], () => [], {
		value: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "value",
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
		required: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "required",
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
		inputId: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "inputId",
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
		ariaLabel: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "ariaLabel",
				required: false
			}]
		}]
	});
})();
var TableHeaderCheckbox = (_TableHeaderCheckbox = class TableHeaderCheckbox extends BaseComponent {
	get aria() {
		return this.dataTable.config.translation.aria;
	}
	constructor() {
		super();
		_defineProperty(this, "hostName", "Table");
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		_defineProperty(this, "disabled", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "disabled" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "inputId", input(...ngDevMode ? [void 0, { debugName: "inputId" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "name", input(...ngDevMode ? [void 0, { debugName: "name" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "ariaLabel", input(...ngDevMode ? [void 0, { debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "checked", void 0);
		_defineProperty(this, "resolvedAriaLabel", void 0);
		_defineProperty(this, "dataTable", inject(TABLE_INSTANCE));
		_defineProperty(this, "tableService", inject(TableService));
		this.dataTable.tableService.valueSource$.pipe(takeUntilDestroyed()).subscribe(() => {
			this.checked = this.updateCheckedState();
			this.resolvedAriaLabel = this.ariaLabel() || (this.aria ? this.checked ? this.aria.selectAll : this.aria.unselectAll : void 0);
		});
		this.dataTable.tableService.selectionSource$.pipe(takeUntilDestroyed()).subscribe(() => {
			this.checked = this.updateCheckedState();
		});
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.ptm("headerCheckbox"));
	}
	onInit() {
		this.checked = this.updateCheckedState();
	}
	onClick(event) {
		if (!this.disabled()) {
			if (this.dataTable.value && this.dataTable.value.length > 0) this.dataTable.toggleRowsWithCheckbox(event, this.checked || false);
		}
		DomHandler.clearSelection();
	}
	isDisabled() {
		return this.disabled() || !this.dataTable.value || !this.dataTable.value.length;
	}
	updateCheckedState() {
		this.cd.markForCheck();
		if (this.dataTable._selectAll !== null) return this.dataTable._selectAll;
		else {
			const data = this.dataTable.selectionPageOnly() ? this.dataTable.dataToRender(this.dataTable.processedData) : this.dataTable.processedData;
			const selectableVal = (this.dataTable.frozenValue() ? [...this.dataTable.frozenValue(), ...data] : data).filter((data, index) => (!this.dataTable.rowSelectable() || this.dataTable.rowSelectable()({
				data,
				index
			})) && !this.dataTable.isRowCheckboxDisabled(data));
			const isRowSelected = this.dataTable.compareSelectionBy() === "equals" ? (v) => this.dataTable.selection().some((s) => this.dataTable.equals(v, s)) : (v) => this.dataTable.isSelected(v);
			return ObjectUtils.isNotEmpty(selectableVal) && ObjectUtils.isNotEmpty(this.dataTable.selection()) && selectableVal.every(isRowSelected);
		}
	}
}, _defineProperty(_TableHeaderCheckbox, "ɵfac", function TableHeaderCheckbox_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _TableHeaderCheckbox)();
}), _defineProperty(_TableHeaderCheckbox, "ɵcmp", (function() {
	const _c0 = () => ({ standalone: true });
	const _c1 = (a0) => ({ $implicit: a0 });
	function TableHeaderCheckbox_Conditional_1_ng_template_0_0_ng_template_0_Template(rf, ctx) {}
	function TableHeaderCheckbox_Conditional_1_ng_template_0_0_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, TableHeaderCheckbox_Conditional_1_ng_template_0_0_ng_template_0_Template, 0, 0, "ng-template");
	}
	function TableHeaderCheckbox_Conditional_1_ng_template_0_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, TableHeaderCheckbox_Conditional_1_ng_template_0_0_Template, 1, 0, null, 2);
		if (rf & 2) {
			const template_r1 = ɵɵnextContext();
			const ctx_r1 = ɵɵnextContext();
			ɵɵproperty("ngTemplateOutlet", template_r1)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c1, ctx_r1.checked));
		}
	}
	function TableHeaderCheckbox_Conditional_1_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, TableHeaderCheckbox_Conditional_1_ng_template_0_Template, 1, 4, "ng-template", null, 0, ɵɵtemplateRefExtractor);
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _TableHeaderCheckbox,
		selectors: [["p-table-header-checkbox"], ["p-tableheadercheckbox"]],
		inputs: {
			disabled: [1, "disabled"],
			inputId: [1, "inputId"],
			name: [1, "name"],
			ariaLabel: [1, "ariaLabel"]
		},
		features: [ɵɵHostDirectivesFeature([Bind]), ɵɵInheritDefinitionFeature],
		decls: 2,
		vars: 11,
		consts: [
			["icon", ""],
			[
				3,
				"ngModelChange",
				"onChange",
				"pt",
				"ngModel",
				"ngModelOptions",
				"binary",
				"disabled",
				"inputId",
				"name",
				"ariaLabel",
				"unstyled"
			],
			[
				4,
				"ngTemplateOutlet",
				"ngTemplateOutletContext"
			]
		],
		template: function TableHeaderCheckbox_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵelementStart(0, "p-checkbox", 1);
				ɵɵcontrolCreate();
				ɵɵtwoWayListener("ngModelChange", function TableHeaderCheckbox_Template_p_checkbox_ngModelChange_0_listener($event) {
					ɵɵtwoWayBindingSet(ctx.checked, $event) || (ctx.checked = $event);
					return $event;
				});
				ɵɵlistener("onChange", function TableHeaderCheckbox_Template_p_checkbox_onChange_0_listener($event) {
					return ctx.onClick($event);
				});
				ɵɵconditionalCreate(1, TableHeaderCheckbox_Conditional_1_Template, 2, 0);
				ɵɵelementEnd();
			}
			if (rf & 2) {
				let tmp_10_0 = void 0;
				ɵɵproperty("pt", ctx.ptm("pcCheckbox"));
				ɵɵtwoWayProperty("ngModel", ctx.checked);
				ɵɵproperty("ngModelOptions", ɵɵpureFunction0(10, _c0))("binary", true)("disabled", ctx.isDisabled())("inputId", ctx.inputId())("name", ctx.name())("ariaLabel", ctx.resolvedAriaLabel)("unstyled", ctx.unstyled());
				ɵɵcontrol();
				ɵɵadvance();
				ɵɵconditional((tmp_10_0 = ctx.dataTable.headerCheckboxIconTemplate()) ? 1 : -1, tmp_10_0);
			}
		},
		dependencies: [
			NgTemplateOutlet,
			CheckboxModule,
			Checkbox,
			FormsModule,
			NgControlStatus,
			NgModel
		],
		encapsulation: 2
	});
})()), _TableHeaderCheckbox);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TableHeaderCheckbox, [{
		type: Component,
		args: [{
			selector: "p-table-header-checkbox, p-tableheadercheckbox",
			standalone: true,
			imports: [
				NgTemplateOutlet,
				CheckboxModule,
				FormsModule
			],
			template: `
        <p-checkbox
            [pt]="ptm('pcCheckbox')"
            [(ngModel)]="checked"
            [ngModelOptions]="{ standalone: true }"
            (onChange)="onClick($event)"
            [binary]="true"
            [disabled]="isDisabled()"
            [inputId]="inputId()"
            [name]="name()!"
            [ariaLabel]="resolvedAriaLabel"
            [unstyled]="unstyled()"
        >
            @if (dataTable.headerCheckboxIconTemplate(); as template) {
                <ng-template #icon>
                    <ng-template *ngTemplateOutlet="template; context: { $implicit: checked }" />
                </ng-template>
            }
        </p-checkbox>
    `,
			changeDetection: ChangeDetectionStrategy.OnPush,
			encapsulation: ViewEncapsulation.None,
			hostDirectives: [Bind]
		}]
	}], () => [], {
		disabled: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "disabled",
				required: false
			}]
		}],
		inputId: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "inputId",
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
		ariaLabel: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "ariaLabel",
				required: false
			}]
		}]
	});
})();
var ColumnFilterFormElement = (_ColumnFilterFormElement = class ColumnFilterFormElement extends BaseComponent {
	filterTemplateContext() {
		var _this$filterConstrain;
		return {
			$implicit: (_this$filterConstrain = this.filterConstraint()) === null || _this$filterConstrain === void 0 ? void 0 : _this$filterConstrain.value,
			filterCallback: this.onFilterCallback,
			type: this.type(),
			field: this.field(),
			filterConstraint: this.filterConstraint(),
			placeholder: this.placeholder(),
			minFractionDigits: this.minFractionDigits(),
			maxFractionDigits: this.maxFractionDigits(),
			prefix: this.prefix(),
			suffix: this.suffix(),
			locale: this.locale(),
			localeMatcher: this.localeMatcher(),
			currency: this.currency(),
			currencyDisplay: this.currencyDisplay(),
			useGrouping: this.useGrouping(),
			showButtons: this.showButtons()
		};
	}
	constructor() {
		super();
		_defineProperty(this, "hostName", "Table");
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		_defineProperty(this, "_componentStyle", inject(TableStyle));
		_defineProperty(this, "field", input(...ngDevMode ? [void 0, { debugName: "field" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "type", input(...ngDevMode ? [void 0, { debugName: "type" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "filterConstraint", input(...ngDevMode ? [void 0, { debugName: "filterConstraint" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "filterTemplate", input(...ngDevMode ? [void 0, { debugName: "filterTemplate" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "placeholder", input(...ngDevMode ? [void 0, { debugName: "placeholder" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "minFractionDigits", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "minFractionDigits" } : /* istanbul ignore next */ {}), {}, { transform: (v) => numberAttribute(v, void 0) })));
		_defineProperty(this, "maxFractionDigits", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "maxFractionDigits" } : /* istanbul ignore next */ {}), {}, { transform: (v) => numberAttribute(v, void 0) })));
		_defineProperty(this, "prefix", input(...ngDevMode ? [void 0, { debugName: "prefix" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "suffix", input(...ngDevMode ? [void 0, { debugName: "suffix" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "locale", input(...ngDevMode ? [void 0, { debugName: "locale" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "localeMatcher", input(...ngDevMode ? [void 0, { debugName: "localeMatcher" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "currency", input(...ngDevMode ? [void 0, { debugName: "currency" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "currencyDisplay", input(...ngDevMode ? [void 0, { debugName: "currencyDisplay" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "useGrouping", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "useGrouping" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "ariaLabel", input(...ngDevMode ? [void 0, { debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "filterOn", input(...ngDevMode ? [void 0, { debugName: "filterOn" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "dataTable", inject(TABLE_INSTANCE));
		_defineProperty(this, "colFilter", inject(COLUMN_FILTER_INSTANCE));
		_defineProperty(this, "showButtons", computed(() => this.colFilter.showButtons(), ...ngDevMode ? [{ debugName: "showButtons" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "onFilterCallback", ((value) => {
			const constraint = this.filterConstraint();
			if (constraint) constraint.value = value;
			this.colFilter.setHasFilter(true);
			this.dataTable._filter();
		}).bind(this));
		this.dataTable.tableService.valueSource$.pipe(takeUntilDestroyed()).subscribe(() => this.cd.markForCheck());
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.ptm("columnFilterFormElement"));
	}
	onModelChange(value) {
		const constraint = this.filterConstraint();
		if (constraint) constraint.value = value;
		const applyButtonVisible = this.showButtons() && this.colFilter.showApplyButton();
		if (this.type() === "boolean" || this.type() === "date" && !applyButtonVisible || (this.type() === "text" || this.type() === "numeric") && this.filterOn() === "input" || this.dataTable.isFilterBlank(value)) {
			this.colFilter.setHasFilter(true);
			this.dataTable._filter();
		}
	}
	onTextInputEnterKeyDown(event) {
		this.colFilter.setHasFilter(true);
		this.dataTable._filter();
		event.preventDefault();
	}
	onNumericInputKeyDown(event) {
		if (event.key === "Enter") {
			this.dataTable._filter();
			event.preventDefault();
		}
	}
}, _defineProperty(_ColumnFilterFormElement, "ɵfac", function ColumnFilterFormElement_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _ColumnFilterFormElement)();
}), _defineProperty(_ColumnFilterFormElement, "ɵcmp", (function() {
	const _c0 = () => ({ standalone: true });
	function ColumnFilterFormElement_Conditional_0_ng_container_0_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function ColumnFilterFormElement_Conditional_0_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, ColumnFilterFormElement_Conditional_0_ng_container_0_Template, 1, 0, "ng-container", 0);
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵproperty("ngTemplateOutlet", ctx_r0.filterTemplate())("ngTemplateOutletContext", ctx_r0.filterTemplateContext());
		}
	}
	function ColumnFilterFormElement_Conditional_1_Case_0_Template(rf, ctx) {
		if (rf & 1) {
			const _r2 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "input", 5);
			ɵɵlistener("input", function ColumnFilterFormElement_Conditional_1_Case_0_Template_input_input_0_listener($event) {
				ɵɵrestoreView(_r2);
				const ctx_r0 = ɵɵnextContext(2);
				return ɵɵresetView(ctx_r0.onModelChange($event.target.value));
			})("keydown.enter", function ColumnFilterFormElement_Conditional_1_Case_0_Template_input_keydown_enter_0_listener($event) {
				ɵɵrestoreView(_r2);
				const ctx_r0 = ɵɵnextContext(2);
				return ɵɵresetView(ctx_r0.onTextInputEnterKeyDown($event));
			});
			ɵɵelementEnd();
		}
		if (rf & 2) {
			var _ctx_r0$filterConstra;
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵproperty("ariaLabel", ctx_r0.ariaLabel())("pt", ctx_r0.ptm("pcFilterInputText"))("value", (_ctx_r0$filterConstra = ctx_r0.filterConstraint()) === null || _ctx_r0$filterConstra === void 0 ? void 0 : _ctx_r0$filterConstra.value)("unstyled", ctx_r0.unstyled());
			ɵɵattribute("placeholder", ctx_r0.placeholder());
		}
	}
	function ColumnFilterFormElement_Conditional_1_Case_1_Template(rf, ctx) {
		if (rf & 1) {
			const _r3 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "p-input-number", 6);
			ɵɵcontrolCreate();
			ɵɵlistener("ngModelChange", function ColumnFilterFormElement_Conditional_1_Case_1_Template_p_input_number_ngModelChange_0_listener($event) {
				ɵɵrestoreView(_r3);
				const ctx_r0 = ɵɵnextContext(2);
				return ɵɵresetView(ctx_r0.onModelChange($event));
			})("onKeyDown", function ColumnFilterFormElement_Conditional_1_Case_1_Template_p_input_number_onKeyDown_0_listener($event) {
				ɵɵrestoreView(_r3);
				const ctx_r0 = ɵɵnextContext(2);
				return ɵɵresetView(ctx_r0.onNumericInputKeyDown($event));
			});
			ɵɵelementEnd();
		}
		if (rf & 2) {
			var _ctx_r0$filterConstra2;
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵproperty("ngModel", (_ctx_r0$filterConstra2 = ctx_r0.filterConstraint()) === null || _ctx_r0$filterConstra2 === void 0 ? void 0 : _ctx_r0$filterConstra2.value)("ngModelOptions", ɵɵpureFunction0(17, _c0))("showButtons", ctx_r0.showButtons())("minFractionDigits", ctx_r0.minFractionDigits())("maxFractionDigits", ctx_r0.maxFractionDigits())("ariaLabel", ctx_r0.ariaLabel())("prefix", ctx_r0.prefix())("suffix", ctx_r0.suffix())("placeholder", ctx_r0.placeholder())("mode", ctx_r0.currency() ? "currency" : "decimal")("locale", ctx_r0.locale())("localeMatcher", ctx_r0.localeMatcher())("currency", ctx_r0.currency())("currencyDisplay", ctx_r0.currencyDisplay())("useGrouping", ctx_r0.useGrouping())("pt", ctx_r0.ptm("pcFilterInputNumber"))("unstyled", ctx_r0.unstyled());
			ɵɵcontrol();
		}
	}
	function ColumnFilterFormElement_Conditional_1_Case_2_Template(rf, ctx) {
		if (rf & 1) {
			const _r4 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "p-checkbox", 7);
			ɵɵcontrolCreate();
			ɵɵlistener("ngModelChange", function ColumnFilterFormElement_Conditional_1_Case_2_Template_p_checkbox_ngModelChange_0_listener($event) {
				ɵɵrestoreView(_r4);
				const ctx_r0 = ɵɵnextContext(2);
				return ɵɵresetView(ctx_r0.onModelChange($event));
			});
			ɵɵelementEnd();
		}
		if (rf & 2) {
			var _ctx_r0$filterConstra3, _ctx_r0$filterConstra4;
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵproperty("pt", ctx_r0.ptm("pcFilterCheckbox"))("indeterminate", ((_ctx_r0$filterConstra3 = ctx_r0.filterConstraint()) === null || _ctx_r0$filterConstra3 === void 0 ? void 0 : _ctx_r0$filterConstra3.value) === null)("binary", true)("ngModel", (_ctx_r0$filterConstra4 = ctx_r0.filterConstraint()) === null || _ctx_r0$filterConstra4 === void 0 ? void 0 : _ctx_r0$filterConstra4.value)("ngModelOptions", ɵɵpureFunction0(6, _c0))("unstyled", ctx_r0.unstyled());
			ɵɵcontrol();
		}
	}
	function ColumnFilterFormElement_Conditional_1_Case_3_Template(rf, ctx) {
		if (rf & 1) {
			const _r5 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "p-datepicker", 8);
			ɵɵcontrolCreate();
			ɵɵlistener("ngModelChange", function ColumnFilterFormElement_Conditional_1_Case_3_Template_p_datepicker_ngModelChange_0_listener($event) {
				ɵɵrestoreView(_r5);
				const ctx_r0 = ɵɵnextContext(2);
				return ɵɵresetView(ctx_r0.onModelChange($event));
			});
			ɵɵelementEnd();
		}
		if (rf & 2) {
			var _ctx_r0$filterConstra5;
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵproperty("pt", ctx_r0.ptm("pcFilterDatePicker"))("ariaLabel", ctx_r0.ariaLabel())("placeholder", ctx_r0.placeholder())("ngModel", (_ctx_r0$filterConstra5 = ctx_r0.filterConstraint()) === null || _ctx_r0$filterConstra5 === void 0 ? void 0 : _ctx_r0$filterConstra5.value)("ngModelOptions", ɵɵpureFunction0(6, _c0))("unstyled", ctx_r0.unstyled());
			ɵɵcontrol();
		}
	}
	function ColumnFilterFormElement_Conditional_1_Template(rf, ctx) {
		if (rf & 1) ɵɵconditionalCreate(0, ColumnFilterFormElement_Conditional_1_Case_0_Template, 1, 5, "input", 1)(1, ColumnFilterFormElement_Conditional_1_Case_1_Template, 1, 18, "p-input-number", 2)(2, ColumnFilterFormElement_Conditional_1_Case_2_Template, 1, 7, "p-checkbox", 3)(3, ColumnFilterFormElement_Conditional_1_Case_3_Template, 1, 7, "p-datepicker", 4);
		if (rf & 2) {
			let tmp_1_0 = void 0;
			const ctx_r0 = ɵɵnextContext();
			ɵɵconditional((tmp_1_0 = ctx_r0.type()) === "text" ? 0 : tmp_1_0 === "numeric" ? 1 : tmp_1_0 === "boolean" ? 2 : tmp_1_0 === "date" ? 3 : -1);
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _ColumnFilterFormElement,
		selectors: [["p-column-filter-form-element"], ["p-columnfilterformelement"]],
		inputs: {
			field: [1, "field"],
			type: [1, "type"],
			filterConstraint: [1, "filterConstraint"],
			filterTemplate: [1, "filterTemplate"],
			placeholder: [1, "placeholder"],
			minFractionDigits: [1, "minFractionDigits"],
			maxFractionDigits: [1, "maxFractionDigits"],
			prefix: [1, "prefix"],
			suffix: [1, "suffix"],
			locale: [1, "locale"],
			localeMatcher: [1, "localeMatcher"],
			currency: [1, "currency"],
			currencyDisplay: [1, "currencyDisplay"],
			useGrouping: [1, "useGrouping"],
			ariaLabel: [1, "ariaLabel"],
			filterOn: [1, "filterOn"]
		},
		features: [
			ɵɵProvidersFeature([TableStyle]),
			ɵɵHostDirectivesFeature([Bind]),
			ɵɵInheritDefinitionFeature
		],
		decls: 2,
		vars: 1,
		consts: [
			[
				4,
				"ngTemplateOutlet",
				"ngTemplateOutletContext"
			],
			[
				"type",
				"text",
				"pInputText",
				"",
				3,
				"ariaLabel",
				"pt",
				"value",
				"unstyled"
			],
			[
				3,
				"ngModel",
				"ngModelOptions",
				"showButtons",
				"minFractionDigits",
				"maxFractionDigits",
				"ariaLabel",
				"prefix",
				"suffix",
				"placeholder",
				"mode",
				"locale",
				"localeMatcher",
				"currency",
				"currencyDisplay",
				"useGrouping",
				"pt",
				"unstyled"
			],
			[
				3,
				"pt",
				"indeterminate",
				"binary",
				"ngModel",
				"ngModelOptions",
				"unstyled"
			],
			[
				"appendTo",
				"body",
				3,
				"pt",
				"ariaLabel",
				"placeholder",
				"ngModel",
				"ngModelOptions",
				"unstyled"
			],
			[
				"type",
				"text",
				"pInputText",
				"",
				3,
				"input",
				"keydown.enter",
				"ariaLabel",
				"pt",
				"value",
				"unstyled"
			],
			[
				3,
				"ngModelChange",
				"onKeyDown",
				"ngModel",
				"ngModelOptions",
				"showButtons",
				"minFractionDigits",
				"maxFractionDigits",
				"ariaLabel",
				"prefix",
				"suffix",
				"placeholder",
				"mode",
				"locale",
				"localeMatcher",
				"currency",
				"currencyDisplay",
				"useGrouping",
				"pt",
				"unstyled"
			],
			[
				3,
				"ngModelChange",
				"pt",
				"indeterminate",
				"binary",
				"ngModel",
				"ngModelOptions",
				"unstyled"
			],
			[
				"appendTo",
				"body",
				3,
				"ngModelChange",
				"pt",
				"ariaLabel",
				"placeholder",
				"ngModel",
				"ngModelOptions",
				"unstyled"
			]
		],
		template: function ColumnFilterFormElement_Template(rf, ctx) {
			if (rf & 1) ɵɵconditionalCreate(0, ColumnFilterFormElement_Conditional_0_Template, 1, 2, "ng-container")(1, ColumnFilterFormElement_Conditional_1_Template, 4, 1);
			if (rf & 2) ɵɵconditional(ctx.filterTemplate() ? 0 : 1);
		},
		dependencies: [
			NgTemplateOutlet,
			FormsModule,
			NgControlStatus,
			NgModel,
			InputTextModule,
			InputText,
			InputNumberModule,
			InputNumber,
			CheckboxModule,
			Checkbox,
			DatePickerModule,
			DatePicker,
			BindModule
		],
		encapsulation: 2
	});
})()), _ColumnFilterFormElement);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ColumnFilterFormElement, [{
		type: Component,
		args: [{
			selector: "p-column-filter-form-element, p-columnfilterformelement",
			standalone: true,
			imports: [
				NgTemplateOutlet,
				FormsModule,
				InputTextModule,
				InputNumberModule,
				CheckboxModule,
				DatePickerModule,
				BindModule
			],
			template: `
        @if (filterTemplate()) {
            <ng-container *ngTemplateOutlet="filterTemplate(); context: filterTemplateContext()" />
        } @else {
            @switch (type()) {
                @case ('text') {
                    <input
                        type="text"
                        [ariaLabel]="ariaLabel()"
                        pInputText
                        [pt]="ptm('pcFilterInputText')"
                        [value]="filterConstraint()?.value"
                        (input)="onModelChange($event.target.value)"
                        (keydown.enter)="onTextInputEnterKeyDown($event)"
                        [attr.placeholder]="placeholder()"
                        [unstyled]="unstyled()"
                    />
                }
                @case ('numeric') {
                    <p-input-number
                        [ngModel]="filterConstraint()?.value"
                        [ngModelOptions]="{ standalone: true }"
                        (ngModelChange)="onModelChange($event)"
                        (onKeyDown)="onNumericInputKeyDown($event)"
                        [showButtons]="showButtons()"
                        [minFractionDigits]="minFractionDigits()"
                        [maxFractionDigits]="maxFractionDigits()"
                        [ariaLabel]="ariaLabel()"
                        [prefix]="prefix()"
                        [suffix]="suffix()"
                        [placeholder]="placeholder()"
                        [mode]="currency() ? 'currency' : 'decimal'"
                        [locale]="locale()"
                        [localeMatcher]="localeMatcher()"
                        [currency]="currency()"
                        [currencyDisplay]="currencyDisplay()"
                        [useGrouping]="useGrouping()"
                        [pt]="ptm('pcFilterInputNumber')"
                        [unstyled]="unstyled()"
                    />
                }
                @case ('boolean') {
                    <p-checkbox
                        [pt]="ptm('pcFilterCheckbox')"
                        [indeterminate]="filterConstraint()?.value === null"
                        [binary]="true"
                        [ngModel]="filterConstraint()?.value"
                        [ngModelOptions]="{ standalone: true }"
                        (ngModelChange)="onModelChange($event)"
                        [unstyled]="unstyled()"
                    />
                }
                @case ('date') {
                    <p-datepicker
                        [pt]="ptm('pcFilterDatePicker')"
                        [ariaLabel]="ariaLabel()"
                        [placeholder]="placeholder()"
                        [ngModel]="filterConstraint()?.value"
                        [ngModelOptions]="{ standalone: true }"
                        (ngModelChange)="onModelChange($event)"
                        appendTo="body"
                        [unstyled]="unstyled()"
                    />
                }
            }
        }
    `,
			providers: [TableStyle],
			encapsulation: ViewEncapsulation.None,
			hostDirectives: [Bind]
		}]
	}], () => [], {
		field: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "field",
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
		filterConstraint: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "filterConstraint",
				required: false
			}]
		}],
		filterTemplate: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "filterTemplate",
				required: false
			}]
		}],
		placeholder: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "placeholder",
				required: false
			}]
		}],
		minFractionDigits: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "minFractionDigits",
				required: false
			}]
		}],
		maxFractionDigits: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "maxFractionDigits",
				required: false
			}]
		}],
		prefix: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "prefix",
				required: false
			}]
		}],
		suffix: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "suffix",
				required: false
			}]
		}],
		locale: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "locale",
				required: false
			}]
		}],
		localeMatcher: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "localeMatcher",
				required: false
			}]
		}],
		currency: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "currency",
				required: false
			}]
		}],
		currencyDisplay: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "currencyDisplay",
				required: false
			}]
		}],
		useGrouping: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "useGrouping",
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
		filterOn: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "filterOn",
				required: false
			}]
		}]
	});
})();
var ColumnFilter = (_ColumnFilter = class ColumnFilter extends BaseComponent {
	get fieldConstraints() {
		return this.dataTable.filters ? this.dataTable.filters[this.field()] : null;
	}
	get rowFilterConstraint() {
		return this.dataTable.filters[this.field()];
	}
	get showRemoveIcon() {
		return this.fieldConstraints ? this.fieldConstraints.length > 1 : false;
	}
	get showMenuButton() {
		return this.showMenu() && (this.display() === "row" ? this.type() !== "boolean" : true);
	}
	get isShowOperator() {
		return this.showOperator() && this.type() !== "boolean";
	}
	get isShowAddConstraint() {
		return this.showAddButton() && this.type() !== "boolean" && this.fieldConstraints && this.fieldConstraints.length < this.maxConstraints();
	}
	get showMenuButtonLabel() {
		return this.translate(TranslationKeys.SHOW_FILTER_MENU);
	}
	get applyButtonLabel() {
		return this.translate(TranslationKeys.APPLY);
	}
	get clearButtonLabel() {
		return this.translate(TranslationKeys.CLEAR);
	}
	get addRuleButtonLabel() {
		return this.translate(TranslationKeys.ADD_RULE);
	}
	get removeRuleButtonLabel() {
		return this.translate(TranslationKeys.REMOVE_RULE);
	}
	get noFilterLabel() {
		return this.translate(TranslationKeys.NO_FILTER);
	}
	get filterMenuButtonAriaLabel() {
		var _this$config3, _this$config4, _this$config5;
		return ((_this$config3 = this.config) === null || _this$config3 === void 0 ? void 0 : _this$config3.translation) ? this.overlayVisible ? (_this$config4 = this.config) === null || _this$config4 === void 0 || (_this$config4 = _this$config4.translation) === null || _this$config4 === void 0 || (_this$config4 = _this$config4.aria) === null || _this$config4 === void 0 ? void 0 : _this$config4.hideFilterMenu : (_this$config5 = this.config) === null || _this$config5 === void 0 || (_this$config5 = _this$config5.translation) === null || _this$config5 === void 0 || (_this$config5 = _this$config5.aria) === null || _this$config5 === void 0 ? void 0 : _this$config5.showFilterMenu : void 0;
	}
	get removeRuleButtonAriaLabel() {
		var _this$config6, _this$config7;
		return ((_this$config6 = this.config) === null || _this$config6 === void 0 ? void 0 : _this$config6.translation) ? (_this$config7 = this.config) === null || _this$config7 === void 0 || (_this$config7 = _this$config7.translation) === null || _this$config7 === void 0 ? void 0 : _this$config7.removeRule : void 0;
	}
	get filterOperatorAriaLabel() {
		var _this$config8, _this$config9;
		return ((_this$config8 = this.config) === null || _this$config8 === void 0 ? void 0 : _this$config8.translation) ? (_this$config9 = this.config) === null || _this$config9 === void 0 || (_this$config9 = _this$config9.translation) === null || _this$config9 === void 0 || (_this$config9 = _this$config9.aria) === null || _this$config9 === void 0 ? void 0 : _this$config9.filterOperator : void 0;
	}
	get filterConstraintAriaLabel() {
		var _this$config10, _this$config11;
		return ((_this$config10 = this.config) === null || _this$config10 === void 0 ? void 0 : _this$config10.translation) ? (_this$config11 = this.config) === null || _this$config11 === void 0 || (_this$config11 = _this$config11.translation) === null || _this$config11 === void 0 || (_this$config11 = _this$config11.aria) === null || _this$config11 === void 0 ? void 0 : _this$config11.filterConstraint : void 0;
	}
	constructor() {
		super();
		_defineProperty(this, "hostName", "Table");
		_defineProperty(this, "bindDirectiveInstance", inject(Bind, { self: true }));
		_defineProperty(this, "_componentStyle", inject(TableStyle));
		_defineProperty(this, "field", input(...ngDevMode ? [void 0, { debugName: "field" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "type", input("text", ...ngDevMode ? [{ debugName: "type" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "display", input("row", ...ngDevMode ? [{ debugName: "display" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "showMenu", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "showMenu" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "matchMode", input(...ngDevMode ? [void 0, { debugName: "matchMode" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "operator", model(FilterOperator.AND, ...ngDevMode ? [{ debugName: "operator" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "showOperator", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "showOperator" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "showClearButton", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "showClearButton" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "showApplyButton", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "showApplyButton" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "showMatchModes", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "showMatchModes" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "showAddButton", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "showAddButton" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "hideOnClear", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "hideOnClear" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "placeholder", input(...ngDevMode ? [void 0, { debugName: "placeholder" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "matchModeOptions", input(...ngDevMode ? [void 0, { debugName: "matchModeOptions" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "maxConstraints", input(2, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "maxConstraints" } : /* istanbul ignore next */ {}), {}, { transform: numberAttribute })));
		_defineProperty(this, "minFractionDigits", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "minFractionDigits" } : /* istanbul ignore next */ {}), {}, { transform: (v) => numberAttribute(v, void 0) })));
		_defineProperty(this, "maxFractionDigits", input(void 0, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "maxFractionDigits" } : /* istanbul ignore next */ {}), {}, { transform: (v) => numberAttribute(v, void 0) })));
		_defineProperty(this, "prefix", input(...ngDevMode ? [void 0, { debugName: "prefix" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "suffix", input(...ngDevMode ? [void 0, { debugName: "suffix" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "locale", input(...ngDevMode ? [void 0, { debugName: "locale" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "localeMatcher", input(...ngDevMode ? [void 0, { debugName: "localeMatcher" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "currency", input(...ngDevMode ? [void 0, { debugName: "currency" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "currencyDisplay", input(...ngDevMode ? [void 0, { debugName: "currencyDisplay" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "filterOn", input("enter", ...ngDevMode ? [{ debugName: "filterOn" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "useGrouping", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "useGrouping" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "showButtons", input(true, _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "showButtons" } : /* istanbul ignore next */ {}), {}, { transform: booleanAttribute })));
		_defineProperty(this, "ariaLabel", input(...ngDevMode ? [void 0, { debugName: "ariaLabel" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "filterButtonProps", input({}, ...ngDevMode ? [{ debugName: "filterButtonProps" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "computedFilterButtonProps", computed(() => {
			var _this$filterButtonPro, _props$inline, _props$popover, _props$popover2, _props$popover3, _props$popover4, _props$popover5;
			const props = (_this$filterButtonPro = this.filterButtonProps()) !== null && _this$filterButtonPro !== void 0 ? _this$filterButtonPro : {};
			return {
				filter: _objectSpread2({
					severity: "secondary",
					variant: "text",
					rounded: true
				}, props.filter),
				inline: { clear: _objectSpread2({
					severity: "secondary",
					variant: "text",
					rounded: true
				}, (_props$inline = props.inline) === null || _props$inline === void 0 ? void 0 : _props$inline.clear) },
				popover: {
					addRule: _objectSpread2({
						severity: "info",
						variant: "text",
						size: "small"
					}, (_props$popover = props.popover) === null || _props$popover === void 0 ? void 0 : _props$popover.addRule),
					removeRule: _objectSpread2({
						severity: "danger",
						variant: "text",
						size: "small"
					}, (_props$popover2 = props.popover) === null || _props$popover2 === void 0 ? void 0 : _props$popover2.removeRule),
					apply: _objectSpread2({ size: "small" }, (_props$popover3 = props.popover) === null || _props$popover3 === void 0 ? void 0 : _props$popover3.apply),
					clear: _objectSpread2({
						variant: ((_props$popover4 = props.popover) === null || _props$popover4 === void 0 || (_props$popover4 = _props$popover4.clear) === null || _props$popover4 === void 0 ? void 0 : _props$popover4.outlined) === false ? void 0 : "outlined",
						size: "small"
					}, (_props$popover5 = props.popover) === null || _props$popover5 === void 0 ? void 0 : _props$popover5.clear)
				}
			};
		}, ...ngDevMode ? [{ debugName: "computedFilterButtonProps" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "motionOptions", input(void 0, ...ngDevMode ? [{ debugName: "motionOptions" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "computedMotionOptions", computed(() => _objectSpread2(_objectSpread2({}, this.ptm("motion")), this.motionOptions()), ...ngDevMode ? [{ debugName: "computedMotionOptions" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "onShow", output());
		_defineProperty(this, "onHide", output());
		_defineProperty(this, "icon", viewChild("menuButton", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "icon" } : /* istanbul ignore next */ {}), {}, { read: ElementRef })));
		_defineProperty(this, "clearButtonViewChild", viewChild("clearBtn", ...ngDevMode ? [{ debugName: "clearButtonViewChild" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "overlaySubscription", void 0);
		_defineProperty(this, "renderOverlay", signal(false, ...ngDevMode ? [{ debugName: "renderOverlay" }] : /* istanbul ignore next */ []));
		_defineProperty(this, "headerTemplate", contentChild("header", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "headerTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "filterTemplate", contentChild("filter", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "filterTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "footerTemplate", contentChild("footer", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "footerTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "filterIconTemplate", contentChild("filtericon", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "filterIconTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "removeRuleIconTemplate", contentChild("removeruleicon", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "removeRuleIconTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "addRuleIconTemplate", contentChild("addruleicon", _objectSpread2(_objectSpread2({}, ngDevMode ? { debugName: "addRuleIconTemplate" } : /* istanbul ignore next */ {}), {}, { descendants: false })));
		_defineProperty(this, "operatorOptions", void 0);
		_defineProperty(this, "overlayVisible", void 0);
		_defineProperty(this, "overlay", void 0);
		_defineProperty(this, "scrollHandler", void 0);
		_defineProperty(this, "documentClickListener", void 0);
		_defineProperty(this, "documentResizeListener", void 0);
		_defineProperty(this, "matchModes", void 0);
		_defineProperty(this, "selfClick", void 0);
		_defineProperty(this, "overlayEventListener", void 0);
		_defineProperty(this, "overlayId", void 0);
		_defineProperty(this, "filterApplied", false);
		_defineProperty(this, "dataTable", inject(TABLE_INSTANCE));
		_defineProperty(this, "overlayService", inject(OverlayService));
		this.config.translationObserver.pipe(takeUntilDestroyed()).subscribe(() => {
			this.generateMatchModeOptions();
			this.generateOperatorOptions();
		});
		this.dataTable.tableService.valueSource$.pipe(takeUntilDestroyed()).subscribe(() => {
			this.setHasFilter(true);
			this.cd.markForCheck();
		});
	}
	onAfterViewChecked() {
		this.bindDirectiveInstance.setAttrs(this.ptm("columnFilter"));
	}
	ptmFilterConstraintOptions(matchMode) {
		return { context: { highlighted: matchMode && this.isRowMatchModeSelected(matchMode.value) } };
	}
	onInit() {
		this.overlayId = this.$useId.next("pn_id_");
		if (!this.dataTable.filters[this.field()]) this.initFieldFilterConstraint();
		this.generateMatchModeOptions();
		this.generateOperatorOptions();
	}
	generateMatchModeOptions() {
		var _this$config$filterMa;
		this.matchModes = this.matchModeOptions() || ((_this$config$filterMa = this.config.filterMatchModeOptions[this.type()]) === null || _this$config$filterMa === void 0 ? void 0 : _this$config$filterMa.map((key) => ({
			label: this.translate(key),
			value: key
		})));
	}
	generateOperatorOptions() {
		this.operatorOptions = [{
			label: this.translate(TranslationKeys.MATCH_ALL),
			value: FilterOperator.AND
		}, {
			label: this.translate(TranslationKeys.MATCH_ANY),
			value: FilterOperator.OR
		}];
	}
	initFieldFilterConstraint() {
		let defaultMatchMode = this.getDefaultMatchMode();
		this.dataTable.filters[this.field()] = this.display() == "row" ? {
			value: null,
			matchMode: defaultMatchMode
		} : [{
			value: null,
			matchMode: defaultMatchMode,
			operator: this.operator()
		}];
	}
	onMenuMatchModeChange(value, filterMeta) {
		filterMeta.matchMode = value;
		if (!this.showApplyButton()) this.dataTable._filter();
	}
	onRowMatchModeChange(matchMode) {
		const fieldFilter = this.dataTable.filters[this.field()];
		fieldFilter.matchMode = matchMode;
		if (!this.dataTable.isFilterBlank(fieldFilter.value)) this.dataTable._filter();
		this.hide();
	}
	onRowMatchModeKeyDown(event) {
		let item = event.target;
		switch (event.key) {
			case "ArrowDown": {
				const nextItem = this.findNextItem(item);
				if (nextItem) {
					item.removeAttribute("tabindex");
					nextItem.tabIndex = "0";
					nextItem.focus();
				}
				event.preventDefault();
				break;
			}
			case "ArrowUp": {
				const prevItem = this.findPrevItem(item);
				if (prevItem) {
					item.removeAttribute("tabindex");
					prevItem.tabIndex = "0";
					prevItem.focus();
				}
				event.preventDefault();
				break;
			}
		}
	}
	onRowClearItemClick() {
		this.clearFilter();
		this.hide();
	}
	isRowMatchModeSelected(matchMode) {
		return this.dataTable.filters[this.field()].matchMode === matchMode;
	}
	addConstraint() {
		var _this$clearButtonView;
		this.dataTable.filters[this.field()].push({
			value: null,
			matchMode: this.getDefaultMatchMode(),
			operator: this.getDefaultOperator()
		});
		DomHandler.focus((_this$clearButtonView = this.clearButtonViewChild()) === null || _this$clearButtonView === void 0 ? void 0 : _this$clearButtonView.nativeElement);
	}
	removeConstraint(filterMeta) {
		var _this$clearButtonView2;
		this.dataTable.filters[this.field()] = this.dataTable.filters[this.field()].filter((meta) => meta !== filterMeta);
		if (!this.showApplyButton()) this.dataTable._filter();
		DomHandler.focus((_this$clearButtonView2 = this.clearButtonViewChild()) === null || _this$clearButtonView2 === void 0 ? void 0 : _this$clearButtonView2.nativeElement);
	}
	onOperatorChange(value) {
		this.dataTable.filters[this.field()].forEach((filterMeta) => {
			filterMeta.operator = value;
			this.operator.set(value);
		});
		if (!this.showApplyButton()) this.dataTable._filter();
	}
	toggleMenu(event) {
		this.overlayVisible = !this.overlayVisible;
		if (this.overlayVisible) this.renderOverlay.set(true);
		event.stopPropagation();
	}
	onToggleButtonKeyDown(event) {
		switch (event.key) {
			case "Escape":
			case "Tab":
				this.overlayVisible = false;
				break;
			case "ArrowDown":
				if (this.overlayVisible) {
					let focusable = DomHandler.getFocusableElements(this.overlay);
					if (focusable) focusable[0].focus();
					event.preventDefault();
				} else if (event.altKey) {
					this.overlayVisible = true;
					event.preventDefault();
				}
				break;
			case "Enter":
				this.toggleMenu(event);
				event.preventDefault();
		}
	}
	onEscape() {
		var _this$icon;
		this.overlayVisible = false;
		(_this$icon = this.icon()) === null || _this$icon === void 0 || _this$icon.nativeElement.focus();
	}
	findNextItem(item) {
		var _item$parentElement;
		let nextItem = item.nextElementSibling;
		if (nextItem) return ot(nextItem, "[data-pc-section=\"filterconstraintseparator\"]") ? this.findNextItem(nextItem) : nextItem;
		else return (_item$parentElement = item.parentElement) === null || _item$parentElement === void 0 ? void 0 : _item$parentElement.firstElementChild;
	}
	findPrevItem(item) {
		var _item$parentElement2;
		let prevItem = item.previousElementSibling;
		if (prevItem) return ot(prevItem, "[data-pc-section=\"filterconstraintseparator\"]") ? this.findPrevItem(prevItem) : prevItem;
		else return (_item$parentElement2 = item.parentElement) === null || _item$parentElement2 === void 0 ? void 0 : _item$parentElement2.lastElementChild;
	}
	onContentClick() {
		this.selfClick = true;
	}
	onOverlayBeforeEnter(event) {
		this.overlay = event.element;
		if (this.overlay && this.overlay.parentElement !== this.document.body) {
			const buttonEl = nt(this.el.nativeElement, "[data-pc-name=\"pccolumnfilterbutton\"]");
			Ct(this.$overlayParent(this.document.body, this.overlay), this.overlay);
			C$3(this.overlay, {
				position: "absolute",
				top: "0"
			});
			z(this.overlay, buttonEl);
			zindexutils_default.set("overlay", this.overlay, this.config.zIndex.overlay);
		}
		this.bindDocumentClickListener();
		this.bindDocumentResizeListener();
		this.bindScrollListener();
		this.overlayEventListener = (e) => {
			if (this.overlay && this.overlay.contains(e.target)) this.selfClick = true;
		};
		this.overlaySubscription = this.overlayService.clickObservable.subscribe(this.overlayEventListener);
		this.onShow.emit({ originalEvent: event });
		this.focusOnFirstElement();
	}
	onOverlayAnimationAfterLeave(event) {
		const overlay = this.overlay;
		this.restoreOverlayAppend();
		this.onOverlayHide();
		this.renderOverlay.set(false);
		if (this.overlaySubscription) this.overlaySubscription.unsubscribe();
		zindexutils_default.clear(overlay);
		this.onHide.emit({ originalEvent: event });
	}
	restoreOverlayAppend() {
		if (this.overlay) this.el.nativeElement.appendChild(this.overlay);
	}
	focusOnFirstElement() {
		if (this.overlay) DomHandler.focus(DomHandler.getFirstFocusableElement(this.overlay, ""));
	}
	getDefaultMatchMode() {
		if (this.matchMode()) return this.matchMode();
		else if (this.type() === "text") return FilterMatchMode.STARTS_WITH;
		else if (this.type() === "numeric") return FilterMatchMode.EQUALS;
		else if (this.type() === "date") return FilterMatchMode.DATE_IS;
		else return FilterMatchMode.CONTAINS;
	}
	getDefaultOperator() {
		return this.dataTable.filters ? this.dataTable.filters[this.field()][0].operator : this.operator();
	}
	hasRowFilter() {
		return this.dataTable.filters[this.field()] && !this.dataTable.isFilterBlank(this.dataTable.filters[this.field()].value);
	}
	setHasFilter(newValue) {
		let fieldFilter = this.dataTable.filters[this.field()];
		if (fieldFilter && newValue) {
			if (Array.isArray(fieldFilter)) this.filterApplied = !this.dataTable.isFilterBlank(fieldFilter[0].value);
			else this.filterApplied = !this.dataTable.isFilterBlank(fieldFilter.value);
		} else this.filterApplied = false;
	}
	get hasFilter() {
		var _this$fieldConstraint, _this$fieldConstraint2;
		if (!Array.isArray(this.fieldConstraints) && ((_this$fieldConstraint = this.fieldConstraints) === null || _this$fieldConstraint === void 0 ? void 0 : _this$fieldConstraint.applyFilter)) {
			delete this.fieldConstraints.applyFilter;
			this.setHasFilter(true);
		} else if (Array.isArray(this.fieldConstraints) && ((_this$fieldConstraint2 = this.fieldConstraints[0]) === null || _this$fieldConstraint2 === void 0 ? void 0 : _this$fieldConstraint2.applyFilter)) {
			delete this.fieldConstraints[0].applyFilter;
			this.setHasFilter(true);
		}
		if (!this.filterApplied) return false;
		this.setHasFilter(true);
		return this.filterApplied;
	}
	isOutsideClicked(event) {
		var _this$el13, _this$overlay, _this$overlay2, _this$icon2, _this$icon3;
		const node = getEventTarget(event, (_this$el13 = this.el) === null || _this$el13 === void 0 ? void 0 : _this$el13.nativeElement);
		const overlayNode = getEventTarget(event, this.overlay);
		return !(nt(this.overlay.nextElementSibling, "[data-pc-section=\"filteroverlay\"]") || nt(this.overlay.nextElementSibling, "[data-pc-name=\"popover\"]") || ((_this$overlay = this.overlay) === null || _this$overlay === void 0 ? void 0 : _this$overlay.isSameNode(overlayNode)) || ((_this$overlay2 = this.overlay) === null || _this$overlay2 === void 0 ? void 0 : _this$overlay2.contains(overlayNode)) || ((_this$icon2 = this.icon()) === null || _this$icon2 === void 0 ? void 0 : _this$icon2.nativeElement.isSameNode(node)) || ((_this$icon3 = this.icon()) === null || _this$icon3 === void 0 ? void 0 : _this$icon3.nativeElement.contains(node)) || nt(overlayNode, "[data-pc-name=\"pcaddrulebuttonlabel\"]") || nt(overlayNode.parentElement, "[data-pc-name=\"pcaddrulebuttonlabel\"]") || nt(overlayNode, "[data-pc-name=\"pcfilterremoverulebutton\"]") || nt(overlayNode.parentElement, "[data-pc-name=\"pcfilterremoverulebutton\"]"));
	}
	bindDocumentClickListener() {
		if (!this.documentClickListener) {
			const documentTarget = this.el ? this.el.nativeElement.ownerDocument : "document";
			this.documentClickListener = this.renderer.listen(documentTarget, "mousedown", (event) => {
				var _this$el14;
				const dialogElements = document.querySelectorAll("[role=\"dialog\"]");
				const targetIsColumnFilterMenuButton = getEventTarget(event, (_this$el14 = this.el) === null || _this$el14 === void 0 ? void 0 : _this$el14.nativeElement).closest("[data-pc-name=\"pccolumnfilterbutton\"]");
				if (this.overlayVisible && this.isOutsideClicked(event) && (targetIsColumnFilterMenuButton || (dialogElements === null || dialogElements === void 0 ? void 0 : dialogElements.length) <= 1)) this.hide();
				this.selfClick = false;
			});
		}
	}
	unbindDocumentClickListener() {
		if (this.documentClickListener) {
			this.documentClickListener();
			this.documentClickListener = null;
			this.selfClick = false;
		}
	}
	bindDocumentResizeListener() {
		if (!this.documentResizeListener) this.documentResizeListener = this.renderer.listen(this.document.defaultView, "resize", () => {
			if (this.overlayVisible && !DomHandler.isTouchDevice()) this.hide();
		});
	}
	unbindDocumentResizeListener() {
		if (this.documentResizeListener) {
			this.documentResizeListener();
			this.documentResizeListener = null;
		}
	}
	bindScrollListener() {
		var _this$icon4;
		if (!this.scrollHandler) this.scrollHandler = new ConnectedOverlayScrollHandler((_this$icon4 = this.icon()) === null || _this$icon4 === void 0 ? void 0 : _this$icon4.nativeElement, () => {
			if (this.overlayVisible) this.hide();
		});
		this.scrollHandler.bindScrollListener();
	}
	unbindScrollListener() {
		if (this.scrollHandler) this.scrollHandler.unbindScrollListener();
	}
	hide() {
		this.overlayVisible = false;
		if (this.overlay) zindexutils_default.revertZIndex(zindexutils_default.get(this.overlay));
		this.cd.markForCheck();
	}
	onOverlayHide() {
		this.unbindDocumentClickListener();
		this.unbindDocumentResizeListener();
		this.unbindScrollListener();
		this.overlay = null;
	}
	clearFilter() {
		this.initFieldFilterConstraint();
		this.setHasFilter(false);
		this.dataTable._filter();
		if (this.hideOnClear()) this.hide();
	}
	applyFilter() {
		this.setHasFilter(true);
		this.dataTable._filter();
		this.hide();
	}
	onDestroy() {
		if (this.overlay) {
			this.restoreOverlayAppend();
			zindexutils_default.clear(this.overlay);
			this.onOverlayHide();
		}
		if (this.overlaySubscription) this.overlaySubscription.unsubscribe();
	}
}, _defineProperty(_ColumnFilter, "ɵfac", function ColumnFilter_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _ColumnFilter)();
}), _defineProperty(_ColumnFilter, "ɵcmp", (function() {
	const _c0 = ["header"];
	const _c1 = ["filter"];
	const _c2 = ["footer"];
	const _c3 = ["filtericon"];
	const _c4 = ["removeruleicon"];
	const _c5 = ["addruleicon"];
	const _c6 = ["menuButton"];
	const _c7 = ["clearBtn"];
	const _c8 = (a0) => ({ hasFilter: a0 });
	const _c9 = (a0) => ({ $implicit: a0 });
	const _c10 = () => ({ standalone: true });
	const _forTrack0 = ($index, $item) => $item.value;
	function ColumnFilter_Conditional_1_Template(rf, ctx) {
		if (rf & 1) ɵɵelement(0, "p-column-filter-form-element", 5);
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵclassMap(ctx_r0.cx("filterElementContainer"));
			ɵɵproperty("type", ctx_r0.type())("field", ctx_r0.field())("ariaLabel", ctx_r0.ariaLabel())("filterConstraint", ctx_r0.rowFilterConstraint)("filterTemplate", ctx_r0.filterTemplate())("placeholder", ctx_r0.placeholder())("minFractionDigits", ctx_r0.minFractionDigits())("maxFractionDigits", ctx_r0.maxFractionDigits())("prefix", ctx_r0.prefix())("suffix", ctx_r0.suffix())("locale", ctx_r0.locale())("localeMatcher", ctx_r0.localeMatcher())("currency", ctx_r0.currency())("currencyDisplay", ctx_r0.currencyDisplay())("useGrouping", ctx_r0.useGrouping())("filterOn", ctx_r0.filterOn())("pt", ctx_r0.pt())("unstyled", ctx_r0.unstyled());
		}
	}
	function ColumnFilter_Conditional_2_Conditional_2_1_ng_template_0_Template(rf, ctx) {}
	function ColumnFilter_Conditional_2_Conditional_2_1_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, ColumnFilter_Conditional_2_Conditional_2_1_ng_template_0_Template, 0, 0, "ng-template");
	}
	function ColumnFilter_Conditional_2_Conditional_2_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "span", 7);
			ɵɵtemplate(1, ColumnFilter_Conditional_2_Conditional_2_1_Template, 1, 0, null, 10);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵproperty("pBind", ctx_r0.ptm("pcColumnFilterButton")["icon"]);
			ɵɵattribute("data-pc-section", "columnfilterbuttonicon");
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", ctx_r0.filterIconTemplate())("ngTemplateOutletContext", ɵɵpureFunction1(4, _c8, ctx_r0.hasFilter));
		}
	}
	function ColumnFilter_Conditional_2_Conditional_3_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 8);
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵproperty("pBind", ctx_r0.ptm("pcColumnFilterButton")["icon"]);
		}
	}
	function ColumnFilter_Conditional_2_Conditional_4_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 9);
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵproperty("pBind", ctx_r0.ptm("pcColumnFilterButton")["icon"]);
		}
	}
	function ColumnFilter_Conditional_2_Template(rf, ctx) {
		if (rf & 1) {
			const _r2 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "button", 6, 0);
			ɵɵlistener("click", function ColumnFilter_Conditional_2_Template_button_click_0_listener($event) {
				ɵɵrestoreView(_r2);
				const ctx_r0 = ɵɵnextContext();
				return ɵɵresetView(ctx_r0.toggleMenu($event));
			})("keydown", function ColumnFilter_Conditional_2_Template_button_keydown_0_listener($event) {
				ɵɵrestoreView(_r2);
				const ctx_r0 = ɵɵnextContext();
				return ɵɵresetView(ctx_r0.onToggleButtonKeyDown($event));
			});
			ɵɵconditionalCreate(2, ColumnFilter_Conditional_2_Conditional_2_Template, 2, 6, "span", 7)(3, ColumnFilter_Conditional_2_Conditional_3_Template, 1, 1, "svg", 8)(4, ColumnFilter_Conditional_2_Conditional_4_Template, 1, 1, "svg", 9);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			var _ctx_r0$overlayVisibl;
			const ctx_r0 = ɵɵnextContext();
			ɵɵclassMap(ctx_r0.cx("pcColumnFilterButton"));
			ɵɵproperty("pButton", ctx_r0.computedFilterButtonProps().filter)("pButtonPT", ctx_r0.ptm("pcColumnFilterButton"))("pButtonUnstyled", ctx_r0.unstyled());
			ɵɵattribute("aria-haspopup", true)("aria-label", ctx_r0.filterMenuButtonAriaLabel)("aria-controls", ctx_r0.overlayVisible ? ctx_r0.overlayId : null)("aria-expanded", (_ctx_r0$overlayVisibl = ctx_r0.overlayVisible) !== null && _ctx_r0$overlayVisibl !== void 0 ? _ctx_r0$overlayVisibl : false);
			ɵɵadvance(2);
			ɵɵconditional(ctx_r0.filterIconTemplate() ? 2 : ctx_r0.hasFilter ? 3 : 4);
		}
	}
	function ColumnFilter_Conditional_3_ng_container_1_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function ColumnFilter_Conditional_3_Conditional_2_For_2_Template(rf, ctx) {
		if (rf & 1) {
			const _r5 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "li", 13);
			ɵɵlistener("click", function ColumnFilter_Conditional_3_Conditional_2_For_2_Template_li_click_0_listener() {
				const matchMode_r6 = ɵɵrestoreView(_r5).$implicit;
				const ctx_r0 = ɵɵnextContext(3);
				return ɵɵresetView(ctx_r0.onRowMatchModeChange(matchMode_r6.value));
			})("keydown", function ColumnFilter_Conditional_3_Conditional_2_For_2_Template_li_keydown_0_listener($event) {
				ɵɵrestoreView(_r5);
				const ctx_r0 = ɵɵnextContext(3);
				return ɵɵresetView(ctx_r0.onRowMatchModeKeyDown($event));
			})("keydown.enter", function ColumnFilter_Conditional_3_Conditional_2_For_2_Template_li_keydown_enter_0_listener() {
				const matchMode_r6 = ɵɵrestoreView(_r5).$implicit;
				const ctx_r0 = ɵɵnextContext(3);
				return ɵɵresetView(ctx_r0.onRowMatchModeChange(matchMode_r6.value));
			});
			ɵɵtext(1);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const matchMode_r6 = ctx.$implicit;
			const ɵ$index_32_r7 = ctx.$index;
			const ctx_r0 = ɵɵnextContext(3);
			ɵɵclassMap(ctx_r0.cn(ctx_r0.cx("filterConstraint"), ctx_r0.isRowMatchModeSelected(matchMode_r6.value) ? ctx_r0.pcn("p-datatable-filter-constraint-selected") : void 0));
			ɵɵproperty("pBind", ctx_r0.ptm("filterConstraint", ctx_r0.ptmFilterConstraintOptions(matchMode_r6)));
			ɵɵattribute("tabindex", ɵ$index_32_r7 === 0 ? "0" : null);
			ɵɵadvance();
			ɵɵtextInterpolate1(" ", matchMode_r6.label, " ");
		}
	}
	function ColumnFilter_Conditional_3_Conditional_2_Template(rf, ctx) {
		if (rf & 1) {
			const _r4 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "ul", 7);
			ɵɵrepeaterCreate(1, ColumnFilter_Conditional_3_Conditional_2_For_2_Template, 2, 5, "li", 12, _forTrack0);
			ɵɵelement(3, "li", 7);
			ɵɵelementStart(4, "li", 13);
			ɵɵlistener("click", function ColumnFilter_Conditional_3_Conditional_2_Template_li_click_4_listener() {
				ɵɵrestoreView(_r4);
				const ctx_r0 = ɵɵnextContext(2);
				return ɵɵresetView(ctx_r0.onRowClearItemClick());
			})("keydown", function ColumnFilter_Conditional_3_Conditional_2_Template_li_keydown_4_listener($event) {
				ɵɵrestoreView(_r4);
				const ctx_r0 = ɵɵnextContext(2);
				return ɵɵresetView(ctx_r0.onRowMatchModeKeyDown($event));
			})("keydown.enter", function ColumnFilter_Conditional_3_Conditional_2_Template_li_keydown_enter_4_listener() {
				ɵɵrestoreView(_r4);
				const ctx_r0 = ɵɵnextContext(2);
				return ɵɵresetView(ctx_r0.onRowClearItemClick());
			});
			ɵɵtext(5);
			ɵɵelementEnd()();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵclassMap(ctx_r0.cx("filterConstraintList"));
			ɵɵproperty("pBind", ctx_r0.ptm("filterConstraintList"));
			ɵɵadvance();
			ɵɵrepeater(ctx_r0.matchModes);
			ɵɵadvance(2);
			ɵɵclassMap(ctx_r0.cx("filterConstraintSeparator"));
			ɵɵproperty("pBind", ctx_r0.ptm("filterConstraintSeparator"));
			ɵɵadvance();
			ɵɵclassMap(ctx_r0.cx("filterConstraint"));
			ɵɵproperty("pBind", ctx_r0.ptm("emtpyFilterLabel"));
			ɵɵadvance();
			ɵɵtextInterpolate1(" ", ctx_r0.noFilterLabel, " ");
		}
	}
	function ColumnFilter_Conditional_3_Conditional_3_Conditional_0_Template(rf, ctx) {
		if (rf & 1) {
			const _r8 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "div", 7)(1, "p-select", 17);
			ɵɵcontrolCreate();
			ɵɵlistener("ngModelChange", function ColumnFilter_Conditional_3_Conditional_3_Conditional_0_Template_p_select_ngModelChange_1_listener($event) {
				ɵɵrestoreView(_r8);
				const ctx_r0 = ɵɵnextContext(3);
				return ɵɵresetView(ctx_r0.onOperatorChange($event));
			});
			ɵɵelementEnd()();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(3);
			ɵɵclassMap(ctx_r0.cx("filterOperator"));
			ɵɵproperty("pBind", ctx_r0.ptm("filterOperator"));
			ɵɵadvance();
			ɵɵclassMap(ctx_r0.cx("pcFilterOperatorDropdown"));
			ɵɵproperty("options", ctx_r0.operatorOptions)("pt", ctx_r0.ptm("pcFilterOperatorDropdown"))("ngModel", ctx_r0.operator())("ngModelOptions", ɵɵpureFunction0(10, _c10))("unstyled", ctx_r0.unstyled());
			ɵɵcontrol();
		}
	}
	function ColumnFilter_Conditional_3_Conditional_3_For_3_Conditional_1_Template(rf, ctx) {
		if (rf & 1) {
			const _r9 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "p-select", 21);
			ɵɵcontrolCreate();
			ɵɵlistener("ngModelChange", function ColumnFilter_Conditional_3_Conditional_3_For_3_Conditional_1_Template_p_select_ngModelChange_0_listener($event) {
				ɵɵrestoreView(_r9);
				const fieldConstraint_r10 = ɵɵnextContext().$implicit;
				const ctx_r0 = ɵɵnextContext(3);
				return ɵɵresetView(ctx_r0.onMenuMatchModeChange($event, fieldConstraint_r10));
			});
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const fieldConstraint_r10 = ɵɵnextContext().$implicit;
			const ctx_r0 = ɵɵnextContext(3);
			ɵɵclassMap(ctx_r0.cx("pcFilterConstraintDropdown"));
			ɵɵproperty("options", ctx_r0.matchModes)("ngModel", fieldConstraint_r10.matchMode)("ngModelOptions", ɵɵpureFunction0(7, _c10))("pt", ctx_r0.ptm("pcFilterConstraintDropdown"))("unstyled", ctx_r0.unstyled());
			ɵɵcontrol();
		}
	}
	function ColumnFilter_Conditional_3_Conditional_3_For_3_Conditional_4_Conditional_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 23);
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(5);
			ɵɵproperty("pBind", ctx_r0.ptm("pcFilterRemoveRuleButton")["icon"]);
		}
	}
	function ColumnFilter_Conditional_3_Conditional_3_For_3_Conditional_4_2_ng_template_0_Template(rf, ctx) {}
	function ColumnFilter_Conditional_3_Conditional_3_For_3_Conditional_4_2_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, ColumnFilter_Conditional_3_Conditional_3_For_3_Conditional_4_2_ng_template_0_Template, 0, 0, "ng-template");
	}
	function ColumnFilter_Conditional_3_Conditional_3_For_3_Conditional_4_Template(rf, ctx) {
		if (rf & 1) {
			const _r11 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "button", 22);
			ɵɵlistener("click", function ColumnFilter_Conditional_3_Conditional_3_For_3_Conditional_4_Template_button_click_0_listener() {
				ɵɵrestoreView(_r11);
				const fieldConstraint_r10 = ɵɵnextContext().$implicit;
				const ctx_r0 = ɵɵnextContext(3);
				return ɵɵresetView(ctx_r0.removeConstraint(fieldConstraint_r10));
			});
			ɵɵconditionalCreate(1, ColumnFilter_Conditional_3_Conditional_3_For_3_Conditional_4_Conditional_1_Template, 1, 1, "svg", 23);
			ɵɵtemplate(2, ColumnFilter_Conditional_3_Conditional_3_For_3_Conditional_4_2_Template, 1, 0, null, 24);
			ɵɵtext(3);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(4);
			ɵɵclassMap(ctx_r0.cx("pcFilterRemoveRuleButton"));
			ɵɵproperty("pButton", ctx_r0.computedFilterButtonProps().popover.removeRule)("pButtonPT", ctx_r0.ptm("pcFilterRemoveRuleButton"))("pButtonUnstyled", ctx_r0.unstyled());
			ɵɵattribute("aria-label", ctx_r0.removeRuleButtonLabel);
			ɵɵadvance();
			ɵɵconditional(!ctx_r0.removeRuleIconTemplate() ? 1 : -1);
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", ctx_r0.removeRuleIconTemplate());
			ɵɵadvance();
			ɵɵtextInterpolate1(" ", ctx_r0.removeRuleButtonLabel, " ");
		}
	}
	function ColumnFilter_Conditional_3_Conditional_3_For_3_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵelementStart(0, "div", 7);
			ɵɵconditionalCreate(1, ColumnFilter_Conditional_3_Conditional_3_For_3_Conditional_1_Template, 1, 8, "p-select", 18);
			ɵɵelement(2, "p-column-filter-form-element", 19);
			ɵɵelementStart(3, "div");
			ɵɵconditionalCreate(4, ColumnFilter_Conditional_3_Conditional_3_For_3_Conditional_4_Template, 4, 9, "button", 20);
			ɵɵelementEnd()();
		}
		if (rf & 2) {
			const fieldConstraint_r10 = ctx.$implicit;
			const ctx_r0 = ɵɵnextContext(3);
			ɵɵclassMap(ctx_r0.cx("filterRule"));
			ɵɵproperty("pBind", ctx_r0.ptm("filterRule"));
			ɵɵadvance();
			ɵɵconditional(ctx_r0.showMatchModes() && ctx_r0.matchModes ? 1 : -1);
			ɵɵadvance();
			ɵɵproperty("type", ctx_r0.type())("field", ctx_r0.field())("filterConstraint", fieldConstraint_r10)("filterTemplate", ctx_r0.filterTemplate())("placeholder", ctx_r0.placeholder())("minFractionDigits", ctx_r0.minFractionDigits())("maxFractionDigits", ctx_r0.maxFractionDigits())("prefix", ctx_r0.prefix())("suffix", ctx_r0.suffix())("locale", ctx_r0.locale())("localeMatcher", ctx_r0.localeMatcher())("currency", ctx_r0.currency())("currencyDisplay", ctx_r0.currencyDisplay())("useGrouping", ctx_r0.useGrouping())("filterOn", ctx_r0.filterOn())("pt", ctx_r0.pt())("unstyled", ctx_r0.unstyled());
			ɵɵadvance(2);
			ɵɵconditional(ctx_r0.showRemoveIcon ? 4 : -1);
		}
	}
	function ColumnFilter_Conditional_3_Conditional_3_Conditional_4_Conditional_1_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵnamespaceSVG();
			ɵɵelement(0, "svg", 26);
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(4);
			ɵɵproperty("pBind", ctx_r0.ptm("pcAddRuleButtonLabel")["icon"]);
		}
	}
	function ColumnFilter_Conditional_3_Conditional_3_Conditional_4_2_ng_template_0_Template(rf, ctx) {}
	function ColumnFilter_Conditional_3_Conditional_3_Conditional_4_2_Template(rf, ctx) {
		if (rf & 1) ɵɵtemplate(0, ColumnFilter_Conditional_3_Conditional_3_Conditional_4_2_ng_template_0_Template, 0, 0, "ng-template");
	}
	function ColumnFilter_Conditional_3_Conditional_3_Conditional_4_Template(rf, ctx) {
		if (rf & 1) {
			const _r12 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "button", 25);
			ɵɵlistener("click", function ColumnFilter_Conditional_3_Conditional_3_Conditional_4_Template_button_click_0_listener() {
				ɵɵrestoreView(_r12);
				const ctx_r0 = ɵɵnextContext(3);
				return ɵɵresetView(ctx_r0.addConstraint());
			});
			ɵɵconditionalCreate(1, ColumnFilter_Conditional_3_Conditional_3_Conditional_4_Conditional_1_Template, 1, 1, "svg", 26);
			ɵɵtemplate(2, ColumnFilter_Conditional_3_Conditional_3_Conditional_4_2_Template, 1, 0, null, 24);
			ɵɵtext(3);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(3);
			ɵɵclassMap(ctx_r0.cx("pcFilterAddRuleButton"));
			ɵɵproperty("pButton", ctx_r0.computedFilterButtonProps().popover.addRule)("pButtonPT", ctx_r0.ptm("pcAddRuleButtonLabel"))("pButtonUnstyled", ctx_r0.unstyled());
			ɵɵattribute("aria-label", ctx_r0.addRuleButtonLabel);
			ɵɵadvance();
			ɵɵconditional(!ctx_r0.addRuleIconTemplate() ? 1 : -1);
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", ctx_r0.addRuleIconTemplate());
			ɵɵadvance();
			ɵɵtextInterpolate1(" ", ctx_r0.addRuleButtonLabel, " ");
		}
	}
	function ColumnFilter_Conditional_3_Conditional_3_Conditional_6_Template(rf, ctx) {
		if (rf & 1) {
			const _r13 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "button", 27, 1);
			ɵɵlistener("click", function ColumnFilter_Conditional_3_Conditional_3_Conditional_6_Template_button_click_0_listener() {
				ɵɵrestoreView(_r13);
				const ctx_r0 = ɵɵnextContext(3);
				return ɵɵresetView(ctx_r0.clearFilter());
			});
			ɵɵtext(2);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(3);
			ɵɵproperty("pButton", ctx_r0.computedFilterButtonProps().popover.clear)("pButtonPT", ctx_r0.ptm("pcFilterClearButton"))("pButtonUnstyled", ctx_r0.unstyled());
			ɵɵattribute("aria-label", ctx_r0.clearButtonLabel);
			ɵɵadvance(2);
			ɵɵtextInterpolate1(" ", ctx_r0.clearButtonLabel, " ");
		}
	}
	function ColumnFilter_Conditional_3_Conditional_3_Conditional_7_Template(rf, ctx) {
		if (rf & 1) {
			const _r14 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "button", 28);
			ɵɵlistener("click", function ColumnFilter_Conditional_3_Conditional_3_Conditional_7_Template_button_click_0_listener() {
				ɵɵrestoreView(_r14);
				const ctx_r0 = ɵɵnextContext(3);
				return ɵɵresetView(ctx_r0.applyFilter());
			});
			ɵɵtext(1);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(3);
			ɵɵproperty("pButton", ctx_r0.computedFilterButtonProps().popover.apply)("pButtonPT", ctx_r0.ptm("pcFilterApplyButton"))("pButtonUnstyled", ctx_r0.unstyled());
			ɵɵattribute("aria-label", ctx_r0.applyButtonLabel);
			ɵɵadvance();
			ɵɵtextInterpolate1(" ", ctx_r0.applyButtonLabel, " ");
		}
	}
	function ColumnFilter_Conditional_3_Conditional_3_Template(rf, ctx) {
		if (rf & 1) {
			ɵɵconditionalCreate(0, ColumnFilter_Conditional_3_Conditional_3_Conditional_0_Template, 2, 11, "div", 12);
			ɵɵelementStart(1, "div", 7);
			ɵɵrepeaterCreate(2, ColumnFilter_Conditional_3_Conditional_3_For_3_Template, 5, 22, "div", 12, ɵɵrepeaterTrackByIndex);
			ɵɵelementEnd();
			ɵɵconditionalCreate(4, ColumnFilter_Conditional_3_Conditional_3_Conditional_4_Template, 4, 9, "button", 14);
			ɵɵelementStart(5, "div", 7);
			ɵɵconditionalCreate(6, ColumnFilter_Conditional_3_Conditional_3_Conditional_6_Template, 3, 5, "button", 15);
			ɵɵconditionalCreate(7, ColumnFilter_Conditional_3_Conditional_3_Conditional_7_Template, 2, 5, "button", 16);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext(2);
			ɵɵconditional(ctx_r0.isShowOperator ? 0 : -1);
			ɵɵadvance();
			ɵɵclassMap(ctx_r0.cx("filterRuleList"));
			ɵɵproperty("pBind", ctx_r0.ptm("filterRuleList"));
			ɵɵadvance();
			ɵɵrepeater(ctx_r0.fieldConstraints);
			ɵɵadvance(2);
			ɵɵconditional(ctx_r0.isShowAddConstraint ? 4 : -1);
			ɵɵadvance();
			ɵɵclassMap(ctx_r0.cx("filterButtonbar"));
			ɵɵproperty("pBind", ctx_r0.ptm("filterButtonBar"));
			ɵɵadvance();
			ɵɵconditional(ctx_r0.showClearButton() ? 6 : -1);
			ɵɵadvance();
			ɵɵconditional(ctx_r0.showApplyButton() ? 7 : -1);
		}
	}
	function ColumnFilter_Conditional_3_ng_container_4_Template(rf, ctx) {
		if (rf & 1) ɵɵelementContainer(0);
	}
	function ColumnFilter_Conditional_3_Template(rf, ctx) {
		if (rf & 1) {
			const _r3 = ɵɵgetCurrentView();
			ɵɵelementStart(0, "div", 11);
			ɵɵlistener("pMotionOnBeforeEnter", function ColumnFilter_Conditional_3_Template_div_pMotionOnBeforeEnter_0_listener($event) {
				ɵɵrestoreView(_r3);
				const ctx_r0 = ɵɵnextContext();
				return ɵɵresetView(ctx_r0.onOverlayBeforeEnter($event));
			})("pMotionOnAfterLeave", function ColumnFilter_Conditional_3_Template_div_pMotionOnAfterLeave_0_listener($event) {
				ɵɵrestoreView(_r3);
				const ctx_r0 = ɵɵnextContext();
				return ɵɵresetView(ctx_r0.onOverlayAnimationAfterLeave($event));
			})("click", function ColumnFilter_Conditional_3_Template_div_click_0_listener() {
				ɵɵrestoreView(_r3);
				const ctx_r0 = ɵɵnextContext();
				return ɵɵresetView(ctx_r0.onContentClick());
			})("keydown.escape", function ColumnFilter_Conditional_3_Template_div_keydown_escape_0_listener() {
				ɵɵrestoreView(_r3);
				const ctx_r0 = ɵɵnextContext();
				return ɵɵresetView(ctx_r0.onEscape());
			});
			ɵɵtemplate(1, ColumnFilter_Conditional_3_ng_container_1_Template, 1, 0, "ng-container", 10);
			ɵɵconditionalCreate(2, ColumnFilter_Conditional_3_Conditional_2_Template, 6, 10, "ul", 12)(3, ColumnFilter_Conditional_3_Conditional_3_Template, 8, 10);
			ɵɵtemplate(4, ColumnFilter_Conditional_3_ng_container_4_Template, 1, 0, "ng-container", 10);
			ɵɵelementEnd();
		}
		if (rf & 2) {
			const ctx_r0 = ɵɵnextContext();
			ɵɵclassMap(ctx_r0.cx("filterOverlay"));
			ɵɵproperty("pMotion", ctx_r0.showMenu() && ctx_r0.overlayVisible)("pMotionAppear", true)("pMotionName", ctx_r0.pcn("p-anchored-overlay"))("pMotionOptions", ctx_r0.computedMotionOptions())("pBind", ctx_r0.ptm("filterOverlay"))("id", ctx_r0.overlayId);
			ɵɵattribute("aria-modal", true);
			ɵɵadvance();
			ɵɵproperty("ngTemplateOutlet", ctx_r0.headerTemplate())("ngTemplateOutletContext", ɵɵpureFunction1(14, _c9, ctx_r0.field()));
			ɵɵadvance();
			ɵɵconditional(ctx_r0.display() === "row" ? 2 : 3);
			ɵɵadvance(2);
			ɵɵproperty("ngTemplateOutlet", ctx_r0.footerTemplate())("ngTemplateOutletContext", ɵɵpureFunction1(16, _c9, ctx_r0.field()));
		}
	}
	return /*@__PURE__*/ ɵɵdefineComponent({
		type: _ColumnFilter,
		selectors: [["p-column-filter"], ["p-columnfilter"]],
		contentQueries: function ColumnFilter_ContentQueries(rf, ctx, dirIndex) {
			if (rf & 1) ɵɵcontentQuerySignal(dirIndex, ctx.headerTemplate, _c0, 4)(dirIndex, ctx.filterTemplate, _c1, 4)(dirIndex, ctx.footerTemplate, _c2, 4)(dirIndex, ctx.filterIconTemplate, _c3, 4)(dirIndex, ctx.removeRuleIconTemplate, _c4, 4)(dirIndex, ctx.addRuleIconTemplate, _c5, 4);
			if (rf & 2) ɵɵqueryAdvance(6);
		},
		viewQuery: function ColumnFilter_Query(rf, ctx) {
			if (rf & 1) ɵɵviewQuerySignal(ctx.icon, _c6, 5, ElementRef)(ctx.clearButtonViewChild, _c7, 5);
			if (rf & 2) ɵɵqueryAdvance(2);
		},
		inputs: {
			field: [1, "field"],
			type: [1, "type"],
			display: [1, "display"],
			showMenu: [1, "showMenu"],
			matchMode: [1, "matchMode"],
			operator: [1, "operator"],
			showOperator: [1, "showOperator"],
			showClearButton: [1, "showClearButton"],
			showApplyButton: [1, "showApplyButton"],
			showMatchModes: [1, "showMatchModes"],
			showAddButton: [1, "showAddButton"],
			hideOnClear: [1, "hideOnClear"],
			placeholder: [1, "placeholder"],
			matchModeOptions: [1, "matchModeOptions"],
			maxConstraints: [1, "maxConstraints"],
			minFractionDigits: [1, "minFractionDigits"],
			maxFractionDigits: [1, "maxFractionDigits"],
			prefix: [1, "prefix"],
			suffix: [1, "suffix"],
			locale: [1, "locale"],
			localeMatcher: [1, "localeMatcher"],
			currency: [1, "currency"],
			currencyDisplay: [1, "currencyDisplay"],
			filterOn: [1, "filterOn"],
			useGrouping: [1, "useGrouping"],
			showButtons: [1, "showButtons"],
			ariaLabel: [1, "ariaLabel"],
			filterButtonProps: [1, "filterButtonProps"],
			motionOptions: [1, "motionOptions"]
		},
		outputs: {
			operator: "operatorChange",
			onShow: "onShow",
			onHide: "onHide"
		},
		features: [
			ɵɵProvidersFeature([TableStyle, {
				provide: COLUMN_FILTER_INSTANCE,
				useExisting: _ColumnFilter
			}]),
			ɵɵHostDirectivesFeature([Bind]),
			ɵɵInheritDefinitionFeature
		],
		decls: 4,
		vars: 5,
		consts: [
			["menuButton", ""],
			["clearBtn", ""],
			[
				3,
				"class",
				"type",
				"field",
				"ariaLabel",
				"filterConstraint",
				"filterTemplate",
				"placeholder",
				"minFractionDigits",
				"maxFractionDigits",
				"prefix",
				"suffix",
				"locale",
				"localeMatcher",
				"currency",
				"currencyDisplay",
				"useGrouping",
				"filterOn",
				"pt",
				"unstyled"
			],
			[
				"type",
				"button",
				"iconOnly",
				"",
				3,
				"pButton",
				"class",
				"pButtonPT",
				"pButtonUnstyled"
			],
			[
				"role",
				"dialog",
				3,
				"pMotion",
				"pMotionAppear",
				"pMotionName",
				"pMotionOptions",
				"class",
				"pBind",
				"id"
			],
			[
				3,
				"type",
				"field",
				"ariaLabel",
				"filterConstraint",
				"filterTemplate",
				"placeholder",
				"minFractionDigits",
				"maxFractionDigits",
				"prefix",
				"suffix",
				"locale",
				"localeMatcher",
				"currency",
				"currencyDisplay",
				"useGrouping",
				"filterOn",
				"pt",
				"unstyled"
			],
			[
				"type",
				"button",
				"iconOnly",
				"",
				3,
				"click",
				"keydown",
				"pButton",
				"pButtonPT",
				"pButtonUnstyled"
			],
			[3, "pBind"],
			[
				"data-p-icon",
				"filter-fill",
				3,
				"pBind"
			],
			[
				"data-p-icon",
				"filter",
				3,
				"pBind"
			],
			[
				4,
				"ngTemplateOutlet",
				"ngTemplateOutletContext"
			],
			[
				"role",
				"dialog",
				3,
				"pMotionOnBeforeEnter",
				"pMotionOnAfterLeave",
				"click",
				"keydown.escape",
				"pMotion",
				"pMotionAppear",
				"pMotionName",
				"pMotionOptions",
				"pBind",
				"id"
			],
			[
				3,
				"class",
				"pBind"
			],
			[
				3,
				"click",
				"keydown",
				"keydown.enter",
				"pBind"
			],
			[
				"type",
				"button",
				"text",
				"",
				"size",
				"small",
				3,
				"pButton",
				"class",
				"pButtonPT",
				"pButtonUnstyled"
			],
			[
				"type",
				"button",
				3,
				"pButton",
				"pButtonPT",
				"pButtonUnstyled"
			],
			[
				"type",
				"button",
				"size",
				"small",
				3,
				"pButton",
				"pButtonPT",
				"pButtonUnstyled"
			],
			[
				3,
				"ngModelChange",
				"options",
				"pt",
				"ngModel",
				"ngModelOptions",
				"unstyled"
			],
			[
				3,
				"options",
				"ngModel",
				"ngModelOptions",
				"class",
				"pt",
				"unstyled"
			],
			[
				3,
				"type",
				"field",
				"filterConstraint",
				"filterTemplate",
				"placeholder",
				"minFractionDigits",
				"maxFractionDigits",
				"prefix",
				"suffix",
				"locale",
				"localeMatcher",
				"currency",
				"currencyDisplay",
				"useGrouping",
				"filterOn",
				"pt",
				"unstyled"
			],
			[
				"type",
				"button",
				"text",
				"",
				"severity",
				"danger",
				"size",
				"small",
				3,
				"pButton",
				"class",
				"pButtonPT",
				"pButtonUnstyled"
			],
			[
				3,
				"ngModelChange",
				"options",
				"ngModel",
				"ngModelOptions",
				"pt",
				"unstyled"
			],
			[
				"type",
				"button",
				"text",
				"",
				"severity",
				"danger",
				"size",
				"small",
				3,
				"click",
				"pButton",
				"pButtonPT",
				"pButtonUnstyled"
			],
			[
				"data-p-icon",
				"trash",
				3,
				"pBind"
			],
			[4, "ngTemplateOutlet"],
			[
				"type",
				"button",
				"text",
				"",
				"size",
				"small",
				3,
				"click",
				"pButton",
				"pButtonPT",
				"pButtonUnstyled"
			],
			[
				"data-p-icon",
				"plus",
				3,
				"pBind"
			],
			[
				"type",
				"button",
				3,
				"click",
				"pButton",
				"pButtonPT",
				"pButtonUnstyled"
			],
			[
				"type",
				"button",
				"size",
				"small",
				3,
				"click",
				"pButton",
				"pButtonPT",
				"pButtonUnstyled"
			]
		],
		template: function ColumnFilter_Template(rf, ctx) {
			if (rf & 1) {
				ɵɵelementStart(0, "div");
				ɵɵconditionalCreate(1, ColumnFilter_Conditional_1_Template, 1, 20, "p-column-filter-form-element", 2);
				ɵɵconditionalCreate(2, ColumnFilter_Conditional_2_Template, 5, 10, "button", 3);
				ɵɵconditionalCreate(3, ColumnFilter_Conditional_3_Template, 5, 18, "div", 4);
				ɵɵelementEnd();
			}
			if (rf & 2) {
				ɵɵclassMap(ctx.cx("filter"));
				ɵɵadvance();
				ɵɵconditional(ctx.display() === "row" ? 1 : -1);
				ɵɵadvance();
				ɵɵconditional(ctx.showMenuButton ? 2 : -1);
				ɵɵadvance();
				ɵɵconditional(ctx.renderOverlay() ? 3 : -1);
			}
		},
		dependencies: [
			NgTemplateOutlet,
			FormsModule,
			NgControlStatus,
			NgModel,
			ButtonModule,
			ButtonDirective,
			SelectModule,
			Select,
			InputTextModule,
			InputNumberModule,
			CheckboxModule,
			DatePickerModule,
			BindModule,
			Bind,
			MotionModule,
			MotionDirective,
			Filter,
			FilterFill,
			Trash,
			Plus,
			ColumnFilterFormElement
		],
		encapsulation: 2
	});
})()), _ColumnFilter);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ColumnFilter, [{
		type: Component,
		args: [{
			selector: "p-column-filter, p-columnfilter",
			standalone: true,
			imports: [
				NgTemplateOutlet,
				FormsModule,
				ButtonModule,
				SelectModule,
				InputTextModule,
				InputNumberModule,
				CheckboxModule,
				DatePickerModule,
				BindModule,
				MotionModule,
				Filter,
				FilterFill,
				Trash,
				Plus,
				ColumnFilterFormElement
			],
			template: `
        <div [class]="cx('filter')">
            @if (display() === 'row') {
                <p-column-filter-form-element
                    [class]="cx('filterElementContainer')"
                    [type]="type()"
                    [field]="field()"
                    [ariaLabel]="ariaLabel()"
                    [filterConstraint]="rowFilterConstraint"
                    [filterTemplate]="filterTemplate()"
                    [placeholder]="placeholder()"
                    [minFractionDigits]="minFractionDigits()"
                    [maxFractionDigits]="maxFractionDigits()"
                    [prefix]="prefix()"
                    [suffix]="suffix()"
                    [locale]="locale()"
                    [localeMatcher]="localeMatcher()"
                    [currency]="currency()"
                    [currencyDisplay]="currencyDisplay()"
                    [useGrouping]="useGrouping()"
                    [filterOn]="filterOn()"
                    [pt]="pt()"
                    [unstyled]="unstyled()"
                />
            }
            @if (showMenuButton) {
                <button
                    #menuButton
                    type="button"
                    iconOnly
                    [pButton]="computedFilterButtonProps().filter"
                    [class]="cx('pcColumnFilterButton')"
                    [attr.aria-haspopup]="true"
                    [attr.aria-label]="filterMenuButtonAriaLabel"
                    [attr.aria-controls]="overlayVisible ? overlayId : null"
                    [attr.aria-expanded]="overlayVisible ?? false"
                    [pButtonPT]="ptm('pcColumnFilterButton')"
                    [pButtonUnstyled]="unstyled()"
                    (click)="toggleMenu($event)"
                    (keydown)="onToggleButtonKeyDown($event)"
                >
                    @if (filterIconTemplate()) {
                        <span [pBind]="ptm('pcColumnFilterButton')['icon']" [attr.data-pc-section]="'columnfilterbuttonicon'">
                            <ng-template *ngTemplateOutlet="filterIconTemplate(); context: { hasFilter: hasFilter }" />
                        </span>
                    } @else if (hasFilter) {
                        <svg data-p-icon="filter-fill" [pBind]="ptm('pcColumnFilterButton')['icon']" />
                    } @else {
                        <svg data-p-icon="filter" [pBind]="ptm('pcColumnFilterButton')['icon']" />
                    }
                </button>
            }
            @if (renderOverlay()) {
                <div
                    [pMotion]="showMenu() && overlayVisible"
                    [pMotionAppear]="true"
                    [pMotionName]="pcn('p-anchored-overlay')"
                    (pMotionOnBeforeEnter)="onOverlayBeforeEnter($event)"
                    (pMotionOnAfterLeave)="onOverlayAnimationAfterLeave($event)"
                    [pMotionOptions]="computedMotionOptions()"
                    [class]="cx('filterOverlay')"
                    [pBind]="ptm('filterOverlay')"
                    [id]="overlayId"
                    [attr.aria-modal]="true"
                    role="dialog"
                    (click)="onContentClick()"
                    (keydown.escape)="onEscape()"
                >
                    <ng-container *ngTemplateOutlet="headerTemplate(); context: { $implicit: field() }" />
                    @if (display() === 'row') {
                        <ul [class]="cx('filterConstraintList')" [pBind]="ptm('filterConstraintList')">
                            @for (matchMode of matchModes; track matchMode.value; let i = $index) {
                                <li
                                    (click)="onRowMatchModeChange(matchMode.value)"
                                    (keydown)="onRowMatchModeKeyDown($event)"
                                    (keydown.enter)="onRowMatchModeChange(matchMode.value)"
                                    [class]="cn(cx('filterConstraint'), isRowMatchModeSelected(matchMode.value) ? pcn('p-datatable-filter-constraint-selected') : undefined)"
                                    [pBind]="ptm('filterConstraint', ptmFilterConstraintOptions(matchMode))"
                                    [attr.tabindex]="i === 0 ? '0' : null"
                                >
                                    {{ matchMode.label }}
                                </li>
                            }
                            <li [class]="cx('filterConstraintSeparator')" [pBind]="ptm('filterConstraintSeparator')"></li>
                            <li [class]="cx('filterConstraint')" [pBind]="ptm('emtpyFilterLabel')" (click)="onRowClearItemClick()" (keydown)="onRowMatchModeKeyDown($event)" (keydown.enter)="onRowClearItemClick()">
                                {{ noFilterLabel }}
                            </li>
                        </ul>
                    } @else {
                        @if (isShowOperator) {
                            <div [class]="cx('filterOperator')" [pBind]="ptm('filterOperator')">
                                <p-select
                                    [options]="operatorOptions"
                                    [pt]="ptm('pcFilterOperatorDropdown')"
                                    [ngModel]="operator()"
                                    [ngModelOptions]="{ standalone: true }"
                                    (ngModelChange)="onOperatorChange($event)"
                                    [class]="cx('pcFilterOperatorDropdown')"
                                    [unstyled]="unstyled()"
                                />
                            </div>
                        }
                        <div [class]="cx('filterRuleList')" [pBind]="ptm('filterRuleList')">
                            @for (fieldConstraint of fieldConstraints; track $index; let i = $index) {
                                <div [class]="cx('filterRule')" [pBind]="ptm('filterRule')">
                                    @if (showMatchModes() && matchModes) {
                                        <p-select
                                            [options]="matchModes"
                                            [ngModel]="fieldConstraint.matchMode"
                                            [ngModelOptions]="{ standalone: true }"
                                            (ngModelChange)="onMenuMatchModeChange($event, fieldConstraint)"
                                            [class]="cx('pcFilterConstraintDropdown')"
                                            [pt]="ptm('pcFilterConstraintDropdown')"
                                            [unstyled]="unstyled()"
                                        />
                                    }
                                    <p-column-filter-form-element
                                        [type]="type()"
                                        [field]="field()"
                                        [filterConstraint]="fieldConstraint"
                                        [filterTemplate]="filterTemplate()"
                                        [placeholder]="placeholder()"
                                        [minFractionDigits]="minFractionDigits()"
                                        [maxFractionDigits]="maxFractionDigits()"
                                        [prefix]="prefix()"
                                        [suffix]="suffix()"
                                        [locale]="locale()"
                                        [localeMatcher]="localeMatcher()"
                                        [currency]="currency()"
                                        [currencyDisplay]="currencyDisplay()"
                                        [useGrouping]="useGrouping()"
                                        [filterOn]="filterOn()"
                                        [pt]="pt()"
                                        [unstyled]="unstyled()"
                                    />
                                    <div>
                                        @if (showRemoveIcon) {
                                            <button
                                                type="button"
                                                text
                                                severity="danger"
                                                size="small"
                                                [pButton]="computedFilterButtonProps().popover.removeRule"
                                                [class]="cx('pcFilterRemoveRuleButton')"
                                                [attr.aria-label]="removeRuleButtonLabel"
                                                [pButtonPT]="ptm('pcFilterRemoveRuleButton')"
                                                [pButtonUnstyled]="unstyled()"
                                                (click)="removeConstraint(fieldConstraint)"
                                            >
                                                @if (!removeRuleIconTemplate()) {
                                                    <svg data-p-icon="trash" [pBind]="ptm('pcFilterRemoveRuleButton')['icon']" />
                                                }
                                                <ng-template *ngTemplateOutlet="removeRuleIconTemplate()" />
                                                {{ removeRuleButtonLabel }}
                                            </button>
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                        @if (isShowAddConstraint) {
                            <button
                                type="button"
                                text
                                size="small"
                                [pButton]="computedFilterButtonProps().popover.addRule"
                                [class]="cx('pcFilterAddRuleButton')"
                                [attr.aria-label]="addRuleButtonLabel"
                                [pButtonPT]="ptm('pcAddRuleButtonLabel')"
                                [pButtonUnstyled]="unstyled()"
                                (click)="addConstraint()"
                            >
                                @if (!addRuleIconTemplate()) {
                                    <svg data-p-icon="plus" [pBind]="ptm('pcAddRuleButtonLabel')['icon']" />
                                }
                                <ng-template *ngTemplateOutlet="addRuleIconTemplate()" />
                                {{ addRuleButtonLabel }}
                            </button>
                        }
                        <div [class]="cx('filterButtonbar')" [pBind]="ptm('filterButtonBar')">
                            @if (showClearButton()) {
                                <button
                                    #clearBtn
                                    type="button"
                                    [pButton]="computedFilterButtonProps().popover.clear"
                                    [attr.aria-label]="clearButtonLabel"
                                    [pButtonPT]="ptm('pcFilterClearButton')"
                                    [pButtonUnstyled]="unstyled()"
                                    (click)="clearFilter()"
                                >
                                    {{ clearButtonLabel }}
                                </button>
                            }
                            @if (showApplyButton()) {
                                <button
                                    type="button"
                                    size="small"
                                    [pButton]="computedFilterButtonProps().popover.apply"
                                    [attr.aria-label]="applyButtonLabel"
                                    [pButtonPT]="ptm('pcFilterApplyButton')"
                                    [pButtonUnstyled]="unstyled()"
                                    (click)="applyFilter()"
                                >
                                    {{ applyButtonLabel }}
                                </button>
                            }
                        </div>
                    }
                    <ng-container *ngTemplateOutlet="footerTemplate(); context: { $implicit: field() }" />
                </div>
            }
        </div>
    `,
			providers: [TableStyle, {
				provide: COLUMN_FILTER_INSTANCE,
				useExisting: ColumnFilter
			}],
			encapsulation: ViewEncapsulation.None,
			hostDirectives: [Bind]
		}]
	}], () => [], {
		field: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "field",
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
		display: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "display",
				required: false
			}]
		}],
		showMenu: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "showMenu",
				required: false
			}]
		}],
		matchMode: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "matchMode",
				required: false
			}]
		}],
		operator: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "operator",
				required: false
			}]
		}, {
			type: Output,
			args: ["operatorChange"]
		}],
		showOperator: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "showOperator",
				required: false
			}]
		}],
		showClearButton: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "showClearButton",
				required: false
			}]
		}],
		showApplyButton: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "showApplyButton",
				required: false
			}]
		}],
		showMatchModes: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "showMatchModes",
				required: false
			}]
		}],
		showAddButton: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "showAddButton",
				required: false
			}]
		}],
		hideOnClear: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "hideOnClear",
				required: false
			}]
		}],
		placeholder: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "placeholder",
				required: false
			}]
		}],
		matchModeOptions: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "matchModeOptions",
				required: false
			}]
		}],
		maxConstraints: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "maxConstraints",
				required: false
			}]
		}],
		minFractionDigits: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "minFractionDigits",
				required: false
			}]
		}],
		maxFractionDigits: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "maxFractionDigits",
				required: false
			}]
		}],
		prefix: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "prefix",
				required: false
			}]
		}],
		suffix: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "suffix",
				required: false
			}]
		}],
		locale: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "locale",
				required: false
			}]
		}],
		localeMatcher: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "localeMatcher",
				required: false
			}]
		}],
		currency: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "currency",
				required: false
			}]
		}],
		currencyDisplay: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "currencyDisplay",
				required: false
			}]
		}],
		filterOn: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "filterOn",
				required: false
			}]
		}],
		useGrouping: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "useGrouping",
				required: false
			}]
		}],
		showButtons: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "showButtons",
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
		filterButtonProps: [{
			type: Input,
			args: [{
				isSignal: true,
				alias: "filterButtonProps",
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
		onShow: [{
			type: Output,
			args: ["onShow"]
		}],
		onHide: [{
			type: Output,
			args: ["onHide"]
		}],
		icon: [{
			type: ViewChild,
			args: ["menuButton", {
				read: ElementRef,
				isSignal: true
			}]
		}],
		clearButtonViewChild: [{
			type: ViewChild,
			args: ["clearBtn", { isSignal: true }]
		}],
		headerTemplate: [{
			type: ContentChild,
			args: ["header", {
				descendants: false,
				isSignal: true
			}]
		}],
		filterTemplate: [{
			type: ContentChild,
			args: ["filter", {
				descendants: false,
				isSignal: true
			}]
		}],
		footerTemplate: [{
			type: ContentChild,
			args: ["footer", {
				descendants: false,
				isSignal: true
			}]
		}],
		filterIconTemplate: [{
			type: ContentChild,
			args: ["filtericon", {
				descendants: false,
				isSignal: true
			}]
		}],
		removeRuleIconTemplate: [{
			type: ContentChild,
			args: ["removeruleicon", {
				descendants: false,
				isSignal: true
			}]
		}],
		addRuleIconTemplate: [{
			type: ContentChild,
			args: ["addruleicon", {
				descendants: false,
				isSignal: true
			}]
		}]
	});
})();
var TableModule = (_TableModule = class TableModule {}, _defineProperty(_TableModule, "ɵfac", function TableModule_Factory(__ngFactoryType__) {
	return new (__ngFactoryType__ || _TableModule)();
}), _defineProperty(_TableModule, "ɵmod", /*@__PURE__*/ ɵɵdefineNgModule({
	type: _TableModule,
	imports: [
		Table,
		TableBody,
		SortableColumn,
		FrozenColumn,
		RowGroupHeader,
		SelectableRow,
		RowToggler,
		ContextMenuRow,
		ResizableColumn,
		ReorderableColumn,
		EditableColumn,
		CellEditor,
		SortIcon,
		TableRadioButton,
		TableCheckbox,
		TableHeaderCheckbox,
		ReorderableRowHandle,
		ReorderableRow,
		SelectableRowDblClick,
		EditableRow,
		InitEditableRow,
		SaveEditableRow,
		CancelEditableRow,
		ColumnFilter,
		ColumnFilterFormElement
	],
	exports: [
		Table,
		SharedModule,
		SortableColumn,
		FrozenColumn,
		RowGroupHeader,
		SelectableRow,
		RowToggler,
		ContextMenuRow,
		ResizableColumn,
		ReorderableColumn,
		EditableColumn,
		CellEditor,
		SortIcon,
		TableRadioButton,
		TableCheckbox,
		TableHeaderCheckbox,
		ReorderableRowHandle,
		ReorderableRow,
		SelectableRowDblClick,
		EditableRow,
		InitEditableRow,
		SaveEditableRow,
		CancelEditableRow,
		ColumnFilter,
		ColumnFilterFormElement,
		ScrollerModule
	]
})), _defineProperty(_TableModule, "ɵinj", /*@__PURE__*/ ɵɵdefineInjector({ imports: [
	Table,
	SortIcon,
	TableRadioButton,
	TableCheckbox,
	TableHeaderCheckbox,
	ColumnFilter,
	ColumnFilterFormElement,
	SharedModule,
	ScrollerModule
] })), _TableModule);
(() => {
	(typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TableModule, [{
		type: NgModule,
		args: [{
			imports: [
				Table,
				TableBody,
				SortableColumn,
				FrozenColumn,
				RowGroupHeader,
				SelectableRow,
				RowToggler,
				ContextMenuRow,
				ResizableColumn,
				ReorderableColumn,
				EditableColumn,
				CellEditor,
				SortIcon,
				TableRadioButton,
				TableCheckbox,
				TableHeaderCheckbox,
				ReorderableRowHandle,
				ReorderableRow,
				SelectableRowDblClick,
				EditableRow,
				InitEditableRow,
				SaveEditableRow,
				CancelEditableRow,
				ColumnFilter,
				ColumnFilterFormElement
			],
			exports: [
				Table,
				SharedModule,
				SortableColumn,
				FrozenColumn,
				RowGroupHeader,
				SelectableRow,
				RowToggler,
				ContextMenuRow,
				ResizableColumn,
				ReorderableColumn,
				EditableColumn,
				CellEditor,
				SortIcon,
				TableRadioButton,
				TableCheckbox,
				TableHeaderCheckbox,
				ReorderableRowHandle,
				ReorderableRow,
				SelectableRowDblClick,
				EditableRow,
				InitEditableRow,
				SaveEditableRow,
				CancelEditableRow,
				ColumnFilter,
				ColumnFilterFormElement,
				ScrollerModule
			],
			providers: []
		}]
	}], null, null);
})();
export { COLUMN_FILTER_INSTANCE, CancelEditableRow, CellEditor, ColumnFilter, ColumnFilterFormElement, ContextMenuRow, EditableColumn, EditableRow, FrozenColumn, InitEditableRow, ReorderableColumn, ReorderableRow, ReorderableRowHandle, ResizableColumn, RowGroupHeader, RowToggler, SaveEditableRow, SelectableRow, SelectableRowDblClick, SortIcon, SortableColumn, TABLE_INSTANCE, Table, TableBody, TableCheckbox, TableClasses, TableHeaderCheckbox, TableModule, TableRadioButton, TableService, TableStyle };
