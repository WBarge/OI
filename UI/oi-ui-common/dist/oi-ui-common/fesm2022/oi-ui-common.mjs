import * as i0 from "@angular/core";
import { Component, DestroyRef, InjectionToken, Service, computed, effect, inject, input, makeEnvironmentProviders, signal, untracked } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, catchError, firstValueFrom, from, switchMap, throwError } from "rxjs";
import * as i1 from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { ButtonDirective } from "primeng/button";
import * as i2 from "primeng/card";
import { CardModule } from "primeng/card";
import * as i3 from "primeng/inputtext";
import { InputTextModule } from "primeng/inputtext";
import * as i4 from "primeng/message";
import { MessageModule } from "primeng/message";
import { MessageService } from "primeng/api";
import { HubConnectionBuilder, HubConnectionState, LogLevel } from "@microsoft/signalr";
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
const REFRESH_KEY = "oi.refresh";
var LocalStorageRefreshTokenStore = class {
	get() {
		return localStorage.getItem(REFRESH_KEY);
	}
	set(token) {
		localStorage.setItem(REFRESH_KEY, token);
	}
	clear() {
		localStorage.removeItem(REFRESH_KEY);
	}
	onExternalRemoval(callback) {
		const onStorage = (event) => {
			if ((event.key === "oi.refresh" || event.key === null) && this.get() === null) callback();
		};
		window.addEventListener("storage", onStorage);
		return () => window.removeEventListener("storage", onStorage);
	}
};
const REFRESH_TOKEN_STORE = new InjectionToken("REFRESH_TOKEN_STORE", {
	providedIn: "root",
	factory: () => new LocalStorageRefreshTokenStore()
});
const REFRESH_LOCK = "oi-token-refresh";
const RENEW_BEFORE_EXPIRY_MS = 6e4;
const toArray = (v) => v === void 0 ? [] : Array.isArray(v) ? v : [v];
var AuthService = class AuthService {
	http = inject(HttpClient);
	configService = inject(ConfigService);
	router = inject(Router);
	options = inject(OI_UI_OPTIONS);
	store = inject(REFRESH_TOKEN_STORE);
	accessToken = signal(null, ...ngDevMode ? [{ debugName: "accessToken" }] : /* istanbul ignore next */ []);
	claims = signal(null, ...ngDevMode ? [{ debugName: "claims" }] : /* istanbul ignore next */ []);
	refreshInFlight = null;
	sessionEnding = false;
	isAuthenticated = computed(() => this.accessToken() !== null, ...ngDevMode ? [{ debugName: "isAuthenticated" }] : /* istanbul ignore next */ []);
	userId = computed(() => this.claims()?.sub ?? "", ...ngDevMode ? [{ debugName: "userId" }] : /* istanbul ignore next */ []);
	userName = computed(() => this.claims()?.name ?? "", ...ngDevMode ? [{ debugName: "userName" }] : /* istanbul ignore next */ []);
	roles = computed(() => toArray(this.claims()?.role), ...ngDevMode ? [{ debugName: "roles" }] : /* istanbul ignore next */ []);
	groups = computed(() => toArray(this.claims()?.group), ...ngDevMode ? [{ debugName: "groups" }] : /* istanbul ignore next */ []);
	constructor() {
		const stopListening = this.store.onExternalRemoval(() => {
			if (this.accessToken() !== null) {
				this.clearSession();
				this.router.navigate([this.options.loginRoute]);
			}
		});
		inject(DestroyRef).onDestroy(stopListening);
	}
	get authUrl() {
		return this.configService.config.authApiUrl + "auth/";
	}
	get currentToken() {
		return this.accessToken();
	}
	async restore() {
		if (this.store.get()) await this.refresh();
	}
	async login(email, password) {
		const result = await firstValueFrom(this.http.post(this.authUrl + "login", {
			email,
			password
		}));
		this.applySession(result);
	}
	async logout() {
		const refreshToken = this.store.get();
		this.clearSession();
		await this.router.navigate([this.options.loginRoute]);
		if (refreshToken) try {
			await firstValueFrom(this.http.post(this.authUrl + "logout", { refreshToken }));
		} catch {}
	}
	async sessionExpired() {
		this.clearSession();
		const here = this.router.url;
		const loginRoute = this.options.loginRoute;
		if (this.sessionEnding || here === loginRoute || here.startsWith(loginRoute + "?")) return;
		this.sessionEnding = true;
		try {
			await this.router.navigate([loginRoute], { queryParams: {
				reason: "expired",
				returnUrl: here
			} });
		} finally {
			this.sessionEnding = false;
		}
	}
	refresh() {
		this.refreshInFlight ??= this.refreshAcrossTabs().finally(() => this.refreshInFlight = null);
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
	refreshAcrossTabs() {
		const locks = typeof navigator === "undefined" ? void 0 : navigator.locks;
		return locks ? locks.request(REFRESH_LOCK, () => this.doRefresh()) : this.doRefresh();
	}
	async doRefresh() {
		const refreshToken = this.store.get();
		if (!refreshToken) {
			this.clearSession();
			return "rejected";
		}
		try {
			const result = await firstValueFrom(this.http.post(this.authUrl + "refresh", { refreshToken }));
			this.applySession(result);
			return "refreshed";
		} catch (error) {
			if (error instanceof HttpErrorResponse && (error.status === 400 || error.status === 401 || error.status === 403)) {
				this.clearSession();
				return "rejected";
			}
			return "unavailable";
		}
	}
	applySession(result) {
		const claims = this.decode(result.accessToken);
		this.accessToken.set(result.accessToken);
		this.claims.set(claims);
		this.store.set(result.refreshToken);
	}
	clearSession() {
		this.accessToken.set(null);
		this.claims.set(null);
		this.store.clear();
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
	decorators: [{ type: Service }],
	ctorParameters: () => []
});
const DEFAULT_OPTIONS = {
	securedUrls: () => [],
	loginRoute: "/login",
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
	if (inject(AuthService).isAuthenticated()) return true;
	const queryParams = state.url && state.url !== "/" ? { returnUrl: state.url } : void 0;
	return inject(Router).createUrlTree([inject(OI_UI_OPTIONS).loginRoute], { queryParams });
};
const guestGuard = () => inject(AuthService).isAuthenticated() ? inject(Router).createUrlTree([inject(OI_UI_OPTIONS).homeRoute]) : true;
const roleGuard = (role) => () => inject(AuthService).roles().includes(role) || inject(Router).createUrlTree([inject(OI_UI_OPTIONS).forbiddenRoute]);
const adminGuard = roleGuard("Admin");
function safeReturnUrl(url, fallback = "/home") {
	if (!url) return fallback;
	const isLocalPath = url.startsWith("/") && !url.startsWith("//") && !url.includes("\\");
	const hasControlCharacters = /\p{Cc}/u.test(url);
	const isLoginPage = url === "/login" || url.startsWith("/login?") || url.startsWith("/login/");
	return isLocalPath && !hasControlCharacters && !isLoginPage ? url : fallback;
}
var Login = class Login {
	auth = inject(AuthService);
	router = inject(Router);
	options = inject(OI_UI_OPTIONS);
	title = this.options.appTitle;
	returnUrl = input(...ngDevMode ? [void 0, { debugName: "returnUrl" }] : /* istanbul ignore next */ []);
	reason = input(...ngDevMode ? [void 0, { debugName: "reason" }] : /* istanbul ignore next */ []);
	email = signal("", ...ngDevMode ? [{ debugName: "email" }] : /* istanbul ignore next */ []);
	password = signal("", ...ngDevMode ? [{ debugName: "password" }] : /* istanbul ignore next */ []);
	busy = signal(false, ...ngDevMode ? [{ debugName: "busy" }] : /* istanbul ignore next */ []);
	error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : /* istanbul ignore next */ []);
	sessionExpired = computed(() => this.reason() === "expired", ...ngDevMode ? [{ debugName: "sessionExpired" }] : /* istanbul ignore next */ []);
	canSubmit = computed(() => !this.busy() && this.email().trim().length > 0 && this.password().length > 0, ...ngDevMode ? [{ debugName: "canSubmit" }] : /* istanbul ignore next */ []);
	async signIn() {
		if (!this.canSubmit()) return;
		this.busy.set(true);
		this.error.set(null);
		try {
			await this.auth.login(this.email().trim(), this.password());
			this.password.set("");
			await this.router.navigateByUrl(safeReturnUrl(this.returnUrl(), this.options.homeRoute));
		} catch (error) {
			this.error.set(this.describe(error));
		} finally {
			this.busy.set(false);
		}
	}
	describe(error) {
		if (error instanceof HttpErrorResponse) switch (error.status) {
			case 0: return "Unable to reach the sign-in service. Check your connection and try again.";
			case 400: return "Enter your email and your password.";
			case 401: return "The email or password is incorrect.";
			case 429: return "Too many attempts. Wait a minute and try again.";
		}
		return "Something went wrong while signing in. Try again.";
	}
	static ɵfac = i0.ɵɵngDeclareFactory({
		minVersion: "12.0.0",
		version: "22.2.6",
		ngImport: i0,
		type: Login,
		deps: [],
		target: i0.ɵɵFactoryTarget.Component
	});
	static ɵcmp = i0.ɵɵngDeclareComponent({
		minVersion: "17.0.0",
		version: "22.2.6",
		type: Login,
		isStandalone: true,
		selector: "app-login",
		inputs: {
			returnUrl: {
				classPropertyName: "returnUrl",
				publicName: "returnUrl",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			},
			reason: {
				classPropertyName: "reason",
				publicName: "reason",
				isSignal: true,
				isRequired: false,
				transformFunction: null
			}
		},
		ngImport: i0,
		template: "<div class=\"loginPage\">\n  <p-card class=\"loginCard\" [header]=\"title\" subheader=\"Sign in to continue\">\n    <form (ngSubmit)=\"signIn()\" novalidate>\n      @if (sessionExpired()) {\n        <p-message severity=\"info\" class=\"loginMessage\">Your session has expired. Please sign in again.</p-message>\n      }\n      @if (error(); as message) {\n        <p-message severity=\"error\" class=\"loginMessage\" role=\"alert\">{{ message }}</p-message>\n      }\n\n      <div class=\"loginField\">\n        <label for=\"loginEmail\">Email</label>\n        <input id=\"loginEmail\" name=\"email\" type=\"email\" pInputText autocomplete=\"username\" autofocus\n               [ngModel]=\"email()\" (ngModelChange)=\"email.set($event)\" />\n      </div>\n\n      <div class=\"loginField\">\n        <label for=\"loginPassword\">Password</label>\n        <input id=\"loginPassword\" name=\"password\" type=\"password\" pInputText autocomplete=\"current-password\"\n               [ngModel]=\"password()\" (ngModelChange)=\"password.set($event)\" />\n      </div>\n\n      <button type=\"submit\" pButton class=\"loginSubmit\" [disabled]=\"!canSubmit()\">{{ busy() ? 'Signing in...' : 'Sign in' }}</button>\n    </form>\n  </p-card>\n</div>\n",
		styles: [".loginPage{display:flex;justify-content:center;padding:4rem 1rem}.loginCard{width:100%;max-width:24rem}.loginMessage{display:block;margin-bottom:1rem}.loginField{display:flex;flex-direction:column;gap:.35rem;margin-bottom:1rem}.loginField input{box-sizing:border-box;width:100%}.loginSubmit{width:100%}\n"],
		dependencies: [
			{
				kind: "ngmodule",
				type: FormsModule
			},
			{
				kind: "directive",
				type: i1.ɵNgNoValidate,
				selector: "form:not([ngNoForm]):not([ngNativeValidate])"
			},
			{
				kind: "directive",
				type: i1.DefaultValueAccessor,
				selector: "input:not([type=checkbox]):not([ngNoCva])[formControlName],textarea:not([ngNoCva])[formControlName],input:not([type=checkbox]):not([ngNoCva])[formControl],textarea:not([ngNoCva])[formControl],input:not([type=checkbox]):not([ngNoCva])[ngModel],textarea:not([ngNoCva])[ngModel],[ngDefaultControl]"
			},
			{
				kind: "directive",
				type: i1.NgControlStatus,
				selector: "[formControlName],[ngModel],[formControl]"
			},
			{
				kind: "directive",
				type: i1.NgControlStatusGroup,
				selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],[formArray],form:not([ngNoForm]),[ngForm]"
			},
			{
				kind: "directive",
				type: i1.NgModel,
				selector: "[ngModel]:not([formControlName]):not([formControl])",
				inputs: [
					"name",
					"disabled",
					"ngModel",
					"ngModelOptions"
				],
				outputs: ["ngModelChange"],
				exportAs: ["ngModel"]
			},
			{
				kind: "directive",
				type: i1.NgForm,
				selector: "form:not([ngNoForm]):not([formGroup]):not([formArray]),ng-form,[ngForm]",
				inputs: ["ngFormOptions"],
				outputs: ["ngSubmit"],
				exportAs: ["ngForm"]
			},
			{
				kind: "ngmodule",
				type: CardModule
			},
			{
				kind: "component",
				type: i2.Card,
				selector: "p-card",
				inputs: ["header", "subheader"]
			},
			{
				kind: "ngmodule",
				type: InputTextModule
			},
			{
				kind: "directive",
				type: i3.InputText,
				selector: "[pInputText]",
				inputs: [
					"hostName",
					"pInputTextPT",
					"pInputTextUnstyled",
					"pSize",
					"variant",
					"fluid",
					"invalid"
				]
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
				type: i4.Message,
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
	type: Login,
	decorators: [{
		type: Component,
		args: [{
			imports: [
				FormsModule,
				CardModule,
				InputTextModule,
				ButtonDirective,
				MessageModule
			],
			selector: "app-login",
			template: "<div class=\"loginPage\">\n  <p-card class=\"loginCard\" [header]=\"title\" subheader=\"Sign in to continue\">\n    <form (ngSubmit)=\"signIn()\" novalidate>\n      @if (sessionExpired()) {\n        <p-message severity=\"info\" class=\"loginMessage\">Your session has expired. Please sign in again.</p-message>\n      }\n      @if (error(); as message) {\n        <p-message severity=\"error\" class=\"loginMessage\" role=\"alert\">{{ message }}</p-message>\n      }\n\n      <div class=\"loginField\">\n        <label for=\"loginEmail\">Email</label>\n        <input id=\"loginEmail\" name=\"email\" type=\"email\" pInputText autocomplete=\"username\" autofocus\n               [ngModel]=\"email()\" (ngModelChange)=\"email.set($event)\" />\n      </div>\n\n      <div class=\"loginField\">\n        <label for=\"loginPassword\">Password</label>\n        <input id=\"loginPassword\" name=\"password\" type=\"password\" pInputText autocomplete=\"current-password\"\n               [ngModel]=\"password()\" (ngModelChange)=\"password.set($event)\" />\n      </div>\n\n      <button type=\"submit\" pButton class=\"loginSubmit\" [disabled]=\"!canSubmit()\">{{ busy() ? 'Signing in...' : 'Sign in' }}</button>\n    </form>\n  </p-card>\n</div>\n",
			styles: [".loginPage{display:flex;justify-content:center;padding:4rem 1rem}.loginCard{width:100%;max-width:24rem}.loginMessage{display:block;margin-bottom:1rem}.loginField{display:flex;flex-direction:column;gap:.35rem;margin-bottom:1rem}.loginField input{box-sizing:border-box;width:100%}.loginSubmit{width:100%}\n"]
		}]
	}],
	propDecorators: {
		returnUrl: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "returnUrl",
				required: false
			}]
		}],
		reason: [{
			type: i0.Input,
			args: [{
				isSignal: true,
				alias: "reason",
				required: false
			}]
		}]
	}
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
		template: "<span class=\"signedInAs\">{{ auth.userName() }}</span>\n<button type=\"button\" pButton severity=\"secondary\" size=\"small\" (click)=\"signOut()\">Sign out</button>\n",
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
			template: "<span class=\"signedInAs\">{{ auth.userName() }}</span>\n<button type=\"button\" pButton severity=\"secondary\" size=\"small\" (click)=\"signOut()\">Sign out</button>\n",
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
export { AppHubService, AuthService, BackoffRetryPolicy, ConfigService, HUB_CONNECTION_FACTORY, HUB_NOTIFICATION_HANDLER, HubConnectionService, LocalStorageRefreshTokenStore, Login, NotificationService, OI_CONFIG_DEFAULTS, OI_UI_OPTIONS, REFRESH_KEY, REFRESH_TOKEN_STORE, SessionEndedError, SignalRService, UserMenu, adminGuard, authGuard, authInterceptor, defaultHubConnectionFactory, guestGuard, provideOiUiCommon, roleGuard, safeReturnUrl, startOiSession };

//# sourceMappingURL=oi-ui-common.mjs.map