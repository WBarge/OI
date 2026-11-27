import * as i0 from "@angular/core";
import { Component, DestroyRef, InjectionToken, Service, computed, effect, inject, input, makeEnvironmentProviders, signal, untracked } from "@angular/core";
import { Router } from "@angular/router";
import { UserManager, WebStorageStateStore } from "oidc-client-ts";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, firstValueFrom, from, switchMap, throwError } from "rxjs";
import { ButtonDirective } from "primeng/button";
import * as i1 from "primeng/card";
import { CardModule } from "primeng/card";
import * as i2 from "primeng/message";
import { MessageModule } from "primeng/message";
import { MessageService } from "primeng/api";
import { HubConnectionBuilder, HubConnectionState, LogLevel } from "@microsoft/signalr";
function safeReturnUrl(url, fallback = "/home") {
	if (!url) return fallback;
	const isLocalPath = url.startsWith("/") && !url.startsWith("//") && !url.includes("\\");
	const hasControlCharacters = /\p{Cc}/u.test(url);
	const isSignInPlumbing = [
		"/login",
		"/auth/callback",
		"/signed-out"
	].some((path) => url === path || url.startsWith(path + "?") || url.startsWith(path + "/") || url.startsWith(path + "#"));
	return isLocalPath && !hasControlCharacters && !isSignInPlumbing ? url : fallback;
}
const OI_CONFIG_DEFAULTS = new InjectionToken("OI_CONFIG_DEFAULTS");
var ConfigService = class ConfigService {
	http = inject(HttpClient);
	defaults = inject(OI_CONFIG_DEFAULTS, { optional: true });
	_config = null;
	async load() {
		const raw = await firstValueFrom(this.http.get(`config.json?v=${Date.now()}`));
		this._config = Object.assign(this.defaults ? this.defaults() : {}, raw);
	}
	get isLoaded() {
		return this._config !== null;
	}
	get config() {
		if (!this._config) throw new Error("Configuration accessed before it was loaded.");
		return this._config;
	}
	static ɵfac = i0.ɵɵngDeclareFactory({
		minVersion: "12.0.0",
		version: "22.2.6",
		ngImport: i0,
		type: ConfigService,
		deps: [],
		target: i0.ɵɵFactoryTarget.Service
	});
	static ɵprov = i0.ɵɵngDeclareService({
		minVersion: "22.0.0",
		version: "22.2.6",
		ngImport: i0,
		type: ConfigService
	});
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.6",
	ngImport: i0,
	type: ConfigService,
	decorators: [{ type: Service }]
});
function authorityFrom(authApiUrl) {
	return authApiUrl.replace(/\/+$/, "").replace(/\/api$/i, "");
}
function absoluteRouteUrl(route, baseUri) {
	return new URL(route.replace(/^\/+/, ""), baseUri).href;
}
function newNonce() {
	const bytes = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(16));
	return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function signinArgs(state) {
	return {
		state,
		nonce: newNonce()
	};
}
function buildUserManagerSettings(config, options, baseUri, storage) {
	return {
		authority: authorityFrom(config.authApiUrl),
		client_id: options.clientId,
		redirect_uri: absoluteRouteUrl(options.callbackRoute, baseUri),
		post_logout_redirect_uri: absoluteRouteUrl(options.signedOutRoute, baseUri),
		response_type: "code",
		scope: options.scopes,
		userStore: new WebStorageStateStore({ store: storage }),
		stateStore: new WebStorageStateStore({ store: storage }),
		loadUserInfo: false,
		automaticSilentRenew: false,
		monitorSession: false,
		revokeTokensOnSignout: false
	};
}
var UserManagerOidcSession = class {
	configService;
	options;
	manager = null;
	constructor(configService, options) {
		this.configService = configService;
		this.options = options;
	}
	get users() {
		this.manager ??= new UserManager(buildUserManagerSettings(this.configService.config, this.options, document.baseURI, window.sessionStorage));
		return this.manager;
	}
	getUser() {
		return this.users.getUser();
	}
	async signinRedirect(state) {
		await this.users.signinRedirect(signinArgs(state));
	}
	signinCallback(url) {
		return this.users.signinRedirectCallback(url);
	}
	signinSilent() {
		return this.users.signinSilent();
	}
	async signoutRedirect() {
		await this.users.signoutRedirect();
	}
	async removeUser() {
		await this.users.removeUser();
	}
};
const OIDC_SESSION = new InjectionToken("OIDC_SESSION", {
	providedIn: "root",
	factory: () => new UserManagerOidcSession(inject(ConfigService), inject(OI_UI_OPTIONS))
});
const REFUSALS = [
	"invalid_grant",
	"invalid_token",
	"invalid_client",
	"unauthorized_client",
	"access_denied"
];
const RENEW_BEFORE_EXPIRY_MS = 6e4;
const SIGN_IN_RESET_MS = 5e3;
const toArray = (v) => v === void 0 ? [] : Array.isArray(v) ? v : [v];
var AuthService = class AuthService {
	router = inject(Router);
	options = inject(OI_UI_OPTIONS);
	oidc = inject(OIDC_SESSION);
	accessToken = signal(null, ...ngDevMode ? [{ debugName: "accessToken" }] : /* istanbul ignore next */ []);
	claims = signal(null, ...ngDevMode ? [{ debugName: "claims" }] : /* istanbul ignore next */ []);
	refreshInFlight = null;
	sessionEnding = false;
	signInStarted = false;
	isAuthenticated = computed(() => this.accessToken() !== null, ...ngDevMode ? [{ debugName: "isAuthenticated" }] : /* istanbul ignore next */ []);
	userId = computed(() => this.claims()?.sub ?? "", ...ngDevMode ? [{ debugName: "userId" }] : /* istanbul ignore next */ []);
	userName = computed(() => this.claims()?.name ?? "", ...ngDevMode ? [{ debugName: "userName" }] : /* istanbul ignore next */ []);
	roles = computed(() => toArray(this.claims()?.role), ...ngDevMode ? [{ debugName: "roles" }] : /* istanbul ignore next */ []);
	groups = computed(() => toArray(this.claims()?.group), ...ngDevMode ? [{ debugName: "groups" }] : /* istanbul ignore next */ []);
	get currentToken() {
		return this.accessToken();
	}
	async restore() {
		let user;
		try {
			user = await this.oidc.getUser();
		} catch {
			return;
		}
		if (!user) return;
		if (this.isFresh(user) && this.applyUser(user)) return;
		await this.refresh();
	}
	async signIn(returnUrl) {
		if (this.signInStarted) return;
		this.signInStarted = true;
		try {
			const state = { returnUrl: safeReturnUrl(returnUrl ?? this.router.url, this.options.homeRoute) };
			await this.oidc.signinRedirect(state);
			setTimeout(() => this.signInStarted = false, SIGN_IN_RESET_MS);
		} catch (error) {
			this.signInStarted = false;
			throw error;
		}
	}
	async completeSignIn(url) {
		const user = await this.oidc.signinCallback(url);
		if (!this.applyUser(user)) throw new Error("OI.Auth returned an access token that cannot be read.");
		this.signInStarted = false;
		const state = user.state;
		return safeReturnUrl(state?.returnUrl, this.options.homeRoute);
	}
	async logout() {
		this.clearSession();
		try {
			await this.oidc.signoutRedirect();
		} catch {
			await this.forget();
			await this.router.navigate([this.options.signedOutRoute]);
		}
	}
	async sessionExpired() {
		this.clearSession();
		await this.forget();
		const here = this.router.url;
		const plumbing = [this.options.callbackRoute, this.options.signedOutRoute];
		if (this.sessionEnding || plumbing.some((route) => here === route || here.startsWith(route + "?"))) return;
		this.sessionEnding = true;
		try {
			await this.signIn(here);
		} catch {
			await this.router.navigate([this.options.signedOutRoute], { queryParams: { error: "unavailable" } });
		} finally {
			this.sessionEnding = false;
		}
	}
	refresh() {
		this.refreshInFlight ??= this.doRefresh().finally(() => this.refreshInFlight = null);
		return this.refreshInFlight;
	}
	async renewAfterRejection(rejectedToken) {
		const latest = this.accessToken();
		if (latest !== null && latest !== rejectedToken) return "refreshed";
		return this.refresh();
	}
	async getAccessToken() {
		const exp = this.claims()?.exp ?? 0;
		if (!this.accessToken() || exp * 1e3 - Date.now() < RENEW_BEFORE_EXPIRY_MS) await this.refresh();
		return this.accessToken() ?? "";
	}
	async doRefresh() {
		let stored;
		try {
			stored = await this.oidc.getUser();
		} catch {
			return "unavailable";
		}
		if (!stored?.refresh_token) {
			this.clearSession();
			return "rejected";
		}
		try {
			const user = await this.oidc.signinSilent();
			if (!user || !this.applyUser(user)) return await this.reject();
			return "refreshed";
		} catch (error) {
			return this.isRefusal(error) ? await this.reject() : "unavailable";
		}
	}
	async reject() {
		this.clearSession();
		await this.forget();
		return "rejected";
	}
	isRefusal(error) {
		const failure = error;
		return failure?.name === "ErrorResponse" && typeof failure.error === "string" && REFUSALS.includes(failure.error);
	}
	isFresh(user) {
		return user.expires_at === void 0 || user.expires_at * 1e3 - Date.now() > RENEW_BEFORE_EXPIRY_MS;
	}
	applyUser(user) {
		try {
			const claims = this.decode(user.access_token);
			this.accessToken.set(user.access_token);
			this.claims.set(claims);
			return true;
		} catch {
			return false;
		}
	}
	clearSession() {
		this.accessToken.set(null);
		this.claims.set(null);
	}
	async forget() {
		try {
			await this.oidc.removeUser();
		} catch {}
	}
	decode(jwt) {
		const payload = (jwt.split(".")[1] ?? "").replace(/-/g, "+").replace(/_/g, "/");
		const bytes = Uint8Array.from(atob(payload), (c) => c.charCodeAt(0));
		return JSON.parse(new TextDecoder().decode(bytes));
	}
	static ɵfac = i0.ɵɵngDeclareFactory({
		minVersion: "12.0.0",
		version: "22.2.6",
		ngImport: i0,
		type: AuthService,
		deps: [],
		target: i0.ɵɵFactoryTarget.Service
	});
	static ɵprov = i0.ɵɵngDeclareService({
		minVersion: "22.0.0",
		version: "22.2.6",
		ngImport: i0,
		type: AuthService
	});
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.6",
	ngImport: i0,
	type: AuthService,
	decorators: [{ type: Service }]
});
const DEFAULT_OPTIONS = {
	securedUrls: () => [],
	clientId: "",
	scopes: "openid profile email offline_access",
	callbackRoute: "/auth/callback",
	signedOutRoute: "/signed-out",
	homeRoute: "/home",
	forbiddenRoute: "/home",
	appTitle: "Sign in"
};
const OI_UI_OPTIONS = new InjectionToken("OI_UI_OPTIONS", {
	providedIn: "root",
	factory: () => DEFAULT_OPTIONS
});
function provideOiUiCommon(options) {
	const homeRoute = options.homeRoute ?? DEFAULT_OPTIONS.homeRoute;
	const merged = {
		...DEFAULT_OPTIONS,
		...options,
		homeRoute,
		forbiddenRoute: options.forbiddenRoute ?? homeRoute
	};
	return makeEnvironmentProviders([{
		provide: OI_UI_OPTIONS,
		useValue: merged
	}]);
}
async function startOiSession() {
	const config = inject(ConfigService);
	const auth = inject(AuthService);
	await config.load();
	await auth.restore();
}
var SessionEndedError = class extends HttpErrorResponse {
	constructor(url) {
		super({
			status: 401,
			statusText: "Session ended",
			url: url ?? void 0
		});
	}
};
const authInterceptor = (req, next) => {
	const configService = inject(ConfigService);
	if (!configService.isLoaded) return next(req);
	if (!inject(OI_UI_OPTIONS).securedUrls(configService.config).filter((url) => url.length > 0).some((url) => req.url.startsWith(url))) return next(req);
	const auth = inject(AuthService);
	const withToken = (request, token) => token ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : request;
	const sentToken = auth.currentToken;
	return next(withToken(req, sentToken)).pipe(catchError((error) => {
		if (!(error instanceof HttpErrorResponse) || error.status !== 401) return throwError(() => error);
		return from(auth.renewAfterRejection(sentToken)).pipe(switchMap((outcome) => {
			if (outcome === "refreshed") return next(withToken(req, auth.currentToken)).pipe(catchError((retryError) => {
				if (retryError instanceof HttpErrorResponse && retryError.status === 401) {
					auth.sessionExpired();
					return throwError(() => new SessionEndedError(req.url));
				}
				return throwError(() => retryError);
			}));
			if (outcome === "rejected") {
				auth.sessionExpired();
				return throwError(() => new SessionEndedError(req.url));
			}
			return throwError(() => new HttpErrorResponse({
				status: 0,
				statusText: "Unknown Error",
				url: req.url
			}));
		}));
	}));
};
const authGuard = (_route, state) => {
	const auth = inject(AuthService);
	if (auth.isAuthenticated()) return true;
	const router = inject(Router);
	const options = inject(OI_UI_OPTIONS);
	return auth.signIn(state.url).then(() => false, () => router.createUrlTree([options.signedOutRoute], { queryParams: { error: "unavailable" } }));
};
const roleGuard = (role) => () => inject(AuthService).roles().includes(role) || inject(Router).createUrlTree([inject(OI_UI_OPTIONS).forbiddenRoute]);
const adminGuard = roleGuard("Admin");
var AuthCallback = class AuthCallback {
	auth = inject(AuthService);
	router = inject(Router);
	options = inject(OI_UI_OPTIONS);
	title = this.options.appTitle;
	failed = signal(false, ...ngDevMode ? [{ debugName: "failed" }] : /* istanbul ignore next */ []);
	starting = signal(false, ...ngDevMode ? [{ debugName: "starting" }] : /* istanbul ignore next */ []);
	ngOnInit() {
		this.finish();
	}
	async tryAgain() {
		this.starting.set(true);
		try {
			await this.auth.signIn(this.options.homeRoute);
		} catch {
			this.starting.set(false);
		}
	}
	async finish() {
		try {
			const target = await this.auth.completeSignIn();
			await this.router.navigateByUrl(target, { replaceUrl: true });
		} catch {
			this.failed.set(true);
		}
	}
	static ɵfac = i0.ɵɵngDeclareFactory({
		minVersion: "12.0.0",
		version: "22.2.6",
		ngImport: i0,
		type: AuthCallback,
		deps: [],
		target: i0.ɵɵFactoryTarget.Component
	});
	static ɵcmp = i0.ɵɵngDeclareComponent({
		minVersion: "17.0.0",
		version: "22.2.6",
		type: AuthCallback,
		isStandalone: true,
		selector: "oi-auth-callback",
		ngImport: i0,
		template: "<div class=\"authPage\">\n  <p-card class=\"authCard\" [header]=\"title\">\n    @if (failed()) {\n      <p-message severity=\"error\" class=\"authMessage\" role=\"alert\">We could not finish signing you in.</p-message>\n      <button type=\"button\" pButton class=\"authButton\" [disabled]=\"starting()\" (click)=\"tryAgain()\">Try again</button>\n    } @else {\n      <p class=\"authStatus\" role=\"status\">Signing you in...</p>\n    }\n  </p-card>\n</div>\n",
		styles: [".authPage{display:flex;justify-content:center;padding:4rem 1rem}.authCard{width:100%;max-width:24rem}.authMessage{display:block;margin-bottom:1rem}.authStatus{margin:0}.authButton{width:100%}\n"],
		dependencies: [
			{
				kind: "ngmodule",
				type: CardModule
			},
			{
				kind: "component",
				type: i1.Card,
				selector: "p-card",
				inputs: ["header", "subheader"]
			},
			{
				kind: "directive",
				type: ButtonDirective,
				selector: "[pButton]",
				inputs: [
					"pButton",
					"pButtonPT",
					"pButtonUnstyled",
					"hostName",
					"text",
					"plain",
					"raised",
					"size",
					"outlined",
					"link",
					"rounded",
					"fluid",
					"variant",
					"iconOnly",
					"loading",
					"severity"
				]
			},
			{
				kind: "ngmodule",
				type: MessageModule
			},
			{
				kind: "component",
				type: i2.Message,
				selector: "p-message",
				inputs: [
					"severity",
					"closable",
					"icon",
					"closeIcon",
					"life",
					"size",
					"variant",
					"motionOptions"
				],
				outputs: ["onClose"]
			}
		]
	});
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.6",
	ngImport: i0,
	type: AuthCallback,
	decorators: [{
		type: Component,
		args: [{
			imports: [
				CardModule,
				ButtonDirective,
				MessageModule
			],
			selector: "oi-auth-callback",
			template: "<div class=\"authPage\">\n  <p-card class=\"authCard\" [header]=\"title\">\n    @if (failed()) {\n      <p-message severity=\"error\" class=\"authMessage\" role=\"alert\">We could not finish signing you in.</p-message>\n      <button type=\"button\" pButton class=\"authButton\" [disabled]=\"starting()\" (click)=\"tryAgain()\">Try again</button>\n    } @else {\n      <p class=\"authStatus\" role=\"status\">Signing you in...</p>\n    }\n  </p-card>\n</div>\n",
			styles: [".authPage{display:flex;justify-content:center;padding:4rem 1rem}.authCard{width:100%;max-width:24rem}.authMessage{display:block;margin-bottom:1rem}.authStatus{margin:0}.authButton{width:100%}\n"]
		}]
	}]
});
var SignedOut = class SignedOut {
	auth = inject(AuthService);
	options = inject(OI_UI_OPTIONS);
	title = this.options.appTitle;
	error = input(...ngDevMode ? [void 0, { debugName: "error" }] : /* istanbul ignore next */ []);
	startFailed = signal(false, ...ngDevMode ? [{ debugName: "startFailed" }] : /* istanbul ignore next */ []);
	starting = signal(false, ...ngDevMode ? [{ debugName: "starting" }] : /* istanbul ignore next */ []);
	unavailable = computed(() => this.error() === "unavailable" || this.startFailed(), ...ngDevMode ? [{ debugName: "unavailable" }] : /* istanbul ignore next */ []);
	async signIn() {
		this.starting.set(true);
		this.startFailed.set(false);
		try {
			await this.auth.signIn(this.options.homeRoute);
		} catch {
			this.startFailed.set(true);
			this.starting.set(false);
		}
	}
	static ɵfac = i0.ɵɵngDeclareFactory({
		minVersion: "12.0.0",
		version: "22.2.6",
		ngImport: i0,
		type: SignedOut,
		deps: [],
		target: i0.ɵɵFactoryTarget.Component
	});
	static ɵcmp = i0.ɵɵngDeclareComponent({
		minVersion: "17.0.0",
		version: "22.2.6",
		type: SignedOut,
		isStandalone: true,
		selector: "oi-signed-out",
		inputs: { error: {
			classPropertyName: "error",
			publicName: "error",
			isSignal: true,
			isRequired: false,
			transformFunction: null
		} },
		ngImport: i0,
		template: "<div class=\"authPage\">\n  <p-card class=\"authCard\" [header]=\"title\">\n    @if (unavailable()) {\n      <p-message severity=\"error\" class=\"authMessage\" role=\"alert\">Sign-in is not available right now. Try again in a moment.</p-message>\n    } @else {\n      <p-message severity=\"info\" class=\"authMessage\" role=\"status\">You have been signed out.</p-message>\n    }\n    <button type=\"button\" pButton class=\"authButton\" [disabled]=\"starting()\" (click)=\"signIn()\">Sign in</button>\n  </p-card>\n</div>\n",
		styles: [".authPage{display:flex;justify-content:center;padding:4rem 1rem}.authCard{width:100%;max-width:24rem}.authMessage{display:block;margin-bottom:1rem}.authStatus{margin:0}.authButton{width:100%}\n"],
		dependencies: [
			{
				kind: "ngmodule",
				type: CardModule
			},
			{
				kind: "component",
				type: i1.Card,
				selector: "p-card",
				inputs: ["header", "subheader"]
			},
			{
				kind: "directive",
				type: ButtonDirective,
				selector: "[pButton]",
				inputs: [
					"pButton",
					"pButtonPT",
					"pButtonUnstyled",
					"hostName",
					"text",
					"plain",
					"raised",
					"size",
					"outlined",
					"link",
					"rounded",
					"fluid",
					"variant",
					"iconOnly",
					"loading",
					"severity"
				]
			},
			{
				kind: "ngmodule",
				type: MessageModule
			},
			{
				kind: "component",
				type: i2.Message,
				selector: "p-message",
				inputs: [
					"severity",
					"closable",
					"icon",
					"closeIcon",
					"life",
					"size",
					"variant",
					"motionOptions"
				],
				outputs: ["onClose"]
			}
		]
	});
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.6",
	ngImport: i0,
	type: SignedOut,
	decorators: [{
		type: Component,
		args: [{
			imports: [
				CardModule,
				ButtonDirective,
				MessageModule
			],
			selector: "oi-signed-out",
			template: "<div class=\"authPage\">\n  <p-card class=\"authCard\" [header]=\"title\">\n    @if (unavailable()) {\n      <p-message severity=\"error\" class=\"authMessage\" role=\"alert\">Sign-in is not available right now. Try again in a moment.</p-message>\n    } @else {\n      <p-message severity=\"info\" class=\"authMessage\" role=\"status\">You have been signed out.</p-message>\n    }\n    <button type=\"button\" pButton class=\"authButton\" [disabled]=\"starting()\" (click)=\"signIn()\">Sign in</button>\n  </p-card>\n</div>\n",
			styles: [".authPage{display:flex;justify-content:center;padding:4rem 1rem}.authCard{width:100%;max-width:24rem}.authMessage{display:block;margin-bottom:1rem}.authStatus{margin:0}.authButton{width:100%}\n"]
		}]
	}],
	propDecorators: { error: [{
		type: i0.Input,
		args: [{
			isSignal: true,
			alias: "error",
			required: false
		}]
	}] }
});
var UserMenu = class UserMenu {
	auth = inject(AuthService);
	signOut() {
		this.auth.logout();
	}
	static ɵfac = i0.ɵɵngDeclareFactory({
		minVersion: "12.0.0",
		version: "22.2.6",
		ngImport: i0,
		type: UserMenu,
		deps: [],
		target: i0.ɵɵFactoryTarget.Component
	});
	static ɵcmp = i0.ɵɵngDeclareComponent({
		minVersion: "14.0.0",
		version: "22.2.6",
		type: UserMenu,
		isStandalone: true,
		selector: "oi-user-menu",
		ngImport: i0,
		template: "<span class=\"signedInAs\">{{ auth.userName() }}</span>\r\n<button type=\"button\" pButton severity=\"secondary\" size=\"small\" (click)=\"signOut()\">Sign out</button>\r\n",
		styles: [".signedInAs{margin-right:.75rem}\n"],
		dependencies: [{
			kind: "directive",
			type: ButtonDirective,
			selector: "[pButton]",
			inputs: [
				"pButton",
				"pButtonPT",
				"pButtonUnstyled",
				"hostName",
				"text",
				"plain",
				"raised",
				"size",
				"outlined",
				"link",
				"rounded",
				"fluid",
				"variant",
				"iconOnly",
				"loading",
				"severity"
			]
		}]
	});
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.6",
	ngImport: i0,
	type: UserMenu,
	decorators: [{
		type: Component,
		args: [{
			imports: [ButtonDirective],
			selector: "oi-user-menu",
			template: "<span class=\"signedInAs\">{{ auth.userName() }}</span>\r\n<button type=\"button\" pButton severity=\"secondary\" size=\"small\" (click)=\"signOut()\">Sign out</button>\r\n",
			styles: [".signedInAs{margin-right:.75rem}\n"]
		}]
	}]
});
var NotificationService = class NotificationService {
	msgService = inject(MessageService);
	send(severity, summary, detail, life) {
		this.msgService.add({
			severity,
			summary,
			detail,
			...life === void 0 ? {} : { life }
		});
	}
	success(summary, detail, life) {
		this.send("success", summary, detail, life);
	}
	info(summary, detail, life) {
		this.send("info", summary, detail, life);
	}
	warn(summary, detail, life) {
		this.send("warn", summary, detail, life);
	}
	error(summary, detail, life) {
		this.send("error", summary, detail, life);
	}
	static ɵfac = i0.ɵɵngDeclareFactory({
		minVersion: "12.0.0",
		version: "22.2.6",
		ngImport: i0,
		type: NotificationService,
		deps: [],
		target: i0.ɵɵFactoryTarget.Service
	});
	static ɵprov = i0.ɵɵngDeclareService({
		minVersion: "22.0.0",
		version: "22.2.6",
		ngImport: i0,
		type: NotificationService
	});
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.6",
	ngImport: i0,
	type: NotificationService,
	decorators: [{ type: Service }]
});
var BackoffRetryPolicy = class {
	delays = [
		0,
		2e3,
		5e3,
		1e4,
		3e4
	];
	nextRetryDelayInMilliseconds(ctx) {
		return this.delays[Math.min(ctx.previousRetryCount, this.delays.length - 1)];
	}
};
const defaultHubConnectionFactory = (config) => new HubConnectionBuilder().withUrl(config.url, { accessTokenFactory: config.accessTokenFactory }).withAutomaticReconnect(new BackoffRetryPolicy()).configureLogging(config.logLevel ?? LogLevel.Information).build();
const HUB_CONNECTION_FACTORY = new InjectionToken("HUB_CONNECTION_FACTORY", {
	providedIn: "root",
	factory: () => defaultHubConnectionFactory
});
var SignalRService = class SignalRService {
	createConnection = inject(HUB_CONNECTION_FACTORY);
	connection;
	stopRequested = false;
	_state = signal(HubConnectionState.Disconnected, ...ngDevMode ? [{ debugName: "_state" }] : /* istanbul ignore next */ []);
	_error = signal(null, ...ngDevMode ? [{ debugName: "_error" }] : /* istanbul ignore next */ []);
	state = this._state.asReadonly();
	error = this._error.asReadonly();
	isConnected = computed(() => this._state() === HubConnectionState.Connected, ...ngDevMode ? [{ debugName: "isConnected" }] : /* istanbul ignore next */ []);
	configure(config) {
		if (this.connection) return;
		this.connection = this.createConnection(config);
		const sync = () => this._state.set(this.connection.state);
		this.connection.onreconnecting((err) => {
			this._error.set(err?.message ?? "Connection lost");
			sync();
		});
		this.connection.onreconnected(() => {
			this._error.set(null);
			sync();
		});
		this.connection.onclose((err) => {
			if (err) this._error.set(err.message);
			sync();
		});
	}
	async start(maxAttempts = 5) {
		const conn = this.requireConnection();
		if (conn.state !== HubConnectionState.Disconnected) return;
		this.stopRequested = false;
		this._state.set(HubConnectionState.Connecting);
		for (let attempt = 1; attempt <= maxAttempts; attempt++) try {
			await conn.start();
			if (this.stopRequested) {
				await conn.stop();
				this._state.set(HubConnectionState.Disconnected);
				return;
			}
			this._error.set(null);
			this._state.set(conn.state);
			return;
		} catch (err) {
			if (this.stopRequested) {
				this._state.set(HubConnectionState.Disconnected);
				return;
			}
			this._error.set(err.message);
			if (attempt === maxAttempts) {
				this._state.set(HubConnectionState.Disconnected);
				throw err;
			}
			await new Promise((r) => setTimeout(r, Math.min(1e3 * 2 ** attempt, 15e3)));
			if (this.stopRequested) {
				this._state.set(HubConnectionState.Disconnected);
				return;
			}
		}
	}
	async stop() {
		this.stopRequested = true;
		await this.connection?.stop();
		this._state.set(HubConnectionState.Disconnected);
	}
	on(method, handler) {
		const conn = this.requireConnection();
		conn.on(method, handler);
		return () => conn.off(method, handler);
	}
	listen(method) {
		return new Observable((subscriber) => {
			const handler = (...args) => subscriber.next(args.length === 1 ? args[0] : args);
			const conn = this.requireConnection();
			conn.on(method, handler);
			return () => conn.off(method, handler);
		});
	}
	send(method, ...args) {
		return this.requireConnection().send(method, ...args);
	}
	invoke(method, ...args) {
		return this.requireConnection().invoke(method, ...args);
	}
	stream(method, ...args) {
		return new Observable((subscriber) => {
			const sub = this.requireConnection().stream(method, ...args).subscribe({
				next: (v) => subscriber.next(v),
				error: (e) => subscriber.error(e),
				complete: () => subscriber.complete()
			});
			return () => sub.dispose();
		});
	}
	ngOnDestroy() {
		this.connection?.stop();
	}
	requireConnection() {
		if (!this.connection) throw new Error("SignalRService: call configure() before using the connection.");
		return this.connection;
	}
	static ɵfac = i0.ɵɵngDeclareFactory({
		minVersion: "12.0.0",
		version: "22.2.6",
		ngImport: i0,
		type: SignalRService,
		deps: [],
		target: i0.ɵɵFactoryTarget.Service
	});
	static ɵprov = i0.ɵɵngDeclareService({
		minVersion: "22.0.0",
		version: "22.2.6",
		ngImport: i0,
		type: SignalRService
	});
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.6",
	ngImport: i0,
	type: SignalRService,
	decorators: [{ type: Service }]
});
var AppHubService = class AppHubService {
	hub = inject(SignalRService);
	auth = inject(AuthService);
	configService = inject(ConfigService);
	configure() {
		this.hub.configure({
			url: this.configService.config.hubUrl,
			accessTokenFactory: () => this.auth.getAccessToken()
		});
	}
	async connect() {
		this.configure();
		await this.hub.start();
	}
	disconnect() {
		return this.hub.stop();
	}
	messages$ = this.hub.listen("ReceiveMessage");
	notifications$ = this.hub.listen("ReceiveNotification");
	sendToMyGroup(groupId, text) {
		return this.hub.send("SendToMyGroup", groupId, text);
	}
	subscribe(groupId, topic) {
		return this.hub.invoke("Subscribe", groupId, topic);
	}
	unsubscribe(groupId, topic) {
		return this.hub.invoke("Unsubscribe", groupId, topic);
	}
	static ɵfac = i0.ɵɵngDeclareFactory({
		minVersion: "12.0.0",
		version: "22.2.6",
		ngImport: i0,
		type: AppHubService,
		deps: [],
		target: i0.ɵɵFactoryTarget.Service
	});
	static ɵprov = i0.ɵɵngDeclareService({
		minVersion: "22.0.0",
		version: "22.2.6",
		ngImport: i0,
		type: AppHubService
	});
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.6",
	ngImport: i0,
	type: AppHubService,
	decorators: [{ type: Service }]
});
const HUB_NOTIFICATION_HANDLER = new InjectionToken("HUB_NOTIFICATION_HANDLER");
const TOAST_LIFE_MS = 1e4;
const RETRY_AFTER_MS = 3e4;
const SEVERITY_BY_TYPE = {
	success: "success",
	info: "info",
	warn: "warn",
	warning: "warn",
	error: "error"
};
var HubConnectionService = class HubConnectionService {
	auth = inject(AuthService);
	appHub = inject(AppHubService);
	notifications = inject(NotificationService);
	handlers = inject(HUB_NOTIFICATION_HANDLER, { optional: true }) ?? [];
	subscription;
	retryTimer;
	queue = Promise.resolve();
	constructor() {
		effect(() => {
			const signedIn = this.auth.isAuthenticated();
			untracked(() => this.enqueue(signedIn ? () => this.start() : () => this.stop()));
		});
		inject(DestroyRef).onDestroy(() => this.cancelRetry());
	}
	enqueue(work) {
		this.queue = this.queue.then(work).catch((error) => {
			console.error("Hub connection error", error);
		});
	}
	async start() {
		if (this.subscription) return;
		this.appHub.configure();
		this.subscription = this.appHub.notifications$.subscribe((notification) => {
			this.handlers.forEach((handler) => handler.handle(notification));
			this.show(notification);
		});
		await this.connect();
	}
	async connect() {
		try {
			await this.appHub.connect();
		} catch (error) {
			console.error("Could not connect to the notification hub; will try again", error);
			this.retryTimer = setTimeout(() => this.enqueue(() => this.retry()), RETRY_AFTER_MS);
		}
	}
	async retry() {
		this.retryTimer = void 0;
		if (this.subscription) await this.connect();
	}
	async stop() {
		if (!this.subscription) return;
		this.cancelRetry();
		this.subscription.unsubscribe();
		this.subscription = void 0;
		this.handlers.forEach((handler) => handler.clear());
		await this.appHub.disconnect();
	}
	cancelRetry() {
		if (this.retryTimer !== void 0) {
			clearTimeout(this.retryTimer);
			this.retryTimer = void 0;
		}
	}
	show(notification) {
		const severity = SEVERITY_BY_TYPE[notification.type?.toLowerCase() ?? ""] ?? "info";
		this.notifications[severity](notification.title, notification.body ?? "", TOAST_LIFE_MS);
	}
	static ɵfac = i0.ɵɵngDeclareFactory({
		minVersion: "12.0.0",
		version: "22.2.6",
		ngImport: i0,
		type: HubConnectionService,
		deps: [],
		target: i0.ɵɵFactoryTarget.Service
	});
	static ɵprov = i0.ɵɵngDeclareService({
		minVersion: "22.0.0",
		version: "22.2.6",
		ngImport: i0,
		type: HubConnectionService
	});
};
i0.ɵɵngDeclareClassMetadata({
	minVersion: "12.0.0",
	version: "22.2.6",
	ngImport: i0,
	type: HubConnectionService,
	decorators: [{ type: Service }],
	ctorParameters: () => []
});
export { AppHubService, AuthCallback, AuthService, BackoffRetryPolicy, ConfigService, HUB_CONNECTION_FACTORY, HUB_NOTIFICATION_HANDLER, HubConnectionService, NotificationService, OIDC_SESSION, OI_CONFIG_DEFAULTS, OI_UI_OPTIONS, SessionEndedError, SignalRService, SignedOut, UserManagerOidcSession, UserMenu, absoluteRouteUrl, adminGuard, authGuard, authInterceptor, authorityFrom, buildUserManagerSettings, defaultHubConnectionFactory, newNonce, provideOiUiCommon, roleGuard, safeReturnUrl, signinArgs, startOiSession };

//# sourceMappingURL=oi-ui-common.mjs.map