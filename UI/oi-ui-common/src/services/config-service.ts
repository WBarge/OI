import { HttpClient } from '@angular/common/http';
import { inject, InjectionToken, Service } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { OiBaseConfig } from '../model/oi-base-config';

/**
 * Optional: gives the configuration its defaults, so a setting missing from config.json still has a value.
 * An application provides a function that returns a new instance of its own configuration class.
 */
export const OI_CONFIG_DEFAULTS = new InjectionToken<() => OiBaseConfig>('OI_CONFIG_DEFAULTS');

// This service is responsible for loading the configuration from the config.json file
// DO NOT include the ConfigService in the providers array of any component,
// as this will create a new instance of the service and the configuration is cached in the service.
// Instead, use the inject function to get the instance of the service.

@Service()
export class ConfigService<T extends OiBaseConfig = OiBaseConfig> {
  private http = inject(HttpClient);
  private defaults = inject(OI_CONFIG_DEFAULTS, { optional: true });
  private _config: T | null = null;

  /**
   * Called once by the app initializer.
   * The address is relative on purpose: it is worked out from the page's base href, so the OI UI (served at /)
   * reads /config.json and the ProductManager UI (served at /products/) reads /products/config.json.
   */
  async load(): Promise<void> {
    const raw = await firstValueFrom(this.http.get<T>(`config.json?v=${Date.now()}`));
    this._config = Object.assign(this.defaults ? this.defaults() : {}, raw) as T;
  }

  /** False until load() has finished. The auth interceptor checks this because it also sees the request that loads the configuration. */
  get isLoaded(): boolean {
    return this._config !== null;
  }

  /** Synchronous access after startup. */
  get config(): T {
    if (!this._config) {
      throw new Error('Configuration accessed before it was loaded.');
    }
    return this._config;
  }
}
