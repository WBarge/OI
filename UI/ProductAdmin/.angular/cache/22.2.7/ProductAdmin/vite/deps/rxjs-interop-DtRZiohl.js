import { Yn as Observable, _ as takeUntil } from "./zipWith-C1pHxpjx.js";
import { Bt as computed, Kc as RuntimeError, Tl as signal, dl as inject, el as assertInInjectionContext, tl as assertNotInReactiveContext, vc as DestroyRef } from "./core-BRnM5AcM.js";
import { n as _objectSpread2 } from "./asyncToGenerator-CE9zIWF7.js";
// ../node_modules/@angular/core/fesm2022/rxjs-interop.mjs
/**
* @license Angular v22.2.6
* (c) 2010-2026 Google LLC. https://angular.dev/
* License: MIT
*/
function takeUntilDestroyed(destroyRef) {
	if (!destroyRef) {
		ngDevMode && assertInInjectionContext(takeUntilDestroyed);
		destroyRef = inject(DestroyRef);
	}
	const destroyed$ = new Observable((subscriber) => {
		if (destroyRef.destroyed) {
			subscriber.next();
			return;
		}
		return destroyRef.onDestroy(subscriber.next.bind(subscriber));
	});
	return (source) => {
		return source.pipe(takeUntil(destroyed$));
	};
}
function toSignal(source, options) {
	var _options$injector$get, _options$injector2;
	typeof ngDevMode !== "undefined" && ngDevMode && assertNotInReactiveContext(toSignal, "Invoking `toSignal` causes new subscriptions every time. Consider moving `toSignal` outside of the reactive context and read the signal value where needed.");
	const requiresCleanup = !(options === null || options === void 0 ? void 0 : options.manualCleanup);
	if (ngDevMode && requiresCleanup && !(options === null || options === void 0 ? void 0 : options.injector)) assertInInjectionContext(toSignal);
	const cleanupRef = requiresCleanup ? (_options$injector$get = options === null || options === void 0 || (_options$injector2 = options.injector) === null || _options$injector2 === void 0 ? void 0 : _options$injector2.get(DestroyRef)) !== null && _options$injector$get !== void 0 ? _options$injector$get : inject(DestroyRef) : null;
	const equal = makeToSignalEqual(options === null || options === void 0 ? void 0 : options.equal);
	let state;
	if (options === null || options === void 0 ? void 0 : options.requireSync) state = signal({ kind: 0 }, _objectSpread2({ equal }, ngDevMode ? createDebugNameObject(options === null || options === void 0 ? void 0 : options.debugName, "state") : void 0));
	else state = signal({
		kind: 1,
		value: options === null || options === void 0 ? void 0 : options.initialValue
	}, _objectSpread2({ equal }, ngDevMode ? createDebugNameObject(options === null || options === void 0 ? void 0 : options.debugName, "state") : void 0));
	let destroyUnregisterFn;
	const sub = source.subscribe({
		next: (value) => state.set({
			kind: 1,
			value
		}),
		error: (error) => {
			state.set({
				kind: 2,
				error
			});
			destroyUnregisterFn === null || destroyUnregisterFn === void 0 || destroyUnregisterFn();
		},
		complete: () => {
			destroyUnregisterFn === null || destroyUnregisterFn === void 0 || destroyUnregisterFn();
		}
	});
	if ((options === null || options === void 0 ? void 0 : options.requireSync) && state().kind === 0) throw new RuntimeError(601, (typeof ngDevMode === "undefined" || ngDevMode) && "`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.");
	destroyUnregisterFn = cleanupRef === null || cleanupRef === void 0 ? void 0 : cleanupRef.onDestroy(sub.unsubscribe.bind(sub));
	return computed(() => {
		const current = state();
		switch (current.kind) {
			case 1: return current.value;
			case 2: throw current.error;
			case 0: throw new RuntimeError(601, (typeof ngDevMode === "undefined" || ngDevMode) && "`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.");
		}
	}, _objectSpread2({ equal: options === null || options === void 0 ? void 0 : options.equal }, ngDevMode ? createDebugNameObject(options === null || options === void 0 ? void 0 : options.debugName, "source") : void 0));
}
function makeToSignalEqual(userEquality = Object.is) {
	return (a, b) => a.kind === 1 && b.kind === 1 && userEquality(a.value, b.value);
}
function createDebugNameObject(toSignalDebugName, internalSignalDebugName) {
	return { debugName: `toSignal${toSignalDebugName ? "#" + toSignalDebugName : ""}.${internalSignalDebugName}` };
}
export { toSignal as n, takeUntilDestroyed as t };
