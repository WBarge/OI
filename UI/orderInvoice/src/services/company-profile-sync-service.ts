import { HttpClient } from '@angular/common/http';
import { effect, inject, Injector, Service, untracked } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Configuration } from '../model/configuration';
import { isEmpty } from '../utils/string.utils';
import { AuthService } from './auth-service';
import { ConfigService } from './config-service';

/**
 * Copies the company details from config.json (name, address, contact details and the logo image) to the
 * Reporting API, so reports can print them. The app initializer calls start() once the configuration is loaded
 * and the session has been restored; the details are then uploaded one time per page load.
 *
 * The Reporting API only accepts a signed-in user, so when nobody is signed in yet the upload waits for the first
 * sign-in instead of sending a request that would be refused (and would send the user to the sign-in page).
 *
 * This is a background sync: when it fails nothing is shown to the user, and it is tried again at the next sign-in.
 * DO NOT include this service in a providers array; use inject() so there is one instance and "once" means once.
 */
@Service()
export class CompanyProfileSyncService {
  private http = inject(HttpClient);
  private configService = inject(ConfigService);
  private auth = inject(AuthService);
  private injector = inject(Injector);

  private started = false;
  private inFlight = false;
  private synced = false;

  /** Starts watching for a signed-in user. Safe to call more than once. */
  start(): void {
    if (this.started) {
      return;
    }
    this.started = true;
    effect(
      () => {
        if (this.auth.isAuthenticated()) {
          untracked(() => void this.syncOnce());
        }
      },
      { injector: this.injector },
    );
  }

  /**
   * Uploads the company details unless that already worked or is happening right now.
   * Resolves to true once the Reporting API has the details, and to false when nothing was uploaded.
   */
  async syncOnce(): Promise<boolean> {
    if (this.synced || this.inFlight || !this.configService.isLoaded) {
      return this.synced;
    }
    const config = this.configService.config;
    if (isEmpty(config.reportingApiUrl) || !this.hasCompanyDetails(config)) {
      return false;   // nowhere to send it, or nothing to send
    }

    this.inFlight = true;
    try {
      const body = await this.buildBody(config);
      await firstValueFrom(this.http.put(config.reportingApiUrl + 'CompanyProfile', body));
      this.synced = true;
    } catch (error) {
      console.warn('The company details could not be sent to the Reporting API.', error);
    } finally {
      this.inFlight = false;
    }
    return this.synced;
  }

  private hasCompanyDetails(config: Configuration): boolean {
    return [
      config.companyName, config.companyLogoUrl, config.companyAddress, config.companyCity,
      config.companyState, config.companyZip, config.companyEmail, config.companyPhone,
    ].some((value) => !isEmpty(value));
  }

  /** The Reporting API takes multipart/form-data: the text fields, plus the logo as a file with its resource name. */
  private async buildBody(config: Configuration): Promise<FormData> {
    const body = new FormData();
    body.append('companyName', config.companyName);
    body.append('companyAddress', config.companyAddress);
    body.append('companyCity', config.companyCity);
    body.append('companyState', config.companyState);
    body.append('companyZip', config.companyZip);
    body.append('companyEmail', config.companyEmail);
    body.append('companyPhone', config.companyPhone);

    const logoUrl = config.companyLogoUrl.trim();
    const resourceName = logoUrl.substring(logoUrl.lastIndexOf('/') + 1);   // everything after the last "/"
    if (resourceName.length > 0) {
      const logo = await this.fetchLogo(logoUrl);
      if (logo !== null) {
        body.append('logoResourceName', resourceName);
        body.append('logo', logo, resourceName);
      }
    }
    return body;
  }

  /** The logo is optional: when it cannot be read the rest of the details are still worth sending. */
  private async fetchLogo(url: string): Promise<Blob | null> {
    try {
      const logo = await firstValueFrom(this.http.get(url, { responseType: 'blob' }));
      return logo.size > 0 ? logo : null;
    } catch (error) {
      console.warn(`The company logo could not be read from ${url}.`, error);
      return null;
    }
  }
}
