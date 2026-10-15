import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Configuration } from '../model/configuration';

// This service is responsible for loading the configuration from the config.json file
// DO NOT include the ConfigService in the providers array of any component,
// as this will create a new instance of the service and the configuration is cached in the service.
// Instead, use the inject function to get the instance of the service.

@Service()
export class ConfigService {
  private http = inject(HttpClient);
  private _config: Configuration | null = null;

  /** Called once by the app initializer. */
  async load(): Promise<void> {
    const raw = await firstValueFrom(
      this.http.get<Configuration>(`/config.json?v=${Date.now()}`)
    );
    this._config = Object.assign(new Configuration(), raw);
  }

  /** Synchronous access after startup. */
  get config(): Configuration {
    if (!this._config) {
      throw new Error('Configuration accessed before it was loaded.');
    }
    return this._config;
  }
}
